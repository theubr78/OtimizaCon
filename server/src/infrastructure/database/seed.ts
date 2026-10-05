import { Database } from './Database';
import { CLIENTES_SEED, DEMANDAS_SEED, PROCESSOS_SEED, GUIAS_SEED } from './seedData';

export async function runSeed(): Promise<void> {
  console.log('[Seed] Inicializando tabelas SQLite...');
  await Database.initTables();
  const db = Database.getClient();

  // Verifica se já existem clientes
  const check = await db.execute('SELECT COUNT(*) as qtd FROM clientes');
  if (Number(check.rows[0].qtd) > 0) {
    console.log('[Seed] Banco de dados já populado. Pulando seed.');
    return;
  }

  console.log('[Seed] Populando clientes...');
  for (const c of CLIENTES_SEED) {
    await db.execute({
      sql: `INSERT INTO clientes (id, razao_social, nome_curto, cnpj, municipio, contato_principal, estabelecimentos_qtd)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [c.id, c.razaoSocial, c.nomeCurto, c.cnpj, c.municipio, c.contatoPrincipal, c.estabelecimentosQtd]
    });
  }

  console.log('[Seed] Populando demandas...');
  for (const d of DEMANDAS_SEED) {
    await db.execute({
      sql: `INSERT INTO demandas (id, data, canal, cliente_nome, solicitante, descricao, anexos, status, processos_vinculados)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [d.id, d.data, d.canal, d.clienteNome, d.solicitante, d.descricao, d.anexos, d.status, JSON.stringify(d.processosVinculados)]
    });
  }

  console.log('[Seed] Populando processos...');
  for (const p of PROCESSOS_SEED) {
    await db.execute({
      sql: `INSERT INTO processos (
              id, cliente_id, cliente_nome, cnpj, estabelecimento, codigo_procedimento,
              titulo, situacao, dias_parado, etapa_atual, etapas_total, proxima_acao,
              responsavel, prazo_interno, prazo_externo, data_ciencia, fundamento_prazo,
              motivo_aguardando, setor_aguardando, protocolo_aguardando, bloqueado_por_id,
              demanda_origem_id, orgao, data_conclusao, marcos_json, ultima_atualizacao
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id, p.clienteId, p.clienteNome, p.cnpj, p.estabelecimento, p.codigoProcedimento,
        p.titulo, p.situacao, p.diasParado, p.etapaAtual, p.etapasTotal, p.proximaAcao,
        p.responsavel, p.prazoInterno, p.prazoExterno || null, p.dataCiencia || null, p.fundamentoPrazo || null,
        p.motivoAguardando || null, (p as any).setorAguardando || null, (p as any).protocoloAguardando || null, p.bloqueadoPorId || null,
        p.demandaOrigemId || null, p.orgao || null, (p as any).dataConclusao || null, JSON.stringify(p.marcos || []), p.ultimaAtualizacao
      ]
    });
  }

  console.log('[Seed] Populando guias de parcelamentos...');
  for (const g of GUIAS_SEED) {
    await db.execute({
      sql: `INSERT INTO guias_parcelamento (
              id, cliente_nome, cnpj, orgao, modalidade, numero_acordo, parcela,
              vencimento, valor, origem, status_guia, contato_envio, tributo,
              situacao_acordo, etapas_conferencia_json, data_envio, data_pagamento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        g.id, g.clienteNome, g.cnpj, g.orgao, g.modalidade, g.numeroAcordo, g.parcela,
        g.vencimento, g.valor, g.origem, g.statusGuia, g.contatoEnvio, g.tributo,
        (g as any).situacaoAcordo || 'Ativo', JSON.stringify(g.etapasConferencia || []), (g as any).dataEnvio || null, (g as any).dataPagamento || null
      ]
    });
  }

  console.log('[Seed] ✅ Banco SQLite populado com sucesso com todos os dados da Procuradoria!');
}

if (require.main === module || process.argv[1]?.includes('seed')) {
  runSeed().catch(err => {
    console.error('[Seed Error]', err);
    process.exit(1);
  });
}
