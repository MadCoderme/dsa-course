import React, { useState } from 'react';
import { Calculator, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Latex, MathText } from '../common/Latex';

export const AddressCalculator: React.FC = () => {
  const [dimensions, setDimensions] = useState<'1D' | '2D' | '3D' | 'special'>('3D');
  const [order, setOrder] = useState<'column' | 'row'>('column');
  const [specialType, setSpecialType] = useState<'lower_triangular' | 'upper_triangular' | 'tridiagonal'>('lower_triangular');

  // Parameters (Default set to classic CUET 2023 exam question: Y(3:10, 1:15, 10:20))
  const [base, setBase] = useState<number>(500);
  const [wordSize, setWordSize] = useState<number>(4);

  // 1D / 2D / 3D bounds
  const [l1, setL1] = useState<number>(3);
  const [u1, setU1] = useState<number>(10);
  const [iCoord, setICoord] = useState<number>(7);

  const [l2, setL2] = useState<number>(1);
  const [u2, setU2] = useState<number>(15);
  const [jCoord, setJCoord] = useState<number>(12);

  const [l3, setL3] = useState<number>(10);
  const [u3, setU3] = useState<number>(20);
  const [kCoord, setKCoord] = useState<number>(18);

  // Length calculations
  const d1 = u1 - l1 + 1;
  const d2 = u2 - l2 + 1;
  const d3 = u3 - l3 + 1;

  // Offsets and Address Calculation
  let calculatedAddress = 0;
  let offsetValue = 0;
  let formulaLatex = '';
  let stepByStepLatex: string[] = [];

  if (dimensions === '1D') {
    offsetValue = iCoord - l1;
    calculatedAddress = base + wordSize * offsetValue;
    formulaLatex = `\\text{Loc}(A[i]) = \\text{Base} + W \\cdot (i - L_1)`;
    stepByStepLatex = [
      `\\text{1. Dimension Length } D_1 = U_1 - L_1 + 1 = ${u1} - ${l1} + 1 = ${d1}`,
      `\\text{2. Element Subscript Offset } (i - L_1) = ${iCoord} - ${l1} = ${offsetValue}`,
      `\\text{3. Memory Address Calculation: }`,
      `\\text{Loc}(A[${iCoord}]) = ${base} + ${wordSize} \\cdot (${offsetValue}) = ${base} + ${wordSize * offsetValue} = \\mathbf{${calculatedAddress}} \\quad (\\text{0x}${calculatedAddress.toString(16).toUpperCase()})`
    ];
  } else if (dimensions === '2D') {
    if (order === 'column') {
      offsetValue = (iCoord - l1) + d1 * (jCoord - l2);
      calculatedAddress = base + wordSize * offsetValue;
      formulaLatex = `\\text{Loc}(A[i, j]) = \\text{Base} + W \\cdot \\left[ (i - L_1) + D_1 \\cdot (j - L_2) \\right]`;
      stepByStepLatex = [
        `\\text{1. Dimension Lengths: } D_1 = U_1 - L_1 + 1 = ${u1} - ${l1} + 1 = ${d1}, \\quad D_2 = U_2 - L_2 + 1 = ${u2} - ${l2} + 1 = ${d2}`,
        `\\text{2. Coordinate Offsets: } (i - L_1) = ${iCoord} - ${l1} = ${iCoord - l1}, \\quad (j - L_2) = ${jCoord} - ${l2} = ${jCoord - l2}`,
        `\\text{3. Total Element Offset: } \\text{Offset} = (${iCoord - l1}) + ${d1} \\cdot (${jCoord - l2}) = ${iCoord - l1} + ${d1 * (jCoord - l2)} = ${offsetValue}`,
        `\\text{4. Physical Memory Address: }`,
        `\\text{Loc}(A[${iCoord}, ${jCoord}]) = ${base} + ${wordSize} \\cdot ${offsetValue} = ${base} + ${wordSize * offsetValue} = \\mathbf{${calculatedAddress}} \\quad (\\text{0x}${calculatedAddress.toString(16).toUpperCase()})`
      ];
    } else {
      offsetValue = (jCoord - l2) + d2 * (iCoord - l1);
      calculatedAddress = base + wordSize * offsetValue;
      formulaLatex = `\\text{Loc}(A[i, j]) = \\text{Base} + W \\cdot \\left[ (j - L_2) + D_2 \\cdot (i - L_1) \\right]`;
      stepByStepLatex = [
        `\\text{1. Dimension Lengths: } D_1 = ${d1}, \\quad D_2 = ${d2}`,
        `\\text{2. Coordinate Offsets: } (i - L_1) = ${iCoord - l1}, \\quad (j - L_2) = ${jCoord - l2}`,
        `\\text{3. Row-Major Offset: } \\text{Offset} = (${jCoord - l2}) + ${d2} \\cdot (${iCoord - l1}) = ${offsetValue}`,
        `\\text{4. Physical Memory Address: } \\text{Loc}(A[${iCoord}, ${jCoord}]) = ${base} + ${wordSize} \\cdot ${offsetValue} = \\mathbf{${calculatedAddress}}`
      ];
    }
  } else if (dimensions === '3D') {
    if (order === 'column') {
      const inner = (jCoord - l2) + d2 * (kCoord - l3);
      offsetValue = (iCoord - l1) + d1 * inner;
      calculatedAddress = base + wordSize * offsetValue;
      formulaLatex = `\\text{Loc}(A[i, j, k]) = \\text{Base} + W \\cdot \\left[ (i - L_1) + D_1 \\cdot \\left( (j - L_2) + D_2 \\cdot (k - L_3) \\right) \\right]`;
      stepByStepLatex = [
        `\\text{1. Dimension Lengths: } D_1 = ${u1} - ${l1} + 1 = ${d1}, \\quad D_2 = ${u2} - ${l2} + 1 = ${d2}, \\quad D_3 = ${u3} - ${l3} + 1 = ${d3}`,
        `\\text{2. Coordinate Offsets: } (i - L_1) = ${iCoord - l1}, \\quad (j - L_2) = ${jCoord - l2}, \\quad (k - L_3) = ${kCoord - l3}`,
        `\\text{3. Nested Evaluation: } \\text{Inner} = (${jCoord - l2}) + ${d2} \\cdot (${kCoord - l3}) = ${jCoord - l2} + ${d2 * (kCoord - l3)} = ${inner}`,
        `\\text{4. Total Offset: } \\text{Offset} = (${iCoord - l1}) + ${d1} \\cdot (${inner}) = ${iCoord - l1} + ${d1 * inner} = ${offsetValue}`,
        `\\text{5. Final Physical Memory Address: }`,
        `\\text{Loc}(A[${iCoord}, ${jCoord}, ${kCoord}]) = ${base} + ${wordSize} \\cdot ${offsetValue} = ${base} + ${wordSize * offsetValue} = \\mathbf{${calculatedAddress}} \\quad (\\text{0x}${calculatedAddress.toString(16).toUpperCase()})`
      ];
    } else {
      const inner = (jCoord - l2) + d2 * (iCoord - l1);
      offsetValue = (kCoord - l3) + d3 * inner;
      calculatedAddress = base + wordSize * offsetValue;
      formulaLatex = `\\text{Loc}(A[i, j, k]) = \\text{Base} + W \\cdot \\left[ (k - L_3) + D_3 \\cdot \\left( (j - L_2) + D_2 \\cdot (i - L_1) \\right) \\right]`;
      stepByStepLatex = [
        `\\text{1. Dimension Lengths: } D_1 = ${d1}, \\quad D_2 = ${d2}, \\quad D_3 = ${d3}`,
        `\\text{2. Row-Major Total Offset: } \\text{Offset} = ${offsetValue}`,
        `\\text{3. Physical Address: } \\text{Loc} = ${base} + ${wordSize} \\cdot ${offsetValue} = \\mathbf{${calculatedAddress}}`
      ];
    }
  } else {
    // Special Matrices (Triangular / Tridiagonal)
    if (specialType === 'lower_triangular') {
      offsetValue = Math.floor((iCoord * (iCoord - 1)) / 2) + (jCoord - 1);
      calculatedAddress = base + wordSize * offsetValue;
      formulaLatex = `\\text{Loc}(A[i, j]) = \\text{Base} + W \\cdot \\left[ \\frac{i(i - 1)}{2} + (j - 1) \\right] \\quad (i \\ge j)`;
      stepByStepLatex = [
        `\\text{1. Lower Triangular 1D Array Mapping: Total elements in preceding } (i-1) \\text{ rows} = \\frac{i(i - 1)}{2}`,
        `\\text{2. Row Offset for } i = ${iCoord}: \\frac{${iCoord}(${iCoord} - 1)}{2} = \\frac{${iCoord * (iCoord - 1)}}{2} = ${Math.floor((iCoord * (iCoord - 1)) / 2)}`,
        `\\text{3. Add Column index } (j - 1) = ${jCoord - 1} \\implies \\text{Offset} = ${Math.floor((iCoord * (iCoord - 1)) / 2)} + ${jCoord - 1} = ${offsetValue}`,
        `\\text{4. Address: } \\text{Loc}(A[${iCoord}, ${jCoord}]) = ${base} + ${wordSize} \\cdot ${offsetValue} = \\mathbf{${calculatedAddress}}`
      ];
    } else if (specialType === 'upper_triangular') {
      offsetValue = Math.floor((jCoord * (jCoord - 1)) / 2) + (iCoord - 1);
      calculatedAddress = base + wordSize * offsetValue;
      formulaLatex = `\\text{Loc}(A[i, j]) = \\text{Base} + W \\cdot \\left[ \\frac{j(j - 1)}{2} + (i - 1) \\right] \\quad (j \\ge i)`;
      stepByStepLatex = [
        `\\text{1. Upper Triangular Column-Major Mapping: Offset} = \\frac{j(j-1)}{2} + (i-1)`,
        `\\text{2. Calculated Offset for } (i=${iCoord}, j=${jCoord}): \\text{Offset} = ${offsetValue}`,
        `\\text{3. Memory Address: } \\text{Loc} = ${base} + ${wordSize} \\cdot ${offsetValue} = \\mathbf{${calculatedAddress}}`
      ];
    } else {
      // Tridiagonal
      offsetValue = 2 * iCoord + jCoord - 3;
      calculatedAddress = base + wordSize * offsetValue;
      formulaLatex = `\\text{Loc}(A[i, j]) = \\text{Base} + W \\cdot (2i + j - 3) \\quad (|i - j| \\le 1)`;
      stepByStepLatex = [
        `\\text{1. Tridiagonal Matrix Compact Array Mapping: } \\text{Offset} = 2i + j - 3`,
        `\\text{2. For } i=${iCoord}, j=${jCoord}: \\text{Offset} = 2(${iCoord}) + ${jCoord} - 3 = ${2 * iCoord} + ${jCoord} - 3 = ${offsetValue}`,
        `\\text{3. Physical Address: } \\text{Loc} = ${base} + ${wordSize} \\cdot ${offsetValue} = \\mathbf{${calculatedAddress}}`
      ];
    }
  }

  return (
    <div className="space-y-6" id="address-calculator-container">
      <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E2D9] pb-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#B45309]" /> Array Memory Address Formula Solver (CUET Standard)
            </h2>
            <p className="text-xs text-[#66625B] mt-0.5 font-sans">
              Calculates 1D, 2D, 3D, and Special Matrix memory addresses with complete mathematical examination proofs.
            </p>
          </div>

          {/* Dimension Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB] border border-[#E5E2D9]">
            {(['1D', '2D', '3D', 'special'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDimensions(d)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  dimensions === d
                    ? 'bg-[#1A1A1A] text-white shadow-2xs'
                    : 'text-[#66625B] hover:text-[#1A1A1A]'
                }`}
              >
                {d === 'special' ? 'Triangular / Tridiagonal' : `${d} Array`}
              </button>
            ))}
          </div>
        </div>

        {/* Order Selector for 2D/3D */}
        {dimensions === '2D' || dimensions === '3D' ? (
          <div className="flex items-center gap-3">
            <span className="text-xs font-serif font-bold text-[#1A1A1A]">Memory Major:</span>
            <div className="flex items-center rounded-lg bg-[#FAF8F5] p-1 border border-[#E5E2D9]">
              <button
                onClick={() => setOrder('column')}
                className={`px-3 py-1 rounded text-xs font-serif font-semibold cursor-pointer transition-all ${
                  order === 'column' ? 'bg-[#991B1B] text-white shadow-2xs' : 'text-[#66625B] hover:text-[#1A1A1A]'
                }`}
              >
                Column-Major Order (CUET Standard Exam Style)
              </button>
              <button
                onClick={() => setOrder('row')}
                className={`px-3 py-1 rounded text-xs font-serif font-semibold cursor-pointer transition-all ${
                  order === 'row' ? 'bg-[#991B1B] text-white shadow-2xs' : 'text-[#66625B] hover:text-[#1A1A1A]'
                }`}
              >
                Row-Major Order
              </button>
            </div>
          </div>
        ) : dimensions === 'special' ? (
          <div className="flex items-center gap-3">
            <span className="text-xs font-serif font-bold text-[#1A1A1A]">Matrix Type:</span>
            <div className="flex items-center rounded-lg bg-[#FAF8F5] p-1 border border-[#E5E2D9]">
              <button
                onClick={() => setSpecialType('lower_triangular')}
                className={`px-3 py-1 rounded text-xs font-serif font-semibold cursor-pointer ${
                  specialType === 'lower_triangular' ? 'bg-[#991B1B] text-white' : 'text-[#66625B]'
                }`}
              >
                Lower Triangular
              </button>
              <button
                onClick={() => setSpecialType('upper_triangular')}
                className={`px-3 py-1 rounded text-xs font-serif font-semibold cursor-pointer ${
                  specialType === 'upper_triangular' ? 'bg-[#991B1B] text-white' : 'text-[#66625B]'
                }`}
              >
                Upper Triangular
              </button>
              <button
                onClick={() => setSpecialType('tridiagonal')}
                className={`px-3 py-1 rounded text-xs font-serif font-semibold cursor-pointer ${
                  specialType === 'tridiagonal' ? 'bg-[#991B1B] text-white' : 'text-[#66625B]'
                }`}
              >
                Tridiagonal
              </button>
            </div>
          </div>
        ) : null}

        {/* Input Parameters Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
          {/* Base & W */}
          <div className="space-y-1">
            <label className="text-[11px] font-serif font-bold text-[#44403C]">Base Address ($B$):</label>
            <input
              type="number"
              value={base}
              onChange={(e) => setBase(parseInt(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono focus:border-[#991B1B] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-serif font-bold text-[#44403C]">Word Size $W$ (Bytes):</label>
            <input
              type="number"
              value={wordSize}
              onChange={(e) => setWordSize(parseInt(e.target.value) || 1)}
              className="w-full px-2.5 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono focus:border-[#991B1B] focus:outline-none"
            />
          </div>

          {/* Dimension 1 */}
          <div className="space-y-1">
            <label className="text-[11px] font-serif font-bold text-[#44403C]">
              {dimensions === 'special' ? 'Target Index i:' : 'Dim 1 [L1 : U1] & i:'}
            </label>
            <div className="flex items-center gap-1">
              {dimensions !== 'special' && (
                <>
                  <input
                    type="number"
                    value={l1}
                    onChange={(e) => setL1(parseInt(e.target.value) || 0)}
                    className="w-1/3 px-2 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
                    placeholder="L1"
                  />
                  <span className="text-[#88847C]">:</span>
                  <input
                    type="number"
                    value={u1}
                    onChange={(e) => setU1(parseInt(e.target.value) || 0)}
                    className="w-1/3 px-2 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
                    placeholder="U1"
                  />
                </>
              )}
              <input
                type="number"
                value={iCoord}
                onChange={(e) => setICoord(parseInt(e.target.value) || 0)}
                className="flex-1 px-2 py-1.5 rounded-md bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B] font-mono font-bold"
                placeholder="i"
              />
            </div>
          </div>

          {/* Dimension 2 */}
          {(dimensions === '2D' || dimensions === '3D' || dimensions === 'special') && (
            <div className="space-y-1">
              <label className="text-[11px] font-serif font-bold text-[#44403C]">
                {dimensions === 'special' ? 'Target Index j:' : 'Dim 2 [L2 : U2] & j:'}
              </label>
              <div className="flex items-center gap-1">
                {dimensions !== 'special' && (
                  <>
                    <input
                      type="number"
                      value={l2}
                      onChange={(e) => setL2(parseInt(e.target.value) || 0)}
                      className="w-1/3 px-2 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
                      placeholder="L2"
                    />
                    <span className="text-[#88847C]">:</span>
                    <input
                      type="number"
                      value={u2}
                      onChange={(e) => setU2(parseInt(e.target.value) || 0)}
                      className="w-1/3 px-2 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
                      placeholder="U2"
                    />
                  </>
                )}
                <input
                  type="number"
                  value={jCoord}
                  onChange={(e) => setJCoord(parseInt(e.target.value) || 0)}
                  className="flex-1 px-2 py-1.5 rounded-md bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B] font-mono font-bold"
                  placeholder="j"
                />
              </div>
            </div>
          )}

          {/* Dimension 3 */}
          {dimensions === '3D' && (
            <div className="space-y-1">
              <label className="text-[11px] font-serif font-bold text-[#44403C]">Dim 3 [L3 : U3] & k:</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={l3}
                  onChange={(e) => setL3(parseInt(e.target.value) || 0)}
                  className="w-1/3 px-2 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
                  placeholder="L3"
                />
                <span className="text-[#88847C]">:</span>
                <input
                  type="number"
                  value={u3}
                  onChange={(e) => setU3(parseInt(e.target.value) || 0)}
                  className="w-1/3 px-2 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
                  placeholder="U3"
                />
                <input
                  type="number"
                  value={kCoord}
                  onChange={(e) => setKCoord(parseInt(e.target.value) || 0)}
                  className="flex-1 px-2 py-1.5 rounded-md bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B] font-mono font-bold"
                  placeholder="k"
                />
              </div>
            </div>
          )}
        </div>

        {/* LaTeX Formula Banner */}
        <div className="p-4 rounded-lg bg-white border border-[#E5E2D9] space-y-2">
          <div className="text-xs font-serif font-bold text-[#66625B] uppercase tracking-wider">
            Standard Examination Formula:
          </div>
          <div className="text-sm">
            <Latex math={formulaLatex} block />
          </div>
        </div>

        {/* Step-by-Step LaTeX Derivation */}
        <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E2D9] pb-3">
            <span className="text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#991B1B]" /> Step-by-Step Formal Exam Proof:
            </span>
            <div className="text-sm font-mono font-bold text-[#065F46] bg-[#ECFDF5] px-3 py-1 rounded-md border border-[#A7F3D0]">
              Physical Address = {calculatedAddress} (0x{calculatedAddress.toString(16).toUpperCase()})
            </div>
          </div>

          <div className="space-y-3">
            {stepByStepLatex.map((step, idx) => (
              <div key={idx} className="p-2.5 rounded-md bg-white border border-[#E5E2D9]">
                <Latex math={step} block />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
