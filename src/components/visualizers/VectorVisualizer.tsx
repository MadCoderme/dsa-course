import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Minus,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import { Latex, MathText } from '../common/Latex';

interface VectorVisualizerProps {
  focusedMode?: 'standard' | 'reallocLab' | 'shiftLab';
  compact?: boolean;
}

export const VectorVisualizer: React.FC<VectorVisualizerProps> = ({ focusedMode, compact = false }) => {
  const [activeSubTab, setActiveSubTab] = useState<'standard' | 'reallocLab' | 'shiftLab'>(
    focusedMode || 'standard'
  );

  useEffect(() => {
    if (focusedMode) {
      setActiveSubTab(focusedMode);
    }
  }, [focusedMode]);

  // Vector General State
  const [elements, setElements] = useState<number[]>([10, 20, 30, 40]);
  const [capacity, setCapacity] = useState<number>(4);
  const [inputVal, setInputVal] = useState<string>('50');
  const [insertIdx, setInsertIdx] = useState<number>(2);
  const [baseAddress] = useState<number>(1000);
  const [wordSize] = useState<number>(4);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isReallocatingNow, setIsReallocatingNow] = useState<boolean>(false);
  const [shiftingIndex, setShiftingIndex] = useState<number | null>(null);

  const [logs, setLogs] = useState<string[]>([
    'Vector initialized with size = 4, capacity = 4 (Memory Buffer: 0x1000..0x100C).'
  ]);

  // Reallocation Lab Interactive Step-by-Step State
  const [reallocStep, setReallocStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [copiedUpTo, setCopiedUpTo] = useState<number>(-1);
  const oldBuffer = [10, 20, 30, 40];
  const oldCap = 4;
  const newCap = 8;
  const oldBase = 0x1000;
  const newBase = 0x2A40;
  const incomingVal = 50;

  // Shifting Lab State (for arbitrary insert/erase)
  const [shiftStep, setShiftStep] = useState<number>(0);
  const [shiftElements, setShiftElements] = useState<number[]>([10, 20, 30, 40]);
  const [shiftAction, setShiftAction] = useState<'insert' | 'erase'>('insert');
  const [shiftTargetIdx, setShiftTargetIdx] = useState<number>(1);
  const [shiftInsertVal, setShiftInsertVal] = useState<number>(99);
  const [shiftActiveIdx, setShiftActiveIdx] = useState<number | null>(null);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 15)]);
  };

  // Standard Operations
  const handlePushBack = () => {
    const val = parseInt(inputVal) || Math.floor(Math.random() * 90 + 10);
    if (elements.length >= capacity) {
      const newCap = capacity === 0 ? 1 : capacity * 2;
      setIsReallocatingNow(true);
      addLog(`⚠️ Capacity reached (${capacity})! Allocating 2x block (${newCap}) & migrating ${elements.length} elements...`);
      setTimeout(() => {
        setCapacity(newCap);
        setElements((prev) => [...prev, val]);
        setIsReallocatingNow(false);
        addLog(`✅ push_back(${val}) complete. Elements migrated to contiguous block. New size: ${elements.length + 1}, capacity: ${newCap}.`);
      }, 700);
    } else {
      setElements((prev) => [...prev, val]);
      addLog(`✅ push_back(${val}). Size: ${elements.length + 1}, Capacity: ${capacity}.`);
    }
  };

  const handlePopBack = () => {
    if (elements.length === 0) {
      addLog('❌ Cannot pop_back(): Vector is empty!');
      return;
    }
    const popped = elements[elements.length - 1];
    setElements((prev) => prev.slice(0, prev.length - 1));
    addLog(`🗑️ pop_back() removed ${popped}. Size: ${elements.length - 1}, Capacity: ${capacity}.`);
    if (selectedIdx === elements.length - 1) setSelectedIdx(null);
  };

  const handleInsertAt = () => {
    const val = parseInt(inputVal) || Math.floor(Math.random() * 90 + 10);
    const idx = Math.max(0, Math.min(insertIdx, elements.length));
    setShiftingIndex(idx);

    if (elements.length >= capacity) {
      const newCap = capacity === 0 ? 1 : capacity * 2;
      setCapacity(newCap);
      addLog(`⚠️ Capacity doubled to ${newCap} during insert()`);
    }

    setTimeout(() => {
      const nextElements = [...elements];
      nextElements.splice(idx, 0, val);
      setElements(nextElements);
      setShiftingIndex(null);
      addLog(`📌 insert(index=${idx}, value=${val}). Right-shifted ${elements.length - idx} elements in O(N - i) time.`);
    }, 400);
  };

  const handleDeleteAt = (idx: number) => {
    const deleted = elements[idx];
    setShiftingIndex(idx);
    setTimeout(() => {
      const nextElements = elements.filter((_, i) => i !== idx);
      setElements(nextElements);
      setShiftingIndex(null);
      addLog(`❌ erase(index=${idx}, value=${deleted}). Left-shifted elements in O(N - i) time.`);
      setSelectedIdx(null);
    }, 300);
  };

  const handleReset = () => {
    setElements([12, 24, 36, 48]);
    setCapacity(4);
    setSelectedIdx(null);
    setLogs(['Vector reset to default state.']);
  };

  // Reallocation Lab Step Logic
  // Steps:
  // 0: Buffer full [10, 20, 30, 40] in old memory 0x1000
  // 1: Allocate new 2x buffer (size 8) at 0x2A40
  // 2: Copy element 0 (10)
  // 3: Copy element 1 (20)
  // 4: Copy element 2 (30)
  // 5: Copy element 3 (40)
  // 6: Insert new element (50) at slot [4]
  // 7: Free old buffer (0x1000)
  // 8: Complete - Vector updated!

  const nextReallocStep = () => {
    setReallocStep((curr) => {
      const nxt = Math.min(curr + 1, 8);
      if (nxt >= 2 && nxt <= 5) {
        setCopiedUpTo(nxt - 2);
      } else if (nxt > 5) {
        setCopiedUpTo(3);
      } else {
        setCopiedUpTo(-1);
      }
      return nxt;
    });
  };

  const resetReallocLab = () => {
    setReallocStep(0);
    setCopiedUpTo(-1);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      if (reallocStep < 8) {
        timer = setTimeout(() => {
          nextReallocStep();
        }, 1100);
      } else {
        setIsAutoPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, reallocStep]);

  // Shifting Lab Step Runner
  const runShiftSimulation = (type: 'insert' | 'erase', targetIndex: number, val: number = 99) => {
    setShiftAction(type);
    setShiftTargetIdx(targetIndex);
    setShiftInsertVal(val);
    setShiftStep(1);
    setShiftElements([10, 20, 30, 40]);
    setShiftActiveIdx(null);
  };

  const nextShiftStep = () => {
    if (shiftAction === 'insert') {
      // Shifting right
      if (shiftStep === 1) {
        // Shift element 3 -> 4
        setShiftActiveIdx(3);
        setShiftStep(2);
      } else if (shiftStep === 2) {
        // Shift element 2 -> 3
        setShiftActiveIdx(2);
        setShiftStep(3);
      } else if (shiftStep === 3) {
        // Shift element 1 -> 2 (if target is 1)
        setShiftActiveIdx(1);
        setShiftStep(4);
      } else if (shiftStep === 4) {
        // Insert new val at target
        const arr = [...shiftElements];
        arr.splice(shiftTargetIdx, 0, shiftInsertVal);
        setShiftElements(arr);
        setShiftActiveIdx(shiftTargetIdx);
        setShiftStep(5);
      }
    } else {
      // Erase shifting left
      if (shiftStep === 1) {
        setShiftActiveIdx(shiftTargetIdx);
        setShiftStep(2);
      } else if (shiftStep === 2) {
        const arr = shiftElements.filter((_, i) => i !== shiftTargetIdx);
        setShiftElements(arr);
        setShiftActiveIdx(shiftTargetIdx);
        setShiftStep(3);
      }
    }
  };

  return (
    <div className="space-y-4" id="vector-visualizer-container">
      {/* Sub-view switcher */}
      {!focusedMode && (
        <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white border border-[#E5E2D9] gap-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB]">
            <button
              id="vec-sub-std"
              onClick={() => setActiveSubTab('standard')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSubTab === 'standard'
                  ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                  : 'text-[#66625B] hover:text-[#1A1A1A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#991B1B]" /> Vector Interactive Dashboard
            </button>
            <button
              id="vec-sub-realloc"
              onClick={() => {
                setActiveSubTab('reallocLab');
                resetReallocLab();
              }}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSubTab === 'reallocLab'
                  ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                  : 'text-[#66625B] hover:text-[#1A1A1A]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#B45309]" /> 2x Memory Expansion Simulator (Step Animation)
            </button>
            <button
              id="vec-sub-shift"
              onClick={() => {
                setActiveSubTab('shiftLab');
                runShiftSimulation('insert', 1, 99);
              }}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSubTab === 'shiftLab'
                  ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                  : 'text-[#66625B] hover:text-[#1A1A1A]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#15803D]" /> Element Shifting Walkthrough (Insert / Erase)
            </button>
          </div>

          <button
            id="vector-reset-btn"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-md bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      )}

      {/* VIEW 1: Standard Interactive Vector */}
      {activeSubTab === 'standard' && (
        <>
          {/* Top Controls Bar */}
          <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-serif font-bold text-[#44403C]">Value:</label>
                <input
                  id="vector-value-input"
                  type="number"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-20 px-2.5 py-1.5 rounded-md bg-[#FAF8F5] border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono focus:outline-none focus:border-[#991B1B]"
                />
              </div>

              <button
                id="vector-push-btn"
                onClick={handlePushBack}
                className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" /> push_back()
              </button>

              <button
                id="vector-pop-btn"
                onClick={handlePopBack}
                disabled={elements.length === 0}
                className="px-3.5 py-1.5 rounded-md bg-white hover:bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] disabled:opacity-40 text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" /> pop_back()
              </button>

              <div className="h-5 w-px bg-[#E5E2D9] hidden sm:block" />

              <div className="flex items-center gap-2">
                <label className="text-xs font-serif font-bold text-[#44403C]">At Index:</label>
                <input
                  id="vector-insert-idx"
                  type="number"
                  min={0}
                  max={elements.length}
                  value={insertIdx}
                  onChange={(e) => setInsertIdx(parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1.5 rounded-md bg-[#FAF8F5] border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
                />
                <button
                  id="vector-insert-btn"
                  onClick={handleInsertAt}
                  className="px-3 py-1.5 rounded-md bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#1A1A1A] text-xs font-serif font-semibold transition-colors cursor-pointer"
                >
                  insert()
                </button>
              </div>
            </div>
          </div>

          {/* Metrics & Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
              <div className="text-xs font-serif font-bold text-[#66625B]">Active Size ($N$)</div>
              <div className="text-2xl font-bold text-[#1A1A1A] mt-1 font-mono">{elements.length}</div>
              <div className="text-[11px] text-[#88847C] mt-0.5 font-mono">vec.size()</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
              <div className="text-xs font-serif font-bold text-[#66625B]">Allocated Capacity</div>
              <div className="text-2xl font-bold text-[#15803D] mt-1 font-mono">{capacity}</div>
              <div className="text-[11px] text-[#88847C] mt-0.5 font-mono">vec.capacity()</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
              <div className="text-xs font-serif font-bold text-[#66625B]">Load Factor ($\alpha$)</div>
              <div className="text-2xl font-bold text-[#B45309] mt-1 font-mono">
                {capacity > 0 ? ((elements.length / capacity) * 100).toFixed(0) : 0}%
              </div>
              <div className="text-[11px] text-[#88847C] mt-0.5 font-mono">Size / Capacity</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
              <div className="text-xs font-serif font-bold text-[#66625B]">Amortized Complexity</div>
              <div className="text-2xl font-bold text-[#991B1B] mt-1">
                <Latex math="\mathcal{O}(1)" />
              </div>
              <div className="text-[11px] text-[#88847C] mt-0.5 font-sans">Geometric $2\times$ Growth</div>
            </div>
          </div>

          {/* Visual Memory Buffer */}
          <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E2D9]">
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif font-bold text-[#1A1A1A]">Physical Contiguous RAM Buffer</span>
                {isReallocatingNow && (
                  <span className="px-2.5 py-0.5 text-xs font-mono bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] rounded-full animate-pulse flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#B45309]" /> Reallocating 2x Heap Buffer...
                  </span>
                )}
              </div>
              <span className="text-xs text-[#66625B] font-mono">
                Base Address: 0x{baseAddress.toString(16).toUpperCase()} | Word Size: {wordSize} Bytes
              </span>
            </div>

            {/* Array Cells Grid */}
            <div className="overflow-x-auto pb-4">
              <div className="flex items-center gap-2 min-w-max p-2">
                {Array.from({ length: capacity }).map((_, idx) => {
                  const isFilled = idx < elements.length;
                  const val = isFilled ? elements[idx] : null;
                  const isSelected = selectedIdx === idx;
                  const isShifting = shiftingIndex !== null && idx >= shiftingIndex;
                  const cellAddress = baseAddress + idx * wordSize;

                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={() => isFilled && setSelectedIdx(isSelected ? null : idx)}
                      className={`relative flex flex-col items-center justify-between w-20 h-28 rounded-lg border p-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#FEF2F2] border-[#991B1B] ring-2 ring-[#FECACA] shadow-sm'
                          : isShifting
                          ? 'bg-[#FEF3C7] border-[#F59E0B] ring-1 ring-[#FDE68A] animate-bounce'
                          : isFilled
                          ? 'bg-[#FAF8F5] border-[#D8D4C8] hover:border-[#991B1B]'
                          : 'bg-[#F4F2EB]/50 border-dashed border-[#D8D4C8] opacity-60'
                      }`}
                    >
                      {/* Index badge */}
                      <span className="text-[11px] font-mono font-bold text-[#66625B]">
                        [{idx}]
                      </span>

                      {/* Value */}
                      <div className="my-auto">
                        {isFilled ? (
                          <motion.span
                            key={`val-${val}`}
                            initial={{ scale: 1.2, color: '#991B1B' }}
                            animate={{ scale: 1, color: '#1A1A1A' }}
                            className="text-lg font-bold font-mono text-[#1A1A1A]"
                          >
                            {val}
                          </motion.span>
                        ) : (
                          <span className="text-xs font-mono text-[#A8A29E] italic">empty</span>
                        )}
                      </div>

                      {/* Address */}
                      <div className="text-[10px] font-mono text-[#88847C] border-t border-[#E5E2D9] w-full text-center pt-1">
                        0x{cellAddress.toString(16).toUpperCase()}
                      </div>

                      {/* Remove button hover for filled items */}
                      {isFilled && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAt(idx);
                          }}
                          title="Delete this element"
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#991B1B] text-white flex items-center justify-center text-xs opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Selected Index Address Math Breakdown with LaTeX */}
            {selectedIdx !== null && selectedIdx < elements.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]"
              >
                <div className="flex items-center gap-2 text-[#991B1B] text-xs font-serif font-bold uppercase tracking-wider">
                  <Cpu className="w-4 h-4" /> 1D Array Physical Memory Address Derivation
                </div>
                <div className="mt-2 text-xs">
                  <Latex
                    math={`\\text{Loc}(A[${selectedIdx}]) = \\text{Base} + W \\cdot (i - \\text{LB}) = ${baseAddress} + ${wordSize} \\cdot (${selectedIdx} - 0) = ${
                      baseAddress + selectedIdx * wordSize
                    } \\quad (\\text{Hex: } 0x${(baseAddress + selectedIdx * wordSize).toString(16).toUpperCase()})`}
                    block
                  />
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}

      {/* VIEW 2: Interactive 2x Dynamic Memory Expansion Simulator */}
      {activeSubTab === 'reallocLab' && (
        <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs" id="realloc-simulator">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E2D9]">
            <div>
              <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#991B1B]" /> Vector Dynamic Memory Reallocation Laboratory
              </h3>
              <p className="text-xs text-[#66625B] mt-0.5 font-sans">
                Watch how <code className="text-[#991B1B] font-mono font-bold">std::vector</code> handles capacity overflow by doubling its buffer, copying elements, and freeing obsolete RAM.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={resetReallocLab}
                className="px-3 py-1.5 rounded-md bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#66625B] text-xs font-serif font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart
              </button>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-amber-300" />}
                {isAutoPlaying ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={nextReallocStep}
                disabled={reallocStep >= 8 || isAutoPlaying}
                className="px-3.5 py-1.5 rounded-md bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-40 text-white text-xs font-serif font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                Next Step ({reallocStep}/8) <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Current Step Description Card */}
          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <div className="text-xs font-serif font-bold text-[#991B1B] uppercase tracking-wider mb-1">
              Step {reallocStep} of 8:
            </div>
            <div className="text-sm font-serif text-[#1A1A1A] leading-relaxed">
              {reallocStep === 0 && (
                <span>
                  <strong>Initial State:</strong> Vector is full (<Latex math="\text{size} = 4, \text{capacity} = 4" />) located at contiguous address <code className="font-mono text-[#991B1B]">0x1000</code>. User triggers <code className="font-mono text-[#15803D]">push_back({incomingVal})</code>.
                </span>
              )}
              {reallocStep === 1 && (
                <span>
                  <strong>Heap Allocation Request:</strong> Capacity doubling strategy (<Latex math="C_{\text{new}} = 2 \times 4 = 8" />) asks OS for a fresh contiguous memory block of <Latex math="8 \\times 4\\text{B} = 32\\text{ Bytes}" /> at address <code className="font-mono text-[#15803D]">0x2A40</code>.
                </span>
              )}
              {reallocStep >= 2 && reallocStep <= 5 && (
                <span>
                  <strong>Element Migration ({reallocStep - 1}/4):</strong> Copying element <code className="font-mono text-[#991B1B] font-bold">{oldBuffer[reallocStep - 2]}</code> from Old Slot <code className="font-mono">[{reallocStep - 2}]</code> to New Slot <code className="font-mono">[{reallocStep - 2}]</code> in the new heap block.
                </span>
              )}
              {reallocStep === 6 && (
                <span>
                  <strong>Append Incoming Element:</strong> Placing new value <code className="font-mono text-[#15803D] font-bold">{incomingVal}</code> into New Slot <code className="font-mono">[4]</code>.
                </span>
              )}
              {reallocStep === 7 && (
                <span>
                  <strong>Deallocate Old Buffer:</strong> Calling <code className="font-mono text-[#991B1B]">free(0x1000) / delete[]</code> to return the old 4-element block back to the OS, preventing memory leaks!
                </span>
              )}
              {reallocStep === 8 && (
                <span>
                  <strong>Completed!</strong> Vector internal pointer updated: <code className="font-mono">data_ptr = 0x2A40</code>, <Latex math="\text{size} = 5, \text{capacity} = 8" />. Amortized cost: <Latex math="\mathcal{O}(1)" />!
                </span>
              )}
            </div>
          </div>

          {/* Animated Memory Buffers (Old vs New) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Old Memory Buffer */}
            <div
              className={`p-5 rounded-xl border transition-all duration-300 ${
                reallocStep >= 7
                  ? 'bg-[#F4F2EB]/50 border-dashed border-[#D8D4C8] opacity-40'
                  : 'bg-white border-[#E5E2D9] shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9] mb-3">
                <span className="text-xs font-serif font-bold text-[#66625B]">
                  Old Heap Buffer (<code className="font-mono text-[#991B1B]">0x{oldBase.toString(16).toUpperCase()}</code>)
                </span>
                {reallocStep >= 7 ? (
                  <span className="text-[10px] font-mono text-[#991B1B] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA] font-bold">
                    FREED (DEALLOCATED)
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#66625B]">Capacity: {oldCap}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {oldBuffer.map((val, idx) => {
                  const isBeingCopied = reallocStep === idx + 2;
                  const isAlreadyCopied = copiedUpTo >= idx;

                  return (
                    <motion.div
                      key={`old-${idx}`}
                      animate={{
                        scale: isBeingCopied ? 1.08 : 1,
                        borderColor: isBeingCopied ? '#991B1B' : '#D8D4C8',
                      }}
                      className={`relative flex flex-col items-center justify-between w-16 h-24 rounded-lg border p-1.5 font-mono ${
                        isBeingCopied
                          ? 'bg-[#FEF2F2] border-[#991B1B] ring-2 ring-[#FECACA]'
                          : isAlreadyCopied
                          ? 'bg-[#FAF8F5] border-[#D8D4C8] text-[#88847C]'
                          : 'bg-white border-[#D8D4C8]'
                      }`}
                    >
                      <span className="text-[10px] text-[#66625B]">[{idx}]</span>
                      <span className="text-base font-bold text-[#1A1A1A]">{val}</span>
                      <span className="text-[9px] text-[#88847C]">0x{(oldBase + idx * 4).toString(16).toUpperCase()}</span>
                      {isBeingCopied && (
                        <span className="absolute -bottom-5 text-[9px] font-serif font-bold text-[#991B1B]">
                          Copying...
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* New Memory Buffer */}
            <div
              className={`p-5 rounded-xl border transition-all duration-300 ${
                reallocStep >= 1
                  ? 'bg-white border-[#15803D] ring-1 ring-[#A7F3D0] shadow-xs'
                  : 'bg-[#F4F2EB]/30 border-dashed border-[#D8D4C8] opacity-30'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9] mb-3">
                <span className="text-xs font-serif font-bold text-[#15803D]">
                  New 2x Heap Buffer (<code className="font-mono">0x{newBase.toString(16).toUpperCase()}</code>)
                </span>
                <span className="text-[10px] font-mono text-[#15803D] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] font-bold">
                  Capacity: {newCap}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 overflow-x-auto">
                {Array.from({ length: newCap }).map((_, idx) => {
                  const hasElement = idx <= copiedUpTo || (idx === 4 && reallocStep >= 6);
                  const displayVal = idx < 4 ? oldBuffer[idx] : idx === 4 && reallocStep >= 6 ? incomingVal : null;
                  const isJustInserted = (idx === 4 && reallocStep === 6) || (idx === reallocStep - 2 && reallocStep <= 5);

                  return (
                    <motion.div
                      key={`new-${idx}`}
                      animate={{
                        scale: isJustInserted ? [1, 1.15, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative flex flex-col items-center justify-between h-24 rounded-lg border p-1 font-mono ${
                        isJustInserted
                          ? 'bg-[#ECFDF5] border-[#10B981] ring-2 ring-[#A7F3D0]'
                          : hasElement
                          ? 'bg-[#FAF8F5] border-[#D8D4C8]'
                          : 'bg-[#FAF8F5]/40 border-dashed border-[#D8D4C8]'
                      }`}
                    >
                      <span className="text-[9px] text-[#66625B]">[{idx}]</span>
                      <span className="text-sm font-bold text-[#1A1A1A]">
                        {displayVal !== null ? displayVal : <span className="text-[9px] text-[#A8A29E] italic">free</span>}
                      </span>
                      <span className="text-[8px] text-[#88847C]">0x{(newBase + idx * 4).toString(16).toUpperCase()}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mathematical Amortized Analysis Breakdown with LaTeX */}
          <div className="p-5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#991B1B]" /> Mathematical Proof of Amortized O(1) Vector Insertion
            </div>
            <p className="text-xs text-[#44403C] font-sans leading-relaxed">
              When inserting $N$ items into an initially empty vector with geometric doubling factor ($2\times$):
            </p>
            <Latex
              math="\text{Total Work for } N \text{ insertions} = \sum_{i=1}^N 1 + \sum_{j=0}^{\lfloor \log_2 N \rfloor} 2^j = N + (2N - 1) = 3N - 1 \le 3N"
              block
            />
            <Latex
              math="\text{Amortized Cost per Insertion} = \frac{\text{Total Cost}}{N} = \frac{3N - 1}{N} < 3 = \mathcal{O}(1) \text{ amortized}"
              block
            />
            <p className="text-xs text-[#66625B] font-sans">
              <strong>CUET Exam Takeaway:</strong> Although occasional reallocations take <MathText text="$\\mathcal{O}(N)$" /> copying time, they occur so infrequently that the average cost per operation remains strictly <MathText text="$\\mathcal{O}(1)$" />.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 3: Element Shifting Walkthrough (Insert / Erase) */}
      {activeSubTab === 'shiftLab' && (
        <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs" id="shifting-simulator">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E2D9]">
            <div>
              <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#15803D]" /> Element Shifting Mechanics in Linear Arrays
              </h3>
              <div className="text-xs text-[#66625B] mt-0.5 font-sans">
                <MathText text="Inserting or deleting an element at index $i$ requires shifting $N - i$ subsequent elements, taking $\mathcal{O}(N)$ worst-case time." />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => runShiftSimulation('insert', 1, 99)}
                className={`px-3 py-1.5 rounded-md text-xs font-serif font-semibold cursor-pointer ${
                  shiftAction === 'insert' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FAF8F5] border border-[#D8D4C8] text-[#1A1A1A]'
                }`}
              >
                Insert at Index 1
              </button>
              <button
                onClick={() => runShiftSimulation('erase', 1)}
                className={`px-3 py-1.5 rounded-md text-xs font-serif font-semibold cursor-pointer ${
                  shiftAction === 'erase' ? 'bg-[#991B1B] text-white' : 'bg-[#FAF8F5] border border-[#D8D4C8] text-[#991B1B]'
                }`}
              >
                Erase at Index 1
              </button>
              <button
                onClick={nextShiftStep}
                className="px-3.5 py-1.5 rounded-md bg-[#15803D] hover:bg-[#166534] text-white text-xs font-serif font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                Step Through <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Shifting Visual Canvas */}
          <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] space-y-4">
            <div className="text-xs font-serif font-bold text-[#66625B] flex items-center justify-between">
              <span>Array State at Step {shiftStep}:</span>
              <span className="font-mono text-[#991B1B]">
                {shiftAction === 'insert' ? 'Right Shift: A[j+1] = A[j]' : 'Left Shift: A[j] = A[j+1]'}
              </span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto p-2 min-h-[120px]">
              {shiftElements.map((val, idx) => {
                const isActive = shiftActiveIdx === idx;

                return (
                  <motion.div
                    key={`shift-${idx}-${val}`}
                    layout
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -6 : 0,
                    }}
                    className={`relative flex flex-col items-center justify-between w-18 h-26 rounded-lg border p-2 font-mono ${
                      isActive
                        ? 'bg-[#FEF3C7] border-[#F59E0B] ring-2 ring-[#FDE68A] shadow-md'
                        : 'bg-white border-[#D8D4C8] shadow-xs'
                    }`}
                  >
                    <span className="text-[10px] text-[#66625B]">[{idx}]</span>
                    <span className="text-lg font-bold text-[#1A1A1A]">{val}</span>
                    <span className="text-[9px] text-[#88847C]">0x{(1000 + idx * 4).toString(16).toUpperCase()}</span>
                    {isActive && (
                      <span className="absolute -top-4 text-[9px] font-bold text-[#B45309] font-sans">
                        Moving
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Time Complexity Formula Banner */}
          <div className="p-4 rounded-lg bg-white border border-[#E5E2D9]">
            <Latex
              math={`\\text{Time Complexity to ${shiftAction === 'insert' ? 'Insert' : 'Erase'} at index } i = \\mathcal{O}(N - i) = \\begin{cases} \\mathcal{O}(1) & \\text{if } i = N \\text{ (push/pop back)} \\\\ \\mathcal{O}(N) & \\text{if } i = 0 \\text{ (head insertion/deletion)} \\end{cases}`}
              block
            />
          </div>
        </div>
      )}

      {/* Operation Activity Log */}
      <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
        <div className="text-xs font-serif font-bold text-[#66625B] mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#991B1B]" /> Vector Activity Log
        </div>
        <div className="space-y-1 font-mono text-xs max-h-32 overflow-y-auto pr-2">
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
