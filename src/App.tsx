import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { AppRoutes } from './routes/AppRoutes';
import { LESSONS } from './data/lessonsData';
import { ROUTES, resolveRoutePath, getLessonPath } from './routes/routesConfig';
import { Search, ArrowRight, X } from 'lucide-react';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);

  // Scroll to top and close mobile menu on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut handler for deep study
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusMode) {
        setFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode]);

  // Search filter across lessons and concepts
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return LESSONS.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.subtitle.toLowerCase().includes(q) ||
        l.overview.toLowerCase().includes(q) ||
        l.keyConcepts.some((c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) ||
        l.examQuestions.some((eq) => eq.question.toLowerCase().includes(q) || eq.solution.toLowerCase().includes(q)) ||
        (l.practiceProblems && l.practiceProblems.some((p) => p.title.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#141210] text-[#1A1A1A] dark:text-[#EDE8DF] flex flex-col font-sans selection:bg-[#991B1B] selection:text-white transition-colors">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenReport={() => {
          navigate(ROUTES.EXAM_REPORT);
          setSearchQuery('');
        }}
        onOpenCalculator={() => {
          navigate(ROUTES.ADDRESS_CALCULATOR);
          setSearchQuery('');
        }}
        onOpenMatrix={() => {
          navigate(ROUTES.COMPLEXITY_MATRIX);
          setSearchQuery('');
        }}
        onOpenGuide={() => {
          navigate(getLessonPath('course-overview'));
          setSearchQuery('');
        }}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        focusMode={focusMode}
        onToggleFocusMode={() => setFocusMode((prev) => !prev)}
      />

      {/* Floating Focus Mode Banner */}
      {focusMode && (
        <div className="sticky top-14 z-20 bg-[#1A1A1A]/90 dark:bg-[#EDE8DF]/90 text-white dark:text-[#1A1A1A] backdrop-blur-md px-4 py-1.5 flex items-center justify-between text-xs border-b border-[#2D2C2A] dark:border-[#E5E2D9] shadow-xs">
          <div className="flex items-center gap-2 font-serif">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Deep Study Focus Mode Active</span>
            <span className="text-[11px] opacity-75 font-mono hidden sm:inline">(Distractions minimized • Press Esc to exit)</span>
          </div>
          <button
            onClick={() => setFocusMode(false)}
            className="flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 transition-colors cursor-pointer"
          >
            <span>Exit Focus</span>
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 w-full mx-auto flex border-x border-[#E5E2D9] dark:border-[#38332B] bg-white/40 dark:bg-[#181614]/40 ${
        focusMode ? 'max-w-5xl' : 'max-w-7xl'
      }`}>
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          isCollapsed={focusMode || isSidebarCollapsed}
        />

        {/* Dynamic View Body */}
        <main className={`flex-1 p-4 sm:p-6 md:p-8 min-w-0 overflow-y-auto bg-[#F9F8F6]/60 dark:bg-[#141210]/80 transition-all ${
          focusMode ? 'max-w-4xl mx-auto' : 'max-w-5xl'
        }`}>
          {/* Active Search Results if search query exists */}
          {searchQuery.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
                <h2 className="text-xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#991B1B] dark:text-[#EF4444]" /> Search Index for <span className="italic">"{searchQuery}"</span>
                </h2>
                <span className="text-xs text-[#66625B] dark:text-[#A8A29E] font-mono">
                  {searchResults.length} {searchResults.length === 1 ? 'entry' : 'entries'} indexed
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center space-y-2 shadow-sm">
                  <div className="text-[#1A1A1A] dark:text-[#EDE8DF] font-serif text-base font-medium">No matching curriculum topics found.</div>
                  <p className="text-xs text-[#66625B] dark:text-[#A8A29E]">
                    Try searching for terms such as "Vector", "Heap", "Circular Queue", "Stack", "BST", "LeetCode", or "Address".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {searchResults.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => {
                        navigate(resolveRoutePath(res.id));
                        setSearchQuery('');
                      }}
                      className="p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] hover:border-[#991B1B]/60 dark:hover:border-[#EF4444]/60 cursor-pointer transition-all space-y-2 group shadow-sm hover:shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] group-hover:text-[#991B1B] dark:group-hover:text-[#EF4444] transition-colors">
                          {res.title}
                        </div>
                        <span className="text-xs font-mono font-medium text-[#991B1B] dark:text-[#EF4444] flex items-center gap-1">
                          Read Lesson <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <p className="text-xs text-[#66625B] dark:text-[#A8A29E] line-clamp-2 leading-relaxed">{res.overview}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <AppRoutes
              focusMode={focusMode}
              onToggleFocusMode={() => setFocusMode((prev) => !prev)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
