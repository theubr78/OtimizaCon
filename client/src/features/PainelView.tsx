import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface PainelViewProps {
  onOpenProc: (id: string) => void;
  onNavigateRotina: (screen: 'parc' | 'dte' | 'venc') => void;
}

export const PainelView: React.FC<PainelViewProps> = ({ onOpenProc, onNavigateRotina }) => {
  const [modo, setModo] = useState<'meu' | 'equipe'>('meu');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const carregarPainel = async () => {
    try {
      setLoading(true);
      const res = await api.getPainel(modo);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPainel();
  }, [modo]);

  if (loading || !data) {
    return <div style={{ padding: '32px', color: '#8E8E96' }}>Carregando dados do painel...</div>;
  }

  const situacaoLabels: Record<string, { label: string; dot: string; fg: string }> = {
    nao: { label: 'Não iniciado', dot: '#6B6B73', fg: '#C4C4CC' },
    and: { label: 'Em andamento', dot: '#2F6FC0', fg: '#7DB2F0' },
    cli: { label: 'Aguardando cliente', dot: '#D98A0B', fg: '#F2B25C' },
    org: { label: 'Aguardando órgão', dot: '#7C4DDB', fg: '#B79CF5' },
    set: { label: 'Aguardando setor', dot: '#1395B0', fg: '#6FD3E6' },
    conc: { label: 'Concluído', dot: '#2E9E5B', fg: '#6FD69B' }
  };

  return (
    <div style={{ padding: '24px 28px', maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 600 }}>Bom dia, Matheus</div>
          <div style={{ color: '#A1A1AA', fontSize: '13px', marginTop: '2px' }}>sexta-feira, 02/10/2026</div>
        </div>

        <div style={{ display: 'flex', background: '#26262A', borderRadius: '7px', padding: '2px' }}>
          <button
            onClick={() => setModo('meu')}
            style={{
              border: 'none',
              background: modo === 'meu' ? '#1A1A1D' : 'transparent',
              color: modo === 'meu' ? '#FFFFFF' : '#A1A1AA',
              padding: '6px 14px',
              borderRadius: '5px',
              fontWeight: 500
            }}
          >
            Meus processos
          </button>
          <button
            onClick={() => setModo('equipe')}
            style={{
              border: 'none',
              background: modo === 'equipe' ? '#1A1A1D' : 'transparent',
              color: modo === 'equipe' ? '#FFFFFF' : '#A1A1AA',
              padding: '6px 14px',
              borderRadius: '5px',
              fontWeight: 500
            }}
          >
            Equipe
          </button>
        </div>
      </div>

      {/* Counters Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        {Object.entries(data.contadores || {}).map(([key, val]) => {
          const meta = situacaoLabels[key];
          if (!meta) return null;
          return (
            <div
              key={key}
              style={{
                background: '#1A1A1D',
                border: '1px solid #2E2E33',
                borderRadius: '8px',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A1A1AA', fontSize: '12px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: meta.dot }} />
                {meta.label}
              </span>
              <span style={{ fontSize: '24px', fontWeight: 600, color: meta.fg }}>
                {Number(val)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Fila & Side Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(300px, 1fr)', gap: '18px', alignItems: 'start' }}>
        {/* Fila de Hoje */}
        <section style={{ background: '#1A1A1D', border: '1px solid #2E2E33', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 16px', borderBottom: '1px solid #26262A' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Minha fila de hoje</div>
            <div style={{ color: '#8E8E96', fontSize: '12px' }}>{data.fila?.length || 0} processos · ordenados por prazo</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(data.fila || []).map((p: any) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: '1px solid #26262A',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: '1 1 200px' }}>
                  <div style={{ fontWeight: 500, color: '#FFFFFF' }}>{p.clienteNome}</div>
                  <div style={{ color: '#8E8E96', fontSize: '12px' }}>{p.id} · {p.codigoProcedimento}. {p.titulo}</div>
                </div>

                <div style={{ flex: '2 1 220px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontWeight: 500, color: '#F4F4F5' }}>{p.proximaAcao || 'Sem próxima ação'}</span>
                  {p.prazoInterno && (
                    <span style={{ fontSize: '11px', color: '#A1A1AA' }}>Prazo: {p.prazoInterno}</span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => onOpenProc(p.id)} className="btn-secondary" style={{ fontSize: '12px' }}>
                    Abrir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Rotinas */}
          <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Rotinas de hoje</div>
            <button
              onClick={() => onNavigateRotina('parc')}
              style={{
                background: '#202024',
                border: '1px solid #2E2E33',
                borderRadius: '8px',
                padding: '10px 12px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500 }}>Parcelamentos do mês</span>
                <span style={{ color: '#A1A1AA' }}>8/8 acordos</span>
              </div>
              <div style={{ height: '4px', background: '#2E2E33', borderRadius: '2px', marginTop: '8px' }}>
                <div style={{ height: '4px', background: 'var(--accent-light)', width: '60%' }} />
              </div>
            </button>

            <button
              onClick={() => onNavigateRotina('dte')}
              style={{
                background: '#202024',
                border: '1px solid #2E2E33',
                borderRadius: '8px',
                padding: '10px 12px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500 }}>DTE e comunicações</span>
                <span style={{ color: '#A1A1AA' }}>11/14 caixas</span>
              </div>
              <div style={{ height: '4px', background: '#2E2E33', borderRadius: '2px', marginTop: '8px' }}>
                <div style={{ height: '4px', background: 'var(--accent-light)', width: '78%' }} />
              </div>
            </button>
          </section>

          {/* Parados há mais tempo */}
          <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Parados há mais tempo</div>
            {(data.parados || []).map((p: any) => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '8px', borderBottom: '1px solid #26262A' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--accent-light)', fontWeight: 500 }}>
                    Parado há {p.diasParado} dias
                  </span>
                  <button onClick={() => onOpenProc(p.id)} style={{ border: 'none', background: 'none', color: '#A1A1AA', fontSize: '11px' }}>
                    Abrir {p.id}
                  </button>
                </div>
                <div style={{ fontWeight: 500, color: '#FFFFFF' }}>{p.clienteNome}</div>
                <div style={{ fontSize: '11px', color: '#8E8E96' }}>{p.motivoAguardando || 'Aguardando ação'}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};
