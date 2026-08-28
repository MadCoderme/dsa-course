import React, { useState, useEffect } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  Play,
  RotateCcw,
  Sparkles,
  GitBranch,
  ArrowRight,
  Layers,
  Zap,
  CheckCircle2,
  Share2,
  Calculator,
  Compass,
  ArrowDownRight,
  ArrowUpRight
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
  focusedMode?: 'traversal' | 'conversion' | 'expression' | 'properties' | 'threaded';
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ focusedMode = 'traversal' }) => {
  const [activeTab, setActiveTab] = useState<'traversal' | 'conversion' | 'expression' | 'properties' | 'threaded'>(focusedMode);

  // 1. Traversal state
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder' | 'levelorder'>('inorder');
  const [traversalStep, setTraversalStep] = useState<number>(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  // 2. Complete Binary Tree Array Interactive Mapper State
  const [selectedIndex, setSelectedIndex] = useState<number>(2); // 1-based index (Node 2: val '25')

  // 3. General Tree -> Binary Tree Conversion State
  const [conversionStep, setConversionStep] = useState<number>(0);

  // 4. Expression Tree State
  const [evalStep, setEvalStep] = useState<number>(-1);

  // 5. Threaded Binary Tree State
  const [threadedStep, setThreadedStep] = useState<number>(-1);

  // Standard 7-Node Complete Binary Tree Structure
  const defaultNodes: TreeNode[] = [
    { id: 1, val: '50', x: 200, y: 35, leftId: 2, rightId: 3 },
    { id: 2, val: '25', x: 100, y: 105, leftId: 4, rightId: 5 },
    { id: 3, val: '75', x: 300, y: 105, leftId: 6, rightId: 7 },
    { id: 4, val: '12', x: 50, y: 175 },
    { id: 5, val: '37', x: 150, y: 175 },
    { id: 6, val: '62', x: 250, y: 175 },
    { id: 7, val: '87', x: 350, y: 175 },
  ];

  const traversalOrders = {
    inorder: [
      { id: 4, val: '12', note: 'Traverse Left Subtree (Node 4: 12)' },
      { id: 2, val: '25', note: 'Visit Parent (Node 2: 25)' },
      { id: 5, val: '37', note: 'Traverse Right Subtree (Node 5: 37)' },
      { id: 1, val: '50', note: 'Visit Tree Root (Node 1: 50)' },
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

  // Expression Tree nodes for ((3 + 5) * (9 - 4))
  const expressionNodes = [
    { id: 1, val: '*', x: 200, y: 35, leftId: 2, rightId: 3, evaluated: '40' },
    { id: 2, val: '+', x: 110, y: 105, leftId: 4, rightId: 5, evaluated: '8' },
    { id: 3, val: '-', x: 290, y: 105, leftId: 6, rightId: 7, evaluated: '5' },
    { id: 4, val: '3', x: 65, y: 175, evaluated: '3' },
    { id: 5, val: '5', x: 155, y: 175, evaluated: '5' },
    { id: 6, val: '9', x: 245, y: 175, evaluated: '9' },
    { id: 7, val: '4', x: 335, y: 175, evaluated: '4' },
  ];

  const evalSteps = [
    { targetId: 4, note: 'Evaluate left operand leaf: 3' },
    { targetId: 5, note: 'Evaluate right operand leaf: 5' },
    { targetId: 2, note: 'Evaluate subtree (+): 3 + 5 = 8' },
    { targetId: 6, note: 'Evaluate left operand leaf: 9' },
    { targetId: 7, note: 'Evaluate right operand leaf: 4' },
    { targetId: 3, note: 'Evaluate subtree (-): 9 - 4 = 5' },
    { targetId: 1, note: 'Evaluate root (*): 8 * 5 = 40 (Final evaluation result!)' },
  ];

  // Threaded binary tree order (4 -> 2 -> 5 -> 1 -> 6 -> 3 -> 7)
  const threadedNodes = [
    { id: 4, val: '12', x: 60, y: 160, isThread: true, threadTarget: '2 (Successor)' },
    { id: 2, val: '25', x: 120, y: 95, leftId: 4, rightId: 5 },
    { id: 5, val: '37', x: 180, y: 160, isThread: true, threadTarget: '1 (Successor)' },
    { id: 1, val: '50', x: 240, y: 35, leftId: 2, rightId: 3 },
    { id: 6, val: '62', x: 300, y: 160, isThread: true, threadTarget: '3 (Successor)' },
    { id: 3, val: '75', x: 360, y: 95, leftId: 6, rightId: 7 },
    { id: 7, val: '87', x: 420, y: 160, isThread: true, threadTarget: 'NULL (End)' },
  ];

  const threadedSequence = [
    { id: 4, val: '12', note: 'Start at leftmost node (12). Follow right thread to successor.' },
    { id: 2, val: '25', note: 'Arrive at parent (25) via thread. Visit right child (37).' },
    { id: 5, val: '37', note: 'At node (37). Follow right thread up to root (50).' },
    { id: 1, val: '50', note: 'At root (50). Proceed to right subtree leftmost child (62).' },
    { id: 6, val: '62', note: 'At node (62). Follow right thread to parent (75).' },
    { id: 3, val: '75', note: 'At node (75). Visit right child (87).' },
    { id: 7, val: '87', note: 'At node (87). Right thread is NULL. Inorder traversal complete in O(1) auxiliary space!' },
  ];

  // Calculations for Complete Binary Tree Array
  const parentIdx = Math.floor(selectedIndex / 2);
  const leftChildIdx = selectedIndex * 2 <= 7 ? selectedIndex * 2 : null;
  const rightChildIdx = selectedIndex * 2 + 1 <= 7 ? selectedIndex * 2 + 1 : null;

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-6 shadow-xs">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#991B1B] dark:text-[#EF4444]" /> Binary Tree Laboratory & Traversal Engine
          </h3>
          <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
            Interactive visualization of tree traversals, Complete Tree Array Indexing, Knuth LCRS Transforms, Expression Trees, and Threaded Trees.
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1 bg-[#F4F2EB] dark:bg-[#2A2622] p-1 rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
          <button
            onClick={() => { setActiveTab('traversal'); resetTraversal(); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'traversal' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Traversals
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'properties' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Array Storage Mapper
          </button>
          <button
            onClick={() => setActiveTab('conversion')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'conversion' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            General $\to$ Binary Tree
          </button>
          <button
            onClick={() => setActiveTab('expression')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'expression' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Expression Trees
          </button>
          <button
            onClick={() => setActiveTab('threaded')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'threaded' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Threaded Trees
          </button>
        </div>
      </div>

      {/* TAB 1: Traversals Animation */}
      {activeTab === 'traversal' && (
        <div className="space-y-5">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Traversal Strategy:</span>
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
                      : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622]'
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
                    ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 text-[#991B1B] dark:text-[#EF4444] border-[#FECACA] dark:border-[#7F1D1D]'
                    : 'bg-white dark:bg-[#064E3B]/30 text-[#15803D] dark:text-[#4ADE80] border-[#DCFCE7] dark:border-[#059669]/40 hover:bg-[#F0FDF4] dark:bg-[#064E3B]/40 dark:hover:bg-[#064E3B]/50'
                }`}
              >
                <Play className="w-3.5 h-3.5" /> {isAutoPlaying ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={resetTraversal}
                className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:bg-[#2A2622] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tree SVG Canvas */}
          <div className="relative p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto flex justify-center">
            <svg width="400" height="220" className="overflow-visible">
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
          <div className="p-4 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80]" /> Traversal Sequence Output:
              </span>
              <span className="text-[11px] font-mono text-[#66625B] dark:text-[#A8A29E]">
                Step {traversalStep + 1} of {currentOrder.length}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 min-h-[38px] p-2 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
              {traversalStep === -1 ? (
                <span className="text-xs text-[#88847C] dark:text-[#78716C] italic">Click "Next Step" or "Auto Play" to begin traversal trace...</span>
              ) : (
                currentOrder.slice(0, traversalStep + 1).map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2.5 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#15803D]/40 text-[#15803D] dark:text-[#4ADE80] font-mono font-bold text-xs shadow-2xs">
                      {item.val}
                    </span>
                    {idx < traversalStep && <ArrowRight className="w-3.5 h-3.5 text-[#88847C] dark:text-[#78716C]" />}
                  </React.Fragment>
                ))
              )}
            </div>

            {traversalStep >= 0 && (
              <div className="text-xs font-sans text-[#44403C] dark:text-[#D6D0C5] bg-[#F0FDF4] dark:bg-[#064E3B]/40 p-2.5 rounded border border-[#DCFCE7] dark:border-[#059669]/50 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
                <span>
                  <strong>Step {traversalStep + 1}:</strong> {currentOrder[traversalStep].note}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Complete Binary Tree Array Storage Live Mapper */}
      {activeTab === 'properties' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" /> Interactive Array Index & Node Relationship Mapper
            </h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              Click any array slot below (1-based index <MathText text="$i$" />) to inspect its exact mathematical Left Child (<MathText text="$2i$" />), Right Child (<MathText text="$2i+1$" />), and Parent (<MathText text="$\lfloor i/2 \rfloor$" />) in the complete tree!
            </p>
          </div>

          {/* Interactive Array Bar */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              1-Based Contiguous Storage Array <code className="text-[#991B1B] dark:text-[#EF4444] font-mono">TreeArray[1...7]</code>:
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((idx) => {
                const node = defaultNodes.find((n) => n.id === idx)!;
                const isSelected = selectedIndex === idx;
                const isParent = parentIdx === idx;
                const isLeftChild = leftChildIdx === idx;
                const isRightChild = rightChildIdx === idx;

                let badge = '';
                if (isSelected) badge = 'Selected (i)';
                else if (isParent) badge = 'Parent ⌊i/2⌋';
                else if (isLeftChild) badge = 'Left (2i)';
                else if (isRightChild) badge = 'Right (2i+1)';

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex-1 min-w-[70px] p-2.5 rounded-lg border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-sm'
                        : isParent
                        ? 'bg-[#FEF3C7] dark:bg-[#78350F]/40 text-[#92400E] dark:text-[#FDE68A] border-[#F59E0B]'
                        : isLeftChild
                        ? 'bg-[#DCFCE7] text-[#166534] border-[#15803D]'
                        : isRightChild
                        ? 'bg-[#E0E7FF] text-[#3730A3] border-[#4F46E5]'
                        : 'bg-[#FAF8F5] dark:bg-[#181614] text-[#1A1A1A] dark:text-[#EDE8DF] border-[#D8D4C8] dark:border-[#423D36] hover:bg-[#F4F2EB] dark:bg-[#2A2622]'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold">Index [{idx}]</div>
                    <div className="text-sm font-mono font-bold mt-0.5">{node.val}</div>
                    {badge && <div className="text-[9px] font-sans font-bold mt-1 uppercase">{badge}</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Graphical Tree with Selected, Parent, and Child Highlights */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex justify-center">
            <svg width="400" height="220">
              {defaultNodes.map((node) => {
                const leftChild = defaultNodes.find((n) => n.id === node.leftId);
                const rightChild = defaultNodes.find((n) => n.id === node.rightId);
                return (
                  <React.Fragment key={node.id}>
                    {leftChild && <line x1={node.x} y1={node.y} x2={leftChild.x} y2={leftChild.y} stroke="#D8D4C8" strokeWidth="2" />}
                    {rightChild && <line x1={node.x} y1={node.y} x2={rightChild.x} y2={rightChild.y} stroke="#D8D4C8" strokeWidth="2" />}
                  </React.Fragment>
                );
              })}

              {defaultNodes.map((node) => {
                const isSelected = selectedIndex === node.id;
                const isParent = parentIdx === node.id;
                const isLeftChild = leftChildIdx === node.id;
                const isRightChild = rightChildIdx === node.id;

                let fill = '#FFFFFF';
                let stroke = '#88847C';
                let textColor = '#1A1A1A';

                if (isSelected) {
                  fill = '#991B1B';
                  stroke = '#7F1D1D';
                  textColor = '#FFFFFF';
                } else if (isParent) {
                  fill = '#F59E0B';
                  stroke = '#D97706';
                  textColor = '#FFFFFF';
                } else if (isLeftChild) {
                  fill = '#15803D';
                  stroke = '#166534';
                  textColor = '#FFFFFF';
                } else if (isRightChild) {
                  fill = '#4F46E5';
                  stroke = '#3730A3';
                  textColor = '#FFFFFF';
                }

                return (
                  <g key={node.id} onClick={() => setSelectedIndex(node.id)} className="cursor-pointer">
                    <circle cx={node.x} cy={node.y} r="18" fill={fill} stroke={stroke} strokeWidth="2" />
                    <text x={node.x} y={node.y + 4} textAnchor="middle" fill={textColor} fontSize="11" fontWeight="bold" fontFamily="monospace">
                      {node.val}
                    </text>
                    <text x={node.x} y={node.y - 22} textAnchor="middle" fill="#66625B" fontSize="9" fontWeight="bold" fontFamily="mono">
                      i={node.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Mathematical Proof Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#FEF3C7] dark:bg-[#78350F]/40 rounded-lg border border-[#FDE68A] dark:border-[#B45309]/50 text-[#92400E] dark:text-[#FDE68A] space-y-1">
              <div className="font-bold">Parent Node:</div>
              <div>⌊i / 2⌋ = ⌊{selectedIndex} / 2⌋ = {parentIdx > 0 ? `Index [${parentIdx}]` : 'None (Root)'}</div>
            </div>
            <div className="p-3 bg-[#DCFCE7] rounded-lg border border-[#BBF7D0] dark:border-[#059669] text-[#166534] space-y-1">
              <div className="font-bold">Left Child:</div>
              <div>2i = 2 × {selectedIndex} = {leftChildIdx ? `Index [${leftChildIdx}]` : 'None (Out of Bounds)'}</div>
            </div>
            <div className="p-3 bg-[#E0E7FF] rounded-lg border border-[#C7D2FE] text-[#3730A3] space-y-1">
              <div className="font-bold">Right Child:</div>
              <div>2i + 1 = 2({selectedIndex}) + 1 = {rightChildIdx ? `Index [${rightChildIdx}]` : 'None (Out of Bounds)'}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Conversion of General Tree to Binary Tree (Knuth Transform / LCRS) */}
      {activeTab === 'conversion' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" /> Left-Child Right-Sibling (LCRS) Representation & Knuth Transform
            </h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              Donald Knuth's transform converts any general tree or forest with variable degree into a standardized binary tree using the <strong>Left-Child Right-Sibling</strong> rule:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white dark:bg-[#201D1A] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] space-y-1">
                <div className="text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444]">Rule 1: Left Pointer (Child)</div>
                <div className="text-xs text-[#44403C] dark:text-[#D6D0C5]">Points to the node's <strong>very first (eldest) child</strong>.</div>
              </div>
              <div className="p-3 bg-white dark:bg-[#201D1A] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] space-y-1">
                <div className="text-xs font-serif font-bold text-[#15803D] dark:text-[#4ADE80]">Rule 2: Right Pointer (Sibling)</div>
                <div className="text-xs text-[#44403C] dark:text-[#D6D0C5]">Points to the node's <strong>immediate next sibling</strong> at the same level.</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Step-by-Step Conversion Walkthrough:</span>
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setConversionStep(s)}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer border ${
                      conversionStep === s
                        ? 'bg-[#991B1B] text-white border-[#991B1B]'
                        : 'bg-[#FAF8F5] dark:bg-[#181614] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36] hover:bg-[#F4F2EB] dark:bg-[#2A2622]'
                    }`}
                  >
                    {s === 0 && '1. General Tree'}
                    {s === 1 && '2. Link Siblings'}
                    {s === 2 && '3. Binary Tree Result'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex flex-col items-center justify-center min-h-[200px]">
                <div className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E] mb-2">Original General Tree (A with Children B, C, D)</div>
                <svg width="260" height="140">
                  <line x1="130" y1="25" x2="50" y2="90" stroke="#88847C" strokeWidth="2" />
                  <line x1="130" y1="25" x2="130" y2="90" stroke="#88847C" strokeWidth="2" />
                  <line x1="130" y1="25" x2="210" y2="90" stroke="#88847C" strokeWidth="2" />
                  <circle cx="130" cy="25" r="14" fill="#1A1A1A" />
                  <text x="130" y="29" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">A</text>
                  <circle cx="50" cy="90" r="12" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
                  <text x="50" y="93" textAnchor="middle" fill="#1A1A1A" fontSize="9" fontWeight="bold" fontFamily="sans-serif">B</text>
                  <circle cx="130" cy="90" r="12" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
                  <text x="130" y="93" textAnchor="middle" fill="#1A1A1A" fontSize="9" fontWeight="bold" fontFamily="sans-serif">C</text>
                  <circle cx="210" cy="90" r="12" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
                  <text x="210" y="93" textAnchor="middle" fill="#1A1A1A" fontSize="9" fontWeight="bold" fontFamily="sans-serif">D</text>
                  {conversionStep >= 1 && (
                    <>
                      <line x1="62" y1="90" x2="118" y2="90" stroke="#15803D" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="142" y1="90" x2="198" y2="90" stroke="#15803D" strokeWidth="2" strokeDasharray="3,3" />
                    </>
                  )}
                </svg>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex flex-col items-center justify-center min-h-[200px]">
                <div className="text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444] mb-2">Equivalent Binary Tree (Left=Child, Right=Sibling)</div>
                <svg width="260" height="140">
                  <line x1="70" y1="25" x2="70" y2="70" stroke="#991B1B" strokeWidth="2" />
                  <line x1="70" y1="70" x2="130" y2="90" stroke="#15803D" strokeWidth="2" />
                  <line x1="130" y1="90" x2="190" y2="110" stroke="#15803D" strokeWidth="2" />
                  <circle cx="70" cy="25" r="12" fill="#1A1A1A" />
                  <text x="70" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">A</text>
                  <circle cx="70" cy="70" r="12" fill="#FEE2E2" stroke="#991B1B" strokeWidth="2" />
                  <text x="70" y="73" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">B</text>
                  <circle cx="130" cy="90" r="12" fill="#DCFCE7" stroke="#15803D" strokeWidth="2" />
                  <text x="130" y="93" textAnchor="middle" fill="#15803D" fontSize="9" fontWeight="bold" fontFamily="sans-serif">C</text>
                  <circle cx="190" cy="110" r="12" fill="#DCFCE7" stroke="#15803D" strokeWidth="2" />
                  <text x="190" y="113" textAnchor="middle" fill="#15803D" fontSize="9" fontWeight="bold" fontFamily="sans-serif">D</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Expression Trees Simulation */}
      {activeTab === 'expression' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" /> Interactive Expression Tree Construction & Evaluation
            </h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              In an Expression Tree, internal nodes are operators (<code className="text-[#991B1B] dark:text-[#EF4444] font-mono font-bold">+ - * / ^</code>) and leaves are operands ($3, 5, 9, 4$). Bottom-up postorder evaluation evaluates subexpressions into simplified terms.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              Expression: <span className="font-mono text-[#991B1B] dark:text-[#EF4444] font-bold">((3 + 5) * (9 - 4))</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (evalStep < evalSteps.length - 1) setEvalStep((prev) => prev + 1);
                }}
                disabled={evalStep >= evalSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Evaluate Step
              </button>
              <button
                onClick={() => setEvalStep(-1)}
                className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:bg-[#2A2622] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto flex justify-center">
            <svg width="400" height="220">
              {expressionNodes.map((node) => {
                const leftChild = expressionNodes.find((n) => n.id === node.leftId);
                const rightChild = expressionNodes.find((n) => n.id === node.rightId);
                return (
                  <React.Fragment key={node.id}>
                    {leftChild && <line x1={node.x} y1={node.y} x2={leftChild.x} y2={leftChild.y} stroke="#D8D4C8" strokeWidth="2" />}
                    {rightChild && <line x1={node.x} y1={node.y} x2={rightChild.x} y2={rightChild.y} stroke="#D8D4C8" strokeWidth="2" />}
                  </React.Fragment>
                );
              })}

              {expressionNodes.map((node) => {
                const isEvaluated = evalStep >= 0 && evalSteps.slice(0, evalStep + 1).some((s) => s.targetId === node.id);
                const isCurrent = evalStep >= 0 && evalSteps[evalStep].targetId === node.id;

                return (
                  <g key={node.id} className="transition-all duration-300">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      fill={isCurrent ? '#991B1B' : isEvaluated ? '#15803D' : '#FFFFFF'}
                      stroke={isCurrent ? '#7F1D1D' : isEvaluated ? '#166534' : '#B3ADA1'}
                      strokeWidth="2"
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill={isCurrent || isEvaluated ? '#FFFFFF' : '#1A1A1A'}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {isEvaluated && !['+', '-', '*', '/'].includes(node.val) ? node.val : isEvaluated ? node.evaluated : node.val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {evalStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] dark:text-[#D6D0C5] bg-[#F0FDF4] dark:bg-[#064E3B]/40 p-3 rounded-lg border border-[#DCFCE7] dark:border-[#059669]/50 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
              <span>
                <strong>Step {evalStep + 1}:</strong> {evalSteps[evalStep].note}
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Threaded Binary Trees Simulation */}
      {activeTab === 'threaded' && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24]" /> Threaded Binary Tree Pointer Simulation
            </h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              In a regular binary tree with <MathText text="$N$" /> nodes, exactly <MathText text="$N + 1$" /> pointer fields are <code className="text-[#991B1B] dark:text-[#EF4444] font-mono">NULL</code>. A Threaded Binary Tree replaces empty right pointers with dashed red <strong>threads</strong> pointing directly to the <strong>Inorder Successor</strong>, allowing <MathText text="$\mathcal{O}(1)$" /> space traversal without recursion or call stacks!
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Inorder Stackless Traversal Simulation:</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (threadedStep < threadedSequence.length - 1) setThreadedStep((prev) => prev + 1);
                }}
                disabled={threadedStep >= threadedSequence.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Follow Thread Next
              </button>
              <button
                onClick={() => setThreadedStep(-1)}
                className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:bg-[#2A2622] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto flex justify-center">
            <svg width="480" height="210">
              <line x1="240" y1="35" x2="120" y2="95" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="240" y1="35" x2="360" y2="95" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="120" y1="95" x2="60" y2="160" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="120" y1="95" x2="180" y2="160" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="360" y1="95" x2="300" y2="160" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="360" y1="95" x2="420" y2="160" stroke="#D8D4C8" strokeWidth="2" />

              {/* Threaded Edges (Dashed Red Arrows) */}
              <path d="M 60 145 C 80 120, 100 105, 110 100" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
              <path d="M 180 145 C 200 100, 220 55, 230 45" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
              <path d="M 300 145 C 320 120, 340 105, 350 100" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />

              {threadedNodes.map((node) => {
                const isVisited = threadedStep >= 0 && threadedSequence.slice(0, threadedStep + 1).some((s) => s.id === node.id);
                const isCurrent = threadedStep >= 0 && threadedSequence[threadedStep].id === node.id;

                return (
                  <g key={node.id}>
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
                      {node.val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {threadedStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] dark:text-[#D6D0C5] bg-[#F0FDF4] dark:bg-[#064E3B]/40 p-3 rounded-lg border border-[#DCFCE7] dark:border-[#059669]/50 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
              <span>
                <strong>Step {threadedStep + 1}:</strong> {threadedSequence[threadedStep].note}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
