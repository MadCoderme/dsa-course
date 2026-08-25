import React, { useState } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  RotateCcw,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
  ArrowRight,
  Split,
  Trash2,
  Plus
} from 'lucide-react';

interface AvlNode {
  val: number;
  height: number;
  bf: number; // Balance factor: height(left) - height(right)
  left?: AvlNode;
  right?: AvlNode;
}

interface AvlTreeVisualizerProps {
  focusedMode?: 'rotations' | 'bst-deletion' | 'btree-split';
}

export const AvlTreeVisualizer: React.FC<AvlTreeVisualizerProps> = ({ focusedMode = 'rotations' }) => {
  const [activeTab, setActiveTab] = useState<'rotations' | 'bst-deletion' | 'btree-split'>(focusedMode);

  // Rotation Demo State
  const [selectedRotation, setSelectedRotation] = useState<'LL' | 'RR' | 'LR' | 'RL'>('LL');
  const [rotationStep, setRotationStep] = useState<number>(0);

  // BST Deletion Case Demo
  const [deletionCase, setDeletionCase] = useState<'leaf' | 'one-child' | 'two-children'>('two-children');

  // Order-4 B-Tree / B+ Tree simulation
  const [bTreeKeys, setBTreeKeys] = useState<number[]>([10, 20, 30]);
  const [splitStage, setSplitStage] = useState<boolean>(false);

  // Rotations data
  const rotationDemos = {
    LL: {
      name: 'LL Rotation (Single Right Rotation)',
      imbalance: 'Occurs when a node is inserted into the Left Subtree of the Left Child (Balance Factor = +2).',
      beforeNodes: [
        { id: 'k2', label: 'k2 (Root, BF = +2)', x: 200, y: 30, color: '#991B1B' },
        { id: 'k1', label: 'k1 (Left, BF = +1)', x: 120, y: 85, color: '#B45309' },
        { id: 'new', label: 'New Node', x: 60, y: 140, color: '#15803D' },
      ],
      afterNodes: [
        { id: 'k1', label: 'k1 (New Root, BF = 0)', x: 200, y: 30, color: '#15803D' },
        { id: 'new', label: 'New Node (BF = 0)', x: 120, y: 85, color: '#1A1A1A' },
        { id: 'k2', label: 'k2 (Right, BF = 0)', x: 280, y: 85, color: '#1A1A1A' },
      ],
      code: `Node* rotateRight(Node* k2) {
    Node* k1 = k2->left;
    k2->left = k1->right;
    k1->right = k2;
    updateHeight(k2);
    updateHeight(k1);
    return k1; // New Subtree Root
}`
    },
    RR: {
      name: 'RR Rotation (Single Left Rotation)',
      imbalance: 'Occurs when a node is inserted into the Right Subtree of the Right Child (Balance Factor = -2).',
      beforeNodes: [
        { id: 'k1', label: 'k1 (Root, BF = -2)', x: 200, y: 30, color: '#991B1B' },
        { id: 'k2', label: 'k2 (Right, BF = -1)', x: 280, y: 85, color: '#B45309' },
        { id: 'new', label: 'New Node', x: 340, y: 140, color: '#15803D' },
      ],
      afterNodes: [
        { id: 'k2', label: 'k2 (New Root, BF = 0)', x: 200, y: 30, color: '#15803D' },
        { id: 'k1', label: 'k1 (Left, BF = 0)', x: 120, y: 85, color: '#1A1A1A' },
        { id: 'new', label: 'New Node (BF = 0)', x: 280, y: 85, color: '#1A1A1A' },
      ],
      code: `Node* rotateLeft(Node* k1) {
    Node* k2 = k1->right;
    k1->right = k2->left;
    k2->left = k1;
    updateHeight(k1);
    updateHeight(k2);
    return k2; // New Subtree Root
}`
    },
    LR: {
      name: 'LR Double Rotation (Left on Child, then Right on Root)',
      imbalance: 'Occurs when inserted into the Right Subtree of the Left Child (k3 BF = +2, k1 BF = -1).',
      beforeNodes: [
        { id: 'k3', label: 'k3 (Root, BF = +2)', x: 200, y: 30, color: '#991B1B' },
        { id: 'k1', label: 'k1 (Left, BF = -1)', x: 120, y: 85, color: '#B45309' },
        { id: 'k2', label: 'k2 (Inner Right)', x: 160, y: 140, color: '#15803D' },
      ],
      afterNodes: [
        { id: 'k2', label: 'k2 (New Root, BF = 0)', x: 200, y: 30, color: '#15803D' },
        { id: 'k1', label: 'k1 (Left, BF = 0)', x: 120, y: 85, color: '#1A1A1A' },
        { id: 'k3', label: 'k3 (Right, BF = 0)', x: 280, y: 85, color: '#1A1A1A' },
      ],
      code: `Node* doubleRotateLR(Node* k3) {
    k3->left = rotateLeft(k3->left);  // Step 1: RR on child
    return rotateRight(k3);            // Step 2: LL on root
}`
    },
    RL: {
      name: 'RL Double Rotation (Right on Child, then Left on Root)',
      imbalance: 'Occurs when inserted into the Left Subtree of the Right Child (k1 BF = -2, k3 BF = +1).',
      beforeNodes: [
        { id: 'k1', label: 'k1 (Root, BF = -2)', x: 200, y: 30, color: '#991B1B' },
        { id: 'k3', label: 'k3 (Right, BF = +1)', x: 280, y: 85, color: '#B45309' },
        { id: 'k2', label: 'k2 (Inner Left)', x: 240, y: 140, color: '#15803D' },
      ],
      afterNodes: [
        { id: 'k2', label: 'k2 (New Root, BF = 0)', x: 200, y: 30, color: '#15803D' },
        { id: 'k1', label: 'k1 (Left, BF = 0)', x: 120, y: 85, color: '#1A1A1A' },
        { id: 'k3', label: 'k3 (Right, BF = 0)', x: 280, y: 85, color: '#1A1A1A' },
      ],
      code: `Node* doubleRotateRL(Node* k1) {
    k1->right = rotateRight(k1->right); // Step 1: LL on child
    return rotateLeft(k1);               // Step 2: RR on root
}`
    }
  };

  const currentRot = rotationDemos[selectedRotation];

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#15803D]" /> AVL & Multi-Way Tree Laboratory
          </h3>
          <div className="text-xs text-[#66625B] mt-0.5 font-sans">
            Explore strictly height-balanced trees (<Latex math="\text{BF} \in \{-1, 0, +1\}" />), the 4 canonical rotations, BST deletion cases, and B-Tree node splits.
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-[#F4F2EB] p-1 rounded-lg border border-[#E5E2D9]">
          <button
            onClick={() => setActiveTab('rotations')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'rotations' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            AVL 4 Rotations (LL, RR, LR, RL)
          </button>
          <button
            onClick={() => setActiveTab('bst-deletion')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'bst-deletion' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            BST 3 Deletion Cases
          </button>
          <button
            onClick={() => setActiveTab('btree-split')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'btree-split' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            B-Tree / B+ Node Split
          </button>
        </div>
      </div>

      {/* TAB 1: AVL Rotations */}
      {activeTab === 'rotations' && (
        <div className="space-y-5">
          {/* Rotation Selection */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-bold text-[#1A1A1A]">Rotation Archetype:</span>
              {(['LL', 'RR', 'LR', 'RL'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setSelectedRotation(r);
                    setRotationStep(0);
                  }}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer border ${
                    selectedRotation === r
                      ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-2xs'
                      : 'bg-white text-[#44403C] border-[#D8D4C8] hover:bg-[#F4F2EB]'
                  }`}
                >
                  {r} Rotation
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRotationStep(rotationStep === 0 ? 1 : 0)}
                className="px-3.5 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Zap className="w-3.5 h-3.5" />
                {rotationStep === 0 ? 'Execute Rotation' : 'Show Imbalance State'}
              </button>
              <button
                onClick={() => setRotationStep(0)}
                className="p-1.5 rounded-lg bg-white border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Explanation Header */}
          <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-1.5">
            <div className="text-xs font-serif font-bold text-[#991B1B]">
              {currentRot.name}
            </div>
            <div className="text-xs text-[#44403C]">
              {currentRot.imbalance}
            </div>
          </div>

          {/* Visual Canvas Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Imbalance (Before) */}
            <div className={`p-4 rounded-xl border transition-all ${rotationStep === 0 ? 'bg-[#FEF2F2]/40 border-[#FECACA]' : 'bg-[#FAF8F5] border-[#E5E2D9] opacity-60'}`}>
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9]">
                <span className="text-xs font-serif font-bold text-[#991B1B]">1. Imbalanced State (Trigger)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#991B1B] border border-[#FECACA]">
                  |BF| = 2
                </span>
              </div>
              <div className="pt-4 flex justify-center">
                <svg width="340" height="180">
                  {currentRot.beforeNodes.map((n, idx) => (
                    <g key={n.id}>
                      <circle cx={n.x} cy={n.y} r="18" fill={n.color} stroke="#FFFFFF" strokeWidth="2" />
                      <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                        {n.id}
                      </text>
                      <text x={n.x} y={n.y + 30} textAnchor="middle" fill="#1A1A1A" fontSize="10" fontFamily="sans-serif">
                        {n.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Balanced (After) */}
            <div className={`p-4 rounded-xl border transition-all ${rotationStep === 1 ? 'bg-[#F0FDF4] border-[#BBF7D0]' : 'bg-[#FAF8F5] border-[#E5E2D9] opacity-60'}`}>
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9]">
                <span className="text-xs font-serif font-bold text-[#15803D]">2. Restored Balance (Post-Rotation)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#15803D] border border-[#BBF7D0]">
                  BF = 0 for all
                </span>
              </div>
              <div className="pt-4 flex justify-center">
                <svg width="340" height="180">
                  {currentRot.afterNodes.map((n, idx) => (
                    <g key={n.id}>
                      <circle cx={n.x} cy={n.y} r="18" fill={n.color} stroke="#FFFFFF" strokeWidth="2" />
                      <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                        {n.id}
                      </text>
                      <text x={n.x} y={n.y + 30} textAnchor="middle" fill="#1A1A1A" fontSize="10" fontFamily="sans-serif">
                        {n.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* C++ Code Implementation */}
          <div className="p-4 rounded-lg bg-[#1E1E1E] text-[#D4D4D4] font-mono text-xs overflow-x-auto space-y-1.5">
            <div className="text-[11px] text-[#888] font-sans">C++ Pointer Re-linking Routine:</div>
            <pre className="text-xs">{currentRot.code}</pre>
          </div>
        </div>
      )}

      {/* TAB 2: BST 3 Deletion Cases */}
      {activeTab === 'bst-deletion' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <span className="text-xs font-serif font-bold text-[#1A1A1A]">Deletion Scenario:</span>
            {(['leaf', 'one-child', 'two-children'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setDeletionCase(c)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold capitalize transition-all cursor-pointer border ${
                  deletionCase === c
                    ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-2xs'
                    : 'bg-white text-[#44403C] border-[#D8D4C8] hover:bg-[#F4F2EB]'
                }`}
              >
                {c === 'leaf' && 'Case 1: Leaf (0 Children)'}
                {c === 'one-child' && 'Case 2: Node with 1 Child'}
                {c === 'two-children' && 'Case 3: Node with 2 Children'}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-3">
            {deletionCase === 'leaf' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#15803D]">Case 1: Target Node is a Leaf (No Children)</div>
                <p className="text-xs text-[#44403C] leading-relaxed">
                  Simply sever the parent pointer pointing to this node (<code className="text-[#991B1B] font-mono">parent-&gt;left = NULL</code> or <code className="text-[#991B1B] font-mono">parent-&gt;right = NULL</code>) and free memory with <code className="text-[#991B1B] font-mono">delete node</code>.
                </p>
                <div className="p-2.5 rounded bg-[#FAF8F5] font-mono text-xs text-[#15803D]">
                  Time Complexity: <Latex math="\mathcal{O}(h) = \mathcal{O}(\log N)" /> to find + <Latex math="\mathcal{O}(1)" /> pointer update.
                </div>
              </div>
            )}

            {deletionCase === 'one-child' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#B45309]">Case 2: Target Node Has Exactly 1 Child</div>
                <p className="text-xs text-[#44403C] leading-relaxed">
                  Bypass the target node! Connect the parent directly to the target node's only child (<code className="text-[#991B1B] font-mono">parent-&gt;link = target-&gt;child</code>), then free the target node.
                </p>
                <div className="p-2.5 rounded bg-[#FAF8F5] font-mono text-xs text-[#B45309]">
                  Result: Tree height shrinks smoothly without disrupting the BST ordering invariant.
                </div>
              </div>
            )}

            {deletionCase === 'two-children' && (
              <div className="space-y-2">
                <div className="text-xs font-serif font-bold text-[#991B1B]">Case 3: Target Node Has 2 Children (High-Yield CUET Exam Question!)</div>
                <p className="text-xs text-[#44403C] leading-relaxed">
                  You cannot simply delete the node because doing so leaves two orphan subtrees! Instead:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#44403C] pl-2">
                  <li>Find the <strong>Inorder Successor</strong> (the smallest element in the Right Subtree: walk right once, then left as far as possible).</li>
                  <li>Copy the successor's data value into the target node.</li>
                  <li>Recursively delete the successor node from the right subtree (which is guaranteed to have at most 1 child, reducing to Case 1 or Case 2!).</li>
                </ol>
                <div className="p-2.5 rounded bg-[#FEF2F2] border border-[#FECACA] font-mono text-xs text-[#991B1B] font-bold">
                  Alternative: You can equivalently use the Inorder Predecessor (maximum element in Left Subtree).
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: B-Tree & B+ Tree Node Split */}
      {activeTab === 'btree-split' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <Split className="w-4 h-4 text-[#991B1B]" /> Order-4 B-Tree Node Overflow & Split Simulation
            </h4>
            <p className="text-xs text-[#44403C] leading-relaxed">
              In a B-Tree of order <MathText text="$M = 4$" />, a node can hold a maximum of <MathText text="$M - 1 = 3$" /> keys. Inserting a 4th key causes an <strong>Overflow</strong>, splitting the node into two halves and promoting the median key up to the parent!
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSplitStage(!splitStage)}
                className="px-3.5 py-1.5 rounded-lg bg-[#991B1B] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#7F1D1D] shadow-xs"
              >
                {splitStage ? 'Reset Node' : 'Insert 40 & Trigger Split'}
              </button>
            </div>

            {/* Live B-Tree Box Canvas */}
            <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] flex flex-col items-center gap-4">
              {!splitStage ? (
                <div className="space-y-2 text-center">
                  <span className="text-xs font-serif font-bold text-[#1A1A1A]">Leaf Node Before Split (Capacity: 3 / 3):</span>
                  <div className="flex border-2 border-[#1A1A1A] rounded-md overflow-hidden font-mono font-bold text-sm">
                    <span className="px-4 py-2 bg-[#FAF8F5] border-r border-[#E5E2D9]">10</span>
                    <span className="px-4 py-2 bg-[#FAF8F5] border-r border-[#E5E2D9]">20</span>
                    <span className="px-4 py-2 bg-[#FAF8F5]">30</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="space-y-1">
                    <span className="text-xs font-serif font-bold text-[#15803D]">Promoted Median Key to Parent:</span>
                    <div className="inline-flex border-2 border-[#15803D] rounded-md bg-[#F0FDF4] px-4 py-1.5 font-mono font-bold text-sm text-[#15803D]">
                      [ 20 ]
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="space-y-1">
                      <span className="text-[11px] font-serif text-[#66625B]">Left Child Node:</span>
                      <div className="border border-[#1A1A1A] rounded bg-[#FAF8F5] px-3 py-1.5 font-mono font-bold text-xs">
                        [ 10 ]
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-serif text-[#66625B]">Right Child Node:</span>
                      <div className="border border-[#1A1A1A] rounded bg-[#FAF8F5] px-3 py-1.5 font-mono font-bold text-xs">
                        [ 30 | 40 ]
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
