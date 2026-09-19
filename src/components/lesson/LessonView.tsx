import React, { useState, useMemo } from 'react';
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
import { StringVisualizer } from '../visualizers/StringVisualizer';
import { StringOperationsVisualizer } from '../visualizers/StringOperationsVisualizer';
import { ArrayOperationsVisualizer } from '../visualizers/ArrayOperationsVisualizer';
import { SearchVisualizer } from '../visualizers/SearchVisualizer';
import { SortingVisualizer } from '../visualizers/SortingVisualizer';
import { ComplexityVisualizer } from '../visualizers/ComplexityVisualizer';
import { PseudocodeVisualizer } from '../visualizers/PseudocodeVisualizer';
import { RoadmapNavigator } from '../common/RoadmapNavigator';
import { LandingOverview } from '../common/LandingOverview';
import { CodeBlock } from '../common/CodeBlock';
import { QuizComponent } from '../common/QuizComponent';
import { PracticeProblems } from '../common/PracticeProblems';
import { MathText, FormulaBlock } from '../common/Latex';
import { MarkdownContent } from '../common/MarkdownContent';
import { RichLessonContent } from '../common/RichLessonContent';
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
  Trophy,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Circle,
  Type,
  Layers,
  ScrollText
} from 'lucide-react';

type StudyTab = 'theory' | 'lab' | 'code' | 'exam' | 'practice' | 'all';

interface LessonViewProps {
  lesson: Lesson;
  onSelectTopic?: (topicId: TopicId | 'report' | 'calculator' | 'matrix') => void;
  focusMode?: boolean;
  onToggleFocusMode?: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onSelectTopic,
  focusMode = false,
  onToggleFocusMode
}) => {
  if (lesson.id === 'course-overview') {
    return <LandingOverview onSelectTopic={onSelectTopic || (() => {})} />;
  }

  const [activeTab, setActiveTab] = useState<StudyTab>('theory');
  const [comfortableFont, setComfortableFont] = useState<boolean>(false);
  const [inlineLabsOpen, setInlineLabsOpen] = useState<Record<number, boolean>>({});
  const [activeLabIdx, setActiveLabIdx] = useState<number>(0);
  const [masteredConcepts, setMasteredConcepts] = useState<Record<number, boolean>>({});
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>(() => {
    const firstId = lesson.examQuestions?.[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });

  const { category, subCategory } = getCategoryForTopic(lesson.id);

  const toggleQuestion = (qId: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleInlineLab = (idx: number) => {
    setInlineLabsOpen((prev) => {
      const current = prev[idx] !== undefined ? prev[idx] : true;
      return { ...prev, [idx]: !current };
    });
  };

  const toggleMastered = (idx: number) => {
    setMasteredConcepts((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Helper to render contextual inline visualizer right below the corresponding concept
  const renderInlineVisualizer = (conceptIdx: number): React.ReactNode | null => {
    if (lesson.id === 'course-overview') {
      if (conceptIdx === 1) {
        return onSelectTopic ? <RoadmapNavigator onSelectTopic={onSelectTopic} /> : null;
      }
      return null;
    }

    switch (lesson.id) {
      case 'complexity-notations':
        if (conceptIdx === 0) return <ComplexityVisualizer focusedMode="growthGraph" />;
        if (conceptIdx === 1) return <ComplexityVisualizer focusedMode="asymptoticEnvelopes" initialNotation="bigO" />;
        if (conceptIdx === 2) return <ComplexityVisualizer focusedMode="operationsMatrix" />;
        if (conceptIdx === 3) return <ComplexityVisualizer focusedMode="growthTable" />;
        if (conceptIdx === 4) return <ComplexityVisualizer focusedMode="asymptoticEnvelopes" initialNotation="bigO" />;
        if (conceptIdx === 5) return <ComplexityVisualizer focusedMode="asymptoticEnvelopes" initialNotation="bigTheta" />;
        if (conceptIdx === 6) return <ComplexityVisualizer focusedMode="asymptoticEnvelopes" initialNotation="littleO" />;
        if (conceptIdx === 7) return <ComplexityVisualizer focusedMode="operationsMatrix" />;
        return <ComplexityVisualizer focusedMode="growthGraph" />;

      case 'pseudocode-introduction':
        if (conceptIdx === 0) return <PseudocodeVisualizer focusedMode="rules" />;
        if (conceptIdx === 1) return <PseudocodeVisualizer focusedMode="tasks" initialTaskId="maxTwo" allowedTaskIds={['maxTwo', 'swap', 'checkEvenOdd']} />;
        if (conceptIdx === 2) return <PseudocodeVisualizer focusedMode="tasks" initialTaskId="sumN" allowedTaskIds={['sumN', 'arrayAverage']} />;
        if (conceptIdx === 3) return <PseudocodeVisualizer focusedMode="tasks" initialTaskId="findMax" allowedTaskIds={['findMax', 'linearSearch']} />;
        if (conceptIdx === 4) return <PseudocodeVisualizer focusedMode="dryRun" initialTaskId="linearSearch" allowedTaskIds={['linearSearch']} />;
        return <PseudocodeVisualizer focusedMode="tasks" initialTaskId="maxTwo" />;

      case 'vector':
        if (conceptIdx === 0) return <VectorVisualizer focusedMode="reallocLab" />;
        if (conceptIdx === 1) return <VectorVisualizer focusedMode="shiftLab" />;
        if (conceptIdx === 2) return <VectorVisualizer focusedMode="standard" />;
        return null;

      case 'string':
        if (conceptIdx === 0) return <StringVisualizer focusedMode="storage" />;
        if (conceptIdx === 1) return <StringVisualizer focusedMode="storage" />;
        if (conceptIdx === 2) return <StringVisualizer focusedMode="operations" />;
        if (conceptIdx === 3) return <StringVisualizer focusedMode="wordProcessing" />;
        if (conceptIdx === 4) return <StringVisualizer focusedMode="algorithms" />;
        if (conceptIdx === 5) return <StringVisualizer focusedMode="matching" />;
        return <StringVisualizer focusedMode="storage" />;

      case 'string-operations':
        if (conceptIdx === 0) return <StringOperationsVisualizer initialTab="replace" />;
        if (conceptIdx === 1) return <StringOperationsVisualizer initialTab="kmp" initialText="ABABDABACDABABCABAB" initialPattern="ABABC" />;
        if (conceptIdx === 2) return <StringOperationsVisualizer initialTab="replace" />;
        return <StringOperationsVisualizer initialTab="replace" />;

      case 'kmp-pattern-matching':
        if (conceptIdx === 0) return <StringOperationsVisualizer initialTab="kmp" initialText="AABAACAADAABAABA" initialPattern="AABA" />;
        if (conceptIdx === 1) return <StringOperationsVisualizer initialTab="kmp" initialText="ABABDABACDABABCABAB" initialPattern="ABABC" />;
        if (conceptIdx === 2) return <StringOperationsVisualizer initialTab="kmp" initialText="AABAACAADAABAABA" initialPattern="AABAACAABAA" />;
        return <StringOperationsVisualizer initialTab="kmp" initialText="AABAACAADAABAABA" initialPattern="AABAACAABAA" />;

      case 'array-operations':
        if (conceptIdx === 1) return <ArrayOperationsVisualizer focusedMode="1d-ops" />;
        if (conceptIdx === 3) return <ArrayOperationsVisualizer focusedMode="2d-addressing" />;
        return null;

      case 'searching-algorithms':
        if (conceptIdx === 0) return <SearchVisualizer initialAlgorithm="linear" lockAlgorithm="linear" />;
        if (conceptIdx === 1) return <SearchVisualizer initialAlgorithm="binary" lockAlgorithm="binary" />;
        return null;

      case 'sorting-algorithms':
        if (conceptIdx === 1) return <SortingVisualizer initialAlgorithm="bubble" allowedAlgorithms={['bubble', 'selection', 'insertion']} />;
        if (conceptIdx === 2) return <SortingVisualizer initialAlgorithm="merge" allowedAlgorithms={['merge']} />;
        if (conceptIdx === 3) return <SortingVisualizer initialAlgorithm="quick" allowedAlgorithms={['quick']} />;
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

  // Compile list of concepts that have an interactive simulation
  const visualizerItems = useMemo(() => {
    const items: { idx: number; title: string; node: React.ReactNode }[] = [];
    lesson.keyConcepts.forEach((c, idx) => {
      const node = renderInlineVisualizer(idx);
      if (node) {
        items.push({ idx, title: c.title, node });
      }
    });
    return items;
  }, [lesson.id, lesson.keyConcepts]);

  const allLabsOpen =
    visualizerItems.length > 0 &&
    visualizerItems.every((item) => (inlineLabsOpen[item.idx] !== undefined ? inlineLabsOpen[item.idx] : true));
  const toggleAllInlineLabs = () => {
    if (allLabsOpen) {
      const next: Record<number, boolean> = {};
      visualizerItems.forEach((item) => {
        next[item.idx] = false;
      });
      setInlineLabsOpen(next);
    } else {
      const next: Record<number, boolean> = {};
      visualizerItems.forEach((item) => {
        next[item.idx] = true;
      });
      setInlineLabsOpen(next);
    }
  };

  // Counts for tabs
  const examCount = lesson.examQuestions?.length || 0;
  const quizCount = lesson.quizzes?.length || 0;
  const practiceCount = lesson.practiceProblems?.length || 0;
  const totalPracticeCount = quizCount + practiceCount;

  return (
    <div className={`space-y-6 select-text transition-all ${comfortableFont ? 'text-[16px]' : 'text-[14px]'}`} id={`lesson-view-${lesson.id}`}>
      {/* 1. Serene Master Lesson Header */}
      <div className="p-5 sm:p-7 rounded-xl bg-white dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-2xs">
        {/* Breadcrumb & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {category && (
            <div className="flex items-center gap-1.5 font-mono text-[#88847C] dark:text-[#A8A29E]">
              <span className="font-semibold text-[#1A1A1A] dark:text-[#EDE8DF]">{category.name}</span>
              <span>/</span>
              <span className="text-[#991B1B] dark:text-[#EF4444] font-medium">{subCategory?.name}</span>
            </div>
          )}

          {/* Reading Comfort & Focus Mode Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setComfortableFont(!comfortableFont)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                comfortableFont
                  ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#EDE8DF]'
                  : 'bg-[#FAF8F5] dark:bg-[#25221E] border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
              }`}
              title="Toggle Large / Comfortable Reading Font"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{comfortableFont ? 'Font: Large' : 'Font: Standard'}</span>
            </button>

            {onToggleFocusMode && (
              <button
                onClick={onToggleFocusMode}
                className={`px-2.5 py-1 rounded-lg border text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  focusMode
                    ? 'bg-[#991B1B] text-white border-[#991B1B]'
                    : 'bg-[#FAF8F5] dark:bg-[#25221E] border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
                }`}
                title={focusMode ? 'Exit Focus Mode (Esc)' : 'Enter Distraction-Free Focus Mode'}
              >
                {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] tracking-tight">
            {lesson.title}
          </h1>
          {lesson.subtitle && (
            <p className="text-sm text-[#66625B] dark:text-[#A8A29E] font-serif italic">
              {lesson.subtitle}
            </p>
          )}
        </div>

        {/* Clean Editorial Overview Text */}
        {lesson.overview && (
          <div className="pt-1 text-[#2C2B29] dark:text-[#D6D0C5] text-sm sm:text-base leading-relaxed font-sans max-w-4xl">
            <MathText text={lesson.overview} />
          </div>
        )}
      </div>

      {/* 2. Structured Study Segmented Tab Bar */}
      <div className="sticky top-12 z-20 flex items-center gap-1 p-1 rounded-xl bg-white/95 dark:bg-[#1E1B18]/95 backdrop-blur-md border border-[#E5E2D9] dark:border-[#38332B] shadow-2xs overflow-x-auto select-none">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
            activeTab === 'theory'
              ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] shadow-2xs'
              : 'text-[#57534E] dark:text-[#A8A29E] hover:bg-[#F4F2EB] dark:hover:bg-[#25221E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Theory & Concepts ({lesson.keyConcepts.length})</span>
        </button>

        {visualizerItems.length > 0 && (
          <button
            onClick={() => setActiveTab('lab')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'lab'
                ? 'bg-[#991B1B] text-white shadow-2xs'
                : 'text-[#991B1B] dark:text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#450A0A]/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Lab ({visualizerItems.length})</span>
          </button>
        )}

        {lesson.cstlReference && (
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'code'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] shadow-2xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:bg-[#F4F2EB] dark:hover:bg-[#25221E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" />
            <span>C++ & STL</span>
          </button>
        )}

        {examCount > 0 && (
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'exam'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] shadow-2xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:bg-[#F4F2EB] dark:hover:bg-[#25221E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <FileQuestion className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24]" />
            <span>Solved Exams ({examCount})</span>
          </button>
        )}

        {totalPracticeCount > 0 && (
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'practice'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A] shadow-2xs'
                : 'text-[#57534E] dark:text-[#A8A29E] hover:bg-[#F4F2EB] dark:hover:bg-[#25221E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#D97706] dark:text-[#FBBF24]" />
            <span>Practice ({totalPracticeCount})</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-serif font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0 ml-auto ${
            activeTab === 'all'
              ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#1A1A1A]'
              : 'text-[#88847C] dark:text-[#78716C] hover:bg-[#F4F2EB] dark:hover:bg-[#25221E]'
          }`}
          title="Display all sections continuously on a single scrollable page"
        >
          <ScrollText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Continuous</span>
        </button>
      </div>

      {/* TAB CONTENT 1: THEORY & CONCEPTS */}
      {(activeTab === 'theory' || activeTab === 'all') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Detailed Theory & Conceptual Analysis
              </h2>
            </div>

            {visualizerItems.length > 0 && (
              <button
                onClick={toggleAllInlineLabs}
                className="text-xs font-mono text-[#88847C] dark:text-[#A8A29E] hover:text-[#991B1B] dark:hover:text-[#EF4444] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>{allLabsOpen ? 'Collapse All Labs' : 'Expand All Labs'}</span>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {lesson.keyConcepts.map((concept, idx) => {
              const visualizerNode = renderInlineVisualizer(idx);
              const isLabOpen = inlineLabsOpen[idx] !== undefined ? inlineLabsOpen[idx] : true;
              const isMastered = !!masteredConcepts[idx];

              return (
                <article
                  key={idx}
                  className={`p-6 sm:p-8 rounded-xl bg-white dark:bg-[#1E1B18] border transition-all space-y-4 shadow-2xs ${
                    isMastered
                      ? 'border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/10 dark:bg-emerald-950/10'
                      : 'border-[#E5E2D9] dark:border-[#38332B]'
                  }`}
                >
                  {/* Concept Section Title & Understood Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E2D9] dark:border-[#38332B] pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#FAF8F5] dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] tracking-tight">
                        <MathText text={concept.title} />
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleMastered(idx)}
                      className={`text-xs font-serif flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isMastered
                          ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                          : 'text-[#88847C] dark:text-[#78716C] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
                      }`}
                      title={isMastered ? 'Marked as Understood' : 'Click to mark as understood'}
                    >
                      {isMastered ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Understood</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4" />
                          <span>Mark understood</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Rich Prose Content with Formatting, Vertical Spacing & Math */}
                  <RichLessonContent
                    description={concept.description}
                    bulletPoints={concept.bulletPoints}
                    comfortableFont={comfortableFont}
                  />

                  {/* Math Formula if present */}
                  {concept.mathFormula && (
                    <FormulaBlock content={concept.mathFormula} />
                  )}

                  {/* Contextual Inline Simulation - Kept Open by Default for Corresponding Concept */}
                  {visualizerNode && (
                    <div className="pt-3 border-t border-[#F0ECE1] dark:border-[#2C2824] mt-4">
                      <div
                        onClick={() => toggleInlineLab(idx)}
                        className="px-4 py-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F4F2EB] dark:hover:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#991B1B] dark:text-[#EF4444]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Interactive Simulation: {concept.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-[#88847C] dark:text-[#78716C]">
                            {isLabOpen ? 'Collapse Simulation' : 'Active Simulation (Click to view)'}
                          </span>
                          {isLabOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#88847C] dark:text-[#78716C]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#88847C] dark:text-[#78716C]" />
                          )}
                        </div>
                      </div>

                      {isLabOpen && (
                        <div className="mt-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E5E2D9] dark:border-[#38332B] shadow-2xs">
                          {visualizerNode}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB CONTENT 2: DEDICATED INTERACTIVE LAB TAB */}
      {(activeTab === 'lab' || (activeTab === 'all' && visualizerItems.length > 0)) && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Interactive Algorithm Laboratory
              </h2>
            </div>
            <span className="text-xs font-mono text-[#66625B] dark:text-[#A8A29E]">
              {visualizerItems.length} {visualizerItems.length === 1 ? 'Module' : 'Modules'} Ready
            </span>
          </div>

          {/* Module Selector Pill Bar if multiple simulations exist */}
          {visualizerItems.length > 1 && (
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto">
              {visualizerItems.map((item, vIdx) => (
                <button
                  key={item.idx}
                  onClick={() => setActiveLabIdx(vIdx)}
                  className={`px-3 py-1 rounded-md text-xs font-serif font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    activeLabIdx === vIdx
                      ? 'bg-white dark:bg-[#2A2622] text-[#991B1B] dark:text-[#EF4444] shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                      : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
                  }`}
                >
                  <span>Step {item.idx + 1}: {item.title.split(' (')[0]}</span>
                </button>
              ))}
            </div>
          )}

          {/* Dedicated Canvas Container */}
          <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] shadow-2xs">
            {visualizerItems[activeLabIdx] ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
                  <div className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF]">
                    Step {visualizerItems[activeLabIdx].idx + 1}: {visualizerItems[activeLabIdx].title}
                  </div>
                  <span className="text-[11px] font-mono text-[#88847C] dark:text-[#78716C]">
                    Interactive Execution
                  </span>
                </div>
                {visualizerItems[activeLabIdx].node}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-[#88847C] dark:text-[#78716C]">
                No simulator selected.
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB CONTENT 3: C++ STL & IMPLEMENTATIONS */}
      {lesson.cstlReference && (activeTab === 'code' || activeTab === 'all') && (
        <section className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Standard C++ STL Interface & Production Code
              </h2>
            </div>
            <span className="text-xs font-mono text-[#15803D] dark:text-[#4ADE80]">C++ Reference</span>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
              <div>
                <h3 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">STL Methods & Complexities</h3>
                <p className="text-xs text-[#66625B] dark:text-[#A8A29E] font-mono">{lesson.cstlReference.header}</p>
              </div>
              <div className="font-mono text-xs px-2.5 py-1 rounded bg-[#FAF8F5] dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF]">
                {lesson.cstlReference.declaration.split('\n')[0]}
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#FAF8F5] dark:bg-[#25221E] text-[#2C2B29] dark:text-[#EDE8DF] border-b border-[#E5E2D9] dark:border-[#38332B]">
                  <tr>
                    <th className="p-2.5 font-serif font-bold whitespace-nowrap">Method</th>
                    <th className="p-2.5 font-serif font-bold">Description</th>
                    <th className="p-2.5 font-serif font-bold whitespace-nowrap">Time Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2D9] dark:divide-[#38332B] bg-white dark:bg-[#1E1B18]">
                  {lesson.cstlReference.commonMethods.map((m, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5] dark:hover:bg-[#25221E]/50 transition-colors">
                      <td className="p-2.5 font-bold text-[#991B1B] dark:text-[#EF4444] whitespace-nowrap">{m.method}</td>
                      <td className="p-2.5 text-[#2C2B29] dark:text-[#D6D0C5] font-sans min-w-[200px]">
                        <MathText text={m.description} />
                      </td>
                      <td className="p-2.5 font-bold text-[#15803D] dark:text-[#4ADE80] whitespace-nowrap">
                        <MathText text={m.complexity} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {lesson.cstlReference?.notes && lesson.cstlReference.notes.length > 0 && (
              <div className="p-3.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-1 text-xs text-[#44403C] dark:text-[#D6D0C5] font-sans">
                <strong className="text-[#1A1A1A] dark:text-[#EDE8DF] font-serif">Key Invariants & Practical Tips:</strong>
                <ul className="list-disc list-inside space-y-1 text-[12px] pt-1">
                  {lesson.cstlReference.notes.map((n, nIdx) => (
                    <li key={nIdx}><MathText text={n} /></li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {lesson.codeSnippets && lesson.codeSnippets.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Implementation Code</h3>
              <CodeBlock snippets={lesson.codeSnippets} />
            </div>
          )}
        </section>
      )}

      {/* TAB CONTENT 4: SOLVED EXAM ARCHIVE */}
      {examCount > 0 && (activeTab === 'exam' || activeTab === 'all') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <FileQuestion className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                Past Examination Questions & Marking Schemes ({examCount})
              </h2>
            </div>
            <span className="text-xs font-mono text-[#66625B] dark:text-[#A8A29E]">CUET Semester Proofs</span>
          </div>

          <div className="space-y-3">
            {lesson.examQuestions?.map((q) => {
              const isExpanded = !!expandedQuestions[q.id];

              return (
                <div
                  key={q.id}
                  className="rounded-xl bg-white dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] overflow-hidden shadow-2xs"
                >
                  <div
                    onClick={() => toggleQuestion(q.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-[#FAF8F5] dark:hover:bg-[#25221E]/50 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#FAF8F5] dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] text-[#991B1B] dark:text-[#EF4444]">
                          {q.year}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300">
                          {q.marks} Marks
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF8F5] dark:bg-[#25221E] text-[#66625B] dark:text-[#A8A29E] border border-[#E5E2D9] dark:border-[#38332B]">
                          {q.difficulty}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] leading-snug">
                        <MathText text={q.question} />
                      </h4>
                    </div>

                    <button className="text-[#88847C] dark:text-[#78716C] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF] p-1 cursor-pointer shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="p-4 sm:p-5 bg-[#FAF8F5] dark:bg-[#181614] border-t border-[#E5E2D9] dark:border-[#38332B] space-y-3">
                      <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        Step-by-Step Marking Derivation:
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-lg bg-white dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] font-sans text-xs text-[#1A1A1A] dark:text-[#EDE8DF] leading-relaxed shadow-2xs">
                        <MarkdownContent content={q.solution} />
                      </div>

                      {q.keyTakeaway && (
                        <div className="p-3 rounded-lg bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#7F1D1D]/60 text-xs text-[#991B1B] dark:text-[#FCA5A5]">
                          <strong className="font-serif font-bold">Exam Strategy: </strong>
                          <span className="font-sans"><MathText text={q.keyTakeaway} /></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB CONTENT 5: QUIZZES & PRACTICE PROBLEMS */}
      {totalPracticeCount > 0 && (activeTab === 'practice' || activeTab === 'all') && (
        <section className="space-y-6">
          {quizCount > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
                <HelpCircle className="w-4 h-4 text-[#7E22CE] dark:text-[#C084FC]" />
                <h2 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Self-Assessment Practice Quiz ({quizCount})
                </h2>
              </div>
              <QuizComponent quizzes={lesson.quizzes} topicTitle={lesson.title} />
            </div>
          )}

          {practiceCount > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9] dark:border-[#38332B]">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#D97706] dark:text-[#FBBF24]" />
                  <h2 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                    Curated LeetCode & Codeforces Problems ({practiceCount})
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#D97706] dark:text-[#FBBF24]">Hands-on</span>
              </div>
              <PracticeProblems problems={lesson.practiceProblems} topicTitle={lesson.title} />
            </div>
          )}
        </section>
      )}
    </div>
  );
};
