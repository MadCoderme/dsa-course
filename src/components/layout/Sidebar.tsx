import React, { useState } from 'react';
import { CATEGORIES } from '../../data/categoriesData';
import { LESSONS, LESSON_MAP } from '../../data/lessonsData';
import { TopicId } from '../../types';
import { MathText } from '../common/Latex';
import { ThemeToggleBar } from '../common/ThemeToggleBar';
import {
  Layers,
  Compass,
  GitBranch,
  Award,
  Calculator,
  Table,
  X,
  Network,
  ChevronDown,
  ChevronRight,
  FolderTree
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
  // Track open state for collapsible category sections (default: all open)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    orientation: true,
    linear: true,
    trees: true,
    graphs: true
  });

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'GitBranch':
        return <GitBranch className="w-4 h-4" />;
      case 'Network':
        return <Network className="w-4 h-4" />;
      default:
        return <FolderTree className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-80 bg-[#F4F2EB] dark:bg-[#181614] lg:bg-transparent lg:dark:bg-transparent border-r border-[#E5E2D9] dark:border-[#38332B] p-3.5 z-50 flex flex-col justify-between overflow-y-auto transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-5">
          {/* Mobile close header */}
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] uppercase tracking-wider">Curriculum Index</span>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:text-[#EDE8DF] dark:hover:text-[#EDE8DF] dark:hover:text-[#EDE8DF]"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Curriculum & High-Yield Strategy Section */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono font-bold text-[#88847C] dark:text-[#78716C] uppercase tracking-wider px-2">
              Examination Tools & Strategy
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
                    ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#EDE8DF] shadow-2xs font-bold'
                    : 'bg-white/60 dark:bg-[#201D1A]/60 border-transparent text-[#2C2B29] dark:text-[#D6D0C5] hover:bg-white dark:bg-[#201D1A] dark:hover:bg-[#201D1A] hover:border-[#E5E2D9] dark:border-[#38332B] dark:hover:border-[#38332B]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className={`w-4 h-4 ${currentView === 'report' ? 'text-amber-300 dark:text-[#991B1B]' : 'text-[#991B1B] dark:text-[#EF4444]'}`} />
                  <span className="font-serif text-[13px]">7-Year Exam Report</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentView === 'report' ? 'bg-[#333] dark:bg-[#D6D0C5] text-white dark:text-[#1A1A1A]' : 'bg-[#F4F2EB] dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] border border-[#E5E2D9] dark:border-[#38332B]'}`}>
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
                    ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#EDE8DF] shadow-2xs font-bold'
                    : 'bg-white/60 dark:bg-[#201D1A]/60 border-transparent text-[#2C2B29] dark:text-[#D6D0C5] hover:bg-white dark:bg-[#201D1A] dark:hover:bg-[#201D1A] hover:border-[#E5E2D9] dark:border-[#38332B] dark:hover:border-[#38332B]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calculator className={`w-4 h-4 ${currentView === 'calculator' ? 'text-amber-300 dark:text-[#B45309]' : 'text-[#B45309] dark:text-[#FBBF24]'}`} />
                  <span className="font-serif text-[13px]">Address Formula Solver</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentView === 'calculator' ? 'bg-[#333] dark:bg-[#D6D0C5] text-white dark:text-[#1A1A1A]' : 'bg-[#F4F2EB] dark:bg-[#2A2622] text-[#B45309] dark:text-[#FBBF24] border border-[#E5E2D9] dark:border-[#38332B]'}`}>
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
                    ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#EDE8DF] shadow-2xs font-bold'
                    : 'bg-white/60 dark:bg-[#201D1A]/60 border-transparent text-[#2C2B29] dark:text-[#D6D0C5] hover:bg-white dark:bg-[#201D1A] dark:hover:bg-[#201D1A] hover:border-[#E5E2D9] dark:border-[#38332B] dark:hover:border-[#38332B]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Table className={`w-4 h-4 ${currentView === 'matrix' ? 'text-emerald-300 dark:text-[#15803D]' : 'text-[#15803D] dark:text-[#4ADE80]'}`} />
                  <span className="font-serif text-[13px]">STL Complexity Matrix</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentView === 'matrix' ? 'bg-[#333] dark:bg-[#D6D0C5] text-white dark:text-[#1A1A1A]' : 'bg-[#F4F2EB] dark:bg-[#2A2622] text-[#15803D] dark:text-[#4ADE80] border border-[#E5E2D9] dark:border-[#38332B]'}`}>
                  O(1)
                </span>
              </button>
            </div>
          </div>

          {/* Categorized Lessons Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="text-[10px] font-mono font-bold text-[#88847C] dark:text-[#78716C] uppercase tracking-wider">
                Curriculum Categories
              </div>
              <span className="text-[10px] font-mono text-[#66625B] dark:text-[#A8A29E]">
                {LESSONS.length} Lessons
              </span>
            </div>

            {CATEGORIES.map((category) => {
              const isOpen = openCategories[category.id] !== false;
              // Count lessons in this category
              const totalCategoryLessons = category.subCategories.reduce(
                (acc, sub) => acc + sub.topicIds.length,
                0
              );

              return (
                <div key={category.id} className="rounded-xl border border-[#E5E2D9] dark:border-[#38332B] bg-white/70 dark:bg-[#201D1A]/70 overflow-hidden shadow-2xs">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] dark:bg-[#181614] border-b border-[#E5E2D9] dark:border-[#38332B] flex items-center justify-between hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622] transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#991B1B] dark:text-[#EF4444]">{getCategoryIcon(category.icon)}</span>
                      <span className="font-serif font-bold text-xs text-[#1A1A1A] dark:text-[#EDE8DF] truncate">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#F4F2EB] dark:bg-[#2A2622] text-[#66625B] dark:text-[#A8A29E] border border-[#E5E2D9] dark:border-[#38332B]">
                        {totalCategoryLessons}
                      </span>
                      {isOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#88847C] dark:text-[#78716C]" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-[#88847C] dark:text-[#78716C]" />
                      )}
                    </div>
                  </button>

                  {/* Subcategories and Topics */}
                  {isOpen && (
                    <div className="p-2 space-y-3">
                      {category.subCategories.map((subCategory) => (
                        <div key={subCategory.id} className="space-y-1">
                          {/* Subcategory Label */}
                          <div className="text-[10px] font-mono font-semibold text-[#88847C] dark:text-[#78716C] px-2 pt-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#88847C] dark:bg-[#78716C]" />
                            <span>{subCategory.name}</span>
                          </div>

                          {/* Lessons in this Subcategory */}
                          <div className="space-y-0.5">
                            {subCategory.topicIds.map((topicId) => {
                              const lesson = LESSON_MAP[topicId];
                              if (!lesson) return null;
                              const isSelected = currentView === topicId;

                              return (
                                <button
                                  key={topicId}
                                  id={`sidebar-lesson-${topicId}`}
                                  onClick={() => {
                                    onSelectView(topicId);
                                    onCloseMobile();
                                  }}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all cursor-pointer border ${
                                    isSelected
                                      ? 'bg-white dark:bg-[#2A2622] border-[#991B1B] dark:border-[#EF4444] shadow-2xs text-[#1A1A1A] dark:text-[#EDE8DF] font-bold'
                                      : 'bg-white/30 dark:bg-[#201D1A]/30 border-transparent text-[#2C2B29] dark:text-[#D6D0C5] hover:bg-white dark:bg-[#201D1A] dark:hover:bg-[#201D1A] hover:border-[#E5E2D9] dark:border-[#38332B] dark:hover:border-[#38332B]'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0 pr-1">
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                        isSelected ? 'bg-[#991B1B] dark:bg-[#EF4444]' : 'bg-[#D8D4C8] dark:bg-[#423D36]'
                                      }`}
                                    />
                                    <span
                                      className={`truncate font-serif text-[12px] ${
                                        isSelected ? 'text-[#991B1B] dark:text-[#EF4444]' : 'text-[#1A1A1A] dark:text-[#EDE8DF]'
                                      }`}
                                    >
                                      <MathText text={lesson.title.split(' (')[0]} />
                                    </span>
                                  </div>

                                  {lesson.timeComplexity?.access && <span
                                    className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
                                      isSelected
                                        ? 'bg-[#FEE2E2] dark:bg-[#450A0A]/60 text-[#991B1B] dark:text-[#FCA5A5] border border-[#FECACA] dark:border-[#7F1D1D]'
                                        : 'bg-[#F4F2EB] dark:bg-[#2A2622] text-[#66625B] dark:text-[#A8A29E]'
                                    }`}
                                  >
                                    <MathText text={lesson.timeComplexity.access.split(' ')[0]} />
                                  </span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info & Theme Switcher */}
        <div className="pt-4 border-t border-[#E5E2D9] dark:border-[#38332B] space-y-2.5 text-center">
          <div className="flex justify-center">
            <ThemeToggleBar size="sm" showLabel={true} />
          </div>
          <div>
            <div className="text-[11px] font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              CUET CSE-241 Data Structure
            </div>
            <div className="text-[10px] text-[#88847C] dark:text-[#78716C] font-mono">
              Interactive Notes & Visualizers
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
