import React from 'react';

export type ScreenId =
  | 'painel'
  | 'demandas'
  | 'processos'
  | 'ficha'
  | 'parc'
  | 'dte'
  | 'venc'
  | 'clientes'
  | 'biblioteca'
  | 'portais'
  | 'relatorios'
  | 'config';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  openCount: number;
  novasCount: number;
  dtePendingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  openCount,
  novasCount,
  dtePendingCount
}) => {
  const navItems = [
    { id: 'painel' as ScreenId, label: 'Painel', count: 0 },
    { id: 'demandas' as ScreenId, label: 'Demandas', count: novasCount },
    { id: 'processos' as ScreenId, label: 'Processos', count: openCount },
    { id: 'rotinas_header' as any, label: 'Rotinas', isHeader: true },
    { id: 'parc' as ScreenId, label: 'Parcelamentos e guias', count: 0, sub: true },
    { id: 'dte' as ScreenId, label: 'DTE e comunicações', count: dtePendingCount, sub: true },
    { id: 'venc' as ScreenId, label: 'Vencimentos', count: 0, sub: true },
    { id: 'clientes' as ScreenId, label: 'Clientes', count: 0 },
    { id: 'biblioteca' as ScreenId, label: 'Biblioteca', count: 0 },
    { id: 'portais' as ScreenId, label: 'Diretório de portais', count: 0 },
    { id: 'relatorios' as ScreenId, label: 'Relatórios', count: 0 },
    { id: 'config' as ScreenId, label: 'Configurações', count: 0 }
  ];

  return (
    <aside style={{
      width: '220px',
      flexShrink: 0,
      background: '#141416',
      borderRight: '1px solid #26262A',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '16px 16px 14px',
        borderBottom: '1px solid #26262A',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{
          width: '26px',
          height: '26px',
          borderRadius: '5px',
          background: 'var(--accent)',
          flexShrink: 0
        }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em', color: '#FFFFFF' }}>
            Procuradoria
          </div>
          <div style={{ fontSize: '11px', color: '#6B6B73' }}>
            Officecon · Salvador/BA
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, overflowY: 'auto' }}>
        {navItems.map((item, idx) => {
          if ((item as any).isHeader) {
            return (
              <div key={idx} style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#6B6B73',
                padding: '8px 10px 2px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {item.label}
              </div>
            );
          }

          const active = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                border: 'none',
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? '#FFFFFF' : '#D4D4D8',
                fontWeight: active ? 600 : 400,
                textAlign: 'left',
                padding: (item as any).sub ? '7px 10px 7px 22px' : '7px 10px',
                borderRadius: '6px',
                fontSize: '13px',
                transition: 'background 0.1s'
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = '#232327';
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span>{item.label}</span>
              {(item.count ?? 0) > 0 && (
                <span style={{
                  fontSize: '11px',
                  color: '#E4E4E7',
                  background: active ? '#8B0A1F' : '#2E2E33',
                  borderRadius: '10px',
                  padding: '0 7px',
                  lineHeight: '18px'
                }}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid #26262A',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'var(--accent)',
          color: '#FFFFFF',
          fontSize: '11px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          MS
        </span>
        <div>
          <div style={{ fontWeight: 500, color: '#FFFFFF', fontSize: '13px' }}>Matheus Silva</div>
          <div style={{ fontSize: '11px', color: '#6B6B73' }}>Procuradoria</div>
        </div>
      </div>
    </aside>
  );
};
