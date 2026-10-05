import { Processo } from '../entities/Processo';
import { SituacaoTipo } from '../value-objects/SituacaoProcesso';

export interface FiltrosProcesso {
  situacao?: SituacaoTipo;
  responsavel?: string;
  clienteId?: string;
  codigoProcedimento?: string;
  apenasAbertos?: boolean;
  termoBusca?: string;
}

export interface IProcessoRepository {
  buscarPorId(id: string): Promise<Processo | null>;
  listar(filtros?: FiltrosProcesso): Promise<Processo[]>;
  salvar(processo: Processo): Promise<void>;
  atualizar(processo: Processo): Promise<void>;
  remover(id: string): Promise<void>;
  contarPorSituacao(): Promise<Record<SituacaoTipo, number>>;
}
