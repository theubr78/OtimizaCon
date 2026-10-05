import { IDemandaRepository } from '../../domain/repositories/IDemandaRepository';
import { IProcessoRepository } from '../../domain/repositories/IProcessoRepository';
import { Demanda, CanalDemanda } from '../../domain/entities/Demanda';
import { Processo } from '../../domain/entities/Processo';

export interface ProcedimentoPedidoDTO {
  codigoProcedimento: string; // Ex: '03'
  titulo: string;
  responsavel?: string;
  prazoInterno?: string;
  proximaAcao: string;
}

export interface CriarDemandaInputDTO {
  clienteNome: string;
  cnpj?: string;
  estabelecimento?: string;
  solicitante: string;
  canal: CanalDemanda;
  dataRecebimento?: string;
  descricao: string;
  anexos?: string;
  procedimentos: ProcedimentoPedidoDTO[];
}

export interface CriarDemandaOutputDTO {
  demandaId: string;
  processosCriadosIds: string[];
}

export class CriarDemandaComProcessosUseCase {
  constructor(
    private demandaRepo: IDemandaRepository,
    private processoRepo: IProcessoRepository
  ) {}

  public async execute(input: CriarDemandaInputDTO): Promise<CriarDemandaOutputDTO> {
    if (!input.clienteNome) throw new Error('Cliente é obrigatório');
    if (!input.descricao) throw new Error('Descrição da demanda é obrigatória');
    if (!input.procedimentos || input.procedimentos.length === 0) {
      throw new Error('A demanda deve gerar ao menos um processo');
    }

    const demandaId = await this.demandaRepo.proximoId();
    const novosProcessosIds: string[] = [];

    // Busca contagem de processos para gerar ID sequencial P-XXX
    const todosProcs = await this.processoRepo.listar();
    let seq = 116;
    for (const p of todosProcs) {
      const num = parseInt(p.getId().replace('P-', ''), 10);
      if (!isNaN(num) && num >= seq) seq = num + 1;
    }

    for (const procDto of input.procedimentos) {
      const procId = `P-${seq++}`;
      novosProcessosIds.push(procId);

      const novoProcesso = new Processo({
        id: procId,
        clienteId: '',
        clienteNome: input.clienteNome,
        cnpj: input.cnpj || '—',
        estabelecimento: input.estabelecimento || 'Matriz',
        codigoProcedimento: procDto.codigoProcedimento,
        titulo: procDto.titulo,
        situacao: 'nao',
        diasParado: 0,
        etapaAtual: 1,
        etapasTotal: 6,
        proximaAcao: procDto.proximaAcao || 'Iniciar atendimento',
        responsavel: procDto.responsavel || 'Matheus',
        prazoInterno: procDto.prazoInterno || '09/10/2026',
        demandaOrigemId: demandaId,
        ultimaAtualizacao: '02/10'
      });

      await this.processoRepo.salvar(novoProcesso);
    }

    const demanda = new Demanda({
      id: demandaId,
      data: input.dataRecebimento || '02/10/2026',
      canal: input.canal,
      clienteNome: input.clienteNome,
      solicitante: input.solicitante,
      descricao: input.descricao,
      anexos: input.anexos,
      status: 'Convertida',
      processosVinculados: novosProcessosIds
    });

    await this.demandaRepo.salvar(demanda);

    return {
      demandaId,
      processosCriadosIds: novosProcessosIds
    };
  }
}
