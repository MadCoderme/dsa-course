export type TopicId = 
  | 'vector'
  | 'list'
  | 'stack'
  | 'queue'
  | 'tree'
  | 'avl-tree'
  | 'priority-queue'
  | 'set'
  | 'map'
  | 'graph';

export type TabId = 'concept' | 'visualizer' | 'code' | 'exam' | 'quiz';

export interface CodeSnippet {
  language: 'cpp' | 'c' | 'python' | 'java';
  title: string;
  code: string;
  explanation: string;
}

export interface ExamQuestion {
  id: string;
  year: string;
  marks: number;
  question: string;
  subQuestions?: string[];
  solution: string;
  keyTakeaway: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Exam Classic';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTip?: string;
}

export interface Lesson {
  id: TopicId;
  title: string;
  subtitle: string;
  icon: string;
  importance: '🔥 CRITICAL' | '⚡ HIGH' | '🟡 MEDIUM-HIGH' | '🟡 MEDIUM' | '🟢 MODERATE';
  cuetExamRelevance: string;
  overview: string;
  timeComplexity: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
    space: string;
  };
  keyConcepts: {
    title: string;
    description: string;
    bulletPoints?: string[];
    mathFormula?: string;
  }[];
  cstlReference: {
    header: string;
    declaration: string;
    commonMethods: {
      method: string;
      description: string;
      complexity: string;
    }[];
    notes: string[];
  };
  codeSnippets: CodeSnippet[];
  examQuestions: ExamQuestion[];
  quizzes: QuizQuestion[];
}

export interface WeightageTopic {
  moduleNumber: number;
  name: string;
  questionsCount: number;
  avgMarks: string;
  importance: '🔥 CRITICAL' | '⚡ HIGH' | '🟡 MEDIUM-HIGH' | '🟡 MEDIUM' | '🟢 MODERATE';
  trend: string;
  keyTopics: string[];
}

export interface HighYieldChecklistItem {
  id: number;
  title: string;
  description: string;
  targetTopic: string;
  completed: boolean;
}
