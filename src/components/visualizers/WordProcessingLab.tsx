import React, { useState, useMemo } from 'react';
import {
  FileText,
  Scissors,
  Search,
  AlignLeft,
  BookOpen,
  RotateCcw,
  Play,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export type WordProcessingSubTab = 'primitives' | 'storyDoc' | 'wordScanner' | 'wordWrap' | 'bookProblems';

export const WordProcessingLab: React.FC = () => {
  const [subTab, setSubTab] = useState<WordProcessingSubTab>('primitives');

  // =========================================================================
  // SUB-TAB 1: HIGH-LEVEL PRIMITIVES SANDBOX (INSERT, DELETE, REPLACE)
  // =========================================================================
  const [wpTarget, setWpTarget] = useState<string>('ABCDEFG');
  const [wpInsertPos, setWpInsertPos] = useState<number>(3);
  const [wpInsertStr, setWpInsertStr] = useState<string>('XYZ');

  const [delTarget, setDelTarget] = useState<string>('JOHN PAUL JONES');
  const [delPos, setDelPos] = useState<number>(6);
  const [delLen, setDelLen] = useState<number>(5);

  const [repTarget, setRepTarget] = useState<string>('XABYABZ');
  const [repP1, setRepP1] = useState<string>('AB');
  const [repP2, setRepP2] = useState<string>('C');

  // Evaluated outputs & step breakdowns
  const evaluatedInsert = useMemo(() => {
    const k = wpInsertPos;
    const s = wpInsertStr;
    const t = wpTarget;
    if (k <= 1) return { result: s + t, p1: '', p2: t };
    if (k > t.length) return { result: t + s, p1: t, p2: '' };
    const p1 = t.slice(0, k - 1);
    const p2 = t.slice(k - 1);
    return { result: p1 + s + p2, p1, p2 };
  }, [wpTarget, wpInsertPos, wpInsertStr]);

  const evaluatedDelete = useMemo(() => {
    const k = delPos;
    const l = delLen;
    const t = delTarget;
    if (k <= 0) return { result: t, p1: t, deleted: '', p2: '' };
    const p1 = t.slice(0, Math.max(0, k - 1));
    const deleted = t.slice(Math.max(0, k - 1), Math.max(0, k - 1 + l));
    const p2 = t.slice(Math.max(0, k - 1 + l));
    return { result: p1 + p2, p1, deleted, p2 };
  }, [delTarget, delPos, delLen]);

  const evaluatedReplace = useMemo(() => {
    if (!repP1) return { result: repTarget, k: 0, p1: repTarget, deleted: '', p2: '' };
    const idx0 = repTarget.indexOf(repP1);
    if (idx0 === -1) return { result: repTarget, k: 0, p1: repTarget, deleted: '', p2: '' };
    const k = idx0 + 1;
    const p1 = repTarget.slice(0, idx0);
    const deleted = repTarget.slice(idx0, idx0 + repP1.length);
    const p2 = repTarget.slice(idx0 + repP1.length);
    return { result: p1 + repP2 + p2, k, p1, deleted, p2 };
  }, [repTarget, repP1, repP2]);

  // Presets from Lipschutz Chapter 3
  const loadPreset = (type: 'insert' | 'delete' | 'replace', presetId: string) => {
    if (type === 'insert') {
      if (presetId === 'ex3.5a') {
        setWpTarget('ABCDEFG');
        setWpInsertPos(3);
        setWpInsertStr('XYZ');
      } else if (presetId === 'ex3.5b') {
        setWpTarget('ABCDEFG');
        setWpInsertPos(6);
        setWpInsertStr('XYZ');
      } else if (presetId === 'ex3.5c') {
        setWpTarget('AAAAA');
        setWpInsertPos(1);
        setWpInsertStr('BBB');
      } else if (presetId === 'prob3.13a') {
        setWpTarget('THE STUDENT IS ILL.');
        setWpInsertPos(16);
        setWpInsertStr('VERY ');
      } else if (presetId === 'prob3.13b') {
        setWpTarget('THE STUDENT IS VERY ILL.');
        setWpInsertPos(24);
        setWpInsertStr(' TODAY');
      }
    } else if (type === 'delete') {
      if (presetId === 'ex3.6a') {
        setDelTarget('ABCDEFG');
        setDelPos(4);
        setDelLen(2);
      } else if (presetId === 'ex3.6b') {
        setDelTarget('ABCDEFG');
        setDelPos(2);
        setDelLen(4);
      } else if (presetId === 'ex3.6c') {
        setDelTarget('JOHN PAUL JONES');
        setDelPos(6);
        setDelLen(5);
      } else if (presetId === 'ex3.6d') {
        setDelTarget('ABCDEFG');
        setDelPos(0);
        setDelLen(3);
      }
    } else if (type === 'replace') {
      if (presetId === 'ex3.8a') {
        setRepTarget('XABYABZ');
        setRepP1('AB');
        setRepP2('C');
      } else if (presetId === 'prob3.12') {
        setRepTarget('AAABBB');
        setRepP1('AA');
        setRepP2('BB');
      } else if (presetId === 'prob3.13c') {
        setRepTarget('JOHN PAUL JONES');
        setRepP1('PAUL');
        setRepP2('DAVID');
      }
    }
  };

  // =========================================================================
  // SUB-TAB 2: STORY DOCUMENT & PARAGRAPH COUNTER (PROCEDURE P3.14)
  // =========================================================================
  interface StoryLine {
    lineNum: number;
    text: string;
    isTitle?: boolean;
    isAuthor?: boolean;
  }

  const defaultStoryLines: StoryLine[] = [
    { lineNum: 1, text: 'THE ADVENTURES OF DATA STRUCTURES', isTitle: true },
    { lineNum: 2, text: '     ONCE UPON A TIME IN 1986, COMPUTER SCIENTISTS SOUGHT', isTitle: false },
    { lineNum: 3, text: 'EFFICIENT WAYS TO MANAGE LONG ESSAYS AND NOVELS IN MEMORY.', isTitle: false },
    { lineNum: 4, text: '     PROFESSOR SEYMOUR LIPSCHUTZ INTRODUCED RIGOROUS MODELS', isTitle: false },
    { lineNum: 5, text: 'INCLUDING FIXED-LENGTH LINE ARRAYS AND LINKED ALLOCATION.', isTitle: false },
    { lineNum: 6, text: '     MODERN WORD PROCESSORS STILL BUILD UPON THESE EXACT', isTitle: false },
    { lineNum: 7, text: 'STRING OPERATIONS AND PROCEDURAL TEXT TRANSFORMATIONS.', isTitle: false },
    { lineNum: 8, text: 'SEYMOUR LIPSCHUTZ, PH.D.', isAuthor: true }
  ];

  const [storyLines, setStoryLines] = useState<StoryLine[]>(defaultStoryLines);
  const [scanK, setScanK] = useState<number>(1); // Current line being scanned (1..N)
  const [scannedParagraphs, setScannedParagraphs] = useState<number[]>([]); // line indices that are paragraphs
  const [scanDone, setScanDone] = useState<boolean>(false);

  const resetStoryScan = () => {
    setScanK(1);
    setScannedParagraphs([]);
    setScanDone(false);
  };

  const stepStoryScan = () => {
    if (scanDone) return;
    const nextK = scanK + 1;
    const n = storyLines.length;

    // We scan lines 2 to N - 1 (Procedure P3.14)
    if (nextK >= n) {
      setScanK(nextK);
      setScanDone(true);
      return;
    }

    setScanK(nextK);
    const line = storyLines[nextK - 1];
    if (line.text.startsWith('     ')) {
      setScannedParagraphs((prev) => (prev.includes(nextK) ? prev : [...prev, nextK]));
    }
  };

  const autoScanStory = () => {
    const paras: number[] = [];
    for (let k = 2; k <= storyLines.length - 1; k++) {
      if (storyLines[k - 1].text.startsWith('     ')) {
        paras.push(k);
      }
    }
    setScannedParagraphs(paras);
    setScanK(storyLines.length);
    setScanDone(true);
  };

  const toggleIndent = (lineIndex: number) => {
    setStoryLines((prev) =>
      prev.map((item, idx) => {
        if (idx !== lineIndex) return item;
        if (item.text.startsWith('     ')) {
          return { ...item, text: item.text.replace(/^     /, '') };
        } else {
          return { ...item, text: '     ' + item.text };
        }
      })
    );
    resetStoryScan();
  };

  // =========================================================================
  // SUB-TAB 3: ISOLATED WORD SCANNER & BOUNDARY FILTER (P3.15 & P3.16)
  // =========================================================================
  const [searchWord, setSearchWord] = useState<string>('THE');
  const [sampleTextForScan, setSampleTextForScan] = useState<string>(
    'THE PROFESSOR TOLD HIS FATHER THAT THE THEORY OF STRINGS IS THE KEY TO THEOREM.'
  );

  interface WordMatch {
    start: number;
    end: number;
    word: string;
    type: 'BEG' | 'END' | 'MID' | 'EMBEDDED_REJECT';
    reason: string;
  }

  const boundaryAnalysis = useMemo(() => {
    const w = searchWord.trim();
    const text = sampleTextForScan;
    if (!w || !text) return { matches: [], validCount: 0, rejectedCount: 0 };

    const matches: WordMatch[] = [];
    const lowerW = w.toLowerCase();
    const lowerT = text.toLowerCase();

    let pos = 0;
    while (pos < text.length) {
      const found = lowerT.indexOf(lowerW, pos);
      if (found === -1) break;

      const len = w.length;
      const prevChar = found > 0 ? text[found - 1] : null;
      const nextChar = found + len < text.length ? text[found + len] : null;

      const isPrevDelim = prevChar === null || /[\s.,;?!]/.test(prevChar);
      const isNextDelim = nextChar === null || /[\s.,;?!]/.test(nextChar);

      if (isPrevDelim && isNextDelim) {
        let matchType: 'BEG' | 'END' | 'MID' = 'MID';
        let reason = `Enclosed by whitespace/delimiters: ' ' // '${w}' // ' ' (MID)`;
        if (prevChar === null) {
          matchType = 'BEG';
          reason = `At start of line: '${w}' // ' ' (BEG)`;
        } else if (nextChar === null) {
          matchType = 'END';
          reason = `At end of line: ' ' // '${w}' (END)`;
        }

        matches.push({
          start: found,
          end: found + len,
          word: text.slice(found, found + len),
          type: matchType,
          reason
        });
      } else {
        // Embedded rejection (e.g. FATHER, THEORY)
        const wordStart = Math.max(0, text.lastIndexOf(' ', found) + 1);
        let wordEnd = text.indexOf(' ', found);
        if (wordEnd === -1) wordEnd = text.length;
        const hostWord = text.slice(wordStart, wordEnd).replace(/[.,;?!]/g, '');

        matches.push({
          start: found,
          end: found + len,
          word: text.slice(found, found + len),
          type: 'EMBEDDED_REJECT',
          reason: `Rejected: Substring is inside host word '${hostWord}'. Fails boundary check!`
        });
      }

      pos = found + len;
    }

    const validCount = matches.filter((m) => m.type !== 'EMBEDDED_REJECT').length;
    const rejectedCount = matches.filter((m) => m.type === 'EMBEDDED_REJECT').length;

    return { matches, validCount, rejectedCount };
  }, [searchWord, sampleTextForScan]);

  // =========================================================================
  // SUB-TAB 4: WORD WRAP & LINE REFLOW ENGINE (PROGRAMMING PROBLEM 3.9)
  // =========================================================================
  const [wrapWidth, setWrapWidth] = useState<number>(36);
  const [rawWrapText, setRawWrapText] = useState<string>(
    'IN COMPUTER SCIENCE AND WORD PROCESSING, A TEXT MUST BE DIVIDED INTO CONSECUTIVE LINES WITHOUT CUTTING WORDS IN HALF ACROSS BORDERS.'
  );

  const smartWrappedLines = useMemo(() => {
    let t = rawWrapText.trim();
    const w = wrapWidth;
    const lines: { lineText: string; cutIndex: number; wasCleanCut: boolean }[] = [];

    while (t.length > 0) {
      if (t.length <= w) {
        lines.push({ lineText: t, cutIndex: t.length, wasCleanCut: true });
        break;
      }

      // Check if character w is a space or column w + 1 is a space
      if (t[w] === ' ') {
        lines.push({ lineText: t.slice(0, w), cutIndex: w, wasCleanCut: true });
        t = t.slice(w + 1).trimStart();
      } else {
        // Find last space up to column w
        const lastSpace = t.lastIndexOf(' ', w);
        if (lastSpace > 0) {
          lines.push({ lineText: t.slice(0, lastSpace), cutIndex: lastSpace, wasCleanCut: true });
          t = t.slice(lastSpace + 1).trimStart();
        } else {
          // Word itself exceeds width w, must force cut
          lines.push({ lineText: t.slice(0, w), cutIndex: w, wasCleanCut: false });
          t = t.slice(w).trimStart();
        }
      }
    }

    return lines;
  }, [rawWrapText, wrapWidth]);

  const naiveTruncatedLines = useMemo(() => {
    const lines: string[] = [];
    for (let i = 0; i < rawWrapText.length; i += wrapWidth) {
      lines.push(rawWrapText.slice(i, i + wrapWidth));
    }
    return lines;
  }, [rawWrapText, wrapWidth]);

  // =========================================================================
  // SUB-TAB 5: LIPSCHUTZ BOOK PROBLEMS & WORKED SOLUTIONS
  // =========================================================================
  const [expandedProbId, setExpandedProbId] = useState<string | null>('prob-3.13');

  interface BookProblem {
    id: string;
    title: string;
    bookRef: string;
    difficulty: string;
    question: string;
    solution: string;
    actionLabel?: string;
    onLoadAction?: () => void;
  }

  const bookProblems: BookProblem[] = [
    {
      id: 'prob-3.8',
      title: 'String Primitives Evaluation on Personal Names',
      bookRef: 'Lipschutz Solved Problem 3.8',
      difficulty: 'Easy',
      question: `Given S = 'JOHN PAUL JONES', evaluate:
(a) LENGTH(S)
(b) SUBSTRING(S, 6, 4)
(c) SUBSTRING(S, 11, 5)
(d) INDEX(S, 'PAUL')
(e) INDEX(S, 'JO')`,
      solution: `Step-by-Step Textbook Derivations:
(a) LENGTH('JOHN PAUL JONES') = 15 characters (counting letters and two spaces).
(b) SUBSTRING(S, 6, 4): Starting at pos 6 ('P'), 4 characters = 'PAUL'.
(c) SUBSTRING(S, 11, 5): Starting at pos 11 ('J'), 5 characters = 'JONES'.
(d) INDEX(S, 'PAUL'): 'PAUL' begins at position 6.
(e) INDEX(S, 'JO'): 'JO' appears twice (at pos 1 in 'JOHN' and pos 11 in 'JONES'). INDEX returns the FIRST occurrence = 1.`,
      actionLabel: 'Load "JOHN PAUL JONES" into Primitives',
      onLoadAction: () => {
        setSubTab('primitives');
        setDelTarget('JOHN PAUL JONES');
        setDelPos(6);
        setDelLen(5);
      }
    },
    {
      id: 'prob-3.10',
      title: 'INDEX Evaluation with Blank Space Delimiters',
      bookRef: 'Lipschutz Solved Problem 3.10',
      difficulty: 'Medium',
      question: `Let T = 'A THING OF BEAUTY IS A JOY FOREVER.'. Evaluate:
(a) INDEX(T, 'A')
(b) INDEX(T, ' A ')
(c) INDEX(T, 'JOY')
(d) INDEX(T, 'BEAUTIFUL')`,
      solution: `Textbook Analysis:
(a) INDEX(T, 'A') = 1. The letter 'A' appears first right at position 1.
(b) INDEX(T, ' A ') = 21. By framing 'A' with leading and trailing spaces, we skip 'A' at position 1 and 'BEAUTY' (containing 'A'), matching the isolated word ' A ' at index 21!
(c) INDEX(T, 'JOY') = 25. 'JOY' begins at column 25.
(d) INDEX(T, 'BEAUTIFUL') = 0. 'BEAUTIFUL' does not appear anywhere in T (only 'BEAUTY' appears).`,
      actionLabel: 'Load into Primitives Sandbox',
      onLoadAction: () => {
        setSubTab('primitives');
        setWpTarget('A THING OF BEAUTY IS A JOY FOREVER.');
        setWpInsertPos(18);
        setWpInsertStr('ALWAYS ');
      }
    },
    {
      id: 'prob-3.13',
      title: 'Document Transformations & Splicing (Procedure P3.13)',
      bookRef: 'Lipschutz Solved Problem 3.13',
      difficulty: 'Medium',
      question: `Given sentence T = 'THE STUDENT IS ILL.':
(a) Transform T into T1 = 'THE STUDENT IS VERY ILL.' using INSERT. State exact position K and string S.
(b) Transform T1 into T2 = 'THE STUDENT IS VERY ILL TODAY.' using INSERT. State exact position K and string S.
(c) Given S = 'JOHN PAUL JONES', show how to produce 'JOHN JONES' using DELETE, and 'JOHN DAVID JONES' using REPLACE.`,
      solution: `Complete Step-by-Step Solution:
Part (a):
- T = 'THE STUDENT IS ILL.' (Length 19)
- 'ILL.' begins at position 16.
- We insert 'VERY ' right before position 16:
  T1 := INSERT(T, 16, 'VERY ').
  Formula: SUBSTRING(T, 1, 15) // 'VERY ' // SUBSTRING(T, 16, 4)
  = 'THE STUDENT IS ' // 'VERY ' // 'ILL.' = 'THE STUDENT IS VERY ILL.'.

Part (b):
- T1 = 'THE STUDENT IS VERY ILL.' (Length 24)
- Period '.' is at position 24.
- We insert ' TODAY' right before the final period at pos 24:
  T2 := INSERT(T1, 24, ' TODAY').
  Formula: SUBSTRING(T1, 1, 23) // ' TODAY' // '.' = 'THE STUDENT IS VERY ILL TODAY.'.

Part (c):
- S = 'JOHN PAUL JONES'
- Delete 'PAUL ' (pos 6, len 5): S1 := DELETE(S, 6, 5) = 'JOHN JONES'.
- Replace 'PAUL' with 'DAVID': S2 := REPLACE(S, 'PAUL', 'DAVID') = 'JOHN DAVID JONES'.`,
      actionLabel: 'Load Problem 3.13 into Sandbox',
      onLoadAction: () => {
        setSubTab('primitives');
        loadPreset('insert', 'prob3.13a');
      }
    },
    {
      id: 'prob-3.14',
      title: 'Counting Paragraphs in Document Array LINE[1..N]',
      bookRef: 'Lipschutz Solved Problem 3.14',
      difficulty: 'Medium',
      question: `A story is represented in memory as an array of 80-character strings LINE[1..N]. Line 1 has the title, Line N has the author, and paragraphs begin with a 5-space indentation.
Write procedure PAR(LINE, N, NUM) to count the total number of paragraphs in the story.`,
      solution: `Model Pseudocode & Explanation:

Procedure PAR(LINE, N, NUM):
1. [Initialize counter.] Set NUM := 0.
2. [Traverse story body.] Repeat for K := 2 to N - 1:
     If SUBSTRING(LINE[K], 1, 5) = '     ' then:
       Set NUM := NUM + 1.
   [End of Step 2 loop.]
3. Return.

Analysis:
- LINE[1] is the title and LINE[N] is the author, so we inspect only lines 2 through N - 1.
- Checking SUBSTRING(LINE[K], 1, 5) = '     ' tests if columns 1-5 are blank spaces.
- Lines without 5 leading spaces are continuations of the active paragraph.`,
      actionLabel: 'Launch Story Document Scanner',
      onLoadAction: () => {
        setSubTab('storyDoc');
      }
    },
    {
      id: 'prob-3.15',
      title: 'Counting Isolated Words & The Boundary Filter Invariant',
      bookRef: 'Lipschutz Solved Problem 3.15 & 3.16',
      difficulty: 'Hard',
      question: `Write procedure COUNT(LINE, N, NUM) to count occurrences of the standalone word "THE" in document LINE[1..N].
Why is testing INDEX(LINE[K], 'THE') fundamentally incorrect? How do the 3 boundary cases (BEG, END, MID) resolve this issue?`,
      solution: `Complete Textbook Analysis:

1. Why Naive INDEX Fails:
   INDEX(LINE[K], 'THE') matches "THE" inside:
   - 'FATHER' ('FA-THE-R')
   - 'MOTHER' ('MO-THE-R')
   - 'THEORY' ('THE-ORY')
   - 'OTHER' ('O-THE-R')
   None of these are the standalone grammatical word "THE"!

2. The 3 Structural Boundary Invariants:
   - Beginning of Line (BEG): Columns 1-4 are 'THE ' (word followed by space).
   - End of Line (END): Columns 76-80 are ' THE' (space followed by word).
   - Middle of Line (MID): Enclosed by space on both sides: ' THE '.

3. Procedure Pseudocode:
COUNT(LINE, N, NUM):
1. Set NUM := 0, BEG := 'THE ', END := ' THE', MID := ' THE '.
2. Repeat for K := 2 to N - 1:
   (a) If SUBSTRING(LINE[K], 1, 4) = BEG then: Set NUM := NUM + 1.
   (b) If SUBSTRING(LINE[K], 76, 5) = END then: Set NUM := NUM + 1.
   (c) Set STR := LINE[K].
       Repeat while INDEX(STR, MID) ≠ 0:
         Set NUM := NUM + 1.
         Set J := INDEX(STR, MID).
         Set STR := DELETE(STR, J + 1, 3). // Remove 'THE', retain boundary spaces
3. Return.`,
      actionLabel: 'Launch Word Boundary Analyzer',
      onLoadAction: () => {
        setSubTab('wordScanner');
      }
    },
    {
      id: 'prob-3.17',
      title: 'Paragraph Block Interchanger in Contiguous Arrays',
      bookRef: 'Lipschutz Solved Problem 3.17',
      difficulty: 'Hard',
      question: `Design an algorithm to swap Paragraph K and Paragraph L in document array LINE[1..N] without corrupting surrounding paragraphs.`,
      solution: `Model University Answer:

1. Find Boundary Line Numbers:
   Scan LINE[2..N-1] for 5 leading spaces to find [BEG_K, END_K] and [BEG_L, END_L].
2. Let SIZE_K := END_K - BEG_K + 1 and SIZE_L := END_L - BEG_L + 1.
3. Copy Paragraph K (lines BEG_K..END_K) into an auxiliary buffer TEMP[1..SIZE_K].
4. Shift intervening lines (END_K + 1 to BEG_L - 1) by DIFF = SIZE_L - SIZE_K positions.
5. Copy Paragraph L into destination starting at BEG_K.
6. Copy TEMP into destination starting at the adjusted position of Paragraph L.`,
      actionLabel: 'View in Story Document',
      onLoadAction: () => {
        setSubTab('storyDoc');
      }
    },
    {
      id: 'prob-3.9-wrap',
      title: 'Word Wrapping Algorithm without Word Splitting',
      bookRef: 'Lipschutz Programming Problem 3.9',
      difficulty: 'Hard',
      question: `Design an algorithm to format continuous stream TEXT into lines of at most W characters without splitting any word across lines.`,
      solution: `Textbook Algorithm:
1. Examine SLICE := SUBSTRING(TEXT, 1, W + 1).
2. If column W + 1 is a blank space ' ', cleanly output SUBSTRING(TEXT, 1, W) and advance TEXT past the space.
3. If column W + 1 is not a space, search backwards from column W to find the last space index J.
4. Output SUBSTRING(TEXT, 1, J - 1) as the formatted line.
5. Set TEXT := SUBSTRING(TEXT, J + 1, LENGTH(TEXT) - J) to start the next line with the whole word.`,
      actionLabel: 'Launch Word Wrapping Engine',
      onLoadAction: () => {
        setSubTab('wordWrap');
      }
    }
  ];

  return (
    <div className="space-y-4">
      {/* Sub-Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-stone-100 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B]">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setSubTab('primitives')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              subTab === 'primitives'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>1. Ops Sandbox</span>
          </button>

          <button
            onClick={() => setSubTab('storyDoc')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              subTab === 'storyDoc'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Story Document (P3.14)</span>
          </button>

          <button
            onClick={() => setSubTab('wordScanner')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              subTab === 'wordScanner'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>3. Word Boundary Filter (P3.15)</span>
          </button>

          <button
            onClick={() => setSubTab('wordWrap')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              subTab === 'wordWrap'
                ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            <span>4. Word Wrap (P3.9)</span>
          </button>

          <button
            onClick={() => setSubTab('bookProblems')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              subTab === 'bookProblems'
                ? 'bg-[#991B1B] text-white font-bold shadow-2xs'
                : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#991B1B]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>5. Solved Book Problems</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. PRIMITIVES SANDBOX (INSERT, DELETE, REPLACE)                       */}
      {/* ===================================================================== */}
      {subTab === 'primitives' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs font-mono text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Lipschutz Section 3.6 Principle:</strong> Modern word processors build high-level operations on top of primitive <code>SUBSTRING</code> and <code>CONCAT</code>. Click any classic textbook preset below to see how characters are spliced and joined mathematically!
            </div>
          </div>

          {/* Presets Row */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-2">
            <span className="text-[11px] font-mono text-stone-500 font-bold uppercase tracking-wider">
              Lipschutz Chapter 3 Presets:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              <button
                onClick={() => loadPreset('insert', 'ex3.5a')}
                className="px-2 py-1 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] hover:border-[#991B1B] transition-colors cursor-pointer"
              >
                Ex 3.5a: 'ABCDEFG' + 'XYZ' @ 3
              </button>
              <button
                onClick={() => loadPreset('insert', 'ex3.5c')}
                className="px-2 py-1 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] hover:border-[#991B1B] transition-colors cursor-pointer"
              >
                Ex 3.5c: 'AAAAA' + 'BBB' @ 1
              </button>
              <button
                onClick={() => loadPreset('insert', 'prob3.13a')}
                className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-bold hover:border-rose-400 transition-colors cursor-pointer"
              >
                Prob 3.13a: 'THE STUDENT IS ILL.' + 'VERY '
              </button>
              <button
                onClick={() => loadPreset('delete', 'ex3.6c')}
                className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold hover:border-amber-400 transition-colors cursor-pointer"
              >
                Ex 3.6c: 'JOHN PAUL JONES' del 6, 5
              </button>
              <button
                onClick={() => loadPreset('replace', 'ex3.8a')}
                className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 font-bold hover:border-blue-400 transition-colors cursor-pointer"
              >
                Ex 3.8a: 'XABYABZ' rep 'AB' &rarr; 'C'
              </button>
              <button
                onClick={() => loadPreset('replace', 'prob3.12')}
                className="px-2 py-1 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] hover:border-blue-400 transition-colors cursor-pointer"
              >
                Prob 3.12: 'AAABBB' rep 'AA' &rarr; 'BB'
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. INSERT */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#991B1B] dark:text-[#EF4444] uppercase tracking-wider">
                  INSERT(T, K, S)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
                  Splice & Inject
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-mono text-stone-500">Text T:</label>
                  <input
                    type="text"
                    value={wpTarget}
                    onChange={(e) => setWpTarget(e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono text-stone-500">Pos K (1-based):</label>
                    <input
                      type="number"
                      min={1}
                      max={wpTarget.length + 1}
                      value={wpInsertPos}
                      onChange={(e) => setWpInsertPos(parseInt(e.target.value) || 1)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-stone-500">String S:</label>
                    <input
                      type="text"
                      value={wpInsertStr}
                      onChange={(e) => setWpInsertStr(e.target.value)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Mathematical Slice Decomposition */}
                <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-[11px] font-mono space-y-1">
                  <div className="text-stone-500">Slicing Decomposition:</div>
                  <div className="text-stone-700 dark:text-stone-300">
                    Prefix: <strong className="text-blue-600">'{evaluatedInsert.p1}'</strong>
                  </div>
                  <div className="text-stone-700 dark:text-stone-300">
                    Inserted: <strong className="text-rose-600">'{wpInsertStr}'</strong>
                  </div>
                  <div className="text-stone-700 dark:text-stone-300">
                    Suffix: <strong className="text-emerald-600">'{evaluatedInsert.p2}'</strong>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs font-mono">
                  <div className="text-stone-500">Resulting Text:</div>
                  <div className="text-sm font-bold text-[#991B1B] dark:text-[#EF4444] mt-0.5 break-all">
                    '{evaluatedInsert.result}'
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DELETE */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  DELETE(T, K, L)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                  Cut & Slide
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-mono text-stone-500">Text T:</label>
                  <input
                    type="text"
                    value={delTarget}
                    onChange={(e) => setDelTarget(e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono text-stone-500">Pos K (0 = None):</label>
                    <input
                      type="number"
                      min={0}
                      max={delTarget.length}
                      value={delPos}
                      onChange={(e) => setDelPos(parseInt(e.target.value) || 0)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-stone-500">Length L:</label>
                    <input
                      type="number"
                      min={0}
                      max={delTarget.length}
                      value={delLen}
                      onChange={(e) => setDelLen(parseInt(e.target.value) || 0)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Slicing decomposition */}
                <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-[11px] font-mono space-y-1">
                  <div className="text-stone-500">Slicing Decomposition:</div>
                  <div className="text-stone-700 dark:text-stone-300">
                    Retained Prefix: <strong className="text-blue-600">'{evaluatedDelete.p1}'</strong>
                  </div>
                  <div className="text-stone-700 dark:text-stone-300">
                    Excised / Deleted: <strong className="text-rose-600 line-through">'{evaluatedDelete.deleted}'</strong>
                  </div>
                  <div className="text-stone-700 dark:text-stone-300">
                    Retained Suffix: <strong className="text-emerald-600">'{evaluatedDelete.p2}'</strong>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs font-mono">
                  <div className="text-stone-500">Resulting Text:</div>
                  <div className="text-sm font-bold text-amber-800 dark:text-amber-200 mt-0.5 break-all">
                    '{evaluatedDelete.result}'
                  </div>
                </div>
              </div>
            </div>

            {/* 3. REPLACE */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  REPLACE(T, P1, P2)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                  INDEX + DEL + INS
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-mono text-stone-500">Text T:</label>
                  <input
                    type="text"
                    value={repTarget}
                    onChange={(e) => setRepTarget(e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono text-stone-500">Find P1:</label>
                    <input
                      type="text"
                      value={repP1}
                      onChange={(e) => setRepP1(e.target.value)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-stone-500">Replace with P2:</label>
                    <input
                      type="text"
                      value={repP2}
                      onChange={(e) => setRepP2(e.target.value)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Steps decomposition */}
                <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-[11px] font-mono space-y-1">
                  <div className="text-stone-500">Pipeline Execution:</div>
                  <div className="text-stone-700 dark:text-stone-300">
                    1. Find: <code>K := INDEX(T, '{repP1}') = {evaluatedReplace.k}</code>
                  </div>
                  <div className="text-stone-700 dark:text-stone-300">
                    2. Delete: <code>DELETE(T, {evaluatedReplace.k}, {repP1.length})</code>
                  </div>
                  <div className="text-stone-700 dark:text-stone-300">
                    3. Insert: <code>INSERT(T, {evaluatedReplace.k}, '{repP2}')</code>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs font-mono">
                  <div className="text-stone-500">Resulting Text:</div>
                  <div className="text-sm font-bold text-blue-800 dark:text-blue-200 mt-0.5 break-all">
                    '{evaluatedReplace.result}'
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. STORY DOCUMENT & PARAGRAPH COUNTER (PROCEDURE P3.14)               */}
      {/* ===================================================================== */}
      {subTab === 'storyDoc' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-stone-700 dark:text-stone-300">
            <strong>Lipschutz Problem 3.14 (Procedure PAR):</strong> A short story is represented as an array of 80-character records <code>LINE[1..N]</code>.
            Line 1 contains the <em>Title</em>, Line N contains the <em>Author</em>, and each new paragraph begins with an indentation of <strong>5 blank spaces</strong> (<code>SUBSTRING(LINE[K], 1, 5) = '     '</code>).
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B]">
            <div className="flex items-center gap-2">
              <button
                onClick={stepStoryScan}
                disabled={scanDone}
                className="px-3 py-1.5 rounded-lg bg-[#991B1B] text-white text-xs font-mono font-bold hover:bg-[#7F1D1D] disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Step Line K={Math.min(scanK + 1, storyLines.length)}</span>
              </button>

              <button
                onClick={autoScanStory}
                className="px-3 py-1.5 rounded-lg bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900 text-xs font-mono font-bold hover:bg-stone-700 transition-colors cursor-pointer"
              >
                Scan Entire Story
              </button>

              <button
                onClick={resetStoryScan}
                className="p-1.5 rounded-lg border border-[#E5E2D9] dark:border-[#38332B] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                title="Reset Scan"
              >
                <RotateCcw className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-stone-500">Current Pointer:</span>
                <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                  K = {scanK} / {storyLines.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Total Paragraphs (NUM): {scannedParagraphs.length}</span>
              </div>
            </div>
          </div>

          {/* Document Lines Terminal Viewer */}
          <div className="rounded-xl border border-[#E5E2D9] dark:border-[#38332B] bg-[#FAF8F5] dark:bg-[#141210] p-4 font-mono text-xs space-y-2">
            <div className="text-[11px] text-stone-400 border-b border-[#E5E2D9] dark:border-[#38332B] pb-2 flex items-center justify-between">
              <span>80-COLUMN FIXED-RECORD DOCUMENT ARRAY (LINE[1..N])</span>
              <span>Click "Toggle 5-Space Indent" on any line to test!</span>
            </div>

            <div className="space-y-1.5">
              {storyLines.map((line, idx) => {
                const k = idx + 1;
                const isCurrentlyInspected = scanK === k;
                const isParagraphStart = scannedParagraphs.includes(k);
                const has5Spaces = line.text.startsWith('     ');

                return (
                  <div
                    key={k}
                    className={`p-2 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isCurrentlyInspected
                        ? 'border-[#991B1B] bg-rose-50 dark:bg-rose-950/20 shadow-xs'
                        : isParagraphStart
                        ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/10'
                        : 'border-[#E5E2D9]/70 dark:border-[#38332B]/70 bg-white dark:bg-[#1E1B18]'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-x-auto">
                      <span className="w-16 shrink-0 text-stone-400 font-bold text-[11px]">
                        LINE[{k}]:
                      </span>

                      {/* Visual indicator of columns 1-5 */}
                      {k > 1 && k < storyLines.length && (
                        <span
                          className={`px-1 py-0.5 rounded text-[10px] shrink-0 ${
                            has5Spaces
                              ? 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold'
                              : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}
                          title="Columns 1 to 5"
                        >
                          {has5Spaces ? '[□□□□□]' : '[TEXT]'}
                        </span>
                      )}

                      <span
                        className={`truncate ${
                          line.isTitle
                            ? 'font-bold text-[#991B1B] dark:text-[#EF4444]'
                            : line.isAuthor
                            ? 'italic text-stone-500'
                            : 'text-[#1A1A1A] dark:text-[#EDE8DF]'
                        }`}
                      >
                        "{line.text}"
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {line.isTitle && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                          Title (LINE[1])
                        </span>
                      )}
                      {line.isAuthor && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
                          Author (LINE[N])
                        </span>
                      )}
                      {!line.isTitle && !line.isAuthor && (
                        <>
                          {isParagraphStart && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold">
                              PARAGRAPH START
                            </span>
                          )}
                          <button
                            onClick={() => toggleIndent(idx)}
                            className="text-[10px] px-2 py-0.5 rounded border border-[#E5E2D9] dark:border-[#38332B] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer text-stone-600 dark:text-stone-400"
                          >
                            {has5Spaces ? 'Remove Indent' : 'Add 5 Spaces'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. ISOLATED WORD SCANNER & BOUNDARY FILTER (P3.15 & P3.16)            */}
      {/* ===================================================================== */}
      {subTab === 'wordScanner' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-stone-700 dark:text-stone-300">
            <strong>The Word Boundary Invariant (Lipschutz Problem 3.15):</strong> Searching naively for the word <code>"THE"</code> using <code>INDEX(T, 'THE')</code> causes critical false positives: it matches <em>"FA-THE-R"</em>, <em>"MO-THE-R"</em>, and <em>"THE-ORY"</em>!
            To find only standalone words, the algorithm enforces 3 structural boundary cases:
            <strong> (1) BEG</strong> (<code>W // ' '</code>), <strong> (2) END</strong> (<code>' ' // W</code>), and <strong> (3) MID</strong> (<code>' ' // W // ' '</code>).
          </div>

          {/* Search Bar & Target Word */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-stone-500">Target Isolated Word W:</label>
                <input
                  type="text"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono font-bold uppercase"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono text-stone-500">Sample Line or Text to Scan:</label>
                <input
                  type="text"
                  value={sampleTextForScan}
                  onChange={(e) => setSampleTextForScan(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono"
                />
              </div>
            </div>

            {/* Scorecard */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono">
              <div className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Isolated Word Matches: {boundaryAnalysis.validCount}</span>
              </div>

              <div className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Embedded False-Positives Prevented: {boundaryAnalysis.rejectedCount}</span>
              </div>
            </div>
          </div>

          {/* Interactive Match Breakdown */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <span className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              Detailed Match & Boundary Validation Breakdown:
            </span>

            {boundaryAnalysis.matches.length === 0 ? (
              <div className="p-3 text-xs font-mono text-stone-500 bg-stone-50 dark:bg-[#181614] rounded-lg">
                No occurrences of "{searchWord}" found in the sample text.
              </div>
            ) : (
              <div className="space-y-2">
                {boundaryAnalysis.matches.map((m, idx) => {
                  const isAccepted = m.type !== 'EMBEDDED_REJECT';
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                        isAccepted
                          ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                          : 'border-amber-200 dark:border-amber-800/50 bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isAccepted ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                          }`}
                        >
                          {m.type}
                        </span>
                        <span className="font-bold">
                          Substring "{m.word}" @ index {m.start + 1}
                        </span>
                      </div>

                      <div className="text-[11px] opacity-90">{m.reason}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. WORD WRAP & LINE REFLOW ENGINE (PROGRAMMING PROBLEM 3.9)           */}
      {/* ===================================================================== */}
      {subTab === 'wordWrap' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-stone-700 dark:text-stone-300">
            <strong>Lipschutz Problem 3.9 (Word Wrapping Engine):</strong> When text is formatted to fit a fixed-width screen or page, words must <strong>never</strong> be split across line borders.
            The word-wrap algorithm inspects <code>SUBSTRING(TEXT, 1, W + 1)</code>: if column W + 1 is not a space, it searches backwards for the preceding space delimiter and cleanly reflows the word to the next line.
          </div>

          {/* Width Slider & Input */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                  Target Line Width (W):
                </span>
                <input
                  type="range"
                  min={20}
                  max={55}
                  value={wrapWidth}
                  onChange={(e) => setWrapWidth(parseInt(e.target.value))}
                  className="w-40 accent-[#991B1B] cursor-pointer"
                />
                <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-xs font-mono font-bold">
                  W = {wrapWidth} chars
                </span>
              </div>

              <button
                onClick={() =>
                  setRawWrapText(
                    'IN COMPUTER SCIENCE AND WORD PROCESSING, A TEXT MUST BE DIVIDED INTO CONSECUTIVE LINES WITHOUT CUTTING WORDS IN HALF ACROSS BORDERS.'
                  )
                }
                className="text-xs font-mono text-[#991B1B] hover:underline cursor-pointer"
              >
                Reset Default Text
              </button>
            </div>

            <div>
              <label className="text-[11px] font-mono text-stone-500">Raw Input Text Stream:</label>
              <textarea
                rows={2}
                value={rawWrapText}
                onChange={(e) => setRawWrapText(e.target.value)}
                className="w-full mt-1 p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono resize-y"
              />
            </div>
          </div>

          {/* Comparison Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Smart Word Wrapping */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-emerald-300 dark:border-emerald-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Lipschutz Smart Word Wrapping</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                  {smartWrappedLines.length} Clean Lines
                </span>
              </div>

              <div className="space-y-1.5 bg-[#FAF8F5] dark:bg-[#141210] p-3 rounded-lg border border-[#E5E2D9] dark:border-[#38332B] font-mono text-xs">
                {smartWrappedLines.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 border-b border-stone-200/50 dark:border-stone-800/50 pb-1 last:border-b-0 last:pb-0">
                    <span className="text-[#1A1A1A] dark:text-[#EDE8DF]">
                      "{item.lineText}"
                    </span>
                    <span className="text-[10px] text-stone-400 shrink-0">
                      {item.lineText.length}/{wrapWidth} cols
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
                &check; No words chopped! Slices backward to delimiter before wrapping.
              </div>
            </div>

            {/* Naive Truncation */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#201D1A] border border-rose-300 dark:border-rose-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Naive Fixed-Column Truncation</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300">
                  {naiveTruncatedLines.length} Rigid Lines
                </span>
              </div>

              <div className="space-y-1.5 bg-[#FAF8F5] dark:bg-[#141210] p-3 rounded-lg border border-[#E5E2D9] dark:border-[#38332B] font-mono text-xs">
                {naiveTruncatedLines.map((line, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 border-b border-stone-200/50 dark:border-stone-800/50 pb-1 last:border-b-0 last:pb-0">
                    <span className="text-[#1A1A1A] dark:text-[#EDE8DF]">
                      "{line}"
                    </span>
                    <span className="text-[10px] text-stone-400 shrink-0">
                      {line.length}/{wrapWidth} cols
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] font-mono text-rose-700 dark:text-rose-300">
                &cross; Words chopped arbitrarily across boundaries (e.g. "STRUC-", "PROC-").
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. SOLVED BOOK PROBLEMS EXPLORER                                     */}
      {/* ===================================================================== */}
      {subTab === 'bookProblems' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono text-stone-700 dark:text-stone-300 flex items-center justify-between">
            <div>
              <strong>Seymour Lipschutz Chapter 3 Problem Suite:</strong> Interactive collection of canonical textbook problems on string primitives, word processing transformations, and document algorithms.
            </div>
          </div>

          <div className="space-y-3">
            {bookProblems.map((prob) => {
              const isExpanded = expandedProbId === prob.id;

              return (
                <div
                  key={prob.id}
                  className="rounded-xl border border-[#E5E2D9] dark:border-[#38332B] bg-white dark:bg-[#201D1A] overflow-hidden transition-all"
                >
                  <div
                    onClick={() => setExpandedProbId(isExpanded ? null : prob.id)}
                    className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-50 dark:hover:bg-[#262320] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 text-[11px] font-mono font-bold">
                        {prob.bookRef}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
                        {prob.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                        {prob.difficulty}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-stone-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t border-[#E5E2D9] dark:border-[#38332B] bg-[#FAF8F5] dark:bg-[#181614] space-y-3 font-mono text-xs">
                      {/* Question */}
                      <div className="p-3 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B]">
                        <span className="text-[11px] text-stone-400 font-bold block mb-1">
                          PROBLEM PROMPT:
                        </span>
                        <div className="text-stone-800 dark:text-stone-200 whitespace-pre-line leading-relaxed">
                          {prob.question}
                        </div>
                      </div>

                      {/* Solution */}
                      <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50">
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                          COMPLETE WORKED SOLUTION & DERIVATION:
                        </span>
                        <div className="text-emerald-900 dark:text-emerald-100 whitespace-pre-line leading-relaxed">
                          {prob.solution}
                        </div>
                      </div>

                      {/* Action Button */}
                      {prob.onLoadAction && prob.actionLabel && (
                        <button
                          onClick={prob.onLoadAction}
                          className="px-3 py-1.5 rounded-lg bg-[#991B1B] text-white text-xs font-mono font-bold hover:bg-[#7F1D1D] transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{prob.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
