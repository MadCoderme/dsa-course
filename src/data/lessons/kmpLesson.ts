import { Lesson } from '../../types';

export const KMP_LESSON: Lesson = {
  id: 'kmp-pattern-matching',
  categoryId: 'algorithms',
  subCategoryId: 'string-algorithms',
  title: 'KMP Pattern Matching: Smart Search Without Backtracking',
  subtitle: 'The clever algorithm that never looks back: Demystifying the Prefix Table (π-table) for beginners',
  icon: 'Binary',
  importance: '⚡ HIGH',
  cuetExamRelevance: 'One of the most famous university exam topics (Module 9, Section-A / Section-B). You are virtually guaranteed an 8–12 mark question asking you to: (1) manually compute the π-table (LPS array) for an exam pattern like "AABAACAABAA", and (2) explain how KMP avoids rewinding the text pointer i on mismatch.',
  overview: 'Searching for a specific word inside a massive text (like finding a gene in DNA or pressing Ctrl+F in a 1000-page book) is one of the most fundamental jobs of a computer. While the naive search rewinds its reading finger backward every time it makes a mistake, the Knuth-Morris-Pratt (KMP) algorithm never moves backward! In this lesson, we break down how KMP uses a simple "cheat sheet" called the Prefix Table (π-table or LPS array) to achieve lightning-fast linear search.',
  timeComplexity: {
    access: '$\\mathcal{O}(1)$ Instant array index access',
    search: '$\\mathcal{O}(N + M)$ Strictly linear search (Text length N + Pattern length M)',
    insertion: '$\\mathcal{O}(M)$ Preprocessing time to construct the LPS cheat sheet',
    deletion: '$\\mathcal{O}(1)$ Instant jump using the precomputed LPS table',
    space: '$\\mathcal{O}(M)$ Just a small integer array of size M for the pattern'
  },
  keyConcepts: [
    {
      title: 'Step 1: The Big Intuition Behind KMP (Never Read the Same Letter Twice!)',
      description: 'Imagine you are reading a book looking for the word "ONION". You start reading and find: "O", "N", "I", "O"... and the next letter is "X"! "ONIOX" - not a match!',
      bulletPoints: [
        'The Naive Way (Silly): Naive search says: "Oh no, mismatch! Let me erase my memory, rewind my eyes back to the second letter \'N\', and start testing again from scratch!"',
        'The KMP Way (Smart): KMP says: "Wait! I already saw the letters \'O\', \'N\', \'I\', \'O\'. I know the 4th letter was an \'O\', which is also the first letter of \'ONION\'! I don\'t need to re-read anything. My reading finger stays right here at \'X\', and I just slide my pattern to line up with that \'O\'!"',
        'The Golden Rule of KMP: The text pointer $i$ ONLY moves forward. It NEVER decreases ($i$ never goes backward). That guarantees the entire search finishes in strictly $\\mathcal{O}(N)$ time!'
      ],
      mathFormula: `Why KMP is Faster than Naive Search:
- Naive Search: Worst case is O(N * M) comparisons (keeps rewinding).
- KMP Search: Exactly O(N + M) comparisons (strictly forward progress)!
For a 1,000,000 character DNA strand and a 1,000 character gene:
- Naive could take up to 1,000,000,000 checks!
- KMP takes only ~1,001,000 checks (1000x faster)!`
    },
    {
      title: 'Step 2: What Exactly is a Prefix and a Suffix?',
      description: 'Before building KMP\'s cheat sheet, we must understand two simple English words: Prefix and Suffix.',
      bulletPoints: [
        'Prefix: Any slice of a word that starts at the very beginning (index 0). For example, for "CAT", the prefixes are: "C", "CA", "CAT". A "Proper Prefix" is any prefix that is not the whole word itself ("C", "CA").',
        'Suffix: Any slice of a word that ends at the very end. For "CAT", the suffixes are: "T", "AT", "CAT". A "Proper Suffix" is any suffix that is not the whole word itself ("T", "AT").',
        'Prefix-Suffix Match: Look at the word "ABA". Its proper prefixes are ["A", "AB"]. Its proper suffixes are ["A", "BA"]. Notice that "A" appears in both lists! That means "ABA" starts and ends with the exact same letter "A" (length 1)!'
      ]
    },
    {
      title: 'Step 3: The LPS Table (Longest Prefix which is also a Suffix)',
      description: 'KMP builds a small helper array called LPS (or the π-table). For every position $j$ in the pattern, LPS[j] answers one simple question: "What is the length of the longest proper prefix of the sub-pattern that is also a suffix?"',
      bulletPoints: [
        'Always Starts with 0: For index 0 (a single letter like "A"), there are no proper prefixes or suffixes. So LPS[0] is ALWAYS 0.',
        'Let\'s Trace a Simple Word: "A B A B C":',
        '- At index 0 ("A"): LPS[0] = 0.',
        '- At index 1 ("AB"): Prefixes = ["A"], Suffixes = ["B"]. Match = None. LPS[1] = 0.',
        '- At index 2 ("ABA"): Prefixes = ["A", "AB"], Suffixes = ["A", "BA"]. Match = "A" (len 1). LPS[2] = 1.',
        '- At index 3 ("ABAB"): Prefixes = ["A", "AB", "ABA"], Suffixes = ["B", "AB", "BAB"]. Match = "AB" (len 2). LPS[3] = 2.',
        '- At index 4 ("ABABC"): Match = None. LPS[4] = 0.',
        'Final LPS Table for "ABABC": `[0, 0, 1, 2, 0]`! That\'s it! No magic, just counting matching ends!'
      ],
      mathFormula: `Summary Table for "ABABC":
Index:   0    1    2    3    4
Char:    A    B    A    B    C
LPS:     0    0    1    2    0`
    },
    {
      title: 'Step 4: How KMP Searches Using the LPS Cheat Sheet',
      description: 'Now comes the payoff! Here is how KMP searches for a pattern in text without ever rewinding:',
      bulletPoints: [
        'Two Pointers: We have pointer $i$ on the Text, and pointer $j$ on the Pattern.',
        'Rule 1 (Match): If Text[i] == Pattern[j], congratulations! Move both forward: `i++` and `j++`.',
        'Rule 2 (Full Match Found!): If $j$ reaches the end of the pattern ($j == M$), you found the word! Record the match at `(i - j)`, then set `j = LPS[j - 1]` to look for more matches.',
        'Rule 3 (Mismatch!): If Text[i] != Pattern[j]:',
        '  - If $j > 0$: Do NOT change $i$! Look up your cheat sheet: set `j = LPS[j - 1]`. Pattern slides forward, and Text pointer $i$ stays right where it is!',
        '  - If $j == 0$: The very first letter didn\'t even match. Just move text forward: `i++`.'
      ]
    },
    {
      title: 'Step 5: Step-by-Step Walkthrough on the Famous Exam Pattern',
      description: 'University exams frequently test patterns with repeated symmetric segments. Let\'s trace the classic pattern "AABA":',
      bulletPoints: [
        'Pattern: P = "A A B A"',
        'i = 0 ("A"): LPS[0] = 0.',
        'i = 1 ("AA"): Prefix "A" matches suffix "A". Length = 1. LPS[1] = 1.',
        'i = 2 ("AAB"): No prefix matches suffix. LPS[2] = 0.',
        'i = 3 ("AABA"): Prefix "A" matches suffix "A". Length = 1. LPS[3] = 1.',
        'Resulting LPS Array: `[0, 1, 0, 1]`.'
      ]
    }
  ],
  cstlReference: {
    header: '#include <vector>\n#include <string>\n#include <iostream>',
    declaration: 'std::string text = "ABABDABACDABABCABAB";\nstd::string pattern = "ABABCABAB";',
    commonMethods: [
      { method: 'computeLPS(pattern)', description: 'Builds the pi-table (LPS array) in O(M) time', complexity: 'O(M)' },
      { method: 'KMPSearch(text, pattern)', description: 'Finds all occurrences of pattern in text in O(N) time', complexity: 'O(N)' },
      { method: 'Total Complexity', description: 'Preprocessing O(M) + Searching O(N) = Strictly O(N + M)', complexity: 'O(N + M)' }
    ],
    notes: [
      'The LPS array has many awesome bonus uses in coding competitions: finding the minimum repeated period in a string, testing string rotations, and finding the longest palindromic prefix.',
      'If string length is N, and N % (N - LPS[N-1]) == 0, then the string is made of repeated copies of a smaller substring!'
    ]
  },
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Complete, Clean & Beginner-Friendly KMP in C++',
      explanation: 'Constructs the LPS prefix failure table in O(M) time, then searches the input text in strictly O(N) time without ever rewinding the text pointer.',
      code: `#include <iostream>
#include <vector>
#include <string>

// Step 1: Build the LPS (Longest Prefix Suffix) array / pi-table
std::vector<int> buildLPS(const std::string &pattern) {
    int m = pattern.length();
    std::vector<int> lps(m, 0);

    int len = 0; // Length of previous longest prefix suffix
    int i = 1;   // Start checking from index 1

    while (i < m) {
        if (pattern[i] == pattern[len]) {
            // Characters match! Extend the length
            len++;
            lps[i] = len;
            i++;
        } else {
            // Mismatch!
            if (len != 0) {
                // Fall back to previous prefix length
                len = lps[len - 1];
            } else {
                // No match at all
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

// Step 2: Search for pattern in text using the LPS array
void kmpSearch(const std::string &text, const std::string &pattern) {
    int n = text.length();
    int m = pattern.length();

    // Precompute the LPS table
    std::vector<int> lps = buildLPS(pattern);

    int i = 0; // Pointer on text (NEVER goes backward!)
    int j = 0; // Pointer on pattern

    while (i < n) {
        if (text[i] == pattern[j]) {
            i++;
            j++;
        }

        if (j == m) {
            std::cout << "Found pattern at index " << (i - j) << "\\n";
            // Get ready to find the next match
            j = lps[j - 1];
        } else if (i < n && text[i] != pattern[j]) {
            // Mismatch after j matches
            if (j != 0) {
                // Don't increment i! Just use the cheat sheet for j
                j = lps[j - 1];
            } else {
                // First letter didn't match, move text pointer forward
                i++;
            }
        }
    }
}

int main() {
    std::string text = "ABABDABACDABABCABAB";
    std::string pattern = "ABABCABAB";

    std::cout << "Searching for '" << pattern << "' inside text:\\n";
    kmpSearch(text, pattern);

    return 0;
}`
    }
  ],
  examQuestions: [
    {
      id: 'kmp-q1',
      year: '2023 & 2021 CUET Exam (Section-A Q.3)',
      marks: 10,
      difficulty: 'Exam Classic',
      question: 'Calculate the Knuth-Morris-Pratt (KMP) Prefix Failure Table (π-table / LPS array) for the pattern P = "AABAACAABAA". Explain step-by-step how this table is derived and how it prevents backtracking.',
      solution: `Model University Answer:

Pattern: P = "A A B A A C A A B A A" (Length M = 11)

Step-by-Step Derivation of π-Table (LPS Array):
We determine for each prefix P[0..i], the length of the longest proper prefix that matches a proper suffix:

1. i = 0, P[0] = 'A':
   - Single character has no proper prefix/suffix. π[0] = 0.

2. i = 1, P[0..1] = "AA":
   - Proper prefixes: ["A"]
   - Proper suffixes: ["A"]
   - Match: "A" (length 1). π[1] = 1.

3. i = 2, P[0..2] = "AAB":
   - Proper prefixes: ["A", "AA"]
   - Proper suffixes: ["B", "AB"]
   - No match. π[2] = 0.

4. i = 3, P[0..3] = "AABA":
   - Proper prefixes: ["A", "AA", "AAB"]
   - Proper suffixes: ["A", "BA", "ABA"]
   - Match: "A" (length 1). π[3] = 1.

5. i = 4, P[0..4] = "AABAA":
   - Proper prefixes: ["A", "AA", "AAB", "AABA"]
   - Proper suffixes: ["A", "AA", "BAA", "ABAA"]
   - Match: "AA" (length 2). π[4] = 2.

6. i = 5, P[0..5] = "AABAAC":
   - Ends with 'C', which does not appear in the prefix.
   - No match. π[5] = 0.

7. i = 6, P[0..6] = "AABAACA":
   - Match: "A" (length 1). π[6] = 1.

8. i = 7, P[0..7] = "AABAACAA":
   - Match: "AA" (length 2). π[7] = 2.

9. i = 8, P[0..8] = "AABAACAAB":
   - Prefixes: ["A", "AA", ..., "AAB"]
   - Suffixes: ["B", "AB", ..., "AAB"]
   - Match: "AAB" (length 3). π[8] = 3.

10. i = 9, P[0..9] = "AABAACAABA":
   - Match: "AABA" (length 4). π[9] = 4.

11. i = 10, P[0..10] = "AABAACAABAA":
   - Match: "AABAA" (length 5). π[10] = 5.

Final π-Table / LPS Array:
---------------------------------------------------------------------
Index (i):  0   1   2   3   4   5   6   7   8   9  10
Char P[i]:  A   A   B   A   A   C   A   A   B   A   A
π[i]:       0   1   0   1   2   0   1   2   3   4   5
---------------------------------------------------------------------

How it Prevents Backtracking:
In naive search, when a mismatch occurs after matching j characters, text pointer i is reset back to (i - j + 1).
In KMP:
1. The text pointer i NEVER moves backward (it only moves forward or stays in place).
2. When a mismatch occurs at P[j], the pattern pointer j jumps back to π[j - 1].
Because π[j - 1] characters of the prefix are guaranteed to match the characters right before text[i], we skip re-comparing them! This reduces worst-case search time from O(N * M) to strictly O(N + M).`,
      keyTakeaway: 'The π-table precomputes prefix-suffix symmetry so on mismatch the pattern shifts to π[j-1] while the text pointer i never moves backward, achieving strictly O(N+M) time.'
    },
    {
      id: 'kmp-q2',
      year: '2022 CUET Exam',
      marks: 6,
      difficulty: 'Easy',
      question: 'Explain why the text pointer i never backtracks in the Knuth-Morris-Pratt (KMP) algorithm. What is the benefit of this property when searching data from an unbuffered input stream?',
      solution: `Model University Answer:

1. Why Text Pointer i Never Backtracks:
In KMP, the text pointer i only advances forward (i = i + 1) when characters match or when j == 0.
When a mismatch occurs after matching j characters, instead of moving i backward to start over, KMP shifts the pattern pointer j back to π[j - 1].
Since the π-table precalculated that the first π[j - 1] characters of the pattern are identical to the last π[j - 1] characters already seen in the text, re-reading those characters would be 100% redundant.

2. Benefit for Unbuffered Input Streams:
In real-world systems (such as reading text over a network socket, reading streaming sensor data, or reading a multi-gigabyte file from disk):
- Backtracking requires keeping a large memory buffer to re-read previously processed bytes.
- Because KMP never moves backward, it can process data as an online streaming algorithm in a single pass—needing zero buffer for past text!`,
      keyTakeaway: 'KMP never backtracks because the prefix table already guarantees the previous characters match, allowing single-pass O(N) streaming without memory rewind buffers.'
    }
  ],
  quizzes: [
    {
      id: 'kmp-qz-1',
      question: 'What does the value in the KMP LPS array / π-table represent?',
      options: [
        'The number of times the letter has appeared so far',
        'The length of the longest proper prefix that is also a suffix',
        'The ASCII code of the character modulo 10',
        'The total number of vowels in the pattern'
      ],
      correctIndex: 1,
      explanation: 'LPS stands for "Longest Prefix which is also a Suffix". For any prefix P[0..i], it stores the length of the longest proper prefix that equals a proper suffix.'
    },
    {
      id: 'kmp-qz-2',
      question: 'What is the LPS array for the pattern "AAAA"?',
      options: [
        '[0, 0, 0, 0]',
        '[0, 1, 2, 3]',
        '[1, 2, 3, 4]',
        '[0, 1, 0, 1]'
      ],
      correctIndex: 1,
      explanation: 'For "A", LPS[0]=0. For "AA", proper prefix "A" matches suffix "A" (len 1). For "AAA", "AA" matches "AA" (len 2). For "AAAA", "AAA" matches "AAA" (len 3). So LPS is [0, 1, 2, 3].'
    },
    {
      id: 'kmp-qz-3',
      question: 'During KMP search, when a mismatch occurs at pattern index j (where j > 0), what is the new value of j?',
      options: [
        'j = 0 (reset to beginning)',
        'j = j - 1',
        'j = LPS[j - 1]',
        'j = j + 1'
      ],
      correctIndex: 2,
      explanation: 'KMP sets j = LPS[j - 1], which moves the pattern pointer back to the length of the matching prefix-suffix without rewinding the text pointer i.'
    }
  ]
};
