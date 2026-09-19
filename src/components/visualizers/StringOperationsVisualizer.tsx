import React, { useState, useMemo } from 'react';
import { Binary, Play, RotateCcw, FastForward, Check, AlertCircle, ArrowRight, Table, Search } from 'lucide-react';

interface StringOperationsVisualizerProps {
  initialText?: string;
  initialPattern?: string;
  initialTab?: 'kmp' | 'replace' | 'rabin-karp';
}

export const StringOperationsVisualizer: React.FC<StringOperationsVisualizerProps> = ({
  initialText = 'ABABDABACDABABCABAB',
  initialPattern = 'ABABCABAB',
  initialTab = 'kmp'
}) => {
  const [activeTab, setActiveTab] = useState<'kmp' | 'replace' | 'rabin-karp'>(initialTab);

  // KMP State
  const [text, setText] = useState<string>(initialText);
  const [pattern, setPattern] = useState<string>(initialPattern);
  const [iPtr, setIPtr] = useState<number>(0);
  const [jPtr, setJPtr] = useState<number>(0);
  const [matches, setMatches] = useState<number[]>([]);
  const [kmpLog, setKmpLog] = useState<string[]>([]);
  const [kmpStatus, setKmpStatus] = useState<'idle' | 'matching' | 'mismatch' | 'found' | 'done'>('idle');

  // REPLACE State
  const [replText, setReplText] = useState<string>('AAABBB');
  const [replPat, setReplPat] = useState<string>('AB');
  const [replStr, setReplStr] = useState<string>('X');
  const [replResult, setReplResult] = useState<string>('');
  const [replSteps, setReplSteps] = useState<string[]>([]);

  // Compute KMP pi-table (LPS)
  const piTable = useMemo(() => {
    const M = pattern.length;
    const pi = new Array(M).fill(0);
    let j = 0;
    for (let i = 1; i < M; i++) {
      while (j > 0 && pattern[i] !== pattern[j]) {
        j = pi[j - 1];
      }
      if (pattern[i] === pattern[j]) {
        j++;
      }
      pi[i] = j;
    }
    return pi;
  }, [pattern]);

  // Reset KMP
  const resetKmp = () => {
    setIPtr(0);
    setJPtr(0);
    setMatches([]);
    setKmpLog([]);
    setKmpStatus('idle');
  };

  // Step KMP
  const stepKmp = () => {
    if (pattern.length === 0 || text.length === 0) return;
    if (iPtr >= text.length) {
      setKmpStatus('done');
      return;
    }

    const currentI = iPtr;
    const currentJ = jPtr;

    if (text[currentI] === pattern[currentJ]) {
      // Match!
      const nextJ = currentJ + 1;
      const nextI = currentI + 1;

      if (nextJ === pattern.length) {
        const foundIndex = nextI - pattern.length;
        setMatches((prev) => [...prev, foundIndex]);
        setKmpLog((prev) => [
          ...prev,
          `Pattern matched completely at Text[${foundIndex}..${nextI - 1}]! Falling back j to pi[${nextJ - 1}] = ${piTable[nextJ - 1]}`
        ]);
        setIPtr(nextI);
        setJPtr(piTable[nextJ - 1]);
        setKmpStatus('found');
      } else {
        setKmpLog((prev) => [
          ...prev,
          `Match Text[${currentI}] ('${text[currentI]}') == Pat[${currentJ}] ('${pattern[currentJ]}'). Advance both i (${currentI + 1}), j (${nextJ}).`
        ]);
        setIPtr(nextI);
        setJPtr(nextJ);
        setKmpStatus('matching');
      }
    } else {
      // Mismatch!
      if (currentJ !== 0) {
        const fallbackJ = piTable[currentJ - 1];
        setKmpLog((prev) => [
          ...prev,
          `Mismatch: Text[${currentI}] ('${text[currentI]}') != Pat[${currentJ}] ('${pattern[currentJ]}'). Smart fallback: j <- pi[${currentJ - 1}] (${fallbackJ}). Text pointer i stays at ${currentI}!`
        ]);
        setJPtr(fallbackJ);
        setKmpStatus('mismatch');
      } else {
        setKmpLog((prev) => [
          ...prev,
          `Mismatch at Pat[0]: Text[${currentI}] ('${text[currentI]}') != Pat[0] ('${pattern[0]}'). Advance text pointer i to ${currentI + 1}.`
        ]);
        setIPtr(currentI + 1);
        setKmpStatus('mismatch');
      }
    }

    if (currentI + 1 >= text.length && jPtr < pattern.length) {
      // End of string check
    }
  };

  // Run full procedural replace
  const runReplaceSimulation = () => {
    if (!replPat || !replText) return;
    const steps: string[] = [];
    let current = replText;
    let pos = 0;
    let stepCount = 1;

    const delta = replStr.length - replPat.length;
    steps.push(`Initial Text: "${current}", Pattern: "${replPat}" (|PAT|=${replPat.length}), Replacement: "${replStr}" (|REP|=${replStr.length})`);
    steps.push(`Shift differential Delta = |REP| - |PAT| = ${delta} characters.`);

    while ((pos = current.indexOf(replPat, pos)) !== -1) {
      const before = current.slice(0, pos);
      const after = current.slice(pos + replPat.length);
      steps.push(`Step ${stepCount}: Found "${replPat}" at index ${pos}. Substitute with "${replStr}".`);
      current = before + replStr + after;
      pos += replStr.length;
      stepCount++;
      if (stepCount > 20) break; // Guard
    }

    if (stepCount === 1) {
      steps.push(`Pattern "${replPat}" was not found in the input text.`);
    } else {
      steps.push(`Finished replacement. Final string: "${current}"`);
    }

    setReplResult(current);
    setReplSteps(steps);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div className="flex items-center gap-2">
          <Binary className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24]" />
          <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
            Knuth-Morris-Pratt & Substring Operations Lab
          </h4>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
          <button
            onClick={() => setActiveTab('kmp')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'kmp'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            KMP π-Table & Search
          </button>
          <button
            onClick={() => setActiveTab('replace')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'replace'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            Procedural REPLACE(T, P, R)
          </button>
        </div>
      </div>

      {/* TAB 1: KMP SIMULATOR */}
      {activeTab === 'kmp' && (
        <div className="space-y-4">
          {/* Inputs & Presets */}
          <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF] shrink-0">Text T:</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    resetKmp();
                  }}
                  className="w-full px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF] focus:outline-none focus:border-[#B45309]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF] shrink-0">Pattern P:</label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => {
                    setPattern(e.target.value);
                    resetKmp();
                  }}
                  className="w-full px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF] focus:outline-none focus:border-[#B45309]"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-[#88847C] dark:text-[#78716C]">Quick Presets:</span>
              <button
                onClick={() => {
                  setText('AABAACAADAABAABA');
                  setPattern('AABA');
                  resetKmp();
                }}
                className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-medium hover:bg-amber-100 cursor-pointer"
              >
                Beginner: "AABA"
              </button>
              <button
                onClick={() => {
                  setText('ABABDABACDABABCABAB');
                  setPattern('ABABC');
                  resetKmp();
                }}
                className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-medium hover:bg-amber-100 cursor-pointer"
              >
                Beginner: "ABABC"
              </button>
              <button
                onClick={() => {
                  setText('AABAACAADAABAABA');
                  setPattern('AABAACAABAA');
                  resetKmp();
                }}
                className="px-2 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[11px] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] cursor-pointer"
              >
                CUET Exam: "AABAACAABAA"
              </button>
              <button
                onClick={() => {
                  setText('ABABDABACDABABCABAB');
                  setPattern('ABABCABAB');
                  resetKmp();
                }}
                className="px-2 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[11px] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] cursor-pointer"
              >
                "ABABCABAB"
              </button>
            </div>
          </div>

          {/* KMP π-Table (LPS Array) Display */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-[#B45309]" />
                KMP Prefix Failure Table (π-Table / LPS Array):
              </span>
              <span className="text-[#88847C] dark:text-[#78716C]">
                Length M = {pattern.length} (Computed in O(M) time)
              </span>
            </div>

            <div className="overflow-x-auto pb-1">
              <table className="min-w-full text-xs font-mono text-center border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E2D9] dark:border-[#38332B] text-[#88847C] dark:text-[#78716C]">
                    <th className="py-1 px-2 text-left">Index i</th>
                    {pattern.split('').map((_, idx) => (
                      <th key={idx} className="py-1 px-2 font-semibold">
                        {idx}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E2D9] dark:border-[#38332B]">
                    <td className="py-1.5 px-2 text-left font-bold text-[#66625B] dark:text-[#A8A29E]">P[i]</td>
                    {pattern.split('').map((ch, idx) => (
                      <td key={idx} className="py-1.5 px-2 font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                        {ch}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 text-left font-bold text-[#B45309] dark:text-[#FBBF24]">π[i] (LPS)</td>
                    {piTable.map((val, idx) => (
                      <td
                        key={idx}
                        className={`py-1.5 px-2 font-bold rounded ${
                          val > 0
                            ? 'bg-[#FEF3C7] dark:bg-[#78350F]/40 text-[#B45309] dark:text-[#FBBF24]'
                            : 'text-[#88847C] dark:text-[#78716C]'
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <button
                onClick={stepKmp}
                disabled={iPtr >= text.length || kmpStatus === 'done'}
                className="px-3 py-1.5 rounded-lg bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>
                  {iPtr >= text.length
                    ? 'Search Completed'
                    : `Compare Text[${iPtr}] ('${text[iPtr] || ''}') with Pat[${jPtr}] ('${pattern[jPtr] || ''}')`}
                </span>
              </button>
              <button
                onClick={resetKmp}
                className="p-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] cursor-pointer"
                title="Reset search"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#66625B] dark:text-[#A8A29E]">
                Text Pointer <strong>i = {iPtr}</strong>
              </span>
              <span className="text-[#66625B] dark:text-[#A8A29E]">
                Pattern Pointer <strong>j = {jPtr}</strong>
              </span>
              <span className="font-bold text-[#15803D] dark:text-[#4ADE80]">
                Matches: {matches.length > 0 ? `[${matches.join(', ')}]` : 'None yet'}
              </span>
            </div>
          </div>

          {/* Text & Pattern Visual Alignment */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3 overflow-x-auto">
            {/* Text Array */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#66625B] dark:text-[#A8A29E]">Text Array T:</span>
              <div className="flex items-center gap-1">
                {text.split('').map((ch, idx) => {
                  const isCurrent = idx === iPtr;
                  const isMatchedIndex = matches.some((m) => idx >= m && idx < m + pattern.length);

                  return (
                    <div key={idx} className="flex flex-col items-center shrink-0">
                      <div
                        className={`w-7 h-9 rounded border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                          isCurrent
                            ? 'border-[#B45309] dark:border-[#FBBF24] bg-[#FEF3C7] dark:bg-[#78350F]/50 text-[#B45309] dark:text-[#FDE68A] ring-2 ring-[#B45309]/30'
                            : isMatchedIndex
                            ? 'border-[#86EFAC] dark:border-[#059669] bg-[#F0FDF4] dark:bg-[#064E3B]/30 text-[#15803D] dark:text-[#4ADE80]'
                            : 'border-[#E5E2D9] dark:border-[#38332B] bg-white dark:bg-[#201D1A] text-[#1A1A1A] dark:text-[#EDE8DF]'
                        }`}
                      >
                        {ch}
                      </div>
                      <span className="text-[9px] font-mono text-[#88847C] dark:text-[#78716C] mt-0.5">
                        {idx}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pattern Array (Aligned under Text) */}
            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-mono text-[#66625B] dark:text-[#A8A29E]">
                Pattern Alignment (Shifted by {iPtr - jPtr} slots):
              </span>
              <div className="flex items-center gap-1">
                {/* Empty spacer slots for alignment */}
                {Array.from({ length: Math.max(0, iPtr - jPtr) }).map((_, idx) => (
                  <div key={idx} className="w-7 h-9 shrink-0" />
                ))}

                {pattern.split('').map((ch, idx) => {
                  const isCurrent = idx === jPtr;
                  return (
                    <div key={idx} className="flex flex-col items-center shrink-0">
                      <div
                        className={`w-7 h-9 rounded border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                          isCurrent
                            ? 'border-[#B45309] dark:border-[#FBBF24] bg-[#FEF3C7] dark:bg-[#78350F] text-[#B45309] dark:text-[#FDE68A] ring-2 ring-[#B45309]'
                            : 'border-[#E5E2D9] dark:border-[#38332B] bg-white dark:bg-[#201D1A] text-[#1A1A1A] dark:text-[#EDE8DF]'
                        }`}
                      >
                        {ch}
                      </div>
                      <span className="text-[9px] font-mono text-[#88847C] dark:text-[#78716C] mt-0.5">
                        j={idx}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Log */}
          {kmpLog.length > 0 && (
            <div className="p-3 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono space-y-1">
              <div className="flex items-center justify-between text-[#88847C] dark:text-[#78716C]">
                <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">KMP Step Execution Trace:</span>
                <span>{kmpLog.length} operations</span>
              </div>
              <p className="text-[#B45309] dark:text-[#FBBF24] font-semibold">
                {kmpLog[kmpLog.length - 1]}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROCEDURAL REPLACE SIMULATOR */}
      {activeTab === 'replace' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Text String (T):</label>
                <input
                  type="text"
                  value={replText}
                  onChange={(e) => setReplText(e.target.value)}
                  className="w-full mt-1 px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Target Pattern (P):</label>
                <input
                  type="text"
                  value={replPat}
                  onChange={(e) => setReplPat(e.target.value)}
                  className="w-full mt-1 px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Replacement (R):</label>
                <input
                  type="text"
                  value={replStr}
                  onChange={(e) => setReplStr(e.target.value)}
                  className="w-full mt-1 px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-[#1A1A1A] dark:text-[#EDE8DF]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-[#88847C] dark:text-[#78716C]">Exam Cases:</span>
                <button
                  onClick={() => {
                    setReplText('AAABBB');
                    setReplPat('AB');
                    setReplStr('X');
                  }}
                  className="px-2 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[11px] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] cursor-pointer"
                >
                  CUET "AAABBB", "AB" &rarr; "X"
                </button>
                <button
                  onClick={() => {
                    setReplText('banana');
                    setReplPat('an');
                    setReplStr('XYZ');
                  }}
                  className="px-2 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[11px] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] cursor-pointer"
                >
                  Expand: "banana", "an" &rarr; "XYZ"
                </button>
              </div>

              <button
                onClick={runReplaceSimulation}
                className="px-3 py-1.5 rounded-lg bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Execute REPLACE(T, P, R)</span>
              </button>
            </div>
          </div>

          {/* Replacement Execution Steps */}
          {replSteps.length > 0 && (
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Procedural Algorithm Output:
                </span>
                <span className="text-[#15803D] dark:text-[#4ADE80] font-bold">
                  Result: "{replResult}"
                </span>
              </div>

              <div className="space-y-1.5 bg-white dark:bg-[#201D1A] p-3 rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
                {replSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[#66625B] dark:text-[#A8A29E]">
                    <ArrowRight className="w-3 h-3 text-[#B45309] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
