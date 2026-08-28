import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, RefreshCw, AlertCircle, Sparkles, RotateCw, Play, SkipForward, ArrowRight } from 'lucide-react';
import { Latex } from '../common/Latex';

interface QueueVisualizerProps {
  focusedMode?: 'circular' | 'linear' | 'ring';
}

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({ focusedMode }) => {
  const [mode, setMode] = useState<'circular' | 'linear' | 'ring'>(focusedMode || 'circular');
  const capacity = 6;

  React.useEffect(() => {
    if (focusedMode) {
      setMode(focusedMode);
    }
  }, [focusedMode]);

  // Circular Queue State
  const [circularArr, setCircularArr] = useState<(number | null)[]>([10, 20, 30, null, null, null]);
  const [front, setFront] = useState<number>(0);
  const [rear, setRear] = useState<number>(2);
  const [inputVal, setInputVal] = useState<string>('40');
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Linear Queue State for False Overflow demo
  const [linearArr, setLinearArr] = useState<(number | null)[]>([null, null, 30, 40, 50, 60]);
  const [linFront, setLinFront] = useState<number>(2);
  const [linRear, setLinRear] = useState<number>(5);

  const [logs, setLogs] = useState<string[]>([
    'Circular Queue initialized. FRONT = 0, REAR = 2, Capacity N = 6.'
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 15)]);
  };

  const isCircularEmpty = front === -1;
  const isCircularFull = !isCircularEmpty && (rear + 1) % capacity === front;

  const currentCount = isCircularEmpty
    ? 0
    : front <= rear
    ? rear - front + 1
    : capacity - front + rear + 1;

  const handleCircularEnqueue = () => {
    const val = parseInt(inputVal) || Math.floor(Math.random() * 90 + 10);
    if (isCircularFull) {
      setAlertMsg('Queue Overflow! (REAR + 1) % N == FRONT');
      addLog(`âŒ Queue Overflow! Cannot insert ${val}.`);
      setTimeout(() => setAlertMsg(null), 2000);
      return;
    }

    const nextArr = [...circularArr];
    if (front === -1) {
      setFront(0);
      setRear(0);
      nextArr[0] = val;
      setLastAction(`Enqueued ${val} at index 0 (FRONT=0, REAR=0)`);
      addLog(`âœ… First element enqueued: ${val} at index 0. FRONT=0, REAR=0.`);
    } else {
      const nextRear = (rear + 1) % capacity;
      setRear(nextRear);
      nextArr[nextRear] = val;
      setLastAction(`Enqueued ${val} at index ${nextRear}: (${rear} + 1) % ${capacity} = ${nextRear}`);
      addLog(`âœ… Enqueued ${val} at index ${nextRear}. REAR updated to (REAR + 1) % ${capacity} = ${nextRear}.`);
    }
    setCircularArr(nextArr);
  };

  const handleCircularDequeue = () => {
    if (isCircularEmpty) {
      setAlertMsg('Queue Underflow! FRONT == -1');
      addLog('âŒ Queue Underflow! Cannot dequeue from empty queue.');
      setTimeout(() => setAlertMsg(null), 2000);
      return;
    }

    const nextArr = [...circularArr];
    const removed = nextArr[front];
    nextArr[front] = null;

    if (front === rear) {
      setFront(-1);
      setRear(-1);
      setLastAction(`Dequeued last element ${removed}. Reset FRONT=-1, REAR=-1`);
      addLog(`â¬‡ï¸ Dequeued last item (${removed}). Reset FRONT = -1, REAR = -1.`);
    } else {
      const nextFront = (front + 1) % capacity;
      setFront(nextFront);
      setLastAction(`Dequeued ${removed} from index ${front}. FRONT -> (${front} + 1) % ${capacity} = ${nextFront}`);
      addLog(`â¬‡ï¸ Dequeued ${removed} from index ${front}. FRONT updated to ${nextFront}.`);
    }
    setCircularArr(nextArr);
  };

  const handleReset = () => {
    setCircularArr([10, 20, 30, null, null, null]);
    setFront(0);
    setRear(2);
    setLinearArr([null, null, 30, 40, 50, 60]);
    setLinFront(2);
    setLinRear(5);
    setInputVal("40");
    setAlertMsg(null);
    setLastAction(null);
    setLogs(["Queue reset to initial state."]);
  };

  // Linear Queue Handlers
  const handleLinearEnqueue = () => {
    const val = parseInt(inputVal) || 70;
    if (linRear === capacity - 1) {
      setAlertMsg('âš ï¸ False Overflow! REAR is at index MAX-1, but indices 0 and 1 are empty!');
      setTimeout(() => setAlertMsg(null), 2500);
      return;
    }
    const nextArr = [...linearArr];
    const nextR = linRear + 1;
    nextArr[nextR] = val;
    setLinRear(nextR);
    setLinearArr(nextArr);
  };

  const handleLinearDequeue = () => {
    if (linFront > linRear || linFront === -1) {
      setAlertMsg('Linear Queue Underflow!');
      setTimeout(() => setAlertMsg(null), 1500);
      return;
    }
    const nextArr = [...linearArr];
    nextArr[linFront] = null;
    setLinFront(linFront + 1);
    setLinearArr(nextArr);
  };

  return (
    <div className="space-y-4" id="queue-visualizer-container">
      {/* Mode Switcher */}
      {!focusedMode && (
        <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] gap-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB] dark:bg-[#2A2622]">
            <button
              id="queue-mode-circular"
              onClick={() => setMode('circular')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'circular'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> Circular Queue (Linear Buffer)
            </button>
            <button
              id="queue-mode-ring"
              onClick={() => setMode('ring')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'ring'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" /> Ring Topology (Orbital Wraparound View)
            </button>
            <button
              id="queue-mode-linear"
              onClick={() => setMode('linear')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'linear'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24]" /> Linear Queue "False Overflow" Demo
            </button>
          </div>

          <button
            id="queue-reset-btn"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      )}


      {/* Alert Banner */}
      <AnimatePresence>
        {alertMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 rounded-lg bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#7F1D1D] text-[#991B1B] dark:text-[#EF4444] text-xs font-serif font-semibold flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {alertMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CIRCULAR QUEUE (STANDARD OR RING) */}
      {mode !== 'linear' ? (
        <div className="space-y-6">
          {/* Controls */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <label className="text-xs font-serif font-bold text-[#44403C] dark:text-[#D6D0C5]">Value:</label>
              <input
                id="queue-val-input"
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Value"
                className="w-20 px-2.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] border border-[#D8D4C8] dark:border-[#423D36] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-mono"
              />
            </div>
            <button
              id="queue-enqueue-btn"
              onClick={handleCircularEnqueue}
              disabled={isCircularFull}
              className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] disabled:opacity-40 text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" /> ENQUEUE(item)
            </button>
            <button
              id="queue-dequeue-btn"
              onClick={handleCircularDequeue}
              disabled={isCircularEmpty}
              className="px-3.5 py-1.5 rounded-md bg-white dark:bg-[#201D1A] hover:bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#7F1D1D] disabled:opacity-40 text-[#991B1B] dark:text-[#EF4444] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" /> DEQUEUE()
            </button>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-mono text-[#15803D] dark:text-[#4ADE80] bg-[#ECFDF5] dark:bg-[#064E3B]/40 px-2.5 py-1 rounded border border-[#A7F3D0] dark:border-[#059669] font-bold">
                FRONT = {front}
              </span>
              <span className="text-xs font-mono text-[#991B1B] dark:text-[#EF4444] bg-[#FEF2F2] dark:bg-[#450A0A]/40 px-2.5 py-1 rounded border border-[#FECACA] dark:border-[#7F1D1D] font-bold">
                REAR = {rear}
              </span>
              <span className="text-xs font-mono text-[#44403C] dark:text-[#D6D0C5] bg-[#FAF8F5] dark:bg-[#181614] px-2.5 py-1 rounded border border-[#E5E2D9] dark:border-[#38332B] font-bold">
                Count = {currentCount} / {capacity}
              </span>
            </div>
          </div>

          {/* Mathematical Formulations Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs">
              <div className="text-[11px] font-serif font-bold text-[#66625B] dark:text-[#A8A29E]">Full Condition</div>
              <div className="mt-1 text-xs">
                <Latex math="(\text{REAR} + 1) \bmod N = \text{FRONT}" />
              </div>
              <div className="text-[10px] text-[#88847C] dark:text-[#78716C] mt-1 font-mono">
                Status: {isCircularFull ? <span className="text-[#991B1B] dark:text-[#EF4444] font-bold">FULL</span> : 'Space Available'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs">
              <div className="text-[11px] font-serif font-bold text-[#66625B] dark:text-[#A8A29E]">Enqueue Pointer Shift</div>
              <div className="mt-1 text-xs">
                <Latex math="\text{REAR} \leftarrow (\text{REAR} + 1) \bmod N" />
              </div>
              <div className="text-[10px] text-[#88847C] dark:text-[#78716C] mt-1 font-mono">
                Next: {front === -1 ? '0' : `(${rear} + 1) % 6 = ${(rear + 1) % 6}`}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs">
              <div className="text-[11px] font-serif font-bold text-[#66625B] dark:text-[#A8A29E]">Dequeue Pointer Shift</div>
              <div className="mt-1 text-xs">
                <Latex math="\text{FRONT} \leftarrow (\text{FRONT} + 1) \bmod N" />
              </div>
              <div className="text-[10px] text-[#88847C] dark:text-[#78716C] mt-1 font-mono">
                Next: {front === -1 ? '-1' : front === rear ? '-1 (Reset)' : `(${front} + 1) % 6 = ${(front + 1) % 6}`}
              </div>
            </div>
          </div>

          {/* Linear Unrolled vs Circular Ring Representation */}
          {mode === 'circular' ? (
            <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
                <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Linear Array Buffer with Modulo Wraparound Logic ($N = {capacity}$)
                </span>
                <span className="text-xs font-mono text-[#66625B] dark:text-[#A8A29E]">
                  Index Domain: <code className="text-[#B45309] dark:text-[#FBBF24] font-bold">0 \dots {capacity - 1}</code>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {circularArr.map((val, idx) => {
                  const isFront = idx === front;
                  const isRear = idx === rear;
                  const isOccupied = val !== null;

                  return (
                    <motion.div
                      key={idx}
                      layout
                      className={`relative p-3 rounded-lg border flex flex-col items-center justify-between h-28 font-mono transition-all ${
                        isFront && isRear
                          ? 'bg-[#FEF3C7] dark:bg-[#78350F]/40/40 border-[#F59E0B] ring-2 ring-[#FDE68A]'
                          : isFront
                          ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/40 border-[#10B981] ring-2 ring-[#A7F3D0]'
                          : isRear
                          ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 border-[#991B1B] ring-2 ring-[#FECACA]'
                          : isOccupied
                          ? 'bg-[#FAF8F5] dark:bg-[#181614] border-[#D8D4C8] dark:border-[#423D36]'
                          : 'bg-[#F4F2EB] dark:bg-[#2A2622]/50 border-dashed border-[#D8D4C8] dark:border-[#423D36] opacity-60'
                      }`}
                    >
                      <span className="text-[11px] text-[#66625B] dark:text-[#A8A29E] font-bold">Slot [{idx}]</span>

                      <div className="text-lg font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                        {isOccupied ? val : <span className="text-xs text-[#A8A29E] font-normal italic">empty</span>}
                      </div>

                      {/* Pointer labels */}
                      <div className="flex items-center gap-1 text-[10px] font-bold">
                        {isFront && (
                          <span className="px-1.5 py-0.5 rounded bg-[#15803D] text-white">
                            FRONT
                          </span>
                        )}
                        {isRear && (
                          <span className="px-1.5 py-0.5 rounded bg-[#991B1B] text-white">
                            REAR
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {lastAction && (
                <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" />
                  <span>{lastAction}</span>
                </div>
              )}
            </div>
          ) : (
            /* Ring Topology Orbital View */
            <div className="p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex flex-col items-center justify-center space-y-6 shadow-xs">
              <div className="text-center">
                <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Circular Orbital Topology ($N=6$)
                </span>
                <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
                  Slot 5 seamlessly connects back to Slot 0 through the modulo operator $\pmod 6$.
                </p>
              </div>

              {/* 6-node Ring Layout */}
              <div className="relative w-72 h-72 rounded-full border-2 border-dashed border-[#D8D4C8] dark:border-[#423D36] flex items-center justify-center">
                {circularArr.map((val, idx) => {
                  const angle = (idx * 60 - 90) * (Math.PI / 180);
                  const radius = 105;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);
                  const isFront = idx === front;
                  const isRear = idx === rear;

                  return (
                    <motion.div
                      key={`ring-${idx}`}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${x}px - 28px)`,
                        top: `calc(50% + ${y}px - 28px)`,
                      }}
                      className={`w-14 h-14 rounded-full border flex flex-col items-center justify-center font-mono shadow-xs ${
                        isFront && isRear
                          ? 'bg-[#FEF3C7] dark:bg-[#78350F]/40 border-[#F59E0B] ring-2 ring-[#FDE68A]'
                          : isFront
                          ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/40 border-[#10B981] ring-2 ring-[#A7F3D0]'
                          : isRear
                          ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 border-[#991B1B] ring-2 ring-[#FECACA]'
                          : val !== null
                          ? 'bg-white dark:bg-[#201D1A] border-[#D8D4C8] dark:border-[#423D36]'
                          : 'bg-[#FAF8F5] dark:bg-[#181614] border-dashed border-[#D8D4C8] dark:border-[#423D36] opacity-50'
                      }`}
                    >
                      <span className="text-[9px] text-[#66625B] dark:text-[#A8A29E]">[{idx}]</span>
                      <span className="text-xs font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">{val ?? '-'}</span>
                    </motion.div>
                  );
                })}

                {/* Center Hub */}
                <div className="text-center p-3 rounded-full bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] shadow-2xs">
                  <div className="text-[10px] font-serif font-bold text-[#66625B] dark:text-[#A8A29E]">MODULO RING</div>
                  <div className="text-xs font-mono font-bold text-[#991B1B] dark:text-[#EF4444]">N = 6</div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Log */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs">
            <div className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> Circular Queue Activity Log
            </div>
            <div className="space-y-1 font-mono text-xs max-h-28 overflow-y-auto pr-2">
              {logs.map((log, i) => (
                <div key={i} className="text-[#44403C] dark:text-[#D6D0C5] py-0.5 border-b border-[#F4F2EB]">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Linear False Overflow Demo */
        <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-5 shadow-xs">
          <div>
            <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              The "False Overflow" Phenomenon in Linear Queues (CUET Exam Question)
            </span>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
              Notice below: Slots [0] and [1] are vacant, yet because <span className="font-mono text-[#B45309] dark:text-[#FBBF24] font-bold">REAR == 5 (MAX - 1)</span>, a naive linear queue falsely rejects new insertions!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {linearArr.map((val, idx) => {
              const isFront = idx === linFront;
              const isRear = idx === linRear;
              const isVacant = val === null;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-between h-28 font-mono ${
                    isVacant
                      ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40/40 border-dashed border-[#FECACA] dark:border-[#7F1D1D] text-[#991B1B] dark:text-[#EF4444]'
                      : 'bg-[#FAF8F5] dark:bg-[#181614] border-[#D8D4C8] dark:border-[#423D36] text-[#1A1A1A] dark:text-[#EDE8DF]'
                  }`}
                >
                  <span className="text-[11px] text-[#66625B] dark:text-[#A8A29E]">[{idx}]</span>
                  <span className="text-base font-bold">
                    {val !== null ? val : <span className="text-xs text-[#991B1B] dark:text-[#EF4444]/80 font-sans">Wasted Slot</span>}
                  </span>
                  <div className="flex gap-1 text-[9px] font-bold">
                    {isFront && <span className="text-[#15803D] dark:text-[#4ADE80]">FRONT (2)</span>}
                    {isRear && <span className="text-[#991B1B] dark:text-[#EF4444]">REAR (5=MAX-1)</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLinearEnqueue}
              className="px-3.5 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-bold cursor-pointer"
            >
              Attempt Enqueue (Triggers False Overflow)
            </button>
            <button
              onClick={handleLinearDequeue}
              className="px-3.5 py-2 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#1A1A1A] dark:text-[#EDE8DF] text-xs font-serif font-semibold cursor-pointer"
            >
              Linear Dequeue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
