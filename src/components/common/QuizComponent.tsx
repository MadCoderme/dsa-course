import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircle2, XCircle, HelpCircle, RefreshCw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathText } from './Latex';

interface QuizComponentProps {
  quizzes: QuizQuestion[];
  topicTitle: string;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ quizzes, topicTitle }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (qId: string, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizzes.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score === quizzes.length) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = quizzes.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="space-y-6" id="quiz-component-container">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between p-5 rounded-xl bg-white border border-[#E5E2D9] gap-3 shadow-xs">
        <div>
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#991B1B]" /> {topicTitle} Practice Assessment
          </h3>
          <p className="text-xs text-[#66625B] mt-0.5 font-sans">
            Test your conceptual grasp and recurring exam question patterns.
          </p>
        </div>

        {submitted && (
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] text-[#1A1A1A]">
              Score: {score} / {quizzes.length} ({Math.round((score / quizzes.length) * 100)}%)
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#D8D4C8] text-[#1A1A1A] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retake
            </button>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {quizzes.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-[#F4F2EB] border border-[#D8D4C8] text-[#991B1B] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm font-serif font-bold text-[#1A1A1A]">
                  <MathText text={q.question} />
                </span>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 pl-9">
                {q.options.map((opt, optIdx) => {
                  let optClasses = 'bg-[#FAF8F5] border-[#E5E2D9] text-[#2C2B29] hover:border-[#B3ADA1]';

                  if (selected === optIdx) {
                    optClasses = 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B] font-semibold';
                  }

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optClasses = 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46] font-bold';
                    } else if (selected === optIdx && !isCorrect) {
                      optClasses = 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${optClasses}`}
                    >
                      <span className="leading-relaxed"><MathText text={opt} /></span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 ml-2" />
                      )}
                      {submitted && selected === optIdx && !isCorrect && (
                        <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation when submitted */}
              {submitted && (
                <div className="mt-3 ml-9 p-4 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-1 text-xs">
                  <div className="font-serif font-bold text-[#1A1A1A]">Official Explanation:</div>
                  <div className="text-[#44403C] leading-relaxed font-sans">
                    <MathText text={q.explanation} />
                  </div>
                  {q.examTip && (
                    <div className="text-[11px] text-[#B45309] pt-1 font-mono">
                      💡 Exam Tip: <MathText text={q.examTip} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-6 py-2.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] disabled:opacity-40 text-white text-xs font-serif font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Award className="w-4 h-4 text-amber-300" /> Submit Answers
          </button>
        </div>
      )}
    </div>
  );
};
