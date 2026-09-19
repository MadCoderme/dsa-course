export type TopicId = 
  // Getting Started & Curriculum Roadmap
  | 'course-overview'
  // Foundations & Asymptotic Analysis
  | 'complexity-notations'
  | 'pseudocode-introduction'
  // Linear Data Structures
  | 'vector'
  | 'string'
  | 'list'
  | 'stack'
  | 'queue'
  | 'priority-queue'
  | 'set'
  | 'map'
  // Tree Data Structures (Broken down into detailed topics)
  | 'tree'
  | 'tree-traversals'
  | 'expression-threaded-trees'
  | 'bst-rbt'
  | 'avl-tree'
  | 'red-black-tree'
  | 'b-tree'
  | 'b-plus-tree'
  | 'huffman-coding'
  // Graph Data Structures & Algorithms (Broken down into detailed topics)
  | 'graph-representations'
  | 'graph'
  | 'topological-sort'
  | 'shortest-path-dijkstra'
  | 'floyd-warshall'
  | 'mst'
  // Core Algorithms & Array Operations
  | 'array-operations'
  | 'searching-algorithms'
  | 'sorting-algorithms'
  | 'string-operations'
  | 'kmp-pattern-matching';

export interface SubCategory {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  topicIds: TopicId[];
}

export interface Category {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  icon: string;
  badgeColor: string;
  subCategories: SubCategory[];
}

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

export interface PracticeProblem {
  id: string;
  title: string;
  platform: 'LeetCode' | 'Codeforces' | 'CSES' | 'GeeksforGeeks';
  problemNumber?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | '800' | '800-1200' | '1300-1600' | '1700+' | string;
  url: string;
  description: string;
  keyPattern: string;
  acceptanceOrRating?: string;
  tags?: string[];
}

export interface Lesson {
  id: TopicId;
  categoryId?: string;
  subCategoryId?: string;
  title: string;
  subtitle: string;
  icon: string;
  importance?: '🔥 CRITICAL' | '⚡ HIGH' | '🟡 MEDIUM-HIGH' | '🟡 MEDIUM' | '🟢 MODERATE';
  cuetExamRelevance?: string;
  overview: string;
  timeComplexity?: {
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
  cstlReference?: {
    header: string;
    declaration: string;
    commonMethods: {
      method: string;
      description: string;
      complexity: string;
    }[];
    notes: string[];
  };
  codeSnippets?: CodeSnippet[];
  examQuestions?: ExamQuestion[];
  quizzes?: QuizQuestion[];
  practiceProblems?: PracticeProblem[];
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
