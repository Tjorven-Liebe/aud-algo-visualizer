import React from 'react';

export default function TestatTrainerPanel({ stepIndex, totalSteps, stepLog, question, answer }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        padding: '12px 16px',
        fontSize: '13px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: '#f59e0b',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #334155'
      }}>
        <span>🎓 Testat-Erklärung & Tutor-Frage</span>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          padding: '3px 8px',
          borderRadius: '4px',
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          color: '#f59e0b'
        }}>
          Code-Verteidigung
        </span>
      </div>

      <div style={{
        flex: 1,
        padding: '18px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Step Log Box */}
        <div style={{
          fontSize: '14px',
          color: '#f8fafc',
          lineHeight: 1.5,
          backgroundColor: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          padding: '14px 16px',
          borderRadius: '8px'
        }}>
          <strong style={{ color: '#38bdf8' }}>Schritt {stepIndex + 1} von {totalSteps}:</strong> {stepLog}
        </div>

        {/* Tutor Quiz Card */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '10px',
          padding: '16px'
        }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px',
            letterSpacing: '0.5px'
          }}>
            ❓ MÖGLICHE TUTOR-FRAGE IM TESTAT
          </div>

          <div style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#f8fafc',
            marginBottom: '10px',
            lineHeight: 1.4
          }}>
            {question}
          </div>

          <div style={{
            fontSize: '14px',
            color: '#94a3b8',
            lineHeight: 1.6,
            borderTop: '1px solid #334155',
            paddingTop: '10px'
          }}>
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
