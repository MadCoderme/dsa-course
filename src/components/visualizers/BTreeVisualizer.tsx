import React, { useState } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  Split,
  Layers,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  Database,
  ArrowLeftRight
} from 'lucide-react';

interface BTreeVisualizerProps {
  focusedMode?: 'btree' | 'bplus';
}

export const BTreeVisualizer: React.FC<BTreeVisualizerProps> = ({ focusedMode = 'btree' }) => {
  const [activeTab, setActiveTab] = useState<'btree' | 'bplus' | 'properties'>(
    focusedMode === 'bplus' ? 'bplus' : 'btree'
  );

  // B-Tree interactive insertion trace
  const [bTreeStep, setBTreeStep] = useState<number>(0);

  // B+ Tree Range query simulation
  const [rangeQueryActive, setRangeQueryActive] = useState<boolean>(false);
  const [rangeStep, setRangeStep] = useState<number>(-1);

  // Order-4 B-Tree insertion trace: [10, 20, 30] -> insert 40 (overflow split) -> insert 50 -> insert 60
  const bTreeSteps = [
    {
      step: 0,
      title: 'Initial Leaf Node with 3 Keys: [ 10 | 20 | 30 ]',
      desc: 'An Order-4 B-Tree node has max capacity M - 1 = 3 keys. The node is currently at 100% capacity.',
      action: 'Ready to insert key 40...',
      rootKeys: [10, 20, 30],
      isSplit: false,
      leftKeys: [],
      rightKeys: [],
      promotedKey: null,
    },
    {
      step: 1,
      title: 'Insert Key 40 → Node Overflows (4 Keys: [10, 20, 30, 40])',
      desc: 'Capacity exceeded (4 > 3). The median key at index ⌊M/2⌋ = index 1 (Key 20) is chosen for promotion.',
      action: 'Splitting node into Left Child [10], Right Child [30, 40], and promoting Key 20!',
      rootKeys: [10, 20, 30, 40],
      isSplit: false,
      leftKeys: [],
      rightKeys: [],
      promotedKey: 20,
    },
    {
      step: 2,
      title: 'Split Complete: New Root [ 20 ] with 2 Children',
      desc: 'Tree height increases by 1. Root holds [20], Left Child holds [10], Right Child holds [30 | 40].',
      action: 'Height grew from 1 to 2.',
      rootKeys: [20],
      isSplit: true,
      leftKeys: [10],
      rightKeys: [30, 40],
      promotedKey: null,
    },
    {
      step: 3,
      title: 'Insert Key 50 into Right Child [ 30 | 40 | 50 ]',
      desc: 'Key 50 is routed to the right child (50 > 20). Right child now holds 3 keys: [ 30 | 40 | 50 ].',
      action: 'Right child is now at max capacity (3/3 keys).',
      rootKeys: [20],
      isSplit: true,
      leftKeys: [10],
      rightKeys: [30, 40, 50],
      promotedKey: null,
    },
  ];

  const rangeSteps = [
    { step: 0, leaf: 'L1', keys: [5, 10], note: 'Root search points to Left Leaf L1. Read keys [5, 10].' },
    { step: 1, leaf: 'L2', keys: [20, 25, 30], note: 'Follow horizontal next-leaf pointer → L2. Read keys [20, 25, 30].' },
    { step: 2, leaf: 'L3', keys: [40, 50], note: 'Follow horizontal next-leaf pointer → L3. Read keys [40, 50]. Range Query [10...45] satisfied without re-traversing tree!' },
  ];

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Database className="w-5 h-5 text-[#991B1B]" /> B-Tree & B+ Tree Multi-Way Indexing Studio
          </h3>
          <div className="text-xs text-[#66625B] mt-0.5 font-sans">
            Explore Order-<MathText text="$M$" /> multi-way balanced search trees, bottom-up node overflow splits, and B+ tree linked leaf sequential scans.
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#F4F2EB] p-1 rounded-lg border border-[#E5E2D9]">
          <button
            onClick={() => setActiveTab('btree')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'btree' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            Order-4 B-Tree Split
          </button>
          <button
            onClick={() => setActiveTab('bplus')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'bplus' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            B+ Tree Linked Leaves
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'properties' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            B vs B+ Comparison
          </button>
        </div>
      </div>

      {/* TAB 1: B-Tree Split Animation */}
      {activeTab === 'btree' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A]">
              Step {bTreeStep + 1} of {bTreeSteps.length}: {bTreeSteps[bTreeStep].title}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (bTreeStep < bTreeSteps.length - 1) setBTreeStep((prev) => prev + 1);
                }}
                disabled={bTreeStep >= bTreeSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Next Insert Step
              </button>
              <button
                onClick={() => setBTreeStep(0)}
                className="p-1.5 rounded-lg bg-white border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FEF2F2]/40 border border-[#FECACA] text-xs text-[#44403C] space-y-1">
            <div className="font-serif font-bold text-[#991B1B]">{bTreeSteps[bTreeStep].desc}</div>
            <div className="text-[11px] text-[#7F1D1D] font-mono">{bTreeSteps[bTreeStep].action}</div>
          </div>

          {/* Graphical Render of B-Tree Node */}
          <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] flex flex-col items-center justify-center min-h-[220px]">
            {!bTreeSteps[bTreeStep].isSplit ? (
              <div className="space-y-3 flex flex-col items-center">
                <span className="text-xs font-serif font-bold text-[#66625B]">Root Node (Capacity: Max 3 Keys):</span>
                <div className={`flex border-2 rounded-lg overflow-hidden font-mono font-bold text-sm shadow-sm ${
                  bTreeSteps[bTreeStep].rootKeys.length > 3 ? 'border-[#DC2626] animate-pulse bg-[#FEF2F2]' : 'border-[#1A1A1A] bg-white'
                }`}>
                  {bTreeSteps[bTreeStep].rootKeys.map((k, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2.5 border-r last:border-r-0 ${
                        k === bTreeSteps[bTreeStep].promotedKey ? 'bg-[#FEE2E2] text-[#991B1B] font-bold' : ''
                      }`}
                    >
                      {k}
                    </span>
                  ))}
                </div>
                {bTreeSteps[bTreeStep].promotedKey && (
                  <span className="text-xs font-bold text-[#DC2626] font-mono">
                    ↑ Median Key [{bTreeSteps[bTreeStep].promotedKey}] Marked for Promotion
                  </span>
                )}
              </div>
            ) : (
              <div className="space-y-6 flex flex-col items-center">
                {/* Promoted Parent Root */}
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-[11px] font-serif font-bold text-[#15803D]">New Parent Root:</span>
                  <div className="flex border-2 border-[#15803D] rounded-lg bg-[#F0FDF4] overflow-hidden font-mono font-bold text-sm shadow-sm">
                    {bTreeSteps[bTreeStep].rootKeys.map((k, idx) => (
                      <span key={idx} className="px-5 py-2 text-[#15803D]">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtree Connectors */}
                <svg width="260" height="30" className="overflow-visible">
                  <line x1="130" y1="0" x2="60" y2="30" stroke="#88847C" strokeWidth="2" />
                  <line x1="130" y1="0" x2="200" y2="30" stroke="#88847C" strokeWidth="2" />
                </svg>

                {/* Children */}
                <div className="flex items-center gap-12">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-[11px] font-serif text-[#66625B]">Left Child (&lt; 20):</span>
                    <div className="flex border-2 border-[#1A1A1A] rounded-lg bg-white overflow-hidden font-mono font-bold text-xs shadow-xs">
                      {bTreeSteps[bTreeStep].leftKeys.map((k, idx) => (
                        <span key={idx} className="px-3 py-1.5 border-r last:border-r-0">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-[11px] font-serif text-[#66625B]">Right Child (&gt; 20):</span>
                    <div className="flex border-2 border-[#1A1A1A] rounded-lg bg-white overflow-hidden font-mono font-bold text-xs shadow-xs">
                      {bTreeSteps[bTreeStep].rightKeys.map((k, idx) => (
                        <span key={idx} className="px-3 py-1.5 border-r last:border-r-0">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: B+ Tree Linked Leaves */}
      {activeTab === 'bplus' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-[#15803D]" /> B+ Tree: The King of Database Storage Engines
            </h4>
            <p className="text-xs text-[#44403C] leading-relaxed">
              Unlike a standard B-tree where data records reside in both internal nodes and leaves, a <strong>B+ Tree</strong> stores data records <em>exclusively in the leaf nodes</em>. All leaf nodes are linked together as a <strong>Doubly Linked List</strong>, enabling <Latex math="\mathcal{O}(\log N + K)" /> range queries (<code className="text-[#991B1B] font-mono">SELECT * WHERE age BETWEEN 10 AND 45</code>)!
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#E5E2D9]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A]">
              Sequential Range Scan Simulation: <span className="font-mono text-[#991B1B] font-bold">[10 ... 45]</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (rangeStep < rangeSteps.length - 1) setRangeStep((prev) => prev + 1);
                }}
                disabled={rangeStep >= rangeSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Scan Next Leaf Block
              </button>
              <button
                onClick={() => setRangeStep(-1)}
                className="p-1.5 rounded-lg bg-white border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* B+ Tree Linked Leaf Diagram */}
          <div className="p-4 sm:p-6 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-6">
            {/* Internal Index Node */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[11px] font-serif font-bold text-[#66625B]">Internal Router Index (Keys Only, No Record Data):</span>
              <div className="flex border-2 border-[#1A1A1A] rounded-lg bg-white overflow-hidden font-mono font-bold text-xs shadow-xs">
                <span className="px-4 py-2 border-r border-[#E5E2D9]">[ &lt; 20 ]</span>
                <span className="px-4 py-2 bg-[#F4F2EB] text-[#991B1B] border-r border-[#E5E2D9]">20</span>
                <span className="px-4 py-2 border-r border-[#E5E2D9]">[ 20...40 ]</span>
                <span className="px-4 py-2 bg-[#F4F2EB] text-[#991B1B] border-r border-[#E5E2D9]">40</span>
                <span className="px-4 py-2">[ &gt; 40 ]</span>
              </div>
            </div>

            {/* Tree Branch Links */}
            <div className="flex justify-center">
              <svg width="400" height="30">
                <line x1="200" y1="0" x2="70" y2="30" stroke="#88847C" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="200" y1="0" x2="200" y2="30" stroke="#88847C" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="200" y1="0" x2="330" y2="30" stroke="#88847C" strokeWidth="2" strokeDasharray="3,3" />
              </svg>
            </div>

            {/* Leaves with Horizontal Double-Linked Chain */}
            <div className="flex flex-wrap items-center justify-center gap-3 relative">
              {/* Leaf 1 */}
              <div className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center ${
                rangeStep >= 0 ? 'bg-[#F0FDF4] border-[#15803D] shadow-sm' : 'bg-white border-[#1A1A1A]'
              }`}>
                <span className="text-[10px] font-mono text-[#66625B]">Leaf L1 (Data Records)</span>
                <span className="font-mono font-bold text-xs text-[#1A1A1A] mt-1">[ 5 | 10* ]</span>
              </div>

              {/* Horizontal Pointer Arrow */}
              <div className="flex items-center text-[#15803D] font-bold">
                <ArrowRight className="w-5 h-5 text-[#15803D]" />
              </div>

              {/* Leaf 2 */}
              <div className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center ${
                rangeStep >= 1 ? 'bg-[#F0FDF4] border-[#15803D] shadow-sm' : 'bg-white border-[#1A1A1A]'
              }`}>
                <span className="text-[10px] font-mono text-[#66625B]">Leaf L2 (Data Records)</span>
                <span className="font-mono font-bold text-xs text-[#1A1A1A] mt-1">[ 20* | 25* | 30* ]</span>
              </div>

              {/* Horizontal Pointer Arrow */}
              <div className="flex items-center text-[#15803D] font-bold">
                <ArrowRight className="w-5 h-5 text-[#15803D]" />
              </div>

              {/* Leaf 3 */}
              <div className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center ${
                rangeStep >= 2 ? 'bg-[#F0FDF4] border-[#15803D] shadow-sm' : 'bg-white border-[#1A1A1A]'
              }`}>
                <span className="text-[10px] font-mono text-[#66625B]">Leaf L3 (Data Records)</span>
                <span className="font-mono font-bold text-xs text-[#1A1A1A] mt-1">[ 40* | 50 ]</span>
              </div>
            </div>

            {rangeStep >= 0 && (
              <div className="text-xs font-sans text-[#44403C] bg-[#F0FDF4] p-3 rounded-lg border border-[#DCFCE7] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>
                  <strong>Range Scan Step {rangeStep + 1}:</strong> {rangeSteps[rangeStep].note}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: B vs B+ Comparison Matrix */}
      {activeTab === 'properties' && (
        <div className="overflow-x-auto rounded-lg border border-[#E5E2D9]">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#F4F2EB] text-[#2C2B29]">
                <th className="p-3 border border-[#E5E2D9]">Feature</th>
                <th className="p-3 border border-[#E5E2D9]">Standard B-Tree</th>
                <th className="p-3 border border-[#E5E2D9]">B+ Tree (Databases)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2D9] bg-white">
              <tr>
                <td className="p-3 font-bold border border-[#E5E2D9]">Record Data Storage</td>
                <td className="p-3 border border-[#E5E2D9]">Internal Nodes & Leaf Nodes</td>
                <td className="p-3 font-bold text-[#15803D] border border-[#E5E2D9]">Leaves ONLY (Internal nodes only store keys)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold border border-[#E5E2D9]">Fan-out & Height</td>
                <td className="p-3 border border-[#E5E2D9]">Smaller fanout (data pointers consume space)</td>
                <td className="p-3 font-bold text-[#15803D] border border-[#E5E2D9]">Massive fanout (hundreds of keys per disk block)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold border border-[#E5E2D9]">Range Queries</td>
                <td className="p-3 border border-[#E5E2D9]">Slow (Requires full tree inorder traversal)</td>
                <td className="p-3 font-bold text-[#15803D] border border-[#E5E2D9]">Lightning fast (Follow leaf-level linked list)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold border border-[#E5E2D9]">Production Use Cases</td>
                <td className="p-3 border border-[#E5E2D9]">Filesystems (ext4)</td>
                <td className="p-3 font-bold text-[#991B1B] border border-[#E5E2D9]">MySQL InnoDB, PostgreSQL B-Tree Indexes, SQLite</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
