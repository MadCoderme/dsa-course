import React, { useState } from 'react';
import { PracticeProblem } from '../../types';
import { ExternalLink, CheckCircle2, Circle, Code2, Sparkles } from 'lucide-react';

interface PracticeProblemsProps {
  problems?: PracticeProblem[];
  topicTitle: string;
}

export const PracticeProblems: React.FC<PracticeProblemsProps> = ({ problems = [], topicTitle }) => {
  const [platformFilter, setPlatformFilter] = useState<'All' | 'LeetCode' | 'Codeforces' | 'Other'>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('dsa_solved_problems');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSolved = (id: string) => {
    const next = { ...solvedMap, [id]: !solvedMap[id] };
    setSolvedMap(next);
    try {
      localStorage.setItem('dsa_solved_problems', JSON.stringify(next));
    } catch (e) {
      console.error('Failed to persist solved status:', e);
    }
  };

  const filteredProblems = problems.filter((p) => {
    const matchesPlatform =
      platformFilter === 'All'
        ? true
        : platformFilter === 'Other'
        ? p.platform !== 'LeetCode' && p.platform !== 'Codeforces'
        : p.platform === platformFilter;

    const matchesDifficulty =
      difficultyFilter === 'All'
        ? true
        : p.difficulty.toLowerCase().includes(difficultyFilter.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.keyPattern && p.keyPattern.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.problemNumber && p.problemNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.tags && p.tags.some((t) => t && t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesPlatform && matchesDifficulty && matchesSearch;
  });

  const solvedCount = problems.filter((p) => solvedMap[p.id]).length;
  const progressPercent = problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0;

  if (problems.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-center space-y-2">
        <p className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
          Curated practice problems are being assembled for {topicTitle}.
        </p>
        <p className="text-xs text-[#66625B] dark:text-[#A8A29E]">
          Explore the solved past semester exam archives and interactive laboratories above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overview & Progress Bar Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
              Essential LeetCode & Codeforces Problem Set
            </h3>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
              Handpicked problems mapped strictly to the data structure and core operations taught in this lesson.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                {solvedCount} / {problems.length} Mastered
              </div>
              <div className="text-[10px] text-[#66625B] dark:text-[#A8A29E] font-mono">
                {progressPercent}% Complete
              </div>
            </div>
            <div className="w-16 sm:w-24 h-2 rounded-full bg-[#E5E2D9] dark:bg-[#2A2622] overflow-hidden">
              <div
                className="h-full bg-[#15803D] dark:bg-[#4ADE80] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="pt-2 border-t border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center justify-between gap-2">
          {/* Platform & Difficulty Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Platform Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['All', 'LeetCode', 'Codeforces', 'Other'] as const).map((plat) => (
                <button
                  key={plat}
                  onClick={() => setPlatformFilter(plat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer border ${
                    platformFilter === plat
                      ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] border-[#1A1A1A] dark:border-[#EDE8DF]'
                      : 'bg-[#FAF8F5] dark:bg-[#181614] text-[#66625B] dark:text-[#A8A29E] border-[#E5E2D9] dark:border-[#38332B] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622]'
                  }`}
                >
                  {plat === 'All' ? `All (${problems.length})` : plat}
                </button>
              ))}
            </div>

            {/* Difficulty Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer border ${
                    difficultyFilter === diff
                      ? 'bg-[#991B1B] dark:bg-[#EF4444] text-white border-[#991B1B] dark:border-[#EF4444] font-bold'
                      : 'bg-[#FAF8F5] dark:bg-[#181614] text-[#66625B] dark:text-[#A8A29E] border-[#E5E2D9] dark:border-[#38332B] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem, pattern or tag..."
              className="w-full px-3 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs text-[#1A1A1A] dark:text-[#EDE8DF] placeholder-[#88847C] dark:placeholder-[#78716C] focus:outline-none focus:border-[#991B1B] dark:focus:border-[#EF4444]"
            />
          </div>
        </div>
      </div>

      {/* Problems Grid / List */}
      <div className="grid grid-cols-1 gap-3">
        {filteredProblems.map((prob) => {
          const isSolved = !!solvedMap[prob.id];

          return (
            <div
              key={prob.id}
              className={`p-4 sm:p-5 rounded-xl bg-white dark:bg-[#201D1A] border transition-all duration-200 shadow-xs flex flex-col justify-between gap-3 ${
                isSolved
                  ? 'border-[#86EFAC] dark:border-[#059669]/60 bg-[#F0FDF4]/40 dark:bg-[#064E3B]/20'
                  : 'border-[#E5E2D9] dark:border-[#38332B] hover:border-[#991B1B]/50 dark:hover:border-[#EF4444]/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Checkbox and Title */}
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    onClick={() => toggleSolved(prob.id)}
                    className="mt-0.5 text-[#88847C] dark:text-[#78716C] hover:text-[#15803D] dark:text-[#4ADE80] dark:hover:text-[#4ADE80] transition-colors cursor-pointer shrink-0"
                    title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                  >
                    {isSolved ? (
                      <CheckCircle2 className="w-5 h-5 text-[#15803D] dark:text-[#4ADE80] fill-[#DCFCE7] dark:fill-[#064E3B]" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Platform Badge */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                          prob.platform === 'LeetCode'
                            ? 'bg-[#FFFBEB] dark:bg-[#78350F]/30 text-[#B45309] dark:text-[#FBBF24] border-[#FDE68A] dark:border-[#B45309]/50'
                            : prob.platform === 'Codeforces'
                            ? 'bg-[#EFF6FF] dark:bg-[#1E3A8A]/30 text-[#1D4ED8] dark:text-[#60A5FA] border-[#BFDBFE] dark:border-[#1E40AF]/50'
                            : 'bg-[#F4F2EB] dark:bg-[#2A2622] text-[#66625B] dark:text-[#D6D0C5] border-[#D8D4C8] dark:border-[#423D36]'
                        }`}
                      >
                        {prob.platform} {prob.problemNumber ? `#${prob.problemNumber}` : ''}
                      </span>

                      {/* Difficulty Badge */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                          prob.difficulty.toLowerCase().includes('easy') || prob.difficulty.startsWith('800')
                            ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/30 text-[#15803D] dark:text-[#4ADE80] border-[#A7F3D0] dark:border-[#059669]/40'
                            : prob.difficulty.toLowerCase().includes('medium') || prob.difficulty.startsWith('1300')
                            ? 'bg-[#FFFBEB] dark:bg-[#78350F]/30 text-[#B45309] dark:text-[#FBBF24] border-[#FDE68A] dark:border-[#B45309]/50'
                            : 'bg-[#FEF2F2] dark:bg-[#450A0A]/40 text-[#991B1B] dark:text-[#F87171] border-[#FECACA] dark:border-[#991B1B]/50'
                        }`}
                      >
                        {prob.difficulty}
                      </span>

                      {prob.acceptanceOrRating && (
                        <span className="text-[10px] font-mono text-[#88847C] dark:text-[#78716C]">
                          {prob.acceptanceOrRating}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                      <a
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#991B1B] dark:text-[#EF4444] dark:hover:text-[#EF4444] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>{prob.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      </a>
                    </h4>

                    <p className="text-xs text-[#66625B] dark:text-[#D6D0C5] leading-relaxed">
                      {prob.description}
                    </p>
                  </div>
                </div>

                {/* Direct Solve Button */}
                <a
                  href={prob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:bg-[#2A2622] dark:hover:bg-[#2A2622] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono font-semibold text-[#1A1A1A] dark:text-[#EDE8DF] hover:text-[#991B1B] dark:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Solve</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Core Invariant & Pattern Callout */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5E2D9] dark:border-[#38332B]/70 dark:border-[#38332B] text-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#991B1B] dark:text-[#EF4444]">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Pattern: <strong>{prob.keyPattern}</strong></span>
                </div>

                {prob.tags && prob.tags.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {prob.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeProblems;