import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight, ArrowLeftRight, Sparkles, RefreshCw, Calculator, Play, SkipForward, RotateCcw, Cpu } from 'lucide-react';
import { Latex, MathText } from '../common/Latex';

interface ListNode {
  id: string;
  info: number;
}

interface PolyTerm {
  coef: number;
  exp: number;
}

interface ListVisualizerProps {
  focusedMode?: 'singly' | 'doubly' | 'reversalLab' | 'poly';
}

let nodeCounter = 100;

export const ListVisualizer: React.FC<ListVisualizerProps> = ({ focusedMode }) => {
  const [listType, setListType] = useState<'singly' | 'doubly' | 'reversalLab' | 'poly'>(
    focusedMode || 'singly'
  );

  useEffect(() => {
    if (focusedMode) {
      setListType(focusedMode);
    }
  }, [focusedMode]);

  // Standard List State
  const [nodes, setNodes] = useState<ListNode[]>([
    { id: '1', info: 10 },
    { id: '2', info: 25 },
    { id: '3', info: 40 },
    { id: '4', info: 65 }
  ]);
  const [inputVal, setInputVal] = useState<string>('30');
  const [insertPos, setInsertPos] = useState<'head' | 'tail'>('tail');

  // Reversal Lab Step-by-Step State
  const [revStep, setRevStep] = useState<number>(0);
  const [isAutoPlayingRev, setIsAutoPlayingRev] = useState<boolean>(false);
  const revNodes = [10, 25, 40, 65];

  // Polynomial Addition State (CUET Classic Question)
  const [poly1] = useState<PolyTerm[]>([
    { coef: 4, exp: 3 },
    { coef: 3, exp: 2 },
    { coef: -5, exp: 1 },
    { coef: 7, exp: 0 }
  ]);
  const [poly2] = useState<PolyTerm[]>([
    { coef: 2, exp: 3 },
    { coef: -3, exp: 2 },
    { coef: 4, exp: 1 },
    { coef: 1, exp: 0 }
  ]);
  const [polyResult, setPolyResult] = useState<PolyTerm[] | null>(null);

  const [logs, setLogs] = useState<string[]>([
    'Linked List initialized with 4 nodes.'
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 15)]);
  };

  const handleInsert = () => {
    const val = parseInt(inputVal) || Math.floor(Math.random() * 90 + 10);
    const newNode: ListNode = { id: `node-${++nodeCounter}`, info: val };

    if (insertPos === 'head') {
      setNodes([newNode, ...nodes]);
      addLog(`ðŸ“Œ Inserted node(${val}) at HEAD (O(1)).`);
    } else {
      setNodes([...nodes, newNode]);
      addLog(`ðŸ“Œ Inserted node(${val}) at TAIL (O(1) with tail pointer).`);
    }
  };

  const handleDelete = (id: string, val: number) => {
    setNodes(nodes.filter((n) => n.id !== id));
    addLog(`ðŸ—‘ï¸ Deleted node(${val}). Pointers updated to bypass node.`);
  };

  const handleReverse = () => {
    setNodes([...nodes].reverse());
    addLog('ðŸ”„ Inverted list pointers in-place in O(N) time.');
  };

  // Polynomial Addition Calculator with COEF, EXP, LINK logic
  const handleAddPolynomials = () => {
    const termMap: Record<number, number> = {};
    poly1.forEach((t) => {
      termMap[t.exp] = (termMap[t.exp] || 0) + t.coef;
    });
    poly2.forEach((t) => {
      termMap[t.exp] = (termMap[t.exp] || 0) + t.coef;
    });

    const res: PolyTerm[] = Object.entries(termMap)
      .map(([exp, coef]) => ({ exp: parseInt(exp), coef }))
      .filter((t) => t.coef !== 0)
      .sort((a, b) => b.exp - a.exp);

    setPolyResult(res);
    addLog('ðŸ§® Polynomials P1(x) + P2(x) added using parallel COEF and EXP array logic.');
  };

  const handleReset = () => {
    setNodes([
      { id: '1', info: 10 },
      { id: '2', info: 25 },
      { id: '3', info: 40 },
      { id: '4', info: 65 }
    ]);
    setPolyResult(null);
    setRevStep(0);
    setLogs(['List reset to default.']);
  };

  // Reversal Lab Step Advancement
  const nextRevStep = () => {
    setRevStep((prev) => Math.min(prev + 1, 5));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlayingRev) {
      if (revStep < 5) {
        timer = setTimeout(() => {
          setRevStep((c) => c + 1);
        }, 1200);
      } else {
        setIsAutoPlayingRev(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isAutoPlayingRev, revStep]);

  return (
    <div className="space-y-4" id="list-visualizer-container">
      {/* Mode Switcher */}
      {!focusedMode && (
        <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] gap-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB] dark:bg-[#2A2622]">
            <button
              id="list-mode-singly"
              onClick={() => setListType('singly')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                listType === 'singly'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              Singly Linked List
            </button>
            <button
              id="list-mode-doubly"
              onClick={() => setListType('doubly')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                listType === 'doubly'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              Doubly (Two-Way) List
            </button>
            <button
              id="list-mode-rev-lab"
              onClick={() => {
                setListType('reversalLab');
                setRevStep(0);
              }}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                listType === 'reversalLab'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> 3-Pointer In-Place Reversal Lab
            </button>
            <button
              id="list-mode-poly"
              onClick={() => setListType('poly')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                listType === 'poly'
                  ? 'bg-white dark:bg-[#2A2622] text-[#1A1A1A] dark:text-[#EDE8DF] shadow-2xs border border-[#D8D4C8] dark:border-[#423D36]'
                  : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" /> Polynomial Addition (COEF, EXP, LINK)
            </button>
          </div>

          <button
            id="list-reset-btn"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      )}

      {/* VIEW 1 & 2: Singly and Doubly Linked List */}
      {listType === 'singly' || listType === 'doubly' ? (
        <div className="space-y-6">
          {/* Controls */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <label className="text-xs font-serif font-bold text-[#44403C] dark:text-[#D6D0C5]">Value:</label>
              <input
                id="list-val-input"
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Value"
                className="w-20 px-2.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] border border-[#D8D4C8] dark:border-[#423D36] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] font-mono"
              />
            </div>
            <div className="flex items-center rounded-md bg-[#FAF8F5] dark:bg-[#181614] p-0.5 border border-[#D8D4C8] dark:border-[#423D36]">
              <button
                onClick={() => setInsertPos('head')}
                className={`px-2.5 py-1 rounded text-xs font-serif font-semibold cursor-pointer ${
                  insertPos === 'head' ? 'bg-[#1A1A1A] text-white' : 'text-[#66625B] dark:text-[#A8A29E]'
                }`}
              >
                Head
              </button>
              <button
                onClick={() => setInsertPos('tail')}
                className={`px-2.5 py-1 rounded text-xs font-serif font-semibold cursor-pointer ${
                  insertPos === 'tail' ? 'bg-[#1A1A1A] text-white' : 'text-[#66625B] dark:text-[#A8A29E]'
                }`}
              >
                Tail
              </button>
            </div>
            <button
              id="list-insert-btn"
              onClick={handleInsert}
              className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" /> Insert Node
            </button>
            <button
              id="list-reverse-btn"
              onClick={handleReverse}
              disabled={nodes.length < 2}
              className="px-3.5 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] disabled:opacity-40 text-[#991B1B] dark:text-[#EF4444] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" /> Reverse List (In-Place)
            </button>

            <span className="ml-auto text-xs font-mono text-[#991B1B] dark:text-[#EF4444] bg-[#FEF2F2] dark:bg-[#450A0A]/40 px-2.5 py-1 rounded border border-[#FECACA] dark:border-[#7F1D1D] font-bold">
              Length = {nodes.length}
            </span>
          </div>

          {/* Linked List Canvas */}
          <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
              <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                {listType === 'singly' ? 'Singly Linked Node Chain' : 'Doubly (Two-Way) Linked Node Chain'}
              </span>
              <span className="text-xs text-[#66625B] dark:text-[#A8A29E] font-mono">
                HEAD â†’ {nodes.length > 0 ? `[Node ${nodes[0].info}]` : 'NULL'}
              </span>
            </div>

            <div className="overflow-x-auto pb-4 pt-2">
              <div className="flex items-center gap-3 min-w-max p-2">
                {/* START Pointer */}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-serif font-bold text-[#15803D] dark:text-[#4ADE80]">START / HEAD</span>
                  <div className="w-8 h-8 rounded-md bg-[#ECFDF5] dark:bg-[#064E3B]/40 border border-[#10B981] flex items-center justify-center text-[#15803D] dark:text-[#4ADE80] text-xs font-mono mt-1">
                    â—
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#88847C] dark:text-[#78716C] shrink-0" />

                {nodes.length === 0 ? (
                  <div className="px-4 py-2 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-[#88847C] dark:text-[#78716C]">
                    NULL
                  </div>
                ) : (
                  nodes.map((n, idx) => (
                    <React.Fragment key={n.id}>
                      {/* Node Box */}
                      <motion.div
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative flex items-center rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#423D36] shadow-xs overflow-hidden group hover:border-[#991B1B]"
                      >
                        {/* PREV pointer (Doubly only) */}
                        {listType === 'doubly' && (
                          <div className="px-2 py-3 bg-[#FAF5FF] border-r border-[#E5E2D9] dark:border-[#38332B] text-[10px] font-mono text-[#7E22CE] flex flex-col items-center justify-center">
                            <span>PREV</span>
                            <span className="text-[9px] text-[#88847C] dark:text-[#78716C]">
                              {idx === 0 ? 'NULL' : 'â—'}
                            </span>
                          </div>
                        )}

                        {/* INFO Field */}
                        <div className="px-4 py-3 bg-[#FAF8F5] dark:bg-[#181614] text-center">
                          <span className="text-[9px] font-serif font-bold text-[#66625B] dark:text-[#A8A29E] uppercase block">INFO</span>
                          <span className="text-base font-bold font-mono text-[#1A1A1A] dark:text-[#EDE8DF]">{n.info}</span>
                        </div>

                        {/* NEXT Pointer */}
                        <div className="px-2 py-3 bg-[#FEF2F2] dark:bg-[#450A0A]/40 border-l border-[#E5E2D9] dark:border-[#38332B] text-[10px] font-mono text-[#991B1B] dark:text-[#EF4444] flex flex-col items-center justify-center">
                          <span>NEXT</span>
                          <span className="text-[9px] text-[#88847C] dark:text-[#78716C]">
                            {idx === nodes.length - 1 ? 'NULL' : 'â—'}
                          </span>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(n.id, n.info)}
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#991B1B] text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          Ã—
                        </button>
                      </motion.div>

                      {/* Arrow to Next */}
                      {idx < nodes.length - 1 ? (
                        <div className="flex flex-col items-center shrink-0">
                          <ArrowRight className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
                          {listType === 'doubly' && (
                            <ArrowRight className="w-4 h-4 text-[#7E22CE] rotate-180 -mt-1" />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-mono text-[#88847C] dark:text-[#78716C] shrink-0">
                          <ArrowRight className="w-4 h-4 text-[#88847C] dark:text-[#78716C]" />
                          <span className="px-2 py-1 bg-[#FAF8F5] dark:bg-[#181614] rounded border border-[#E5E2D9] dark:border-[#38332B]">NULL</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : listType === 'reversalLab' ? (
        /* VIEW 3: 3-Pointer In-Place Reversal Lab */
        <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-6 shadow-xs" id="reversal-simulator">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <div>
              <h3 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-[#991B1B] dark:text-[#EF4444]" /> 3-Pointer In-Place Reversal Mechanics ($O(N)$ Time, $O(1)$ Extra Space)
              </h3>
              <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
                Observe the three sliding pointers: <code className="font-mono text-[#15803D] font-bold">prev</code>, <code className="font-mono text-[#B45309] font-bold">curr</code>, and <code className="font-mono text-[#991B1B] dark:text-[#EF4444] font-bold">next_node</code> as each pointer arrow reverses.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRevStep(0)}
                className="px-3 py-1.5 rounded-md bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#66625B] dark:text-[#A8A29E] text-xs font-serif font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart
              </button>
              <button
                onClick={() => setIsAutoPlayingRev(!isAutoPlayingRev)}
                className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {isAutoPlayingRev ? 'Pause' : 'Auto Play'}
              </button>
              <button
                onClick={nextRevStep}
                disabled={revStep >= 5 || isAutoPlayingRev}
                className="px-3.5 py-1.5 rounded-md bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-40 text-white text-xs font-serif font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                Step ({revStep}/5) <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Current Step Description */}
          <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-1">
            <div className="text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444] uppercase tracking-wider">
              Reversal Step {revStep} of 5:
            </div>
            <div className="text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF] leading-relaxed">
              {revStep === 0 && 'Initial: prev = NULL, curr = HEAD (Node 10), next_node = NULL'}
              {revStep === 1 && 'Iteration 1: next_node = curr->next (25); curr->next = prev (NULL); prev = curr (10); curr = next_node (25)'}
              {revStep === 2 && 'Iteration 2: next_node = curr->next (40); curr->next = prev (10); prev = curr (25); curr = next_node (40)'}
              {revStep === 3 && 'Iteration 3: next_node = curr->next (65); curr->next = prev (25); prev = curr (40); curr = next_node (65)'}
              {revStep === 4 && 'Iteration 4: next_node = curr->next (NULL); curr->next = prev (40); prev = curr (65); curr = NULL'}
              {revStep === 5 && 'Finished: HEAD = prev (Node 65). Linked List is fully inverted in O(N) without auxiliary array allocations!'}
            </div>
          </div>

          {/* Visual Pointer Node Chain */}
          <div className="p-6 bg-[#FAF8F5] dark:bg-[#181614] rounded-xl border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto">
            <div className="flex items-center gap-4 min-w-max p-4">
              {revNodes.map((val, idx) => {
                const isReversedSoFar = revStep > idx;
                const isCurrent = revStep === idx + 1;

                return (
                  <React.Fragment key={idx}>
                    <motion.div
                      layout
                      className={`relative flex flex-col items-center justify-between w-24 h-24 rounded-lg border p-2 font-mono shadow-xs ${
                        isCurrent
                          ? 'bg-[#FEF3C7] dark:bg-[#78350F]/40 border-[#F59E0B] ring-2 ring-[#FDE68A]'
                          : isReversedSoFar
                          ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/40 border-[#10B981]'
                          : 'bg-white dark:bg-[#201D1A] border-[#D8D4C8] dark:border-[#423D36]'
                      }`}
                    >
                      <span className="text-[10px] text-[#66625B] dark:text-[#A8A29E]">Node [{idx}]</span>
                      <span className="text-lg font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">{val}</span>
                      <span className="text-[9px] text-[#88847C] dark:text-[#78716C]">
                        {isReversedSoFar ? 'â† Points Left' : 'â†’ Points Right'}
                      </span>
                    </motion.div>

                    {idx < revNodes.length - 1 && (
                      <div className="flex items-center">
                        <ArrowRight
                          className={`w-5 h-5 transition-transform duration-500 ${
                            isReversedSoFar ? 'text-[#10B981] rotate-180' : 'text-[#991B1B] dark:text-[#EF4444]'
                          }`}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 4: Polynomial Addition Visualizer */
        <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-6 shadow-xs">
          <div>
            <span className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              Polynomial Addition via Circular Header Linked Lists (COEF, EXP, LINK)
            </span>
            <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans flex items-center gap-1">
              Parallel traversal of sorted exponent nodes in linear <MathText text="$\mathcal{O}(M + N)$" /> time.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* P1 */}
            <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <div className="text-xs font-serif font-bold text-[#B45309] dark:text-[#FBBF24]">P1(x) Terms:</div>
              <Latex math="P_1(x) = 4x^3 + 3x^2 - 5x + 7" block />
            </div>

            {/* P2 */}
            <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <div className="text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444]">P2(x) Terms:</div>
              <Latex math="P_2(x) = 2x^3 - 3x^2 + 4x + 1" block />
            </div>
          </div>

          <button
            onClick={handleAddPolynomials}
            className="px-4 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-serif font-bold flex items-center gap-2 cursor-pointer"
          >
            <Calculator className="w-4 h-4" /> Add P1(x) + P2(x)
          </button>

          {polyResult && (
            <div className="p-4 rounded-lg bg-[#ECFDF5] dark:bg-[#064E3B]/40 border border-[#A7F3D0] dark:border-[#059669] space-y-3">
              <div className="text-xs font-serif font-bold text-[#065F46] dark:text-[#34D399] uppercase">
                Resultant Polynomial P3(x):
              </div>
              <div className="text-base font-bold text-[#047857]">
                <Latex
                  math={`P_3(x) = ${polyResult
                    .map((t, idx) => {
                      const sign = t.coef >= 0 ? (idx > 0 ? '+ ' : '') : '- ';
                      const absCoef = Math.abs(t.coef);
                      const expStr = t.exp === 0 ? '' : t.exp === 1 ? 'x' : `x^${t.exp}`;
                      return `${sign}${absCoef}${expStr}`;
                    })
                    .join(' ')}`}
                  block
                />
              </div>
              <div className="text-xs text-[#065F46] dark:text-[#34D399] font-sans">
                Note: The $x^2$ term canceled out because <Latex math="3x^2 + (-3x^2) = 0" />, so no node was allocated in the resultant list!
              </div>
            </div>
          )}
        </div>
      )}

      {/* Log */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs">
        <div className="text-xs font-serif font-bold text-[#66625B] dark:text-[#A8A29E] mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> Linked List Activity Log
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
  );
};
