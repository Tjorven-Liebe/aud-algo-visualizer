import React from 'react';
import { Github } from 'lucide-react';

export default function Header({ currentCategory, onSwitchCategory }) {
  return (
    <header style={{
      backgroundColor: 'rgba(30, 41, 59, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1e293b',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '18px',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
        }}>
          AuD
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            Algorithmen Visualisierer & Testat-Trainer
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Cormen (CLRS) & Praktikumsabgaben (P1, P2, P3)
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          backgroundColor: '#090d16',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid #1e293b'
        }}>
          <button
            onClick={() => onSwitchCategory('sort')}
            style={tabBtnStyle(currentCategory === 'sort')}
          >
            📊 P1: Sortieralgorithmen
          </button>
          <button
            onClick={() => onSwitchCategory('tree')}
            style={tabBtnStyle(currentCategory === 'tree')}
          >
            🌲 P2: Baumnavigation & Balancierung
          </button>
          <button
            onClick={() => onSwitchCategory('graph')}
            style={tabBtnStyle(currentCategory === 'graph')}
          >
            🕸️ P3: Graphen & Netzwerke
          </button>
        </div>

        {/* GitHub Link Button */}
        <a
          href="https://github.com/Tjorven-Liebe/aud-algo-visualizer"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#f8fafc',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#334155';
            e.currentTarget.style.borderColor = '#38bdf8';
            e.currentTarget.style.color = '#38bdf8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1e293b';
            e.currentTarget.style.borderColor = '#334155';
            e.currentTarget.style.color = '#f8fafc';
          }}
        >
          <Github size={16} />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}

function tabBtnStyle(isActive) {
  return {
    background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.2))' : 'transparent',
    border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : 'none',
    color: isActive ? '#38bdf8' : '#94a3b8',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: '7px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };
}
