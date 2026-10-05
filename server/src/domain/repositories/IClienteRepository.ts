import { Cliente } from '../entities/Cliente';

export interface IClienteRepository {
  buscarPorId(id: string): Promise<Cliente | null>;
  buscarPorCnpj(cnpj: string): Promise<Cliente | null>;
  listar(termo?: string): Promise<Cliente[]>;
  salvar(cliente: Cliente): Promise<void>;
}
