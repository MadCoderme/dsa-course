import React from 'react';
import { LESSONS } from '../../data/lessonsData';
import { TopicId } from '../../types';
import {
  Layers,
  ShieldCheck,
  Compass,
  Shuffle,
  TrendingUp,
  GitBranch,
  Award,
  Calculator,
  Table,
  Bookmark,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: 'report' | 'calculator' | 'matrix' | TopicId;
  onSelectView: (view: 'report' | 'calculator' | 'matrix' | TopicId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  mobileOpen,
  onCloseMobile
}) => {
  const getTopicIcon = (id: TopicId) => {
    switch (id) {
      case 'vector':
        return <Layers className="w-3.5 h-3.5" />;
      case 'set':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'map':
        return <Compass className="w-3.5 h-3.5" />;
      case 'stack':
        return <Layers className="w-3.5 h-3.5" />;
      case 'queue':
        return <Shuffle className="w-3.5 h-3.5" />;
      case 'priority-queue':
        return <TrendingUp className="w-3.5 h-3.5" />;
      case 'list':
        return <GitBranch className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-[#F4F2EB] lg:bg-transparent border-r border-[#E5E2D9] p-4 z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Mobile close header */}
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-[#E5E2D9]">
            <span className="text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">Archive Index</span>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-[#66625B] hover:text-[#1A1A1A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Curriculum & High-Yield Strategy Section */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono font-bold text-[#88847C] uppercase tracking-wider px-2">
              Examination Insights
            </div>

            <div className="space-y-1">
              <button
                id="sidebar-exam-report"
                onClick={() => {
                  onSelectView('report');
                  onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border ${
                  currentView === 'report'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xs font-bold'
                    : 'bg-white/60 border-transparent text-[#2C2B29] hover:bg-white hover:border-[#E5E2D9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className={`w-4 h-4 ${currentView === 'report' ? 'text-amber-300' : 'text-[#991B1B]'}`} />
                  <span className="font-serif text-[13px]">7-Year Exam Report</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentView === 'report' ? 'bg-[#333] text-white' : 'bg-[#F4F2EB] text-[#991B1B] border border-[#E5E2D9]'}`}>
                  210M
                </span>
              </button>

              <button
                id="sidebar-address-calc"
                onClick={() => {
                  onSelectView('calculator');
                  onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border ${
                  currentView === 'calculator'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xs font-bold'
                    : 'bg-white/60 border-transparent text-[#2C2B29] hover:bg-white hover:border-[#E5E2D9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calculator className={`w-4 h-4 ${currentView === 'calculator' ? 'text-amber-300' : 'text-[#B45309]'}`} />
                  <span className="font-serif text-[13px]">Address Formula Solver</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentView === 'calculator' ? 'bg-[#333] text-white' : 'bg-[#F4F2EB] text-[#B45309] border border-[#E5E2D9]'}`}>
                  3D
                </span>
              </button>

              <button
                id="sidebar-complexity-matrix"
                onClick={() => {
                  onSelectView('matrix');
                  onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border ${
                  currentView === 'matrix'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xs font-bold'
                    : 'bg-white/60 border-transparent text-[#2C2B29] hover:bg-white hover:border-[#E5E2D9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Table className={`w-4 h-4 ${currentView === 'matrix' ? 'text-emerald-300' : 'text-[#15803D]'}`} />
                  <span className="font-serif text-[13px]">STL Complexity Matrix</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentView === 'matrix' ? 'bg-[#333] text-white' : 'bg-[#F4F2EB] text-[#15803D] border border-[#E5E2D9]'}`}>
                  O(1)
                </span>
              </button>
            </div>
          </div>

          {/* Lessons Section */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono font-bold text-[#88847C] uppercase tracking-wider px-2">
              Curriculum Chapters ({LESSONS.length})
            </div>

            <div className="space-y-1">
              {LESSONS.map((lesson, idx) => {
                const isSelected = currentView === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    id={`sidebar-lesson-${lesson.id}`}
                    onClick={() => {
                      onSelectView(lesson.id);
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-white border-[#991B1B] shadow-2xs text-[#1A1A1A] font-bold'
                        : 'bg-white/40 border-transparent text-[#2C2B29] hover:bg-white hover:border-[#E5E2D9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 border ${
                          isSelected
                            ? 'bg-[#991B1B] text-white border-[#991B1B]'
                            : 'bg-[#F4F2EB] text-[#66625B] border-[#D8D4C8]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className={`truncate font-serif text-[13px] ${isSelected ? 'text-[#991B1B]' : 'text-[#1A1A1A]'}`}>
                        {lesson.title.split(' (')[0]}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        isSelected
                          ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                          : 'bg-[#F4F2EB] text-[#66625B] border border-[#E5E2D9]'
                      }`}
                    >
                      {lesson.timeComplexity.access}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-[#E5E2D9] space-y-1 text-center">
          <div className="text-[11px] font-serif font-bold text-[#1A1A1A]">
            CUET CSE-241 Data Structure
          </div>
          <div className="text-[10px] text-[#88847C] font-mono">
            Interactive Notes & Visualizers
          </div>
        </div>
      </aside>
    </>
  );
};
