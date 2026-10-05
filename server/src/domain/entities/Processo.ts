import { SituacaoProcesso, SituacaoTipo } from '../value-objects/SituacaoProcesso';
import { Prazo } from '../value-objects/Prazo';

export interface MarcoHistorico {
  tipo: 'Enviado' | 'Pago' | 'Protocolado' | 'Exigência' | 'Deferido';
  data: string;
}

export interface ProcessoProps {
  id: string; // Ex: P-101
  clienteId: string;
  clienteNome: string;
  cnpj: string;
  estabelecimento: string;
  codigoProcedimento: string; // Ex: '05'
  titulo: string;
  situacao: SituacaoTipo;
  diasParado?: number;
  etapaAtual: number;
  etapasTotal?: number;
  proximaAcao: string;
  responsavel: string; // Matheus, Ana, Carla, etc.
  prazoInterno: string; // DD/MM/AAAA
  prazoExterno?: string; // DD/MM/AAAA
  dataCiencia?: string;
  fundamentoPrazo?: string;
  marcos?: MarcoHistorico[];
  motivoAguardando?: string;
  setorAguardando?: string;
  protocoloAguardando?: string;
  bloqueadoPorId?: string;
  demandaOrigemId?: string;
  orgao?: string;
  dataConclusao?: string;
  ultimaAtualizacao?: string;
}

export class Processo {
  private readonly id: string;
  private readonly clienteId: string;
  private readonly clienteNome: string;
  private readonly cnpj: string;
  private estabelecimento: string;
  private readonly codigoProcedimento: string;
  private titulo: string;
  private situacao: SituacaoProcesso;
  private diasParado: number;
  private etapaAtual: number;
  private etapasTotal: number;
  private proximaAcao: string;
  private responsavel: string;
  private prazoInterno: Prazo;
  private prazoExterno: Prazo;
  private dataCiencia: string;
  private fundamentoPrazo: string;
  private marcos: MarcoHistorico[];
  private motivoAguardando: string;
  private setorAguardando: string;
  private protocoloAguardando: string;
  private bloqueadoPorId?: string;
  private demandaOrigemId?: string;
  private orgao: string;
  private dataConclusao?: string;
  private ultimaAtualizacao: string;

  constructor(props: ProcessoProps) {
    if (!props.id) throw new Error('ID do processo é obrigatório');
    if (!props.clienteNome) throw new Error('Nome do cliente é obrigatório');
    if (!props.titulo) throw new Error('Título do processo é obrigatório');

    this.id = props.id;
    this.clienteId = props.clienteId || '';
    this.clienteNome = props.clienteNome;
    this.cnpj = props.cnpj || '—';
    this.estabelecimento = props.estabelecimento || 'Matriz';
    this.codigoProcedimento = props.codigoProcedimento;
    this.titulo = props.titulo;
    this.situacao = new SituacaoProcesso(props.situacao || 'nao');
    this.diasParado = props.diasParado ?? 0;
    this.etapaAtual = props.etapaAtual ?? 1;
    this.etapasTotal = props.etapasTotal ?? 6;
    this.proximaAcao = props.proximaAcao || '';
    this.responsavel = props.responsavel || 'Matheus';
    this.prazoInterno = new Prazo(props.prazoInterno);
    this.prazoExterno = new Prazo(props.prazoExterno || '');
    this.dataCiencia = props.dataCiencia || '';
    this.fundamentoPrazo = props.fundamentoPrazo || '';
    this.marcos = props.marcos || [];
    this.motivoAguardando = props.motivoAguardando || '';
    this.setorAguardando = props.setorAguardando || '';
    this.protocoloAguardando = props.protocoloAguardando || '';
    this.bloqueadoPorId = props.bloqueadoPorId;
    this.demandaOrigemId = props.demandaOrigemId;
    this.orgao = props.orgao || '';
    this.dataConclusao = props.dataConclusao;
    this.ultimaAtualizacao = props.ultimaAtualizacao || '02/10';

    this.validarInvariantes();
  }

  // Regra de Negócio 2: Processo aberto deve ter próxima ação definida
  private validarInvariantes(): void {
    if (this.situacao.isAberto() && !this.proximaAcao.trim()) {
      // Alerta de negócio
    }
  }

  public getId(): string { return this.id; }
  public getClienteNome(): string { return this.clienteNome; }
  public getTitulo(): string { return this.titulo; }
  public getSituacao(): SituacaoProcesso { return this.situacao; }
  public getEtapaAtual(): number { return this.etapaAtual; }
  public getEtapasTotal(): number { return this.etapasTotal; }
  public getProximaAcao(): string { return this.proximaAcao; }
  public getResponsavel(): string { return this.responsavel; }
  public getPrazoInterno(): Prazo { return this.prazoInterno; }
  public getPrazoExterno(): Prazo { return this.prazoExterno; }
  public getDiasParado(): number { return this.diasParado; }
  public getMotivoAguardando(): string { return this.motivoAguardando; }
  public getSetorAguardando(): string { return this.setorAguardando; }
  public getProtocoloAguardando(): string { return this.protocoloAguardando; }
  public getBloqueadoPorId(): string | undefined { return this.bloqueadoPorId; }
  public getMarcos(): MarcoHistorico[] { return [...this.marcos]; }

  // Regra de Negócio 4: Transição para Aguardando...
  public mudarParaAguardando(
    tipo: 'cli' | 'org' | 'set',
    motivo: string,
    protocolo?: string,
    setor?: string
  ): void {
    if (tipo === 'cli' && !motivo.trim()) {
      throw new Error('Mudar para Aguardando cliente exige informar o que está faltando.');
    }
    if (tipo === 'set' && !motivo.trim()) {
      throw new Error('Mudar para Aguardando setor exige informar o que o setor precisa fazer.');
    }
    if (tipo === 'org' && !protocolo?.trim()) {
      throw new Error('Mudar para Aguardando órgão exige o número do protocolo vinculado.');
    }

    this.situacao = new SituacaoProcesso(tipo);
    this.diasParado = 0;
    this.motivoAguardando = motivo.trim();
    if (protocolo) this.protocoloAguardando = protocolo.trim();
    if (setor) this.setorAguardando = setor.trim();
    this.ultimaAtualizacao = '02/10';
  }

  public mudarSituacao(novaSituacao: SituacaoTipo): void {
    this.situacao = new SituacaoProcesso(novaSituacao);
    this.diasParado = 0;
    this.ultimaAtualizacao = '02/10';
  }

  public definirProximaAcao(acao: string, responsavel?: string, prazoInterno?: string): void {
    if (!acao.trim()) {
      throw new Error('A próxima ação não pode ser vazia para um processo em andamento.');
    }
    this.proximaAcao = acao.trim();
    if (responsavel) this.responsavel = responsavel;
    if (prazoInterno) this.prazoInterno = new Prazo(prazoInterno);
    this.ultimaAtualizacao = '02/10';
  }

  public definirPrazoExterno(vencimento: string, ciencia?: string, fundamento?: string): void {
    if (!vencimento.trim()) {
      throw new Error('Data de vencimento do prazo externo é obrigatória.');
    }
    this.prazoExterno = new Prazo(vencimento);
    if (ciencia) this.dataCiencia = ciencia.trim();
    if (fundamento) this.fundamentoPrazo = fundamento.trim();
    this.ultimaAtualizacao = '02/10';
  }

  public reatribuir(novoResponsavel: string): void {
    if (!novoResponsavel.trim()) throw new Error('Responsável inválido');
    this.responsavel = novoResponsavel.trim();
    this.ultimaAtualizacao = '02/10';
  }

  public avancarEtapa(novaEtapa: number): void {
    if (novaEtapa < 1 || novaEtapa > this.etapasTotal) {
      throw new Error(`Etapa ${novaEtapa} fora dos limites (1 a ${this.etapasTotal})`);
    }
    this.etapaAtual = novaEtapa;
    this.ultimaAtualizacao = '02/10';
  }

  public adicionarMarco(tipo: MarcoHistorico['tipo'], data: string): void {
    this.marcos.push({ tipo, data });
  }

  // Regra de Negócio 7: Conclusão do processo
  public concluir(dataConclusao: string = '02/10'): void {
    this.situacao = new SituacaoProcesso('conc');
    this.etapaAtual = this.etapasTotal;
    this.dataConclusao = dataConclusao;
    this.diasParado = 0;
    this.proximaAcao = '';
    this.adicionarMarco('Deferido', dataConclusao);
    this.ultimaAtualizacao = dataConclusao;
  }

  public cancelar(motivo: string): void {
    if (!motivo.trim()) {
      throw new Error('O cancelamento do processo exige um motivo justificado.');
    }
    this.situacao = new SituacaoProcesso('canc');
    this.motivoAguardando = motivo.trim();
    this.diasParado = 0;
    this.ultimaAtualizacao = '02/10';
  }

  public toJSON(): ProcessoProps {
    return {
      id: this.id,
      clienteId: this.clienteId,
      clienteNome: this.clienteNome,
      cnpj: this.cnpj,
      estabelecimento: this.estabelecimento,
      codigoProcedimento: this.codigoProcedimento,
      titulo: this.titulo,
      situacao: this.situacao.getTipo(),
      diasParado: this.diasParado,
      etapaAtual: this.etapaAtual,
      etapasTotal: this.etapasTotal,
      proximaAcao: this.proximaAcao,
      responsavel: this.responsavel,
      prazoInterno: this.prazoInterno.getDataStr(),
      prazoExterno: this.prazoExterno.getDataStr(),
      dataCiencia: this.dataCiencia,
      fundamentoPrazo: this.fundamentoPrazo,
      marcos: [...this.marcos],
      motivoAguardando: this.motivoAguardando,
      setorAguardando: this.setorAguardando,
      protocoloAguardando: this.protocoloAguardando,
      bloqueadoPorId: this.bloqueadoPorId,
      demandaOrigemId: this.demandaOrigemId,
      orgao: this.orgao,
      dataConclusao: this.dataConclusao,
      ultimaAtualizacao: this.ultimaAtualizacao
    };
  }
}
