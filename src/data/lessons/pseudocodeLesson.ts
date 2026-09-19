import { Lesson } from '../../types';

export const PSEUDOCODE_LESSON: Lesson = {
  id: 'pseudocode-introduction',
  categoryId: 'foundations',
  subCategoryId: 'algorithmic-foundations',
  title: 'Introduction to Pseudocode',
  subtitle: 'Rules, Standard Syntax & Progressive Code Examples from Easy to Practical',
  icon: 'ScrollText',
  overview: 'Pseudocode is an informal, human-readable way to plan and describe algorithms before writing actual code. It uses the logical structure of programming languages without worrying about strict syntax, semicolons, or compiler errors. It is the universal language used by computer scientists, interviewers, and textbooks to communicate algorithmic ideas clearly.',
  keyConcepts: [
    {
      title: '1. What is Pseudocode? Fundamental Rules & Grammar',
      description: `Before writing real code in C++, Python, or Java, programmers write **pseudocode** to organize their thoughts. Pseudocode is not meant to be executed by a computer—it is written for human beings to understand the logic of an algorithm.

To keep pseudocode clean and unambiguous, computer scientists follow five universal conventions:

• Rule 1: Capitalize Control Keywords: Write core keywords in uppercase: INPUT, OUTPUT, IF, THEN, ELSE, FOR, WHILE, REPEAT, RETURN.
• Rule 2: Assignment vs. Equality: Use an arrow (←) or (:=) when assigning a new value to a variable (e.g., total ← total + x). Reserve the equal sign (= or ==) strictly for checking equality (e.g., if x = 10 then).
• Rule 3: Use Indentation for Structure: Instead of curly braces {} or complex markers, indent statements that belong inside an IF block, FOR loop, or WHILE loop.
• Rule 4: Plain English Logic: Express conditions using natural words like and, or, not, and mod (remainder) instead of language-specific symbols like && or ||.
• Rule 5: 1-Based Indexing by Convention: In standard algorithmic literature (such as CLRS and university exams), arrays are conventionally indexed from 1 to n (e.g., A[1...n]). When writing the final code in C++ or Python, you shift the indices to 0-based memory addresses (A[0...n-1]).`,
      bulletPoints: [
        'Language-Independent: Communicates algorithmic ideas without language-specific syntax or compiler errors.',
        'Core Rules: Capitalized keywords, arrow (←) for assignment, indentation for hierarchy, and natural logical operators.',
        '1-Based vs. 0-Based: Textbooks default to array indices 1 to n; programming languages use 0 to n - 1.'
      ],
      mathFormula: '\\begin{aligned} &\\textbf{Assignment: } \\text{variable} \\leftarrow \\text{expression} \\quad (\\text{e.g., } count \\leftarrow count + 1) \\\\ &\\textbf{Comparison: } \\textbf{if } a = b \\textbf{ then } \\dots \\quad (\\text{testing equality, not mutating state}) \\end{aligned}'
    },
    {
      title: '2. Task Examples (Level 1 - Easy): Variables, Math & Conditionals',
      description: `Let us begin with simple, introductory tasks. These algorithms take inputs, perform basic calculations, and make conditional decisions using IF-ELSE blocks.

Task A: Find the Maximum of Two Numbers
This algorithm accepts two numbers a and b, compares them, and returns whichever value is larger:
\`\`\`text
Algorithm MaxOfTwo(a, b)
  Input: Two numbers a and b
  Output: The larger of the two numbers
  if a > b then
    return a
  else
    return b
  end if
\`\`\`

Task B: Swap Two Variables Using a Temporary Container
If you want to swap the contents of two variables a and b, you cannot simply say a ← b because the original value of a would be overwritten and lost. You need a third variable temp to hold the value temporarily:
\`\`\`text
Algorithm SwapVariables(a, b)
  Input: Two variables a and b
  temp ← a      // Save original value of a
  a ← b         // Overwrite a with b
  b ← temp      // Overwrite b with saved value
  return a, b
\`\`\`

Task C: Check If a Number is Even or Odd
Using the modulo operator (mod), which calculates the remainder after division:
\`\`\`text
Algorithm CheckEvenOdd(num)
  Input: An integer num
  if num mod 2 = 0 then
    return "Even"
  else
    return "Odd"
  end if
\`\`\``,
      bulletPoints: [
        'Decision Making: IF-THEN-ELSE routes execution down one path based on a boolean condition.',
        'The Swap Pattern: Using a temporary container (temp) prevents data loss during variable reassignment.',
        'Modulo Operator: num mod 2 = 0 tests whether a number divides evenly with zero remainder.'
      ],
      mathFormula: '\\text{Swap Trace: } (a=5, b=9) \\xrightarrow{temp \\leftarrow a} temp=5 \\xrightarrow{a \\leftarrow b} a=9 \\xrightarrow{b \\leftarrow temp} b=5'
    },
    {
      title: '3. Task Examples (Level 2 - Loops): Iteration & Accumulators',
      description: `When an algorithm needs to repeat steps, we use loops. A FOR loop is ideal when you know in advance how many times to repeat; a WHILE loop is used when you repeat until a specific condition changes.

Task D: Calculate the Sum of Numbers from 1 to N (The Accumulator Pattern)
Here we initialize a running total variable to 0, then use a FOR loop to add each number from 1 to n:
\`\`\`text
Algorithm SumOneToN(n)
  Input: A positive integer n
  Output: The sum of integers 1 + 2 + ... + n
  total ← 0
  for i ← 1 to n do
    total ← total + i
  end for
  return total
\`\`\`

Task E: Find the Average of an Array of Numbers
To compute the arithmetic mean, accumulate the sum of all elements in array A[1...n], then divide by the total count n:
\`\`\`text
Algorithm ArrayAverage(A, n)
  Input: An array A[1...n] of n numbers
  Output: The average value of elements in A
  sum ← 0
  for i ← 1 to n do
    sum ← sum + A[i]
  end for
  average ← sum / n
  return average
\`\`\``,
      bulletPoints: [
        'Accumulator Pattern: Initialize a tracker variable before the loop (e.g., total ← 0) and add to it on each cycle.',
        'Array Access: A[i] accesses the i-th element of collection A during loop execution.',
        'Predictable Bounds: for i ← 1 to n do iterates through all valid indices from start to finish.'
      ],
      mathFormula: '\\text{Accumulation: } S_n = \\sum_{i=1}^{n} A[i] = A[1] + A[2] + \\dots + A[n]'
    },
    {
      title: '4. Task Examples (Level 3 - Search): Array Scanning & Decision Logic',
      description: `Now let us examine practical algorithmic tasks that inspect array contents to find specific elements or answers.

Task F: Find the Maximum Element in an Array
To find the largest number in an array A[1...n], we assume the first element A[1] is the current champion (maxVal). We then scan the rest of the array (starting from index 2). Whenever we encounter an element larger than maxVal, we update our champion:
\`\`\`text
Algorithm FindMaximum(A, n)
  Input: An array A[1...n] of n numbers
  Output: The largest number in A
  maxVal ← A[1]
  for i ← 2 to n do
    if A[i] > maxVal then
      maxVal ← A[i]
    end if
  end for
  return maxVal
\`\`\`

Task G: Linear Search with Early Exit
To check if a target value exists in an array, we examine elements one by one. The moment we find a match, we immediately exit using return i. If the entire loop finishes without finding the target, we return -1:
\`\`\`text
Algorithm LinearSearch(A, n, target)
  Input: Array A[1...n], value target
  Output: Index of target if found, else -1
  for i ← 1 to n do
    if A[i] = target then
      return i       // Target found! Exit immediately
    end if
  end for
  return -1          // Not found after scanning all elements
\`\`\``,
      bulletPoints: [
        'Champion Pattern: Initialize the optimal tracker with A[1], then iterate from 2 to n to update when a better value appears.',
        'Early Exit: return inside a loop stops execution immediately upon finding the answer without wasting remaining iterations.',
        'Sentinel Return: Returning -1 is the universal convention indicating an item was not found.'
      ],
      mathFormula: '\\text{Linear Search Best Case: } \\mathcal{O}(1) \\; (\\text{target at } A[1]), \\quad \\text{Worst Case: } \\mathcal{O}(n) \\; (\\text{not present})'
    },
    {
      title: '5. How to Dry-Run Pseudocode: Step-by-Step Tracing',
      description: `Before writing code, good developers perform a **dry run** (trace) by hand. A dry run is a table drawn on paper that records the exact values of variables at every single step of execution for a concrete test input.

Example Trace: LinearSearch on Array A = [14, 5, 29, 11] with target = 29 (n = 4):

• Step 1: Initialize loop at i = 1. Examine A[1] = 14. Compare: 14 = 29? False. Continue loop.
• Step 2: Increment loop to i = 2. Examine A[2] = 5. Compare: 5 = 29? False. Continue loop.
• Step 3: Increment loop to i = 3. Examine A[3] = 29. Compare: 29 = 29? True! Execute return 3. Algorithm halts and outputs 3.

Why Dry-Running is Essential:
• Catches "off-by-one" errors (e.g., forgetting to check the last element or looping one step too far).
• Verifies boundary conditions (e.g., what happens if the array has only 1 element, or if target is at the very beginning).
• Builds deep mental models of program flow before you ever touch a compiler.`,
      bulletPoints: [
        'Manual Verification: Writing variable values column-by-column verifies algorithmic correctness.',
        'Bug Prevention: Pinpoints logic flaws, premature returns, and boundary bugs before coding begins.',
        'Interview Superpower: Technical interviewers regularly ask candidates to trace their pseudocode with an example.'
      ],
      mathFormula: '\\begin{array}{|c|c|c|c|c|} \\hline \\textbf{Step} & \\textbf{Index } i & \\textbf{Element } A[i] & \\textbf{Check: } A[i] = target & \\textbf{Action Taken} \\\\ \\hline 1 & 1 & 14 & 14 = 29 \\implies \\text{False} & \\text{Advance } i \\\\ 2 & 2 & 5 & 5 = 29 \\implies \\text{False} & \\text{Advance } i \\\\ 3 & 3 & 29 & 29 = 29 \\implies \\text{True} & \\textbf{return } 3 \\text{ (Found!)} \\\\ \\hline \\end{array}'
    }
  ],
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Translating Beginner Pseudocode to C++',
      explanation: 'See how directly standard pseudocode translates into clean, readable C++ functions with 0-based vector indexing.',
      code: `// Task A: Find Maximum of Two Numbers
int maxOfTwo(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

// Task B: Swap Two Numbers using temporary variable
void swapVariables(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// Task D: Sum of Numbers from 1 to N
int sumOneToN(int n) {
    int total = 0;
    for (int i = 1; i <= n; ++i) {
        total += i;
    }
    return total;
}

// Task G: Linear Search in a Vector (0-based indexing)
int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) {
            return i; // Found at 0-based index i
        }
    }
    return -1; // Sentinel indicating target not found
}`
    }
  ],
  examQuestions: [
    {
      id: 'cuet-pseudocode-q1',
      year: 'CUET Semester Exam',
      marks: 10,
      question: 'Explain the core conventions of pseudocode (keywords, assignment operator, indentation). Write pseudocode to find the largest element in an array A[1...n] of n integers, and trace it using the array A = [7, 23, 15, 42, 19].',
      difficulty: 'Exam Classic',
      solution: `Part 1: Core Conventions of Pseudocode:
1. Capitalized Keywords: Reserved constructs (IF, ELSE, FOR, WHILE, RETURN) are capitalized for visual hierarchy.
2. Assignment Operator (←): Distinguishes updating state (x ← x + 1) from equality checks (if x = 10).
3. Indentation: Nested statements inside loops and conditions are indented rather than wrapped in language-specific braces {}.
4. 1-Based Indexing: Collections are indexed from 1 to n by default.

Part 2: Pseudocode for Finding Largest Element:
Algorithm FindMaximum(A, n)
  Input: Array A[1...n] of n integers
  Output: The maximum value in A
  maxVal ← A[1]
  for i ← 2 to n do
    if A[i] > maxVal then
      maxVal ← A[i]
    end if
  end for
  return maxVal

Part 3: Dry-Run Trace on A = [7, 23, 15, 42, 19] (n = 5):
• Initialization: maxVal ← A[1] = 7.
• i = 2: A[2] = 23. Is 23 > 7? Yes → maxVal ← 23.
• i = 3: A[3] = 15. Is 15 > 23? No → maxVal remains 23.
• i = 4: A[4] = 42. Is 42 > 23? Yes → maxVal ← 42.
• i = 5: A[5] = 19. Is 19 > 42? No → maxVal remains 42.
• Loop terminates. Return maxVal = 42. Output: 42.`,
      keyTakeaway: 'Always initialize maxVal with A[1] and begin the loop at index 2. This prevents artificial assumptions like assuming all numbers are positive.'
    }
  ],
  quizzes: [
    {
      id: 'quiz-pseudo-1',
      question: 'What is the primary purpose of using the arrow symbol (← or :=) in standard pseudocode?',
      options: [
        'To declare a memory pointer',
        'To explicitly distinguish variable assignment from equality testing (=)',
        'To indicate recursive function return',
        'To denote array indexing'
      ],
      correctIndex: 1,
      explanation: 'In pseudocode, ← or := represents variable assignment (changing a variable value), preventing confusion with algebraic equality testing (=).'
    },
    {
      id: 'quiz-pseudo-2',
      question: 'When finding the maximum value in an array A[1...n], what is the best initial value for maxVal?',
      options: [
        '0',
        'A[1]',
        '-1',
        'n'
      ],
      correctIndex: 1,
      explanation: 'Initializing maxVal to A[1] guarantees correctness even if all numbers in the array are negative. Initializing to 0 would fail for an array of negative numbers like [-10, -5, -20].'
    },
    {
      id: 'quiz-pseudo-3',
      question: 'What does a return value of -1 typically represent in a search algorithm like LinearSearch?',
      options: [
        'A fatal system crash',
        'The target element was found at index 0',
        'A sentinel value indicating the target was not found in the array',
        'The array is sorted in reverse order'
      ],
      correctIndex: 2,
      explanation: 'Since array indices are non-negative, -1 is the universal sentinel value indicating that the searched target is absent from the array.'
    }
  ],
  practiceProblems: [
    {
      id: 'cp-pseudocode-1',
      title: 'Find Numbers with Even Number of Digits',
      platform: 'LeetCode',
      problemNumber: '1295',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits/',
      description: 'Practice translating accumulator loop pseudocode into executable code by counting elements that satisfy a condition.',
      keyPattern: 'Demonstrates accumulator loop pattern: count ← 0, iterate array, if condition then count ← count + 1.'
    },
    {
      id: 'cp-pseudocode-2',
      title: 'Linear Search Array Implementation',
      platform: 'LeetCode',
      problemNumber: '704',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/binary-search/',
      description: 'Implement fundamental element searching with early return and sentinel handling.',
      keyPattern: 'Demonstrates search traversal and -1 sentinel return when absent.'
    }
  ]
};
