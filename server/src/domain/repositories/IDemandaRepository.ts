import { Demanda } from '../entities/Demanda';

export interface IDemandaRepository {
  buscarPorId(id: string): Promise<Demanda | null>;
  listar(): Promise<Demanda[]>;
  salvar(demanda: Demanda): Promise<void>;
  atualizar(demanda: Demanda): Promise<void>;
  proximoId(): Promise<string>;
}
