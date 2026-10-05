import React, { useState } from 'react';
import { api } from '../services/api';

interface NovaDemandaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const NovaDemandaModal: React.FC<NovaDemandaModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [clienteNome, setClienteNome] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('Matriz');
  const [solicitante, setSolicitante] = useState('');
  const [canal, setCanal] = useState<'WhatsApp' | 'E-mail' | 'DTE' | 'Telefone' | 'Interno'>('WhatsApp');
  const [dataRecebimento, setDataRecebimento] = useState('02/10/2026');
  const [descricao, setDescricao] = useState('');
  const [anexos, setAnexos] = useState('');

  // Step 2
  const [selectedProcs, setSelectedProcs] = useState<string[]>(['05']);
  const [responsavel, setResponsavel] = useState('Matheus');
  const [prazoInterno, setPrazoInterno] = useState('16/10/2026');
  const [proximaAcao, setProximaAcao] = useState('Coletar documentos com o cliente');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (!clienteNome.trim()) {
      setError('Informe o cliente.');
      return;
    }
    if (!descricao.trim()) {
      setError('Informe a descrição do pedido.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSave = async () => {
    if (selectedProcs.length === 0) {
      setError('Escolha pelo menos um procedimento.');
      return;
    }
    if (!proximaAcao.trim()) {
      setError('Defina a primeira próxima ação — todo processo aberto precisa de uma.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.criarDemanda({
        clienteNome: clienteNome.trim(),
        estabelecimento,
        solicitante: solicitante.trim() || '—',
        canal,
        dataRecebimento,
        descricao: descricao.trim(),
        anexos: anexos.trim(),
        procedimentos: selectedProcs.map((code) => ({
          codigoProcedimento: code,
          titulo: code === '05' ? 'Alteração contratual' : 'Procedimento cadastral',
          responsavel,
          prazoInterno,
          proximaAcao: proximaAcao.trim()
        }))
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar demanda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(14, 14, 16, 0.75)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: '#1A1A1D',
        border: '1px solid #2E2E33',
        borderRadius: '12px',
        width: 'min(760px, 100%)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #26262A',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Nova demanda</div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#A1A1AA', marginTop: '4px' }}>
              <span style={{ color: step === 1 ? 'var(--accent-light)' : '#A1A1AA', fontWeight: step === 1 ? 600 : 400 }}>
                1. Pedido recebido
              </span>
              <span>›</span>
              <span style={{ color: step === 2 ? 'var(--accent-light)' : '#A1A1AA', fontWeight: step === 2 ? 600 : 400 }}>
                2. Gerar processos
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '20px', color: '#8E8E96' }}>
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {error && (
            <div style={{ background: '#3A1414', border: '1px solid #6B2222', color: '#FF6B6B', padding: '8px 12px', borderRadius: '6px' }}>
              {error}
            </div>
          )}

          {step === 1 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 500 }}>Cliente *</span>
                  <input
                    value={clienteNome}
                    onChange={(e) => setClienteNome(e.target.value)}
                    placeholder="Ex: Atlântico Distribuidora Ltda"
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 500 }}>Estabelecimento</span>
                  <select value={estabelecimento} onChange={(e) => setEstabelecimento(e.target.value)}>
                    <option value="Matriz">Matriz</option>
                    <option value="Filial Camaçari">Filial Camaçari</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 500 }}>Solicitante</span>
                  <input
                    value={solicitante}
                    onChange={(e) => setSolicitante(e.target.value)}
                    placeholder="Nome do contato"
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 500 }}>Canal</span>
                  <select value={canal} onChange={(e) => setCanal(e.target.value as any)}>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="E-mail">E-mail</option>
                    <option value="DTE">DTE</option>
                    <option value="Telefone">Telefone</option>
                    <option value="Interno">Interno</option>
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 500 }}>Data</span>
                  <input
                    value={dataRecebimento}
                    onChange={(e) => setDataRecebimento(e.target.value)}
                  />
                </label>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: 500 }}>Descrição do pedido *</span>
                <textarea
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva exatamente o que o cliente solicitou..."
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: 500 }}>Anexos / Link</span>
                <input
                  value={anexos}
                  onChange={(e) => setAnexos(e.target.value)}
                  placeholder="Link do Dropbox, conversa ou e-mail"
                />
              </label>
            </>
          ) : (
            <>
              <div style={{ fontSize: '13px', color: '#A1A1AA' }}>
                Cliente: <strong style={{ color: '#FFFFFF' }}>{clienteNome}</strong> · Pedido: {descricao}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontWeight: 600 }}>Procedimentos Selecionados:</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { code: '03', label: '03. Abrir empresa matriz' },
                    { code: '05', label: '05. Alteração contratual' },
                    { code: '12', label: '12. Alvará de funcionamento' },
                    { code: '18', label: '18. Certidões federais/estaduais' },
                    { code: '24', label: '24. Parcelamento estadual PAF' }
                  ].map((p) => {
                    const isSel = selectedProcs.includes(p.code);
                    return (
                      <button
                        key={p.code}
                        type="button"
                        onClick={() => {
                          setSelectedProcs((prev) =>
                            prev.includes(p.code) ? prev.filter((x) => x !== p.code) : [...prev, p.code]
                          );
                        }}
                        style={{
                          background: isSel ? 'var(--accent-surface)' : '#26262A',
                          border: isSel ? '1px solid var(--accent)' : '1px solid #3A3A40',
                          color: isSel ? 'var(--accent-light)' : '#D4D4D8',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontWeight: isSel ? 600 : 400
                        }}
                      >
                        {isSel ? '✓ ' : ''}{p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 500 }}>Responsável</span>
                  <select value={responsavel} onChange={(e) => setResponsavel(e.target.value)}>
                    <option value="Matheus">Matheus Silva</option>
                    <option value="Ana">Ana Ribeiro</option>
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 500 }}>Prazo Interno Sugerido</span>
                  <input value={prazoInterno} onChange={(e) => setPrazoInterno(e.target.value)} />
                </label>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: 500 }}>Primeira próxima ação *</span>
                <input
                  value={proximaAcao}
                  onChange={(e) => setProximaAcao(e.target.value)}
                  placeholder="Ação imediata necessária para o processo"
                />
              </label>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid #26262A',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px'
        }}>
          {step === 1 ? (
            <>
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancelar
              </button>
              <button type="button" onClick={handleNext} className="btn-primary">
                Avançar: gerar processos
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setStep(1)} className="btn-secondary">
                Voltar
              </button>
              <button type="button" onClick={handleSave} disabled={loading} className="btn-primary">
                {loading ? 'Criando...' : `Criar ${selectedProcs.length} ${selectedProcs.length === 1 ? 'processo' : 'processos'}`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
