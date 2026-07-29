import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import VisualizerCanvas from './components/VisualizerCanvas';
import CodePanel from './components/CodePanel';
import TestatTrainerPanel from './components/TestatTrainerPanel';
import ControlsFooter from './components/ControlsFooter';
import { ALGORITHM_DATA, generateAlgoSteps, generateRandomData, getDefaultData } from './data/algorithms';

export default function App() {
  const [category, setCategory] = useState('tree');
  const [algoKey, setAlgoKey] = useState('avl');
  const [rawData, setRawData] = useState([40, 20, 60, 10, 30, 25]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedVal, setSpeedVal] = useState(5);
  const [kParam, setKParam] = useState(2);

  // Galles Style Input States
  const [insertVal, setInsertVal] = useState('');
  const [deleteVal, setDeleteVal] = useState('');
  const [findVal, setFindVal] = useState('');

  // Draggable Sidebar Resizing State
  const [sidebarWidth, setSidebarWidth] = useState(480);
  const isDraggingRef = useRef(false);

  // Initial load
  useEffect(() => {
    const fixedData = getDefaultData(algoKey);
    setRawData(fixedData);
    const generatedSteps = generateAlgoSteps(algoKey, fixedData, { k: kParam });
    setSteps(generatedSteps);
    setStepIndex(0);
  }, []);

  // Handle Dragging Resizer
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 280 && newWidth <= 850) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDownResizer = () => {
    isDraggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  // Category switch
  const handleSwitchCategory = (newCat) => {
    setCategory(newCat);
    setIsPlaying(false);

    let defaultAlgo = 'hybridsort';
    if (newCat === 'tree') defaultAlgo = 'avl';
    else if (newCat === 'graph') defaultAlgo = 'dijkstra';

    setAlgoKey(defaultAlgo);
    const fixedData = getDefaultData(defaultAlgo);
    setRawData(fixedData);
    const newSteps = generateAlgoSteps(defaultAlgo, fixedData, { k: kParam });
    setSteps(newSteps);
    setStepIndex(0);
  };

  // Algo change
  const handleAlgoChange = (newAlgo) => {
    setAlgoKey(newAlgo);
    setIsPlaying(false);
    const fixedData = getDefaultData(newAlgo);
    setRawData(fixedData);
    const newSteps = generateAlgoSteps(newAlgo, fixedData, { k: kParam });
    setSteps(newSteps);
    setStepIndex(0);
  };

  // Generate new random data
  const handleGenerateNewData = () => {
    setIsPlaying(false);
    const newData = generateRandomData(category);
    setRawData(newData);
    const newSteps = generateAlgoSteps(algoKey, newData, { k: kParam });
    setSteps(newSteps);
    setStepIndex(0);
  };

  // Reset animation
  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };

  // Playback timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      const delay = 1100 - (speedVal * 100);
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, speedVal, steps.length]);

  // Galles Action Handlers
  const handleInsertNode = () => {
    const val = parseInt(insertVal.trim());
    if (isNaN(val)) return;

    setIsPlaying(false);
    let updatedData = Array.isArray(rawData) ? [...rawData] : [val];
    if (!updatedData.includes(val)) updatedData.push(val);

    setRawData(updatedData);
    setInsertVal('');
    const newSteps = generateAlgoSteps(algoKey, updatedData, { k: kParam });
    setSteps(newSteps);
    setStepIndex(newSteps.length - 1);
  };

  const handleDeleteNode = () => {
    const val = parseInt(deleteVal.trim());
    if (isNaN(val)) return;

    setIsPlaying(false);
    if (Array.isArray(rawData)) {
      const updatedData = rawData.filter(v => v !== val);
      setRawData(updatedData);
      setDeleteVal('');
      const newSteps = generateAlgoSteps(algoKey, updatedData, { k: kParam });
      setSteps(newSteps);
      setStepIndex(0);
    }
  };

  const handleFindNode = () => {
    const val = parseInt(findVal.trim());
    if (isNaN(val)) return;

    setIsPlaying(false);
    const searchStepIdx = steps.findIndex(s => s.highlightNode === val);
    if (searchStepIdx >= 0) {
      setStepIndex(searchStepIdx);
    }
    setFindVal('');
  };

  const currentStep = steps[stepIndex] || null;
  const currentAlgoDef = ALGORITHM_DATA[algoKey] || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#090d16' }}>
      <Header currentCategory={category} onSwitchCategory={handleSwitchCategory} />

      <main style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Left Column: Visualizer Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0b1120', overflow: 'hidden' }}>

          {/* Top Toolbar */}
          <div style={{
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderBottom: '1px solid #1e293b',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                Algorithmus:
              </label>
              <select
                value={algoKey}
                onChange={(e) => handleAlgoChange(e.target.value)}
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  color: '#f8fafc',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              >
                {category === 'sort' && (
                  <>
                    <option value="hybridsort">HybridSort (Quick + MergeSort)</option>
                    <option value="radixsort">RadixSort (LSD Bucket Sort)</option>
                  </>
                )}
                {category === 'tree' && (
                  <>
                    <option value="avl">AVL Tree (USFCA Galles Style)</option>
                    <option value="splay">Splay Tree (Zig / Zig-Zig)</option>
                    <option value="rbtree">Red-Black Tree (4 Rules)</option>
                  </>
                )}
                {category === 'graph' && (
                  <>
                    <option value="dijkstra">Dijkstra (Shortest Paths)</option>
                    <option value="bellmanford">Bellman-Ford (Negative Cycle)</option>
                    <option value="kruskal">Kruskal (MST & Union-Find)</option>
                  </>
                )}
              </select>
            </div>

            {/* Galles Controls: [ Insert ] [ Delete ] [ Find ] */}
            {category === 'tree' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input
                    type="text"
                    placeholder="Wert"
                    value={insertVal}
                    onChange={(e) => setInsertVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInsertNode()}
                    style={{ width: '65px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', fontSize: '13px' }}
                  />
                  <button onClick={handleInsertNode} style={{ padding: '6px 12px', backgroundColor: '#0284c7', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Insert
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                  <input
                    type="text"
                    placeholder="Wert"
                    value={deleteVal}
                    onChange={(e) => setDeleteVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDeleteNode()}
                    style={{ width: '65px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', fontSize: '13px' }}
                  />
                  <button onClick={handleDeleteNode} style={{ padding: '6px 12px', backgroundColor: '#e11d48', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                  <input
                    type="text"
                    placeholder="Wert"
                    value={findVal}
                    onChange={(e) => setFindVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFindNode()}
                    style={{ width: '65px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', fontSize: '13px' }}
                  />
                  <button onClick={handleFindNode} style={{ padding: '6px 12px', backgroundColor: '#d97706', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Find
                  </button>
                </div>
              </div>
            )}

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              <button
                onClick={handleReset}
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  color: '#f8fafc',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                🔄 Reset
              </button>

              <button
                onClick={handleGenerateNewData}
                style={{
                  backgroundColor: '#38bdf8',
                  border: 'none',
                  color: '#000',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🎲 Neue Zufallsdaten
              </button>
            </div>
          </div>

          <VisualizerCanvas currentStep={currentStep} algoKey={algoKey} rawData={rawData} />

          <ControlsFooter
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onStepForward={() => { setIsPlaying(false); setStepIndex(prev => Math.min(prev + 1, steps.length - 1)); }}
            onStepBackward={() => { setIsPlaying(false); setStepIndex(prev => Math.max(prev - 1, 0)); }}
            onReset={handleReset}
            onGenerateData={handleGenerateNewData}
            speed={speedVal}
            onSpeedChange={setSpeedVal}
          />
        </div>

        {/* Draggable Vertical Splitter Handle */}
        <div
          onMouseDown={handleMouseDownResizer}
          title="Drag to resize sidebar"
          style={{
            width: '7px',
            backgroundColor: '#1e293b',
            cursor: 'col-resize',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '1px solid #334155',
            borderRight: '1px solid #334155',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#38bdf8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
        >
          <div style={{ width: '2px', height: '24px', backgroundColor: '#94a3b8', borderRadius: '1px' }} />
        </div>

        {/* Right Column: Resizable Sidebar */}
        <div style={{
          width: `${sidebarWidth}px`,
          backgroundColor: '#1e293b',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <CodePanel
            codeLines={currentAlgoDef.code || []}
            fileName={currentAlgoDef.file || 'Algorithm.java'}
            activeLineIndex={currentStep?.codeLine !== undefined ? currentStep.codeLine : -1}
          />

          <TestatTrainerPanel
            stepIndex={stepIndex}
            totalSteps={steps.length}
            stepLog={currentStep?.log || 'Klicke auf Start oder verwende [ Insert ], um die Galles-Animation zu starten.'}
            question={currentStep?.q || 'Welche Eigenschaften besitzt der AVL-Baum?'}
            answer={currentStep?.a || 'Ein AVL-Baum hält durch automatisches Rotieren nach jedem Einfügen/Löschen die Höhenbalance aufrecht (|BF| <= 1).'}
          />
        </div>
      </main>
    </div>
  );
}
