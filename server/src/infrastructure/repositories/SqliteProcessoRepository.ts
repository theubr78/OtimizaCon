import { IProcessoRepository, FiltrosProcesso } from '../../domain/repositories/IProcessoRepository';
import { Processo, ProcessoProps } from '../../domain/entities/Processo';
import { SituacaoTipo } from '../../domain/value-objects/SituacaoProcesso';
import { Database } from '../database/Database';

export class SqliteProcessoRepository implements IProcessoRepository {
  private db = Database.getClient();

  public async buscarPorId(id: string): Promise<Processo | null> {
    const res = await this.db.execute({
      sql: 'SELECT * FROM processos WHERE id = ?',
      args: [id]
    });
    if (res.rows.length === 0) return null;
    return this.mapToEntity(res.rows[0]);
  }

  public async listar(filtros?: FiltrosProcesso): Promise<Processo[]> {
    let sql = 'SELECT * FROM processos WHERE 1=1';
    const args: any[] = [];

    if (filtros?.situacao) {
      sql += ' AND situacao = ?';
      args.push(filtros.situacao);
    }
    if (filtros?.responsavel) {
      sql += ' AND responsavel = ?';
      args.push(filtros.responsavel);
    }
    if (filtros?.apenasAbertos) {
      sql += " AND situacao NOT IN ('conc', 'canc')";
    }
    if (filtros?.termoBusca) {
      sql += ' AND (titulo LIKE ? OR cliente_nome LIKE ? OR id LIKE ?)';
      const term = `%${filtros.termoBusca}%`;
      args.push(term, term, term);
    }

    sql += ' ORDER BY id DESC';

    const res = await this.db.execute({ sql, args });
    return res.rows.map(row => this.mapToEntity(row));
  }

  public async salvar(processo: Processo): Promise<void> {
    const p = processo.toJSON();
    await this.db.execute({
      sql: `
        INSERT INTO processos (
          id, cliente_id, cliente_nome, cnpj, estabelecimento, codigo_procedimento,
          titulo, situacao, dias_parado, etapa_atual, etapas_total, proxima_acao,
          responsavel, prazo_interno, prazo_externo, data_ciencia, fundamento_prazo,
          motivo_aguardando, setor_aguardando, protocolo_aguardando, bloqueado_por_id,
          demanda_origem_id, orgao, data_conclusao, marcos_json, ultima_atualizacao
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        p.id, p.clienteId, p.clienteNome, p.cnpj, p.estabelecimento, p.codigoProcedimento,
        p.titulo, p.situacao, p.diasParado || 0, p.etapaAtual, p.etapasTotal || 6, p.proximaAcao,
        p.responsavel, p.prazoInterno, p.prazoExterno || null, p.dataCiencia || null, p.fundamentoPrazo || null,
        p.motivoAguardando || null, p.setorAguardando || null, p.protocoloAguardando || null, p.bloqueadoPorId || null,
        p.demandaOrigemId || null, p.orgao || null, p.dataConclusao || null, JSON.stringify(p.marcos || []), p.ultimaAtualizacao || '02/10'
      ]
    });
  }

  public async atualizar(processo: Processo): Promise<void> {
    const p = processo.toJSON();
    await this.db.execute({
      sql: `
        UPDATE processos SET
          titulo = ?, situacao = ?, dias_parado = ?, etapa_atual = ?, etapas_total = ?,
          proxima_acao = ?, responsavel = ?, prazo_interno = ?, prazo_externo = ?,
          data_ciencia = ?, fundamento_prazo = ?, motivo_aguardando = ?, setor_aguardando = ?,
          protocolo_aguardando = ?, bloqueado_por_id = ?, orgao = ?, data_conclusao = ?,
          marcos_json = ?, ultima_atualizacao = ?
        WHERE id = ?
      `,
      args: [
        p.titulo, p.situacao, p.diasParado || 0, p.etapaAtual, p.etapasTotal || 6,
        p.proximaAcao, p.responsavel, p.prazoInterno, p.prazoExterno || null,
        p.dataCiencia || null, p.fundamentoPrazo || null, p.motivoAguardando || null, p.setorAguardando || null,
        p.protocoloAguardando || null, p.bloqueadoPorId || null, p.orgao || null, p.dataConclusao || null,
        JSON.stringify(p.marcos || []), p.ultimaAtualizacao || '02/10', p.id
      ]
    });
  }

  public async remover(id: string): Promise<void> {
    await this.db.execute({
      sql: 'DELETE FROM processos WHERE id = ?',
      args: [id]
    });
  }

  public async contarPorSituacao(): Promise<Record<SituacaoTipo, number>> {
    const res = await this.db.execute('SELECT situacao, COUNT(*) as qtd FROM processos GROUP BY situacao');
    const out: Record<SituacaoTipo, number> = {
      nao: 0, and: 0, cli: 0, org: 0, set: 0, conc: 0, canc: 0
    };
    for (const r of res.rows) {
      const sit = String(r.situacao) as SituacaoTipo;
      if (out[sit] !== undefined) {
        out[sit] = Number(r.qtd);
      }
    }
    return out;
  }

  private mapToEntity(row: any): Processo {
    let marcos = [];
    try {
      marcos = JSON.parse(row.marcos_json || '[]');
    } catch (_) {}

    return new Processo({
      id: String(row.id),
      clienteId: String(row.cliente_id || ''),
      clienteNome: String(row.cliente_nome),
      cnpj: String(row.cnpj || '—'),
      estabelecimento: String(row.estabelecimento || 'Matriz'),
      codigoProcedimento: String(row.codigo_procedimento),
      titulo: String(row.titulo),
      situacao: String(row.situacao) as SituacaoTipo,
      diasParado: Number(row.dias_parado || 0),
      etapaAtual: Number(row.etapa_atual || 1),
      etapasTotal: Number(row.etapas_total || 6),
      proximaAcao: String(row.proxima_acao || ''),
      responsavel: String(row.responsavel || 'Matheus'),
      prazoInterno: String(row.prazo_interno || ''),
      prazoExterno: row.prazo_externo ? String(row.prazo_externo) : undefined,
      dataCiencia: row.data_ciencia ? String(row.data_ciencia) : undefined,
      fundamentoPrazo: row.fundamento_prazo ? String(row.fundamento_prazo) : undefined,
      motivoAguardando: row.motivo_aguardando ? String(row.motivo_aguardando) : undefined,
      setorAguardando: row.setor_aguardando ? String(row.setor_aguardando) : undefined,
      protocoloAguardando: row.protocolo_aguardando ? String(row.protocolo_aguardando) : undefined,
      bloqueadoPorId: row.bloqueado_por_id ? String(row.bloqueado_por_id) : undefined,
      demandaOrigemId: row.demanda_origem_id ? String(row.demanda_origem_id) : undefined,
      orgao: row.orgao ? String(row.orgao) : undefined,
      dataConclusao: row.data_conclusao ? String(row.data_conclusao) : undefined,
      marcos,
      ultimaAtualizacao: String(row.ultima_atualizacao || '02/10')
    });
  }
}
