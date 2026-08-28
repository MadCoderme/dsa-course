import React, { useState, useEffect } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Share2,
  Minimize2,
  Layers
} from 'lucide-react';

interface MstNode {
  id: string;
  x: number;
  y: number;
}

interface MstEdge {
  id: number;
  u: string;
  v: string;
  weight: number;
}

interface MstVisualizerProps {
  focusedMode?: 'kruskal' | 'prim';
}

export const MstVisualizer: React.FC<MstVisualizerProps> = ({ focusedMode = 'kruskal' }) => {
  const [activeTab, setActiveTab] = useState<'kruskal' | 'prim'>(focusedMode);

  // Kruskal Step
  const [kruskalStep, setKruskalStep] = useState<number>(-1);
  const [isKruskalPlaying, setIsKruskalPlaying] = useState<boolean>(false);

  // Prim Step
  const [primStep, setPrimStep] = useState<number>(-1);
  const [isPrimPlaying, setIsPrimPlaying] = useState<boolean>(false);

  const vertices: MstNode[] = [
    { id: 'A', x: 80, y: 50 },
    { id: 'B', x: 220, y: 40 },
    { id: 'C', x: 340, y: 90 },
    { id: 'D', x: 80, y: 160 },
    { id: 'E', x: 220, y: 160 },
  ];

  // All graph edges sorted by weight for Kruskal
  const allEdges: MstEdge[] = [
    { id: 1, u: 'B', v: 'E', weight: 1 },
    { id: 2, u: 'D', v: 'E', weight: 2 },
    { id: 3, u: 'A', v: 'B', weight: 3 },
    { id: 4, u: 'C', v: 'E', weight: 4 },
    { id: 5, u: 'A', v: 'D', weight: 5 },
    { id: 6, u: 'B', v: 'C', weight: 7 },
    { id: 7, u: 'C', v: 'D', weight: 8 },
  ];

  // Kruskal Step Trace
  const kruskalSteps = [
    {
      edge: allEdges[0], // B-E (1)
      accepted: true,
      costSoFar: 1,
      acceptedEdges: [{ u: 'B', v: 'E', weight: 1 }],
      dsuSets: '{A}, {B, E}, {C}, {D}',
      note: 'Inspect edge (B, E, w=1). B and E in distinct sets -> ACCEPT! Merge {B} and {E}.'
    },
    {
      edge: allEdges[1], // D-E (2)
      accepted: true,
      costSoFar: 3,
      acceptedEdges: [{ u: 'B', v: 'E', weight: 1 }, { u: 'D', v: 'E', weight: 2 }],
      dsuSets: '{A}, {B, D, E}, {C}',
      note: 'Inspect edge (D, E, w=2). D and E in distinct sets -> ACCEPT! Merge {D} and {B, E}.'
    },
    {
      edge: allEdges[2], // A-B (3)
      accepted: true,
      costSoFar: 6,
      acceptedEdges: [{ u: 'B', v: 'E', weight: 1 }, { u: 'D', v: 'E', weight: 2 }, { u: 'A', v: 'B', weight: 3 }],
      dsuSets: '{A, B, D, E}, {C}',
      note: 'Inspect edge (A, B, w=3). A and B in distinct sets -> ACCEPT! Merge {A} and {B, D, E}.'
    },
    {
      edge: allEdges[3], // C-E (4)
      accepted: true,
      costSoFar: 10,
      acceptedEdges: [{ u: 'B', v: 'E', weight: 1 }, { u: 'D', v: 'E', weight: 2 }, { u: 'A', v: 'B', weight: 3 }, { u: 'C', v: 'E', weight: 4 }],
      dsuSets: '{A, B, C, D, E}',
      note: 'Inspect edge (C, E, w=4). C and E in distinct sets -> ACCEPT! Spanning Tree has V-1 = 4 edges. MST COMPLETE!'
    },
    {
      edge: allEdges[4], // A-D (5)
      accepted: false,
      costSoFar: 10,
      acceptedEdges: [{ u: 'B', v: 'E', weight: 1 }, { u: 'D', v: 'E', weight: 2 }, { u: 'A', v: 'B', weight: 3 }, { u: 'C', v: 'E', weight: 4 }],
      dsuSets: '{A, B, C, D, E}',
      note: 'Inspect edge (A, D, w=5). Both A and D belong to same set {A,B,C,D,E} -> CYCLE DETECTED! REJECT!'
    }
  ];

  // Prim Step Trace (Starting from vertex A)
  const primSteps = [
    {
      currentVertex: 'A',
      treeVertices: ['A'],
      addedEdge: null,
      costSoFar: 0,
      candidateEdges: ['(A, B: 3)', '(A, D: 5)'],
      note: 'Start at root vertex A. Spanning tree S = {A}. Frontier cuts: (A,B: 3), (A,D: 5).'
    },
    {
      currentVertex: 'B',
      treeVertices: ['A', 'B'],
      addedEdge: { u: 'A', v: 'B', weight: 3 },
      costSoFar: 3,
      candidateEdges: ['(B, E: 1)', '(A, D: 5)', '(B, C: 7)'],
      note: 'Pick minimum cross-cut edge (A, B: 3). S = {A, B}. Add candidate edges from B.'
    },
    {
      currentVertex: 'E',
      treeVertices: ['A', 'B', 'E'],
      addedEdge: { u: 'B', v: 'E', weight: 1 },
      costSoFar: 4,
      candidateEdges: ['(E, D: 2)', '(E, C: 4)', '(A, D: 5)'],
      note: 'Pick minimum cross-cut edge (B, E: 1). S = {A, B, E}. Add candidate edges from E.'
    },
    {
      currentVertex: 'D',
      treeVertices: ['A', 'B', 'E', 'D'],
      addedEdge: { u: 'E', v: 'D', weight: 2 },
      costSoFar: 6,
      candidateEdges: ['(E, C: 4)', '(B, C: 7)'],
      note: 'Pick minimum cross-cut edge (E, D: 2). S = {A, B, E, D}. Candidate (A,D: 5) discarded (both in S).'
    },
    {
      currentVertex: 'C',
      treeVertices: ['A', 'B', 'E', 'D', 'C'],
      addedEdge: { u: 'E', v: 'C', weight: 4 },
      costSoFar: 10,
      candidateEdges: [],
      note: 'Pick minimum cross-cut edge (E, C: 4). All 5 vertices connected. Total MST Cost = 10!'
    }
  ];

  useEffect(() => {
    let timer: any;
    if (isKruskalPlaying) {
      timer = setInterval(() => {
        setKruskalStep((prev) => {
          if (prev >= kruskalSteps.length - 1) {
            setIsKruskalPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isKruskalPlaying]);

  useEffect(() => {
    let timer: any;
    if (isPrimPlaying) {
      timer = setInterval(() => {
        setPrimStep((prev) => {
          if (prev >= primSteps.length - 1) {
            setIsPrimPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPrimPlaying]);

  const resetKruskal = () => {
    setKruskalStep(-1);
    setIsKruskalPlaying(false);
  };

  const resetPrim = () => {
    setPrimStep(-1);
    setIsPrimPlaying(false);
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
            <Minimize2 className="w-5 h-5 text-[#991B1B] dark:text-[#EF4444]" /> Minimum Cost Spanning Tree (MST) Simulator
          </h3>
          <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
            Interactive step-by-step execution of Kruskal's Edge-Greedy DSU and Prim's Vertex-Growing algorithms.
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#F4F2EB] dark:bg-[#2A2622] p-1 rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
          <button
            onClick={() => { setActiveTab('kruskal'); resetKruskal(); }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'kruskal' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Kruskal's Algorithm (DSU)
          </button>
          <button
            onClick={() => { setActiveTab('prim'); resetPrim(); }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'prim' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Prim's Algorithm (Priority Queue)
          </button>
        </div>
      </div>

      {/* TAB 1: Kruskal's Algorithm */}
      {activeTab === 'kruskal' && (
        <div className="space-y-5">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              Kruskal's Edge Sorting & Disjoint Set Union (DSU):
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (kruskalStep < kruskalSteps.length - 1) setKruskalStep((prev) => prev + 1);
                }}
                disabled={kruskalStep >= kruskalSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Next Edge
              </button>
              <button
                onClick={() => setIsKruskalPlaying(!isKruskalPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  isKruskalPlaying
                    ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 text-[#991B1B] dark:text-[#EF4444] border-[#FECACA] dark:border-[#7F1D1D]'
                    : 'bg-white dark:bg-[#064E3B]/30 text-[#15803D] dark:text-[#4ADE80] border-[#DCFCE7] dark:border-[#059669]/40 hover:bg-[#F0FDF4] dark:bg-[#064E3B]/40 dark:hover:bg-[#064E3B]/50'
                }`}
              >
                <Play className="w-3.5 h-3.5" /> {isKruskalPlaying ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={resetKruskal}
                className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:bg-[#2A2622] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto flex justify-center">
            <svg width="420" height="210">
              {allEdges.map((e) => {
                const u = vertices.find((v) => v.id === e.u)!;
                const v = vertices.find((v) => v.id === e.v)!;
                const isAccepted = kruskalStep >= 0 && kruskalSteps[kruskalStep].acceptedEdges.some(
                  (ae) => (ae.u === e.u && ae.v === e.v) || (ae.u === e.v && ae.v === e.u)
                );
                const isCurrentExamined = kruskalStep >= 0 && kruskalSteps[kruskalStep].edge.id === e.id;
                const isRejected = isCurrentExamined && !kruskalSteps[kruskalStep].accepted;

                return (
                  <g key={e.id}>
                    <line
                      x1={u.x}
                      y1={u.y}
                      x2={v.x}
                      y2={v.y}
                      stroke={isAccepted ? '#15803D' : isRejected ? '#DC2626' : isCurrentExamined ? '#D97706' : '#D8D4C8'}
                      strokeWidth={isAccepted ? '4' : isCurrentExamined ? '3' : '2'}
                      strokeDasharray={isRejected ? '4,4' : undefined}
                    />
                    <circle
                      cx={(u.x + v.x) / 2}
                      cy={(u.y + v.y) / 2}
                      r="9"
                      fill={isAccepted ? '#15803D' : '#FFFFFF'}
                      stroke={isAccepted ? '#15803D' : '#88847C'}
                      strokeWidth="1.5"
                    />
                    <text
                      x={(u.x + v.x) / 2}
                      y={(u.y + v.y) / 2 + 3}
                      textAnchor="middle"
                      fill={isAccepted ? '#FFFFFF' : '#1A1A1A'}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {e.weight}
                    </text>
                  </g>
                );
              })}

              {vertices.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="16"
                    fill="#FFFFFF"
                    stroke="#1A1A1A"
                    strokeWidth="2"
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill="#1A1A1A"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.id}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* DSU Sets & Cumulative MST Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Disjoint Set Union (DSU) Partitions:</span>
              <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] font-mono text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-bold">
                {kruskalStep >= 0 ? kruskalSteps[kruskalStep].dsuSets : '{A}, {B}, {C}, {D}, {E}'}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Cumulative MST Cost:</span>
              <div className="p-2 rounded bg-[#F0FDF4] dark:bg-[#064E3B]/40 border border-[#DCFCE7] dark:border-[#059669]/50 font-mono text-xs text-[#15803D] dark:text-[#4ADE80] font-bold flex items-center justify-between">
                <span>Total Weight: {kruskalStep >= 0 ? kruskalSteps[kruskalStep].costSoFar : 0}</span>
                <span className="text-[11px] text-[#166534]">
                  Edges Picked: {kruskalStep >= 0 ? kruskalSteps[kruskalStep].acceptedEdges.length : 0} / 4
                </span>
              </div>
            </div>
          </div>

          {kruskalStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] dark:text-[#D6D0C5] bg-[#F0FDF4] dark:bg-[#064E3B]/40 p-3 rounded-lg border border-[#DCFCE7] dark:border-[#059669]/50 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
              <span>
                <strong>Step {kruskalStep + 1}:</strong> {kruskalSteps[kruskalStep].note}
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Prim's Algorithm */}
      {activeTab === 'prim' && (
        <div className="space-y-5">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              Prim's Growing Vertex Cut & Priority Queue:
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (primStep < primSteps.length - 1) setPrimStep((prev) => prev + 1);
                }}
                disabled={primStep >= primSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Grow Tree Step
              </button>
              <button
                onClick={() => setIsPrimPlaying(!isPrimPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  isPrimPlaying
                    ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 text-[#991B1B] dark:text-[#EF4444] border-[#FECACA] dark:border-[#7F1D1D]'
                    : 'bg-white dark:bg-[#064E3B]/30 text-[#15803D] dark:text-[#4ADE80] border-[#DCFCE7] dark:border-[#059669]/40 hover:bg-[#F0FDF4] dark:bg-[#064E3B]/40 dark:hover:bg-[#064E3B]/50'
                }`}
              >
                <Play className="w-3.5 h-3.5" /> {isPrimPlaying ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={resetPrim}
                className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:bg-[#2A2622] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prim SVG */}
          <div className="relative p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto flex justify-center">
            <svg width="420" height="210">
              {allEdges.map((e) => {
                const u = vertices.find((v) => v.id === e.u)!;
                const v = vertices.find((v) => v.id === e.v)!;
                const isSelected = primStep >= 0 && primSteps.slice(0, primStep + 1).some(
                  (s) => s.addedEdge && ((s.addedEdge.u === e.u && s.addedEdge.v === e.v) || (s.addedEdge.u === e.v && s.addedEdge.v === e.u))
                );

                return (
                  <g key={e.id}>
                    <line
                      x1={u.x}
                      y1={u.y}
                      x2={v.x}
                      y2={v.y}
                      stroke={isSelected ? '#15803D' : '#D8D4C8'}
                      strokeWidth={isSelected ? '4' : '2'}
                    />
                    <circle
                      cx={(u.x + v.x) / 2}
                      cy={(u.y + v.y) / 2}
                      r="9"
                      fill={isSelected ? '#15803D' : '#FFFFFF'}
                      stroke={isSelected ? '#15803D' : '#88847C'}
                      strokeWidth="1.5"
                    />
                    <text
                      x={(u.x + v.x) / 2}
                      y={(u.y + v.y) / 2 + 3}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#1A1A1A'}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {e.weight}
                    </text>
                  </g>
                );
              })}

              {vertices.map((node) => {
                const inTree = primStep >= 0 && primSteps[primStep].treeVertices.includes(node.id);
                const isCurrent = primStep >= 0 && primSteps[primStep].currentVertex === node.id;

                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="16"
                      fill={isCurrent ? '#991B1B' : inTree ? '#15803D' : '#FFFFFF'}
                      stroke={isCurrent ? '#7F1D1D' : inTree ? '#166534' : '#88847C'}
                      strokeWidth="2"
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill={inTree || isCurrent ? '#FFFFFF' : '#1A1A1A'}
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Prim State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Tree Set S & Frontier Cuts:</span>
              <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] font-mono text-xs text-[#1A1A1A] dark:text-[#EDE8DF]">
                <strong>Tree Vertices:</strong> {primStep >= 0 ? `{ ${primSteps[primStep].treeVertices.join(', ')} }` : '{ A }'}<br />
                <strong>Priority Queue Cuts:</strong> {primStep >= 0 ? primSteps[primStep].candidateEdges.join(', ') || 'None' : '(A,B: 3), (A,D: 5)'}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Cumulative MST Cost:</span>
              <div className="p-2 rounded bg-[#F0FDF4] dark:bg-[#064E3B]/40 border border-[#DCFCE7] dark:border-[#059669]/50 font-mono text-xs text-[#15803D] dark:text-[#4ADE80] font-bold flex items-center justify-between">
                <span>Total Weight: {primStep >= 0 ? primSteps[primStep].costSoFar : 0}</span>
                <span className="text-[11px] text-[#166534]">
                  Vertices In Tree: {primStep >= 0 ? primSteps[primStep].treeVertices.length : 1} / 5
                </span>
              </div>
            </div>
          </div>

          {primStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] dark:text-[#D6D0C5] bg-[#F0FDF4] dark:bg-[#064E3B]/40 p-3 rounded-lg border border-[#DCFCE7] dark:border-[#059669]/50 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
              <span>
                <strong>Step {primStep + 1}:</strong> {primSteps[primStep].note}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
