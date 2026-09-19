import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'orientation',
    name: 'Course Overview & Roadmap',
    shortName: 'Orientation',
    description: 'Pedagogical mission, 7-stage master study plan, examination weightages, and direct topic roadmap.',
    icon: 'Compass',
    badgeColor: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
    subCategories: [
      {
        id: 'course-guide',
        name: 'Welcome & Study Guide',
        shortName: 'Study Guide',
        description: 'Interactive curriculum roadmap with direct links, purpose of this platform, and 210-mark exam strategy.',
        topicIds: ['course-overview']
      }
    ]
  },
  {
    id: 'foundations',
    name: 'Foundations & Algorithm Analysis',
    shortName: 'Foundations',
    description: 'Mathematical foundations of algorithm analysis, asymptotic growth notations (Big-O, Omega, Theta), recurrence relations, and formal pseudocode conventions.',
    icon: 'Binary',
    badgeColor: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    subCategories: [
      {
        id: 'algorithmic-foundations',
        name: 'Asymptotic Analysis & Pseudocode',
        shortName: 'Analysis & Pseudocode',
        description: 'Rigorous definitions of Big-O/Omega/Theta, Master Theorem, space complexity, and structured pseudocode conventions.',
        topicIds: ['complexity-notations', 'pseudocode-introduction']
      }
    ]
  },
  {
    id: 'linear',
    name: 'Linear Data Structures',
    shortName: 'Linear',
    description: 'Contiguous arrays, node chains, and restricted-access container adapters with predictable sequential ordering.',
    icon: 'Layers',
    badgeColor: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    subCategories: [
      {
        id: 'sequential-contiguous',
        name: 'Sequential & Contiguous Storage',
        shortName: 'Sequential',
        description: 'Contiguous memory buffers and pointer-linked node sequences with address formulas and pointer manipulation.',
        topicIds: ['vector', 'string', 'list']
      },
      {
        id: 'restricted-adts',
        name: 'Restricted-Access ADTs (LIFO / FIFO)',
        shortName: 'Stack & Queue ADTs',
        description: 'Abstract data types enforcing restricted access policies including LIFO trays, FIFO ring queues, and heap priority order.',
        topicIds: ['stack', 'queue', 'priority-queue']
      },
      {
        id: 'associative-hash',
        name: 'Associative & Key-Value Containers',
        shortName: 'Associative & Hash',
        description: 'Unique key sets and associative key-value mappings backed by balanced search trees and hash bucket probing.',
        topicIds: ['set', 'map']
      }
    ]
  },
  {
    id: 'trees',
    name: 'Tree Data Structures',
    shortName: 'Trees',
    description: 'Hierarchical non-linear structures, recursive traversals, self-balancing search trees, and multi-way disk indices.',
    icon: 'GitBranch',
    badgeColor: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    subCategories: [
      {
        id: 'tree-fundamentals',
        name: 'Binary Tree Fundamentals',
        shortName: 'Fundamentals',
        description: 'Node hierarchies, full/complete classifications, array indexing arithmetic, and mathematical induction proofs.',
        topicIds: ['tree', 'tree-traversals', 'expression-threaded-trees']
      },
      {
        id: 'bst-and-balanced',
        name: 'Search Trees & Self-Balancing',
        shortName: 'BST & Balanced',
        description: 'Binary search tree ordering, 3-case node deletion, AVL balance factors with 4 canonical rotations, and Red-Black tree properties.',
        topicIds: ['bst-rbt', 'avl-tree', 'red-black-tree']
      },
      {
        id: 'multiway-encoding',
        name: 'Multi-Way Indexing & Optimal Trees',
        shortName: 'Multi-Way & Encoding',
        description: 'Order-M B-Trees with node splitting, B+ Tree disk-block linked leaves, and Huffman prefix encoding 2-trees.',
        topicIds: ['b-tree', 'b-plus-tree', 'huffman-coding']
      }
    ]
  },
  {
    id: 'graphs',
    name: 'Graph Data Structures & Algorithms',
    shortName: 'Graphs',
    description: 'Network topologies, matrix representations, graph traversals, topological orderings, shortest paths, and spanning trees.',
    icon: 'Network',
    badgeColor: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
    subCategories: [
      {
        id: 'graph-basics',
        name: 'Graph Models & Representations',
        shortName: 'Representations',
        description: 'Adjacency matrices, adjacency lists, path reachability matrices, and memory space trade-offs for dense vs sparse graphs.',
        topicIds: ['graph-representations']
      },
      {
        id: 'graph-traversals',
        name: 'Graph Exploration & Ordering',
        shortName: 'Traversals & Topo',
        description: 'Breadth-First Search (BFS), Depth-First Search (DFS), edge classification (tree, back, cross), and Kahn’s topological sort on DAGs.',
        topicIds: ['graph', 'topological-sort']
      },
      {
        id: 'shortest-paths',
        name: 'Shortest Path Optimization',
        shortName: 'Shortest Paths',
        description: 'Single-source shortest paths (Dijkstra) and all-pairs shortest path dynamic programming (Floyd-Warshall & Warshall).',
        topicIds: ['shortest-path-dijkstra', 'floyd-warshall']
      },
      {
        id: 'mst-algorithms',
        name: 'Minimum Spanning Trees',
        shortName: 'Spanning Trees',
        description: 'Optimal network spanning tree construction using Kruskal’s greedy edge sorting with DSU and Prim’s cut-property algorithm.',
        topicIds: ['mst']
      }
    ]
  },
  {
    id: 'algorithms',
    name: 'Algorithms & Computational Methods',
    shortName: 'Algorithms',
    description: 'Array operations, searching and sorting paradigms, pattern matching automata, and text search.',
    icon: 'Binary',
    badgeColor: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    subCategories: [
      {
        id: 'array-operations-sub',
        name: 'Linear, 2D & N-D Array Operations',
        shortName: 'Array Operations',
        description: 'Basic array operations (traversal, insertion, deletion) with formal pseudo-code, 2D row/column major layouts, and n-dimensional address calculation.',
        topicIds: ['array-operations']
      },
      {
        id: 'search-sort-algorithms',
        name: 'Searching & Sorting Algorithms',
        shortName: 'Search & Sort',
        description: 'Linear vs. Binary Search with interval halving, and comparative sorting algorithms (Bubble, Selection, Insertion, Merge, Quick Sort) with interactive simulations.',
        topicIds: ['searching-algorithms', 'sorting-algorithms']
      },
      {
        id: 'string-algorithms',
        name: 'String Operations & Pattern Matching',
        shortName: 'String Ops & KMP',
        description: 'Beginner-friendly string operations (slicing, concatenation, find & replace) and smart pattern matching algorithms (Naive vs. KMP).',
        topicIds: ['string-operations', 'kmp-pattern-matching']
      }
    ]
  }
];

export function getCategoryForTopic(topicId: string): { category?: Category; subCategory?: Category['subCategories'][0] } {
  for (const cat of CATEGORIES) {
    for (const sub of cat.subCategories) {
      if (sub.topicIds.includes(topicId as any)) {
        return { category: cat, subCategory: sub };
      }
    }
  }
  return {};
}
