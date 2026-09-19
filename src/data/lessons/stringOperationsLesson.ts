import { Lesson } from '../../types';

export const STRING_OPERATIONS_LESSON: Lesson = {
  id: 'string-operations',
  categoryId: 'algorithms',
  subCategoryId: 'string-algorithms',
  title: 'String Operations: Slicing, Combining & Find-and-Replace',
  subtitle: 'How text editors take slices, glue words together, and implement "Find & Replace"',
  icon: 'Binary',
  importance: '⚡ HIGH',
  cuetExamRelevance: 'Heavily tested in university exams (Module 9). Semester exams regularly ask you to: (1) define primitive string operations (LENGTH, SUBSTR, CONCAT, INDEX), (2) write a step-by-step algorithm for REPLACE(TEXT, PAT, REP), and (3) explain what happens when the replacement word is longer or shorter than the original word.',
  overview: 'Whether you are using Microsoft Word, Google Docs, VS Code, or searching for a contact on your phone, you use string operations every day! In this lesson, we will break down the fundamental building blocks of text processing: how to measure length, how to cut out a slice of text (Substring), how to glue words together (Concatenation), and how to build your own "Find and Replace" engine from scratch.',
  timeComplexity: {
    access: '$\\mathcal{O}(1)$ Accessing any character by index',
    search: '$\\mathcal{O}(N \\times M)$ Naive sliding-window search',
    insertion: '$\\mathcal{O}(N + K)$ Slicing and inserting new text into a buffer',
    deletion: '$\\mathcal{O}(N)$ Compacting remaining text after removing letters',
    space: '$\\mathcal{O}(N)$ Buffer memory to store the resulting text'
  },
  keyConcepts: [
    {
      title: 'Step 1: The Four Building Blocks of Text Processing',
      description: 'Computer scientists break down every fancy text editor into four simple primitive operations:',
      bulletPoints: [
        '1. LENGTH(S): Counts how many characters are in string S (e.g. LENGTH("apple") is 5). In C, this is `strlen()`; in C++, it is `s.length()`.',
        '2. SUBSTRING(S, start, count): Slices out a smaller piece of text starting at a specific position. For example, if S is "CHOCOLATE", SUBSTR(S, 0, 5) gives "CHOCO".',
        '3. CONCATENATION(S1, S2): Glues two strings end-to-end like train cars. For example, CONCAT("Super", "man") results in "Superman".',
        '4. INDEX(Text, Pattern): Searches through Text to find the very first position where Pattern appears. For example, INDEX("BANANA", "AN") returns 1 (the first "AN" starts at index 1). If not found, it returns -1 or 0.'
      ],
      mathFormula: `Visualizing Primitive Operations:
- S = "HELLO WORLD"
- SUBSTRING(S, 6, 5)  ==> "WORLD"
- CONCAT("GOOD", "BYE") ==> "GOODBYE"
- INDEX(S, "LO")      ==> 3 (starts at index 3)`
    },
    {
      title: 'Step 2: How "Find" Works: The Naive Sliding Magnifying Glass',
      description: 'How does your browser search for a word when you press Ctrl+F? The most intuitive way is the "Naive" (Brute-Force) sliding window:',
      bulletPoints: [
        'Hold the Pattern Under the Text: Imagine you have a sheet of paper with the text "THE CAT SAT ON THE MAT" (length N) and a stencil with the pattern "CAT" (length M).',
        'Check Letter by Letter: Hold the stencil at index 0 ("THE"). Does \'T\' == \'C\'? No! Mismatch!',
        'Slide Right by One: Slide your stencil 1 step to index 1 ("HE "). Does \'H\' == \'C\'? No! Mismatch!',
        'Slide Again: Keep sliding by 1 position until you reach index 4 ("CAT"). \'C\' == \'C\', \'A\' == \'A\', \'T\' == \'T\'! Match found at index 4!',
        'Simple but Can Be Inefficient: When all letters match, it is fast. But if the text has lots of repeating letters (like searching "AAB" in "AAAAAAAAAB"), naive search repeats work over and over.'
      ]
    },
    {
      title: 'Step 3: Building "Find & Replace" From Scratch',
      description: 'The REPLACE(TEXT, PATTERN, REPLACEMENT) procedure finds occurrences of a word and swaps them with a new word. But what happens to the surrounding text?',
      bulletPoints: [
        'Case 1: Same Length (|REPLACEMENT| == |PATTERN|): If you replace "CAT" (3 letters) with "DOG" (3 letters), you simply overwrite the 3 letters in-place! No shifting required.',
        'Case 2: Replacement is Longer (|REPLACEMENT| > |PATTERN|): If you replace "CAT" (3 letters) with "ELEPHANT" (8 letters), your word needs 5 extra spaces! You must push all following letters to the right before writing "ELEPHANT", otherwise you will crush and erase neighbor text!',
        'Case 3: Replacement is Shorter (|REPLACEMENT| < |PATTERN|): If you replace "ELEPHANT" with "CAT", you leave an empty hole of 5 spaces. You must pull all following letters to the left to close the gap.',
        'The Infinite Loop Trap: If you replace "cat" with "scatch", the new word contains the old pattern! If your search index doesn\'t jump past the newly inserted replacement, your code will get stuck in an endless loop forever!'
      ],
      mathFormula: `Managing Buffer Shifts during REPLACE:
Let Pattern length = M, Replacement length = L. The difference is:
Delta = L - M
- Delta > 0 (e.g. 8 - 3 = +5): Shift trailing characters RIGHT by 5.
- Delta < 0 (e.g. 3 - 8 = -5): Shift trailing characters LEFT by 5.
- After replacing, advance search pointer past the replacement to avoid loops!`
    },
    {
      title: 'Step 4: Why Simple Search Gets Exhausted (The Backtracking Problem)',
      description: 'Why do computer scientists spend so much time studying string search? Let\'s see where simple search hits a wall:',
      bulletPoints: [
        'The Repeating Letter Nightmare: Suppose your text is "AAAAAAAAAAAAAAAAAB" (many As followed by a B) and your pattern is "AAAB".',
        'What Naive Search Does: It matches \'A\', matches \'A\', matches \'A\', then fails on \'B\'! So it slides 1 step right and starts testing \'A\', \'A\', \'A\' all over again from scratch!',
        'Rewinding Your Reading Finger: In naive search, your reading finger on the text is constantly rewound backward. For a text of length N and pattern of length M, this can take up to N * M comparisons!',
        'Can We Do Better? Yes! Can we remember what we already read so our reading finger NEVER moves backward? That is the genius invention called the Knuth-Morris-Pratt (KMP) algorithm, explored in our next lesson!'
      ]
    }
  ],
  cstlReference: {
    header: '#include <string>\n#include <iostream>',
    declaration: 'std::string text = "The quick brown fox jumps";\nstd::string pat = "fox";',
    commonMethods: [
      { method: 'text.find(pat)', description: 'Finds the first position where pat occurs, or returns string::npos', complexity: 'O(N * M)' },
      { method: 'text.rfind(pat)', description: 'Finds the last occurrence searching from right to left', complexity: 'O(N * M)' },
      { method: 'text.replace(pos, len, "cat")', description: 'Replaces len characters starting at pos with "cat"', complexity: 'O(N + |cat|)' },
      { method: 'text.insert(pos, "word")', description: 'Inserts "word" at pos, pushing trailing characters right', complexity: 'O(N)' },
      { method: 'text.erase(pos, len)', description: 'Removes len characters starting at pos, shifting characters left', complexity: 'O(N)' }
    ],
    notes: [
      'C++ `std::string::replace()` automatically handles resizing the memory buffer when the replacement word is longer or shorter than the target.',
      'Always verify that `text.find(pat) != std::string::npos` before attempting to replace, otherwise your program will throw an out-of-range exception!'
    ]
  },
  codeSnippets: [
    {
      language: 'cpp',
      title: 'Simple Find & Replace in C++',
      explanation: 'Replaces all occurrences of a target substring using std::string::find and std::string::replace, advancing the pointer to prevent infinite cycles.',
      code: `#include <iostream>
#include <string>

// Function that replaces all occurrences of 'target' with 'replacement'
void replaceAll(std::string &text, const std::string &target, const std::string &replacement) {
    if (target.empty()) return;

    size_t pos = 0;
    // Keep finding the target word
    while ((pos = text.find(target, pos)) != std::string::npos) {
        // Replace target with replacement
        text.replace(pos, target.length(), replacement);

        // Advance pos past the replacement to avoid infinite loops!
        pos += replacement.length();
    }
}

int main() {
    std::string sentence = "I love cats. Cats are cute!";
    std::cout << "Before: " << sentence << std::endl;

    replaceAll(sentence, "cats", "dogs");
    replaceAll(sentence, "Cats", "Dogs");

    std::cout << "After:  " << sentence << std::endl;
    // Prints: "I love dogs. Dogs are cute!"

    return 0;
}
`
    },
    {
      language: 'c',
      title: 'Naive Pattern Search in Plain C (Sliding Stencil)',
      explanation: 'Slides a search stencil across the text one position at a time, testing for exact character matches in O(N * M) worst-case time.',
      code: `#include <stdio.h>
#include <string.h>

// Returns the starting index of pattern in text, or -1 if not found
int naiveSearch(const char* text, const char* pattern) {
    int n = strlen(text);
    int m = strlen(pattern);

    // Slide pattern over text one position at a time
    for (int i = 0; i <= n - m; i++) {
        int j;
        // Check if all characters in pattern match
        for (j = 0; j < m; j++) {
            if (text[i + j] != pattern[j]) {
                break; // Mismatch! Stop checking this window
            }
        }
        // If we matched all m characters, we found it!
        if (j == m) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}

int main() {
    char story[] = "A quick brown fox";
    char word[] = "brown";

    int index = naiveSearch(story, word);
    if (index != -1) {
        printf("Found '%s' starting at index %d!\\n", word, index);
    } else {
        printf("Not found.\\n");
    }
    return 0;
}`
    }
  ],
  examQuestions: [
    {
      id: 'stro-q1',
      year: '2023 & 2020 CUET Exam',
      marks: 8,
      difficulty: 'Medium',
      question: 'Write a procedural algorithm for REPLACE(TEXT, PAT, REP), which replaces every occurrence of pattern PAT in string TEXT with string REP. What precautions must be taken when the length of REP is greater than PAT?',
      solution: `Model University Answer:

\`\`\`pseudocode
Algorithm REPLACE(TEXT, PAT, REP)
1. [Initialize lengths]
   N ← LENGTH(TEXT)
   M ← LENGTH(PAT)
   L ← LENGTH(REP)
   i ← 0

2. [Scan text]
   WHILE i ≤ N - M DO:
     IF SUBSTRING(TEXT, i, M) = PAT THEN:
       IF L > M THEN:
         [Shift trailing characters right by (L - M)]
         Shift TEXT from (i + M) to end RIGHT by (L - M)
       ELSE IF L < M THEN:
         [Shift trailing characters left by (M - L)]
         Shift TEXT from (i + M) to end LEFT by (M - L)
       [Copy replacement string]
       TEXT[i ... i + L - 1] ← REP
       [Advance search pointer past replacement]
       i ← i + L
     ELSE:
       i ← i + 1
   [End of WHILE loop]

3. RETURN TEXT
\`\`\`

Precautions when LENGTH(REP) > LENGTH(PAT):
1. Buffer Overflow: If the text buffer was allocated with fixed memory, inserting a longer replacement can exceed buffer boundaries and corrupt memory. The destination buffer must have sufficient extra capacity allocated.
2. Order of Shifting: When shifting characters to the right to make space, shifting must be done from right to left (from the end of the string backward) to prevent overwriting existing characters.
3. Infinite Loop Prevention: If PAT appears inside REP (e.g. replace "a" with "aa"), advancing i by 1 would cause the algorithm to repeatedly find "a" inside "aa" forever. Advancing i by i + L prevents this defect.`,
      keyTakeaway: 'When replacement is longer than pattern, trailing characters must be shifted right before writing, buffer overflow must be guarded, and search pointer must jump past the replacement.'
    },
    {
      id: 'stro-q2',
      year: '2022 CUET Exam',
      marks: 6,
      difficulty: 'Easy',
      question: 'Define the four primitive string operations: LENGTH, SUBSTRING, CONCATENATION, and INDEX. Give an example of each using the strings S1 = "DATA" and S2 = "STRUCTURES".',
      solution: `Model University Answer:

1. LENGTH(S):
- Definition: Returns the total count of valid characters present in string S.
- Example: LENGTH("DATA") = 4. LENGTH("STRUCTURES") = 10.

2. SUBSTRING(S, start, len):
- Definition: Extracts a contiguous portion of string S starting at position 'start' with length 'len'.
- Example: SUBSTRING("STRUCTURES", 0, 6) = "STRUCT".

3. CONCATENATION(S1, S2):
- Definition: Joins string S2 directly to the end of string S1 to create a single contiguous new string.
- Example: CONCATENATION("DATA", "STRUCTURES") = "DATASTRUCTURES".

4. INDEX(Text, Pattern):
- Definition: Searches for the first occurrence of Pattern inside Text and returns the starting 0-based (or 1-based) index. Returns -1 if Pattern is absent.
- Example: INDEX("DATASTRUCTURES", "STRUCT") = 4.`,
      keyTakeaway: 'LENGTH counts characters; SUBSTRING slices contiguous letters; CONCATENATION joins words end-to-end; INDEX locates the starting position of a sub-word.'
    }
  ],
  quizzes: [
    {
      id: 'sto-q1',
      question: 'What happens if you replace "cat" with "elephant" in a fixed-size character buffer that is already full?',
      options: [
        'The word "elephant" automatically shrinks to fit 3 letters',
        'Buffer overflow occurs because "elephant" is 5 characters longer than "cat"',
        'The computer pauses execution until more RAM is installed',
        'The extra characters are stored in the CPU registers'
      ],
      correctIndex: 1,
      explanation: 'Since "elephant" (8 chars) is longer than "cat" (3 chars), the text expands by 5 letters. In a fixed buffer that is already full, this will overwrite neighbor memory, causing a buffer overflow.'
    },
    {
      id: 'sto-q2',
      question: 'In a naive pattern search, what is the worst-case number of comparisons to search a pattern of length M in a text of length N?',
      options: [
        'O(N + M)',
        'O(1)',
        'O(N * M)',
        'O(log N)'
      ],
      correctIndex: 2,
      explanation: 'In the worst case (e.g. searching "AAB" in "AAAAAA"), naive search tests all M characters of the pattern at almost every single one of the N text positions, leading to O(N * M) total comparisons.'
    },
    {
      id: 'sto-q3',
      question: 'Why must the search index jump past the replacement string after performing a replacement?',
      options: [
        'To speed up CPU clock speed',
        'To prevent infinite loops if the replacement word contains the pattern',
        'Because strings can only be searched once per program',
        'To reset the null terminator'
      ],
      correctIndex: 1,
      explanation: 'If you replace "a" with "aa", and do not jump past the new "aa", the search pointer will see the new "a" immediately and replace it again, repeating forever in an infinite loop.'
    }
  ]
};
