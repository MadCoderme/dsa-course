import React from 'react';
import { MathText } from './Latex';
import { Sparkles, AlertCircle, CheckCircle2, Terminal, Copy, Check } from 'lucide-react';

interface RichLessonContentProps {
  description: string;
  bulletPoints?: string[];
  comfortableFont?: boolean;
  className?: string;
}

interface ParsedBlock {
  type: 'paragraph' | 'bullet-list' | 'callout' | 'numbered-list' | 'code-spec';
  calloutType?: 'critical' | 'note' | 'tip';
  language?: string;
  title?: string;
  items?: { label?: string; content: string }[];
  content?: string;
}

function renderCodeLine(line: string): React.ReactNode {
  // Check for inline comments starting with //
  const commentIdx = line.indexOf('//');
  if (commentIdx !== -1) {
    const codePart = line.substring(0, commentIdx);
    const commentPart = line.substring(commentIdx);
    return (
      <>
        {renderHighlightedTokens(codePart)}
        <span className="text-[#78716C] italic">{commentPart}</span>
      </>
    );
  }
  return renderHighlightedTokens(line);
}

function renderHighlightedTokens(code: string): React.ReactNode {
  // Match keywords, arrows, strings, and numbers
  const tokenRegex = /(Algorithm\s+[A-Za-z0-9_]+|Input:|Output:|if|then|else|end if|for|to|do|end for|while|end while|repeat|until|return|mod|←|:=|"[^"]*"|\b\d+\b)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      parts.push(code.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('Algorithm')) {
      parts.push(
        <span key={match.index} className="font-bold text-[#60A5FA]">
          {token}
        </span>
      );
    } else if (token === 'Input:' || token === 'Output:') {
      parts.push(
        <span key={match.index} className="font-semibold text-[#F59E0B]">
          {token}
        </span>
      );
    } else if (/^(if|then|else|end if|for|to|do|end for|while|end while|repeat|until|return)$/.test(token)) {
      parts.push(
        <span key={match.index} className="font-bold text-[#F87171] dark:text-[#EF4444]">
          {token}
        </span>
      );
    } else if (token === '←' || token === ':=') {
      parts.push(
        <span key={match.index} className="font-bold text-[#FBBF24]">
          {token}
        </span>
      );
    } else if (token === 'mod') {
      parts.push(
        <span key={match.index} className="font-semibold text-[#FB923C]">
          {token}
        </span>
      );
    } else if (token.startsWith('"') && token.endsWith('"')) {
      parts.push(
        <span key={match.index} className="text-[#4ADE80]">
          {token}
        </span>
      );
    } else if (/^\d+$/.test(token)) {
      parts.push(
        <span key={match.index} className="text-[#93C5FD]">
          {token}
        </span>
      );
    } else {
      parts.push(token);
    }
    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    parts.push(code.substring(lastIndex));
  }

  return <>{parts}</>;
}

const CodeSpecBlock: React.FC<{
  code: string;
  language?: string;
  title?: string;
}> = ({ code, language = 'text', title }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="my-3 rounded-xl bg-[#1C1A17] dark:bg-[#151413] border border-[#38332B] dark:border-[#2D2822] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#25221E] dark:bg-[#1D1A17] border-b border-[#38332B] dark:border-[#2D2822]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#EF4444]" />
          <span className="font-mono text-[11px] font-semibold text-[#D6D0C5] uppercase tracking-wider">
            {title || (language === 'text' || language === 'pseudocode' ? 'Pseudocode Specification' : `${language.toUpperCase()} Specification`)}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-sans font-medium text-[#A8A29E] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code with Line Numbers & Syntax Highlighting */}
      <div className="p-3.5 overflow-x-auto text-[13px] sm:text-[13.5px] font-mono leading-relaxed text-[#EDE8DF]">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-baseline gap-3">
            <span className="w-5 select-none text-right text-[11px] text-[#78716C] shrink-0 font-mono">
              {idx + 1}
            </span>
            <span className="whitespace-pre">
              {renderCodeLine(line)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RichLessonContent: React.FC<RichLessonContentProps> = ({
  description,
  bulletPoints,
  comfortableFont = false,
  className = '',
}) => {
  // Parse description into structured typographic blocks
  const blocks = React.useMemo(() => {
    if (!description) return [];

    const parsed: ParsedBlock[] = [];

    // Split text by fenced code blocks (```lang ... ```)
    const codeBlockSplitRegex = /(```[a-zA-Z0-9_-]*\n[\s\S]*?```)/g;
    const rawSegments = description.split(codeBlockSplitRegex);

    for (const segment of rawSegments) {
      if (!segment) continue;

      // Check if segment is a fenced code block
      const codeMatch = segment.match(/^```([a-zA-Z0-9_-]*)\n([\s\S]*?)```$/);
      if (codeMatch) {
        const lang = codeMatch[1] || 'text';
        const code = codeMatch[2].trimEnd();
        parsed.push({
          type: 'code-spec',
          language: lang,
          content: code,
        });
        continue;
      }

      // Otherwise, parse standard text sections
      const rawSections = segment.split(/\n\s*\n/);
      for (const section of rawSections) {
        const trimmed = section.trim();
        if (!trimmed) continue;

        const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);

        // Check if this whole section or first line is a CRITICAL EXAM PRINCIPLE or Callout
        if (
          trimmed.includes('CRITICAL EXAM PRINCIPLE:') ||
          trimmed.startsWith('NOTE:') ||
          trimmed.startsWith('Warning:') ||
          trimmed.startsWith('Important:')
        ) {
          const cleanContent = trimmed
            .replace(/^[•\-\*]\s*/, '')
            .replace(/^(CRITICAL EXAM PRINCIPLE|NOTE|Warning|Important):\s*/i, '');
          
          parsed.push({
            type: 'callout',
            calloutType: trimmed.includes('CRITICAL EXAM PRINCIPLE') ? 'critical' : 'note',
            title: trimmed.includes('CRITICAL EXAM PRINCIPLE') ? 'Critical Exam Principle (CUET Focus)' : 'Important Note',
            content: cleanContent,
          });
          continue;
        }

        // Check if lines are a bullet list
        const hasBulletLines = lines.some((l) => /^[•\-\*]\s+/.test(l));
        if (hasBulletLines) {
          const bulletItems: { label?: string; content: string }[] = [];
          let prefixParagraph = '';

          for (const line of lines) {
            if (/^[•\-\*]\s+/.test(line)) {
              const rawItem = line.replace(/^[•\-\*]\s+/, '').trim();

              // Check if individual bullet line is a critical principle
              if (rawItem.includes('CRITICAL EXAM PRINCIPLE:')) {
                parsed.push({
                  type: 'callout',
                  calloutType: 'critical',
                  title: 'Critical Exam Principle (CUET Focus)',
                  content: rawItem.replace(/^.*?CRITICAL EXAM PRINCIPLE:\s*/i, ''),
                });
                continue;
              }

              // Check if bullet has a bold title or label followed by a colon
              const colonMatch = rawItem.match(/^(\*\*[^*]+?\*\*|`[^`]+?`|[A-Za-z0-9\s/_\(\)\-←:=`]+?):\s*([\s\S]+)$/);
              if (colonMatch) {
                const rawLabel = colonMatch[1].replace(/^\*\*|\*\*$/g, '').trim();
                bulletItems.push({
                  label: rawLabel,
                  content: colonMatch[2].trim(),
                });
              } else {
                bulletItems.push({
                  content: rawItem,
                });
              }
            } else {
              // Introductory non-bullet line before the bullets
              if (!prefixParagraph) {
                prefixParagraph = line;
              } else {
                prefixParagraph += ' ' + line;
              }
            }
          }

          if (prefixParagraph) {
            parsed.push({
              type: 'paragraph',
              content: prefixParagraph,
            });
          }

          if (bulletItems.length > 0) {
            parsed.push({
              type: 'bullet-list',
              items: bulletItems,
            });
          }
          continue;
        }

        // Check if lines are numbered steps (e.g. 1. , 2. )
        const hasNumberedLines = lines.every((l) => /^\d+\.\s+/.test(l));
        if (hasNumberedLines && lines.length > 1) {
          const stepItems = lines.map((l) => {
            const match = l.match(/^\d+\.\s+([\s\S]+)$/);
            const raw = match ? match[1] : l;
            const colonMatch = raw.match(/^([A-Za-z0-9\s/_\(\)\-]+?):\s*([\s\S]+)$/);
            if (colonMatch) {
              return {
                label: colonMatch[1].trim(),
                content: colonMatch[2].trim(),
              };
            }
            return { content: raw };
          });

          parsed.push({
            type: 'numbered-list',
            items: stepItems,
          });
          continue;
        }

        // Fallback: regular paragraph
        parsed.push({
          type: 'paragraph',
          content: trimmed,
        });
      }
    }

    return parsed;
  }, [description]);

  const textSizeClass = comfortableFont
    ? 'text-[16px] sm:text-[17px] leading-[1.8]'
    : 'text-[15px] sm:text-[15.5px] leading-[1.75]';

  return (
    <div className={`space-y-4 max-w-4xl text-[#2C2B29] dark:text-[#E2DDD5] font-sans ${className}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'callout') {
          const isCritical = block.calloutType === 'critical';
          return (
            <div
              key={bIdx}
              className={`p-4 rounded-xl border transition-colors shadow-2xs ${
                isCritical
                  ? 'bg-[#FFFBEB] dark:bg-[#2A2415] border-[#FDE68A] dark:border-[#78350F] text-[#92400E] dark:text-[#FCD34D]'
                  : 'bg-[#F0FDF4] dark:bg-[#142319] border-[#BBF7D0] dark:border-[#166534] text-[#166534] dark:text-[#86EFAC]'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCritical ? (
                  <AlertCircle className="w-5 h-5 text-[#D97706] dark:text-[#F59E0B] shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-5 h-5 text-[#16A34A] dark:text-[#4ADE80] shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-serif font-bold text-xs uppercase tracking-wider">
                    {block.title}
                  </div>
                  <div className={`font-sans text-sm sm:text-[14.5px] leading-relaxed text-[#451A03] dark:text-[#FEF3C7]`}>
                    <MathText text={block.content || ''} />
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (block.type === 'bullet-list' && block.items) {
          return (
            <div
              key={bIdx}
              className="my-3 p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1C1A17] border border-[#E5E2D9] dark:border-[#38332B] space-y-3"
            >
              {block.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#991B1B] dark:bg-[#EF4444] shrink-0 mt-2" />
                  <div className={`flex-1 ${textSizeClass} text-[#2C2B29] dark:text-[#D6D0C5]`}>
                    {item.label && (
                      <span className="font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mr-1.5">
                        <MathText text={item.label} />:
                      </span>
                    )}
                    <MathText text={item.content} />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === 'numbered-list' && block.items) {
          return (
            <div
              key={bIdx}
              className="my-3 p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1C1A17] border border-[#E5E2D9] dark:border-[#38332B] space-y-3"
            >
              {block.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] text-[11px] font-mono font-bold text-[#991B1B] dark:text-[#EF4444] flex items-center justify-center shrink-0 mt-0.5">
                    {itemIdx + 1}
                  </span>
                  <div className={`flex-1 ${textSizeClass} text-[#2C2B29] dark:text-[#D6D0C5]`}>
                    {item.label && (
                      <span className="font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mr-1.5">
                        <MathText text={item.label} />:
                      </span>
                    )}
                    <MathText text={item.content} />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === 'code-spec' && block.content) {
          return (
            <CodeSpecBlock
              key={bIdx}
              code={block.content}
              language={block.language || 'pseudocode'}
            />
          );
        }

        const isTaskHeading = block.content ? /^(Task\s+[A-Z0-9]+:)/i.test(block.content) : false;

        return (
          <p
            key={bIdx}
            className={`${textSizeClass} tracking-normal ${
              isTaskHeading
                ? 'pt-2 font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]'
                : 'text-[#2C2B29] dark:text-[#E2DDD5]'
            }`}
          >
            <MathText text={block.content || ''} />
          </p>
        );
      })}

      {/* Structured bullet points array if provided */}
      {bulletPoints && bulletPoints.length > 0 && (
        <div className="pt-2">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1C1A17] border border-[#E5E2D9] dark:border-[#38332B] space-y-2.5">
            <div className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#88847C] dark:text-[#9E988E] mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" />
              <span>Core Takeaways & Structural Rules</span>
            </div>
            {bulletPoints.map((pt, pIdx) => {
              const colonMatch = pt.match(/^(\*\*[^*]+?\*\*|`[^`]+?`|[A-Za-z0-9\s/_\(\)\-←:=`]+?):\s*([\s\S]+)$/);
              return (
                <div key={pIdx} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B45309] dark:bg-[#F59E0B] shrink-0 mt-2.5" />
                  <div className={`flex-1 text-sm sm:text-[14.5px] leading-relaxed text-[#3C3833] dark:text-[#D6D0C5]`}>
                    {colonMatch ? (
                      <>
                        <span className="font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mr-1.5">
                          <MathText text={colonMatch[1].replace(/^\*\*|\*\*$/g, '')} />:
                        </span>
                        <MathText text={colonMatch[2]} />
                      </>
                    ) : (
                      <MathText text={pt} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
