import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopicId } from '../types';
import { getLessonById } from '../data/lessonsData';
import { isValidTopicId, resolveRoutePath, getLessonPath } from '../routes/routesConfig';
import { LessonView } from '../components/lesson/LessonView';
import { BreadcrumbsBar } from '../components/layout/BreadcrumbsBar';
import { Compass, AlertCircle, ArrowRight } from 'lucide-react';

interface LessonPageProps {
  focusMode: boolean;
  onToggleFocusMode: () => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({ focusMode, onToggleFocusMode }) => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const validId = topicId && isValidTopicId(topicId) ? (topicId as TopicId) : null;
  const lesson = validId ? getLessonById(validId) : null;

  // Dynamically update document title for browser history and bookmarking
  useEffect(() => {
    if (lesson) {
      document.title = `${lesson.title.split(' (')[0]} | DSA Notes (CSE-241)`;
    } else {
      document.title = 'Lesson Not Found | DSA Notes';
    }
  }, [lesson]);

  if (!validId || !lesson) {
    return (
      <div className="space-y-6">
        <BreadcrumbsBar />
        <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center space-y-4 shadow-sm max-w-xl mx-auto my-12">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              Topic Not Found
            </h2>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] leading-relaxed">
              No curriculum lesson was registered under route <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[#991B1B] dark:text-[#EF4444]">/lessons/{topicId}</code>.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate(getLessonPath('course-overview'))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#991B1B] text-white text-xs font-serif font-bold hover:bg-[#7F1D1D] transition-colors cursor-pointer shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Return to Curriculum Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <BreadcrumbsBar currentTopicId={validId} />
      <LessonView
        lesson={lesson}
        onSelectTopic={(target) => {
          navigate(resolveRoutePath(target));
        }}
        focusMode={focusMode}
        onToggleFocusMode={onToggleFocusMode}
      />
    </div>
  );
};
