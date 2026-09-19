import React, { useMemo } from 'react';
import katex from 'katex';
import { Sigma, Copy, Check } from 'lucide-react';

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
  if (str.startsWith('$$') && str.endsWith('$$') && str.length >= 4) {
    str = str.slice(2, -2).trim();
  } else if (str.startsWith('$') && str.endsWith('$') && str.length >= 2) {
    str = str.slice(1, -1).trim();
  } else if (str.startsWith('\\[') && str.endsWith('\\]') && str.length >= 4) {
    str = str.slice(2, -2).trim();
  } else if (str.startsWith('\\(') && str.endsWith('\\)') && str.length >= 4) {
    str = str.slice(2, -2).trim();
  }

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
      output: 'html',
    });
  } catch {
    return `<span class="katex-fallback font-serif font-medium text-red-700 dark:text-red-400">${mathStr}</span>`;
  }
}

/**
 * High-performance KaTeX Component for displaying pure formulas
 */
export const Latex: React.FC<LatexProps> = ({ math, block = false, className = '' }) => {
  const isMultiLine = useMemo(() => math && math.includes('\n') && !math.includes('\\begin{'), [math]);

  if (isMultiLine) {
    return <FormulaBlock content={math} className={className} />;
  }

  const html = renderKatex(math, block);

  if (block) {
    return (
      <div
        className={`my-2 py-2 px-3 overflow-x-auto text-center rounded-lg bg-[#FAF8F5] dark:bg-[#1C1A17] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] font-serif shadow-2xs ${className}`}
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
 * Render inline markdown tokens (bold, italic, inline code) inside a plain text segment
 */
export function renderFormattedText(text: string): React.ReactNode[] {
  if (!text) return [];

  // Match bold **...**, italic *...*, inline code `...`
  const mdRegex = /(\*\*[\s\S]+?\*\*|\*[^\*\n]+?\*|`[^`\n]+?`)/g;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = mdRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={`b-${match.index}`} className="font-semibold text-[#1A1A1A] dark:text-[#EDE8DF]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={`i-${match.index}`} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={`c-${match.index}`}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-[#FAF8F5] dark:bg-[#25221E] text-[#991B1B] dark:text-[#EF4444] font-mono text-[12.5px] sm:text-[13px] border border-[#E5E2D9] dark:border-[#38332B] font-medium inline-block align-baseline"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIdx = mdRegex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts;
}

/**
 * Intelligent Text Parser that scans text for inline $...$, display $$...$$, asymptotic notations,
 * memory addresses, subscripts, and raw LaTeX commands, rendering them seamlessly with KaTeX.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const segments = useMemo(() => {
    if (!text) return [];

    let rawText = text;

    // First pass: extract inline code `...` so KaTeX/math regexes never mangle backtick code blocks or variables,
    // AND extract all explicitly delimited LaTeX expressions: $$...$$, $...$, \[...\], \(...\)
    type SegmentType = 'block-math' | 'inline-math' | 'inline-code' | 'text';
    const tokens: { type: SegmentType; content: string }[] = [];

    const tokenized = rawText.replace(
      /(`[^`\n]+?`|\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]+?\\\]|\\\([^\n]+?\\\))/g,
      (match) => {
        if (match.startsWith('`') && match.endsWith('`')) {
          const placeholder = `__EXPLICIT_TOKEN_${tokens.length}__`;
          tokens.push({ type: 'inline-code', content: match.slice(1, -1) });
          return placeholder;
        }

        let type: SegmentType = 'inline-math';
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

        const placeholder = `__EXPLICIT_TOKEN_${tokens.length}__`;
        tokens.push({ type, content: content.trim() });
        return placeholder;
      }
    );

    // Second pass: on the text OUTSIDE of explicit math delimiters and code, find unescaped math expressions
    let processed = tokenized;

    // 1. Auto-wrap asymptotic notations like O(1), O(N), O(N log N), O(N^2), O(g(n)), Theta(N), Omega(N), o(N), omega(N)
    // Support balanced single-level nested parentheses such as O(g(n)) or O(\max(g_1(n), g_2(n)))
    processed = processed.replace(
      /(?<![a-zA-Z0-9_\$\\])(?:\\mathcal\{O\}|O|Theta|\\Theta|Omega|\\Omega|omega|\\omega|o)\(([^()\n]*(?:\([^()\n]*\)[^()\n]*)*)\)/g,
      (match, content) => {
        let prefix = '\\mathcal{O}';
        if (match.startsWith('\\Theta') || match.startsWith('Theta')) prefix = '\\Theta';
        else if (match.startsWith('\\Omega') || match.startsWith('Omega')) prefix = '\\Omega';
        else if (match.startsWith('\\omega') || match.startsWith('omega')) prefix = '\\omega';
        else if (match.startsWith('o(')) prefix = 'o';

        let cleanContent = content
          .replace(/\\log/g, 'LOG_PLACEHOLDER')
          .replace(/\blog\b/g, '\\log ')
          .replace(/LOG_PLACEHOLDER/g, '\\log ')
          .replace(/\*/g, '\\cdot ');
        const placeholder = `__EXPLICIT_TOKEN_${tokens.length}__`;
        tokens.push({ type: 'inline-math', content: `${prefix}(${cleanContent})` });
        return placeholder;
      }
    );

    // 2. Auto-wrap mathematical functions like f(n), g(n), T(n), f_1(n), g_1(n) when not in a word
    processed = processed.replace(
      /(?<![a-zA-Z0-9_\$\\])([fgTh](?:_[12])?)\(([n0-9a-zA-Z_+\-*/^ ]+)\)/g,
      (_match, fnName, arg) => {
        const placeholder = `__EXPLICIT_TOKEN_${tokens.length}__`;
        tokens.push({ type: 'inline-math', content: `${fnName}(${arg})` });
        return placeholder;
      }
    );

    // 3. Auto-wrap indexed variables like n_0, n_i, p_i, c_1, c_2, a_k, a_d
    processed = processed.replace(
      /(?<![a-zA-Z0-9_\$\\])([ncap])_([0-9ikdj]+)(?![a-zA-Z0-9_\$])/g,
      (_match, base, sub) => {
        const placeholder = `__EXPLICIT_TOKEN_${tokens.length}__`;
        tokens.push({ type: 'inline-math', content: `${base}_{${sub}}` });
        return placeholder;
      }
    );

    // 4. Auto-wrap standalone asymptotic and mathematical symbols
    processed = processed.replace(
      /(?<![a-zA-Z0-9_\$\\])(?:\\mathcal\{O\}|\\Theta|\\Omega|\\omega|\\le|\\ge|\\ne|\\approx|\\times|\\cdot|\\sum|\\infty|\\implies|\\iff|≤|≥|≠|≈|×|∑|∞|∈)(?![a-zA-Z0-9_\$])/g,
      (match) => {
        let latexSym = match;
        if (match === '≤') latexSym = '\\le';
        else if (match === '≥') latexSym = '\\ge';
        else if (match === '≠') latexSym = '\\ne';
        else if (match === '≈') latexSym = '\\approx';
        else if (match === '×') latexSym = '\\times';
        else if (match === '∑') latexSym = '\\sum';
        else if (match === '∞') latexSym = '\\infty';
        else if (match === '∈') latexSym = '\\in';

        const placeholder = `__EXPLICIT_TOKEN_${tokens.length}__`;
        tokens.push({ type: 'inline-math', content: latexSym });
        return placeholder;
      }
    );

    // 5. Split by token placeholders to reconstruct final segments
    const finalSegments: { type: SegmentType; content: string }[] = [];
    const splitRegex = /__EXPLICIT_TOKEN_(\d+)__/g;
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
        if (seg.type === 'inline-code') {
          return (
            <code
              key={idx}
              className="px-1.5 py-0.5 mx-0.5 rounded bg-[#FAF8F5] dark:bg-[#25221E] text-[#991B1B] dark:text-[#EF4444] font-mono text-[12.5px] sm:text-[13px] border border-[#E5E2D9] dark:border-[#38332B] font-medium inline-block align-baseline"
            >
              {seg.content}
            </code>
          );
        }
        return <React.Fragment key={idx}>{renderFormattedText(seg.content)}</React.Fragment>;
      })}
    </span>
  );
};

interface FormulaBlockProps {
  content: string;
  className?: string;
}

/**
 * Dedicated structured Formula Card component that renders mathematical specifications cleanly.
 */
export const FormulaBlock: React.FC<FormulaBlockProps> = ({ content, className = '' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if the entire content is a pure mathematical formulation (e.g. aligned, or has no structured bullets/headers)
  const isPureFormula = useMemo(() => {
    if (!content) return false;
    const trimmed = content.trim();
    if (trimmed.startsWith('\\begin{') || trimmed.startsWith('$$')) return true;
    const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
    const hasStructureHeaders = lines.some(l => 
      (/^\d+\.\s+[A-Za-z]/.test(l) && l.endsWith(':')) ||
      l.startsWith('- ') ||
      l.startsWith('* ')
    );
    return !hasStructureHeaders;
  }, [content]);

  return (
    <div className={`rounded-xl bg-[#FAF8F5] dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] overflow-hidden ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#F4F2EB] dark:bg-[#221F1B] border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
          <Sigma className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" />
          <span>Mathematical Formulation & Specifications</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-sans font-medium text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-white/80 dark:hover:bg-white/10"
          title="Copy formula text"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#15803D] dark:text-[#4ADE80]" />
              <span className="text-[#15803D] dark:text-[#4ADE80]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Body content */}
      <div className="p-4 space-y-3 font-sans text-xs sm:text-sm text-[#2C2B29] dark:text-[#D6D0C5] leading-relaxed">
        {isPureFormula ? (
          <div
            className="my-1 py-3 px-4 overflow-x-auto text-center rounded-lg bg-white dark:bg-[#201D19] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] font-serif shadow-2xs text-sm sm:text-base leading-loose"
            dangerouslySetInnerHTML={{ __html: renderKatex(content, true) }}
          />
        ) : (
          content.split('\n').map((rawLine, idx) => {
            const line = rawLine.trim();
            if (!line) return <div key={idx} className="h-1" />;

            // Pure display math line: $$ ... $$ or starting with \begin{
            if ((line.startsWith('$$') && line.endsWith('$$')) || line.startsWith('\\begin{')) {
              const math = line.startsWith('$$') && line.endsWith('$$') ? line.slice(2, -2).trim() : line;
              const formulaHtml = renderKatex(math, true);
              return (
                <div
                  key={idx}
                  className="my-2 py-2.5 px-3 overflow-x-auto text-center rounded-lg bg-white dark:bg-[#201D19] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] font-serif shadow-2xs text-sm"
                  dangerouslySetInnerHTML={{ __html: formulaHtml }}
                />
              );
            }

            // Section headers like "1. Column-Major Order:" or "For a Complete Binary Tree...:"
            if (
              (/^\d+\.\s+[A-Za-z]/.test(line) && line.endsWith(':')) ||
              (line.startsWith('For a ') && line.endsWith(':')) ||
              (line.endsWith(':') && !line.startsWith('-') && !line.startsWith('*'))
            ) {
              return (
                <div key={idx} className="pt-2 pb-1 font-serif font-bold text-xs sm:text-sm text-[#1A1A1A] dark:text-[#EDE8DF] border-b border-[#E5E2D9] dark:border-[#38332B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] dark:bg-[#EF4444]" />
                  <MathText text={line} />
                </div>
              );
            }

            // Bullet points like "- Root Location: ..."
            if (line.startsWith('- ') || line.startsWith('* ')) {
              const bulletText = line.slice(2).trim();
              return (
                <div key={idx} className="flex items-start gap-2 pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] dark:bg-[#F59E0B] shrink-0 mt-1.5" />
                  <div className="leading-relaxed">
                    <MathText text={bulletText} />
                  </div>
                </div>
              );
            }

            // Numbered items like "1. Maximum nodes at depth d: ..."
            if (/^\d+\.\s+/.test(line)) {
              return (
                <div key={idx} className="flex items-start gap-2 pl-1">
                  <span className="font-mono font-bold text-xs text-[#991B1B] dark:text-[#EF4444] shrink-0 mt-0.5">
                    {line.match(/^\d+\./)?.[0]}
                  </span>
                  <div className="leading-relaxed">
                    <MathText text={line.replace(/^\d+\.\s+/, '')} />
                  </div>
                </div>
              );
            }

            // Math formula line without $$ but containing mathematical notation (e.g. =, \times, \sum, \approx)
            if (line.includes('=') && (line.includes('\\') || line.includes('+') || line.includes('^') || line.includes('_'))) {
              return (
                <div
                  key={idx}
                  className="my-1.5 py-2 px-3 overflow-x-auto text-center rounded-lg bg-white dark:bg-[#201D19] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] font-serif shadow-2xs text-xs sm:text-sm"
                  dangerouslySetInnerHTML={{ __html: renderKatex(line, true) }}
                />
              );
            }

            // Default fallback line
            return (
              <div key={idx} className="leading-relaxed">
                <MathText text={line} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

