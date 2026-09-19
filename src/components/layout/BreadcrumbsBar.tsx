import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getBreadcrumbs, getSurroundingLessons, getLessonPath, isValidTopicId } from '../../routes/routesConfig';
import { TopicId } from '../../types';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Compass
} from 'lucide-react';

interface BreadcrumbsBarProps {
  currentTopicId?: TopicId;
}

export const BreadcrumbsBar: React.FC<BreadcrumbsBarProps> = ({ currentTopicId }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState<boolean>(false);

  const breadcrumbs = getBreadcrumbs(pathname);
  const surrounding = currentTopicId && isValidTopicId(currentTopicId)
    ? getSurroundingLessons(currentTopicId)
    : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono">
      {/* Left: Breadcrumbs trail */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto text-[#66625B] dark:text-[#A8A29E] py-0.5">
        <Link
          to={getLessonPath('course-overview')}
          className="flex items-center gap-1 hover:text-[#991B1B] dark:hover:text-[#EF4444] transition-colors shrink-0"
          title="Curriculum Overview"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Curriculum</span>
        </Link>

        {breadcrumbs.slice(1).map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 2;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-[#B0ABA0] dark:text-[#57524A] shrink-0" />
              {crumb.path && !isLast ? (
                <Link
                  to={crumb.path}
                  className="hover:text-[#991B1B] dark:hover:text-[#EF4444] transition-colors truncate max-w-[140px] sm:max-w-none"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={`truncate max-w-[180px] sm:max-w-none ${
                    isLast
                      ? 'text-[#1A1A1A] dark:text-[#EDE8DF] font-semibold'
                      : 'text-[#66625B] dark:text-[#A8A29E]'
                  }`}
                >
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Right: Lesson Stepper & Copy URL Button */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Step indicator */}
        {surrounding && surrounding.currentIndex > 0 && (
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#1C1A18] border border-[#E5E2D9] dark:border-[#38332B] text-[#88847C] dark:text-[#78716C]">
            Topic {surrounding.currentIndex} of {surrounding.total}
          </span>
        )}

        {/* Previous Lesson */}
        {surrounding?.prev && (
          <button
            onClick={() => navigate(getLessonPath(surrounding.prev!.id))}
            className="p-1 sm:px-2 sm:py-1 rounded-md border border-[#E5E2D9] dark:border-[#38332B] hover:bg-[#FAF8F5] dark:hover:bg-[#1E1B18] text-[#44403C] dark:text-[#D6D0C5] hover:text-[#991B1B] dark:hover:text-[#EF4444] transition-colors flex items-center gap-1 cursor-pointer"
            title={`Previous: ${surrounding.prev.title.split(' (')[0]}`}
            aria-label="Previous Topic"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px]">Prev</span>
          </button>
        )}

        {/* Next Lesson */}
        {surrounding?.next && (
          <button
            onClick={() => navigate(getLessonPath(surrounding.next!.id))}
            className="p-1 sm:px-2 sm:py-1 rounded-md border border-[#E5E2D9] dark:border-[#38332B] hover:bg-[#FAF8F5] dark:hover:bg-[#1E1B18] text-[#44403C] dark:text-[#D6D0C5] hover:text-[#991B1B] dark:hover:text-[#EF4444] transition-colors flex items-center gap-1 cursor-pointer"
            title={`Next: ${surrounding.next.title.split(' (')[0]}`}
            aria-label="Next Topic"
          >
            <span className="hidden md:inline text-[11px]">Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Copy Direct Route Link */}
        <button
          onClick={handleCopyLink}
          className={`px-2 py-1 rounded-md border transition-all flex items-center gap-1 cursor-pointer text-[11px] ${
            copied
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'border-[#E5E2D9] dark:border-[#38332B] hover:bg-[#FAF8F5] dark:hover:bg-[#1E1B18] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
          }`}
          title="Copy direct route URL for this topic"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3 h-3" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
