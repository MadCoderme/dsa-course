import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  Table as TableIcon,
  Code2,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { MathText } from '../common/Latex';

interface PseudocodeVisualizerProps {
  focusedMode?: 'conventions' | 'tasks' | 'dryRun' | 'rules';
  initialTaskId?: TaskId;
  allowedTaskIds?: TaskId[];
  compact?: boolean;
}

type TaskId = 'maxTwo' | 'swap' | 'checkEvenOdd' | 'sumN' | 'arrayAverage' | 'findMax' | 'linearSearch';

interface TaskDef {
  id: TaskId;
  title: string;
  difficulty: 'Easy' | 'Intermediate';
  tag: string;
  description: string;
  codeLines: { lineNum: number; text: string; indent: number }[];
  initialState: Record<string, any>;
  steps: {
    lineNum: number;
    explanation: string;
    variables: Record<string, any>;
    highlightIndices?: number[];
    isFinal?: boolean;
    result?: string;
  }[];
}

const TASKS: TaskDef[] = [
  {
    id: 'maxTwo',
    title: 'Task 1: Maximum of Two Numbers',
    difficulty: 'Easy',
    tag: 'Conditionals (IF-ELSE)',
    description: 'Compares two inputs a and b using an IF-ELSE branch and returns whichever is strictly larger.',
    codeLines: [
      { lineNum: 1, text: 'Algorithm MaxOfTwo(a, b)', indent: 0 },
      { lineNum: 2, text: 'if a > b then', indent: 1 },
      { lineNum: 3, text: 'return a', indent: 2 },
      { lineNum: 4, text: 'else', indent: 1 },
      { lineNum: 5, text: 'return b', indent: 2 },
      { lineNum: 6, text: 'end if', indent: 1 },
    ],
    initialState: { a: 18, b: 27 },
    steps: [
      {
        lineNum: 1,
        explanation: 'Algorithm begins with inputs a = 18 and b = 27.',
        variables: { a: 18, b: 27, status: 'Starting' },
      },
      {
        lineNum: 2,
        explanation: 'Evaluate conditional condition: Is a > b? (18 > 27) → False.',
        variables: { a: 18, b: 27, '18 > 27': 'False' },
      },
      {
        lineNum: 4,
        explanation: 'Condition was False, so control jumps to the ELSE branch.',
        variables: { a: 18, b: 27, branch: 'ELSE' },
      },
      {
        lineNum: 5,
        explanation: 'Execute return b. Outputs 27 as the maximum value.',
        variables: { a: 18, b: 27, output: 27 },
        isFinal: true,
        result: 'Returned 27',
      },
    ],
  },
  {
    id: 'swap',
    title: 'Task 2: Swap Two Variables',
    difficulty: 'Easy',
    tag: 'Assignment & Temp Variable',
    description: 'Exchanges the values of two variables a and b using a temporary variable temp without losing data.',
    codeLines: [
      { lineNum: 1, text: 'Algorithm Swap(a, b)', indent: 0 },
      { lineNum: 2, text: 'temp ← a', indent: 1 },
      { lineNum: 3, text: 'a ← b', indent: 1 },
      { lineNum: 4, text: 'b ← temp', indent: 1 },
      { lineNum: 5, text: 'return a, b', indent: 1 },
    ],
    initialState: { a: 5, b: 9, temp: 'undefined' },
    steps: [
      {
        lineNum: 1,
        explanation: 'Initial state: a = 5, b = 9. Variable temp is empty.',
        variables: { a: 5, b: 9, temp: '—' },
      },
      {
        lineNum: 2,
        explanation: 'Execute temp ← a. Value 5 is safely preserved inside temp.',
        variables: { a: 5, b: 9, temp: 5 },
      },
      {
        lineNum: 3,
        explanation: 'Execute a ← b. Variable a is overwritten with value 9.',
        variables: { a: 9, b: 9, temp: 5 },
      },
      {
        lineNum: 4,
        explanation: 'Execute b ← temp. Variable b takes the preserved value 5 from temp.',
        variables: { a: 9, b: 5, temp: 5 },
      },
      {
        lineNum: 5,
        explanation: 'Swap complete! Variables have exchanged values successfully: a = 9, b = 5.',
        variables: { a: 9, b: 5, temp: 5, status: 'Swapped!' },
        isFinal: true,
        result: 'Swapped: a=9, b=5',
      },
    ],
  },
  {
    id: 'checkEvenOdd',
    title: 'Task 3: Check Even or Odd',
    difficulty: 'Easy',
    tag: 'Modulo Operator (mod)',
    description: 'Evaluates num mod 2 = 0 to determine whether an integer divides evenly by 2 with no remainder.',
    codeLines: [
      { lineNum: 1, text: 'Algorithm CheckEvenOdd(num)', indent: 0 },
      { lineNum: 2, text: 'if num mod 2 = 0 then', indent: 1 },
      { lineNum: 3, text: 'return "Even"', indent: 2 },
      { lineNum: 4, text: 'else', indent: 1 },
      { lineNum: 5, text: 'return "Odd"', indent: 2 },
      { lineNum: 6, text: 'end if', indent: 1 },
    ],
    initialState: { num: 17 },
    steps: [
      {
        lineNum: 1,
        explanation: 'Algorithm begins with test integer input num = 17.',
        variables: { num: 17, status: 'Starting' },
      },
      {
        lineNum: 2,
        explanation: 'Compute remainder: 17 mod 2 = 1. Test condition: 1 = 0? → False.',
        variables: { num: 17, 'remainder (17 mod 2)': 1, '1 = 0': 'False' },
      },
      {
        lineNum: 4,
        explanation: 'Condition was False, so jump to the ELSE branch.',
        variables: { num: 17, branch: 'ELSE' },
      },
      {
        lineNum: 5,
        explanation: 'Execute return "Odd". Correctly classifies 17 as an odd integer.',
        variables: { num: 17, output: '"Odd"' },
        isFinal: true,
        result: 'Returned "Odd"',
      },
    ],
  },
  {
    id: 'sumN',
    title: 'Task 3: Sum of Numbers from 1 to N',
    difficulty: 'Easy',
    tag: 'Loops & Accumulator',
    description: 'Uses a FOR loop and an accumulator variable total to compute 1 + 2 + ... + n.',
    codeLines: [
      { lineNum: 1, text: 'Algorithm SumOneToN(n)', indent: 0 },
      { lineNum: 2, text: 'total ← 0', indent: 1 },
      { lineNum: 3, text: 'for i ← 1 to n do', indent: 1 },
      { lineNum: 4, text: 'total ← total + i', indent: 2 },
      { lineNum: 5, text: 'end for', indent: 1 },
      { lineNum: 6, text: 'return total', indent: 1 },
    ],
    initialState: { n: 4, total: 0, i: 1 },
    steps: [
      {
        lineNum: 1,
        explanation: 'Algorithm begins with target input n = 4.',
        variables: { n: 4, total: '—', i: '—' },
      },
      {
        lineNum: 2,
        explanation: 'Initialize accumulator: total ← 0.',
        variables: { n: 4, total: 0, i: '—' },
      },
      {
        lineNum: 3,
        explanation: 'Start loop iteration 1: counter i ← 1.',
        variables: { n: 4, total: 0, i: 1 },
      },
      {
        lineNum: 4,
        explanation: 'Add i to accumulator: total ← 0 + 1 = 1.',
        variables: { n: 4, total: 1, i: 1 },
      },
      {
        lineNum: 3,
        explanation: 'Loop iteration 2: counter i increments to 2.',
        variables: { n: 4, total: 1, i: 2 },
      },
      {
        lineNum: 4,
        explanation: 'Add i to accumulator: total ← 1 + 2 = 3.',
        variables: { n: 4, total: 3, i: 2 },
      },
      {
        lineNum: 3,
        explanation: 'Loop iteration 3: counter i increments to 3.',
        variables: { n: 4, total: 3, i: 3 },
      },
      {
        lineNum: 4,
        explanation: 'Add i to accumulator: total ← 3 + 3 = 6.',
        variables: { n: 4, total: 6, i: 3 },
      },
      {
        lineNum: 3,
        explanation: 'Loop iteration 4 (final): counter i increments to 4.',
        variables: { n: 4, total: 6, i: 4 },
      },
      {
        lineNum: 4,
        explanation: 'Add i to accumulator: total ← 6 + 4 = 10.',
        variables: { n: 4, total: 10, i: 4 },
      },
      {
        lineNum: 5,
        explanation: 'Loop boundary reached (i > n). Terminate loop.',
        variables: { n: 4, total: 10, i: 4, loop: 'Finished' },
      },
      {
        lineNum: 6,
        explanation: 'Execute return total. Outputs 10 as the final summation.',
        variables: { n: 4, total: 10, output: 10 },
        isFinal: true,
        result: 'Returned 10',
      },
    ],
  },
  {
    id: 'arrayAverage',
    title: 'Task E: Average of Array Numbers',
    difficulty: 'Easy',
    tag: 'Accumulator & Division',
    description: 'Accumulates the sum of all elements in array A[1...n] and divides by the total count n.',
    codeLines: [
      { lineNum: 1, text: 'Algorithm ArrayAverage(A, n)', indent: 0 },
      { lineNum: 2, text: 'sum ← 0', indent: 1 },
      { lineNum: 3, text: 'for i ← 1 to n do', indent: 1 },
      { lineNum: 4, text: 'sum ← sum + A[i]', indent: 2 },
      { lineNum: 5, text: 'end for', indent: 1 },
      { lineNum: 6, text: 'average ← sum / n', indent: 1 },
      { lineNum: 7, text: 'return average', indent: 1 },
    ],
    initialState: { A: [4, 8, 6], n: 3, sum: 0, i: 1 },
    steps: [
      {
        lineNum: 1,
        explanation: 'Input array A = [4, 8, 6] with total count n = 3.',
        variables: { A: '[4, 8, 6]', n: 3, sum: '—', i: '—' },
      },
      {
        lineNum: 2,
        explanation: 'Initialize running accumulator sum ← 0.',
        variables: { A: '[4, 8, 6]', n: 3, sum: 0, i: '—' },
      },
      {
        lineNum: 3,
        explanation: 'Iteration i = 1: Access A[1] = 4.',
        variables: { A: '[4, 8, 6]', n: 3, sum: 0, i: 1, 'A[1]': 4 },
        highlightIndices: [0],
      },
      {
        lineNum: 4,
        explanation: 'Add to accumulator: sum ← 0 + 4 = 4.',
        variables: { A: '[4, 8, 6]', n: 3, sum: 4, i: 1 },
        highlightIndices: [0],
      },
      {
        lineNum: 3,
        explanation: 'Iteration i = 2: Access A[2] = 8.',
        variables: { A: '[4, 8, 6]', n: 3, sum: 4, i: 2, 'A[2]': 8 },
        highlightIndices: [1],
      },
      {
        lineNum: 4,
        explanation: 'Add to accumulator: sum ← 4 + 8 = 12.',
        variables: { A: '[4, 8, 6]', n: 3, sum: 12, i: 2 },
        highlightIndices: [1],
      },
      {
        lineNum: 3,
        explanation: 'Iteration i = 3: Access A[3] = 6.',
        variables: { A: '[4, 8, 6]', n: 3, sum: 12, i: 3, 'A[3]': 6 },
        highlightIndices: [2],
      },
      {
        lineNum: 4,
        explanation: 'Add to accumulator: sum ← 12 + 6 = 18. Loop finishes.',
        variables: { A: '[4, 8, 6]', n: 3, sum: 18, i: 3 },
        highlightIndices: [2],
      },
      {
        lineNum: 6,
        explanation: 'Calculate arithmetic mean: average ← 18 / 3 = 6.0.',
        variables: { sum: 18, n: 3, average: 6.0 },
      },
      {
        lineNum: 7,
        explanation: 'Execute return average. Returns 6.0.',
        variables: { average: 6.0, output: 6.0 },
        isFinal: true,
        result: 'Returned 6.0',
      },
    ],
  },
  {
    id: 'findMax',
    title: 'Task 4: Find Maximum in an Array',
    difficulty: 'Intermediate',
    tag: 'Array Traversal & Tracking',
    description: 'Scans an array A[1...n] to find and return the largest number using a champion tracking variable.',
    codeLines: [
      { lineNum: 1, text: 'Algorithm FindMaximum(A, n)', indent: 0 },
      { lineNum: 2, text: 'maxVal ← A[1]', indent: 1 },
      { lineNum: 3, text: 'for i ← 2 to n do', indent: 1 },
      { lineNum: 4, text: 'if A[i] > maxVal then', indent: 2 },
      { lineNum: 5, text: 'maxVal ← A[i]', indent: 3 },
      { lineNum: 6, text: 'end if', indent: 2 },
      { lineNum: 7, text: 'end for', indent: 1 },
      { lineNum: 8, text: 'return maxVal', indent: 1 },
    ],
    initialState: { A: [14, 5, 42, 19], maxVal: 14, i: 2 },
    steps: [
      {
        lineNum: 1,
        explanation: 'Input Array A = [14, 5, 42, 19] with n = 4.',
        variables: { maxVal: '—', i: '—' },
      },
      {
        lineNum: 2,
        explanation: 'Initialize champion: Assume first element A[1] is max. maxVal ← 14.',
        variables: { maxVal: 14, i: '—' },
        highlightIndices: [0],
      },
      {
        lineNum: 3,
        explanation: 'Start loop from second element: i ← 2 (examining A[2] = 5).',
        variables: { maxVal: 14, i: 2, 'A[2]': 5 },
        highlightIndices: [1],
      },
      {
        lineNum: 4,
        explanation: 'Check condition: Is A[2] > maxVal? (5 > 14) → False. Do not update.',
        variables: { maxVal: 14, i: 2, '5 > 14': 'False' },
        highlightIndices: [1],
      },
      {
        lineNum: 3,
        explanation: 'Advance loop: i ← 3 (examining A[3] = 42).',
        variables: { maxVal: 14, i: 3, 'A[3]': 42 },
        highlightIndices: [2],
      },
      {
        lineNum: 4,
        explanation: 'Check condition: Is A[3] > maxVal? (42 > 14) → True! New champion found.',
        variables: { maxVal: 14, i: 3, '42 > 14': 'True' },
        highlightIndices: [2],
      },
      {
        lineNum: 5,
        explanation: 'Execute maxVal ← A[3]. Update champion: maxVal is now 42.',
        variables: { maxVal: 42, i: 3 },
        highlightIndices: [2],
      },
      {
        lineNum: 3,
        explanation: 'Advance loop: i ← 4 (examining A[4] = 19).',
        variables: { maxVal: 42, i: 4, 'A[4]': 19 },
        highlightIndices: [3],
      },
      {
        lineNum: 4,
        explanation: 'Check condition: Is A[4] > maxVal? (19 > 42) → False. Champion remains 42.',
        variables: { maxVal: 42, i: 4, '19 > 42': 'False' },
        highlightIndices: [3],
      },
      {
        lineNum: 7,
        explanation: 'Loop ends. All n elements have been inspected.',
        variables: { maxVal: 42, status: 'Done' },
      },
      {
        lineNum: 8,
        explanation: 'Execute return maxVal. Outputs 42.',
        variables: { maxVal: 42, output: 42 },
        isFinal: true,
        result: 'Returned 42',
      },
    ],
  },
  {
    id: 'linearSearch',
    title: 'Task 5: Linear Search with Early Exit',
    difficulty: 'Intermediate',
    tag: 'Search & Sentinel Return',
    description: 'Scans array A[1...n] looking for target. Immediately returns index when found, or -1 if absent.',
    codeLines: [
      { lineNum: 1, text: 'Algorithm LinearSearch(A, n, target)', indent: 0 },
      { lineNum: 2, text: 'for i ← 1 to n do', indent: 1 },
      { lineNum: 3, text: 'if A[i] = target then', indent: 2 },
      { lineNum: 4, text: 'return i', indent: 3 },
      { lineNum: 5, text: 'end if', indent: 2 },
      { lineNum: 6, text: 'end for', indent: 1 },
      { lineNum: 7, text: 'return -1', indent: 1 },
    ],
    initialState: { A: [14, 5, 29, 11], target: 29, i: 1 },
    steps: [
      {
        lineNum: 1,
        explanation: 'Array A = [14, 5, 29, 11], searching for target = 29.',
        variables: { target: 29, i: '—' },
      },
      {
        lineNum: 2,
        explanation: 'Start loop at index i ← 1 (A[1] = 14).',
        variables: { target: 29, i: 1, 'A[1]': 14 },
        highlightIndices: [0],
      },
      {
        lineNum: 3,
        explanation: 'Compare: Does A[1] = target? (14 = 29) → False. Continue search.',
        variables: { target: 29, i: 1, '14 = 29': 'False' },
        highlightIndices: [0],
      },
      {
        lineNum: 2,
        explanation: 'Advance loop: i ← 2 (A[2] = 5).',
        variables: { target: 29, i: 2, 'A[2]': 5 },
        highlightIndices: [1],
      },
      {
        lineNum: 3,
        explanation: 'Compare: Does A[2] = target? (5 = 29) → False. Continue search.',
        variables: { target: 29, i: 2, '5 = 29': 'False' },
        highlightIndices: [1],
      },
      {
        lineNum: 2,
        explanation: 'Advance loop: i ← 3 (A[3] = 29).',
        variables: { target: 29, i: 3, 'A[3]': 29 },
        highlightIndices: [2],
      },
      {
        lineNum: 3,
        explanation: 'Compare: Does A[3] = target? (29 = 29) → True! Target found!',
        variables: { target: 29, i: 3, '29 = 29': 'Match Found!' },
        highlightIndices: [2],
      },
      {
        lineNum: 4,
        explanation: 'Execute return i (return 3). Early exit terminates algorithm immediately without scanning A[4].',
        variables: { target: 29, output: 3, index: 3 },
        highlightIndices: [2],
        isFinal: true,
        result: 'Found at index 3',
      },
    ],
  },
];

export const PseudocodeVisualizer: React.FC<PseudocodeVisualizerProps> = ({
  focusedMode = 'tasks',
  initialTaskId,
  allowedTaskIds,
  compact = false,
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'rules'>(
    focusedMode === 'conventions' || focusedMode === 'rules' ? 'rules' : 'tasks'
  );

  const [selectedTaskId, setSelectedTaskId] = useState<TaskId>(() => {
    if (initialTaskId && TASKS.some((t) => t.id === initialTaskId)) {
      return initialTaskId;
    }
    if (allowedTaskIds && allowedTaskIds.length > 0) {
      return allowedTaskIds[0];
    }
    return 'maxTwo';
  });

  const [showAllTasks, setShowAllTasks] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Sync with initialTaskId if it changes (e.g. user navigates between lesson sections)
  useEffect(() => {
    if (initialTaskId && TASKS.some((t) => t.id === initialTaskId)) {
      setSelectedTaskId(initialTaskId);
      setStepIndex(0);
      setIsPlaying(false);
    }
  }, [initialTaskId]);

  useEffect(() => {
    if (focusedMode === 'conventions' || focusedMode === 'rules') {
      setActiveTab('rules');
    } else {
      setActiveTab('tasks');
    }
  }, [focusedMode]);

  const currentTask = TASKS.find((t) => t.id === selectedTaskId) || TASKS[0];
  const currentStep = currentTask.steps[stepIndex] || currentTask.steps[0];

  const tasksToDisplay =
    allowedTaskIds && allowedTaskIds.length > 0 && !showAllTasks
      ? TASKS.filter((t) => allowedTaskIds.includes(t.id))
      : TASKS;

  // Auto-play stepper
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < currentTask.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTask.steps.length]);

  const handleSelectTask = (id: TaskId) => {
    setSelectedTaskId(id);
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (stepIndex < currentTask.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setStepIndex(0);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-4 font-sans text-[#1A1A1A] dark:text-[#EDE8DF]" id="pseudocode-visualizer">
      {/* Top Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] text-xs">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-serif font-semibold transition-all cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-white dark:bg-[#2C2824] text-[#991B1B] dark:text-[#EF4444] shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Task Examples & Interactive Step-Through</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-serif font-semibold transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-white dark:bg-[#2C2824] text-[#991B1B] dark:text-[#EF4444] shadow-2xs border border-[#E5E2D9] dark:border-[#38332B]'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>5 Core Rules & Syntax Guide</span>
          </button>
        </div>

        <span className="hidden sm:inline text-[11px] font-mono text-[#88847C] dark:text-[#78716C] pr-2">
          Introductory Pseudocode Workbench
        </span>
      </div>

      {/* TAB 1: TASK EXAMPLES & STEP-THROUGH */}
      {activeTab === 'tasks' && (
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-2xs">
          {/* Task Selection Pills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-serif font-bold text-[#88847C] dark:text-[#A8A29E] uppercase tracking-wider">
                {allowedTaskIds && !showAllTasks
                  ? 'Section Tasks (Click to switch):'
                  : 'Select an Example Task (Progressive Difficulty):'}
              </div>
              {allowedTaskIds && allowedTaskIds.length > 0 && (
                <button
                  onClick={() => setShowAllTasks(!showAllTasks)}
                  className="text-[11px] font-mono text-[#991B1B] dark:text-[#EF4444] hover:underline cursor-pointer"
                >
                  {showAllTasks ? 'Show Section Tasks Only' : 'Show All 7 Tasks (+)'}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tasksToDisplay.map((t, idx) => {
                const isSelected = selectedTaskId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTask(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-serif font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#991B1B] text-white shadow-2xs'
                        : 'bg-[#FAF8F5] dark:bg-[#221F1B] text-[#57534E] dark:text-[#D6D0C5] hover:bg-[#F4F2EB] dark:hover:bg-[#2C2824] border border-[#E5E2D9] dark:border-[#38332B]'
                    }`}
                  >
                    <span className="opacity-75">{idx + 1}.</span>
                    <span>{t.title.replace(/^(Task\s+[A-Z0-9]+:\s*)/i, '')}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        t.difficulty === 'Easy'
                          ? isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                          : isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {t.difficulty}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Task Header & Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#221F1B] border border-[#E5E2D9] dark:border-[#38332B]">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                  {currentTask.title}
                </h4>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#66625B] dark:text-[#A8A29E]">
                  {currentTask.tag}
                </span>
              </div>
              <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
                {currentTask.description}
              </p>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#1A1815] p-1 rounded-lg border border-[#E5E2D9] dark:border-[#38332B] text-xs">
              <button
                onClick={handleReset}
                className="p-1.5 rounded hover:bg-[#FAF8F5] dark:hover:bg-[#2E2923] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white cursor-pointer"
                title="Reset to beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-[#FAF8F5] dark:hover:bg-[#2E2923] text-[#66625B] dark:text-[#A8A29E] cursor-pointer"
                title={isPlaying ? 'Pause' : 'Auto Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#D97706]" /> : <Play className="w-3.5 h-3.5 text-[#15803D]" />}
                <span className="text-[11px] font-mono">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#991B1B] text-white font-serif font-bold hover:bg-[#7F1D1D] cursor-pointer transition-colors"
              >
                <span>Step {stepIndex + 1}/{currentTask.steps.length}</span>
                <SkipForward className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Dual Panel: Left = Pseudocode Box with Line Highlight, Right = Live State Machine */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left: Clean Formatted Pseudocode Block */}
            <div className="md:col-span-6 p-4 rounded-xl bg-[#1E1E1E] text-white font-mono text-xs space-y-1 shadow-sm overflow-x-auto border border-[#333333]">
              <div className="flex items-center justify-between pb-2 border-b border-[#333333] mb-2 text-[11px] text-[#A3A3A3]">
                <span>Pseudocode Specification</span>
                <span className="text-emerald-400 font-sans text-[11px]">Line {currentStep.lineNum} active</span>
              </div>
              {currentTask.codeLines.map((line) => {
                const isActive = line.lineNum === currentStep.lineNum;
                return (
                  <div
                    key={line.lineNum}
                    className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                      isActive
                        ? 'bg-[#991B1B]/40 text-white font-bold border-l-3 border-[#EF4444]'
                        : 'text-[#D4D4D4] hover:bg-white/5'
                    }`}
                  >
                    <span className="w-4 text-right text-[10px] text-[#666666] select-none font-mono">
                      {line.lineNum}
                    </span>
                    <span style={{ paddingLeft: `${line.indent * 14}px` }} className="tracking-wide">
                      {line.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right: State Inspector & Visual Explanation */}
            <div className="md:col-span-6 space-y-3">
              {/* Step Explanation Card */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#221F1B] border border-[#E5E2D9] dark:border-[#38332B] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-[#991B1B] dark:text-[#EF4444]">
                    Step {stepIndex + 1} Walkthrough:
                  </span>
                  {currentStep.isFinal && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold">
                      Algorithm Completed
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-[13px] text-[#2C2B29] dark:text-[#EDE8DF] leading-relaxed">
                  {currentStep.explanation}
                </p>
              </div>

              {/* Variables Watch Box */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#221F1B] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
                <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center justify-between">
                  <span>Current Variable Values (Watch Table):</span>
                  <span className="text-[10px] font-mono text-[#88847C]">Memory State</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {Object.entries(currentStep.variables).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2 rounded-lg bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] flex flex-col"
                    >
                      <span className="text-[10px] text-[#88847C] dark:text-[#78716C]">{key}</span>
                      <strong className="text-[#1A1A1A] dark:text-[#EDE8DF] text-xs truncate">
                        {String(val)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Array Snapshot (if applicable) */}
              {(selectedTaskId === 'findMax' || selectedTaskId === 'linearSearch') && (
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#221F1B] border border-[#E5E2D9] dark:border-[#38332B] space-y-1.5">
                  <div className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center justify-between">
                    <span>Array Memory Cells:</span>
                    <span className="text-[10px] font-mono text-[#88847C]">1-based indices</span>
                  </div>
                  <div className="flex gap-1.5 sm:gap-2">
                    {(selectedTaskId === 'findMax' ? [14, 5, 42, 19] : [14, 5, 29, 11]).map((val, idx) => {
                      const isHighlighted = currentStep.highlightIndices?.includes(idx);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div
                            className={`w-full py-2 rounded-lg border text-center font-mono font-bold text-xs transition-all ${
                              isHighlighted
                                ? 'bg-[#DCFCE7] dark:bg-[#14532D] text-[#15803D] dark:text-[#86EFAC] border-[#22C55E] ring-2 ring-[#22C55E]'
                                : 'bg-white dark:bg-[#1A1815] text-[#2C2B29] dark:text-[#EDE8DF] border-[#E5E2D9] dark:border-[#38332B]'
                            }`}
                          >
                            {val}
                          </div>
                          <span className="text-[10px] font-mono text-[#88847C] mt-1">[{idx + 1}]</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 5 CORE RULES & SYNTAX GUIDE */}
      {activeTab === 'rules' && (
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-4 shadow-2xs">
          <div>
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
              <span>The 5 Essential Rules for Writing Good Pseudocode</span>
            </h4>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
              Follow these simple conventions so anyone—professors, interviewers, and team members—can understand your algorithm instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            {/* Rule 1 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#991B1B] text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Write Control Keywords in ALL CAPS
                </span>
              </div>
              <p className="text-[#66625B] dark:text-[#A8A29E] leading-relaxed">
                Keywords like <code className="font-mono text-[#991B1B] dark:text-[#EF4444] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">INPUT</code>,{' '}
                <code className="font-mono text-[#991B1B] dark:text-[#EF4444] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">OUTPUT</code>,{' '}
                <code className="font-mono text-[#991B1B] dark:text-[#EF4444] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">IF</code>,{' '}
                <code className="font-mono text-[#991B1B] dark:text-[#EF4444] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">ELSE</code>,{' '}
                <code className="font-mono text-[#991B1B] dark:text-[#EF4444] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">FOR</code>,{' '}
                <code className="font-mono text-[#991B1B] dark:text-[#EF4444] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">WHILE</code>, and{' '}
                <code className="font-mono text-[#991B1B] dark:text-[#EF4444] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">RETURN</code> should be capitalized so they stand out from your variables.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#991B1B] text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Use Arrow (←) for Assignment, Not (=)
                </span>
              </div>
              <p className="text-[#66625B] dark:text-[#A8A29E] leading-relaxed">
                In mathematics, <code className="font-mono">x = x + 1</code> is impossible. In pseudocode, use the assignment arrow <code className="font-mono text-[#991B1B] dark:text-[#EF4444] font-bold">x ← x + 1</code> to mean "update variable x with x + 1". Keep the equal sign <code className="font-mono">=</code> strictly for checking equality.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#991B1B] text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Indent Lines to Show What Belongs Where
                </span>
              </div>
              <p className="text-[#66625B] dark:text-[#A8A29E] leading-relaxed">
                Do not clutter pseudocode with curly braces <code className="font-mono">{}</code> or semicolons <code className="font-mono">;</code>. Simply indent any statements that run inside an <code className="font-mono">if</code> block or loop by 2 to 4 spaces.
              </p>
            </div>

            {/* Rule 4 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#991B1B] text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <span className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Use Plain English Logical Words
                </span>
              </div>
              <p className="text-[#66625B] dark:text-[#A8A29E] leading-relaxed">
                Prefer plain readable words like <code className="font-mono font-bold text-[#1A1A1A] dark:text-white">and</code>,{' '}
                <code className="font-mono font-bold text-[#1A1A1A] dark:text-white">or</code>,{' '}
                <code className="font-mono font-bold text-[#1A1A1A] dark:text-white">not</code>, and{' '}
                <code className="font-mono font-bold text-[#1A1A1A] dark:text-white">mod</code> (remainder) over symbols like <code className="font-mono">&&</code>, <code className="font-mono">||</code>, or <code className="font-mono">%</code>.
              </p>
            </div>
          </div>

          {/* Side-by-Side Comparison: Bad vs Good Pseudocode */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <div className="font-serif font-bold text-sm text-[#1A1A1A] dark:text-[#EDE8DF]">
              Quick Comparison: Bad vs. Standard Pseudocode
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#FEF2F2] dark:bg-[#3B1212] border border-[#FECACA] dark:border-[#7F1D1D] space-y-1.5">
                <span className="font-serif font-bold text-[#DC2626] dark:text-[#F87171]">
                  ❌ Unclear / Bad Pseudocode:
                </span>
                <pre className="font-mono text-[11px] text-[#7F1D1D] dark:text-[#FCA5A5] leading-relaxed">
{`function m(x, y) {
int a = x;
if (y > a) { a = y; }
return a;
}`}
                </pre>
                <p className="text-[11px] text-[#991B1B] dark:text-[#F87171]">
                  Uses C-style curly braces, semicolons, and confusing equality syntax.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#F0FDF4] dark:bg-[#132A1C] border border-[#BBF7D0] dark:border-[#14532D] space-y-1.5">
                <span className="font-serif font-bold text-[#16A34A] dark:text-[#4ADE80]">
                  ✅ Clean, Standard Pseudocode:
                </span>
                <pre className="font-mono text-[11px] text-[#14532D] dark:text-[#86EFAC] leading-relaxed">
{`Algorithm MaxOfTwo(a, b)
  if a > b then
    return a
  else
    return b
  end if`}
                </pre>
                <p className="text-[11px] text-[#15803D] dark:text-[#4ADE80]">
                  Capitalized keywords, clear indentation, and no cryptic compiler symbols.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
