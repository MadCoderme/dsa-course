import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getLessonPath } from '../routes/routesConfig';
import { Compass, ArrowRight, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 - Page Not Found | DSA Notes';
  }, []);

  return (
    <div className="p-8 sm:p-14 rounded-2xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center space-y-5 shadow-sm max-w-lg mx-auto my-12">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-[#991B1B] dark:text-[#EF4444] flex items-center justify-center mx-auto">
        <FileQuestion className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#991B1B] dark:text-[#EF4444]">
          Error 404
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
          Route Does Not Exist
        </h1>
        <p className="text-xs text-[#66625B] dark:text-[#A8A29E] max-w-sm mx-auto leading-relaxed">
          The curriculum route you requested could not be located in the centralized DSA notes routing registry.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => navigate(getLessonPath('course-overview'))}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#991B1B] text-white text-xs font-serif font-bold hover:bg-[#7F1D1D] transition-colors cursor-pointer shadow-sm"
        >
          <Compass className="w-4 h-4" />
          <span>Curriculum Overview</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <Link
          to="/exam-report"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#E5E2D9] dark:border-[#38332B] text-xs font-serif font-medium text-[#44403C] dark:text-[#D6D0C5] hover:bg-[#FAF8F5] dark:hover:bg-[#1C1A18] transition-colors"
        >
          <span>7-Year Exam Report</span>
        </Link>
      </div>
    </div>
  );
};
