import React, { useState, useEffect } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  Play,
  RotateCcw,
  Sparkles,
  GitBranch,
  ArrowRight,
  Layers,
  HelpCircle,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface TreeNode {
  id: number;
  val: string | number;
  x: number;
  y: number;
  leftId?: number;
  rightId?: number;
}

interface TreeVisualizerProps {
  focusedMode?: 'traversal' | 'expression' | 'properties' | 'threaded';
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ focusedMode = 'traversal' }) => {
  const [activeTab, setActiveTab] = useState<'traversal' | 'expression' | 'properties' | 'threaded'>(focusedMode);
  
  // Traversal state
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder' | 'levelorder'>('inorder');
  const [traversalStep, setTraversalStep] = useState<number>(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  // Expression Tree State
  const [selectedExpr, setSelectedExpr] = useState<string>('((A + B) * (C - D))');

  // Binary Tree Structure
  //        1 (A: 50)
  //       /        \
  //     2 (B: 25)    3 (C: 75)
  //    /    \       /     \
  //  4(12) 5(37)  6(62)  7(87)
  const defaultNodes: TreeNode[] = [
    { id: 1, val: '50', x: 200, y: 40, leftId: 2, rightId: 3 },
    { id: 2, val: '25', x: 100, y: 110, leftId: 4, rightId: 5 },
    { id: 3, val: '75', x: 300, y: 110, leftId: 6, rightId: 7 },
    { id: 4, val: '12', x: 50, y: 180 },
    { id: 5, val: '37', x: 150, y: 180 },
    { id: 6, val: '62', x: 250, y: 180 },
    { id: 7, val: '87', x: 350, y: 180 },
  ];

  const traversalOrders = {
    inorder: [
      { id: 4, val: '12', note: 'Traverse Left Subtree (Node 4: 12)' },
      { id: 2, val: '25', note: 'Visit Parent (Node 2: 25)' },
      { id: 5, val: '37', note: 'Traverse Right Subtree (Node 5: 37)' },
      { id: 1, val: '50', note: 'Visit Root (Node 1: 50)' },
      { id: 6, val: '62', note: 'Traverse Left of Right Subtree (Node 6: 62)' },
      { id: 3, val: '75', note: 'Visit Subtree Root (Node 3: 75)' },
      { id: 7, val: '87', note: 'Traverse Right Subtree (Node 7: 87)' },
    ],
    preorder: [
      { id: 1, val: '50', note: 'Visit Root first (Node 1: 50)' },
      { id: 2, val: '25', note: 'Visit Left Child (Node 2: 25)' },
      { id: 4, val: '12', note: 'Visit Leftmost Leaf (Node 4: 12)' },
      { id: 5, val: '37', note: 'Visit Right Leaf of Left Subtree (Node 5: 37)' },
      { id: 3, val: '75', note: 'Visit Right Subtree Root (Node 3: 75)' },
      { id: 6, val: '62', note: 'Visit Left Leaf (Node 6: 62)' },
      { id: 7, val: '87', note: 'Visit Rightmost Leaf (Node 7: 87)' },
    ],
    postorder: [
      { id: 4, val: '12', note: 'Process Left Leaf (Node 4: 12)' },
      { id: 5, val: '37', note: 'Process Right Leaf (Node 5: 37)' },
      { id: 2, val: '25', note: 'Process Left Parent (Node 2: 25)' },
      { id: 6, val: '62', note: 'Process Left of Right Subtree (Node 6: 62)' },
      { id: 7, val: '87', note: 'Process Rightmost Leaf (Node 7: 87)' },
      { id: 3, val: '75', note: 'Process Right Parent (Node 3: 75)' },
      { id: 1, val: '50', note: 'Finally Process Tree Root (Node 1: 50)' },
    ],
    levelorder: [
      { id: 1, val: '50', note: 'Level 0: Queue Root [50]' },
      { id: 2, val: '25', note: 'Level 1: Dequeue 50, Enqueue 25, 75' },
      { id: 3, val: '75', note: 'Level 1: Dequeue 75' },
      { id: 4, val: '12', note: 'Level 2: Dequeue 25, Enqueue 12, 37' },
      { id: 5, val: '37', note: 'Level 2: Process 37' },
      { id: 6, val: '62', note: 'Level 2: Dequeue 75, Enqueue 62, 87' },
      { id: 7, val: '87', note: 'Level 2: Process 87' },
    ],
  };

  const currentOrder = traversalOrders[traversalType];

  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setTraversalStep((prev) => {
          if (prev >= currentOrder.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentOrder.length]);

  useEffect(() => {
    if (traversalStep >= 0 && traversalStep < currentOrder.length) {
      setActiveNodeId(currentOrder[traversalStep].id);
    } else {
      setActiveNodeId(null);
    }
  }, [traversalStep, currentOrder]);

  const resetTraversal = () => {
    setTraversalStep(-1);
    setIsAutoPlaying(false);
    setActiveNodeId(null);
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#991B1B]" /> Binary Tree Laboratory & Traversal Engine
          </h3>
          <div className="text-xs text-[#66625B] mt-0.5 font-sans">
            Interactive visualization of recursive tree traversals ($L \to N \to R$), Complete Binary Tree array indexing, and Expression Trees.
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#F4F2EB] p-1 rounded-lg border border-[#E5E2D9]">
          <button
            onClick={() => { setActiveTab('traversal'); resetTraversal(); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'traversal' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Traversals (In/Pre/Post/Level)
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'properties' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Tree Formulas & Array Indexing
          </button>
          <button
            onClick={() => setActiveTab('expression')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'expression' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Expression Trees
          </button>
          <button
            onClick={() => setActiveTab('threaded')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'threaded' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Threaded Binary Tree
          </button>
        </div>
      </div>

      {/* TAB 1: Traversals Animation */}
      {activeTab === 'traversal' && (
        <div className="space-y-5">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Traversal Strategy:</span>
              {(['inorder', 'preorder', 'postorder', 'levelorder'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setTraversalType(type);
                    resetTraversal();
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold capitalize transition-all cursor-pointer border ${
                    traversalType === type
                      ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-2xs'
                      : 'bg-white text-[#44403C] border-[#D8D4C8] hover:bg-[#F4F2EB]'
                  }`}
                >
                  {type === 'inorder' && 'Inorder (L-N-R)'}
                  {type === 'preorder' && 'Preorder (N-L-R)'}
                  {type === 'postorder' && 'Postorder (L-R-N)'}
                  {type === 'levelorder' && 'Level-Order (BFS)'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (traversalStep < currentOrder.length - 1) {
                    setTraversalStep((prev) => prev + 1);
                  }
                }}
                disabled={traversalStep >= currentOrder.length - 1}
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

          {/* Tree SVG Canvas */}
          <div className="relative p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] overflow-x-auto flex justify-center">
            <svg width="400" height="230" className="overflow-visible">
              {/* Edges */}
              {defaultNodes.map((node) => {
                const leftChild = defaultNodes.find((n) => n.id === node.leftId);
                const rightChild = defaultNodes.find((n) => n.id === node.rightId);
                return (
                  <React.Fragment key={node.id}>
                    {leftChild && (
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={leftChild.x}
                        y2={leftChild.y}
                        stroke="#D8D4C8"
                        strokeWidth="2"
                      />
                    )}
                    {rightChild && (
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={rightChild.x}
                        y2={rightChild.y}
                        stroke="#D8D4C8"
                        strokeWidth="2"
                      />
                    )}
                  </React.Fragment>
                );
              })}

              {/* Nodes */}
              {defaultNodes.map((node) => {
                const isVisited = currentOrder.slice(0, traversalStep + 1).some((o) => o.id === node.id);
                const isCurrent = activeNodeId === node.id;
                const visitedIndex = currentOrder.findIndex((o) => o.id === node.id);
                const visitedStepNum = visitedIndex !== -1 && visitedIndex <= traversalStep ? visitedIndex + 1 : null;

                return (
                  <g key={node.id} className="transition-all duration-300">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      fill={isCurrent ? '#991B1B' : isVisited ? '#15803D' : '#FFFFFF'}
                      stroke={isCurrent ? '#7F1D1D' : isVisited ? '#166534' : '#B3ADA1'}
                      strokeWidth="2"
                      className="shadow-sm"
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
                      {node.val}
                    </text>

                    {/* Step order badge */}
                    {visitedStepNum && (
                      <g>
                        <circle cx={node.x + 14} cy={node.y - 12} r="8" fill="#F59E0B" />
                        <text
                          x={node.x + 14}
                          y={node.y - 9}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {visitedStepNum}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Visited Sequence Output */}
          <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> Traversal Sequence Output:
              </span>
              <span className="text-[11px] font-mono text-[#66625B]">
                Step {traversalStep + 1} of {currentOrder.length}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 min-h-[38px] p-2 rounded bg-[#FAF8F5] border border-[#E5E2D9]">
              {traversalStep === -1 ? (
                <span className="text-xs text-[#88847C] italic">Click "Next Step" or "Auto Play" to begin traversal trace...</span>
              ) : (
                currentOrder.slice(0, traversalStep + 1).map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2.5 py-1 rounded bg-white border border-[#15803D]/40 text-[#15803D] font-mono font-bold text-xs shadow-2xs">
                      {item.val}
                    </span>
                    {idx < traversalStep && <ArrowRight className="w-3.5 h-3.5 text-[#88847C]" />}
                  </React.Fragment>
                ))
              )}
            </div>

            {traversalStep >= 0 && (
              <div className="text-xs font-sans text-[#44403C] bg-[#F0FDF4] p-2.5 rounded border border-[#DCFCE7] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>
                  <strong>Step {traversalStep + 1}:</strong> {currentOrder[traversalStep].note}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Tree Formulas & Complete Binary Tree Array Indexing */}
      {activeTab === 'properties' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sequential Array Storage */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#991B1B]" /> Complete Binary Tree: Array Storage Formulas
              </h4>
              <div className="text-xs text-[#44403C] space-y-2 leading-relaxed">
                <div>For a node stored at 1-based array index <MathText text="$i$" />:</div>
                <div className="p-2.5 rounded bg-white border border-[#E5E2D9] space-y-1 font-mono text-xs">
                  <div className="text-[#991B1B] font-bold">LeftChild(i) = 2i</div>
                  <div className="text-[#15803D] font-bold">RightChild(i) = 2i + 1</div>
                  <div className="text-[#B45309] font-bold">Parent(i) = ⌊i / 2⌋</div>
                </div>
                <div>For 0-based array indexing:</div>
                <div className="p-2.5 rounded bg-white border border-[#E5E2D9] space-y-1 font-mono text-xs">
                  <div>LeftChild(i) = 2i + 1</div>
                  <div>RightChild(i) = 2i + 2</div>
                  <div>Parent(i) = ⌊(i - 1) / 2⌋</div>
                </div>
              </div>
            </div>

            {/* Tree Height & Capacity Formulas */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#15803D]" /> Key Mathematical Proofs & Limits
              </h4>
              <div className="space-y-2 text-xs text-[#44403C]">
                <div className="p-2.5 rounded bg-white border border-[#E5E2D9] space-y-1.5">
                  <div className="font-serif font-bold text-[#1A1A1A]">1. Maximum Nodes at Depth $d$:</div>
                  <div><Latex math="N_{\max}(d) = 2^d \quad (\text{Root at } d = 0)" /></div>
                </div>
                <div className="p-2.5 rounded bg-white border border-[#E5E2D9] space-y-1.5">
                  <div className="font-serif font-bold text-[#1A1A1A]">2. Total Nodes in Full Tree of Height $h$:</div>
                  <div><Latex math="N = 2^{h+1} - 1 \implies h = \lfloor \log_2(N) \rfloor" /></div>
                </div>
                <div className="p-2.5 rounded bg-white border border-[#E5E2D9] space-y-1.5">
                  <div className="font-serif font-bold text-[#1A1A1A]">3. Number of Leaves ($L$) in Full Binary Tree:</div>
                  <div><Latex math="L = 2^h = \frac{N + 1}{2}" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Array Mapping Table */}
          <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-2">
            <span className="text-xs font-serif font-bold text-[#1A1A1A]">1-Based Array Indexing Representation of Current Tree:</span>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-[#F4F2EB] text-[#2C2B29]">
                    <th className="p-2 border border-[#E5E2D9]">Index ($i$)</th>
                    {defaultNodes.map((n, i) => (
                      <th key={i} className="p-2 border border-[#E5E2D9]">{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 font-bold bg-[#FAF8F5] border border-[#E5E2D9] font-serif">Tree Value</td>
                    {defaultNodes.map((n) => (
                      <td key={n.id} className="p-2 border border-[#E5E2D9] font-bold text-[#991B1B] bg-white">
                        {n.val}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 font-bold bg-[#FAF8F5] border border-[#E5E2D9] font-serif">Left Child ($2i$)</td>
                    {defaultNodes.map((n, i) => {
                      const leftIdx = 2 * (i + 1);
                      return (
                        <td key={n.id} className="p-2 border border-[#E5E2D9] text-[#66625B]">
                          {leftIdx <= defaultNodes.length ? `[${leftIdx}] = ${defaultNodes[leftIdx - 1].val}` : 'NULL'}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Expression Trees */}
      {activeTab === 'expression' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A]">Arithmetic Expression Trees</h4>
            <p className="text-xs text-[#44403C] leading-relaxed">
              In an Expression Tree, internal nodes are mathematical operators (<code className="text-[#991B1B] font-mono font-bold">+ - * / ^</code>) and leaf nodes are operands (constants or variables).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#15803D]">Inorder Traversal gives:</span>
              <div className="p-2.5 rounded bg-[#FAF8F5] font-mono text-xs font-bold text-[#1A1A1A]">
                (A + B) * (C - D)
              </div>
              <div className="text-[11px] text-[#66625B]">Produces standard infix algebraic expression (with parentheses).</div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#991B1B]">Preorder Traversal gives:</span>
              <div className="p-2.5 rounded bg-[#FAF8F5] font-mono text-xs font-bold text-[#991B1B]">
                * + A B - C D
              </div>
              <div className="text-[11px] text-[#66625B]">Produces Polish (Prefix) notation without requiring any parentheses.</div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-serif font-bold text-[#B45309]">Postorder Traversal gives:</span>
              <div className="p-2.5 rounded bg-[#FAF8F5] font-mono text-xs font-bold text-[#B45309]">
                A B + C D - *
              </div>
              <div className="text-[11px] text-[#66625B]">Produces Reverse Polish (Postfix) notation used by compilers and calculators.</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Threaded Binary Trees */}
      {activeTab === 'threaded' && (
        <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
          <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#B45309]" /> Threaded Binary Tree Mechanics
          </h4>
          <p className="text-xs text-[#44403C] leading-relaxed">
            In standard linked binary trees with <MathText text="$N$" /> nodes, exactly <MathText text="$N + 1$" /> pointer fields contain empty <code className="text-[#991B1B] font-mono">NULL</code> references (wasting over 50% of pointer memory!).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-lg bg-white border border-[#E5E2D9] space-y-1.5">
              <div className="text-xs font-serif font-bold text-[#1A1A1A]">1. Right Thread:</div>
              <div className="text-xs text-[#44403C]">
                Points directly to the node's <strong>Inorder Successor</strong>. Allows forward traversal without recursion or an execution stack in <Latex math="\mathcal{O}(1)" /> space.
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-[#E5E2D9] space-y-1.5">
              <div className="text-xs font-serif font-bold text-[#1A1A1A]">2. Left Thread:</div>
              <div className="text-xs text-[#44403C]">
                Points directly to the node's <strong>Inorder Predecessor</strong>. Enables bidirectional tree navigation.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
