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
      } else if (currentStep.type === 'graph') {
        drawGraph(ctx, canvas, currentStep, rawData);
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

  layoutTree(root, canvas.width, 80);

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

      // Height Badge ABOVE Node
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pos.currX - 24, pos.currY - 46, 48, 18, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 11px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`h = ${node.height}`, pos.currX, pos.currY - 37);
      ctx.restore();

      // Balance Factor Badge BELOW Node
      const isUnbalanced = Math.abs(balance) > 1;
      const bColor = isUnbalanced ? '#f43f5e' : '#4ade80';
      const bText = `B = ${balance > 0 ? '+' + balance : balance}`;

      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = bColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pos.currX - 24, pos.currY + 28, 48, 18, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = bColor;
      ctx.font = '700 11px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bText, pos.currX, pos.currY + 37);
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

// Drawing Dynamic Graph with Target Node Highlight & Non-overlapping Edge Badges
function drawGraph(ctx, canvas, step, rawData) {
  const nodeList = step.nodes || (rawData && rawData.nodes) || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = (rawData && rawData.edges) || [];
  const n = nodeList.length;

  const startNode = step.startNode || 'A';
  const targetNode = step.targetNode || 'F';

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

  // Draw Edges (Offset badges to 36% along line so crossing diagonal lines don't obscure badges!)
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

    // Offset badge to 38% along vector (prevents badges from sitting right on intersection points!)
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

  // Draw Nodes & Target / Start Badges
  nodeList.forEach(key => {
    const pos = positions[key];
    if (!pos) return;

    const isActiveNode = step.activeNode === key;
    const isTarget = key === targetNode;
    const isStart = key === startNode;

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

    // Distance Badge
    if (step.distances && step.distances[key] !== undefined) {
      ctx.fillStyle = isTarget ? '#f59e0b' : '#4ade80';
      ctx.font = '700 13px Fira Code, monospace';
      ctx.fillText(`d=${step.distances[key]}`, pos.x, pos.y + 42);
    }

    // Role Badges ABOVE Nodes (🎯 ZIEL / 🚀 START)
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
