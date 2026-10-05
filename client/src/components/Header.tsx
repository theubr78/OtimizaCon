import React, { useRef, useEffect } from 'react';

interface HeaderProps {
  onOpenNovaDemanda: () => void;
  onSearchClick: () => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNovaDemanda,
  onSearchClick,
  searchValue,
  onSearchChange
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        searchInputRef.current?.focus();
        onSearchClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchClick]);

  return (
    <header style={{
      height: '52px',
      flexShrink: 0,
      background: '#141416',
      borderBottom: '1px solid #26262A',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '0 24px'
    }}>
      <div style={{ position: 'relative', flex: 1, maxWidth: '560px' }}>
        <input
          ref={searchInputRef}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onSearchClick}
          placeholder="Buscar cliente, CNPJ, protocolo, acordo ou PAF"
          style={{
            width: '100%',
            height: '34px',
            border: '1px solid #2E2E33',
            borderRadius: '7px',
            padding: '0 64px 0 12px',
            background: '#232327',
            color: '#FFFFFF',
            fontSize: '13px'
          }}
        />
        <span style={{
          position: 'absolute',
          right: '8px',
          top: '7px',
          fontSize: '11px',
          color: '#8E8E96',
          border: '1px solid #3A3A40',
          borderRadius: '4px',
          padding: '1px 5px',
          background: '#2E2E33',
          pointerEvents: 'none'
        }}>
          Ctrl K
        </span>
      </div>

      <div style={{ flex: 1 }} />

      <button
        onClick={onOpenNovaDemanda}
        className="btn-primary"
      >
        + Nova demanda
      </button>
    </header>
  );
};
