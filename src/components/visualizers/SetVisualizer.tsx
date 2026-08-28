import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Search, Sparkles, RefreshCw, AlertCircle, Layers, GitBranch, ArrowDown } from 'lucide-react';
import { Latex, MathText } from '../common/Latex';

interface SetVisualizerProps {
  focusedMode?: 'ordered' | 'unordered' | 'bstSearch';
}

interface TreeNode {
  val: number;
  color: 'red' | 'black';
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
  level: number;
}

// Build a balanced BST from sorted unique array
function buildBalancedBST(
  arr: number[],
  start: number,
  end: number,
  level: number,
  xMin: number,
  xMax: number
): TreeNode | null {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const x = (xMin + xMax) / 2;
  const y = 45 + level * 65;

  const node: TreeNode = {
    val: arr[mid],
    color: level === 0 ? 'black' : (level % 2 === 1 ? 'red' : 'black'),
    left: null,
    right: null,
    x,
    y,
    level,
  };

  node.left = buildBalancedBST(arr, start, mid - 1, level + 1, xMin, x);
  node.right = buildBalancedBST(arr, mid + 1, end, level + 1, x, xMax);

  return node;
}

// Flatten tree nodes & edges for SVG rendering
function flattenTree(root: TreeNode | null) {
  const nodes: TreeNode[] = [];
  const edges: { from: TreeNode; to: TreeNode; isLeft: boolean }[] = [];

  function traverse(n: TreeNode | null) {
    if (!n) return;
    nodes.push(n);
    if (n.left) {
      edges.push({ from: n, to: n.left, isLeft: true });
      traverse(n.left);
    }
    if (n.right) {
      edges.push({ from: n, to: n.right, isLeft: false });
      traverse(n.right);
    }
  }

  traverse(root);
  return { nodes, edges };
}

export const SetVisualizer: React.FC<SetVisualizerProps> = ({ focusedMode }) => {
  const [mode, setMode] = useState<'ordered' | 'unordered' | 'bstSearch'>(focusedMode || 'ordered');

  React.useEffect(() => {
    if (focusedMode) {
      setMode(focusedMode);
    }
  }, [focusedMode]);

  const [elements, setElements] = useState<number[]>([15, 27, 38, 49, 62]);
  const [inputVal, setInputVal] = useState<string>('55');
  const [searchVal, setSearchVal] = useState<string>('27');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [rejectedDuplicate, setRejectedDuplicate] = useState<number | null>(null);
  const [visitedKeys, setVisitedKeys] = useState<number[]>([]);
  const [activeStepNode, setActiveStepNode] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([
    'std::set initialized with unique elements: [15, 27, 38, 49, 62] stored in balanced Red-Black BST.'
  ]);

  const [bucketCount, setBucketCount] = useState<number>(7);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 15)]);
  };

  // Build tree data
  const { treeNodes, treeEdges, treeHeight } = useMemo(() => {
    const sorted = [...elements].sort((a, b) => a - b);
    const root = buildBalancedBST(sorted, 0, sorted.length - 1, 0, 40, 560);
    const { nodes, edges } = flattenTree(root);
    const maxLevel = nodes.reduce((max, n) => Math.max(max, n.level), 0);
    return { treeNodes: nodes, treeEdges: edges, treeHeight: maxLevel };
  }, [elements]);

  const handleInsert = () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return;

    if (elements.includes(val)) {
      setRejectedDuplicate(val);
      addLog(`⚠️ Duplicate Key ${val} rejected! Set strictly enforces unique elements.`);
      setTimeout(() => setRejectedDuplicate(null), 2000);
      return;
    }

    const nextElements = [...elements, val].sort((a, b) => a - b);
    setElements(nextElements);
    addLog(`✅ Inserted key ${val}. Red-Black Tree rebalanced in O(log N) time.`);
    setSearchResult(null);
    setVisitedKeys([val]);
    setTimeout(() => setVisitedKeys([]), 1500);
  };

  const handleErase = (val: number) => {
    setElements(elements.filter((x) => x !== val));
    addLog(`🗑️ Erased key ${val} from set.`);
    setSearchResult(null);
    setVisitedKeys([]);
  };

  const handleFind = () => {
    const val = parseInt(searchVal);
    if (isNaN(val)) return;

    // Traverse BST to trace path
    const sorted = [...elements].sort((a, b) => a - b);
    const root = buildBalancedBST(sorted, 0, sorted.length - 1, 0, 40, 560);

    const path: number[] = [];
    let curr = root;

    while (curr) {
      path.push(curr.val);
      if (curr.val === val) break;
      if (val < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    setVisitedKeys(path);

    // Animate stepping through
    path.forEach((nodeVal, idx) => {
      setTimeout(() => {
        setActiveStepNode(nodeVal);
      }, idx * 400);
    });

    setTimeout(() => {
      setActiveStepNode(null);
      if (elements.includes(val)) {
        setSearchResult(`✅ Key ${val} FOUND in set! Traversed ${path.length} BST comparison node(s): [${path.join(' → ')}].`);
        addLog(`🔍 find(${val}) -> FOUND via O(log N) Red-Black BST traversal.`);
      } else {
        setSearchResult(`❌ Key ${val} NOT FOUND (returns set::end()). Traversed path: [${path.join(' → ')}].`);
        addLog(`🔍 find(${val}) -> Key absent in set.`);
      }
    }, path.length * 400 + 200);
  };

  const handleLowerBound = () => {
    const val = parseInt(searchVal);
    if (isNaN(val)) return;
    const item = elements.find((x) => x >= val);
    if (item !== undefined) {
      setVisitedKeys([item]);
      setSearchResult(`📍 lower_bound(${val}) = ${item} (first element >= ${val})`);
      addLog(`📍 lower_bound(${val}) -> ${item}`);
    } else {
      setVisitedKeys([]);
      setSearchResult(`📍 lower_bound(${val}) = end() (no element in set is >= ${val})`);
      addLog(`📍 lower_bound(${val}) -> end()`);
    }
  };

  const handleUpperBound = () => {
    const val = parseInt(searchVal);
    if (isNaN(val)) return;
    const item = elements.find((x) => x > val);
    if (item !== undefined) {
      setVisitedKeys([item]);
      setSearchResult(`📍 upper_bound(${val}) = ${item} (first element > ${val})`);
      addLog(`📍 upper_bound(${val}) -> ${item}`);
    } else {
      setVisitedKeys([]);
      setSearchResult(`📍 upper_bound(${val}) = end() (no element in set is > ${val})`);
      addLog(`📍 upper_bound(${val}) -> end()`);
    }
  };

  const handleRehash = () => {
    const newBuckets = bucketCount * 2 + 1;
    setBucketCount(newBuckets);
    addLog(`🔄 Rehashed unordered_set! Buckets increased: ${bucketCount} -> ${newBuckets}. Average bucket chain length reduced.`);
  };

  const handleReset = () => {
    setElements([15, 27, 38, 49, 62]);
    setBucketCount(7);
    setSearchResult(null);
    setVisitedKeys([]);
    setActiveStepNode(null);
    setLogs(['std::set reset to initial default [15, 27, 38, 49, 62].']);
  };

  // Group into hash buckets for unordered mode
  const hashBuckets: number[][] = Array.from({ length: bucketCount }, () => []);
  elements.forEach((num) => {
    const bucketIdx = ((num % bucketCount) + bucketCount) % bucketCount;
    hashBuckets[bucketIdx].push(num);
  });

  const loadFactor = elements.length / bucketCount;

  return (
    <div className="space-y-4" id="set-visualizer-container">
      {/* Mode Switcher */}
      {!focusedMode && (
        <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] gap-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB] dark:bg-[#2A2622]">
            <button
              id="set-mode-ordered"
              onClick={() => setMode('ordered')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'ordered'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> std::set (Red-Black Tree Graph / <MathText text="$\\mathcal{O}(\\log N)$" />)
            </button>
            <button
              id="set-mode-unordered"
              onClick={() => setMode('unordered')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'unordered'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" /> std::unordered_set (Hash Table Buckets / <MathText text="$\\mathcal{O}(1)$" />)
            </button>
          </div>

          <button
            id="set-reset-btn"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Set
          </button>
        </div>
      )}

      {/* Control Actions */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center justify-between gap-4 shadow-xs">
        {/* Insert Control */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E] hidden sm:inline">Insert:</label>
          <input
            id="set-insert-input"
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Key"
            className="w-20 px-2.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] border border-[#D8D4C8] dark:border-[#423D36] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-mono focus:outline-none focus:border-[#991B1B]"
          />
          <button
            id="set-insert-btn"
            onClick={handleInsert}
            className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-300" /> insert()
          </button>
        </div>

        {/* Query Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E] hidden sm:inline">Query:</label>
          <input
            id="set-search-input"
            type="number"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Target"
            className="w-20 px-2.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] border border-[#D8D4C8] dark:border-[#423D36] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-mono focus:outline-none focus:border-[#991B1B]"
          />
          <button
            id="set-find-btn"
            onClick={handleFind}
            className="px-3 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#1A1A1A] dark:text-[#EDE8DF] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> find()
          </button>
          {mode === 'ordered' && (
            <>
              <button
                id="set-lower-bound-btn"
                onClick={handleLowerBound}
                title="Finds first element >= Target"
                className="px-2.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#991B1B] dark:text-[#EF4444] text-xs font-serif font-semibold transition-colors cursor-pointer"
              >
                lower_bound()
              </button>
              <button
                id="set-upper-bound-btn"
                onClick={handleUpperBound}
                title="Finds first element > Target"
                className="px-2.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#991B1B] dark:text-[#EF4444] text-xs font-serif font-semibold transition-colors cursor-pointer"
              >
                upper_bound()
              </button>
            </>
          )}
        </div>
      </div>

      {/* Duplicate Alert Banner */}
      <AnimatePresence>
        {rejectedDuplicate !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3.5 rounded-lg bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#7F1D1D] text-[#991B1B] dark:text-[#EF4444] text-xs font-serif font-semibold flex items-center gap-2 shadow-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            Duplicate insertion rejected: Key {rejectedDuplicate} already exists! Set guarantees strictly unique elements.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Result Banner */}
      {searchResult && (
        <div className="p-3.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#D8D4C8] dark:border-[#423D36] text-[#1A1A1A] dark:text-[#EDE8DF] text-xs font-mono flex items-center justify-between shadow-2xs">
          <span>{searchResult}</span>
          <button
            onClick={() => setSearchResult(null)}
            className="text-xs text-[#88847C] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] font-serif cursor-pointer ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Visual Canvas */}
      {mode === 'ordered' ? (
        <div className="p-5 sm:p-7 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <div>
              <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
                Self-Balancing Red-Black Binary Search Tree Graph
              </span>
              <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
                Every node maintains BST Invariant: <code className="text-[#991B1B] dark:text-[#EF4444] font-mono">Left &lt; Node &lt; Right</code> with logarithmic depth <Latex math="h \le 2\log_2(N+1)" />.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#991B1B] dark:text-[#EF4444] bg-[#FEF2F2] dark:bg-[#450A0A]/40 px-2.5 py-1 rounded border border-[#FECACA] dark:border-[#7F1D1D] font-bold">
                size() = {elements.length}
              </span>
              <span className="text-xs font-mono text-[#15803D] dark:text-[#4ADE80] bg-[#ECFDF5] dark:bg-[#064E3B]/40 px-2.5 py-1 rounded border border-[#A7F3D0] dark:border-[#059669] font-bold">
                Tree Height: {treeHeight + 1}
              </span>
            </div>
          </div>

          {/* SVG Tree Graph Canvas */}
          <div className="w-full bg-[#FAF8F5] dark:bg-[#181614] rounded-xl border border-[#E5E2D9] dark:border-[#38332B] p-2 overflow-x-auto">
            <div className="min-w-[600px] flex flex-col items-center">
              {elements.length === 0 ? (
                <div className="py-16 text-xs text-[#88847C] dark:text-[#78716C] italic font-serif">Tree is currently empty. Insert keys above!</div>
              ) : (
                <svg
                  viewBox="0 0 600 320"
                  className="w-full h-auto max-h-[340px]"
                  style={{ minHeight: '260px' }}
                >
                  <defs>
                    <marker
                      id="arrow"
                      viewBox="0 0 10 10"
                      refX="5"
                      refY="5"
                      markerWidth="4"
                      markerHeight="4"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#D8D4C8" />
                    </marker>
                  </defs>

                  {/* Render Tree Branches (Edges) */}
                  {treeEdges.map((edge, idx) => (
                    <g key={`edge-${idx}`}>
                      <line
                        x1={edge.from.x}
                        y1={edge.from.y}
                        x2={edge.to.x}
                        y2={edge.to.y}
                        stroke="#C4BEB1"
                        strokeWidth="2.5"
                        strokeDasharray={visitedKeys.includes(edge.to.val) && visitedKeys.includes(edge.from.val) ? "none" : "none"}
                        className="transition-all duration-300"
                      />
                      {/* Left / Right indicator label */}
                      <text
                        x={(edge.from.x + edge.to.x) / 2 + (edge.isLeft ? -10 : 6)}
                        y={(edge.from.y + edge.to.y) / 2 - 2}
                        fontSize="9"
                        fill="#88847C"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {edge.isLeft ? 'L' : 'R'}
                      </text>
                    </g>
                  ))}

                  {/* Render Tree Nodes */}
                  {treeNodes.map((node) => {
                    const isVisited = visitedKeys.includes(node.val);
                    const isActive = activeStepNode === node.val;
                    const isRed = node.color === 'red';

                    return (
                      <g
                        key={`node-${node.val}`}
                        className="cursor-pointer group"
                        onClick={() => handleErase(node.val)}
                      >
                        {/* Glow halo when active */}
                        {isActive && (
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="28"
                            fill="#FEE2E2"
                            opacity="0.7"
                            className="animate-ping"
                          />
                        )}

                        {/* Outer circle badge */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="20"
                          fill={isActive ? '#991B1B' : (isVisited ? '#DC2626' : (isRed ? '#991B1B' : '#1A1A1A'))}
                          stroke={isActive ? '#F59E0B' : (isVisited ? '#F59E0B' : '#FAF8F5')}
                          strokeWidth={isActive || isVisited ? '3' : '2'}
                          className="transition-all duration-300 shadow-md"
                        />

                        {/* Red/Black tag ring */}
                        <circle
                          cx={node.x + 14}
                          cy={node.y - 14}
                          r="6"
                          fill={isRed ? '#EF4444' : '#374151'}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />

                        {/* Text Value */}
                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="12"
                          fontFamily="monospace"
                          fontWeight="bold"
                          className="select-none pointer-events-none"
                        >
                          {node.val}
                        </text>

                        {/* Hover hint */}
                        <title>Key: {node.val} ({isRed ? 'RED' : 'BLACK'} Node) - Click to erase</title>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Tree Graph Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-[#201D1A] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-[11px] font-mono text-[#66625B] dark:text-[#A8A29E] mt-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#1A1A1A] inline-block" /> Black Node
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#991B1B] inline-block" /> Red Node
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block ring-2 ring-[#F59E0B]" /> Active Search Path
                </span>
              </div>
              <span className="text-[10px] text-[#88847C] dark:text-[#78716C] italic">Click any tree node to erase it</span>
            </div>
          </div>

          {/* Linear In-Order Element Sequence (Shows Sorted Invariant) */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E]">In-Order Traversal Sequence (Always Sorted):</span>
            <div className="flex flex-wrap items-center gap-2">
              {elements.map((val) => (
                <div
                  key={val}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                    visitedKeys.includes(val)
                      ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 border-[#991B1B] text-[#991B1B] dark:text-[#EF4444]'
                      : 'bg-[#FAF8F5] dark:bg-[#181614] border-[#D8D4C8] dark:border-[#423D36] text-[#1A1A1A] dark:text-[#EDE8DF]'
                  }`}
                >
                  <span>{val}</span>
                  <button
                    onClick={() => handleErase(val)}
                    title="Erase"
                    className="text-[#88847C] dark:text-[#78716C] hover:text-[#991B1B] dark:text-[#EF4444] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Unordered Set: Hash Table Bucket View */
        <div className="p-5 sm:p-7 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <div>
              <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Hash Table Bucket View (Separate Chaining with Array Buckets)
              </span>
              <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
                <Latex math={`h(k) = k \\bmod ${bucketCount} \\quad | \\quad \\text{Load Factor } \\alpha = \\frac{N}{B} = \\frac{${elements.length}}{${bucketCount}} = ${loadFactor.toFixed(2)}`} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRehash}
                className="px-3 py-1 rounded bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444] cursor-pointer"
              >
                Trigger rehash()
              </button>
              <span className="text-xs font-mono text-[#15803D] dark:text-[#4ADE80] bg-[#ECFDF5] dark:bg-[#064E3B]/40 px-2.5 py-1 rounded border border-[#A7F3D0] dark:border-[#059669] font-bold">
                Buckets: {bucketCount}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hashBuckets.map((bucket, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="text-[11px] font-mono text-[#66625B] dark:text-[#A8A29E] mb-2 font-bold flex items-center justify-between border-b border-[#E5E2D9] dark:border-[#38332B] pb-1">
                  <span>Bucket [{idx}]</span>
                  <span className="text-[10px] text-[#88847C] dark:text-[#78716C]">{bucket.length} items</span>
                </div>
                <div className="space-y-1.5 min-h-[50px]">
                  {bucket.length === 0 ? (
                    <div className="text-[10px] text-[#88847C] dark:text-[#78716C] italic py-2 text-center">empty</div>
                  ) : (
                    bucket.map((val) => (
                      <div
                        key={val}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs"
                      >
                        <span className="font-bold text-[#991B1B] dark:text-[#EF4444]">{val}</span>
                        <button
                          onClick={() => handleErase(val)}
                          className="text-[#88847C] dark:text-[#78716C] hover:text-[#991B1B] dark:text-[#EF4444] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Log */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs">
        <div className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E] mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> Real-time Set Operation Trace
        </div>
        <div className="space-y-1 font-mono text-xs max-h-24 overflow-y-auto pr-2">
          {logs.map((log, i) => (
            <div key={i} className="text-[#44403C] dark:text-[#D6D0C5] py-0.5 border-b border-[#F4F2EB]">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
