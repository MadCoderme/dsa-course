import React, { useState } from 'react';
import { Lesson, TopicId } from '../../types';
import { getCategoryForTopic } from '../../data/categoriesData';
import { VectorVisualizer } from '../visualizers/VectorVisualizer';
import { SetVisualizer } from '../visualizers/SetVisualizer';
import { MapVisualizer } from '../visualizers/MapVisualizer';
import { StackVisualizer } from '../visualizers/StackVisualizer';
import { QueueVisualizer } from '../visualizers/QueueVisualizer';
import { PriorityQueueVisualizer } from '../visualizers/PriorityQueueVisualizer';
import { ListVisualizer } from '../visualizers/ListVisualizer';
import { TreeVisualizer } from '../visualizers/TreeVisualizer';
import { AvlTreeVisualizer } from '../visualizers/AvlTreeVisualizer';
import { BstRbtVisualizer } from '../visualizers/BstRbtVisualizer';
import { BTreeVisualizer } from '../visualizers/BTreeVisualizer';
import { HuffmanVisualizer } from '../visualizers/HuffmanVisualizer';
import { MstVisualizer } from '../visualizers/MstVisualizer';
import { GraphVisualizer } from '../visualizers/GraphVisualizer';
import { RoadmapNavigator } from '../common/RoadmapNavigator';
import { LandingOverview } from '../common/LandingOverview';
import { CodeBlock } from '../common/CodeBlock';
import { QuizComponent } from '../common/QuizComponent';
import { Latex, MathText, FormulaBlock } from '../common/Latex';
import { MarkdownContent } from '../common/MarkdownContent';
import {
  BookOpen,
  Sparkles,
  Code2,
  FileQuestion,
  HelpCircle,
  Flame,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Compass,
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onSelectTopic?: (topicId: TopicId | 'report' | 'calculator' | 'matrix') => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onSelectTopic }) => {
  if (lesson.id === 'course-overview') {
    return <LandingOverview onSelectTopic={onSelectTopic || (() => {})} />;
  }

  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>(() => {
    const firstId = lesson.examQuestions?.[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });

  const { category, subCategory } = getCategoryForTopic(lesson.id);

  const toggleQuestion = (qId: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper to render contextual inline visualizer right below the corresponding concept
  const renderInlineVisualizer = (conceptIdx: number) => {
    if (lesson.id === 'course-overview') {
      if (conceptIdx === 1) {
        return onSelectTopic ? <RoadmapNavigator onSelectTopic={onSelectTopic} /> : null;
      }
      return null;
    }

    switch (lesson.id) {
      case 'vector':
        if (conceptIdx === 0) return <VectorVisualizer focusedMode="reallocLab" />;
        if (conceptIdx === 1) return <VectorVisualizer focusedMode="shiftLab" />;
        if (conceptIdx === 2) return <VectorVisualizer focusedMode="standard" />;
        return null;

      case 'list':
        if (conceptIdx === 0) return <ListVisualizer focusedMode="singly" />;
        if (conceptIdx === 1) return <ListVisualizer focusedMode="doubly" />;
        if (conceptIdx === 2) return <ListVisualizer focusedMode="reversalLab" />;
        if (conceptIdx === 3) return <ListVisualizer focusedMode="poly" />;
        return null;

      case 'stack':
        if (conceptIdx === 0) return <StackVisualizer focusedMode="single" />;
        if (conceptIdx === 1) return <StackVisualizer focusedMode="dual" />;
        if (conceptIdx === 2) return <StackVisualizer focusedMode="infix" />;
        return null;

      case 'queue':
        if (conceptIdx === 0) return <QueueVisualizer focusedMode="linear" />;
        if (conceptIdx === 1) return <QueueVisualizer focusedMode="circular" />;
        if (conceptIdx === 2) return <QueueVisualizer focusedMode="ring" />;
        return null;

      case 'tree':
        if (conceptIdx === 0) return <TreeVisualizer focusedMode="properties" />;
        if (conceptIdx === 1) return <TreeVisualizer focusedMode="conversion" />;
        return <TreeVisualizer focusedMode="properties" />;

      case 'tree-traversals':
        return <TreeVisualizer focusedMode="traversal" />;

      case 'expression-threaded-trees':
        if (conceptIdx === 0) return <TreeVisualizer focusedMode="expression" />;
        return <TreeVisualizer focusedMode="threaded" />;

      case 'bst-rbt':
        if (conceptIdx === 0) return <BstRbtVisualizer focusedMode="bst-ops" />;
        if (conceptIdx === 1) return <BstRbtVisualizer focusedMode="deletion" />;
        return <BstRbtVisualizer focusedMode="bst-ops" />;

      case 'red-black-tree':
        if (conceptIdx === 0) return <BstRbtVisualizer focusedMode="rbt-invariants" />;
        return <BstRbtVisualizer focusedMode="rbt-insert" />;

      case 'avl-tree':
        return <AvlTreeVisualizer focusedMode="rotations" />;

      case 'b-tree':
        return <BTreeVisualizer focusedMode="btree" />;

      case 'b-plus-tree':
        return <BTreeVisualizer focusedMode="bplus" />;

      case 'huffman-coding':
        return <HuffmanVisualizer />;

      case 'priority-queue':
        return <PriorityQueueVisualizer />;

      case 'mst':
        if (conceptIdx === 0 || conceptIdx === 1) return <MstVisualizer focusedMode="kruskal" />;
        if (conceptIdx === 2) return <MstVisualizer focusedMode="prim" />;
        return <MstVisualizer focusedMode="kruskal" />;

      case 'set':
        if (conceptIdx === 0) return <SetVisualizer focusedMode="ordered" />;
        if (conceptIdx === 1) return <SetVisualizer focusedMode="unordered" />;
        return null;

      case 'map':
        if (conceptIdx === 0) return <MapVisualizer focusedMode="frequency" />;
        if (conceptIdx === 1) return <MapVisualizer focusedMode="graph" />;
        if (conceptIdx === 2) return <MapVisualizer focusedMode="custom" />;
        return null;

      case 'graph-representations':
        return <GraphVisualizer focusedMode="representations" />;

      case 'graph':
        if (conceptIdx === 0) return <GraphVisualizer focusedMode="bfs" />;
        if (conceptIdx === 1) return <GraphVisualizer focusedMode="dfs" />;
        return <GraphVisualizer focusedMode="bfs" />;

      case 'topological-sort':
        return <GraphVisualizer focusedMode="topological" />;

      case 'shortest-path-dijkstra':
        return <GraphVisualizer focusedMode="dijkstra" />;

      case 'floyd-warshall':
        return <GraphVisualizer focusedMode="warshall" />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8" id={`lesson-view-${lesson.id}`}>
      {/* 1. Master Lesson Header */}
      <div className="p-5 sm:p-7 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
        {/* Category & Subcategory Breadcrumb */}
        {category && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#88847C]">
            <span className="font-bold text-[#1A1A1A]">{category.name}</span>
            <span>&rsaquo;</span>
            <span className="text-[#991B1B] font-semibold">{subCategory?.name}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-2">
            {lesson.importance && <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F4F2EB] border border-[#D8D4C8] text-[#2C2B29]">
              {lesson?.importance}
            </span>}
            <span className="text-xs text-[#991B1B] font-mono font-semibold">Curriculum Topic</span>
          </div>

          {/* Time Complexity Badges with Math */}
          {lesson.timeComplexity && <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E5E2D9] text-[#2C2B29] flex items-center gap-1.5">
              Access: <strong className="text-[#15803D]"><MathText text={lesson.timeComplexity.access} /></strong>
            </span>
            <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E5E2D9] text-[#2C2B29] flex items-center gap-1.5">
              Insert: <strong className="text-[#15803D]"><MathText text={lesson.timeComplexity.insertion} /></strong>
            </span>
            <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E5E2D9] text-[#2C2B29] flex items-center gap-1.5">
              Delete: <strong className="text-[#15803D]"><MathText text={lesson.timeComplexity.deletion} /></strong>
            </span>
          </div>}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-sm text-[#66625B] mt-1 font-serif italic">{lesson.subtitle}</p>
        </div>

        {/* Beginner Intuition & Mental Model Callout */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#1A1A1A]">
            <Compass className="w-4 h-4 text-[#991B1B]" />
            <span>Beginner's Mental Model & Intuition</span>
          </div>
          <div className="text-xs sm:text-sm text-[#2C2B29] leading-relaxed font-sans">
            <MathText text={lesson.overview} />
          </div>
        </div>

        {/* CUET Exam Relevance Alert Box */}
        {lesson.cuetExamRelevance && <div className="p-3.5 sm:p-4 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B] leading-relaxed flex items-start gap-2.5">
          <Flame className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
          <div>
            <strong className="font-serif font-bold text-[#991B1B]">Exam Context & Significance: </strong>
            <span className="font-sans text-[#7F1D1D]"><MathText text={lesson.cuetExamRelevance} /></span>
          </div>
        </div>}
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="sticky top-2 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#D8D4C8] shadow-sm overflow-x-auto">
        <button
          onClick={() => scrollToSection('sec-fundamentals')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold text-[#44403C] hover:bg-[#F4F2EB] transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#2C2B29]" /> 1. Fundamentals & Inline Labs
        </button>
        <button
          onClick={() => scrollToSection('sec-stl-ref')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold text-[#15803D] hover:bg-[#ECFDF5] transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          <Code2 className="w-3.5 h-3.5" /> 2. C++ STL & Implementation
        </button>
        <button
          onClick={() => scrollToSection('sec-exam-archive')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold text-[#B45309] hover:bg-[#FFFBEB] transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          <FileQuestion className="w-3.5 h-3.5" /> 3. Solved Exam Questions ({lesson.examQuestions?.length})
        </button>
        <button
          onClick={() => scrollToSection('sec-quiz')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold text-[#7E22CE] hover:bg-[#FAF5FF] transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5" /> 4. Practice Quiz ({lesson.quizzes?.length})
        </button>
      </div>

      {/* SECTION 1: Step-by-Step Fundamentals with Contextual Inline Visualizers */}
      <section id="sec-fundamentals" className="space-y-6 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2C2B29]" />
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
              1. Step-by-Step Fundamentals & Interactive Demonstrations
            </h2>
          </div>
          <span className="text-xs font-mono text-[#15803D] bg-[#ECFDF5] px-2.5 py-0.5 rounded border border-[#A7F3D0] font-bold">
            Basics First
          </span>
        </div>

        {/* Detailed Concepts with Inline Simulators */}
        <div className="space-y-8">
          {lesson.keyConcepts.map((concept, idx) => {
            const visualizerNode = renderInlineVisualizer(idx);

            return (
              <div
                key={idx}
                className="p-5 sm:p-7 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E2D9] pb-3">
                  <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#991B1B] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <MathText text={concept.title} />
                  </h3>
                  <span className="text-[11px] font-mono text-[#66625B]">Step {idx + 1} of {lesson.keyConcepts.length}</span>
                </div>

                <div className="text-sm text-[#2C2B29] leading-relaxed font-sans">
                  <MathText text={concept.description} />
                </div>

                {concept.mathFormula && (
                  <FormulaBlock content={concept.mathFormula} />
                )}

                {concept.bulletPoints && concept.bulletPoints.length > 0 && (
                  <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                    <div className="text-xs font-serif font-bold text-[#66625B] flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#B45309]" /> Key Rules & Details:
                    </div>
                    <ul className="space-y-2 pl-1 text-xs text-[#44403C]">
                      {concept.bulletPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] shrink-0 mt-1.5" />
                          <span className="leading-relaxed font-sans"><MathText text={pt} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CONTEXTUAL INLINE VISUALIZER */}
                {visualizerNode && (
                  <div className="mt-4 pt-4 border-t border-[#E5E2D9] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#991B1B]">
                      <Sparkles className="w-4 h-4 text-[#991B1B]" />
                      <span>Interactive Laboratory & Simulation for Step {idx + 1}:</span>
                    </div>
                    <div className="pt-1">
                      {visualizerNode}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: C++ STL Reference & Code Implementations */}
      {lesson.cstlReference && <section id="sec-stl-ref" className="space-y-6 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#15803D]" />
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
              2. Standard C++ STL Interface & Production Code
            </h2>
          </div>
          <span className="text-xs font-mono text-[#15803D] bg-[#ECFDF5] px-2.5 py-0.5 rounded border border-[#A7F3D0] font-bold">
            C++ Reference
          </span>
        </div>

        {/* C++ STL Reference Table */}
        <div className="p-5 sm:p-7 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9]">
            <div>
              <h3 className="text-base font-serif font-bold text-[#1A1A1A]">Standard C++ STL Interface</h3>
              <p className="text-xs text-[#66625B] mt-0.5 font-mono">{lesson.cstlReference.header}</p>
            </div>
            <div className="font-mono text-xs px-3 py-1 rounded-lg bg-[#F4F2EB] border border-[#D8D4C8] text-[#1A1A1A]">
              {lesson.cstlReference.declaration.split('\n')[0]}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#E5E2D9]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F4F2EB] text-[#2C2B29] border-b border-[#E5E2D9]">
                <tr>
                  <th className="p-3 font-serif font-bold whitespace-nowrap">Method</th>
                  <th className="p-3 font-serif font-bold">Description</th>
                  <th className="p-3 font-serif font-bold whitespace-nowrap">Time Complexity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2D9] bg-white">
                {lesson.cstlReference.commonMethods.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-3 font-bold text-[#991B1B] whitespace-nowrap">{m.method}</td>
                    <td className="p-3 text-[#2C2B29] font-sans min-w-[200px]">
                      <MathText text={m.description} />
                    </td>
                    <td className="p-3 font-bold text-[#15803D] whitespace-nowrap">
                      <MathText text={m.complexity} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {lesson.cstlReference?.notes && lesson.cstlReference?.notes?.length > 0 && (
            <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-1 text-xs text-[#44403C] font-sans">
              <strong className="text-[#1A1A1A] font-serif">Key STL Invariants & Practical Tips:</strong>
              <ul className="list-disc list-inside space-y-1 text-[12px] pt-1">
                {lesson.cstlReference.notes.map((n, nIdx) => (
                  <li key={nIdx}><MathText text={n} /></li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Full Code Snippets */}
        {lesson.codeSnippets && lesson.codeSnippets.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-serif font-bold text-[#1A1A1A]">Clean C++ Implementations</h3>
            <CodeBlock snippets={lesson.codeSnippets} />
          </div>
        )}
      </section>}

      {/* SECTION 3: Solved Exam Questions Archive */}
      {lesson.examQuestions && <section id="sec-exam-archive" className="space-y-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-[#B45309]" />
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
              3. Solved Exam Archive & Deep Dive Traces ({lesson.examQuestions.length})
            </h2>
          </div>
          <span className="text-xs text-[#66625B] font-sans">Official marking criteria & proofs</span>
        </div>

        <div className="space-y-4">
          {lesson.examQuestions.map((q) => {
            const isExpanded = !!expandedQuestions[q.id];

            return (
              <div
                key={q.id}
                className="rounded-xl bg-white border border-[#E5E2D9] overflow-hidden shadow-xs"
              >
                {/* Question header */}
                <div
                  onClick={() => toggleQuestion(q.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-[#F4F2EB] border border-[#D8D4C8] text-[#991B1B]">
                        {q.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46]">
                        {q.marks} Marks
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4F2EB] text-[#66625B] border border-[#E5E2D9]">
                        {q.difficulty}
                      </span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1A1A1A] leading-snug">
                      <MathText text={q.question} />
                    </h4>
                  </div>

                  <button className="text-[#88847C] hover:text-[#1A1A1A] mt-1 p-1 cursor-pointer shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Solution */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#E5E2D9] space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-[#065F46] uppercase tracking-wider">
                        Step-by-Step Solution & Mathematical Derivation:
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-[#E5E2D9] font-sans text-xs text-[#1A1A1A] leading-relaxed shadow-2xs">
                        <MarkdownContent content={q.solution} />
                      </div>
                    </div>

                    {q.keyTakeaway && (
                      <div className="p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B]">
                        <strong className="font-serif font-bold text-[#991B1B]">Exam Strategy: </strong>
                        <span className="text-[#7F1D1D] font-sans"><MathText text={q.keyTakeaway} /></span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>}

      {/* SECTION 4: Practice Quiz */}
      {lesson.quizzes && <section id="sec-quiz" className="space-y-4 pt-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E5E2D9]">
          <HelpCircle className="w-5 h-5 text-[#7E22CE]" />
          <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
            4. Self-Assessment Practice Quiz ({lesson.quizzes.length})
          </h2>
        </div>

        <QuizComponent quizzes={lesson.quizzes} topicTitle={lesson.title} />
      </section>}
    </div>
  );
};
