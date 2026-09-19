import React, { useState, useMemo } from 'react';
import {
  Code2,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sliders,
  Cpu,
  Database,
  ArrowRight,
  Zap,
  Info,
} from 'lucide-react';
import { MathText } from '../common/Latex';

export type DifficultyLevel = 'all' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5';

export interface CodeExample {
  id: string;
  level: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  levelLabel: string;
  levelBadgeColor: string;
  title: string;
  subtitle: string;
  timeComplexity: string;
  timeLatex: string;
  auxSpaceComplexity: string;
  auxSpaceLatex: string;
  totalSpaceComplexity: string;
  totalSpaceLatex: string;
  code: string;
  lineBreakdown: {
    line: string;
    freqFormula: string;
    freqCalc: (n: number) => number;
    description: string;
  }[];
  intuition: string;
  commonTrap: string;
  mathematicalProof: string;
  calculateOperations: (n: number) => {
    assignments: number;
    comparisons: number;
    arithmetic: number;
    totalOps: number;
    auxMemoryUnits: number;
    maxStackDepth: number;
  };
}

export const CODE_EXAMPLES: CodeExample[] = [
  // =========================================================================
  // LEVEL 1: EASY - Constant & Single Linear Loops
  // =========================================================================
  {
    id: 'l1_swap_lookup',
    level: 'level1',
    levelLabel: 'Level 1 · Easy',
    levelBadgeColor: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    title: 'Constant Operations & In-Place Swap',
    subtitle: 'Direct indexing, arithmetic and variable assignments without iteration',
    timeComplexity: 'O(1)',
    timeLatex: '\\mathcal{O}(1)',
    auxSpaceComplexity: 'O(1)',
    auxSpaceLatex: '\\mathcal{O}(1)',
    totalSpaceComplexity: 'O(n) (input array)',
    totalSpaceLatex: '\\mathcal{O}(n)',
    code: `void swapAndAdd(int arr[], int n, int idx1, int idx2) {
    if (idx1 >= n || idx2 >= n) return; // 1 comparison
    int temp = arr[idx1];               // 1 read, 1 assignment
    arr[idx1] = arr[idx2];               // 1 read, 1 assignment
    arr[idx2] = temp;                    // 1 assignment
    int sum = arr[idx1] + arr[idx2];     // 1 arithmetic, 1 assignment
}`,
    lineBreakdown: [
      { line: 'if (idx1 >= n || idx2 >= n) return;', freqFormula: '1', freqCalc: (_n) => 1, description: 'Relational boundary check' },
      { line: 'int temp = arr[idx1];', freqFormula: '1', freqCalc: (_n) => 1, description: 'Single array lookup and scalar assignment' },
      { line: 'arr[idx1] = arr[idx2];', freqFormula: '1', freqCalc: (_n) => 1, description: 'Direct in-place overwrite' },
      { line: 'arr[idx2] = temp;', freqFormula: '1', freqCalc: (_n) => 1, description: 'Scalar assignment' },
      { line: 'int sum = arr[idx1] + arr[idx2];', freqFormula: '1', freqCalc: (_n) => 1, description: 'Single addition operation' }
    ],
    intuition: 'No matter whether the array contains 5 elements or 5,000,000 elements, the CPU executes the exact same fixed handful of 5 instructions.',
    commonTrap: 'Do not confuse the size of the array input n with the number of steps executed by the function. Since no loop depends on n, runtime is strictly constant O(1).',
    mathematicalProof: 'Let T(n) = c_1 + c_2 + c_3 = k (a constant). For any n ≥ 1, T(n) ≤ k · 1, so T(n) = O(1).',
    calculateOperations: (_n) => ({
      assignments: 4,
      comparisons: 1,
      arithmetic: 1,
      totalOps: 6,
      auxMemoryUnits: 2, // temp and sum
      maxStackDepth: 1
    })
  },
  {
    id: 'l1_linear_sum',
    level: 'level1',
    levelLabel: 'Level 1 · Easy',
    levelBadgeColor: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    title: 'Single Pass Linear Scan (Array Sum)',
    subtitle: 'Iterating through n elements exactly once with scalar accumulator',
    timeComplexity: 'O(n)',
    timeLatex: '\\mathcal{O}(n)',
    auxSpaceComplexity: 'O(1)',
    auxSpaceLatex: '\\mathcal{O}(1)',
    totalSpaceComplexity: 'O(n) (input buffer)',
    totalSpaceLatex: '\\mathcal{O}(n)',
    code: `long long computeSum(int arr[], int n) {
    long long total = 0;              // 1 assignment
    for (int i = 0; i < n; i++) {     // i starts at 0; i < n checked n+1 times; i++ done n times
        total += arr[i];              // Executed n times
    }
    return total;
}`,
    lineBreakdown: [
      { line: 'long long total = 0;', freqFormula: '1', freqCalc: (_n) => 1, description: 'Accumulator initialization' },
      { line: 'for (int i = 0; ...)', freqFormula: '1', freqCalc: (_n) => 1, description: 'Loop index initialization' },
      { line: '... i < n; ...', freqFormula: 'n + 1', freqCalc: (n) => n + 1, description: 'Loop guard comparison (true n times, false 1 time)' },
      { line: '... i++', freqFormula: 'n', freqCalc: (n) => n, description: 'Index incrementation' },
      { line: 'total += arr[i];', freqFormula: 'n', freqCalc: (n) => n, description: 'Loop body addition and assignment' }
    ],
    intuition: 'Each element in the array is visited exactly once. If the input doubles, the number of loop iterations doubles in exact proportion.',
    commonTrap: 'Counting loop guard checks: Remember the condition `i < n` is evaluated n + 1 times (the (n+1)-th check evaluates to false and terminates the loop).',
    mathematicalProof: 'T(n) = 1 + 1 + (n + 1) + n + n = 3n + 3. For C = 4 and n₀ = 3, 3n + 3 ≤ 4n, so T(n) = Θ(n).',
    calculateOperations: (n) => ({
      assignments: 1 + n,
      comparisons: n + 1,
      arithmetic: n + n, // i++ and total +=
      totalOps: 4 * n + 3,
      auxMemoryUnits: 2, // total, i
      maxStackDepth: 1
    })
  },
  {
    id: 'l1_vector_copy',
    level: 'level1',
    levelLabel: 'Level 1 · Easy',
    levelBadgeColor: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    title: 'Linear Pass with Dynamic Buffer Allocation',
    subtitle: 'Allocating new heap memory of size n alongside a linear loop',
    timeComplexity: 'O(n)',
    timeLatex: '\\mathcal{O}(n)',
    auxSpaceComplexity: 'O(n) (Auxiliary vector)',
    auxSpaceLatex: '\\mathcal{O}(n)',
    totalSpaceComplexity: 'O(n) (input) + O(n) (auxiliary)',
    totalSpaceLatex: '\\mathcal{O}(n)',
    code: `vector<int> createPrefixSums(const vector<int>& arr) {
    int n = arr.size();
    vector<int> prefix(n);            // Allocates n new integer slots in heap!
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {     // Runs (n - 1) times
        prefix[i] = prefix[i - 1] + arr[i];
    }
    return prefix;                    // Auxiliary space is O(n)
}`,
    lineBreakdown: [
      { line: 'vector<int> prefix(n);', freqFormula: '1 (allocates n words)', freqCalc: (n) => n, description: 'Heap memory allocation of n integer cells' },
      { line: 'prefix[0] = arr[0];', freqFormula: '1', freqCalc: (_n) => 1, description: 'Base element copy' },
      { line: 'for (int i = 1; i < n; i++)', freqFormula: 'n', freqCalc: (n) => Math.max(0, n), description: 'Loop running n - 1 times' },
      { line: 'prefix[i] = prefix[i-1] + arr[i];', freqFormula: 'n - 1', freqCalc: (n) => Math.max(0, n - 1), description: 'Prefix summation write' }
    ],
    intuition: 'While time remains O(n) because of the single loop, the algorithm creates a brand-new vector of size n. Thus, its auxiliary space is O(n), not O(1).',
    commonTrap: 'Distinguishing Total vs Auxiliary Space: An in-place sum uses O(1) auxiliary space, but creating a new output array requires O(n) auxiliary space.',
    mathematicalProof: 'Time: T(n) = c_1 · n + c_2 = O(n). Auxiliary Space: S_{aux}(n) = n \\times \\text{sizeof(int)} = O(n).',
    calculateOperations: (n) => ({
      assignments: 1 + n,
      comparisons: n,
      arithmetic: n - 1,
      totalOps: 3 * n + 1,
      auxMemoryUnits: n + 2,
      maxStackDepth: 1
    })
  },

  // =========================================================================
  // LEVEL 2: EASY-MEDIUM - Dependent & Nested Loops
  // =========================================================================
  {
    id: 'l2_triangular_pairs',
    level: 'level2',
    levelLabel: 'Level 2 · Easy-Med',
    levelBadgeColor: 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    title: 'Dependent Triangular Inner Loop (Unique Pairs)',
    subtitle: 'Inner loop starts at (i + 1), generating the arithmetic sequence sum n(n-1)/2',
    timeComplexity: 'O(n²)',
    timeLatex: '\\mathcal{O}(n^2)',
    auxSpaceComplexity: 'O(1)',
    auxSpaceLatex: '\\mathcal{O}(1)',
    totalSpaceComplexity: 'O(n)',
    totalSpaceLatex: '\\mathcal{O}(n)',
    code: `long long countUniquePairs(int arr[], int n) {
    long long pairs = 0;              // 1 assignment
    for (int i = 0; i < n; i++) {     // Outer loop: n times
        for (int j = i + 1; j < n; j++) { // Inner loop: runs (n - 1 - i) times
            if (arr[i] == arr[j]) {   // Executed n(n - 1)/2 times!
                pairs++;
            }
        }
    }
    return pairs;
}`,
    lineBreakdown: [
      { line: 'for (int i = 0; i < n; i++)', freqFormula: 'n', freqCalc: (n) => n, description: 'Outer loop iterates n times' },
      { line: 'for (int j = i + 1; j < n; j++)', freqFormula: 'n(n-1)/2 + n', freqCalc: (n) => (n * (n - 1)) / 2 + n, description: 'Inner loop guard checks' },
      { line: 'if (arr[i] == arr[j])', freqFormula: 'n(n-1)/2', freqCalc: (n) => (n * (n - 1)) / 2, description: 'Executed (n-1) + (n-2) + ... + 1 times' }
    ],
    intuition: 'When i = 0, the inner loop runs (n - 1) times. When i = 1, it runs (n - 2) times. The total inner executions form Gauss\'s summation: (n-1) + (n-2) + ... + 1 = n(n-1)/2 = ½n² - ½n.',
    commonTrap: 'Thinking an inner loop starting at `i + 1` is O(n) because it runs "less than n". Half of n² is still Θ(n²)!',
    mathematicalProof: 'T(n) = \\sum_{i=0}^{n-1} (n - 1 - i) = \\sum_{k=1}^{n-1} k = \\frac{(n-1)n}{2} = \\frac{1}{2}n^2 - \\frac{1}{2}n = \\Theta(n^2).',
    calculateOperations: (n) => {
      const innerSteps = (n * (n - 1)) / 2;
      return {
        assignments: 1 + n + innerSteps,
        comparisons: n + 1 + innerSteps + n,
        arithmetic: n + innerSteps,
        totalOps: 3 * innerSteps + 3 * n + 2,
        auxMemoryUnits: 3, // pairs, i, j
        maxStackDepth: 1
      };
    }
  },
  {
    id: 'l2_consecutive_vs_nested',
    level: 'level2',
    levelLabel: 'Level 2 · Easy-Med',
    levelBadgeColor: 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    title: 'Consecutive Sequential Loops vs Nested Loops',
    subtitle: 'Understanding why sequential loops ADD (O(n + m)) while nested loops MULTIPLY (O(n · m))',
    timeComplexity: 'O(n + m)',
    timeLatex: '\\mathcal{O}(n + m)',
    auxSpaceComplexity: 'O(1)',
    auxSpaceLatex: '\\mathcal{O}(1)',
    totalSpaceComplexity: 'O(n + m)',
    totalSpaceLatex: '\\mathcal{O}(n + m)',
    code: `void processTwoArrays(int A[], int n, int B[], int m) {
    // Block 1: Sequential loop on Array A
    for (int i = 0; i < n; i++) {     // Runs n times
        A[i] = A[i] * 2;
    }

    // Block 2: Sequential loop on Array B (NOT nested!)
    for (int j = 0; j < m; j++) {     // Runs m times
        B[j] = B[j] + 5;
    }
    // Overall time is O(n + m), NOT O(n * m)!
}`,
    lineBreakdown: [
      { line: 'for (int i = 0; i < n; i++) A[i] *= 2;', freqFormula: 'n', freqCalc: (n) => n, description: 'First loop pass over Array A' },
      { line: 'for (int j = 0; j < m; j++) B[j] += 5;', freqFormula: 'm', freqCalc: (n) => Math.floor(n * 1.5), description: 'Second separate loop pass over Array B' }
    ],
    intuition: 'Because the second loop starts ONLY AFTER the first loop finishes completely, we apply the Sequential Rule: T(n, m) = T₁(n) + T₂(m) = c₁·n + c₂·m = O(n + m).',
    commonTrap: 'Mistaking two independent for-loops for nested loops. Nested loops nest inside one another (multiplying steps); sequential loops run one after the other (adding steps).',
    mathematicalProof: 'By CUET Slide 10 Composition Rule: |(f₁ + f₂)(n, m)| = O(g₁(n) + g₂(m)) = O(n + m).',
    calculateOperations: (n) => {
      const m = Math.floor(n * 1.5);
      return {
        assignments: n + m,
        comparisons: n + 1 + m + 1,
        arithmetic: n + m + n + m,
        totalOps: 3 * n + 3 * m + 2,
        auxMemoryUnits: 2,
        maxStackDepth: 1
      };
    }
  },

  // =========================================================================
  // LEVEL 3: MEDIUM - Multiplicative & Logarithmic Loops
  // =========================================================================
  {
    id: 'l3_halving_log',
    level: 'level3',
    levelLabel: 'Level 3 · Medium',
    levelBadgeColor: 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    title: 'Multiplicative Halving / Doubling Loop',
    subtitle: 'Loop counter multiplies or divides by 2 on each step: logarithmic scaling',
    timeComplexity: 'O(log n)',
    timeLatex: '\\mathcal{O}(\\log n)',
    auxSpaceComplexity: 'O(1)',
    auxSpaceLatex: '\\mathcal{O}(1)',
    totalSpaceComplexity: 'O(1)',
    totalSpaceLatex: '\\mathcal{O}(1)',
    code: `int countHalvings(int n) {
    int iterations = 0;               // 1 assignment
    int val = n;                      // 1 assignment
    while (val > 1) {                 // Runs ⌊log₂ n⌋ times
        val = val / 2;                // Halves value each iteration
        iterations++;                 // Increment counter
    }
    return iterations;
}`,
    lineBreakdown: [
      { line: 'while (val > 1)', freqFormula: '⌊log₂ n⌋ + 1', freqCalc: (n) => Math.max(1, Math.floor(Math.log2(Math.max(1, n)))) + 1, description: 'Guard check executed log2(n) + 1 times' },
      { line: 'val = val / 2;', freqFormula: '⌊log₂ n⌋', freqCalc: (n) => Math.max(0, Math.floor(Math.log2(Math.max(1, n)))), description: 'Integer division by 2' },
      { line: 'iterations++;', freqFormula: '⌊log₂ n⌋', freqCalc: (n) => Math.max(0, Math.floor(Math.log2(Math.max(1, n)))), description: 'Step counter' }
    ],
    intuition: 'At step 0: val = n. At step 1: val = n/2. At step k: val = n / 2^k. The loop stops when n / 2^k ≤ 1, which means 2^k ≥ n, or k = ⌈log₂ n⌉.',
    commonTrap: 'Whenever a loop variable is multiplied (i *= 2) or divided (i /= 2), the number of steps is proportional to log(n), NEVER linear n.',
    mathematicalProof: '2^k = n \\implies k = \\log_2 n. \\text{ Hence } T(n) = \\Theta(\\log n).',
    calculateOperations: (n) => {
      const k = Math.max(0, Math.floor(Math.log2(Math.max(1, n))));
      return {
        assignments: 2 + 2 * k,
        comparisons: k + 1,
        arithmetic: 2 * k,
        totalOps: 5 * k + 3,
        auxMemoryUnits: 2,
        maxStackDepth: 1
      };
    }
  },
  {
    id: 'l3_prime_sqrt',
    level: 'level3',
    levelLabel: 'Level 3 · Medium',
    levelBadgeColor: 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    title: 'Square Root Loop (Prime Factor Testing)',
    subtitle: 'Loop boundary conditioned on i * i <= n: sub-linear √n scaling',
    timeComplexity: 'O(√n)',
    timeLatex: '\\mathcal{O}(\\sqrt{n})',
    auxSpaceComplexity: 'O(1)',
    auxSpaceLatex: '\\mathcal{O}(1)',
    totalSpaceComplexity: 'O(1)',
    totalSpaceLatex: '\\mathcal{O}(1)',
    code: `bool checkPrime(int n) {
    if (n <= 1) return false;         // 1 comparison
    for (int i = 2; i * i <= n; i++) { // Loop condition i² ≤ n implies i ≤ √n
        if (n % i == 0) {             // Modulo test
            return false;
        }
    }
    return true;
}`,
    lineBreakdown: [
      { line: 'if (n <= 1) return false;', freqFormula: '1', freqCalc: (_n) => 1, description: 'Base validation' },
      { line: 'for (int i = 2; i * i <= n; i++)', freqFormula: '⌊√n⌋ - 1', freqCalc: (n) => Math.max(1, Math.floor(Math.sqrt(Math.max(2, n)))), description: 'Loop runs for i = 2, 3, ..., ⌊√n⌋' },
      { line: 'if (n % i == 0) ...', freqFormula: 'at most ⌊√n⌋ - 1', freqCalc: (n) => Math.max(0, Math.floor(Math.sqrt(Math.max(2, n))) - 1), description: 'Divisibility check' }
    ],
    intuition: 'If n has a factor larger than √n, it MUST also have a paired cofactor smaller than √n. Therefore, checking up to i = √n is mathematically exhaustive!',
    commonTrap: 'Do not write `i <= sqrt(n)` inside the loop guard because calculating `sqrt()` in floating-point on every iteration adds overhead. `i * i <= n` performs integer arithmetic.',
    mathematicalProof: 'The loop terminates when i^2 > n \\implies i > \\sqrt{n}. Number of iterations = \\lfloor \\sqrt{n} \\rfloor - 1 = O(\\sqrt{n}).',
    calculateOperations: (n) => {
      const sqrtN = Math.max(0, Math.floor(Math.sqrt(Math.max(2, n))) - 1);
      return {
        assignments: 1 + sqrtN,
        comparisons: 1 + sqrtN + 1,
        arithmetic: 2 * sqrtN,
        totalOps: 4 * sqrtN + 3,
        auxMemoryUnits: 1,
        maxStackDepth: 1
      };
    }
  },
  {
    id: 'l3_n_logn_nested',
    level: 'level3',
    levelLabel: 'Level 3 · Medium',
    levelBadgeColor: 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    title: 'Linearithmic Nested Doubling Loop',
    subtitle: 'Outer loop runs n times; inner loop doubles variable j up to n',
    timeComplexity: 'O(n log n)',
    timeLatex: '\\mathcal{O}(n \\log n)',
    auxSpaceComplexity: 'O(1)',
    auxSpaceLatex: '\\mathcal{O}(1)',
    totalSpaceComplexity: 'O(1)',
    totalSpaceLatex: '\\mathcal{O}(1)',
    code: `long long linearithmicNested(int n) {
    long long count = 0;              // 1 assignment
    for (int i = 1; i <= n; i++) {    // Outer loop: n times
        for (int j = 1; j <= n; j *= 2) { // Inner loop: log₂(n) times
            count += (i + j);         // Executed n × ⌊log₂ n⌋ times!
        }
    }
    return count;
}`,
    lineBreakdown: [
      { line: 'for (int i = 1; i <= n; i++)', freqFormula: 'n', freqCalc: (n) => n, description: 'Outer loop iterates n times' },
      { line: 'for (int j = 1; j <= n; j *= 2)', freqFormula: 'n · (⌊log₂ n⌋ + 1)', freqCalc: (n) => n * (Math.floor(Math.log2(Math.max(1, n))) + 1), description: 'Inner loop guard evaluations' },
      { line: 'count += (i + j);', freqFormula: 'n · ⌊log₂ n⌋', freqCalc: (n) => n * (Math.floor(Math.log2(Math.max(1, n))) + 1), description: 'Arithmetic body executions' }
    ],
    intuition: 'Outer loop runs n times. For each of those n iterations, the inner loop doubles j (1, 2, 4, 8, ...), taking log₂ n steps. Total steps = n × log₂ n.',
    commonTrap: 'Not every nested loop is O(n²)! Always check the inner loop update statement: `j *= 2` makes the inner loop logarithmic, giving O(n log n).',
    mathematicalProof: 'T(n) = \\sum_{i=1}^{n} (\\log_2 n + 1) = n \\cdot (\\log_2 n + 1) = n \\log_2 n + n = \\Theta(n \\log n).',
    calculateOperations: (n) => {
      const logN = Math.floor(Math.log2(Math.max(1, n))) + 1;
      const innerSteps = n * logN;
      return {
        assignments: 1 + n + innerSteps,
        comparisons: n + 1 + innerSteps + n,
        arithmetic: n + 2 * innerSteps,
        totalOps: 4 * innerSteps + 3 * n + 2,
        auxMemoryUnits: 3,
        maxStackDepth: 1
      };
    }
  },

  // =========================================================================
  // LEVEL 4: MEDIUM-HARD - Multi-Variable & Amortized Sliding Window
  // =========================================================================
  {
    id: 'l4_sliding_window',
    level: 'level4',
    levelLabel: 'Level 4 · Med-Hard',
    levelBadgeColor: 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    title: 'Two-Pointer Sliding Window (Amortized Analysis)',
    subtitle: 'Inner while loop inside outer for loop that is AMORTIZED O(n), NOT O(n²)',
    timeComplexity: 'Amortized O(n)',
    timeLatex: '\\text{Amortized } \\mathcal{O}(n)',
    auxSpaceComplexity: 'O(1)',
    auxSpaceLatex: '\\mathcal{O}(1)',
    totalSpaceComplexity: 'O(n)',
    totalSpaceLatex: '\\mathcal{O}(n)',
    code: `int maxSubarraySumAtMostK(int arr[], int n, int k) {
    int left = 0, currentSum = 0, maxLen = 0;
    for (int right = 0; right < n; right++) { // 'right' advances 0 to n-1 (n times)
        currentSum += arr[right];
        while (currentSum > k && left <= right) {
            currentSum -= arr[left];
            left++; // 'left' ONLY increases; advances at most n times in TOTAL!
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen; // Total pointer movements: n (right) + n (left) = 2n = O(n)
}`,
    lineBreakdown: [
      { line: 'for (int right = 0; right < n; right++)', freqFormula: 'n', freqCalc: (n) => n, description: 'Right pointer advances exactly n times' },
      { line: 'while (currentSum > k && left <= right)', freqFormula: 'at most 2n total', freqCalc: (n) => Math.min(2 * n, Math.floor(1.4 * n)), description: 'Guard checks across entire program' },
      { line: 'left++; currentSum -= arr[left];', freqFormula: 'at most n total', freqCalc: (n) => Math.floor(0.8 * n), description: 'Left pointer advances at most n times total' }
    ],
    intuition: 'Although there is a while loop nested inside a for loop, the `left` pointer NEVER resets back to 0. It only moves forward from 0 to n. Hence, across the entire lifetime of the algorithm, `left` increments at most n times and `right` increments n times.',
    commonTrap: 'Blindly multiplying loop bounds! If an inner loop pointer never rewinds, sum the total number of operations across all iterations instead of multiplying worst-case bounds.',
    mathematicalProof: '\\text{Total Steps} = \\sum (\\Delta \\text{right}) + \\sum (\\Delta \\text{left}) \\le n + n = 2n = O(n).',
    calculateOperations: (n) => {
      const leftSteps = Math.floor(0.7 * n);
      return {
        assignments: 3 + n + leftSteps,
        comparisons: n + 1 + 2 * leftSteps,
        arithmetic: n + leftSteps + n,
        totalOps: 3 * n + 4 * leftSteps + 4,
        auxMemoryUnits: 3,
        maxStackDepth: 1
      };
    }
  },
  {
    id: 'l4_matrix_multiply',
    level: 'level4',
    levelLabel: 'Level 4 · Med-Hard',
    levelBadgeColor: 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    title: 'Matrix Multiplication & 2D Output Grid Memory',
    subtitle: 'Triple nested loops multiplying n × n matrices with n² auxiliary storage',
    timeComplexity: 'O(n³)',
    timeLatex: '\\mathcal{O}(n^3)',
    auxSpaceComplexity: 'O(n²) (Output matrix)',
    auxSpaceLatex: '\\mathcal{O}(n^2)',
    totalSpaceComplexity: 'O(n²) (Input matrices) + O(n²) (Output matrix)',
    totalSpaceLatex: '\\mathcal{O}(n^2)',
    code: `vector<vector<int>> multiplyMatrices(const vector<vector<int>>& A, const vector<vector<int>>& B, int n) {
    vector<vector<int>> C(n, vector<int>(n, 0)); // Allocates n × n = n² slots!
    for (int i = 0; i < n; i++) {                // Outer row: n times
        for (int j = 0; j < n; j++) {            // Middle column: n times
            for (int k = 0; k < n; k++) {        // Inner dot product: n times
                C[i][j] += A[i][k] * B[k][j];    // Executed n × n × n = n³ times!
            }
        }
    }
    return C;
}`,
    lineBreakdown: [
      { line: 'vector<vector<int>> C(n, vector<int>(n, 0));', freqFormula: 'n² words allocated', freqCalc: (n) => n * n, description: '2D array allocation on heap' },
      { line: 'for (int i = 0; i < n; i++)', freqFormula: 'n', freqCalc: (n) => n, description: 'Row iteration' },
      { line: 'for (int j = 0; j < n; j++)', freqFormula: 'n²', freqCalc: (n) => n * n, description: 'Column iteration' },
      { line: 'for (int k = 0; k < n; k++)', freqFormula: 'n³', freqCalc: (n) => n * n * n, description: 'Dot product sum over k' }
    ],
    intuition: 'Each element in the n × n output matrix C requires computing the dot product of a row from A and a column from B (which takes n multiplications). With n² elements each taking n operations, total time is n² × n = n³.',
    commonTrap: 'Confusing 2D array dimensions with 1D lengths. A matrix of size n × n contains n² total elements.',
    mathematicalProof: 'T(n) = \\sum_{i=1}^{n} \\sum_{j=1}^{n} \\sum_{k=1}^{n} c = c \\cdot n \\cdot n \\cdot n = c \\cdot n^3 = \\Theta(n^3). \\quad S_{aux}(n) = n^2 = \\Theta(n^2).',
    calculateOperations: (n) => {
      const n2 = n * n;
      const n3 = n * n * n;
      return {
        assignments: 1 + n + n2 + n3,
        comparisons: (n + 1) + n * (n + 1) + n2 * (n + 1),
        arithmetic: n3 * 2,
        totalOps: 3 * n3 + 2 * n2 + 2 * n + 2,
        auxMemoryUnits: n2 + 4,
        maxStackDepth: 1
      };
    }
  },

  // =========================================================================
  // LEVEL 5: HARD - Recursion, Divide & Conquer & Tree Stacks
  // =========================================================================
  {
    id: 'l5_linear_recursion',
    level: 'level5',
    levelLabel: 'Level 5 · Hard',
    levelBadgeColor: 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    title: 'Linear Recursion Call Stack (Factorial / Sum)',
    subtitle: 'Single recursive branch per call: linear time with linear call stack depth',
    timeComplexity: 'O(n)',
    timeLatex: '\\mathcal{O}(n)',
    auxSpaceComplexity: 'O(n) (Call Stack Frames)',
    auxSpaceLatex: '\\mathcal{O}(n)',
    totalSpaceComplexity: 'O(n)',
    totalSpaceLatex: '\\mathcal{O}(n)',
    code: `long long factorial(int n) {
    if (n <= 1) return 1;              // Base case (1 comparison)
    return n * factorial(n - 1);       // 1 recursive call + 1 multiplication
    // Allocates a new stack frame for each call from n down to 1!
    // Maximum active call stack depth = n frames => O(n) Auxiliary Space!
}`,
    lineBreakdown: [
      { line: 'if (n <= 1) return 1;', freqFormula: 'n calls', freqCalc: (n) => Math.max(1, n), description: 'Evaluated once per stack frame' },
      { line: 'return n * factorial(n - 1);', freqFormula: 'n - 1 calls', freqCalc: (n) => Math.max(0, n - 1), description: 'Multiplication after unwinding' },
      { line: '[Call Stack Depth]', freqFormula: 'n frames active simultaneously', freqCalc: (n) => Math.max(1, n), description: 'Memory holding parameters, return addresses' }
    ],
    intuition: 'Each recursive call pauses execution and waits for `factorial(n - 1)` to finish. The computer must store all n active frames on the call stack in RAM until the base case is reached!',
    commonTrap: 'Thinking recursive functions use O(1) space if they don\'t declare arrays. Every active function call consumes a stack frame (parameters, local variables, return address), consuming O(n) memory!',
    mathematicalProof: 'Recurrence: T(n) = T(n - 1) + O(1) \\implies T(n) = O(n). Stack Depth: S(n) = S(n - 1) + 1 \\implies S(n) = O(n).',
    calculateOperations: (n) => {
      const calls = Math.max(1, n);
      return {
        assignments: calls,
        comparisons: calls,
        arithmetic: calls - 1,
        totalOps: 3 * calls - 1,
        auxMemoryUnits: calls, // stack frames
        maxStackDepth: calls
      };
    }
  },
  {
    id: 'l5_fib_tree',
    level: 'level5',
    levelLabel: 'Level 5 · Hard',
    levelBadgeColor: 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    title: 'Binary Tree Recursion (Naive Fibonacci Branching)',
    subtitle: 'Two recursive branches per call: exponential time 2ⁿ with linear stack depth n',
    timeComplexity: 'O(2ⁿ)',
    timeLatex: '\\mathcal{O}(2^n)',
    auxSpaceComplexity: 'O(n) (Tree Height Stack Depth)',
    auxSpaceLatex: '\\mathcal{O}(n)',
    totalSpaceComplexity: 'O(n)',
    totalSpaceLatex: '\\mathcal{O}(n)',
    code: `int fibonacci(int n) {
    if (n <= 1) return n;              // Base case
    return fibonacci(n - 1) + fibonacci(n - 2); // 2 recursive branches!
    // Total tree nodes ≈ 2ⁿ => Time is O(2ⁿ)
    // BUT the stack only goes as deep as the longest branch = n => Space is O(n)!
}`,
    lineBreakdown: [
      { line: 'if (n <= 1) return n;', freqFormula: '≈ 2ⁿ evaluations', freqCalc: (n) => Math.min(4096, Math.pow(2, Math.min(12, n))), description: 'Base case checks at leaf nodes' },
      { line: 'return fib(n-1) + fib(n-2);', freqFormula: '≈ 2ⁿ branching calls', freqCalc: (n) => Math.min(4096, Math.pow(2, Math.min(12, n)) - 1), description: 'Binary tree forks' },
      { line: '[Max Call Stack Depth]', freqFormula: 'n frames (tree height)', freqCalc: (n) => Math.max(1, n), description: 'Stack depth is O(n), NOT O(2ⁿ)!' }
    ],
    intuition: 'The call tree has 2 branches at each level, doubling the number of calls at every step (1, 2, 4, 8, ...), totaling ~2ⁿ nodes. However, the computer uses Depth-First Search (DFS): it explores one branch down to the leaf and unwinds before exploring the next. Thus, the stack never holds more than n frames at once!',
    commonTrap: 'Assuming Space is also O(2ⁿ). Space is determined by the MAXIMUM DEPTH of the call stack active at any single moment, which is the height of the tree: O(n).',
    mathematicalProof: 'Time Recurrence: T(n) = T(n - 1) + T(n - 2) + O(1) \\implies T(n) = \\Theta(\\phi^n) = O(2^n) \\quad (\\phi \\approx 1.618). \\quad \\text{Aux Space: } \\text{Height of tree} = n = O(n).',
    calculateOperations: (n) => {
      const clampedN = Math.min(12, n);
      const totalCalls = Math.min(4096, Math.pow(2, clampedN));
      return {
        assignments: totalCalls,
        comparisons: totalCalls,
        arithmetic: totalCalls,
        totalOps: 3 * totalCalls,
        auxMemoryUnits: n, // max stack depth
        maxStackDepth: n
      };
    }
  },
  {
    id: 'l5_merge_sort_recurrence',
    level: 'level5',
    levelLabel: 'Level 5 · Hard',
    levelBadgeColor: 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    title: 'Divide & Conquer Recurrence (Merge Sort)',
    subtitle: 'Halving problem size with linear merge: T(n) = 2T(n/2) + O(n) => O(n log n)',
    timeComplexity: 'O(n log n)',
    timeLatex: '\\mathcal{O}(n \\log n)',
    auxSpaceComplexity: 'O(n) (Merge Buffer) + O(log n) (Stack)',
    auxSpaceLatex: '\\mathcal{O}(n)',
    totalSpaceComplexity: 'O(n)',
    totalSpaceLatex: '\\mathcal{O}(n)',
    code: `void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;         // Base case
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);         // T(n/2)
    mergeSort(arr, mid + 1, right);    // T(n/2)
    merge(arr, left, mid, right);      // Linear merge: O(n) work & O(n) buffer memory
}`,
    lineBreakdown: [
      { line: 'if (left >= right) return;', freqFormula: '2n - 1 calls', freqCalc: (n) => 2 * n - 1, description: 'Base case checks across all tree nodes' },
      { line: 'mergeSort(arr, left, mid); ...', freqFormula: 'log₂ n levels of recursion', freqCalc: (n) => Math.floor(Math.log2(Math.max(1, n))), description: 'Tree height is log2(n)' },
      { line: 'merge(arr, left, mid, right);', freqFormula: 'n work per level × log₂ n levels', freqCalc: (n) => n * Math.floor(Math.log2(Math.max(1, n))), description: 'Total work across all levels = n log2(n)' }
    ],
    intuition: 'The array is halved at each step until segments of size 1 remain, which takes log₂ n levels of subdivision. At each level of the tree, merging all segments takes exactly n operations in total. Total work = (n operations per level) × (log₂ n levels) = n log₂ n.',
    commonTrap: 'Forgetting auxiliary memory: Standard array Merge Sort requires a temporary buffer of size n to merge sorted halves, making its auxiliary space O(n).',
    mathematicalProof: 'Master Theorem: T(n) = 2T(n/2) + cn \\implies a = 2, b = 2, f(n) = cn^1. \\text{ Since } \\log_b a = \\log_2 2 = 1, T(n) = \\Theta(n \\log n).',
    calculateOperations: (n) => {
      const levels = Math.max(1, Math.floor(Math.log2(Math.max(1, n))));
      const totalSteps = n * levels;
      return {
        assignments: 2 * n + totalSteps,
        comparisons: 2 * n + totalSteps,
        arithmetic: 2 * totalSteps,
        totalOps: 4 * totalSteps + 4 * n,
        auxMemoryUnits: n + levels,
        maxStackDepth: levels + 1
      };
    }
  }
];

export const CodeComplexityAnalyzer: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>('all');
  const [selectedExampleId, setSelectedExampleId] = useState<string>('l1_swap_lookup');
  const [inputN, setInputN] = useState<number>(16);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const filteredExamples = useMemo(() => {
    if (selectedLevel === 'all') return CODE_EXAMPLES;
    return CODE_EXAMPLES.filter((ex) => ex.level === selectedLevel);
  }, [selectedLevel]);

  const activeExample = useMemo(() => {
    const found = CODE_EXAMPLES.find((ex) => ex.id === selectedExampleId);
    return found || CODE_EXAMPLES[0];
  }, [selectedExampleId]);

  const opsData = useMemo(() => {
    return activeExample.calculateOperations(inputN);
  }, [activeExample, inputN]);

  const handleSelectExample = (id: string) => {
    setSelectedExampleId(id);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const quizOptions = ['O(1)', 'O(log n)', 'O(√n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2ⁿ)'];

  return (
    <div className="space-y-4" id="code-complexity-analyzer">
      {/* Header & Level Filters */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-3 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
              <span>Interactive Code Complexity Laboratory (Easy → Hard)</span>
            </h4>
            <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5">
              Explore 11 progressive algorithms, adjust input size <code className="font-mono font-bold text-[#991B1B] dark:text-[#EF4444]">n</code>, and trace exact operation counters, memory frames, and mathematical derivations.
            </p>
          </div>

          {/* Quiz mode toggle */}
          <button
            onClick={() => {
              setQuizMode(!quizMode);
              setSelectedQuizAnswer(null);
              setQuizSubmitted(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold border transition-all cursor-pointer ${
              quizMode
                ? 'bg-[#991B1B] text-white border-[#991B1B]'
                : 'bg-[#FAF8F5] dark:bg-[#201D1A] text-[#66625B] dark:text-[#A8A29E] border-[#E5E2D9] dark:border-[#38332B] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{quizMode ? 'Exit Predict Mode' : 'Test Your Intuition (Quiz Mode)'}</span>
          </button>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#E5E2D9] dark:border-[#38332B]">
          {[
            { id: 'all', label: 'All Levels (11)' },
            { id: 'level1', label: 'L1: Easy (Constant & Linear)' },
            { id: 'level2', label: 'L2: Easy-Med (Nested Loops)' },
            { id: 'level3', label: 'L3: Medium (Log & Sqrt)' },
            { id: 'level4', label: 'L4: Med-Hard (Sliding Window & Matrix)' },
            { id: 'level5', label: 'L5: Hard (Recursion & Stacks)' },
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id as DifficultyLevel)}
              className={`px-2.5 py-1 rounded-md text-xs font-serif transition-all cursor-pointer ${
                selectedLevel === lvl.id
                  ? 'bg-[#1A1A1A] text-white dark:bg-[#EDE8DF] dark:text-[#1A1A1A] font-bold shadow-2xs'
                  : 'bg-[#FAF8F5] dark:bg-[#221F1B] text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-white border border-[#E5E2D9] dark:border-[#38332B]'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Column (Example List) & Right Column (Interactive Analysis) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Algorithm Selector List */}
        <div className="lg:col-span-4 space-y-2 max-h-[680px] overflow-y-auto pr-1">
          {filteredExamples.map((ex) => {
            const isSelected = ex.id === selectedExampleId;
            return (
              <div
                key={ex.id}
                onClick={() => handleSelectExample(ex.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-[#25221E] border-[#991B1B] dark:border-[#EF4444] shadow-sm ring-1 ring-[#991B1B]/20'
                    : 'bg-[#FAF8F5] dark:bg-[#1E1B18] border-[#E5E2D9] dark:border-[#38332B] hover:bg-white dark:hover:bg-[#221F1B]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${ex.levelBadgeColor}`}>
                    {ex.levelLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#991B1B] dark:text-[#EF4444]">
                    {ex.timeComplexity}
                  </span>
                </div>
                <div className="font-serif font-bold text-xs text-[#1A1A1A] dark:text-[#EDE8DF] line-clamp-1">
                  {ex.title}
                </div>
                <div className="text-[11px] text-[#66625B] dark:text-[#A8A29E] line-clamp-1 mt-0.5">
                  {ex.subtitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Code Breakdown & Live Simulation */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Algorithm Header Banner */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-3 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border ${activeExample.levelBadgeColor}`}>
                    {activeExample.levelLabel}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                    {activeExample.title}
                  </h3>
                </div>
                <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-1">
                  {activeExample.subtitle}
                </p>
              </div>

              {/* Complexity Badges */}
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-[#66625B] dark:text-[#A8A29E]">Time Complexity</div>
                  <div className="text-sm font-mono font-bold text-[#991B1B] dark:text-[#EF4444]">
                    <MathText text={`$${activeExample.timeLatex}$`} />
                  </div>
                </div>
                <div className="w-px h-8 bg-[#E5E2D9] dark:bg-[#38332B]" />
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-[#66625B] dark:text-[#A8A29E]">Auxiliary Space</div>
                  <div className="text-sm font-mono font-bold text-[#0D9488] dark:text-[#2DD4BF]">
                    <MathText text={`$${activeExample.auxSpaceLatex}$`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Input Slider */}
            <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
                <span className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Simulate with Input Size <strong className="font-mono text-[#991B1B] dark:text-[#EF4444] text-sm">n = {inputN}</strong>
                </span>
              </div>

              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <input
                  type="range"
                  min="2"
                  max="64"
                  step="2"
                  value={inputN}
                  onChange={(e) => setInputN(parseInt(e.target.value, 10))}
                  className="w-full accent-[#991B1B] cursor-pointer"
                />
                <span className="text-[11px] font-mono text-[#66625B] dark:text-[#A8A29E] min-w-[36px] text-right">
                  {inputN}
                </span>
              </div>
            </div>

            {/* Live Operational Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#221F1B] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="flex items-center gap-1.5 text-[11px] font-serif text-[#66625B] dark:text-[#A8A29E]">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Total CPU Steps</span>
                </div>
                <div className="text-base font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-0.5">
                  {opsData.totalOps.toLocaleString()} ops
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#221F1B] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="flex items-center gap-1.5 text-[11px] font-serif text-[#66625B] dark:text-[#A8A29E]">
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  <span>Loop Comparisons</span>
                </div>
                <div className="text-base font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-0.5">
                  {opsData.comparisons.toLocaleString()}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#221F1B] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="flex items-center gap-1.5 text-[11px] font-serif text-[#66625B] dark:text-[#A8A29E]">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aux Memory Units</span>
                </div>
                <div className="text-base font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-0.5">
                  {opsData.auxMemoryUnits.toLocaleString()} slots
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#221F1B] border border-[#E5E2D9] dark:border-[#38332B]">
                <div className="flex items-center gap-1.5 text-[11px] font-serif text-[#66625B] dark:text-[#A8A29E]">
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
                  <span>Stack Frame Depth</span>
                </div>
                <div className="text-base font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF] mt-0.5">
                  {opsData.maxStackDepth} frames
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Quiz Mode Card (If Activated) */}
          {quizMode && (
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Predict the Time Complexity for this Snippet</span>
                </span>
                <span className="text-[11px] font-mono text-amber-800 dark:text-amber-300">
                  Select your prediction:
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quizOptions.map((opt) => {
                  const isSelected = selectedQuizAnswer === opt;
                  const isCorrect = opt === activeExample.timeComplexity || activeExample.timeComplexity.includes(opt);

                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedQuizAnswer(opt);
                        setQuizSubmitted(true);
                      }}
                      className={`p-2 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                        quizSubmitted
                          ? isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-500'
                            : isSelected
                            ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 border-rose-500'
                            : 'bg-white dark:bg-[#201D1A] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 opacity-60'
                          : isSelected
                          ? 'bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100 border-amber-600'
                          : 'bg-white dark:bg-[#201D1A] text-[#1A1A1A] dark:text-[#EDE8DF] border-[#E5E2D9] dark:border-[#38332B] hover:border-amber-400'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="p-3 rounded-lg bg-white dark:bg-[#201D1A] border border-amber-300 dark:border-amber-800 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-serif font-bold">
                    {selectedQuizAnswer === activeExample.timeComplexity || activeExample.timeComplexity.includes(selectedQuizAnswer || '') ? (
                      <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct Prediction!
                      </span>
                    ) : (
                      <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect Prediction. Correct: {activeExample.timeComplexity}
                      </span>
                    )}
                  </div>
                  <p className="text-[#66625B] dark:text-[#A8A29E] font-serif">
                    {activeExample.intuition}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Source Code Box */}
          <div className="rounded-xl border border-[#E5E2D9] dark:border-[#38332B] bg-[#1E1B18] text-[#EDE8DF] overflow-hidden">
            <div className="p-2.5 px-4 bg-[#141210] border-b border-[#2E2923] flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#EF4444]" />
                <span>C++ Algorithmic Implementation</span>
              </span>
              <span className="text-stone-400 text-[11px]">
                {activeExample.timeComplexity} Time · {activeExample.auxSpaceComplexity} Space
              </span>
            </div>
            <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-[#D6D0C5]">
              <code>{activeExample.code}</code>
            </pre>
          </div>

          {/* Line-by-Line Breakdown Table */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#EF4444]" />
                <span>Line-by-Line Execution Analysis (For n = {inputN})</span>
              </h4>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
              <table className="w-full text-xs font-mono text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] dark:bg-[#221F1B] border-b border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF]">
                    <th className="py-2 px-3 font-bold">Code Segment</th>
                    <th className="py-2 px-3 font-bold">Formula</th>
                    <th className="py-2 px-3 font-bold text-center">Iterations (n={inputN})</th>
                    <th className="py-2 px-3 font-serif">Operational Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2D9] dark:divide-[#38332B] text-[#2C2B29] dark:text-[#D6D0C5]">
                  {activeExample.lineBreakdown.map((lb, idx) => {
                    const iters = lb.freqCalc(inputN);
                    return (
                      <tr key={idx} className="hover:bg-[#FAF8F5] dark:hover:bg-[#201D1A]">
                        <td className="py-2 px-3 font-bold text-[#991B1B] dark:text-[#F87171]">{lb.line}</td>
                        <td className="py-2 px-3 text-[#0284C7] dark:text-[#38BDF8]">{lb.freqFormula}</td>
                        <td className="py-2 px-3 font-bold text-center bg-[#FAF8F5]/50 dark:bg-[#1E1B18]/50">
                          {iters.toLocaleString()}
                        </td>
                        <td className="py-2 px-3 font-serif text-[#66625B] dark:text-[#A8A29E] text-[11px]">{lb.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Intuition, Trap & Mathematical Proof Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Intuition Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-2 shadow-2xs text-xs">
              <div className="font-serif font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 pb-1 border-b border-[#E5E2D9] dark:border-[#38332B]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Intuition First: Why is it {activeExample.timeComplexity}?</span>
              </div>
              <p className="font-serif text-[#2C2B29] dark:text-[#D6D0C5] leading-relaxed">
                {activeExample.intuition}
              </p>
            </div>

            {/* Common Trap Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E5E2D9] dark:border-[#38332B] space-y-2 shadow-2xs text-xs">
              <div className="font-serif font-bold text-xs text-rose-800 dark:text-rose-300 flex items-center gap-1.5 pb-1 border-b border-[#E5E2D9] dark:border-[#38332B]">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Common Exam Trap to Avoid</span>
              </div>
              <p className="font-serif text-[#2C2B29] dark:text-[#D6D0C5] leading-relaxed">
                {activeExample.commonTrap}
              </p>
            </div>
          </div>

          {/* Mathematical Proof Accordion/Card */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B18] border border-[#E5E2D9] dark:border-[#38332B] space-y-2 text-xs">
            <div className="font-serif font-bold text-xs text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#991B1B] dark:text-[#EF4444]" />
              <span>Formal Asymptotic Proof:</span>
            </div>
            <div className="p-3 rounded bg-white dark:bg-[#25221E] border border-[#E5E2D9] dark:border-[#38332B] font-mono text-[11px] text-[#1A1A1A] dark:text-[#EDE8DF]">
              <MathText text={`$${activeExample.mathematicalProof}$`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
