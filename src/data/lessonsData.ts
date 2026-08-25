import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 'vector',
    title: 'Vector (Dynamic Array)',
    subtitle: 'The Magical Expanding Locker Row: Contiguous Memory & Address Math',
    icon: 'Layers',
    importance: '🟡 MEDIUM',
    cuetExamRelevance: 'Heavily tested in Module 8 (Arrays & Memory Address Calculations). Direct formula derivations for 1D, 2D, and 3D Column-Major and Row-Major arrays carry 8–12 marks per paper. Also tested in algorithm design questions (such as array group reversal and two-pointer scans).',
    overview: 'Imagine a neat row of student lockers in your school corridor, numbered 0, 1, 2, 3... Because every locker sits directly next to the previous one with zero empty gaps in between (contiguous memory), if you want locker #5, you can walk directly to it in 1 step! But what happens if your club gets more members than available lockers? The school builds a brand new corridor with double the lockers (e.g. 4 → 8 → 16), moves your club items over, and recycles the old hallway. That is exactly how a Vector (Dynamic Array) works!',
    timeComplexity: {
      access: '$\\mathcal{O}(1)$ (Instant random access via index)',
      search: '$\\mathcal{O}(N)$ linear / $\\mathcal{O}(\\log N)$ if sorted',
      insertion: '$\\mathcal{O}(1)$ amortized at the end / $\\mathcal{O}(N)$ in the middle',
      deletion: '$\\mathcal{O}(1)$ at the end / $\\mathcal{O}(N)$ in the middle',
      space: '$\\mathcal{O}(N)$ total elements'
    },
    keyConcepts: [
      {
        title: 'Step 1: What is a Vector and Why Not a Normal Array?',
        description: 'In basic C/C++, regular arrays have a fixed size: if you declare `int scores[5];`, you can never fit a 6th student without crashing the program! A Vector solves this by managing memory automatically. It tracks two important numbers:',
        bulletPoints: [
          'Size (`vec.size()`): How many items are actually inside your vector right now (e.g., you have 3 books).',
          'Capacity (`vec.capacity()`): How many total slots the computer reserved in memory before needing to expand (e.g., your shelf has 4 slots).',
          'When `size == capacity` and you add one more item with `push_back()`, the vector automatically requests a new memory block with double the capacity (1 → 2 → 4 → 8 → 16 slots), copies everything over, and deletes the old block.'
        ]
      },
      {
        title: 'Step 2: Why is Doubling Capacity so Fast? (Amortized $\\mathcal{O}(1)$)',
        description: 'You might wonder: "Moving all elements to a new hallway takes time $\\mathcal{O}(N)$, so isn\'t adding items slow?" The trick is that resizing happens very rarely! Because capacity doubles geometrically ($1 \\to 2 \\to 4 \\to 8 \\to 16$), the total work done copying elements across $N$ insertions is at most $1 + 2 + 4 + 8 + \\dots + N = 2N$. Spreading $2N$ work over $N$ insertions means each push costs an average of just $\\approx 2$ operations, which computer scientists call Amortized $\\mathcal{O}(1)$ (constant time on average)!',
        bulletPoints: [
          'Tip for top speed: If you already know you will store 1,000 items, call `vec.reserve(1000)` upfront to allocate all slots at once with zero intermediate copying.'
        ]
      },
      {
        title: 'Step 3: Calculating Memory Addresses in 1D, 2D, and 3D Arrays',
        description: 'Computers store all data in a single flat line of numbered memory addresses (called byte/word addresses). To locate an element $A[i, j, k]$, we start at the first locker\'s address (called the Base Address) and calculate how many item boxes we must skip over.',
        mathFormula: `For a 3D Array A[L_1 : U_1, L_2 : U_2, L_3 : U_3] where:
- Lower Bounds: L_1, L_2, L_3 \\quad | \\quad Upper Bounds: U_1, U_2, U_3
- Dimension Spans (Number of elements): D_1 = U_1 - L_1 + 1, \\quad D_2 = U_2 - L_2 + 1, \\quad D_3 = U_3 - L_3 + 1
- Element Size (Words/Bytes): W, \\quad Base Address: \\text{Base}

1. Column-Major Order (Column by column):
   \\text{Loc}(A[i, j, k]) = \\text{Base} + W \\times [ (i - L_1) + D_1 \\times ((j - L_2) + D_2 \\times (k - L_3)) ]

2. Row-Major Order (Row by row):
   \\text{Loc}(A[i, j, k]) = \\text{Base} + W \\times [ (k - L_3) + D_3 \\times ((j - L_2) + D_2 \\times (i - L_1)) ]`,
        bulletPoints: [
          'Column-Major rule: The first index ($i$) moves fastest (innermost term $(i - L_1)$).',
          'Row-Major rule: The last index ($k$) moves fastest (innermost term $(k - L_3)$).'
        ]
      }
    ],
    cstlReference: {
      header: '#include <vector>',
      declaration: 'std::vector<int> vec; // dynamic list of integers',
      commonMethods: [
        { method: 'push_back(val)', description: 'Adds val to the very end; doubles capacity if full', complexity: 'Amortized O(1)' },
        { method: 'pop_back()', description: 'Removes the last item in the vector', complexity: 'O(1)' },
        { method: 'operator[i] / at(i)', description: 'Instantly reads or edits element at index i (0-indexed)', complexity: 'O(1)' },
        { method: 'insert(pos, val)', description: 'Inserts val at index pos; shifts all later items right by 1', complexity: 'O(N)' },
        { method: 'erase(pos)', description: 'Deletes item at index pos; shifts all later items left by 1', complexity: 'O(N)' },
        { method: 'size()', description: 'Returns how many items are currently in the vector', complexity: 'O(1)' },
        { method: 'capacity()', description: 'Returns total allocated slots before next resize', complexity: 'O(1)' }
      ],
      notes: [
        'Because elements sit side-by-side in memory, computer processors love vectors! They preload neighboring elements into high-speed CPU Cache automatically.',
        'Beware: When a vector reallocates to a bigger memory block, old memory pointers or iterators point to deleted memory and become invalid!'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Vector Basics & Capacity Growth',
        code: `#include <iostream>
#include <vector>

int main() {
    // Create an empty dynamic array of integers
    std::vector<int> myScores;

    // Add elements to the end
    std::cout << "--- Watching Capacity Double ---" << std::endl;
    for (int i = 1; i <= 9; ++i) {
        myScores.push_back(i * 10);
        std::cout << "Added " << (i * 10) 
                  << " | Size: " << myScores.size() 
                  << " | Capacity: " << myScores.capacity() << std::endl;
    }

    // Direct instant access
    std::cout << "\\nFirst item: " << myScores.front() << std::endl;
    std::cout << "Last item: " << myScores.back() << std::endl;
    std::cout << "Item at index 3: " << myScores[3] << std::endl;

    return 0;
}`,
        explanation: 'Notice how capacity jumps: 1 -> 2 -> 4 -> 8 -> 16 whenever size exceeds capacity!'
      },
      {
        language: 'c',
        title: 'C Function: In-place Array Reversal in Groups of K (Exam Classic)',
        code: `// Reverse array in groups of size k (e.g. [1,2,3,4,5,6], k=3 -> [3,2,1,6,5,4])
void reverseInGroups(int arr[], int n, int k) {
    for (int i = 0; i < n; i += k) {
        int left = i;
        // Don't go past the end of the array on the last group
        int right = (i + k - 1 < n - 1) ? (i + k - 1) : (n - 1);
        
        // Swap elements from both ends moving inwards
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
}`,
        explanation: 'Uses a two-pointer swap technique to reverse items in-place without needing any extra memory arrays.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-arr-1',
        year: 'CUET 2023 & 2021',
        marks: 8,
        difficulty: 'Exam Classic',
        question: 'A 3D array Y is declared with bounds Y(3:10, 1:15, 10:20) and stored in Column-Major Order. The base address is 500 and each element occupies 4 words. Find the exact memory address of Y(7, 12, 18).',
        solution: `Let's break this down step-by-step like a high school algebra problem:

Step 1: Find the length (span of indices) for each dimension:
- Dimension 1 (rows): Lower bound L1 = 3, Upper bound U1 = 10
  Length D1 = U1 - L1 + 1 = 10 - 3 + 1 = 8 elements
- Dimension 2 (cols): Lower bound L2 = 1, Upper bound U2 = 15
  Length D2 = U2 - L2 + 1 = 15 - 1 + 1 = 15 elements
- Dimension 3 (depth): Lower bound L3 = 10, Upper bound U3 = 20
  Length D3 = U3 - L3 + 1 = 20 - 10 + 1 = 11 elements

Step 2: Write down the Column-Major Order Formula for 3D Arrays:
  Loc(Y[i, j, k]) = Base + W * [ (i - L1) + D1 * ((j - L2) + D2 * (k - L3)) ]

Step 3: Calculate the individual index offsets for our target Y(7, 12, 18):
- (i - L1) = 7 - 3 = 4
- (j - L2) = 12 - 1 = 11
- (k - L3) = 18 - 10 = 8

Step 4: Solve the nested multiplication inside the brackets:
- Inner offset = (j - L2) + D2 * (k - L3) = 11 + (15 * 8) = 11 + 120 = 131
- Total offset = (i - L1) + D1 * (131) = 4 + (8 * 131) = 4 + 1048 = 1052 elements to skip!

Step 5: Multiply by element size W = 4 and add Base Address = 500:
  Loc(Y[7, 12, 18]) = 500 + (4 * 1052)
  Loc(Y[7, 12, 18]) = 500 + 4208 = 4708

Final Answer: The memory address is 4708.`,
        keyTakeaway: 'Always calculate lengths D1 and D2 first! In Column-Major, work from the innermost index (k) back to (i).'
      },
      {
        id: 'cuet-arr-2',
        year: 'CUET 2025',
        marks: 10,
        difficulty: 'Medium',
        question: 'Write a C procedure to find all "Leader Elements" in an array (an element is a leader if it is strictly greater than all elements to its right). What is its time complexity?',
        solution: `High School Intuition:
If you stand at the front of a crowd looking right, you can only see people who are taller than everyone behind them!
Instead of checking every person against everyone to their right (which takes slow O(N²) time), let's walk BACKWARDS from right to left, keeping track of the tallest person seen so far!

C Function:
void printLeaders(int arr[], int n) {
    if (n <= 0) return;
    
    // The very last element has nobody to its right, so it is always a leader!
    int max_from_right = arr[n - 1];
    printf("Leader: %d\\n", max_from_right);
    
    // Scan backwards from second-to-last item to the first
    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] > max_from_right) {
            max_from_right = arr[i]; // Found a new leader!
            printf("Leader: %d\\n", max_from_right);
        }
    }
}

Time & Space Complexity:
- Time Complexity: O(N) because we only look at each element once in a single backwards pass.
- Extra Memory (Space): O(1) because we only use one helper variable (max_from_right).`,
        keyTakeaway: 'Walking backwards from right-to-left turns slow O(N²) problems into lightning-fast O(N) solutions!'
      }
    ],
    quizzes: [
      {
        id: 'vec-q1',
        question: 'When a std::vector of capacity 8 has 8 items and you call push_back() for the 9th item, what is its new capacity in standard C++?',
        options: ['9', '10', '16', '64'],
        correctIndex: 2,
        explanation: 'Standard C++ doubles the capacity (8 * 2 = 16) to ensure future insertions remain fast and don\'t trigger constant memory copying.',
        examTip: 'Doubling capacity geometrically is the secret behind the amortized O(1) time complexity.'
      },
      {
        id: 'vec-q2',
        question: 'In Column-Major 2D array representation A[L1:U1, L2:U2], what is the formula to find the memory address of element A[i, j]?',
        options: [
          'Base + W * [(j - L2) + (U2 - L2 + 1) * (i - L1)]',
          'Base + W * [(i - L1) + (U1 - L1 + 1) * (j - L2)]',
          'Base + W * [(i - L1) * (j - L2)]',
          'Base + W * [(i + j) * U1]'
        ],
        correctIndex: 1,
        explanation: 'In Column-Major order, each full column skip jumps over D1 = (U1 - L1 + 1) row elements, so (j - L2) is multiplied by D1.',
        examTip: 'Remember: Column-Major multiplies the column offset by D1 (the row span).'
      }
    ]
  },
  {
    id: 'list',
    title: 'List (Linked List)',
    subtitle: 'The Chain of Treasure Clues: Pointers, Nodes & Polynomials',
    icon: 'GitBranch',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 4 backbone of Section-B (30–40 marks). Guaranteed questions on: (1) Singly and Doubly linked list C procedures, (2) Adding polynomials P1(x) + P2(x) using Circular Header Lists with COEF, EXP, and LINK arrays, (3) Free memory pool (AVAIL list) and Garbage Collection.',
    overview: 'Imagine a treasure hunt where every clue box contains two things: a prize item and a little slip of paper telling you the exact GPS location of the next clue box! You don\'t need all clue boxes lined up in a single straight row—they can be hidden anywhere across the city! In computer science, each clue box is called a Node (holding Data + Pointer), and the chain is called a Linked List. Because items aren\'t forced into consecutive memory slots, you can insert or delete clues anywhere in the middle in 1 step simply by reconnecting the paper slips!',
    timeComplexity: {
      access: '$\\mathcal{O}(N)$ (Must walk the chain from Head)',
      search: '$\\mathcal{O}(N)$ sequential scan',
      insertion: '$\\mathcal{O}(1)$ if you already have the node pointer / $\\mathcal{O}(N)$ by position index',
      deletion: '$\\mathcal{O}(1)$ if you have the node pointer / $\\mathcal{O}(N)$ by position index',
      space: '$\\mathcal{O}(N)$ with pointer memory overhead'
    },
    keyConcepts: [
      {
        title: 'Step 1: The Three Types of Linked Lists',
        description: 'In school exams, linked lists are classified based on how the clue pointers connect to each other:',
        bulletPoints: [
          'Singly Linked List (One-Way Chain): Each node has data and 1 pointer (`next`). You can only walk forwards. If you lose your place, you cannot walk backwards!',
          'Doubly Linked List (Two-Way Chain): Each node has data and 2 pointers (`prev` and `next`). You can walk forwards and backwards freely, and you can delete a node instantly without needing to search for the node before it!',
          'Circular Header List: The very last node loops back around to point to a special permanent dummy node called the `HEADER`. This ensures the chain never ends in `NULL`, making code simpler and preventing crashes.'
        ]
      },
      {
        title: 'Step 2: How Polynomials are Added using Linked Lists',
        description: 'In algebra, you add polynomials like $(3x^2 + 5x) + (4x^2 + 2x + 7) = 7x^2 + 7x + 7$. In exams, polynomials are stored as linked lists where each node holds three fields: COEF (number in front), EXP (exponent/power), and LINK (pointer to next term):',
        mathFormula: `\\text{Poly Term Node Structure: } [\\text{COEF} \\mid \\text{EXP} \\mid \\text{LINK}]
\\text{Example: } P(x) = 4x^3 + 3x^2 - 5x + 7
\\text{List: } [4 \\mid 3] \\to [3 \\mid 2] \\to [-5 \\mid 1] \\to [7 \\mid 0] \\to \\text{HEADER}`,
        bulletPoints: [
          'To add two polynomials $P_1$ and $P_2$: Have two pointers walk down both lists simultaneously.',
          'If powers match (`p1->exp == p2->exp`): Add coefficients! If the sum is not zero, create a new term node with that sum.',
          'If powers don\'t match: Copy the term with the larger exponent first into the answer list and advance that pointer.'
        ]
      },
      {
        title: 'Step 3: Where do Nodes come from? (The AVAIL List & Garbage Collection)',
        description: 'When your program starts, unused memory is kept in a linked list of blank nodes called the AVAIL List (Available Memory Pool):',
        bulletPoints: [
          'Getting a new node (`malloc`): The computer takes the first node off the AVAIL list (`NEW = AVAIL; AVAIL = AVAIL->next`). If AVAIL is empty, that means your computer ran out of RAM (Memory Overflow)!',
          'Garbage Collection (Mark & Sweep): When your program deletes a node, if you forget to recycle it, it causes a "Memory Leak". The computer\'s Garbage Collector runs in two passes: it marks all active nodes you are still using, and sweeps unreferenced nodes back into the AVAIL list!'
        ]
      }
    ],
    cstlReference: {
      header: '#include <list> / #include <forward_list>',
      declaration: 'std::list<int> myList; // Doubly linked list\nstd::forward_list<int> mySinglyList; // Singly linked list',
      commonMethods: [
        { method: 'push_front(val)', description: 'Adds val to the very front of the list in 1 step', complexity: 'O(1)' },
        { method: 'push_back(val)', description: 'Adds val to the very end of the list in 1 step', complexity: 'O(1)' },
        { method: 'pop_front() / pop_back()', description: 'Removes the first / last element in 1 step', complexity: 'O(1)' },
        { method: 'insert(pos, val)', description: 'Inserts val right before iterator pos with zero element shifting', complexity: 'O(1)' },
        { method: 'erase(pos)', description: 'Removes node at iterator pos by reconnecting neighbor pointers', complexity: 'O(1)' },
        { method: 'reverse()', description: 'Flips all pointer directions to reverse the entire list', complexity: 'O(N)' }
      ],
      notes: [
        'Notice that `std::list` does NOT have `myList[i]`! To get to item #10, you must walk through items 0, 1, 2... 9 one by one.',
        'Advantage over vectors: Inserting or deleting in the middle of a linked list never shifts other elements!'
      ]
    },
    codeSnippets: [
      {
        language: 'c',
        title: 'C Function: Adding Two Polynomials in Header Circular Lists (Exam Classic)',
        code: `struct PolyNode {
    int coef;               // Coefficient (e.g. 4 in 4x^3)
    int exp;                // Exponent power (e.g. 3 in 4x^3)
    struct PolyNode* next;  // Pointer to next term
};

// Adds two polynomial lists (h1 and h2) and returns the result list h3
struct PolyNode* addPolynomials(struct PolyNode* h1, struct PolyNode* h2) {
    // Create header node for result polynomial
    struct PolyNode* h3 = (struct PolyNode*)malloc(sizeof(struct PolyNode));
    h3->next = h3; // Circular link pointing to itself initially
    
    struct PolyNode* p1 = h1->next;
    struct PolyNode* p2 = h2->next;
    struct PolyNode* p3 = h3;

    // Walk through both polynomials term by term
    while (p1 != h1 && p2 != h2) {
        struct PolyNode* newNode = (struct PolyNode*)malloc(sizeof(struct PolyNode));
        
        if (p1->exp == p2->exp) { // Same power -> add coefficients!
            int sum = p1->coef + p2->coef;
            if (sum != 0) {
                newNode->coef = sum;
                newNode->exp = p1->exp;
                p3->next = newNode;
                p3 = newNode;
            } else {
                free(newNode); // Terms cancelled out to 0
            }
            p1 = p1->next;
            p2 = p2->next;
        } else if (p1->exp > p2->exp) { // p1 has higher power
            newNode->coef = p1->coef;
            newNode->exp = p1->exp;
            p3->next = newNode;
            p3 = newNode;
            p1 = p1->next;
        } else { // p2 has higher power
            newNode->coef = p2->coef;
            newNode->exp = p2->exp;
            p3->next = newNode;
            p3 = newNode;
            p2 = p2->next;
        }
    }

    // Attach any leftover terms from p1
    while (p1 != h1) {
        struct PolyNode* newNode = (struct PolyNode*)malloc(sizeof(struct PolyNode));
        newNode->coef = p1->coef;
        newNode->exp = p1->exp;
        p3->next = newNode;
        p3 = newNode;
        p1 = p1->next;
    }

    // Attach any leftover terms from p2
    while (p2 != h2) {
        struct PolyNode* newNode = (struct PolyNode*)malloc(sizeof(struct PolyNode));
        newNode->coef = p2->coef;
        newNode->exp = p2->exp;
        p3->next = newNode;
        p3 = newNode;
        p2 = p2->next;
    }

    p3->next = h3; // Complete the circular link back to header
    return h3;
}`,
        explanation: 'Merges two sorted lists in linear O(M + N) time, exactly like the merge step in MergeSort!'
      },
      {
        language: 'c',
        title: 'C Trick: Delete a Node given ONLY its Pointer (No Head Access!)',
        code: `// Delete node 'target' when you do NOT know the head of the list!
void deleteNodeWithoutHead(struct PolyNode* target) {
    if (target == NULL || target->next == NULL) {
        // Cannot delete the very last node with this trick
        return;
    }
    
    // Clever high school trick: Copy the next node's data into target!
    struct PolyNode* nextNode = target->next;
    target->coef = nextNode->coef;
    target->exp = nextNode->exp;
    
    // Bypass the next node and free it!
    target->next = nextNode->next;
    free(nextNode);
}`,
        explanation: 'Instead of finding the predecessor, copy the next node\'s data into target and delete the next node!'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-list-1',
        year: 'CUET 2025',
        marks: 14,
        difficulty: 'Hard',
        question: 'Write a C procedure to reorganize a given singly linked list L into two separate lists: L1 (containing unique items on their first occurrence) and L2 (containing all duplicate repeated items).',
        solution: `High School Approach:
1. First pass: Walk through the list with a tally frequency chart to count how many times each number appears.
2. Second pass: Walk through the list again. If a number appeared only 1 time, hook its node to list L1. If it appeared 2 or more times, hook its node to list L2!

C Implementation:
void splitUniqueAndDuplicates(struct Node* head, struct Node** head_unique, struct Node** head_dup) {
    *head_unique = NULL;
    *head_dup = NULL;
    struct Node* tail_u = NULL;
    struct Node* tail_d = NULL;
    
    int freq[10001] = {0}; // Tally chart for numbers up to 10000
    
    // Pass 1: Count occurrences of each number
    struct Node* curr = head;
    while (curr != NULL) {
        freq[curr->info]++;
        curr = curr->next;
    }
    
    // Pass 2: Distribute nodes into L1 and L2
    curr = head;
    while (curr != NULL) {
        struct Node* next_node = curr->next;
        curr->next = NULL; // Unhook current node
        
        if (freq[curr->info] == 1) { // Unique element -> add to L1
            if (*head_unique == NULL) {
                *head_unique = curr;
                tail_u = curr;
            } else {
                tail_u->next = curr;
                tail_u = curr;
            }
        } else { // Repeated/duplicate element -> add to L2
            if (*head_dup == NULL) {
                *head_dup = curr;
                tail_d = curr;
            } else {
                tail_d->next = curr;
                tail_d = curr;
            }
        }
        curr = next_node;
    }
}`,
        keyTakeaway: 'Always remember to set `curr->next = NULL` before attaching a node to a new list so you don\'t create dangling loops!'
      }
    ],
    quizzes: [
      {
        id: 'list-q1',
        question: 'What is the main benefit of using a Circular Header Linked List over a standard Singly Linked List?',
        options: [
          'It allows instant random access using bracket indexing list[i]',
          'It eliminates special edge cases (like inserting into an empty list) because the header node is permanent and never deleted',
          'It uses zero pointer memory',
          'It automatically sorts inserted items'
        ],
        correctIndex: 1,
        explanation: 'Because a Header node is never deleted, the list is never NULL, eliminating special if-statements for empty lists and head deletions.',
        examTip: 'The permanent header node guarantees that the pointer pointing to the list never changes.'
      }
    ]
  },
  {
    id: 'stack',
    title: 'Stack (LIFO Structure)',
    subtitle: 'The Cafeteria Tray Stack: Last-In First-Out & Infix-Postfix Math',
    icon: 'Layers',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 5 staple (Guaranteed 25–35 marks per paper). Major tested questions include: (1) Infix to Postfix conversion tables, (2) Numerical postfix evaluation with values, (3) Implementing two independent stacks inside a single shared array, (4) Recursive call stacks (e.g. Tower of Hanoi).',
    overview: 'Think of a stack of clean lunch trays in the school cafeteria or a fresh can of Pringles chips! When clean trays are washed, they are placed on the TOP of the stack. When you grab a tray for lunch, you take the TOP one. The very first tray placed at the bottom is the last one picked up. In computer science, this is called LIFO (Last-In, First-Out). You can only push (add) or pop (remove) from the single active end called `TOP`!',
    timeComplexity: {
      access: '$\\mathcal{O}(N)$ (Must pop items to reach the bottom)',
      search: '$\\mathcal{O}(N)$',
      insertion: '$\\mathcal{O}(1)$ push at `TOP`',
      deletion: '$\\mathcal{O}(1)$ pop at `TOP`',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: The Two Golden Stack Errors (Overflow & Underflow)',
        description: 'When building a stack using an array of size $N$, we maintain a pointer index called `TOP` initialized to $-1$ (meaning the stack is currently empty):',
        bulletPoints: [
          'PUSH Operation: First check if `TOP == MAX - 1`. If yes, there is no more room—this is called Stack Overflow! Otherwise, increment `TOP = TOP + 1` and place the item at `STACK[TOP]`.',
          'POP Operation: First check if `TOP == -1`. If yes, there are no items to remove—this is called Stack Underflow! Otherwise, grab `ITEM = STACK[TOP]` and decrement `TOP = TOP - 1`.',
          'PEEK / TOP: Looks at the top item without removing it.'
        ]
      },
      {
        title: 'Step 2: Why Computers use Postfix Notation (Reverse Polish)',
        description: 'Humans write math in "Infix" format ($A + B \\times C$) where operators sit between numbers, requiring PEMDAS rules and parentheses. But computers evaluate expressions left-to-right in "Postfix" format ($A B C \\times +$) where operators come after their numbers, needing zero parentheses!',
        bulletPoints: [
          'Operands (Letters & Numbers): Output directly to the postfix answer string.',
          'Left Parenthesis `(`: Push directly onto the stack.',
          'Right Parenthesis `)`: Pop operators from the stack to output until you see `(`, then discard the `(`.',
          'Operators (+, -, *, /, ^): If the operator on top of the stack has higher or equal priority, pop it to output first! Then push the current operator.'
        ]
      },
      {
        title: 'Step 3: Fitting Two Stacks in One Array (Zero Wasted Space)',
        description: 'Suppose you need two separate stacks of max size 100, but you only have an array of size 100. Instead of splitting it in half (50 slots each, where one stack might overflow while the other is empty), start Stack 1 at index 0 growing rightwards (`top1 = -1`), and start Stack 2 at index 99 growing leftwards (`top2 = 100`). They only overflow when their heads meet (`top1 + 1 == top2`), using 100% of available memory!'
      }
    ],
    cstlReference: {
      header: '#include <stack>',
      declaration: 'std::stack<int> s; // LIFO stack of integers',
      commonMethods: [
        { method: 'push(val)', description: 'Pushes val onto the top of the stack', complexity: 'O(1)' },
        { method: 'pop()', description: 'Removes the top element (does not return it)', complexity: 'O(1)' },
        { method: 'top()', description: 'Returns a reference to the current top item', complexity: 'O(1)' },
        { method: 'empty()', description: 'Returns true if the stack has 0 items', complexity: 'O(1)' },
        { method: 'size()', description: 'Returns how many items are currently in the stack', complexity: 'O(1)' }
      ],
      notes: [
        'Always check `!s.empty()` before calling `s.top()` or `s.pop()`, otherwise your program will crash with a Segmentation Fault!',
        'Under the hood, C++ builds `std::stack` on top of `std::deque` by default.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Infix to Postfix Converter with Operator Precedence',
        code: `#include <iostream>
#include <stack>
#include <string>
#include <cctype>

// Helper to return operator priority (Higher number = Higher priority)
int priority(char op) {
    if (op == '^') return 3;          // Exponents have highest priority
    if (op == '*' || op == '/') return 2; // Multiplication & Division
    if (op == '+' || op == '-') return 1; // Addition & Subtraction
    return 0;
}

std::string infixToPostfix(const std::string& infix) {
    std::stack<char> st;
    std::string postfix = "";

    for (char ch : infix) {
        if (isalnum(ch)) {
            // Operands (numbers and letters) go straight to output!
            postfix += ch;
        } else if (ch == '(') {
            st.push(ch);
        } else if (ch == ')') {
            // Pop until we find matching '('
            while (!st.empty() && st.top() != '(') {
                postfix += st.top();
                st.pop();
            }
            if (!st.empty()) st.pop(); // Remove the '(' itself
        } else { // Operator (+, -, *, /, ^)
            while (!st.empty() && priority(st.top()) >= priority(ch)) {
                if (ch == '^' && st.top() == '^') break; // '^' is right-associative
                postfix += st.top();
                st.pop();
            }
            st.push(ch);
        }
    }

    // Pop all remaining operators
    while (!st.empty()) {
        postfix += st.top();
        st.pop();
    }

    return postfix;
}

int main() {
    std::string exp = "A+B*(C-D)";
    std::cout << "Infix Expression:   " << exp << "\\n";
    std::cout << "Postfix Expression: " << infixToPostfix(exp) << "\\n"; // ABCD-*+
    return 0;
}`,
        explanation: 'Converts standard arithmetic expressions into computer-friendly Postfix notation in linear O(N) time.'
      },
      {
        language: 'c',
        title: 'C Implementation: Two Stacks in a Single Array (Exam Classic)',
        code: `#define MAX_SIZE 100

struct DualStack {
    int arr[MAX_SIZE];
    int top1; // Grows from 0 -> rightwards
    int top2; // Grows from MAX_SIZE-1 -> leftwards
};

void init(struct DualStack* ds) {
    ds->top1 = -1;
    ds->top2 = MAX_SIZE;
}

void push1(struct DualStack* ds, int val) {
    // Check if stacks have collided
    if (ds->top1 + 1 == ds->top2) {
        printf("Stack Overflow! No more room in array.\\n");
        return;
    }
    ds->top1++;
    ds->arr[ds->top1] = val;
}

void push2(struct DualStack* ds, int val) {
    if (ds->top1 + 1 == ds->top2) {
        printf("Stack Overflow! No more room in array.\\n");
        return;
    }
    ds->top2--;
    ds->arr[ds->top2] = val;
}

int pop1(struct DualStack* ds) {
    if (ds->top1 == -1) {
        printf("Stack 1 Underflow!\\n");
        return -1;
    }
    return ds->arr[ds->top1--];
}

int pop2(struct DualStack* ds) {
    if (ds->top2 == MAX_SIZE) {
        printf("Stack 2 Underflow!\\n");
        return -1;
    }
    return ds->arr[ds->top2++];
}`,
        explanation: 'Two stacks grow towards each other. Overflow only happens when the entire array is 100% full!'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-stk-1',
        year: 'CUET 2024 & 2022',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Convert the following infix expression into postfix using a complete step-by-step trace table: E = (A + B * C) / (D - E ^ F). Then evaluate the postfix expression when A=2, B=3, C=4, D=10, E=2, F=3.',
        solution: `Part 1: Infix to Postfix Conversion Table (Trace step-by-step):

| Step | Symbol Scanned | Stack Content | Postfix Expression Output |
| :--- | :--- | :--- | :--- |
| 1 | ( | ( | (empty) |
| 2 | A | ( | A |
| 3 | + | ( + | A |
| 4 | B | ( + | A B |
| 5 | * | ( + * | A B |
| 6 | C | ( + * | A B C |
| 7 | ) | (empty) | A B C * + |
| 8 | / | / | A B C * + |
| 9 | ( | / ( | A B C * + |
| 10 | D | / ( | A B C * + D |
| 11 | - | / ( - | A B C * + D |
| 12 | E | / ( - | A B C * + D E |
| 13 | ^ | / ( - ^ | A B C * + D E |
| 14 | F | / ( - ^ | A B C * + D E F |
| 15 | ) | / | A B C * + D E F ^ - |
| 16 | End | (empty) | A B C * + D E F ^ - / |

Result Postfix String: A B C * + D E F ^ - /

Part 2: Numerical Evaluation with values (A=2, B=3, C=4, D=10, E=2, F=3):
- Push 2, 3, 4 -> Stack: [2, 3, 4]
- See '*': Pop 4 and 3 -> Calculate 3 * 4 = 12 -> Push 12 -> Stack: [2, 12]
- See '+': Pop 12 and 2 -> Calculate 2 + 12 = 14 -> Push 14 -> Stack: [14]
- Push D(10), E(2), F(3) -> Stack: [14, 10, 2, 3]
- See '^': Pop 3 and 2 -> Calculate 2 ^ 3 = 8 -> Push 8 -> Stack: [14, 10, 8]
- See '-': Pop 8 and 10 -> Calculate 10 - 8 = 2 -> Push 2 -> Stack: [14, 2]
- See '/': Pop 2 and 14 -> Calculate 14 / 2 = 7 -> Push 7 -> Stack: [7]

Final Answer: Value = 7`,
        keyTakeaway: 'In subtraction (and division), order matters! When you pop two numbers, calculate: (Second Popped) - (First Popped).'
      }
    ],
    quizzes: [
      {
        id: 'stk-q1',
        question: 'Under what condition does stack overflow occur in a shared two-stack array of size N (where stack 1 starts at 0 and stack 2 starts at N-1)?',
        options: ['top1 == N/2', 'top1 == top2', 'top1 + 1 == top2', 'top2 == 0'],
        correctIndex: 2,
        explanation: 'Because stack 1 moves right (increasing index) and stack 2 moves left (decreasing index), they collide when top1 + 1 == top2.',
        examTip: 'This dual-stack design guarantees 100% space utilization.'
      },
      {
        id: 'stk-q2',
        question: 'What is the evaluated result of the postfix expression: 6 3 2 + * 5 - ?',
        options: ['25', '30', '20', '35'],
        correctIndex: 0,
        explanation: 'Trace: Push 6, 3, 2. See +: 3 + 2 = 5 -> Stack: [6, 5]. See *: 6 * 5 = 30 -> Stack: [30]. Push 5. See -: 30 - 5 = 25.',
        examTip: 'Always remember: operands pop in reverse order of how they were pushed.'
      }
    ]
  },
  {
    id: 'queue',
    title: 'Queue (FIFO & Circular Buffer)',
    subtitle: 'The Cafeteria Lunch Line: First-In First-Out & Circular Ring Math',
    icon: 'Shuffle',
    importance: '⚡ HIGH',
    cuetExamRelevance: 'Module 5 core topic. Exam questions frequently require explaining why linear queues fail due to "False Overflow", writing procedures for Circular Queue modulo math, and transferring elements between queues and stacks.',
    overview: 'Think of students lining up at the school cafeteria food counter or buying concert tickets. The very first person to join the front of the line is the first one served and leaves first. New people must join at the back (`REAR`). No cutting in line! In computer science, this is called FIFO (First-In, First-Out). Elements are enqueued at the `REAR` and dequeued from the `FRONT`.',
    timeComplexity: {
      access: '$\\mathcal{O}(N)$',
      search: '$\\mathcal{O}(N)$',
      insertion: '$\\mathcal{O}(1)$ enqueue at `REAR`',
      deletion: '$\\mathcal{O}(1)$ dequeue at `FRONT`',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: The "False Overflow" Problem in Simple Linear Queues',
        description: 'Imagine an array of 5 seats. As 5 people sit down, `REAR` reaches seat #4 (the end). Now suppose the first 3 people finish eating and leave (`FRONT` moves to seat #3). You now have 3 empty seats in front! But if a new person arrives, a simple queue checks `REAR == 4` and shouts "Queue is Full!" even though the front seats are empty! This annoying bug is called False Overflow.',
        bulletPoints: [
          'Bad solution: Shifting everyone forward every time someone leaves (costs slow $\\mathcal{O}(N)$ time per person).',
          'Smart solution: A Circular Queue! Connect seat #4 back to seat #0 in a continuous loop using the modulo clock math: `(index + 1) % MAX`.'
        ]
      },
      {
        title: 'Step 2: Circular Queue Math Made Simple',
        description: 'Using the modulo remainder operator `%`, indices wrap around like the hours on a 12-hour clock (11, 12, 1, 2...):',
        mathFormula: `\\text{Circular Queue Index Wrap: } \\text{next\\_index} = (\\text{curr\\_index} + 1) \\bmod \\text{MAX}
\\text{1. Empty Condition: } \\text{FRONT} == -1 \\text{ and } \\text{REAR} == -1
\\text{2. Full Condition: } (\\text{REAR} + 1) \\bmod \\text{MAX} == \\text{FRONT}`,
        bulletPoints: [
          'Enqueue(Item): If full, report Overflow! If currently empty, set `FRONT = REAR = 0`. Otherwise advance `REAR = (REAR + 1) % MAX` and insert `Q[REAR] = Item`.',
          'Dequeue(): If empty, report Underflow! If only 1 item was left (`FRONT == REAR`), reset `FRONT = REAR = -1`. Otherwise advance `FRONT = (FRONT + 1) % MAX`.'
        ]
      },
      {
        title: 'Step 3: Double-Ended Queue (Deque)',
        description: 'A Deque (pronounced "deck") is a flexible hybrid: it allows you to push and pop from BOTH the front and back ends in $\\mathcal{O}(1)$ time. In C++, `std::deque` is the secret powerhouse used underneath `std::stack` and `std::queue`!'
      }
    ],
    cstlReference: {
      header: '#include <queue> / #include <deque>',
      declaration: 'std::queue<int> q; // FIFO queue\nstd::deque<int> dq; // Double-ended queue',
      commonMethods: [
        { method: 'push(val)', description: 'Adds val to the back of the queue (enqueue)', complexity: 'O(1)' },
        { method: 'pop()', description: 'Removes the front element (dequeue)', complexity: 'O(1)' },
        { method: 'front()', description: 'Looks at the first element in line without removing it', complexity: 'O(1)' },
        { method: 'back()', description: 'Looks at the last element in line without removing it', complexity: 'O(1)' },
        { method: 'empty()', description: 'Returns true if the queue has 0 people in line', complexity: 'O(1)' },
        { method: 'size()', description: 'Returns count of elements currently in the queue', complexity: 'O(1)' }
      ],
      notes: [
        'Always check `!q.empty()` before calling `q.front()` or `q.pop()`.',
        'Standard `std::queue` does not support random loop indexing (`q[i]` does not exist) to strictly enforce FIFO order.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Circular Queue Class with Modulo Wraparound',
        code: `#include <iostream>
#include <vector>

class CircularQueue {
private:
    std::vector<int> arr;
    int front;
    int rear;
    int capacity;

public:
    CircularQueue(int k) : capacity(k), front(-1), rear(-1), arr(k) {}

    bool enqueue(int value) {
        if (isFull()) {
            std::cout << "Queue Full! Cannot insert " << value << "\\n";
            return false;
        }
        if (isEmpty()) {
            front = 0;
        }
        // Advance rear in a circle
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        return true;
    }

    bool dequeue() {
        if (isEmpty()) {
            std::cout << "Queue Empty!\\n";
            return false;
        }
        if (front == rear) { // Last remaining element removed
            front = -1;
            rear = -1;
        } else {
            // Advance front in a circle
            front = (front + 1) % capacity;
        }
        return true;
    }

    int getFront() const { return isEmpty() ? -1 : arr[front]; }
    int getRear() const { return isEmpty() ? -1 : arr[rear]; }
    bool isEmpty() const { return front == -1; }
    bool isFull() const { return (rear + 1) % capacity == front; }
};

int main() {
    CircularQueue cq(5);
    cq.enqueue(10);
    cq.enqueue(20);
    cq.enqueue(30);
    cq.enqueue(40);
    cq.enqueue(50); // Queue is full (5/5 slots used)

    cq.dequeue(); // Removes 10 from front (slot 0 is now free!)
    cq.enqueue(60); // Wraps around to slot 0 smoothly!

    std::cout << "Front item: " << cq.getFront() << ", Rear item: " << cq.getRear() << "\\n";
    return 0;
}`,
        explanation: 'Shows how element 60 wraps around to index 0 after element 10 is dequeued!'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-que-1',
        year: 'CUET 2025 & 2021',
        marks: 10,
        difficulty: 'Medium',
        question: 'What is the "False Overflow" problem in linear array queues? Write the algorithm for QINSERT and QDELETE in a Circular Queue of capacity N.',
        solution: `High School Explanation:
1. False Overflow:
In a regular linear array, as items are removed from FRONT and added to REAR, both pointers move rightward. When REAR reaches index N-1, the queue claims it is "Full" even if slots 0 to FRONT-1 are empty! Circular queues fix this by wrapping pointers using modulo math.

2. Procedure QINSERT(Q, N, FRONT, REAR, ITEM):
Step 1: [Check if Queue is Full]
        If (FRONT == 0 and REAR == N - 1) or (FRONT == REAR + 1):
            Print "Queue Overflow" and Exit.
Step 2: [Check if Queue is Empty]
        If FRONT == -1:
            Set FRONT = 0, REAR = 0.
        Else if REAR == N - 1:
            Set REAR = 0 (wrap around).
        Else:
            Set REAR = REAR + 1.
Step 3: Set Q[REAR] = ITEM.
Step 4: Exit.

3. Procedure QDELETE(Q, N, FRONT, REAR, ITEM):
Step 1: [Check if Queue is Empty]
        If FRONT == -1:
            Print "Queue Underflow" and Exit.
Step 2: Set ITEM = Q[FRONT].
Step 3: [Check if only 1 item was present]
        If FRONT == REAR:
            Set FRONT = -1, REAR = -1 (reset to empty).
        Else if FRONT == N - 1:
            Set FRONT = 0 (wrap around).
        Else:
            Set FRONT = FRONT + 1.
Step 4: Return ITEM.`,
        keyTakeaway: 'Always highlight the single-element reset condition: when FRONT == REAR, reset both to -1.'
      }
    ],
    quizzes: [
      {
        id: 'que-q1',
        question: 'In a circular queue of capacity 8 with FRONT = 3 and REAR = 2, what is the state of the queue?',
        options: ['Empty', 'Full', 'Contains 1 element', 'Invalid state'],
        correctIndex: 1,
        explanation: 'The full condition is (REAR + 1) % MAX == FRONT. Here (2 + 1) % 8 = 3 == FRONT, meaning REAR is right behind FRONT and the queue is completely full.',
        examTip: 'When REAR + 1 modulo MAX equals FRONT, every single slot in the ring buffer is occupied.'
      }
    ]
  },
  {
    id: 'priority-queue',
    title: 'Priority Queue & Heaps',
    subtitle: 'The Hospital Emergency Room: Max/Min Heaps & Heapsort',
    icon: 'TrendingUp',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Module 3 (Sorting & Heaps) and Module 1 (Huffman prefix trees). Guaranteed 15–25 marks. Key tested formats: (1) Converting an unsorted array into a Max/Min heap, (2) Tracing step-by-step array states during Heapsort, (3) Huffman encoding 2-trees.',
    overview: 'Imagine a hospital Emergency Room. If someone arrives with a minor scratch, they wait. But if an ambulance rushes in with an emergency, they jump straight to the very front of the line, even if they arrived later! In computer science, this is called a Priority Queue. Instead of serving people by arrival time, it always serves the item with the highest (or lowest) priority first. The most efficient way to build this is a Binary Heap (a tree stored flat in a regular array with zero pointers)!',
    timeComplexity: {
      access: '$\\mathcal{O}(1)$ to inspect the highest priority item (at the root `arr[0]`)',
      search: '$\\mathcal{O}(N)$',
      insertion: '$\\mathcal{O}(\\log N)$ sift-up',
      deletion: '$\\mathcal{O}(\\log N)$ extract-root & sift-down',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: Storing a Binary Tree in a Flat Array (No Pointers Needed!)',
        description: 'A Binary Heap is a "Complete Binary Tree" (every level is packed full from left to right). Because there are no missing holes, we don\'t need linked list pointers! We can map parent and child relationships using simple arithmetic:',
        mathFormula: `\\text{For any node at array index } i \\text{ (0-indexed):}
- \\text{Parent Index: } \\text{parent}(i) = \\lfloor (i - 1) / 2 \\rfloor
- \\text{Left Child Index: } \\text{left}(i) = 2i + 1
- \\text{Right Child Index: } \\text{right}(i) = 2i + 2
- \\text{Leaf nodes (nodes with no children) start at index } \\lfloor N / 2 \\rfloor`,
        bulletPoints: [
          'Example: Node at index 0 (Root) has Left Child at $2(0)+1 = 1$ and Right Child at $2(0)+2 = 2$.',
          'Node at index 1 has Left Child at $2(1)+1 = 3$ and Right Child at $2(1)+2 = 4$.'
        ]
      },
      {
        title: 'Step 2: Max-Heap vs Min-Heap Rules',
        description: 'There are two varieties of heaps depending on what comes first:',
        bulletPoints: [
          'Max-Heap: Every parent must be greater than or equal to its children (`arr[parent] >= arr[child]`). The largest item is always at the root (`arr[0]`).',
          'Min-Heap: Every parent must be smaller than or equal to its children (`arr[parent] <= arr[child]`). The smallest item is always at the root (`arr[0]`).',
          'Sift-Up (Adding a new item): Put new item at the array end. If it is larger than its parent, swap them! Repeat until heap order is restored (at most $\\mathcal{O}(\\log N)$ swaps).',
          'Sift-Down (Removing the root): Take the root out, move the last item in the array to the root, and bubble it down by swapping with its largest child.'
        ]
      },
      {
        title: 'Step 3: How Heapsort Works in 2 Easy Steps',
        description: 'Heapsort sorts an entire array in $\\mathcal{O}(N \\log N)$ time using $\\mathcal{O}(1)$ extra memory:',
        bulletPoints: [
          '1. Build a Max-Heap out of the unsorted array in $\\mathcal{O}(N)$ time (working bottom-up from index $N/2 - 1$ down to 0).',
          '2. Swap the largest element `arr[0]` with the last element `arr[N-1]`. Now the biggest number is in its final sorted position at the back! Shrink the active heap size by 1 and call Sift-Down on the root. Repeat until all items are sorted!'
        ]
      }
    ],
    cstlReference: {
      header: '#include <queue>',
      declaration: 'std::priority_queue<int> maxHeap; // Default Max-Heap\nstd::priority_queue<int, std::vector<int>, std::greater<int>> minHeap; // Min-Heap',
      commonMethods: [
        { method: 'push(val)', description: 'Inserts val and bubbles it up to its correct position in O(log N)', complexity: 'O(log N)' },
        { method: 'pop()', description: 'Removes the root (largest item in Max-Heap) in O(log N)', complexity: 'O(log N)' },
        { method: 'top()', description: 'Returns the root item (largest in Max-Heap, smallest in Min-Heap)', complexity: 'O(1)' },
        { method: 'empty()', description: 'Returns true if heap has 0 items', complexity: 'O(1)' },
        { method: 'size()', description: 'Returns total number of items in the heap', complexity: 'O(1)' }
      ],
      notes: [
        'By default, C++ `std::priority_queue` is a Max-Heap (gives the biggest number first).',
        'To make a Min-Heap (smallest number first), write: `std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;`.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Heapsort Algorithm & Priority Queue Usage',
        code: `#include <iostream>
#include <vector>
#include <queue>

// Sift-down helper function
void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If largest is not the parent, swap and continue bubbling down
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

// Full In-Place Heapsort
void heapSort(std::vector<int>& arr) {
    int n = arr.size();

    // Step 1: Build Max-Heap (start from last non-leaf node)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Step 2: Extract elements one by one from heap
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]); // Move current max to the end
        heapify(arr, i, 0); // Restore heap on the remaining elements
    }
}

int main() {
    std::vector<int> arr = {44, 30, 50, 22, 60, 55, 77};
    std::cout << "Original Array: ";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";

    heapSort(arr);

    std::cout << "Sorted Array:   ";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";

    return 0;
}`,
        explanation: 'Heapsort builds a Max-Heap in O(N) and then extracts items one-by-one in O(N log N) total time.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-heap-1',
        year: 'CUET 2024 & 2022',
        marks: 14,
        difficulty: 'Exam Classic',
        question: 'Given the array: [44, 30, 50, 22, 60, 55, 77, 55]. (a) Convert this array into a Max-Heap using bottom-up Build-Heap. (b) Trace the array states for the first 3 delete-root steps in Heapsort.',
        solution: `Let's solve this step-by-step:

Part (a): Bottom-up Max-Heap Construction
Array size N = 8. Indices are 0 to 7:
[0]=44, [1]=30, [2]=50, [3]=22, [4]=60, [5]=55, [6]=77, [7]=55

The last non-leaf node is at index = floor(8/2) - 1 = 3.
We run heapify from index 3 down to index 0:

- At i=3 (val=22, child left [7]=55):
  Swap 22 and 55 -> arr[3]=55, arr[7]=22.
- At i=2 (val=50, left child [5]=55, right child [6]=77):
  Larger child is 77 -> Swap 50 and 77 -> arr[2]=77, arr[6]=50.
- At i=1 (val=30, left child [3]=55, right child [4]=60):
  Larger child is 60 -> Swap 30 and 60 -> arr[1]=60, arr[4]=30.
- At i=0 (val=44, left child [1]=60, right child [2]=77):
  Larger child is 77 -> Swap 44 and 77 -> arr[0]=77, arr[2]=44.
  Sub-heapify at index 2 (val=44, children [5]=55, [6]=50):
  Larger child is 55 -> Swap 44 and 55 -> arr[2]=55, arr[5]=44.

Final Max-Heap Array: [77, 60, 55, 55, 30, 44, 50, 22]

Part (b): First 3 Heapsort Extraction Steps:
- Step 1: Swap arr[0] (77) and arr[7] (22). Heap size becomes 7.
  Array: [22, 60, 55, 55, 30, 44, 50 | 77]
  Heapify root: 22 swaps with 60, then 22 swaps with 55.
  State 1: [60, 55, 55, 22, 30, 44, 50 | 77]

- Step 2: Swap arr[0] (60) and arr[6] (50). Heap size becomes 6.
  Array: [50, 55, 55, 22, 30, 44 | 60, 77]
  Heapify root: 50 swaps with 55.
  State 2: [55, 50, 55, 22, 30, 44 | 60, 77]

- Step 3: Swap arr[0] (55) and arr[5] (44). Heap size becomes 5.
  Array: [44, 50, 55, 22, 30 | 55, 60, 77]
  Heapify root: 44 swaps with 55.
  State 3: [55, 50, 44, 22, 30 | 55, 60, 77]`,
        keyTakeaway: 'Always use a vertical bar (|) to clearly separate active heap elements on the left from already-sorted elements on the right.'
      }
    ],
    quizzes: [
      {
        id: 'hp-q1',
        question: 'What is the tight asymptotic time complexity of building a Binary Heap of N elements using bottom-up Build-Heap?',
        options: ['O(N log N)', 'O(N)', 'O(log N)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'Bottom-up Build-Heap takes linear O(N) time because most nodes sit near the bottom with short travel distances (mathematically sum of h / 2^h = 2).',
        examTip: 'Remember: Building a heap all at once takes O(N) time, whereas inserting N elements one-by-one takes O(N log N).'
      }
    ]
  },
  {
    id: 'set',
    title: 'Set (Ordered & Unordered)',
    subtitle: 'The Unique Sticker Album: Red-Black Trees & Hash Tables',
    icon: 'ShieldCheck',
    importance: '⚡ HIGH',
    cuetExamRelevance: 'Directly linked to Module 1 (AVL Trees & BST Search) and Module 7 (Hash Tables & Collision Resolution). Exam questions require writing procedures to eliminate duplicates, solving hash collisions with Linear/Quadratic probing, and computing load factors.',
    overview: 'Imagine you are collecting trading cards or football player stickers in an official collector\'s book. You only keep one of each player. If a friend offers you a sticker you already own, you don\'t add a duplicate! In computer science, this is called a Set. A Set guarantees that every single element inside is strictly unique. In C++, `std::set` keeps everything sorted using a self-balancing tree, while `std::unordered_set` uses hash buckets for instant $\\mathcal{O}(1)$ lookup!',
    timeComplexity: {
      access: 'N/A (Keys only)',
      search: '$\\mathcal{O}(\\log N)$ for `std::set` / $\\mathcal{O}(1)$ avg for `std::unordered_set`',
      insertion: '$\\mathcal{O}(\\log N)$ for `std::set` / $\\mathcal{O}(1)$ avg for `std::unordered_set`',
      deletion: '$\\mathcal{O}(\\log N)$ for `std::set` / $\\mathcal{O}(1)$ avg for `std::unordered_set`',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: Ordered Set (Tree) vs Unordered Set (Hash Table)',
        description: 'C++ gives you two awesome types of sets. Here is how high school students choose between them:',
        bulletPoints: [
          '`std::set` (Ordered Set): Stores items in a balanced Red-Black Binary Search Tree. Elements are always automatically sorted (e.g. 12, 34, 45, 89). Search, insert, and delete are guaranteed $\\mathcal{O}(\\log N)$ time even in the worst case.',
          '`std::unordered_set` (Hash Set): Stores items in hash buckets like numbered pigeonholes. Elements are NOT sorted, but finding an item takes super-fast $\\mathcal{O}(1)$ average time!',
          '`std::multiset`: A special variation that permits duplicate numbers while keeping them sorted.'
        ]
      },
      {
        title: 'Step 2: Binary Search Tree Invariant (Connection to AVL Trees)',
        description: 'In an ordered set, every node follows the Golden Rule of Binary Search Trees (BST):',
        mathFormula: `\\text{BST Rule: } \\text{All values in Left Subtree} < \\text{Node Value} < \\text{All values in Right Subtree}
\\text{Balanced Height Bound: } \\text{Height } h \\le 2 \\log_2(N + 1)`,
        bulletPoints: [
          'Because the tree is automatically balanced with Red and Black node rules, searching for any item among 1,000,000 numbers takes only $\\approx 20$ comparisons!'
        ]
      },
      {
        title: 'Step 3: What is a Hash Collision? (Linear vs Quadratic Probing)',
        description: 'In an unordered set, a Math function $h(k) = k \\bmod M$ converts your key into a bucket slot index. But what if two different numbers want the same slot (e.g. $23 \\bmod 11 = 1$ and $34 \\bmod 11 = 1$)? This is called a Hash Collision!',
        bulletPoints: [
          'Linear Probing: If slot $h(k)$ is occupied, look at the very next slot $(h(k) + 1) \\bmod M$, then $(h(k) + 2) \\bmod M$... (Can cause "Primary Clustering" where long clumps of occupied slots form).',
          'Quadratic Probing: Check $(h(k) + 1^2) \\bmod M$, then $(h(k) + 2^2) \\bmod M$, then $(h(k) + 3^2) \\bmod M$ to jump further away and prevent clumps!',
          'Separate Chaining: Give each bucket slot its own little linked list to hold colliding items.'
        ]
      }
    ],
    cstlReference: {
      header: '#include <set> / #include <unordered_set>',
      declaration: 'std::set<int> orderedSet; // Sorted BST\nstd::unordered_set<int> hashSet; // Fast hash table',
      commonMethods: [
        { method: 'insert(val)', description: 'Adds val to the set; automatically ignores if duplicate', complexity: 'O(log N) / O(1) avg' },
        { method: 'find(val)', description: 'Searches for val; returns iterator if found, else set.end()', complexity: 'O(log N) / O(1) avg' },
        { method: 'count(val)', description: 'Returns 1 if present, 0 if absent', complexity: 'O(log N) / O(1) avg' },
        { method: 'erase(val)', description: 'Deletes val from the set', complexity: 'O(log N) / O(1) avg' },
        { method: 'lower_bound(val)', description: 'Finds first element >= val (std::set only)', complexity: 'O(log N)' },
        { method: 'upper_bound(val)', description: 'Finds first element > val (std::set only)', complexity: 'O(log N)' }
      ],
      notes: [
        'Elements inside a set are read-only (immutable). If you want to change a value, erase the old one and insert the new one!',
        'Looping through `std::set` with a for-loop automatically prints items in clean ascending sorted order.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Set vs Unordered Set in Action',
        code: `#include <iostream>
#include <set>
#include <unordered_set>

int main() {
    // 1. Ordered Set (Automatically sorts and removes duplicates)
    std::set<int> mySet;
    mySet.insert(45);
    mySet.insert(12);
    mySet.insert(89);
    mySet.insert(12); // Duplicate! Will be silently ignored
    mySet.insert(34);

    std::cout << "Ordered Set (Always Sorted): ";
    for (int val : mySet) {
        std::cout << val << " "; // Prints: 12 34 45 89
    }
    std::cout << "\\n";

    // 2. Fast search using find()
    if (mySet.find(45) != mySet.end()) {
        std::cout << "Key 45 exists in the set!\\n";
    }

    // 3. Lower bound (First number >= target)
    auto it = mySet.lower_bound(30); // Finds 34
    std::cout << "First element >= 30 is: " << *it << "\\n";

    return 0;
}`,
        explanation: 'Shows how std::set ignores duplicate 12 and keeps all elements in sorted order.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-set-1',
        year: 'CUET 2024 & 2022',
        marks: 10,
        difficulty: 'Hard',
        question: 'Explain Hash Collision resolution using Linear Probing. Given hash function h(k) = k mod 11, insert keys: 23, 34, 45, 12, 56, 67, 78 into a table of size M=11.',
        solution: `Let's trace each insertion into Table T[0..10] step-by-step:

Linear Probing Formula:
h'(k, i) = (h(k) + i) mod 11, where i is probe attempt 0, 1, 2, 3...

1. Insert 23: h(23) = 23 mod 11 = 1. Slot T[1] is empty -> Put 23 at T[1].
2. Insert 34: h(34) = 34 mod 11 = 1. Collision at T[1]!
   Try i=1: (1 + 1) mod 11 = 2. Slot T[2] is empty -> Put 34 at T[2].
3. Insert 45: h(45) = 45 mod 11 = 1. Collision at T[1] and T[2]!
   Try i=2: (1 + 2) mod 11 = 3. Slot T[3] is empty -> Put 45 at T[3].
4. Insert 12: h(12) = 12 mod 11 = 1. Collision at T[1], T[2], T[3]!
   Try i=3: (1 + 3) mod 11 = 4. Slot T[4] is empty -> Put 12 at T[4].
5. Insert 56: h(56) = 56 mod 11 = 1. Collision at T[1]..T[4]!
   Try i=4: (1 + 4) mod 11 = 5. Slot T[5] is empty -> Put 56 at T[5].
6. Insert 67: h(67) = 67 mod 11 = 1. Collision at T[1]..T[5]!
   Try i=5: (1 + 5) mod 11 = 6. Slot T[6] is empty -> Put 67 at T[6].
7. Insert 78: h(78) = 78 mod 11 = 1. Collision at T[1]..T[6]!
   Try i=6: (1 + 6) mod 11 = 7. Slot T[7] is empty -> Put 78 at T[7].

Final Hash Table Array:
T[0]: NULL
T[1]: 23, T[2]: 34, T[3]: 45, T[4]: 12, T[5]: 56, T[6]: 67, T[7]: 78
T[8]: NULL, T[9]: NULL, T[10]: NULL

What happened here? (Primary Clustering):
Because every single key had a hash value of 1, they formed one giant continuous block of occupied slots from index 1 to index 7! Quadratic probing avoids this by taking bigger jumping steps.`,
        keyTakeaway: 'Always state that Linear Probing suffers from "Primary Clustering" to secure full marks in exam theory questions.'
      }
    ],
    quizzes: [
      {
        id: 'set-q1',
        question: 'What underlying data structure is used to implement std::set in standard C++ STL?',
        options: ['B-Tree', 'Red-Black Tree (Self-Balancing BST)', 'Array Hash Table', 'Singly Linked List'],
        correctIndex: 1,
        explanation: 'std::set uses a balanced Red-Black Tree, which guarantees O(log N) time for search, insertion, and deletion while keeping elements sorted.',
        examTip: 'Red-Black BST guarantees the tree height never exceeds 2 * log2(N + 1).'
      }
    ]
  },
  {
    id: 'map',
    title: 'Map (Associative Key-Value)',
    subtitle: 'The School Phonebook Directory: Key-Value Pairs & Graph Connections',
    icon: 'Compass',
    importance: '🔥 CRITICAL',
    cuetExamRelevance: 'Tested in Module 2 (Graph Adjacency Lists & BFS/DFS), Module 7 (Hash Dictionaries), and Module 9 (Word Frequency Analysis). Fundamental for shortest path graph algorithms (Dijkstra, Prim).',
    overview: 'Think of your smartphone\'s contact list or an English dictionary! In an array, you look up items by a boring number index like `arr[0]`, `arr[1]`. But in a Map, you look up values using any Key you want—like searching for `"Alice"` to get her phone number `9876543210`, or searching for `"Apple"` to get its definition! In computer science, this is called an Associative Key-Value Container. Keys are strictly unique and act like custom labels for your data.',
    timeComplexity: {
      access: '$\\mathcal{O}(\\log N)$ for `std::map` / $\\mathcal{O}(1)$ avg for `std::unordered_map`',
      search: '$\\mathcal{O}(\\log N)$ for `std::map` / $\\mathcal{O}(1)$ avg for `std::unordered_map`',
      insertion: '$\\mathcal{O}(\\log N)$ for `std::map` / $\\mathcal{O}(1)$ avg for `std::unordered_map`',
      deletion: '$\\mathcal{O}(\\log N)$ for `std::map` / $\\mathcal{O}(1)$ avg for `std::unordered_map`',
      space: '$\\mathcal{O}(N)$'
    },
    keyConcepts: [
      {
        title: 'Step 1: The Magic of Key-Value Pairs',
        description: 'Each entry in a map is a pair: `std::pair<const Key, Value>`. The Key is the label you search by, and the Value is the payload data attached to it:',
        bulletPoints: [
          'Super-useful feature: Writing `myMap["apple"]++` counts word frequencies in 1 line! If "apple" was never seen before, the map creates it with count 0 and increments it to 1.',
          'Beware: Simply reading `int x = myMap["missing_key"];` will automatically insert "missing_key" with value 0! To check if a key exists without inserting it, use `myMap.find("key") != myMap.end()`.'
        ]
      },
      {
        title: 'Step 2: Representing Networks & Graphs using Maps',
        description: 'In computer science exams, cities and road networks are called Graphs. You can represent the entire road map of a country with a Map of neighbor lists (called an Adjacency List):',
        mathFormula: `\\text{Graph Adjacency Map: } \\text{std::map<string, vector<pair<string, int>>> roadMap;}
\\text{Example: } \\text{"Delhi"} \\to \\{ (\\text{"Mumbai"}, 1400\\text{km}), (\\text{"Jaipur"}, 280\\text{km}) \\}`,
        bulletPoints: [
          'Adjacency List vs Matrix: An Adjacency List uses only $\\mathcal{O}(V + E)$ memory (only storing roads that actually exist), whereas an Adjacency Matrix wastes $\\mathcal{O}(V^2)$ memory on empty grid cells!'
        ]
      },
      {
        title: 'Step 3: Ordered Map vs Unordered Map',
        description: 'Just like sets, `std::map` uses a Red-Black BST (keeping keys in alphabetical/numerical order with guaranteed $\\mathcal{O}(\\log N)$ speed), while `std::unordered_map` uses a Hash Table (fast $\\mathcal{O}(1)$ average lookup, but unordered keys).'
      }
    ],
    cstlReference: {
      header: '#include <map> / #include <unordered_map>',
      declaration: 'std::map<std::string, int> wordCounts; // Alphabetical order\nstd::unordered_map<int, std::string> studentIdToName; // Hash lookup',
      commonMethods: [
        { method: 'operator[key]', description: 'Gets or sets the value for key; creates default if missing', complexity: 'O(log N) / O(1) avg' },
        { method: 'find(key)', description: 'Returns iterator to pair if key exists, else map.end()', complexity: 'O(log N) / O(1) avg' },
        { method: 'count(key)', description: 'Returns 1 if key exists, else 0', complexity: 'O(log N) / O(1) avg' },
        { method: 'erase(key)', description: 'Deletes the key-value pair matching key', complexity: 'O(log N) / O(1) avg' },
        { method: 'size()', description: 'Returns total number of unique keys stored', complexity: 'O(1)' }
      ],
      notes: [
        'When looping through `std::map`, elements arrive as pairs: `pair.first` is the Key, and `pair.second` is the Value.',
        'In modern C++17, you can write clean loops like: `for (auto& [key, value] : myMap)`.'
      ]
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++ Word Frequency Counter & Graph Adjacency Map',
        code: `#include <iostream>
#include <map>
#include <vector>
#include <string>

int main() {
    // 1. Word Frequency Counter
    std::string text = "apple banana apple cherry apple banana";
    std::map<std::string, int> freq;
    
    // Tally words
    std::string word = "";
    for (char ch : text) {
        if (ch == ' ') {
            if (!word.empty()) freq[word]++;
            word = "";
        } else {
            word += ch;
        }
    }
    if (!word.empty()) freq[word]++;

    std::cout << "Word Frequencies (Alphabetical):\\n";
    for (const auto& [fruit, count] : freq) {
        std::cout << "  " << fruit << ": " << count << " times\\n";
    }

    // 2. Graph Road Network (City -> List of Connected Cities & Distance)
    std::map<std::string, std::vector<std::pair<std::string, int>>> cityGraph;
    cityGraph["Delhi"].push_back({"Jaipur", 280});
    cityGraph["Delhi"].push_back({"Agra", 230});
    cityGraph["Jaipur"].push_back({"Udaipur", 390});

    std::cout << "\\nRoads starting from Delhi:\\n";
    for (auto edge : cityGraph["Delhi"]) {
        std::cout << "  -> " << edge.first << " (" << edge.second << " km)\\n";
    }

    return 0;
}`,
        explanation: 'Demonstrates word counting and network graph representation using C++ map.'
      }
    ],
    examQuestions: [
      {
        id: 'cuet-map-1',
        year: 'CUET 2023',
        marks: 12,
        difficulty: 'Hard',
        question: 'Why does an Adjacency List save memory compared to an Adjacency Matrix for sparse graphs? Write the adjacency list structure for a graph with vertices V={A, B, C, D} and directed weighted edges: (A,B,5), (A,C,3), (B,D,2), (C,D,7).',
        solution: `High School Breakdown:

1. Memory Comparison:
- Adjacency Matrix uses a giant 2D grid of size |V| x |V|. For 1,000 cities with only 2,000 roads, the matrix still allocates 1,000,000 cells (most filled with 0s or infinity, wasting 99.8% of memory!).
- Adjacency List only allocates memory for roads that actually exist, using O(|V| + |E|) memory!

2. Adjacency List for the given graph:
- Vertex A has roads to B (weight 5) and C (weight 3):
  A: -> [Node: B, Weight: 5] -> [Node: C, Weight: 3] -> NULL
- Vertex B has road to D (weight 2):
  B: -> [Node: D, Weight: 2] -> NULL
- Vertex C has road to D (weight 7):
  C: -> [Node: D, Weight: 7] -> NULL
- Vertex D has no outgoing roads:
  D: -> NULL

3. Algorithmic Comparison:
- Finding all neighbors of node u:
  Adjacency List takes O(degree(u)) time (instant!).
  Adjacency Matrix takes slow O(|V|) time (must scan the whole row).`,
        keyTakeaway: 'For sparse graphs (where edges |E| are much fewer than |V|²), always choose an Adjacency List.'
      }
    ],
    quizzes: [
      {
        id: 'map-q1',
        question: 'What happens in C++ std::map if you write `int val = myMap["missing_key"];` for a key that does not exist?',
        options: [
          'The program throws an out_of_range exception',
          'It returns a null pointer',
          'It automatically inserts "missing_key" with default value 0 into the map and returns 0',
          'It returns -1 without modifying the map'
        ],
        correctIndex: 2,
        explanation: 'operator[] automatically inserts a default-constructed value (0 for numbers) if the key is missing.',
        examTip: 'To check if a key exists without accidentally inserting it, use myMap.find(key) != myMap.end().'
      }
    ]
  }
];
