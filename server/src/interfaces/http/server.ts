import express, { Request, Response } from 'express';
import cors from 'cors';
import { runSeed } from '../../infrastructure/database/seed';
import { SqliteProcessoRepository } from '../../infrastructure/repositories/SqliteProcessoRepository';
import { SqliteDemandaRepository } from '../../infrastructure/repositories/SqliteDemandaRepository';
import { SqliteClienteRepository } from '../../infrastructure/repositories/SqliteClienteRepository';
import { CriarDemandaComProcessosUseCase } from '../../application/use-cases/CriarDemandaComProcessosUseCase';
import { SituacaoTipo } from '../../domain/value-objects/SituacaoProcesso';
import { Database } from '../../infrastructure/database/Database';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const processoRepo = new SqliteProcessoRepository();
const demandaRepo = new SqliteDemandaRepository();
const clienteRepo = new SqliteClienteRepository();
const criarDemandaUseCase = new CriarDemandaComProcessosUseCase(demandaRepo, processoRepo);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Procuradoria Officecon API', timestamp: new Date().toISOString() });
});

// ══════════════════════════════════════════════════════
// 1. PAINEL (Meu Dia e Equipe)
// ══════════════════════════════════════════════════════
app.get('/api/painel', async (req: Request, res: Response) => {
  try {
    const modo = (req.query.modo as string) || 'meu';
    const todosProcs = await processoRepo.listar();
    const contadores = await processoRepo.contarPorSituacao();
    const demandas = await demandaRepo.listar();

    const abertos = todosProcs.filter(p => p.getSituacao().isAberto());
    const fila = modo === 'meu'
      ? abertos.filter(p => p.getResponsavel() === 'Matheus' || !p.getResponsavel())
      : abertos;

    // Ordenação da fila por prazo mais próximo
    fila.sort((a, b) => {
      const dA = a.getPrazoInterno().getDiasRestantes();
      const dB = b.getPrazoInterno().getDiasRestantes();
      return dA - dB;
    });

    const parados = abertos
      .filter(p => p.getSituacao().isAguardando() && p.getDiasParado() > 0)
      .sort((a, b) => b.getDiasParado() - a.getDiasParado())
      .slice(0, 5);

    res.json({
      modo,
      contadores,
      totalAbertos: abertos.length,
      fila: fila.map(p => p.toJSON()),
      parados: parados.map(p => p.toJSON()),
      novasDemandasQtd: demandas.filter(d => d.getStatus() === 'Nova').length
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ══════════════════════════════════════════════════════
// 2. PROCESSOS
// ══════════════════════════════════════════════════════
app.get('/api/processos', async (req: Request, res: Response) => {
  try {
    const { situacao, responsavel, apenasAbertos, busca } = req.query;
    const processos = await processoRepo.listar({
      situacao: situacao as SituacaoTipo,
      responsavel: responsavel as string,
      apenasAbertos: apenasAbertos === 'true',
      termoBusca: busca as string
    });
    res.json(processos.map(p => p.toJSON()));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/processos/:id', async (req: Request, res: Response) => {
  try {
    const processo = await processoRepo.buscarPorId(String(req.params.id));
    if (!processo) return res.status(404).json({ error: 'Processo não encontrado' });
    res.json(processo.toJSON());
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Transição de Situação (Aguardando cliente, órgão, setor, etc.)
app.patch('/api/processos/:id/situacao', async (req: Request, res: Response) => {
  try {
    const processo = await processoRepo.buscarPorId(String(req.params.id));
    if (!processo) return res.status(404).json({ error: 'Processo não encontrado' });

    const { situacao, motivo, protocolo, setor } = req.body;

    if (['cli', 'org', 'set'].includes(situacao)) {
      processo.mudarParaAguardando(situacao, motivo || '', protocolo, setor);
    } else if (situacao === 'canc') {
      processo.cancelar(motivo || 'Cancelamento solicitado');
    } else {
      processo.mudarSituacao(situacao as SituacaoTipo);
    }

    await processoRepo.atualizar(processo);
    res.json(processo.toJSON());
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Definir Próxima Ação
app.patch('/api/processos/:id/proxima-acao', async (req: Request, res: Response) => {
  try {
    const processo = await processoRepo.buscarPorId(String(req.params.id));
    if (!processo) return res.status(404).json({ error: 'Processo não encontrado' });

    const { proximaAcao, responsavel, prazoInterno } = req.body;
    processo.definirProximaAcao(proximaAcao, responsavel, prazoInterno);

    await processoRepo.atualizar(processo);
    res.json(processo.toJSON());
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Conclusão com checklist de 6 itens
app.post('/api/processos/:id/concluir', async (req: Request, res: Response) => {
  try {
    const processo = await processoRepo.buscarPorId(String(req.params.id));
    if (!processo) return res.status(404).json({ error: 'Processo não encontrado' });

    const { dataConclusao } = req.body;
    processo.concluir(dataConclusao || '02/10/2026');

    await processoRepo.atualizar(processo);
    res.json(processo.toJSON());
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ══════════════════════════════════════════════════════
// 3. DEMANDAS
// ══════════════════════════════════════════════════════
app.get('/api/demandas', async (req: Request, res: Response) => {
  try {
    const demandas = await demandaRepo.listar();
    res.json(demandas.map(d => d.toJSON()));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/demandas', async (req: Request, res: Response) => {
  try {
    const out = await criarDemandaUseCase.execute(req.body);
    res.status(201).json(out);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ══════════════════════════════════════════════════════
// 4. CLIENTES
// ══════════════════════════════════════════════════════
app.get('/api/clientes', async (req: Request, res: Response) => {
  try {
    const termo = req.query.busca as string;
    const clientes = await clienteRepo.listar(termo);
    const todosProcs = await processoRepo.listar();

    const clientesComContagem = clientes.map(c => {
      const json = c.toJSON();
      const procsCliente = todosProcs.filter(p => p.getClienteNome() === json.nomeCurto || p.getClienteNome() === json.razaoSocial);
      const procsAbertos = procsCliente.filter(p => p.getSituacao().isAberto()).length;
      return {
        ...json,
        procsTotal: procsCliente.length,
        procsAbertos
      };
    });

    res.json(clientesComContagem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ══════════════════════════════════════════════════════
// 5. PARCELAMENTOS E GUIAS
// ══════════════════════════════════════════════════════
app.get('/api/guias', async (req: Request, res: Response) => {
  try {
    const db = Database.getClient();
    const rows = await db.execute('SELECT * FROM guias_parcelamento ORDER BY id ASC');
    const result = rows.rows.map(r => ({
      id: r.id,
      clienteNome: r.cliente_nome,
      cnpj: r.cnpj,
      orgao: r.orgao,
      modalidade: r.modalidade,
      numeroAcordo: r.numero_acordo,
      parcela: r.parcela,
      vencimento: r.vencimento,
      valor: r.valor,
      origem: r.origem,
      statusGuia: r.status_guia,
      contatoEnvio: r.contato_envio,
      tributo: r.tributo,
      situacaoAcordo: r.situacao_acordo,
      etapasConferencia: JSON.parse(String(r.etapas_conferencia_json || '[]')),
      dataEnvio: r.data_envio,
      dataPagamento: r.data_pagamento
    }));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/guias/:id/conferencia', async (req: Request, res: Response) => {
  try {
    const { etapaIndex, concluida } = req.body;
    const db = Database.getClient();
    const cur = await db.execute({ sql: 'SELECT etapas_conferencia_json FROM guias_parcelamento WHERE id = ?', args: [String(req.params.id)] });
    if (cur.rows.length === 0) return res.status(404).json({ error: 'Guia não encontrada' });

    const etapas: boolean[] = JSON.parse(String(cur.rows[0].etapas_conferencia_json || '[]'));
    etapas[etapaIndex] = !!concluida;

    await db.execute({
      sql: 'UPDATE guias_parcelamento SET etapas_conferencia_json = ? WHERE id = ?',
      args: [JSON.stringify(etapas), String(req.params.id)]
    });

    res.json({ id: req.params.id, etapasConferencia: etapas });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/guias/:id/status', async (req: Request, res: Response) => {
  try {
    const { status, dataEnvio, dataPagamento } = req.body;
    const db = Database.getClient();
    await db.execute({
      sql: 'UPDATE guias_parcelamento SET status_guia = ?, data_envio = coalesce(?, data_envio), data_pagamento = coalesce(?, data_pagamento) WHERE id = ?',
      args: [status, dataEnvio || null, dataPagamento || null, String(req.params.id)]
    });
    res.json({ id: req.params.id, statusGuia: status });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ══════════════════════════════════════════════════════
// 6. DTE E COMUNICAÇÕES
// ══════════════════════════════════════════════════════
import { DTE_CAIXAS, DTE_MSGS, VENCIMENTOS, CATALOGO_PROCEDIMENTOS, CATEGORIAS_PROCEDIMENTOS, PORTAIS_LISTA } from '../../infrastructure/database/constants';

let dteCaixasState = [...DTE_CAIXAS];

app.get('/api/dte', (req: Request, res: Response) => {
  res.json({
    caixas: dteCaixasState,
    mensagens: DTE_MSGS
  });
});

app.post('/api/dte/consultar', (req: Request, res: Response) => {
  const { clienteNome, caixaNome } = req.body;
  dteCaixasState = dteCaixasState.map(c => {
    if (c.cli === clienteNome && c.cx === caixaNome) {
      return { ...c, done: true, by: 'Matheus Silva', at: '12:00' };
    }
    return c;
  });
  res.json({ success: true, caixas: dteCaixasState });
});

// ══════════════════════════════════════════════════════
// 7. VENCIMENTOS (Certificados, Alvarás, Procurações)
// ══════════════════════════════════════════════════════
app.get('/api/vencimentos', (req: Request, res: Response) => {
  res.json(VENCIMENTOS);
});

// ══════════════════════════════════════════════════════
// 8. BIBLIOTECA DE PROCEDIMENTOS
// ══════════════════════════════════════════════════════
app.get('/api/biblioteca', (req: Request, res: Response) => {
  res.json({
    categorias: CATEGORIAS_PROCEDIMENTOS,
    procedimentos: CATALOGO_PROCEDIMENTOS
  });
});

// ══════════════════════════════════════════════════════
// 9. DIRETÓRIO DE PORTAIS
// ══════════════════════════════════════════════════════
app.get('/api/portais', (req: Request, res: Response) => {
  res.json(PORTAIS_LISTA);
});

// ══════════════════════════════════════════════════════
// 10. RELATÓRIOS E MÉTRICAS
// ══════════════════════════════════════════════════════
app.get('/api/relatorios', async (req: Request, res: Response) => {
  try {
    const todosProcs = await processoRepo.listar();
    const contadores = await processoRepo.contarPorSituacao();
    const concluidos = todosProcs.filter(p => !p.getSituacao().isAberto());

    res.json({
      processosAbertosTotal: todosProcs.filter(p => p.getSituacao().isAberto()).length,
      processosConcluidosTotal: concluidos.length,
      contadoresPorSituacao: contadores,
      tempoMedioPorProcedimento: [
        { procedimento: '05. Alteração contratual', diasUteis: 18 },
        { procedimento: '03. Abertura de empresa', diasUteis: 24 },
        { procedimento: '12. Alvará de funcionamento', diasUteis: 15 },
        { procedimento: '34. Cancelamento de nota', diasUteis: 21 },
        { procedimento: '18. Certidões', diasUteis: 2 }
      ]
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ══════════════════════════════════════════════════════
// 11. TIMELINE DO PROCESSO
// ══════════════════════════════════════════════════════
app.post('/api/processos/:id/timeline', async (req: Request, res: Response) => {
  try {
    const { tipo, descricao, prova, autor } = req.body;
    const db = Database.getClient();

    const evId = `ev-${Date.now()}`;
    const nowTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const nowDate = '02/10/2026';

    await db.execute({
      sql: `INSERT INTO eventos_timeline (id, processo_id, data, hora, autor, tipo, descricao, prova)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [evId, req.params.id, nowDate, nowTime, autor || 'Matheus Silva', tipo || 'Nota', descricao, prova || 'relato']
    });

    res.status(201).json({ id: evId, success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Inicia servidor e banco de dados
async function bootstrap() {
  await runSeed();
  app.listen(PORT, () => {
    console.log(`[Procuradoria API] Servidor profissional ouvindo na porta http://localhost:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('[Bootstrap Error]', err);
});
