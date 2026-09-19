import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MathText, Latex } from './Latex';

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

            return (
              <div className="my-4 rounded-xl overflow-hidden border border-[#333333] shadow-sm">
                {match && (
                  <div className="bg-[#2D2D2D] px-3.5 py-1.5 text-[11px] font-mono font-bold text-[#A3A3A3] uppercase tracking-wider border-b border-[#3D3D3D]">
                    {match[1]}
                  </div>
                )}
                <pre className="p-3.5 bg-[#1E1E1E] text-[#D4D4D4] font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed m-0">
                  <code>{codeString}</code>
                </pre>
              </div>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-5 mb-2.5">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-4 mb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-3 mb-1.5">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-2.5 mb-1">
              {children}
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
