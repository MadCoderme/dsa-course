import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Table as TableIcon,
  Layers,
  CheckCircle2,
  XCircle,
  Sliders,
  Sparkles,
  Info,
  Code2,
} from 'lucide-react';
import { MathText } from '../common/Latex';
import { CodeComplexityAnalyzer } from './CodeComplexityAnalyzer';

interface ComplexityVisualizerProps {
  focusedMode?: 'growthGraph' | 'growthTable' | 'asymptoticEnvelopes' | 'operationsMatrix' | 'codeAnalyzer';
  initialNotation?: 'bigO' | 'bigOmega' | 'bigTheta' | 'littleO' | 'littleOmega';
  compact?: boolean;
}

export const ComplexityVisualizer: React.FC<ComplexityVisualizerProps> = ({
  focusedMode = 'growthGraph',
  initialNotation = 'bigO',
  compact = false,
}) => {
  const [activeTab, setActiveTab] = useState<'growthGraph' | 'growthTable' | 'asymptoticEnvelopes' | 'operationsMatrix' | 'codeAnalyzer'>(
    focusedMode
  );

  // Growth graph state
  const [currentN, setCurrentN] = useState<number>(4);
  const [activeCurve, setActiveCurve] = useState<string | null>(null);

  // Asymptotic envelope state
  const [selectedNotation, setSelectedNotation] = useState<'bigO' | 'bigOmega' | 'bigTheta' | 'littleO' | 'littleOmega'>(
    initialNotation
  );
  const [constC, setConstC] = useState<number>(2);
  const [n0, setN0] = useState<number>(3);

  // Polynomial degree test
  const [polyDegree, setPolyDegree] = useState<number>(2);
  const [testK, setTestK] = useState<number>(2);

  // Growth curves configuration matching CUET Slide 7
  // x-axis: n in [2..8], y-axis: log scale from 1 to 4096 (2^0 to 2^12)
  const nValues = [2, 3, 4, 5, 6, 7, 8];

  const curves = useMemo(() => {
    const factorial = (num: number): number => {
      let r = 1;
      for (let i = 2; i <= num; i++) r *= i;
      return r;
    };

    return [
      {
        id: 'c1',
        name: '1',
        latex: '1',
        color: '#64748B',
        desc: 'Constant',
        calc: (_n: number) => 1,
      },
      {
        id: 'logn',
        name: 'log n',
        latex: '\\log n',
        color: '#0284C7',
        desc: 'Logarithmic',
        calc: (n: number) => Math.log2(n),
      },
      {
        id: 'n',
        name: 'n',
        latex: 'n',
        color: '#0D9488',
        desc: 'Linear',
        calc: (n: number) => n,
      },
      {
        id: 'nlogn',
        name: 'n log n',
        latex: 'n \\log n',
        color: '#16A34A',
        desc: 'Linearithmic',
        calc: (n: number) => n * Math.log2(n),
      },
      {
        id: 'n2',
        name: 'n²',
        latex: 'n^2',
        color: '#D97706',
        desc: 'Quadratic',
        calc: (n: number) => n * n,
      },
      {
        id: '2n',
        name: '2ⁿ',
        latex: '2^n',
        color: '#DC2626',
        desc: 'Exponential',
        calc: (n: number) => Math.pow(2, n),
      },
      {
        id: 'fact',
        name: 'n!',
        latex: 'n!',
        color: '#9333EA',
        desc: 'Factorial',
        calc: (n: number) => factorial(n),
      },
    ];
  }, []);

  // SVG coordinate mapping for Slide 7 curve graph
  // viewBox="0 0 600 320"
  // x: n from 2 to 8 -> margin left 70 to 560 (width 490, step ~81.6)
  // y: log2(val) from 0 to 12 (1 to 4096) -> height 250, bottom 280, top 30
  const svgWidth = 600;
  const svgHeight = 320;
  const marginLeft = 65;
  const marginRight = 40;
  const marginTop = 30;
  const marginBottom = 45;
  const plotWidth = svgWidth - marginLeft - marginRight;
  const plotHeight = svgHeight - marginTop - marginBottom;

  const mapX = (n: number) => marginLeft + ((n - 2) / (8 - 2)) * plotWidth;
  // Map value to y using log2 scale (clamped to 12 = 4096)
  const mapY = (val: number) => {
    const clamped = Math.max(1, Math.min(val, 4096));
    const logVal = Math.log2(clamped);
    return marginTop + plotHeight - (logVal / 12) * plotHeight;
  };

  return (
    <div className="space-y-4 font-sans text-[#1A1A1A] dark:text-[#EDE8DF]" id="complexity-visualizer">
      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] text-xs">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveTab('growthGraph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-serif font-semibold transition-all cursor-pointer ${
              activeTab === 'growthGraph'
                ? 'bg-white dark:bg-[#2C2824] text-[#991B1B] dark:text-[#EF4444] shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Rate of Growth Graph (Slide 7)</span>
          </button>

          <button
            onClick={() => setActiveTab('growthTable')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-serif font-semibold transition-all cursor-pointer ${
              activeTab === 'growthTable'
                ? 'bg-white dark:bg-[#2C2824] text-[#991B1B] dark:text-[#EF4444] shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Growth Comparison Table (Slide 6)</span>
          </button>

          <button
            onClick={() => setActiveTab('asymptoticEnvelopes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-serif font-semibold transition-all cursor-pointer ${
              activeTab === 'asymptoticEnvelopes'
                ? 'bg-white dark:bg-[#2C2824] text-[#991B1B] dark:text-[#EF4444] shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Asymptotic Envelopes Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('operationsMatrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-serif font-semibold transition-all cursor-pointer ${
              activeTab === 'operationsMatrix'
                ? 'bg-white dark:bg-[#2C2824] text-[#991B1B] dark:text-[#EF4444] shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Operations & Cases Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('codeAnalyzer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-serif font-semibold transition-all cursor-pointer ${
              activeTab === 'codeAnalyzer'
                ? 'bg-white dark:bg-[#2C2824] text-[#991B1B] dark:text-[#EF4444] shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Complexity Analyzer (Easy → Hard)</span>
          </button>
        </div>

        <span className="hidden sm:inline text-[11px] font-mono text-[#88847C] dark:text-[#78716C] pr-2">
          CUET CSE-241 Ch. 2
        </span>
      </div>

      {/* TAB 1: Rate of Growth Curve Graph (Slide 7) */}
      {activeTab === 'growthGraph' && (
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
                <span>Asymptotic Growth Curves in Cartesian Plane</span>
              </h4>
              <p className="text-xs text-[#66625B] dark:text-[#A8A29E]">
                Direct visual reproduction of CUET Slide 7 showing log-scale operational explosions as input size n increases from 2 to 8.
              </p>
            </div>

            {/* Slider for n */}
            <div className="flex items-center gap-3 bg-[#FAF8F5] dark:bg-[#221F1B] px-3 py-1.5 rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
              <span className="text-xs font-mono font-semibold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Input n = <strong className="text-[#991B1B] dark:text-[#EF4444] text-sm">{currentN}</strong>
              </span>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={currentN}
                onChange={(e) => setCurrentN(parseInt(e.target.value, 10))}
                className="w-24 accent-[#991B1B] cursor-pointer"
              />
            </div>
          </div>

          {/* SVG Canvas Plot */}
          <div className="w-full overflow-x-auto rounded-lg bg-[#FAF8F5]/60 dark:bg-[#141210] p-2 border border-[#E5E2D9] dark:border-[#38332B]">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto max-h-[380px] select-none font-mono"
            >
              {/* Horizontal Grid lines at powers of 2 (1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096) */}
              {[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096].map((val) => {
                const y = mapY(val);
                return (
                  <g key={val}>
                    <line
                      x1={marginLeft}
                      y1={y}
                      x2={svgWidth - marginRight}
                      y2={y}
                      stroke="currentColor"
                      className="text-[#E2DFD7] dark:text-[#2E2923]"
                      strokeWidth="1"
                      strokeDasharray={val === 1 || val === 4096 ? 'none' : '2,3'}
                    />
                    <text
                      x={marginLeft - 8}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="9"
                      fill="currentColor"
                      className="text-[#88847C] dark:text-[#78716C]"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Vertical Grid lines for n = 2, 3, 4, 5, 6, 7, 8 */}
              {nValues.map((n) => {
                const x = mapX(n);
                return (
                  <g key={n}>
                    <line
                      x1={x}
                      y1={marginTop}
                      x2={x}
                      y2={marginTop + plotHeight}
                      stroke="currentColor"
                      className="text-[#E2DFD7] dark:text-[#2E2923]"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={marginTop + plotHeight + 18}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fill="currentColor"
                      className={n === currentN ? 'text-[#991B1B] dark:text-[#EF4444]' : 'text-[#66625B] dark:text-[#A8A29E]'}
                    >
                      {n}
                    </text>
                  </g>
                );
              })}

              {/* Active n scanline */}
              <line
                x1={mapX(currentN)}
                y1={marginTop}
                x2={mapX(currentN)}
                y2={marginTop + plotHeight}
                stroke="#991B1B"
                strokeWidth="2"
                strokeDasharray="4,3"
                className="opacity-80"
              />

              {/* Curves Rendering */}
              {curves.map((curve) => {
                // Generate path string across points
                const pts: [number, number][] = [];
                for (let n = 2; n <= 8; n += 0.25) {
                  const val = curve.calc(n);
                  pts.push([mapX(n), mapY(val)]);
                }

                const pathD = pts.reduce((acc, [x, y], idx) => {
                  return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                }, '');

                const isHighlighted = activeCurve === curve.id;
                const activeVal = curve.calc(currentN);
                const activeX = mapX(currentN);
                const activeY = mapY(activeVal);

                return (
                  <g
                    key={curve.id}
                    onMouseEnter={() => setActiveCurve(curve.id)}
                    onMouseLeave={() => setActiveCurve(null)}
                    className="cursor-pointer transition-opacity"
                  >
                    <path
                      d={pathD}
                      fill="none"
                      stroke={curve.color}
                      strokeWidth={isHighlighted ? 3.5 : 2}
                      opacity={activeCurve && !isHighlighted ? 0.25 : 0.95}
                    />
                    {/* End Label on curve */}
                    <text
                      x={mapX(8) + 5}
                      y={mapY(curve.calc(8)) + 3}
                      fontSize="10"
                      fontWeight="bold"
                      fill={curve.color}
                      opacity={activeCurve && !isHighlighted ? 0.3 : 1}
                    >
                      {curve.name}
                    </text>

                    {/* Point on active N */}
                    <circle
                      cx={activeX}
                      cy={activeY}
                      r={isHighlighted ? 5 : 3.5}
                      fill={curve.color}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Inspection Grid at Current N */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-1">
            {curves.map((curve) => {
              const val = curve.calc(currentN);
              const isHighlighted = activeCurve === curve.id;
              const formattedVal = val >= 1000 ? val.toLocaleString() : val % 1 === 0 ? val : val.toFixed(2);

              return (
                <div
                  key={curve.id}
                  onMouseEnter={() => setActiveCurve(curve.id)}
                  onMouseLeave={() => setActiveCurve(null)}
                  className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                    isHighlighted
                      ? 'bg-white dark:bg-[#25221E] border-[#991B1B] dark:border-[#EF4444] shadow-xs'
                      : 'bg-[#FAF8F5] dark:bg-[#1E1B18] border-[#E5E2D9] dark:border-[#38332B]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#66625B] dark:text-[#A8A29E]">
                    <span className="font-bold" style={{ color: curve.color }}>{curve.name}</span>
                    <span>{curve.desc}</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-1">
                    {formattedVal} ops
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Growth Comparison Table (Slide 6) */}
      {activeTab === 'growthTable' && (
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-2xs">
          <div>
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1.5">
              <TableIcon className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
              <span>Standard Functions Rate of Growth Comparison Table</span>
            </h4>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E]">
              As compiled in CUET Chapter 2 Slide 6: Evaluating benchmark values across orders of magnitude from small instances to large inputs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E5E2D9] dark:border-[#38332B]">
            <table className="w-full text-xs font-mono text-center border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] dark:bg-[#221F1B] border-b border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF]">
                  <th className="py-2.5 px-3 font-bold border-r border-[#E5E2D9] dark:border-[#38332B]">n</th>
                  <th className="py-2.5 px-3 text-[#0284C7] border-r border-[#E5E2D9] dark:border-[#38332B]">log n</th>
                  <th className="py-2.5 px-3 text-[#0D9488] border-r border-[#E5E2D9] dark:border-[#38332B]">n</th>
                  <th className="py-2.5 px-3 text-[#16A34A] border-r border-[#E5E2D9] dark:border-[#38332B]">n log n</th>
                  <th className="py-2.5 px-3 text-[#D97706] border-r border-[#E5E2D9] dark:border-[#38332B]">n²</th>
                  <th className="py-2.5 px-3 text-[#EA580C] border-r border-[#E5E2D9] dark:border-[#38332B]">n³</th>
                  <th className="py-2.5 px-3 text-[#DC2626]">2ⁿ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2D9] dark:divide-[#38332B] text-[#2C2B29] dark:text-[#D6D0C5]">
                {/* Row n = 5 */}
                <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#201D1A]">
                  <td className="py-2 px-3 font-bold bg-[#FAF8F5]/50 dark:bg-[#1E1B18]/50 border-r border-[#E5E2D9] dark:border-[#38332B]">5</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">3</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">5</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">15</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">25</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">125</td>
                  <td className="py-2 px-3 font-bold text-[#DC2626]">32</td>
                </tr>

                {/* Row n = 10 */}
                <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#201D1A]">
                  <td className="py-2 px-3 font-bold bg-[#FAF8F5]/50 dark:bg-[#1E1B18]/50 border-r border-[#E5E2D9] dark:border-[#38332B]">10</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">4</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">40</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">100</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10³</td>
                  <td className="py-2 px-3 font-bold text-[#DC2626]">10³</td>
                </tr>

                {/* Row n = 100 */}
                <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#201D1A]">
                  <td className="py-2 px-3 font-bold bg-[#FAF8F5]/50 dark:bg-[#1E1B18]/50 border-r border-[#E5E2D9] dark:border-[#38332B]">100</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">7</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10²</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">700</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10⁴</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10⁶</td>
                  <td className="py-2 px-3 font-bold text-[#DC2626]">10³⁰</td>
                </tr>

                {/* Row n = 1000 */}
                <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#201D1A]">
                  <td className="py-2 px-3 font-bold bg-[#FAF8F5]/50 dark:bg-[#1E1B18]/50 border-r border-[#E5E2D9] dark:border-[#38332B]">1,000</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10³</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10⁴</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10⁶</td>
                  <td className="py-2 px-3 border-r border-[#E5E2D9] dark:border-[#38332B]">10⁹</td>
                  <td className="py-2 px-3 font-bold text-[#DC2626]">10³⁰⁰</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] text-xs flex items-start gap-2">
            <Info className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Key Exam Takeaway:</strong> Notice how for $n = 1,000$, logarithmic time requires only 10 operations, while quadratic takes $10^6$ operations, and exponential $2^n$ produces $10^{300}$ operations (far exceeding the $10^{80}$ atoms in the universe).
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Asymptotic Envelopes Lab (Slides 8 - 14) */}
      {activeTab === 'asymptoticEnvelopes' && (
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
                <span>Asymptotic Notation Definition & Threshold Crossover</span>
              </h4>
              <p className="text-xs text-[#66625B] dark:text-[#A8A29E]">
                Explore how constant factor C and threshold index n₀ establish formal bounds.
              </p>
            </div>

            {/* Notation selector */}
            <div className="flex flex-wrap gap-1 p-1 bg-[#FAF8F5] dark:bg-[#221F1B] rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono">
              {(['bigO', 'bigOmega', 'bigTheta', 'littleO', 'littleOmega'] as const).map((not) => {
                const labels = {
                  bigO: 'O(g(n))',
                  bigOmega: 'Ω(g(n))',
                  bigTheta: 'Θ(g(n))',
                  littleO: 'o(g(n))',
                  littleOmega: 'ω(g(n))',
                };
                return (
                  <button
                    key={not}
                    onClick={() => setSelectedNotation(not)}
                    className={`px-2.5 py-1 rounded cursor-pointer transition-all ${
                      selectedNotation === not
                        ? 'bg-[#991B1B] text-white font-bold'
                        : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white'
                    }`}
                  >
                    {labels[not]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Envelope Graphic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Control Column */}
            <div className="space-y-3 p-3.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] text-xs">
              <div className="space-y-1">
                <div className="font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Parameters:</div>
                <div className="space-y-2 pt-1">
                  <div>
                    <div className="flex justify-between font-mono">
                      <span>Threshold n₀:</span>
                      <span className="font-bold text-[#991B1B] dark:text-[#EF4444]">{n0}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={n0}
                      onChange={(e) => setN0(parseInt(e.target.value, 10))}
                      className="w-full accent-[#991B1B] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-mono">
                      <span>Constant C:</span>
                      <span className="font-bold text-[#991B1B] dark:text-[#EF4444]">{constC}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      step="0.5"
                      value={constC}
                      onChange={(e) => setConstC(parseFloat(e.target.value))}
                      className="w-full accent-[#991B1B] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Formula Definition Banner */}
              <div className="pt-2 border-t border-[#E5E2D9] dark:border-[#38332B] space-y-1.5 font-serif">
                <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Formal Definition:</span>
                {selectedNotation === 'bigO' && (
                  <p className="font-mono text-[11px] leading-relaxed text-[#2C2B29] dark:text-[#D6D0C5]">
                    0 ≤ f(n) ≤ C·g(n) for all n ≥ n₀
                  </p>
                )}
                {selectedNotation === 'bigOmega' && (
                  <p className="font-mono text-[11px] leading-relaxed text-[#2C2B29] dark:text-[#D6D0C5]">
                    0 ≤ C·g(n) ≤ f(n) for all n ≥ n₀
                  </p>
                )}
                {selectedNotation === 'bigTheta' && (
                  <p className="font-mono text-[11px] leading-relaxed text-[#2C2B29] dark:text-[#D6D0C5]">
                    0 ≤ C₁·g(n) ≤ f(n) ≤ C₂·g(n) for all n ≥ n₀
                  </p>
                )}
                {selectedNotation === 'littleO' && (
                  <p className="font-mono text-[11px] leading-relaxed text-[#2C2B29] dark:text-[#D6D0C5]">
                    0 ≤ f(n) &lt; C·g(n) for all C &gt; 0, n ≥ n₀ (lim = 0)
                  </p>
                )}
                {selectedNotation === 'littleOmega' && (
                  <p className="font-mono text-[11px] leading-relaxed text-[#2C2B29] dark:text-[#D6D0C5]">
                    0 ≤ C·g(n) &lt; f(n) for all C &gt; 0, n ≥ n₀ (lim = ∞)
                  </p>
                )}
              </div>
            </div>

            {/* Visual SVG Diagram */}
            <div className="md:col-span-2 rounded-lg bg-[#FAF8F5]/60 dark:bg-[#141210] p-3 border border-[#E5E2D9] dark:border-[#38332B] flex flex-col justify-center">
              <svg viewBox="0 0 400 180" className="w-full h-auto font-mono text-[10px]">
                {/* Axes */}
                <line x1="40" y1="150" x2="380" y2="150" stroke="#88847C" strokeWidth="1.5" />
                <line x1="40" y1="150" x2="40" y2="20" stroke="#88847C" strokeWidth="1.5" />
                <text x="380" y="165" textAnchor="end" fill="currentColor">n</text>
                <text x="30" y="25" textAnchor="end" fill="currentColor">f(n)</text>

                {/* n0 vertical marker */}
                {(() => {
                  const xN0 = 40 + (n0 / 6) * 300;
                  return (
                    <g>
                      <line x1={xN0} y1="20" x2={xN0} y2="150" stroke="#991B1B" strokeWidth="1.5" strokeDasharray="3,3" />
                      <rect x={xN0} y="20" width={380 - xN0} height="130" fill="#16A34A" fillOpacity="0.06" />
                      <text x={xN0} y="165" textAnchor="middle" fill="#991B1B" fontWeight="bold">n₀={n0}</text>
                      <text x={(xN0 + 380) / 2} y="35" textAnchor="middle" fill="#16A34A" fontSize="9">Valid Region (n ≥ n₀)</text>
                    </g>
                  );
                })()}

                {/* Bounding curves according to notation */}
                {selectedNotation === 'bigO' && (
                  <>
                    {/* C * g(n) upper bound */}
                    <path d="M 40 130 Q 200 80 370 30" fill="none" stroke="#2563EB" strokeWidth="2" />
                    <text x="370" y="25" fill="#2563EB" fontWeight="bold">C·g(n)</text>
                    {/* f(n) */}
                    <path d="M 40 145 Q 220 120 370 65" fill="none" stroke="#DC2626" strokeWidth="2" />
                    <text x="370" y="60" fill="#DC2626" fontWeight="bold">f(n)</text>
                  </>
                )}

                {selectedNotation === 'bigOmega' && (
                  <>
                    {/* f(n) upper */}
                    <path d="M 40 140 Q 200 70 370 25" fill="none" stroke="#DC2626" strokeWidth="2" />
                    <text x="370" y="20" fill="#DC2626" fontWeight="bold">f(n)</text>
                    {/* C * g(n) lower */}
                    <path d="M 40 148 Q 200 125 370 70" fill="none" stroke="#16A34A" strokeWidth="2" />
                    <text x="370" y="65" fill="#16A34A" fontWeight="bold">C·g(n)</text>
                  </>
                )}

                {selectedNotation === 'bigTheta' && (
                  <>
                    {/* C2 * g(n) */}
                    <path d="M 40 125 Q 200 65 370 20" fill="none" stroke="#2563EB" strokeWidth="1.5" />
                    <text x="370" y="16" fill="#2563EB" fontSize="9">C₂·g(n)</text>
                    {/* f(n) sandwiched */}
                    <path d="M 40 135 Q 200 85 370 45" fill="none" stroke="#DC2626" strokeWidth="2" />
                    <text x="370" y="42" fill="#DC2626" fontWeight="bold">f(n)</text>
                    {/* C1 * g(n) */}
                    <path d="M 40 145 Q 200 115 370 70" fill="none" stroke="#16A34A" strokeWidth="1.5" />
                    <text x="370" y="68" fill="#16A34A" fontSize="9">C₁·g(n)</text>
                  </>
                )}

                {(selectedNotation === 'littleO' || selectedNotation === 'littleOmega') && (
                  <>
                    <path d="M 40 130 Q 200 70 370 25" fill="none" stroke="#7C3AED" strokeWidth="2" />
                    <text x="370" y="22" fill="#7C3AED" fontWeight="bold">Strict Bound (Non-tight)</text>
                    <path d="M 40 145 Q 200 130 370 85" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4,2" />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Slide 15: Polynomial Behavior Theorem Tester */}
          <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Asymptotic Behavior of Polynomials (Slide 15):
              </span>
              <div className="flex items-center gap-3 font-mono">
                <span>Degree d = {polyDegree}</span>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={polyDegree}
                  onChange={(e) => setPolyDegree(parseInt(e.target.value, 10))}
                  className="w-16 accent-[#991B1B]"
                />
                <span>Constant k = {testK}</span>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={testK}
                  onChange={(e) => setTestK(parseInt(e.target.value, 10))}
                  className="w-16 accent-[#991B1B]"
                />
              </div>
            </div>

            <div className="p-2 rounded bg-white dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <span>For polynomial f(n) of degree d={polyDegree}:</span>
              {testK >= polyDegree && (
                <span className="text-[#15803D] dark:text-[#4ADE80] font-bold">
                  ✓ Since k ≥ d ({testK} ≥ {polyDegree}) → f(n) = O(n^{testK})
                </span>
              )}
              {testK <= polyDegree && (
                <span className="text-[#0284C7] dark:text-[#38BDF8] font-bold">
                  ✓ Since k ≤ d ({testK} ≤ {polyDegree}) → f(n) = Ω(n^{testK})
                </span>
              )}
              {testK === polyDegree && (
                <span className="text-[#991B1B] dark:text-[#EF4444] font-bold">
                  ★ Since k = d ({testK} = {polyDegree}) → f(n) = Θ(n^{testK})
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Operations & Analysis Rules Matrix (Slides 3, 4, 5, 10) */}
      {activeTab === 'operationsMatrix' && (
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slide 5: Operations Counted vs Not Counted */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-3 text-xs">
              <div className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF] pb-1 border-b border-[#E5E2D9] dark:border-[#38332B] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80]" />
                <span>Time Complexity: Included Operations (Slide 5)</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                  <span className="font-mono font-bold">Assignment ( = ):</span>
                  <span className="text-[#66625B] dark:text-[#A8A29E]">Variable and pointer assignments</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                  <span className="font-mono font-bold">Mathematical ( +, -, *, /, % ):</span>
                  <span className="text-[#66625B] dark:text-[#A8A29E]">Basic arithmetic operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                  <span className="font-mono font-bold">Relational ( &gt;, &gt;=, &lt;, &lt;=, ==, != ):</span>
                  <span className="text-[#66625B] dark:text-[#A8A29E]">Condition checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                  <span className="font-mono font-bold">Function Call & Execution:</span>
                  <span className="text-[#66625B] dark:text-[#A8A29E]">Stack frame activation</span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-[#FEF2F2] dark:bg-[#450A0A]/30 border border-[#FECACA] dark:border-[#7F1D1D]/50 text-[#991B1B] dark:text-[#F87171] flex items-center gap-2 font-serif font-semibold">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Input & Output (I/O) are NOT considered for complexity calculation!</span>
              </div>
            </div>

            {/* Slide 10: Sequential vs Nested Rules */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-3 text-xs">
              <div className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF] pb-1 border-b border-[#E5E2D9] dark:border-[#38332B] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
                <span>Sequential vs Nested Composition Rules (Slide 10)</span>
              </div>

              <div className="space-y-3 font-serif">
                <div className="p-2.5 rounded bg-white dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] space-y-1">
                  <div className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">1. Sequential Sub-procedures:</div>
                  <p className="font-mono text-[11px] text-[#2C2B29] dark:text-[#D6D0C5]">
                    |(f₁ + f₂)(n)| = O(max(g₁(n), g₂(n)))
                  </p>
                  <p className="text-[11px] text-[#66625B] dark:text-[#A8A29E]">
                    The higher-order procedure dominates overall runtime.
                  </p>
                </div>

                <div className="p-2.5 rounded bg-white dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] space-y-1">
                  <div className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">2. Nested Sub-procedures:</div>
                  <p className="font-mono text-[11px] text-[#2C2B29] dark:text-[#D6D0C5]">
                    |(f₁ · f₂)(n)| = O(g₁(n) · g₂(n))
                  </p>
                  <p className="text-[11px] text-[#66625B] dark:text-[#A8A29E]">
                    Nested loops multiply the operational step counts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4: Best, Average, Worst Case Definitions */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-2 text-xs">
            <div className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF]">
              Three Investigative Cases (Slide 4):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-serif">
              <div className="p-2.5 rounded bg-white dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="font-bold text-[#15803D] dark:text-[#4ADE80]">Best Case:</div>
                <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
                  Minimum possible value of f(n) across all valid inputs of size n.
                </div>
              </div>

              <div className="p-2.5 rounded bg-white dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="font-bold text-[#0284C7] dark:text-[#38BDF8]">Average Case:</div>
                <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
                  Expected value E = ∑ nᵢ·pᵢ under assumed probabilistic distribution of input.
                </div>
              </div>

              <div className="p-2.5 rounded bg-white dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="font-bold text-[#991B1B] dark:text-[#EF4444]">Worst Case:</div>
                <div className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
                  Maximum possible value of f(n). Defines the operational upper bound ceiling.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Code Complexity Analyzer (Easy -> Hard) */}
      {activeTab === 'codeAnalyzer' && (
        <CodeComplexityAnalyzer />
      )}
    </div>
  );
};
