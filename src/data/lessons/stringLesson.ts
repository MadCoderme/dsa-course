import { Lesson } from '../../types';

export const STRING_LESSON: Lesson = {
  id: 'string',
  categoryId: 'linear',
  subCategoryId: 'sequential-contiguous',
  title: 'String Processing: Basics, Memory Models, Pseudocode Operations & Algorithms',
  subtitle: 'Complete guide to character data, storage structures, primitive operations, and step-by-step algorithms (Schaum\'s Outline Chapter 3)',
  icon: 'Layers',
  importance: '⚡ HIGH',
  cuetExamRelevance: 'A core foundation of Data Structures semester examinations (Chapter 3). You will regularly be tested on: (1) Basic terminology: alphabet, string length, empty string (Λ), concatenation, and substrings; (2) The 3 classic memory storage structures (Fixed-Length, Variable-Length with Sentinel/Length, and Linked Storage); (3) Formulating primitive operations (LENGTH, SUBSTRING, INDEX, CONCAT) and high-level procedures (INSERT, DELETE, REPLACE); and (4) Writing and tracing sample algorithms step-by-step (Algorithm 3.1 Deletion, Algorithm 3.2 Replacement with loop trap analysis, and Algorithm 3.3 Pattern Matching).',
  overview: 'Historically, computers were first created to process numerical calculations. Today, however, computers are frequently used for processing nonnumerical data, called character data. From text editing and word processors to web browsers, search engines, and DNA sequence analyzers, manipulating character strings is at the heart of computer science. In this lesson, based on Chapter Three (String Processing) of Seymour Lipschutz\'s classic Data Structures, we will start from absolute basics—character sets, empty strings, and how text is stored in RAM—then break down the fundamental primitive operations simply, and finally teach you how to write, trace, and analyze high-level pseudocode algorithms step by step.',
  timeComplexity: {
    access: '$\\mathcal{O}(1)$ Instant character access in array/fixed storage, $\\mathcal{O}(K)$ in linked storage',
    search: '$\\mathcal{O}(R \\times S)$ Naive pattern matching, $\\mathcal{O}(S)$ Linear table-driven automaton',
    insertion: '$\\mathcal{O}(N)$ Slicing and shifting text in contiguous memory; $\\mathcal{O}(1)$ node splice in linked storage',
    deletion: '$\\mathcal{O}(N)$ Compacting remaining text in contiguous memory; $\\mathcal{O}(1)$ node unlink in linked storage',
    space: '$\\mathcal{O}(N)$ Contiguous byte storage; $\\mathcal{O}(N + \\text{pointers})$ in linked list storage'
  },
  keyConcepts: [
    {
      title: 'Step 1: Basics of Strings — Terminology, Character Sets & Substrings',
      description: 'Before writing algorithms, let us establish the fundamental definitions used throughout computer science and university exams (Lipschutz Section 3.1 & 3.2):',
      bulletPoints: [
        'Character Set: Every computer language communicates using a set of characters. This set typically consists of: (1) The Alphabet (A–Z, a–z), (2) Digits (0–9), and (3) Special Characters (+, -, *, /, (, ), ,, ., $, =, and the blank space).',
        'The Blank Space Character (□): In string processing, a blank space is a valid character just like the letter \'A\'! To avoid ambiguity in handwritten exam questions and textbooks, a blank space is frequently denoted by the open box symbol □ (ASCII value 32). A space always counts toward string length.',
        'Definition of a String: A finite sequence S of zero or more characters is called a string. The number of characters in a string is called its length. Specific strings are enclosed in quotation marks (delimiters): \'THE END\' has length 7, and \'TO BE OR NOT TO BE\' has length 18 (14 letters + 4 blank spaces).',
        'The Empty String (Null String Λ): A string containing zero characters is called the empty string or null string, denoted by the Greek letter Lambda (Λ) or empty quotes \'\' (or ""). Its length is strictly 0: `LENGTH(Λ) = 0`.',
        'Concatenation (// or +): Joining two strings S1 and S2 end-to-end is called concatenation, denoted in mathematical pseudocode by S1 // S2. For example, \'THE\' // \'END\' = \'THEEND\', whereas \'THE\' // \'□\' // \'END\' = \'THE END\'. The length of S1 // S2 is equal to the sum of lengths: `LENGTH(S1 // S2) = LENGTH(S1) + LENGTH(S2)`.',
        'Substring: A string Y is called a substring of S if there exist strings X and Z such that S = X // Y // Z. If X is the empty string (Λ), Y is called an initial substring (prefix). If Z is the empty string (Λ), Y is called a terminal substring (suffix). The length of any substring Y cannot exceed the length of S (`LENGTH(Y) <= LENGTH(S)`).'
      ],
      mathFormula: `Worked Substring Examples from the Textbook:
String S = 'TO BE OR NOT TO BE'
- 'TO' is an initial substring (prefix) of S (X = Λ)
- 'BE OR NOT' is an interior substring of S (X = 'TO ', Z = ' TO BE')
- 'TO BE' is both an initial substring AND a terminal substring (suffix)
- For any string S of length n, the number of initial substrings is n + 1 (including Λ)`
    },
    {
      title: 'Step 2: How Computers Store Strings — The 3 Classic Storage Structures',
      description: 'How does computer memory physically organize sequences of characters? Lipschutz (Section 3.3 & 3.4) classifies string storage into three core structures, each with distinct trade-offs:',
      bulletPoints: [
        '1. Record-Oriented, Fixed-Length Storage: Each line of text is viewed as a record where all records have the exact same length (traditionally 80 characters, corresponding to 80-column terminal screens and punched cards). Advantages: (a) Arithmetic address calculation allows instant O(1) random access to any record k (`Base + (k-1)*80`), (b) Easy in-place data updates. Disadvantages: (a) Tremendous memory waste if records contain many inessential trailing blank spaces, (b) Text longer than the fixed size is truncated, (c) Inserting a new record requires shifting every succeeding record down!',
        'The Pointer Array Remedy (POINT): Instead of keeping records in consecutive memory, we store them anywhere in memory and maintain an auxiliary linear array `POINT`, where `POINT[K]` holds the starting memory address of record K. Inserting a new record only requires updating the pointer array without moving large text blocks!',
        '2. Variable-Length Storage with Fixed Maximum: Memory cells have a fixed maximum capacity, but the computer tracks the actual length of each string. Two methods are used: (a) Sentinel Marker: A special marker such as two dollar signs ($$) or C\'s null terminator (\'\\0\') marks the end of text; (b) Length Header: An explicit integer storing the character count is stored alongside the pointer (e.g. Pascal strings or in the POINT array).',
        '3. Linked Storage (Linked Lists for Strings): Characters are stored in memory cells called nodes, connected by `LINK` pointers. Each node can store either: (a) One character per node (1 byte character + 4/8 byte link pointer), or (b) A fixed group of characters per node (e.g., 4 characters per node + 1 pointer, as in Lipschutz Fig. 3.7 & 3.9). Advantages: Deleting, inserting, and rearranging words can be done instantly by adjusting pointer links without moving surrounding text. Disadvantages: Significant memory overhead for pointers; loss of direct O(1) index access (must traverse links sequentially).',
        'Character Variable Types: (a) Static variables: Length is fixed before execution and cannot change (e.g. FORTRAN CHARACTER*10, Pascal ARRAY[1..20] OF CHAR; right-padded with blanks or truncated); (b) Semistatic variables: Length can vary up to a fixed maximum bound (e.g. BASIC A$, PL/1 CHARACTER(15) VARYING); (c) Dynamic variables: Length changes arbitrarily during program execution, allocating memory on demand (e.g. SNOBOL, Python, C++ std::string).'
      ],
      mathFormula: `Linked Storage Traversal Example (Lipschutz Fig. 3.9):
START = 4
Node 4:  CHAR: 'A TH'  LINK: 2   -->  Node 2:  CHAR: 'ING '  LINK: 7
Node 7:  CHAR: 'OF B'  LINK: 11  -->  Node 11: CHAR: 'EAUT'  LINK: 12
Node 12: CHAR: 'Y IS'  LINK: 8   -->  Node 8:  CHAR: ' A J'  LINK: 1
Node 1:  CHAR: 'OY F'  LINK: 10  -->  Node 10: CHAR: 'OREV'  LINK: 6
Node 6:  CHAR: 'ER. '  LINK: 0 (Null)
Decoded Full String: "A THING OF BEAUTY IS A JOY FOREVER."`
    },
    {
      title: 'Step 3: Explaining String Operations Simply — The 4 Primitive Building Blocks',
      description: 'Why do strings require specialized operations that are not used with ordinary numeric arrays? In a numeric array, the single element A[i] is the primary unit of access. But in text processing, we almost never care about a solitary letter \'t\' in isolation—we care about meaningful sequences: words, phrases, and sentences (substrings). Lipschutz (Section 3.5) defines 4 primitive string operations:',
      bulletPoints: [
        '1. LENGTH(string): Determines the total number of characters in a string. Examples: `LENGTH(\'COMPUTER\') = 8`, `LENGTH(\'□\') = 1`, `LENGTH(\'\') = 0`. Many environments provide a companion function `TRIM(string)` which strips away trailing blank spaces before measuring length (e.g. `TRIM(\'ERIK□□\') = \'ERIK\'`).',
        '2. SUBSTRING(string, initial, length): Accessing a piece of text requires three pieces of information: (a) The string S, (b) The 1-based starting position K, and (c) The length of the slice L. Written as `SUBSTRING(S, K, L)`. Example: `SUBSTRING(\'TO BE OR NOT TO BE\', 4, 7) = \'BE OR N\'`. Example: `SUBSTRING(\'THE END\', 4, 4) = \'□END\'. In various languages: PL/1 uses `SUBSTR(S, 4, 7)`, FORTRAN uses `S(4:10)`, Pascal uses `COPY(S, 4, 7)`, and BASIC uses `MID$(S, 4, 7)`.',
        '3. INDEX(text, pattern): Also called pattern matching, this finds the 1-based position where a pattern P first appears inside a text T. Written as `INDEX(T, P)`. If P does not appear in T, INDEX is assigned the value 0 (signaling failure).',
        '4. CONCATENATION (S1 // S2): Combines two strings by placing the characters of S2 directly after the characters of S1. In mathematical pseudocode, written as S1 // S2. Examples: `\'MARK\' // \'TWAIN\' = \'MARKTWAIN\'`; `\'MARK\' // \'□\' // \'TWAIN\' = \'MARK TWAIN\'`.'
      ],
      mathFormula: `Concrete INDEX Examples (Lipschutz Example 3.4):
Let Text T = 'HIS FATHER IS THE PROFESSOR'
- INDEX(T, 'THE')    = 7   (Because 'THE' appears inside 'FA-THE-R' at position 7!)
- INDEX(T, 'THEN')   = 0   (Pattern does not occur anywhere in T)
- INDEX(T, '□THE□')  = 14  (Matches isolated word ' THE ' starting at position 14)
- INDEX(T, 'IS')     = 2   (Appears first inside 'H-IS' at position 2, not 'IS' at 12)`
    },
    {
      title: 'Step 4: Teaching High-Level Pseudocode Operations — INSERT, DELETE & REPLACE',
      description: 'Using the four primitive operations (LENGTH, SUBSTRING, INDEX, CONCAT), computer scientists build higher-level word processing routines (Lipschutz Section 3.6):',
      bulletPoints: [
        '1. INSERT(text, position, string): Inserts a string S into text T beginning at position K. Formula using primitives: `INSERT(T, K, S) = SUBSTRING(T, 1, K - 1) // S // SUBSTRING(T, K, LENGTH(T) - K + 1)`. In words: slice everything before position K, append the new string S, then append the remainder of T starting from K.',
        'INSERT Examples: `INSERT(\'ABCDEFG\', 3, \'XYZ\') = \'ABXYZCDEFG\'`; `INSERT(\'ABCDEFG\', 6, \'XYZ\') = \'ABCDEXYZFG\'`. Inserting in front: `INSERT(\'AAAAA\', 1, \'BBB\') = \'BBBAAAAA\'`.',
        '2. DELETE(text, position, length): Deletes a substring from text T beginning at position K with length L. Formula using primitives: `DELETE(T, K, L) = SUBSTRING(T, 1, K - 1) // SUBSTRING(T, K + L, LENGTH(T) - K - L + 1)`. In words: slice text up to position K-1, then skip L characters and concatenate the remaining tail.',
        'The Zero Case in DELETE: If K = 0 (position is 0), nothing is deleted: `DELETE(T, 0, L) = T`. Examples: `DELETE(\'ABCDEFG\', 4, 2) = \'ABCFG\'`; `DELETE(\'ABCDEFG\', 2, 4) = \'AFG\'`; `DELETE(\'JOHN PAUL JONES\', 6, 5) = \'JOHN JONES\'`.',
        'Deleting the First Occurrence of a Pattern: To delete the first appearance of a pattern P from text T: `DELETE(T, INDEX(T, P), LENGTH(P))`. If P does not appear in T, `INDEX(T, P) = 0`, so the zero case takes effect and T remains unchanged!',
        '3. REPLACE(text, pattern1, pattern2): Replaces the first occurrence of pattern1 by pattern2. Built via INDEX, DELETE, and INSERT: (1) Find position `K := INDEX(T, P1)`; (2) Remove old pattern `T := DELETE(T, K, LENGTH(P1))`; (3) Insert new pattern `INSERT(T, K, P2)`. Examples: `REPLACE(\'XABYABZ\', \'AB\', \'C\') = \'XCYABZ\'`; `REPLACE(\'JOHN PAUL JONES\', \'PAUL\', \'DAVID\') = \'JOHN DAVID JONES\'`.'
      ],
      mathFormula: `Mathematical Derivations of High-Level Operations:
INSERT(T, K, S)  = SUBSTRING(T, 1, K - 1) // S // SUBSTRING(T, K, LENGTH(T) - K + 1)
DELETE(T, K, L)  = SUBSTRING(T, 1, K - 1) // SUBSTRING(T, K + L, LENGTH(T) - K - L + 1)
REPLACE(T, P, Q) = INSERT(DELETE(T, INDEX(T, P), LENGTH(P)), INDEX(T, P), Q)`
    },
    {
      title: 'Step 5: Writing Sample Algorithms Step by Step — Algorithm 3.1 & 3.2',
      description: 'Now we step into procedural algorithm design. How do we write clean, rigorous pseudocode algorithms to perform repeated text transformations? (Lipschutz Algorithms 3.1 & 3.2):',
      bulletPoints: [
        'How to Formulate Algorithms Step-by-Step: Every algorithm must have: (1) A clear header naming inputs and outputs, (2) Initialization of search indexes or loop counters, (3) A well-defined loop condition that is guaranteed to terminate, and (4) Clear state updates per iteration.',
        'Algorithm 3.1 (Delete Every Occurrence of P in T): Given text T and pattern P in memory, this algorithm removes every single occurrence of P from T.',
        'CRITICAL EXAM PRINCIPLE (The "Phantom Pattern" Discovery): Each deletion decreases the length of T. However, when letters are deleted, previously separated characters slide together and may form BRAND NEW occurrences of P that were not present in the original text! Hence, the loop can execute more times than the initial number of P occurrences.',
        'Tracing Phantom Patterns (Example 3.7b): Let T = \'XAAABBB\' and P = \'AB\'. Initially, \'AB\' appears only once at position 4. Iteration 1: deletes \'AB\' -> T becomes \'XAABBY\'. Notice \'AB\' appears AGAIN at position 3! Iteration 2: deletes \'AB\' -> T becomes \'XABY\'. \'AB\' appears a THIRD time! Iteration 3: deletes \'AB\' -> T becomes \'XY\'. Next INDEX(T, P) = 0, loop terminates. Output is \'XY\'.',
        'Algorithm 3.2 (Replace Every Occurrence of P by Q): Given text T, pattern P, and replacement Q in memory, replaces every occurrence of P with Q.',
        'WARNING: THE INFINITE LOOP TRAP (Example 3.8b): If P is a substring of Q (e.g. T = \'XAY\', P = \'A\', Q = \'AB\'), the algorithm will NEVER terminate! Iteration 1: \'XABY\'; Iteration 2: \'XABBY\'; Iteration 3: \'XABBBY\'... T grows infinitely! A replacement algorithm is only guaranteed to terminate if LENGTH(Q) < LENGTH(P) or if the search index advances past the newly inserted text.'
      ],
      mathFormula: `Algorithm 3.1: Delete Every Occurrence of P in T
1. [Find index of P.] Set K := INDEX(T, P).
2. Repeat while K ≠ 0:
   (a) [Delete P from T.] Set T := DELETE(T, K, LENGTH(P)).
   (b) [Update index.] Set K := INDEX(T, P).
   [End of loop.]
3. Write: T.
4. Exit.

Algorithm 3.2: Replace Every Occurrence of P by Q
1. [Find index of P.] Set K := INDEX(T, P).
2. Repeat while K ≠ 0:
   (a) [Replace P by Q.] Set T := REPLACE(T, P, Q).
   (b) [Update index.] Set K := INDEX(T, P).
   [End of loop.]
3. Write: T.
4. Exit.`
    },
    {
      title: 'Step 6: Word Processing Systems — Document Arrays, Paragraphs & Isolated Word Boundaries (Lipschutz 3.6 & P3.14–3.17)',
      description: 'In Seymour Lipschutz\'s classic formulation, word processing refers to computerized management of continuous written documents (short stories, letters, articles, and reports) stored in memory as an array of fixed lines LINE[1..N]. Word processors rely heavily on string operations to automate editorial tasks:',
      bulletPoints: [
        'Document Line Array Representation (LINE[1..N]): A document is viewed as an array of N lines, where each line LINE[K] accommodates up to 80 characters (the standard card/screen record size). By textbook convention: LINE[1] stores the Title, LINE[N] stores the Author or end mark, and intermediate lines LINE[2..N-1] store the body text.',
        'Paragraph Detection (Procedure P3.14): In standard typesetting, each new paragraph begins with a 5-character indentation (blank spaces in columns 1 through 5). To count total paragraphs in a story: iterate K := 2 to N - 1. If `SUBSTRING(LINE[K], 1, 5) = \'     \'`, increment `NUM := NUM + 1`. Lines with non-blank characters in column 1 are continuation lines of the active paragraph.',
        'The Word Boundary Problem (Procedure P3.15): Suppose an editor wants to count occurrences of the isolated word "THE" (or any word W). Invoking `INDEX(LINE[K], \'THE\')` naively causes critical errors: it incorrectly matches "THE" inside words like "FATHER", "MOTHER", "THEORY", "OTHER", "HYPOTHESIS"!',
        'The 3 Word Boundary Invariants: For word W to exist as an isolated word rather than an embedded syllable, it must be bounded by delimiters (blank spaces or line limits). On any line, the algorithm checks 3 mutually exclusive structural positions: (1) Beginning of line: `BEG := W // \' \'`; (2) End of line: `END := \' \' // W`; (3) Middle of line: `MID := \' \' // W // \' \'`.',
        'Punctuation Handling (Procedure P3.16): In real prose, words frequently terminate with punctuation marks without intermediate spaces (e.g. "THE,", "THE.", "THE;", "THE?", "THE!"). Procedure P3.16 generalizes the boundary check by treating punctuation marks as valid terminal delimiters.',
        'Paragraph Block Interchanger (Procedure P3.17): To swap two paragraphs K and L: (1) Scan LINE[1..N] to determine the starting and ending line indices [BEG_K, END_K] and [BEG_L, END_L]; (2) Copy the smaller paragraph into an auxiliary array TEMP; (3) Shift intervening lines up or down; and (4) Copy TEMP into the destination location.',
        'Word Wrapping & Justification (Programming Problem 3.9): When formatting continuous text into lines of at most W characters, words must never be split in half across line breaks! The algorithm scans `SUBSTRING(TEXT, 1, W + 1)`. If column W + 1 is not a space, it backtracks to find the last space index J, outputs `SUBSTRING(TEXT, 1, J - 1)` as the current line, strips leading spaces from the remaining text, and repeats.'
      ],
      mathFormula: `Procedure P3.14 (Counting Paragraphs):
PAR(LINE, N, NUM):
1. Set NUM := 0.
2. Repeat for K := 2 to N - 1:
     If SUBSTRING(LINE[K], 1, 5) = '     ' then:
       Set NUM := NUM + 1.
   [End of loop.]
3. Return.

Procedure P3.15 (Counting Isolated Word "THE"):
COUNT(LINE, N, NUM):
1. Set NUM := 0, BEG := 'THE ', END := ' THE', MID := ' THE '.
2. Repeat for K := 2 to N - 1:
   (a) If SUBSTRING(LINE[K], 1, 4) = BEG, then: Set NUM := NUM + 1.
   (b) If SUBSTRING(LINE[K], 76, 5) = END, then: Set NUM := NUM + 1.
   (c) Set STR := LINE[K].
       Repeat while INDEX(STR, MID) ≠ 0:
         Set NUM := NUM + 1.
         Set J := INDEX(STR, MID).
         Set STR := DELETE(STR, J + 1, 3). [Remove 'THE' to find next]
3. Return.`
    },
    {
      title: 'Step 7: Pattern Matching Algorithms — Brute-Force (Algorithm 3.3) & Automaton (3.4)',
      description: 'Pattern matching is the problem of deciding whether a pattern P appears in text T, and finding its starting index. Lipschutz Section 3.7 presents two distinct algorithms:',
      bulletPoints: [
        'First Pattern Matching Algorithm (Algorithm 3.3 - Brute Force / Naive Search): Let P have length R and T have length S. There are MAX = S - R + 1 possible substrings W_K of length R in T. We compare P character-by-character against each substring W_K from left to right.',
        'Complexity Analysis of Algorithm 3.3: Let C be the total number of character comparisons. Best Case: C = S - R + 1 = O(S) when the first character of P mismatches immediately on every window. Worst Case: C = R * (S - R + 1) = O(R * S) or O(n^2) when all characters match except the last (e.g. P = \'aaab\', T = \'aaaaaaaaaa\').',
        'Second Pattern Matching Algorithm (Algorithm 3.4 - Table-Driven Finite Automaton): Uses a precomputed transition table F(Q_i, T_k) derived exclusively from pattern P. The states Q_0, Q_1, ..., Q_m represent initial substrings of P (prefixes), with Q_0 = Λ (empty string) and Q_m = P.',
        'Why the Automaton is Faster: The algorithm reads text T strictly character-by-character from left to right (reading T_1, T_2, ..., T_N) WITHOUT EVER BACKTRACKING! Its running time is strictly linear: O(N) where N = LENGTH(T).'
      ],
      mathFormula: `Algorithm 3.3 (First Pattern Matching / Naive Search):
P (length R) and T (length S) stored as character arrays.
1. [Initialize.] Set K := 1 and MAX := S - R + 1.
2. Repeat Steps 3 to 5 while K ≤ MAX:
3.   Repeat for L := 1 to R: [Test each character of P]
       If P[L] ≠ T[K + L - 1], then: Go to Step 5.
     [End of inner loop.]
4.   [Success.] Set INDEX := K, and Exit.
5.   Set K := K + 1.
   [End of Step 2 outer loop.]
6. [Failure.] Set INDEX := 0.
7. Exit.`
    }
  ],
  cstlReference: {
    header: '#include <string>   // C++ std::string (dynamic character processing)\n#include <cstring>  // C string primitives (strlen, strstr, strcpy)',
    declaration: 'std::string text = "HIS FATHER IS THE PROFESSOR";\nstd::string pat = "THE";',
    commonMethods: [
      { method: 's.length() / s.size()', description: 'Returns character count (equivalent to LENGTH(s))', complexity: 'O(1) instant' },
      { method: 's.substr(pos, len)', description: 'Extracts len characters starting at pos (equivalent to SUBSTRING(s, pos+1, len))', complexity: 'O(len)' },
      { method: 's.find(pat)', description: 'Returns 0-based index of first occurrence, or std::string::npos if absent (equivalent to INDEX)', complexity: 'O(N * M)' },
      { method: 's1 + s2 or s1.append(s2)', description: 'Concatenates two strings end-to-end (equivalent to S1 // S2)', complexity: 'O(len(S1) + len(S2))' },
      { method: 's.insert(pos, str)', description: 'Inserts str at index pos (equivalent to INSERT(s, pos+1, str))', complexity: 'O(N)' },
      { method: 's.erase(pos, len)', description: 'Removes len characters starting at index pos (equivalent to DELETE(s, pos+1, len))', complexity: 'O(N)' },
      { method: 's.replace(pos, len, rep)', description: 'Replaces len characters at pos with rep (equivalent to REPLACE)', complexity: 'O(N)' }
    ],
    notes: [
      'Note on 1-based vs 0-based indexing: In textbook pseudocode (Lipschutz Chapter 3), strings are 1-based: the first character is at position 1, and INDEX returns 0 on failure. In C/C++, strings are 0-based: the first character is at index 0, and `s.find()` returns `std::string::npos` on failure.',
      'C-strings (`char str[]`) require an invisible \'\\0\' sentinel null-terminator byte at the end. Without it, functions like `strlen()` will read out of bounds until hitting memory garbage.'
    ]
  },
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Implementation of Algorithm 3.1 (Delete Every Occurrence of P in T)',
      explanation: 'Demonstrates the textbook\'s exact procedural deletion logic in C++, including detection of phantom patterns that appear after prior deletions.',
      code: `#include <iostream>
#include <string>

// Algorithm 3.1: Delete every occurrence of pattern P in text T
void deleteAllOccurrences(std::string &T, const std::string &P) {
    if (P.empty() || T.empty()) return;

    size_t K;
    int pass = 1;
    // Repeat while K ≠ 0 (in C++, find() != npos)
    while ((K = T.find(P)) != std::string::npos) {
        std::cout << "Pass " << pass++ << ": Found '" << P << "' at index " << K << ". Text before: " << T << std::endl;
        // DELETE(T, K, LENGTH(P)): erase characters
        T.erase(K, P.length());
        std::cout << "Text after deletion: " << T << std::endl;
    }
}

int main() {
    // Tracing Example 3.7(b) from Lipschutz:
    // T = "XAAABBB", P = "AB"
    std::string text = "XAAABBB";
    std::string pattern = "AB";

    std::cout << "Initial Text: " << text << ", Pattern: " << pattern << std::endl;
    deleteAllOccurrences(text, pattern);
    std::cout << "Final Result: " << text << std::endl; // Prints "XY" (or "X" if no trailing Y)

    return 0;
}`
    },
    {
      language: 'cpp',
      title: 'Implementation of Algorithm 3.3 (First Pattern Matching / Brute Force)',
      explanation: 'Follows Algorithm 3.3 step-by-step with character comparison counting to demonstrate best-case vs worst-case complexity.',
      code: `#include <iostream>
#include <string>

// Algorithm 3.3: First Pattern Matching Algorithm
// Returns 1-based index if found, 0 if failure (Lipschutz convention)
int naivePatternMatch(const std::string &T, const std::string &P, int &comparisonCount) {
    int S = T.length();
    int R = P.length();
    int MAX = S - R + 1;
    comparisonCount = 0;

    // Step 2: Repeat while K <= MAX
    for (int K = 1; K <= MAX; ++K) {
        bool match = true;
        // Step 3: Repeat for L := 1 to R
        for (int L = 1; L <= R; ++L) {
            comparisonCount++;
            // Compare P[L] with T[K + L - 1] (converting to 0-based indexing)
            if (P[L - 1] != T[(K + L - 1) - 1]) {
                match = false;
                break; // Mismatch: go to Step 5 (advance K)
            }
        }
        // Step 4: [Success.]
        if (match) {
            return K; // 1-based index
        }
    }

    // Step 6: [Failure.]
    return 0;
}

int main() {
    std::string text = "HIS FATHER IS THE PROFESSOR";
    std::string pattern = "THE";
    int comps = 0;

    int index = naivePatternMatch(text, pattern, comps);
    std::cout << "Text: " << text << std::endl;
    std::cout << "Pattern: " << pattern << std::endl;
    std::cout << "1-Based Index: " << index << " (Total comparisons: " << comps << ")" << std::endl;
    // Outputs Index 7 (inside "FATHER")

    return 0;
}`
    },
    {
      language: 'cpp',
      title: 'Linked String Storage Simulation (4 Characters per Node)',
      explanation: 'Simulates the linked list string storage structure depicted in Lipschutz Section 3.3 (Fig 3.7b & Fig 3.9) with 4 characters per node.',
      code: `#include <iostream>
#include <string>

struct StringNode {
    char chunk[4]; // 4 characters per node
    int numChars;  // valid characters in this node (1 to 4)
    StringNode* next;

    StringNode(const std::string &str) : next(nullptr) {
        numChars = std::min(4, (int)str.length());
        for (int i = 0; i < numChars; ++i) chunk[i] = str[i];
    }
};

void printLinkedString(StringNode* head) {
    StringNode* curr = head;
    while (curr != nullptr) {
        for (int i = 0; i < curr->numChars; ++i) {
            std::cout << curr->chunk[i];
        }
        curr = curr->next;
    }
    std::cout << std::endl;
}

int main() {
    // Reconstructing Fig 3.9: "A TH" -> "ING " -> "OF B" -> "EAUT" -> "Y IS" ...
    StringNode* n1 = new StringNode("A TH");
    StringNode* n2 = new StringNode("ING ");
    StringNode* n3 = new StringNode("OF B");
    StringNode* n4 = new StringNode("EAUT");
    StringNode* n5 = new StringNode("Y IS");

    n1->next = n2; n2->next = n3; n3->next = n4; n4->next = n5;

    std::cout << "Reconstructed Linked String: ";
    printLinkedString(n1);

    return 0;
}`
    }
  ],
  examQuestions: [
    {
      id: 'str-exam-1',
      year: 'University Exam Classic (Lipschutz Solved Problem 3.3 & 3.5)',
      marks: 10,
      difficulty: 'Exam Classic',
      question: 'Compare in detail the three classic structures used for storing strings in computer memory: (a) Fixed-Length Record Storage, (b) Variable-Length Storage with Fixed Maximum, and (c) Linked Storage. Give the advantages and disadvantages of each, and explain how a pointer array POINT addresses the insertion problem in fixed-length records.',
      solution: `Model University Answer:

1. Record-Oriented, Fixed-Length Storage:
- Concept: Every line or record accommodates a predetermined fixed number of characters (traditionally 80 characters, corresponding to 80-column punched cards or terminals).
- Advantages:
  (a) Ease of access: Record K begins at address Base + (K - 1) * 80, allowing O(1) arithmetic address calculation.
  (b) Ease of updating in-place, provided the new content does not exceed 80 characters.
- Disadvantages:
  (a) Excessive space waste if records contain many inessential blank spaces.
  (b) Inflexible: Cannot store records exceeding 80 characters.
  (c) Rigid insertion: Inserting a new record between lines requires physically shifting all subsequent records in memory!
- Remedy (The POINT Array): A linear array POINT gives the memory address of each successive record. Records no longer need to be stored in contiguous physical order; inserting a new record requires only updating pointers in the POINT array rather than shifting memory blocks.

2. Variable-Length Storage with Fixed Maximum:
- Concept: Strings have varying lengths up to a fixed maximum capacity.
- Length Identification Methods:
  (a) End-of-string sentinel: A special marker such as $$ or '\\0' signals the end of the text.
  (b) Explicit length listing: An additional integer field (length header) stores the character count.
- Advantages: Eliminates trailing blank padding, saving memory.
- Disadvantages: Frequent resizing can cause fragmentation if memory is stored sequentially.

3. Linked Storage (Linked Lists):
- Concept: Memory cells (nodes) store one character or a fixed small group of characters (e.g. 4 chars per node) accompanied by a LINK pointer pointing to the next node.
- Advantages:
  (a) Effortless insertion, deletion, and rearrangement of substrings in O(1) time without shifting surrounding characters.
  (b) Dynamic growth without fixed upper limits.
- Disadvantages:
  (a) High memory overhead: On a 64-bit architecture, a pointer takes 8 bytes. Storing 1 char (1 byte) per node wastes 88.9% of memory on pointers alone! Grouping 4 characters per node reduces overhead.
  (b) Sequential access only: The K-th character cannot be accessed in O(1); one must traverse K link steps.`,
      keyTakeaway: 'Fixed-length gives O(1) address calculation but wastes space on blanks; variable-length uses sentinels or length headers; linked storage allows effortless string splicing at the cost of pointer overhead.'
    },
    {
      id: 'str-exam-2',
      year: 'University Exam Classic (Lipschutz Example 3.7 & Algorithm 3.1)',
      marks: 8,
      difficulty: 'Medium',
      question: 'Write the pseudocode for Algorithm 3.1 (Delete every occurrence of pattern P from text T). Trace the execution of this algorithm step-by-step for the input T = \'XAAABBB\' and P = \'AB\'. Explain why the loop executes 3 times even though \'AB\' appeared only once initially.',
      solution: `Model University Answer:

Algorithm 3.1: Delete Every Occurrence of P in T
1. [Find index of P.] Set K := INDEX(T, P).
2. Repeat while K ≠ 0:
   (a) [Delete P from T.] Set T := DELETE(T, K, LENGTH(P)).
   (b) [Update index.] Set K := INDEX(T, P).
   [End of loop.]
3. Write: T.
4. Exit.

Step-by-Step Trace for T = 'XAAABBB' and P = 'AB':
- Initialization:
  - T = 'XAAABBB', LENGTH(P) = 2.
  - Compute K := INDEX(T, 'AB'). The substring 'AB' appears at position 4 ('XAA-AB-BB').
  - Since K = 4 ≠ 0, enter the loop.

- Loop Iteration 1:
  - (a) Set T := DELETE(T, 4, 2).
        SUBSTRING(T, 1, 3) = 'XAA', SUBSTRING(T, 6, 2) = 'BB'.
        T becomes 'XAA' // 'BB' = 'XAABBY'.
  - (b) Set K := INDEX(T, 'AB').
        Looking at 'XAABBY', characters at positions 3 and 4 form 'AB'! K = 3.

- Loop Iteration 2:
  - (a) Set T := DELETE(T, 3, 2).
        SUBSTRING(T, 1, 2) = 'XA', SUBSTRING(T, 5, 2) = 'BY'.
        T becomes 'XA' // 'BY' = 'XABY'.
  - (b) Set K := INDEX(T, 'AB').
        Looking at 'XABY', characters at positions 2 and 3 form 'AB'! K = 2.

- Loop Iteration 3:
  - (a) Set T := DELETE(T, 2, 2).
        SUBSTRING(T, 1, 1) = 'X', SUBSTRING(T, 4, 1) = 'Y'.
        T becomes 'X' // 'Y' = 'XY'.
  - (b) Set K := INDEX(T, 'AB').
        In 'XY', 'AB' does not occur. K = 0.

- Termination:
  - Loop condition K ≠ 0 is now FALSE (K = 0). Loop ends.
  - Step 3: Write 'XY'.

Why the Loop Executed 3 Times:
When a substring is deleted, the characters before and after the deleted portion collapse together. In 'XAAABBB', deleting the central 'AB' brings the preceding 'A' and succeeding 'B' into direct contact, creating a brand new 'AB' that did not exist as an adjacent unit originally. This cascading effect repeated until no more 'A's and 'B's were adjacent.`,
      keyTakeaway: 'Deleting characters from a string can cause formerly separated characters to join together, giving birth to newly formed target patterns.'
    },
    {
      id: 'str-exam-3',
      year: 'University Exam Classic (Lipschutz Section 3.6 & Example 3.8)',
      marks: 6,
      difficulty: 'Medium',
      question: 'Consider Algorithm 3.2 for replacing every occurrence of pattern P with pattern Q in text T. Explain with an example why the algorithm may enter an infinite loop. Under what conditions is the algorithm guaranteed to terminate?',
      solution: `Model University Answer:

The Algorithm:
Algorithm 3.2 repeatedly finds K := INDEX(T, P) and replaces it via T := REPLACE(T, P, Q) until INDEX(T, P) = 0.

The Infinite Loop Trap:
If the pattern P is a substring of the replacement string Q, the algorithm will NEVER terminate!

Concrete Example (Lipschutz Example 3.8b):
Let Text T = 'XAY', Pattern P = 'A', Replacement Q = 'AB'.
- Iteration 1:
  - INDEX(T, 'A') = 2.
  - REPLACE('XAY', 'A', 'AB') yields T = 'XABY'.
- Iteration 2:
  - INDEX(T, 'A') = 2 (the 'A' inside the newly inserted 'AB'!).
  - REPLACE('XABY', 'A', 'AB') yields T = 'XABBY'.
- Iteration 3:
  - INDEX(T, 'A') = 2 again!
  - REPLACE yields T = 'XABBBY'.
- In general, after n iterations, T = 'X' // 'A' // (B^n) // 'Y'. The string grows infinitely and INDEX(T, P) is never 0!

Termination Guarantees:
1. Special Condition: If LENGTH(Q) < LENGTH(P), the total length of T decreases after each replacement, guaranteeing termination.
2. Algorithmic Fix: Rather than searching T from the beginning (index 1) on every iteration, the search pointer K must advance PAST the replacement string Q (i.e. next search begins at K + LENGTH(Q)).`,
      keyTakeaway: 'When replacing P with Q, if P is a substring of Q, searching from index 1 causes an infinite loop. The search pointer must jump past the replacement.'
    },
    {
      id: 'str-exam-4',
      year: 'University Exam Classic (Lipschutz Section 3.7 & Problem 3.19)',
      marks: 8,
      difficulty: 'Hard',
      question: 'Analyze the time complexity of the first pattern matching algorithm (Algorithm 3.3). If P has length R and T has length S, determine the number of comparisons C in: (a) Best Case, (b) Worst Case. Prove that for a fixed data size n = R + S, the maximum number of comparisons occurs when R = (n + 1) / 4.',
      solution: `Model University Answer:

Algorithm 3.3 compares pattern P (length R) with substrings W_K of text T (length S).
The number of possible starting positions is MAX = S - R + 1.
Let N_K be the number of comparisons made in window K. The total comparisons is C = N_1 + N_2 + ... + N_MAX.

1. Best Case:
- Occurs when the very first character of P mismatches with the first character of every substring W_K (i.e., N_K = 1 for all K).
- Total comparisons:
  C_best = 1 * (S - R + 1) = S - R + 1 = O(S).

2. Worst Case:
- Occurs when the first R - 1 characters of P match every substring W_K, and only the last character mismatches (or P appears at the very end).
- In this case, N_K = R for all K.
- Total comparisons:
  C_worst = R * (S - R + 1) = O(R * S).

3. Maximizing C(n) for Fixed Data Size n = R + S:
- We have S = n - R. Substitute into C_worst:
  C(R) = R * ((n - R) - R + 1) = R * (n - 2R + 1) = nR - 2R^2 + R.
- To find the value of R that maximizes C(R), take the first derivative with respect to R and set it to 0:
  dC / dR = n - 4R + 1 = 0
  4R = n + 1
  R = (n + 1) / 4.
- Since the second derivative d^2C / dR^2 = -4 < 0, this critical point is a local maximum.
- Substituting R = (n + 1) / 4 back into C(n) yields:
  C_max = ((n + 1) / 4) * (n - (n + 1)/2 + 1) = ((n + 1)^2) / 8 = O(n^2).
- Thus, the worst-case time complexity is proportional to n^2 (quadratic).`,
      keyTakeaway: 'The naive pattern matching algorithm takes O(S) in the best case, but O(R * S) in the worst case, reaching its peak comparison count when the pattern length is roughly one-fourth of the total data size.'
    },
    {
      id: 'str-exam-5',
      year: 'University Exam Classic (Lipschutz Solved Problem 3.12 & 3.13)',
      marks: 10,
      difficulty: 'Medium',
      question: 'Demonstrate the use of high-level string operations (INSERT, DELETE, REPLACE) in text editing:\n(a) Let T = \'THE STUDENT IS ILL.\'. Show how to produce: (i) T1 = \'THE STUDENT IS VERY ILL.\', and (ii) T2 = \'THE STUDENT IS VERY ILL TODAY.\'. State the exact position K and string S passed to INSERT.\n(b) Let S = \'JOHN PAUL JONES\'. Use DELETE and REPLACE to obtain \'JOHN JONES\' and \'JOHN DAVID JONES\'.\n(c) For T = \'MARC STUDIES MATHEMATICS\', show single-call string transformations to produce: (i) \'MARC STUDIES ONLY MATHEMATICS\', and (ii) \'MARC STUDIES APPLIED MATHEMATICS\'.',
      solution: `Model University Answer:

Part (a): Modifying T = 'THE STUDENT IS ILL.' (Length = 19)
- (i) To produce T1 = 'THE STUDENT IS VERY ILL.':
  - Count 1-based character position before 'ILL.':
    Position 1 = 'T', 4 = ' ', 5 = 'S', 12 = ' ', 13 = 'I', 14 = 'S', 15 = ' ', 16 = 'I' (start of 'ILL.').
  - We insert 'VERY ' right before position 16:
    T1 := INSERT(T, 16, 'VERY ').
    Formula check: SUBSTRING(T, 1, 15) // 'VERY ' // SUBSTRING(T, 16, 4)
    = 'THE STUDENT IS ' // 'VERY ' // 'ILL.' = 'THE STUDENT IS VERY ILL.'.
- (ii) To produce T2 = 'THE STUDENT IS VERY ILL TODAY.':
  - In T1 = 'THE STUDENT IS VERY ILL.' (Length = 24), the period '.' is at position 24.
  - We insert ' TODAY' right before the final period at position 24:
    T2 := INSERT(T1, 24, ' TODAY').
    Formula check: SUBSTRING(T1, 1, 23) // ' TODAY' // SUBSTRING(T1, 24, 1)
    = 'THE STUDENT IS VERY ILL' // ' TODAY' // '.' = 'THE STUDENT IS VERY ILL TODAY.'.

Part (b): Modifying S = 'JOHN PAUL JONES' (Length = 15)
- (i) To obtain 'JOHN JONES':
  - The substring 'PAUL ' starts at position 6 and has length 5 (P-A-U-L-□).
  - Call: S1 := DELETE(S, 6, 5).
  - Formula check: SUBSTRING(S, 1, 5) // SUBSTRING(S, 11, 5)
    = 'JOHN ' // 'JONES' = 'JOHN JONES'.
- (ii) To obtain 'JOHN DAVID JONES':
  - Call: S2 := REPLACE(S, 'PAUL', 'DAVID').
  - Steps performed internally:
    1. K := INDEX(S, 'PAUL') = 6.
    2. S := DELETE(S, 6, 4) = 'JOHN  JONES'.
    3. S := INSERT(S, 6, 'DAVID') = 'JOHN DAVID JONES'.

Part (c): Modifying T = 'MARC STUDIES MATHEMATICS'
- (i) To obtain 'MARC STUDIES ONLY MATHEMATICS':
  - 'MATHEMATICS' begins at position 14 (following the space at 13).
  - Call: INSERT(T, 14, 'ONLY ').
- (ii) To obtain 'MARC STUDIES APPLIED MATHEMATICS':
  - Call: REPLACE(T, 'MATHEMATICS', 'APPLIED MATHEMATICS')
    Or: INSERT(T, 14, 'APPLIED ').`,
      keyTakeaway: 'In high-level string operations, position K determines the exact point before which characters are spliced; preserving punctuation and word-spacing requires accounting for blank spaces in the inserted string.'
    },
    {
      id: 'str-exam-6',
      year: 'University Exam Classic (Lipschutz Solved Problem 3.14 & 3.15)',
      marks: 12,
      difficulty: 'Hard',
      question: 'A short story is stored in computer memory as an array of records LINE[1..N], where each line has 80 characters. Line 1 contains the title, Line N contains the author, and each paragraph begins with a 5-space indentation.\n(a) Write a complete pseudocode procedure PAR(LINE, N, NUM) that counts the total number of paragraphs in the story.\n(b) Write a procedure COUNT(LINE, N, NUM) that counts the occurrences of the isolated word "THE" in the text. Explain why checking only INDEX(LINE[K], "THE") is fundamentally incorrect and how the 3 boundary cases (BEG, END, MID) resolve this issue.',
      solution: `Model University Answer:

Part (a): Procedure PAR(LINE, N, NUM)
Algorithm:
1. [Initialize paragraph counter.] Set NUM := 0.
2. [Loop through body lines.] Repeat for K := 2 to N - 1:
     If SUBSTRING(LINE[K], 1, 5) = '     ' then:
       Set NUM := NUM + 1.
   [End of Step 2 loop.]
3. Return.

Explanation:
- LINE[1] is the title and LINE[N] is the author, so the search interval is strictly K = 2 to N - 1.
- Each new paragraph starts with 5 blanks (columns 1 to 5). Any line beginning with 5 spaces indicates a distinct paragraph head.

Part (b): Procedure COUNT(LINE, N, NUM) and The Word Boundary Invariant

Why Naive INDEX(LINE[K], 'THE') Fails:
If we search simply for 'THE', the substring will match:
- 'FATHER' (positions 3-5: 'FA-THE-R')
- 'MOTHER' ('MO-THE-R')
- 'THEORY' ('THE-ORY')
- 'CLOTHES' ('CLO-THE-S')
- 'OTHER' ('O-THE-R')
None of these are the isolated word "THE"!

The 3 Structural Word Boundary Cases:
On an 80-character line, the standalone word "THE" must be bounded by spaces or line ends:
1. Beginning of line (BEG): Columns 1-4 must be 'THE ' (word followed by space).
2. End of line (END): Columns 76-80 must be ' THE' (space followed by word).
3. Middle of line (MID): Surrounded by spaces on both sides: ' THE '.

Pseudocode:
COUNT(LINE, N, NUM):
1. [Initialize.] Set NUM := 0, BEG := 'THE ', END := ' THE', MID := ' THE '.
2. [Loop through body lines.] Repeat for K := 2 to N - 1:
   (a) [Test beginning of line.]
       If SUBSTRING(LINE[K], 1, 4) = BEG then: Set NUM := NUM + 1.
   (b) [Test end of line.]
       If SUBSTRING(LINE[K], 76, 5) = END then: Set NUM := NUM + 1.
   (c) [Test interior occurrences.]
       Set STR := LINE[K].
       Repeat while INDEX(STR, MID) ≠ 0:
         Set NUM := NUM + 1.
         Set J := INDEX(STR, MID).
         // Delete the occurrence of 'THE' (3 characters) while keeping flanking spaces
         Set STR := DELETE(STR, J + 1, 3).
       [End of while loop.]
   [End of Step 2 loop.]
3. Return.`,
      keyTakeaway: 'Searching for isolated words in word processing requires testing line boundaries (BEG, END) and interior space delimiters (MID) to prevent false positive matches against embedded syllables.'
    },
    {
      id: 'str-exam-7',
      year: 'University Exam Classic (Lipschutz Solved Problem 3.17)',
      marks: 10,
      difficulty: 'Hard',
      question: 'Consider a short story represented in memory as an array LINE[1..N] of 80-character strings. Design an algorithm to interchange Paragraph K and Paragraph L in the story without corrupting other paragraphs.',
      solution: `Model University Answer:

Problem Specification:
Paragraphs are identified by 5 blank spaces at columns 1-5. To interchange Paragraph K and Paragraph L:
1. Identify the line ranges:
   - Paragraph K occupies lines [BEG_K, END_K].
   - Paragraph L occupies lines [BEG_L, END_L].
2. Assume without loss of generality that K < L (Paragraph K appears earlier in the document).
3. We use an auxiliary array TEMP of 80-character records to hold the smaller of the two paragraphs.

Step-by-Step Algorithm:
1. [Find Paragraph Boundaries]
   Set P_COUNT := 0, BEG_K := 0, END_K := 0, BEG_L := 0, END_L := 0.
   Repeat for I := 2 to N - 1:
     If SUBSTRING(LINE[I], 1, 5) = '     ' then:
       Set P_COUNT := P_COUNT + 1.
       If P_COUNT = K then: Set BEG_K := I.
       If P_COUNT = K + 1 then: Set END_K := I - 1.
       If P_COUNT = L then: Set BEG_L := I.
       If P_COUNT = L + 1 then: Set END_L := I - 1.
   [Handle document end for paragraph L]
   If END_L = 0 then: Set END_L := N - 1.

2. [Measure Paragraph Sizes]
   Set SIZE_K := END_K - BEG_K + 1.
   Set SIZE_L := END_L - BEG_L + 1.

3. [Copy Paragraph K to Auxiliary Storage]
   Repeat for I := 1 to SIZE_K:
     Set TEMP[I] := LINE[BEG_K + I - 1].

4. [Shift Intervening Lines Up or Down]
   Let DIFF := SIZE_L - SIZE_K.
   - If DIFF > 0 (Paragraph L is larger than K):
     Shift lines from END_K + 1 to BEG_L - 1 down by DIFF positions.
   - If DIFF < 0:
     Shift lines from END_K + 1 to BEG_L - 1 up by |DIFF| positions.

5. [Place Paragraph L into Position of K]
   Copy Paragraph L into lines starting at BEG_K.

6. [Copy TEMP into Position of L]
   Copy TEMP[1..SIZE_K] into lines starting at the newly adjusted position of Paragraph L.

7. Return.`,
      keyTakeaway: 'Interchanging paragraphs in a contiguous line array requires first identifying the line intervals [BEG, END], caching one block in auxiliary storage, shifting intermediate lines by the difference in line count, and copying the cached block to its new position.'
    },
    {
      id: 'str-exam-8',
      year: 'University Exam Classic (Lipschutz Programming Problem 3.9)',
      marks: 8,
      difficulty: 'Hard',
      question: 'Design an algorithm to solve the Word Wrapping problem: given a continuous character string TEXT and an integer line width W (e.g. W = 40), format TEXT into lines of at most W characters such that no word is split across two lines. Punctuation following a word must remain on the same line as the word.',
      solution: `Model University Answer:

Algorithm Concept:
Word wrapping is the fundamental layout engine of word processors. If we simply sliced every W characters, words like 'STRUCTURES' would be split into 'STRUC-' and 'TURES'.
To avoid splitting:
1. Examine the slice of length W + 1: \`SLICE := SUBSTRING(TEXT, 1, W + 1)\`.
2. If LENGTH(TEXT) <= W, the entire remaining text fits on the current line.
3. If character W + 1 is a space (' '), we can cleanly cut exactly at column W.
4. If character W + 1 is a non-space character (part of a word crossing the boundary), we must backtrack to find the LAST blank space in SLICE. Let this index be J.
5. Emit SUBSTRING(TEXT, 1, J - 1) as the current output line.
6. Set TEXT := SUBSTRING(TEXT, J + 1, LENGTH(TEXT) - J) (stripping leading spaces) and repeat.

Pseudocode:
WORD_WRAP(TEXT, W):
1. Repeat while LENGTH(TEXT) > W:
   (a) Set SLICE := SUBSTRING(TEXT, 1, W + 1).
   (b) If SUBSTRING(SLICE, W + 1, 1) = ' ' then:
         Write: SUBSTRING(TEXT, 1, W).
         Set TEXT := SUBSTRING(TEXT, W + 2, LENGTH(TEXT) - W - 1).
       Else:
         [Find last space index J in SLICE]
         Set J := W.
         Repeat while J > 1 and SUBSTRING(SLICE, J, 1) ≠ ' ':
           Set J := J - 1.
         [If no space found in line, word exceeds width W; must force-cut]
         If J = 1 then: Set J := W + 1.
         Write: SUBSTRING(TEXT, 1, J - 1).
         Set TEXT := SUBSTRING(TEXT, J + 1, LENGTH(TEXT) - J).
   (c) [Strip any leading spaces from remaining TEXT]
       Repeat while LENGTH(TEXT) > 0 and SUBSTRING(TEXT, 1, 1) = ' ':
         Set TEXT := SUBSTRING(TEXT, 2, LENGTH(TEXT) - 1).
   [End of Step 1 loop.]
2. If LENGTH(TEXT) > 0 then:
     Write: TEXT.
3. Exit.`,
      keyTakeaway: 'Word wrapping prevents broken words by searching backwards from column W + 1 to locate the preceding whitespace delimiter before emitting the formatted line.'
    }
  ],
  quizzes: [
    {
      id: 'sq-1',
      question: 'What is the length of the string \'TO BE OR NOT TO BE\' according to textbook definitions?',
      options: [
        '14 (counting only alphabetic letters)',
        '18 (14 letters plus 4 blank space characters)',
        '15 (counting letters plus one end marker)',
        '19 (including an invisible null terminator)'
      ],
      correctIndex: 1,
      explanation: 'In string processing, the blank space character (□) is a valid character contributing to length. \'TO BE OR NOT TO BE\' contains 14 letters and 4 spaces, totaling 18 characters.'
    },
    {
      id: 'sq-2',
      question: 'What is the result of evaluating SUBSTRING(\'TO BE OR NOT TO BE\', 4, 7)?',
      options: [
        '\'BE OR NOT\'',
        '\'BE OR N\'',
        '\'TO BE OR\'',
        '\'OR NOT TO\''
      ],
      correctIndex: 1,
      explanation: 'Position 1=\'T\', 2=\'O\', 3=\' \', 4=\'B\'. Starting at position 4 and extracting 7 characters gives \'B\', \'E\', \' \', \'O\', \'R\', \' \', \'N\', which is \'BE OR N\'.'
    },
    {
      id: 'sq-3',
      question: 'If Text T = \'HIS FATHER IS THE PROFESSOR\', what is the return value of INDEX(T, \'THE\') in Lipschutz pseudocode?',
      options: [
        '15 (the standalone word \'THE\')',
        '7 (the \'THE\' embedded inside \'FATHER\')',
        '0 (not found as an isolated word)',
        '14 (including preceding space)'
      ],
      correctIndex: 1,
      explanation: 'INDEX(T, P) finds the very first occurrence of the character sequence. In \'HIS FATHER...\', positions 7, 8, and 9 spell \'THE\' inside \'FATHER\'. Therefore, INDEX returns 7.'
    },
    {
      id: 'sq-4',
      question: 'In fixed-length record storage, how does the auxiliary pointer array POINT solve the insertion problem?',
      options: [
        'It compresses characters into 6-bit codes',
        'It allows records to be stored anywhere in memory by updating only pointer values instead of shifting physical records',
        'It converts fixed records into dynamic binary search trees',
        'It automatically removes all blank spaces from records'
      ],
      correctIndex: 1,
      explanation: 'The POINT array maps logical line numbers to physical memory addresses. Inserting a new line requires only inserting a pointer into the array POINT, leaving the large physical records in place without shifting.'
    },
    {
      id: 'sq-5',
      question: 'Why does Algorithm 3.2 (replacing every P with Q) enter an infinite loop when T = \'XAY\', P = \'A\', and Q = \'AB\'?',
      options: [
        'Because the length of T exceeds 80 characters',
        'Because P is a substring of Q, so the replacement always reintroduces P at the current search position',
        'Because the empty string Λ is not defined in Algorithm 3.2',
        'Because the DELETE function returns null on single-letter words'
      ],
      correctIndex: 1,
      explanation: 'Replacing \'A\' with \'AB\' yields \'XABY\'. The newly inserted string \'AB\' contains \'A\'. When the search resets to the start of the string, it finds \'A\' again, producing \'XABBY\', \'XABBBY\', and so on infinitely.'
    },
    {
      id: 'sq-6',
      question: 'What is the maximum number of character comparisons in Algorithm 3.3 (naive search) for a text of length S and pattern of length R?',
      options: [
        'S + R',
        'R * (S - R + 1)',
        'S * log(R)',
        '(S - R + 1) / R'
      ],
      correctIndex: 1,
      explanation: 'There are MAX = S - R + 1 starting windows. In the worst case, every window matches the first R - 1 characters before mismatching on the last character, requiring R comparisons per window, yielding R * (S - R + 1).'
    },
    {
      id: 'sq-7',
      question: 'In word processing procedure COUNT(LINE, N, NUM), why is searching for MID := \' \' // W // \' \' necessary?',
      options: [
        'To speed up arithmetic multiplication',
        'To ensure words embedded inside larger words (e.g. \'THE\' in \'FATHER\') are not counted as isolated words',
        'To allocate linked list nodes in dynamic storage',
        'Because strings in FORTRAN require double spaces'
      ],
      correctIndex: 1,
      explanation: 'An isolated word inside a sentence must have whitespace before and after it. Flanking W with blank spaces (\' \' // W // \' \') filters out embedded syllables like \'THE\' inside \'FATHER\' or \'MOTHER\'.'
    },
    {
      id: 'sq-8',
      question: 'According to Lipschutz Procedure P3.14, how is a new paragraph recognized in the short story array LINE[1..N]?',
      options: [
        'By a dollar sign $$ at the end of the line',
        'By checking if the first 5 characters are blank spaces: SUBSTRING(LINE[K], 1, 5) = \'     \'',
        'By checking if the length of the line is exactly 0',
        'By checking if POINT[K] equals NULL'
      ],
      correctIndex: 1,
      explanation: 'In standard manuscript format, paragraphs begin with a 5-space indentation. Procedure P3.14 checks if the first five columns are blank spaces.'
    },
    {
      id: 'sq-9',
      question: 'In word wrapping algorithm (Programming Problem 3.9), if column W + 1 is not a space, what does the algorithm do?',
      options: [
        'Truncates the word immediately with a hyphen',
        'Discards the entire sentence and raises a runtime error',
        'Backtracks to find the last preceding blank space J and cuts the line at J - 1 to preserve whole words',
        'Doubles the line width W dynamically'
      ],
      correctIndex: 2,
      explanation: 'To prevent words from breaking across lines, the word wrap algorithm backtracks from column W + 1 to find the preceding blank space index J, outputting up to J - 1 and starting the next line with the full word.'
    }
  ]
};
