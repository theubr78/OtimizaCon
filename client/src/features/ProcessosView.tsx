import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface ProcessosViewProps {
  onOpenProc: (id: string) => void;
}

export const ProcessosView: React.FC<ProcessosViewProps> = ({ onOpenProc }) => {
  const [viewMode, setViewMode] = useState<'lista' | 'quadro'>('lista');
  const [processos, setProcessos] = useState<any[]>([]);
  const [filtroSituacao, setFiltroSituacao] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);

  const carregarProcessos = async () => {
    try {
      setLoading(true);
      const filtros: Record<string, string> = {};
      if (filtroSituacao) filtros.situacao = filtroSituacao;
      if (termoBusca) filtros.busca = termoBusca;
      const res = await api.getProcessos(filtros);
      setProcessos(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProcessos();
  }, [filtroSituacao, termoBusca]);

  const handleDrop = async (procId: string, novaSit: string) => {
    try {
      await api.mudarSituacao(procId, { situacao: novaSit });
      carregarProcessos();
    } catch (err) {
      console.error(err);
    }
  };

  const colunasKanban = [
    { key: 'nao', label: 'Não iniciado' },
    { key: 'and', label: 'Em andamento' },
    { key: 'cli', label: 'Aguardando cliente' },
    { key: 'org', label: 'Aguardando órgão' },
    { key: 'set', label: 'Aguardando setor' },
    { key: 'conc', label: 'Concluído' }
  ];

  return (
    <div style={{ padding: '24px 28px', maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 600 }}>Processos</div>
          <div style={{ color: '#8E8E96', fontSize: '13px' }}>{processos.length} processos encontrados</div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            placeholder="Filtrar por nome, ID ou ação..."
            style={{ width: '240px', height: '32px' }}
          />

          <select value={filtroSituacao} onChange={(e) => setFiltroSituacao(e.target.value)} style={{ height: '32px' }}>
            <option value="">Todas as situações</option>
            <option value="nao">Não iniciado</option>
            <option value="and">Em andamento</option>
            <option value="cli">Aguardando cliente</option>
            <option value="org">Aguardando órgão</option>
            <option value="set">Aguardando setor</option>
            <option value="conc">Concluído</option>
          </select>

          <div style={{ display: 'flex', background: '#26262A', borderRadius: '6px', padding: '2px' }}>
            <button
              onClick={() => setViewMode('lista')}
              style={{
                border: 'none',
                background: viewMode === 'lista' ? '#1A1A1D' : 'transparent',
                color: viewMode === 'lista' ? '#FFFFFF' : '#A1A1AA',
                padding: '4px 10px',
                borderRadius: '4px',
                fontWeight: 500
              }}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('quadro')}
              style={{
                border: 'none',
                background: viewMode === 'quadro' ? '#1A1A1D' : 'transparent',
                color: viewMode === 'quadro' ? '#FFFFFF' : '#A1A1AA',
                padding: '4px 10px',
                borderRadius: '4px',
                fontWeight: 500
              }}
            >
              Quadro (Kanban)
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ padding: '32px', color: '#8E8E96' }}>Carregando processos...</div>
      ) : viewMode === 'lista' ? (
        <div style={{ background: '#1A1A1D', border: '1px solid #2E2E33', borderRadius: '10px', overflow: 'hidden' }}>
          {processos.map((p) => (
            <div
              key={p.id}
              onClick={() => onOpenProc(p.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 220px 1.5fr 140px 100px 90px',
                padding: '12px 16px',
                borderBottom: '1px solid #26262A',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '12px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#202024')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontWeight: 600, color: 'var(--accent-light)' }}>{p.id}</span>
              <div>
                <div style={{ fontWeight: 500, color: '#FFFFFF' }}>{p.clienteNome}</div>
                <div style={{ fontSize: '11px', color: '#8E8E96' }}>{p.cnpj}</div>
              </div>
              <div>
                <div style={{ color: '#F4F4F5' }}>{p.proximaAcao || 'Sem ação definida'}</div>
                <div style={{ fontSize: '11px', color: '#8E8E96' }}>{p.codigoProcedimento}. {p.titulo}</div>
              </div>
              <div style={{ fontSize: '12px', color: '#A1A1AA' }}>
                Resp: <strong style={{ color: '#FFFFFF' }}>{p.responsavel}</strong>
              </div>
              <div style={{ fontSize: '12px', color: '#A1A1AA' }}>{p.prazoInterno || '—'}</div>
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '5px',
                background: '#26262A',
                textAlign: 'center',
                color: '#D4D4D8'
              }}>
                {p.situacao}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* Kanban Board */
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px' }}>
          {colunasKanban.map((col) => {
            const colProcs = processos.filter((p) => p.situacao === col.key);
            return (
              <div
                key={col.key}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const id = e.dataTransfer.getData('text/plain');
                  if (id) handleDrop(id, col.key);
                }}
                style={{
                  width: '260px',
                  flexShrink: 0,
                  background: '#141416',
                  borderRadius: '10px',
                  border: '1px solid #26262A',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  minHeight: '400px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '13px', color: '#FFFFFF', padding: '4px 6px' }}>
                  <span>{col.label}</span>
                  <span style={{ color: '#8E8E96' }}>{colProcs.length}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {colProcs.map((p) => (
                    <div
                      key={p.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', p.id)}
                      onClick={() => onOpenProc(p.id)}
                      style={{
                        background: '#1A1A1D',
                        border: '1px solid #2E2E33',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        cursor: 'grab'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{p.id}</span>
                        <span style={{ color: '#8E8E96' }}>{p.prazoInterno}</span>
                      </div>
                      <div style={{ fontWeight: 500, fontSize: '13px', color: '#FFFFFF' }}>{p.clienteNome}</div>
                      <div style={{ fontSize: '12px', color: '#D4D4D8' }}>{p.proximaAcao}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
