import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Play,
  RotateCcw,
  ArrowRight,
  Database,
  Calculator,
  Cpu,
  Scissors,
  Repeat,
  Search,
  AlertTriangle,
  CheckCircle2,
  ListOrdered,
  Sparkles
} from 'lucide-react';
import { WordProcessingLab } from './WordProcessingLab';

export type StringVisualizerMode =
  | 'storage'
  | 'operations'
  | 'wordProcessing'
  | 'algorithms'
  | 'matching'
  | 'c-string'
  | 'sso'
  | 'two-pointer';

interface StringVisualizerProps {
  focusedMode?: StringVisualizerMode;
}

export const StringVisualizer: React.FC<StringVisualizerProps> = ({ focusedMode = 'storage' }) => {
  // Normalize legacy focusedModes to new tabs
  const getInitialTab = (mode: StringVisualizerMode): 'storage' | 'operations' | 'wordProcessing' | 'algorithms' | 'matching' => {
    if (mode === 'c-string' || mode === 'sso') return 'storage';
    if (mode === 'two-pointer') return 'matching';
    if (mode === 'operations') return 'operations';
    if (mode === 'wordProcessing') return 'wordProcessing';
    if (mode === 'algorithms') return 'algorithms';
    if (mode === 'matching') return 'matching';
    return 'storage';
  };

  const [activeTab, setActiveTab] = useState<'storage' | 'operations' | 'wordProcessing' | 'algorithms' | 'matching'>(
    getInitialTab(focusedMode)
  );

  // Sync tab when prop changes from parent (e.g. user navigating lesson sections)
  useEffect(() => {
    setActiveTab(getInitialTab(focusedMode));
  }, [focusedMode]);

  // ==========================================
  // TAB 1: STORAGE MODELS STATE
  // ==========================================
  const [storageModel, setStorageModel] = useState<'fixed' | 'variable' | 'linked'>('fixed');
  
  // Fixed-Length & Pointer Array State
  const [fixedRecords, setFixedRecords] = useState<{ id: number; text: string; addr: number }[]>([
    { id: 1, text: 'PROGRAM PRINTING TWO INTEGERS IN INCREASING ORDER', addr: 200 },
    { id: 2, text: 'READ *, J, K', addr: 280 },
    { id: 3, text: 'IF(J .LE. K) THEN', addr: 360 },
    { id: 4, text: 'PRINT *, J, K', addr: 440 },
    { id: 5, text: 'ENDIF', addr: 520 },
    { id: 6, text: 'END', addr: 600 }
  ]);
  const [usePointerArray, setUsePointerArray] = useState<boolean>(true);

  // Variable-Length State
  const [variableText, setVariableText] = useState<string>('CSE-241 DATA STRUCTURES');
  const [variableMode, setVariableMode] = useState<'sentinel' | 'lengthHeader'>('sentinel');

  // Linked Storage State (Fig 3.9: "A THING OF BEAUTY IS A JOY FOREVER.")
  const linkedNodes = useMemo(() => [
    { id: 4, chars: 'A TH', link: 2 },
    { id: 2, chars: 'ING ', link: 7 },
    { id: 7, chars: 'OF B', link: 11 },
    { id: 11, chars: 'EAUT', link: 12 },
    { id: 12, chars: 'Y IS', link: 8 },
    { id: 8, chars: ' A J', link: 1 },
    { id: 1, chars: 'OY F', link: 10 },
    { id: 10, chars: 'OREV', link: 6 },
    { id: 6, chars: 'ER. ', link: 0 } // 0 is Null
  ], []);
  const [linkedStepIdx, setLinkedStepIdx] = useState<number>(0);

  // ==========================================
  // TAB 2: PRIMITIVE OPERATIONS STATE
  // ==========================================
  const [opStringS, setOpStringS] = useState<string>('TO BE OR NOT TO BE');
  const [subInitial, setSubInitial] = useState<number>(4);
  const [subLength, setSubLength] = useState<number>(7);

  const [indexText, setIndexText] = useState<string>('HIS FATHER IS THE PROFESSOR');
  const [indexPattern, setIndexPattern] = useState<string>('THE');

  const [concatS1, setConcatS1] = useState<string>('MARK');
  const [concatS2, setConcatS2] = useState<string>('TWAIN');
  const [concatWithSpace, setConcatWithSpace] = useState<boolean>(true);

  // Derived substring evaluation
  const evaluatedSubstring = useMemo(() => {
    const k = Math.max(1, subInitial);
    const l = Math.max(0, subLength);
    // 1-based indexing
    const start0 = k - 1;
    return opStringS.slice(start0, start0 + l);
  }, [opStringS, subInitial, subLength]);

  // Derived index evaluation (1-based, 0 if not found)
  const evaluatedIndex = useMemo(() => {
    if (!indexPattern) return 0;
    const found0 = indexText.indexOf(indexPattern);
    return found0 === -1 ? 0 : found0 + 1;
  }, [indexText, indexPattern]);

  // Derived concat evaluation
  const evaluatedConcat = useMemo(() => {
    return concatWithSpace ? `${concatS1} ${concatS2}` : `${concatS1}${concatS2}`;
  }, [concatS1, concatS2, concatWithSpace]);

  // ==========================================
  // TAB 4: STEP-BY-STEP ALGORITHMS SIMULATOR
  // ==========================================
  const [simAlgo, setSimAlgo] = useState<'algo31' | 'algo32'>('algo31');
  
  // Algo 3.1 State (Delete all occurrences)
  const [a31Text, setA31Text] = useState<string>('XAAABBB');
  const [a31Pattern, setA31Pattern] = useState<string>('AB');
  const [a31CurrentText, setA31CurrentText] = useState<string>('XAAABBB');
  const [a31Steps, setA31Steps] = useState<{ pass: number; foundAt: number; textBefore: string; textAfter: string; note: string }[]>([]);
  const [a31Done, setA31Done] = useState<boolean>(false);

  const resetA31 = (text = a31Text, pat = a31Pattern) => {
    setA31CurrentText(text);
    setA31Steps([]);
    setA31Done(false);
  };

  const stepA31 = () => {
    if (a31Done) return;
    const idx0 = a31CurrentText.indexOf(a31Pattern);
    if (idx0 === -1) {
      setA31Done(true);
      return;
    }
    const k = idx0 + 1; // 1-based
    const textBefore = a31CurrentText;
    const textAfter = a31CurrentText.slice(0, idx0) + a31CurrentText.slice(idx0 + a31Pattern.length);
    const pass = a31Steps.length + 1;
    let note = `Deleted '${a31Pattern}' at index ${k}.`;
    if (pass > 1) {
      note += ' (Notice: Newly formed pattern emerged from previously separated characters!)';
    }
    setA31Steps((prev) => [...prev, { pass, foundAt: k, textBefore, textAfter, note }]);
    setA31CurrentText(textAfter);

    if (textAfter.indexOf(a31Pattern) === -1) {
      setA31Done(true);
    }
  };

  // Algo 3.2 State (Replace all occurrences with loop trap demonstration)
  const [a32Text, setA32Text] = useState<string>('XABYABZ');
  const [a32P, setA32P] = useState<string>('AB');
  const [a32Q, setA32Q] = useState<string>('C');
  const [a32CurrentText, setA32CurrentText] = useState<string>('XABYABZ');
  const [a32Steps, setA32Steps] = useState<{ pass: number; foundAt: number; textBefore: string; textAfter: string }[]>([]);
  const [a32Done, setA32Done] = useState<boolean>(false);
  const [a32LoopWarning, setA32LoopWarning] = useState<boolean>(false);

  const resetA32 = (text = a32Text, p = a32P, q = a32Q) => {
    setA32CurrentText(text);
    setA32Steps([]);
    setA32Done(false);
    setA32LoopWarning(q.includes(p));
  };

  const stepA32 = () => {
    if (a32Done) return;
    if (a32Steps.length >= 8 && a32Q.includes(a32P)) {
      setA32Done(true);
      return;
    }
    const idx0 = a32CurrentText.indexOf(a32P);
    if (idx0 === -1) {
      setA32Done(true);
      return;
    }
    const k = idx0 + 1;
    const textBefore = a32CurrentText;
    const textAfter = a32CurrentText.slice(0, idx0) + a32Q + a32CurrentText.slice(idx0 + a32P.length);
    const pass = a32Steps.length + 1;

    setA32Steps((prev) => [...prev, { pass, foundAt: k, textBefore, textAfter }]);
    setA32CurrentText(textAfter);

    if (textAfter.indexOf(a32P) === -1) {
      setA32Done(true);
    }
  };

  // ==========================================
  // TAB 5: PATTERN MATCHING & TWO-POINTER
  // ==========================================
  const [matchT, setMatchT] = useState<string>('HIS FATHER IS THE PROFESSOR');
  const [matchP, setMatchP] = useState<string>('THE');
  const [matchK, setMatchK] = useState<number>(1);
  const [matchL, setMatchL] = useState<number>(1);
  const [matchStatus, setMatchStatus] = useState<'idle' | 'testing' | 'mismatch' | 'success' | 'failure'>('idle');
  const [totalComps, setTotalComps] = useState<number>(0);

  const maxK = Math.max(1, matchT.length - matchP.length + 1);

  const resetMatcher = () => {
    setMatchK(1);
    setMatchL(1);
    setMatchStatus('idle');
    setTotalComps(0);
  };

  const stepMatcher = () => {
    if (matchStatus === 'success' || matchStatus === 'failure') return;

    if (matchStatus === 'idle') {
      setMatchK(1);
      setMatchL(1);
      setMatchStatus('testing');
      setTotalComps(1);
      return;
    }

    // Current characters
    const pChar = matchP[matchL - 1];
    const tChar = matchT[matchK + matchL - 2];

    if (pChar === tChar) {
      // Character matches
      if (matchL === matchP.length) {
        setMatchStatus('success');
      } else {
        setMatchL((prev) => prev + 1);
        setTotalComps((prev) => prev + 1);
        setMatchStatus('testing');
      }
    } else {
      // Mismatch
      if (matchK >= maxK) {
        setMatchStatus('failure');
      } else {
        setMatchK((prev) => prev + 1);
        setMatchL(1);
        setTotalComps((prev) => prev + 1);
        setMatchStatus('testing');
      }
    }
  };

  // Two-pointer in-place reversal
  const [tpInput, setTpInput] = useState<string>('ALGORITHM');
  const [tpChars, setTpChars] = useState<string[]>(() => 'ALGORITHM'.split(''));
  const [tpLeft, setTpLeft] = useState<number>(0);
  const [tpRight, setTpRight] = useState<number>(8);
  const [tpDone, setTpDone] = useState<boolean>(false);

  const resetTp = (text = tpInput) => {
    const arr = text.split('');
    setTpChars(arr);
    setTpLeft(0);
    setTpRight(Math.max(0, arr.length - 1));
    setTpDone(false);
  };

  const stepTp = () => {
    if (tpLeft >= tpRight) {
      setTpDone(true);
      return;
    }
    const nextChars = [...tpChars];
    const temp = nextChars[tpLeft];
    nextChars[tpLeft] = nextChars[tpRight];
    nextChars[tpRight] = temp;
    setTpChars(nextChars);
    const nLeft = tpLeft + 1;
    const nRight = tpRight - 1;
    setTpLeft(nLeft);
    setTpRight(nRight);
    if (nLeft >= nRight) setTpDone(true);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs space-y-4">
      {/* Header & Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
          <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
            String Processing & Algorithms Laboratory
          </h4>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
          <button
            onClick={() => setActiveTab('storage')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'storage'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            3 Storage Models
          </button>
          <button
            onClick={() => setActiveTab('operations')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'operations'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Primitive Ops
          </button>
          <button
            onClick={() => setActiveTab('wordProcessing')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'wordProcessing'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Word Processing
          </button>
          <button
            onClick={() => setActiveTab('algorithms')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'algorithms'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Algorithm 3.1 & 3.2
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Pattern Matching (3.3)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 3 CLASSIC MEMORY STORAGE STRUCTURES (Lipschutz Section 3.3)       */}
      {/* ========================================================================= */}
      {activeTab === 'storage' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] dark:bg-[#181614] p-3 rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Storage Model:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setStorageModel('fixed')}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    storageModel === 'fixed'
                      ? 'bg-[#991B1B] text-white font-bold'
                      : 'bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E]'
                  }`}
                >
                  (1) Fixed-Length (80-col) & POINT
                </button>
                <button
                  onClick={() => setStorageModel('variable')}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    storageModel === 'variable'
                      ? 'bg-[#991B1B] text-white font-bold'
                      : 'bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E]'
                  }`}
                >
                  (2) Variable-Length (Sentinel/Header)
                </button>
                <button
                  onClick={() => setStorageModel('linked')}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    storageModel === 'linked'
                      ? 'bg-[#991B1B] text-white font-bold'
                      : 'bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E]'
                  }`}
                >
                  (3) Linked Storage (4 chars/node)
                </button>
              </div>
            </div>

            {storageModel === 'fixed' && (
              <label className="flex items-center gap-1.5 text-xs font-mono cursor-pointer text-[#1A1A1A] dark:text-[#EDE8DF]">
                <input
                  type="checkbox"
                  checked={usePointerArray}
                  onChange={(e) => setUsePointerArray(e.target.checked)}
                  className="rounded accent-[#991B1B]"
                />
                <span>Enable POINT Pointer Array (Fig. 3.3)</span>
              </label>
            )}
          </div>

          {/* Model 1: Fixed-Length & Pointer Array */}
          {storageModel === 'fixed' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs font-mono text-amber-900 dark:text-amber-200">
                <strong>Lipschutz Section 3.3 Concept:</strong> Each record has a rigid fixed length of 80 characters.
                {usePointerArray ? (
                  <span> With the <strong>POINT array</strong>, records can live in arbitrary memory locations; inserting a new record requires updating only the pointer list rather than moving physical records.</span>
                ) : (
                  <span> Without a pointer array, records sit in consecutive 80-byte blocks (Addr = Base + (k-1)*80). Wasted blanks are shown in light dashed boxes.</span>
                )}
              </div>

              <div className="space-y-2">
                {fixedRecords.map((rec, idx) => {
                  const len = rec.text.length;
                  const wasted = Math.max(0, 80 - len);
                  return (
                    <div
                      key={rec.id}
                      className="p-2.5 rounded-lg border border-[#E5E2D9] dark:border-[#38332B] bg-white dark:bg-[#201D1A] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        {usePointerArray ? (
                          <div className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold">
                            POINT[{rec.id}] &rarr; {rec.addr}
                          </div>
                        ) : (
                          <div className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                            Addr {rec.addr}
                          </div>
                        )}
                        <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF] truncate max-w-xs sm:max-w-md">
                          "{rec.text}"
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#88847C] dark:text-[#78716C] shrink-0">
                        <span>Valid: <strong className="text-emerald-600">{len} chars</strong></span>
                        <span>Wasted Blanks: <strong className="text-rose-600">{wasted} spaces</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Model 2: Variable-Length with Fixed Maximum */}
          {storageModel === 'variable' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-stone-50 dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Method:</span>
                  <button
                    onClick={() => setVariableMode('sentinel')}
                    className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                      variableMode === 'sentinel' ? 'bg-[#991B1B] text-white font-bold' : 'bg-white dark:bg-[#201D1A] text-[#66625B]'
                    }`}
                  >
                    (a) Sentinel Marker ($$ or \0)
                  </button>
                  <button
                    onClick={() => setVariableMode('lengthHeader')}
                    className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                      variableMode === 'lengthHeader' ? 'bg-[#991B1B] text-white font-bold' : 'bg-white dark:bg-[#201D1A] text-[#66625B]'
                    }`}
                  >
                    (b) Explicit Length Header (Pascal / POINT)
                  </button>
                </div>
                <input
                  type="text"
                  value={variableText}
                  onChange={(e) => setVariableText(e.target.value.slice(0, 30))}
                  placeholder="Enter text..."
                  className="px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                />
              </div>

              {/* Visualization Buffer */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
                <div className="text-xs font-mono text-[#66625B] dark:text-[#A8A29E] flex justify-between">
                  <span>Physical Memory Allocation Buffer (Max 32 slots):</span>
                  <span>Actual Length: <strong className="text-[#991B1B] dark:text-[#EF4444]">{variableText.length}</strong></span>
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-2 pt-1">
                  {variableMode === 'lengthHeader' && (
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-[10px] font-mono text-blue-600 mb-1">Header</span>
                      <div className="w-12 h-12 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/40 flex flex-col items-center justify-center">
                        <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
                          LEN={variableText.length}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-blue-600 mt-1">[0]</span>
                    </div>
                  )}

                  {variableText.split('').map((ch, idx) => (
                    <div key={idx} className="flex flex-col items-center shrink-0">
                      <span className="text-[10px] font-mono text-stone-400 mb-1">[{idx + (variableMode === 'lengthHeader' ? 1 : 0)}]</span>
                      <div className="w-10 h-12 rounded-lg border border-[#E5E2D9] dark:border-[#38332B] bg-[#FAF8F5] dark:bg-[#181614] flex items-center justify-center">
                        <span className="text-sm font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                          {ch === ' ' ? '□' : ch}
                        </span>
                      </div>
                    </div>
                  ))}

                  {variableMode === 'sentinel' && (
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-[10px] font-mono text-rose-500 mb-1">Sentinel</span>
                      <div className="w-12 h-12 rounded-lg border-2 border-dashed border-rose-500 bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center">
                        <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-300">
                          $$ (\0)
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-rose-500 mt-1">[End]</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Model 3: Linked Storage (Fig 3.9) */}
          {storageModel === 'linked' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-50 dark:bg-[#181614] rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF]">
                  <strong>Lipschutz Fig 3.9:</strong> "A THING OF BEAUTY IS A JOY FOREVER." stored with 4 chars per node.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLinkedStepIdx((prev) => (prev + 1) % linkedNodes.length)}
                    className="px-3 py-1.5 rounded-lg bg-[#991B1B] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#7F1D1D]"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Next Node &rarr;</span>
                  </button>
                  <button
                    onClick={() => setLinkedStepIdx(0)}
                    className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-stone-600 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Linked Nodes Trace */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold">
                    START = 4
                  </span>
                  <span className="text-[#66625B] dark:text-[#A8A29E]">
                    Current Pointer: Node #{linkedNodes[linkedStepIdx].id}
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
                  {linkedNodes.map((node, idx) => {
                    const isCurrent = idx === linkedStepIdx;
                    const isTraversed = idx < linkedStepIdx;
                    return (
                      <div key={node.id} className="flex items-center shrink-0">
                        <div
                          className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            isCurrent
                              ? 'border-[#991B1B] bg-rose-50 dark:bg-rose-950/40 ring-2 ring-[#991B1B]/30 scale-105'
                              : isTraversed
                              ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                              : 'border-[#E5E2D9] dark:border-[#38332B] bg-[#FAF8F5] dark:bg-[#181614]'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-stone-400">Node #{node.id}</span>
                          <div className="px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-stone-200 dark:border-stone-700 font-mono font-bold text-xs tracking-wider">
                            '{node.chars}'
                          </div>
                          <span className="text-[10px] font-mono font-bold text-blue-600">
                            LINK: {node.link === 0 ? '0 (Null)' : node.link}
                          </span>
                        </div>
                        {idx < linkedNodes.length - 1 && (
                          <ArrowRight className="w-4 h-4 mx-1 text-stone-400 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono">
                  <span className="text-stone-500">Decoded String So Far: </span>
                  <strong className="text-emerald-700 dark:text-emerald-300">
                    "{linkedNodes.slice(0, linkedStepIdx + 1).map((n) => n.chars).join('')}"
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: THE 4 PRIMITIVE OPERATIONS (Lipschutz Section 3.5)                */}
      {/* ========================================================================= */}
      {activeTab === 'operations' && (
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-stone-700 dark:text-stone-300">
            <strong>The 4 Primitive Building Blocks:</strong> In string processing, the basic unit of access is not an isolated character, but consecutive substrings. Test all 4 primitives live:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Op 1: LENGTH & SUBSTRING */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                <Scissors className="w-4 h-4 text-[#991B1B]" />
                <span>1. LENGTH & 2. SUBSTRING(S, K, L)</span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-500">Target String S:</label>
                <input
                  type="text"
                  value={opStringS}
                  onChange={(e) => setOpStringS(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                />
                <div className="text-[11px] font-mono text-stone-500 mt-1">
                  LENGTH(S) = <strong className="text-emerald-600">{opStringS.length}</strong> characters (including spaces)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-mono text-stone-500">Initial Position K (1-based):</label>
                  <input
                    type="number"
                    min={1}
                    max={opStringS.length}
                    value={subInitial}
                    onChange={(e) => setSubInitial(parseInt(e.target.value) || 1)}
                    className="w-full mt-1 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-stone-500">Length L:</label>
                  <input
                    type="number"
                    min={0}
                    max={opStringS.length}
                    value={subLength}
                    onChange={(e) => setSubLength(parseInt(e.target.value) || 0)}
                    className="w-full mt-1 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-mono">
                <div className="text-emerald-800 dark:text-emerald-300">
                  SUBSTRING('{opStringS}', {subInitial}, {subLength}) =
                </div>
                <div className="text-base font-bold text-emerald-900 dark:text-emerald-100 mt-1">
                  '{evaluatedSubstring}'
                </div>
              </div>
            </div>

            {/* Op 2: INDEX & CONCAT */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                <Search className="w-4 h-4 text-blue-600" />
                <span>3. INDEX(T, P) & 4. CONCAT(S1, S2)</span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-500">Text T & Pattern P:</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <input
                    type="text"
                    value={indexText}
                    onChange={(e) => setIndexText(e.target.value)}
                    placeholder="Text T..."
                    className="px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={indexPattern}
                    onChange={(e) => setIndexPattern(e.target.value)}
                    placeholder="Pattern P..."
                    className="px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs font-mono mt-2">
                  <span>INDEX('{indexText}', '{indexPattern}') = </span>
                  <strong className={evaluatedIndex > 0 ? 'text-blue-700 dark:text-blue-300' : 'text-rose-600'}>
                    {evaluatedIndex} {evaluatedIndex === 0 ? '(0 = NOT FOUND)' : '(1-based)'}
                  </strong>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>CONCATENATION (S1 // S2):</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={concatWithSpace}
                      onChange={(e) => setConcatWithSpace(e.target.checked)}
                      className="accent-[#991B1B]"
                    />
                    <span>Include space ('□')</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <input
                    type="text"
                    value={concatS1}
                    onChange={(e) => setConcatS1(e.target.value)}
                    className="px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={concatS2}
                    onChange={(e) => setConcatS2(e.target.value)}
                    className="px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                </div>
                <div className="p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-mono mt-2">
                  <span>Result: </span>
                  <strong className="text-[#1A1A1A] dark:text-[#EDE8DF]">'{evaluatedConcat}'</strong>
                  <span className="text-stone-500 ml-2">(Length: {evaluatedConcat.length})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: HIGH-LEVEL WORD PROCESSING & BOOK PROBLEMS LAB                     */}
      {/* ========================================================================= */}
      {activeTab === 'wordProcessing' && <WordProcessingLab />}

      {/* ========================================================================= */}
      {/* TAB 4: STEP-BY-STEP ALGORITHM SIMULATOR (Algorithm 3.1 & 3.2)             */}
      {/* ========================================================================= */}
      {activeTab === 'algorithms' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] dark:bg-[#181614] p-3 rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Algorithm:</span>
              <button
                onClick={() => {
                  setSimAlgo('algo31');
                  resetA31();
                }}
                className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                  simAlgo === 'algo31' ? 'bg-[#991B1B] text-white font-bold' : 'bg-white dark:bg-[#201D1A] text-stone-600'
                }`}
              >
                Algorithm 3.1: Delete All Occurrences (Phantom Pattern Trace)
              </button>
              <button
                onClick={() => {
                  setSimAlgo('algo32');
                  resetA32();
                }}
                className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                  simAlgo === 'algo32' ? 'bg-[#991B1B] text-white font-bold' : 'bg-white dark:bg-[#201D1A] text-stone-600'
                }`}
              >
                Algorithm 3.2: Replace All (Infinite Loop Trap)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={simAlgo === 'algo31' ? stepA31 : stepA32}
                disabled={simAlgo === 'algo31' ? a31Done : a32Done}
                className="px-3 py-1.5 rounded-lg bg-[#991B1B] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#7F1D1D] disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Step Algorithm &rarr;</span>
              </button>
              <button
                onClick={simAlgo === 'algo31' ? () => resetA31() : () => resetA32()}
                className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-stone-600 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Algo 3.1 Simulator */}
          {simAlgo === 'algo31' && (
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span>Preset: </span>
                  <button
                    onClick={() => {
                      setA31Text('XAAABBB');
                      setA31Pattern('AB');
                      resetA31('XAAABBB', 'AB');
                    }}
                    className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[#1A1A1A] dark:text-[#EDE8DF] hover:bg-stone-200 cursor-pointer"
                  >
                    Classic Book Example 3.7b ('XAAABBB', 'AB')
                  </button>
                  <button
                    onClick={() => {
                      setA31Text('XABYABZ');
                      setA31Pattern('AB');
                      resetA31('XABYABZ', 'AB');
                    }}
                    className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[#1A1A1A] dark:text-[#EDE8DF] hover:bg-stone-200 cursor-pointer"
                  >
                    Simple Example 3.7a ('XABYABZ', 'AB')
                  </button>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">
                  {a31Done ? 'Status: Terminated (K = 0)' : 'Status: Running loop...'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono space-y-1">
                <div>Current Text T: <strong className="text-base text-[#991B1B] dark:text-[#EF4444] font-bold">"{a31CurrentText}"</strong></div>
                <div>Pattern P: <strong className="text-stone-800 dark:text-stone-200">"{a31Pattern}"</strong></div>
              </div>

              {/* Steps Log */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-stone-500">Step-by-Step Execution Log:</div>
                {a31Steps.length === 0 ? (
                  <div className="text-xs font-mono text-stone-400 italic">
                    Press "Step Algorithm" to begin tracing Algorithm 3.1...
                  </div>
                ) : (
                  a31Steps.map((step) => (
                    <div
                      key={step.pass}
                      className="p-2.5 rounded-lg border border-[#E5E2D9] dark:border-[#38332B] bg-[#FAF8F5] dark:bg-[#181614] text-xs font-mono space-y-1"
                    >
                      <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                        <span className="font-bold text-[#991B1B] dark:text-[#EF4444]">Iteration {step.pass}:</span>
                        <span>Found '{a31Pattern}' at index {step.foundAt}</span>
                      </div>
                      <div className="text-stone-800 dark:text-stone-200">
                        "{step.textBefore}" &rarr; <strong className="text-emerald-600 dark:text-emerald-400">"{step.textAfter}"</strong>
                      </div>
                      <div className="text-[11px] text-amber-700 dark:text-amber-400">
                        {step.note}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Algo 3.2 Simulator */}
          {simAlgo === 'algo32' && (
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span>Preset: </span>
                  <button
                    onClick={() => {
                      setA32Text('XABYABZ');
                      setA32P('AB');
                      setA32Q('C');
                      resetA32('XABYABZ', 'AB', 'C');
                    }}
                    className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[#1A1A1A] dark:text-[#EDE8DF] hover:bg-stone-200 cursor-pointer"
                  >
                    Normal Terminating ('XABYABZ', 'AB' &rarr; 'C')
                  </button>
                  <button
                    onClick={() => {
                      setA32Text('XAY');
                      setA32P('A');
                      setA32Q('AB');
                      resetA32('XAY', 'A', 'AB');
                    }}
                    className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-200 cursor-pointer font-bold"
                  >
                    Infinite Loop Trap ('XAY', 'A' &rarr; 'AB')
                  </button>
                </div>
              </div>

              {a32Q.includes(a32P) && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs font-mono text-rose-800 dark:text-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Exam Warning (Infinite Loop Trap):</strong> Target pattern P ('{a32P}') is a substring of replacement Q ('{a32Q}').
                    Every replacement puts '{a32P}' right back into the string! In textbooks without an index jump, this loop runs forever. (Safety capped at 8 steps).
                  </div>
                </div>
              )}

              <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono space-y-1">
                <div>Current Text T: <strong className="text-base text-blue-600 font-bold">"{a32CurrentText}"</strong></div>
                <div>Replace '{a32P}' with '{a32Q}'</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-stone-500">Step Log:</div>
                {a32Steps.map((step) => (
                  <div
                    key={step.pass}
                    className="p-2 rounded-lg border border-[#E5E2D9] dark:border-[#38332B] bg-[#FAF8F5] dark:bg-[#181614] text-xs font-mono flex items-center justify-between"
                  >
                    <span>Pass {step.pass}: Replaced at index {step.foundAt}</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">
                      "{step.textBefore}" &rarr; <span className="text-blue-600">"{step.textAfter}"</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PATTERN MATCHING & TWO-POINTER REVERSAL (Lipschutz 3.7)             */}
      {/* ========================================================================= */}
      {activeTab === 'matching' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Algorithm 3.3 Naive Pattern Matching */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-[#991B1B] dark:text-[#EF4444]">
                  Algorithm 3.3: Naive Window Search
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={stepMatcher}
                    disabled={matchStatus === 'success' || matchStatus === 'failure'}
                    className="px-2.5 py-1 rounded bg-[#991B1B] text-white text-xs font-mono font-bold cursor-pointer disabled:opacity-50"
                  >
                    Step (K={matchK}, L={matchL})
                  </button>
                  <button
                    onClick={resetMatcher}
                    className="p-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div>
                  <span className="text-stone-400">Text T (Length S = {matchT.length}):</span>
                  <input
                    type="text"
                    value={matchT}
                    onChange={(e) => {
                      setMatchT(e.target.value);
                      resetMatcher();
                    }}
                    className="w-full px-2 py-1 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono mt-0.5"
                  />
                </div>
                <div>
                  <span className="text-stone-400">Pattern P (Length R = {matchP.length}):</span>
                  <input
                    type="text"
                    value={matchP}
                    onChange={(e) => {
                      setMatchP(e.target.value);
                      resetMatcher();
                    }}
                    className="w-full px-2 py-1 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono mt-0.5"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span>MAX = S - R + 1:</span>
                  <strong className="text-[#1A1A1A] dark:text-[#EDE8DF]">{maxK}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Comparisons:</span>
                  <strong className="text-blue-600">{totalComps}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <strong className={matchStatus === 'success' ? 'text-emerald-600' : matchStatus === 'failure' ? 'text-rose-600' : 'text-amber-600'}>
                    {matchStatus === 'success' ? `SUCCESS! INDEX = ${matchK}` : matchStatus === 'failure' ? 'FAILURE! INDEX = 0' : `Testing window K = ${matchK}`}
                  </strong>
                </div>
              </div>
            </div>

            {/* In-Place Two-Pointer Reversal */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  Two-Pointer In-Place Reversal
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={stepTp}
                    disabled={tpDone}
                    className="px-2.5 py-1 rounded bg-emerald-700 text-white text-xs font-mono font-bold cursor-pointer disabled:opacity-50"
                  >
                    Swap &amp; Step
                  </button>
                  <button
                    onClick={() => resetTp()}
                    className="p-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-stone-400">Word to Reverse:</span>
                <input
                  type="text"
                  value={tpInput}
                  onChange={(e) => {
                    setTpInput(e.target.value.slice(0, 14));
                    resetTp(e.target.value.slice(0, 14));
                  }}
                  className="w-full px-2 py-1 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono mt-0.5"
                />
              </div>

              {/* Character Cells */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1">
                {tpChars.map((ch, idx) => {
                  const isL = idx === tpLeft;
                  const isR = idx === tpRight;
                  return (
                    <div key={idx} className="flex flex-col items-center shrink-0">
                      <span className="text-[9px] font-mono text-stone-400">[{idx}]</span>
                      <div
                        className={`w-10 h-11 rounded-lg border flex items-center justify-center font-mono font-bold text-sm ${
                          isL
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-400'
                            : isR
                            ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 ring-2 ring-rose-400'
                            : 'border-[#E5E2D9] dark:border-[#38332B] bg-[#FAF8F5] dark:bg-[#181614] text-[#1A1A1A] dark:text-[#EDE8DF]'
                        }`}
                      >
                        {ch}
                      </div>
                      <span className="text-[9px] font-mono font-bold mt-1">
                        {isL ? 'Left (L)' : isR ? 'Right (R)' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono flex justify-between">
                <span>Result: <strong className="text-emerald-700 dark:text-emerald-300">"{tpChars.join('')}"</strong></span>
                <span className="text-stone-500">O(N) time, O(1) space</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
