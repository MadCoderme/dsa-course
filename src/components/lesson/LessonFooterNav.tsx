import React from 'react';
import { LESSONS } from '../../data/lessonsData';
import { TopicId } from '../../types';
import { ChevronLeft, ChevronRight, BookOpen, Compass } from 'lucide-react';

interface LessonFooterNavProps {
  currentTopicId: TopicId;
  onSelectTopic: (topicId: TopicId | 'report' | 'calculator' | 'matrix' | 'flashcards') => void;
}

export const LessonFooterNav: React.FC<LessonFooterNavProps> = ({ currentTopicId, onSelectTopic }) => {
  // Exclude course-overview from sequential index
  const sequentialLessons = LESSONS.filter((l) => l.id !== 'course-overview');
  const currentIndex = sequentialLessons.findIndex((l) => l.id === currentTopicId);

  if (currentIndex === -1) return null;

  const prevLesson = currentIndex > 0 ? sequentialLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sequentialLessons.length - 1 ? sequentialLessons[currentIndex + 1] : null;

  const handleNavigate = (targetId: TopicId | 'course-overview') => {
    onSelectTopic(targetId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-6 border-t border-[#E5E2D9] dark:border-[#38332B] space-y-4" id="lesson-footer-nav">
      <div className="flex items-center justify-between text-xs font-mono text-[#88847C] dark:text-[#78716C]">
        <span>Sequential Curriculum Navigation</span>
        <span>Lesson {currentIndex + 1} of {sequentialLessons.length}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Previous Lesson Card */}
        {prevLesson ? (
          <button
            onClick={() => handleNavigate(prevLesson.id)}
            className="p-4 rounded-xl bg-white dark:bg-[#201D1A] hover:bg-[#FAF8F5] dark:hover:bg-[#2A2622] border border-[#E5E2D9] dark:border-[#38332B] hover:border-[#991B1B]/40 dark:hover:border-[#EF4444]/40 transition-all text-left flex items-center gap-3 cursor-pointer group shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex items-center justify-center text-[#66625B] dark:text-[#A8A29E] group-hover:text-[#991B1B] dark:group-hover:text-[#EF4444] shrink-0 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase font-bold text-[#88847C] dark:text-[#78716C]">
                Previous Lesson
              </div>
              <div className="text-xs sm:text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] group-hover:text-[#991B1B] dark:group-hover:text-[#EF4444] transition-colors truncate">
                {prevLesson.title}
              </div>
            </div>
          </button>
        ) : (
          <button
            onClick={() => handleNavigate('course-overview')}
            className="p-4 rounded-xl bg-white dark:bg-[#201D1A] hover:bg-[#FAF8F5] dark:hover:bg-[#2A2622] border border-[#E5E2D9] dark:border-[#38332B] transition-all text-left flex items-center gap-3 cursor-pointer group shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex items-center justify-center text-[#66625B] dark:text-[#A8A29E] shrink-0">
              <Compass className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase font-bold text-[#88847C] dark:text-[#78716C]">
                Curriculum Start
              </div>
              <div className="text-xs sm:text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] truncate">
                Course Roadmap Overview
              </div>
            </div>
          </button>
        )}

        {/* Next Lesson Card */}
        {nextLesson ? (
          <button
            onClick={() => handleNavigate(nextLesson.id)}
            className="p-4 rounded-xl bg-white dark:bg-[#201D1A] hover:bg-[#FAF8F5] dark:hover:bg-[#2A2622] border border-[#E5E2D9] dark:border-[#38332B] hover:border-[#991B1B]/40 dark:hover:border-[#EF4444]/40 transition-all text-right flex items-center justify-end gap-3 cursor-pointer group shadow-2xs"
          >
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase font-bold text-[#88847C] dark:text-[#78716C]">
                Next Lesson
              </div>
              <div className="text-xs sm:text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] group-hover:text-[#991B1B] dark:group-hover:text-[#EF4444] transition-colors truncate">
                {nextLesson.title}
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex items-center justify-center text-[#66625B] dark:text-[#A8A29E] group-hover:text-[#991B1B] dark:group-hover:text-[#EF4444] shrink-0 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        ) : (
          <button
            onClick={() => onSelectTopic('report')}
            className="p-4 rounded-xl bg-[#ECFDF5] dark:bg-[#064E3B]/20 hover:bg-[#D1FAE5] dark:hover:bg-[#064E3B]/40 border border-[#A7F3D0] dark:border-[#059669]/40 transition-all text-right flex items-center justify-end gap-3 cursor-pointer group shadow-2xs"
          >
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase font-bold text-[#065F46] dark:text-[#34D399]">
                Course Completed!
              </div>
              <div className="text-xs sm:text-sm font-serif font-bold text-[#15803D] dark:text-[#4ADE80] truncate">
                Review 7-Year Exam Archive
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#064E3B] border border-[#A7F3D0] dark:border-[#059669] flex items-center justify-center text-[#15803D] dark:text-[#4ADE80] shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};