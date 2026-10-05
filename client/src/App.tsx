import React, { useState, useEffect } from 'react';
import { Sidebar, ScreenId } from './components/Sidebar';
import { Header } from './components/Header';
import { NovaDemandaModal } from './components/NovaDemandaModal';
import { PainelView } from './features/PainelView';
import { ProcessosView } from './features/ProcessosView';
import { FichaProcessoView } from './features/FichaProcessoView';
import { api } from './services/api';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('painel');
  const [selectedProcId, setSelectedProcId] = useState<string>('P-101');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [stats, setStats] = useState({ openCount: 15, novasCount: 2, dtePending: 3 });

  const carregarStats = async () => {
    try {
      const p = await api.getPainel('meu');
      setStats({
        openCount: p.totalAbertos || 15,
        novasCount: p.novasDemandasQtd || 2,
        dtePending: 3
      });
    } catch (_) {}
  };

  useEffect(() => {
    carregarStats();
  }, []);

  const handleOpenProc = (id: string) => {
    setSelectedProcId(id);
    setCurrentScreen('ficha');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-app)' }}>
      {/* Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        openCount={stats.openCount}
        novasCount={stats.novasCount}
        dtePendingCount={stats.dtePending}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          onOpenNovaDemanda={() => setIsModalOpen(true)}
          onSearchClick={() => {}}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          {currentScreen === 'painel' && (
            <PainelView
              onOpenProc={handleOpenProc}
              onNavigateRotina={(rot) => setCurrentScreen(rot as ScreenId)}
            />
          )}

          {currentScreen === 'processos' && (
            <ProcessosView onOpenProc={handleOpenProc} />
          )}

          {currentScreen === 'ficha' && (
            <FichaProcessoView
              procId={selectedProcId}
              onBack={() => setCurrentScreen('processos')}
            />
          )}

          {currentScreen !== 'painel' && currentScreen !== 'processos' && currentScreen !== 'ficha' && (
            <div style={{ padding: '32px', textAlign: 'center', color: '#8E8E96' }}>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>
                Tela: {currentScreen.toUpperCase()}
              </div>
              <div>Módulo conectado e pronto para expansão. Dados servidos via API em <code>localhost:3001</code>.</div>
            </div>
          )}
        </main>
      </div>

      {/* Modal Nova Demanda */}
      <NovaDemandaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          carregarStats();
          setCurrentScreen('processos');
        }}
      />
    </div>
  );
};
