import { createClient, Client } from '@libsql/client';
import path from 'path';

export class Database {
  private static instance: Client | null = null;

  public static getClient(): Client {
    if (!Database.instance) {
      const dbPath = path.resolve(process.cwd(), 'procuradoria.db');
      Database.instance = createClient({
        url: `file:${dbPath}`
      });
    }
    return Database.instance;
  }

  public static async initTables(): Promise<void> {
    const db = Database.getClient();

    await db.execute(`
      CREATE TABLE IF NOT EXISTS clientes (
        id TEXT PRIMARY KEY,
        razao_social TEXT NOT NULL,
        nome_curto TEXT NOT NULL,
        cnpj TEXT NOT NULL,
        municipio TEXT NOT NULL,
        contato_principal TEXT NOT NULL,
        estabelecimentos_qtd INTEGER NOT NULL DEFAULT 1
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS demandas (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        canal TEXT NOT NULL,
        cliente_nome TEXT NOT NULL,
        solicitante TEXT NOT NULL,
        descricao TEXT NOT NULL,
        anexos TEXT,
        status TEXT NOT NULL,
        processos_vinculados TEXT NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS processos (
        id TEXT PRIMARY KEY,
        cliente_id TEXT,
        cliente_nome TEXT NOT NULL,
        cnpj TEXT NOT NULL,
        estabelecimento TEXT NOT NULL DEFAULT 'Matriz',
        codigo_procedimento TEXT NOT NULL,
        titulo TEXT NOT NULL,
        situacao TEXT NOT NULL,
        dias_parado INTEGER NOT NULL DEFAULT 0,
        etapa_atual INTEGER NOT NULL DEFAULT 1,
        etapas_total INTEGER NOT NULL DEFAULT 6,
        proxima_acao TEXT NOT NULL,
        responsavel TEXT NOT NULL,
        prazo_interno TEXT NOT NULL,
        prazo_externo TEXT,
        data_ciencia TEXT,
        fundamento_prazo TEXT,
        motivo_aguardando TEXT,
        setor_aguardando TEXT,
        protocolo_aguardando TEXT,
        bloqueado_por_id TEXT,
        demanda_origem_id TEXT,
        orgao TEXT,
        data_conclusao TEXT,
        marcos_json TEXT NOT NULL DEFAULT '[]',
        ultima_atualizacao TEXT NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS checklist_itens (
        id TEXT PRIMARY KEY,
        processo_id TEXT NOT NULL,
        etapa_numero INTEGER NOT NULL,
        descricao TEXT NOT NULL,
        obrigatorio INTEGER NOT NULL,
        concluido INTEGER NOT NULL DEFAULT 0,
        responsavel_nome TEXT,
        concluido_em TEXT,
        evidencia_texto TEXT
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS eventos_timeline (
        id TEXT PRIMARY KEY,
        processo_id TEXT NOT NULL,
        data TEXT NOT NULL,
        hora TEXT NOT NULL,
        autor TEXT NOT NULL,
        tipo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        prova TEXT NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS guias_parcelamento (
        id TEXT PRIMARY KEY,
        cliente_nome TEXT NOT NULL,
        cnpj TEXT NOT NULL,
        orgao TEXT NOT NULL,
        modalidade TEXT NOT NULL,
        numero_acordo TEXT NOT NULL,
        parcela TEXT NOT NULL,
        vencimento TEXT NOT NULL,
        valor REAL NOT NULL,
        origem TEXT NOT NULL,
        status_guia TEXT NOT NULL,
        contato_envio TEXT NOT NULL,
        tributo TEXT NOT NULL,
        situacao_acordo TEXT NOT NULL DEFAULT 'Ativo',
        etapas_conferencia_json TEXT NOT NULL DEFAULT '[false,false,false,false,false,false]',
        data_envio TEXT,
        data_pagamento TEXT
      );
    `);

    console.log('[Database] Tabelas SQLite inicializadas com sucesso.');
  }
}
