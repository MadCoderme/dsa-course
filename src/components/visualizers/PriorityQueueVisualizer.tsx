import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Shuffle, Play, Sparkles, RefreshCw, TrendingUp, Layers, ArrowRight, SkipForward } from 'lucide-react';
import { Latex, MathText } from '../common/Latex';

export const PriorityQueueVisualizer: React.FC = () => {
  const [heapType, setHeapType] = useState<'max' | 'min'>('max');
  const [heap, setHeap] = useState<number[]>([77, 60, 55, 50, 30, 44, 22]);
  const [inputVal, setInputVal] = useState<string>('65');
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([
    'Max-Heap initialized with array [77, 60, 55, 50, 30, 44, 22]'
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 15)]);
  };

  // Sift-Up for insertion
  const siftUp = (arr: number[], idx: number, isMax: boolean): number[] => {
    let current = idx;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      const shouldSwap = isMax
        ? arr[current] > arr[parent]
        : arr[current] < arr[parent];

      if (shouldSwap) {
        const temp = arr[current];
        arr[current] = arr[parent];
        arr[parent] = temp;
        current = parent;
      } else {
        break;
      }
    }
    return arr;
  };

  // Sift-Down (Heapify)
  const siftDown = (arr: number[], n: number, i: number, isMax: boolean) => {
    let target = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (isMax) {
      if (left < n && arr[left] > arr[target]) target = left;
      if (right < n && arr[right] > arr[target]) target = right;
    } else {
      if (left < n && arr[left] < arr[target]) target = left;
      if (right < n && arr[right] < arr[target]) target = right;
    }

    if (target !== i) {
      const temp = arr[i];
      arr[i] = arr[target];
      arr[target] = temp;
      siftDown(arr, n, target, isMax);
    }
  };

  const handlePush = () => {
    const val = parseInt(inputVal) || Math.floor(Math.random() * 90 + 10);
    const nextArr = [...heap, val];
    setActiveIndices([nextArr.length - 1]);
    const newHeap = siftUp(nextArr, nextArr.length - 1, heapType === 'max');
    setHeap(newHeap);
    addLog(`⬆️ push(${val}) -> Sift-up (Heapify-Up) restored ${heapType.toUpperCase()}-Heap invariant.`);
    setTimeout(() => setActiveIndices([]), 800);
  };

  const handlePop = () => {
    if (heap.length === 0) {
      addLog('❌ Heap is empty!');
      return;
    }
    const root = heap[0];
    const nextArr = [...heap];
    const last = nextArr.pop()!;
    if (nextArr.length > 0) {
      nextArr[0] = last;
      setActiveIndices([0]);
      siftDown(nextArr, nextArr.length, 0, heapType === 'max');
    }
    setHeap(nextArr);
    addLog(`⬇️ pop() extracted root ${root}. Sift-down (Heapify-Down) restored heap.`);
    setTimeout(() => setActiveIndices([]), 800);
  };

  const handleBuildHeap = () => {
    const randoms = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85 + 10));
    const isMax = heapType === 'max';
    const n = randoms.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      siftDown(randoms, n, i, isMax);
    }
    setHeap(randoms);
    setSortedArray([]);
    addLog(`⚡ Bottom-up Build-Heap completed in O(N) linear time for 8 random keys.`);
  };

  const handleHeapSortSimulation = async () => {
    setIsSorting(true);
    let currentHeap = [...heap];
    const n = currentHeap.length;
    const isMax = heapType === 'max';
    const sorted: number[] = [];

    // Ensure it is built as max-heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      siftDown(currentHeap, n, i, isMax);
    }

    addLog('🚀 Starting Step-by-Step Heapsort simulation...');

    for (let i = n - 1; i > 0; i--) {
      // Swap root with last
      const root = currentHeap[0];
      currentHeap[0] = currentHeap[i];
      currentHeap[i] = root;
      sorted.unshift(root);

      siftDown(currentHeap, i, 0, isMax);
      setHeap([...currentHeap.slice(0, i)]);
      setSortedArray([...sorted]);
      await new Promise((r) => setTimeout(r, 600));
    }

    if (currentHeap.length > 0) {
      sorted.unshift(currentHeap[0]);
    }
    setHeap([]);
    setSortedArray(sorted);
    setIsSorting(false);
    addLog(`🎉 Heapsort finished! Array sorted in O(N log N) time.`);
  };

  const handleReset = () => {
    setHeap([77, 60, 55, 50, 30, 44, 22]);
    setSortedArray([]);
    setIsSorting(false);
    setActiveIndices([]);
    setLogs(['Heap reset.']);
  };

  return (
    <div className="space-y-6" id="priority-queue-visualizer-container">
      {/* Top Bar Switcher */}
      <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white border border-[#E5E2D9] gap-2 shadow-xs">
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB]">
          <button
            id="heap-mode-max"
            onClick={() => {
              setHeapType('max');
              handleBuildHeap();
            }}
            className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              heapType === 'max'
                ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#991B1B]" /> Max-Heap (Default C++)
          </button>
          <button
            id="heap-mode-min"
            onClick={() => {
              setHeapType('min');
              handleBuildHeap();
            }}
            className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              heapType === 'min'
                ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 rotate-180 text-[#15803D]" /> Min-Heap (greater&lt;T&gt;)
          </button>
        </div>

        <button
          id="heap-reset-btn"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-md bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#66625B] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Control Actions */}
      <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] flex flex-wrap items-center gap-3 shadow-xs">
        <input
          id="heap-val-input"
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Value"
          className="w-20 px-2.5 py-1.5 rounded-md bg-[#FAF8F5] border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
        />
        <button
          id="heap-push-btn"
          onClick={handlePush}
          className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-amber-300" /> push(val)
        </button>
        <button
          id="heap-pop-btn"
          onClick={handlePop}
          disabled={heap.length === 0}
          className="px-3.5 py-1.5 rounded-md bg-white hover:bg-[#FEF2F2] border border-[#FECACA] disabled:opacity-40 text-[#991B1B] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" /> extract_root() / pop()
        </button>
        <button
          id="heap-random-btn"
          onClick={handleBuildHeap}
          className="px-3.5 py-1.5 rounded-md bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#1A1A1A] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5 text-[#B45309]" /> Build-Heap <MathText text="$\mathcal{O}(N)$" />
        </button>
        <button
          id="heap-sort-btn"
          onClick={handleHeapSortSimulation}
          disabled={isSorting || heap.length === 0}
          className="ml-auto px-4 py-1.5 rounded-md bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 text-white text-xs font-serif font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" /> Run Heapsort Trace
        </button>
      </div>

      {/* Formulas Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
          <div className="text-[11px] font-serif font-bold text-[#66625B]">Parent Pointer Formula</div>
          <div className="mt-1 text-xs">
            <Latex math="\text{Parent}(i) = \left\lfloor \frac{i - 1}{2} \right\rfloor" />
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
          <div className="text-[11px] font-serif font-bold text-[#66625B]">Left Child Formula</div>
          <div className="mt-1 text-xs">
            <Latex math="\text{LeftChild}(i) = 2i + 1" />
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
          <div className="text-[11px] font-serif font-bold text-[#66625B]">Right Child Formula</div>
          <div className="mt-1 text-xs">
            <Latex math="\text{RightChild}(i) = 2i + 2" />
          </div>
        </div>
      </div>

      {/* Heap Tree Visual Representation */}
      <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9]">
          <div>
            <span className="text-sm font-serif font-bold text-[#1A1A1A]">
              Binary Heap Tree Hierarchy ({heapType.toUpperCase()}-Heap)
            </span>
            <p className="text-xs text-[#66625B] font-sans">
              Complete binary tree mapped into sequential array memory with zero pointer overhead.
            </p>
          </div>
          <span className="text-xs font-mono text-[#991B1B] bg-[#FEF2F2] px-2.5 py-1 rounded border border-[#FECACA] font-bold">
            size() = {heap.length}
          </span>
        </div>

        {/* Tree Hierarchical Levels */}
        <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] flex flex-col items-center gap-4 min-h-[180px] justify-center">
          {heap.length === 0 ? (
            <div className="text-xs text-[#88847C] italic">Heap is currently empty (all items sorted!)</div>
          ) : (
            <div className="space-y-4 w-full flex flex-col items-center">
              {/* Level 0: Root */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    layout
                    className={`w-12 h-12 rounded-full font-bold font-mono text-sm flex items-center justify-center shadow-xs border-2 ${
                      activeIndices.includes(0)
                        ? 'bg-[#991B1B] text-white ring-4 ring-[#FECACA]'
                        : 'bg-[#1A1A1A] text-white border-[#D8D4C8]'
                    }`}
                  >
                    {heap[0]}
                  </motion.div>
                  <span className="text-[10px] font-mono text-[#991B1B] font-bold mt-1">Root [0]</span>
                </div>
              </div>

              {/* Level 1 */}
              {heap.length > 1 && (
                <div className="flex justify-center gap-16">
                  {heap.slice(1, 3).map((val, idx) => {
                    const realIdx = idx + 1;
                    const isActive = activeIndices.includes(realIdx);

                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <motion.div
                          layout
                          className={`w-10 h-10 rounded-full font-bold font-mono text-xs flex items-center justify-center shadow-xs border ${
                            isActive
                              ? 'bg-[#FEF2F2] border-[#991B1B] text-[#991B1B] ring-2 ring-[#FECACA]'
                              : 'bg-white border-[#D8D4C8] text-[#1A1A1A]'
                          }`}
                        >
                          {val}
                        </motion.div>
                        <span className="text-[9px] font-mono text-[#66625B] mt-0.5">[{realIdx}]</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Level 2 */}
              {heap.length > 3 && (
                <div className="flex justify-center gap-6">
                  {heap.slice(3, 7).map((val, idx) => {
                    const realIdx = idx + 3;
                    const isActive = activeIndices.includes(realIdx);

                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <motion.div
                          layout
                          className={`w-9 h-9 rounded-full font-bold font-mono text-xs flex items-center justify-center border ${
                            isActive
                              ? 'bg-[#FEF2F2] border-[#991B1B] text-[#991B1B] ring-2 ring-[#FECACA]'
                              : 'bg-[#F4F2EB] border-[#D8D4C8] text-[#1A1A1A]'
                          }`}
                        >
                          {val}
                        </motion.div>
                        <span className="text-[9px] font-mono text-[#88847C] mt-0.5">[{realIdx}]</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Flat Array Representation */}
        <div>
          <div className="text-xs font-serif font-bold text-[#66625B] mb-2">
            Contiguous Array Representation in Memory:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {heap.map((val, idx) => (
              <motion.div
                key={idx}
                layout
                className="w-14 h-16 rounded-lg bg-[#FAF8F5] border border-[#D8D4C8] flex flex-col items-center justify-between p-1.5 font-mono shadow-2xs"
              >
                <span className="text-[10px] text-[#88847C]">[{idx}]</span>
                <span className="text-sm font-bold text-[#1A1A1A]">{val}</span>
                <span className="text-[8px] text-[#991B1B] font-bold">
                  {idx === 0 ? 'ROOT' : `P:${Math.floor((idx - 1) / 2)}`}
                </span>
              </motion.div>
            ))}

            {sortedArray.length > 0 && (
              <>
                <div className="h-12 w-px bg-[#10B981] mx-1" />
                {sortedArray.map((val, idx) => (
                  <div
                    key={`s-${idx}`}
                    className="w-14 h-16 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex flex-col items-center justify-between p-1.5 font-mono shadow-2xs"
                  >
                    <span className="text-[10px] text-[#15803D] font-bold">Sorted</span>
                    <span className="text-sm font-bold text-[#065F46]">{val}</span>
                    <span className="text-[8px] text-[#059669]">Extracted</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Log */}
      <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
        <div className="text-xs font-serif font-bold text-[#66625B] mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#991B1B]" /> Priority Queue Activity Log
        </div>
        <div className="space-y-1 font-mono text-xs max-h-28 overflow-y-auto pr-2">
          {logs.map((log, i) => (
            <div key={i} className="text-[#44403C] py-0.5 border-b border-[#F4F2EB]">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
