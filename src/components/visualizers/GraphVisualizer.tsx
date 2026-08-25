import React, { useState, useEffect } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  Play,
  RotateCcw,
  Network,
  ArrowRight,
  Layers,
  Zap,
  Grid,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

interface GraphVisualizerProps {
  focusedMode?: 'bfs' | 'dfs' | 'topological' | 'warshall';
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ focusedMode = 'bfs' }) => {
  const [activeTab, setActiveTab] = useState<'bfs' | 'dfs' | 'topological' | 'warshall'>(focusedMode);

  // BFS / DFS animation state
  const [traversalStep, setTraversalStep] = useState<number>(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Warshall Step State (k = 0, 1, 2, 3, 4)
  const [warshallK, setWarshallK] = useState<number>(0);

  // Graph Vertices
  const vertices: GraphNode[] = [
    { id: 'A', label: 'A (1)', x: 100, y: 50 },
    { id: 'B', label: 'B (2)', x: 250, y: 50 },
    { id: 'C', label: 'C (3)', x: 100, y: 170 },
    { id: 'D', label: 'D (4)', x: 250, y: 170 },
    { id: 'E', label: 'E (5)', x: 340, y: 110 },
  ];

  const edges: GraphEdge[] = [
    { from: 'A', to: 'B', weight: 3 },
    { from: 'A', to: 'C', weight: 8 },
    { from: 'B', to: 'D', weight: 1 },
    { from: 'B', to: 'E', weight: 7 },
    { from: 'C', to: 'D', weight: 4 },
    { from: 'D', to: 'E', weight: 2 },
  ];

  // BFS trace steps
  const bfsSteps = [
    { current: 'A', queue: ['A'], visited: ['A'], note: 'Enqueue Start Vertex A. Visited = {A}' },
    { current: 'A', queue: ['B', 'C'], visited: ['A', 'B', 'C'], note: 'Dequeue A. Inspect neighbors: Enqueue B and C.' },
    { current: 'B', queue: ['C', 'D', 'E'], visited: ['A', 'B', 'C', 'D', 'E'], note: 'Dequeue B. Enqueue unvisited neighbors D and E.' },
    { current: 'C', queue: ['D', 'E'], visited: ['A', 'B', 'C', 'D', 'E'], note: 'Dequeue C. Neighbor D already in queue/visited.' },
    { current: 'D', queue: ['E'], visited: ['A', 'B', 'C', 'D', 'E'], note: 'Dequeue D. Neighbor E already in queue/visited.' },
    { current: 'E', queue: [], visited: ['A', 'B', 'C', 'D', 'E'], note: 'Dequeue E. Queue is empty! BFS complete.' },
  ];

  // DFS trace steps
  const dfsSteps = [
    { current: 'A', stack: ['A'], visited: ['A'], note: 'Push A to Call Stack. Mark A visited.' },
    { current: 'B', stack: ['A', 'B'], visited: ['A', 'B'], note: 'Explore edge A->B. Push B to Call Stack.' },
    { current: 'D', stack: ['A', 'B', 'D'], visited: ['A', 'B', 'D'], note: 'Explore edge B->D. Push D to Call Stack.' },
    { current: 'E', stack: ['A', 'B', 'D', 'E'], visited: ['A', 'B', 'D', 'E'], note: 'Explore edge D->E. Push E to Call Stack.' },
    { current: 'E', stack: ['A', 'B', 'D'], visited: ['A', 'B', 'D', 'E'], note: 'No unvisited neighbors for E. Backtrack (Pop E).' },
    { current: 'C', stack: ['A', 'C'], visited: ['A', 'B', 'D', 'E', 'C'], note: 'Backtrack to A. Explore edge A->C. Push C to Stack.' },
    { current: 'C', stack: [], visited: ['A', 'B', 'D', 'E', 'C'], note: 'Pop C, Pop A. Stack empty! DFS complete.' },
  ];

  const currentSteps = activeTab === 'bfs' ? bfsSteps : dfsSteps;

  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setTraversalStep((prev) => {
          if (prev >= currentSteps.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentSteps.length]);

  const resetTraversal = () => {
    setTraversalStep(-1);
    setIsAutoPlaying(false);
  };

  // Warshall Matrices (4 vertices A, B, C, D)
  const warshallMatrices = [
    {
      k: 0,
      title: 'Initial Adjacency / Distance Matrix Q^(0)',
      matrix: [
        [0, 3, 8, '∞'],
        ['∞', 0, '∞', 1],
        ['∞', '∞', 0, 4],
        ['∞', '∞', '∞', 0]
      ]
    },
    {
      k: 1,
      title: 'Matrix Q^(1) (Allowing Vertex A / 1 as Intermediate)',
      matrix: [
        [0, 3, 8, '∞'],
        ['∞', 0, '∞', 1],
        ['∞', '∞', 0, 4],
        ['∞', '∞', '∞', 0]
      ]
    },
    {
      k: 2,
      title: 'Matrix Q^(2) (Allowing Vertex B / 2 as Intermediate: A->B->D = 3+1 = 4)',
      matrix: [
        [0, 3, 8, 4],
        ['∞', 0, '∞', 1],
        ['∞', '∞', 0, 4],
        ['∞', '∞', '∞', 0]
      ]
    },
    {
      k: 3,
      title: 'Matrix Q^(3) (Allowing Vertex C / 3 as Intermediate)',
      matrix: [
        [0, 3, 8, 4],
        ['∞', 0, '∞', 1],
        ['∞', '∞', 0, 4],
        ['∞', '∞', '∞', 0]
      ]
    },
    {
      k: 4,
      title: 'Final Distance Matrix Q^(4) (All-Pairs Shortest Paths)',
      matrix: [
        [0, 3, 8, 4],
        ['∞', 0, '∞', 1],
        ['∞', '∞', 0, 4],
        ['∞', '∞', '∞', 0]
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Network className="w-5 h-5 text-[#991B1B]" /> Graph Algorithms & Path Simulation Studio
          </h3>
          <div className="text-xs text-[#66625B] mt-0.5 font-sans">
            Master Graph Traversals (BFS / DFS), Topological DAG Sorts, and Modified Warshall / Floyd-Warshall Matrices.
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#F4F2EB] p-1 rounded-lg border border-[#E5E2D9]">
          <button
            onClick={() => { setActiveTab('bfs'); resetTraversal(); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'bfs' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            BFS (Queue)
          </button>
          <button
            onClick={() => { setActiveTab('dfs'); resetTraversal(); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'dfs' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            DFS (Recursion Stack)
          </button>
          <button
            onClick={() => setActiveTab('topological')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'topological' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Topological Sort (DAG)
          </button>
          <button
            onClick={() => setActiveTab('warshall')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'warshall' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Floyd-Warshall Matrix
          </button>
        </div>
      </div>

      {/* TAB 1 & 2: BFS / DFS */}
      {(activeTab === 'bfs' || activeTab === 'dfs') && (
        <div className="space-y-5">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">
                {activeTab === 'bfs' ? 'Breadth-First Search (Level by Level):' : 'Depth-First Search (Branch by Branch):'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (traversalStep < currentSteps.length - 1) {
                    setTraversalStep((prev) => prev + 1);
                  }
                }}
                disabled={traversalStep >= currentSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Next Step
              </button>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  isAutoPlaying
                    ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                    : 'bg-white text-[#15803D] border-[#DCFCE7] hover:bg-[#F0FDF4]'
                }`}
              >
                <Play className="w-3.5 h-3.5" /> {isAutoPlaying ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={resetTraversal}
                className="p-1.5 rounded-lg bg-white border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Graph Canvas */}
          <div className="relative p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] overflow-x-auto flex justify-center">
            <svg width="420" height="220">
              {/* Edges */}
              {edges.map((e, idx) => {
                const u = vertices.find((v) => v.id === e.from)!;
                const v = vertices.find((v) => v.id === e.to)!;
                return (
                  <g key={idx}>
                    <line
                      x1={u.x}
                      y1={u.y}
                      x2={v.x}
                      y2={v.y}
                      stroke="#B3ADA1"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    {e.weight && (
                      <text
                        x={(u.x + v.x) / 2 + 5}
                        y={(u.y + v.y) / 2 - 5}
                        fill="#66625B"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {e.weight}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Vertices */}
              {vertices.map((node) => {
                const isVisited = traversalStep >= 0 && currentSteps[traversalStep].visited.includes(node.id);
                const isCurrent = traversalStep >= 0 && currentSteps[traversalStep].current === node.id;

                return (
                  <g key={node.id} className="transition-all duration-300">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      fill={isCurrent ? '#991B1B' : isVisited ? '#15803D' : '#FFFFFF'}
                      stroke={isCurrent ? '#7F1D1D' : isVisited ? '#166534' : '#88847C'}
                      strokeWidth="2"
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill={isCurrent || isVisited ? '#FFFFFF' : '#1A1A1A'}
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

          {/* Execution State (Queue / Stack) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">
                {activeTab === 'bfs' ? 'FIFO Queue State:' : 'Recursion Call Stack:'}
              </span>
              <div className="flex items-center gap-2 p-2 rounded bg-[#FAF8F5] border border-[#E5E2D9] min-h-[36px] font-mono text-xs">
                {traversalStep >= 0 ? (
                  (activeTab === 'bfs' ? (currentSteps[traversalStep] as any).queue : (currentSteps[traversalStep] as any).stack).map((v: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white border border-[#991B1B] text-[#991B1B] font-bold">
                      {v}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#88847C] italic">Empty</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Visited Set:</span>
              <div className="flex items-center gap-2 p-2 rounded bg-[#FAF8F5] border border-[#E5E2D9] min-h-[36px] font-mono text-xs">
                {traversalStep >= 0 ? (
                  currentSteps[traversalStep].visited.map((v: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#F0FDF4] border border-[#15803D] text-[#15803D] font-bold">
                      {v}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#88847C] italic">No vertices visited</span>
                )}
              </div>
            </div>
          </div>

          {traversalStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] bg-[#F0FDF4] p-3 rounded-lg border border-[#DCFCE7] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>
                <strong>Step {traversalStep + 1}:</strong> {currentSteps[traversalStep].note}
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Topological Sorting (DAG) */}
      {activeTab === 'topological' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-[#991B1B]" /> Kahn's In-Degree 0 Topological Sort Algorithm
            </h4>
            <p className="text-xs text-[#44403C] leading-relaxed">
              Topological sort arranges vertices in a Directed Acyclic Graph (DAG) such that for every directed edge <Latex math="u \to v" />, vertex <MathText text="$u$" /> appears before vertex <MathText text="$v$" />.
            </p>
            <div className="p-3 bg-white rounded-lg border border-[#E5E2D9] space-y-2 text-xs text-[#44403C]">
              <div className="font-serif font-bold text-[#1A1A1A]">Algorithm Steps:</div>
              <ol className="list-decimal list-inside space-y-1 pl-1">
                <li>Compute the In-degree (number of incoming edges) for every vertex in the graph.</li>
                <li>Enqueue all vertices with <MathText text="$\text{In-Degree} = 0$" />.</li>
                <li>While the queue is not empty: Dequeue vertex <MathText text="$u$" />, append <MathText text="$u$" /> to output, and decrement in-degrees of all neighbors of <MathText text="$u$" /> by 1.</li>
                <li>If a neighbor's in-degree drops to 0, enqueue it immediately!</li>
              </ol>
            </div>
            <div className="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded text-xs font-mono font-bold text-[#14532D]">
              Linear Order for DAG above: [ A → B → C → D → E ] (Time Complexity: <Latex math="\mathcal{O}(V + E)" />)
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Modified Warshall / Floyd-Warshall All-Pairs Shortest Paths */}
      {activeTab === 'warshall' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Intermediate Step ($k$):</span>
              {[0, 1, 2, 3, 4].map((k) => (
                <button
                  key={k}
                  onClick={() => setWarshallK(k)}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer border ${
                    warshallK === k
                      ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-2xs'
                      : 'bg-white text-[#44403C] border-[#D8D4C8] hover:bg-[#F4F2EB]'
                  }`}
                >
                  Q^({k})
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#991B1B]">
                {warshallMatrices[warshallK].title}
              </span>
              <span className="text-[11px] font-mono text-[#66625B]">
                Formula: Q^(k)[i, j] = min( Q^(k-1)[i, j], Q^(k-1)[i, k] + Q^(k-1)[k, j] )
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-[#F4F2EB] text-[#2C2B29]">
                    <th className="p-2 border border-[#E5E2D9]">Node</th>
                    <th className="p-2 border border-[#E5E2D9]">A (1)</th>
                    <th className="p-2 border border-[#E5E2D9]">B (2)</th>
                    <th className="p-2 border border-[#E5E2D9]">C (3)</th>
                    <th className="p-2 border border-[#E5E2D9]">D (4)</th>
                  </tr>
                </thead>
                <tbody>
                  {warshallMatrices[warshallK].matrix.map((row, rIdx) => {
                    const rowNames = ['A (1)', 'B (2)', 'C (3)', 'D (4)'];
                    return (
                      <tr key={rIdx}>
                        <td className="p-2 font-bold bg-[#FAF8F5] border border-[#E5E2D9] font-serif">{rowNames[rIdx]}</td>
                        {row.map((val, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-2 border border-[#E5E2D9] font-bold ${
                              val === 0 ? 'text-[#88847C]' : val === '∞' ? 'text-[#991B1B]/60' : 'text-[#15803D] bg-[#F0FDF4]/30'
                            }`}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
