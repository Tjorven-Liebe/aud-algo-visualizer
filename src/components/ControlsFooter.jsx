import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle } from 'lucide-react';

export default function ControlsFooter({
  isPlaying,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  onGenerateData,
  speed,
  onSpeedChange
}) {
  return (
    <div style={{
      padding: '12px 20px',
      backgroundColor: '#131b2e',
      borderTop: '1px solid #1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={onTogglePlay}
          style={{
            background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
            border: 'none',
            color: '#000',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
          }}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          {isPlaying ? 'Pause' : 'Start'}
        </button>

        <button onClick={onStepBackward} className="btn-secondary">
          <SkipBack size={15} /> Schritt zurück
        </button>
        <button onClick={onStepForward} className="btn-secondary">
          <SkipForward size={15} /> Schritt vor
        </button>
        <button onClick={onReset} className="btn-secondary">
          <RotateCcw size={15} /> Zurücksetzen
        </button>
        <button onClick={onGenerateData} className="btn-secondary">
          <Shuffle size={15} /> Neue Daten
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
          Geschwindigkeit:
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          style={{ accentColor: '#38bdf8' }}
        />
        <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#f8fafc' }}>
          {(speed / 5).toFixed(1)}x
        </span>
      </div>

      <style>{`
        .btn-secondary {
          background-color: #1e293b;
          border: 1px solid #334155;
          color: #f8fafc;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .btn-secondary:hover {
          background-color: #334155;
          border-color: #38bdf8;
        }
      `}</style>
    </div>
  );
}
