import React from 'react';
import { Search, Calculator, Award, Table, Menu } from 'lucide-react';
import { TopicId } from '../../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenReport: () => void;
  onOpenCalculator: () => void;
  onOpenMatrix: () => void;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenReport,
  onOpenCalculator,
  onOpenMatrix,
  onToggleMobileMenu
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E5E2D9] px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-lg bg-white border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB] lg:hidden cursor-pointer shadow-2xs"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={onOpenReport}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#1A1A1A] text-[#F9F8F6] flex flex-col items-center justify-center font-serif font-bold text-base shadow-sm border border-[#2D2C2A] group-hover:bg-[#991B1B] transition-colors">
              <span>§</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-serif font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#991B1B] transition-colors">
                  DSA Archive
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F4F2EB] border border-[#D8D4C8] text-[#991B1B]">
                  CSE-241
                </span>
              </div>
              <p className="text-[11px] text-[#66625B] font-serif italic hidden sm:block">
                CUET Exam Syllabus & Interactive Notes (2018–2025)
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="w-4 h-4 text-[#88847C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search index (e.g. Heapsort, Vector, B+ Tree, Address)..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] placeholder-[#88847C] focus:outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B]/20 transition-colors shadow-2xs"
          />
        </div>

        {/* Right Tools Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            id="nav-exam-report-btn"
            onClick={onOpenReport}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#2C2B29] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Award className="w-3.5 h-3.5 text-[#991B1B]" />
            <span className="hidden sm:inline">Exam Report</span>
          </button>

          <button
            id="nav-address-calc-btn"
            onClick={onOpenCalculator}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#2C2B29] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Calculator className="w-3.5 h-3.5 text-[#B45309]" />
            <span className="hidden sm:inline">Address Solver</span>
          </button>

          <button
            id="nav-complexity-matrix-btn"
            onClick={onOpenMatrix}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#2C2B29] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Table className="w-3.5 h-3.5 text-[#15803D]" />
            <span className="hidden sm:inline">STL Matrix</span>
          </button>
        </div>
      </div>
    </header>
  );
};
