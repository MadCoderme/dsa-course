import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, ChevronLeft, ChevronRight, Shuffle, Filter, BookOpen, Layers, Flame, Award } from 'lucide-react';
import { Latex, MathText } from '../common/Latex';

interface Flashcard {
  id: string;
  category: 'Linear' | 'Trees' | 'Graphs' | 'Formulas' | 'Exam Rules';
  front: string;
  back: string;
  latex?: string;
  formulaNote?: string;
  keyRule?: string;
}

const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Linear',
    front: 'Why is vector push_back() amortized O(1) time complexity?',
    back: 'When capacity is exceeded, vector allocates 2x contiguous memory buffer, copies N elements (O(N)), but doubling occurs infrequently (at 1, 2, 4, 8, ...). Total cost for N inserts is N + N/2 + N/4 + ... < 2N operations, yielding 2N/N = O(1) amortized cost per insert.',
    latex: '\sum_{k=0}^{\log_2 N} 2^k = 2N - 1 \implies \mathcal{O}(1) \text{ amortized}'
  },
  {
    id: 'fc-2',
    category: 'Linear',
    front: 'How to distinguish Linear Queue False Overflow from Circular Queue?',
    back: 'In a Linear Queue, if rear reaches MAX-1 but front > 0 (elements dequeued), attempting enqueue causes False Overflow (memory wasted at front). A Circular Queue solves this via modular arithmetic: rear = (rear + 1) % MAX, and is full when (rear + 1) % MAX == front.',
    latex: '\text{Full Condition: } (\text{rear} + 1) \pmod{\text{MAX}} = \text{front}'
  },
  {
    id: 'fc-3',
    category: 'Trees',
    front: 'What is the AVL Tree Balance Factor invariant and height bound?',
    back: 'For every node in an AVL tree, Balance Factor BF(node) = height(left) - height(right) must satisfy BF in {-1, 0, +1}. If |BF| > 1, balance is restored using one of 4 single/double rotations (LL, RR, LR, RL) in O(1) time. Maximum height is bounded by ~1.44 log2(N).',
    latex: '\text{BF}(u) = h(\text{left}) - h(\text{right}) \in \{-1, 0, +1\}, \quad h_{\max} \approx 1.44 \log_2 N'
  },
  {
    id: 'fc-4',
    category: 'Trees',
    front: 'What are the 5 Canonical Red-Black Tree Invariants?',
    back: '1. Every node is either Red or Black.\n2. The root is always Black.\n3. All external leaves (NIL nodes) are Black.\n4. If a node is Red, both its children must be Black (no adjacent Red nodes).\n5. Every simple path from a node to any descendant leaf contains the same number of Black nodes (Black-Height).',
    keyRule: 'Strict Black-Height balance guarantees maximum height <= 2 * log2(N + 1).'
  },
  {
    id: 'fc-5',
    category: 'Trees',
    front: 'What is the split threshold and promotion rule for an Order-M B-Tree?',
    back: 'An internal node in an Order-M B-Tree can hold at most (M - 1) keys and M children. When a node receives M keys (overflow), it splits: the median key at index floor(M / 2) is promoted to the parent, while the left and right keys form two valid sibling nodes.',
    latex: '\text{Max Keys} = M - 1, \quad \text{Median Index} = \lfloor M/2 \rfloor'
  },
  {
    id: 'fc-6',
    category: 'Graphs',
    front: 'What does Entry A^k[i][j] in a Graph Adjacency Matrix represent?',
    back: 'If A is the 0/1 adjacency matrix of a graph, then the entry at (i, j) in the matrix power A^k represents the EXACT number of distinct walks of length k from vertex i to vertex j.',
    latex: 'A^k[i][j] = \text{Count of walks of length } k \text{ from } v_i \to v_j'
  },
  {
    id: 'fc-7',
    category: 'Graphs',
    front: 'What is Dijkstra Algorithm time complexity with Binary Min-Heap?',
    back: 'With an adjacency list and a Binary Min-Heap (priority queue), Dijkstra runs in O((V + E) log V). Each vertex is extracted once (V * log V) and each edge relaxation updates key in heap (E * log V). It requires non-negative edge weights.',
    latex: '\mathcal{O}((V + E) \log V) \quad (\text{Valid for } w(u, v) \ge 0)'
  },
  {
    id: 'fc-8',
    category: 'Formulas',
    front: 'Memory Address Formula for 2D Array in Column-Major Order?',
    back: 'In Column-Major Order (FORTRAN & CUET Standard), columns are laid out contiguously in RAM. To reach A[i, j], skip (j - L2) full columns of size D1 = (U1 - L1 + 1), then advance (i - L1) row elements.',
    latex: '\text{Loc}(A[i, j]) = \text{Base} + W \cdot \left[ (i - L_1) + (U_1 - L_1 + 1) \cdot (j - L_2) \right]'
  },
  {
    id: 'fc-9',
    category: 'Formulas',
    front: 'Memory Address Formula for 3D Array in Column-Major Order?',
    back: 'In 3D Column-Major Order with bounds [L1:U1, L2:U2, L3:U3], element offset maps along column dim 1, then matrix slice dim 2, then hyper-plane dim 3 with dimensions D1 = U1 - L1 + 1 and D2 = U2 - L2 + 1.',
    latex: '\text{Loc}(A[i, j, k]) = \text{Base} + W \cdot \left[ (i - L_1) + D_1 (j - L_2) + D_1 D_2 (k - L_3) \right]'
  },
  {
    id: 'fc-10',
    category: 'Exam Rules',
    front: 'Complete Binary Tree Array Index Mapping (1-based vs 0-based)?',
    back: 'In 1-based indexing:\n- Parent of node i: floor(i / 2)\n- Left Child of node i: 2 * i\n- Right Child of node i: 2 * i + 1\nIn 0-based indexing:\n- Parent: floor((i - 1) / 2), Left: 2*i + 1, Right: 2*i + 2.',
    latex: '\text{1-Based: } \text{Parent}(i) = \lfloor i/2 \rfloor, \quad \text{Left}(i) = 2i, \quad \text{Right}(i) = 2i + 1'
  },
  {
    id: 'fc-11',
    category: 'Exam Rules',
    front: 'Huffman Coding: Weighted Path Length (WPL) Definition?',
    back: 'The Weighted Path Length (WPL) of a Huffman tree equals the sum over all external character leaves of (frequency * path depth from root). WPL represents the total bits required to encode the entire source text.',
    latex: '\text{WPL} = \sum_{i=1}^n w_i \cdot d_i = \text{Total Encoded Bit Length}'
  }
];

export const FlashcardStudio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('dsa_mastered_flashcards');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const filteredCards = FLASHCARDS.filter(
    (c) => activeCategory === 'All' || c.category === activeCategory
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  useEffect(() => {
    setIsFlipped(false);
    if (currentIndex >= filteredCards.length) {
      setCurrentIndex(0);
    }
  }, [activeCategory, currentIndex, filteredCards.length]);

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('dsa_mastered_flashcards', JSON.stringify(updated));
      return updated;
    });
  };

  const resetAllMastery = () => {
    setMasteredIds({});
    localStorage.removeItem('dsa_mastered_flashcards');
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const masteredCount = Object.values(masteredIds).filter(Boolean).length;
  const progressPercent = Math.round((masteredCount / FLASHCARDS.length) * 100);

  return (
    <div className="space-y-6" id="flashcard-studio-root">
      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#991B1B] dark:text-[#EF4444]" /> High-Yield DSA Flashcard Studio
            </h2>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
              Spaced-repetition active recall for core invariants, formulas, asymptotic bounds, and exam proofs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                {masteredCount} / {FLASHCARDS.length} Mastered
              </div>
              <div className="text-[10px] text-[#66625B] dark:text-[#A8A29E] font-mono">
                {progressPercent}% Complete
              </div>
            </div>
            <div className="w-20 sm:w-28 h-2 rounded-full bg-[#E5E2D9] dark:bg-[#2A2622] overflow-hidden">
              <div
                className="h-full bg-[#15803D] dark:bg-[#4ADE80] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {(['All', 'Linear', 'Trees', 'Graphs', 'Formulas', 'Exam Rules'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] border-[#1A1A1A] dark:border-[#EDE8DF]'
                    : 'bg-[#FAF8F5] dark:bg-[#181614] text-[#66625B] dark:text-[#A8A29E] border-[#E5E2D9] dark:border-[#38332B] hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {masteredCount > 0 && (
            <button
              onClick={resetAllMastery}
              className="text-[11px] font-mono text-[#88847C] dark:text-[#78716C] hover:text-[#991B1B] dark:hover:text-[#EF4444] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Progress
            </button>
          )}
        </div>
      </div>

      {/* Main Flashcard View */}
      {currentCard && (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[280px] sm:min-h-[320px] p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between select-none ${
              isFlipped
                ? 'bg-[#FAF8F5] dark:bg-[#181614] border-[#991B1B]/40 dark:border-[#EF4444]/40 ring-1 ring-[#991B1B]/20 dark:ring-[#EF4444]/20'
                : 'bg-white dark:bg-[#201D1A] border-[#E5E2D9] dark:border-[#38332B] hover:border-[#D8D4C8] dark:hover:border-[#423D36]'
            }`}
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#F4F2EB] dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] border border-[#E5E2D9] dark:border-[#38332B]">
                {currentCard.category}
              </span>
              <span className="text-xs font-mono font-bold text-[#88847C] dark:text-[#78716C]">
                Card {currentIndex + 1} of {filteredCards.length}
              </span>
            </div>

            {/* Card Content (Front vs Back) */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <div className="text-xs font-mono font-semibold uppercase text-[#88847C] dark:text-[#78716C] tracking-wider">
                    Question / Invariant:
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] leading-snug">
                    <MathText text={currentCard.front} />
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-xs font-mono font-semibold uppercase text-[#15803D] dark:text-[#4ADE80] tracking-wider">
                    Detailed Solution & Insight:
                  </div>
                  <div className="text-xs sm:text-sm font-sans text-[#2C2B29] dark:text-[#D6D0C5] leading-relaxed whitespace-pre-line">
                    <MathText text={currentCard.back} />
                  </div>
                  {currentCard.latex && (
                    <div className="pt-2">
                      <Latex math={currentCard.latex} block />
                    </div>
                  )}
                  {currentCard.keyRule && (
                    <div className="p-2.5 rounded-lg bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#7F1D1D] text-xs font-serif font-bold text-[#991B1B] dark:text-[#FCA5A5]">
                      💡 Rule: {currentCard.keyRule}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom prompt */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E5E2D9] dark:border-[#38332B]/60 text-xs font-mono text-[#88847C] dark:text-[#78716C]">
              <span>{isFlipped ? 'Click card to see question' : 'Click card to reveal answer'}</span>
              <span className="font-sans font-bold text-[11px] text-[#991B1B] dark:text-[#EF4444]">Flip ⤾</span>
            </div>
          </div>

          {/* Navigation and Mastery Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-serif font-semibold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={handleNext}
                className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-serif font-semibold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1 cursor-pointer transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mark as Mastered button */}
            <button
              onClick={() => toggleMastered(currentCard.id)}
              className={`px-4 py-1.5 rounded-lg border text-xs font-serif font-bold flex items-center gap-2 transition-all cursor-pointer ${
                masteredIds[currentCard.id]
                  ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/40 text-[#065F46] dark:text-[#34D399] border-[#A7F3D0] dark:border-[#059669]'
                  : 'bg-white dark:bg-[#2A2622] text-[#66625B] dark:text-[#A8A29E] border-[#D8D4C8] dark:border-[#423D36] hover:border-[#15803D] dark:hover:border-[#4ADE80]'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${masteredIds[currentCard.id] ? 'text-[#15803D] dark:text-[#4ADE80]' : ''}`} />
              <span>{masteredIds[currentCard.id] ? 'Mastered!' : 'Mark as Mastered'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};