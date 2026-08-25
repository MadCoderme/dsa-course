import React, { useState, useEffect } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  Play,
  RotateCcw,
  Network,
  ArrowRight,
  Zap,
  CheckCircle2,
  ListOrdered,
  Layers,
  Sparkles,
  Route,
  Table,
  Compass
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
  type?: 'tree' | 'back' | 'forward' | 'cross';
}

interface GraphVisualizerProps {
  focusedMode?: 'bfs' | 'dfs' | 'topological' | 'warshall' | 'dijkstra' | 'representations';
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ focusedMode = 'bfs' }) => {
  const [activeTab, setActiveTab] = useState<'bfs' | 'dfs' | 'topological' | 'dijkstra' | 'representations' | 'warshall'>(
    focusedMode
  );

  // Common Graph Vertices
  const vertices: GraphNode[] = [
    { id: 'A', label: 'A', x: 70, y: 55 },
    { id: 'B', label: 'B', x: 190, y: 35 },
    { id: 'C', label: 'C', x: 70, y: 155 },
    { id: 'D', label: 'D', x: 190, y: 155 },
    { id: 'E', label: 'E', x: 310, y: 95 },
  ];

  const edges: GraphEdge[] = [
    { from: 'A', to: 'B', weight: 4, type: 'tree' },
    { from: 'A', to: 'C', weight: 2, type: 'tree' },
    { from: 'B', to: 'D', weight: 5, type: 'tree' },
    { from: 'B', to: 'E', weight: 10, type: 'tree' },
    { from: 'C', to: 'D', weight: 1, type: 'forward' },
    { from: 'D', to: 'E', weight: 3, type: 'tree' },
  ];

  // 1. BFS & DFS Animation State
  const [traversalStep, setTraversalStep] = useState<number>(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const bfsSteps = [
    { current: 'A', queue: ['A'], visited: ['A'], note: 'Enqueue Start Vertex A. Visited = {A}' },
    { current: 'A', queue: ['B', 'C'], visited: ['A', 'B', 'C'], note: 'Dequeue A. Inspect neighbors: Enqueue B and C. Level 1 complete.' },
    { current: 'B', queue: ['C', 'D', 'E'], visited: ['A', 'B', 'C', 'D', 'E'], note: 'Dequeue B. Enqueue unvisited neighbors D and E.' },
    { current: 'C', queue: ['D', 'E'], visited: ['A', 'B', 'C', 'D', 'E'], note: 'Dequeue C. Neighbor D is already in queue.' },
    { current: 'D', queue: ['E'], visited: ['A', 'B', 'C', 'D', 'E'], note: 'Dequeue D. Neighbor E is already in queue.' },
    { current: 'E', queue: [], visited: ['A', 'B', 'C', 'D', 'E'], note: 'Dequeue E. Queue is empty! BFS finished in O(V + E) time.' },
  ];

  const dfsSteps = [
    { current: 'A', stack: ['A'], visited: ['A'], note: 'Push A to Call Stack. Mark A as visited.' },
    { current: 'B', stack: ['A', 'B'], visited: ['A', 'B'], note: 'Explore Tree Edge A->B. Push B to Call Stack.' },
    { current: 'D', stack: ['A', 'B', 'D'], visited: ['A', 'B', 'D'], note: 'Explore Tree Edge B->D. Push D to Call Stack.' },
    { current: 'E', stack: ['A', 'B', 'D', 'E'], visited: ['A', 'B', 'D', 'E'], note: 'Explore Tree Edge D->E. Push E to Call Stack.' },
    { current: 'E', stack: ['A', 'B', 'D'], visited: ['A', 'B', 'D', 'E'], note: 'E has no unvisited neighbors. Backtrack: Pop E.' },
    { current: 'C', stack: ['A', 'C'], visited: ['A', 'B', 'D', 'E', 'C'], note: 'Backtrack to A. Explore Tree Edge A->C. Push C.' },
    { current: 'C', stack: [], visited: ['A', 'B', 'D', 'E', 'C'], note: 'Pop C, Pop A. Stack empty! DFS complete.' },
  ];

  // 2. Topological Sort Animation State
  const [topoStep, setTopoStep] = useState<number>(-1);
  const [isTopoPlaying, setIsTopoPlaying] = useState<boolean>(false);

  const topoSteps = [
    {
      current: '',
      queue: ['A'],
      inDegrees: { A: 0, B: 1, C: 1, D: 2, E: 2 },
      output: [],
      note: 'Initialize In-Degrees: A=0, B=1, C=1, D=2, E=2. Enqueue in-degree 0 vertex [A].'
    },
    {
      current: 'A',
      queue: ['B', 'C'],
      inDegrees: { A: 0, B: 0, C: 0, D: 2, E: 2 },
      output: ['A'],
      note: 'Dequeue A -> Add to Output. Decrement in-degrees for B (0) and C (0). Enqueue B and C.'
    },
    {
      current: 'B',
      queue: ['C'],
      inDegrees: { A: 0, B: 0, C: 0, D: 1, E: 1 },
      output: ['A', 'B'],
      note: 'Dequeue B -> Add to Output. Decrement in-degrees for D (1) and E (1).'
    },
    {
      current: 'C',
      queue: ['D'],
      inDegrees: { A: 0, B: 0, C: 0, D: 0, E: 1 },
      output: ['A', 'B', 'C'],
      note: 'Dequeue C -> Add to Output. Decrement in-degree for D (0). In-degree hits 0 -> Enqueue D.'
    },
    {
      current: 'D',
      queue: ['E'],
      inDegrees: { A: 0, B: 0, C: 0, D: 0, E: 0 },
      output: ['A', 'B', 'C', 'D'],
      note: 'Dequeue D -> Add to Output. Decrement in-degree for E (0). In-degree hits 0 -> Enqueue E.'
    },
    {
      current: 'E',
      queue: [],
      inDegrees: { A: 0, B: 0, C: 0, D: 0, E: 0 },
      output: ['A', 'B', 'C', 'D', 'E'],
      note: 'Dequeue E -> Add to Output. Queue is empty. Valid linear DAG ordering: [A, B, C, D, E].'
    }
  ];

  // 3. Dijkstra's Algorithm State
  const [dijkstraStep, setDijkstraStep] = useState<number>(-1);
  const [isDijkstraPlaying, setIsDijkstraPlaying] = useState<boolean>(false);

  const dijkstraSteps = [
    {
      settled: [],
      current: 'A',
      dist: { A: 0, B: '∞', C: '∞', D: '∞', E: '∞' },
      pq: ['(A, 0)'],
      note: 'Initialize source distance dist[A] = 0, all other vertices = ∞. Insert (A, 0) into Min-Priority Queue.'
    },
    {
      settled: ['A'],
      current: 'A',
      dist: { A: 0, B: 4, C: 2, D: '∞', E: '∞' },
      pq: ['(C, 2)', '(B, 4)'],
      note: 'Extract min (A, 0). Settle vertex A. Relax edge A->B (dist 0+4=4) and A->C (dist 0+2=2). Insert (C, 2), (B, 4).'
    },
    {
      settled: ['A', 'C'],
      current: 'C',
      dist: { A: 0, B: 4, C: 2, D: 3, E: '∞' },
      pq: ['(D, 3)', '(B, 4)'],
      note: 'Extract min (C, 2). Settle vertex C. Relax edge C->D: dist[D] = min(∞, 2+1) = 3. Insert (D, 3).'
    },
    {
      settled: ['A', 'C', 'D'],
      current: 'D',
      dist: { A: 0, B: 4, C: 2, D: 3, E: 6 },
      pq: ['(B, 4)', '(E, 6)'],
      note: 'Extract min (D, 3). Settle vertex D. Relax edge D->E: dist[E] = min(∞, 3+3) = 6. Insert (E, 6).'
    },
    {
      settled: ['A', 'C', 'D', 'B'],
      current: 'B',
      dist: { A: 0, B: 4, C: 2, D: 3, E: 6 },
      pq: ['(E, 6)'],
      note: 'Extract min (B, 4). Settle vertex B. Relax B->D (4+5=9 > 3, no update) and B->E (4+10=14 > 6, no update).'
    },
    {
      settled: ['A', 'C', 'D', 'B', 'E'],
      current: 'E',
      dist: { A: 0, B: 4, C: 2, D: 3, E: 6 },
      pq: [],
      note: 'Extract min (E, 6). Settle vertex E. All reachable vertices settled. Shortest paths computed!'
    }
  ];

  // 4. Floyd-Warshall Matrices
  const [warshallK, setWarshallK] = useState<number>(0);
  const warshallMatrices = [
    {
      k: 0,
      title: 'Initial Adjacency Weight Matrix Q^(0) (Direct Edges Only)',
      matrix: [
        [0, 4, 2, '∞', '∞'],
        ['∞', 0, '∞', 5, 10],
        ['∞', '∞', 0, 1, '∞'],
        ['∞', '∞', '∞', 0, 3],
        ['∞', '∞', '∞', '∞', 0],
      ]
    },
    {
      k: 1,
      title: 'Matrix Q^(1) (Allowing Vertex A as Intermediate)',
      matrix: [
        [0, 4, 2, '∞', '∞'],
        ['∞', 0, '∞', 5, 10],
        ['∞', '∞', 0, 1, '∞'],
        ['∞', '∞', '∞', 0, 3],
        ['∞', '∞', '∞', '∞', 0],
      ]
    },
    {
      k: 2,
      title: 'Matrix Q^(2) (Allowing Vertices {A, B} as Intermediate: A->B->D = 4+5 = 9)',
      matrix: [
        [0, 4, 2, 9, 14],
        ['∞', 0, '∞', 5, 10],
        ['∞', '∞', 0, 1, '∞'],
        ['∞', '∞', '∞', 0, 3],
        ['∞', '∞', '∞', '∞', 0],
      ]
    },
    {
      k: 3,
      title: 'Matrix Q^(3) (Allowing {A, B, C}: A->C->D = 2+1 = 3, improving from 9!)',
      matrix: [
        [0, 4, 2, 3, 14],
        ['∞', 0, '∞', 5, 10],
        ['∞', '∞', 0, 1, '∞'],
        ['∞', '∞', '∞', 0, 3],
        ['∞', '∞', '∞', '∞', 0],
      ]
    },
    {
      k: 4,
      title: 'Matrix Q^(4) (Allowing {A, B, C, D}: A->C->D->E = 2+1+3 = 6, improving from 14!)',
      matrix: [
        [0, 4, 2, 3, 6],
        ['∞', 0, '∞', 5, 8],
        ['∞', '∞', 0, 1, 4],
        ['∞', '∞', '∞', 0, 3],
        ['∞', '∞', '∞', '∞', 0],
      ]
    },
  ];

  // Auto-play timers
  const currentTraversalSteps = activeTab === 'bfs' ? bfsSteps : dfsSteps;

  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setTraversalStep((prev) => {
          if (prev >= currentTraversalSteps.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentTraversalSteps.length]);

  useEffect(() => {
    let timer: any;
    if (isTopoPlaying) {
      timer = setInterval(() => {
        setTopoStep((prev) => {
          if (prev >= topoSteps.length - 1) {
            setIsTopoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isTopoPlaying]);

  useEffect(() => {
    let timer: any;
    if (isDijkstraPlaying) {
      timer = setInterval(() => {
        setDijkstraStep((prev) => {
          if (prev >= dijkstraSteps.length - 1) {
            setIsDijkstraPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1300);
    }
    return () => clearInterval(timer);
  }, [isDijkstraPlaying]);

  const resetTraversal = () => {
    setTraversalStep(-1);
    setIsAutoPlaying(false);
  };

  const resetTopo = () => {
    setTopoStep(-1);
    setIsTopoPlaying(false);
  };

  const resetDijkstra = () => {
    setDijkstraStep(-1);
    setIsDijkstraPlaying(false);
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Network className="w-5 h-5 text-[#991B1B]" /> Graph Algorithms & Path Simulation Studio
          </h3>
          <div className="text-xs text-[#66625B] mt-0.5 font-sans">
            Interactive suite for Graph Representations ($A^k$), Traversals (BFS/DFS Edge Types), Kahn's Topological DAG Sort, Dijkstra's Shortest Path, and Floyd-Warshall DP Matrices.
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1 bg-[#F4F2EB] p-1 rounded-lg border border-[#E5E2D9]">
          <button
            onClick={() => { setActiveTab('representations'); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'representations' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Adjacency Matrix & $A^k$
          </button>
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
            DFS (4 Edge Types)
          </button>
          <button
            onClick={() => { setActiveTab('topological'); resetTopo(); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'topological' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Topological Sort (DAG)
          </button>
          <button
            onClick={() => { setActiveTab('dijkstra'); resetDijkstra(); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'dijkstra' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Dijkstra (PQ)
          </button>
          <button
            onClick={() => { setActiveTab('warshall'); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'warshall' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Floyd-Warshall Q^(k)
          </button>
        </div>
      </div>

      {/* TAB 1: Graph Representations & A^k Matrix Power */}
      {activeTab === 'representations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Adjacency Matrix */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
              <h4 className="text-xs font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Table className="w-4 h-4 text-[#991B1B]" /> 1. Adjacency Matrix Representation ($A$)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-[#E5E2D9] font-bold">
                      <th className="p-1 border border-[#D8D4C8]">-</th>
                      <th className="p-1 border border-[#D8D4C8]">A</th>
                      <th className="p-1 border border-[#D8D4C8]">B</th>
                      <th className="p-1 border border-[#D8D4C8]">C</th>
                      <th className="p-1 border border-[#D8D4C8]">D</th>
                      <th className="p-1 border border-[#D8D4C8]">E</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-1 font-bold bg-[#E5E2D9] border border-[#D8D4C8]">A</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8] font-bold text-[#15803D]">1</td><td className="p-1 border border-[#D8D4C8] font-bold text-[#15803D]">1</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td></tr>
                    <tr><td className="p-1 font-bold bg-[#E5E2D9] border border-[#D8D4C8]">B</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8] font-bold text-[#15803D]">1</td><td className="p-1 border border-[#D8D4C8] font-bold text-[#15803D]">1</td></tr>
                    <tr><td className="p-1 font-bold bg-[#E5E2D9] border border-[#D8D4C8]">C</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8] font-bold text-[#15803D]">1</td><td className="p-1 border border-[#D8D4C8]">0</td></tr>
                    <tr><td className="p-1 font-bold bg-[#E5E2D9] border border-[#D8D4C8]">D</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8] font-bold text-[#15803D]">1</td></tr>
                    <tr><td className="p-1 font-bold bg-[#E5E2D9] border border-[#D8D4C8]">E</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td><td className="p-1 border border-[#D8D4C8]">0</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="text-[11px] text-[#66625B]">
                Memory: <Latex math="\mathcal{O}(V^2)" />. Direct edge check in <Latex math="\mathcal{O}(1)" />.
              </div>
            </div>

            {/* Adjacency List */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
              <h4 className="text-xs font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <ListOrdered className="w-4 h-4 text-[#15803D]" /> 2. Adjacency List Representation
              </h4>
              <div className="p-2.5 rounded bg-white border border-[#E5E2D9] space-y-1.5 font-mono text-xs">
                <div><strong>A:</strong> &rarr; [B, w=4] &rarr; [C, w=2] &rarr; NULL</div>
                <div><strong>B:</strong> &rarr; [D, w=5] &rarr; [E, w=10] &rarr; NULL</div>
                <div><strong>C:</strong> &rarr; [D, w=1] &rarr; NULL</div>
                <div><strong>D:</strong> &rarr; [E, w=3] &rarr; NULL</div>
                <div><strong>E:</strong> &rarr; NULL</div>
              </div>
              <div className="text-[11px] text-[#66625B]">
                Memory: <Latex math="\mathcal{O}(V + E)" />. Optimal for sparse graphs.
              </div>
            </div>
          </div>

          {/* Path Matrix Power Formula */}
          <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-2">
            <h4 className="text-xs font-serif font-bold text-[#991B1B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#991B1B]" /> Fundamental Theorem: Length-$k$ Paths via $A^k$
            </h4>
            <p className="text-xs text-[#44403C] leading-relaxed">
              If <MathText text="$A$" /> is the adjacency matrix of a graph, then the entry <Latex math="A^k[i][j]" /> gives the <strong>exact number of distinct walks of length $k$</strong> from vertex <MathText text="$i$" /> to vertex <MathText text="$j$" />.
            </p>
            <div className="p-2.5 bg-[#FAF8F5] rounded border border-[#E5E2D9] text-xs font-mono text-[#1A1A1A]">
              Length-2 Paths from A: A &rarr; D has 2 paths (A-B-D and A-C-D) &rArr; A²[A][D] = 2.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 & 3: BFS and DFS Traversals */}
      {(activeTab === 'bfs' || activeTab === 'dfs') && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A]">
              {activeTab === 'bfs' ? 'Breadth-First Search (FIFO Queue):' : 'Depth-First Search (Recursion Call Stack):'}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (traversalStep < currentTraversalSteps.length - 1) setTraversalStep((prev) => prev + 1);
                }}
                disabled={traversalStep >= currentTraversalSteps.length - 1}
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

          {/* SVG Canvas */}
          <div className="relative p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] overflow-x-auto flex justify-center">
            <svg width="400" height="210">
              <defs>
                <marker id="graph-arrow" markerWidth="8" markerHeight="6" refX="17" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#88847C" />
                </marker>
              </defs>

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
                      stroke={activeTab === 'dfs' && e.type === 'forward' ? '#D97706' : '#B3ADA1'}
                      strokeWidth="2"
                      strokeDasharray={activeTab === 'dfs' && e.type === 'forward' ? '4,4' : undefined}
                      markerEnd="url(#graph-arrow)"
                    />
                    <text
                      x={(u.x + v.x) / 2 + 6}
                      y={(u.y + v.y) / 2 - 4}
                      fill="#66625B"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {e.weight}
                    </text>
                  </g>
                );
              })}

              {/* Vertices */}
              {vertices.map((node) => {
                const isVisited = traversalStep >= 0 && currentTraversalSteps[traversalStep].visited.includes(node.id);
                const isCurrent = traversalStep >= 0 && currentTraversalSteps[traversalStep].current === node.id;

                return (
                  <g key={node.id} className="transition-all duration-300">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="16"
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

          {/* Buffer State (Queue or Stack) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">
                {activeTab === 'bfs' ? 'FIFO Queue State:' : 'Call Stack Buffer:'}
              </span>
              <div className="flex items-center gap-2 p-2 rounded bg-[#FAF8F5] border border-[#E5E2D9] min-h-[36px] font-mono text-xs font-bold text-[#991B1B]">
                {traversalStep >= 0 ? (
                  activeTab === 'bfs' ? (
                    (currentTraversalSteps[traversalStep] as any).queue.length > 0 ? (
                      (currentTraversalSteps[traversalStep] as any).queue.map((item: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white border border-[#E5E2D9]">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#88847C] italic">Queue is empty</span>
                    )
                  ) : (
                    (currentTraversalSteps[traversalStep] as any).stack.length > 0 ? (
                      (currentTraversalSteps[traversalStep] as any).stack.map((item: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white border border-[#E5E2D9]">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#88847C] italic">Stack is empty</span>
                    )
                  )
                ) : (
                  <span className="text-xs text-[#88847C] italic">Click Next Step to begin...</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Visited Set:</span>
              <div className="flex items-center gap-1.5 p-2 rounded bg-[#F0FDF4] border border-[#DCFCE7] min-h-[36px] font-mono text-xs text-[#15803D] font-bold">
                {traversalStep >= 0 ? (
                  `{ ${currentTraversalSteps[traversalStep].visited.join(', ')} }`
                ) : (
                  <span className="text-xs text-[#88847C] italic">{`{ }`}</span>
                )}
              </div>
            </div>
          </div>

          {traversalStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] bg-[#F0FDF4] p-3 rounded-lg border border-[#DCFCE7] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>
                <strong>Step {traversalStep + 1}:</strong> {currentTraversalSteps[traversalStep].note}
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Topological Sort (Kahn's DAG Algorithm) */}
      {activeTab === 'topological' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A]">
              Kahn's Algorithm (In-Degree Zero Reduction on DAG):
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (topoStep < topoSteps.length - 1) setTopoStep((prev) => prev + 1);
                }}
                disabled={topoStep >= topoSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Next Dequeue Step
              </button>
              <button
                onClick={() => setIsTopoPlaying(!isTopoPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  isTopoPlaying
                    ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                    : 'bg-white text-[#15803D] border-[#DCFCE7] hover:bg-[#F0FDF4]'
                }`}
              >
                <Play className="w-3.5 h-3.5" /> {isTopoPlaying ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={resetTopo}
                className="p-1.5 rounded-lg bg-white border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* In-Degree Table & Output Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Live In-Degree Table:</span>
              <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
                {['A', 'B', 'C', 'D', 'E'].map((v) => {
                  const deg = topoStep >= 0 ? (topoSteps[topoStep].inDegrees as any)[v] : (topoSteps[0].inDegrees as any)[v];
                  return (
                    <div key={v} className="p-2 rounded bg-[#FAF8F5] border border-[#E5E2D9]">
                      <div className="font-bold text-[#66625B]">{v}</div>
                      <div className={`font-bold mt-1 text-sm ${deg === 0 ? 'text-[#15803D]' : 'text-[#991B1B]'}`}>
                        {deg}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Topological Ordering Output:</span>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#FAF8F5] border border-[#E5E2D9] min-h-[44px]">
                {topoStep >= 0 && topoSteps[topoStep].output.length > 0 ? (
                  topoSteps[topoStep].output.map((v, i) => (
                    <React.Fragment key={v}>
                      <span className="px-2.5 py-1 rounded bg-[#15803D] text-white font-mono font-bold text-xs shadow-2xs">
                        {v}
                      </span>
                      {i < topoSteps[topoStep].output.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#88847C]" />}
                    </React.Fragment>
                  ))
                ) : (
                  <span className="text-xs text-[#88847C] italic">Output will populate as nodes hit in-degree 0...</span>
                )}
              </div>
            </div>
          </div>

          {topoStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] bg-[#F0FDF4] p-3 rounded-lg border border-[#DCFCE7] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>
                <strong>Step {topoStep + 1}:</strong> {topoSteps[topoStep].note}
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Dijkstra's Algorithm */}
      {activeTab === 'dijkstra' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A]">
              Dijkstra's Single-Source Shortest Path (Source: A):
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (dijkstraStep < dijkstraSteps.length - 1) setDijkstraStep((prev) => prev + 1);
                }}
                disabled={dijkstraStep >= dijkstraSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Relax Next Vertex
              </button>
              <button
                onClick={() => setIsDijkstraPlaying(!isDijkstraPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  isDijkstraPlaying
                    ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                    : 'bg-white text-[#15803D] border-[#DCFCE7] hover:bg-[#F0FDF4]'
                }`}
              >
                <Play className="w-3.5 h-3.5" /> {isDijkstraPlaying ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={resetDijkstra}
                className="p-1.5 rounded-lg bg-white border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Distance Table & Settled State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Tentative Distance Table $d[v]$:</span>
              <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
                {['A', 'B', 'C', 'D', 'E'].map((v) => {
                  const d = dijkstraStep >= 0 ? (dijkstraSteps[dijkstraStep].dist as any)[v] : '∞';
                  const isSettled = dijkstraStep >= 0 && dijkstraSteps[dijkstraStep].settled.includes(v);

                  return (
                    <div key={v} className={`p-2 rounded border ${isSettled ? 'bg-[#F0FDF4] border-[#86EFAC]' : 'bg-[#FAF8F5] border-[#E5E2D9]'}`}>
                      <div className="font-bold text-[#66625B]">{v}</div>
                      <div className={`font-bold mt-1 text-sm ${isSettled ? 'text-[#15803D]' : 'text-[#1A1A1A]'}`}>
                        {d}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Min-Priority Queue Contents:</span>
              <div className="flex flex-wrap items-center gap-1.5 p-2 rounded bg-[#FAF8F5] border border-[#E5E2D9] min-h-[44px] font-mono text-xs">
                {dijkstraStep >= 0 && dijkstraSteps[dijkstraStep].pq.length > 0 ? (
                  dijkstraSteps[dijkstraStep].pq.map((item, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-white border border-[#991B1B] text-[#991B1B] font-bold">
                      {item}
                    </span>
                  ))
                ) : dijkstraStep >= 0 ? (
                  <span className="text-xs text-[#15803D] font-bold">PQ Empty (All settled)</span>
                ) : (
                  <span className="text-xs text-[#88847C] italic">Click Relax Next Vertex to step...</span>
                )}
              </div>
            </div>
          </div>

          {dijkstraStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] bg-[#F0FDF4] p-3 rounded-lg border border-[#DCFCE7] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>
                <strong>Step {dijkstraStep + 1}:</strong> {dijkstraSteps[dijkstraStep].note}
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: Floyd-Warshall Dynamic Programming Matrix */}
      {activeTab === 'warshall' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A]">
              Floyd-Warshall Step: Matrix Stage Q^({warshallK})
            </div>
            <div className="flex items-center gap-1">
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

          <div className="p-3.5 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
            <div className="text-xs font-serif font-bold text-[#991B1B]">
              {warshallMatrices[warshallK].title}
            </div>
            <div className="text-xs font-mono text-[#44403C]">
              DP Recurrence: <Latex math="Q^{(k)}[i][j] = \min\left(Q^{(k-1)}[i][j], \; Q^{(k-1)}[i][k] + Q^{(k-1)}[k][j]\right)" />
            </div>
          </div>

          {/* Matrix Display */}
          <div className="overflow-x-auto rounded-xl border border-[#E5E2D9] bg-white p-4 flex justify-center">
            <table className="text-center font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] font-bold">
                  <th className="p-2 border border-[#E5E2D9]">Q^({warshallK})</th>
                  {['A', 'B', 'C', 'D', 'E'].map((v) => (
                    <th key={v} className="p-2 border border-[#E5E2D9] min-w-[40px] text-[#991B1B]">
                      {v}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['A', 'B', 'C', 'D', 'E'].map((rowV, rIdx) => (
                  <tr key={rowV} className="hover:bg-[#FAF8F5]">
                    <td className="p-2 font-bold bg-[#FAF8F5] border border-[#E5E2D9] text-[#991B1B]">{rowV}</td>
                    {warshallMatrices[warshallK].matrix[rIdx].map((val, cIdx) => (
                      <td
                        key={cIdx}
                        className={`p-2 border border-[#E5E2D9] ${
                          val === 0 ? 'bg-[#F4F2EB] text-[#88847C]' : val !== '∞' ? 'font-bold text-[#15803D]' : 'text-[#88847C]'
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
