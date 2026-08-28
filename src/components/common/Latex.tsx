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
    return `<span class="katex-fallback font-serif font-medium">${mathStr}</span>`;
  }
}

/**
 * High-performance KaTeX Component for displaying pure formulas
 */
export const Latex: React.FC<LatexProps> = ({ math, block = false, className = '' }) => {
  const isMultiLine = useMemo(() => math && math.includes('\n'), [math]);

  if (isMultiLine) {
    return <FormulaBlock content={math} className={className} />;
  }

  const html = renderKatex(math, block);

  if (block) {
    return (
      <div
        className={`my-2 py-2 px-3 overflow-x-auto text-center rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] font-serif shadow-2xs ${className}`}
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

    // 3. Split by token placeholders to reconstruct final segments
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

interface FormulaBlockProps {
  content: string;
  className?: string;
}

/**
 * Dedicated structured Formula Card component that renders multi-line mathematical specifications cleanly.
 */
export const FormulaBlock: React.FC<FormulaBlockProps> = ({ content, className = '' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = useMemo(() => {
    if (!content) return [];
    return content.split('\n');
  }, [content]);

  return (
    <div className={`rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-hidden ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#F4F2EB] dark:bg-[#2A2622] border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
          <Sigma className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" />
          <span>Mathematical Formulation & Specifications</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-sans font-medium text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF] transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-white dark:bg-[#201D1A]/80"
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
        {lines.map((rawLine, idx) => {
          const line = rawLine.trim();
          if (!line) return <div key={idx} className="h-1" />;

          // Pure display math line: $$ ... $$
          if (line.startsWith('$$') && line.endsWith('$$')) {
            const math = line.slice(2, -2).trim();
            const formulaHtml = renderKatex(math, true);
            return (
              <div
                key={idx}
                className="my-2 py-2 px-3 overflow-x-auto text-center rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] font-serif shadow-2xs"
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
                <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B]" />
                <MathText text={line} />
              </div>
            );
          }

          // Bullet points like "- Root Location: ..."
          if (line.startsWith('- ') || line.startsWith('* ')) {
            const bulletText = line.slice(2).trim();
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] shrink-0 mt-1.5" />
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

          // Default fallback line
          return (
            <div key={idx} className="leading-relaxed">
              <MathText text={line} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

