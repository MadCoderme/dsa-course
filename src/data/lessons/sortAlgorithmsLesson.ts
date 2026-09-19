import { Lesson } from '../../types';

export const SORT_ALGORITHMS_LESSON: Lesson = {
  id: 'sorting-algorithms',
  categoryId: 'algorithms',
  subCategoryId: 'search-sort-algorithms',
  title: 'Sorting Algorithms: Comparative Analysis & Simulations',
  subtitle: 'Bubble, Selection, Insertion, Merge, and Quick Sort with step-by-step executions and stability proofs',
  icon: 'Binary',
  importance: '🔥 CRITICAL',
  cuetExamRelevance: 'Guaranteed 14–18 marks in semester exams (Module 3, Section-A & B). You will be asked to: (1) simulate passes of Bubble/Selection/Insertion sort on a given 8-element array, (2) write the partitioning pseudo-code for Quick Sort, (3) compare stability, time and space complexity across all sorting paradigms, and (4) trace 2-way Merge Sort trees.',
  overview: 'Sorting arranges elements into ascending or descending sequence. While simple algorithms like Bubble Sort and Insertion Sort take quadratic $\\mathcal{O}(N^2)$ time, Divide-and-Conquer strategies like Merge Sort and Quick Sort achieve lightning-fast $\\mathcal{O}(N \\log N)$ performance. Understanding their trade-offs—stability, memory overhead, and adaptive behavior—is essential for building high-performance systems.',
  timeComplexity: {
    access: '$\\mathcal{O}(1)$ Array index lookup',
    search: '$\\mathcal{O}(\\log N)$ Binary search possible once sorted',
    insertion: '$\\mathcal{O}(N \\log N)$ Average time to sort an unsorted collection of N elements',
    deletion: '$\\mathcal{O}(N)$ Compacting elements in an array',
    space: '$\\mathcal{O}(1)$ In-place for Bubble, Selection, Insertion, Quick Sort (vs $\\mathcal{O}(N)$ Merge Sort)'
  },
  keyConcepts: [
    {
      title: 'Step 1: The Sorting Landscape & Stability Concept',
      description: 'Before comparing individual algorithms, two core properties govern all sorting algorithms:',
      bulletPoints: [
        'Stability: A sort is STABLE if two elements with equal keys appear in the same relative order in the sorted output as they were in the original input. (Crucial when sorting records by multiple criteria, e.g., sorting students by GPA after already sorting by Name).',
        'In-Place (Auxiliary Space): An in-place sort uses $\\mathcal{O}(1)$ extra memory beyond the original array. Out-of-place algorithms (like standard Merge Sort) require an extra buffer of size $\\mathcal{O}(N)$.',
        'Adaptive: An algorithm is ADAPTIVE if its running time improves when the input array is already partially or completely sorted (e.g., Insertion Sort runs in linear $\\mathcal{O}(N)$ time on sorted arrays).'
      ]
    },
    {
      title: 'Step 2: Quadratic Algorithms: Bubble, Selection & Insertion Sort',
      description: 'The three classic $\\mathcal{O}(N^2)$ intuitive sorting algorithms:',
      bulletPoints: [
        '1. Bubble Sort: Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. With each pass, the largest remaining element "bubbles up" to its correct position at the end. An early-exit `swapped` boolean flag detects when the array is sorted early, giving $\\mathcal{O}(N)$ best case.',
        '2. Selection Sort: Divides array into sorted prefix and unsorted suffix. Scans the unsorted suffix to find the absolute minimum, then swaps it to the front. Makes $\\mathcal{O}(N^2)$ comparisons in ALL cases, but only $\\mathcal{O}(N)$ swaps—ideal when memory write cycles are costly (e.g., Flash EEPROM).',
        '3. Insertion Sort: Like sorting playing cards in your hand. Picks the next element and inserts it into its correct position within the already-sorted left subarray by shifting larger elements right. Best-in-class performance for small arrays ($N \\le 16$) and nearly-sorted data.'
      ],
      mathFormula: `Comparison of Quadratic Sorts:
Algorithm       Best Time   Avg Time    Worst Time  Space   Stable?  Swaps
Bubble Sort     O(N)*       O(N^2)      O(N^2)      O(1)    YES      O(N^2)
Selection Sort  O(N^2)      O(N^2)      O(N^2)      O(1)    NO       O(N) (Min)
Insertion Sort  O(N)        O(N^2)      O(N^2)      O(1)    YES      O(N^2)
(* With early-termination swapped flag)`
    },
    {
      title: 'Step 3: Merge Sort — Guaranteed O(N log N) Divide & Conquer',
      description: 'Merge Sort divides the array into two equal halves, recursively sorts each half, and merges the two sorted halves into a single sorted output:',
      bulletPoints: [
        'Divide: Split array at middle $\\text{MID} = \\text{LOW} + (\\text{HIGH} - \\text{LOW}) / 2$.',
        'Conquer: Recursively call `MERGE_SORT(A, LOW, MID)` and `MERGE_SORT(A, MID + 1, HIGH)`.',
        'Combine (Merge): Two pointers scan both sorted sub-arrays, picking the smaller element into a temporary buffer in $\\mathcal{O}(N)$ time.',
        'Predictable: Guaranteed $\\mathcal{O}(N \\log N)$ in Best, Average, AND Worst cases. It is 100% Stable, but requires $\\mathcal{O}(N)$ auxiliary memory.'
      ],
      mathFormula: `Algorithm: MERGE_SORT(A, LOW, HIGH)
1. If LOW < HIGH, then:
2.    Set MID := LOW + (HIGH - LOW) / 2.
3.    Call MERGE_SORT(A, LOW, MID).
4.    Call MERGE_SORT(A, MID + 1, HIGH).
5.    Call MERGE(A, LOW, MID, HIGH).
   [End of If structure]
6. Exit.

Recurrence Relation:
T(N) = 2 * T(N / 2) + O(N)
By Master Theorem (Case 2): T(N) = Theta(N * log N)`
    },
    {
      title: 'Step 4: Quick Sort — In-Place Partitioning & Pivot Strategy',
      description: 'Quick Sort picks an element as a PIVOT and partitions the array such that all elements smaller than the pivot are on the left, and all elements greater are on the right:',
      bulletPoints: [
        'Partitioning: Puts the pivot into its final sorted position and returns its index $P$.',
        'Recursive Calls: Calls `QUICK_SORT(A, LOW, P - 1)` and `QUICK_SORT(A, P + 1, HIGH)`. Zero merge step needed because partitioning sorted it in-place!',
        'Pivot Selection: Choosing the first or last element causes catastrophic $\\mathcal{O}(N^2)$ worst-case if the array is already sorted. Industrial implementations use Randomized Pivot or Median-of-Three to ensure $\\mathcal{O}(N \\log N)$ average performance.',
        'Space Complexity: In-place array data, but requires $\\mathcal{O}(\\log N)$ recursive stack frames.'
      ],
      mathFormula: `Algorithm: PARTITION(A, LOW, HIGH) (Lomuto Scheme)
1. Set PIVOT := A[HIGH].
2. Set I := LOW - 1.
3. For J := LOW to HIGH - 1:
4.    If A[J] <= PIVOT, then:
5.       Set I := I + 1.
6.       Swap A[I] with A[J].
      [End of If structure]
   [End of For loop]
7. Swap A[I + 1] with A[HIGH].  // Place pivot in correct slot
8. Return I + 1.`
    },
    {
      title: 'Step 5: Master Complexity & Algorithm Comparison Matrix',
      description: 'The definitive summary matrix tested on every university exam:',
      bulletPoints: [
        'Quick Sort is the fastest general-purpose sort in practice due to exceptional CPU cache locality and small constant factors.',
        'Merge Sort is preferred for sorting Linked Lists (since node pointers avoid the $\\mathcal{O}(N)$ array allocation) and external disk sorting.',
        'Hybrid Sorts: Real-world standard libraries use hybrid algorithms (e.g. C++ `std::sort` uses Introsort = Quick Sort + Heap Sort fallback + Insertion Sort for small partitions).'
      ],
      mathFormula: `Definitive Sorting Matrix:
Algorithm       Best        Average     Worst       Space       Stable?  Method
------------------------------------------------------------------------------------
Bubble Sort     O(N)        O(N^2)      O(N^2)      O(1)        YES      Exchanging
Selection Sort  O(N^2)      O(N^2)      O(N^2)      O(1)        NO       Selection
Insertion Sort  O(N)        O(N^2)      O(N^2)      O(1)        YES      Insertion
Merge Sort      O(N log N)  O(N log N)  O(N log N)  O(N)        YES      Merging
Quick Sort      O(N log N)  O(N log N)  O(N^2)      O(log N)    NO       Partitioning
Heap Sort       O(N log N)  O(N log N)  O(N log N)  O(1)        NO       Selection/Heap`
    }
  ],
  cstlReference: {
    header: '#include <algorithm> // std::sort, std::stable_sort\n#include <vector>',
    declaration: 'std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};',
    commonMethods: [
      { method: 'std::sort(begin, end)', description: 'Fastest in-place hybrid sort (Introsort, O(N log N), Unstable)', complexity: 'O(N log N)' },
      { method: 'std::stable_sort(begin, end)', description: 'Guarantees relative order of equal elements (Merge sort based)', complexity: 'O(N log N)' },
      { method: 'std::partial_sort(begin, mid, end)', description: 'Sorts only the top K elements', complexity: 'O(N log K)' },
      { method: 'std::is_sorted(begin, end)', description: 'Checks if range is in non-decreasing order', complexity: 'O(N)' }
    ],
    notes: [
      'In C++, `std::sort` does NOT guarantee stability. If you need stability (preserving original relative order of equivalent items), you MUST use `std::stable_sort`.',
      'For small arrays (N <= 16), Insertion Sort beats Quick Sort and Merge Sort because its low constant factors and absence of function call overhead.'
    ]
  },
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Full Implementations of Merge Sort & Quick Sort in C++',
      explanation: 'Complete implementations of 2-way Merge Sort and Lomuto-partitioned Quick Sort with clear procedural division.',
      code: `#include <iostream>
#include <vector>

// --- MERGE SORT ---
void merge(std::vector<int>& arr, int low, int mid, int high) {
    std::vector<int> temp;
    int i = low;
    int j = mid + 1;

    while (i <= mid && j <= high) {
        if (arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            temp.push_back(arr[j++]);
        }
    }

    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= high) temp.push_back(arr[j++]);

    for (int k = 0; k < temp.size(); k++) {
        arr[low + k] = temp[k];
    }
}

void mergeSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int mid = low + (high - low) / 2;
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}

// --- QUICK SORT ---
int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::vector<int> data = {64, 34, 25, 12, 22, 11, 90};

    std::cout << "Original: ";
    for (int x : data) std::cout << x << " ";
    std::cout << "\\n";

    quickSort(data, 0, data.size() - 1);

    std::cout << "Sorted:   ";
    for (int x : data) std::cout << x << " ";
    std::cout << "\\n";

    return 0;
}`
    }
  ],
  examQuestions: [
    {
      id: 'sort-q1',
      year: '2023 & 2020 CUET Exam (Section-A Q.4)',
      marks: 12,
      difficulty: 'Exam Classic',
      question: 'Trace the Quick Sort algorithm on the array A = [45, 23, 78, 12, 89, 56, 34]. Use the last element as the pivot. Show the state of the array after the first partition step, and draw the recursion tree.',
      solution: `Model University Answer:

Initial Array A: [45, 23, 78, 12, 89, 56, 34] (Length N = 7)
Indices:          0   1   2   3   4   5   6

Step 1: First Partitioning (LOW = 0, HIGH = 6):
- Pivot = A[6] = 34.
- Pointer i = LOW - 1 = -1.

Loop j from 0 to 5:
- j = 0: A[0] = 45 > 34 (Do nothing)
- j = 1: A[1] = 23 <= 34 -> i becomes 0. Swap A[0] (45) with A[1] (23).
  Array: [23, 45, 78, 12, 89, 56, 34]
- j = 2: A[2] = 78 > 34 (Do nothing)
- j = 3: A[3] = 12 <= 34 -> i becomes 1. Swap A[1] (45) with A[3] (12).
  Array: [23, 12, 78, 45, 89, 56, 34]
- j = 4: A[4] = 89 > 34 (Do nothing)
- j = 5: A[5] = 56 > 34 (Do nothing)

End of Loop.
Place Pivot in its correct position:
Swap A[i + 1] = A[2] (78) with A[6] (34).
Array after First Partition: [23, 12, 34, 45, 89, 56, 78]

Pivot 34 is now in its permanent sorted location at index 2!
Left Subarray:  [23, 12] (all elements < 34)
Right Subarray: [45, 89, 56, 78] (all elements > 34)

Recursive calls:
- QUICK_SORT(A, 0, 1) sorts [23, 12] -> [12, 23]
- QUICK_SORT(A, 3, 6) sorts [45, 89, 56, 78] -> [45, 56, 78, 89]

Final Sorted Array: [12, 23, 34, 45, 56, 78, 89].`,
      keyTakeaway: 'The partition step places the pivot into its exact final sorted position, separating elements into strictly smaller and strictly larger subarrays.'
    },
    {
      id: 'sort-q2',
      year: '2022 CUET Exam',
      marks: 8,
      difficulty: 'Medium',
      question: 'Define the term "Stability" in sorting algorithms. Give an example showing why Selection Sort is NOT stable.',
      solution: `Model University Answer:

1. Definition of Stability:
A sorting algorithm is defined as STABLE if it preserves the relative order of records with equal keys.
That is, if record R1 appears before record R2 in the input array, and key(R1) == key(R2), then R1 must appear before R2 in the sorted array.

2. Proof that Selection Sort is Unstable:
Consider the array of key-value pairs:
A = [ (4, 'a'), (4, 'b'), (2, 'c') ]
Here, (4, 'a') comes before (4, 'b').

Selection Sort Step-by-Step:
- Pass 1:
  - Find minimum element in entire array: the minimum is (2, 'c') at index 2.
  - Swap (2, 'c') with the first element at index 0, which is (4, 'a').
  - The array becomes:
    [ (2, 'c'), (4, 'b'), (4, 'a') ]

Notice what happened:
In the sorted output, (4, 'b') now appears BEFORE (4, 'a')!
Their original relative order was reversed because the first '4' jumped across the second '4' during the long-distance swap.
Therefore, standard Selection Sort is UNSTABLE.`,
      keyTakeaway: 'Selection sort is unstable because long-distance swaps can move an equal element past identical keys.'
    }
  ],
  quizzes: [
    {
      id: 'sort-qz-1',
      question: 'Which sorting algorithm has a guaranteed O(N log N) running time in the worst case and is also stable?',
      options: [
        'Quick Sort',
        'Merge Sort',
        'Heap Sort',
        'Selection Sort'
      ],
      correctIndex: 1,
      explanation: 'Merge Sort guarantees O(N log N) worst-case time and is stable. Quick Sort has an O(N^2) worst case, and Heap Sort is not stable.'
    },
    {
      id: 'sort-qz-2',
      question: 'Under what condition does Quick Sort degrade to its worst-case time complexity of O(N^2)?',
      options: [
        'When the array contains duplicate elements',
        'When the array is already sorted and the first or last element is chosen as the pivot',
        'When the array size is an odd number',
        'When all elements are negative integers'
      ],
      correctIndex: 1,
      explanation: 'If the array is already sorted (or reverse sorted) and the first or last element is chosen as pivot, the partition produces highly unbalanced splits of sizes 0 and N-1 at every level, causing N levels of recursion and O(N^2) time.'
    },
    {
      id: 'sort-qz-3',
      question: 'Why is Insertion Sort preferred over Quick Sort for very small arrays (e.g. N <= 16)?',
      options: [
        'Insertion Sort uses less memory than an empty vector',
        'Insertion Sort has lower constant factor overhead and zero recursive function calls',
        'Quick Sort cannot mathematically operate on fewer than 16 elements',
        'Insertion Sort runs in O(1) time on small arrays'
      ],
      correctIndex: 1,
      explanation: 'For small N, Insertion Sort has minimal instructions per loop, zero recursion overhead, and excellent cache locality, making it faster in practice than Quick Sort.'
    }
  ]
};
