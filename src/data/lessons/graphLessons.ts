import { Lesson } from '../../types';

export const GRAPH_LESSONS: Lesson[] = [
  {
    id: 'graph-representations',
    categoryId: 'graphs',
    subCategoryId: 'graph-basics',
    title: 'Graph Models & Adjacency Representations',
    subtitle: 'Topological Structures, Memory Trade-offs: Matrix vs List & Path Matrices',
    icon: 'Network',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 2 & Module 6 foundation (15–20 marks). Key tested topics: (1) Constructing Adjacency Matrix vs Adjacency List for directed and undirected graphs, (2) Space complexity trade-offs for Dense vs Sparse graphs, (3) Computing Path Matrix $P = A + A^2 + A^3 + \\dots + A^N$ and Powers of Adjacency Matrix $A^k$.',
    overview: 'A Graph $G = (V, E)$ is a general mathematical network consisting of a set of Vertices (nodes) $V$ and a set of Edges (connections) $E$. Unlike trees which are hierarchical and forbid cycles, graphs can contain loops, multiple paths, directed one-way streets, and edge weights. The choice of how to store a graph in computer memory (Adjacency Matrix vs Adjacency List) directly dictates the performance of every graph algorithm.',
    timeComplexity: {
      access: '$\\mathcal{O}(1)$ edge check in Matrix / $\\mathcal{O}(\\text{deg}(u))$ in List',
      search: '$\\mathcal{O}(V + E)$ in List / $\\mathcal{O}(V^2)$ in Matrix',
      insertion: '$\\mathcal{O}(1)$ add edge',
      deletion: '$\\mathcal{O}(1)$ in Matrix / $\\mathcal{O}(\\text{deg}(u))$ in List',
      space: '$\\mathcal{O}(V^2)$ Matrix (Dense) / $\\mathcal{O}(V + E)$ List (Sparse)'
    },
    keyConcepts: [
      {
        title: 'Step 1: Graph Topologies & Terminology',
        description: 'Exam questions require formal mathematical definitions of graph types:',
        bulletPoints: [
          'Directed Graph (Digraph): Edges have direction (ordered pairs $(u, v)$ where traffic flows only from $u$ to $v$).',
          'Undirected Graph: Edges are bidirectional unordered pairs $\{u, v\}$.',
          'Degree of Vertex: In undirected graphs, total connected edges. In directed graphs, split into In-Degree (incoming edges) and Out-Degree (outgoing edges).',
          'Dense Graph: Edge count $|E| \\approx |V|^2$. Use Adjacency Matrix!',
          'Sparse Graph: Edge count $|E| \\ll |V|^2$ (e.g. $|E| \\approx |V|$). Use Adjacency List to avoid wasting 99% of memory!'
        ]
      },
      {
        title: 'Step 2: Adjacency Matrix vs Adjacency List Storage',
        description: 'Comparison of the two standard memory representations:',
        mathFormula: `1. Adjacency Matrix $A[V \\times V]$:
$$ A[i, j] = \\begin{cases} 1 & \\text{if edge } (i, j) \\in E \\\\ 0 & \\text{otherwise} \\end{cases} $$
Space: $\\mathcal{O}(V^2)$ | Edge Existence Check $(u, v)$: $\\mathcal{O}(1)$ | Finding all neighbors: $\\mathcal{O}(V)$

2. Adjacency List:
Array of $|V|$ linked lists/vectors where \\texttt{adj}[u] stores all neighbors of vertex $u$.
Space: $\\mathcal{O}(V + E)$ | Edge Existence Check: $\\mathcal{O}(\\text{deg}(u))$ | Finding neighbors: $\\mathcal{O}(\\text{deg}(u))$`,
        bulletPoints: [
          'For an undirected graph, the Adjacency Matrix is always Symmetric ($A = A^T$).'
        ]
      },
      {
        title: 'Step 3: Powers of Adjacency Matrix & Path Lengths',
        description: 'An elegant theorem in graph theory connects matrix multiplication with path counts:',
        mathFormula: `Theorem: In an Adjacency Matrix $A$, the entry $(A^k)[i, j]$ gives the EXACT number of distinct paths of length $k$ from vertex $i$ to vertex $j$.

Path Matrix (Reachability Matrix) $P$:
$$ P = A + A^2 + A^3 + \\dots + A^V $$
$P[i, j] = 1$ if there exists at least one path of any length from $i$ to $j$, and $0$ otherwise.`
      }
    ],
    cstlReference: {
      header: '#include <vector>',
      declaration: 'std::vector<std::vector<int>> adjList(V); // Adjacency list\nstd::vector<std::vector<int>> adjMatrix(V, std::vector<int>(V, 0)); // Matrix',
      commonMethods: [
        { method: 'addEdge(u, v)', description: 'adjList[u].push_back(v); adjList[v].push_back(u);', complexity: 'O(1)' },
        { method: 'hasEdge(u, v)', description: 'Direct lookup in matrix or scan in list', complexity: 'O(1) matrix / O(deg) list' }
      ],
      notes: [
        'Adjacency list is preferred for almost all competitive programming and university algorithms due to O(V + E) space.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Graph Representations (Adjacency Matrix & List)',
        code: `#include <iostream>
#include <vector>

class Graph {
private:
    int V;
    std::vector<std::vector<int>> adjMatrix;
    std::vector<std::vector<int>> adjList;

public:
    Graph(int vertices) : V(vertices) {
        adjMatrix.resize(V, std::vector<int>(V, 0));
        adjList.resize(V);
    }

    void addEdge(int u, int v, bool directed = false) {
        // 1. Matrix storage
        adjMatrix[u][v] = 1;
        if (!directed) adjMatrix[v][u] = 1;

        // 2. List storage
        adjList[u].push_back(v);
        if (!directed) adjList[v].push_back(u);
    }

    void printList() {
        std::cout << "--- Adjacency List ---\\n";
        for (int i = 0; i < V; ++i) {
            std::cout << "Vertex " << i << ": ";
            for (int neighbor : adjList[i]) {
                std::cout << "-> " << neighbor << " ";
            }
            std::cout << "\\n";
        }
    }
};

int main() {
    Graph g(4);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 3);

    g.printList();
    return 0;
}`,
        explanation: 'Demonstrates building both Adjacency Matrix and Adjacency List for a 4-vertex graph.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-grp-rep-1',
        year: 'CUET 2024 & 2021',
        marks: 10,
        difficulty: 'Exam Classic',
        question: 'Given the directed graph with vertices V={1,2,3,4} and edges E={(1,2), (1,3), (2,3), (3,1), (3,4), (4,2)}. (a) Write its Adjacency Matrix A. (b) Compute A² and explain what entry (A²)[1,4] represents.',
        solution: `Part (a): Adjacency Matrix A (Rows = Source, Cols = Destination):
Let vertices be ordered 1, 2, 3, 4:

    1  2  3  4
1 [ 0  1  1  0 ]
2 [ 0  0  1  0 ]
3 [ 1  0  0  1 ]
4 [ 0  1  0  0 ]

Part (b): Matrix Multiplication A² = A * A:

Row 1 of A: [0, 1, 1, 0]
- (A²)[1,1] = (0*0 + 1*0 + 1*1 + 0*0) = 1 (Path: 1 -> 3 -> 1)
- (A²)[1,2] = (0*1 + 1*0 + 1*0 + 0*1) = 0
- (A²)[1,3] = (0*1 + 1*1 + 1*0 + 0*0) = 1 (Path: 1 -> 2 -> 3)
- (A²)[1,4] = (0*0 + 1*0 + 1*1 + 0*0) = 1 (Path: 1 -> 3 -> 4)

Full Matrix A²:
    1  2  3  4
1 [ 1  0  1  1 ]
2 [ 1  0  0  1 ]
3 [ 0  2  1  0 ]
4 [ 0  0  1  0 ]

Interpretation of (A²)[1,4] = 1:
The entry (A²)[1,4] = 1 means there is EXACTLY 1 path of length 2 from vertex 1 to vertex 4. That path is: 1 -> 3 -> 4.`,
        keyTakeaway: 'Always state that entry (A^k)[i,j] represents the number of paths of length exactly k from vertex i to vertex j.'
      }
    ],
    quizzes: [
      {
        id: 'grp-rep-q1',
        question: 'What is the space complexity of an Adjacency List for a graph with V vertices and E edges?',
        options: ['O(V²)', 'O(V + E)', 'O(E²)', 'O(V * E)'],
        correctIndex: 1,
        explanation: 'An Adjacency List stores an array of size V with a total of 2E node links for undirected graphs or E node links for directed graphs, giving O(V + E) memory.',
        examTip: 'Adjacency list is O(V + E) space. Adjacency matrix is O(V²) space.'
      },
      {
        id: 'grp-rep-q2',
        question: 'What does entry $(A^k)[i, j]$ in the $k$-th power of an Adjacency Matrix $A$ represent?',
        options: [
          'The exact number of distinct paths of length $k$ from vertex $i$ to vertex $j$',
          'The shortest distance from $i$ to $j$',
          'The weight of edge $(i, j)$',
          'The degree of vertex $i$'
        ],
        correctIndex: 0,
        explanation: 'Multiplying an adjacency matrix by itself $k$ times yields matrix $A^k$, where entry $[i, j]$ counts all walks of length $k$ connecting $i$ to $j$.',
        examTip: '$(A^k)[i, j] = \text{number of paths of length } k \text{ from } i \text{ to } j$.'
      },
      {
        id: 'grp-rep-q3',
        question: 'For an undirected graph with no self-loops, what is the sum of all elements in its Adjacency Matrix $A$?',
        options: ['E', '2E', 'V', 'V²'],
        correctIndex: 1,
        explanation: 'Each undirected edge $\{u, v\}$ creates two symmetric matrix entries: $A[u, v] = 1$ and $A[v, u] = 1$. The sum of all elements is $2E$.',
        examTip: 'Sum of adjacency matrix entries = 2 * E for undirected graphs.'
      },
      {
        id: 'grp-rep-q4',
        question: 'What property does the Adjacency Matrix of any Undirected Graph always satisfy?',
        options: ['Symmetric Matrix (A = Aᵀ)', 'Skew-Symmetric Matrix (A = -Aᵀ)', 'Identity Matrix', 'Diagonal Matrix'],
        correctIndex: 0,
        explanation: 'Since edge $\{u, v\}$ is bidirectional, $A[u, v] = A[v, u]$ for all $u, v$, making the matrix symmetric.',
        examTip: 'Undirected Graph Matrix is ALWAYS Symmetric ($A = A^T$).'
      },
      {
        id: 'grp-rep-q5',
        question: 'How long does it take to check if an edge $(u, v)$ exists using an Adjacency Matrix vs an Adjacency List?',
        options: [
          'Matrix: O(1) | List: O(deg(u))',
          'Matrix: O(V) | List: O(1)',
          'Matrix: O(V²) | List: O(E)',
          'Matrix: O(1) | List: O(V²)'
        ],
        correctIndex: 0,
        explanation: 'Adjacency matrix allows instant O(1) direct grid access `A[u][v] == 1`, whereas adjacency list requires iterating through neighbor list `adj[u]`.',
        examTip: 'Matrix offers O(1) edge lookup; List saves memory O(V+E).'
      }
    ]
  },
  {
    id: 'graph',
    categoryId: 'graphs',
    subCategoryId: 'graph-traversals',
    title: 'Graph Traversals: BFS & DFS Exploration',
    subtitle: 'Systematic Network Search: Queue-Based BFS, Recursive DFS & Edge Classification',
    icon: 'Shuffle',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Appears in every single CUET examination paper (20–30 marks). Mandatory questions: (1) Tracing BFS queue states and BFS spanning tree, (2) Tracing DFS call stack and discovery/finish times $d[u]/f[u]$, (3) Edge classification (Tree, Back, Forward, Cross edges) and cycle detection.',
    overview: 'Graph traversal is the foundational process of visiting every vertex in a network reachable from a given source node. Because graphs can have cycles and multiple paths to the same node, traversals use a `visited` boolean array. Breadth-First Search (BFS) explores concentric outward waves using a FIFO Queue (finding the shortest path in unweighted networks), while Depth-First Search (DFS) dives deeply down a single path using a LIFO Stack or recursion before backtracking.',
    timeComplexity: {
      access: '$\\mathcal{O}(V + E)$ using Adjacency List / $\\mathcal{O}(V^2)$ using Matrix',
      search: '$\\mathcal{O}(V + E)$',
      insertion: '$\\mathcal{O}(V + E)$',
      deletion: '$\\mathcal{O}(V + E)$',
      space: '$\\mathcal{O}(V)$ for `visited` array and queue/call-stack'
    },
    keyConcepts: [
      {
        title: 'Step 1: Breadth-First Search (BFS Algorithm)',
        description: 'BFS explores nodes in layers of increasing distance from the starting source $S$:',
        mathFormula: `BFS Algorithm Steps:
1. Initialize \\texttt{visited}[u] = false for all $u \\in V$.
2. Mark source \\texttt{visited}[S] = true and push $S$ into a FIFO Queue $Q$.
3. While $Q$ is not empty:
   a. Dequeue front vertex $u$.
   b. For every neighbor $v$ of $u$:
      If \\texttt{visited}[v] == false:
         Mark \\texttt{visited}[v] = true, set parent[v] = u, and push $v$ into $Q$.`,
        bulletPoints: [
          'Shortest Path Property: BFS is guaranteed to find the shortest hop-count path from $S$ to every reachable vertex.'
        ]
      },
      {
        title: 'Step 2: Depth-First Search (DFS Algorithm & Times)',
        description: 'DFS travels down a path as far as possible until it hits a dead end, then backtracks:',
        mathFormula: `DFS Discovery Time $d[u]$ and Finishing Time $f[u]$:
- $d[u]$: Timestamp when node $u$ is first discovered (colored Gray).
- $f[u]$: Timestamp when node $u$\'s entire adjacency list has been finished (colored Black).
- Total timestamps: $1 \\le d[u] < f[u] \\le 2|V|$.

Parenthesis Theorem:
Subtree intervals $[d[u], f[u]]$ are either completely nested (if $v$ is a descendant of $u$) or completely disjoint!`
      },
      {
        title: 'Step 3: The 4 DFS Edge Classifications',
        description: 'During DFS traversal of a directed graph, edges $(u, v)$ are classified into 4 types:',
        bulletPoints: [
          'Tree Edge: Edge $(u, v)$ where $v$ was first discovered during the scan of $u$. Forms the DFS Spanning Forest.',
          'Back Edge: Edge $(u, v)$ connecting $u$ to an Ancestor $v$ in the DFS tree. *A graph contains a cycle if and only if DFS discovers at least one Back Edge!*',
          'Forward Edge: Non-tree edge $(u, v)$ connecting $u$ to a Descendant $v$.',
          'Cross Edge: Edge $(u, v)$ connecting nodes where neither is an ancestor of the other.'
        ]
      }
    ],
    cstlReference: {
      header: '#include <vector> / #include <queue>',
      declaration: 'void bfs(int start, const std::vector<std::vector<int>>& adj);\nvoid dfs(int u, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited);',
      commonMethods: [
        { method: 'bfs(start, adj)', description: 'Explores level-by-level using std::queue in O(V + E)', complexity: 'O(V + E)' },
        { method: 'dfs(u, adj, visited)', description: 'Explores deeply via recursive call stack in O(V + E)', complexity: 'O(V + E)' }
      ],
      notes: [
        'Always initialize visited array of size V with all false before launching traversals.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Complete BFS and DFS Implementations',
        code: `#include <iostream>
#include <vector>
#include <queue>

void bfs(int startNode, const std::vector<std::vector<int>>& adj, int V) {
    std::vector<bool> visited(V, false);
    std::queue<int> q;

    visited[startNode] = true;
    q.push(startNode);

    std::cout << "BFS Traversal: ";
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        std::cout << u << " ";

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    std::cout << "\\n";
}

void dfsRecursive(int u, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited) {
    visited[u] = true;
    std::cout << u << " ";

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfsRecursive(v, adj, visited);
        }
    }
}

int main() {
    int V = 5;
    std::vector<std::vector<int>> adj(V);
    adj[0] = {1, 2};
    adj[1] = {0, 3, 4};
    adj[2] = {0};
    adj[3] = {1};
    adj[4] = {1};

    bfs(0, adj, V);

    std::vector<bool> visited(V, false);
    std::cout << "DFS Traversal: ";
    dfsRecursive(0, adj, visited);
    std::cout << "\\n";

    return 0;
}`,
        explanation: 'Complete runnable C++ implementations of BFS (queue-based) and DFS (recursive).'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-bfs-dfs-1',
        year: 'CUET 2025 & 2023',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Given an undirected graph with vertices V={A, B, C, D, E, F} and edges: (A,B), (A,C), (B,D), (B,E), (C,F), (E,F). (a) Trace the BFS queue states starting from A (assume alphabetical order for neighbor selection). (b) Trace the DFS traversal and identify all Tree Edges and Back Edges.',
        solution: `Part (a): BFS Trace starting from A (Alphabetical tie-breaking):

- Step 0: Visited = {A}. Push A to Queue. Queue: [A]
- Step 1: Dequeue A. Neighbors of A: B, C.
  - Visit B, C. Queue: [B, C]. Output: A
- Step 2: Dequeue B. Neighbors of B: A (visited), D, E.
  - Visit D, E. Queue: [C, D, E]. Output: A, B
- Step 3: Dequeue C. Neighbors of C: A (visited), F.
  - Visit F. Queue: [D, E, F]. Output: A, B, C
- Step 4: Dequeue D. Neighbors of D: B (visited).
  - No unvisited neighbors. Queue: [E, F]. Output: A, B, C, D
- Step 5: Dequeue E. Neighbors of E: B (visited), F (already in queue).
  - Queue: [F]. Output: A, B, C, D, E
- Step 6: Dequeue F. Neighbors of F: C, E (all visited).
  - Queue: []. Output: A, B, C, D, E, F

Final BFS Traversal Order: A, B, C, D, E, F

Part (b): DFS Trace starting from A:
- Visit A -> Choose neighbor B
- Visit B -> Choose neighbor D (leaf, dead end -> backtrack to B)
- At B -> Choose neighbor E
- Visit E -> Choose neighbor F
- Visit F -> Choose neighbor C
- At C -> All neighbors visited -> Backtrack all the way to A.

DFS Traversal Order: A, B, D, E, F, C

Edge Classification:
- Tree Edges (edges traversed to discover new nodes): (A,B), (B,D), (B,E), (E,F), (F,C)
- Back / Cross Edges (creates a cycle): (A,C) is a Back/Cross edge connecting visited ancestor A and descendant C.`,
        keyTakeaway: 'Always state the alphabetical tie-breaker rule clearly and list the queue contents at every single step.'
      }
    ],
    quizzes: [
      {
        id: 'bfs-dfs-q1',
        question: 'Which type of edge in a Depth-First Search (DFS) tree indicates the presence of a cycle in a directed graph?',
        options: ['Tree Edge', 'Back Edge', 'Forward Edge', 'Cross Edge'],
        correctIndex: 1,
        explanation: 'A Back Edge connects a node to its ancestor in the DFS recursion tree, completing a directed loop/cycle.',
        examTip: 'Cycle in directed graph <=> DFS discovers a Back Edge.'
      },
      {
        id: 'bfs-dfs-q2',
        question: 'Which traversal algorithm is guaranteed to find the SHORTEST path (fewest edges) between two nodes in an unweighted graph?',
        options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Preorder Traversal', 'Postorder Traversal'],
        correctIndex: 0,
        explanation: 'BFS expands outward in concentric levels (distance 0, distance 1, distance 2...), guaranteeing the first time a target is reached, the hop distance is minimal.',
        examTip: 'BFS = Shortest path in UNWEIGHTED networks.'
      },
      {
        id: 'bfs-dfs-q3',
        question: 'What is the LIFO data structure implicitly used by recursive Depth-First Search (DFS)?',
        options: ['Call Stack', 'Queue', 'Priority Queue', 'Array List'],
        correctIndex: 0,
        explanation: 'Recursive DFS uses the system call stack (or an explicit std::stack in iterative implementations) to push nodes and backtrack upon reaching dead ends.',
        examTip: 'DFS = Stack; BFS = Queue.'
      },
      {
        id: 'bfs-dfs-q4',
        question: 'In DFS timestamping, if vertex $v$ is a descendant of vertex $u$ in the DFS tree, how do their discovery ($d$) and finish ($f$) intervals compare?',
        options: [
          'Interval $[d[v], f[v]]$ is strictly nested inside $[d[u], f[u]]$ ($d[u] < d[v] < f[v] < f[u]$)',
          'Intervals are completely disjoint',
          '$d[v] < d[u]$ and $f[v] > f[u]$',
          'Their finish times are equal'
        ],
        correctIndex: 0,
        explanation: 'By the Parenthesis Theorem, descendant interval $[d[v], f[v]]$ is fully contained within ancestor interval $[d[u], f[u]]$.',
        examTip: 'Descendant interval is nested inside ancestor interval.'
      },
      {
        id: 'bfs-dfs-q5',
        question: 'What is the total time complexity of BFS or DFS on a graph with V vertices and E edges represented as an Adjacency List?',
        options: ['O(V + E)', 'O(V²)', 'O(V * E)', 'O(E²)'],
        correctIndex: 0,
        explanation: 'Every vertex is enqueued/visited once, and every edge is scanned once (or twice for undirected graphs), yielding O(V + E) linear time.',
        examTip: 'Graph traversal complexity on Adjacency List = O(V + E).'
      }
    ]
  },
  {
    id: 'topological-sort',
    categoryId: 'graphs',
    subCategoryId: 'graph-traversals',
    title: 'Topological Sorting & DAG Scheduling',
    subtitle: 'Partial Orderings, Kahn’s In-Degree Queue Algorithm & Dependency Resolution',
    icon: 'CheckSquare',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 2 & 6 high-yield topic (12–15 marks). Guaranteed questions on: (1) Kahn\'s In-Degree calculation and queue simulation, (2) Proving why a graph with cycles has no valid topological sort, (3) DFS postorder reversal algorithm.',
    overview: 'Imagine university course prerequisites: you cannot take Advanced Algorithms (CSE-301) until you have passed Intro to Programming (CSE-101) and Discrete Math (CSE-201). A Topological Sort produces a linear ordering of all vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $(u, v)$, vertex $u$ comes before vertex $v$ in the ordering. It is the core engine powering package managers (npm, pip), compiler build systems (Make, CMake), and project task schedulers.',
    timeComplexity: {
      access: '$\\mathcal{O}(V + E)$ linear time',
      search: '$\\mathcal{O}(V + E)$',
      insertion: '$\\mathcal{O}(V + E)$',
      deletion: '$\\mathcal{O}(V + E)$',
      space: '$\\mathcal{O}(V)$ for in-degree array and queue'
    },
    keyConcepts: [
      {
        title: 'Step 1: The DAG & Topological Sort Invariant',
        description: 'Topological sorting is strictly defined ONLY on Directed Acyclic Graphs (DAGs):',
        mathFormula: `Topological Order Invariant:
For every directed edge $(u, v) \\in E$, in the linear sequence:
$$ \\text{Index}(u) < \\text{Index}(v) $$`,
        bulletPoints: [
          'If a graph contains even a single cycle (e.g. $A \\to B \\to C \\to A$), no topological sort can exist because each node must come before itself!',
          'A DAG can have multiple valid topological sort orderings.'
        ]
      },
      {
        title: 'Step 2: Kahn\'s In-Degree Queue Algorithm',
        description: 'Kahn\'s algorithm uses a greedy in-degree approach:',
        mathFormula: `Kahn's Algorithm Steps:
1. Compute the In-Degree (number of incoming edges) for every vertex $u \\in V$.
2. Push all vertices with $\\text{In-Degree}[u] == 0$ into a FIFO Queue $Q$ (these tasks have zero prerequisites!).
3. While $Q$ is not empty:
   a. Dequeue vertex $u$ and append $u$ to the Topological Order output list.
   b. For each outgoing neighbor $v$ of $u$:
      Decrement $\\text{In-Degree}[v]$ by 1 (prerequisite completed!).
      If $\\text{In-Degree}[v]$ becomes 0: Push $v$ into $Q$.
4. Cycle Detection Check:
   If total vertices in output list $< |V|$, the graph contains a CYCLE and no topological sort is possible!`
      }
    ],
    cstlReference: {
      header: '#include <vector> / #include <queue>',
      declaration: 'std::vector<int> topoSortKahn(int V, const std::vector<std::vector<int>>& adj);',
      commonMethods: [
        { method: 'topoSortKahn(V, adj)', description: 'Returns topological ordering or empty vector if cycle detected', complexity: 'O(V + E)' }
      ],
      notes: [
        'Kahn\'s algorithm automatically detects cycles if the output count is less than V.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Kahn\'s Topological Sort Algorithm with Cycle Detection',
        code: `#include <iostream>
#include <vector>
#include <queue>

std::vector<int> kahnTopologicalSort(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> inDegree(V, 0);
    for (int u = 0; u < V; ++u) {
        for (int v : adj[u]) {
            inDegree[v]++;
        }
    }

    std::queue<int> q;
    // Push all vertices with 0 in-degree
    for (int i = 0; i < V; ++i) {
        if (inDegree[i] == 0) q.push(i);
    }

    std::vector<int> topoOrder;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topoOrder.push_back(u);

        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) {
                q.push(v);
            }
        }
    }

    // If order size != V, graph contains a cycle!
    if (topoOrder.size() != V) {
        std::cout << "Cycle detected! No topological sort exists.\\n";
        return {};
    }

    return topoOrder;
}

int main() {
    int V = 6;
    std::vector<std::vector<int>> adj(V);
    adj[5] = {2, 0};
    adj[4] = {0, 1};
    adj[2] = {3};
    adj[3] = {1};

    auto order = kahnTopologicalSort(V, adj);
    std::cout << "Topological Sort Order: ";
    for (int node : order) std::cout << node << " ";
    std::cout << "\\n";

    return 0;
}`,
        explanation: 'Computes topological ordering and detects cycles using Kahn in-degree algorithm in O(V + E) time.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-topo-1',
        year: 'CUET 2024 & 2022',
        marks: 12,
        difficulty: 'Exam Classic',
        question: 'Given the Directed Acyclic Graph (DAG) with vertices V={1, 2, 3, 4, 5, 6} and directed edges: (1,2), (1,3), (2,4), (3,4), (3,5), (4,6), (5,6). Apply Kahn\'s Algorithm step-by-step to find a valid Topological Ordering.',
        solution: `Step-by-Step Execution of Kahn's Algorithm:

Step 1: Compute initial In-Degree for all vertices:
- Vertex 1: In-Degree = 0 (No incoming edges)
- Vertex 2: In-Degree = 1 (from 1)
- Vertex 3: In-Degree = 1 (from 1)
- Vertex 4: In-Degree = 2 (from 2, 3)
- Vertex 5: In-Degree = 1 (from 3)
- Vertex 6: In-Degree = 2 (from 4, 5)

Step 2: Initialize FIFO Queue with all in-degree 0 vertices:
- Queue: [ 1 ]
- Output: [ ]

Step 3: Process Queue step-by-step:
- Pop 1 -> Append 1 to Output.
  - Decrement neighbors 2 and 3:
    In-Degree[2] becomes 0 -> Push 2 to Queue.
    In-Degree[3] becomes 0 -> Push 3 to Queue.
  - Queue: [ 2, 3 ] | Output: [ 1 ]

- Pop 2 -> Append 2 to Output.
  - Decrement neighbor 4: In-Degree[4] = 2 - 1 = 1.
  - Queue: [ 3 ] | Output: [ 1, 2 ]

- Pop 3 -> Append 3 to Output.
  - Decrement neighbor 4: In-Degree[4] = 1 - 1 = 0 -> Push 4 to Queue.
  - Decrement neighbor 5: In-Degree[5] = 1 - 1 = 0 -> Push 5 to Queue.
  - Queue: [ 4, 5 ] | Output: [ 1, 2, 3 ]

- Pop 4 -> Append 4 to Output.
  - Decrement neighbor 6: In-Degree[6] = 2 - 1 = 1.
  - Queue: [ 5 ] | Output: [ 1, 2, 3, 4 ]

- Pop 5 -> Append 5 to Output.
  - Decrement neighbor 6: In-Degree[6] = 1 - 1 = 0 -> Push 6 to Queue.
  - Queue: [ 6 ] | Output: [ 1, 2, 3, 4, 5 ]

- Pop 6 -> Append 6 to Output.
  - No outgoing edges.
  - Queue: [ ] (Empty!).

Final Topological Sort Order: 1, 2, 3, 4, 5, 6
Check: All 6 vertices placed, zero cycle detected. Valid DAG ordering!`,
        keyTakeaway: 'Always show the in-degree table updates explicitly at each step of Kahn’s algorithm.'
      }
    ],
    quizzes: [
      {
        id: 'topo-q1',
        question: 'Under what condition is a topological sort guaranteed to exist for a directed graph?',
        options: [
          'The graph is fully connected',
          'The graph contains no directed cycles (it is a DAG)',
          'The graph is undirected',
          'The graph has an even number of vertices'
        ],
        correctIndex: 1,
        explanation: 'Topological sort is possible if and only if the directed graph is acyclic (DAG).',
        examTip: 'Topological sort exists <=> Graph is a DAG.'
      },
      {
        id: 'topo-q2',
        question: 'In Kahn\'s Topological Sort Algorithm, which vertices are pushed into the queue first?',
        options: [
          'Vertices with In-Degree equal to 0 (no incoming prerequisites)',
          'Vertices with Out-Degree equal to 0',
          'Vertices with the highest edge weight',
          'The root vertex only'
        ],
        correctIndex: 0,
        explanation: 'Vertices with In-Degree = 0 have no remaining prerequisite dependencies and can be immediately placed in the topological sequence.',
        examTip: 'Kahn\'s Queue starts with In-Degree 0 nodes.'
      },
      {
        id: 'topo-q3',
        question: 'How does Kahn\'s Algorithm detect the presence of a cycle in a directed graph?',
        options: [
          'If the final topological order contains FEWER vertices than total graph vertices $|V|$',
          'If the queue becomes larger than $|V|$',
          'If the in-degree of all nodes reaches -1',
          'If any node is visited twice'
        ],
        correctIndex: 0,
        explanation: 'Nodes inside a cycle will never reach an In-Degree of 0, so Kahn\'s queue empties early with fewer than $|V|$ output elements.',
        examTip: 'Output size < V => Cycle detected!'
      },
      {
        id: 'topo-q4',
        question: 'When deriving a topological sort using Depth-First Search (DFS), in what order are vertices placed in the sorted sequence?',
        options: [
          'Reverse order of DFS finishing times $f[u]$ (Postorder reversal)',
          'Inorder traversal sequence',
          'Order of DFS discovery times $d[u]$',
          'Alphabetical order of node labels'
        ],
        correctIndex: 0,
        explanation: 'In DFS topological sort, a node finishes ($f[u]$) after all its outgoing descendants finish. Reversing the finishing times yields the topological order.',
        examTip: 'DFS Topological Sort = Reverse of Finishing Times ($f[u]$).'
      },
      {
        id: 'topo-q5',
        question: 'What is the time complexity of Kahn\'s Topological Sort algorithm for a graph with V vertices and E edges?',
        options: ['O(V + E)', 'O(V²)', 'O(E log V)', 'O(V³)'],
        correctIndex: 0,
        explanation: 'Computing in-degrees takes O(V + E) time, and each vertex/edge is pushed/dequeued once, operating in O(V + E) linear time.',
        examTip: 'Topological sort time complexity = O(V + E).'
      }
    ]
  },
  {
    id: 'shortest-path-dijkstra',
    categoryId: 'graphs',
    subCategoryId: 'shortest-paths',
    title: 'Single-Source Shortest Path (Dijkstra)',
    subtitle: 'Greedy Edge Relaxation, Priority Queue Frontiers & Non-Negative Distance Trees',
    icon: 'Compass',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'CUET Module 2 anchor (15–20 marks). Tested in all papers: (1) Step-by-step distance table traces showing visited set $S$ and tentative distances $d[v]$, (2) Priority queue implementation, (3) Proving why Dijkstra fails on negative edge weights.',
    overview: 'Edsger W. Dijkstra (1959) discovered the premier algorithm for finding the shortest path from a starting source vertex $S$ to every other vertex in a weighted graph with non-negative edge weights. Like GPS navigation (Google Maps), Dijkstra uses a Greedy strategy: it maintains a tentative shortest distance $d[u]$ to each node and iteratively finalizes the unvisited node with the smallest tentative distance, relaxing all of its outgoing edges.',
    timeComplexity: {
      access: '$\\mathcal{O}((V + E) \\log V)$ using Min-Priority Queue / $\\mathcal{O}(V^2)$ with flat array',
      search: '$\\mathcal{O}((V + E) \\log V)$',
      insertion: '$\\mathcal{O}(\\log V)$ per relaxation',
      deletion: '$\\mathcal{O}(\\log V)$ extract-min',
      space: '$\\mathcal{O}(V + E)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: The Edge Relaxation Formula',
        description: 'The core operation of shortest path algorithms is Edge Relaxation:',
        mathFormula: `Relaxation Condition for Edge $(u, v)$ with weight $w(u, v)$:
$$ \\text{If } d[u] + w(u, v) < d[v] \\implies d[v] = d[u] + w(u, v), \\quad \\text{parent}[v] = u $$`,
        bulletPoints: [
          'Initialization: Set $d[S] = 0$ for source $S$, and $d[v] = \\infty$ for all other vertices $v \\ne S$.'
        ]
      },
      {
        title: 'Step 2: Dijkstra\'s Algorithm Execution Flow',
        description: 'Dijkstra\'s Greedy Process:',
        bulletPoints: [
          '1. Maintain a set of finalized vertices $S$ (initially empty).',
          '2. In each iteration, extract the unvisited vertex $u$ with the smallest $d[u]$ value.',
          '3. Add $u$ to finalized set $S$.',
          '4. Relax all outgoing edges $(u, v)$ originating from $u$.',
          '5. Repeat until all reachable vertices are finalized.'
        ]
      },
      {
        title: 'Step 3: Why Dijkstra Fails on Negative Edge Weights',
        description: 'Dijkstra assumes that once a vertex $u$ is finalized with distance $d[u]$, no future path could ever make $d[u]$ shorter (because all edge weights are $\\ge 0$). If negative edges exist, a longer hop path with a negative weight could reduce an already-finalized distance, breaking the greedy invariant! For graphs with negative weights, use the Bellman-Ford Algorithm ($\mathcal{O}(V \\times E)$).'
      }
    ],
    cstlReference: {
      header: '#include <vector> / #include <queue>',
      declaration: 'std::vector<int> dijkstra(int S, int V, const std::vector<std::vector<std::pair<int, int>>>& adj);',
      commonMethods: [
        { method: 'dijkstra(S, V, adj)', description: 'Returns vector of shortest distances from S to all vertices in O((V+E) log V)', complexity: 'O((V + E) log V)' }
      ],
      notes: [
        'Use std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> for Min-Heap.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Dijkstra Shortest Path with STL Priority Queue',
        code: `#include <iostream>
#include <vector>
#include <queue>

const int INF = 1e9;

// Adjacency list: adj[u] holds pairs {neighbor, weight}
std::vector<int> dijkstra(int src, int V, const std::vector<std::vector<std::pair<int, int>>>& adj) {
    std::vector<int> dist(V, INF);
    // Min-Priority Queue storing {distance, vertex}
    std::priority_queue<std::pair<int, int>, 
                        std::vector<std::pair<int, int>>, 
                        std::greater<std::pair<int, int>>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        // Stale entry check
        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            // Relaxation step
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }

    return dist;
}

int main() {
    int V = 5;
    std::vector<std::vector<std::pair<int, int>>> adj(V);
    adj[0].push_back({1, 10});
    adj[0].push_back({2, 3});
    adj[2].push_back({1, 1});
    adj[1].push_back({3, 2});
    adj[2].push_back({3, 8});
    adj[3].push_back({4, 7});

    auto distances = dijkstra(0, V, adj);
    std::cout << "Shortest distances from Source 0:\\n";
    for (int i = 0; i < V; ++i) {
        std::cout << "  To Vertex " << i << " : " << distances[i] << "\\n";
    }

    return 0;
}`,
        explanation: 'Standard competitive programming and production implementation of Dijkstra using std::priority_queue.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-dijk-1',
        year: 'CUET 2024 & 2022',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Apply Dijkstra\'s Algorithm on the weighted graph with vertices V={A, B, C, D, E} and source S=A. Edges: (A,B,10), (A,C,3), (C,B,1), (B,D,2), (C,D,8), (C,E,2), (D,E,7). Show the complete step-by-step trace table.',
        solution: `Step-by-Step Dijkstra Trace Table:

Initial State:
Finalized Set S = { }
Tentative Distances: d[A]=0, d[B]=INF, d[C]=INF, d[D]=INF, d[E]=INF

Iteration 1:
- Extract Min: Vertex A (dist = 0).
- Finalize A: S = { A }
- Relax edges from A:
  - (A, B, 10): d[B] = min(INF, 0 + 10) = 10, parent[B] = A
  - (A, C, 3):  d[C] = min(INF, 0 + 3)  = 3,  parent[C] = A
- Tentative distances: d[B]=10, d[C]=3, d[D]=INF, d[E]=INF

Iteration 2:
- Extract Min: Vertex C (dist = 3).
- Finalize C: S = { A, C }
- Relax edges from C:
  - (C, B, 1): d[B] = min(10, 3 + 1) = 4 (Distance improved to 4!), parent[B] = C
  - (C, D, 8): d[D] = min(INF, 3 + 8) = 11, parent[D] = C
  - (C, E, 2): d[E] = min(INF, 3 + 2) = 5,  parent[E] = C
- Tentative distances: d[B]=4, d[D]=11, d[E]=5

Iteration 3:
- Extract Min: Vertex B (dist = 4).
- Finalize B: S = { A, C, B }
- Relax edges from B:
  - (B, D, 2): d[D] = min(11, 4 + 2) = 6 (Distance improved to 6!), parent[D] = B
- Tentative distances: d[D]=6, d[E]=5

Iteration 4:
- Extract Min: Vertex E (dist = 5).
- Finalize E: S = { A, C, B, E }
- Relax edges from E:
  - (D, E, 7) directed back: no improvement.
- Tentative distances: d[D]=6

Iteration 5:
- Extract Min: Vertex D (dist = 6).
- Finalize D: S = { A, C, B, E, D } (All vertices finalized!).

Final Shortest Paths & Distances from Source A:
- A -> A : Distance = 0 | Path: A
- A -> B : Distance = 4 | Path: A -> C -> B
- A -> C : Distance = 3 | Path: A -> C
- A -> D : Distance = 6 | Path: A -> C -> B -> D
- A -> E : Distance = 5 | Path: A -> C -> E`,
        keyTakeaway: 'Always show how distance to B drops from 10 to 4 when vertex C is relaxed.'
      }
    ],
    quizzes: [
      {
        id: 'dijk-q1',
        question: 'Why does Dijkstra\'s algorithm fail to guarantee correct shortest paths on graphs with negative edge weights?',
        options: [
          'It causes an infinite loop in the priority queue',
          'It greedily assumes once a vertex is finalized, its shortest distance can never decrease',
          'It only works on binary trees',
          'It requires all edges to be directed'
        ],
        correctIndex: 1,
        explanation: 'Dijkstra permanently finalizes a vertex distance assuming all future edge traversals add non-negative costs.',
        examTip: 'Negative edge weights -> Use Bellman-Ford algorithm, not Dijkstra.'
      },
      {
        id: 'dijk-q2',
        question: 'What is the time complexity of Dijkstra\'s Algorithm using a Min-Priority Queue (Binary Heap)?',
        options: ['O((V + E) log V)', 'O(V³)', 'O(V + E)', 'O(V²)'],
        correctIndex: 0,
        explanation: 'Extracting minimum distance node takes O(log V) V times, and edge relaxation updates take O(log V) E times, giving O((V + E) log V).',
        examTip: 'Dijkstra with Min-Heap = O((V + E) log V).'
      },
      {
        id: 'dijk-q3',
        question: 'What is the standard Edge Relaxation condition for edge $(u, v)$ with weight $w(u, v)$ in Dijkstra?',
        options: [
          'if (d[u] + w(u, v) < d[v]) d[v] = d[u] + w(u, v);',
          'if (d[u] + d[v] < w(u, v)) d[v] = w(u, v);',
          'if (d[v] + w(u, v) < d[u]) d[u] = d[v];',
          'if (w(u, v) < d[v]) d[v] = w(u, v);'
        ],
        correctIndex: 0,
        explanation: 'Edge relaxation tests whether traveling to $v$ through $u$ offers a shorter total distance than the current tentative distance $d[v]$.',
        examTip: 'Relaxation: $d[u] + w(u, v) < d[v]$.'
      },
      {
        id: 'dijk-q4',
        question: 'Which algorithm should be used instead of Dijkstra when a graph contains negative edge weights but no negative cycles?',
        options: ['Bellman-Ford Algorithm', 'Floyd-Warshall Algorithm', 'Kahn\'s Algorithm', 'Kruskal\'s Algorithm'],
        correctIndex: 0,
        explanation: 'The Bellman-Ford algorithm handles graphs with negative edge weights in $O(V \cdot E)$ time and detects negative cycles.',
        examTip: 'Negative edge weights => Bellman-Ford algorithm.'
      },
      {
        id: 'dijk-q5',
        question: 'In Dijkstra\'s algorithm, what initial distance values are assigned to the source vertex $S$ and all other vertices $v \\ne S$?',
        options: [
          'd[S] = 0, and d[v] = ∞ for all v ≠ S',
          'd[S] = 1, and d[v] = 0 for all v ≠ S',
          'd[v] = 0 for all vertices',
          'd[S] = ∞, and d[v] = 0 for all v ≠ S'
        ],
        correctIndex: 0,
        explanation: 'Distance to the source is 0 hops/weight, while all other unvisited vertices begin with tentative distance ∞.',
        examTip: 'Init: Source dist = 0, all others = infinity.'
      }
    ]
  },
  {
    id: 'floyd-warshall',
    categoryId: 'graphs',
    subCategoryId: 'shortest-paths',
    title: 'All-Pairs Shortest Path & Transitive Closure',
    subtitle: 'Dynamic Programming Matrix Recurrences: Warshall Reachability & Floyd-Warshall DP',
    icon: 'Table',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 2 staple (15–20 marks). Exam formats: (1) Warshall\'s Transitive Closure boolean matrix sequence $P^{(0)} \\to P^{(1)} \\dots P^{(N)}$, (2) Floyd-Warshall All-Pairs shortest distance matrices $D^{(0)} \\to D^{(1)} \\dots D^{(N)}$, (3) Detecting negative weight cycles.',
    overview: 'While Dijkstra computes shortest paths from a single source, many applications (like flight pricing systems or network routing tables) need shortest paths between ALL pairs of vertices $(u, v)$. Warshall (1962) and Floyd (1962) solved this using Dynamic Programming. Warshall computes Transitive Closure (whether any path exists between $u$ and $v$), while Floyd-Warshall computes the numerical shortest distance between every pair in $\mathcal{O}(V^3)$ time.',
    timeComplexity: {
      access: '$\\mathcal{O}(1)$ direct lookup in matrix $D[u, v]$',
      search: '$\\mathcal{O}(V^3)$ 3 nested loops',
      insertion: '$\\mathcal{O}(V^3)$',
      deletion: '$\\mathcal{O}(V^3)$',
      space: '$\\mathcal{O}(V^2)$ distance matrix'
    },
    keyConcepts: [
      {
        title: 'Step 1: Warshall\'s Transitive Closure Algorithm',
        description: 'Warshall finds whether a path exists between every pair of vertices by considering intermediate vertices $k = 1, 2, \\dots, N$:',
        mathFormula: `Warshall Boolean Recurrence:
$$ P^{(k)}[i, j] = P^{(k-1)}[i, j] \\lor \\left( P^{(k-1)}[i, k] \\land P^{(k-1)}[k, j] \\right) $$`,
        bulletPoints: [
          'Intuition: You can travel from $i$ to $j$ using intermediate vertices $\{1, \\dots, k\}$ if you could ALREADY do so without $k$, OR if you can go $i \\to k$ AND $k \\to j$!'
        ]
      },
      {
        title: 'Step 2: Floyd-Warshall All-Pairs Shortest Path Algorithm',
        description: 'Floyd-Warshall generalizes Warshall to numerical shortest path lengths:',
        mathFormula: `Floyd-Warshall Dynamic Programming Recurrence:
$$ D^{(k)}[i, j] = \\min \\left( D^{(k-1)}[i, j], \\quad D^{(k-1)}[i, k] + D^{(k-1)}[k, j] \\right) $$

Initial Matrix $D^{(0)}$:
$$ D^{(0)}[i, j] = \\begin{cases} 0 & \\text{if } i = j \\\\ w(i, j) & \\text{if edge } (i, j) \\in E \\\\ \\infty & \\text{otherwise} \\end{cases} $$`
      },
      {
        title: 'Step 3: Detecting Negative Weight Cycles',
        description: 'Floyd-Warshall handles negative edge weights correctly! However, if the graph contains a Negative Weight Cycle (a loop whose total sum is negative), shortest paths become $-\\infty$. Floyd-Warshall detects this if any diagonal entry $D[i, i] < 0$ after $N$ iterations.'
      }
    ],
    cstlReference: {
      header: '#include <vector> / #include <algorithm>',
      declaration: 'void floydWarshall(std::vector<std::vector<int>>& dist, int V);',
      commonMethods: [
        { method: 'floydWarshall(dist, V)', description: 'Computes all-pairs shortest paths in-place in O(V^3) time and O(V^2) space', complexity: 'O(V^3)' }
      ],
      notes: [
        'Notice the loop order: intermediate vertex k MUST be the outermost loop!'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Floyd-Warshall Algorithm Implementation',
        code: `#include <iostream>
#include <vector>
#include <algorithm>

const int INF = 1e9;

void floydWarshall(int V, std::vector<std::vector<int>>& dist) {
    // k MUST be the outermost loop!
    for (int k = 0; k < V; ++k) {
        for (int i = 0; i < V; ++i) {
            for (int j = 0; j < V; ++j) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = std::min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
}

int main() {
    int V = 4;
    std::vector<std::vector<int>> dist = {
        {0,   5,   INF, 10},
        {INF, 0,   3,   INF},
        {INF, INF, 0,   1},
        {INF, INF, INF, 0}
    };

    floydWarshall(V, dist);

    std::cout << "All-Pairs Shortest Distance Matrix:\\n";
    for (int i = 0; i < V; ++i) {
        for (int j = 0; j < V; ++j) {
            if (dist[i][j] == INF) std::cout << "INF ";
            else std::cout << dist[i][j] << "   ";
        }
        std::cout << "\\n";
    }

    return 0;
}`,
        explanation: 'Three nested loops computing all-pairs shortest paths in O(V^3) time.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-floyd-1',
        year: 'CUET 2024 & 2022',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Apply Warshall\'s Algorithm to find the Transitive Closure (Reachability Matrix P) for the directed graph with vertices V={1, 2, 3, 4} and adjacency matrix A:\nA = [ [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 0, 0], [1, 0, 1, 0] ]. Show matrices P(0), P(1), P(2), P(3), P(4).',
        solution: `Step-by-Step Warshall Transitive Closure Matrix Sequence:

Matrix P(0) = Initial Adjacency Matrix A:
    1  2  3  4
1 [ 0  1  0  0 ]
2 [ 0  0  0  1 ]
3 [ 0  0  0  0 ]
4 [ 1  0  1  0 ]

- Step 1: Intermediate k = 1 (Check paths through vertex 1):
  - Column 1 has 1 at row 4 (4 -> 1).
  - Row 1 has 1 at col 2 (1 -> 2).
  - Therefore, new path exists: 4 -> 1 -> 2. Set P(1)[4, 2] = 1.
  Matrix P(1):
      1  2  3  4
  1 [ 0  1  0  0 ]
  2 [ 0  0  0  1 ]
  3 [ 0  0  0  0 ]
  4 [ 1  1  1  0 ]  <-- (4,2) became 1

- Step 2: Intermediate k = 2 (Check paths through vertex 2):
  - Column 2 has 1s at rows 1 and 4 (1->2, 4->2).
  - Row 2 has 1 at col 4 (2->4).
  - Therefore:
    - 1 -> 2 -> 4 exists: Set P(2)[1, 4] = 1.
    - 4 -> 2 -> 4 exists: Set P(2)[4, 4] = 1.
  Matrix P(2):
      1  2  3  4
  1 [ 0  1  0  1 ]  <-- (1,4) became 1
  2 [ 0  0  0  1 ]
  3 [ 0  0  0  0 ]
  4 [ 1  1  1  1 ]  <-- (4,4) became 1

- Step 3: Intermediate k = 3 (Check paths through vertex 3):
  - Column 3 has 1 at row 4. Row 3 has all 0s.
  - No new paths created.
  Matrix P(3) = P(2).

- Step 4: Intermediate k = 4 (Check paths through vertex 4):
  - Column 4 has 1s at rows 1, 2, 4.
  - Row 4 has 1s at cols 1, 2, 3, 4.
  - All combinations (1, 2, 4) with (1, 2, 3, 4) become 1!
  Matrix P(4) (Final Transitive Closure):
      1  2  3  4
  1 [ 1  1  1  1 ]
  2 [ 1  1  1  1 ]
  3 [ 0  0  0  0 ]
  4 [ 1  1  1  1 ]

Conclusion: Vertices 1, 2, and 4 can reach every vertex (1, 2, 3, 4). Vertex 3 has out-degree 0 and can reach no one.`,
        keyTakeaway: 'Always write down which entries in column k and row k cause 0 to switch to 1 in matrix P(k).'
      }
    ],
    quizzes: [
      {
        id: 'floyd-q1',
        question: 'What is the time and space complexity of the Floyd-Warshall algorithm for a graph with V vertices?',
        options: [
          'Time: O(V²), Space: O(V)',
          'Time: O(V³), Space: O(V²)',
          'Time: O(V log V), Space: O(V)',
          'Time: O(V * E), Space: O(V + E)'
        ],
        correctIndex: 1,
        explanation: 'Floyd-Warshall uses three nested loops over V vertices, taking O(V³) time, and stores a V x V distance matrix taking O(V²) space.',
        examTip: 'Floyd-Warshall: O(V³) time, O(V²) space.'
      },
      {
        id: 'floyd-q2',
        question: 'In the Floyd-Warshall algorithm implementation, which loop variable MUST be the outermost loop?',
        options: ['Intermediate vertex k', 'Source vertex i', 'Destination vertex j', 'It does not matter'],
        correctIndex: 0,
        explanation: 'Vertex $k$ represents the subset of allowed intermediate vertices $\{1 \dots k\}$. $k$ MUST be the outer loop so dynamic programming subproblems are solved in order.',
        examTip: 'Intermediate node k MUST be the outermost loop in Floyd-Warshall!'
      },
      {
        id: 'floyd-q3',
        question: 'What boolean operation recurrence is used in Warshall\'s Transitive Closure algorithm for reachability matrix entry P^(k)[i, j]?',
        options: [
          'P^(k)[i, j] = P^(k-1)[i, j] OR (P^(k-1)[i, k] AND P^(k-1)[k, j])',
          'P^(k)[i, j] = P^(k-1)[i, k] + P^(k-1)[k, j]',
          'P^(k)[i, j] = P^(k-1)[i, j] AND (P^(k-1)[i, k] OR P^(k-1)[k, j])',
          'P^(k)[i, j] = P^(k-1)[i, j] XOR P^(k-1)[k, j]'
        ],
        correctIndex: 0,
        explanation: 'Path from $i$ to $j$ exists using intermediate $\{1\dots k\}$ if it already existed OR if paths $i \to k$ AND $k \to j$ both exist.',
        examTip: 'Warshall recurrence: $P[i,j] = P[i,j] \lor (P[i,k] \land P[k,j])$.'
      },
      {
        id: 'floyd-q4',
        question: 'How can Floyd-Warshall detect the presence of a negative-weight cycle in a graph?',
        options: [
          'If any diagonal entry D[i, i] becomes less than 0',
          'If any non-diagonal entry becomes infinity',
          'If the distance matrix sum exceeds V³',
          'If all entries in a column are positive'
        ],
        correctIndex: 0,
        explanation: 'If a path from vertex $i$ back to itself $i \to i$ has total weight $< 0$, $D[i, i]$ becomes negative, signaling a negative cycle.',
        examTip: 'Negative cycle condition: $D[i, i] < 0$ after $V$ steps.'
      },
      {
        id: 'floyd-q5',
        question: 'What algorithm is best suited for computing ALL-PAIRS shortest paths on a sparse graph without negative weights?',
        options: [
          'Running Dijkstra V times with a priority queue (O(V(V+E) log V))',
          'Floyd-Warshall (O(V³))',
          'BFS (O(V + E))',
          'Kruskal\'s Algorithm (O(E log E))'
        ],
        correctIndex: 0,
        explanation: 'For sparse graphs where $E \ll V²$, running Dijkstra $V$ times takes $O(V^2 \log V)$, which is faster than Floyd-Warshall\'s $O(V^3)$.',
        examTip: 'Sparse graph All-Pairs: $V \times$ Dijkstra is faster than Floyd-Warshall.'
      }
    ]
  },
  {
    id: 'mst',
    categoryId: 'graphs',
    subCategoryId: 'mst-algorithms',
    title: 'Minimum Spanning Trees (Kruskal & Prim)',
    subtitle: 'Optimal Network Topologies: Greedy Cut Property, Disjoint Sets & Frontier Heaps',
    icon: 'GitBranch',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 2 & 3 exam staple (15–20 marks). Tested in all 7 analyzed papers: (1) Step-by-step trace of Kruskal\'s algorithm with DSU cycle checks, (2) Step-by-step trace of Prim\'s algorithm growing from source, (3) Mathematical proof of the Spanning Tree Cut Property.',
    overview: 'Suppose you are a telecommunications company laying fiber-optic cables to connect $V$ cities. You want every city to be connected to the network, but cable installation is expensive! A Minimum Spanning Tree (MST) is a subset of edges that connects all $V$ vertices together without any cycles, using exactly $V-1$ edges while minimizing the total sum of edge weights. The two classic greedy algorithms are Kruskal\'s Algorithm (Edge-Centric with Union-Find) and Prim\'s Algorithm (Vertex-Growing with Priority Queue).',
    timeComplexity: {
      access: '$\\mathcal{O}(E \\log E)$ Kruskal / $\\mathcal{O}(E \\log V)$ Prim',
      search: '$\\mathcal{O}(E \\log E)$',
      insertion: '$\\mathcal{O}(1)$ with DSU path compression',
      deletion: '$\\mathcal{O}(1)$',
      space: '$\\mathcal{O}(V + E)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: The Spanning Tree Theorem & Cut Property',
        description: 'Fundamental mathematical theorems of Minimum Spanning Trees:',
        mathFormula: `1. Spanning Tree Definition:
For any connected undirected graph $G = (V, E)$, a spanning tree $T$:
- Contains ALL $|V|$ vertices.
- Contains EXACTLY $|V| - 1$ edges.
- Contains ZERO cycles.

2. Greedy Cut Property Theorem:
For any cut $(S, V - S)$ of graph $G$, the minimum weight edge crossing the cut MUST belong to the Minimum Spanning Tree of $G$.`,
        bulletPoints: [
          'A graph can have multiple distinct MSTs if edge weights are not unique, but the Total Minimum Weight is always identical.'
        ]
      },
      {
        title: 'Step 2: Kruskal\'s Algorithm (Edge-Centric + DSU)',
        description: 'Kruskal builds the MST by considering edges globally in increasing order of weight:',
        bulletPoints: [
          '1. Sort all $|E|$ edges in non-decreasing order of weight ($w_1 \\le w_2 \\le \\dots \\le w_E$).',
          '2. Initialize a Disjoint Set Union (DSU / Union-Find) where each vertex is in its own set.',
          '3. For each sorted edge $(u, v)$:',
          '   - Check if $\\text{Find}(u) \\ne \\text{Find}(v)$ (Do $u$ and $v$ belong to different components?).',
          '   - If YES: Add edge $(u, v)$ to the MST and call $\\text{Union}(u, v)$.',
          '   - If NO: Reject edge $(u, v)$ because adding it would form a cycle!',
          '4. Stop when exactly $|V| - 1$ edges have been accepted.'
        ]
      },
      {
        title: 'Step 3: Prim\'s Algorithm (Vertex-Centric Frontier)',
        description: 'Prim grows a single continuous tree outward from a chosen starting vertex:',
        bulletPoints: [
          '1. Start with an arbitrary root vertex in tree set $T$.',
          '2. In each step, pick the cheapest edge connecting a vertex in $T$ to a vertex outside $T$ (the Cut Property!).',
          '3. Add that vertex to $T$ and repeat until all $|V|$ vertices are in $T$.'
        ]
      }
    ],
    cstlReference: {
      header: '#include <vector> / #include <algorithm>',
      declaration: 'struct Edge { int u, v, w; };\nint kruskalMST(int V, std::vector<Edge>& edges);',
      commonMethods: [
        { method: 'kruskalMST(V, edges)', description: 'Sorts edges and applies DSU with path compression in O(E log E)', complexity: 'O(E log E)' },
        { method: 'primMST(V, adj)', description: 'Grows vertex cut using priority queue in O(E log V)', complexity: 'O(E log V)' }
      ],
      notes: [
        'Kruskal is faster on Sparse graphs (|E| ~ |V|). Prim is faster on Dense graphs (|E| ~ |V|^2).'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Kruskal\'s Algorithm with Disjoint Set Union (DSU)',
        code: `#include <iostream>
#include <vector>
#include <algorithm>

struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

struct DSU {
    std::vector<int> parent;
    DSU(int n) : parent(n) {
        for (int i = 0; i < n; ++i) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    bool unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);
        if (root_i != root_j) {
            parent[root_i] = root_j;
            return true;
        }
        return false;
    }
};

int kruskal(int V, std::vector<Edge>& edges) {
    std::sort(edges.begin(), edges.end());
    DSU dsu(V);
    int mstWeight = 0;
    int edgesCount = 0;

    std::cout << "Selected MST Edges:\\n";
    for (const auto& edge : edges) {
        if (dsu.unite(edge.u, edge.v)) {
            mstWeight += edge.weight;
            edgesCount++;
            std::cout << "  Edge (" << edge.u << " - " << edge.v << ") Weight: " << edge.weight << "\\n";
            if (edgesCount == V - 1) break;
        }
    }
    return mstWeight;
}

int main() {
    int V = 4;
    std::vector<Edge> edges = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}
    };

    int totalWeight = kruskal(V, edges);
    std::cout << "Total MST Cost: " << totalWeight << "\\n"; // 19
    return 0;
}`,
        explanation: 'Kruskal with DSU path compression running in optimal O(E log E) time.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-mst-1',
        year: 'CUET 2025 & 2023',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Given the weighted undirected graph with vertices V={1, 2, 3, 4, 5, 6} and edges: (1,2,7), (1,3,8), (2,3,3), (2,4,6), (3,4,4), (3,5,3), (4,5,2), (4,6,5), (5,6,2). (a) Apply Kruskal\'s algorithm: list sorted edges and indicate whether each edge is Accepted or Rejected. (b) Find the Total Weight of the MST.',
        solution: `Step-by-Step Kruskal's Algorithm Execution:

Step 1: Sort all edges in non-decreasing order of weight:
1.  (4, 5, 2)
2.  (5, 6, 2)
3.  (2, 3, 3)
4.  (3, 5, 3)
5.  (3, 4, 4)
6.  (4, 6, 5)
7.  (2, 4, 6)
8.  (1, 2, 7)
9.  (1, 3, 8)

Step 2: Initialize DSU with 6 separate sets: {1}, {2}, {3}, {4}, {5}, {6}
Target MST edge count = |V| - 1 = 6 - 1 = 5 edges.

Step 3: Process edges one by one:
- Edge 1: (4, 5, 2) -> Find(4) != Find(5) -> ACCEPTED. DSU: {4, 5}, {1}, {2}, {3}, {6}. [Edges: 1]
- Edge 2: (5, 6, 2) -> Find(5) != Find(6) -> ACCEPTED. DSU: {4, 5, 6}, {1}, {2}, {3}. [Edges: 2]
- Edge 3: (2, 3, 3) -> Find(2) != Find(3) -> ACCEPTED. DSU: {2, 3}, {4, 5, 6}, {1}. [Edges: 3]
- Edge 4: (3, 5, 3) -> Find(3) != Find(5) -> ACCEPTED. DSU: {2, 3, 4, 5, 6}, {1}. [Edges: 4]
- Edge 5: (3, 4, 4) -> Find(3) == Find(4) (Both in {2,3,4,5,6}) -> REJECTED (Forms cycle 3-4-5-3!).
- Edge 6: (4, 6, 5) -> Find(4) == Find(6) -> REJECTED (Forms cycle 4-5-6-4!).
- Edge 7: (2, 4, 6) -> Find(2) == Find(4) -> REJECTED (Forms cycle!).
- Edge 8: (1, 2, 7) -> Find(1) != Find(2) -> ACCEPTED. DSU: {1, 2, 3, 4, 5, 6}. [Edges: 5, Complete!]

Step 4: Total Minimum Spanning Tree Weight:
Weight = 2 + 2 + 3 + 3 + 7 = 17

Accepted Edges in MST:
- (4, 5) weight 2
- (5, 6) weight 2
- (2, 3) weight 3
- (3, 5) weight 3
- (1, 2) weight 7`,
        keyTakeaway: 'Always state which edges are REJECTED and identify the cycle that would have been formed.'
      }
    ],
    quizzes: [
      {
        id: 'mst-q1',
        question: 'In an undirected connected graph with V vertices, how many edges does a Minimum Spanning Tree always contain?',
        options: ['V', 'V - 1', 'V + 1', 'E - 1'],
        correctIndex: 1,
        explanation: 'Every spanning tree of V vertices contains exactly V - 1 edges and no cycles.',
        examTip: 'Spanning tree of V vertices = exactly V - 1 edges.'
      },
      {
        id: 'mst-q2',
        question: 'What data structure does Kruskal\'s Algorithm rely on to detect whether adding an edge creates a cycle in O(1) amortized time?',
        options: ['Disjoint Set Union (DSU / Union-Find)', 'Priority Queue', 'Adjacency Matrix', 'Stack'],
        correctIndex: 0,
        explanation: 'DSU with Path Compression and Union by Rank determines if two vertices are in the same component in near-O(1) time.',
        examTip: 'Kruskal + DSU = Fast cycle prevention.'
      },
      {
        id: 'mst-q3',
        question: 'What is the time complexity of Kruskal\'s Algorithm for a graph with V vertices and E edges?',
        options: ['O(E log E)', 'O(V³)', 'O(V + E)', 'O(V²)'],
        correctIndex: 0,
        explanation: 'Sorting all edges takes O(E log E) time, which dominates the algorithm runtime.',
        examTip: 'Kruskal complexity is dominated by edge sorting: O(E log E).'
      },
      {
        id: 'mst-q4',
        question: 'How does Prim\'s algorithm differ from Kruskal\'s algorithm in building the Minimum Spanning Tree?',
        options: [
          'Prim grows a single continuous tree outward from a single root vertex, while Kruskal merges a forest of disconnected edges',
          'Prim works only on directed graphs',
          'Prim requires zero sorting',
          'Prim creates cycles during execution'
        ],
        correctIndex: 0,
        explanation: 'Prim maintains a single tree component growing outward across the cut frontier, whereas Kruskal adds minimal edges anywhere across the entire forest.',
        examTip: 'Prim = Vertex-Growing Tree; Kruskal = Edge-Centric Forest.'
      },
      {
        id: 'mst-q5',
        question: 'What does the Cut Property in Minimum Spanning Trees guarantee?',
        options: [
          'For any cut (S, V-S) of a graph, the minimum-weight edge crossing the cut MUST belong to the Minimum Spanning Tree',
          'All cuts must contain an even number of edges',
          'Cutting a tree doubles its height',
          'The heaviest edge always belongs to the MST'
        ],
        correctIndex: 0,
        explanation: 'The Cut Property proves that picking the cheapest edge crossing any partition of vertices is guaranteed to be part of an optimal MST.',
        examTip: 'Cut Property = Minimum weight edge crossing cut is in MST.'
      }
    ]
  }
];
