import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CATEGORIES, getCategoryForTopic } from '../../data/categoriesData';
import { LESSONS, LESSON_MAP } from '../../data/lessonsData';
import { TopicId } from '../../types';
import { MathText } from '../common/Latex';
import { resolveRoutePath, ROUTES } from '../../routes/routesConfig';
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
  FolderTree,
  Binary
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  onCloseMobile,
  isCollapsed = false
}) => {
  const { pathname } = useLocation();

  // Track open state for collapsible category sections (default: all open)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    orientation: true,
    foundations: true,
    linear: true,
    trees: true,
    graphs: true,
    algorithms: true
  });

  // Automatically open the category corresponding to the currently active route
  useEffect(() => {
    if (pathname.startsWith('/lessons/')) {
      const topicId = pathname.replace('/lessons/', '') as TopicId;
      const { category } = getCategoryForTopic(topicId);
      if (category) {
        setOpenCategories((prev) => ({ ...prev, [category.id]: true }));
      }
    }
  }, [pathname]);

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
      case 'Binary':
        return <Binary className="w-4 h-4" />;
      default:
        return <FolderTree className="w-4 h-4" />;
    }
  };

  const isReportActive = pathname === ROUTES.EXAM_REPORT || pathname === ROUTES.REPORT_ALIAS;
  const isCalcActive = pathname === ROUTES.ADDRESS_CALCULATOR || pathname === ROUTES.CALCULATOR_ALIAS;
  const isMatrixActive = pathname === ROUTES.COMPLEXITY_MATRIX || pathname === ROUTES.MATRIX_ALIAS;

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
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-[#FAF8F5] dark:bg-[#181614] border-r border-[#E5E2D9] dark:border-[#38332B] p-3 z-50 flex flex-col justify-between overflow-y-auto transition-all duration-200 select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:hidden' : 'lg:flex'}`}
      >
        <div className="space-y-4">
          {/* Mobile close header */}
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] uppercase tracking-wider">Curriculum Index</span>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Curriculum & High-Yield Strategy Section */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#88847C] dark:text-[#78716C] uppercase tracking-wider px-2 py-0.5">
              Reference Tools
            </div>

            <div className="space-y-0.5">
              <Link
                id="sidebar-exam-report"
                to={ROUTES.EXAM_REPORT}
                onClick={onCloseMobile}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                  isReportActive
                    ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] font-bold shadow-2xs'
                    : 'text-[#44403C] dark:text-[#D6D0C5] hover:bg-[#EFECE3] dark:hover:bg-[#25221E]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className={`w-3.5 h-3.5 ${isReportActive ? 'text-amber-300 dark:text-[#991B1B]' : 'text-[#991B1B] dark:text-[#EF4444]'}`} />
                  <span className="font-serif">7-Year Exam Report</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${isReportActive ? 'bg-[#333] dark:bg-[#D6D0C5] text-white dark:text-[#1A1A1A]' : 'bg-[#EFECE3] dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444]'}`}>
                  210M
                </span>
              </Link>

              <Link
                id="sidebar-address-calc"
                to={ROUTES.ADDRESS_CALCULATOR}
                onClick={onCloseMobile}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                  isCalcActive
                    ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] font-bold shadow-2xs'
                    : 'text-[#44403C] dark:text-[#D6D0C5] hover:bg-[#EFECE3] dark:hover:bg-[#25221E]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calculator className={`w-3.5 h-3.5 ${isCalcActive ? 'text-amber-300 dark:text-[#B45309]' : 'text-[#B45309] dark:text-[#FBBF24]'}`} />
                  <span className="font-serif">Address Solver</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${isCalcActive ? 'bg-[#333] dark:bg-[#D6D0C5] text-white dark:text-[#1A1A1A]' : 'bg-[#EFECE3] dark:bg-[#2A2622] text-[#B45309] dark:text-[#FBBF24]'}`}>
                  3D
                </span>
              </Link>

              <Link
                id="sidebar-complexity-matrix"
                to={ROUTES.COMPLEXITY_MATRIX}
                onClick={onCloseMobile}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                  isMatrixActive
                    ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] font-bold shadow-2xs'
                    : 'text-[#44403C] dark:text-[#D6D0C5] hover:bg-[#EFECE3] dark:hover:bg-[#25221E]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Table className={`w-3.5 h-3.5 ${isMatrixActive ? 'text-emerald-300 dark:text-[#15803D]' : 'text-[#15803D] dark:text-[#4ADE80]'}`} />
                  <span className="font-serif">STL Complexity Matrix</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${isMatrixActive ? 'bg-[#333] dark:bg-[#D6D0C5] text-white dark:text-[#1A1A1A]' : 'bg-[#EFECE3] dark:bg-[#2A2622] text-[#15803D] dark:text-[#4ADE80]'}`}>
                  O(1)
                </span>
              </Link>
            </div>
          </div>

          {/* Categorized Lessons Section (Clean Tree Style) */}
          <div className="space-y-3 pt-2 border-t border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center justify-between px-2">
              <div className="text-[10px] font-mono font-bold text-[#88847C] dark:text-[#78716C] uppercase tracking-wider">
                Topics ({LESSONS.length})
              </div>
            </div>

            <div className="space-y-2">
              {CATEGORIES.map((category) => {
                const isOpen = openCategories[category.id] !== false;
                const totalCategoryLessons = category.subCategories.reduce(
                  (acc, sub) => acc + sub.topicIds.length,
                  0
                );

                return (
                  <div key={category.id} className="space-y-0.5">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-2 py-1.5 rounded-lg flex items-center justify-between text-left hover:bg-[#EFECE3] dark:hover:bg-[#25221E] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[#991B1B] dark:text-[#EF4444] shrink-0">{getCategoryIcon(category.icon)}</span>
                        <span className="font-serif font-bold text-xs text-[#1A1A1A] dark:text-[#EDE8DF] truncate">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] font-mono text-[#88847C] dark:text-[#78716C]">
                          {totalCategoryLessons}
                        </span>
                        {isOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 text-[#88847C] dark:text-[#78716C]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#88847C] dark:text-[#78716C]" />
                        )}
                      </div>
                    </button>

                    {/* Subcategories and Topics in a clean left-ruled tree */}
                    {isOpen && (
                      <div className="pl-3 ml-2.5 border-l border-[#E5E2D9] dark:border-[#38332B] space-y-2 py-0.5">
                        {category.subCategories.map((subCategory) => (
                          <div key={subCategory.id} className="space-y-0.5">
                            {/* Subcategory Label */}
                            <div className="text-[10px] font-mono text-[#88847C] dark:text-[#78716C] px-2 pt-1 font-semibold">
                              {subCategory.name}
                            </div>

                            {/* Lessons in this Subcategory */}
                            <div className="space-y-0.5">
                              {subCategory.topicIds.map((topicId) => {
                                const lesson = LESSON_MAP[topicId];
                                if (!lesson) return null;
                                const topicPath = resolveRoutePath(topicId);
                                const isSelected = pathname === topicPath;

                                return (
                                  <Link
                                    key={topicId}
                                    id={`sidebar-lesson-${topicId}`}
                                    to={topicPath}
                                    onClick={onCloseMobile}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                                      isSelected
                                        ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] font-bold shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                                        : 'text-[#44403C] dark:text-[#D6D0C5] hover:bg-[#EFECE3]/70 dark:hover:bg-[#25221E]/70 hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
                                    }`}
                                  >
                                    <span className="truncate font-serif text-[12px]">
                                      <MathText text={lesson.title.split(' (')[0]} />
                                    </span>
                                  </Link>
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
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#E5E2D9] dark:border-[#38332B] text-center">
          <div className="text-[11px] font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
            CUET CSE-241
          </div>
          <div className="text-[10px] text-[#88847C] dark:text-[#78716C] font-mono">
            Interactive Notes & Visualizers
          </div>
        </div>
      </aside>
    </>
  );
};
