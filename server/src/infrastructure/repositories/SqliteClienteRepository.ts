import { IClienteRepository } from '../../domain/repositories/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';
import { Database } from '../database/Database';

export class SqliteClienteRepository implements IClienteRepository {
  private db = Database.getClient();

  public async buscarPorId(id: string): Promise<Cliente | null> {
    const res = await this.db.execute({
      sql: 'SELECT * FROM clientes WHERE id = ?',
      args: [id]
    });
    if (res.rows.length === 0) return null;
    return this.mapToEntity(res.rows[0]);
  }

  public async buscarPorCnpj(cnpj: string): Promise<Cliente | null> {
    const clean = cnpj.replace(/\D/g, '');
    const res = await this.db.execute({
      sql: 'SELECT * FROM clientes WHERE replace(replace(replace(replace(cnpj, ".", ""), "/", ""), "-", ""), " ", "") = ?',
      args: [clean]
    });
    if (res.rows.length === 0) return null;
    return this.mapToEntity(res.rows[0]);
  }

  public async listar(termo?: string): Promise<Cliente[]> {
    let sql = 'SELECT * FROM clientes';
    const args: any[] = [];
    if (termo) {
      sql += ' WHERE razao_social LIKE ? OR nome_curto LIKE ? OR cnpj LIKE ?';
      const t = `%${termo}%`;
      args.push(t, t, t);
    }
    sql += ' ORDER BY razao_social ASC';
    const res = await this.db.execute({ sql, args });
    return res.rows.map(r => this.mapToEntity(r));
  }

  public async salvar(cliente: Cliente): Promise<void> {
    const c = cliente.toJSON();
    await this.db.execute({
      sql: `
        INSERT OR REPLACE INTO clientes (id, razao_social, nome_curto, cnpj, municipio, contato_principal, estabelecimentos_qtd)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [c.id, c.razaoSocial, c.nomeCurto, c.cnpj, c.municipio, c.contatoPrincipal, c.estabelecimentosQtd]
    });
  }

  private mapToEntity(row: any): Cliente {
    return new Cliente({
      id: String(row.id),
      razaoSocial: String(row.razao_social),
      nomeCurto: String(row.nome_curto),
      cnpj: String(row.cnpj),
      municipio: String(row.municipio),
      contatoPrincipal: String(row.contato_principal),
      estabelecimentosQtd: Number(row.estabelecimentos_qtd || 1)
    });
  }
}
