import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Calculator,
  Award,
  Table,
  Menu,
  Compass,
  PanelLeftClose,
  PanelLeft,
  Maximize2,
  Minimize2,
  ChevronDown,
  Wrench
} from 'lucide-react';
import { ThemeToggleBar } from '../common/ThemeToggleBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenReport: () => void;
  onOpenCalculator: () => void;
  onOpenMatrix: () => void;
  onOpenGuide?: () => void;
  onToggleMobileMenu: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  focusMode?: boolean;
  onToggleFocusMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenReport,
  onOpenCalculator,
  onOpenMatrix,
  onOpenGuide,
  onToggleMobileMenu,
  isSidebarCollapsed = false,
  onToggleSidebar,
  focusMode = false,
  onToggleFocusMode
}) => {
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close tools dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    if (toolsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toolsOpen]);

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F9F8F6]/95 dark:bg-[#181614]/95 backdrop-blur-md border-b border-[#E5E2D9] dark:border-[#38332B] px-3 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Mobile menu toggle + Desktop sidebar toggle + Branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] lg:hidden cursor-pointer shadow-2xs"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Desktop sidebar collapse/expand toggle */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="hidden lg:flex p-2 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] cursor-pointer shadow-2xs transition-colors"
              title={isSidebarCollapsed ? 'Show Curriculum Sidebar' : 'Collapse Sidebar for Study Focus'}
              aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          )}

          {/* App Logo / Brand */}
          <div
            onClick={onOpenGuide || onOpenReport}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] dark:bg-[#EDE8DF] text-[#F9F8F6] dark:text-[#181614] flex flex-col items-center justify-center font-serif font-bold text-sm shadow-2xs border border-[#2D2C2A] dark:border-[#E5E2D9] group-hover:bg-[#991B1B] dark:group-hover:bg-[#EF4444] dark:group-hover:text-white transition-colors">
              <span>§</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] tracking-tight group-hover:text-[#991B1B] dark:group-hover:text-[#EF4444] transition-colors">
                  DSA Notes
                </span>
                <span className="hidden sm:inline text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F4F2EB] dark:bg-[#2A2622] text-[#88847C] dark:text-[#A8A29E] border border-[#E5E2D9] dark:border-[#38332B]">
                  CSE-241
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-sm sm:max-w-md relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-[#88847C] dark:text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes, algorithms, exam proofs..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#38332B] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] placeholder-[#88847C] dark:placeholder-[#78716C] focus:outline-none focus:border-[#991B1B] dark:focus:border-[#EF4444] focus:ring-1 focus:ring-[#991B1B]/20 dark:focus:ring-[#EF4444]/20 transition-colors shadow-2xs"
          />
        </div>

        {/* Right Tools: Focus Mode, Streamlined Tools Dropdown, Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Focus / Deep Study Mode Toggle */}
          {onToggleFocusMode && (
            <button
              id="header-focus-mode-btn"
              onClick={onToggleFocusMode}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-serif font-semibold flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                focusMode
                  ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-xs'
                  : 'bg-white dark:bg-[#201D1A] hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] border-[#D8D4C8] dark:border-[#38332B] text-[#2C2B29] dark:text-[#EDE8DF]'
              }`}
              title={focusMode ? 'Exit Distraction-Free Study Mode (Esc)' : 'Enter Distraction-Free Deep Study Mode'}
            >
              {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" />}
              <span className="hidden sm:inline">{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </button>
          )}

          {/* Unified Study Tools Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="header-tools-dropdown-btn"
              onClick={() => setToolsOpen(!toolsOpen)}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#201D1A] hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#38332B] text-[#2C2B29] dark:text-[#EDE8DF] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              aria-expanded={toolsOpen}
            >
              <Wrench className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24]" />
              <span className="hidden md:inline">Exam Tools</span>
              <ChevronDown className="w-3 h-3 text-[#88847C] dark:text-[#78716C]" />
            </button>

            {toolsOpen && (
              <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-lg py-1.5 z-50 text-xs font-sans">
                <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-[#88847C] dark:text-[#78716C] uppercase tracking-wider border-b border-[#E5E2D9] dark:border-[#38332B]">
                  Curriculum Reference Tools
                </div>

                {onOpenGuide && (
                  <button
                    onClick={() => {
                      onOpenGuide();
                      setToolsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] flex items-center gap-2.5 text-[#1A1A1A] dark:text-[#EDE8DF] cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" />
                    <div>
                      <div className="font-serif font-bold">Curriculum Guide</div>
                      <div className="text-[10px] text-[#66625B] dark:text-[#A8A29E]">4-phase learning progression</div>
                    </div>
                  </button>
                )}

                <button
                  onClick={() => {
                    onOpenReport();
                    setToolsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] flex items-center gap-2.5 text-[#1A1A1A] dark:text-[#EDE8DF] cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" />
                  <div>
                    <div className="font-serif font-bold">7-Year Exam Report</div>
                    <div className="text-[10px] text-[#66625B] dark:text-[#A8A29E]">High-yield topics & mark weights</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onOpenCalculator();
                    setToolsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] flex items-center gap-2.5 text-[#1A1A1A] dark:text-[#EDE8DF] cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24]" />
                  <div>
                    <div className="font-serif font-bold">Address Formula Solver</div>
                    <div className="text-[10px] text-[#66625B] dark:text-[#A8A29E]">1D, 2D, 3D memory derivations</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onOpenMatrix();
                    setToolsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4F2EB] dark:hover:bg-[#2A2622] flex items-center gap-2.5 text-[#1A1A1A] dark:text-[#EDE8DF] cursor-pointer"
                >
                  <Table className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" />
                  <div>
                    <div className="font-serif font-bold">STL Complexity Matrix</div>
                    <div className="text-[10px] text-[#66625B] dark:text-[#A8A29E]">All container operational bounds</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Bar */}
          <ThemeToggleBar size="sm" showLabel={false} />
        </div>
      </div>
    </header>
  );
};
