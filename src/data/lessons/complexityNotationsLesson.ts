import { Lesson } from '../../types';

export const COMPLEXITY_NOTATIONS_LESSON: Lesson = {
  id: 'complexity-notations',
  categoryId: 'foundations',
  subCategoryId: 'algorithmic-foundations',
  title: 'Time & Space Complexity Notations',
  subtitle: 'Complexity Analysis, Growth Rates, Asymptotic Bounds & Code Derivation from Easy to Hard',
  icon: 'Binary',
  overview: 'Asymptotic complexity measures how the execution time and memory consumption of an algorithm scale as the input size n increases. This lesson provides a machine-independent framework for analyzing algorithms using standard rate-of-growth hierarchies, asymptotic bounds (O, Ω, Θ, o, ω), and a systematic guide to figuring out time and space complexity directly from source code—from simple loops to complex recursion.',
  keyConcepts: [
    {
      title: '1. What is Complexity? Time vs. Space Fundamentals',
      description: `Suppose M is an algorithm, and n is the size of the input data. The computational efficiency of M depends on two fundamental resources:
- Time Complexity: Quantified by the number of fundamental operations executed (assignments, arithmetic, comparisons) rather than wall-clock seconds (which vary by CPU speed).
- Space Complexity: Quantified by the peak memory consumed during execution (both input variables and auxiliary buffers / recursion stacks).

The complexity function f(n) provides the operational requirement of algorithm M expressed in terms of input size n.`,
      bulletPoints: [
        'Time Metric: Total count of primitive computational steps executed as a function of n.',
        'Total Space vs. Auxiliary Space: Total space includes input storage; Auxiliary space measures only the extra temporary memory allocated by the algorithm itself.',
        'Hardware Independence: By counting operation steps rather than milliseconds, complexity remains valid across supercomputers, laptops, and mobile phones alike.',
        'Growth Rate Priority: We focus on asymptotic behavior as n → ∞, ignoring lower-order terms and constant multipliers.'
      ],
      mathFormula: 'f(n) = \\text{Total Primitive Steps}(n), \\qquad \\text{Total Space} = \\text{Input Space}(n) + \\text{Auxiliary Space}(n)'
    },
    {
      title: '2. Best, Average, and Worst Case Scenarios',
      description: `The runtime of an algorithm often depends not only on the input size n, but also on the specific configuration of the input values:
• Best Case (\\min f(n)): The minimum number of steps required across any valid input of size n (e.g., finding a target element at the very first index of an array in O(1) time).
• Average Case (\\sum n_i \\cdot p_i): The expected number of steps assuming a probabilistic distribution over all possible inputs.
• Worst Case (\\max f(n)): The maximum possible number of steps required for any input of size n. This provides the guaranteed performance ceiling for software reliability.`,
      bulletPoints: [
        'Best Case: Minimum possible resource expenditure for input size n.',
        'Average Case: Statistical expectation E = ∑ n_i · p_i under an assumed input distribution.',
        'Worst Case: Maximum possible resource expenditure; defines the guaranteed upper-bound SLA.'
      ],
      mathFormula: '\\text{Best} = \\min f(n), \\qquad \\text{Worst} = \\max f(n), \\qquad \\text{Average Expectation: } E = \\sum_{i=0}^{n} n_i \\cdot p_i'
    },
    {
      title: '3. Operations Counted vs. Excluded in Algorithmic Analysis',
      description: `To maintain pure machine independence, complexity calculation counts internal CPU processing steps and excludes external I/O latency:
• Included Operations:
  - Variable assignments: \`x = 10\`, pointer updates.
  - Arithmetic operations: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`.
  - Relational & logical comparisons: \`<\`, \`<=\`, \`>\`, \`>=\`, \`==\`, \`!=\`, \`&&\`, \`||\`.
  - Function call invocations & return statements.
• EXCLUDED Operations:
  - Console / Disk Input and Output (\`printf\`, \`std::cout\`, \`scanf\`, \`std::cin\`, file read/write). External I/O depends on operating system buffers and bus hardware, not algorithmic structure.`,
      bulletPoints: [
        'Assignments (=): Memory writes and pointer updates are counted as O(1) each.',
        'Arithmetic (+, -, *, /, %): Fundamental mathematical operations are counted as O(1).',
        'Relational (<, >, ==, !=): Branch condition evaluations are counted as O(1).',
        'EXCLUDED: Input and Output (I/O) are NOT included in complexity calculations!',
        'Function Overhead: Calling a function and allocating a stack frame is counted as O(1).'
      ],
      mathFormula: '\\text{Operational Steps} = \\sum (\\text{Assignments} + \\text{Arithmetic} + \\text{Relational} + \\text{Function Calls}) \\quad [\\text{I/O Excluded}]'
    },
    {
      title: '4. Rate of Growth Hierarchy & Standard Functions',
      description: `As input size n expands, computational requirements diverge dramatically across different complexity classes:
• At n = 10: \\log_2 n \\approx 3.3, n = 10, n \\log n \\approx 33, n^2 = 100, 2^n = 1,024.
• At n = 100: \\log_2 n \\approx 6.6, n = 100, n \\log n \\approx 664, n^2 = 10,000, 2^n \\approx 1.27 \\times 10^{30}.
• At n = 1,000: \\log_2 n \\approx 10, n = 1,000, n \\log n \\approx 9,965, n^2 = 10^6, 2^n \\approx 1.07 \\times 10^{301} (far exceeding the number of atoms in the observable universe!).

The universal asymptotic hierarchy from fastest to slowest is:
1 < \\log n < \\sqrt{n} < n < n \\log n < n^2 < n^3 < 2^n < n!`,
      bulletPoints: [
        'Constant O(1): Instant execution regardless of input size (hash lookups, array indexing).',
        'Logarithmic O(log n): Halves the search space at each step (binary search, balanced BST operations).',
        'Square Root O(√n): Factors or prime checks up to √n.',
        'Linear O(n): Single pass through n items (linear scan, sum of array).',
        'Linearithmic O(n log n): Optimal comparison-based sorting (Merge Sort, Quick Sort average).',
        'Polynomial O(n²), O(n³): Nested loops (matrix multiplication, bubble sort).',
        'Exponential O(2ⁿ) & Factorial O(n!): Combinatorial brute-force (subsets, traveling salesperson, permutations).'
      ],
      mathFormula: '1 < \\log n < \\sqrt{n} < n < n \\log n < n^2 < n^3 < 2^n < n!'
    },
    {
      title: '5. Asymptotic Notations: Big-O, Big-Omega, and Big-Theta',
      description: `Asymptotic notations formalize mathematical bounds on growth rates:
• Big-O (O(g(n)) - Upper Bound: f(n) grows no faster than g(n). 
  f(n) = O(g(n)) \\iff \\exists C > 0, n_0 \\in \\mathbb{Z}^+ \\text{ such that } \\forall n \\ge n_0, \\; 0 \\le f(n) \\le C \\cdot g(n).

• Big-Omega (Ω(g(n)) - Lower Bound: f(n) grows at least as fast as g(n).
  f(n) = \\Omega(g(n)) \\iff \\exists C > 0, n_0 \\in \\mathbb{Z}^+ \\text{ such that } \\forall n \\ge n_0, \\; 0 \\le C \\cdot g(n) \\le f(n).

• Big-Theta (Θ(g(n)) - Tight Bound: f(n) is sandwiched precisely by g(n).
  f(n) = \\Theta(g(n)) \\iff \\exists C_1, C_2 > 0, n_0 \\in \\mathbb{Z}^+ \\text{ such that } \\forall n \\ge n_0, \\; C_1 g(n) \\le f(n) \\le C_2 g(n).
  Equivalence: f(n) = \\Theta(g(n)) \\iff f(n) = O(g(n)) \\text{ and } f(n) = \\Omega(g(n)).`,
      bulletPoints: [
        'Big-O: Maximum growth ceiling (guaranteed upper bound).',
        'Big-Omega: Minimum growth floor (guaranteed lower bound).',
        'Big-Theta: Exact matching rate of growth (tight sandwich bound).',
        'Composition Rules: Sequential (f₁ + f₂)(n) = O(max(g₁, g₂)); Nested (f₁ · f₂)(n) = O(g₁ · g₂).'
      ],
      mathFormula: '\\begin{aligned} f(n) = O(g(n)) &\\iff 0 \\le f(n) \\le C \\cdot g(n) \\quad (\\forall n \\ge n_0) \\\\ f(n) = \\Omega(g(n)) &\\iff 0 \\le C \\cdot g(n) \\le f(n) \\quad (\\forall n \\ge n_0) \\\\ f(n) = \\Theta(g(n)) &\\iff C_1 g(n) \\le f(n) \\le C_2 g(n) \\quad (\\forall n \\ge n_0) \\end{aligned}'
    },
    {
      title: '6. The Master Guide: How to Figure Out Complexity from Code',
      description: `To determine the time and space complexity of any code snippet, follow this systematic 5-step intuition process:

1. Identify the input variable(s) (typically n, or n and m for multi-variable inputs).
2. Count loop iterations based on the loop counter update rule:
   - Increments/Decrements (\`i++\`, \`i += c\`): Runs n/c times → O(n).
   - Multiplying/Dividing (\`i *= 2\`, \`i /= 2\`): Runs \\log_2 n times → O(log n).
   - Quadratic condition (\`i * i <= n\`): Runs \\sqrt{n} times → O(√n).
3. Classify loop interactions:
   - Sequential loops: Add their complexities → O(n) + O(m) = O(n + m).
   - Independent nested loops: Multiply their iterations → n \\times m → O(n \\cdot m).
   - Dependent nested loops (triangular): Sum the series (e.g., 1 + 2 + ... + n = n(n+1)/2 → O(n²)).
4. Analyze recursive calls:
   - Draw the Recursion Tree: (Total Work = Number of Nodes × Work per Node).
   - Maximum tree depth = Auxiliary call stack memory!
5. Inspect memory allocations for Space Complexity:
   - Fixed primitive variables (\`int\`, \`double\`, pointers) → O(1) auxiliary space.
   - Dynamic 1D array of size n → O(n) space.
   - Dynamic 2D matrix of size n × m → O(n · m) space.
   - Recursive call stack of depth d → O(d) auxiliary stack space.`,
      bulletPoints: [
        'Additive Loop: i += 1 runs n times → O(n)',
        'Multiplicative Loop: i *= 2 runs log₂ n times → O(log n)',
        'Square-Root Loop: i * i <= n runs √n times → O(√n)',
        'Sequential Blocks: Take the MAX / SUM of blocks',
        'Nested Blocks: MULTIPLY outer iterations by inner iterations',
        'Space Complexity: Measure extra memory created + maximum call stack depth'
      ],
      mathFormula: '\\text{Time} = \\sum_{\\text{loops}} (\\text{Iterations} \\times \\text{Work per Iteration}), \\qquad \\text{Auxiliary Space} = \\text{Heap Memory} + \\text{Max Stack Depth}'
    },
    {
      title: '7. Progressive Code Examples: From Easy to Hard',
      description: `Let's examine how to figure out the time and space complexity across 5 progressive levels of difficulty:

■ Level 1 (Easy): Constant & Single Linear Loops
\`\`\`cpp
// Example 1A: Constant Time & Space -> O(1) Time, O(1) Space
void swap(int &a, int &b) {
    int temp = a; // 1 assignment
    a = b;        // 1 assignment
    b = temp;     // 1 assignment
    // No loops, fixed variables -> O(1) time, O(1) space
}

// Example 1B: Single Linear Loop -> O(n) Time, O(1) Space
int findMax(int arr[], int n) {
    int maxVal = arr[0];          // 1 assignment
    for (int i = 1; i < n; i++) { // Loop runs (n - 1) times
        if (arr[i] > maxVal) {    // 1 comparison per step
            maxVal = arr[i];      // conditional assignment
        }
    }
    return maxVal;
    // Total steps: c1 + (n - 1)*c2 = O(n) time, O(1) auxiliary space
}
\`\`\`

■ Level 2 (Easy-Medium): Triangular & Dependent Nested Loops
\`\`\`cpp
// Example 2A: Dependent Inner Loop -> O(n²) Time, O(1) Space
void printPairs(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            // Inner loop iterations:
            // When i = 0: (n - 1) times
            // When i = 1: (n - 2) times
            // When i = n - 1: 0 times
            // Sum = (n - 1) + (n - 2) + ... + 1 + 0 = n(n - 1) / 2 = O(n²)
            cout << arr[i] << " " << arr[j] << endl;
        }
    }
}
\`\`\`

■ Level 3 (Medium): Logarithmic & Square Root Loops
\`\`\`cpp
// Example 3A: Logarithmic Division -> O(log n) Time, O(1) Space
void printHalves(int n) {
    int count = 0;
    while (n > 0) {
        n = n / 2; // n decreases: n, n/2, n/4, ..., 1, 0
        count++;   // Executes k times where 2^k ≈ n => k = log₂ n
    }
    // Time: O(log n), Space: O(1)
}

// Example 3B: Square Root Prime Check -> O(√n) Time, O(1) Space
bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) { // Stops when i > √n
        if (n % i == 0) return false;
    }
    return true;
    // Loop runs at most √n times -> O(√n) time, O(1) space
}
\`\`\`

■ Level 4 (Medium-Hard): Two-Pointer Sliding Window & 2D Allocations
\`\`\`cpp
// Example 4A: Sliding Window -> AMORTIZED O(n) Time, O(1) Space
int maxSubarraySumAtMostK(int arr[], int n, int k) {
    int left = 0, currentSum = 0, maxLen = 0;
    for (int right = 0; right < n; right++) { // right moves 0 to n-1 (n times)
        currentSum += arr[right];
        while (currentSum > k && left <= right) { // left ONLY increases!
            currentSum -= arr[left];
            left++; // left moves at most n times in TOTAL across ALL iterations!
        }
        maxLen = max(maxLen, right - left + 1);
    }
    // Although nested, 'left' increments at most n times total!
    // Total steps: n (right) + n (left) = 2n = O(n) Time, O(1) Space!
    return maxLen;
}
\`\`\`

■ Level 5 (Hard): Recursion Trees & Divide-and-Conquer Stacks
\`\`\`cpp
// Example 5A: Linear Recursion -> O(n) Time, O(n) Space (Call Stack!)
int recursiveSum(int n) {
    if (n <= 0) return 0;
    return n + recursiveSum(n - 1);
    // Depth of call stack = n frames -> O(n) Auxiliary Space!
    // Total recursive calls = n -> O(n) Time
}

// Example 5B: Binary Tree Recursion (Naive Fibonacci) -> O(2ⁿ) Time, O(n) Space
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
    // Tree has 2ⁿ nodes -> O(2ⁿ) Time
    // Max stack depth = height of tree = n -> O(n) Auxiliary Space!
}

// Example 5C: Divide & Conquer (Merge Sort Recurrence) -> O(n log n) Time, O(n) Space
// Recurrence: T(n) = 2T(n/2) + O(n)
// Tree depth = log₂ n levels; Work per level = O(n)
// Total Time = O(n log n); Auxiliary buffer space = O(n).
\`\`\``,
      bulletPoints: [
        'Level 1: Straight-line code is O(1); single pass loops are O(n).',
        'Level 2: Triangular loops sum 1 + 2 + ... + n = n(n+1)/2 = O(n²).',
        'Level 3: Halving loops take log₂ n steps; loop condition i * i <= n takes √n steps.',
        'Level 4: Sliding window inner loop runs at most n times in aggregate → Amortized O(n).',
        'Level 5: Recursive time = number of tree nodes; recursive space = maximum call stack depth.'
      ]
    }
  ],
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Progressive Complexity Laboratory in C++',
      explanation: 'Compiles real working C++ functions across all complexity tiers from O(1) to O(2ⁿ), demonstrating exact operational profiling and memory usage.',
      code: `// Progressive Complexity Suite in C++
#include <iostream>
#include <vector>
#include <cmath>

// -------------------------------------------------------------
// LEVEL 1: Constant O(1) and Linear O(n)
// -------------------------------------------------------------
// O(1) Time | O(1) Space
int getMiddleElement(const std::vector<int>& arr) {
    if (arr.empty()) return -1;
    return arr[arr.size() / 2]; // Single indexed lookup
}

// O(n) Time | O(1) Auxiliary Space
long long computeArraySum(const std::vector<int>& arr) {
    long long total = 0;
    for (int num : arr) { // Exactly n iterations
        total += num;
    }
    return total;
}

// O(n) Time | O(n) Auxiliary Space (Allocates a new vector)
std::vector<int> duplicateArray(const std::vector<int>& arr) {
    std::vector<int> copy(arr.size()); // Allocates n elements
    for (size_t i = 0; i < arr.size(); ++i) {
        copy[i] = arr[i] * 2;
    }
    return copy;
}

// -------------------------------------------------------------
// LEVEL 2: Dependent Nested Loops O(n^2)
// -------------------------------------------------------------
// O(n^2) Time | O(1) Auxiliary Space
long long countUniquePairs(const std::vector<int>& arr) {
    long long pairCount = 0;
    int n = arr.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            // Iterations: (n-1) + (n-2) + ... + 1 = n*(n-1)/2 = O(n^2)
            pairCount++;
        }
    }
    return pairCount;
}

// -------------------------------------------------------------
// LEVEL 3: Logarithmic O(log n) and Square Root O(sqrt(n))
// -------------------------------------------------------------
// O(log n) Time | O(1) Space
int countBinaryDigits(long long n) {
    int bits = 0;
    while (n > 0) {
        n /= 2; // Divided by 2 each step
        bits++;
    }
    return bits;
}

// O(sqrt(n)) Time | O(1) Space
bool checkPrimality(long long n) {
    if (n <= 1) return false;
    for (long long d = 2; d * d <= n; ++d) { // Loop stops at sqrt(n)
        if (n % d == 0) return false;
    }
    return true;
}

// O(n log n) Time | O(1) Space
void nestedLinearithmic(int n) {
    for (int i = 1; i <= n; ++i) {        // Outer loop: n times
        for (int j = 1; j <= n; j *= 2) { // Inner loop: log2(n) times
            // Body runs n * log2(n) times
        }
    }
}

// -------------------------------------------------------------
// LEVEL 4: Two-Pointer Sliding Window (Amortized O(n))
// -------------------------------------------------------------
// Amortized O(n) Time | O(1) Space
int lengthOfLongestSubarrayWithSum(const std::vector<int>& arr, int targetSum) {
    int left = 0, currentSum = 0, maxLen = 0;
    for (int right = 0; right < (int)arr.size(); ++right) {
        currentSum += arr[right];
        while (currentSum > targetSum && left <= right) {
            currentSum -= arr[left];
            left++; // left pointer advances AT MOST n times across the entire function!
        }
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen; // Total operations = n (right) + n (left) = 2n = O(n)
}

// -------------------------------------------------------------
// LEVEL 5: Recursion & Call Stacks
// -------------------------------------------------------------
// O(n) Time | O(n) Auxiliary Call Stack Space
long long factorialRecursive(int n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1); // Stack depth = n
}

// O(2^n) Time | O(n) Auxiliary Call Stack Space (Tree Height = n)
int fibonacciNaive(int n) {
    if (n <= 1) return n;
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

int main() {
    std::cout << "Complexity demonstration compiled successfully.\\n";
    return 0;
}`
    }
  ],
  examQuestions: [
    {
      id: 'cuet-complexity-figuring-code-1',
      year: 'University Exam Classic',
      marks: 10,
      question: 'Find the Time and Space Complexity for each of the following code snippets. Show your line-by-line derivation:\n\nSnippet A:\n```cpp\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n; j += i) {\n        sum++;\n    }\n}\n```\n\nSnippet B:\n```cpp\nint left = 0, right = n - 1;\nwhile (left < right) {\n    if (arr[left] + arr[right] == target) return true;\n    else if (arr[left] + arr[right] < target) left++;\n    else right--;\n}\n```',
      difficulty: 'Medium',
      solution: `Model University Derivation:

■ Analysis of Snippet A:
1. Outer loop runs for i = 1, 2, 3, ..., n (n total iterations).
2. For a fixed i, the inner loop runs with step size i:
   - When i = 1: j increments by 1 → n/1 iterations
   - When i = 2: j increments by 2 → n/2 iterations
   - When i = 3: j increments by 3 → n/3 iterations
   - ...
   - When i = n: j increments by n → n/n = 1 iteration
3. Total Operations T(n):
   T(n) = n/1 + n/2 + n/3 + ... + n/n
        = n · (1 + 1/2 + 1/3 + ... + 1/n)
   The summation (1 + 1/2 + 1/3 + ... + 1/n) is the Harmonic Series H_n = ln(n) + O(1).
4. Therefore:
   T(n) = n · ln(n) = Θ(n log n).
   Time Complexity: O(n log n)
   Auxiliary Space: O(1) (only scalar variables i, j, sum).

■ Analysis of Snippet B:
1. The algorithm initializes two pointers at opposite ends of the sorted array (left = 0, right = n - 1).
2. In every single iteration of the while loop, exactly one of the following occurs:
   - Either \`left\` increments by 1, OR
   - \`right\` decrements by 1, OR
   - The function terminates immediately.
3. The distance between pointers starts at (n - 1) and decreases by at least 1 in every iteration.
4. Hence, the while loop can execute at most (n - 1) times in the worst case.
5. Time Complexity: O(n)
   Auxiliary Space: O(1) (in-place pointer traversal).`,
      keyTakeaway: 'When step size in an inner loop depends on the outer loop index i (e.g. j += i), the total iterations equal n times the harmonic series, yielding O(n log n).'
    },
    {
      id: 'cuet-complexity-figuring-code-2',
      year: 'University Exam Classic',
      marks: 8,
      question: 'Analyze the following recursive function. State its recurrence relation, solve for Time Complexity, and determine its Space Complexity:\n\n```cpp\nvoid solve(int n) {\n    if (n <= 1) return;\n    for (int i = 0; i < n; i++) {\n        // O(1) work\n    }\n    solve(n / 2);\n    solve(n / 2);\n}\n```',
      difficulty: 'Hard',
      solution: `Model University Derivation:

1. Formulate Recurrence Relation:
   - Base Case: For n ≤ 1, T(n) = O(1).
   - Recursive Case: The function performs a linear loop of size n (taking cn time), and then makes TWO recursive calls, each on input size n/2.
   - Recurrence: T(n) = 2 · T(n/2) + cn

2. Solve via Master Theorem / Recursion Tree:
   - Master Theorem Form: T(n) = a · T(n/b) + f(n)
     Here a = 2, b = 2, f(n) = cn = O(n^1).
   - Compare log_b(a) with exponent of f(n):
     log_2(2) = 1.
     Since f(n) = Θ(n^{log_b a}) = Θ(n^1), this matches Master Theorem Case 2.
   - Result: T(n) = Θ(n · log₂ n).

3. Space Complexity (Call Stack Depth):
   - In each recursive step, n is halved: n → n/2 → n/4 → ... → 1.
   - The height of the recursion tree is log₂ n.
   - Since calls execute sequentially on the stack, the maximum stack depth at any moment is the tree height: log₂ n.
   - Auxiliary Space Complexity: O(log n) stack memory.`,
      keyTakeaway: 'T(n) = 2T(n/2) + O(n) solves to O(n log n) time with O(log n) auxiliary stack depth.'
    }
  ],
  quizzes: [
    {
      id: 'quiz-complexity-code-1',
      question: 'What is the time complexity of a loop structured as `for (int i = 1; i <= n; i *= 2)`?',
      options: [
        'O(n)',
        'O(log₂ n)',
        'O(n²)',
        'O(1)'
      ],
      correctIndex: 1,
      explanation: 'Since the loop variable doubles each time (i = 1, 2, 4, 8, ..., 2^k), it reaches n in k = log₂ n steps. Thus the time complexity is O(log n).'
    },
    {
      id: 'quiz-complexity-code-2',
      question: 'What is the auxiliary space complexity of calculating Fibonacci numbers using naive recursion `fib(n) = fib(n-1) + fib(n-2)` without memoization?',
      options: [
        'O(1)',
        'O(log n)',
        'O(n)',
        'O(2ⁿ)'
      ],
      correctIndex: 2,
      explanation: 'While the naive Fibonacci recursion takes O(2ⁿ) TIME due to repeated branching, the maximum call stack depth active in memory at any instant equals the height of the recursion tree, which is O(n).'
    },
    {
      id: 'quiz-complexity-code-3',
      question: 'Consider a two-pointer sliding window where an inner while loop runs inside an outer for loop over an array of size n. If the inner pointer `left` only increases and never resets, what is the overall time complexity?',
      options: [
        'O(n²)',
        'Amortized O(n)',
        'O(n log n)',
        'O(2ⁿ)'
      ],
      correctIndex: 1,
      explanation: 'Because `left` only increments and never resets to 0, it advances at most n times in total across the entire lifetime of the algorithm. Thus, total operations = n (right) + n (left) = 2n = O(n).'
    }
  ],
  practiceProblems: [
    {
      id: 'cp-complexity-1',
      title: 'Analyze Recursive Binary Exponentiation',
      platform: 'CSES',
      difficulty: 'Easy',
      url: 'https://cses.fi/problemset/task/1095',
      description: 'Compute a^b mod (10^9 + 7) for given integers a and b using divide-and-conquer modular exponentiation.',
      keyPattern: 'Binary halving of power b yields T(b) = T(b/2) + O(1), giving logarithmic time complexity O(log b).'
    },
    {
      id: 'cp-complexity-2',
      title: 'Fibonacci Matrix Exponentiation vs Iteration',
      platform: 'LeetCode',
      problemNumber: '509',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/fibonacci-number/',
      description: 'Compare O(2^n) naive recursion, O(n) iterative dynamic programming, and O(log n) 2x2 matrix exponentiation.',
      keyPattern: 'Demonstrates how algorithmic paradigm shifts reduce complexity from exponential to linear to logarithmic.'
    }
  ]
};
