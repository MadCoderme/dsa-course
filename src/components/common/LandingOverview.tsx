import React from 'react';
import { TopicId } from '../../types';
import { OVERVIEW_LESSON } from '../../data/lessons/overviewLesson';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Layers,
  GitBranch,
  Network,
  Wrench,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface LandingOverviewProps {
  onSelectTopic: (topicId: TopicId | 'report' | 'calculator' | 'matrix') => void;
}

interface FlowStage {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
  items: {
    id: TopicId | 'report' | 'calculator' | 'matrix';
    title: string;
    description: string;
    tag?: string;
  }[];
}

export const LandingOverview: React.FC<LandingOverviewProps> = ({ onSelectTopic }) => {
  const STUDY_STAGES: FlowStage[] = [
    {
      title: 'Phase 1: Linear Data Structures',
      subtitle: 'Contiguous buffers, node sequences, restricted access ADTs, and associative mappings.',
      icon: <Layers className="w-4 h-4 text-[#1D4ED8]" />,
      badge: 'Linear',
      items: [
        {
          id: 'vector',
          title: 'Vector & Dynamic Arrays',
          description: 'Contiguous memory, size vs capacity doubling, amortized time complexity, and element shifting.',
          tag: 'O(1) Amortized'
        },
        {
          id: 'list',
          title: 'Linked Lists & Applications',
          description: 'Singly & doubly linked nodes, in-place list reversal, pointer safety, and polynomial arithmetic.',
          tag: 'Pointer Nodes'
        },
        {
          id: 'stack',
          title: 'Stack ADT & Expression Parsing',
          description: 'LIFO access policy, infix to postfix operator conversion, and call stack recursion frames.',
          tag: 'LIFO Policy'
        },
        {
          id: 'queue',
          title: 'Queue ADT & Ring Buffers',
          description: 'FIFO access policy, circular array wrap-around modulo arithmetic, and queue shifts.',
          tag: 'FIFO Policy'
        },
        {
          id: 'priority-queue',
          title: 'Priority Queue & Binary Heaps',
          description: 'Max/Min heap array storage, heapify operations, CPU task triage, and Dijkstra relaxations.',
          tag: 'Heap Order'
        },
        {
          id: 'set',
          title: 'Set Container (BST vs Hash)',
          description: 'Unique element sets, ordered balanced search trees vs constant time expected hash tables.',
          tag: 'Uniqueness'
        },
        {
          id: 'map',
          title: 'Map Container (Chaining & Probing)',
          description: 'Key-value mapping, hash functions, separate chaining, and open addressing probing.',
          tag: 'Key-Value'
        }
      ]
    },
    {
      title: 'Phase 2: Tree Data Structures',
      subtitle: 'Hierarchical node trees, recursive traversals, self-balancing search trees, and multi-way indexing.',
      icon: <GitBranch className="w-4 h-4 text-[#15803D]" />,
      badge: 'Trees',
      items: [
        {
          id: 'tree',
          title: 'Binary Tree Fundamentals',
          description: 'Strictly/Complete binary tree theorems, array representation formulas, and properties.',
          tag: 'Induction Proofs'
        },
        {
          id: 'tree-traversals',
          title: 'Tree Traversals & Reconstruction',
          description: 'Inorder, Preorder, and Postorder traversals, and binary tree reconstruction from visits.',
          tag: 'In/Pre/Post'
        },
        {
          id: 'expression-threaded-trees',
          title: 'Expression & Threaded Trees',
          description: 'Expression tree evaluation and stackless inorder iteration using NULL pointers as threads.',
          tag: 'Stackless'
        },
        {
          id: 'bst-rbt',
          title: 'BST Search & 3 Deletion Cases',
          description: 'Binary Search Tree invariants, search pathways, and 3-case deletion with inorder successor.',
          tag: 'BST Deletion'
        },
        {
          id: 'avl-tree',
          title: 'AVL Tree & 4 Rotations',
          description: 'Height-balanced trees, balance factors (|BF| <= 1), and LL, RR, LR, RL rebalancing rotations.',
          tag: 'Strict Balance'
        },
        {
          id: 'red-black-tree',
          title: 'Red-Black Trees',
          description: 'Color invariants, black-height equality, double-red insertion fixes, and deletion cases.',
          tag: 'Relaxed Balance'
        },
        {
          id: 'b-tree',
          title: 'B-Tree Multi-Way Indexing',
          description: 'Order-M search trees, multi-key nodes, median promotion splitting, and disk I/O reduction.',
          tag: 'Disk Storage'
        },
        {
          id: 'b-plus-tree',
          title: 'B+ Tree Range Queries',
          description: 'Linked leaf nodes containing all data items for fast sequential range scans in databases.',
          tag: 'DB Indexing'
        },
        {
          id: 'huffman-coding',
          title: 'Huffman Optimal 2-Trees',
          description: 'Greedy min-heap frequency merging to construct prefix-free optimal compression codes.',
          tag: 'Greedy Compression'
        }
      ]
    },
    {
      title: 'Phase 3: Graph Data Structures & Algorithms',
      subtitle: 'Networks, traversal explorations, topological ordering, shortest paths, and minimum spanning trees.',
      icon: <Network className="w-4 h-4 text-[#7E22CE]" />,
      badge: 'Graphs',
      items: [
        {
          id: 'graph-representations',
          title: 'Graph Models & Representations',
          description: 'Adjacency matrix vs adjacency list space/time trade-offs and path count matrix powers.',
          tag: 'Adjacency Matrix/List'
        },
        {
          id: 'graph',
          title: 'Graph Traversals (BFS & DFS)',
          description: 'Breadth-First and Depth-First explorations with queue/stack buffers and edge classification.',
          tag: 'BFS / DFS'
        },
        {
          id: 'topological-sort',
          title: 'Topological Sort (DAGs)',
          description: 'Linear ordering of directed acyclic graph vertices using Kahn in-degree reduction queue.',
          tag: 'Dependency Order'
        },
        {
          id: 'shortest-path-dijkstra',
          title: 'Dijkstra Shortest Path Algorithm',
          description: 'Single-source greedy edge relaxation using priority queue for nonnegative edge weights.',
          tag: 'Greedy Shortest Path'
        },
        {
          id: 'floyd-warshall',
          title: 'Floyd-Warshall All-Pairs DP',
          description: 'Dynamic programming matrix stage updates Q^(k) for all-pairs shortest paths in O(V^3).',
          tag: 'Dynamic Programming'
        },
        {
          id: 'mst',
          title: 'Minimum Spanning Trees (MST)',
          description: 'Connecting network nodes with minimal total edge weight using Kruskal DSU and Prim algorithm.',
          tag: 'Kruskal & Prim'
        }
      ]
    },
    {
      title: 'Phase 4: Examination & Diagnostic Tools',
      subtitle: 'Interactive tools to verify complexity bounds, practice address mathematics, and view exam trends.',
      icon: <Wrench className="w-4 h-4 text-[#B45309]" />,
      badge: 'Tools',
      items: [
        {
          id: 'report',
          title: '7-Year Past Exam Dashboard',
          description: 'Comprehensive breakdown of past exam paper weightages, mark distributions, and trends.',
          tag: 'Past Papers'
        },
        {
          id: 'calculator',
          title: 'Address Formula Solver',
          description: 'Step-by-step memory address calculation solver for 1D, 2D (Row/Col Major), and 3D arrays.',
          tag: 'Exam Solver'
        },
        {
          id: 'matrix',
          title: 'STL Complexity Matrix',
          description: 'Instant comparison table for access, search, insertion, and deletion bounds across C++ containers.',
          tag: 'Reference Table'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#E5E2D9] space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Welcome & Study Guide
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
            {OVERVIEW_LESSON.title}
          </h1>
          <p className="text-sm text-[#55514B] leading-relaxed max-w-3xl font-sans">
            {OVERVIEW_LESSON.overview}
          </p>
        </div>

        {/* Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {OVERVIEW_LESSON.keyConcepts.map((concept, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-1.5"
            >
              <h3 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#991B1B] shrink-0" />
                {concept.title}
              </h3>
              <p className="text-xs text-[#66625B] leading-relaxed font-sans">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Study Flow Title */}
      <div className="space-y-1 border-b border-[#E5E2D9] pb-3">
        <h2 className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#991B1B]" />
          Recommended Study Flow
        </h2>
        <p className="text-xs text-[#66625B] font-sans">
          Follow the sequential path below or jump directly to any topic by clicking its card.
        </p>
      </div>

      {/* Sequential Study Stages */}
      <div className="space-y-6">
        {STUDY_STAGES.map((stage, sIdx) => (
          <div key={sIdx} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white border border-[#E5E2D9]">
                  {stage.icon}
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#66625B] font-sans">
                    {stage.subtitle}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-medium text-[#88847C]">
                {stage.items.length} Topics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stage.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectTopic(item.id)}
                  className="p-4 rounded-xl bg-white border border-[#E5E2D9] hover:border-[#991B1B] transition-all cursor-pointer group flex flex-col justify-between space-y-2 shadow-2xs hover:shadow"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif font-bold text-sm text-[#1A1A1A] group-hover:text-[#991B1B] transition-colors">
                        {item.title}
                      </span>
                      {item.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[#66625B] border border-[#E5E2D9] shrink-0 font-medium">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#66625B] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F0EDE6] flex items-center justify-between text-xs font-serif font-semibold text-[#1A1A1A] group-hover:text-[#991B1B]">
                    <span>Open Topic</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#991B1B]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
