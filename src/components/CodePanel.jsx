import React from 'react';

export default function CodePanel({ codeLines, fileName, activeLineIndex }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #334155' }}>
      <div style={{
        padding: '12px 16px',
        fontSize: '13px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: '#38bdf8',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>💻 Quellcode / Pseudocode</span>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          padding: '3px 8px',
          borderRadius: '4px',
          backgroundColor: 'rgba(56, 189, 248, 0.2)',
          color: '#38bdf8'
        }}>
          {fileName}
        </span>
      </div>

      <div style={{
        fontFamily: "'Fira Code', monospace",
        fontSize: '13.5px',
        lineHeight: 1.6,
        backgroundColor: '#090d16',
        padding: '14px',
        maxHeight: '380px',
        overflowY: 'auto'
      }}>
        {codeLines.map((line, idx) => {
          const isActive = idx === activeLineIndex;
          return (
            <div
              key={idx}
              style={{
                padding: '3px 8px',
                borderRadius: '4px',
                whiteSpace: 'pre',
                color: isActive ? '#38bdf8' : '#94a3b8',
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                borderLeft: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}
