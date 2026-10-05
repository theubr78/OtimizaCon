import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface FichaProcessoViewProps {
  procId: string;
  onBack: () => void;
}

export const FichaProcessoView: React.FC<FichaProcessoViewProps> = ({ procId, onBack }) => {
  const [proc, setProc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tempo' | 'prot' | 'guias' | 'vinc'>('tempo');
  const [novaNota, setNovaNota] = useState('');
  const [tipoNota, setTipoNota] = useState('Nota');
  const [provaNota, setProvaNota] = useState<'fato' | 'relato'>('relato');

  const carregar = async () => {
    try {
      setLoading(true);
      const res = await api.getProcesso(procId);
      setProc(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, [procId]);

  if (loading || !proc) {
    return <div style={{ padding: '32px', color: '#8E8E96' }}>Carregando ficha do processo...</div>;
  }

  const handleSalvarNota = async () => {
    if (!novaNota.trim()) return;
    try {
      await fetch(`http://localhost:3001/api/processos/${procId}/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: tipoNota,
          descricao: novaNota.trim(),
          prova: provaNota,
          autor: 'Matheus Silva'
        })
      });
      setNovaNota('');
      carregar();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMudarSituacao = async (sit: string) => {
    try {
      await api.mudarSituacao(procId, {
        situacao: sit,
        motivo: 'Atualizado pela ficha'
      });
      carregar();
    } catch (err) {
      console.error(err);
    }
  };

  const etapas = [
    '1. Solicitação e escopo',
    '2. Viabilidade e DBE',
    '3. Documentação',
    '4. Assinaturas e protocolo',
    '5. CNPJ e regularização',
    '6. Conclusão'
  ];

  return (
    <div style={{ padding: '24px 28px', maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Back button & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8E8E96' }}>
        <button onClick={onBack} style={{ border: 'none', background: 'none', color: 'var(--accent-light)', padding: 0 }}>
          ← Processos
        </button>
        <span>/</span>
        <span>{proc.id}</span>
        <span>/</span>
        <span style={{ color: '#FFFFFF' }}>{proc.clienteNome}</span>
      </div>

      {/* Process Header */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px', fontWeight: 600 }}>{proc.id} · {proc.titulo}</span>
              <span style={{
                background: 'var(--accent-surface)',
                color: 'var(--accent-light)',
                border: '1px solid var(--accent-border)',
                padding: '2px 8px',
                borderRadius: '5px',
                fontWeight: 600,
                fontSize: '11px'
              }}>
                {proc.situacao.toUpperCase()}
              </span>
            </div>
            <div style={{ color: '#A1A1AA', fontSize: '13px', marginTop: '4px' }}>
              Cliente: <strong style={{ color: '#FFFFFF' }}>{proc.clienteNome}</strong> · CNPJ: {proc.cnpj} · {proc.estabelecimento}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => handleMudarSituacao('and')} className="btn-secondary">
              Em andamento
            </button>
            <button onClick={() => handleMudarSituacao('cli')} className="btn-secondary">
              Aguardando cliente
            </button>
            <button onClick={() => handleMudarSituacao('conc')} className="btn-primary">
              Concluir processo
            </button>
          </div>
        </div>

        {/* Next action box */}
        <div style={{
          background: '#202024',
          border: '1px solid #2E2E33',
          borderRadius: '8px',
          padding: '12px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#8E8E96', fontWeight: 600 }}>PRÓXIMA AÇÃO</div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF', marginTop: '2px' }}>
              {proc.proximaAcao || 'Nenhuma próxima ação definida'}
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#A1A1AA' }}>
            Prazo interno: <strong style={{ color: '#FFFFFF' }}>{proc.prazoInterno || '—'}</strong> · Resp: <strong style={{ color: '#FFFFFF' }}>{proc.responsavel}</strong>
          </div>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingTop: '8px' }}>
          {etapas.map((etapa, idx) => {
            const isDone = idx + 1 < proc.etapaAtual;
            const isCurrent = idx + 1 === proc.etapaAtual;
            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  background: isCurrent ? '#26262A' : '#141416',
                  border: isCurrent ? '1px solid var(--accent)' : '1px solid #2E2E33',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span style={{ fontSize: '11px', color: isCurrent ? 'var(--accent-light)' : '#8E8E96', fontWeight: 600 }}>
                  {isDone ? '✓ ' : ''}Etapa {idx + 1}
                </span>
                <span style={{ fontSize: '12px', color: isCurrent ? '#FFFFFF' : '#D4D4D8', fontWeight: isCurrent ? 500 : 400 }}>
                  {etapa.split('. ')[1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Tabs Area */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #26262A', paddingBottom: '8px' }}>
          {(['tempo', 'prot', 'guias', 'vinc'] as const).map((tab) => {
            const labels = {
              tempo: 'Linha do tempo',
              prot: 'Protocolos',
              guias: 'Guias e taxas',
              vinc: 'Processos vinculados'
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: 'none',
                  background: 'none',
                  color: activeTab === tab ? 'var(--accent-light)' : '#A1A1AA',
                  fontWeight: activeTab === tab ? 600 : 400,
                  borderBottom: activeTab === tab ? '2px solid var(--accent-light)' : 'none',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {activeTab === 'tempo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* New Note Form */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                value={novaNota}
                onChange={(e) => setNovaNota(e.target.value)}
                placeholder="Registrar nota, protocolo ou relato na linha do tempo..."
                style={{ flex: 1, height: '34px' }}
              />
              <select value={tipoNota} onChange={(e) => setTipoNota(e.target.value)} style={{ height: '34px' }}>
                <option value="Nota">Nota</option>
                <option value="Contato com cliente">Contato com cliente</option>
                <option value="Protocolo">Protocolo</option>
                <option value="Exigência">Exigência</option>
                <option value="Decisão">Decisão</option>
                <option value="Pagamento">Pagamento</option>
              </select>
              <select value={provaNota} onChange={(e) => setProvaNota(e.target.value as any)} style={{ height: '34px' }}>
                <option value="relato">Relato</option>
                <option value="fato">Fato comprovado</option>
              </select>
              <button onClick={handleSalvarNota} className="btn-primary">
                Salvar
              </button>
            </div>

            {/* Timeline Stream */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { data: '02/10/2026', hora: '09:40', autor: 'Matheus Silva', tipo: 'Mudança de situação', desc: 'Situação → Aguardando cliente. Falta: assinatura de Jales Consultoria.', prova: 'auto' },
                { data: '30/09/2026', hora: '16:05', autor: 'Matheus Silva', tipo: 'Pagamento', desc: 'DAE da taxa JUCEB (R$ 241,47) enviado ao cliente.', prova: 'fato' },
                { data: '29/09/2026', hora: '11:22', autor: 'Matheus Silva', tipo: 'Contato com cliente', desc: 'Cliente aprovou a minuta por WhatsApp.', prova: 'fato' }
              ].map((ev, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: '8px', borderBottom: '1px solid #26262A' }}>
                  <div style={{ fontSize: '11px', color: '#8E8E96', width: '90px' }}>
                    {ev.data} {ev.hora}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{ev.autor}</span>
                      <span style={{ fontSize: '11px', color: '#A1A1AA' }}>· {ev.tipo}</span>
                      {ev.prova === 'fato' && (
                        <span style={{ fontSize: '10px', background: '#13301F', color: '#6FD69B', padding: '1px 6px', borderRadius: '4px' }}>
                          Fato comprovado
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: '#D4D4D8', marginTop: '3px' }}>{ev.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== 'tempo' && (
          <div style={{ padding: '20px', color: '#8E8E96', textAlign: 'center' }}>
            Conteúdo da aba carregado com sucesso.
          </div>
        )}
      </div>
    </div>
  );
};
