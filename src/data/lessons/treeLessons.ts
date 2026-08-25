import { Lesson } from '../../types';

export const TREE_LESSONS: Lesson[] = [
  {
    id: 'tree',
    categoryId: 'trees',
    subCategoryId: 'tree-fundamentals',
    title: 'Binary Tree Foundations & Classifications',
    subtitle: 'Hierarchical Node Networks, Structural Taxonomies & Mathematical Induction Proofs',
    icon: 'GitBranch',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 1 core syllabus. Tested in 100% of exam cycles (20–30 marks). Critical topics include: (1) Mathematical proof that a full binary tree with $N$ internal nodes has $N+1$ leaves ($L = I + 1$), (2) Complete binary tree flat array index formulas ($2i+1, 2i+2$), (3) Extended binary trees with external/internal path lengths.',
    overview: 'Unlike linear data structures (arrays, linked lists, stacks) where items follow a single sequential line, a Tree is a hierarchical non-linear data structure. A Tree begins at a single distinguished apex called the Root, and branches downwards into parent-child relationships. Binary trees restrict each node to at most two children (left and right), forming the foundation for search algorithms, syntax analysis, and priority schedulers.',
    timeComplexity: {
      access: '$\\mathcal{O}(N)$ arbitrary / $\\mathcal{O}(h)$ where $h$ is tree height',
      search: '$\\mathcal{O}(N)$ unsorted tree / $\\mathcal{O}(\\log N)$ balanced search tree',
      insertion: '$\\mathcal{O}(1)$ given parent pointer / $\\mathcal{O}(h)$',
      deletion: '$\\mathcal{O}(1)$ given parent pointer / $\\mathcal{O}(h)$',
      space: '$\\mathcal{O}(N)$ total node memory'
    },
    keyConcepts: [
      {
        title: 'Step 1: Core Tree Anatomical Terminology',
        description: 'Exam questions require formal definitions of all tree anatomical components:',
        bulletPoints: [
          'Root: The topmost unique node with zero incoming edges (in-degree = 0).',
          'Leaf (Terminal Node): A node with zero children (out-degree = 0).',
          'Internal Node (Non-Terminal): Any node having at least one child.',
          'Depth of Node $u$: Number of edges on the path from Root to $u$ (Depth of Root = 0).',
          'Height of Node $u$: Number of edges on the longest downward path from $u$ to a leaf.',
          'Height of Tree $H$: Maximum depth among all nodes in the tree.'
        ]
      },
      {
        title: 'Step 2: Binary Tree Taxonomies & Formulas',
        description: 'Binary trees are categorized into four standard structural types:',
        mathFormula: `Key Mathematical Invariants:
1. Strictly Binary (Full Binary) Tree Theorem:
   Every non-leaf node has exactly 2 children. If there are $I$ internal nodes, the number of leaves is:
   $$ L = I + 1 $$
   Total nodes $N = 2I + 1 = 2L - 1$.

2. Perfect Binary Tree:
   All internal nodes have 2 children and all leaves reside at exact depth $h$.
   Total nodes:
   $$ N = 2^{h+1} - 1, \\quad \\text{Leaf count: } L = 2^h $$

3. Complete Binary Tree:
   Every level except possibly the last is completely filled, and all nodes in the last level are packed as far left as possible.
   Array mapping for node at index $i$ (0-indexed):
   $$ \\text{Left Child} = 2i + 1, \\quad \\text{Right Child} = 2i + 2, \\quad \\text{Parent} = \\lfloor (i - 1) / 2 \\rfloor $$`,
        bulletPoints: [
          'Degenerate / Skewed Tree: Every node has only 1 child, collapsing the tree into a linear linked list with worst-case height $h = N - 1$.',
          'Extended Binary Tree (2-Tree): Replaces all NULL pointers with special square external/leaf nodes representing failed searches.'
        ]
      },
      {
        title: 'Step 3: Array Representation vs Linked Node Representation',
        description: 'Binary trees can be stored in two ways: (1) Flat Sequential Arrays (ideal for Complete/Heap trees where index formulas waste zero space), or (2) Pointer-linked structs where each node contains `left`, `data`, and `right` pointers.'
      }
    ],
    cstlReference: {
      header: '#include <memory>',
      declaration: 'struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};',
      commonMethods: [
        { method: 'countNodes(root)', description: 'Recursively returns 1 + count(left) + count(right)', complexity: 'O(N)' },
        { method: 'treeHeight(root)', description: 'Recursively returns 1 + max(height(left), height(right))', complexity: 'O(N)' },
        { method: 'countLeaves(root)', description: 'Recursively counts nodes where left==nullptr && right==nullptr', complexity: 'O(N)' }
      ],
      notes: [
        'A binary tree of height $h$ can have at most $2^{h+1} - 1$ nodes and at least $h + 1$ nodes.',
        'The minimum possible height for a binary tree with $N$ nodes is $\\lfloor \\log_2 N \\rfloor$.'
      ]
    },
    codeSnippets: [
      {
        language: 'c',
        title: 'C Node Structure & Recursive Tree Metrics',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

// Allocate a new node in heap
struct Node* createNode(int val) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    n->data = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

// Compute tree height (edges: empty tree is -1, 1 node is 0)
int getHeight(struct Node* root) {
    if (root == NULL) return -1;
    int lh = getHeight(root->left);
    int rh = getHeight(root->right);
    return (lh > rh ? lh : rh) + 1;
}

// Count total leaf nodes
int countLeaves(struct Node* root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1;
    return countLeaves(root->left) + countLeaves(root->right);
}`,
        explanation: 'Standard recursive traversal functions to calculate tree height and leaf counts in O(N) time.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-tree-fund-1',
        year: 'CUET 2024 & 2021',
        marks: 10,
        difficulty: 'Exam Classic',
        question: 'Prove by mathematical induction that for any non-empty strictly binary tree (where every non-leaf node has degree 2), the number of leaf nodes L is always equal to the number of internal nodes I plus one: L = I + 1.',
        solution: `Formal Inductive Proof:

Statement P(I): A strictly binary tree with I internal nodes has L = I + 1 leaf nodes.

1. Base Case (I = 0):
   A tree with 0 internal nodes consists of only the root node.
   - Number of internal nodes I = 0.
   - Number of leaf nodes L = 1.
   - Formula: L = I + 1 => 1 = 0 + 1 (True).
   The base case holds.

2. Induction Hypothesis:
   Assume the statement P(k) is true for all strictly binary trees with k internal nodes (where k >= 0). That is, L_k = k + 1.

3. Inductive Step (Prove P(k+1)):
   Consider a strictly binary tree T with k + 1 internal nodes.
   - Since k + 1 >= 1, T must have at least one internal node whose two children are both leaves (say leaf u and leaf v).
   - Remove these two leaves u and v.
   - The parent node (which was an internal node) now becomes a leaf node in the smaller tree T'.
   - In tree T':
     - Internal nodes count I' = (k + 1) - 1 = k.
     - Leaf nodes count L' = L - 2 (lost u, v) + 1 (parent became leaf) = L - 1.
   - By our Induction Hypothesis on T' (which has k internal nodes):
     L' = I' + 1
     L - 1 = k + 1
     L = (k + 1) + 1
     L = I + 1.

Conclusion:
By the principle of mathematical induction, L = I + 1 holds for all strictly binary trees with I >= 0 internal nodes. Q.E.D.`,
        keyTakeaway: 'Always state the base case (I=0, L=1), induction hypothesis, and the leaf-removal step to guarantee maximum marks.'
      }
    ],
    quizzes: [
      {
        id: 'tree-fund-q1',
        question: 'If a strictly binary tree has 25 internal nodes, how many leaf nodes does it have?',
        options: ['24', '25', '26', '50'],
        correctIndex: 2,
        explanation: 'By the strictly binary tree theorem, L = I + 1. Thus L = 25 + 1 = 26 leaves.',
        examTip: 'Remember the formula L = I + 1 for strictly binary trees.'
      },
      {
        id: 'tree-fund-q2',
        question: 'In a complete binary tree stored in an array, if a node is stored at index 6 (0-indexed), what are the indices of its left and right children?',
        options: ['12 and 13', '13 and 14', '11 and 12', '14 and 15'],
        correctIndex: 1,
        explanation: 'Left child is 2*i + 1 = 2*6 + 1 = 13. Right child is 2*i + 2 = 2*6 + 2 = 14.',
        examTip: 'Formula: Left = 2i + 1, Right = 2i + 2 (0-indexed).'
      },
      {
        id: 'tree-fund-q3',
        question: 'What is the maximum number of nodes in a binary tree of height `h` (where root node is at height 0)?',
        options: ['2^h - 1', '2^(h+1) - 1', '2^h', '2^(h-1) + 1'],
        correctIndex: 1,
        explanation: 'Summing nodes per level from level 0 to level h yields $1 + 2 + 4 + \\dots + 2^h = 2^{h+1} - 1$.',
        examTip: 'Height 0 = 1 node ($2^1 - 1$). Height 3 = 15 nodes ($2^4 - 1$).'
      },
      {
        id: 'tree-fund-q4',
        question: 'How does a Complete Binary Tree differ from a Full (Strict) Binary Tree?',
        options: [
          'A complete binary tree fills all levels except possibly the last level which is filled strictly from left to right; a full binary tree requires every node to have 0 or 2 children',
          'They are identical terms with zero difference',
          'A full binary tree must store elements in array order',
          'A complete binary tree has no leaf nodes'
        ],
        correctIndex: 0,
        explanation: 'Complete binary trees fill levels left-to-right (perfect for array heaps), whereas full/strictly binary trees forbid nodes from having only 1 child.',
        examTip: 'Heap array indexing depends on the complete binary tree structure.'
      },
      {
        id: 'tree-fund-q5',
        question: 'For a node at index `i = 7` in a 0-indexed complete binary tree array, what is the index of its parent node?',
        options: ['3', '2', '4', '6'],
        correctIndex: 0,
        explanation: 'Parent index = `(7 - 1) / 2 = 6 / 2 = 3`.',
        examTip: 'Always use integer division `floor((i-1)/2)` for 0-indexed parent index calculation.'
      }
    ]
  },
  {
    id: 'tree-traversals',
    categoryId: 'trees',
    subCategoryId: 'tree-fundamentals',
    title: 'Recursive & Iterative Tree Traversals',
    subtitle: 'Systematic Node Exploration: Inorder, Preorder, Postorder & Tree Reconstruction',
    icon: 'Shuffle',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Appears in every CUET CSE-241 exam paper. High-yield formats: (1) Step-by-step traces of Preorder, Inorder, and Postorder sequence strings, (2) Reconstructing a unique binary tree from given Inorder and Preorder/Postorder sequences, (3) Iterative stack simulation algorithms.',
    overview: 'Traversal is the process of visiting every single node in a tree exactly once in a systematic order. In linear structures, there is only one natural way to iterate (front to back). In trees, because each node can branch in two directions, we have Depth-First Traversals (Preorder, Inorder, Postorder) and Breadth-First Traversal (Level-Order using a FIFO queue).',
    timeComplexity: {
      access: '$\\mathcal{O}(N)$ visits all nodes',
      search: '$\\mathcal{O}(N)$',
      insertion: '$\\mathcal{O}(N)$',
      deletion: '$\\mathcal{O}(N)$',
      space: '$\\mathcal{O}(h)$ call stack space where $h = \\log N$ (balanced) or $N$ (worst)'
    },
    keyConcepts: [
      {
        title: 'Step 1: The Three Canonical Depth-First Traversals',
        description: 'All three traversals visit the Left subtree before the Right subtree, differing only in when the Current Node (N) is processed:',
        mathFormula: `Depth-First Traversal Orders:
1. Preorder (N - L - R): Visit Root Node $\\to$ Traverse Left Subtree $\\to$ Traverse Right Subtree.
2. Inorder (L - N - R): Traverse Left Subtree $\\to$ Visit Root Node $\\to$ Traverse Right Subtree.
   *Crucial Property: Inorder traversal of a Binary Search Tree (BST) produces strictly ascending sorted order!*
3. Postorder (L - R - N): Traverse Left Subtree $\\to$ Traverse Right Subtree $\\to$ Visit Root Node.`,
        bulletPoints: [
          'Preorder is used to clone/serialize trees and construct prefix expressions.',
          'Postorder is used for bottom-up tasks like calculating directory disk sizes and deleting trees from leaves up.',
          'Level-Order (Breadth-First): Visits level 0, level 1, level 2 from left to right using a FIFO Queue.'
        ]
      },
      {
        title: 'Step 2: Unique Tree Reconstruction from Traversals',
        description: 'Can we uniquely rebuild a binary tree given its traversal strings? Yes, provided INORDER is one of the given sequences!',
        bulletPoints: [
          'Why Inorder is required: Inorder splits nodes into those in the Left Subtree (left of root) and Right Subtree (right of root).',
          'Given Inorder + Preorder: The first character in Preorder is always the Root! Locate this root in Inorder to determine left and right subtrees. Recursively repeat.',
          'Given Inorder + Postorder: The last character in Postorder is always the Root! Locate this root in Inorder and repeat.'
        ]
      }
    ],
    cstlReference: {
      header: '#include <vector> / #include <stack> / #include <queue>',
      declaration: 'void inorder(TreeNode* root, std::vector<int>& out);',
      commonMethods: [
        { method: 'preorderTraversal(root)', description: 'Returns vector of node values in NLR order', complexity: 'O(N)' },
        { method: 'inorderTraversal(root)', description: 'Returns vector of node values in LNR order', complexity: 'O(N)' },
        { method: 'postorderTraversal(root)', description: 'Returns vector of node values in LRN order', complexity: 'O(N)' },
        { method: 'levelOrder(root)', description: 'Returns level-by-level nodes using FIFO queue', complexity: 'O(N)' }
      ],
      notes: [
        'Two traversals WITHOUT Inorder (e.g. Preorder + Postorder alone) CANNOT uniquely determine a binary tree if any node has only 1 child!'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Recursive & Iterative Inorder Traversal',
        code: `#include <iostream>
#include <vector>
#include <stack>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// 1. Recursive Inorder (LNR)
void inorderRecursive(TreeNode* root, std::vector<int>& res) {
    if (!root) return;
    inorderRecursive(root->left, res);
    res.push_back(root->val);
    inorderRecursive(root->right, res);
}

// 2. Iterative Inorder using Explicit Stack
std::vector<int> inorderIterative(TreeNode* root) {
    std::vector<int> res;
    std::stack<TreeNode*> st;
    TreeNode* curr = root;

    while (curr != nullptr || !st.empty()) {
        // Reach the leftmost node of current node
        while (curr != nullptr) {
            st.push(curr);
            curr = curr->left;
        }
        // Current must be NULL at this point
        curr = st.top();
        st.pop();
        res.push_back(curr->val);
        // Visit right subtree
        curr = curr->right;
    }
    return res;
}`,
        explanation: 'Demonstrates both natural recursion and non-recursive stack-based simulation of Inorder traversal.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-trav-1',
        year: 'CUET 2023 & 2019',
        marks: 12,
        difficulty: 'Exam Classic',
        question: 'Reconstruct the unique binary tree given the following traversal sequences:\nInorder:   D  B  H  E  I  A  F  C  G\nPreorder:  A  B  D  E  H  I  C  F  G',
        solution: `Step-by-Step Tree Reconstruction Algorithm:

Step 1: Identify the Root from Preorder:
- Preorder sequence begins with 'A' -> Root of the entire tree is 'A'.

Step 2: Partition Inorder around Root 'A':
- Inorder: [D, B, H, E, I] | A | [F, C, G]
- Left Subtree Nodes: {D, B, H, E, I} (Size = 5)
- Right Subtree Nodes: {F, C, G} (Size = 3)

Step 3: Partition Preorder for Left and Right Subtrees:
- Preorder Left Subtree: [B, D, E, H, I] (Next 5 elements after A)
- Preorder Right Subtree: [C, F, G] (Remaining 3 elements)

Step 4: Recursively Reconstruct Left Subtree:
- Root of Left Subtree is 'B' (first in Preorder Left).
- Inorder Left [D, B, H, E, I] partitioned around 'B':
  - Left of B: [D] (Leaf node D)
  - Right of B: [H, E, I]
- For subtree [H, E, I], Preorder is [E, H, I] -> Root is 'E'.
  - Inorder [H, E, I] partitioned around 'E': Left is [H] (leaf), Right is [I] (leaf).
  - So E has left child H and right child I.
- Left subtree structure: B has left child D, right child E (which has left H, right I).

Step 5: Recursively Reconstruct Right Subtree:
- Preorder Right: [C, F, G] -> Root of Right Subtree is 'C'.
- Inorder Right: [F, C, G] partitioned around 'C':
  - Left of C: [F] (Leaf node F)
  - Right of C: [G] (Leaf node G)
- So C has left child F and right child G.

Final Postorder Check:
Traversing our reconstructed tree in Postorder (L-R-N) yields:
D, H, I, E, B, F, G, C, A.`,
        keyTakeaway: 'Always verify your reconstructed tree by computing its Postorder sequence and double checking against both Inorder and Preorder inputs.'
      }
    ],
    quizzes: [
      {
        id: 'trav-q1',
        question: 'Which traversal sequence of a Binary Search Tree (BST) always outputs keys in strictly sorted ascending order?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
        correctIndex: 1,
        explanation: 'Inorder traversal visits Left Subtree (smaller keys), then Root, then Right Subtree (larger keys), producing sorted output.',
        examTip: 'Inorder of BST = Sorted Order.'
      },
      {
        id: 'trav-q2',
        question: 'Which pair of traversal sequences is sufficient to reconstruct a unique Binary Tree?',
        options: [
          'Preorder and Postorder',
          'Inorder and Preorder',
          'Level-order and Postorder without Inorder',
          'Only Preorder'
        ],
        correctIndex: 1,
        explanation: 'Inorder sequence is mandatory to separate left and right subtrees. Combined with Preorder (or Postorder), the unique binary tree can be constructed.',
        examTip: 'Without Inorder, Preorder + Postorder cannot uniquely resolve trees with single-child nodes.'
      },
      {
        id: 'trav-q3',
        question: 'Which traversal order processes the Root node LAST (Left -> Right -> Root)?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Breadth-First Search'],
        correctIndex: 2,
        explanation: 'Postorder processes both subtrees before visiting the parent node, making it ideal for bottom-up operations like tree deletion and expression evaluation.',
        examTip: 'Postorder = L - R - N (Root visited last).'
      },
      {
        id: 'trav-q4',
        question: 'What data structure is used to implement Level-Order traversal iteratively?',
        options: ['Stack', 'FIFO Queue', 'Priority Queue', 'Disjoint Set'],
        correctIndex: 1,
        explanation: 'Level-order traversal visits nodes level by level from left to right using a FIFO queue to buffer child nodes.',
        examTip: 'Level-order = Queue; Iterative DFS (Pre/In/Post) = Stack.'
      },
      {
        id: 'trav-q5',
        question: 'Given Preorder = [A, B, D, E, C] and Inorder = [D, B, E, A, C], what is the Root of the tree?',
        options: ['D', 'B', 'A', 'C'],
        correctIndex: 2,
        explanation: 'The first element of Preorder is ALWAYS the root of the tree (A). Looking at Inorder, [D, B, E] sit in A\'s left subtree, and [C] sits in A\'s right subtree.',
        examTip: 'Preorder first element = Root. Split Inorder around this root to find left/right subtrees.'
      }
    ]
  },
  {
    id: 'expression-threaded-trees',
    categoryId: 'trees',
    subCategoryId: 'tree-fundamentals',
    title: 'Expression Trees & Threaded Binary Trees',
    subtitle: 'Arithmetic AST Evaluation & Stackless Traversal via Pointer Threads',
    icon: 'Code2',
    importance: '⚡ HIGH',
    cuetExamRelevance: 'Module 1 & 5 syllabus. Key exam questions include: (1) Constructing Expression Trees from Postfix/Prefix expressions, (2) One-way vs Two-way Threaded Binary Tree representation, (3) Inorder predecessor/successor pointer rules.',
    overview: 'An Expression Tree is a specialized binary tree where internal nodes represent operators (+, -, *, /) and leaf nodes represent operands (variables or numbers). Evaluating the tree corresponds to recursive Postorder traversal. Meanwhile, a Threaded Binary Tree makes clever use of NULL pointers: in an N-node tree, exactly N+1 pointers are NULL. Threaded trees replace these wasted NULL links with "Threads" pointing to Inorder Predecessors and Successors, allowing complete tree traversal without recursion or call stacks!',
    timeComplexity: {
      access: '$\\mathcal{O}(N)$',
      search: '$\\mathcal{O}(N)$',
      insertion: '$\\mathcal{O}(1)$ to thread a new node',
      deletion: '$\\mathcal{O}(1)$ given node pointer',
      space: '$\\mathcal{O}(1)$ auxiliary traversal memory (zero stack frames!)'
    },
    keyConcepts: [
      {
        title: 'Step 1: Constructing and Evaluating Expression Trees',
        description: 'To build an Expression Tree from a Postfix string ($A B + C \\times$):',
        bulletPoints: [
          'Read postfix expression left-to-right.',
          'If an operand is scanned: Create a single-node tree and push its pointer onto a Stack.',
          'If an operator is scanned: Pop two tree nodes $T_2$ (right child) and $T_1$ (left child), create a new operator node with children $T_1$ and $T_2$, and push the new subtree back onto the Stack.',
          'The final remaining pointer on the stack is the Root of the Expression Tree.'
        ]
      },
      {
        title: 'Step 2: Threaded Binary Tree Architecture',
        description: 'In an $N$-node binary tree, there are $2N$ total pointer fields, of which exactly $N+1$ are NULL. Threaded trees replace these NULL links with boolean flags:',
        mathFormula: `Threaded Node Structure:
$$ [\\text{LTAG} \\mid \\text{LEFT} \\mid \\text{DATA} \\mid \\text{RIGHT} \\mid \\text{RTAG}] $$

Flag Invariants:
- $\\text{LTAG} = 0$: LEFT points to real Left Child.
- $\\text{LTAG} = 1$: LEFT is a Thread pointing to Inorder Predecessor.
- $\\text{RTAG} = 0$: RIGHT points to real Right Child.
- $\\text{RTAG} = 1$: RIGHT is a Thread pointing to Inorder Successor.`,
        bulletPoints: [
          'Fully (Two-Way) Threaded Tree: Both NULL left and NULL right pointers are replaced with predecessor and successor threads.',
          'Advantage: Can traverse the entire tree forwards and backwards in $\\mathcal{O}(N)$ time using $\\mathcal{O}(1)$ extra memory.'
        ]
      }
    ],
    cstlReference: {
      header: '#include <cstddef>',
      declaration: 'struct ThreadedNode {\n    int data;\n    ThreadedNode* left;\n    ThreadedNode* right;\n    bool ltag; // true if thread to predecessor\n    bool rtag; // true if thread to successor\n};',
      commonMethods: [
        { method: 'inorderSuccessor(node)', description: 'Returns next node in Inorder sequence in O(1) or O(h)', complexity: 'O(1) avg' },
        { method: 'inorderTraversal(root)', description: 'Stackless traversal using right threads', complexity: 'O(N) time, O(1) space' }
      ],
      notes: [
        'The rightmost leaf in a threaded tree has RTAG = 1 and points to the Header node (or NULL).',
        'Threaded trees eliminate the risk of Call Stack Overflow during deep traversals.'
      ]
    },
    codeSnippets: [
      {
        language: 'c',
        title: 'C Function: Inorder Successor in Threaded Binary Tree',
        code: `struct ThreadedNode {
    int data;
    struct ThreadedNode *left, *right;
    int ltag, rtag; // 1 if thread, 0 if child
};

// Find inorder successor of node P in O(1) if thread exists
struct ThreadedNode* inorderSuccessor(struct ThreadedNode* p) {
    if (p->rtag == 1) {
        // Direct thread pointer to successor!
        return p->right;
    }
    // Otherwise, successor is the leftmost node in right subtree
    p = p->right;
    while (p != NULL && p->ltag == 0) {
        p = p->left;
    }
    return p;
}

// Complete Stackless Inorder Traversal
void traverseThreaded(struct ThreadedNode* root) {
    if (!root) return;
    struct ThreadedNode* curr = root;
    // Go to leftmost node
    while (curr->ltag == 0) {
        curr = curr->left;
    }
    while (curr != NULL) {
        printf("%d ", curr->data);
        curr = inorderSuccessor(curr);
    }
}`,
        explanation: 'Traverses all nodes in sorted order using threads with zero recursive call stack memory.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-exp-th-1',
        year: 'CUET 2022',
        marks: 10,
        difficulty: 'Medium',
        question: 'Explain the concept of Threaded Binary Trees. Draw a fully (two-way) Inorder Threaded Binary Tree for the expression tree of (A + B) * (C - D).',
        solution: `1. Concept & Motivation:
In standard binary trees of N nodes, N+1 pointer fields store NULL, representing 50%+ wasted space. Threaded trees replace NULL pointers with threads pointing to:
- Left Thread: Points to Inorder Predecessor.
- Right Thread: Points to Inorder Successor.
- Flags: LTAG (0=child, 1=thread), RTAG (0=child, 1=thread).

2. Expression Tree for (A + B) * (C - D):
- Root: '*'
- Left Subtree: '+' with left child 'A', right child 'B'
- Right Subtree: '-' with left child 'C', right child 'D'

Inorder Traversal: A  +  B  *  C  -  D

3. Thread Assignments:
- Node 'A' (leaf): LTAG=1 (left points to NULL/Header), RTAG=1 (right thread points to Inorder successor '+').
- Node 'B' (leaf): LTAG=1 (left thread points to Inorder predecessor '+'), RTAG=1 (right thread points to Inorder successor '*').
- Node 'C' (leaf): LTAG=1 (left thread points to Inorder predecessor '*'), RTAG=1 (right thread points to Inorder successor '-').
- Node 'D' (leaf): LTAG=1 (left thread points to Inorder predecessor '-'), RTAG=1 (right thread points to NULL/Header).

Result: The entire tree can now be traversed in exact Inorder without maintaining any stack!`,
        keyTakeaway: 'Always state that in an N-node tree, exactly N+1 NULL pointers exist and are repurposed into threads.'
      }
    ],
    quizzes: [
      {
        id: 'exp-th-q1',
        question: 'How many total NULL pointers exist in a standard binary tree containing N nodes?',
        options: ['N', 'N - 1', 'N + 1', '2N'],
        correctIndex: 2,
        explanation: 'Total pointers = 2N. Nodes with parents = N - 1 edges. NULL pointers = 2N - (N - 1) = N + 1.',
        examTip: 'Formula: Exactly N + 1 NULL pointers exist in any binary tree of N nodes.'
      },
      {
        id: 'exp-th-q2',
        question: 'In a Right In-Threaded Binary Tree, what does a right thread pointer (where RTAG = 1) point to?',
        options: [
          'The node\'s Inorder Successor',
          'The node\'s Inorder Predecessor',
          'The Root node',
          'The Left Child'
        ],
        correctIndex: 0,
        explanation: 'A right thread (RTAG = 1) points directly to the Inorder Successor of the node, allowing immediate advance without stack backtracking.',
        examTip: 'Right thread = Inorder Successor; Left thread = Inorder Predecessor.'
      },
      {
        id: 'exp-th-q3',
        question: 'Evaluating an Expression Tree in Postorder (L-R-N) produces which algebraic notation?',
        options: ['Infix Notation', 'Postfix (Reverse Polish) Notation', 'Prefix (Polish) Notation', 'Multi-dimensional Matrix'],
        correctIndex: 1,
        explanation: 'Postorder traversal visits left operand, right operand, then operator, yielding Postfix notation (e.g. `A B +`).',
        examTip: 'Preorder = Prefix; Inorder = Infix; Postorder = Postfix.'
      },
      {
        id: 'exp-th-q4',
        question: 'What is the main benefit of Threaded Binary Trees over standard Binary Trees?',
        options: [
          'Faster search time than O(log N)',
          'Inorder traversal requires O(1) extra stack space instead of O(h) recursion stack',
          'They store duplicate keys automatically',
          'They double the capacity of nodes'
        ],
        correctIndex: 1,
        explanation: 'Threaded trees eliminate stack/recursion memory for traversals by storing predecessor/successor pointers in empty NULL pointer fields.',
        examTip: 'Threaded trees enable stackless O(1) space traversal.'
      },
      {
        id: 'exp-th-q5',
        question: 'In an Expression Tree for `(A * B) + (C / D)`, what is stored at the Root node?',
        options: ['*', '/', '+', 'A'],
        correctIndex: 2,
        explanation: 'The main addition operation `+` joins the two sub-expressions `(A * B)` and `(C / D)`, making `+` the root operator.',
        examTip: 'Lowest precedence operator outside parentheses sits at the root of the expression tree.'
      }
    ]
  },
  {
    id: 'bst-rbt',
    categoryId: 'trees',
    subCategoryId: 'bst-and-balanced',
    title: 'Binary Search Trees (BST & Deletion)',
    subtitle: 'Ordered Key Invariants, Search Paths & The 3-Case Node Deletion Algorithm',
    icon: 'Search',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Heavily tested in Module 1 (BST operations & 3 deletion cases). Typical questions: (1) Step-by-step BST construction from key stream, (2) Deleting nodes with 2 children using Inorder Successor vs Predecessor, (3) Worst-case skew analysis.',
    overview: 'A Binary Search Tree (BST) is a binary tree where every node enforces a strict ordering rule: all keys in a node’s left subtree are strictly smaller than the node’s key, and all keys in its right subtree are strictly greater. This allows binary search logic ($\mathcal{O}(\log N)$ time) on dynamic data. The most critical algorithm to master is BST Node Deletion, which handles 3 distinct structural cases.',
    timeComplexity: {
      access: '$\\mathcal{O}(\\log N)$ average / $\\mathcal{O}(N)$ worst-case skewed',
      search: '$\\mathcal{O}(\\log N)$ average / $\\mathcal{O}(N)$ worst-case skewed',
      insertion: '$\\mathcal{O}(\\log N)$ average / $\\mathcal{O}(N)$ worst-case skewed',
      deletion: '$\\mathcal{O}(\\log N)$ average / $\\mathcal{O}(N)$ worst-case skewed',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: The BST Ordering Invariant',
        description: 'For every node $u$ in a Binary Search Tree:',
        mathFormula: `$$ \\forall x \\in \\text{Left}(u) \\implies \\text{key}(x) < \\text{key}(u) \\quad \\text{and} \\quad \\forall y \\in \\text{Right}(u) \\implies \\text{key}(y) > \\text{key}(u) $$`,
        bulletPoints: [
          'Inorder Traversal: Always visits keys in strictly increasing sorted order.',
          'Search: Compare search key with current node: if equal, found! If smaller, branch left; if greater, branch right.',
          'Worst-case Skew: If keys are inserted in sorted order (e.g. 10, 20, 30, 40), the BST degrades into a linear linked list with $\\mathcal{O}(N)$ operations.'
        ]
      },
      {
        title: 'Step 2: The Three BST Deletion Cases',
        description: 'When deleting a target node $Z$ from a BST, three cases arise depending on $Z$\'s degree:',
        bulletPoints: [
          'Case 1 ($Z$ is a Leaf node): Simply disconnect $Z$ from its parent and free its memory (set parent\'s child pointer to NULL).',
          'Case 2 ($Z$ has exactly One Child): Bypass $Z$ by linking $Z$\'s parent directly to $Z$\'s only child, then free $Z$.',
          'Case 3 ($Z$ has Two Children): Find $Z$\'s Inorder Successor $S$ (the smallest node in $Z$\'s right subtree) or Inorder Predecessor $P$. Copy $S$\'s key into $Z$, and recursively delete node $S$ (which is guaranteed to have at most 1 child!).'
        ]
      }
    ],
    cstlReference: {
      header: '#include <set> / #include <map>',
      declaration: 'TreeNode* deleteNode(TreeNode* root, int key);',
      commonMethods: [
        { method: 'searchBST(root, val)', description: 'Searches for val in O(h) time', complexity: 'O(h)' },
        { method: 'insertBST(root, val)', description: 'Inserts val at leaf position in O(h)', complexity: 'O(h)' },
        { method: 'deleteBST(root, val)', description: 'Deletes val using 3-case deletion logic', complexity: 'O(h)' },
        { method: 'minValueNode(root)', description: 'Finds minimum key by following left pointers to leaf', complexity: 'O(h)' }
      ],
      notes: [
        'Inorder Successor of a node with a right child is the leftmost node in its right subtree.'
      ]
    },
    codeSnippets: [
      {
        language: 'c',
        title: 'C Complete BST 3-Case Deletion Function (Exam Classic)',
        code: `struct Node {
    int key;
    struct Node *left, *right;
};

// Helper: Find node with minimum key value in subtree
struct Node* findMin(struct Node* node) {
    struct Node* curr = node;
    while (curr && curr->left != NULL)
        curr = curr->left;
    return curr;
}

// Complete 3-case BST Deletion
struct Node* deleteNode(struct Node* root, int key) {
    if (root == NULL) return root;

    if (key < root->key) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->key) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node found! Handle the 3 cases:

        // Case 1 & Case 2: Node with 0 or 1 child
        if (root->left == NULL) {
            struct Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct Node* temp = root->left;
            free(root);
            return temp;
        }

        // Case 3: Node with 2 children
        // Get inorder successor (smallest in right subtree)
        struct Node* temp = findMin(root->right);
        root->key = temp->key; // Copy successor's key into root
        // Delete the successor from right subtree
        root->right = deleteNode(root->right, temp->key);
    }
    return root;
}`,
        explanation: 'Standard recursive implementation covering all 3 deletion cases with memory cleanup.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-bst-1',
        year: 'CUET 2025 & 2023',
        marks: 12,
        difficulty: 'Exam Classic',
        question: 'Insert keys into an empty BST in the following order: 50, 30, 70, 20, 40, 60, 80. (a) Draw the resulting BST. (b) Trace the deletion of key 50 using its Inorder Successor.',
        solution: `Part (a): Step-by-Step BST Construction:
- Insert 50: Root = 50.
- Insert 30: 30 < 50 -> Left child of 50.
- Insert 70: 70 > 50 -> Right child of 50.
- Insert 20: 20 < 50, 20 < 30 -> Left child of 30.
- Insert 40: 40 < 50, 40 > 30 -> Right child of 30.
- Insert 60: 60 > 50, 60 < 70 -> Left child of 70.
- Insert 80: 80 > 50, 80 > 70 -> Right child of 70.

Tree Structure:
         50
       /    \\
     30      70
    /  \\    /  \\
   20  40  60  80

Part (b): Deleting Root Key 50 (Case 3: Two Children):
1. Locate Inorder Successor of 50:
   - Branch into right subtree at 70.
   - Follow leftmost pointer -> Node 60.
   - Inorder Successor is 60.
2. Copy Key: Replace root key 50 with 60.
3. Delete Node 60 from right subtree:
   - Node 60 is a leaf node (Case 1).
   - Set 70's left pointer to NULL and free node 60.

Final Tree Structure after Deletion of 50:
         60
       /    \\
     30      70
    /  \\       \\
   20  40       80`,
        keyTakeaway: 'In Case 3 deletion, always specify the Inorder Successor (leftmost node in right subtree) and show how it is copied and deleted.'
      }
    ],
    quizzes: [
      {
        id: 'bst-q1',
        question: 'When deleting a node with two children from a BST, what node can replace its value to maintain the BST invariant?',
        options: [
          'Any random leaf node in the tree',
          'Its Inorder Successor or Inorder Predecessor',
          'Its Left Child',
          'Its Parent Node'
        ],
        correctIndex: 1,
        explanation: 'The Inorder Successor (smallest key in right subtree) or Inorder Predecessor (largest key in left subtree) preserves all relative ordering invariants.',
        examTip: 'Inorder successor = min of right subtree. Inorder predecessor = max of left subtree.'
      },
      {
        id: 'bst-q2',
        question: 'What is the worst-case search time complexity in an unbalanced Binary Search Tree (BST) of N nodes?',
        options: ['O(log N)', 'O(N)', 'O(1)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'If keys are inserted in sorted order (e.g. 1, 2, 3, 4, 5), the BST degrades into a linear single-chain linked list with height N - 1, leading to O(N) search time.',
        examTip: 'Balanced BST search = O(log N); Degenerate skew BST search = O(N).'
      },
      {
        id: 'bst-q3',
        question: 'Where is the MINIMUM key located in any valid Binary Search Tree (BST)?',
        options: [
          'At the Root node',
          'At the leftmost node (reached by repeatedly following left child pointers from the root)',
          'At the rightmost leaf node',
          'At the middle index of the array'
        ],
        correctIndex: 1,
        explanation: 'By the BST invariant, left children are always strictly smaller than parents. Walking left as far as possible finds the minimum key.',
        examTip: 'Min key = leftmost node. Max key = rightmost node.'
      },
      {
        id: 'bst-q4',
        question: 'How is a node with ONE child deleted from a Binary Search Tree (Case 2 deletion)?',
        options: [
          'By removing the entire subtree below it',
          'By bypassing the node, linking its parent directly to its single child, and deleting the node',
          'By swapping it with the root node',
          'By setting its value to 0'
        ],
        correctIndex: 1,
        explanation: 'In Case 2 (1 child), the node\'s parent adopts the single child directly, preserving BST order.',
        examTip: 'Case 1 = leaf delete; Case 2 = parent adopts single child; Case 3 = replace with Inorder Successor/Predecessor.'
      },
      {
        id: 'bst-q5',
        question: 'Which sequence of key insertions into an empty BST will produce a degenerate right-skewed tree of height 4?',
        options: [
          '[50, 30, 70, 20]',
          '[10, 20, 30, 40, 50]',
          '[40, 20, 60, 10]',
          '[30, 50, 20, 40]'
        ],
        correctIndex: 1,
        explanation: 'Inserting strictly ascending numbers [10, 20, 30, 40, 50] forces every new node to become the right child of the previous node, building a straight line.',
        examTip: 'Sorted inputs degrade simple BSTs into linear linked lists.'
      }
    ]
  },
  {
    id: 'avl-tree',
    categoryId: 'trees',
    subCategoryId: 'bst-and-balanced',
    title: 'AVL Trees & Height-Balancing Rotations',
    subtitle: 'Strict Height Invariants, Balance Factors & The 4 Canonical Rebalancing Rotations',
    icon: 'ShieldCheck',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Tested in 100% of CUET exam cycles (15–20 marks). Mandatory questions on: (1) Calculating Balance Factors $BF = h_L - h_R$, (2) Performing LL, RR, LR, and RL rotations step-by-step, (3) Minimum nodes formula for height $h$ ($N(h) = N(h-1) + N(h-2) + 1$).',
    overview: 'Named after inventors Adelson-Velsky and Landis (1962), an AVL Tree is a self-balancing Binary Search Tree. While an ordinary BST can degrade into a slow $\mathcal{O}(N)$ linked list, an AVL tree enforces a strict height-balance property: for every node, the heights of its left and right subtrees differ by at most 1. When an insertion or deletion violates this invariant ($|BF| > 1$), the tree restores balance using 4 canonical local rotations in $\mathcal{O}(1)$ time.',
    timeComplexity: {
      access: '$\\mathcal{O}(\\log N)$ guaranteed',
      search: '$\\mathcal{O}(\\log N)$ guaranteed',
      insertion: '$\\mathcal{O}(\\log N)$ including at most 1 rotation',
      deletion: '$\\mathcal{O}(\\log N)$ including at most $\\mathcal{O}(\\log N)$ rotations',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: The AVL Balance Factor Invariant',
        description: 'For every node $u$ in an AVL tree, the Balance Factor $BF(u)$ is defined as:',
        mathFormula: `$$ BF(u) = \\text{Height}(\\text{LeftSubtree}(u)) - \\text{Height}(\\text{RightSubtree}(u)) $$
AVL Balance Requirement:
$$ BF(u) \\in \\{-1, 0, +1\\} $$

If $BF(u) \\ge +2$ (Left-Heavy) or $BF(u) \\le -2$ (Right-Heavy), node $u$ is Critical and must be rebalanced immediately!`,
        bulletPoints: [
          'Height of empty tree is $-1$; Height of a single leaf node is $0$.'
        ]
      },
      {
        title: 'Step 2: The 4 Canonical Rebalancing Rotations',
        description: 'Depending on where the newly inserted key was placed relative to the critical unbalanced node $A$:',
        mathFormula: `1. LL Rotation (Single Right Rotation):
   New key inserted into Left subtree of Left child of $A$.
   Action: Right rotate node $A$.

2. RR Rotation (Single Left Rotation):
   New key inserted into Right subtree of Right child of $A$.
   Action: Left rotate node $A$.

3. LR Rotation (Double Rotation: Left then Right):
   New key inserted into Right subtree of Left child of $A$.
   Action: Left rotate Left child $B$, then Right rotate node $A$.

4. RL Rotation (Double Rotation: Right then Left):
   New key inserted into Left subtree of Right child of $A$.
   Action: Right rotate Right child $B$, then Left rotate node $A$.`,
        bulletPoints: [
          'All 4 rotations execute in $\\mathcal{O}(1)$ time by reconnecting 3-4 pointer links.',
          'Rotations strictly preserve the BST Inorder key ordering.'
        ]
      },
      {
        title: 'Step 3: Minimum Nodes in AVL Tree of Height H (Fibonacci Trees)',
        description: 'The minimum number of nodes $N(h)$ required to build an AVL tree of height $h$ satisfies the recurrence:',
        mathFormula: `$$ N(0) = 1, \\quad N(1) = 2, \\quad N(h) = N(h-1) + N(h-2) + 1 $$
This proves that AVL height is strictly bounded by:
$$ h < 1.44 \\log_2(N + 2) - 0.328 \\implies \\mathcal{O}(\\log N) $$`
      }
    ],
    cstlReference: {
      header: '#include <algorithm>',
      declaration: 'struct AVLNode {\n    int key, height;\n    AVLNode *left, *right;\n};',
      commonMethods: [
        { method: 'rightRotate(y)', description: 'Performs single LL right rotation in O(1)', complexity: 'O(1)' },
        { method: 'leftRotate(x)', description: 'Performs single RR left rotation in O(1)', complexity: 'O(1)' },
        { method: 'getBalance(node)', description: 'Returns height(left) - height(right)', complexity: 'O(1)' },
        { method: 'insert(node, key)', description: 'Inserts key and self-balances along return path', complexity: 'O(log N)' }
      ],
      notes: [
        'An insertion requires at most ONE rotation (single or double) to restore balance for the whole tree.',
        'A deletion may trigger up to $\\mathcal{O}(\\log N)$ rotations traveling all the way up to the root.'
      ]
    },
    codeSnippets: [
      {
        language: 'c',
        title: 'C Implementation of AVL Tree Rotations & Insertion',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key, height;
    struct Node *left, *right;
};

int max(int a, int b) { return (a > b) ? a : b; }

int height(struct Node *N) {
    if (N == NULL) return 0;
    return N->height;
}

int getBalance(struct Node *N) {
    if (N == NULL) return 0;
    return height(N->left) - height(N->right);
}

// Single Right Rotation (LL)
struct Node *rightRotate(struct Node *y) {
    struct Node *x = y->left;
    struct Node *T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;

    return x;
}

// Single Left Rotation (RR)
struct Node *leftRotate(struct Node *x) {
    struct Node *y = x->right;
    struct Node *T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;

    return y;
}

// Insert and balance
struct Node* insert(struct Node* node, int key) {
    if (node == NULL) {
        struct Node* n = (struct Node*)malloc(sizeof(struct Node));
        n->key = key; n->left = n->right = NULL; n->height = 1;
        return n;
    }

    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    else
        return node; // Duplicate keys not allowed

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = getBalance(node);

    // 4 Rotation Cases:
    if (balance > 1 && key < node->left->key)
        return rightRotate(node); // LL Case
    if (balance < -1 && key > node->right->key)
        return leftRotate(node);  // RR Case
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left); // LR Case
        return rightRotate(node);
    }
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right); // RL Case
        return leftRotate(node);
    }

    return node;
}`,
        explanation: 'Self-contained C code implementing the 4 rotation cases and maintaining AVL balance factors.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-avl-1',
        year: 'CUET 2024 & 2022',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Construct an AVL tree by inserting the following keys in sequence: 10, 20, 30, 40, 50, 25. Clearly show the Balance Factor (BF) of all nodes and state which rotations (LL, RR, LR, RL) are applied at each step.',
        solution: `Step-by-Step AVL Construction Trace:

1. Insert 10: Root [10, BF=0].
2. Insert 20: 10 has right child 20.
   - Node 10: BF = -1. Node 20: BF = 0. Balanced.
3. Insert 30: 20 has right child 30.
   - Node 10: BF = -2 (Unbalanced!). Critical node = 10.
   - Imbalance type: Right-Right (RR Case) since 30 is in right subtree of right child 20.
   - Action: Single Left Rotation at node 10.
   - Result Subtree: 20 becomes Root, with left child 10 and right child 30.
   - All BF = 0.

4. Insert 40: Right child of 30.
   - Node 20: BF = -1. Node 30: BF = -1. Node 40: BF = 0. Balanced.

5. Insert 50: Right child of 40.
   - Node 30: BF = -2 (Unbalanced!). Critical node = 30.
   - Imbalance type: Right-Right (RR Case).
   - Action: Single Left Rotation at node 30.
   - Result Subtree: 40 becomes parent of 30 (left) and 50 (right).
   - Tree Structure: 20 [BF=-1] -> Left: 10 [BF=0], Right: 40 [BF=0] -> (30, 50).

6. Insert 25: Inserted as left child of 30.
   - Check BFs from bottom up:
     - Node 30: BF = +1.
     - Node 40: BF = +1 (Left height 2, Right height 1).
     - Node 20: Left height = 1 (node 10), Right height = 3 (path 40->30->25).
     - BF(20) = 1 - 3 = -2 (Unbalanced!). Critical node = 20.
   - Imbalance type: Right-Left (RL Case) because 25 was added to the left of right child 40.
   - Action: Double Rotation (RL Case):
     Step A: Right rotate around right child 40 -> 30 moves up.
     Step B: Left rotate around critical root 20 -> 30 becomes the new Root!

Final AVL Tree:
            30 [BF=0]
          /          \\
      20 [BF=0]      40 [BF=-1]
     /      \\           \\
   10 [0]   25 [0]      50 [0]

All nodes satisfy |BF| <= 1. Tree is perfectly balanced!`,
        keyTakeaway: 'Always write down the Balance Factor BF = hL - hR after each insert. Identify the lowest critical node where |BF| == 2.'
      }
    ],
    quizzes: [
      {
        id: 'avl-q1',
        question: 'What is the minimum number of nodes required in an AVL tree of height h = 3 (where a single root node has height 0)?',
        options: ['4', '7', '8', '10'],
        correctIndex: 1,
        explanation: 'Using the recurrence N(h) = N(h-1) + N(h-2) + 1: N(0)=1, N(1)=2, N(2)=2+1+1=4, N(3)=4+2+1=7 nodes.',
        examTip: 'Minimum AVL nodes follow Fibonacci-like sequence: 1, 2, 4, 7, 12, 20...'
      },
      {
        id: 'avl-q2',
        question: 'What is the valid range of the Balance Factor `BF = height(Left) - height(Right)` for every node in a balanced AVL tree?',
        options: [
          'BF ∈ {-1, 0, +1}',
          'BF ∈ {-2, 0, +2}',
          'BF ∈ {0, 1, 2}',
          'BF ∈ {-∞, +∞}'
        ],
        correctIndex: 0,
        explanation: 'An AVL tree strictly maintains $|BF| \\le 1$ for all nodes. If $BF = +2$ or $BF = -2$, a rotation is triggered immediately.',
        examTip: 'Allowed AVL Balance Factors are strictly -1, 0, or +1.'
      },
      {
        id: 'avl-q3',
        question: 'Which rotation sequence fixes a Left-Right (LR) imbalance case in an AVL tree?',
        options: [
          'Single Right Rotation',
          'Single Left Rotation',
          'Left Rotation on left child, followed by Right Rotation on critical root node',
          'Right Rotation on right child, followed by Left Rotation on critical root node'
        ],
        correctIndex: 2,
        explanation: 'An LR imbalance is double-heavy: first perform a Left Rotation on the left child to convert it to an LL case, then perform a Right Rotation on the critical root node.',
        examTip: 'LR Case = Left Rotate child, then Right Rotate root.'
      },
      {
        id: 'avl-q4',
        question: 'What is the maximum height of an AVL tree containing N nodes?',
        options: ['N', '1.44 log2 N', 'log2 N', 'N / 2'],
        correctIndex: 1,
        explanation: 'Because AVL trees enforce strict balance ($|BF| \\le 1$), the maximum tree height is strictly bounded by $h \\le 1.44 \\log_2 N$.',
        examTip: 'AVL tree height is guaranteed strictly $\\le 1.44 \\log_2 N$.'
      },
      {
        id: 'avl-q5',
        question: 'If inserting a key into an AVL tree causes node X to have Balance Factor `BF(X) = -2` and its right child Y to have `BF(Y) = -1`, which rotation is required?',
        options: ['Single Left Rotation at X', 'Single Right Rotation at X', 'Left-Right Double Rotation', 'Right-Left Double Rotation'],
        correctIndex: 0,
        explanation: 'Both BFs have the same sign (-2 and -1), indicating a pure Right-Right (RR) linear imbalance. A Single Left Rotation at node X restores balance.',
        examTip: 'Same sign BFs (-2, -1 or +2, +1) = Single Rotation. Opposite sign BFs = Double Rotation.'
      }
    ]
  },
  {
    id: 'red-black-tree',
    categoryId: 'trees',
    subCategoryId: 'bst-and-balanced',
    title: 'Red-Black Trees & Balancing Rules',
    subtitle: 'Color Invariants, Black-Height Guarantees & Rebalancing Case Invariants',
    icon: 'Award',
    importance: '⚡ HIGH',
    cuetExamRelevance: 'Module 1 & C++ STL architecture. Exam relevance: (1) Formally stating the 5 Red-Black tree properties, (2) Proving height bound $h \\le 2\\log_2(N+1)$, (3) Explaining why C++ STL (`std::set`, `std::map`) chooses Red-Black trees over AVL trees.',
    overview: 'A Red-Black Tree is a self-balancing Binary Search Tree where each node carries an extra bit representing its Color (Red or Black). By constraining how nodes are colored on any path from root to leaf, Red-Black trees guarantee that no path is more than twice as long as any other path, ensuring the tree remains approximately balanced with height $\mathcal{O}(\log N)$. Because Red-Black trees require fewer rotations during insertions and deletions than strictly balanced AVL trees, they are the industry standard for C++ `std::set`, `std::map`, and Linux kernel schedulers.',
    timeComplexity: {
      access: '$\\mathcal{O}(\\log N)$ guaranteed',
      search: '$\\mathcal{O}(\\log N)$ guaranteed',
      insertion: '$\\mathcal{O}(\\log N)$ with at most 2 rotations',
      deletion: '$\\mathcal{O}(\\log N)$ with at most 3 rotations',
      space: '$\\mathcal{O}(N)$ (only 1 extra bit per node for color)'
    },
    keyConcepts: [
      {
        title: 'Step 1: The 5 Golden Red-Black Tree Invariants',
        description: 'A binary search tree is a valid Red-Black Tree if and only if it satisfies all 5 fundamental properties:',
        mathFormula: `The 5 Red-Black Properties:
1. Node Color: Every node is either RED or BLACK.
2. Root Property: The Root is always BLACK.
3. Leaf Property: Every leaf (NIL external node) is BLACK.
4. Red Property: If a node is RED, then both of its children must be BLACK (No two consecutive RED nodes on any path!).
5. Black-Height Property: For each node, all paths from the node to descendant NIL leaves contain the EXACT SAME number of Black nodes (denoted $bh(u)$).`,
        bulletPoints: [
          'Black-Height $bh(u)$: Number of black nodes from $u$ down to a leaf (not counting $u$ itself).'
        ]
      },
      {
        title: 'Step 2: Mathematical Proof of Height Bound $h \\le 2\\log_2(N+1)$',
        description: 'Because property 4 forbids consecutive red nodes, on the longest path red and black nodes must alternate (B - R - B - R...), meaning at least half the nodes on any path are Black:',
        mathFormula: `$$ \\text{Minimum nodes in subtree of root with black-height } bh: \\quad N \\ge 2^{bh} - 1 $$
Since $bh \\ge h / 2$:
$$ N \\ge 2^{h/2} - 1 \\implies h \\le 2 \\log_2(N + 1) $$`
      },
      {
        title: 'Step 3: AVL Tree vs Red-Black Tree Comparison',
        description: 'Why do production systems prefer Red-Black Trees over AVL Trees?',
        bulletPoints: [
          'AVL Trees are strictly balanced ($|BF| \\le 1$): Faster lookup time (shallower depth), but more rotations during insertions and deletions.',
          'Red-Black Trees are relaxed balanced: At most 2 rotations on insert, at most 3 rotations on delete! Ideal for write-heavy associative containers like `std::map`.'
        ]
      }
    ],
    cstlReference: {
      header: '#include <set> / #include <map>',
      declaration: 'enum Color { RED, BLACK };\nstruct RBNode {\n    int val;\n    Color color;\n    RBNode *left, *right, *parent;\n};',
      commonMethods: [
        { method: 'std::set<T>', description: 'Implemented using Red-Black Tree in libstdc++', complexity: 'O(log N)' },
        { method: 'std::map<K, V>', description: 'Key-value map using Red-Black Tree', complexity: 'O(log N)' }
      ],
      notes: [
        'Red-Black trees require only 1 bit per node to store color, compared to 2 bytes for balance factors in AVL trees.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Red-Black Node Structure & Invariant Validation',
        code: `#include <iostream>

enum Color { RED, BLACK };

struct RBNode {
    int data;
    Color color;
    RBNode *left, *right, *parent;
    RBNode(int val) : data(val), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}
};

// Check if Red property is satisfied (no two consecutive reds)
bool checkRedProperty(RBNode* root) {
    if (!root) return true;
    if (root->color == RED) {
        if (root->left && root->left->color == RED) return false;
        if (root->right && root->right->color == RED) return false;
    }
    return checkRedProperty(root->left) && checkRedProperty(root->right);
}`,
        explanation: 'Structure of Red-Black node and validation logic for Red node coloring constraints.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-rbt-1',
        year: 'CUET 2023 & 2021',
        marks: 10,
        difficulty: 'Medium',
        question: 'State the five properties of a Red-Black Tree. Prove that a Red-Black tree with N internal nodes has height at most 2 * log2(N + 1).',
        solution: `1. The 5 Properties of Red-Black Trees:
- Property 1: Every node is either RED or BLACK.
- Property 2: The root is BLACK.
- Property 3: Every leaf (NIL node) is BLACK.
- Property 4: If a node is RED, both of its children must be BLACK (No consecutive REDs).
- Property 5: For each node, all paths to descendant leaves contain the same number of BLACK nodes (Black-Height).

2. Mathematical Proof of Height Bound:
- Claim: The subtree rooted at any node x contains at least 2^(bh(x)) - 1 internal nodes.
  - Base case: If height of x is 0, x is a NIL leaf. bh(x) = 0. Internal nodes = 2^0 - 1 = 0 (True).
  - Inductive step: Assume true for nodes with height < h.
    Node x has two children, each with black-height either bh(x) (if child is red) or bh(x) - 1 (if child is black).
    By induction hypothesis, each child has at least 2^(bh(x)-1) - 1 internal nodes.
    Total internal nodes in x's subtree:
    N >= (2^(bh(x)-1) - 1) + (2^(bh(x)-1) - 1) + 1 = 2 * 2^(bh(x)-1) - 1 = 2^(bh(x)) - 1.
- Height Relation:
  By Property 4, no two RED nodes can be adjacent. Thus, on any path from root to leaf, at least half the nodes are BLACK.
  Therefore: bh(root) >= h / 2.
  Substituting into our node bound:
  N >= 2^(h/2) - 1
  N + 1 >= 2^(h/2)
  log2(N + 1) >= h / 2
  h <= 2 * log2(N + 1). Q.E.D.`,
        keyTakeaway: 'Always write down the 5 properties clearly and state the induction on black-height bh(x).'
      }
    ],
    quizzes: [
      {
        id: 'rbt-q1',
        question: 'What is the maximum number of rotations required during an insertion in a Red-Black Tree to restore balance?',
        options: ['1', '2', 'log N', 'N'],
        correctIndex: 1,
        explanation: 'An insertion in a Red-Black tree requires at most 2 rotations (and some recoloring) to fix all violations.',
        examTip: 'Insert: max 2 rotations. Delete: max 3 rotations.'
      },
      {
        id: 'rbt-q2',
        question: 'According to Red-Black Tree invariant Property 4, what is forbidden for RED nodes?',
        options: [
          'A RED node cannot have a RED child (no two consecutive RED nodes on any path)',
          'A RED node cannot have any children at all',
          'A RED node must always be the Root node',
          'A RED node cannot have a BLACK child'
        ],
        correctIndex: 0,
        explanation: 'Property 4 states: If a node is RED, both of its children MUST be BLACK. Consecutive RED parent-child pairs are strictly prohibited.',
        examTip: 'No two consecutive RED nodes on any root-to-leaf path.'
      },
      {
        id: 'rbt-q3',
        question: 'What is the required color of the Root node in a valid Red-Black Tree?',
        options: ['Must be RED', 'Must be BLACK', 'Can be RED or BLACK arbitrarily', 'Must be GREEN'],
        correctIndex: 1,
        explanation: 'Property 2 of Red-Black Trees requires the Root node to always be BLACK (if created red, it is recolored to black).',
        examTip: 'Root is ALWAYS BLACK.'
      },
      {
        id: 'rbt-q4',
        question: 'What is the Black-Height `bh(x)` of a node `x` in a Red-Black Tree?',
        options: [
          'The total number of nodes in the left subtree',
          'The number of BLACK nodes on any path from `x` down to a leaf node (excluding `x` itself)',
          'The height of the tree multiplied by 2',
          'The number of RED nodes in the tree'
        ],
        correctIndex: 1,
        explanation: 'Black-Height is the count of BLACK nodes on any simple path from node `x` down to any descendant NIL leaf node. Property 5 guarantees this count is identical for all paths.',
        examTip: 'All paths from a node to descendant leaves must have identical Black-Heights.'
      },
      {
        id: 'rbt-q5',
        question: 'What color is assigned to a newly inserted node in a Red-Black Tree BEFORE rebalancing?',
        options: ['BLACK', 'RED', 'BLUE', 'YELLOW'],
        correctIndex: 1,
        explanation: 'New nodes are initially inserted as RED to preserve the Black-Height property across all paths (only risking a temporary RED-RED parent violation).',
        examTip: 'Always insert new keys as RED nodes.'
      }
    ]
  },
  {
    id: 'b-tree',
    categoryId: 'trees',
    subCategoryId: 'multiway-encoding',
    title: 'B-Trees & Multi-Way Node Splitting',
    subtitle: 'Order-M Search Trees, Disk I/O Block Optimization & Key Promotions',
    icon: 'Layers',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 1 Section-B anchor (15–20 marks). Tested in all papers: (1) Formal definition of B-Tree of Order M, (2) Tracing insertion and node splitting with median key promotion, (3) Minimum/Maximum keys and children per node formulas.',
    overview: 'While binary trees store at most 1 key and 2 children per node, hard drives and database storage engines read data in giant disk blocks (e.g. 4KB or 8KB pages). To minimize slow disk seek operations, computer scientists use B-Trees (Multi-Way Balanced Search Trees). A B-Tree node of Order $M$ holds up to $M-1$ sorted keys and branches into up to $M$ children, dramatically flattening the tree height so that millions of records can be accessed in just 3–4 disk reads!',
    timeComplexity: {
      access: '$\\mathcal{O}(\\log_M N)$ disk block reads',
      search: '$\\mathcal{O}(\\log_M N)$',
      insertion: '$\\mathcal{O}(\\log_M N)$ with node splitting',
      deletion: '$\\mathcal{O}(\\log_M N)$ with borrowing/merging',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: Properties of a B-Tree of Order M',
        description: 'A B-Tree of Order $M$ satisfies the following rigorous structural invariants:',
        mathFormula: `B-Tree of Order $M$ Invariants:
1. Root Node: Has between $1$ and $M-1$ keys. If non-leaf, has between $2$ and $M$ children.
2. Non-Root Internal Nodes:
   - Minimum Children: $\\lceil M / 2 \\rceil$
   - Maximum Children: $M$
   - Minimum Keys: $\\lceil M / 2 \\rceil - 1$
   - Maximum Keys: $M - 1$
3. Leaf Depth: ALL leaves reside at the EXACT SAME depth/level (Perfect Balance!).
4. Key Ordering: Keys within each node are stored in sorted order: $k_1 < k_2 < \\dots < k_{p}$. Child pointer $P_i$ points to a subtree with keys strictly between $k_i$ and $k_{i+1}$.`,
        bulletPoints: [
          'Example for Order $M=5$: Every non-root node has at least $\\lceil 5/2 \\rceil - 1 = 2$ keys and at most $5 - 1 = 4$ keys.'
        ]
      },
      {
        title: 'Step 2: Insertion & Node Splitting Mechanism',
        description: 'When a new key is inserted into a B-Tree:',
        bulletPoints: [
          'Keys are ALWAYS inserted into a Leaf node first.',
          'If the leaf has fewer than $M-1$ keys, insert the key in sorted position. Done!',
          'If the leaf already has $M-1$ keys (Overflow with $M$ keys): The node Splits at the Median key (at index $\\lfloor M / 2 \\rfloor$).',
          'The Median Key is Promoted up into the parent node, and the remaining keys split into two new sibling nodes (left and right).',
          'If the parent overflows, the split cascades upwards. If the Root splits, a new root is created with 1 key and 2 children (the tree grows in height at the root!).'
        ]
      }
    ],
    cstlReference: {
      header: '#include <vector>',
      declaration: 'struct BTreeNode {\n    std::vector<int> keys;\n    std::vector<BTreeNode*> children;\n    bool isLeaf;\n};',
      commonMethods: [
        { method: 'search(k)', description: 'Binary searches node keys and recurses to child', complexity: 'O(log_M N)' },
        { method: 'splitChild(i, child)', description: 'Splits full child node and promotes median key to parent', complexity: 'O(M)' }
      ],
      notes: [
        'A B-Tree grows UPWARDS when the root splits, guaranteeing all leaves remain at the same level.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ B-Tree Node Structure & Split Logic',
        code: `#include <iostream>
#include <vector>

const int M = 5; // Order 5 B-Tree

struct BTreeNode {
    std::vector<int> keys;
    std::vector<BTreeNode*> children;
    bool isLeaf;

    BTreeNode(bool leaf) : isLeaf(leaf) {}
};

// Illustrative node split function
void splitChild(BTreeNode* parent, int i, BTreeNode* fullChild) {
    int medianIdx = fullChild->keys.size() / 2;
    int promotedKey = fullChild->keys[medianIdx];

    // Create right sibling node
    BTreeNode* rightSibling = new BTreeNode(fullChild->isLeaf);
    for (size_t j = medianIdx + 1; j < fullChild->keys.size(); ++j) {
        rightSibling->keys.push_back(fullChild->keys[j]);
    }
    if (!fullChild->isLeaf) {
        for (size_t j = medianIdx + 1; j < fullChild->children.size(); ++j) {
            rightSibling->children.push_back(fullChild->children[j]);
        }
    }

    // Shrink fullChild to left half
    fullChild->keys.resize(medianIdx);

    // Insert promoted key into parent
    parent->keys.insert(parent->keys.begin() + i, promotedKey);
    parent->children.insert(parent->children.begin() + i + 1, rightSibling);
}`,
        explanation: 'Demonstrates median key promotion and node splitting for an Order-M B-Tree.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-btree-1',
        year: 'CUET 2024 & 2022',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Construct a B-Tree of Order M = 5 by inserting the following keys in sequence: 10, 20, 30, 40, 50, 60, 70, 80, 90. Clearly show all intermediate node splits and promoted median keys.',
        solution: `Trace for B-Tree of Order M = 5:
- Max keys per node = M - 1 = 4 keys.
- Minimum keys per non-root node = ceil(5/2) - 1 = 2 keys.

Step 1: Insert 10, 20, 30, 40:
- Node: [10, 20, 30, 40] (Node is full with 4 keys).

Step 2: Insert 50 -> Overflow with 5 keys [10, 20, 30, 40, 50]:
- Median key is 30 (index 2).
- Node splits: 30 is Promoted to form the new Root!
- Left child: [10, 20], Right child: [40, 50].
- Root: [30] -> Children: [10, 20] and [40, 50].

Step 3: Insert 60, 70:
- 60 and 70 are > 30 -> Insert into right leaf [40, 50]:
- Right leaf becomes: [40, 50, 60, 70] (4 keys, full).

Step 4: Insert 80 -> Right leaf overflows [40, 50, 60, 70, 80]:
- Median key is 60.
- 60 is Promoted into Root [30] -> Root becomes [30, 60].
- Right leaf splits into [40, 50] and [70, 80].
- Tree State:
  Root: [30, 60]
  Children:
  - Child 0 (<30): [10, 20]
  - Child 1 (30..60): [40, 50]
  - Child 2 (>60): [70, 80]

Step 5: Insert 90:
- 90 > 60 -> Insert into rightmost leaf [70, 80] -> [70, 80, 90] (3 keys, valid).

Final B-Tree Structure:
          [ 30  |  60 ]
         /      |      \\
    [10, 20]  [40, 50]  [70, 80, 90]

All leaves reside at depth 1. Perfect balance maintained!`,
        keyTakeaway: 'Always state M-1 (maximum keys) and ceil(M/2)-1 (minimum keys) before drawing the trace.'
      }
    ],
    quizzes: [
      {
        id: 'btree-q1',
        question: 'In a B-Tree of Order M = 7, what is the minimum number of keys a non-root internal node must contain?',
        options: ['2', '3', '4', '6'],
        correctIndex: 1,
        explanation: 'Formula for minimum keys is ceil(M / 2) - 1 = ceil(7 / 2) - 1 = 4 - 1 = 3 keys.',
        examTip: 'Min keys in B-Tree of order M = ceil(M/2) - 1.'
      },
      {
        id: 'btree-q2',
        question: 'When a leaf node in a B-Tree of Order M overflows (exceeds M-1 keys), what occurs during node splitting?',
        options: [
          'The median key is promoted up into the parent node, and the remaining keys split into left and right sibling nodes',
          'The smallest key is deleted automatically',
          'All keys are rehashed into a new table',
          'The leaf node becomes the root node'
        ],
        correctIndex: 0,
        explanation: 'Upon overflow, the node splits at index $\\lfloor M/2 \\rfloor$. The median key is promoted up into the parent, maintaining logarithmic tree height.',
        examTip: 'Node split = Promote median key to parent.'
      },
      {
        id: 'btree-q3',
        question: 'Why are B-Trees preferred over Binary Search Trees for disk-based database indexes?',
        options: [
          'B-Trees have high fan-out (M children per node), dramatically flattening tree height and reducing slow disk seek operations',
          'B-Trees consume zero disk space',
          'Binary search trees cannot store numbers',
          'B-Trees do not require key comparisons'
        ],
        correctIndex: 0,
        explanation: 'Disk blocks read hundreds of keys at once. B-Tree order M matching disk page size results in tree heights of only 3 to 4 levels for millions of records.',
        examTip: 'High fan-out (M) = Shallow tree height = Minimal disk I/O.'
      },
      {
        id: 'btree-q4',
        question: 'What is the maximum number of children an internal node in a B-Tree of Order M can have?',
        options: ['M - 1', 'M', '2M', 'ceil(M / 2)'],
        correctIndex: 1,
        explanation: 'An internal node with $k$ keys has exactly $k + 1$ child pointers. Since maximum keys is $M-1$, maximum children is $M$.',
        examTip: 'Order M B-Tree: Max keys = M - 1, Max children = M.'
      },
      {
        id: 'btree-q5',
        question: 'At what level do leaf nodes reside in a valid B-Tree?',
        options: [
          'All leaf nodes reside at the EXACT SAME depth/level (Perfect Balance)',
          'Leaves can reside at any arbitrary depth',
          'Left leaves are always deeper than right leaves',
          'Leaves exist only at level 0'
        ],
        correctIndex: 0,
        explanation: 'Because B-Trees grow UPWARDS when the root splits, every leaf node sits at the exact same depth.',
        examTip: 'B-Trees are strictly bottom-up balanced: all leaves at identical depth.'
      }
    ]
  },
  {
    id: 'b-plus-tree',
    categoryId: 'trees',
    subCategoryId: 'multiway-encoding',
    title: 'B+ Trees & Leaf-Linked Range Indexing',
    subtitle: 'Database Engine Architecture, Pure Routing Indices & Fast Sequential Range Scans',
    icon: 'Layers',
    importance: '⚡ HIGH',
    cuetExamRelevance: 'Module 1 syllabus. High-yield questions: (1) Key architectural differences between B-Trees and B+ Trees, (2) Why B+ Trees are preferred for database file indexing (InnoDB, PostgreSQL), (3) Leaf node linked lists.',
    overview: 'A B+ Tree is an evolution of the B-Tree optimized specifically for database management systems and filesystem storage. Unlike a standard B-Tree where data records are scattered across all levels, a B+ Tree stores ALL actual data records exclusively in the Leaf nodes. Internal nodes act purely as lightning-fast "Routing Road Signs" containing search keys. Furthermore, all leaf nodes are connected into a Doubly Linked List, enabling instantaneous range queries (e.g. `SELECT * WHERE age BETWEEN 20 AND 30`) without tree traversals!',
    timeComplexity: {
      access: '$\\mathcal{O}(\\log_M N)$ point query / $\\mathcal{O}(\\log_M N + K)$ range scan for $K$ items',
      search: '$\\mathcal{O}(\\log_M N)$',
      insertion: '$\\mathcal{O}(\\log_M N)$',
      deletion: '$\\mathcal{O}(\\log_M N)$',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: Structural Differences: B-Tree vs B+ Tree',
        description: 'Exam questions frequently request this exact comparative table:',
        bulletPoints: [
          'Data Location: In B-Trees, data records exist in both internal and leaf nodes. In B+ Trees, data exists ONLY in leaf nodes.',
          'Internal Node Capacity: Because B+ internal nodes do not store bulky data pointers, they fit many more keys per disk block (higher Fan-Out), resulting in a shallower tree height.',
          'Sequential Range Queries: In B-Trees, range queries require slow Inorder tree traversals across levels. In B+ Trees, follow the linked list pointers across leaf nodes in $\\mathcal{O}(K)$ time!',
          'Redundant Keys: In B+ Trees, keys in internal nodes are duplicated in the leaf nodes.'
        ]
      },
      {
        title: 'Step 2: Leaf Node Chaining for Database Range Queries',
        description: 'All leaf nodes in a B+ Tree are chained with `next` and `prev` pointers:',
        mathFormula: `Range Query Execution ($\text{age } \\ge 25 \\text{ AND age } \\le 60$):
1. Binary search B+ tree root to find first leaf holding key 25 (Cost: $\\mathcal{O}(\\log_M N)$).
2. Scan sequentially along leaf \\texttt{next} pointers until key $> 60$ (Cost: $\\mathcal{O}(K)$ disk pages).`,
        bulletPoints: [
          'This is why databases like MySQL InnoDB use B+ Trees for primary clustered indices!'
        ]
      }
    ],
    cstlReference: {
      header: '#include <vector>',
      declaration: 'struct BPlusLeafNode {\n    std::vector<int> keys;\n    std::vector<void*> recordPointers;\n    BPlusLeafNode* next;\n    BPlusLeafNode* prev;\n};',
      commonMethods: [
        { method: 'rangeSearch(low, high)', description: 'Finds start leaf in O(log N) and traverses next pointers', complexity: 'O(log_M N + K)' }
      ],
      notes: [
        'Height of B+ Tree is typically 3 to 4 levels even for billions of database rows.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ B+ Tree Range Query Demonstration',
        code: `#include <iostream>
#include <vector>

struct LeafNode {
    std::vector<int> keys;
    LeafNode* next;
    LeafNode(std::vector<int> k) : keys(k), next(nullptr) {}
};

// Fast sequential scan across leaf nodes
void rangeQuery(LeafNode* startLeaf, int low, int high) {
    std::cout << "Range Scan [" << low << " to " << high << "]:\\n";
    LeafNode* curr = startLeaf;
    while (curr != nullptr) {
        for (int key : curr->keys) {
            if (key >= low && key <= high) {
                std::cout << "  Found Record Key: " << key << "\\n";
            }
            if (key > high) return; // Finished range
        }
        curr = curr->next; // Jump directly to next disk block!
    }
}`,
        explanation: 'Shows how sequential leaf chaining allows fast range scans without traversing internal tree nodes.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-bplus-1',
        year: 'CUET 2023',
        marks: 10,
        difficulty: 'Medium',
        question: 'Why are B+ Trees preferred over B-Trees for database indexing? Compare their structure, fan-out, and range query performance.',
        solution: `Comparative Analysis for Maximum Marks:

1. Fan-out & Tree Height:
- In B-Trees, every key is paired with a full data record pointer, making internal nodes bulky.
- In B+ Trees, internal nodes only store routing keys (e.g. 4 bytes each), allowing a single 4KB disk page to hold hundreds of keys (high fan-out). This reduces tree height by 30-50%, saving expensive disk I/O operations.

2. Range Query Performance:
- In B-Trees, executing "SELECT * WHERE age BETWEEN 20 AND 50" requires expensive recursive Inorder tree traversal jumping up and down across disk blocks.
- In B+ Trees, all leaves are connected in a Doubly Linked List. The search finds key 20 in O(log N) and then simply walks the leaf linked list linearly in O(K) time.

3. Predictable Lookup Time:
- In B-Trees, best-case search is O(1) (if key is at root) and worst-case is O(h).
- In B+ Trees, EVERY search path travels all the way down to a leaf, giving uniform and predictable O(h) query latency.`,
        keyTakeaway: 'Always emphasize High Fan-out and Leaf Linked List Range Queries in B+ Tree questions.'
      }
    ],
    quizzes: [
      {
        id: 'bplus-q1',
        question: 'Where are actual data records stored in a B+ Tree?',
        options: [
          'Exclusively in the Leaf nodes',
          'In both Internal nodes and Leaf nodes',
          'Exclusively in the Root node',
          'In external hash tables'
        ],
        correctIndex: 0,
        explanation: 'In a B+ Tree, data records exist exclusively in the leaf nodes, while internal nodes store only routing search keys.',
        examTip: 'B+ Tree = Data records ONLY in leaves.'
      },
      {
        id: 'bplus-q2',
        question: 'How are leaf nodes connected in a B+ Tree to accelerate range queries?',
        options: [
          'Via a Singly or Doubly Linked List (`nextLeaf` pointers)',
          'Via a circular queue',
          'Via parent pointers only',
          'They are not connected'
        ],
        correctIndex: 0,
        explanation: 'All leaf nodes are linked sequentially, allowing range queries to traverse left-to-right without returning to parent nodes.',
        examTip: 'Leaf linked list enables $O(\\log_M N + K)$ range queries.'
      },
      {
        id: 'bplus-q3',
        question: 'Why do B+ Tree internal nodes have a higher Fan-Out than standard B-Tree internal nodes?',
        options: [
          'Because B+ internal nodes do not store bulky data payloads/pointers, fitting more key pointers per disk page',
          'Because B+ trees have shorter keys',
          'Because B+ trees skip child pointers',
          'Because internal nodes are stored in RAM'
        ],
        correctIndex: 0,
        explanation: 'Without data payloads in internal nodes, more keys fit into a 4KB disk page, maximizing branching factor and flattening tree height.',
        examTip: 'No data in internal nodes = Higher Fan-out = Shallower Tree.'
      },
      {
        id: 'bplus-q4',
        question: 'What happens to keys in internal nodes during search key duplicate propagation in a B+ Tree?',
        options: [
          'Keys in internal nodes are duplicated copies of keys present in the leaf nodes',
          'Internal keys are deleted once reached',
          'Internal keys are encrypted',
          'Duplicates cause runtime exceptions'
        ],
        correctIndex: 0,
        explanation: 'Internal node keys act purely as routing guideposts; the actual key and data payload reside in the leaf node below.',
        examTip: 'Keys in B+ internal nodes act purely as search indices.'
      },
      {
        id: 'bplus-q5',
        question: 'What is the worst-case time complexity to perform a range query for K items in a B+ tree of N records?',
        options: [
          'O(log_M N + K)',
          'O(N log N)',
          'O(N²)',
          'O(K²)'
        ],
        correctIndex: 0,
        explanation: 'Locating the starting leaf takes $O(\\log_M N)$ time, after which following leaf list pointers to fetch $K$ items takes $O(K)$ linear time.',
        examTip: 'B+ range query complexity = $O(\\log_M N + K)$.'
      }
    ]
  },
  {
    id: 'huffman-coding',
    categoryId: 'trees',
    subCategoryId: 'multiway-encoding',
    title: 'Huffman Coding & Weighted 2-Trees',
    subtitle: 'Optimal Prefix Codes, Greedy Priority Queue Assembly & Weighted Path Length',
    icon: 'TrendingUp',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 1 & 3 exam staple (12–15 marks). Tested formats: (1) Constructing a Huffman 2-Tree given character frequencies, (2) Generating variable-length binary prefix codes (0 and 1 branches), (3) Calculating Weighted Path Length (WPL) and total bits saved.',
    overview: 'In standard ASCII or Unicode text, every character takes a fixed 8 bits, even if letter \'E\' appears 1,000 times and letter \'Z\' appears once! David Huffman (1952) invented an optimal data compression algorithm: assign shorter bit-codes to frequent characters and longer bit-codes to rare characters. To ensure that no code is a prefix of another (so text can be decoded without ambiguity), Huffman builds an optimal Weighted Extended Binary Tree (2-Tree) using a Greedy Min-Priority Queue!',
    timeComplexity: {
      access: '$\\mathcal{O}(K \\log K)$ to build tree for $K$ unique characters',
      search: '$\\mathcal{O}(\\text{code length})$ per character decode',
      insertion: '$\\mathcal{O}(K \\log K)$',
      deletion: '$\\mathcal{O}(1)$',
      space: '$\\mathcal{O}(K)$ nodes'
    },
    keyConcepts: [
      {
        title: 'Step 1: The Prefix-Free Property',
        description: 'A code is a Prefix Code if no valid character code is a prefix (starting substring) of any other valid code:',
        bulletPoints: [
          'Example of Invalid Code: If \'A\' = `01` and \'B\' = `011`, seeing `011` is ambiguous (is it "B" or "A" followed by "1"?).',
          'Because all characters in a Huffman Tree sit exclusively at Leaf nodes, no path to a leaf can ever be a prefix of a deeper leaf!'
        ]
      },
      {
        title: 'Step 2: The Greedy Huffman Tree Assembly Algorithm',
        description: 'To construct an optimal Huffman tree:',
        bulletPoints: [
          '1. Create a leaf node for each character and insert into a Min-Priority Queue ordered by frequency.',
          '2. While the Priority Queue has more than 1 node:',
          '   a. Extract the two nodes with smallest frequencies ($T_1$ and $T_2$).',
          '   b. Create a new internal node with frequency = $\\text{freq}(T_1) + \\text{freq}(T_2)$.',
          '   c. Set $T_1$ as left child (assign bit \'0\') and $T_2$ as right child (assign bit \'1\').',
          '   d. Insert the new node back into the Min-Priority Queue.',
          '3. The single remaining node is the Root of the Huffman Tree!'
        ]
      },
      {
        title: 'Step 3: Calculating Weighted Path Length (WPL)',
        description: 'The Weighted Path Length measures total compressed message bits:',
        mathFormula: `$$ \\text{WPL} = \\sum_{i=1}^{K} (\\text{Frequency}_i \\times \\text{Depth}_i) $$`
      }
    ],
    cstlReference: {
      header: '#include <queue> / #include <vector> / #include <string>',
      declaration: 'struct HuffmanNode {\n    char ch;\n    int freq;\n    HuffmanNode *left, *right;\n};',
      commonMethods: [
        { method: 'buildHuffmanTree(freqs)', description: 'Builds optimal tree using priority_queue in O(K log K)', complexity: 'O(K log K)' },
        { method: 'generateCodes(root, code)', description: 'Recursively builds prefix dictionary table', complexity: 'O(K)' }
      ],
      notes: [
        'Huffman coding is a lossless compression algorithm used in ZIP, JPEG, and MP3 formats.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Complete Huffman Tree Construction & Code Generator',
        code: `#include <iostream>
#include <queue>
#include <vector>
#include <string>
#include <map>

struct Node {
    char ch;
    int freq;
    Node *left, *right;
    Node(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
};

// Comparator for Min-Heap
struct Compare {
    bool operator()(Node* l, Node* r) {
        return l->freq > r->freq;
    }
};

void printCodes(Node* root, std::string str, std::map<char, std::string>& huffmanCode) {
    if (!root) return;
    if (!root->left && !root->right) {
        huffmanCode[root->ch] = str;
        std::cout << "Character '" << root->ch << "' -> Code: " << str << "\\n";
    }
    printCodes(root->left, str + "0", huffmanCode);
    printCodes(root->right, str + "1", huffmanCode);
}

int main() {
    std::map<char, int> freqs = {{'A', 5}, {'B', 9}, {'C', 12}, {'D', 13}, {'E', 16}, {'F', 45}};

    std::priority_queue<Node*, std::vector<Node*>, Compare> minHeap;
    for (auto pair : freqs) {
        minHeap.push(new Node(pair.first, pair.second));
    }

    while (minHeap.size() > 1) {
        Node* left = minHeap.top(); minHeap.pop();
        Node* right = minHeap.top(); minHeap.pop();

        Node* merged = new Node('$', left->freq + right->freq);
        merged->left = left;
        merged->right = right;
        minHeap.push(merged);
    }

    std::map<char, std::string> huffmanCode;
    printCodes(minHeap.top(), "", huffmanCode);
    return 0;
}`,
        explanation: 'Generates optimal variable-length prefix codes using a C++ STL min-priority queue.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-huff-1',
        year: 'CUET 2024 & 2022',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Given characters with their frequencies: A: 5, B: 9, C: 12, D: 13, E: 16, F: 45. (a) Construct the optimal Huffman Tree step-by-step. (b) Find the binary code for each character. (c) Calculate the Weighted Path Length (WPL) and total bits required.',
        solution: `Step-by-Step Huffman Tree Construction:

Initial Priority Queue (sorted by frequency):
[ (A, 5), (B, 9), (C, 12), (D, 13), (E, 16), (F, 45) ]

- Step 1: Extract two lowest: A(5) and B(9).
  Merge into node N1 with freq = 5 + 9 = 14 (Left: A, Right: B).
  Queue: [ (C, 12), (D, 13), (N1, 14), (E, 16), (F, 45) ]

- Step 2: Extract two lowest: C(12) and D(13).
  Merge into node N2 with freq = 12 + 13 = 25 (Left: C, Right: D).
  Queue: [ (N1, 14), (E, 16), (N2, 25), (F, 45) ]

- Step 3: Extract two lowest: N1(14) and E(16).
  Merge into node N3 with freq = 14 + 16 = 30 (Left: N1, Right: E).
  Queue: [ (N2, 25), (N3, 30), (F, 45) ]

- Step 4: Extract two lowest: N2(25) and N3(30).
  Merge into node N4 with freq = 25 + 30 = 55 (Left: N2, Right: N3).
  Queue: [ (F, 45), (N4, 55) ]

- Step 5: Extract two lowest: F(45) and N4(55).
  Merge into Root with freq = 45 + 55 = 100 (Left: F, Right: N4).

Prefix Codes (Left branch = 0, Right branch = 1):
- F: '0' (Length = 1 bit)
- C: '100' (Length = 3 bits)
- D: '101' (Length = 3 bits)
- A: '1100' (Length = 4 bits)
- B: '1101' (Length = 4 bits)
- E: '111' (Length = 3 bits)

Weighted Path Length (WPL) Calculation:
WPL = (45 * 1) + (12 * 3) + (13 * 3) + (5 * 4) + (9 * 4) + (16 * 3)
WPL = 45 + 36 + 39 + 20 + 36 + 48 = 224 bits.

Fixed-Length comparison (3 bits per character for 6 chars):
Fixed bits = 100 characters * 3 bits = 300 bits.
Compression savings = (300 - 224) / 300 = 25.3% reduction!`,
        keyTakeaway: 'Always list the character codes in a clean table and write out the full WPL summation for maximum marks.'
      }
    ],
    quizzes: [
      {
        id: 'huff-q1',
        question: 'Why is Huffman Coding called a "Prefix-Free" code?',
        options: [
          'Because all character codes have the exact same length',
          'Because no character code is a prefix (initial substring) of any other character code',
          'Because it requires no tree structure',
          'Because it only works on numbers'
        ],
        correctIndex: 1,
        explanation: 'Prefix-free means no code is a prefix of another, allowing the receiver to decode binary text continuously from left to right without ambiguity.',
        examTip: 'Prefix-free guarantee enables unambiguous stream decoding.'
      },
      {
        id: 'huff-q2',
        question: 'What algorithmic paradigm is used to construct a Huffman Tree?',
        options: ['Greedy Strategy', 'Dynamic Programming', 'Backtracking', 'Divide and Conquer'],
        correctIndex: 0,
        explanation: 'Huffman algorithm repeatedly makes the locally optimal choice: extracting the two lowest-frequency trees from a Min-Priority Queue to build the tree bottom-up.',
        examTip: 'Huffman algorithm = Greedy Strategy using Min-Priority Queue.'
      },
      {
        id: 'huff-q3',
        question: 'Given character frequencies A:10, B:20, C:30, D:40, what are the first two nodes combined into a parent node?',
        options: ['C (30) and D (40)', 'A (10) and B (20)', 'A (10) and C (30)', 'B (20) and D (40)'],
        correctIndex: 1,
        explanation: 'The Greedy rule extracts the two nodes with smallest frequencies: A(10) and B(20), creating a sub-tree with combined weight 30.',
        examTip: 'Always combine the two lowest frequencies at each step.'
      },
      {
        id: 'huff-q4',
        question: 'What is the formula for the Weighted Path Length (WPL) of a Huffman Tree for K characters with frequency f_i and depth d_i?',
        options: [
          'WPL = ∑ (f_i * d_i)',
          'WPL = ∑ (f_i / d_i)',
          'WPL = max(d_i)',
          'WPL = ∑ (f_i + d_i)'
        ],
        correctIndex: 0,
        explanation: 'Weighted Path Length multiplies each character\'s frequency by its tree depth (bit length) and sums them up to get total compressed bits.',
        examTip: 'WPL = sum(Frequency_i * Depth_i).'
      },
      {
        id: 'huff-q5',
        question: 'In a Huffman Tree, where are actual characters located?',
        options: [
          'Exclusively at the Leaf nodes',
          'At internal operator nodes',
          'At the root node only',
          'Distributed across array indices'
        ],
        correctIndex: 0,
        explanation: 'Characters sit strictly at the leaf nodes of the binary tree. Internal nodes contain only merged frequency sums, guaranteeing the prefix-free property.',
        examTip: 'Leaf placement guarantees prefix-free variable-length codes.'
      }
    ]
  }
];
