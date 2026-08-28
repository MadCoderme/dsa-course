import React, { useState } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  ShieldCheck,
  RotateCcw,
  Sparkles,
  GitBranch,
  ArrowRight,
  Zap,
  CheckCircle2,
  Trash2,
  Plus,
  Play,
  HelpCircle,
  Layers,
  Award
} from 'lucide-react';

interface BstRbtVisualizerProps {
  focusedMode?: 'bst-ops' | 'deletion' | 'rbt-invariants' | 'rbt-insert' | 'rbt-delete';
}

export const BstRbtVisualizer: React.FC<BstRbtVisualizerProps> = ({ focusedMode = 'bst-ops' }) => {
  const [activeTab, setActiveTab] = useState<'bst-ops' | 'deletion' | 'rbt-invariants' | 'rbt-insert' | 'rbt-delete'>(focusedMode);

  // BST Deletion Case (0 children, 1 child, 2 children)
  const [deletionCase, setDeletionCase] = useState<'leaf' | 'one-child' | 'two-children'>('two-children');

  // Red-Black Tree active insertion case
  const [rbtInsertCase, setRbtInsertCase] = useState<'case1' | 'case2' | 'case3'>('case1');

  // Red-Black Tree active deletion case
  const [rbtDeleteCase, setRbtDeleteCase] = useState<'case1' | 'case2' | 'case3' | 'case4'>('case2');

  // BST Search simulation
  const [searchStep, setSearchStep] = useState<number>(-1);

  const searchPath = [
    { id: 1, val: 50, note: '65 > 50 -> Branch Right to node 75' },
    { id: 3, val: 75, note: '65 < 75 -> Branch Left to node 65' },
    { id: 6, val: 65, note: '65 == 65 -> Key Found in 3 comparison steps!' },
  ];

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-6 shadow-xs" id="bst-rbt-visualizer-root">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#991B1B] dark:text-[#EF4444]" /> Binary Search Tree & Red-Black Tree Laboratory
          </h3>
          <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
            Complete interactive simulations of BST operations, the 3 deletion cases, and Red-Black tree insertion & removal rebalancing.
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1 bg-[#F4F2EB] dark:bg-[#2A2622] p-1 rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
          <button
            onClick={() => setActiveTab('bst-ops')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'bst-ops' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            BST Search
          </button>
          <button
            onClick={() => setActiveTab('deletion')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'deletion' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            BST 3 Deletions
          </button>
          <button
            onClick={() => setActiveTab('rbt-invariants')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'rbt-invariants' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            RBT 5 Properties
          </button>
          <button
            onClick={() => setActiveTab('rbt-insert')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'rbt-insert' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            RBT Insertion (Uncle Cases)
          </button>
          <button
            onClick={() => setActiveTab('rbt-delete')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'rbt-delete' ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs font-bold' : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
            }`}
          >
            RBT Deletion (Double Black)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BST Invariant & Search */}
      {/* ========================================================================= */}
      {activeTab === 'bst-ops' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Binary Search Tree (BST) Ordering Invariant</h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              For every node <MathText text="$u$" /> in a BST: All keys in the left subtree are strictly smaller than <MathText text="$u$" />, and all keys in the right subtree are strictly greater than <MathText text="$u$" />.
            </p>
            <div className="p-2.5 bg-white dark:bg-[#201D1A] rounded border border-[#E5E2D9] dark:border-[#38332B] font-mono text-xs text-[#991B1B] dark:text-[#EF4444] font-bold">
              Left Subtree Keys &lt; Node Key &lt; Right Subtree Keys
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              Search for Key <span className="font-mono text-[#991B1B] dark:text-[#EF4444] font-bold">65</span>:
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (searchStep < searchPath.length - 1) setSearchStep((prev) => prev + 1);
                }}
                disabled={searchStep >= searchPath.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Search Step ({searchStep + 1 > 0 ? searchStep + 1 : 0}/3)
              </button>
              <button
                onClick={() => setSearchStep(-1)}
                className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:bg-[#2A2622] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="relative p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto flex justify-center">
            <svg width="380" height="200">
              <line x1="190" y1="35" x2="100" y2="95" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="190" y1="35" x2="280" y2="95" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="100" y1="95" x2="60" y2="155" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="100" y1="95" x2="140" y2="155" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="280" y1="95" x2="240" y2="155" stroke="#D8D4C8" strokeWidth="2" />
              <line x1="280" y1="95" x2="320" y2="155" stroke="#D8D4C8" strokeWidth="2" />

              {/* Nodes */}
              {[
                { id: 1, val: 50, x: 190, y: 35 },
                { id: 2, val: 30, x: 100, y: 95 },
                { id: 3, val: 75, x: 280, y: 95 },
                { id: 4, val: 20, x: 60, y: 155 },
                { id: 5, val: 40, x: 140, y: 155 },
                { id: 6, val: 65, x: 240, y: 155 },
                { id: 7, val: 85, x: 320, y: 155 },
              ].map((n) => {
                const isVisited = searchStep >= 0 && searchPath.slice(0, searchStep + 1).some((p) => p.id === n.id);
                const isCurrent = searchStep >= 0 && searchPath[searchStep].id === n.id;

                return (
                  <g key={n.id}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="16"
                      fill={isCurrent ? '#991B1B' : isVisited ? '#15803D' : '#FFFFFF'}
                      stroke={isCurrent ? '#7F1D1D' : isVisited ? '#166534' : '#88847C'}
                      strokeWidth="2"
                    />
                    <text
                      x={n.x}
                      y={n.y + 4}
                      textAnchor="middle"
                      fill={isCurrent || isVisited ? '#FFFFFF' : '#1A1A1A'}
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {n.val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {searchStep >= 0 && (
            <div className="text-xs font-sans text-[#44403C] dark:text-[#D6D0C5] bg-[#F0FDF4] dark:bg-[#064E3B]/40 p-3 rounded-lg border border-[#DCFCE7] dark:border-[#059669]/50 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
              <span>
                <strong>Search Step {searchStep + 1}:</strong> {searchPath[searchStep].note}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: BST 3 Deletion Cases */}
      {/* ========================================================================= */}
      {activeTab === 'deletion' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" /> The 3 Structural BST Deletion Cases
            </h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              Deleting a key from a Binary Search Tree must preserve the BST ordering property. The deletion algorithm decomposes into exactly 3 cases:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setDeletionCase('leaf')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  deletionCase === 'leaf'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622]'
                }`}
              >
                Case 1: Leaf Node (0 Children)
              </button>
              <button
                onClick={() => setDeletionCase('one-child')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  deletionCase === 'one-child'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622]'
                }`}
              >
                Case 2: Node with 1 Child
              </button>
              <button
                onClick={() => setDeletionCase('two-children')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  deletionCase === 'two-children'
                    ? 'bg-[#991B1B] text-white border-[#991B1B]'
                    : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622]'
                }`}
              >
                Case 3: Node with 2 Children (Inorder Successor)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            {deletionCase === 'leaf' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#15803D] dark:text-[#4ADE80]">Case 1: Deleting Leaf Node (e.g. Delete 20)</div>
                <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
                  The target node has zero children. Simply sever the pointer from its parent and deallocate the node in <Latex math="\mathcal{O}(1)" /> pointer time.
                </p>
                <div className="p-2.5 bg-[#FAF8F5] dark:bg-[#181614] rounded border border-[#E5E2D9] dark:border-[#38332B] font-mono text-xs text-[#1A1A1A] dark:text-[#EDE8DF]">
                  parent-&gt;left = NULL; free(target);
                </div>
              </div>
            )}

            {deletionCase === 'one-child' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#B45309] dark:text-[#FBBF24]">Case 2: Deleting Node with 1 Child (e.g. Delete 30 with Child 40)</div>
                <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
                  Bypass the target node by directly linking the target's parent to the target's unique child, then free the target node.
                </p>
                <div className="p-2.5 bg-[#FAF8F5] dark:bg-[#181614] rounded border border-[#E5E2D9] dark:border-[#38332B] font-mono text-xs text-[#1A1A1A] dark:text-[#EDE8DF]">
                  parent-&gt;left = target-&gt;right; free(target);
                </div>
              </div>
            )}

            {deletionCase === 'two-children' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444]">Case 3: Deleting Node with 2 Children (e.g. Delete Root 50)</div>
                <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
                  The target node cannot be simply severed because doing so leaves two orphan subtrees. Instead:
                </p>
                <ol className="list-decimal list-inside text-xs text-[#44403C] dark:text-[#D6D0C5] space-y-1 pl-1">
                  <li>Find the <strong>Inorder Successor</strong> (smallest element in right subtree: go right once, then all the way left).</li>
                  <li>Copy the successor's key into the target node.</li>
                  <li>Recursively delete the successor from the right subtree (which is guaranteed to fall into Case 1 or Case 2!).</li>
                </ol>
                <div className="p-2.5 bg-[#FEF2F2] dark:bg-[#450A0A]/40 rounded border border-[#FECACA] dark:border-[#7F1D1D] font-mono text-xs text-[#991B1B] dark:text-[#EF4444]">
                  target-&gt;key = successor-&gt;key; deleteNode(target-&gt;right, successor-&gt;key);
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: Red-Black Tree 5 Properties */}
      {/* ========================================================================= */}
      {activeTab === 'rbt-invariants' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" /> The 5 Canonical Red-Black Tree Invariants
            </h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              A Red-Black Tree is a self-balancing binary search tree where every node carries a color bit (Red or Black). The 5 invariants guarantee that no path from root to leaf is more than twice as long as any other path ($h \le 2 \log_2(N + 1)$):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { num: 1, title: 'Node Color', desc: 'Every node is either RED or BLACK.' },
              { num: 2, title: 'Root Property', desc: 'The Root node is ALWAYS BLACK.' },
              { num: 3, title: 'Leaf (NIL) Property', desc: 'Every leaf (empty NULL node / NIL) is BLACK.' },
              { num: 4, title: 'Red Node Invariant (No Double Red)', desc: 'If a node is RED, both of its children MUST be BLACK (no two red nodes may be adjacent).' },
              { num: 5, title: 'Black-Height Invariant', desc: 'For every node u, all simple paths from u to descendant leaves contain the exact same count of BLACK nodes.' },
            ].map((prop) => (
              <div key={prop.num} className="p-3.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-1">
                <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-mono text-[10px]">
                    {prop.num}
                  </span>
                  {prop.title}
                </div>
                <div className="text-xs text-[#66625B] dark:text-[#A8A29E] leading-relaxed pl-7">{prop.desc}</div>
              </div>
            ))}
          </div>

          {/* AVL vs Red-Black Comparison */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Comparison: AVL Tree vs. Red-Black Tree</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#F4F2EB] dark:bg-[#2A2622] text-[#2C2B29] dark:text-[#D6D0C5]">
                    <th className="p-2 border border-[#E5E2D9] dark:border-[#38332B]">Feature</th>
                    <th className="p-2 border border-[#E5E2D9] dark:border-[#38332B]">AVL Tree</th>
                    <th className="p-2 border border-[#E5E2D9] dark:border-[#38332B]">Red-Black Tree</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] font-bold">Balance Strictness</td>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] text-[#991B1B] dark:text-[#EF4444] font-bold">Strict (|BF| ≤ 1)</td>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] text-[#15803D] dark:text-[#4ADE80]">Relaxed (Height ≤ 2 log N)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] font-bold">Lookup Speed</td>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] text-[#15803D] dark:text-[#4ADE80]">Faster (shorter tree height)</td>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B]">Slightly slower</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] font-bold">Insertion / Deletion</td>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B]">More rotations required</td>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] text-[#15803D] dark:text-[#4ADE80] font-bold">Faster (mostly recoloring, ≤ 2 rotations on insert, ≤ 3 on delete)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] font-bold">Standard Usage</td>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B]">Read-heavy lookup databases</td>
                    <td className="p-2 border border-[#E5E2D9] dark:border-[#38332B] text-[#15803D] dark:text-[#4ADE80] font-bold">C++ STL std::set & std::map, Linux Kernel CFS Scheduler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: Red-Black Tree Insertion Rebalancing */}
      {/* ========================================================================= */}
      {activeTab === 'rbt-insert' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" /> Red-Black Tree Insertion Algorithm (Double-Red Fix)
            </h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              Every new key is inserted at a leaf position as a <strong>RED node</strong> (to preserve black-height on all paths). If the parent node is also RED, it triggers a <em>Double-Red Violation</em>. We check the color of the <strong>Uncle</strong> node (sibling of parent):
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setRbtInsertCase('case1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  rbtInsertCase === 'case1' ? 'bg-[#991B1B] text-white border-[#991B1B]' : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36]'
                }`}
              >
                Case 1: Uncle is RED (Recoloring Only)
              </button>
              <button
                onClick={() => setRbtInsertCase('case2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  rbtInsertCase === 'case2' ? 'bg-[#991B1B] text-white border-[#991B1B]' : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36]'
                }`}
              >
                Case 2: Uncle is BLACK (Triangle / Zig-Zag)
              </button>
              <button
                onClick={() => setRbtInsertCase('case3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  rbtInsertCase === 'case3' ? 'bg-[#991B1B] text-white border-[#991B1B]' : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36]'
                }`}
              >
                Case 3: Uncle is BLACK (Straight Line)
              </button>
            </div>
          </div>

          {/* Visual Diagram per Insert Case */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4">
            {rbtInsertCase === 'case1' && (
              <div className="space-y-3">
                <div className="text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444]">
                  Case 1 Resolution: Uncle is RED $\to$ Recolor & Propagate Upwards
                </div>
                <div className="p-3 bg-[#FAF8F5] dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs text-[#44403C] dark:text-[#D6D0C5] space-y-1">
                  <div>1. Recolor <strong>Parent (P)</strong> and <strong>Uncle (U)</strong> to <strong>BLACK</strong>.</div>
                  <div>2. Recolor <strong>Grandparent (G)</strong> to <strong>RED</strong>.</div>
                  <div>3. Move current pointer to Grandparent <MathText text="$z \leftarrow G$" /> and repeat check upwards until root is reached (Root is always set BLACK).</div>
                </div>

                {/* SVG Visual Diagram for Case 1 */}
                <div className="flex justify-center p-4 bg-[#FAF8F5] dark:bg-[#181614] rounded-xl border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto">
                  <svg width="420" height="150">
                    {/* Before */}
                    <g transform="translate(10, 10)">
                      <text x="90" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#66625B">BEFORE (Double Red at z, P)</text>
                      <line x1="90" y1="35" x2="45" y2="70" stroke="#88847C" strokeWidth="2" />
                      <line x1="90" y1="35" x2="135" y2="70" stroke="#88847C" strokeWidth="2" />
                      <line x1="45" y1="70" x2="25" y2="105" stroke="#88847C" strokeWidth="2" />
                      {/* G (Black) */}
                      <circle cx="90" cy="35" r="14" fill="#1A1A1A" />
                      <text x="90" y="39" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">G</text>
                      {/* P (Red) */}
                      <circle cx="45" cy="70" r="14" fill="#DC2626" />
                      <text x="45" y="74" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">P</text>
                      {/* U (Red) */}
                      <circle cx="135" cy="70" r="14" fill="#DC2626" />
                      <text x="135" y="74" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">U</text>
                      {/* z (Red) */}
                      <circle cx="25" cy="105" r="14" fill="#DC2626" />
                      <text x="25" y="109" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">z</text>
                    </g>

                    <line x1="200" y1="70" x2="225" y2="70" stroke="#991B1B" strokeWidth="3" markerEnd="url(#arrow)" />
                    <text x="212" y="60" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991B1B">Recolor</text>

                    {/* After */}
                    <g transform="translate(230, 10)">
                      <text x="90" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803D">AFTER RECOLOR</text>
                      <line x1="90" y1="35" x2="45" y2="70" stroke="#88847C" strokeWidth="2" />
                      <line x1="90" y1="35" x2="135" y2="70" stroke="#88847C" strokeWidth="2" />
                      <line x1="45" y1="70" x2="25" y2="105" stroke="#88847C" strokeWidth="2" />
                      {/* G (Red) */}
                      <circle cx="90" cy="35" r="14" fill="#DC2626" />
                      <text x="90" y="39" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">G</text>
                      {/* P (Black) */}
                      <circle cx="45" cy="70" r="14" fill="#1A1A1A" />
                      <text x="45" y="74" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">P</text>
                      {/* U (Black) */}
                      <circle cx="135" cy="70" r="14" fill="#1A1A1A" />
                      <text x="135" y="74" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">U</text>
                      {/* z (Red) */}
                      <circle cx="25" cy="105" r="14" fill="#DC2626" />
                      <text x="25" y="109" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">z</text>
                    </g>
                  </svg>
                </div>
              </div>
            )}

            {rbtInsertCase === 'case2' && (
              <div className="space-y-3">
                <div className="text-xs font-serif font-bold text-[#B45309] dark:text-[#FBBF24]">
                  Case 2 Resolution: Uncle is BLACK & Zig-Zag (Triangle) $\to$ Rotate Parent to form Line (Case 3)
                </div>
                <div className="p-3 bg-[#FAF8F5] dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs text-[#44403C] dark:text-[#D6D0C5]">
                  If <MathText text="$z$" /> is a right child of <MathText text="$P$" /> and <MathText text="$P$" /> is a left child of <MathText text="$G$" />: Perform a <strong>Left Rotation around Parent (P)</strong>. This transforms the triangle into a straight line without violating black-height, converting the situation directly into Case 3.
                </div>
              </div>
            )}

            {rbtInsertCase === 'case3' && (
              <div className="space-y-3">
                <div className="text-xs font-serif font-bold text-[#15803D] dark:text-[#4ADE80]">
                  Case 3 Resolution: Uncle is BLACK & Straight Line (Line) $\to$ Rotate Grandparent & Swap Colors
                </div>
                <div className="p-3 bg-[#FAF8F5] dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs text-[#44403C] dark:text-[#D6D0C5] space-y-1">
                  <div>1. Perform a <strong>Right Rotation around Grandparent (G)</strong>.</div>
                  <div>2. Swap colors of <strong>Parent (becomes BLACK)</strong> and <strong>Grandparent (becomes RED)</strong>.</div>
                  <div>3. Double-Red violation is completely eliminated! Maximum 2 rotations ever needed on insertion.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: Red-Black Tree Removal (Deletion) & Double-Black */}
      {/* ========================================================================= */}
      {activeTab === 'rbt-delete' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" /> Red-Black Tree Deletion (Double-Black Elimination)
            </h4>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              Standard BST deletion replaces a node with 2 children by its Inorder Successor, reducing deletion to a node <MathText text="$u$" /> with at most 1 child. If the removed node is <strong>RED</strong>, black-height is preserved with zero violations. If the removed node is <strong>BLACK</strong>, removing it creates a deficit of 1 black node, termed <strong>"Double Black" (DB)</strong> on the replacement node <MathText text="$x$" />.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setRbtDeleteCase('case1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  rbtDeleteCase === 'case1' ? 'bg-[#991B1B] text-white border-[#991B1B]' : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36]'
                }`}
              >
                Case 1: Sibling is RED
              </button>
              <button
                onClick={() => setRbtDeleteCase('case2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  rbtDeleteCase === 'case2' ? 'bg-[#991B1B] text-white border-[#991B1B]' : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36]'
                }`}
              >
                Case 2: Sibling is BLACK (Both Nephews BLACK)
              </button>
              <button
                onClick={() => setRbtDeleteCase('case3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  rbtDeleteCase === 'case3' ? 'bg-[#991B1B] text-white border-[#991B1B]' : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36]'
                }`}
              >
                Case 3: Sibling is BLACK (Near Nephew RED - Zig-Zag)
              </button>
              <button
                onClick={() => setRbtDeleteCase('case4')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  rbtDeleteCase === 'case4' ? 'bg-[#991B1B] text-white border-[#991B1B]' : 'bg-white dark:bg-[#201D1A] text-[#44403C] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36]'
                }`}
              >
                Case 4: Sibling is BLACK (Far Nephew RED - Terminal Line)
              </button>
            </div>
          </div>

          {/* Details per Deletion Case */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4">
            {rbtDeleteCase === 'case1' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#DC2626]">
                  Deletion Case 1: Sibling (w) is RED
                </div>
                <div className="p-3 bg-[#FAF8F5] dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs text-[#44403C] dark:text-[#D6D0C5] space-y-1">
                  <div>1. Rotate <strong>Parent (P)</strong> left (towards double-black node <MathText text="$x$" />).</div>
                  <div>2. Swap colors: Sibling <MathText text="$w$" /> becomes <strong>BLACK</strong>, Parent <MathText text="$P$" /> becomes <strong>RED</strong>.</div>
                  <div>3. Node <MathText text="$x$" /> receives a new black sibling, converting the situation to Case 2, 3, or 4!</div>
                </div>
              </div>
            )}

            {rbtDeleteCase === 'case2' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#EA580C]">
                  Deletion Case 2: Sibling (w) is BLACK and Both Children of Sibling are BLACK
                </div>
                <div className="p-3 bg-[#FAF8F5] dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs text-[#44403C] dark:text-[#D6D0C5] space-y-1">
                  <div>1. Recolor Sibling <MathText text="$w$" /> to <strong>RED</strong> (takes 1 black off sibling's branch).</div>
                  <div>2. Push the Double-Black up to <strong>Parent (P)</strong>:</div>
                  <div className="pl-4">
                    - If Parent was <strong>RED</strong>, simply color Parent <strong>BLACK</strong> (Double-Black solved!).<br />
                    - If Parent was <strong>BLACK</strong>, Parent becomes the new Double-Black node and we repeat loop upwards.
                  </div>
                </div>
              </div>
            )}

            {rbtDeleteCase === 'case3' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#D97706]">
                  Deletion Case 3: Sibling (w) is BLACK, Near Nephew is RED, Far Nephew is BLACK (Zig-Zag)
                </div>
                <div className="p-3 bg-[#FAF8F5] dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs text-[#44403C] dark:text-[#D6D0C5] space-y-1">
                  <div>1. Rotate Sibling <MathText text="$w$" /> right (away from double-black node).</div>
                  <div>2. Swap colors between Sibling and Near Nephew.</div>
                  <div>3. This brings the red nephew to the far position, transforming directly into Case 4!</div>
                </div>
              </div>
            )}

            {rbtDeleteCase === 'case4' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#15803D] dark:text-[#4ADE80]">
                  Deletion Case 4 (Terminal): Sibling (w) is BLACK and Far Nephew is RED (Line)
                </div>
                <div className="p-3 bg-[#FAF8F5] dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs text-[#44403C] dark:text-[#D6D0C5] space-y-1">
                  <div>1. Rotate <strong>Parent (P)</strong> left (towards double-black node <MathText text="$x$" />).</div>
                  <div>2. Sibling <MathText text="$w$" /> inherits Parent's original color.</div>
                  <div>3. Parent <MathText text="$P$" /> becomes <strong>BLACK</strong>.</div>
                  <div>4. Far Nephew becomes <strong>BLACK</strong>.</div>
                  <div>5. Double-Black is completely resolved in at most 3 rotations total!</div>
                </div>
              </div>
            )}

            {/* Invariant Guarantee Box */}
            <div className="p-3.5 rounded-lg bg-[#F0FDF4] dark:bg-[#064E3B]/40 border border-[#DCFCE7] dark:border-[#059669]/50 flex items-center justify-between text-xs text-[#14532D]">
              <span className="font-serif font-bold">RBT Deletion Bound Guarantee:</span>
              <span className="font-mono font-bold">
                At most 3 rotations and <MathText text="$\mathcal{O}(\log N)$" /> recoloring steps
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
