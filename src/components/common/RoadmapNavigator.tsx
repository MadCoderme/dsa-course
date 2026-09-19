import React, { useState } from 'react';
import { TopicId } from '../../types';
import { LESSON_MAP } from '../../data/lessonsData';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  GitBranch,
  Network,
  Award,
  CheckCircle2,
  BookOpen,
  Calculator,
  Table,
  ShieldCheck,
  TrendingUp,
  Zap
} from 'lucide-react';

interface RoadmapNavigatorProps {
  onSelectTopic: (topicId: TopicId | 'report' | 'calculator' | 'matrix') => void;
}

interface RoadmapStage {
  stageNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  items: {
    id: TopicId | 'report' | 'calculator' | 'matrix';
    name: string;
    type: 'lesson' | 'tool';
    tag: string;
    highlight: string;
    summary: string;
  }[];
}

export const RoadmapNavigator: React.FC<RoadmapNavigatorProps> = ({ onSelectTopic }) => {
  const [activeFilter, setActiveFilter] = useState<number | 'all'>('all');

  const STAGES: RoadmapStage[] = [
    {
      stageNumber: 1,
      title: 'Stage 1: Linear Buffers & Address Mathematics',
      subtitle: 'Contiguous Storage, Dynamic Geometric Expansion & Memory Offsets',
      badge: 'Foundations',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Understand how sequential memory works at the hardware level, how geometric reallocation guarantees amortized O(1) time, and how 1D/2D/3D addresses are mapped.',
      items: [
        {
          id: 'vector',
          name: 'Vector & Dynamic Arrays',
          type: 'lesson',
          tag: 'O(1) Amortized',
          highlight: 'Geometric Capacity Doubling & Reallocation Lab',
          summary: 'Explore size vs capacity, copy overhead, pointer invalidation, and contiguous element shifts.'
        },
        {
          id: 'string',
          name: 'String Processing & Algorithms',
          type: 'lesson',
          tag: 'Chapter 3',
          highlight: '3 Storage Models, Primitives & Algorithms 3.1-3.3',
          summary: 'Character data, 3 memory models (Fixed, Variable, Linked), SUBSTRING/INDEX/CONCAT primitives, and step-by-step algorithms.'
        },
        {
          id: 'calculator',
          name: 'Address Formula Solver',
          type: 'tool',
          tag: 'Exam Solver',
          highlight: '1D, 2D (Row/Col Major) & 3D Calculations',
          summary: 'Interactive step-by-step memory offset solver matching 6–10 mark numerical exam questions.'
        },
        {
          id: 'matrix',
          name: 'STL Complexity Matrix',
          type: 'tool',
          tag: 'Reference',
          highlight: 'Instant Asymptotic Comparison Table',
          summary: 'Compare access, search, insertion, and deletion bounds across all C++ containers.'
        }
      ]
    },
    {
      stageNumber: 2,
      title: 'Stage 2: Restricted-Access Abstract Data Types',
      subtitle: 'LIFO Stacks, FIFO Circular Queues & Priority Heap Schedulers',
      badge: 'Core ADTs',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Master restricted access paradigms where insertion and deletion policies enforce deterministic behavior (LIFO, FIFO, Priority-Weighted).',
      items: [
        {
          id: 'list',
          name: 'Linked Lists & Applications',
          type: 'lesson',
          tag: 'O(1) Splice',
          highlight: 'Singly, Doubly, Reversal & Polynomial Addition',
          summary: 'Pointer manipulation, memory availability lists (AVAIL), and circular polynomial addition.'
        },
        {
          id: 'stack',
          name: 'Stack ADT & Infix/Postfix',
          type: 'lesson',
          tag: 'LIFO Order',
          highlight: 'Shunting-Yard & Tower of Hanoi Recursion',
          summary: 'Operator precedence stack parsing and frame tracing for recursive algorithms.'
        },
        {
          id: 'queue',
          name: 'Queue ADT & Ring Buffers',
          type: 'lesson',
          tag: 'FIFO Order',
          highlight: 'Modulo Arithmetic & Circular Queue Lab',
          summary: 'Prevent false overflow using (rear + 1) % MAX formula and step through dequeue shifts.'
        },
        {
          id: 'priority-queue',
          name: 'Priority Queue & Binary Heaps',
          type: 'lesson',
          tag: 'O(log N)',
          highlight: 'Abstract ADT & CPU Task Scheduler + Heapsort',
          summary: 'Abstract priority queue semantics, OS task triage, Dijkstra relaxations, and linear Build-Heap.'
        }
      ]
    },
    {
      stageNumber: 3,
      title: 'Stage 3: Associative & Hash Key-Value Containers',
      subtitle: 'Ordered BST-Backed Sets & Hash Bucket Probing Strategies',
      badge: 'Associative',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Compare logarithmic ordered trees (std::set, std::map) against constant-time expected hash tables (std::unordered_map).',
      items: [
        {
          id: 'set',
          name: 'Set Container (BST vs Hash)',
          type: 'lesson',
          tag: 'Unique Keys',
          highlight: 'O(log N) Red-Black Tree vs O(1) Hash Set',
          summary: 'Ordered uniqueness guarantees, range iterators, and hash bucket distributions.'
        },
        {
          id: 'map',
          name: 'Map Container (Chaining & Probing)',
          type: 'lesson',
          tag: 'Key-Value',
          highlight: 'Separate Chaining & Open Addressing Lab',
          summary: 'Interactive hash collisions, load factor lambda, and linear/quadratic probing resolution.'
        }
      ]
    },
    {
      stageNumber: 4,
      title: 'Stage 4: Binary Tree Fundamentals & Traversals',
      subtitle: 'Mathematical Induction, Traversal Orders & Stackless Threaded Trees',
      badge: 'Tree Basics',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'Establish rigorous tree foundations: strict binary tree proofs, depth-first visits, and converting general forests into binary trees via Knuth LCRS.',
      items: [
        {
          id: 'tree',
          name: 'Binary Tree Fundamentals',
          type: 'lesson',
          tag: 'Proofs & Arrays',
          highlight: 'Induction L = I + 1 & Sequential Array Indexing',
          summary: 'Array mapping formulas (2i+1, 2i+2, floor((i-1)/2)) and strictly binary tree theorems.'
        },
        {
          id: 'tree-traversals',
          name: 'Tree Traversals & Reconstruction',
          type: 'lesson',
          tag: 'In/Pre/Post',
          highlight: 'Step-by-Step Traversal & Tree Rebuilding',
          summary: 'Depth-first traversals and unique binary tree reconstruction from Inorder + Preorder.'
        },
        {
          id: 'expression-threaded-trees',
          name: 'Expression & Threaded Binary Trees',
          type: 'lesson',
          tag: 'O(1) Space',
          highlight: 'Postorder Evaluation & Stackless Threads',
          summary: 'Repurpose N+1 NULL pointers into inorder threads for O(1) auxiliary space iteration.'
        }
      ]
    },
    {
      stageNumber: 5,
      title: 'Stage 5: Self-Balancing & Multi-Way Disk Indexing',
      subtitle: 'AVL Rotations, Red-Black Trees, B-Trees & Huffman Optimal Codes',
      badge: 'Balanced Trees',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      description: 'Guarantee O(log N) worst-case performance under dynamic insertions and deletions across memory and block-based disk storage.',
      items: [
        {
          id: 'bst-rbt',
          name: 'BST Search & 3 Deletion Cases',
          type: 'lesson',
          tag: 'BST Deletion',
          highlight: 'Inorder Successor Deletion Laboratory',
          summary: 'Master the 3 deletion cases: leaf, single-child bypass, and 2-child successor substitution.'
        },
        {
          id: 'avl-tree',
          name: 'AVL Tree & 4 Rotations',
          type: 'lesson',
          tag: 'Strict Balance',
          highlight: 'LL, RR, LR, RL Rotations with Balance Factors',
          summary: 'Step-by-step tree rebalancing ensuring |BF| <= 1 with full C pointer updates.'
        },
        {
          id: 'red-black-tree',
          name: 'Red-Black Trees (Insert & Delete)',
          type: 'lesson',
          tag: 'Relaxed Balance',
          highlight: '5 Invariants, Uncle Rebalance & Double-Black Cases',
          summary: 'Complete step-by-step insertion and deletion rebalancing rules used by C++ std::set.'
        },
        {
          id: 'b-tree',
          name: 'B-Tree Multi-Way Indexing',
          type: 'lesson',
          tag: 'Disk I/O',
          highlight: 'Order-M Node Splitting & Median Promotion',
          summary: 'Block-oriented multi-key search trees reducing disk seeks in database storage engines.'
        },
        {
          id: 'b-plus-tree',
          name: 'B+ Tree Range Queries',
          type: 'lesson',
          tag: 'DB Indices',
          highlight: 'Doubly-Linked Leaves & Index Block Copies',
          summary: 'All user data preserved in linked leaf nodes for rapid sequential range scanning.'
        },
        {
          id: 'huffman-coding',
          name: 'Huffman Optimal 2-Trees',
          type: 'lesson',
          tag: 'Greedy Encoding',
          highlight: 'Min-Heap Frequency Merge & WPL Derivation',
          summary: 'Construct prefix-free variable-length binary encoding trees with minimal weighted external path length.'
        }
      ]
    },
    {
      stageNumber: 6,
      title: 'Stage 6: Graph Models, Traversals & Shortest Paths',
      subtitle: 'Adjacency Matrices, DAG Topo Sort, Dijkstra, Floyd-Warshall & MSTs',
      badge: 'Graph Theory',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Explore networks, compute shortest paths, classify discovery edges, and solve topological ordering constraints.',
      items: [
        {
          id: 'graph-representations',
          name: 'Graph Representations & Matrix Powers',
          type: 'lesson',
          tag: 'Matrix vs List',
          highlight: 'Adjacency Matrix Powers A^k Path Lengths',
          summary: 'Compare space complexity O(V^2) vs O(V+E) and calculate walk counts via matrix exponentiation.'
        },
        {
          id: 'graph',
          name: 'Graph Traversals (BFS & DFS)',
          type: 'lesson',
          tag: 'O(V + E)',
          highlight: 'Queue/Stack Buffers & Edge Classifications',
          summary: 'Tree, Back, Forward, and Cross edges classification with reachability and shortest hop paths.'
        },
        {
          id: 'topological-sort',
          name: 'Topological Sort (DAGs & POSETs)',
          type: 'lesson',
          tag: 'Kahn Algorithm',
          highlight: 'In-Degree Reduction Queue & Cycle Detection',
          summary: 'Linear ordering of vertices in Directed Acyclic Graphs matching task dependency resolution.'
        },
        {
          id: 'shortest-path-dijkstra',
          name: 'Dijkstra Shortest Path Algorithm',
          type: 'lesson',
          tag: 'Greedy Relaxation',
          highlight: 'Tentative Distance Priority Queue Laboratory',
          summary: 'Single-source shortest path finding with nonnegative edge weights and settled vertex sets.'
        },
        {
          id: 'floyd-warshall',
          name: 'Floyd-Warshall All-Pairs DP',
          type: 'lesson',
          tag: 'O(V^3) DP',
          highlight: 'Matrix Stage Transitions Q^(0) to Q^(k)',
          summary: 'Dynamic programming shortest path formulation using intermediate vertex pivot stages.'
        },
        {
          id: 'mst',
          name: 'Minimum Spanning Trees (MST)',
          type: 'lesson',
          tag: 'Kruskal & Prim',
          highlight: 'Edge Greedy DSU vs Vertex Cut Priority Queue',
          summary: 'Connect all vertices with minimum total edge weight using Union-Find cycle prevention.'
        }
      ]
    },
    {
      stageNumber: 7,
      title: 'Stage 7: Core Algorithms & Computational Methods',
      subtitle: 'Array Operations, Searching & Sorting Simulations, and String Processing',
      badge: 'Algorithms',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Master core algorithmic paradigms: array operations with formal pseudo-code, logarithmic search, comparative sorting simulations, and smart string pattern matching.',
      items: [
        {
          id: 'array-operations',
          name: 'Array Operations & Memory Addressing (1D, 2D & N-D)',
          type: 'lesson',
          tag: 'Array Operations',
          highlight: 'Procedural INSERT/DELETE & Row/Column Major Formulas',
          summary: 'Master formal shifting pseudo-code, 2D Row-Major vs Column-Major order, and general N-D address formulas.'
        },
        {
          id: 'searching-algorithms',
          name: 'Search Algorithms: Linear & Binary Search',
          type: 'lesson',
          tag: 'O(log N) Search',
          highlight: 'Interval Halving & Pointer Simulation',
          summary: 'Compare sequential scan with divide-and-conquer binary search, pointer safety, and lower/upper bounds.'
        },
        {
          id: 'sorting-algorithms',
          name: 'Sorting Algorithms & Execution Simulator',
          type: 'lesson',
          tag: 'Sorting Labs',
          highlight: 'Bubble, Selection, Insertion, Merge & Quick Sort',
          summary: 'Compare stability, runtime bounds, and interactive step-by-step executions across 5 classic sorting algorithms.'
        },
        {
          id: 'string-operations',
          name: 'String Operations & Find-and-Replace',
          type: 'lesson',
          tag: 'Text Processing',
          highlight: 'Slicing, Concatenation & Buffer Expansion',
          summary: 'Learn primitive text operations, naive sliding-window search, and building REPLACE(T, P, R).'
        },
        {
          id: 'kmp-pattern-matching',
          name: 'KMP Pattern Matching Demystified',
          type: 'lesson',
          tag: 'O(N + M) KMP',
          highlight: 'Prefix Failure Table (π-table) & Smart Search',
          summary: 'Eliminate text pointer backtracking using the precomputed LPS array without getting lost in math jargon.'
        }
      ]
    },
    {
      stageNumber: 8,
      title: 'Stage 8: Examination Simulation & 7-Year Trends',
      subtitle: '210-Mark Breakdown, Marking Rubrics & High-Yield Blueprint',
      badge: 'Exam Mastery',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      description: 'Consolidate your knowledge with historical examination statistics and verified model solutions across 7 cycles.',
      items: [
        {
          id: 'report',
          name: '7-Year Past Exam Dashboard',
          type: 'tool',
          tag: '210 Marks',
          highlight: 'Section-A & Section-B Weightage Analytics',
          summary: 'Explore question counts, topic trends, and high-yield checklists from 2018 to 2025.'
        }
      ]
    }
  ];

  const filteredStages = activeFilter === 'all' 
    ? STAGES 
    : STAGES.filter((s) => s.stageNumber === activeFilter);

  return (
    <div className="space-y-6" id="roadmap-navigator-root">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#991B1B] text-white flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                Interactive Curriculum Roadmap & Master Study Plan
              </h3>
              <p className="text-xs text-[#66625B] font-sans">
                Click any topic below to immediately jump directly to its interactive visualizer, mathematical proofs, and past exam questions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#E5E2D9]">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#66625B] hover:text-[#1A1A1A]'
              }`}
            >
              All Stages (1–8)
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <button
                key={num}
                onClick={() => setActiveFilter(num)}
                className={`w-7 h-7 flex items-center justify-center text-xs font-mono font-bold rounded-md transition-colors cursor-pointer ${
                  activeFilter === num
                    ? 'bg-[#991B1B] text-white shadow-2xs'
                    : 'text-[#66625B] hover:text-[#1A1A1A] hover:bg-[#F4F2EB]'
                }`}
              >
                S{num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stage Cards */}
      <div className="space-y-6">
        {filteredStages.map((stage) => (
          <div
            key={stage.stageNumber}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs hover:border-[#D8D4C8] transition-all"
          >
            {/* Stage Title Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${stage.badgeColor}`}>
                    {stage.badge}
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#1A1A1A]">
                    {stage.title}
                  </h4>
                </div>
                <p className="text-xs text-[#66625B] font-sans">
                  {stage.subtitle}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#88847C]">
                {stage.items.length} Modules
              </span>
            </div>

            <p className="text-xs text-[#44403C] leading-relaxed">
              {stage.description}
            </p>

            {/* Stage Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {stage.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectTopic(item.id)}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] hover:border-[#991B1B] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between space-y-2 shadow-2xs hover:shadow-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-serif font-bold text-xs text-[#1A1A1A] group-hover:text-[#991B1B] transition-colors line-clamp-1">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-[#66625B] border border-[#E5E2D9] shrink-0 font-bold">
                        {item.tag}
                      </span>
                    </div>

                    <div className="text-[11px] font-sans font-medium text-[#991B1B] line-clamp-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>

                    <p className="text-[11px] text-[#66625B] line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E5E2D9]/60 flex items-center justify-between text-[11px] font-serif font-bold text-[#1A1A1A] group-hover:text-[#991B1B]">
                    <span>{item.type === 'tool' ? 'Launch Tool' : 'Study Lesson'}</span>
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
