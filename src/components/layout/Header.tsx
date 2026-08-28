import React from 'react';
import { Search, Calculator, Award, Table, Menu, Compass, Sparkles } from 'lucide-react';
import { ThemeToggleBar } from '../common/ThemeToggleBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenReport: () => void;
  onOpenCalculator: () => void;
  onOpenMatrix: () => void;`n  onOpenFlashcards?: () => void;
  onOpenGuide?: () => void;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenReport,
  onOpenCalculator,
  onOpenMatrix,`n  onOpenFlashcards,
  onOpenGuide,
  onToggleMobileMenu
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#F9F8F6]/90 dark:bg-[#181614]/90 backdrop-blur-md border-b border-[#E5E2D9] dark:border-[#38332B] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622] lg:hidden cursor-pointer shadow-2xs"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={onOpenReport}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#1A1A1A] dark:bg-[#EDE8DF] text-[#F9F8F6] dark:text-[#181614] flex flex-col items-center justify-center font-serif font-bold text-base shadow-sm border border-[#2D2C2A] dark:border-[#E5E2D9] group-hover:bg-[#991B1B] dark:group-hover:bg-[#EF4444] dark:group-hover:text-white transition-colors">
              <span>§</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] tracking-tight group-hover:text-[#991B1B] dark:text-[#EF4444] dark:group-hover:text-[#EF4444] transition-colors">
                  DSA Notes
                </span>
              </div>
              <p className="text-[11px] text-[#66625B] dark:text-[#A8A29E] font-serif italic hidden sm:block">
                Like How It Should Be
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="w-4 h-4 text-[#88847C] dark:text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search index (e.g. Heapsort, Vector, B+ Tree, Address)..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#38332B] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] placeholder-[#88847C] dark:placeholder-[#78716C] focus:outline-none focus:border-[#991B1B] dark:focus:border-[#EF4444] focus:ring-1 focus:ring-[#991B1B]/20 dark:focus:ring-[#EF4444]/20 transition-colors shadow-2xs"
          />
        </div>

        {/* Right Tools Shortcuts & Theme Toggle Bar */}
        <div className="flex items-center gap-2">
          {onOpenGuide && (
            <button
              id="nav-guide-btn"
              onClick={onOpenGuide}
              className="px-3 py-1.5 rounded-lg bg-[#FEF2F2] dark:bg-[#450A0A]/40 hover:bg-[#FEE2E2] dark:hover:bg-[#450A0A]/70 border border-[#FECACA] dark:border-[#7F1D1D]/60 text-[#991B1B] dark:text-[#FCA5A5] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#FCA5A5]" />
              <span className="hidden sm:inline">Study Guide</span>
            </button>
          )}

          <button
            id="nav-exam-report-btn"
            onClick={onOpenReport}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#201D1A] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#38332B] text-[#2C2B29] dark:text-[#EDE8DF] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Award className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" />
            <span className="hidden sm:inline">Exam Report</span>
          </button>

          <button
            id="nav-address-calc-btn"
            onClick={onOpenCalculator}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#201D1A] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#38332B] text-[#2C2B29] dark:text-[#EDE8DF] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Calculator className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24]" />
            <span className="hidden sm:inline">Address Solver</span>
          </button>

          <button
            id="nav-complexity-matrix-btn"
            onClick={onOpenMatrix}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#201D1A] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#38332B] text-[#2C2B29] dark:text-[#EDE8DF] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Table className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" />
            <span className="hidden sm:inline">STL Matrix</span>
          </button>

          {/* Dedicated Theme Toggle Bar */}
          <ThemeToggleBar size="md" showLabel={true} />
        </div>
      </div>
    </header>
  );
};
