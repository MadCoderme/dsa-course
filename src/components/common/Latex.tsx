import React, { useMemo } from 'react';
import katex from 'katex';

interface LatexProps {
  math: string;
  block?: boolean;
  className?: string;
}

/**
 * Clean up and normalize LaTeX string before KaTeX rendering
 */
export function cleanLatexString(raw: string): string {
  if (!raw) return '';
  let str = raw.trim();

  // Strip wrapping delimiters if present
  if (str.startsWith('$$') && str.endsWith('$$')) {
    str = str.slice(2, -2).trim();
  } else if (str.startsWith('$') && str.endsWith('$')) {
    str = str.slice(1, -1).trim();
  } else if (str.startsWith('\\[') && str.endsWith('\\]')) {
    str = str.slice(2, -2).trim();
  } else if (str.startsWith('\\(') && str.endsWith('\\)')) {
    str = str.slice(2, -2).trim();
  }

  // Normalize excessive backslashes if any (e.g. \\mathcal -> \mathcal)
  str = str.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

  // Format common plain words, subscripts, and variables into clean LaTeX
  str = str
    .replace(/\\text\{Loc\}\(/g, '\\text{Loc}(')
    .replace(/\bLoc\(/g, '\\text{Loc}(')
    .replace(/\bBase\b(?!\})/g, '\\text{Base}')
    .replace(/\bFRONT\b(?!\})/g, '\\text{FRONT}')
    .replace(/\bREAR\b(?!\})/g, '\\text{REAR}')
    .replace(/\bTOP1\b/g, '\\text{TOP}_1')
    .replace(/\bTOP2\b/g, '\\text{TOP}_2')
    .replace(/\bTOP\b(?!\})/g, '\\text{TOP}')
    .replace(/\bCOEF\b(?!\})/g, '\\text{COEF}')
    .replace(/\bEXP\b(?!\})/g, '\\text{EXP}')
    .replace(/\bLINK\b(?!\})/g, '\\text{LINK}')
    .replace(/\bHEADER\b(?!\})/g, '\\text{HEADER}')
    .replace(/\bCapacity\b(?!\})/g, '\\text{Capacity}')
    .replace(/\bSize\b(?!\})/g, '\\text{Size}')
    .replace(/\bOffset\b(?!\})/g, '\\text{Offset}')
    .replace(/\bInner\b(?!\})/g, '\\text{Inner}')
    .replace(/\bParent\b(?!\})/g, '\\text{Parent}')
    .replace(/\bparent\b(?!\})/g, '\\text{parent}')
    .replace(/\bLeftChild\b(?!\})/g, '\\text{LeftChild}')
    .replace(/\bRightChild\b(?!\})/g, '\\text{RightChild}')
    .replace(/\bleft\b(?!\s*[\(\[\{]|\})/g, '\\text{left}')
    .replace(/\bright\b(?!\s*[\)\]\}]|\})/g, '\\text{right}')
    .replace(/\bword\b(?!\})/g, '\\text{word}')
    .replace(/\bwords\b(?!\})/g, '\\text{words}')
    .replace(/(?<=[a-zA-Z0-9\)])\s*\*\s*(?=[a-zA-Z0-9\(\[\{])/g, ' \\times ')
    .replace(/\bL1\b/g, 'L_1')
    .replace(/\bU1\b/g, 'U_1')
    .replace(/\bD1\b/g, 'D_1')
    .replace(/\bL2\b/g, 'L_2')
    .replace(/\bU2\b/g, 'U_2')
    .replace(/\bD2\b/g, 'D_2')
    .replace(/\bL3\b/g, 'L_3')
    .replace(/\bU3\b/g, 'U_3')
    .replace(/\bD3\b/g, 'D_3');

  return str;
}

/**
 * Safely render a LaTeX string to HTML via KaTeX with output 'html' ONLY (eliminating any MathML duplicate text)
 */
export function renderKatex(mathStr: string, displayMode = false): string {
  if (!mathStr) return '';
  const cleaned = cleanLatexString(mathStr);
  try {
    return katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
      output: 'html', // CRITICAL: using 'html' prevents modern browsers from rendering both MathML and KaTeX HTML
    });
  } catch {
    return `<span class="katex-fallback font-serif font-medium">${mathStr}</span>`;
  }
}

/**
 * Checks if a string line is primarily a mathematical formula or LaTeX definition
 */
function isFormulaLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;

  // Starts with known math formula keywords or backslashes
  if (
    trimmed.startsWith('\\text{Loc}') ||
    trimmed.startsWith('Loc(') ||
    trimmed.startsWith('\\text{Poly') ||
    trimmed.startsWith('\\text{Example') ||
    trimmed.startsWith('\\text{List') ||
    trimmed.startsWith('\\text{Circular') ||
    trimmed.startsWith('\\text{1. Empty') ||
    trimmed.startsWith('\\text{2. Full') ||
    trimmed.startsWith('\\text{Parent') ||
    trimmed.startsWith('\\text{LeftChild') ||
    trimmed.startsWith('\\text{RightChild') ||
    trimmed.startsWith('\\text{BST') ||
    trimmed.startsWith('\\text{Balanced') ||
    trimmed.startsWith('\\text{Graph') ||
    trimmed.startsWith('P(x) =') ||
    trimmed.startsWith('P_1(x) =') ||
    trimmed.startsWith('P_2(x) =')
  ) {
    return true;
  }

  // Contains mathematical symbols and assignment
  if (
    (trimmed.includes('\\times') || trimmed.includes('\\cdot') || trimmed.includes('\\bmod') || trimmed.includes('\\lfloor') || trimmed.includes('\\to') || trimmed.includes('\\le') || trimmed.includes('\\ge')) &&
    (trimmed.includes('=') || trimmed.includes('\\to') || trimmed.includes('<'))
  ) {
    return true;
  }

  return false;
}

/**
 * High-performance KaTeX Component for displaying formulas or full structured math blocks
 */
export const Latex: React.FC<LatexProps> = ({ math, block = false, className = '' }) => {
  // If the input is a multi-line structured curriculum block (e.g. 3D Array formulas, Polynomial structures)
  const isMultiLine = useMemo(() => {
    return math.includes('\n');
  }, [math]);

  const html = useMemo(() => {
    if (isMultiLine || !math) return '';
    return renderKatex(math, block);
  }, [math, block, isMultiLine]);

  if (isMultiLine) {
    const rawLines = math.split('\n');
    return (
      <div className={`space-y-2.5 my-2 ${className}`}>
        {rawLines.map((rawLine, idx) => {
          const line = rawLine.trim();
          if (!line) return <div key={idx} className="h-1" />;

          // 1. Check if this is a section heading like "1. Column-Major Order (Column by column):" or "For a 3D Array..."
          if (/^\d+\.\s+[A-Za-z]/.test(line) && line.endsWith(':')) {
            return (
              <div key={idx} className="pt-2 font-serif font-bold text-xs sm:text-sm text-[#1A1A1A] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B]" />
                <MathText text={line} />
              </div>
            );
          }

          if (line.startsWith('For a ') && line.endsWith(':')) {
            return (
              <div key={idx} className="font-serif font-bold text-xs sm:text-sm text-[#1A1A1A] pb-1 border-b border-[#E5E2D9]">
                <MathText text={line} />
              </div>
            );
          }

          // 2. Check if this is a standalone mathematical formula (e.g. Loc(A[i, j, k]) = ...)
          if (isFormulaLine(line)) {
            const formulaHtml = renderKatex(line, true);
            return (
              <div
                key={idx}
                className="my-1.5 py-2.5 px-3.5 overflow-x-auto text-center rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] text-[#1A1A1A] font-serif shadow-2xs"
                dangerouslySetInnerHTML={{ __html: formulaHtml }}
              />
            );
          }

          // 3. Check if this is a bullet point item like "- Lower Bounds: L_1, L_2, L_3 \quad | \quad Upper Bounds: U_1, U_2, U_3"
          if (line.startsWith('- ') || line.startsWith('* ')) {
            const content = line.slice(2).trim();
            const colonIdx = content.indexOf(':');

            if (colonIdx !== -1) {
              const label = content.slice(0, colonIdx + 1);
              const formulaPart = content.slice(colonIdx + 1).trim();

              // If the part after the colon contains LaTeX commands (\quad, \times, L_1, D_1, \bmod, etc.)
              if (
                formulaPart.includes('\\') ||
                formulaPart.includes('_') ||
                formulaPart.includes('=') ||
                formulaPart.includes('^')
              ) {
                // Preprocess formulaPart to wrap plain English words like "Upper Bounds:" in \text{} if needed
                let cleanPart = formulaPart;
                if (cleanPart.includes('|') && !cleanPart.includes('\\text{')) {
                  cleanPart = cleanPart.replace(/\|\s*([A-Za-z\s]+):/g, '\\mid \\quad \\text{$1:}');
                }

                return (
                  <div key={idx} className="flex flex-wrap items-center gap-2 p-2 rounded-md bg-white border border-[#E5E2D9] text-xs">
                    <span className="font-serif font-bold text-[#44403C] shrink-0 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#B45309]" />
                      {label}
                    </span>
                    <div className="overflow-x-auto font-serif text-[#1A1A1A]">
                      <Latex math={cleanPart} block={false} />
                    </div>
                  </div>
                );
              }
            }

            return (
              <div key={idx} className="flex items-start gap-2 p-1.5 text-xs text-[#2C2B29]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] shrink-0 mt-1.5" />
                <span className="font-sans leading-relaxed">
                  <MathText text={content} />
                </span>
              </div>
            );
          }

          // Default fallback line
          return (
            <div key={idx} className="overflow-x-auto text-xs leading-relaxed text-[#2C2B29]">
              <MathText text={line} />
            </div>
          );
        })}
      </div>
    );
  }

  if (block) {
    return (
      <div
        className={`my-2 py-2.5 px-3.5 overflow-x-auto text-center rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] text-[#1A1A1A] font-serif shadow-2xs ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-math font-serif ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Intelligent Text Parser that scans text for inline $...$, display $$...$$, asymptotic notations,
 * memory addresses, subscripts, and raw LaTeX commands, rendering them seamlessly with KaTeX.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const segments = useMemo(() => {
    if (!text) return [];

    // Normalize escaped backslashes in input string (e.g. \\mathcal -> \mathcal)
    let rawText = text.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

    // First pass: extract all explicitly delimited LaTeX expressions: $$...$$, $...$, \[...\], \(...\)
    const tokens: { type: 'block-math' | 'inline-math'; content: string }[] = [];
    const tokenized = rawText.replace(
      /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]+?\\\]|\\\([^\n]+?\\\))/g,
      (match) => {
        let type: 'block-math' | 'inline-math' = 'inline-math';
        let content = match;

        if (match.startsWith('$$') && match.endsWith('$$')) {
          type = 'block-math';
          content = match.slice(2, -2);
        } else if (match.startsWith('\\[') && match.endsWith('\\]')) {
          type = 'block-math';
          content = match.slice(2, -2);
        } else if (match.startsWith('$') && match.endsWith('$')) {
          type = 'inline-math';
          content = match.slice(1, -1);
        } else if (match.startsWith('\\(') && match.endsWith('\\)')) {
          type = 'inline-math';
          content = match.slice(2, -2);
        }

        const placeholder = `__EXPLICIT_MATH_${tokens.length}__`;
        tokens.push({ type, content: content.trim() });
        return placeholder;
      }
    );

    // Second pass: on the text OUTSIDE of explicit math delimiters, find unescaped math expressions
    let processed = tokenized;

    // 1. Auto-wrap asymptotic notations like O(1), O(N), O(N log N), O(N^2), O(V + E), O(E log V), Theta(N), Omega(N), \mathcal{O}(N)
    processed = processed.replace(
      /(?<![a-zA-Z0-9_\$])(?:\\mathcal\{O\}|O|Theta|\\Theta|Omega|\\Omega)\(([0-9a-zA-Z\s\+\-\*\/\^\log\(\)\mathcal\{\}\\_\\cdot,:]+?)\)/g,
      (_match, content) => {
        let cleanContent = content
          .replace(/\\log/g, 'LOG_PLACEHOLDER')
          .replace(/\blog\b/g, '\\log ')
          .replace(/LOG_PLACEHOLDER/g, '\\log ')
          .replace(/\*/g, '\\cdot ');
        const placeholder = `__EXPLICIT_MATH_${tokens.length}__`;
        tokens.push({ type: 'inline-math', content: `\\mathcal{O}(${cleanContent})` });
        return placeholder;
      }
    );

    // 2. Auto-wrap standalone \mathcal{O} without parens if any
    processed = processed.replace(/(?<![a-zA-Z0-9_\$])\\mathcal\{O\}(?![a-zA-Z0-9_\$])/g, () => {
      const placeholder = `__EXPLICIT_MATH_${tokens.length}__`;
      tokens.push({ type: 'inline-math', content: `\\mathcal{O}` });
      return placeholder;
    });

    // 3. Auto-wrap memory formula patterns: \text{Loc}(...) = ... or Loc(...) = ...
    processed = processed.replace(
      /(?<![a-zA-Z0-9_\$])(?:\\text\{Loc\}|Loc)\([a-zA-Z0-9\s,\-_\[\]\(\)\+]+?\)\s*=\s*[a-zA-Z0-9\s\+\-\*\/\(\)\{\}\\_\[\]\^\\cdot\\times]+/g,
      (match) => {
        const placeholder = `__EXPLICIT_MATH_${tokens.length}__`;
        tokens.push({ type: 'inline-math', content: match.trim() });
        return placeholder;
      }
    );

    // 4. Auto-wrap dimension span formulas like D1 = U1 - L1 + 1 or D_1 = U_1 - L_1 + 1
    processed = processed.replace(
      /(?<![a-zA-Z0-9_\$])(D_?[123]\s*=\s*U_?[123]\s*-\s*L_?[123]\s*\+\s*1)(?![a-zA-Z0-9_\$])/g,
      (match) => {
        const placeholder = `__EXPLICIT_MATH_${tokens.length}__`;
        tokens.push({ type: 'inline-math', content: match });
        return placeholder;
      }
    );

    // 5. Auto-wrap array variable declarations like A[L_1 : U_1, L_2 : U_2, L_3 : U_3]
    processed = processed.replace(
      /(?<![a-zA-Z0-9_\$])([A-Z]\[[A-Za-z0-9_:\s,\+]+\])(?![a-zA-Z0-9_\$])/g,
      (match) => {
        const placeholder = `__EXPLICIT_MATH_${tokens.length}__`;
        tokens.push({ type: 'inline-math', content: match });
        return placeholder;
      }
    );

    // 6. Split by token placeholders to reconstruct final segments
    const finalSegments: { type: 'text' | 'inline-math' | 'block-math'; content: string }[] = [];
    const splitRegex = /__EXPLICIT_MATH_(\d+)__/g;
    let lastIndex = 0;
    let splitMatch: RegExpExecArray | null;

    while ((splitMatch = splitRegex.exec(processed)) !== null) {
      if (splitMatch.index > lastIndex) {
        finalSegments.push({
          type: 'text',
          content: processed.substring(lastIndex, splitMatch.index),
        });
      }
      const tokenIdx = parseInt(splitMatch[1], 10);
      const token = tokens[tokenIdx];
      if (token) {
        finalSegments.push({
          type: token.type,
          content: token.content,
        });
      }
      lastIndex = splitRegex.lastIndex;
    }

    if (lastIndex < processed.length) {
      finalSegments.push({
        type: 'text',
        content: processed.substring(lastIndex),
      });
    }

    return finalSegments;
  }, [text]);

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'block-math') {
          return <Latex key={idx} math={seg.content} block />;
        }
        if (seg.type === 'inline-math') {
          return <Latex key={idx} math={seg.content} block={false} />;
        }
        return <span key={idx}>{seg.content}</span>;
      })}
    </span>
  );
};
