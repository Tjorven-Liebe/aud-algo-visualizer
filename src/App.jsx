import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import VisualizerCanvas from './components/VisualizerCanvas';
import CodePanel from './components/CodePanel';
import TestatTrainerPanel from './components/TestatTrainerPanel';
import ControlsFooter from './components/ControlsFooter';
import { ALGORITHM_DATA, generateAlgoSteps, generateRandomData, generateAdvancedExamData, getDefaultData } from './data/algorithms';

export default function App() {
  const [category, setCategory] = useState('tree');
  const [algoKey, setAlgoKey] = useState('avl');
  const [rawData, setRawData] = useState([40, 20, 60, 10, 30, 25]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedVal, setSpeedVal] = useState(5);
  const [kParam, setKParam] = useState(2);

  // Graph Start & Target Node Selector State
  const [startNode, setStartNode] = useState('A');
  const [targetNode, setTargetNode] = useState('F');

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
    const generatedSteps = generateAlgoSteps(algoKey, fixedData, { k: kParam, startNode, targetNode });
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

  // Helper to pick a non-direct target node for graph
  const pickNonDirectTarget = (nodesList, edgesList, start) => {
    if (!nodesList || nodesList.length <= 1) return start;
    const directNeighbors = new Set();
    (edgesList || []).forEach(e => {
      if (e.u === start) directNeighbors.add(e.v);
      if (e.v === start) directNeighbors.add(e.u);
    });

    const nonDirectNodes = nodesList.filter(n => n !== start && !directNeighbors.has(n));
    if (nonDirectNodes.length > 0) {
      return nonDirectNodes[nonDirectNodes.length - 1];
    }
    return nodesList[nodesList.length - 1];
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

    const nodesList = fixedData && fixedData.nodes ? fixedData.nodes : ['A', 'B', 'C', 'D', 'E', 'F'];
    const newStart = nodesList[0];
    const newTarget = pickNonDirectTarget(nodesList, fixedData.edges, newStart);
    setStartNode(newStart);
    setTargetNode(newTarget);

    const newSteps = generateAlgoSteps(defaultAlgo, fixedData, { k: kParam, startNode: newStart, targetNode: newTarget });
    setSteps(newSteps);
    setStepIndex(0);
  };

  // Algo change
  const handleAlgoChange = (newAlgo) => {
    setAlgoKey(newAlgo);
    setIsPlaying(false);
    const fixedData = getDefaultData(newAlgo);
    setRawData(fixedData);

    const nodesList = fixedData && fixedData.nodes ? fixedData.nodes : ['A', 'B', 'C', 'D', 'E', 'F'];
    const newStart = nodesList[0];
    const newTarget = pickNonDirectTarget(nodesList, fixedData.edges, newStart);
    setStartNode(newStart);
    setTargetNode(newTarget);

    const newSteps = generateAlgoSteps(newAlgo, fixedData, { k: kParam, startNode: newStart, targetNode: newTarget });
    setSteps(newSteps);
    setStepIndex(0);
  };

  // Graph Start or Target Node Change
  const handleGraphNodeChange = (newStart, newTarget) => {
    setStartNode(newStart);
    setTargetNode(newTarget);
    setIsPlaying(false);
    const newSteps = generateAlgoSteps(algoKey, rawData, { k: kParam, startNode: newStart, targetNode: newTarget });
    setSteps(newSteps);
    setStepIndex(0);
  };

  // Generate new random data (TRULY RANDOM EVERY CLICK)
  const handleGenerateNewData = () => {
    setIsPlaying(false);
    const newData = generateRandomData(category);
    setRawData(newData);

    let newStart = startNode;
    let newTarget = targetNode;
    if (category === 'graph' && newData && newData.nodes) {
      newStart = newData.nodes[0];
      newTarget = pickNonDirectTarget(newData.nodes, newData.edges, newStart);
      setStartNode(newStart);
      setTargetNode(newTarget);
    }

    const newSteps = generateAlgoSteps(algoKey, newData, { k: kParam, startNode: newStart, targetNode: newTarget });
    setSteps(newSteps);
    setStepIndex(0);
  };

  // Generate Advanced Exam-Level Data (🔥 Advanced Aufgaben)
  const handleGenerateAdvancedData = () => {
    setIsPlaying(false);
    const advData = generateAdvancedExamData(category, algoKey);
    setRawData(advData);

    let newStart = startNode;
    let newTarget = targetNode;
    if (category === 'graph' && advData && advData.nodes) {
      newStart = advData.nodes[0];
      newTarget = pickNonDirectTarget(advData.nodes, advData.edges, newStart);
      setStartNode(newStart);
      setTargetNode(newTarget);
    }

    const newSteps = generateAlgoSteps(algoKey, advData, { k: kParam, startNode: newStart, targetNode: newTarget });
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
  const availableGraphNodes = (rawData && rawData.nodes) || ['A', 'B', 'C', 'D', 'E', 'F'];

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
                    <optgroup label="⭐ TESTAT-ABGABEN (P1)">
                      <option value="hybridsort">⭐ HybridSort (Quick + MergeSort)</option>
                      <option value="radixsort">⭐ RadixSort (LSD Bucket Sort)</option>
                    </optgroup>
                    <optgroup label="📚 USFCA GALLES & CLRS SORTIEREN">
                      <option value="quicksort">QuickSort (Hoare Partitioning)</option>
                      <option value="mergesort">MergeSort (Divide & Conquer)</option>
                      <option value="heapsort">HeapSort (Max-Heapify)</option>
                      <option value="insertionsort">InsertionSort</option>
                      <option value="countingsort">CountingSort (Non-comparison)</option>
                      <option value="bubblesort">BubbleSort (USFCA Galles)</option>
                      <option value="selectionsort">SelectionSort (USFCA Galles)</option>
                      <option value="shellsort">ShellSort (USFCA Galles)</option>
                      <option value="bucketsort">BucketSort (USFCA Galles)</option>
                    </optgroup>
                  </>
                )}
                {category === 'tree' && (
                  <>
                    <optgroup label="⭐ TESTAT-ABGABEN (P2)">
                      <option value="avl">⭐ AVL Tree (USFCA Galles Style)</option>
                      <option value="splay">⭐ Splay Tree (Zig / Zig-Zig)</option>
                      <option value="rbtree">⭐ Red-Black Tree (4 Rules)</option>
                    </optgroup>
                    <optgroup label="📚 USFCA GALLES BÄUME & INDEXING">
                      <option value="minheap">⭐ Min-Heap (Galles USFCA Original)</option>
                      <option value="heap">Max-Heap / PriorityQueue</option>
                      <option value="bst">Binärer Suchbaum (BST)</option>
                      <option value="btree">B-Tree (USFCA Galles Multi-Way Tree)</option>
                      <option value="bplustree">B+ Tree (USFCA Galles Leaf Tree)</option>
                      <option value="openhash">Open Hash Table (Chaining)</option>
                      <option value="closedhash">Closed Hash Table (Linear Probing)</option>
                    </optgroup>
                  </>
                )}
                {category === 'graph' && (
                  <>
                    <optgroup label="⭐ TESTAT-ABGABEN (P3)">
                      <option value="dijkstra">⭐ Dijkstra (Shortest Paths)</option>
                      <option value="bellmanford">⭐ Bellman-Ford (Negative Cycle)</option>
                      <option value="kruskal">⭐ Kruskal (MST & Union-Find)</option>
                    </optgroup>
                    <optgroup label="📚 USFCA GALLES GRAPHEN">
                      <option value="prim">Prim-Algorithmus (MST)</option>
                      <option value="bfs">Breitensuche (BFS)</option>
                      <option value="dfs">Tiefensuche (DFS)</option>
                      <option value="toposort">Topologische Sortierung (TopoSort)</option>
                      <option value="floyd">Floyd-Warshall (All Pairs)</option>
                    </optgroup>
                  </>
                )}
                {category === 'heaps' && (
                  <optgroup label="⚡ HEAP-STRUKTUREN (USFCA GALLES)">
                    <option value="binomialqueue">Binomial Queue (Forest of Binomial Trees)</option>
                    <option value="fibonacciheap">Fibonacci Heap (Amortized PQ)</option>
                    <option value="leftistheap">Leftist Heap (Null Path Length)</option>
                    <option value="skewheap">Skew Heap (Self-Adjusting)</option>
                  </optgroup>
                )}
                {category === 'dp' && (
                  <optgroup label="💡 DYNAMISCHE PROGRAMMIERUNG & REKURSION">
                    <option value="dpfib">Fibonacci (Dynamic Programming)</option>
                    <option value="dpchange">Coin Change Problem (DP)</option>
                    <option value="dplcs">Longest Common Subsequence (LCS)</option>
                    <option value="recfact">Fakultät (Rekursion & Call-Stack)</option>
                    <option value="recqueens">N-Damen Problem (Backtracking)</option>
                    <option value="disjointset">Disjoint Sets / Union-Find</option>
                  </optgroup>
                )}
              </select>
            </div>

            {/* Graph Start & Target Node Selectors */}
            {category === 'graph' && algoKey !== 'kruskal' && algoKey !== 'prim' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8' }}>🚀 START:</label>
                  <select
                    value={startNode}
                    onChange={(e) => handleGraphNodeChange(e.target.value, targetNode)}
                    style={{ backgroundColor: '#1e293b', border: '1px solid #0284c7', color: '#fff', padding: '5px 10px', borderRadius: '6px', fontSize: '13px' }}
                  >
                    {availableGraphNodes.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                {algoKey !== 'bfs' && algoKey !== 'dfs' && algoKey !== 'toposort' && algoKey !== 'floyd' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>🎯 ZIEL:</label>
                    <select
                      value={targetNode}
                      onChange={(e) => handleGraphNodeChange(startNode, e.target.value)}
                      style={{ backgroundColor: '#1e293b', border: '1px solid #d97706', color: '#fff', padding: '5px 10px', borderRadius: '6px', fontSize: '13px' }}
                    >
                      {availableGraphNodes.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                )}
              </div>
            )}

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

              <button
                onClick={handleGenerateAdvancedData}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  border: 'none',
                  color: '#fff',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)'
                }}
              >
                🔥 Advanced Aufgaben
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

        {/* Draggable Resizer Bar */}
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
            stepLog={currentStep?.log || 'Klicke auf Start oder wähle einen Zielknoten.'}
            question={currentStep?.q || 'Welche Eigenschaften hat dieser Algorithmus?'}
            answer={currentStep?.a || 'Wähle einen Datensatz, um den Schritt-für-Schritt Ablauf zu starten.'}
          />
        </div>
      </main>
    </div>
  );
}
