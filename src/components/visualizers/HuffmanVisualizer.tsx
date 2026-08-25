import React, { useState } from 'react';
import { Latex, MathText } from '../common/Latex';
import {
  Binary,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Layers,
  Calculator
} from 'lucide-react';

interface HuffmanNode {
  id: string;
  char?: string;
  freq: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
  code?: string;
}

export const HuffmanVisualizer: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'construction' | 'codes' | 'wpl'>('construction');

  // Initial character frequencies: A: 45, B: 13, C: 12, D: 16, E: 9, F: 5
  // Total freq = 100
  const initialFrequencies = [
    { char: 'F', freq: 5 },
    { char: 'E', freq: 9 },
    { char: 'C', freq: 12 },
    { char: 'B', freq: 13 },
    { char: 'D', freq: 16 },
    { char: 'A', freq: 45 },
  ];

  const constructionSteps = [
    {
      stepNum: 0,
      title: 'Initial Priority Queue (Min-Heap of 6 Leaf Nodes)',
      forest: [
        { id: 'F', char: 'F', freq: 5 },
        { id: 'E', char: 'E', freq: 9 },
        { id: 'C', char: 'C', freq: 12 },
        { id: 'B', char: 'B', freq: 13 },
        { id: 'D', char: 'D', freq: 16 },
        { id: 'A', char: 'A', freq: 45 },
      ],
      note: 'Sorted character frequency pool. At each step, extract the two minimum frequency roots.',
      mergedInfo: null,
    },
    {
      stepNum: 1,
      title: 'Merge Minimums (F: 5) and (E: 9) → New Subtree (14)',
      forest: [
        { id: 'C', char: 'C', freq: 12 },
        { id: 'B', char: 'B', freq: 13 },
        { id: 'FE', char: 'FE', freq: 14, left: { id: 'F', char: 'F', freq: 5 }, right: { id: 'E', char: 'E', freq: 9 } },
        { id: 'D', char: 'D', freq: 16 },
        { id: 'A', char: 'A', freq: 45 },
      ],
      note: 'Extracted F(5) and E(9). Created parent node (14) with left child F (code 0) and right child E (code 1). Re-inserted 14 into Min-Heap.',
      mergedInfo: 'Merged F (5) + E (9) = 14',
    },
    {
      stepNum: 2,
      title: 'Merge Minimums (C: 12) and (B: 13) → New Subtree (25)',
      forest: [
        { id: 'FE', char: 'FE', freq: 14, left: { id: 'F', char: 'F', freq: 5 }, right: { id: 'E', char: 'E', freq: 9 } },
        { id: 'D', char: 'D', freq: 16 },
        { id: 'CB', char: 'CB', freq: 25, left: { id: 'C', char: 'C', freq: 12 }, right: { id: 'B', char: 'B', freq: 13 } },
        { id: 'A', char: 'A', freq: 45 },
      ],
      note: 'Extracted C(12) and B(13). Created parent node (25) with left C (0) and right B (1). Re-inserted 25 into Min-Heap.',
      mergedInfo: 'Merged C (12) + B (13) = 25',
    },
    {
      stepNum: 3,
      title: 'Merge Minimums Subtree (14) and (D: 16) → New Subtree (30)',
      forest: [
        { id: 'CB', char: 'CB', freq: 25, left: { id: 'C', char: 'C', freq: 12 }, right: { id: 'B', char: 'B', freq: 13 } },
        { id: 'FED', char: 'FED', freq: 30, left: { id: 'FE', char: 'FE', freq: 14 }, right: { id: 'D', char: 'D', freq: 16 } },
        { id: 'A', char: 'A', freq: 45 },
      ],
      note: 'Extracted subtree (14) and D(16). Created parent node (30). Subtree (14) is left child, D is right child.',
      mergedInfo: 'Merged (F,E: 14) + D (16) = 30',
    },
    {
      stepNum: 4,
      title: 'Merge Minimums Subtree (25) and Subtree (30) → Subtree (55)',
      forest: [
        { id: 'A', char: 'A', freq: 45 },
        { id: 'CBFED', char: 'CBFED', freq: 55, left: { id: 'CB', char: 'CB', freq: 25 }, right: { id: 'FED', char: 'FED', freq: 30 } },
      ],
      note: 'Extracted subtree (25) and subtree (30). Created parent node (55).',
      mergedInfo: 'Merged (C,B: 25) + (F,E,D: 30) = 55',
    },
    {
      stepNum: 5,
      title: 'Final Merge: (A: 45) and Subtree (55) → Full Optimal 2-Tree (Root 100)',
      forest: [
        { id: 'ROOT', char: 'ROOT', freq: 100, left: { id: 'A', char: 'A', freq: 45 }, right: { id: 'CBFED', char: 'CBFED', freq: 55 } },
      ],
      note: 'Extracted A(45) and Subtree(55). The Min-Heap contains exactly 1 tree. Huffman Tree complete!',
      mergedInfo: 'Merged A (45) + (C,B,F,E,D: 55) = 100 (Full 2-Tree)',
    },
  ];

  // Assigned binary prefix codes:
  const assignedCodes = [
    { char: 'A', freq: 45, code: '0', depth: 1, bits: 45 * 1 },
    { char: 'C', freq: 12, code: '100', depth: 3, bits: 12 * 3 },
    { char: 'B', freq: 13, code: '101', depth: 3, bits: 13 * 3 },
    { char: 'F', freq: 5, code: '1100', depth: 4, bits: 5 * 4 },
    { char: 'E', freq: 9, code: '1101', depth: 4, bits: 9 * 4 },
    { char: 'D', freq: 16, code: '111', depth: 3, bits: 16 * 3 },
  ];

  const totalWPL = assignedCodes.reduce((acc, c) => acc + c.bits, 0); // 45 + 36 + 39 + 20 + 36 + 48 = 224
  const fixedBits = 100 * 3; // Fixed 3-bit ASCII representation = 300 bits
  const compressionRatio = (((fixedBits - totalWPL) / fixedBits) * 100).toFixed(1);

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Binary className="w-5 h-5 text-[#991B1B]" /> Huffman Optimal Prefix 2-Tree Simulator
          </h3>
          <div className="text-xs text-[#66625B] mt-0.5 font-sans">
            Build optimal variable-length prefix binary trees, eliminate ambiguity without delimiters, and minimize Weighted External Path Length (<MathText text="$\text{WPL} = \sum f_i \cdot d_i$" />).
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#F4F2EB] p-1 rounded-lg border border-[#E5E2D9]">
          <button
            onClick={() => setActiveTab('construction')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'construction' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            1. Step-by-Step Tree Merge
          </button>
          <button
            onClick={() => setActiveTab('codes')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'codes' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            2. Prefix Code Table
          </button>
          <button
            onClick={() => setActiveTab('wpl')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'wpl' ? 'bg-white text-[#991B1B] shadow-2xs font-bold' : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            3. WPL & Compression Proof
          </button>
        </div>
      </div>

      {/* TAB 1: Step by Step Merge */}
      {activeTab === 'construction' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="text-xs font-serif font-bold text-[#1A1A1A]">
              Heap Reduction Step {step} of 5:
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (step < 5) setStep((prev) => prev + 1);
                }}
                disabled={step >= 5}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Next Merge Step
              </button>
              <button
                onClick={() => setStep(0)}
                className="p-1.5 rounded-lg bg-white border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Step Description */}
          <div className="p-3.5 rounded-lg bg-[#FEF2F2]/50 border border-[#FECACA] space-y-1">
            <div className="text-xs font-serif font-bold text-[#991B1B]">
              {constructionSteps[step].title}
            </div>
            <div className="text-xs text-[#44403C]">
              {constructionSteps[step].note}
            </div>
          </div>

          {/* Render Full Tree SVG on Final Step or Dynamic Partial Forest */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] overflow-x-auto flex flex-col items-center justify-center min-h-[250px]">
            {step === 5 ? (
              <svg width="440" height="230" className="overflow-visible">
                {/* Edges */}
                <line x1="220" y1="30" x2="100" y2="75" stroke="#991B1B" strokeWidth="2" />
                <line x1="220" y1="30" x2="330" y2="75" stroke="#15803D" strokeWidth="2" />
                {/* 0 / 1 labels */}
                <text x="150" y="48" fill="#991B1B" fontSize="11" fontWeight="bold" fontFamily="monospace">0</text>
                <text x="280" y="48" fill="#15803D" fontSize="11" fontWeight="bold" fontFamily="monospace">1</text>

                {/* Level 2 */}
                <line x1="330" y1="75" x2="270" y2="120" stroke="#991B1B" strokeWidth="2" />
                <line x1="330" y1="75" x2="380" y2="120" stroke="#15803D" strokeWidth="2" />
                <text x="290" y="93" fill="#991B1B" fontSize="10" fontWeight="bold" fontFamily="monospace">0</text>
                <text x="360" y="93" fill="#15803D" fontSize="10" fontWeight="bold" fontFamily="monospace">1</text>

                {/* Level 3: 25 -> C(12), B(13) */}
                <line x1="270" y1="120" x2="235" y2="165" stroke="#991B1B" strokeWidth="2" />
                <line x1="270" y1="120" x2="295" y2="165" stroke="#15803D" strokeWidth="2" />
                <text x="245" y="140" fill="#991B1B" fontSize="9" fontWeight="bold" fontFamily="monospace">0</text>
                <text x="288" y="140" fill="#15803D" fontSize="9" fontWeight="bold" fontFamily="monospace">1</text>

                {/* Level 3: 30 -> (14), D(16) */}
                <line x1="380" y1="120" x2="350" y2="165" stroke="#991B1B" strokeWidth="2" />
                <line x1="380" y1="120" x2="410" y2="165" stroke="#15803D" strokeWidth="2" />
                <text x="358" y="140" fill="#991B1B" fontSize="9" fontWeight="bold" fontFamily="monospace">0</text>
                <text x="400" y="140" fill="#15803D" fontSize="9" fontWeight="bold" fontFamily="monospace">1</text>

                {/* Level 4: 14 -> F(5), E(9) */}
                <line x1="350" y1="165" x2="330" y2="205" stroke="#991B1B" strokeWidth="2" />
                <line x1="350" y1="165" x2="370" y2="205" stroke="#15803D" strokeWidth="2" />
                <text x="333" y="183" fill="#991B1B" fontSize="8" fontWeight="bold" fontFamily="monospace">0</text>
                <text x="365" y="183" fill="#15803D" fontSize="8" fontWeight="bold" fontFamily="monospace">1</text>

                {/* Internal Nodes */}
                <circle cx="220" cy="30" r="16" fill="#1A1A1A" />
                <text x="220" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">100</text>

                <circle cx="330" cy="75" r="15" fill="#44403C" />
                <text x="330" y="79" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">55</text>

                <circle cx="270" cy="120" r="14" fill="#66625B" />
                <text x="270" y="124" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">25</text>

                <circle cx="380" cy="120" r="14" fill="#66625B" />
                <text x="380" y="124" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">30</text>

                <circle cx="350" cy="165" r="13" fill="#88847C" />
                <text x="350" y="169" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">14</text>

                {/* Leaf Nodes (Characters) */}
                {/* A (45) */}
                <rect x="75" y="60" width="50" height="30" rx="6" fill="#DCFCE7" stroke="#15803D" strokeWidth="2" />
                <text x="100" y="80" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="bold" fontFamily="sans-serif">A (45)</text>

                {/* C (12) */}
                <rect x="210" y="152" width="45" height="26" rx="5" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                <text x="232" y="169" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="bold" fontFamily="sans-serif">C (12)</text>

                {/* B (13) */}
                <rect x="275" y="152" width="45" height="26" rx="5" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                <text x="297" y="169" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="bold" fontFamily="sans-serif">B (13)</text>

                {/* D (16) */}
                <rect x="390" y="152" width="45" height="26" rx="5" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                <text x="412" y="169" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="bold" fontFamily="sans-serif">D (16)</text>

                {/* F (5) */}
                <rect x="310" y="195" width="40" height="24" rx="4" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                <text x="330" y="211" textAnchor="middle" fill="#15803D" fontSize="9" fontWeight="bold" fontFamily="sans-serif">F (5)</text>

                {/* E (9) */}
                <rect x="355" y="195" width="40" height="24" rx="4" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                <text x="375" y="211" textAnchor="middle" fill="#15803D" fontSize="9" fontWeight="bold" fontFamily="sans-serif">E (9)</text>
              </svg>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                {constructionSteps[step].forest.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-white border-2 border-[#1A1A1A] flex flex-col items-center gap-1 shadow-xs min-w-[70px]"
                  >
                    <span className="text-xs font-mono font-bold text-[#991B1B]">
                      {item.char?.length === 1 ? `Leaf '${item.char}'` : `Subtree`}
                    </span>
                    <span className="text-sm font-mono font-bold text-[#1A1A1A]">
                      Freq: {item.freq}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Prefix Code Table */}
      {activeTab === 'codes' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-1 text-xs text-[#44403C]">
            <strong className="text-[#1A1A1A] font-serif">Prefix Code Invariant:</strong>
            <p>No character's codeword is a prefix of any other codeword. This guarantees unambiguous, instantaneous decoding without requiring spaces or delimiter symbols!</p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#E5E2D9]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F4F2EB] text-[#2C2B29] border-b border-[#E5E2D9]">
                <tr>
                  <th className="p-3 font-serif font-bold">Character</th>
                  <th className="p-3 font-serif font-bold">Frequency</th>
                  <th className="p-3 font-serif font-bold">Huffman Binary Code</th>
                  <th className="p-3 font-serif font-bold">Code Length (Bits)</th>
                  <th className="p-3 font-serif font-bold">Total Weighted Bits ($f_i \cdot d_i$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2D9] bg-white">
                {assignedCodes.map((item) => (
                  <tr key={item.char} className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-bold text-[#1A1A1A] font-sans">'{item.char}'</td>
                    <td className="p-3">{item.freq}%</td>
                    <td className="p-3 font-bold text-[#991B1B] bg-[#FEF2F2]/40">{item.code}</td>
                    <td className="p-3">{item.depth} bits</td>
                    <td className="p-3 font-bold text-[#15803D]">{item.bits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WPL & Compression */}
      {activeTab === 'wpl' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#991B1B]" /> Weighted External Path Length (WPL)
              </h4>
              <div className="p-3 rounded bg-white border border-[#E5E2D9] space-y-2 text-xs font-mono">
                <div><Latex math="\text{WPL} = \sum_{i=1}^{N} (\text{weight}_i \cdot \text{depth}_i)" /></div>
                <div className="text-[#66625B] text-[11px] leading-relaxed">
                  = (45×1) + (12×3) + (13×3) + (5×4) + (9×4) + (16×3)<br />
                  = 45 + 36 + 39 + 20 + 36 + 48<br />
                  = <strong className="text-[#15803D] text-sm">224 Bits / 100 Characters</strong>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#15803D]" /> Compression Efficiency vs. Fixed Length
              </h4>
              <div className="p-3 rounded bg-white border border-[#E5E2D9] space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#E5E2D9] pb-1">
                  <span className="text-[#66625B]">Fixed 3-bit Code:</span>
                  <span className="font-mono font-bold">100 × 3 = 300 Bits</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E2D9] pb-1">
                  <span className="text-[#66625B]">Optimal Huffman Code:</span>
                  <span className="font-mono font-bold text-[#15803D]">224 Bits</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#66625B]">Storage Space Saved:</span>
                  <span className="font-mono font-bold text-[#991B1B]">+{compressionRatio}% Compression</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
