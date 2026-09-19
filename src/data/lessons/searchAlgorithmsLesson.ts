import { Lesson } from '../../types';

export const SEARCH_ALGORITHMS_LESSON: Lesson = {
  id: 'searching-algorithms',
  categoryId: 'algorithms',
  subCategoryId: 'search-sort-algorithms',
  title: 'Search Algorithms: Linear & Binary Search',
  subtitle: 'Sequential vs. Divide-and-Conquer Logarithmic Search with step-by-step simulations and interval halving',
  icon: 'Binary',
  importance: '🔥 CRITICAL',
  cuetExamRelevance: 'Heavily tested in university exams (Module 3 & Section-A/B). Regularly features 8–12 mark questions asking you to: (1) write procedural iterative and recursive binary search algorithms, (2) trace exact LOW, HIGH, and MID pointer updates on a given array, and (3) prove why Binary Search runs in O(log N) worst-case time.',
  overview: 'Searching is the algorithmic process of locating a specific target value within a collection of data. While Linear Search sequentially scans unsorted data one item at a time, Binary Search exploits the power of sorted ordering to eliminate half of all remaining candidates with every single comparison—transforming an impossible search through a billion items into just 30 simple steps!',
  timeComplexity: {
    access: '$\\mathcal{O}(1)$ Instant array index access',
    search: '$\\mathcal{O}(\\log N)$ Logarithmic time for Binary Search (vs $\\mathcal{O}(N)$ Linear Search)',
    insertion: '$\\mathcal{O}(N)$ Maintaining sorted order requires shifting elements',
    deletion: '$\\mathcal{O}(N)$ Removing elements requires shifting elements left',
    space: '$\\mathcal{O}(1)$ Iterative search requires only 3 pointer variables'
  },
  keyConcepts: [
    {
      title: 'Step 1: Linear Search (Sequential Scan)',
      description: 'The simplest searching algorithm: starts at index 0 and inspects elements sequentially one-by-one until the target is found or the end of the array is reached:',
      bulletPoints: [
        'No Precondition: Works on ANY array, whether sorted, unsorted, random, or containing duplicates.',
        'Best Case: $\\mathcal{O}(1)$ (target happens to be at index 0).',
        'Worst Case: $\\mathcal{O}(N)$ ($N$ comparisons when target is at index $N - 1$ or completely absent).',
        'Average Case: $\\frac{N + 1}{2}$ comparisons $\\implies \\mathcal{O}(N)$ for uniform random distribution.'
      ],
      mathFormula: `Algorithm: LINEAR_SEARCH(A, N, VAL)
1. Set POS := -1.
2. Set I := 0.
3. Repeat while I < N:
4.    If A[I] = VAL, then:
         Set POS := I.
         Exit.
      [End of If structure]
5.    Set I := I + 1.
   [End of Step 3 loop]
6. If POS = -1, write "Target not found".
7. Exit.`
    },
    {
      title: 'Step 2: Binary Search — The Power of Divide and Conquer',
      description: 'Binary Search is one of the most elegant algorithms in computer science. It requires one mandatory precondition: THE ARRAY MUST BE SORTED!',
      bulletPoints: [
        'The Phone Book Analogy: When you look up "Smith" in a phone directory, you open to the middle. If you land on "Miller", you know "Smith" must be in the right half. You instantly throw away the entire left half!',
        'Three Pointers: `LOW` (start of active window), `HIGH` (end of active window), and `MID` (middle element).',
        'Interval Halving: With each comparison, the search range $[\\text{LOW}..\\text{HIGH}]$ is cut in half ($N \\to N/2 \\to N/4 \\to \\dots \\to 1$).',
        'Logarithmic Power: Searching through 1,000,000 elements takes at most 20 comparisons ($\log_2(10^6) \\approx 19.93$)!'
      ],
      mathFormula: `Midpoint Calculation & Safe Overflow Guard:
Naive:    MID = (LOW + HIGH) / 2
Issue:    If LOW and HIGH are large (> 2^30), (LOW + HIGH) overflows 32-bit signed int into negative!
Safe:     MID = LOW + (HIGH - LOW) / 2  (Mathematically identical, zero overflow risk!)`
    },
    {
      title: 'Step 3: Formal Iterative & Recursive Pseudo-Code',
      description: 'University exams routinely ask for both the iterative while-loop and recursive versions of Binary Search:',
      bulletPoints: [
        'Iterative Loop Invariant: Active search candidate interval is always $[\\text{LOW}..\\text{HIGH}]$. Loop continues while $\\text{LOW} \\le \\text{HIGH}$.',
        'Branching Conditions: If $A[\\text{MID}] == \\text{VAL}$, return MID. If $A[\\text{MID}] > \\text{VAL}$, search left half ($\\text{HIGH} = \\text{MID} - 1$). If $A[\\text{MID}] < \\text{VAL}$, search right half ($\\text{LOW} = \\text{MID} + 1$).'
      ],
      mathFormula: `Algorithm: BINARY_SEARCH(A, N, VAL)
Here A is a sorted array of N elements (A[0] <= A[1] <= ... <= A[N-1]).

1. [Initialize search window boundaries]
   Set LOW := 0.
   Set HIGH := N - 1.

2. [Search loop]
   Repeat while LOW <= HIGH:
3.    Set MID := LOW + (HIGH - LOW) / 2.
4.    If A[MID] = VAL, then:
         Write: "Element found at index ", MID.
         Exit.
5.    Else if A[MID] > VAL, then:
         Set HIGH := MID - 1.    // Discard right half
6.    Else:
         Set LOW := MID + 1.     // Discard left half
      [End of If structure]
   [End of Step 2 loop]

7. Write: "Element not present in array."
8. Exit.`
    },
    {
      title: 'Step 4: Lower Bound & Upper Bound in Sorted Collections',
      description: 'When arrays contain duplicate elements, programmers often need to find the boundary of a value range:',
      bulletPoints: [
        'Lower Bound: Returns the FIRST index where $A[i] \\ge \\text{VAL}$ (the earliest point where VAL could be inserted without violating sorted order).',
        'Upper Bound: Returns the FIRST index where $A[i] > \\text{VAL}$ (strictly greater than target).',
        'Count Occurrences: The total number of copies of VAL in a sorted array is simply: `upper_bound(VAL) - lower_bound(VAL)` in $\\mathcal{O}(\\log N)$ time!'
      ]
    },
    {
      title: 'Step 5: Mathematical Complexity Proof of Binary Search',
      description: 'Why is Binary Search strictly $\\mathcal{O}(\\log N)$?',
      bulletPoints: [
        'Recurrence Relation: $T(N) = T(N / 2) + c$, where $c$ is the constant time for calculating MID and comparing.',
        'Successive Substitutions: After $k$ iterations, the remaining array size is $N / 2^k$.',
        'Termination: The search terminates when the sub-array length is 1, meaning $N / 2^k = 1 \\implies 2^k = N \\implies k = \\log_2 N$.',
        'Total Comparisons: Worst-case number of comparisons is $\\lfloor \\log_2 N \\rfloor + 1$.'
      ]
    }
  ],
  cstlReference: {
    header: '#include <algorithm> // For std::binary_search, std::lower_bound, std::upper_bound\n#include <vector>',
    declaration: 'std::vector<int> sortedArr = {10, 20, 20, 20, 30, 40, 50};',
    commonMethods: [
      { method: 'std::binary_search(begin, end, val)', description: 'Returns true if val exists in sorted range', complexity: 'O(log N)' },
      { method: 'std::lower_bound(begin, end, val)', description: 'Returns iterator to first element >= val', complexity: 'O(log N)' },
      { method: 'std::upper_bound(begin, end, val)', description: 'Returns iterator to first element > val', complexity: 'O(log N)' },
      { method: 'std::equal_range(begin, end, val)', description: 'Returns pair of iterators [lower_bound, upper_bound)', complexity: 'O(log N)' }
    ],
    notes: [
      'CRITICAL: If the container is not pre-sorted in non-decreasing order, `std::binary_search` produces undefined behavior or false negatives!',
      'In C++, `std::lower_bound` on `std::vector` takes O(log N) time, but calling it on `std::list` takes O(N) time because linked lists lack random access iterators.'
    ]
  },
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Iterative & Recursive Binary Search with Trace in C++',
      explanation: 'Shows both iterative and recursive implementations of binary search, printing the active window [LOW..HIGH] and MID at each step.',
      code: `#include <iostream>
#include <vector>

// Iterative Binary Search
int binarySearchIterative(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    int step = 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        std::cout << "Step " << step++ << ": [Low=" << low << ", High=" << high 
                  << "] -> Mid=" << mid << " (Value=" << arr[mid] << ")\\n";

        if (arr[mid] == target) {
            return mid; // Found!
        } else if (arr[mid] > target) {
            high = mid - 1; // Search left half
        } else {
            low = mid + 1;  // Search right half
        }
    }
    return -1; // Not found
}

// Recursive Binary Search
int binarySearchRecursive(const std::vector<int>& arr, int low, int high, int target) {
    if (low > high) return -1;

    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] > target) return binarySearchRecursive(arr, low, mid - 1, target);
    return binarySearchRecursive(arr, mid + 1, high, target);
}

int main() {
    std::vector<int> numbers = {11, 22, 33, 44, 55, 66, 77, 88, 99};
    int target = 66;

    std::cout << "Searching for " << target << " in sorted array:\\n";
    int index = binarySearchIterative(numbers, target);

    if (index != -1) {
        std::cout << "Success: Found at index " << index << "!\\n";
    } else {
        std::cout << "Target not found.\\n";
    }

    return 0;
}`
    }
  ],
  examQuestions: [
    {
      id: 'srch-q1',
      year: '2023 & 2021 CUET Exam (Section-A Q.2)',
      marks: 10,
      difficulty: 'Exam Classic',
      question: 'Trace the Binary Search algorithm step-by-step to find the value 54 in the sorted array A = [12, 18, 23, 31, 42, 54, 67, 78, 89, 95]. Construct a trace table showing the values of LOW, HIGH, MID, and A[MID] at each iteration.',
      solution: `Model University Answer:

Target Value: VAL = 54
Given Array A (Length N = 10, 0-indexed):
Index:   0   1   2   3   4   5   6   7   8   9
Value:  12  18  23  31  42  54  67  78  89  95

Trace Table:
--------------------------------------------------------------------------------------
Iteration   LOW   HIGH   MID = LOW+(HIGH-LOW)/2   A[MID]   Comparison / Action
--------------------------------------------------------------------------------------
1            0      9     0 + (9-0)/2 = 4          42      A[4]=42 < 54 -> LOW = MID + 1 = 5
2            5      9     5 + (9-5)/2 = 7          78      A[7]=78 > 54 -> HIGH = MID - 1 = 6
3            5      6     5 + (6-5)/2 = 5          54      A[5]=54 == 54 -> MATCH FOUND!
--------------------------------------------------------------------------------------

Conclusion:
- Target 54 is found at index 5 in exactly 3 iterations!
- Number of comparisons made: 3 comparisons.
- Max comparisons possible for N = 10 is floor(log2(10)) + 1 = 3 + 1 = 4 comparisons.`,
      keyTakeaway: 'Always construct a clear iteration table showing LOW, HIGH, MID, A[MID], and the comparison decision.'
    },
    {
      id: 'srch-q2',
      year: '2022 CUET Exam',
      marks: 6,
      difficulty: 'Medium',
      question: 'Explain why (LOW + HIGH) / 2 can lead to an integer overflow bug in computer programs. State the standard bug-free formula used in software libraries.',
      solution: `Model University Answer:

1. Cause of Integer Overflow:
In languages with fixed-size signed integers (like C, C++, and Java, where 32-bit signed integers range from -2^31 to 2^31 - 1 = 2,147,483,647):
- If the array is very large (e.g. N > 1,073,741,824), and the search window is near the right side of the array, both LOW and HIGH can be greater than 1,073,741,824.
- When computing (LOW + HIGH), the sum exceeds 2,147,483,647.
- In signed 32-bit arithmetic, this wraps around into a negative number (e.g., -2,147,483,648).
- Dividing this negative number by 2 results in a negative MID index, causing an out-of-bounds memory access or segmentation fault!

2. Standard Bug-Free Formula:
MID = LOW + (HIGH - LOW) / 2

Why this is safe:
- (HIGH - LOW) is always <= HIGH, so it never overflows.
- (HIGH - LOW) / 2 is positive.
- Adding this positive difference to LOW never exceeds HIGH (which is <= MAX_INT).
- Alternatively, in languages supporting unsigned right shifts: MID = (LOW + HIGH) >>> 1.`,
      keyTakeaway: 'Use MID = LOW + (HIGH - LOW) / 2 to prevent 32-bit signed integer overflow on large arrays.'
    }
  ],
  quizzes: [
    {
      id: 'srch-qz-1',
      question: 'What is the maximum number of comparisons required by Binary Search on a sorted array of 1,024 elements in the worst case?',
      options: [
        '10 comparisons',
        '11 comparisons',
        '512 comparisons',
        '1,024 comparisons'
      ],
      correctIndex: 1,
      explanation: 'For N = 1,024, log2(1024) = 10. In the worst case when the element is at the leaf level or not present, the number of comparisons is floor(log2 N) + 1 = 10 + 1 = 11 comparisons.'
    },
    {
      id: 'srch-qz-2',
      question: 'What is the mandatory prerequisite before applying Binary Search?',
      options: [
        'The array size must be an exact power of 2',
        'The elements must be stored in sorted order',
        'The array must not contain duplicate values',
        'The array must be stored as a linked list'
      ],
      correctIndex: 1,
      explanation: 'Binary Search depends on order to discard halves. If the array is unsorted, it cannot determine whether the target lies in the left or right sub-range.'
    },
    {
      id: 'srch-qz-3',
      question: 'On average, how many comparisons does Linear Search make on an array of N elements when the target is present?',
      options: [
        'N comparisons',
        '(N + 1) / 2 comparisons',
        'log2 N comparisons',
        'N / 4 comparisons'
      ],
      correctIndex: 1,
      explanation: 'If the target is equally likely to be at any index from 0 to N-1, the average number of comparisons is (1 + 2 + ... + N) / N = [N(N+1)/2] / N = (N + 1) / 2.'
    }
  ]
};
