import React, { useRef, useEffect } from 'react';
import { layoutTree } from '../data/algorithms';

export default function VisualizerCanvas({ currentStep, algoKey, rawData }) {
  const canvasRef = useRef(null);
  const animatedNodesRef = useRef({});
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function renderLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!currentStep) return;

      if (currentStep.type === 'tree') {
        drawTreePremiumStyle(ctx, canvas, currentStep, algoKey, animatedNodesRef.current);
      } else if (currentStep.type === 'graph' || currentStep.type === 'floyd' || currentStep.type === 'toposort' || algoKey === 'floyd' || algoKey === 'toposort') {
        if (algoKey === 'floyd' || currentStep.type === 'floyd') {
          drawFloydWarshallPremiumStyle(ctx, canvas, currentStep, rawData);
        } else if (algoKey === 'toposort' || currentStep.type === 'toposort') {
          drawTopoSortPremiumStyle(ctx, canvas, currentStep, rawData);
        } else {
          drawGraph(ctx, canvas, currentStep, rawData, algoKey);
        }
      } else if (currentStep.type === 'hash' || algoKey === 'openhash' || algoKey === 'closedhash') {
        drawHashTablePremiumStyle(ctx, canvas, currentStep, algoKey);
      } else {
        drawArray(ctx, canvas, currentStep);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    }

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [currentStep, algoKey, rawData]);

  return (
    <div style={{
      flex: 1,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        width={920}
        height={540}
        style={{
          borderRadius: '12px',
          backgroundColor: '#070a12',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          border: '1px solid #1e293b'
        }}
      />
    </div>
  );
}

// Drawing Array
function drawArray(ctx, canvas, step) {
  const arr = step.arr || [];
  const n = arr.length;
  const barWidth = Math.min(48, Math.floor(680 / n));
  const gap = 14;
  const startX = (canvas.width - (n * (barWidth + gap))) / 2;
  const maxH = 280;
  const maxVal = 100;

  arr.forEach((val, i) => {
    const x = startX + i * (barWidth + gap);
    const h = (val / maxVal) * maxH;
    const y = canvas.height - 85 - h;

    let color = '#38bdf8';
    if (step.pivot === i) color = '#f59e0b';
    else if (step.active && step.active.includes(i)) color = '#f43f5e';

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, h, [6, 6, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(val, x + barWidth / 2, y - 10);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Fira Code, monospace';
    ctx.fillText(`[${i}]`, x + barWidth / 2, canvas.height - 60);
  });
}

// Premium Clean Tree Renderer
function drawTreePremiumStyle(ctx, canvas, step, algoKey, nodePosMap) {
  const root = step.root;
  if (!root) {
    ctx.fillStyle = '#64748b';
    ctx.font = '500 15px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌱 Baum ist leer. Verwende [ Insert ], um Werte wie bei Galles einzufügen!', canvas.width / 2, canvas.height / 2);
    return;
  }

  // If Heap, adjust tree Y offset slightly for array bar
  const treeStartY = (algoKey === 'heap' || algoKey === 'minheap') ? 105 : 80;
  layoutTree(root, canvas.width, treeStartY);

  // Galles USFCA Heap Array Representation Bar at Top
  if ((algoKey === 'heap' || algoKey === 'minheap') && step.arr && step.arr.length > 0) {
    const arr = step.arr;
    const cellW = Math.min(46, Math.floor(640 / (arr.length + 1)));
    const cellH = 26;
    const startX = (canvas.width - (arr.length + 1) * cellW) / 2;
    const startY = 18;

    // Draw -INF 0-index cell
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.fillRect(startX, startY, cellW, cellH);
    ctx.strokeRect(startX, startY, cellW, cellH);
    ctx.fillStyle = '#64748b';
    ctx.font = '600 10px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('-INF', startX + cellW / 2, startY + cellH / 2);
    ctx.fillText('[0]', startX + cellW / 2, startY + cellH + 11);

    // Draw array elements [1..n]
    arr.forEach((v, idx) => {
      const x = startX + (idx + 1) * cellW;
      const isHighlight = step.highlightNode === v;
      ctx.fillStyle = isHighlight ? '#b45309' : '#0f172a';
      ctx.strokeStyle = isHighlight ? '#f59e0b' : '#38bdf8';
      ctx.lineWidth = isHighlight ? 2 : 1.5;
      ctx.fillRect(x, startY, cellW, cellH);
      ctx.strokeRect(x, startY, cellW, cellH);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 12px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(v, x + cellW / 2, startY + cellH / 2);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 10px Fira Code, monospace';
      ctx.fillText(`[${idx + 1}]`, x + cellW / 2, startY + cellH + 11);
    });
  }

  function updateNodePositions(node) {
    if (!node) return;

    if (!nodePosMap[node.val]) {
      nodePosMap[node.val] = { currX: canvas.width / 2, currY: 30 };
    }

    const pos = nodePosMap[node.val];
    pos.currX += (node.x - pos.currX) * 0.18;
    pos.currY += (node.y - pos.currY) * 0.18;

    updateNodePositions(node.left);
    updateNodePositions(node.right);
  }

  updateNodePositions(root);

  function drawEdges(node) {
    if (!node) return;
    const parentPos = nodePosMap[node.val];

    if (node.left) {
      const childPos = nodePosMap[node.left.val];
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(parentPos.currX, parentPos.currY);
      ctx.lineTo(childPos.currX, childPos.currY);
      ctx.stroke();
      drawEdges(node.left);
    }

    if (node.right) {
      const childPos = nodePosMap[node.right.val];
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(parentPos.currX, parentPos.currY);
      ctx.lineTo(childPos.currX, childPos.currY);
      ctx.stroke();
      drawEdges(node.right);
    }
  }

  drawEdges(root);

  let rotationPivotPos = null;

  function drawNodes(node) {
    if (!node) return;
    const pos = nodePosMap[node.val];
    const isHighlight = step.highlightNode === node.val;
    const isRotationPivot = step.rotationPivot === node.val;
    const radius = 25;

    if (isRotationPivot) rotationPivotPos = pos;

    let fillColor = '#0f172a';
    let strokeColor = '#38bdf8';

    if (node.color === 'RED') {
      fillColor = '#f43f5e';
      strokeColor = '#fda4af';
    } else if (node.color === 'BLACK') {
      fillColor = '#0f172a';
      strokeColor = '#475569';
    }

    if (isHighlight) {
      fillColor = '#b45309';
      strokeColor = '#f59e0b';
    }

    if (isRotationPivot) {
      fillColor = '#9f1239';
      strokeColor = '#f43f5e';
    }

    ctx.save();
    if (isHighlight || isRotationPivot) {
      ctx.shadowColor = isRotationPivot ? '#f43f5e' : '#f59e0b';
      ctx.shadowBlur = 16;
    }

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(pos.currX, pos.currY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.val, pos.currX, pos.currY);

    if (algoKey === 'avl' && node.height !== undefined) {
      const balance = (node.left ? node.left.height : 0) - (node.right ? node.right.height : 0);

      // Galles Height Number Label ABOVE Node (e.g. 3, 2, 1)
      ctx.save();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 13px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${node.height}`, pos.currX - 14, pos.currY - 26);
      ctx.restore();

      // Balance Factor Badge BELOW Node
      const isUnbalanced = Math.abs(balance) > 1;
      const bColor = isUnbalanced ? '#f43f5e' : '#4ade80';
      const bText = `B = ${balance > 0 ? '+' + balance : balance}`;

      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = bColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pos.currX - 22, pos.currY + 28, 44, 17, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = bColor;
      ctx.font = '700 10.5px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bText, pos.currX, pos.currY + 365 / 10);
      ctx.restore();
    }

    drawNodes(node.left);
    drawNodes(node.right);
  }

  drawNodes(root);

  if (step.searchPath && step.searchPath.length > 0) {
    const currentSearchVal = step.searchPath[step.searchPath.length - 1];
    const sPos = nodePosMap[currentSearchVal];
    if (sPos) {
      ctx.save();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(sPos.currX, sPos.currY, 32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  if (step.rotationType && rotationPivotPos) {
    drawLectureRotationDiagram(ctx, canvas, step.rotationType, step.rotationPivot);
  }
}

// Rotation Transformation Diagram
function drawLectureRotationDiagram(ctx, canvas, rotationType, pivotVal) {
  ctx.save();

  const boxX = 24;
  const boxY = canvas.height - 140;
  const boxW = 340;
  const boxH = 120;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 12;

  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.font = '700 12px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`📐 Rotations-Transformation (Vorlesung 04 / Galles)`, boxX + 16, boxY + 22);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '600 12px Fira Code, monospace';
  ctx.fillText(`${rotationType.replace(/_/g, ' ')} um Knoten ${pivotVal}`, boxX + 16, boxY + 42);

  const isRight = rotationType.includes('RIGHT');

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  const mX1 = boxX + 60;
  const mY1 = boxY + 65;

  ctx.beginPath();
  ctx.arc(mX1, mY1, 10, 0, Math.PI * 2);
  ctx.arc(isRight ? mX1 - 18 : mX1 + 18, mY1 + 24, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = '10px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(isRight ? 'y' : 'x', mX1, mY1 + 3);
  ctx.fillText(isRight ? 'x' : 'y', isRight ? mX1 - 18 : mX1 + 18, mY1 + 27);

  ctx.fillStyle = '#f59e0b';
  ctx.font = '700 18px Inter';
  ctx.fillText('➔', boxX + 155, boxY + 78);

  const mX2 = boxX + 245;
  const mY2 = boxY + 65;

  ctx.beginPath();
  ctx.arc(mX2, mY2, 10, 0, Math.PI * 2);
  ctx.arc(isRight ? mX2 + 18 : mX2 - 18, mY2 + 24, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#4ade80';
  ctx.font = '10px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(isRight ? 'x' : 'y', mX2, mY2 + 3);
  ctx.fillText(isRight ? 'y' : 'x', isRight ? mX2 + 18 : mX2 - 18, mY2 + 27);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('Vor Rotation', boxX + 60, boxY + 108);
  ctx.fillText('Nach Rotation', boxX + 245, boxY + 108);

  ctx.restore();
}

// Drawing Dynamic Graph (Hide Start/Target badges for Kruskal)
function drawGraph(ctx, canvas, step, rawData, algoKey) {
  const nodeList = step.nodes || (rawData && rawData.nodes) || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = (rawData && rawData.edges) || [];
  const n = nodeList.length;

  const isKruskal = algoKey === 'kruskal';
  const startNode = isKruskal ? null : (step.startNode || 'A');
  const targetNode = isKruskal ? null : (step.targetNode || 'F');

  const positions = {};
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 - 10;
  const radius = Math.min(185, canvas.height / 2 - 70);

  nodeList.forEach((key, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    positions[key] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  function isSameEdge(e1, e2) {
    if (!e1 || !e2) return false;
    return (e1.u === e2.u && e1.v === e2.v) || (e1.u === e2.v && e1.v === e2.u);
  }

  // Draw Edges (Offset badges to 38% along line so crossing diagonal lines don't obscure badges!)
  edges.forEach((e, idx) => {
    const u = positions[e.u];
    const v = positions[e.v];
    if (!u || !v) return;

    const isActive = step.activeEdge && isSameEdge(e, step.activeEdge);
    const isTreeEdge = (step.treeEdges && step.treeEdges.some(t => isSameEdge(e, t))) ||
                       (step.mstEdges && step.mstEdges.some(m => isSameEdge(e, m)));
    const isRejected = step.rejectedEdges && step.rejectedEdges.some(r => isSameEdge(e, r));

    let strokeColor = '#334155';
    let lineWidth = 2.5;
    let isDashed = false;

    if (isActive) {
      strokeColor = step.activeEdgeColor || '#f43f5e';
      lineWidth = 6;
    } else if (isTreeEdge) {
      strokeColor = '#4ade80';
      lineWidth = 4.5;
    } else if (isRejected) {
      strokeColor = '#ef4444';
      lineWidth = 3;
      isDashed = true;
    }

    ctx.save();
    if (isDashed) ctx.setLineDash([6, 6]);

    if (isActive || isTreeEdge) {
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = isTreeEdge ? 10 : 16;
    }

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(u.x, u.y);
    ctx.lineTo(v.x, v.y);
    ctx.stroke();
    ctx.restore();

    // Offset badge to 38% / 62% along vector
    const offsetFactor = (idx % 2 === 0) ? 0.38 : 0.62;
    const badgeX = u.x + (v.x - u.x) * offsetFactor;
    const badgeY = u.y + (v.y - u.y) * offsetFactor;

    let badgeBg = '#070a12';
    let badgeBorder = '#334155';
    let textColor = '#f59e0b';

    if (isActive) {
      badgeBg = strokeColor;
      badgeBorder = '#fff';
      textColor = '#000';
    } else if (isTreeEdge) {
      badgeBg = '#052e16';
      badgeBorder = '#4ade80';
      textColor = '#4ade80';
    } else if (isRejected) {
      badgeBg = '#450a0a';
      badgeBorder = '#ef4444';
      textColor = '#fca5a5';
    }

    ctx.save();
    ctx.fillStyle = badgeBg;
    ctx.strokeStyle = badgeBorder;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(badgeX - 15, badgeY - 12, 30, 24, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = '700 13px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(e.w, badgeX, badgeY + 1);
    ctx.restore();
  });

  // Draw Nodes & Target / Start Badges (Only for Dijkstra & BellmanFord)
  nodeList.forEach(key => {
    const pos = positions[key];
    if (!pos) return;

    const isActiveNode = step.activeNode === key;
    const isTarget = !isKruskal && key === targetNode;
    const isStart = !isKruskal && key === startNode;

    let fillColor = '#1e293b';
    let strokeColor = '#38bdf8';

    if (isTarget) {
      fillColor = '#78350f';
      strokeColor = '#f59e0b';
    } else if (isStart) {
      fillColor = '#0c4a6e';
      strokeColor = '#38bdf8';
    }

    if (isActiveNode) {
      fillColor = '#f43f5e';
      strokeColor = '#fda4af';
    }

    ctx.save();
    if (isActiveNode || isTarget) {
      ctx.shadowColor = isTarget ? '#f59e0b' : '#f43f5e';
      ctx.shadowBlur = 18;
    }

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isTarget ? 4.5 : 3.5;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(key, pos.x, pos.y);

    // Distance Badge (Only for Dijkstra & Bellman-Ford)
    if (!isKruskal && step.distances && step.distances[key] !== undefined) {
      ctx.fillStyle = isTarget ? '#f59e0b' : '#4ade80';
      ctx.font = '700 13px Fira Code, monospace';
      ctx.fillText(`d=${step.distances[key]}`, pos.x, pos.y + 42);
    }

    // Role Badges ABOVE Nodes (🎯 ZIEL / 🚀 START) - HIDE FOR KRUSKAL!
    if (isTarget) {
      ctx.save();
      ctx.fillStyle = 'rgba(120, 53, 15, 0.95)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(pos.x - 32, pos.y - 48, 64, 18, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '700 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎯 ZIEL', pos.x, pos.y - 39);
      ctx.restore();
    } else if (isStart) {
      ctx.save();
      ctx.fillStyle = 'rgba(12, 74, 110, 0.95)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(pos.x - 32, pos.y - 48, 64, 18, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚀 START', pos.x, pos.y - 39);
      ctx.restore();
    }
  });
}


// Drawing Hash Table (USFCA Galles Style)
function drawHashTablePremiumStyle(ctx, canvas, step, algoKey) {
  ctx.save();
  const width = canvas.width;
  const height = canvas.height;

  const isClosed = (algoKey === 'closedhash') || (step.algoSubKey === 'closedhash');

  if (isClosed) {
    // CLOSED HASHING (Linear Probing / Open Addressing)
    const table = step.table || Array.from({ length: 10 }, () => null);
    const M = table.length;
    const cellW = Math.min(68, Math.floor((width - 80) / M));
    const cellH = 50;
    const startX = (width - (M * cellW)) / 2;
    const startY = height / 2 - 25;

    // Header Title
    ctx.fillStyle = '#f59e0b';
    ctx.font = '700 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Closed Hash Table (Open Addressing - Linear Probing)', width / 2, 40);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 13px Inter, sans-serif';
    ctx.fillText(`Hashfunktion: h(k) = k mod ${M} | Sondierung: (h(k) + i) mod ${M}`, width / 2, 65);

    table.forEach((val, i) => {
      const x = startX + i * cellW;
      const y = startY;

      const isProbed = step.probedSlot === i;
      const isHighlightedVal = val !== null && val === step.highlightVal;

      let bg = '#0f172a';
      let border = '#334155';
      let textColor = '#cbd5e1';

      if (isProbed) {
        bg = '#450a0a';
        border = '#ef4444';
        textColor = '#fca5a5';
      } else if (isHighlightedVal) {
        bg = '#064e3b';
        border = '#34d399';
        textColor = '#6ee7b7';
      } else if (val !== null) {
        bg = '#1e293b';
        border = '#38bdf8';
        textColor = '#f8fafc';
      }

      ctx.fillStyle = bg;
      ctx.strokeStyle = border;
      ctx.lineWidth = isProbed ? 3 : 2;

      ctx.beginPath();
      ctx.roundRect(x + 2, y, cellW - 4, cellH, 8);
      ctx.fill();
      ctx.stroke();

      // Index Label below
      ctx.fillStyle = isProbed ? '#ef4444' : '#94a3b8';
      ctx.font = '600 12px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`[${i}]`, x + cellW / 2, y + cellH + 20);

      // Slot Value
      ctx.fillStyle = textColor;
      ctx.font = '700 16px Fira Code, monospace';
      ctx.fillText(val !== null ? val : '—', x + cellW / 2, y + cellH / 2 + 5);

      // Probe pointer arrow above
      if (isProbed) {
        ctx.fillStyle = '#ef4444';
        ctx.font = '700 14px Inter';
        ctx.fillText('▼ PROBE', x + cellW / 2, y - 12);
      }
    });

  } else {
    // OPEN HASHING (Chaining / Closed Addressing)
    const buckets = step.buckets || Array.from({ length: 10 }, () => []);
    const M = buckets.length;
    const cellW = Math.min(65, Math.floor((width - 80) / M));
    const cellH = 34;
    const startX = (width - (M * cellW)) / 2;
    const tableY = height - 55;

    // Header Title
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Open Hash Table (Closed Addressing - Chaining)', width / 2, 35);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 13px Inter, sans-serif';
    ctx.fillText(`Hashfunktion: h(k) = k mod ${M} | Verkettete Listen an Bucket-Head`, width / 2, 55);

    buckets.forEach((chain, i) => {
      const bx = startX + i * cellW;
      const by = tableY;

      const isProbedBucket = step.probedBucket === i;

      // Draw Bucket Base Cell
      ctx.fillStyle = isProbedBucket ? '#1e1b4b' : '#0f172a';
      ctx.strokeStyle = isProbedBucket ? '#818cf8' : '#334155';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.roundRect(bx + 2, by, cellW - 4, cellH, 6);
      ctx.fill();
      ctx.stroke();

      // Diagonal slash in bucket head cell (USFCA Galles style)
      ctx.strokeStyle = isProbedBucket ? '#818cf8' : '#475569';
      ctx.beginPath();
      ctx.moveTo(bx + 6, by + cellH - 6);
      ctx.lineTo(bx + cellW - 6, by + 6);
      ctx.stroke();

      // Bucket Index Label
      ctx.fillStyle = isProbedBucket ? '#818cf8' : '#94a3b8';
      ctx.font = '600 12px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`[${i}]`, bx + cellW / 2, by + cellH + 16);

      // Draw Linked List Chain Stacking UPWARDS (Galles USFCA Original Style)
      let currentY = by - 44;
      let prevX = bx + cellW / 2;
      let prevY = by;

      chain.forEach((val, level) => {
        const isHighlightNode = val === step.highlightVal;

        // Draw connecting arrow UPWARDS
        ctx.strokeStyle = isHighlightNode ? '#4ade80' : '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(prevX, currentY + cellH);
        ctx.stroke();

        // Arrow head
        ctx.fillStyle = isHighlightNode ? '#4ade80' : '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(prevX, currentY + cellH);
        ctx.lineTo(prevX - 4, currentY + cellH + 5);
        ctx.lineTo(prevX + 4, currentY + cellH + 5);
        ctx.closePath();
        ctx.fill();

        // Draw Linked Node Box
        ctx.fillStyle = isHighlightNode ? '#052e16' : '#1e293b';
        ctx.strokeStyle = isHighlightNode ? '#4ade80' : '#38bdf8';
        ctx.lineWidth = isHighlightNode ? 3 : 2;

        ctx.beginPath();
        ctx.roundRect(bx + 4, currentY, cellW - 8, cellH, 6);
        ctx.fill();
        ctx.stroke();

        // Node Value
        ctx.fillStyle = isHighlightNode ? '#4ade80' : '#f8fafc';
        ctx.font = '700 13px Fira Code, monospace';
        ctx.fillText(val, bx + cellW / 2, currentY + cellH / 2 + 4);

        prevY = currentY;
        currentY -= 44;
      });
    });
  }

  ctx.restore();
}


// -----------------------------------------------------------------------
// 100% USFCA GALLES FLOYD-WARSHALL MATRIX & GRAPH RENDERER
// -----------------------------------------------------------------------
function drawFloydWarshallPremiumStyle(ctx, canvas, step, rawData) {
  ctx.save();
  const width = canvas.width;
  const height = canvas.height;

  const nodes = step.nodes || ['A', 'B', 'C', 'D'];
  const edges = step.edges || [];
  const V = nodes.length;

  const nodeMap = {};
  nodes.forEach((n, idx) => { nodeMap[n] = idx; });
  const costMatrix = step.costMatrix || Array.from({ length: V }, () => new Array(V).fill('INF'));
  const pathMatrix = step.pathMatrix || Array.from({ length: V }, () => new Array(V).fill(-1));

  const kIdx = step.k;
  const iIdx = step.i;
  const jIdx = step.j;

  // Header Title
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Floyd-Warshall All-Pairs Shortest Path (USFCA Galles Original)', width / 2, 28);

  // 1. LEFT SIDE: COST MATRIX D & PATH MATRIX P
  const matX = 30;
  const matY = 55;
  const cellW = Math.min(38, Math.floor(180 / (V + 1)));
  const cellH = 26;

  // Render Cost Matrix D
  ctx.fillStyle = '#f59e0b';
  ctx.font = '700 12px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Cost Matrix D', matX, matY);

  // Column Headers
  nodes.forEach((label, c) => {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 11px Fira Code';
    ctx.textAlign = 'center';
    ctx.fillText(label, matX + (c + 1) * cellW + cellW / 2, matY + 16);
  });

  // Matrix Grid D
  for (let r = 0; r < V; r++) {
    // Row Header
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 11px Fira Code';
    ctx.textAlign = 'right';
    ctx.fillText(nodes[r], matX + cellW - 6, matY + (r + 1) * cellH + cellH / 2 + 3);

    for (let c = 0; c < V; c++) {
      const x = matX + (c + 1) * cellW;
      const y = matY + (r + 1) * cellH;

      const isCurrentCell = (r === iIdx && c === jIdx);
      const isViaCell = (r === iIdx && c === kIdx) || (r === kIdx && c === jIdx);
      const isUpdatedCell = isCurrentCell && step.updated;

      let bg = '#0f172a';
      let border = '#334155';
      let textColor = '#cbd5e1';

      if (isUpdatedCell) {
        bg = '#064e3b'; border = '#34d399'; textColor = '#6ee7b7';
      } else if (isCurrentCell) {
        bg = '#450a0a'; border = '#ef4444'; textColor = '#fca5a5';
      } else if (isViaCell) {
        bg = '#1e1b4b'; border = '#818cf8'; textColor = '#c7d2fe';
      }

      ctx.fillStyle = bg;
      ctx.strokeStyle = border;
      ctx.lineWidth = (isCurrentCell || isUpdatedCell) ? 2 : 1;
      ctx.fillRect(x, y, cellW, cellH);
      ctx.strokeRect(x, y, cellW, cellH);

      const val = costMatrix[r] ? costMatrix[r][c] : 'INF';
      ctx.fillStyle = textColor;
      ctx.font = '700 11px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(val, x + cellW / 2, y + cellH / 2);
    }
  }

  // Render Path Matrix P
  const pathMatX = matX + (V + 1) * cellW + 25;
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 12px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Path Predecessor Matrix P', pathMatX, matY);

  nodes.forEach((label, c) => {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 11px Fira Code';
    ctx.textAlign = 'center';
    ctx.fillText(label, pathMatX + (c + 1) * cellW + cellW / 2, matY + 16);
  });

  for (let r = 0; r < V; r++) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 11px Fira Code';
    ctx.textAlign = 'right';
    ctx.fillText(nodes[r], pathMatX + cellW - 6, matY + (r + 1) * cellH + cellH / 2 + 3);

    for (let c = 0; c < V; c++) {
      const x = pathMatX + (c + 1) * cellW;
      const y = matY + (r + 1) * cellH;

      const isCurrentCell = (r === iIdx && c === jIdx);

      ctx.fillStyle = isCurrentCell ? '#0c4a6e' : '#0f172a';
      ctx.strokeStyle = isCurrentCell ? '#38bdf8' : '#334155';
      ctx.lineWidth = isCurrentCell ? 2 : 1;
      ctx.fillRect(x, y, cellW, cellH);
      ctx.strokeRect(x, y, cellW, cellH);

      const pVal = pathMatrix[r] ? pathMatrix[r][c] : -1;
      const pLabel = (pVal >= 0 && pVal < V) ? nodes[pVal] : '-';
      ctx.fillStyle = isCurrentCell ? '#38bdf8' : '#94a3b8';
      ctx.font = '700 11px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pLabel, x + cellW / 2, y + cellH / 2);
    }
  }

  // 2. BOTTOM LEFT: TRIANGULAR RELAXATION DIAGRAM (USFCA Galles Original)
  const diagX = 40;
  const diagY = height - 150;
  const diagW = 380;
  const diagH = 135;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(diagX, diagY, diagW, diagH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.font = '700 11px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('📐 Triangular Relaxation Test (D[i][j] vs D[i][k] + D[k][j])', diagX + 12, diagY + 18);

  if (iIdx >= 0 && jIdx >= 0 && kIdx >= 0) {
    const iNode = nodes[iIdx];
    const jNode = nodes[jIdx];
    const kNode = nodes[kIdx];

    const iX = diagX + 45, iY = diagY + 95;
    const jX = diagX + 335, jY = diagY + 95;
    const kX = diagX + 190, kY = diagY + 45;

    // Draw Node Circles
    const drawDiagNode = (label, x, y, col) => {
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 12px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
    };

    drawDiagNode(iNode, iX, iY, '#ef4444');
    drawDiagNode(jNode, jX, jY, '#ef4444');
    drawDiagNode(kNode, kX, kY, '#f59e0b');

    // Direct Edge i -> j (bottom)
    const directW = costMatrix[iIdx][jIdx];
    ctx.strokeStyle = step.updated ? '#ef4444' : '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(iX + 16, iY); ctx.lineTo(jX - 16, jY); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '600 10px Fira Code'; ctx.textAlign = 'center';
    ctx.fillText(`Direkt: ${directW}`, (iX + jX) / 2, iY + 16);

    // Via Edge i -> k -> j
    const ikW = costMatrix[iIdx][kIdx];
    const kjW = costMatrix[kIdx][jIdx];

    ctx.strokeStyle = '#818cf8';
    ctx.beginPath(); ctx.moveTo(iX + 12, iY - 12); ctx.lineTo(kX - 12, kY + 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(kX + 12, kY + 12); ctx.lineTo(jX - 12, jY - 12); ctx.stroke();

    ctx.fillStyle = '#c7d2fe'; ctx.font = '600 10px Fira Code';
    ctx.fillText(`D[i][k]=${ikW}`, (iX + kX) / 2 - 10, (iY + kY) / 2);
    ctx.fillText(`D[k][j]=${kjW}`, (kX + jX) / 2 + 10, (kY + jY) / 2);
  } else {
    ctx.fillStyle = '#64748b';
    ctx.font = '500 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Starte Animation, um Pfad-Entspannungen zu sehen.', diagX + diagW / 2, diagY + diagH / 2 + 10);
  }

  // 3. RIGHT SIDE: DIRECTED GRAPH WITH ARROWS
  const graphCenterX = width - 230;
  const graphCenterY = height / 2 + 15;
  const graphRadius = 145;

  const positions = {};
  nodes.forEach((key, idx) => {
    const angle = (2 * Math.PI * idx / V) - Math.PI / 2;
    positions[key] = {
      x: graphCenterX + graphRadius * Math.cos(angle),
      y: graphCenterY + graphRadius * Math.sin(angle)
    };
  });

  // Draw Graph Edges with Directed Arrowheads
  edges.forEach(e => {
    const uPos = positions[e.u];
    const vPos = positions[e.v];
    if (!uPos || !vPos) return;

    const uIdx = nodeMap[e.u];
    const vIdx = nodeMap[e.v];

    const isActiveVia = (uIdx === iIdx && vIdx === kIdx) || (uIdx === kIdx && vIdx === jIdx);
    const isActiveDirect = (uIdx === iIdx && vIdx === jIdx);

    let strokeCol = '#334155';
    let lineW = 2;

    if (isActiveDirect) {
      strokeCol = step.updated ? '#4ade80' : '#ef4444';
      lineW = 4;
    } else if (isActiveVia) {
      strokeCol = '#818cf8';
      lineW = 3.5;
    }

    ctx.save();
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = lineW;
    ctx.beginPath();
    ctx.moveTo(uPos.x, uPos.y);
    ctx.lineTo(vPos.x, vPos.y);
    ctx.stroke();

    // Arrowhead at target vPos
    const dx = vPos.x - uPos.x;
    const dy = vPos.y - uPos.y;
    const angle = Math.atan2(dy, dx);
    const nodeR = 24;
    const arrowX = vPos.x - nodeR * Math.cos(angle);
    const arrowY = vPos.y - nodeR * Math.sin(angle);

    ctx.fillStyle = strokeCol;
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - 10 * Math.cos(angle - Math.PI / 6), arrowY - 10 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(arrowX - 10 * Math.cos(angle + Math.PI / 6), arrowY - 10 * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    // Weight Badge
    const midX = uPos.x + (vPos.x - uPos.x) * 0.45;
    const midY = uPos.y + (vPos.y - uPos.y) * 0.45;
    ctx.fillStyle = '#070a12';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(midX - 12, midY - 10, 24, 20, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.font = '700 11px Fira Code'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(e.w, midX, midY + 1);
    ctx.restore();
  });

  // Draw Graph Nodes
  nodes.forEach((key, idx) => {
    const pos = positions[key];
    if (!pos) return;

    const isKNode = idx === kIdx;
    const isINode = idx === iIdx;
    const isJNode = idx === jIdx;

    let fillCol = '#1e293b';
    let strokeCol = '#38bdf8';

    if (isKNode) {
      fillCol = '#78350f'; strokeCol = '#f59e0b';
    } else if (isINode || isJNode) {
      fillCol = '#450a0a'; strokeCol = '#ef4444';
    }

    ctx.save();
    ctx.fillStyle = fillCol;
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = (isKNode || isINode || isJNode) ? 3.5 : 2;
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 15px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(key, pos.x, pos.y);

    if (isKNode) {
      ctx.fillStyle = '#f59e0b'; ctx.font = '700 10px Inter';
      ctx.fillText('⚡ k', pos.x, pos.y - 32);
    }
    ctx.restore();
  });

  ctx.restore();
}


// -----------------------------------------------------------------------
// 100% USFCA GALLES TOPOLOGICAL SORT INDEGREE & GRAPH RENDERER
// -----------------------------------------------------------------------
function drawTopoSortPremiumStyle(ctx, canvas, step, rawData) {
  ctx.save();
  const width = canvas.width;
  const height = canvas.height;

  const nodes = step.nodes || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = step.edges || [];
  const indegree = step.indegree || {};
  const topoOrder = step.topoOrder || [];
  const V = nodes.length;

  const activeNode = step.activeNode;
  const activeEdge = step.activeEdge;

  // Header Title
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Topological Sort (Indegree Method - USFCA Galles Original)', width / 2, 28);

  // 1. TOP CENTER: TOPOLOGICAL ORDER OUTPUT ARRAY
  const boxW = 42;
  const boxH = 34;
  const arrayStartX = (width - V * boxW) / 2;
  const arrayY = 48;

  ctx.fillStyle = '#4ade80';
  ctx.font = '600 12px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Topo-Order: ', arrayStartX - 10, arrayY + boxH / 2 + 4);

  nodes.forEach((_, idx) => {
    const x = arrayStartX + idx * boxW;
    const val = topoOrder[idx];
    const isFilled = val !== undefined;

    ctx.fillStyle = isFilled ? '#052e16' : '#0f172a';
    ctx.strokeStyle = isFilled ? '#4ade80' : '#334155';
    ctx.lineWidth = isFilled ? 2 : 1;

    ctx.beginPath(); ctx.roundRect(x + 2, arrayY, boxW - 4, boxH, 6); ctx.fill(); ctx.stroke();

    if (isFilled) {
      ctx.fillStyle = '#4ade80';
      ctx.font = '700 15px Fira Code, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(val, x + boxW / 2, arrayY + boxH / 2 + 1);
    }
  });

  // 2. LEFT SIDE: INDEGREE TABLE (USFCA Galles Style)
  const tblX = 35;
  const tblY = 110;
  const colW = 60;
  const rowH = 28;

  ctx.fillStyle = '#f59e0b';
  ctx.font = '700 13px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Indegree Table', tblX, tblY - 10);

  // Header Row
  ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
  ctx.fillRect(tblX, tblY, colW * 2, rowH); ctx.strokeRect(tblX, tblY, colW * 2, rowH);
  ctx.fillStyle = '#94a3b8'; ctx.font = '600 11px Fira Code'; ctx.textAlign = 'center';
  ctx.fillText('Knoten', tblX + colW / 2, tblY + 18);
  ctx.fillText('Indegree', tblX + colW + colW / 2, tblY + 18);

  nodes.forEach((n, idx) => {
    const y = tblY + (idx + 1) * rowH;
    const inDegVal = indegree[n] !== undefined ? indegree[n] : 0;
    const isZero = inDegVal === 0;
    const isActive = activeNode === n;

    let bg = '#0f172a';
    let border = '#334155';
    let textColor = '#cbd5e1';

    if (isActive) {
      bg = '#450a0a'; border = '#ef4444'; textColor = '#fca5a5';
    } else if (isZero) {
      bg = '#064e3b'; border = '#34d399'; textColor = '#6ee7b7';
    }

    ctx.fillStyle = bg; ctx.strokeStyle = border; ctx.lineWidth = (isActive || isZero) ? 2 : 1;
    ctx.fillRect(tblX, y, colW * 2, rowH); ctx.strokeRect(tblX, y, colW * 2, rowH);

    ctx.fillStyle = textColor; ctx.font = '700 12px Fira Code, monospace'; ctx.textAlign = 'center';
    ctx.fillText(n, tblX + colW / 2, y + 18);
    ctx.fillText(inDegVal, tblX + colW + colW / 2, y + 18);
  });

  // 3. RIGHT SIDE: DIRECTED GRAPH (DAG) WITH ARROWS
  const graphCenterX = width - 260;
  const graphCenterY = height / 2 + 30;
  const graphRadius = 150;

  const positions = {};
  nodes.forEach((key, idx) => {
    const angle = (2 * Math.PI * idx / V) - Math.PI / 2;
    positions[key] = {
      x: graphCenterX + graphRadius * Math.cos(angle),
      y: graphCenterY + graphRadius * Math.sin(angle)
    };
  });

  // Draw Directed Edges
  edges.forEach(e => {
    const uPos = positions[e.u];
    const vPos = positions[e.v];
    if (!uPos || !vPos) return;

    const isCurrentEdge = activeEdge && activeEdge.u === e.u && activeEdge.v === e.v;

    let strokeCol = '#334155';
    let lineW = 2;

    if (isCurrentEdge) {
      strokeCol = '#ef4444'; // Thick Red Edge matching USFCA Galles!
      lineW = 4.5;
    }

    ctx.save();
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = lineW;
    ctx.beginPath();
    ctx.moveTo(uPos.x, uPos.y);
    ctx.lineTo(vPos.x, vPos.y);
    ctx.stroke();

    // Arrowhead at target vPos
    const dx = vPos.x - uPos.x;
    const dy = vPos.y - uPos.y;
    const angle = Math.atan2(dy, dx);
    const nodeR = 24;
    const arrowX = vPos.x - nodeR * Math.cos(angle);
    const arrowY = vPos.y - nodeR * Math.sin(angle);

    ctx.fillStyle = strokeCol;
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - 10 * Math.cos(angle - Math.PI / 6), arrowY - 10 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(arrowX - 10 * Math.cos(angle + Math.PI / 6), arrowY - 10 * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  // Draw Graph Nodes
  nodes.forEach(key => {
    const pos = positions[key];
    if (!pos) return;

    const isActive = activeNode === key;
    const inDegVal = indegree[key] !== undefined ? indegree[key] : 0;
    const isZero = inDegVal === 0;

    let fillCol = '#1e293b';
    let strokeCol = '#38bdf8';

    if (isActive) {
      fillCol = '#78350f'; strokeCol = '#f59e0b';
    } else if (isZero) {
      fillCol = '#052e16'; strokeCol = '#4ade80';
    }

    ctx.save();
    ctx.fillStyle = fillCol; ctx.strokeStyle = strokeCol; ctx.lineWidth = (isActive || isZero) ? 3.5 : 2;
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#f8fafc'; ctx.font = '700 15px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(key, pos.x, pos.y);

    // Indegree Badge above node
    ctx.fillStyle = isZero ? '#4ade80' : '#94a3b8';
    ctx.font = '600 11px Fira Code';
    ctx.fillText(`in:${inDegVal}`, pos.x, pos.y + 35);
    ctx.restore();
  });

  ctx.restore();
}
