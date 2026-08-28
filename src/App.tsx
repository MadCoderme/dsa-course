import React, { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LessonView } from './components/lesson/LessonView';
import { ExamReportDashboard } from './components/exam/ExamReportDashboard';
import { AddressCalculator } from './components/exam/AddressCalculator';
import { ComplexityMatrix } from './components/exam/ComplexityMatrix';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LESSONS } from './data/lessonsData';
import { TopicId } from './types';
import { Search, ArrowRight } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'report' | 'calculator' | 'matrix' | TopicId>('course-overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Search filter across lessons and concepts with safe null-checking
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return LESSONS.filter(
      (l) =>
        (l.title && l.title.toLowerCase().includes(q)) ||
        (l.subtitle && l.subtitle.toLowerCase().includes(q)) ||
        (l.overview && l.overview.toLowerCase().includes(q)) ||
        (l.keyConcepts && l.keyConcepts.some((c) => (c.title && c.title.toLowerCase().includes(q)) || (c.description && c.description.toLowerCase().includes(q)))) ||
        (l.examQuestions && l.examQuestions.some((eq) => (eq.question && eq.question.toLowerCase().includes(q)) || (eq.solution && eq.solution.toLowerCase().includes(q)))) ||
        (l.practiceProblems && l.practiceProblems.some((p) => (p.title && p.title.toLowerCase().includes(q)) || (p.platform && p.platform.toLowerCase().includes(q)) || (p.tags && p.tags.some((t) => t && t.toLowerCase().includes(q)))))
    );
  }, [searchQuery]);

  const activeLesson = LESSONS.find((l) => l.id === currentView);

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#141210] text-[#1A1A1A] dark:text-[#EDE8DF] flex flex-col font-sans selection:bg-[#991B1B] selection:text-white transition-colors">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenReport={() => setCurrentView('report')}
        onOpenCalculator={() => setCurrentView('calculator')}
        onOpenMatrix={() => setCurrentView('matrix')}
        onOpenGuide={() => setCurrentView('course-overview')}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex border-x border-[#E5E2D9] dark:border-[#38332B] bg-white/40 dark:bg-[#181614]/40">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onSelectView={(view) => {
            setCurrentView(view);
            setSearchQuery('');
          }}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-5 md:p-8 min-w-0 max-w-5xl overflow-y-auto bg-[#F9F8F6]/60 dark:bg-[#141210]/80">
          <ErrorBoundary>
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
                          setCurrentView(res.id);
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
            ) : currentView === 'report' ? (
              <ExamReportDashboard onSelectTopic={(id) => setCurrentView(id)} />
            ) : currentView === 'calculator' ? (
              <AddressCalculator />
            ) : currentView === 'matrix' ? (
              <ComplexityMatrix />
            ) : activeLesson ? (
              <LessonView lesson={activeLesson} onSelectTopic={(id) => setCurrentView(id)} />
            ) : (
              <ExamReportDashboard onSelectTopic={(id) => setCurrentView(id)} />
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default App;