import { Lesson } from '../../types';

export const STRING_LESSON: Lesson = {
  id: 'string',
  categoryId: 'linear',
  subCategoryId: 'sequential-contiguous',
  title: 'String Processing: Memory Models, Operations & Algorithms',
  subtitle: 'Character representation, memory structures, primitive string operations, and step-by-step algorithms',
  icon: 'Layers',
  importance: '⚡ HIGH',
  cuetExamRelevance: 'A core foundation of Data Structures semester examinations. You will regularly be tested on: (1) Basic terminology: character sets, string length, empty string (Λ), concatenation, and substring bounds; (2) The 3 classic memory storage structures (Fixed-Length, Variable-Length with Sentinel/Length, and Linked Storage); (3) Formulating primitive operations (LENGTH, SUBSTRING, INDEX, CONCAT) and high-level procedures (INSERT, DELETE, REPLACE); and (4) Writing and tracing sample algorithms step-by-step (Multi-deletion, Multi-replacement with loop trap analysis, and Pattern Matching).',
  overview: 'Historically, computers were first created to process numerical calculations. Today, computers process massive amounts of nonnumerical data—character data. From text editing and word processors to compilers, web search engines, and genomic sequence analyzers, manipulating character strings is at the heart of computing. In this lesson, we build from the ground up: understanding character sets and memory layouts in RAM, grasping the 4 atomic primitive operations, and mastering high-level string algorithms with clean pseudocode and step-by-step execution traces.',
  timeComplexity: {
    access: '$\\mathcal{O}(1)$ Direct index access in array/fixed storage, $\\mathcal{O}(K)$ sequential traversal in linked storage',
    search: '$\\mathcal{O}(R \\times S)$ Naive sliding-window search, $\\mathcal{O}(S)$ Linear finite-automaton search',
    insertion: '$\\mathcal{O}(N)$ Slicing and shifting text in contiguous memory; $\\mathcal{O}(1)$ node splice in linked storage',
    deletion: '$\\mathcal{O}(N)$ Compacting remaining text in contiguous memory; $\\mathcal{O}(1)$ node unlink in linked storage',
    space: '$\\mathcal{O}(N)$ Contiguous byte storage; $\\mathcal{O}(N + \\text{pointers})$ in linked list storage'
  },
  keyConcepts: [
    {
      title: 'Step 1: Character Sets, Length & Substrings',
      description: `Before designing algorithms, let us build a clear mental model of how text is represented and measured.

A computer communicates through a defined **Character Set**, composed of:
1. **Alphabetical letters** (A–Z, a–z)
2. **Numeric digits** (0–9)
3. **Special symbols** (+, -, *, /, (, ), commas, periods, currency symbols, and the blank space)

**The Blank Space Character (□):**
In string processing, a blank space is just as much a valid character as the letter 'A'. It occupies 1 byte of storage (ASCII 32) and contributes directly to string length. When ambiguity must be avoided in handwritten proofs, a blank space is written using the open-box symbol □.

**Definitions & Structural Rules:**
- **String:** A finite sequence $S$ of zero or more characters. The number of characters in $S$ is its length: $\\text{LENGTH}(S)$. Specific strings are enclosed in quotes: \`'THE END'\` has length 7, and \`'TO BE OR NOT TO BE'\` has length 18 (14 letters + 4 spaces).
- **Empty (Null) String ($\\Lambda$):** A string containing zero characters, denoted by the Greek letter Lambda ($\\Lambda$) or empty quotes \`''\`. Its length is strictly 0: $\\text{LENGTH}(\\Lambda) = 0$.
- **Concatenation ($//$ or $+$):** Joining two strings $S_1$ and $S_2$ end-to-end. For example, \`'THE' // 'END' = 'THEEND'\`, whereas \`'THE' // '□' // 'END' = 'THE END'\`. The length of the joined string satisfies:
$$\\text{LENGTH}(S_1 // S_2) = \\text{LENGTH}(S_1) + \\text{LENGTH}(S_2)$$
- **Substring:** A string $Y$ is a substring of $S$ if there exist prefix $X$ and suffix $Z$ such that $S = X // Y // Z$. If $X = \\Lambda$, $Y$ is an **initial substring (prefix)**. If $Z = \\Lambda$, $Y$ is a **terminal substring (suffix)**. The length of any substring cannot exceed the parent string.`,
      bulletPoints: [
        'Alphabet & Delimiters: Characters belong to a defined finite set; blank spaces are full valid characters that count toward length.',
        'Prefix & Suffix Bounds: For any string S of length n, there are exactly n + 1 initial substrings (prefixes) and n + 1 terminal substrings (suffixes), including Λ.',
        'Empty String Identity: Concatenating the empty string Λ to any string S leaves S unchanged: S // Λ = Λ // S = S.'
      ],
      mathFormula: `Substring Classification for S = 'TO BE OR NOT TO BE':
- Initial Substring (Prefix): 'TO' (where X = Λ)
- Interior Substring: 'BE OR NOT' (where X = 'TO ', Z = ' TO BE')
- Prefix and Suffix: 'TO BE' appears as both an initial and a terminal substring
- Total Length: LENGTH('TO BE OR NOT TO BE') = 18`
    },
    {
      title: 'Step 2: Memory Models — Fixed, Variable & Linked',
      description: `How does physical computer memory organize sequences of characters? There are three classic storage architectures, each representing a distinct engineering trade-off between random-access speed, memory efficiency, and insertion flexibility:

### 1. Fixed-Length Record Storage
Every line or record in memory is allocated the exact same fixed number of character slots (traditionally 80 characters, matching historical terminal display widths).
- **Direct Address Calculation:** Because every record has identical size $W$, the memory location of record $K$ is computed instantly in $\\mathcal{O}(1)$ time:
$$\\text{Address}(K) = \\text{Base} + (K - 1) \\times W$$
- **The Trade-Off:** While reading and in-place overwriting are instantaneous, short lines waste significant memory on trailing blank padding (internal fragmentation). Furthermore, inserting a new line between existing records requires shifting every succeeding line down in RAM!

**The Pointer Array Solution:**
Instead of storing records in strict consecutive physical memory, records can reside anywhere. We maintain an auxiliary array \`POINT\`, where \`POINT[K]\` stores the starting memory address of record $K$. Inserting or rearranging lines now only requires updating addresses in the pointer array—no large blocks of text are ever copied!

### 2. Variable-Length Storage with Maximum Bounds
Memory cells have an upper size bound, but the system actively tracks the exact live character count. Two techniques are used:
- **Sentinel Marker:** A special trailing symbol (such as \`$$\` or C's null-terminator \`'\\0'\`) marks where valid text ends.
- **Length Header:** An explicit integer prefix stores the exact number of characters currently held in the buffer (used in Pascal strings and modern string headers).

### 3. Linked Storage (Linked Lists for Strings)
Text is divided across dynamic memory nodes connected by pointer links. Each node holds either a single character or a fixed small group of characters (e.g., 4 characters per node + 1 pointer):
- **Effortless Splicing:** Inserting, deleting, or reordering text blocks takes $\\mathcal{O}(1)$ time by merely re-pointing links, without shifting surrounding characters.
- **The Trade-Off:** Pointers consume extra memory (pointer overhead), and direct $\\mathcal{O}(1)$ indexing is lost—accessing character position $K$ requires traversing links sequentially.`,
      bulletPoints: [
        'Fixed-Length Trade-Off: Instant O(1) arithmetic address calculation vs severe internal fragmentation from blank padding.',
        'Pointer Array Optimization: Relieves fixed contiguous shifting by decoupling logical record sequence from physical memory layout.',
        'Variable-Length Efficiency: Uses null sentinels or integer length headers to store only active characters.',
        'Linked Node Flexibility: Eliminates bulk character shifting during insertions/deletions at the expense of pointer memory overhead and sequential access.'
      ],
      mathFormula: `Linked Storage Node Traversal:
START = 4
Node 4:  CHARS: 'A TH'  LINK: 2   -->  Node 2:  CHARS: 'ING '  LINK: 7
Node 7:  CHARS: 'OF B'  LINK: 11  -->  Node 11: CHARS: 'EAUT'  LINK: 12
Node 12: CHARS: 'Y IS'  LINK: 8   -->  Node 8:  CHARS: ' A J'  LINK: 1
Node 1:  CHARS: 'OY F'  LINK: 10  -->  Node 10: CHARS: 'OREV'  LINK: 6
Node 6:  CHARS: 'ER. '  LINK: 0 (Null Pointer)
Decoded Full String: "A THING OF BEAUTY IS A JOY FOREVER."`
    },
    {
      title: 'Step 3: Primitive Operations — Length, Substring, Index & Concat',
      description: `In numeric arrays, the single element $A[i]$ is the primary unit of computation. In text processing, however, individual characters in isolation rarely carry complete meaning—computations focus on words, tokens, and phrases (substrings).

All string manipulation is built on four atomic primitive operations:

1. **$\\text{LENGTH}(S)$:** Returns the total count of characters in string $S$.
   - $\\text{LENGTH}(\\text{'COMPUTER'}) = 8$
   - $\\text{LENGTH}(\\text{' '}) = 1$
   - $\\text{LENGTH}(\\Lambda) = 0$

2. **$\\text{SUBSTRING}(S, K, L)$:** Extracts a slice of text from string $S$, starting at 1-based index $K$ with length $L$.
   - $\\text{SUBSTRING}(\\text{'TO BE OR NOT TO BE'}, 4, 7) = \\text{'BE OR N'}$
   - $\\text{SUBSTRING}(\\text{'THE END'}, 4, 4) = \\text{' END'}$

3. **$\\text{INDEX}(T, P)$:** Searches for the first occurrence of pattern $P$ in text $T$.
   - Returns the 1-based index where $P$ begins inside $T$.
   - If $P$ does not occur in $T$, it returns $0$ (signaling failure).

4. **$\\text{CONCATENATION}(S_1 // S_2)$:** Joins string $S_2$ directly after the last character of string $S_1$.
   - $\\text{'MARK'} // \\text{'TWAIN'} = \\text{'MARKTWAIN'}$
   - $\\text{'MARK'} // \\text{' '} // \\text{'TWAIN'} = \\text{'MARK TWAIN'}$

### Building Intuition for Pattern Finding (INDEX)
Notice that $\\text{INDEX}(T, P)$ looks for the exact sequence of characters, regardless of whether it forms an entire word or an interior syllable. Understanding this distinction is essential for word processing:`,
      bulletPoints: [
        'Atomic Primitives: LENGTH, SUBSTRING, INDEX, and CONCAT form the complete foundation from which all advanced editors and parsers are constructed.',
        '1-Based Convention: In standard algorithmic pseudocode, string positions start at 1; an INDEX result of 0 denotes that the pattern is absent.',
        'Sub-Word Matches: INDEX matches substrings wherever the character sequence appears (e.g. searching for "THE" inside "FATHER" returns index 7).'
      ],
      mathFormula: `INDEX Search Tracing on Text T = 'HIS FATHER IS THE PROFESSOR':
- INDEX(T, 'THE')   = 7   (Matches 'THE' inside 'FA-THE-R' at position 7)
- INDEX(T, 'THEN')  = 0   (Pattern does not occur anywhere in T)
- INDEX(T, ' THE ') = 14  (Matches the isolated word ' THE ' bounded by spaces)
- INDEX(T, 'IS')    = 2   (Matches 'IS' inside 'H-IS' at position 2, not position 12)`
    },
    {
      title: 'Step 4: High-Level Operations — Insert, Delete & Replace',
      description: `By combining the 4 atomic primitives, we construct high-level text editing routines:

### 1. INSERT(T, K, S)
Inserts string $S$ into text $T$ beginning at position $K$.
- **Intuition:** Think of splitting text $T$ like cutting a piece of ribbon at position $K$. You get a left slice (characters 1 to $K-1$) and a right slice (characters from $K$ to the end). You then glue string $S$ in the middle:
\`\`\`text
Algorithm INSERT(T, K, S)
  Input: Text string T, 1-based insertion position K, string to insert S
  Output: New string with S spliced into T at position K
  
  LeftSlice ← SUBSTRING(T, 1, K - 1)
  RightSlice ← SUBSTRING(T, K, LENGTH(T) - K + 1)
  return LeftSlice // S // RightSlice
\`\`\`

### 2. DELETE(T, K, L)
Deletes $L$ characters from text $T$ starting at position $K$.
- **Intuition:** Cut out the unwanted middle piece and join the left piece and right piece together:
\`\`\`text
Algorithm DELETE(T, K, L)
  Input: Text string T, starting position K, number of characters to delete L
  Output: New string with L characters removed starting at K
  
  if K ≤ 0 then
    return T
  end if
  LeftSlice ← SUBSTRING(T, 1, K - 1)
  RightSlice ← SUBSTRING(T, K + L, LENGTH(T) - K - L + 1)
  return LeftSlice // RightSlice
\`\`\`
- **Deleting by Pattern:** To delete the first occurrence of a pattern $P$ from $T$:
$$\\text{DELETE}(T, \\text{INDEX}(T, P), \\text{LENGTH}(P))$$
If $P$ is absent, $\\text{INDEX}(T, P) = 0$, the $K \\le 0$ condition triggers, and $T$ remains unchanged.

### 3. REPLACE(T, P, Q)
Replaces the first occurrence of pattern $P$ in text $T$ with pattern $Q$:
\`\`\`text
Algorithm REPLACE(T, P, Q)
  Input: Text T, target pattern P, replacement pattern Q
  Output: Text with first occurrence of P replaced by Q
  
  K ← INDEX(T, P)
  if K ≠ 0 then
    T ← DELETE(T, K, LENGTH(P))
    T ← INSERT(T, K, Q)
  end if
  return T
\`\`\``,
      bulletPoints: [
        'Splicing Invariant: INSERT splits text at position K, sandwiches S in the middle, and glues the pieces back together.',
        'Gap-Closing Invariant: DELETE skips L characters from index K and concatenates the remaining left and right segments.',
        'Zero-Position Safety: When position K = 0 (e.g., when a pattern is not found), DELETE safely returns the original text without modification.',
        'Composed Replacement: REPLACE is cleanly expressed as finding the index, deleting the old pattern, and inserting the new string at that exact position.'
      ],
      mathFormula: `Mathematical Formulations:
- INSERT(T, K, S)  = SUBSTRING(T, 1, K - 1) // S // SUBSTRING(T, K, LENGTH(T) - K + 1)
- DELETE(T, K, L)  = SUBSTRING(T, 1, K - 1) // SUBSTRING(T, K + L, LENGTH(T) - K - L + 1)
- REPLACE(T, P, Q) = INSERT(DELETE(T, INDEX(T, P), LENGTH(P)), INDEX(T, P), Q)`
    },
    {
      title: 'Step 5: Algorithms — Multi-Deletion & Replacement',
      description: `Now we explore iterative algorithm design: how to process repeated text transformations and handle critical structural edge cases.

### Task A: Delete Every Occurrence of Pattern P
Problem: Given text $T$ and pattern $P$, remove every single appearance of $P$ from $T$.

\`\`\`text
Algorithm DeleteAllOccurrences(T, P)
  Input: Text string T, target pattern P
  Output: Text T with all occurrences of P removed
  
  K ← INDEX(T, P)
  while K ≠ 0 do
    T ← DELETE(T, K, LENGTH(P))
    K ← INDEX(T, P)
  end while
  return T
\`\`\`

**Core Intuition: The "Phantom Pattern" Phenomenon**
When a substring is removed, the characters on the left and right collapse together. This collapse can create *brand new* occurrences of pattern $P$ that did not exist in the initial text!
- Let $T = \\text{'XAAABBB'}$ and $P = \\text{'AB'}$.
- **Iteration 1:** Deleting the central \`'AB'\` at pos 4 turns $T$ into \`'XAABBY'\` (pos 3 and 4 are now \`'AB'\`!).
- **Iteration 2:** Deleting the newly formed \`'AB'\` at pos 3 turns $T$ into \`'XABY'\` (pos 2 and 3 are now \`'AB'\`!).
- **Iteration 3:** Deleting \`'AB'\` at pos 2 turns $T$ into \`'XY'\`. Next $\\text{INDEX}(T, P) = 0$, loop ends.
- The loop ran 3 times, even though \`'AB'\` appeared only once at the beginning!

---

### Task B: Replace Every Occurrence of Pattern P with Q
Problem: Given text $T$, target pattern $P$, and replacement $Q$, replace all occurrences of $P$ with $Q$.

\`\`\`text
Algorithm ReplaceAllOccurrences(T, P, Q)
  Input: Text T, target pattern P, replacement string Q
  Output: Text T with occurrences of P replaced by Q
  
  K ← INDEX(T, P)
  while K ≠ 0 do
    T ← REPLACE(T, P, Q)
    K ← INDEX(T, P)
  end while
  return T
\`\`\`

**CRITICAL EXAM PRINCIPLE: The Infinite Loop Trap**
If pattern $P$ is a substring of replacement $Q$ (e.g., $T = \\text{'XAY'}$, $P = \\text{'A'}$, $Q = \\text{'AB'}$), searching from the beginning of $T$ on each iteration causes an infinite loop!
- **Iteration 1:** \`'XAY'\` becomes \`'XABY'\`.
- **Iteration 2:** Finding \`'A'\` at pos 2 yields \`'XABBY'\`.
- **Iteration 3:** Finding \`'A'\` at pos 2 yields \`'XABBBY'\`... $T$ grows without bound!

**How to Guarantee Termination:**
1. If $\\text{LENGTH}(Q) < \\text{LENGTH}(P)$, $T$ strictly shrinks on every step, guaranteeing termination.
2. In general implementations, the search index must advance *past* the newly inserted replacement string $Q$ (e.g. next search starts at $K + \\text{LENGTH}(Q)$).`,
      bulletPoints: [
        'Cascading Collapse: Deletions can join previously separated characters, generating new target patterns dynamically.',
        'Loop Termination Risk: Naive find-and-replace loops infinitely when pattern P is a substring of replacement Q.',
        'Pointer Advancement: Production replacement engines advance the search pointer past newly inserted text to prevent re-matching.'
      ],
      mathFormula: `Trace of DeleteAllOccurrences for T = 'XAAABBB' and P = 'AB':
- Initial State:  T = 'XAAABBB', INDEX(T, 'AB') = 4
- Pass 1: DELETE(T, 4, 2) --> T = 'XAABBY', INDEX(T, 'AB') = 3
- Pass 2: DELETE(T, 3, 2) --> T = 'XABY',   INDEX(T, 'AB') = 2
- Pass 3: DELETE(T, 2, 2) --> T = 'XY',     INDEX(T, 'AB') = 0 (Terminates)
Final Output: 'XY'`
    },
    {
      title: 'Step 6: Document Processing: Paragraphs, Boundaries & Wrapping',
      description: `In text processing systems, a document is represented as an array of line records \`LINE[1..N]\`, where each line accommodates up to 80 characters. Let us look at three classic document algorithms:

### 1. Counting Paragraphs
Problem: In standard manuscript format, each paragraph begins with a 5-space indentation. Line 1 holds the title and Line $N$ holds the author/end marker. Count the number of paragraphs in the body text.

\`\`\`text
Algorithm CountParagraphs(LINE, N)
  Input: Document array LINE[1..N] of line records
  Output: Total paragraph count NUM
  
  NUM ← 0
  for K ← 2 to N - 1 do
    if SUBSTRING(LINE[K], 1, 5) = "     " then
      NUM ← NUM + 1
    end if
  end for
  return NUM
\`\`\`

---

### 2. Counting Isolated Word Occurrences (Word Boundaries)
Problem: Count how many times the standalone word \`"THE"\` occurs in the document.

**Why Naive INDEX Fails:**
Searching naively for \`"THE"\` matches \`"THE"\` inside \`"FATHER"\` (\`"FA-THE-R"\`), \`"MOTHER"\`, \`"THEORY"\`, and \`"OTHER"\`. None of these are the isolated word \`"THE"\`!

**The 3 Structural Boundary Rules:**
For a word $W$ to be an isolated word, it must be bounded by whitespace or line margins:
1. **Beginning of Line (BEG):** Columns 1 to 4 are \`"THE "\` (word followed by space).
2. **End of Line (END):** The final columns are \`" THE"\` (space followed by word).
3. **Middle of Line (MID):** Surrounded by spaces on both sides: \`" THE "\`.

\`\`\`text
Algorithm CountIsolatedWord(LINE, N)
  Input: Document array LINE[1..N]
  Output: Total isolated count NUM of word "THE"
  
  NUM ← 0
  BEG ← "THE "
  END ← " THE"
  MID ← " THE "
  
  for K ← 2 to N - 1 do
    if SUBSTRING(LINE[K], 1, 4) = BEG then
      NUM ← NUM + 1
    end if
    if SUBSTRING(LINE[K], 76, 5) = END then
      NUM ← NUM + 1
    end if
    STR ← LINE[K]
    while INDEX(STR, MID) ≠ 0 do
      NUM ← NUM + 1
      J ← INDEX(STR, MID)
      STR ← DELETE(STR, J + 1, 3) // Remove 'THE', keep boundary spaces
    end while
  end for
  return NUM
\`\`\`

---

### 3. Word Wrapping Algorithm
Problem: Format continuous text into lines of at most $W$ characters without breaking any word across lines.

**Intuition:**
If we slice rigidly every $W$ characters, words crossing the margin will be severed in half. Instead:
1. Inspect the slice up to column $W + 1$.
2. If column $W + 1$ is a blank space, cut cleanly at column $W$.
3. If column $W + 1$ is a letter (part of a word), search *backward* from column $W$ to find the last space index $J$, and cut the line at $J - 1$.
4. Start the next line with the remaining text and repeat!`,
      bulletPoints: [
        'Document Array Model: Lines 2 to N-1 contain body text, bounded by title and author metadata lines.',
        'Delimited Boundary Invariants: Isolated words must be tested against 3 mutually exclusive positions: line start (BEG), line end (END), and whitespace-enclosed interior (MID).',
        'Word-Wrap Backtracking: Prevents broken words by searching backwards from column W + 1 for the preceding space delimiter.'
      ],
      mathFormula: `Word Boundary Patterns for Word W = "THE":
- BEG := W // ' '     = "THE "   (Checked at column 1)
- END := ' ' // W     = " THE"   (Checked at line end)
- MID := ' ' // W // ' ' = " THE " (Checked across line interior)`
    },
    {
      title: 'Step 7: Pattern Matching: Naive Search & Finite Automata',
      description: `Pattern matching is the fundamental task of locating a target pattern $P$ (length $R$) within a larger text $T$ (length $S$).

### 1. Naive Sliding-Window Search
Problem: Find the 1-based index where pattern $P$ first occurs in text $T$.

**Intuition:**
There are $\\text{MAX} = S - R + 1$ possible starting positions in text $T$. We slide pattern $P$ along each position $K$, comparing character-by-character:

\`\`\`text
Algorithm NaivePatternSearch(T, P)
  Input: Text T (length S), Pattern P (length R)
  Output: 1-based index of first match, or 0 if not found
  
  S ← LENGTH(T)
  R ← LENGTH(P)
  MAX ← S - R + 1
  
  for K ← 1 to MAX do
    MatchFound ← true
    for L ← 1 to R do
      if P[L] ≠ T[K + L - 1] then
        MatchFound ← false
        Exit inner loop
      end if
    end for
    if MatchFound = true then
      return K
    end if
  end for
  return 0
\`\`\`

**Complexity Analysis:**
- **Best Case:** $\\mathcal{O}(S)$ comparisons when the very first character of $P$ mismatches immediately on every window.
- **Worst Case:** $\\mathcal{O}(R \\times S)$ comparisons when the first $R - 1$ characters match before failing on the last character (e.g., searching $P = \\text{'AAAB'}$ in $T = \\text{'AAAAAAAAAA'}$).

---

### 2. Table-Driven Finite Automaton Search
To eliminate redundant backtracking in naive search, a deterministic finite state machine is precomputed from pattern $P$.
- The machine processes text $T$ strictly character-by-character from left to right.
- Its reading pointer *never moves backward*.
- It achieves strictly linear $\\mathcal{O}(S)$ execution time.`,
      bulletPoints: [
        'Sliding Windows: Exactly S - R + 1 possible starting alignments exist for a pattern of length R in a text of length S.',
        'Worst-Case Bound: Naive search degrades to O(R × S) when repetitive prefixes force repeated rewinding of the search pointer.',
        'Linear Automaton: Precomputing state transitions allows the search to scan text in a single forward pass in O(S) time.'
      ],
      mathFormula: `Comparison Bounds for Naive Search:
- Best Case Comparisons:  C_best  = S - R + 1 = O(S)
- Worst Case Comparisons: C_worst = R * (S - R + 1) = O(R * S)
- For fixed total size n = R + S, maximum comparisons occur when R = (n + 1) / 4`
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
      'Note on Indexing: In algorithmic pseudocode, strings are 1-based (first character at position 1; INDEX returns 0 on failure). In C/C++, strings are 0-based (first character at index 0; find returns std::string::npos on failure).',
      'C-strings (char str[]) require a null-terminator byte (\'\\0\') at the end. Without it, functions like strlen() will read past buffer boundaries.'
    ]
  },
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Multi-Occurrence Deletion Algorithm',
      explanation: 'Demonstrates procedural deletion in C++, showing how previously separated characters collapse into new target occurrences.',
      code: `#include <iostream>
#include <string>

// Delete every occurrence of pattern P in text T
void deleteAllOccurrences(std::string &T, const std::string &P) {
    if (P.empty() || T.empty()) return;

    size_t K;
    int pass = 1;
    // Repeat while pattern is found in T
    while ((K = T.find(P)) != std::string::npos) {
        std::cout << "Pass " << pass++ << ": Found '" << P << "' at index " << K << ". Text before: " << T << std::endl;
        // Erase LENGTH(P) characters starting at index K
        T.erase(K, P.length());
        std::cout << "Text after deletion: " << T << std::endl;
    }
}

int main() {
    // Tracing text with collapsing phantom patterns: T = "XAAABBB", P = "AB"
    std::string text = "XAAABBB";
    std::string pattern = "AB";

    std::cout << "Initial Text: " << text << ", Pattern: " << pattern << std::endl;
    deleteAllOccurrences(text, pattern);
    std::cout << "Final Result: " << text << std::endl; // Outputs "XY"

    return 0;
}`
    },
    {
      language: 'cpp',
      title: 'Naive Pattern Matching Algorithm',
      explanation: 'Step-by-step sliding window pattern matching with character comparison tracking to illustrate best vs worst case complexity.',
      code: `#include <iostream>
#include <string>

// Naive pattern search returning 1-based index (0 if not found)
int naivePatternMatch(const std::string &T, const std::string &P, int &comparisonCount) {
    int S = T.length();
    int R = P.length();
    int MAX = S - R + 1;
    comparisonCount = 0;

    for (int K = 1; K <= MAX; ++K) {
        bool match = true;
        for (int L = 1; L <= R; ++L) {
            comparisonCount++;
            // Compare P[L] with T[K + L - 1] (using 0-based array index)
            if (P[L - 1] != T[(K + L - 1) - 1]) {
                match = false;
                break; // Mismatch: advance to next starting window
            }
        }
        if (match) {
            return K; // Found at 1-based position K
        }
    }

    return 0; // Not found
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
      explanation: 'Simulates a linked list string structure where each node stores 4 characters and a pointer to the next node.',
      code: `#include <iostream>
#include <string>
#include <algorithm>

struct StringNode {
    char chunk[4]; // 4 characters per node
    int numChars;  // valid character count in this node (1 to 4)
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
    // Chain: "A TH" -> "ING " -> "OF B" -> "EAUT" -> "Y IS"
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
      year: 'University Semester Exam',
      marks: 10,
      difficulty: 'Exam Classic',
      question: 'Compare in detail the three classic structures used for storing strings in computer memory: (a) Fixed-Length Record Storage, (b) Variable-Length Storage with Fixed Maximum, and (c) Linked Storage. State the advantages and disadvantages of each, and explain how an auxiliary pointer array solves the record insertion problem.',
      solution: `### 1. Conceptual Intuition & Architecture Comparison

When designing memory layouts for strings, computer systems balance three competing goals:
1. **Random Access Speed:** Can we calculate the memory address of line $K$ in $\\mathcal{O}(1)$ arithmetic time?
2. **Space Efficiency:** How much memory is wasted on blank padding or pointer overhead?
3. **Modification Flexibility:** Can we insert or delete lines without shifting megabytes of surrounding text?

---

### 2. Comprehensive Structure Breakdown

#### (a) Record-Oriented, Fixed-Length Storage
- **Concept:** Every line in memory is allocated a predetermined fixed capacity (e.g., exactly 80 characters per record).
- **Advantages:**
  - **Instant $\\mathcal{O}(1)$ Address Calculation:** Record $K$ begins at $\\text{Base} + (K - 1) \\times 80$. No lookup tables or pointers needed.
  - **Simple In-Place Updates:** Modifying a record within its 80-character limit requires no memory reallocation.
- **Disadvantages:**
  - **Memory Waste (Internal Fragmentation):** Short lines (e.g. 10-character lines) waste 70 blank spaces in RAM.
  - **Inflexible Size Limit:** Lines exceeding 80 characters are truncated.
  - **Expensive Insertions:** Inserting a new line between existing records requires shifting all subsequent records down in physical memory.

**The Pointer Array Solution:**
Instead of storing records consecutively in physical RAM, records can reside anywhere. An auxiliary linear array \`POINT\` stores the memory address of each logical record. To insert a new line, we simply insert its address into the \`POINT\` array—leaving the large text records untouched!

---

#### (b) Variable-Length Storage with Fixed Maximum
- **Concept:** Buffers have a maximum size bound, but the system tracks the actual length of each string.
- **Length Tracking Techniques:**
  - **Sentinel Byte:** A special marker (e.g., \`'\\0'\` in C or \`$$\`) indicates the end of valid text.
  - **Length Header:** An explicit integer field stores the character count alongside the buffer pointer (e.g., Pascal strings).
- **Advantages:** Eliminates trailing space padding, saving memory.
- **Disadvantages:** Sequential memory allocation can cause fragmentation when strings frequently resize.

---

#### (c) Linked Storage (Linked Lists for Strings)
- **Concept:** Text is divided into nodes connected by pointer links. Each node holds either one character or a small group of characters (e.g., 4 characters per node).
- **Advantages:**
  - **Instant $\\mathcal{O}(1)$ Splicing:** Inserting, deleting, or reordering text blocks is done by adjusting pointer links without moving surrounding characters.
  - **Dynamic Growth:** No arbitrary upper limit on string length.
- **Disadvantages:**
  - **High Pointer Overhead:** Storing 1 character (1 byte) with an 8-byte pointer wastes ~89% of memory on pointers alone. Storing 4 characters per node significantly reduces this overhead.
  - **Sequential Access Only:** Direct index access in $\\mathcal{O}(1)$ is lost; accessing character $K$ requires traversing $K$ link hops.`,
      keyTakeaway: 'Fixed-length storage enables O(1) arithmetic addressing but suffers from blank space waste; pointer arrays eliminate physical record shifting; linked lists enable instant splicing at the cost of pointer overhead.'
    },
    {
      id: 'str-exam-2',
      year: 'University Semester Exam',
      marks: 8,
      difficulty: 'Medium',
      question: 'Write the pseudocode for an algorithm that deletes every occurrence of a pattern P from a text T. Trace the execution step-by-step for T = \'XAAABBB\' and P = \'AB\'. Explain why the loop executes 3 times even though \'AB\' appeared only once initially.',
      solution: `### 1. Intuition & Invariants

When a substring is removed from a text string, the characters before the deletion point and the characters after the deletion point collapse together. This collapse can bring previously separated characters into direct adjacency, forming **brand new occurrences of pattern P** that did not exist initially.

---

### 2. Formal Pseudocode

\`\`\`text
Algorithm DeleteAllOccurrences(T, P)
  Input: Text string T, pattern P to remove
  Output: Modified string T with all occurrences of P deleted
  
  K ← INDEX(T, P)
  while K ≠ 0 do
    T ← DELETE(T, K, LENGTH(P))
    K ← INDEX(T, P)
  end while
  return T
\`\`\`

---

### 3. Step-by-Step Execution Trace

**Input:** $T = \\text{'XAAABBB'}$, $P = \\text{'AB'}$ (length = 2).

- **Initialization:**
  - Compute $K \\leftarrow \\text{INDEX}(T, \\text{'AB'})$.
  - Inside \`'XAA-AB-BB'\`, pattern \`'AB'\` first appears at position 4 ($K = 4$).
  - Since $K = 4 \\ne 0$, enter the loop.

- **Iteration 1:**
  - Execute $T \\leftarrow \\text{DELETE}(T, 4, 2)$.
  - Left slice: \`'XAA'\`, Right slice: \`'BB'\`.
  - Resulting text: $T = \\text{'XAABBY'}$.
  - Compute $K \\leftarrow \\text{INDEX}(T, \\text{'AB'})$.
  - Looking at \`'XA-AB-BY'\`, characters at positions 3 and 4 form \`'AB'\`! $K = 3$.

- **Iteration 2:**
  - Execute $T \\leftarrow \\text{DELETE}(T, 3, 2)$.
  - Left slice: \`'XA'\`, Right slice: \`'BY'\`.
  - Resulting text: $T = \\text{'XABY'}$.
  - Compute $K \\leftarrow \\text{INDEX}(T, \\text{'AB'})$.
  - Looking at \`'X-AB-Y'\`, characters at positions 2 and 3 form \`'AB'\`! $K = 2$.

- **Iteration 3:**
  - Execute $T \\leftarrow \\text{DELETE}(T, 2, 2)$.
  - Left slice: \`'X'\`, Right slice: \`'Y'\`.
  - Resulting text: $T = \\text{'XY'}$.
  - Compute $K \\leftarrow \\text{INDEX}(T, \\text{'AB'})$.
  - In \`'XY'\`, \`'AB'\` does not occur. $K = 0$.

- **Loop Termination:**
  - Condition $K \\ne 0$ is FALSE ($K = 0$). Loop terminates.
  - Final Output: \`'XY'\`.

---

### 4. Why the Loop Executed 3 Times
Deleting the inner \`'AB'\` caused the preceding \`'A'\` and following \`'B'\` to slide together into adjacency, creating a second \`'AB'\`. Deleting that second \`'AB'\` caused the next \`'A'\` and \`'B'\` to slide together, creating a third \`'AB'\`. This cascading collapse repeats until no more adjacent \`'A'\` and \`'B'\` pairs remain.`,
      keyTakeaway: 'Deleting characters from a string causes adjacent boundaries to collapse, which can dynamically generate newly formed target patterns.'
    },
    {
      id: 'str-exam-3',
      year: 'University Semester Exam',
      marks: 6,
      difficulty: 'Medium',
      question: 'Explain why a naive algorithm that repeatedly replaces pattern P with pattern Q in text T can enter an infinite loop. Provide a concrete example and state the conditions required to guarantee termination.',
      solution: `### 1. The Infinite Loop Mechanism

Consider an algorithm that repeatedly calls:
\`\`\`text
K ← INDEX(T, P)
while K ≠ 0 do
  T ← REPLACE(T, P, Q)
  K ← INDEX(T, P)
end while
\`\`\`

If target pattern $P$ is a substring of replacement pattern $Q$, the replacement operation $T \\leftarrow \\text{REPLACE}(T, P, Q)$ inserts a string containing $P$ right back into $T$. When $\\text{INDEX}(T, P)$ searches again from the start of the string, it finds the newly inserted $P$ at the same position, resulting in an **unbounded infinite loop**.

---

### 2. Concrete Trace Example

Let Text $T = \\text{'XAY'}$, Target $P = \\text{'A'}$, Replacement $Q = \\text{'AB'}$.

- **Iteration 1:**
  - $\\text{INDEX}(T, \\text{'A'}) = 2$.
  - $\\text{REPLACE}(\\text{'XAY'}, \\text{'A'}, \\text{'AB'})$ yields $T = \\text{'XABY'}$.
- **Iteration 2:**
  - $\\text{INDEX}(T, \\text{'A'}) = 2$ (matches the \`'A'\` inside the newly inserted \`'AB'\`!).
  - $\\text{REPLACE}(\\text{'XABY'}, \\text{'A'}, \\text{'AB'})$ yields $T = \\text{'XABBY'}$.
- **Iteration 3:**
  - $\\text{INDEX}(T, \\text{'A'}) = 2$ again!
  - $\\text{REPLACE}(\\text{'XABBY'}, \\text{'A'}, \\text{'AB'})$ yields $T = \\text{'XABBBY'}$.
- **After $N$ iterations:**
  - $T = \\text{'X'} // \\text{'A'} // (\\text{B}^N) // \\text{'Y'}$.
  - The text grows infinitely and $\\text{INDEX}(T, P)$ is never $0$.

---

### 3. Termination Guarantees & Correct Solutions

1. **Size-Decreasing Condition:** If $\\text{LENGTH}(Q) < \\text{LENGTH}(P)$, each replacement strictly decreases the total character count of $T$, guaranteeing termination.
2. **Pointer Advancement Solution:** In standard text engines, the search index must **advance past the replacement string** (next search begins at $K + \\text{LENGTH}(Q)$) rather than resetting to position 1.`,
      keyTakeaway: 'When pattern P is a substring of replacement Q, searching from index 1 causes infinite cycling. Robust find-and-replace engines advance the search pointer past newly inserted text.'
    },
    {
      id: 'str-exam-4',
      year: 'University Semester Exam',
      marks: 8,
      difficulty: 'Hard',
      question: 'Analyze the time complexity of the Naive Pattern Matching algorithm. For a pattern P of length R and text T of length S, determine the number of character comparisons C in: (a) Best Case, and (b) Worst Case. Prove that for a fixed total data size n = R + S, the maximum number of comparisons occurs when R = (n + 1) / 4.',
      solution: `### 1. Algorithmic Setup

The naive pattern matching algorithm aligns pattern $P$ (length $R$) with all possible starting positions in text $T$ (length $S$).
- The total number of starting windows is $\\text{MAX} = S - R + 1$.
- Let $N_K$ be the number of character comparisons performed in window $K$.
- Total comparisons: $C = \\sum_{K=1}^{\\text{MAX}} N_K$.

---

### 2. Complexity Cases

#### (a) Best-Case Complexity
- Occurs when the very first character of $P$ mismatches with the text character at each window ($N_K = 1$ for every $K$).
- Total comparisons:
$$C_{\\text{best}} = 1 \\times (S - R + 1) = S - R + 1 = \\mathcal{O}(S)$$

#### (b) Worst-Case Complexity
- Occurs when the first $R - 1$ characters of $P$ match the text, and only the last character mismatches (or $P$ matches at the very last window).
- Here, $N_K = R$ for all $K$.
- Total comparisons:
$$C_{\\text{worst}} = R \\times (S - R + 1) = \\mathcal{O}(R \\times S)$$

---

### 3. Mathematical Proof for Maximum Comparisons at Fixed n = R + S

Given total size $n = R + S$, substitute $S = n - R$ into $C_{\\text{worst}}$:
$$C(R) = R \\times ((n - R) - R + 1) = R(n - 2R + 1) = nR - 2R^2 + R$$

To find the value of $R$ that maximizes $C(R)$, compute the first derivative with respect to $R$ and set it to 0:
$$\\frac{dC}{dR} = n - 4R + 1 = 0$$
$$4R = n + 1 \\implies R = \\frac{n + 1}{4}$$

**Second Derivative Test:**
$$\\frac{d^2C}{dR^2} = -4 < 0$$
Since the second derivative is strictly negative, $R = \\frac{n + 1}{4}$ is a true global maximum.

**Maximum Comparison Value:**
Substitute $R = \\frac{n + 1}{4}$ back into $C(R)$:
$$C_{\\text{max}} = \\left(\\frac{n + 1}{4}\\right) \\left(n - 2\\left(\\frac{n + 1}{4}\\right) + 1\\right) = \\left(\\frac{n + 1}{4}\\right) \\left(\\frac{n + 1}{2}\\right) = \\frac{(n + 1)^2}{8} = \\mathcal{O}(n^2)$$

Thus, the worst-case comparison count is quadratic $\\mathcal{O}(n^2)$, reaching its theoretical peak when the pattern length is approximately one-fourth of the total data size.`,
      keyTakeaway: 'Naive pattern matching requires O(S) comparisons in the best case and O(R × S) in the worst case, peaking at quadratic O(n^2) comparisons when the pattern length is roughly one-fourth of total input size.'
    },
    {
      id: 'str-exam-5',
      year: 'University Semester Exam',
      marks: 10,
      difficulty: 'Medium',
      question: 'Demonstrate the exact step-by-step application of primitive and high-level string operations in text editing:\n(a) For T = \'THE STUDENT IS ILL.\', show how to produce: (i) T1 = \'THE STUDENT IS VERY ILL.\', and (ii) T2 = \'THE STUDENT IS VERY ILL TODAY.\'. State the exact position K and string S passed to INSERT.\n(b) For S = \'JOHN PAUL JONES\', use DELETE and REPLACE to obtain \'JOHN JONES\' and \'JOHN DAVID JONES\'.\n(c) For T = \'MARC STUDIES MATHEMATICS\', write single-call transformations to produce: (i) \'MARC STUDIES ONLY MATHEMATICS\', and (ii) \'MARC STUDIES APPLIED MATHEMATICS\'.',
      solution: `### Part (a): Modifying T = 'THE STUDENT IS ILL.' (Length = 19)

- **(i) Produce T1 = 'THE STUDENT IS VERY ILL.':**
  - Locate 1-based character position before \`'ILL.'\`:
    - Pos 1 = 'T', Pos 13 = 'I', Pos 14 = 'S', Pos 15 = ' ' (space), Pos 16 = 'I' (start of 'ILL.').
  - Insert \`'VERY '\` right before position 16:
    $$T_1 \\leftarrow \\text{INSERT}(T, 16, \\text{'VERY '})$$
  - Verification:
    $$\\text{SUBSTRING}(T, 1, 15) // \\text{'VERY '} // \\text{SUBSTRING}(T, 16, 4)$$
    $$= \\text{'THE STUDENT IS '} // \\text{'VERY '} // \\text{'ILL.'} = \\text{'THE STUDENT IS VERY ILL.'}$$

- **(ii) Produce T2 = 'THE STUDENT IS VERY ILL TODAY.':**
  - In $T_1$ (length = 24), the final period \`'.'\` is at position 24.
  - Insert \`' TODAY'\` right before the period at position 24:
    $$T_2 \\leftarrow \\text{INSERT}(T_1, 24, \\text{' TODAY'})$$
  - Verification:
    $$\\text{SUBSTRING}(T_1, 1, 23) // \\text{' TODAY'} // \\text{SUBSTRING}(T_1, 24, 1)$$
    $$= \\text{'THE STUDENT IS VERY ILL'} // \\text{' TODAY'} // \\text{'.'} = \\text{'THE STUDENT IS VERY ILL TODAY.'}$$

---

### Part (b): Modifying S = 'JOHN PAUL JONES' (Length = 15)

- **(i) Obtain 'JOHN JONES':**
  - Substring \`'PAUL '\` begins at position 6 with length 5 (P-A-U-L-space).
  - Call: $S_1 \\leftarrow \\text{DELETE}(S, 6, 5)$.
  - Verification:
    $$\\text{SUBSTRING}(S, 1, 5) // \\text{SUBSTRING}(S, 11, 5) = \\text{'JOHN '} // \\text{'JONES'} = \\text{'JOHN JONES'}$$

- **(ii) Obtain 'JOHN DAVID JONES':**
  - Call: $S_2 \\leftarrow \\text{REPLACE}(S, \\text{'PAUL'}, \\text{'DAVID'})$.
  - Internal execution:
    1. $K \\leftarrow \\text{INDEX}(S, \\text{'PAUL'}) = 6$.
    2. $S \\leftarrow \\text{DELETE}(S, 6, 4) = \\text{'JOHN  JONES'}$.
    3. $S \\leftarrow \\text{INSERT}(S, 6, \\text{'DAVID'}) = \\text{'JOHN DAVID JONES'}$.

---

### Part (c): Modifying T = 'MARC STUDIES MATHEMATICS'

- **(i) Produce 'MARC STUDIES ONLY MATHEMATICS':**
  - \`'MATHEMATICS'\` starts at position 14 (following the space at 13).
  - Call: $\\text{INSERT}(T, 14, \\text{'ONLY '})$.
- **(ii) Produce 'MARC STUDIES APPLIED MATHEMATICS':**
  - Call: $\\text{REPLACE}(T, \\text{'MATHEMATICS'}, \\text{'APPLIED MATHEMATICS'})$
    *(or $\\text{INSERT}(T, 14, \\text{'APPLIED '})$)*.`,
      keyTakeaway: 'High-level operations precisely splice text using 1-based positions; preserving word spacing requires including spaces in the inserted string.'
    },
    {
      id: 'str-exam-6',
      year: 'University Semester Exam',
      marks: 12,
      difficulty: 'Hard',
      question: 'A document is stored in computer memory as an array of records LINE[1..N], where each line contains up to 80 characters. Line 1 holds the title, Line N holds the author, and each paragraph begins with a 5-space indentation.\n(a) Write a complete pseudocode algorithm CountParagraphs(LINE, N) to count the total number of paragraphs in the document.\n(b) Write a procedure CountIsolatedWord(LINE, N, W) to count the occurrences of the isolated word W in the document. Explain why testing only INDEX(LINE[K], W) is fundamentally flawed and how the 3 boundary cases (BEG, END, MID) resolve this problem.',
      solution: `### Part (a): Paragraph Counting Algorithm

\`\`\`text
Algorithm CountParagraphs(LINE, N)
  Input: Document array LINE[1..N], number of lines N
  Output: Total paragraph count NUM
  
  NUM ← 0
  for K ← 2 to N - 1 do
    if SUBSTRING(LINE[K], 1, 5) = "     " then
      NUM ← NUM + 1
    end if
  end for
  return NUM
\`\`\`

**Explanation:**
- Lines 1 (title) and $N$ (author) are excluded, restricting the search to $K = 2$ to $N - 1$.
- Any line starting with 5 consecutive blank spaces marks the start of a distinct paragraph.

---

### Part (b): Isolated Word Counting & Boundary Analysis

#### Why Naive INDEX Fails:
Searching naively with $\\text{INDEX}(\\text{LINE}[K], \\text{'THE'})$ incorrectly matches \`'THE'\` embedded inside:
- \`'FATHER'\` (positions 3-5: \`'FA-THE-R'\`)
- \`'MOTHER'\` (\`'MO-THE-R'\`)
- \`'THEORY'\` (\`'THE-ORY'\`)
- \`'OTHER'\` (\`'O-THE-R'\`)
None of these represent the isolated grammatical word \`"THE"\`!

#### The 3 Structural Boundary Invariants:
On an 80-character line, an isolated word $W$ must be delimited by whitespace or line margins:
1. **Beginning of Line (BEG):** $W$ followed by space (\`W // ' '\`). Tested at columns 1 to $\\text{LENGTH}(W) + 1$.
2. **End of Line (END):** Space followed by $W$ (\`' ' // W\`). Tested at the end of the 80-column line.
3. **Middle of Line (MID):** Space on both sides (\`' ' // W // ' '\`).

\`\`\`text
Algorithm CountIsolatedWord(LINE, N, W)
  Input: Document array LINE[1..N], total lines N, target word W
  Output: Count of isolated occurrences of W
  
  NUM ← 0
  lenW ← LENGTH(W)
  BEG ← W // " "
  END ← " " // W
  MID ← " " // W // " "
  
  for K ← 2 to N - 1 do
    // 1. Check Beginning of Line
    if SUBSTRING(LINE[K], 1, lenW + 1) = BEG then
      NUM ← NUM + 1
    end if
    
    // 2. Check End of Line
    if SUBSTRING(LINE[K], 80 - lenW, lenW + 1) = END then
      NUM ← NUM + 1
    end if
    
    // 3. Check Middle of Line Occurrences
    STR ← LINE[K]
    while INDEX(STR, MID) ≠ 0 do
      NUM ← NUM + 1
      J ← INDEX(STR, MID)
      // Delete the word W while preserving the boundary spaces
      STR ← DELETE(STR, J + 1, lenW)
    end while
  end for
  
  return NUM
\`\`\``,
      keyTakeaway: 'Searching for isolated words in word processors requires checking line margins (BEG, END) and interior space delimiters (MID) to avoid false positives on embedded syllables.'
    },
    {
      id: 'str-exam-7',
      year: 'University Semester Exam',
      marks: 10,
      difficulty: 'Hard',
      question: 'Consider a text document represented in memory as an array LINE[1..N] of 80-character line strings. Design an algorithm to swap Paragraph K and Paragraph L in the document without corrupting surrounding paragraphs.',
      solution: `### 1. Intuition & High-Level Plan

Paragraphs in the document are delimited by 5 leading spaces at columns 1-5. Swapping Paragraph $K$ and Paragraph $L$ in contiguous memory requires:
1. **Locating Line Bounds:** Scan \`LINE[2..N-1]\` to find line intervals $[\\text{BEG}_K, \\text{END}_K]$ and $[\\text{BEG}_L, \\text{END}_L]$.
2. **Buffer Storage:** Copy Paragraph $K$ into an auxiliary array \`TEMP\`.
3. **Shifting Intermediate Lines:** Move the lines between the two paragraphs up or down by $\\text{DIFF} = \\text{SIZE}_L - \\text{SIZE}_K$ positions.
4. **Placement:** Copy Paragraph $L$ into position $K$, and copy \`TEMP\` into the adjusted position of Paragraph $L$.

---

### 2. Formal Pseudocode

\`\`\`text
Algorithm SwapParagraphs(LINE, N, K, L)
  Input: Document LINE[1..N], paragraph indices K and L (where K < L)
  Output: Document LINE with paragraphs K and L interchanged
  
  // Step 1: Find Paragraph Boundaries
  P_COUNT ← 0
  BEG_K ← 0, END_K ← 0, BEG_L ← 0, END_L ← 0
  
  for I ← 2 to N - 1 do
    if SUBSTRING(LINE[I], 1, 5) = "     " then
      P_COUNT ← P_COUNT + 1
      if P_COUNT = K then BEG_K ← I end if
      if P_COUNT = K + 1 then END_K ← I - 1 end if
      if P_COUNT = L then BEG_L ← I end if
      if P_COUNT = L + 1 then END_L ← I - 1 end if
    end if
  end for
  if END_L = 0 then END_L ← N - 1 end if
  
  // Step 2: Measure Sizes
  SIZE_K ← END_K - BEG_K + 1
  SIZE_L ← END_L - BEG_L + 1
  
  // Step 3: Copy Paragraph K to Auxiliary Buffer
  for I ← 1 to SIZE_K do
    TEMP[I] ← LINE[BEG_K + I - 1]
  end for
  
  // Step 4: Shift Intervening Lines
  DIFF ← SIZE_L - SIZE_K
  if DIFF > 0 then
    // Shift intervening lines down
    for I ← BEG_L - 1 downto END_K + 1 do
      LINE[I + DIFF] ← LINE[I]
    end for
  else if DIFF < 0 then
    // Shift intervening lines up
    for I ← END_K + 1 to BEG_L - 1 do
      LINE[I + DIFF] ← LINE[I]
    end for
  end if
  
  // Step 5: Place Paragraph L into Position K
  for I ← 1 to SIZE_L do
    LINE[BEG_K + I - 1] ← LINE[BEG_L + DIFF + I - 1]
  end for
  
  // Step 6: Place TEMP into Position L
  for I ← 1 to SIZE_K do
    LINE[BEG_K + SIZE_L + (BEG_L - END_K - 1) + I - 1] ← TEMP[I]
  end for
  
  return LINE
\`\`\``,
      keyTakeaway: 'Swapping paragraphs in contiguous arrays requires identifying line boundaries [BEG, END], buffering one block, shifting intermediate lines by the size delta, and copying blocks into destination positions.'
    },
    {
      id: 'str-exam-8',
      year: 'University Semester Exam',
      marks: 8,
      difficulty: 'Hard',
      question: 'Design an algorithm to solve the Word Wrapping problem: given a continuous character string TEXT and an integer line width W (e.g. W = 40), format TEXT into lines of at most W characters such that no word is split across lines. Punctuation following a word must remain on the same line as the word.',
      solution: `### 1. Intuition & Layout Logic

Word wrapping is the fundamental formatting engine of text processors. Slicing rigidly at column $W$ cuts words in half (e.g., \`'STRUCTURES'\` breaking into \`'STRUC-'\` and \`'TURES'\`).

**The Solution:**
1. Look at the slice of length $W + 1$: $\\text{SLICE} \\leftarrow \\text{SUBSTRING}(\\text{TEXT}, 1, W + 1)$.
2. If column $W + 1$ is a blank space \`' '\`, we can cleanly output the first $W$ characters.
3. If column $W + 1$ is a letter (a word is crossing the line boundary), we scan *backward* from column $W$ to find the last space index $J$.
4. Output $\\text{SUBSTRING}(\\text{TEXT}, 1, J - 1)$ as the line, discard the space at $J$, and start the next line with the remaining text!

---

### 2. Formal Pseudocode

\`\`\`text
Algorithm WordWrap(TEXT, W)
  Input: Continuous text string TEXT, line width W
  Output: Formatted lines printed without breaking words
  
  while LENGTH(TEXT) > W do
    SLICE ← SUBSTRING(TEXT, 1, W + 1)
    
    // Case 1: Clean break on trailing space
    if SUBSTRING(SLICE, W + 1, 1) = " " then
      Write: SUBSTRING(TEXT, 1, W)
      TEXT ← SUBSTRING(TEXT, W + 2, LENGTH(TEXT) - W - 1)
    else
      // Case 2: Find last space index J in SLICE
      J ← W
      while J > 1 and SUBSTRING(SLICE, J, 1) ≠ " " do
        J ← J - 1
      end while
      
      // If a single word exceeds line width W, force cut
      if J = 1 then
        J ← W + 1
      end if
      
      Write: SUBSTRING(TEXT, 1, J - 1)
      TEXT ← SUBSTRING(TEXT, J + 1, LENGTH(TEXT) - J)
    end if
    
    // Strip leading spaces from remaining text
    while LENGTH(TEXT) > 0 and SUBSTRING(TEXT, 1, 1) = " " do
      TEXT ← SUBSTRING(TEXT, 2, LENGTH(TEXT) - 1)
    end while
  end while
  
  if LENGTH(TEXT) > 0 then
    Write: TEXT
  end if
\`\`\``,
      keyTakeaway: 'Word wrapping prevents broken words by inspecting up to column W + 1 and searching backwards for the preceding space delimiter to format whole words.'
    }
  ],
  quizzes: [
    {
      id: 'sq-1',
      question: 'What is the length of the string \'TO BE OR NOT TO BE\' according to standard string definitions?',
      options: [
        '14 (counting only alphabetic letters)',
        '18 (14 letters plus 4 blank space characters)',
        '15 (counting letters plus one end marker)',
        '19 (including an invisible null terminator)'
      ],
      correctIndex: 1,
      explanation: 'In string processing, the blank space character is a valid character contributing to length. \'TO BE OR NOT TO BE\' contains 14 letters and 4 spaces, totaling 18 characters.'
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
      question: 'If Text T = \'HIS FATHER IS THE PROFESSOR\', what is the return value of INDEX(T, \'THE\') in standard pseudocode?',
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
      question: 'In fixed-length record storage, how does an auxiliary pointer array POINT solve the line insertion problem?',
      options: [
        'It compresses characters into 6-bit codes',
        'It allows records to be stored anywhere in memory by updating only pointer values instead of shifting physical records',
        'It converts fixed records into dynamic binary search trees',
        'It automatically removes all blank spaces from records'
      ],
      correctIndex: 1,
      explanation: 'The POINT array maps logical line numbers to physical memory addresses. Inserting a new line requires only updating pointers in the array POINT, leaving the physical text records in place without shifting.'
    },
    {
      id: 'sq-5',
      question: 'Why does a find-and-replace algorithm enter an infinite loop when T = \'XAY\', P = \'A\', and Q = \'AB\'?',
      options: [
        'Because the length of T exceeds buffer bounds',
        'Because P is a substring of Q, so the replacement always reintroduces P at the current search position',
        'Because the empty string Λ is undefined',
        'Because the DELETE function returns null on single-letter words'
      ],
      correctIndex: 1,
      explanation: 'Replacing \'A\' with \'AB\' yields \'XABY\'. The newly inserted string \'AB\' contains \'A\'. When the search resets to the start of the string, it finds \'A\' again, producing \'XABBY\', \'XABBBY\', and so on infinitely.'
    },
    {
      id: 'sq-6',
      question: 'What is the worst-case number of character comparisons in naive pattern matching for a text of length S and pattern of length R?',
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
      question: 'In word processing, why is searching for MID := \' \' // W // \' \' necessary when counting isolated words?',
      options: [
        'To speed up arithmetic multiplication',
        'To ensure words embedded inside larger words (e.g. \'THE\' in \'FATHER\') are not counted as isolated words',
        'To allocate linked list nodes in dynamic storage',
        'Because strings require double spaces in memory'
      ],
      correctIndex: 1,
      explanation: 'An isolated word inside a sentence must have whitespace before and after it. Flanking W with blank spaces (\' \' // W // \' \') filters out embedded syllables like \'THE\' inside \'FATHER\' or \'MOTHER\'.'
    },
    {
      id: 'sq-8',
      question: 'In document processing, how is a new paragraph recognized in the line array LINE[1..N]?',
      options: [
        'By a dollar sign $$ at the end of the line',
        'By checking if the first 5 characters are blank spaces: SUBSTRING(LINE[K], 1, 5) = \'     \'',
        'By checking if the length of the line is exactly 0',
        'By checking if the pointer equals NULL'
      ],
      correctIndex: 1,
      explanation: 'In standard manuscript format, paragraphs begin with a 5-space indentation. The algorithm checks if the first five columns are blank spaces.'
    },
    {
      id: 'sq-9',
      question: 'In the word wrapping algorithm, if column W + 1 is not a space, what does the algorithm do?',
      options: [
        'Truncates the word immediately with a hyphen',
        'Discards the entire sentence and raises an error',
        'Backtracks to find the last preceding blank space J and cuts the line at J - 1 to preserve whole words',
        'Doubles the line width W dynamically'
      ],
      correctIndex: 2,
      explanation: 'To prevent words from breaking across lines, the word wrap algorithm backtracks from column W + 1 to find the preceding blank space index J, outputting up to J - 1 and starting the next line with the full word.'
    }
  ]
};
