import { IDemandaRepository } from '../../domain/repositories/IDemandaRepository';
import { Demanda, CanalDemanda, StatusDemanda } from '../../domain/entities/Demanda';
import { Database } from '../database/Database';

export class SqliteDemandaRepository implements IDemandaRepository {
  private db = Database.getClient();

  public async buscarPorId(id: string): Promise<Demanda | null> {
    const res = await this.db.execute({
      sql: 'SELECT * FROM demandas WHERE id = ?',
      args: [id]
    });
    if (res.rows.length === 0) return null;
    return this.mapToEntity(res.rows[0]);
  }

  public async listar(): Promise<Demanda[]> {
    const res = await this.db.execute('SELECT * FROM demandas ORDER BY id DESC');
    return res.rows.map(row => this.mapToEntity(row));
  }

  public async salvar(demanda: Demanda): Promise<void> {
    const d = demanda.toJSON();
    await this.db.execute({
      sql: `
        INSERT INTO demandas (id, data, canal, cliente_nome, solicitante, descricao, anexos, status, processos_vinculados)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        d.id, d.data, d.canal, d.clienteNome, d.solicitante,
        d.descricao, d.anexos || null, d.status || 'Nova', JSON.stringify(d.processosVinculados || [])
      ]
    });
  }

  public async atualizar(demanda: Demanda): Promise<void> {
    const d = demanda.toJSON();
    await this.db.execute({
      sql: `
        UPDATE demandas SET
          data = ?, canal = ?, cliente_nome = ?, solicitante = ?, descricao = ?,
          anexos = ?, status = ?, processos_vinculados = ?
        WHERE id = ?
      `,
      args: [
        d.data, d.canal, d.clienteNome, d.solicitante, d.descricao,
        d.anexos || null, d.status || 'Nova', JSON.stringify(d.processosVinculados || []), d.id
      ]
    });
  }

  public async proximoId(): Promise<string> {
    const res = await this.db.execute('SELECT id FROM demandas');
    let max = 64;
    for (const r of res.rows) {
      const num = parseInt(String(r.id).replace('D-', ''), 10);
      if (!isNaN(num) && num > max) max = num;
    }
    const next = max + 1;
    return `D-${String(next).padStart(3, '0')}`;
  }

  private mapToEntity(row: any): Demanda {
    let procs: string[] = [];
    try {
      procs = JSON.parse(row.processos_vinculados || '[]');
    } catch (_) {}

    return new Demanda({
      id: String(row.id),
      data: String(row.data),
      canal: String(row.canal) as CanalDemanda,
      clienteNome: String(row.cliente_nome),
      solicitante: String(row.solicitante),
      descricao: String(row.descricao),
      anexos: row.anexos ? String(row.anexos) : undefined,
      status: String(row.status) as StatusDemanda,
      processosVinculados: procs
    });
  }
}
