import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MathText, Latex } from './Latex';
import { CodeSpecBlock } from './RichLessonContent';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Preprocesses markdown text to ensure LaTeX delimiters ($...$ and $$...$$)
 * and math formulas are properly prepared for rendering.
 */
function prepareMarkdownWithMath(raw: string): string {
  if (!raw) return '';
  return raw;
}

/**
 * High-performance Markdown renderer with LaTeX and GFM table support
 */
export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = '' }) => {
  const prepared = prepareMarkdownWithMath(content);

  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            return (
              <div className="mb-4 text-sm sm:text-[15px] text-[#2C2B29] dark:text-[#E2DDD5] leading-[1.75]">
                {React.Children.map(children, (child) => {
                  if (typeof child === 'string') {
                    return <MathText text={child} />;
                  }
                  return child;
                })}
              </div>
            );
          },
          li: ({ children }) => {
            return (
              <li className="mb-2 text-sm sm:text-[15px] text-[#2C2B29] dark:text-[#E2DDD5] leading-relaxed">
                {React.Children.map(children, (child) => {
                  if (typeof child === 'string') {
                    return <MathText text={child} />;
                  }
                  return child;
                })}
              </li>
            );
          },
          th: ({ children }) => {
            return (
              <th className="px-3.5 py-2.5 text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] bg-[#F5F3ED] dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B]">
                {React.Children.map(children, (child) => {
                  if (typeof child === 'string') {
                    return <MathText text={child} />;
                  }
                  return child;
                })}
              </th>
            );
          },
          td: ({ children }) => {
            return (
              <td className="px-3.5 py-2.5 text-xs sm:text-sm text-[#2C2B29] dark:text-[#D6D0C5] font-sans border border-[#F0ECE1] dark:border-[#2C2824]">
                {React.Children.map(children, (child) => {
                  if (typeof child === 'string') {
                    return <MathText text={child} />;
                  }
                  return child;
                })}
              </td>
            );
          },
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            const codeString = String(children).replace(/\n$/, '');

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] text-[#991B1B] dark:text-[#EF4444] font-mono text-[12px]"
                  {...props}
                >
                  {codeString}
                </code>
              );
            }

            const lang = match ? match[1] : 'pseudocode';
            return (
              <CodeSpecBlock
                code={codeString}
                language={lang}
              />
            );
          },
          strong: ({ children }) => (
            <strong className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              {React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                  return <MathText text={child} />;
                }
                return child;
              })}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic">
              {React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                  return <MathText text={child} />;
                }
                return child;
              })}
            </em>
          ),
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-6 mb-2.5 pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
              {React.Children.map(children, (child) => (typeof child === 'string' ? <MathText text={child} /> : child))}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-5 mb-2">
              {React.Children.map(children, (child) => (typeof child === 'string' ? <MathText text={child} /> : child))}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[16px] sm:text-[17px] font-serif font-bold text-[#991B1B] dark:text-[#EF4444] mt-4 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#991B1B] dark:bg-[#EF4444] inline-block shrink-0" />
              <span>{React.Children.map(children, (child) => (typeof child === 'string' ? <MathText text={child} /> : child))}</span>
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-[15px] sm:text-[15.5px] font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-3 mb-1.5">
              {React.Children.map(children, (child) => (typeof child === 'string' ? <MathText text={child} /> : child))}
            </h4>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-[#991B1B] dark:border-[#EF4444] pl-3.5 italic text-sm text-[#57534E] dark:text-[#A8A29E] my-3 bg-[#FAF8F5] dark:bg-[#1E1B18] py-2 pr-3 rounded-r-lg">
              {children}
            </blockquote>
          ),
        }}
      >
        {prepared}
      </ReactMarkdown>
    </div>
  );
};
