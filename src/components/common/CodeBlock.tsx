import React, { useState, useMemo } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import { CodeSnippet } from '../../types';

interface CodeBlockProps {
  snippets: CodeSnippet[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ snippets }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = snippets[activeIdx] || snippets[0];

  const handleCopy = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const highlightedCode = useMemo(() => {
    if (!activeSnippet) return '';
    const lang = activeSnippet.language.toLowerCase();
    const grammar = Prism.languages[lang] || Prism.languages.cpp || Prism.languages.clike;
    try {
      return Prism.highlight(activeSnippet.code, grammar, lang);
    } catch {
      return activeSnippet.code;
    }
  }, [activeSnippet]);

  const codeLines = useMemo(() => {
    if (!activeSnippet) return [];
    return activeSnippet.code.split('\n');
  }, [activeSnippet]);

  if (!activeSnippet) return null;

  return (
    <div className="rounded-xl overflow-hidden border border-[#E5E2D9] bg-white font-mono text-xs shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-[#FAF8F5] border-b border-[#E5E2D9] gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          {snippets.map((snip, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeIdx === idx
                  ? 'bg-white text-[#991B1B] shadow-2xs border border-[#D8D4C8]'
                  : 'text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="uppercase text-[10px] px-1 py-0.2 bg-[#F4F2EB] rounded text-[#44403C]">
                {snip.language}
              </span>
              <span className="font-sans font-medium text-xs">{snip.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#1A1A1A] text-xs font-sans font-semibold transition-colors cursor-pointer ml-auto shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5 text-[#66625B]" />}
          {copied ? 'Copied' : 'Copy Code'}
        </button>
      </div>

      {/* Code Text with line numbers */}
      <div className="p-4 sm:p-5 overflow-x-auto text-[#1A1A1A] bg-[#FAF8F5]/50 leading-relaxed font-mono text-[12px] sm:text-[13px] flex">
        {/* Line numbers */}
        <div className="select-none pr-4 text-right text-[#A8A29E] font-mono border-r border-[#E5E2D9] mr-4 hidden sm:block shrink-0">
          {codeLines.map((_, i) => (
            <div key={i} className="leading-relaxed">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Highlighted syntax */}
        <pre className="overflow-x-auto w-full leading-relaxed">
          <code
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={`language-${activeSnippet.language.toLowerCase()}`}
          />
        </pre>
      </div>

      {/* Explanation Footer */}
      {activeSnippet.explanation && (
        <div className="px-4 sm:px-5 py-3 bg-[#FAF8F5] border-t border-[#E5E2D9] font-sans text-xs text-[#44403C]">
          <span className="font-serif font-bold text-[#1A1A1A]">Key Takeaway: </span>
          {activeSnippet.explanation}
        </div>
      )}
    </div>
  );
};

