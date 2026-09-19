import React, { useState, useEffect, useRef } from 'react';
import { Search, Play, Pause, RotateCcw, FastForward, Check, AlertCircle, ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';

interface SearchVisualizerProps {
  initialAlgorithm?: 'binary' | 'linear';
  lockAlgorithm?: 'binary' | 'linear';
}

export const SearchVisualizer: React.FC<SearchVisualizerProps> = ({
  initialAlgorithm = 'binary',
  lockAlgorithm
}) => {
  const [algorithm, setAlgorithm] = useState<'binary' | 'linear'>(lockAlgorithm || initialAlgorithm);

  // Arrays: unsorted for linear search, sorted for binary search
  const unsortedData = [45, 12, 89, 54, 23, 67, 18, 95, 31, 40];
  const sortedData = [12, 18, 23, 31, 42, 54, 67, 78, 89, 95];

  const currentArray = algorithm === 'binary' ? sortedData : unsortedData;
  const [target, setTarget] = useState<number>(54);

  // Simulation State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [comparisonCount, setComparisonCount] = useState<number>(0);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  // Binary Search Pointers & Calculations
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(9);
  const [mid, setMid] = useState<number | null>(null);
  const [calcFormula, setCalcFormula] = useState<string | null>(null);

  // Linear Search Pointer
  const [linearCursor, setLinearCursor] = useState<number>(-1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset function
  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setIsDone(false);
    setFoundIndex(null);
    setComparisonCount(0);
    setLogMessages([]);
    setLow(0);
    setHigh(currentArray.length - 1);
    setMid(null);
    setLinearCursor(-1);
    setCalcFormula(null);
  };

  useEffect(() => {
    if (lockAlgorithm) {
      setAlgorithm(lockAlgorithm);
    }
  }, [lockAlgorithm]);

  useEffect(() => {
    handleReset();
  }, [algorithm, target]);

  // Step Binary Search
  const stepBinarySearch = () => {
    if (isDone) return;

    if (low > high) {
      setIsDone(true);
      setIsRunning(false);
      setCalcFormula(`LOW (${low}) > HIGH (${high}) ⟹ Active interval is empty!`);
      setLogMessages((prev) => [
        ...prev,
        `Interval exhausted: LOW (${low}) > HIGH (${high}). Target ${target} is NOT present in the sorted array.`
      ]);
      return;
    }

    const currentMid = Math.floor(low + (high - low) / 2);
    setMid(currentMid);
    const midVal = sortedData[currentMid];
    const newCount = comparisonCount + 1;
    setComparisonCount(newCount);

    const formulaText = `MID = ${low} + (${high} - ${low}) / 2 = ${currentMid} | A[${currentMid}] = ${midVal}`;
    setCalcFormula(formulaText);

    if (midVal === target) {
      setFoundIndex(currentMid);
      setIsDone(true);
      setIsRunning(false);
      setLogMessages((prev) => [
        ...prev,
        `Step #${newCount}: A[${currentMid}] (${midVal}) == ${target}. Target found at index ${currentMid} in ${newCount} comparisons!`
      ]);
    } else if (midVal > target) {
      setHigh(currentMid - 1);
      setLogMessages((prev) => [
        ...prev,
        `Step #${newCount}: A[${currentMid}] (${midVal}) > ${target}. Target must be in left half. Discarding right half [${currentMid}..${high}]. New HIGH = ${currentMid - 1}.`
      ]);
    } else {
      setLow(currentMid + 1);
      setLogMessages((prev) => [
        ...prev,
        `Step #${newCount}: A[${currentMid}] (${midVal}) < ${target}. Target must be in right half. Discarding left half [${low}..${currentMid}]. New LOW = ${currentMid + 1}.`
      ]);
    }
  };

  // Step Linear Search
  const stepLinearSearch = () => {
    if (isDone) return;

    const nextIndex = linearCursor + 1;
    if (nextIndex >= unsortedData.length) {
      setIsDone(true);
      setIsRunning(false);
      setCalcFormula(`Reached end of array (Index ${nextIndex}) without finding ${target}.`);
      setLogMessages((prev) => [
        ...prev,
        `Finished scanning all ${unsortedData.length} elements. Target ${target} was NOT found.`
      ]);
      return;
    }

    setLinearCursor(nextIndex);
    const val = unsortedData[nextIndex];
    const newCount = comparisonCount + 1;
    setComparisonCount(newCount);

    if (val === target) {
      setFoundIndex(nextIndex);
      setIsDone(true);
      setIsRunning(false);
      setCalcFormula(`A[${nextIndex}] = ${val} == ${target} ⟹ MATCH!`);
      setLogMessages((prev) => [
        ...prev,
        `Comparison #${newCount}: A[${nextIndex}] = ${val} == ${target}. Target found at index ${nextIndex}!`
      ]);
    } else {
      setCalcFormula(`A[${nextIndex}] = ${val} ≠ ${target} ⟹ Advance to index ${nextIndex + 1}`);
      setLogMessages((prev) => [
        ...prev,
        `Comparison #${newCount}: A[${nextIndex}] = ${val} ≠ ${target}. Advancing to next element.`
      ]);
    }
  };

  const handleStep = () => {
    if (algorithm === 'binary') {
      stepBinarySearch();
    } else {
      stepLinearSearch();
    }
  };

  // Auto-play timer
  useEffect(() => {
    if (isRunning && !isDone) {
      timerRef.current = setInterval(() => {
        handleStep();
      }, 900);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isDone, low, high, linearCursor, algorithm]);

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs space-y-4">
      {/* Header & Algorithm Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24]" />
          <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
            {algorithm === 'binary' ? 'BINARY SEARCH SIMULATION (O(log N))' : 'LINEAR SEARCH SIMULATION (O(N))'}
          </h4>
        </div>

        {/* Algorithm Tabs (only shown if not locked) */}
        {!lockAlgorithm && (
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
            <button
              onClick={() => setAlgorithm('binary')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                algorithm === 'binary'
                  ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
              }`}
            >
              Binary Search
            </button>
            <button
              onClick={() => setAlgorithm('linear')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                algorithm === 'linear'
                  ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
              }`}
            >
              Linear Search
            </button>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Target:</span>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            className="w-16 px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center font-bold text-[#B45309]"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTarget(18)}
              className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[10px] hover:border-[#B45309] cursor-pointer"
            >
              18
            </button>
            <button
              onClick={() => setTarget(54)}
              className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[10px] hover:border-[#B45309] cursor-pointer"
            >
              54
            </button>
            <button
              onClick={() => setTarget(algorithm === 'binary' ? 95 : 40)}
              className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[10px] hover:border-[#B45309] cursor-pointer"
            >
              {algorithm === 'binary' ? '95 (End)' : '40 (End)'}
            </button>
            <button
              onClick={() => setTarget(99)}
              className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[10px] hover:border-[#B45309] cursor-pointer"
            >
              99 (Absent)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={isDone}
            className="px-2.5 py-1 rounded bg-[#B45309] text-white font-medium hover:bg-[#92400E] disabled:opacity-50 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            onClick={handleStep}
            disabled={isRunning || isDone}
            className="px-2.5 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] font-medium hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 flex items-center gap-1 cursor-pointer"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Step</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] hover:text-[#1A1A1A] cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="text-[#88847C] dark:text-[#78716C] ml-2">
            Comparisons: <strong className="text-[#1A1A1A] dark:text-[#EDE8DF]">{comparisonCount}</strong>
          </span>
        </div>
      </div>

      {/* Dynamic Midpoint / Inspection Formula Banner */}
      {calcFormula && (
        <div className="p-3 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/50 flex items-center gap-2.5 text-xs font-mono text-amber-900 dark:text-amber-200">
          <Calculator className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="font-bold">{calcFormula}</span>
        </div>
      )}

      {/* Visual Array Canvas */}
      <div className="p-4 sm:p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-4">
        {/* Precondition Notice */}
        <div className="text-[11px] font-mono text-[#66625B] dark:text-[#A8A29E] flex items-center justify-between">
          <span>
            {algorithm === 'binary' ? 'Precondition: Array is STRICTLY SORTED' : 'Precondition: Unsorted or arbitrary array'}
          </span>
          <span>N = {currentArray.length} items</span>
        </div>

        {/* Pointer Labels Row (For Binary Search) */}
        {algorithm === 'binary' && (
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto h-7">
            {currentArray.map((_, idx) => {
              const isLow = idx === low;
              const isHigh = idx === high;
              const isMid = idx === mid;

              return (
                <div key={idx} className="w-12 text-center font-mono text-[11px] font-bold">
                  {isMid && <span className="text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1 py-0.5 rounded">MID</span>}
                  {isLow && !isMid && <span className="text-blue-600 dark:text-blue-400">LOW</span>}
                  {isHigh && !isMid && !isLow && <span className="text-indigo-600 dark:text-indigo-400">HIGH</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Pointer Labels Row (For Linear Search) */}
        {algorithm === 'linear' && (
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto h-7">
            {currentArray.map((_, idx) => {
              const isCursor = idx === linearCursor;
              return (
                <div key={idx} className="w-12 text-center font-mono text-[11px] font-bold">
                  {isCursor && <span className="text-[#B45309] bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded">CUR</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Array Element Boxes */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-1">
          {currentArray.map((val, idx) => {
            const isMatch = foundIndex === idx;
            const isMid = mid === idx;
            const isLinearInspecting = linearCursor === idx;

            // In binary search, elements outside [low..high] are grayed out
            const isExcluded = algorithm === 'binary' && (idx < low || idx > high);

            let borderStyle = 'border-[#E5E2D9] dark:border-[#38332B] bg-white dark:bg-[#201D1A]';
            let textColor = 'text-[#1A1A1A] dark:text-[#EDE8DF]';

            if (isMatch) {
              borderStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/60 ring-2 ring-emerald-500/50';
              textColor = 'text-emerald-900 dark:text-emerald-200 font-bold';
            } else if (isMid || isLinearInspecting) {
              borderStyle = 'border-amber-500 bg-amber-100 dark:bg-amber-950/60 ring-2 ring-amber-500/50';
              textColor = 'text-amber-900 dark:text-amber-200 font-bold';
            } else if (isExcluded) {
              borderStyle = 'border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-900/30 opacity-30';
              textColor = 'text-gray-400 dark:text-gray-600';
            }

            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono text-sm font-bold transition-all ${borderStyle} ${textColor}`}
                >
                  {val}
                </div>
                <span className="text-[10px] font-mono text-[#88847C] dark:text-[#78716C] mt-1">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Execution Log */}
        <div className="p-3 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-1.5 text-xs font-mono max-h-36 overflow-y-auto">
          <div className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF] pb-1 border-b border-[#E5E2D9] dark:border-[#38332B] flex items-center justify-between">
            <span>Execution Trace Log:</span>
            {isDone && (
              <span className={`flex items-center gap-1 font-bold ${foundIndex !== null ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                {foundIndex !== null ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                {foundIndex !== null ? 'Target Found' : 'Target Not Found'}
              </span>
            )}
          </div>
          {logMessages.length === 0 ? (
            <div className="text-[#88847C] dark:text-[#78716C] italic text-[11px]">
              Click "Step" or "Auto Play" to trace the search process.
            </div>
          ) : (
            logMessages.map((msg, i) => (
              <div key={i} className="text-[11px] text-[#44403C] dark:text-[#D6D3D1] flex items-start gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#B45309] shrink-0 mt-0.5" />
                <span>{msg}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
