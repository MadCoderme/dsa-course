import { Lesson } from '../../types';

export const ARRAY_OPERATIONS_LESSON: Lesson = {
  id: 'array-operations',
  categoryId: 'algorithms',
  subCategoryId: 'array-operations-sub',
  title: 'Array Operations & Memory Addressing (1D, 2D & N-D)',
  subtitle: 'Classical procedural pseudo-code for Insert/Delete, Row-Major vs. Column-Major layout, and N-D address formulas',
  icon: 'Layers',
  importance: '🔥 CRITICAL',
  cuetExamRelevance: 'A permanent staple of university examinations (Module 8 & Section-B). You are guaranteed a 10–14 mark question requiring: (1) writing formal procedural pseudo-code for INSERT(LA, N, K, ITEM) or DELETE(LA, N, K, ITEM), and (2) calculating the exact byte address of elements in 2D and 3D arrays under Row-Major and Column-Major ordering.',
  overview: 'Arrays are the most fundamental building block in computer science. While programmers often take indexing like `A[i][j]` for granted, computer hardware only understands a flat, 1-dimensional strip of bytes in RAM. In this lesson, we study the formal algorithms for linear array operations (traversal, insertion, deletion with element shifting), understand how multidimensional matrices are flattened into memory via Row-Major and Column-Major schemes, and master the general N-dimensional address calculation formula.',
  timeComplexity: {
    access: '$\\mathcal{O}(1)$ Instant random access via direct base + offset computation',
    search: '$\\mathcal{O}(N)$ Linear search across unsorted elements',
    insertion: '$\\mathcal{O}(N)$ Inserting at index K requires shifting $(N - K)$ elements right',
    deletion: '$\\mathcal{O}(N)$ Deleting at index K requires shifting $(N - K - 1)$ elements left',
    space: '$\\mathcal{O}(N)$ Contiguous physical block with zero pointer overhead'
  },
  keyConcepts: [
    {
      title: 'Step 1: Linear Array (1D) Representation & Address Formula',
      description: 'A Linear Array (LA) is a list of a finite number of homogeneous data elements stored in contiguous memory locations:',
      bulletPoints: [
        'Contiguous Allocation: All elements sit right next to each other in physical RAM with no gaps.',
        'Bounds: Lower Bound (LB) is the index of the first element (typically 0 in C/C++/Java, or 1 in mathematical textbooks). Upper Bound (UB) is the index of the last element. Length $N = \\text{UB} - \\text{LB} + 1$.',
        'Direct Address Formula: The computer computes the physical memory address of the $K$-th element instantly in $\\mathcal{O}(1)$ time without traversing intermediate elements:'
      ],
      mathFormula: `1D Address Calculation Formula:
LOC(LA[K]) = Base(LA) + w * (K - LB)

Where:
- Base(LA) = Physical starting memory address of the first element LA[LB]
- w = Element size in bytes (e.g., 4 bytes for int/float, 8 bytes for double)
- K = Target index to access
- LB = Lower bound index (usually 0 or 1)`
    },
    {
      title: 'Step 2: Formal Pseudo-Code for Linear Array Insertion',
      description: 'Inserting an element ITEM at index K requires creating an empty slot by shifting all elements from index (N - 1) down to K one position to the right:',
      bulletPoints: [
        'Overflow Check: If $N = \\text{MAX}$, the physical buffer is full; attempting to insert causes an OVERFLOW error.',
        'Right-to-Left Shifting: Shifting MUST proceed from right to left (from the end backward) to avoid overwriting existing data.',
        'Time Complexity: Best Case $\\mathcal{O}(1)$ (insert at end, 0 shifts); Worst Case $\\mathcal{O}(N)$ (insert at index 0, shifts all $N$ elements); Average Case $N/2$ shifts $\\implies \\mathcal{O}(N)$.'
      ],
      mathFormula: `Algorithm: INSERT(LA, N, K, ITEM)
Here LA is a linear array with N elements, and K is a valid position (LB <= K <= LB + N).
This algorithm inserts ITEM at position K.

1. [Check for Overflow]
   If N = MAX, then:
      Write: "OVERFLOW: Array buffer is completely full."
      Exit.
   [End of If structure]

2. [Initialize counter to the last element]
   Set J := N - 1.

3. [Shift elements right]
   Repeat Steps 4 and 5 while J >= K:
4.    Set LA[J + 1] := LA[J].
5.    Set J := J - 1.
   [End of Step 3 loop]

6. [Insert new element]
   Set LA[K] := ITEM.

7. [Reset total count N]
   Set N := N + 1.

8. Exit.`
    },
    {
      title: 'Step 3: Formal Pseudo-Code for Linear Array Deletion',
      description: 'Deleting an element at index K leaves an empty gap that must be filled by shifting all elements from (K + 1) up to (N - 1) one position to the left:',
      bulletPoints: [
        'Underflow Check: If $N = 0$, the array contains no elements; attempting deletion causes an UNDERFLOW error.',
        'Left-to-Right Shifting: Shifting MUST proceed from left to right (from $K$ forward) to pull neighbor values into the hole.',
        'Time Complexity: Best Case $\\mathcal{O}(1)$ (delete at end, 0 shifts); Worst Case $\\mathcal{O}(N)$ (delete at index 0, shifts $N - 1$ elements); Average Case $N/2$ shifts $\\implies \\mathcal{O}(N)$.'
      ],
      mathFormula: `Algorithm: DELETE(LA, N, K, ITEM)
Here LA is a linear array with N elements, and K is a valid index (LB <= K < LB + N).
This algorithm removes the element at position K and stores it in ITEM.

1. [Check for Underflow]
   If N = 0, then:
      Write: "UNDERFLOW: Array is empty."
      Exit.
   [End of If structure]

2. [Save deleted element]
   Set ITEM := LA[K].

3. [Initialize counter to the gap position]
   Set J := K.

4. [Shift elements left to fill the gap]
   Repeat Steps 5 and 6 while J <= N - 2:
5.    Set LA[J] := LA[J + 1].
6.    Set J := J + 1.
   [End of Step 4 loop]

7. [Reset total count N]
   Set N := N - 1.

8. Exit.`
    },
    {
      title: 'Step 4: Two-Dimensional (2D) Arrays: Row-Major vs. Column-Major',
      description: 'A 2D array $A[R \\times C]$ has $R$ rows and $C$ columns. Because computer memory is 1-dimensional, the elements must be linearized:',
      bulletPoints: [
        'Row-Major Order (RMO): Used by C, C++, Python, Java. The array is stored row by row. All elements of row 0 come first, followed by row 1, row 2, etc.',
        'Column-Major Order (CMO): Used by Fortran, MATLAB, Julia, R. The array is stored column by column. All elements of column 0 come first, followed by column 1, etc.',
        'The Dimensions: Let Row bounds be $\\text{LB}_1..\\text{UB}_1$ (Total rows $R = \\text{UB}_1 - \\text{LB}_1 + 1$) and Column bounds be $\\text{LB}_2..\\text{UB}_2$ (Total columns $C = \\text{UB}_2 - \\text{LB}_2 + 1$).'
      ],
      mathFormula: `2D Address Formulas:

1. Row-Major Order (RMO):
   LOC(A[J, K]) = Base(A) + w * [ (J - LB1) * C + (K - LB2) ]
   (Skip (J - LB1) complete rows of size C, then add column offset (K - LB2))

2. Column-Major Order (CMO):
   LOC(A[J, K]) = Base(A) + w * [ (K - LB2) * R + (J - LB1) ]
   (Skip (K - LB2) complete columns of size R, then add row offset (J - LB1))`
    },
    {
      title: 'Step 5: N-Dimensional Arrays: The General Address Formula',
      description: 'Any general $n$-dimensional array $A[\\text{LB}_1..\\text{UB}_1, \\text{LB}_2..\\text{UB}_2, \\dots, \\text{LB}_n..\\text{UB}_n]$ with lengths $L_i = \\text{UB}_i - \\text{LB}_i + 1$ can be addressed with mathematical precision:',
      bulletPoints: [
        'Row-Major (Lexicographic): Index $E_1$ varies slowest, and index $E_n$ varies fastest. To access $A[E_1, E_2, \\dots, E_n]$, each dimension skips a "hyper-slice" of size equal to the product of all remaining dimension lengths!',
        'Compact Form: $\\text{LOC}(A[E_1, \\dots, E_n]) = \\text{Base} + w \\sum_{i=1}^{n} \\left[ (E_i - \\text{LB}_i) \\prod_{j=i+1}^n L_j \\right]$ where the empty product $\\prod_{j=n+1}^n L_j = 1$.',
        '3D Array Example: For $A[E_1, E_2, E_3]$ with lengths $L_1, L_2, L_3$:\n$\\text{LOC}(A[E_1, E_2, E_3]) = \\text{Base} + w \\times [ (E_1 - \\text{LB}_1)L_2L_3 + (E_2 - \\text{LB}_2)L_3 + (E_3 - \\text{LB}_3) ]$.'
      ]
    }
  ],
  cstlReference: {
    header: '#include <vector>\n#include <iostream>',
    declaration: 'int linearArr[100]; // 1D array\nint matrix[5][7];   // 2D array (Row-Major)',
    commonMethods: [
      { method: 'A[i]', description: 'Direct offset access calculated via Base + w * i', complexity: 'O(1) instant' },
      { method: 'A[i][j]', description: 'Row-major 2D offset: Base + w * (i * C + j)', complexity: 'O(1) instant' },
      { method: 'std::vector::insert(pos, val)', description: 'Inserts value, shifting subsequent elements right', complexity: 'O(N)' },
      { method: 'std::vector::erase(pos)', description: 'Erases element, shifting subsequent elements left', complexity: 'O(N)' }
    ],
    notes: [
      'Cache Locality: Iterating over a 2D array row-by-row in C/C++ (`for i... for j... A[i][j]`) is up to 10x faster than column-by-column because Row-Major layout keeps consecutive row elements together in the CPU L1/L2 cache line.',
      'In university exams, always check whether bounds start at 0 or 1, and always clearly state whether your calculations assume Row-Major or Column-Major order.'
    ]
  },
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Procedural Array Operations (Insert, Delete & Traverse in C++)',
      explanation: 'Demonstrates manual in-place element shifting for insertion and deletion according to classic algorithmic specifications.',
      code: `#include <iostream>

const int MAX = 10;

// Algorithm INSERT(LA, N, K, ITEM)
bool insertElement(int LA[], int &N, int K, int ITEM) {
    if (N >= MAX) {
        std::cout << "OVERFLOW: Array is full!\\n";
        return false;
    }
    if (K < 0 || K > N) {
        std::cout << "Invalid index K!\\n";
        return false;
    }

    // Shift elements right from N-1 down to K
    for (int J = N - 1; J >= K; J--) {
        LA[J + 1] = LA[J];
    }

    LA[K] = ITEM;
    N = N + 1;
    return true;
}

// Algorithm DELETE(LA, N, K, ITEM)
bool deleteElement(int LA[], int &N, int K, int &ITEM) {
    if (N <= 0) {
        std::cout << "UNDERFLOW: Array is empty!\\n";
        return false;
    }
    if (K < 0 || K >= N) {
        std::cout << "Invalid index K!\\n";
        return false;
    }

    ITEM = LA[K];

    // Shift elements left from K up to N-2
    for (int J = K; J <= N - 2; J++) {
        LA[J] = LA[J + 1];
    }

    N = N - 1;
    return true;
}

void printArray(const int LA[], int N) {
    std::cout << "Array [N=" << N << "]: ";
    for (int i = 0; i < N; i++) std::cout << LA[i] << " ";
    std::cout << "\\n";
}

int main() {
    int LA[MAX] = {10, 20, 30, 40, 50};
    int N = 5;

    printArray(LA, N);

    // Insert 99 at index 2
    insertElement(LA, N, 2, 99);
    printArray(LA, N); // 10 20 99 30 40 50

    // Delete element at index 1
    int removed;
    deleteElement(LA, N, 1, removed);
    std::cout << "Deleted element: " << removed << "\\n";
    printArray(LA, N); // 10 99 30 40 50

    return 0;
}`
    },
    {
      language: 'c',
      title: '2D & 3D Memory Address Calculator in C',
      explanation: 'Computes exact byte addresses using both Row-Major and Column-Major mathematical equations.',
      code: `#include <stdio.h>

// Computes 2D Row-Major Address
long get2DAddressRowMajor(long base, int w, int lb1, int ub1, int lb2, int ub2, int j, int k) {
    int C = ub2 - lb2 + 1; // Number of columns
    return base + w * ((j - lb1) * C + (k - lb2));
}

// Computes 2D Column-Major Address
long get2DAddressColMajor(long base, int w, int lb1, int ub1, int lb2, int ub2, int j, int k) {
    int R = ub1 - lb1 + 1; // Number of rows
    return base + w * ((k - lb2) * R + (j - lb1));
}

int main() {
    long base = 1000;
    int w = 4; // 4 bytes per integer
    int lb1 = 1, ub1 = 5; // 5 rows
    int lb2 = 1, ub2 = 7; // 7 columns

    int targetRow = 3;
    int targetCol = 4;

    long addrRMO = get2DAddressRowMajor(base, w, lb1, ub1, lb2, ub2, targetRow, targetCol);
    long addrCMO = get2DAddressColMajor(base, w, lb1, ub1, lb2, ub2, targetRow, targetCol);

    printf("Array A[1..5, 1..7] with Base=%ld, w=%d:\\n", base, w);
    printf("Address of A[%d, %d] in Row-Major Order:    %ld\\n", targetRow, targetCol, addrRMO);
    printf("Address of A[%d, %d] in Column-Major Order: %ld\\n", targetRow, targetCol, addrCMO);

    return 0;
}`
    }
  ],
  examQuestions: [
    {
      id: 'arr-q1',
      year: '2023 & 2021 CUET Exam (Section-B Q.5)',
      marks: 10,
      difficulty: 'Exam Classic',
      question: 'Consider a 2D array A[-2..3, 1..5] stored in memory with Base address = 2000. Each element requires 4 bytes. Calculate the address of element A[1, 4] in: (a) Row-Major Order, and (b) Column-Major Order.',
      solution: `Model University Answer:

Given Parameters:
- Row bounds: LB1 = -2, UB1 = 3
  Number of rows: R = UB1 - LB1 + 1 = 3 - (-2) + 1 = 6
- Column bounds: LB2 = 1, UB2 = 5
  Number of columns: C = UB2 - LB2 + 1 = 5 - 1 + 1 = 5
- Base Address = 2000
- Element size: w = 4 bytes
- Target element: A[J, K] = A[1, 4]  ==>  J = 1, K = 4

(a) Row-Major Order (RMO):
Formula: LOC(A[J, K]) = Base + w * [ (J - LB1) * C + (K - LB2) ]
Substitute values:
(J - LB1) = 1 - (-2) = 3 rows skipped
(K - LB2) = 4 - 1 = 3 columns offset
Offset = (3 * 5) + 3 = 15 + 3 = 18 elements
LOC(A[1, 4]) = 2000 + 4 * [ 18 ]
             = 2000 + 72
             = 2072.

(b) Column-Major Order (CMO):
Formula: LOC(A[J, K]) = Base + w * [ (K - LB2) * R + (J - LB1) ]
Substitute values:
(K - LB2) = 4 - 1 = 3 columns skipped
(J - LB1) = 1 - (-2) = 3 rows offset
Offset = (3 * 6) + 3 = 18 + 3 = 21 elements
LOC(A[1, 4]) = 2000 + 4 * [ 21 ]
             = 2000 + 84
             = 2084.

Final Answers:
(a) Address in Row-Major Order: 2072
(b) Address in Column-Major Order: 2084`,
      keyTakeaway: 'Always calculate R = (UB1 - LB1 + 1) and C = (UB2 - LB2 + 1) first. In RMO, multiply row delta by C; in CMO, multiply col delta by R.'
    },
    {
      id: 'arr-q2',
      year: '2022 & 2019 CUET Exam',
      marks: 8,
      difficulty: 'Medium',
      question: 'Write a procedural algorithm for inserting an element ITEM into a linear array LA at position K. State the best, average, and worst-case time complexities with justification.',
      solution: `Model University Answer:

Algorithm INSERT(LA, N, K, ITEM):
1. [Check Overflow]
   If N = MAX, then:
      Print "OVERFLOW: Array is full."
      Exit.
2. [Initialize pointer]
   Set J := N - 1.
3. [Shift elements to the right]
   Repeat while J >= K:
      Set LA[J + 1] := LA[J].
      Set J := J - 1.
4. [Insert element]
   Set LA[K] := ITEM.
5. [Increment size]
   Set N := N + 1.
6. Exit.

Time Complexity Analysis:
1. Best Case: O(1)
   Occurs when K = N (insertion at the end of array). The while loop runs 0 times; no elements are shifted.
2. Worst Case: O(N)
   Occurs when K = 0 (insertion at the very beginning). All N elements must be shifted right one position.
3. Average Case: O(N)
   Assuming insertion at any position from 0 to N is equally likely (probability 1/(N+1)), the average number of shifts is:
   (1 / (N + 1)) * sum_{i=0}^N (N - i) = N / 2 shifts ==> O(N).`,
      keyTakeaway: 'Linear array insertion is O(1) at the end, but O(N) in the general and worst cases due to rightward element shifting.'
    }
  ],
  quizzes: [
    {
      id: 'arr-qz-1',
      question: 'Why must element shifting during array insertion proceed from right to left (from N-1 down to K)?',
      options: [
        'To speed up memory clock cycles',
        'To avoid overwriting and losing subsequent element values',
        'Because the CPU bus only shifts backward',
        'To ensure the array stays sorted alphabetically'
      ],
      correctIndex: 1,
      explanation: 'If shifting proceeded from left to right (from K up to N-1), copying LA[K] into LA[K+1] would destroy the original value of LA[K+1] before it could be moved to LA[K+2]. Moving backward preserves each element.'
    },
    {
      id: 'arr-qz-2',
      question: 'In C/C++, how are elements of a 2D array arranged in physical memory?',
      options: [
        'Column-Major Order',
        'Row-Major Order',
        'Diagonal Order',
        'Randomized Block Hash'
      ],
      correctIndex: 1,
      explanation: 'C and C++ store 2D multidimensional arrays in Row-Major Order, meaning consecutive elements of the same row are adjacent in memory.'
    },
    {
      id: 'arr-qz-3',
      question: 'For a 2D array A[1..M, 1..N] stored in Row-Major order with element size w, what is the address of A[i, j]?',
      options: [
        'Base + w * [ (i - 1) * M + (j - 1) ]',
        'Base + w * [ (i - 1) * N + (j - 1) ]',
        'Base + w * [ (j - 1) * N + (i - 1) ]',
        'Base + w * [ i * j ]'
      ],
      correctIndex: 1,
      explanation: 'In Row-Major order, accessing row i skips (i - 1) complete rows. Since each row contains N columns, the row offset is (i - 1) * N, plus the column offset (j - 1).'
    }
  ]
};
