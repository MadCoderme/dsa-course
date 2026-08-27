import React, { useState, useEffect } from 'react';
import { EXAM_METADATA, WEIGHTAGE_MATRIX, INITIAL_HIGH_YIELD_CHECKLIST } from '../../data/curriculumData';
import { HighYieldChecklistItem, TopicId } from '../../types';
import { Award, BookOpen, Flame, TrendingUp, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathText } from '../common/Latex';

interface ExamReportDashboardProps {
  onSelectTopic: (topicId: TopicId) => void;
}

export const ExamReportDashboard: React.FC<ExamReportDashboardProps> = ({ onSelectTopic }) => {
  const [checklist, setChecklist] = useState<HighYieldChecklistItem[]>(() => {
    const saved = localStorage.getItem('dsa_high_yield_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_HIGH_YIELD_CHECKLIST;
      }
    }
    return INITIAL_HIGH_YIELD_CHECKLIST;
  });

  useEffect(() => {
    localStorage.setItem('dsa_high_yield_checklist', JSON.stringify(checklist));
  }, [checklist]);

  const toggleChecklist = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          if (nextCompleted) {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 }
            });
          }
          return { ...item, completed: nextCompleted };
        }
        return item;
      })
    );
  };

  const completedCount = checklist.filter((c) => c.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-8" id="exam-report-dashboard">
      {/* Top Banner / Executive Summary Card */}
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] p-6 md:p-8 shadow-sm">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#D8D4C8] dark:border-[#423D36] text-[#991B1B] dark:text-[#EF4444]">
            <Award className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" /> CUET CSE-241 Data Structure Syllabus (2018–2025 Analysis)
          </div>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] tracking-tight">
            CSE-241 Examination Strategy & Curriculum Breakdown
          </h1>

          <p className="text-sm md:text-base text-[#44403C] dark:text-[#D6D0C5] leading-relaxed font-sans">
            Analytical breakdown of 7 examination papers (2018, 2019, 2021, 2022, 2023, 2024, 2025) totaling 210 marks per paper. Master the high-yield topics, step-by-step simulation templates, and C-style procedure implementations.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
              <div className="text-[11px] text-[#66625B] dark:text-[#A8A29E] font-serif font-semibold">Total Paper Marks</div>
              <div className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-0.5 font-mono">210 Marks</div>
              <div className="text-[10px] text-[#88847C] dark:text-[#78716C] font-mono">3 Hours Duration</div>
            </div>
            <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
              <div className="text-[11px] text-[#66625B] dark:text-[#A8A29E] font-serif font-semibold">Paper Architecture</div>
              <div className="text-xl font-bold text-[#991B1B] dark:text-[#EF4444] mt-0.5 font-mono">Sec-A & Sec-B</div>
              <div className="text-[10px] text-[#88847C] dark:text-[#78716C] font-mono">8 Main Questions</div>
            </div>
            <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
              <div className="text-[11px] text-[#66625B] dark:text-[#A8A29E] font-serif font-semibold">Exam Cycles Analyzed</div>
              <div className="text-xl font-bold text-[#15803D] dark:text-[#4ADE80] mt-0.5 font-mono">7 Years</div>
              <div className="text-[10px] text-[#88847C] dark:text-[#78716C] font-mono">2018 to 2025</div>
            </div>
            <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
              <div className="text-[11px] text-[#66625B] dark:text-[#A8A29E] font-serif font-semibold">High-Yield Mastery</div>
              <div className="text-xl font-bold text-[#B45309] dark:text-[#FBBF24] mt-0.5 font-mono">{progressPercent}%</div>
              <div className="text-[10px] text-[#88847C] dark:text-[#78716C] font-mono">{completedCount}/{checklist.length} Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Style Breakdown */}
      <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-xs">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#991B1B] dark:text-[#EF4444]" /> Exam Question Archetype Distribution
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXAM_METADATA.questionBalance.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#1A1A1A] dark:text-[#EDE8DF] font-mono">
                  ~{item.percentage}%
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B] dark:bg-[#EF4444]" />
              </div>
              <div className="text-xs font-serif font-bold text-[#2C2B29] dark:text-[#D6D0C5]">{item.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Yield Must-Master Checklist */}
      <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#B45309] dark:text-[#FBBF24]" /> Top 10 High-Yield "Must-Master" Exam Checklist
            </h2>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
              Click checkboxes as you master each high-scoring recurring exam pattern.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-28 h-2 bg-[#EFECE3] dark:bg-[#2A2622] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#15803D] dark:bg-[#4ADE80] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-[#2C2B29] dark:text-[#D6D0C5]">{progressPercent}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3.5 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                item.completed
                  ? 'bg-[#F0FDF4] dark:bg-[#064E3B]/30 border-[#BBF7D0] dark:border-[#059669]/40 text-[#14532D] dark:text-[#34D399]'
                  : 'bg-[#FAF8F5] dark:bg-[#181614] border-[#E5E2D9] dark:border-[#38332B] hover:border-[#B3ADA1] dark:hover:border-[#524B40] text-[#2C2B29] dark:text-[#D6D0C5]'
              }`}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {}}
                className="mt-0.5 rounded border-[#D8D4C8] dark:border-[#423D36] text-[#15803D] focus:ring-[#15803D] cursor-pointer"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-serif font-bold ${item.completed ? 'line-through text-[#66625B] dark:text-[#78716C]' : 'text-[#1A1A1A] dark:text-[#EDE8DF]'}`}>
                    {item.id}. <MathText text={item.title} />
                  </span>
                </div>
                <div className="text-[11px] text-[#66625B] dark:text-[#A8A29E] leading-snug font-sans">
                  <MathText text={item.description} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic-Wise Weightage Matrix Table */}
      <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-xs">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#991B1B] dark:text-[#EF4444]" /> Module Importance, Frequency & Weightage Matrix
        </h2>

        <div className="overflow-x-auto rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F4F2EB] dark:bg-[#2A2622] text-[#2C2B29] dark:text-[#EDE8DF] border-b border-[#E5E2D9] dark:border-[#38332B]">
              <tr>
                <th className="p-3 font-serif font-bold">Module / Topic</th>
                <th className="p-3 text-center font-serif font-bold">7-Year Questions</th>
                <th className="p-3 text-center font-serif font-bold">Avg. Marks / Paper</th>
                <th className="p-3 font-serif font-bold">Importance</th>
                <th className="p-3 font-serif font-bold">Key Exam Topics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2D9] dark:divide-[#38332B] bg-white dark:bg-[#201D1A]">
              {WEIGHTAGE_MATRIX.map((topic) => (
                <tr key={topic.moduleNumber} className="hover:bg-[#FAF8F5] dark:hover:bg-[#2A2622]/50 transition-colors">
                  <td className="p-3 font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                    <span className="text-[#88847C] dark:text-[#78716C] mr-2">M{topic.moduleNumber}.</span>
                    {topic.name}
                  </td>
                  <td className="p-3 text-center font-bold text-[#991B1B] dark:text-[#EF4444]">{topic.questionsCount} Parts</td>
                  <td className="p-3 text-center font-bold text-[#15803D] dark:text-[#4ADE80]">{topic.avgMarks}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4F2EB] dark:bg-[#2A2622] border border-[#E5E2D9] dark:border-[#38332B] text-[#2C2B29] dark:text-[#D6D0C5]">
                      {topic.importance}
                    </span>
                  </td>
                  <td className="p-3 font-sans text-[#44403C] dark:text-[#D6D0C5] text-[11px]">
                    <div className="flex flex-wrap gap-1">
                      {topic.keyTopics.map((k, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-[#2C2B29] dark:text-[#D6D0C5]">
                          <MathText text={k} />
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7-Year Evolution Trends */}
      <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-xs">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#15803D] dark:text-[#4ADE80]" /> Yearly Evolution Trends (2018 → 2025)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <div className="text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444]">1. Shift to Procedural Problem-Solving (2023–2025)</div>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed font-sans">
              Recent papers heavily emphasize practical C-code procedure writing (e.g. array group reversal, list splitting, two-pointer filtering) over simple static definitions.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <div className="text-xs font-serif font-bold text-[#15803D] dark:text-[#4ADE80]">2. Expansion of Advanced Trees (2022–2025)</div>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed font-sans">
              Order-4 B+ Trees and Order-3/4 M-Way Search Trees have become guaranteed fixtures alongside classical AVL rotations and B-Trees.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <div className="text-xs font-serif font-bold text-[#B45309] dark:text-[#FBBF24]">3. Array State & Execution Traces</div>
            <p className="text-xs text-[#44403C] dark:text-[#D6D0C5] leading-relaxed font-sans">
              Explicit marks are assigned for displaying the exact array state after each iteration of Heapsort, Radix sort passes, and recursion stack evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
