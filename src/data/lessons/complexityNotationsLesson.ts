import { Lesson } from '../../types';

export const COMPLEXITY_NOTATIONS_LESSON: Lesson = {
  id: 'complexity-notations',
  categoryId: 'foundations',
  subCategoryId: 'algorithmic-foundations',
  title: 'Time & Space Complexity Notations',
  subtitle: 'CUET CSE-241 Chapter 2: Complexity of Algorithms, Growth Rates & Asymptotic Envelopes',
  icon: 'Binary',
  overview: 'Asymptotic complexity measures the operational efficiency and memory consumption of an algorithm as the input size n grows. Based on CUET CSE-241 (Data Structure, Ch. 2), this lesson provides a mathematically rigorous, machine-independent framework for analyzing algorithms using standard functions, rate of growth hierarchies, and asymptotic bounds (O, Ω, Θ, o, ω).',
  keyConcepts: [
    {
      title: '1. Complexity of Algorithms: Definitions & Efficiency (Slide 3)',
      description: `Suppose M is an algorithm, and n is the size of the input data. The efficiency of M depends on two fundamental computational resources: Time and Space.

For Time Complexity, we analyze the number of key operations executed. For Space Complexity, we consider the maximum memory needed throughout execution.

The complexity of an algorithm M is represented by the mathematical function f(n), which provides the run time and/or space requirement of the algorithm expressed in terms of input size n.`,
      bulletPoints: [
        'Algorithm M & Size n: Formal parameters defining operational scope.',
        'Time Metric: Quantified by counting primary key operations rather than wall-clock seconds.',
        'Space Metric: Quantified by peak memory allocation required during execution.',
        'Complexity Function f(n): Mathematical model mapping input size n to required computational resources.'
      ],
      mathFormula: 'f(n) = \\text{Resource Requirement (Time/Space) of Algorithm } M \\text{ for input size } n'
    },
    {
      title: '2. Three Cases of Complexity Investigation (Slide 4)',
      description: `The resource consumption of an algorithm frequently depends not only on the size n, but also on the specific arrangement or distribution of input elements.

Complexity is formally investigated across three canonical cases:
• Best Case: The minimum possible value of f(n) across all valid inputs of size n.
• Average Case: The expected value of f(n). This assumes a probabilistic distribution for the input data. If element n_i occurs with probability p_i, the average case expectation is E = ∑ n_i · p_i.
• Worst Case: The maximum possible value of f(n). This defines the guaranteed performance ceiling for mission-critical software.`,
      bulletPoints: [
        'Best Case: Minimum possible resource expenditure for input size n.',
        'Average Case: Statistical expectation E = ∑ n_i · p_i under assumed input distribution.',
        'Worst Case: Maximum possible resource expenditure; provides guaranteed runtime upper bound.'
      ],
      mathFormula: '\\text{Best} = \\min f(n), \\qquad \\text{Worst} = \\max f(n), \\qquad \\text{Average Case Expectation: } E = \\sum_{i=0}^{n} n_i \\cdot p_i'
    },
    {
      title: '3. Operations Counted vs. Excluded in Complexity (Slide 5)',
      description: `To maintain hardware independence, time complexity calculations evaluate only key algorithmic operations:
• Included Operations: Variable assignments (=), Mathematical arithmetic (+, -, *, /, %), Relational comparisons (>, >=, <, <=, ==, !=), and Function calls/execution.

• CRITICAL EXAM PRINCIPLE: Input and Output (I/O) operations are NOT considered for complexity calculation!

Space complexity accounts for both the size of the input data and the size of intermediary (auxiliary) data generated during execution.`,
      bulletPoints: [
        'Assignments (=): Memory updates and pointer assignments are counted.',
        'Arithmetic (+, -, *, /, %): Fundamental mathematical steps are counted.',
        'Relational (>, <, ==, !=): Loop guards and conditional checks are counted.',
        'EXCLUDED: Input and Output (I/O) are NOT included in complexity calculations!',
        'Space Allocation: Total memory = Size of input data + Size of intermediary data.'
      ],
      mathFormula: '\\text{Time Operations} = \\sum (\\text{Assignments} + \\text{Arithmetic} + \\text{Relational} + \\text{Function Calls}) \\quad [\\text{I/O Excluded}]'
    },
    {
      title: '4. Rate of Growth & Standard Functions Comparison (Slides 6 & 7)',
      description: `The complexity f(n) of an algorithm M naturally increases as input size n increases. In algorithmic analysis, we determine the rate of increase of f(n) by comparing it against standard mathematical benchmark functions.

As demonstrated in CUET Slide 6, evaluating standard functions across orders of magnitude reveals dramatic performance divergence:
• At n = 5: log n ≈ 3, n = 5, n log n ≈ 15, n² = 25, n³ = 125, 2ⁿ = 32.
• At n = 100: log n ≈ 7, n = 10², n log n = 700, n² = 10⁴, n³ = 10⁶, 2ⁿ = 10³⁰.
• At n = 1,000: log n ≈ 10, n = 10³, n log n = 10⁴, n² = 10⁶, n³ = 10⁹, 2ⁿ = 10³⁰⁰.

The fundamental asymptotic growth hierarchy establishes: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n!`,
      bulletPoints: [
        'Benchmark Functions: log n, n, n log n, n², n³, 2ⁿ, n! provide comparative reference baselines.',
        'Logarithmic Efficiency: For n = 1,000, log n requires only 10 operations.',
        'Quadratic Scaling: For n = 1,000, n² requires 10⁶ operations.',
        'Exponential Explosion: For n = 1,000, 2ⁿ requires 10³⁰⁰ operations (exceeding total atoms in universe).'
      ],
      mathFormula: '1 < \\log n < n < n \\log n < n^2 < n^3 < 2^n < n!'
    },
    {
      title: '5. Big-O Notation: Upper Bound & Composition Rules (Slides 8, 9, 10)',
      description: `Big-O notation O(g(n)) defines an asymptotic upper bound, meaning a function grows no faster than a specified rate based on its highest-order term.

Formal Definition: Suppose f(n) and g(n) are defined on positive integers. We write f(n) = O(g(n)) ("f(n) is of order g(n)") if there exist a positive integer n₀ and a positive constant C such that for all n ≥ n₀: 0 ≤ f(n) ≤ C · g(n).

Composition Rules for Sub-procedures (Slide 10):
• Sequential Execution: If f₁(n) = O(g₁(n)) and f₂(n) = O(g₂(n)), then |(f₁ + f₂)(n)| = O(max(g₁(n), g₂(n))). The higher-order term dominates.
• Nested Execution: If f₁(n) = O(g₁(n)) and f₂(n) = O(g₂(n)), then |(f₁ · f₂)(n)| = O(g₁(n) · g₂(n)). Nested iterations multiply complexities.`,
      bulletPoints: [
        'Formal Upper Bound: 0 ≤ f(n) ≤ C · g(n) holds for all n ≥ n₀.',
        'Sequential Rule: (f₁ + f₂)(n) = O(max(g₁(n), g₂(n))) — highest-order dominates.',
        'Nested Rule: (f₁ · f₂)(n) = O(g₁(n) · g₂(n)) — nested loops multiply bounds.',
        'Polynomial Property: For any polynomial f(n) of degree k, f(n) = O(n^k).'
      ],
      mathFormula: '\\begin{aligned} f(n) = O(g(n)) &\\iff \\exists C > 0, n_0 \\in \\mathbb{Z}^+ \\quad \\text{s.t.} \\quad \\forall n \\ge n_0, \\; 0 \\le f(n) \\le C \\cdot g(n) \\\\ |(f_1 + f_2)(n)| &= O(\\max(g_1(n), g_2(n))) \\\\ |(f_1 \\cdot f_2)(n)| &= O(g_1(n) \\cdot g_2(n)) \\end{aligned}'
    },
    {
      title: '6. Omega & Theta Notations: Lower & Tight Bounds (Slides 11 & 12)',
      description: `Omega Notation Ω(g(n)) defines an asymptotic lower bound, meaning that a function grows at least as fast as a certain rate based on its highest-order term:
• Formal Definition: There exist positive integer n₀ and positive constant C such that for all n ≥ n₀: 0 ≤ C · g(n) ≤ f(n). We write f(n) = Ω(g(n)) ("f(n) is omega of g(n)").

Theta Notation Θ(g(n)) defines an asymptotically tight bound (both upper and lower), meaning that a function grows precisely at a certain rate:
• Formal Definition: There exist positive integer n₀ and positive constants C₁ and C₂ such that for all n ≥ n₀: 0 ≤ C₁ · g(n) ≤ f(n) ≤ C₂ · g(n). We write f(n) = Θ(g(n)) ("f(n) is theta of g(n)").

• Equivalence Theorem: f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and f(n) = Ω(g(n)).`,
      bulletPoints: [
        'Omega Ω(g(n)): Lower bound guarantee 0 ≤ C · g(n) ≤ f(n) for n ≥ n₀.',
        'Theta Θ(g(n)): Tight sandwich bound 0 ≤ C₁ · g(n) ≤ f(n) ≤ C₂ · g(n) for n ≥ n₀.',
        'Equivalence: Θ holds if and only if both Big-O and Big-Omega hold simultaneously.'
      ],
      mathFormula: '\\begin{aligned} f(n) = \\Omega(g(n)) &\\iff \\exists C > 0, n_0 \\in \\mathbb{Z}^+ \\quad \\text{s.t.} \\quad \\forall n \\ge n_0, \\; 0 \\le C \\cdot g(n) \\le f(n) \\\\ f(n) = \\Theta(g(n)) &\\iff \\exists C_1, C_2 > 0, n_0 \\in \\mathbb{Z}^+ \\quad \\text{s.t.} \\quad \\forall n \\ge n_0, \\; C_1 g(n) \\le f(n) \\le C_2 g(n) \\\\ f(n) = \\Theta(g(n)) &\\iff f(n) = O(g(n)) \\land f(n) = \\Omega(g(n)) \\end{aligned}'
    },
    {
      title: '7. Little-o & Little-omega Notations: Strict Bounds (Slides 13 & 14)',
      description: `The upper bound provided by Big-O may or may not be tight. For example, 2n² = O(n²) is tight, but 2n = O(n²) is not asymptotically tight.

Little-o notation o(g(n)) defines an upper bound that is strictly non-tight:
• Crucial Difference: Big-O holds for SOME value C > 0, whereas Little-o holds for ALL values C > 0!
• Formal Definition: For ANY positive number C > 0, there exists a positive integer n₀ > 0 such that for all n ≥ n₀: 0 ≤ f(n) < C · g(n).
• Limit Definition: lim_{n → ∞} [f(n) / g(n)] = 0.

Little-omega notation ω(g(n)) defines a lower bound that is strictly non-tight:
• Formal Definition: For ANY positive number C > 0, there exists a positive integer n₀ > 0 such that for all n ≥ n₀: 0 ≤ C · g(n) < f(n).
• Limit Definition: lim_{n → ∞} [f(n) / g(n)] = ∞.`,
      bulletPoints: [
        'Non-tightness: Little-o and Little-omega describe strictly dominated functions.',
        'Quantifier Distinction: Big-O requires ∃ C > 0, while Little-o requires ∀ C > 0.',
        'Limit Criterion for Little-o: lim_{n → ∞} [f(n) / g(n)] = 0.',
        'Limit Criterion for Little-omega: lim_{n → ∞} [f(n) / g(n)] = ∞.'
      ],
      mathFormula: '\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0 \\iff f(n) = o(g(n)) \\qquad \\text{and} \\qquad \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty \\iff f(n) = \\omega(g(n))'
    },
    {
      title: '8. Asymptotic Behavior of Polynomials (Slide 15)',
      description: `Let f(n) = ∑_{i=0}^d a_i n^i where a_d > 0 is a degree-d polynomial. For any real constant k, the following asymptotic relationships are strictly true:
• If k ≥ d, then f(n) = O(n^k).
• If k ≤ d, then f(n) = Ω(n^k).
• If k = d, then f(n) = Θ(n^k).

This foundational theorem allows immediate evaluation of algebraic algorithms by inspecting polynomial degree.`,
      bulletPoints: [
        'Degree d Polynomial: f(n) = a_d n^d + a_{d-1} n^{d-1} + ... + a_1 n + a_0 with a_d > 0.',
        'Condition k ≥ d: Polynomial is upper bounded by n^k → f(n) = O(n^k).',
        'Condition k ≤ d: Polynomial is lower bounded by n^k → f(n) = Ω(n^k).',
        'Condition k = d: Polynomial is tightly bounded by n^k → f(n) = Θ(n^k).'
      ],
      mathFormula: 'f(n) = \\sum_{i=0}^{d} a_i n^i \\quad (a_d > 0) \\implies \\begin{cases} k \\ge d \\implies f(n) = O(n^k) \\\\ k \\le d \\implies f(n) = \\Omega(n^k) \\\\ k = d \\implies f(n) = \\Theta(n^k) \\end{cases}'
    }
  ],
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Empirical Verification of Growth Rates & Operations in C++',
      explanation: 'Demonstrates key operational counting for constant O(1), logarithmic O(log n), linear O(n), and quadratic O(n²) algorithms without considering I/O.',
      code: `// C++ Demonstration comparing key operational complexity classes
#include <iostream>
#include <vector>

// 1. O(1) Constant Operation
int getFirst(const std::vector<int>& arr) {
    // 1 Assignment, 1 Relational check
    return arr.empty() ? -1 : arr[0];
}

// 2. O(log n) Logarithmic Binary Search
int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0, high = static_cast<int>(arr.size()) - 1;
    while (low <= high) { // Relational check
        int mid = low + (high - low) / 2; // Arithmetic + Assignment
        if (arr[mid] == target) return mid; // Relational
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

// 3. O(n) Linear Summation Pass
long long linearSum(const std::vector<int>& arr) {
    long long sum = 0; // Assignment
    for (int val : arr) { // n iterations
        sum += val; // Arithmetic
    }
    return sum;
}

// 4. O(n^2) Quadratic Nested Iterations
long long countPairs(const std::vector<int>& arr) {
    long long count = 0;
    int n = arr.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            count++; // Executed n*(n-1)/2 times = Theta(n^2)
        }
    }
    return count;
}`
    }
  ],
  examQuestions: [
    {
      id: 'cuet-complexity-2023-q1',
      year: 'CUET 2023 Semester Final',
      marks: 10,
      question: 'Formally define Big-O, Big-Omega, and Big-Theta notations with mathematical formulations and graphical interpretations. State which operations are included and excluded for time complexity calculations.',
      difficulty: 'Exam Classic',
      solution: `Part 1: Formal Mathematical Definitions:
• Big-O: f(n) = O(g(n)) iff ∃ C > 0, n₀ ∈ ℤ⁺ such that ∀ n ≥ n₀: 0 ≤ f(n) ≤ C · g(n).
• Big-Omega: f(n) = Ω(g(n)) iff ∃ C > 0, n₀ ∈ ℤ⁺ such that ∀ n ≥ n₀: 0 ≤ C · g(n) ≤ f(n).
• Big-Theta: f(n) = Θ(g(n)) iff ∃ C₁, C₂ > 0, n₀ ∈ ℤ⁺ such that ∀ n ≥ n₀: 0 ≤ C₁ · g(n) ≤ f(n) ≤ C₂ · g(n).

Part 2: Included vs. Excluded Operations (Slide 5):
• Included: Assignments (=), Mathematical (+, -, *, /, %), Relational (>, >=, <, <=, ==, !=), and Function calls.
• EXCLUDED: Input and Output (I/O) are strictly NOT considered for complexity calculations.`,
      keyTakeaway: 'Always cite the exact constants (C, n₀) and note that Input/Output operations are excluded from algorithmic complexity.'
    },
    {
      id: 'cuet-slide-polynomial-q2',
      year: 'CUET Academic Assessment',
      marks: 8,
      question: 'Let f(n) = 4n³ + 7n² + 12. Using the Asymptotic Behavior of Polynomials theorem (Slide 15), evaluate whether f(n) is O(n²), Ω(n²), Θ(n³), and O(n⁴). Justify each.',
      difficulty: 'Medium',
      solution: `The given polynomial f(n) = 4n³ + 7n² + 12 has degree d = 3 with leading coefficient a₃ = 4 > 0.

By the Polynomial Asymptotic Theorem:
1. For k = 2 (evaluating against n²):
Since k = 2 < d = 3 (k ≤ d):
f(n) = Ω(n²) is TRUE.
f(n) = O(n²) is FALSE because cubic grows strictly faster than quadratic.

2. For k = 3 (evaluating against n³):
Since k = 3 = d (k = d):
f(n) = Θ(n³) is TRUE (and consequently f(n) = O(n³) and f(n) = Ω(n³)).

3. For k = 4 (evaluating against n⁴):
Since k = 4 > d = 3 (k ≥ d):
f(n) = O(n⁴) is TRUE because n⁴ serves as a valid asymptotic upper bound.`,
      keyTakeaway: 'When k ≥ d, polynomial is O(n^k); when k ≤ d, it is Ω(n^k); when k = d, it is tightly Θ(n^d).'
    }
  ],
  quizzes: [
    {
      id: 'quiz-complexity-cuet-1',
      question: 'According to CUET Chapter 2 Slide 5, which of the following operations is EXCLUDED from time complexity calculation?',
      options: [
        'Variable Assignment (=)',
        'Input and Output (I/O)',
        'Relational Comparison (<, >)',
        'Mathematical Arithmetic (+, *)'
      ],
      correctIndex: 1,
      explanation: 'Slide 5 explicitly states that Input and Output (I/O) are NOT considered for algorithmic complexity calculations.'
    },
    {
      id: 'quiz-complexity-cuet-2',
      question: 'What is the main difference between Big-O and Little-o notation as defined in Slide 13?',
      options: [
        'Big-O holds for SOME constant C > 0, while Little-o must hold for ALL constants C > 0',
        'Big-O represents space complexity, while Little-o represents time complexity',
        'Big-O requires n ≤ n₀, while Little-o requires n ≥ n₀',
        'There is no mathematical difference between them'
      ],
      correctIndex: 0,
      explanation: 'Slide 13 emphasizes that the bound for Big-O holds for some value C > 0, while the bound for Little-o must hold for all values C > 0 (meaning lim f(n)/g(n) = 0).'
    },
    {
      id: 'quiz-complexity-cuet-3',
      question: 'If sub-procedure f₁(n) = O(n²) and f₂(n) = O(n log n), what is the sequential complexity |(f₁ + f₂)(n)| according to Slide 10?',
      options: [
        'O(n³ log n)',
        'O(n²)',
        'O(n log n)',
        'O(2n²)'
      ],
      correctIndex: 1,
      explanation: 'By the sequential composition rule: |(f₁ + f₂)(n)| = O(max(g₁(n), g₂(n))) = O(max(n², n log n)) = O(n²).'
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
