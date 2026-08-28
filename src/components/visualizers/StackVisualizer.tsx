import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Eye, Sparkles, RefreshCw, Calculator, Layers, AlertCircle } from 'lucide-react';

interface TraceStep {
  step: number;
  symbol: string;
  stack: string;
  postfix: string;
  action: string;
}

interface StackVisualizerProps {
  focusedMode?: 'single' | 'dual' | 'infix';
}

export const StackVisualizer: React.FC<StackVisualizerProps> = ({ focusedMode }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'dual' | 'infix'>(focusedMode || 'single');

  React.useEffect(() => {
    if (focusedMode) {
      setActiveTab(focusedMode);
    }
  }, [focusedMode]);
  
  // Single Stack State
  const [stack, setStack] = useState<number[]>([15, 30, 45]);
  const [inputVal, setInputVal] = useState<string>('60');
  const [peekedVal, setPeekedVal] = useState<number | null>(null);
  const maxCap = 6;
  const [logs, setLogs] = useState<string[]>([
    'Stack initialized with TOP pointing to index 2 (val = 45)'
  ]);

  // Dual Stack in Single Array State
  const arraySize = 8;
  const [dualArray, setDualArray] = useState<(number | null)[]>([10, 20, null, null, null, null, 90, 80]);
  const [top1, setTop1] = useState<number>(1);
  const [top2, setTop2] = useState<number>(6);
  const [dualInput1, setDualInput1] = useState<string>('30');
  const [dualInput2, setDualInput2] = useState<string>('70');
  const [dualAlert, setDualAlert] = useState<string | null>(null);

  // Infix to Postfix Conversion State
  const [infixInput, setInfixInput] = useState<string>('(A+B*C)/(D-E^F)');
  const [traceSteps, setTraceSteps] = useState<TraceStep[]>([]);
  const [finalPostfix, setFinalPostfix] = useState<string>('');

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 15)]);
  };

  // Single Stack Handlers
  const handlePush = () => {
    const val = parseInt(inputVal) || Math.floor(Math.random() * 90 + 10);
    if (stack.length >= maxCap) {
      addLog(`❌ Stack Overflow! Reached max capacity of ${maxCap}.`);
      return;
    }
    setStack((prev) => [...prev, val]);
    setPeekedVal(null);
    addLog(`⬆️ PUSH(${val}) -> TOP advanced to index ${stack.length}`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      addLog('❌ Stack Underflow! Cannot pop from empty stack.');
      return;
    }
    const popped = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, prev.length - 1));
    setPeekedVal(null);
    addLog(`⬇️ POP() removed ${popped} from TOP.`);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      addLog('❌ Stack is empty, nothing to peek.');
      return;
    }
    const val = stack[stack.length - 1];
    setPeekedVal(val);
    addLog(`👀 PEEK() -> Top element is ${val}`);
  };

  // Dual Stack Handlers
  const handlePush1 = () => {
    const val = parseInt(dualInput1) || 35;
    if (top1 + 1 === top2) {
      setDualAlert('Stack 1 Overflow! TOP1 + 1 == TOP2 (Shared buffer full)');
      setTimeout(() => setDualAlert(null), 1500);
      return;
    }
    const nextTop = top1 + 1;
    const nextArr = [...dualArray];
    nextArr[nextTop] = val;
    setTop1(nextTop);
    setDualArray(nextArr);
  };

  const handlePop1 = () => {
    if (top1 === -1) {
      setDualAlert('Stack 1 Underflow! TOP1 == -1');
      setTimeout(() => setDualAlert(null), 1500);
      return;
    }
    const nextArr = [...dualArray];
    nextArr[top1] = null;
    setTop1(top1 - 1);
    setDualArray(nextArr);
  };

  const handlePush2 = () => {
    const val = parseInt(dualInput2) || 65;
    if (top1 + 1 === top2) {
      setDualAlert('Stack 2 Overflow! TOP1 + 1 == TOP2 (Shared buffer full)');
      setTimeout(() => setDualAlert(null), 1500);
      return;
    }
    const nextTop = top2 - 1;
    const nextArr = [...dualArray];
    nextArr[nextTop] = val;
    setTop2(nextTop);
    setDualArray(nextArr);
  };

  const handlePop2 = () => {
    if (top2 === arraySize) {
      setDualAlert('Stack 2 Underflow! TOP2 == MAX');
      setTimeout(() => setDualAlert(null), 1500);
      return;
    }
    const nextArr = [...dualArray];
    nextArr[top2] = null;
    setTop2(top2 + 1);
    setDualArray(nextArr);
  };

  // Infix to Postfix Converter Trace Generator (CUET Paper Style)
  const generateInfixTrace = () => {
    const precedence = (op: string) => {
      if (op === '^') return 3;
      if (op === '*' || op === '/') return 2;
      if (op === '+' || op === '-') return 1;
      return 0;
    };

    const isOperand = (ch: string) => /[a-zA-Z0-9]/.test(ch);

    const st: string[] = [];
    let postfix = '';
    const steps: TraceStep[] = [];
    let stepNum = 1;

    for (let i = 0; i < infixInput.length; i++) {
      const ch = infixInput[i];
      if (ch === ' ') continue;

      if (isOperand(ch)) {
        postfix += ch;
        steps.push({
          step: stepNum++,
          symbol: ch,
          stack: st.join(' ') || '(empty)',
          postfix: postfix,
          action: `Operand ${ch} appended directly to output`
        });
      } else if (ch === '(') {
        st.push(ch);
        steps.push({
          step: stepNum++,
          symbol: ch,
          stack: st.join(' '),
          postfix: postfix,
          action: `Push '(' onto stack`
        });
      } else if (ch === ')') {
        while (st.length > 0 && st[st.length - 1] !== '(') {
          const popped = st.pop()!;
          postfix += popped;
        }
        if (st.length > 0 && st[st.length - 1] === '(') {
          st.pop(); // discard '('
        }
        steps.push({
          step: stepNum++,
          symbol: ch,
          stack: st.join(' ') || '(empty)',
          postfix: postfix,
          action: `Pop operators until '(', discard '('`
        });
      } else {
        // Operator
        while (
          st.length > 0 &&
          st[st.length - 1] !== '(' &&
          precedence(st[st.length - 1]) >= precedence(ch)
        ) {
          if (ch === '^' && st[st.length - 1] === '^') break; // Right associative
          const popped = st.pop()!;
          postfix += popped;
        }
        st.push(ch);
        steps.push({
          step: stepNum++,
          symbol: ch,
          stack: st.join(' '),
          postfix: postfix,
          action: `Pop higher/equal precedence operators, then push '${ch}'`
        });
      }
    }

    // Flush remaining stack
    while (st.length > 0) {
      const popped = st.pop()!;
      if (popped !== '(') postfix += popped;
    }
    steps.push({
      step: stepNum++,
      symbol: 'End of string',
      stack: '(empty)',
      postfix: postfix,
      action: 'Pop all remaining operators to output'
    });

    setTraceSteps(steps);
    setFinalPostfix(postfix);
  };

  return (
    <div className="space-y-4" id="stack-visualizer-container">
      {/* Sub-view selector */}
      {!focusedMode && (
        <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] gap-2 shadow-xs">
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB] dark:bg-[#2A2622]">
            <button
              id="stack-mode-single"
              onClick={() => setActiveTab('single')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'single'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> Single Stack (LIFO)
            </button>
            <button
              id="stack-mode-dual"
              onClick={() => setActiveTab('dual')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'dual'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24]" /> Two Stacks in Single Array (CUET)
            </button>
            <button
              id="stack-mode-infix"
              onClick={() => setActiveTab('infix')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'infix'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" /> Infix to Postfix Trace Table
            </button>
          </div>
        </div>
      )}


      {/* Tab 1: Single Stack LIFO */}
      {activeTab === 'single' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center gap-3 shadow-xs">
            <input
              id="stack-val-input"
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Value"
              className="w-20 px-2.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] border border-[#D8D4C8] dark:border-[#423D36] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-mono"
            />
            <button
              id="stack-push-btn"
              onClick={handlePush}
              disabled={stack.length >= maxCap}
              className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] disabled:opacity-40 text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" /> PUSH(ITEM)
            </button>
            <button
              id="stack-pop-btn"
              onClick={handlePop}
              disabled={stack.length === 0}
              className="px-3.5 py-1.5 rounded-md bg-white dark:bg-[#201D1A] hover:bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#7F1D1D] disabled:opacity-40 text-[#991B1B] dark:text-[#EF4444] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" /> POP()
            </button>
            <button
              id="stack-peek-btn"
              onClick={handlePeek}
              disabled={stack.length === 0}
              className="px-3.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] disabled:opacity-40 text-[#1A1A1A] dark:text-[#EDE8DF] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24]" /> PEEK / TOP()
            </button>
            <button
              id="stack-clear-btn"
              onClick={() => {
                setStack([]);
                setPeekedVal(null);
                addLog('Stack cleared to empty (TOP = -1).');
              }}
              className="ml-auto px-3 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stack Visual Pillar */}
            <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex flex-col items-center justify-center shadow-xs">
              <div className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E] mb-4 flex items-center gap-2">
                <span>Vertical LIFO Column (Capacity: {maxCap})</span>
                <span className="font-mono text-[#991B1B] dark:text-[#EF4444] bg-[#FEF2F2] dark:bg-[#450A0A]/40 px-2 py-0.5 rounded border border-[#FECACA] dark:border-[#7F1D1D]">
                  TOP Index = {stack.length - 1}
                </span>
              </div>

              <div className="relative w-48 border-x-2 border-b-2 border-[#D8D4C8] dark:border-[#423D36] bg-[#FAF8F5] dark:bg-[#181614] rounded-b-xl p-2 min-h-[260px] flex flex-col-reverse gap-2 shadow-inner">
                {Array.from({ length: maxCap }).map((_, idx) => {
                  const item = stack[idx];
                  const isTop = idx === stack.length - 1;
                  const isPeeked = isTop && peekedVal !== null;

                  if (item === undefined) {
                    return (
                      <div
                        key={idx}
                        className="h-9 border border-dashed border-[#D8D4C8] dark:border-[#423D36] rounded-md flex items-center justify-center text-[10px] font-mono text-[#A8A29E]"
                      >
                        slot [{idx}]
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={`item-${idx}-${item}`}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className={`relative h-9 rounded-md border flex items-center justify-between px-3 font-mono text-xs font-bold transition-all ${
                        isPeeked
                          ? 'bg-[#FEF3C7] dark:bg-[#78350F]/40 border-[#F59E0B] text-[#92400E] dark:text-[#FDE68A] ring-2 ring-[#FDE68A]'
                          : isTop
                          ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 border-[#991B1B] text-[#991B1B] dark:text-[#EF4444] ring-1 ring-[#FECACA]'
                          : 'bg-white dark:bg-[#201D1A] border-[#D8D4C8] dark:border-[#423D36] text-[#1A1A1A] dark:text-[#EDE8DF]'
                      }`}
                    >
                      <span className="text-[#66625B] dark:text-[#A8A29E]">[{idx}]</span>
                      <span className="text-sm">{item}</span>
                      {isTop && (
                        <span className="absolute -right-20 px-2 py-0.5 rounded bg-[#991B1B] text-white text-[10px] font-serif font-bold shadow-xs">
                          ← TOP
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <span className="text-[11px] text-[#88847C] dark:text-[#78716C] mt-2 font-serif font-bold">Stack Bottom</span>
            </div>

            {/* Logs & Code notes */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs">
                <div className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E] mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> Stack Trace Log
                </div>
                <div className="space-y-1 font-mono text-xs max-h-36 overflow-y-auto pr-2">
                  {logs.map((log, i) => (
                    <div key={i} className="text-[#44403C] dark:text-[#D6D0C5] py-0.5 border-b border-[#F4F2EB]">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mb-1">Stack Invariants:</div>
                <ul className="text-xs text-[#44403C] dark:text-[#D6D0C5] space-y-1 list-disc list-inside font-sans">
                  <li><span className="text-[#B45309] dark:text-[#FBBF24] font-mono">TOP == -1</span> indicates Stack Underflow (Empty).</li>
                  <li><span className="text-[#B45309] dark:text-[#FBBF24] font-mono">TOP == MAX - 1</span> indicates Stack Overflow (Full).</li>
                  <li>Both PUSH and POP are strictly <span className="text-[#15803D] dark:text-[#4ADE80] font-bold">O(1)</span> operations.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Dual Stack in Single Array */}
      {activeTab === 'dual' && (
        <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-6 shadow-xs">
          <div>
            <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              Two Stacks in a Single Array (CUET Section-B Question Pattern)
            </span>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
              Stack 1 grows from index 0 → right. Stack 2 grows from index N-1 ← left. Overflow occurs ONLY when <span className="font-mono text-[#B45309] dark:text-[#FBBF24] font-bold">TOP1 + 1 == TOP2</span>.
            </p>
          </div>

          <AnimatePresence>
            {dualAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-lg bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#7F1D1D] text-[#991B1B] dark:text-[#EF4444] text-xs font-serif font-semibold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {dualAlert}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dual Array visual representation */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max p-3 bg-[#FAF8F5] dark:bg-[#181614] rounded-xl border border-[#E5E2D9] dark:border-[#38332B]">
              {dualArray.map((val, idx) => {
                const isStack1 = idx <= top1;
                const isStack2 = idx >= top2;
                const isTop1 = idx === top1;
                const isTop2 = idx === top2;

                return (
                  <div
                    key={idx}
                    className={`relative w-16 h-24 rounded-lg border flex flex-col items-center justify-between p-2 font-mono transition-all ${
                      isTop1
                        ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 border-[#991B1B] ring-2 ring-[#FECACA]'
                        : isTop2
                        ? 'bg-[#FAF5FF] border-[#9333EA] ring-2 ring-[#E9D5FF]'
                        : isStack1
                        ? 'bg-[#FEF2F2] dark:bg-[#450A0A]/40/60 border-[#FECACA] dark:border-[#7F1D1D] text-[#991B1B] dark:text-[#EF4444]'
                        : isStack2
                        ? 'bg-[#FAF5FF]/60 border-[#E9D5FF] text-[#9333EA]'
                        : 'bg-white dark:bg-[#201D1A] border-dashed border-[#D8D4C8] dark:border-[#423D36] text-[#A8A29E]'
                    }`}
                  >
                    <span className="text-[10px] text-[#66625B] dark:text-[#A8A29E]">[{idx}]</span>
                    <span className="text-base font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                      {val !== null ? val : '—'}
                    </span>
                    <div className="text-[9px] font-bold">
                      {isTop1 ? (
                        <span className="text-[#991B1B] dark:text-[#EF4444]">TOP 1</span>
                      ) : isTop2 ? (
                        <span className="text-[#9333EA]">TOP 2</span>
                      ) : isStack1 ? (
                        <span className="text-[#991B1B] dark:text-[#EF4444]/70">S1</span>
                      ) : isStack2 ? (
                        <span className="text-[#9333EA]/70">S2</span>
                      ) : (
                        <span className="text-[#A8A29E]">Free</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls for both stacks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Stack 1 Controls */}
            <div className="p-4 rounded-lg bg-[#FEF2F2] dark:bg-[#450A0A]/40/40 border border-[#FECACA] dark:border-[#7F1D1D] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444] uppercase">Stack 1 (Left → Right)</span>
                <span className="text-xs font-mono text-[#991B1B] dark:text-[#EF4444] font-bold">TOP1 = {top1}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={dualInput1}
                  onChange={(e) => setDualInput1(e.target.value)}
                  className="w-20 px-2 py-1 rounded-md bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-mono"
                />
                <button
                  onClick={handlePush1}
                  className="px-3 py-1 rounded-md bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-serif font-semibold cursor-pointer"
                >
                  PUSH 1
                </button>
                <button
                  onClick={handlePop1}
                  disabled={top1 === -1}
                  className="px-3 py-1 rounded-md bg-white dark:bg-[#201D1A] hover:bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#7F1D1D] text-[#991B1B] dark:text-[#EF4444] disabled:opacity-40 text-xs font-serif font-semibold cursor-pointer"
                >
                  POP 1
                </button>
              </div>
            </div>

            {/* Stack 2 Controls */}
            <div className="p-4 rounded-lg bg-[#FAF5FF]/50 border border-[#E9D5FF] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#7E22CE] uppercase">Stack 2 (Right ← Left)</span>
                <span className="text-xs font-mono text-[#7E22CE] font-bold">TOP2 = {top2}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={dualInput2}
                  onChange={(e) => setDualInput2(e.target.value)}
                  className="w-20 px-2 py-1 rounded-md bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-mono"
                />
                <button
                  onClick={handlePush2}
                  className="px-3 py-1 rounded-md bg-[#7E22CE] hover:bg-[#6B21A8] text-white text-xs font-serif font-semibold cursor-pointer"
                >
                  PUSH 2
                </button>
                <button
                  onClick={handlePop2}
                  disabled={top2 === arraySize}
                  className="px-3 py-1 rounded-md bg-white dark:bg-[#201D1A] hover:bg-[#FAF5FF] border border-[#E9D5FF] text-[#7E22CE] disabled:opacity-40 text-xs font-serif font-semibold cursor-pointer"
                >
                  POP 2
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Infix to Postfix Trace Table */}
      {activeTab === 'infix' && (
        <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-5 shadow-xs">
          <div>
            <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              CUET Infix-to-Postfix Stack Trace Table Generator
            </span>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
              Enter any algebraic expression to generate the official 4-column examination step table.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              id="infix-expression-input"
              type="text"
              value={infixInput}
              onChange={(e) => setInfixInput(e.target.value)}
              placeholder="e.g. A+(B*C-(D/E^F)*G)*H"
              className="flex-1 min-w-[240px] px-3 py-2 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#D8D4C8] dark:border-[#423D36] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-mono"
            />
            <button
              id="generate-infix-trace-btn"
              onClick={generateInfixTrace}
              className="px-4 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-amber-300" /> Generate Trace Table
            </button>
          </div>

          {finalPostfix && (
            <div className="p-4 rounded-lg bg-[#ECFDF5] dark:bg-[#064E3B]/40 border border-[#A7F3D0] dark:border-[#059669]">
              <div className="text-xs font-serif font-bold text-[#065F46] dark:text-[#34D399] uppercase tracking-wider">Final Postfix String:</div>
              <div className="mt-1 font-mono text-base font-bold text-[#047857]">{finalPostfix}</div>
            </div>
          )}

          {traceSteps.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F4F2EB] dark:bg-[#2A2622] text-[#2C2B29] dark:text-[#D6D0C5] border-b border-[#E5E2D9] dark:border-[#38332B]">
                  <tr>
                    <th className="p-3 w-16 text-center font-serif font-bold">Step</th>
                    <th className="p-3 w-32 font-serif font-bold">Symbol Scanned</th>
                    <th className="p-3 w-40 font-serif font-bold">Stack State</th>
                    <th className="p-3 font-serif font-bold">Postfix Expression</th>
                    <th className="p-3 font-serif font-bold text-[#66625B] dark:text-[#A8A29E]">Action Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2D9] dark:divide-[#38332B] bg-white dark:bg-[#201D1A]">
                  {traceSteps.map((s) => (
                    <tr key={s.step} className="hover:bg-[#FAF8F5] dark:bg-[#181614] transition-colors">
                      <td className="p-3 text-center text-[#88847C] dark:text-[#78716C]">{s.step}</td>
                      <td className="p-3 font-bold text-[#B45309] dark:text-[#FBBF24]">{s.symbol}</td>
                      <td className="p-3 font-bold text-[#991B1B] dark:text-[#EF4444]">{s.stack}</td>
                      <td className="p-3 font-bold text-[#15803D] dark:text-[#4ADE80]">{s.postfix || '—'}</td>
                      <td className="p-3 text-[11px] text-[#44403C] dark:text-[#D6D0C5] font-sans">{s.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
