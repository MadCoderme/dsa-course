import React, { useState, useEffect } from 'react';
import { Layers, Play, Pause, RotateCcw, FastForward, ArrowRight, Table, Check, AlertCircle } from 'lucide-react';

interface ArrayOperationsVisualizerProps {
  focusedMode?: '1d-ops' | '2d-addressing';
}

export const ArrayOperationsVisualizer: React.FC<ArrayOperationsVisualizerProps> = ({
  focusedMode = '1d-ops'
}) => {
  const [activeTab, setActiveTab] = useState<'1d-ops' | '2d-addressing'>(focusedMode);

  // --- 1D Array State ---
  const [array, setArray] = useState<number[]>([15, 28, 42, 63, 89]);
  const [maxCapacity] = useState<number>(8);
  const [insertIndex, setInsertIndex] = useState<number>(2);
  const [insertValue, setInsertValue] = useState<number>(99);
  const [deleteIndex, setDeleteIndex] = useState<number>(1);
  const [activeAction, setActiveAction] = useState<string>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [highlightIndices, setHighlightIndices] = useState<{ [key: number]: string }>({});
  const [message, setMessage] = useState<string>('Select an operation to step through the algorithm.');
  const [pseudoCodeLine, setPseudoCodeLine] = useState<number>(0);

  // --- 2D & N-D Addressing State ---
  const [orderMode, setOrderMode] = useState<'row-major' | 'col-major'>('row-major');
  const [rows, setRows] = useState<number>(4);
  const [cols, setCols] = useState<number>(5);
  const [lb1, setLb1] = useState<number>(1);
  const [lb2, setLb2] = useState<number>(1);
  const [baseAddress, setBaseAddress] = useState<number>(1000);
  const [elementSize, setElementSize] = useState<number>(4);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 2, c: 3 });

  // 1D Reset
  const handleReset1D = () => {
    setArray([15, 28, 42, 63, 89]);
    setActiveAction('idle');
    setCurrentStepIndex(-1);
    setHighlightIndices({});
    setMessage('Array reset to initial state.');
    setPseudoCodeLine(0);
  };

  // 1D Insert Step-by-Step Simulation
  const handleInsert = () => {
    if (array.length >= maxCapacity) {
      setMessage('OVERFLOW: Array buffer is completely full!');
      setPseudoCodeLine(1);
      return;
    }
    if (insertIndex < 0 || insertIndex > array.length) {
      setMessage(`Invalid index! Must be between 0 and ${array.length}`);
      return;
    }

    // Prepare animation steps
    const initialArr = [...array];
    const newArr = [...initialArr, 0]; // extend space
    setActiveAction('inserting');
    setMessage(`Step 1: Shift elements from index ${initialArr.length - 1} down to ${insertIndex} to the right.`);
    setPseudoCodeLine(3);

    let j = initialArr.length - 1;
    setHighlightIndices({ [j]: 'shift' });

    // Animate shifting right
    const interval = setInterval(() => {
      if (j >= insertIndex) {
        newArr[j + 1] = newArr[j];
        setArray([...newArr]);
        setHighlightIndices({ [j]: 'shift', [j + 1]: 'dest' });
        setMessage(`Shift: LA[${j + 1}] := LA[${j}] (${newArr[j]})`);
        setPseudoCodeLine(4);
        j--;
      } else {
        clearInterval(interval);
        // Insert item
        newArr[insertIndex] = insertValue;
        setArray([...newArr]);
        setHighlightIndices({ [insertIndex]: 'inserted' });
        setMessage(`Step 6: Inserted ${insertValue} at index ${insertIndex}. Total size N is now ${newArr.length}.`);
        setPseudoCodeLine(6);
        setActiveAction('idle');
      }
    }, 600);
  };

  // 1D Delete Step-by-Step Simulation
  const handleDelete = () => {
    if (array.length === 0) {
      setMessage('UNDERFLOW: Array is empty!');
      setPseudoCodeLine(1);
      return;
    }
    if (deleteIndex < 0 || deleteIndex >= array.length) {
      setMessage(`Invalid index! Must be between 0 and ${array.length - 1}`);
      return;
    }

    setActiveAction('deleting');
    const removedItem = array[deleteIndex];
    setMessage(`Step 2: Removed item ${removedItem} from index ${deleteIndex}. Shifting trailing elements left.`);
    setPseudoCodeLine(2);
    setHighlightIndices({ [deleteIndex]: 'deleted' });

    let j = deleteIndex;
    const currentArr = [...array];

    const interval = setInterval(() => {
      if (j <= currentArr.length - 2) {
        currentArr[j] = currentArr[j + 1];
        setArray([...currentArr]);
        setHighlightIndices({ [j]: 'dest', [j + 1]: 'shift' });
        setMessage(`Shift: LA[${j}] := LA[${j + 1}] (${currentArr[j + 1]})`);
        setPseudoCodeLine(5);
        j++;
      } else {
        clearInterval(interval);
        currentArr.pop(); // Remove the last duplicated element
        setArray([...currentArr]);
        setHighlightIndices({});
        setMessage(`Step 7: Finished deletion. Total size N is now ${currentArr.length}. Deleted value was ${removedItem}.`);
        setPseudoCodeLine(7);
        setActiveAction('idle');
      }
    }, 600);
  };

  // 2D Calculations
  const ub1 = lb1 + rows - 1;
  const ub2 = lb2 + cols - 1;
  const targetR = Math.min(Math.max(selectedCell.r, lb1), ub1);
  const targetC = Math.min(Math.max(selectedCell.c, lb2), ub2);

  const rowDelta = targetR - lb1;
  const colDelta = targetC - lb2;

  const rmoOffset = rowDelta * cols + colDelta;
  const cmoOffset = colDelta * rows + rowDelta;

  const finalOffset = orderMode === 'row-major' ? rmoOffset : cmoOffset;
  const calculatedAddress = baseAddress + elementSize * finalOffset;

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs space-y-4">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24]" />
          <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
            Array Operations & Memory Addressing Lab
          </h4>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
          <button
            onClick={() => setActiveTab('1d-ops')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === '1d-ops'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            1D Operations (Insert/Delete)
          </button>
          <button
            onClick={() => setActiveTab('2d-addressing')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === '2d-addressing'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            2D Row vs. Column Major
          </button>
        </div>
      </div>

      {/* TAB 1: 1D ARRAY INSERT & DELETE */}
      {activeTab === '1d-ops' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Insert Controls */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Insert:</span>
              <span className="text-[#88847C] dark:text-[#78716C]">Val:</span>
              <input
                type="number"
                value={insertValue}
                onChange={(e) => setInsertValue(parseInt(e.target.value) || 0)}
                className="w-14 px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center"
              />
              <span className="text-[#88847C] dark:text-[#78716C]">at K:</span>
              <input
                type="number"
                value={insertIndex}
                onChange={(e) => setInsertIndex(parseInt(e.target.value) || 0)}
                className="w-12 px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center"
              />
              <button
                onClick={handleInsert}
                disabled={activeAction !== 'idle' || array.length >= maxCapacity}
                className="px-2 py-1 rounded bg-[#B45309] text-white font-medium hover:bg-[#92400E] disabled:opacity-50 cursor-pointer"
              >
                INSERT(LA, N, K, ITEM)
              </button>
            </div>

            {/* Delete Controls */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Delete:</span>
              <span className="text-[#88847C] dark:text-[#78716C]">at K:</span>
              <input
                type="number"
                value={deleteIndex}
                onChange={(e) => setDeleteIndex(parseInt(e.target.value) || 0)}
                className="w-12 px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center"
              />
              <button
                onClick={handleDelete}
                disabled={activeAction !== 'idle' || array.length === 0}
                className="px-2 py-1 rounded bg-red-700 text-white font-medium hover:bg-red-800 disabled:opacity-50 cursor-pointer"
              >
                DELETE(LA, N, K)
              </button>
              <button
                onClick={handleReset1D}
                disabled={activeAction !== 'idle'}
                className="p-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                title="Reset Array"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 1D Array Graphic Display */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Linear Array Buffer (N = {array.length} / MAX = {maxCapacity}):
              </span>
              <span className="text-[#88847C] dark:text-[#78716C]">Base = 1000, w = 4 bytes</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-2">
              {Array.from({ length: maxCapacity }).map((_, idx) => {
                const hasValue = idx < array.length;
                const value = hasValue ? array[idx] : null;
                const highlight = highlightIndices[idx];

                let boxBg = 'bg-white dark:bg-[#201D1A] border-[#E5E2D9] dark:border-[#38332B]';
                let textColor = 'text-[#1A1A1A] dark:text-[#EDE8DF]';

                if (highlight === 'shift') {
                  boxBg = 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 animate-pulse';
                  textColor = 'text-amber-800 dark:text-amber-200 font-bold';
                } else if (highlight === 'dest') {
                  boxBg = 'bg-blue-100 dark:bg-blue-950/60 border-blue-500';
                  textColor = 'text-blue-800 dark:text-blue-200 font-bold';
                } else if (highlight === 'inserted') {
                  boxBg = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500';
                  textColor = 'text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (highlight === 'deleted') {
                  boxBg = 'bg-red-100 dark:bg-red-950/60 border-red-500';
                  textColor = 'text-red-800 dark:text-red-200 font-bold';
                }

                return (
                  <div key={idx} className="flex flex-col items-center">
                    {/* Element Box */}
                    <div
                      className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${boxBg}`}
                    >
                      {hasValue ? (
                        <span className={`text-base font-mono font-bold ${textColor}`}>
                          {value}
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-gray-400 italic">empty</span>
                      )}
                    </div>

                    {/* Index & Address Label */}
                    <span className="text-[11px] font-mono text-[#88847C] dark:text-[#78716C] mt-1">
                      [{idx}]
                    </span>
                    <span className="text-[9px] font-mono text-[#AAA69D] dark:text-[#66625B]">
                      {1000 + idx * 4}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Real-Time Step Explanation */}
            <div className="p-2.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex items-center gap-2 text-xs font-mono">
              <ArrowRight className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
              <span className="text-[#1A1A1A] dark:text-[#EDE8DF]">{message}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 2D & N-D MEMORY ADDRESSING LAB */}
      {activeTab === '2d-addressing' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2.5 text-xs font-mono">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Order Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Storage Order:</span>
                <div className="flex rounded-md border border-[#E5E2D9] dark:border-[#38332B] p-0.5 bg-white dark:bg-[#201D1A]">
                  <button
                    onClick={() => setOrderMode('row-major')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                      orderMode === 'row-major'
                        ? 'bg-[#B45309] text-white'
                        : 'text-[#66625B] hover:text-[#1A1A1A]'
                    }`}
                  >
                    Row-Major Order (RMO)
                  </button>
                  <button
                    onClick={() => setOrderMode('col-major')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                      orderMode === 'col-major'
                        ? 'bg-[#B45309] text-white'
                        : 'text-[#66625B] hover:text-[#1A1A1A]'
                    }`}
                  >
                    Column-Major Order (CMO)
                  </button>
                </div>
              </div>

              {/* Base & Element Size */}
              <div className="flex items-center gap-2">
                <span>Base:</span>
                <input
                  type="number"
                  value={baseAddress}
                  onChange={(e) => setBaseAddress(parseInt(e.target.value) || 1000)}
                  className="w-16 px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center"
                />
                <span>w (bytes):</span>
                <input
                  type="number"
                  value={elementSize}
                  onChange={(e) => setElementSize(parseInt(e.target.value) || 4)}
                  className="w-10 px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center"
                />
              </div>
            </div>

            {/* Dimension Bounds */}
            <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#E5E2D9] dark:border-[#38332B] text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold">Row Range:</span>
                <span>LB₁:</span>
                <input
                  type="number"
                  value={lb1}
                  onChange={(e) => setLb1(parseInt(e.target.value) || 1)}
                  className="w-10 px-1 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center"
                />
                <span>to UB₁: {ub1} (R = {rows})</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-bold">Col Range:</span>
                <span>LB₂:</span>
                <input
                  type="number"
                  value={lb2}
                  onChange={(e) => setLb2(parseInt(e.target.value) || 1)}
                  className="w-10 px-1 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center"
                />
                <span>to UB₂: {ub2} (C = {cols})</span>
              </div>
            </div>
          </div>

          {/* 2D Interactive Grid */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Click Any Cell to Inspect Memory Address Calculation:
              </span>
              <span className="text-[#B45309] font-bold">
                Selected: A[{targetR}, {targetC}]
              </span>
            </div>

            {/* Matrix Grid */}
            <div className="overflow-x-auto py-1">
              <div
                className="grid gap-1.5 w-fit"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(44px, 1fr))` }}
              >
                {Array.from({ length: rows }).map((_, rIdx) => {
                  const rVal = lb1 + rIdx;
                  return Array.from({ length: cols }).map((__, cIdx) => {
                    const cVal = lb2 + cIdx;
                    const isSelected = rVal === targetR && cVal === targetC;

                    // Calculate offset for cell
                    const cellOffset =
                      orderMode === 'row-major'
                        ? rIdx * cols + cIdx
                        : cIdx * rows + rIdx;

                    return (
                      <button
                        key={`${rIdx}-${cIdx}`}
                        onClick={() => setSelectedCell({ r: rVal, c: cVal })}
                        className={`h-11 rounded border flex flex-col items-center justify-center font-mono cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#B45309] text-white border-[#B45309] shadow-sm scale-105 z-10'
                            : 'bg-white dark:bg-[#201D1A] border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] hover:border-[#B45309]'
                        }`}
                      >
                        <span className="text-[10px] font-bold">
                          [{rVal},{cVal}]
                        </span>
                        <span className="text-[9px] opacity-75">
                          #{cellOffset}
                        </span>
                      </button>
                    );
                  });
                })}
              </div>
            </div>

            {/* Exact Step-by-Step Formula Breakdown Box */}
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                <Table className="w-3.5 h-3.5" />
                <span>Mathematical Address Derivation for A[{targetR}, {targetC}]:</span>
              </div>

              {orderMode === 'row-major' ? (
                <div className="space-y-1 text-amber-800 dark:text-amber-300 text-[11px]">
                  <div>• Formula: <code className="font-bold">LOC(A[J, K]) = Base + w * [ (J - LB₁) * C + (K - LB₂) ]</code></div>
                  <div>• Rows skipped: (J - LB₁) = ({targetR} - {lb1}) = {rowDelta} rows</div>
                  <div>• Total elements in skipped rows: {rowDelta} * {cols} = {rowDelta * cols}</div>
                  <div>• Column offset within target row: (K - LB₂) = ({targetC} - {lb2}) = {colDelta}</div>
                  <div>• Total element index: {rowDelta * cols} + {colDelta} = <span className="font-bold text-base">{rmoOffset}</span></div>
                  <div className="pt-1 font-bold text-amber-950 dark:text-amber-100 text-xs">
                    • Physical Memory Address = {baseAddress} + {elementSize} * {rmoOffset} = <span className="text-base text-[#B45309] dark:text-[#FBBF24]">{calculatedAddress}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-amber-800 dark:text-amber-300 text-[11px]">
                  <div>• Formula: <code className="font-bold">LOC(A[J, K]) = Base + w * [ (K - LB₂) * R + (J - LB₁) ]</code></div>
                  <div>• Columns skipped: (K - LB₂) = ({targetC} - {lb2}) = {colDelta} columns</div>
                  <div>• Total elements in skipped columns: {colDelta} * {rows} = {colDelta * rows}</div>
                  <div>• Row offset within target column: (J - LB₁) = ({targetR} - {lb1}) = {rowDelta}</div>
                  <div>• Total element index: {colDelta * rows} + {rowDelta} = <span className="font-bold text-base">{cmoOffset}</span></div>
                  <div className="pt-1 font-bold text-amber-950 dark:text-amber-100 text-xs">
                    • Physical Memory Address = {baseAddress} + {elementSize} * {cmoOffset} = <span className="text-base text-[#B45309] dark:text-[#FBBF24]">{calculatedAddress}</span>
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
