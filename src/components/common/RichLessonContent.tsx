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
  type:
    | 'heading-1'
    | 'heading-2'
    | 'heading-3'
    | 'heading-4'
    | 'paragraph'
    | 'bullet-list'
    | 'numbered-list'
    | 'callout'
    | 'code-spec'
    | 'divider';
  calloutType?: 'critical' | 'note' | 'tip';
  language?: string;
  title?: string;
  items?: { label?: string; content: string; subItems?: string[] }[];
  content?: string;
}

export function renderCodeLine(line: string): React.ReactNode {
  // Check for inline comments starting with //
  const commentIdx = line.indexOf('//');
  if (commentIdx !== -1) {
    const codePart = line.substring(0, commentIdx);
    const commentPart = line.substring(commentIdx);
    return (
      <>
        {renderHighlightedTokens(codePart)}
        <span className="text-[#8E877C] italic">{commentPart}</span>
      </>
    );
  }
  return renderHighlightedTokens(line);
}

export function renderHighlightedTokens(code: string): React.ReactNode {
  // Match keywords, function names, arrows, string literals, and numbers
  const tokenRegex = /(Algorithm\s+[A-Za-z0-9_]+|Procedure\s+[A-Za-z0-9_]+|Function\s+[A-Za-z0-9_]+|Input:|Output:|INPUT:|OUTPUT:|if\b|IF\b|then\b|THEN\b|else\b|ELSE\b|end if\b|END IF\b|for\b|FOR\b|to\b|TO\b|downto\b|DOWNTO\b|do\b|DO\b|end for\b|END FOR\b|while\b|WHILE\b|end while\b|END WHILE\b|repeat\b|REPEAT\b|until\b|UNTIL\b|return\b|RETURN\b|mod\b|MOD\b|and\b|AND\b|or\b|OR\b|not\b|NOT\b|Set\b|SET\b|Write:\b|WRITE:\b|Read:\b|READ:\b|Print:\b|PRINT:\b|Exit\b|EXIT\b|true\b|false\b|null\b|TRUE\b|FALSE\b|NULL\b|LENGTH\b|SUBSTRING\b|INDEX\b|CONCAT\b|INSERT\b|DELETE\b|REPLACE\b|←|:=|≠|≤|≥|"[^"]*"|'[^']*'|\b\d+\b)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      parts.push(code.substring(lastIndex, match.index));
    }
    const token = match[0];
    const upper = token.toUpperCase();

    if (token.startsWith('Algorithm') || token.startsWith('Procedure') || token.startsWith('Function')) {
      parts.push(
        <span key={match.index} className="font-bold text-[#60A5FA]">
          {token}
        </span>
      );
    } else if (upper === 'INPUT:' || upper === 'OUTPUT:' || upper === 'WRITE:' || upper === 'READ:' || upper === 'PRINT:') {
      parts.push(
        <span key={match.index} className="font-semibold text-[#F59E0B]">
          {token}
        </span>
      );
    } else if (
      /^(IF|THEN|ELSE|END IF|FOR|TO|DOWNTO|DO|END FOR|WHILE|END WHILE|REPEAT|UNTIL|RETURN|EXIT|SET)$/.test(upper)
    ) {
      parts.push(
        <span key={match.index} className="font-bold text-[#F87171] dark:text-[#EF4444]">
          {token}
        </span>
      );
    } else if (/^(LENGTH|SUBSTRING|INDEX|CONCAT|INSERT|DELETE|REPLACE)$/.test(upper)) {
      parts.push(
        <span key={match.index} className="font-semibold text-[#38BDF8]">
          {token}
        </span>
      );
    } else if (token === '←' || token === ':=') {
      parts.push(
        <span key={match.index} className="font-bold text-[#FBBF24]">
          {token}
        </span>
      );
    } else if (upper === 'MOD' || upper === 'AND' || upper === 'OR' || upper === 'NOT' || token === '≠' || token === '≤' || token === '≥') {
      parts.push(
        <span key={match.index} className="font-semibold text-[#FB923C]">
          {token}
        </span>
      );
    } else if (upper === 'TRUE' || upper === 'FALSE' || upper === 'NULL') {
      parts.push(
        <span key={match.index} className="font-semibold text-[#A78BFA]">
          {token}
        </span>
      );
    } else if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
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

export const CodeSpecBlock: React.FC<{
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
  // Parse description into structured typographic blocks strictly in order
  const blocks = React.useMemo(() => {
    if (!description) return [];

    const parsed: ParsedBlock[] = [];

    // Helper to extract item label and content
    const extractLabelAndContent = (text: string) => {
      // Check for **Label:** rest or **Label** rest or `Label`: rest or Label: rest
      const colonMatch = text.match(/^(\*\*[^*]+?\*\*|`[^`]+?`|[A-Za-z0-9\s/_\(\)\-←:=`]+?):\s*([\s\S]+)$/);
      if (colonMatch) {
        return {
          label: colonMatch[1].replace(/^\*\*|\*\*$/g, '').trim(),
          content: colonMatch[2].trim(),
        };
      }
      const boldPrefixMatch = text.match(/^(\*\*[^*]+?\*\*)\s+([\s\S]+)$/);
      if (boldPrefixMatch) {
        return {
          label: boldPrefixMatch[1].replace(/^\*\*|\*\*$/g, '').trim(),
          content: boldPrefixMatch[2].trim(),
        };
      }
      return { content: text };
    };

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

      // Process text segment line by line sequentially
      const lines = segment.split('\n');
      let i = 0;

      while (i < lines.length) {
        const rawLine = lines[i];
        const trimmed = rawLine.trim();

        if (!trimmed) {
          i++;
          continue;
        }

        // 1. Horizontal divider (---, ___, ***)
        if (/^(\-{3,}|\_{3,}|\*{3,})$/.test(trimmed)) {
          parsed.push({ type: 'divider' });
          i++;
          continue;
        }

        // 2. Markdown Headings: #, ##, ###, ####
        const headerMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
        if (headerMatch) {
          const hashCount = headerMatch[1].length;
          const headerText = headerMatch[2].trim();
          parsed.push({
            type:
              hashCount === 1
                ? 'heading-1'
                : hashCount === 2
                ? 'heading-2'
                : hashCount === 3
                ? 'heading-3'
                : 'heading-4',
            content: headerText,
          });
          i++;
          continue;
        }

        // 3. Standalone bold heading on its own line: **Heading Title:** or **Heading Title**
        const standaloneBoldMatch = trimmed.match(/^(\*\*[^*]+?\*\*[:]?)$/);
        if (standaloneBoldMatch) {
          const headerText = standaloneBoldMatch[1].replace(/^\*\*|\*\*$/g, '').trim();
          parsed.push({
            type: 'heading-4',
            content: headerText,
          });
          i++;
          continue;
        }

        // 4. Callouts: CRITICAL EXAM PRINCIPLE:, NOTE:, Warning:, Important:, **CRITICAL EXAM PRINCIPLE:**
        const isCallout =
          /^(CRITICAL EXAM PRINCIPLE|NOTE|Warning|Important):/i.test(trimmed) ||
          /^(\*\*(CRITICAL EXAM PRINCIPLE|NOTE|Warning|Important)[^*]*\*\*[:]?)/i.test(trimmed);

        if (isCallout) {
          const isCritical = /CRITICAL EXAM PRINCIPLE/i.test(trimmed);
          const calloutTitle = isCritical
            ? 'Critical Exam Principle (CUET Focus)'
            : 'Important Note';

          const calloutLines = [trimmed];
          i++;
          while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !/^#{1,4}\s+/.test(lines[i].trim()) &&
            !/^(\-{3,}|\_{3,}|\*{3,})$/.test(lines[i].trim()) &&
            !/^(\*\*[^*]+?\*\*[:]?)$/.test(lines[i].trim())
          ) {
            calloutLines.push(lines[i].trim());
            i++;
          }

          const fullCalloutText = calloutLines
            .join(' ')
            .replace(/^[•\-\*]\s*/, '')
            .replace(/^(\*\*)?(CRITICAL EXAM PRINCIPLE|NOTE|Warning|Important)[^*]*(\*\*)?[:]?\s*/i, '');

          parsed.push({
            type: 'callout',
            calloutType: isCritical ? 'critical' : 'note',
            title: calloutTitle,
            content: fullCalloutText,
          });
          continue;
        }

        // 5. Bullet list check (lines starting with - , * , • )
        const isBulletLine = /^\s*[•\-\*]\s+/.test(rawLine);
        if (isBulletLine) {
          const items: { label?: string; content: string; subItems?: string[] }[] = [];

          while (i < lines.length) {
            const curLine = lines[i];
            if (!curLine.trim()) break;

            if (
              /^#{1,4}\s+/.test(curLine.trim()) ||
              /^(\-{3,}|\_{3,}|\*{3,})$/.test(curLine.trim()) ||
              /^\s*\d+\.\s+/.test(curLine) ||
              /^(\*\*[^*]+?\*\*[:]?)$/.test(curLine.trim())
            ) {
              break;
            }

            const isSubBullet = /^\s{2,}[•\-\*]\s+/.test(curLine);
            const isTopBullet = /^\s*[•\-\*]\s+/.test(curLine) && !isSubBullet;

            if (isTopBullet) {
              const rawItem = curLine.replace(/^\s*[•\-\*]\s+/, '').trim();
              const extracted = extractLabelAndContent(rawItem);
              items.push({
                ...extracted,
                subItems: [],
              });
            } else if (isSubBullet && items.length > 0) {
              const rawSub = curLine.replace(/^\s+[•\-\*]\s+/, '').trim();
              items[items.length - 1].subItems?.push(rawSub);
            } else if (items.length > 0) {
              // Continuation line of the last bullet
              items[items.length - 1].content += ' ' + curLine.trim();
            } else {
              break;
            }
            i++;
          }

          if (items.length > 0) {
            parsed.push({
              type: 'bullet-list',
              items,
            });
            continue;
          }
        }

        // 6. Numbered list check (lines starting with 1. , 2. )
        const isNumberedLine = /^\s*\d+\.\s+/.test(rawLine);
        if (isNumberedLine) {
          const items: { label?: string; content: string; subItems?: string[] }[] = [];

          while (i < lines.length) {
            const curLine = lines[i];
            if (!curLine.trim()) break;

            if (
              /^#{1,4}\s+/.test(curLine.trim()) ||
              /^(\-{3,}|\_{3,}|\*{3,})$/.test(curLine.trim()) ||
              /^(\*\*[^*]+?\*\*[:]?)$/.test(curLine.trim())
            ) {
              break;
            }

            const isSubBullet = /^\s{2,}[•\-\*]\s+/.test(curLine);
            const isTopNumber = /^\s*\d+\.\s+/.test(curLine);

            if (isTopNumber) {
              const rawItem = curLine.replace(/^\s*\d+\.\s+/, '').trim();
              const extracted = extractLabelAndContent(rawItem);
              items.push({
                ...extracted,
                subItems: [],
              });
            } else if (isSubBullet && items.length > 0) {
              const rawSub = curLine.replace(/^\s+[•\-\*]\s+/, '').trim();
              items[items.length - 1].subItems?.push(rawSub);
            } else if (items.length > 0) {
              // Continuation line of the last item
              items[items.length - 1].content += ' ' + curLine.trim();
            } else {
              break;
            }
            i++;
          }

          if (items.length > 0) {
            parsed.push({
              type: 'numbered-list',
              items,
            });
            continue;
          }
        }

        // 7. Regular paragraph: gather consecutive lines until empty line or next block structure
        const pLines = [trimmed];
        i++;
        while (i < lines.length) {
          const nextRaw = lines[i];
          const nextTrimmed = nextRaw.trim();
          if (!nextTrimmed) {
            i++;
            break;
          }
          if (
            /^#{1,4}\s+/.test(nextTrimmed) ||
            /^(\-{3,}|\_{3,}|\*{3,})$/.test(nextTrimmed) ||
            /^(\*\*[^*]+?\*\*[:]?)$/.test(nextTrimmed) ||
            /^(CRITICAL EXAM PRINCIPLE|NOTE|Warning|Important):/i.test(nextTrimmed) ||
            /^(\*\*(CRITICAL EXAM PRINCIPLE|NOTE|Warning|Important)[^*]*\*\*[:]?)/i.test(nextTrimmed) ||
            /^\s*[•\-\*]\s+/.test(nextRaw) ||
            /^\s*\d+\.\s+/.test(nextRaw)
          ) {
            break;
          }
          pLines.push(nextTrimmed);
          i++;
        }

        parsed.push({
          type: 'paragraph',
          content: pLines.join(' '),
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
        if (block.type === 'heading-1') {
          return (
            <h2
              key={bIdx}
              className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-6 mb-2.5 pb-2 border-b border-[#E5E2D9] dark:border-[#38332B] tracking-tight"
            >
              <MathText text={block.content || ''} />
            </h2>
          );
        }

        if (block.type === 'heading-2') {
          return (
            <h3
              key={bIdx}
              className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-5 mb-2 tracking-tight"
            >
              <MathText text={block.content || ''} />
            </h3>
          );
        }

        if (block.type === 'heading-3') {
          return (
            <h4
              key={bIdx}
              className="text-[16px] sm:text-[17px] font-serif font-bold text-[#991B1B] dark:text-[#EF4444] mt-5 mb-2 tracking-tight flex items-center gap-2"
            >
              <span className="w-1.5 h-4 rounded-full bg-[#991B1B] dark:bg-[#EF4444] inline-block shrink-0" />
              <span><MathText text={block.content || ''} /></span>
            </h4>
          );
        }

        if (block.type === 'heading-4') {
          return (
            <h5
              key={bIdx}
              className="text-[15px] sm:text-[15.5px] font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-4 mb-1.5"
            >
              <MathText text={block.content || ''} />
            </h5>
          );
        }

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
                <div key={itemIdx} className="space-y-1.5">
                  <div className="flex items-start gap-3">
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
                  {/* Nested sub-bullets */}
                  {item.subItems && item.subItems.length > 0 && (
                    <div className="pl-6 space-y-1.5 pt-1">
                      {item.subItems.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#88847C] dark:bg-[#9E988E] shrink-0 mt-2" />
                          <div className={`flex-1 text-[13.5px] sm:text-[14px] leading-relaxed text-[#55514B] dark:text-[#B5B0A6]`}>
                            <MathText text={sub} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                <div key={itemIdx} className="space-y-1.5">
                  <div className="flex items-start gap-3">
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
                  {/* Nested sub-bullets */}
                  {item.subItems && item.subItems.length > 0 && (
                    <div className="pl-8 space-y-1.5 pt-1">
                      {item.subItems.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#88847C] dark:bg-[#9E988E] shrink-0 mt-2" />
                          <div className={`flex-1 text-[13.5px] sm:text-[14px] leading-relaxed text-[#55514B] dark:text-[#B5B0A6]`}>
                            <MathText text={sub} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        }

        if (block.type === 'divider') {
          return (
            <hr
              key={bIdx}
              className="my-5 border-t border-[#E5E2D9] dark:border-[#38332B]"
            />
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
