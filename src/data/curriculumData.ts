import { WeightageTopic, HighYieldChecklistItem } from '../types';

export const EXAM_METADATA = {
  courseCode: 'CSE-241',
  courseTitle: 'Data Structure',
  institution: 'Chittagong University of Engineering and Technology (CUET)',
  yearsCovered: '2018, 2019, 2021, 2022, 2023, 2024, and 2025 (7 Cycles)',
  totalMarks: 210,
  duration: '3 Hours',
  sections: [
    {
      name: 'Section-A',
      questions: 'Q.1 to Q.4',
      coreTopics: 'Trees (AVL, B-Tree, B+, Huffman), Graph Algorithms (BFS/DFS, Warshall, MST), Sorting/Searching'
    },
    {
      name: 'Section-B',
      questions: 'Q.5 to Q.8',
      coreTopics: 'Linked Lists & Applications, Stacks & Queues, Asymptotic Complexity, Hashing, Memory Calculations'
    }
  ],
  questionBalance: [
    { type: 'Algorithmic Simulation & Tree/Graph Constructions', percentage: 45, color: 'emerald' },
    { type: 'Procedural Pseudo-code Writing (C-like functions)', percentage: 30, color: 'indigo' },
    { type: 'Theoretical Analysis & Mathematical Proofs', percentage: 15, color: 'amber' },
    { type: 'Address Calculation & Formula Applications', percentage: 10, color: 'rose' }
  ]
};

export const WEIGHTAGE_MATRIX: WeightageTopic[] = [
  {
    moduleNumber: 1,
    name: 'Trees & Multi-way Search Trees',
    questionsCount: 34,
    avgMarks: '55 - 65',
    importance: '🔥 CRITICAL',
    trend: 'Core focus of Section-A (Guaranteed 2–3 full questions). B+ Trees and Order-3/4 M-way trees expanded in 2022–2025.',
    keyTopics: ['AVL Rotations (LL, RR, LR, RL)', 'B-Tree Order-3 & Order-5 Construction & Deletion', 'B+ Tree (Order 4)', 'Huffman Coding & Weighted 2-Trees', 'BST 3 Deletion Cases']
  },
  {
    moduleNumber: 2,
    name: 'Graph Algorithms',
    questionsCount: 28,
    avgMarks: '40 - 50',
    importance: '🔥 CRITICAL',
    trend: 'Guaranteed 2 full questions across Sec-A and Sec-B. Heavy focus on step-by-step matrix updates.',
    keyTopics: ['Modified Warshall / Floyd-Warshall (All-Pairs Shortest Path)', 'Topological Sort & POSETs', 'BFS (Shortest Path) & DFS (Reachability)', 'Prim’s & Kruskal’s MST', 'Edge Classification (Tree, Back, Forward, Cross)']
  },
  {
    moduleNumber: 3,
    name: 'Sorting & Searching',
    questionsCount: 24,
    avgMarks: '35 - 45',
    importance: '⚡ HIGH',
    trend: 'Guaranteed in every paper. Increased testing of exact step-by-step array state updates during execution.',
    keyTopics: ['Heap Sort & Max/Min Heap conversions', 'Quicksort vs Mergesort (Partition trace, O(N²) worst-case)', 'Radix Sort digit-by-digit buckets', 'Ternary Search comparison bounds', 'Insertion Sort on nearly-sorted data']
  },
  {
    moduleNumber: 4,
    name: 'Linked Lists & Applications',
    questionsCount: 22,
    avgMarks: '30 - 40',
    importance: '⚡ HIGH',
    trend: 'Backbone of Section-B procedure-writing questions. 2024–2025 tested list splitting into unique and non-unique sub-lists.',
    keyTopics: ['C-style procedure writing (Copy, Delete duplicates, Filter uniques)', 'Doubly (Two-Way) Linked Lists', 'Circular Header Lists & Polynomial Addition (COEF, EXP, LINK)', 'AVAIL list, Memory Allocation & Garbage Collection']
  },
  {
    moduleNumber: 5,
    name: 'Stacks, Queues & Recursion',
    questionsCount: 20,
    avgMarks: '25 - 35',
    importance: '⚡ HIGH',
    trend: 'Recurring in Section-B; heavy on step-by-step stack tables and array-based dual-stack implementations.',
    keyTopics: ['Infix to Postfix conversion tables & numerical evaluation', 'Tower of Hanoi recursion tree / stack trace', 'Multi-Stack inside a single array (PUSH / POP)', 'Inter-structure element transfer (INSQ-FRMS, INSS-FRMQ)']
  },
  {
    moduleNumber: 6,
    name: 'Asymptotic Analysis & Complexity',
    questionsCount: 16,
    avgMarks: '20 - 25',
    importance: '🟡 MEDIUM-HIGH',
    trend: 'Always present in Q.1 or Q.8 (Theory + Formal Proofs).',
    keyTopics: ['Growth rate ordering', 'Formal definition proofs f(n) <= C * g(n)', 'Nested loop exact operations analysis (O(N³))']
  },
  {
    moduleNumber: 7,
    name: 'Hashing & Hash Tables',
    questionsCount: 10,
    avgMarks: '12 - 20',
    importance: '🟡 MEDIUM-HIGH',
    trend: 'Appears almost every year in either Sec-A or Sec-B.',
    keyTopics: ['Linear Probing, Quadratic Probing, Double Hashing', 'Separate Chaining', 'Deletion in Open Addressing (Tombstones/Dummies)']
  },
  {
    moduleNumber: 8,
    name: 'Arrays & Address Calculations',
    questionsCount: 11,
    avgMarks: '12 - 18',
    importance: '🟡 MEDIUM',
    trend: 'Formula-driven high-scoring numerical questions (Guaranteed 6–10 marks when asked).',
    keyTopics: ['Column-Major Order 2D & 3D Address Formulas with arbitrary lower/upper bounds', 'Array group reversal', 'Finding leader elements']
  },
  {
    moduleNumber: 9,
    name: 'String Processing & Pattern Matching',
    questionsCount: 6,
    avgMarks: '08 - 12',
    importance: '🟢 MODERATE',
    trend: 'Tested every 1–2 years (State graphs and transition tables).',
    keyTopics: ['Pattern Matching State Machine (KMP table & graph)', 'Substring replacement procedure']
  }
];

export const INITIAL_HIGH_YIELD_CHECKLIST: HighYieldChecklistItem[] = [
  {
    id: 1,
    title: 'Column-Major Memory Address Formula',
    description: 'Calculate 3D array index physical memory addresses for arbitrary lower/upper bounds (e.g. Y(3:10, 1:15, 10:20)) with word size W.',
    targetTopic: 'vector',
    completed: false
  },
  {
    id: 2,
    title: 'AVL Tree Rotations (LL, RR, LR, RL)',
    description: 'Insert 10–12 integer keys sequentially into an initially empty AVL tree and compute balance factors.',
    targetTopic: 'avl-tree',
    completed: false
  },
  {
    id: 3,
    title: 'B-Tree & B+ Tree Construction',
    description: 'Master order-3 & order-5 B-tree node split/merge and order-4 B+ tree leaf chaining.',
    targetTopic: 'b-tree',
    completed: false
  },
  {
    id: 4,
    title: 'Huffman Coding 2-Tree & Weighted Path',
    description: 'Construct optimal binary prefix 2-trees given character frequencies and compute minimum weighted path length.',
    targetTopic: 'huffman-coding',
    completed: false
  },
  {
    id: 5,
    title: 'Modified Warshall Algorithm (All-Pairs Shortest Path)',
    description: 'Compute step-by-step N x N distance matrices Q^(0), Q^(1), ..., Q^(N) for directed weighted graphs.',
    targetTopic: 'floyd-warshall',
    completed: false
  },
  {
    id: 6,
    title: 'Topological Sorting & Graph Traversals',
    description: 'Trace BFS shortest paths and determine POSET topological orders for DAGs.',
    targetTopic: 'topological-sort',
    completed: false
  },
  {
    id: 7,
    title: 'Heap Sort Simulation & Array Conversion',
    description: 'Convert arrays into Max/Min Heaps and track step-by-step array state after successive root extractions.',
    targetTopic: 'priority-queue',
    completed: false
  },
  {
    id: 8,
    title: 'Infix-to-Postfix & Evaluation Stack Tables',
    description: 'Convert algebraic expressions using operator precedence stack tables and evaluate postfix numerically.',
    targetTopic: 'stack',
    completed: false
  },
  {
    id: 9,
    title: 'Polynomial Addition in Circular Header Lists',
    description: 'Write procedural C-code to add two polynomials P1(x) + P2(x) using COEF, EXP, and LINK arrays.',
    targetTopic: 'list',
    completed: false
  },
  {
    id: 10,
    title: 'Open Addressing Hash Collision Resolution',
    description: 'Trace linear probing, quadratic probing, and double hashing with hash(k) = k mod M.',
    targetTopic: 'set',
    completed: false
  },
  {
    id: 11,
    title: 'Procedural REPLACE & Buffer Expansion',
    description: 'Trace procedural REPLACE(TEXT, PAT, REP) handling buffer shifts when replacement length differs from pattern length.',
    targetTopic: 'string-operations',
    completed: false
  },
  {
    id: 12,
    title: 'KMP Prefix Failure Table & Pattern Matching',
    description: 'Construct the step-by-step π-table for patterns like "AABAACAABAA" and trace non-backtracking text matching.',
    targetTopic: 'kmp-pattern-matching',
    completed: false
  }
];
