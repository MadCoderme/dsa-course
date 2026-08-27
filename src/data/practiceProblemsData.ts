import { TopicId, PracticeProblem } from '../types';

export const TOPIC_PRACTICE_PROBLEMS: Record<TopicId, PracticeProblem[]> = {
  'course-overview': [
    {
      id: 'ov-1',
      title: 'LeetCode 75 Study Plan',
      platform: 'LeetCode',
      difficulty: 'Easy / Medium',
      url: 'https://leetcode.com/studyplan/leetcode-75/',
      description: 'Foundational study plan covering linear structures, binary trees, heaps, and graph traversals.',
      keyPattern: 'Foundational DSA Patterns',
      acceptanceOrRating: 'Curated Plan',
      tags: ['study-plan', 'fundamentals', 'curriculum']
    },
    {
      id: 'ov-2',
      title: 'CSES Problem Set (Introductory & Trees & Graphs)',
      platform: 'CSES',
      difficulty: 'Easy / Medium',
      url: 'https://cses.fi/problemset/',
      description: 'The standard benchmark set containing curated classical tree and graph problems.',
      keyPattern: 'Standard Data Structure Archetypes',
      acceptanceOrRating: 'Benchmark',
      tags: ['cses', 'benchmark', 'classical']
    },
    {
      id: 'ov-3',
      title: 'Codeforces ITMO Academy: Pilot Course',
      platform: 'Codeforces',
      difficulty: '800-1400',
      url: 'https://codeforces.com/edu/courses',
      description: 'Educational sections covering Disjoint Set Union, Binary Search, and Graph representations.',
      keyPattern: 'Data Structure Foundations',
      acceptanceOrRating: 'ITMO Academy',
      tags: ['itmo', 'theory', 'invariants']
    }
  ],

  'vector': [
    {
      id: 'vec-1',
      title: 'Concatenation of Array',
      platform: 'LeetCode',
      problemNumber: '1929',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/concatenation-of-array/',
      description: 'Given an integer array nums of length n, create an array ans of length 2n by copying nums twice.',
      keyPattern: 'Contiguous Array Allocation & Index Mapping',
      acceptanceOrRating: '89.6% Acc',
      tags: ['array', 'vector', 'allocation']
    },
    {
      id: 'vec-2',
      title: 'Remove Duplicates from Sorted Array',
      platform: 'LeetCode',
      problemNumber: '26',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
      description: 'Remove duplicates in-place from a sorted array such that each unique element appears once, returning new size k.',
      keyPattern: 'In-Place Element Shifting & Two Pointers',
      acceptanceOrRating: '57.3% Acc',
      tags: ['array', 'two-pointers', 'in-place']
    },
    {
      id: 'vec-3',
      title: 'Remove Element',
      platform: 'LeetCode',
      problemNumber: '27',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/remove-element/',
      description: 'Remove all occurrences of val in nums in-place, shifting non-val elements forward and returning new size.',
      keyPattern: 'Sequential Element Overwriting & Shifting',
      acceptanceOrRating: '59.2% Acc',
      tags: ['array', 'vector', 'in-place']
    },
    {
      id: 'vec-4',
      title: 'Move Zeroes',
      platform: 'LeetCode',
      problemNumber: '283',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/move-zeroes/',
      description: 'Given an integer array nums, move all 0s to the end while maintaining the relative order of non-zero elements.',
      keyPattern: 'Linear Array Compaction & In-Place Write Pointer',
      acceptanceOrRating: '62.1% Acc',
      tags: ['array', 'two-pointers', 'shifting']
    },
    {
      id: 'vec-5',
      title: 'Rotate Array',
      platform: 'LeetCode',
      problemNumber: '189',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/rotate-array/',
      description: 'Given an integer array nums, rotate the array to the right by k steps using in-place block shifts or 3-step reversal.',
      keyPattern: 'Cyclic Shifts / 3-Step Array Reversal',
      acceptanceOrRating: '41.2% Acc',
      tags: ['array', 'vector', 'rotation']
    },
    {
      id: 'vec-6',
      title: 'Next Round',
      platform: 'Codeforces',
      problemNumber: '158A',
      difficulty: '800',
      url: 'https://codeforces.com/problemset/problem/158/A',
      description: 'Calculate how many participants advance by iterating through the score array and comparing to the k-th place participant.',
      keyPattern: 'Array Linear Traversal & Threshold Check',
      acceptanceOrRating: 'Rating 800',
      tags: ['implementation', 'arrays']
    },
    {
      id: 'vec-7',
      title: 'Team',
      platform: 'Codeforces',
      problemNumber: '231A',
      difficulty: '800',
      url: 'https://codeforces.com/problemset/problem/231/A',
      description: 'Read 2D array row elements and count how many rows have at least two positive indicators.',
      keyPattern: '2D Array Row Iteration',
      acceptanceOrRating: 'Rating 800',
      tags: ['arrays', 'implementation']
    }
  ],

  'list': [
    {
      id: 'list-1',
      title: 'Reverse Linked List',
      platform: 'LeetCode',
      problemNumber: '206',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/reverse-linked-list/',
      description: 'Given the head of a singly linked list, reverse the list iteratively and return the reversed list.',
      keyPattern: '3-Pointer Iterative Node Inversion (prev, curr, next)',
      acceptanceOrRating: '77.8% Acc',
      tags: ['linked-list', 'pointers', 'reversal']
    },
    {
      id: 'list-2',
      title: 'Merge Two Sorted Lists',
      platform: 'LeetCode',
      problemNumber: '21',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
      description: 'Merge two sorted singly linked lists by splicing together their existing nodes without creating duplicate nodes.',
      keyPattern: 'Dummy Head Pointer & Linear Splicing',
      acceptanceOrRating: '65.3% Acc',
      tags: ['linked-list', 'pointers', 'merge']
    },
    {
      id: 'list-3',
      title: 'Middle of the Linked List',
      platform: 'LeetCode',
      problemNumber: '876',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/middle-of-the-linked-list/',
      description: 'Given the head of a singly linked list, return the middle node using slow and fast pointers in a single pass.',
      keyPattern: 'Fast & Slow Pointer Traversal (Tortoise & Hare)',
      acceptanceOrRating: '79.2% Acc',
      tags: ['linked-list', 'two-pointers']
    },
    {
      id: 'list-4',
      title: 'Delete Node in a Linked List',
      platform: 'LeetCode',
      problemNumber: '237',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/delete-node-in-a-linked-list/',
      description: 'Delete a given non-tail node in a singly linked list with only access to that node.',
      keyPattern: 'Copy Next Node Value & Pointer Bypass',
      acceptanceOrRating: '80.5% Acc',
      tags: ['linked-list', 'node-deletion']
    },
    {
      id: 'list-5',
      title: 'Linked List Cycle',
      platform: 'LeetCode',
      problemNumber: '141',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/linked-list-cycle/',
      description: 'Given head, determine if the linked list has a cycle in it using O(1) memory.',
      keyPattern: 'Fast/Slow Pointer Cycle Detection',
      acceptanceOrRating: '51.4% Acc',
      tags: ['linked-list', 'two-pointers']
    },
    {
      id: 'list-6',
      title: 'Design Linked List',
      platform: 'LeetCode',
      problemNumber: '707',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/design-linked-list/',
      description: 'Implement a Singly or Doubly Linked List class with get, addAtHead, addAtTail, addAtIndex, and deleteAtIndex.',
      keyPattern: 'Complete Linked List ADT Implementation',
      acceptanceOrRating: '28.1% Acc',
      tags: ['linked-list', 'design', 'adt']
    },
    {
      id: 'list-7',
      title: 'Remove Linked List Elements',
      platform: 'LeetCode',
      problemNumber: '203',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/remove-linked-list-elements/',
      description: 'Given the head of a linked list and an integer val, remove all nodes of the linked list that have Node.val == val.',
      keyPattern: 'Dummy Sentinel Head & Pointer Unlinking',
      acceptanceOrRating: '50.1% Acc',
      tags: ['linked-list', 'pointers']
    }
  ],

  'stack': [
    {
      id: 'stk-1',
      title: 'Valid Parentheses',
      platform: 'LeetCode',
      problemNumber: '20',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/valid-parentheses/',
      description: 'Given a string containing just the characters (, ), {, }, [ and ], determine if the input string is valid.',
      keyPattern: 'LIFO Stack Matching for Nested Brackets',
      acceptanceOrRating: '41.1% Acc',
      tags: ['stack', 'string', 'brackets']
    },
    {
      id: 'stk-2',
      title: 'Min Stack',
      platform: 'LeetCode',
      problemNumber: '155',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/min-stack/',
      description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.',
      keyPattern: 'Auxiliary Minimum Stack / Pair Storage',
      acceptanceOrRating: '54.9% Acc',
      tags: ['stack', 'design', 'adt']
    },
    {
      id: 'stk-3',
      title: 'Evaluate Reverse Polish Notation',
      platform: 'LeetCode',
      problemNumber: '150',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
      description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation (Postfix) using a stack.',
      keyPattern: 'Postfix Expression Evaluation via Operand Stack',
      acceptanceOrRating: '52.7% Acc',
      tags: ['stack', 'math', 'postfix']
    },
    {
      id: 'stk-4',
      title: 'Implement Queue using Stacks',
      platform: 'LeetCode',
      problemNumber: '232',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/implement-queue-using-stacks/',
      description: 'Implement a first-in-first-out (FIFO) queue using only two standard LIFO stacks.',
      keyPattern: 'Dual Stack Buffer (In-Stack / Out-Stack Transfer)',
      acceptanceOrRating: '67.4% Acc',
      tags: ['stack', 'queue', 'design']
    },
    {
      id: 'stk-5',
      title: 'Backspace String Compare',
      platform: 'LeetCode',
      problemNumber: '844',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/backspace-string-compare/',
      description: 'Given two strings s and t, return true if they are equal when both are typed into empty text editors (# means backspace).',
      keyPattern: 'Character Stack Push/Pop Simulation',
      acceptanceOrRating: '49.8% Acc',
      tags: ['stack', 'simulation']
    },
    {
      id: 'stk-6',
      title: 'Baseball Game',
      platform: 'LeetCode',
      problemNumber: '682',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/baseball-game/',
      description: 'Keep score for a baseball game with operations +, D, C and integer scores using a stack record.',
      keyPattern: 'Stack State Record Tracking',
      acceptanceOrRating: '76.4% Acc',
      tags: ['stack', 'simulation']
    }
  ],

  'queue': [
    {
      id: 'que-1',
      title: 'Design Circular Queue',
      platform: 'LeetCode',
      problemNumber: '622',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/design-circular-queue/',
      description: 'Design a circular queue data structure using a fixed-size array and modulo arithmetic wrap-around.',
      keyPattern: 'Modulo Ring Buffer Pointers ((rear + 1) % capacity)',
      acceptanceOrRating: '52.4% Acc',
      tags: ['queue', 'circular-queue', 'design', 'array']
    },
    {
      id: 'que-2',
      title: 'Number of Recent Calls',
      platform: 'LeetCode',
      problemNumber: '933',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/number-of-recent-calls/',
      description: 'Count the number of recent requests within a 3000 milliseconds time window using a FIFO queue.',
      keyPattern: 'Sliding Time-Window FIFO Queue Eviction',
      acceptanceOrRating: '75.6% Acc',
      tags: ['queue', 'design', 'sliding-window']
    },
    {
      id: 'que-3',
      title: 'Implement Stack using Queues',
      platform: 'LeetCode',
      problemNumber: '225',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/implement-stack-using-queues/',
      description: 'Implement a last-in-first-out (LIFO) stack using only standard FIFO queues.',
      keyPattern: 'Queue Rotation on Push / Single-Queue Rotation',
      acceptanceOrRating: '65.2% Acc',
      tags: ['queue', 'stack', 'design']
    },
    {
      id: 'que-4',
      title: 'Number of Students Unable to Eat Lunch',
      platform: 'LeetCode',
      problemNumber: '1700',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/',
      description: 'Simulate student queue preferences matching against a sandwich stack until no matching student remains.',
      keyPattern: 'Direct Queue FIFO Pop and Re-push Simulation',
      acceptanceOrRating: '78.9% Acc',
      tags: ['queue', 'array', 'simulation']
    },
    {
      id: 'que-5',
      title: 'Dota2 Senate',
      platform: 'LeetCode',
      problemNumber: '649',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/dota2-senate/',
      description: 'Simulate a round-based voting process with Radiant and Dire queues where each senator bans the next opponent.',
      keyPattern: 'Dual Circular Queue Turn Simulation',
      acceptanceOrRating: '49.1% Acc',
      tags: ['queue', 'greedy', 'simulation']
    }
  ],

  'priority-queue': [
    {
      id: 'pq-1',
      title: 'Kth Largest Element in an Array',
      platform: 'LeetCode',
      problemNumber: '215',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      description: 'Find the kth largest element in an unsorted array using a min-heap of size k.',
      keyPattern: 'Min-Heap of Size K (std::priority_queue with greater<int>)',
      acceptanceOrRating: '67.8% Acc',
      tags: ['heap', 'priority-queue', 'sorting']
    },
    {
      id: 'pq-2',
      title: 'Last Stone Weight',
      platform: 'LeetCode',
      problemNumber: '1046',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/last-stone-weight/',
      description: 'Simulate smashing the two heaviest stones in each turn until at most one stone remains.',
      keyPattern: 'Max-Heap Extraction & Re-insertion',
      acceptanceOrRating: '65.9% Acc',
      tags: ['heap', 'priority-queue', 'simulation']
    },
    {
      id: 'pq-3',
      title: 'Kth Largest Element in a Stream',
      platform: 'LeetCode',
      problemNumber: '703',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
      description: 'Design a class to find the kth largest element in a stream of integers using a min-heap of capacity k.',
      keyPattern: 'Fixed-Size K Min-Heap Stream Maintenance',
      acceptanceOrRating: '58.7% Acc',
      tags: ['heap', 'priority-queue', 'design']
    },
    {
      id: 'pq-4',
      title: 'Relative Ranks',
      platform: 'LeetCode',
      problemNumber: '506',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/relative-ranks/',
      description: 'Assign medals and placement ranks to athletes based on scores using a max-priority queue.',
      keyPattern: 'Max-Heap Score & Index Extraction',
      acceptanceOrRating: '71.2% Acc',
      tags: ['heap', 'priority-queue', 'sorting']
    },
    {
      id: 'pq-5',
      title: 'Seat Reservation Manager',
      platform: 'LeetCode',
      problemNumber: '1845',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/seat-reservation-manager/',
      description: 'Design a system that reserves the smallest-numbered available seat and unreserves seats.',
      keyPattern: 'Min-Heap of Available Seat Indices',
      acceptanceOrRating: '84.3% Acc',
      tags: ['heap', 'priority-queue', 'design']
    },
    {
      id: 'pq-6',
      title: 'Minimum Amount of Time to Fill Cups',
      platform: 'LeetCode',
      problemNumber: '2335',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups/',
      description: 'Given cold, warm, and hot cup demands, fill two different cups per second until all cups are filled.',
      keyPattern: 'Max-Heap Top-2 Greedy Triage',
      acceptanceOrRating: '60.1% Acc',
      tags: ['heap', 'priority-queue', 'greedy']
    }
  ],

  'set': [
    {
      id: 'set-1',
      title: 'Contains Duplicate',
      platform: 'LeetCode',
      problemNumber: '217',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/contains-duplicate/',
      description: 'Given an integer array nums, return true if any value appears at least twice in the array using a set.',
      keyPattern: 'Unordered Set Insertion & Immediate Duplicate Lookup',
      acceptanceOrRating: '62.4% Acc',
      tags: ['hash-set', 'set', 'array']
    },
    {
      id: 'set-2',
      title: 'Intersection of Two Arrays',
      platform: 'LeetCode',
      problemNumber: '349',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/intersection-of-two-arrays/',
      description: 'Given two integer arrays nums1 and nums2, return an array of their intersection with unique elements.',
      keyPattern: 'Set Uniqueness & Membership Testing',
      acceptanceOrRating: '75.2% Acc',
      tags: ['set', 'hash-table', 'intersection']
    },
    {
      id: 'set-3',
      title: 'Jewels and Stones',
      platform: 'LeetCode',
      problemNumber: '771',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/jewels-and-stones/',
      description: 'Determine how many stones you have that are also jewels by looking up characters in a hash set.',
      keyPattern: 'O(1) Set Membership Lookup',
      acceptanceOrRating: '88.9% Acc',
      tags: ['hash-set', 'string', 'membership']
    },
    {
      id: 'set-4',
      title: 'Unique Number of Occurrences',
      platform: 'LeetCode',
      problemNumber: '1207',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/unique-number-of-occurrences/',
      description: 'Given an array of integers arr, return true if the number of occurrences of each value in the array is unique.',
      keyPattern: 'Frequency Counting + Set Size Verification',
      acceptanceOrRating: '77.4% Acc',
      tags: ['hash-set', 'hash-map', 'set']
    },
    {
      id: 'set-5',
      title: 'Find the Difference of Two Arrays',
      platform: 'LeetCode',
      problemNumber: '2215',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/find-the-difference-of-two-arrays/',
      description: 'Given two 0-indexed integer arrays nums1 and nums2, return a list of distinct elements present in one array but not the other.',
      keyPattern: 'Set Difference Operation',
      acceptanceOrRating: '79.1% Acc',
      tags: ['set', 'hash-set', 'array']
    }
  ],

  'map': [
    {
      id: 'map-1',
      title: 'Two Sum (Hash Map Solution)',
      platform: 'LeetCode',
      problemNumber: '1',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/two-sum/',
      description: 'Given an array of integers nums and an integer target, find two numbers that add up to target in O(N) using a hash map.',
      keyPattern: 'One-Pass Hash Map Complement (target - num) Lookup',
      acceptanceOrRating: '53.6% Acc',
      tags: ['hash-map', 'array', 'lookup']
    },
    {
      id: 'map-2',
      title: 'Ransom Note',
      platform: 'LeetCode',
      problemNumber: '383',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/ransom-note/',
      description: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine.',
      keyPattern: 'Character Frequency Map Counting',
      acceptanceOrRating: '62.4% Acc',
      tags: ['hash-map', 'string', 'counting']
    },
    {
      id: 'map-3',
      title: 'First Unique Character in a String',
      platform: 'LeetCode',
      problemNumber: '387',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
      description: 'Find the first non-repeating character in a string and return its index using a frequency map.',
      keyPattern: 'Two-Pass Frequency Map Tracking',
      acceptanceOrRating: '61.7% Acc',
      tags: ['hash-map', 'string', 'frequency']
    },
    {
      id: 'map-4',
      title: 'Valid Anagram',
      platform: 'LeetCode',
      problemNumber: '242',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/valid-anagram/',
      description: 'Given two strings s and t, return true if t is an anagram of s by verifying identical character frequency maps.',
      keyPattern: 'Character Frequency Hash Table Comparison',
      acceptanceOrRating: '65.1% Acc',
      tags: ['hash-map', 'string', 'counting']
    },
    {
      id: 'map-5',
      title: 'Isomorphic Strings',
      platform: 'LeetCode',
      problemNumber: '205',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/isomorphic-strings/',
      description: 'Determine if two strings are isomorphic by checking if characters in s can be replaced to get t via a 1-to-1 map.',
      keyPattern: 'Bidirectional Key-Value Mapping',
      acceptanceOrRating: '45.8% Acc',
      tags: ['hash-map', 'string', 'mapping']
    },
    {
      id: 'map-6',
      title: 'Word Pattern',
      platform: 'LeetCode',
      problemNumber: '290',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/word-pattern/',
      description: 'Given a pattern and a string s, find if s follows the same pattern using a bijective hash map.',
      keyPattern: 'Bijection Key-Value Hash Map',
      acceptanceOrRating: '42.3% Acc',
      tags: ['hash-map', 'string', 'pattern']
    }
  ],

  'tree': [
    {
      id: 'tree-1',
      title: 'Maximum Depth of Binary Tree',
      platform: 'LeetCode',
      problemNumber: '104',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
      description: 'Given the root of a binary tree, return its maximum depth: 1 + max(depth(left), depth(right)).',
      keyPattern: 'Recursive Depth Formula (1 + max(L, R))',
      acceptanceOrRating: '76.2% Acc',
      tags: ['binary-tree', 'recursion', 'depth']
    },
    {
      id: 'tree-2',
      title: 'Invert Binary Tree',
      platform: 'LeetCode',
      problemNumber: '226',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/invert-binary-tree/',
      description: 'Given the root of a binary tree, invert the tree by swapping the left and right subtrees recursively.',
      keyPattern: 'Recursive Left-Right Pointer Swapping',
      acceptanceOrRating: '78.5% Acc',
      tags: ['binary-tree', 'recursion', 'pointers']
    },
    {
      id: 'tree-3',
      title: 'Same Tree',
      platform: 'LeetCode',
      problemNumber: '100',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/same-tree/',
      description: 'Given the roots of two binary trees p and q, check if they are structurally identical and have the same node values.',
      keyPattern: 'Simultaneous Structural & Value Recursion',
      acceptanceOrRating: '62.5% Acc',
      tags: ['binary-tree', 'recursion', 'equivalence']
    },
    {
      id: 'tree-4',
      title: 'Symmetric Tree',
      platform: 'LeetCode',
      problemNumber: '101',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/symmetric-tree/',
      description: 'Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).',
      keyPattern: 'Mirror Pair Verification (t1.left == t2.right)',
      acceptanceOrRating: '57.3% Acc',
      tags: ['binary-tree', 'recursion', 'symmetry']
    },
    {
      id: 'tree-5',
      title: 'Count Complete Tree Nodes',
      platform: 'LeetCode',
      problemNumber: '222',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/count-complete-tree-nodes/',
      description: 'Given the root of a complete binary tree, calculate the number of nodes using tree properties.',
      keyPattern: 'Complete Binary Tree Height & Node Counting',
      acceptanceOrRating: '65.4% Acc',
      tags: ['binary-tree', 'complete-tree', 'recursion']
    },
    {
      id: 'tree-6',
      title: 'Balanced Binary Tree',
      platform: 'LeetCode',
      problemNumber: '110',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/balanced-binary-tree/',
      description: 'Determine if a binary tree is height-balanced where the depth of the two subtrees never differs by more than 1.',
      keyPattern: 'Bottom-Up Height Verification (|hL - hR| <= 1)',
      acceptanceOrRating: '52.7% Acc',
      tags: ['binary-tree', 'recursion', 'balance']
    }
  ],

  'tree-traversals': [
    {
      id: 'trav-1',
      title: 'Binary Tree Preorder Traversal',
      platform: 'LeetCode',
      problemNumber: '144',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/',
      description: 'Given the root of a binary tree, return the preorder traversal of its nodes values (Root, Left, Right).',
      keyPattern: 'Preorder Sequence (Root -> Left -> Right)',
      acceptanceOrRating: '71.5% Acc',
      tags: ['binary-tree', 'traversal', 'preorder']
    },
    {
      id: 'trav-2',
      title: 'Binary Tree Inorder Traversal',
      platform: 'LeetCode',
      problemNumber: '94',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
      description: 'Given the root of a binary tree, return the inorder traversal of its nodes values (Left, Root, Right).',
      keyPattern: 'Inorder Sequence (Left -> Root -> Right)',
      acceptanceOrRating: '77.1% Acc',
      tags: ['binary-tree', 'traversal', 'inorder']
    },
    {
      id: 'trav-3',
      title: 'Binary Tree Postorder Traversal',
      platform: 'LeetCode',
      problemNumber: '145',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/binary-tree-postorder-traversal/',
      description: 'Given the root of a binary tree, return the postorder traversal of its nodes values (Left, Right, Root).',
      keyPattern: 'Postorder Sequence (Left -> Right -> Root)',
      acceptanceOrRating: '72.3% Acc',
      tags: ['binary-tree', 'traversal', 'postorder']
    },
    {
      id: 'trav-4',
      title: 'Binary Tree Level Order Traversal',
      platform: 'LeetCode',
      problemNumber: '102',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      description: 'Given the root of a binary tree, return the level order traversal of its nodes values (level by level using a queue).',
      keyPattern: 'FIFO Queue Level-by-Level Tree BFS',
      acceptanceOrRating: '67.9% Acc',
      tags: ['binary-tree', 'traversal', 'bfs', 'queue']
    },
    {
      id: 'trav-5',
      title: 'Construct Binary Tree from Preorder and Inorder Traversal',
      platform: 'LeetCode',
      problemNumber: '105',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
      description: 'Given two integer arrays preorder and inorder, construct and return the unique binary tree.',
      keyPattern: 'Preorder Root Identification + Inorder Subtree Splitting',
      acceptanceOrRating: '64.5% Acc',
      tags: ['binary-tree', 'reconstruction', 'divide-and-conquer']
    },
    {
      id: 'trav-6',
      title: 'Construct Binary Tree from Inorder and Postorder Traversal',
      platform: 'LeetCode',
      problemNumber: '106',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/',
      description: 'Given two integer arrays inorder and postorder, construct and return the unique binary tree.',
      keyPattern: 'Postorder Last-Element Root + Inorder Subtree Boundary Partitioning',
      acceptanceOrRating: '63.2% Acc',
      tags: ['binary-tree', 'reconstruction']
    }
  ],

  'expression-threaded-trees': [
    {
      id: 'exp-1',
      title: 'Evaluate Boolean Binary Tree',
      platform: 'LeetCode',
      problemNumber: '2331',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/evaluate-boolean-binary-tree/',
      description: 'Given the root of a full binary tree with boolean leaf values and operator nodes (OR=2, AND=3), evaluate the expression.',
      keyPattern: 'Postorder Expression Tree Evaluation',
      acceptanceOrRating: '83.9% Acc',
      tags: ['binary-tree', 'expression-tree', 'recursion']
    },
    {
      id: 'exp-2',
      title: 'Flatten Binary Tree to Linked List',
      platform: 'LeetCode',
      problemNumber: '114',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/',
      description: 'Flatten the tree into a "linked list" in-place using right pointers following the preorder traversal sequence.',
      keyPattern: 'Preorder Pointer Relinking (Thread-like Transformation)',
      acceptanceOrRating: '65.8% Acc',
      tags: ['binary-tree', 'pointers', 'threaded']
    },
    {
      id: 'exp-3',
      title: 'Increasing Order Search Tree',
      platform: 'LeetCode',
      problemNumber: '897',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/increasing-order-search-tree/',
      description: 'Rearrange the BST in in-order so that the leftmost node becomes the new root and every node has only a right child.',
      keyPattern: 'Inorder Relinking with Thread-like Right Child Pointers',
      acceptanceOrRating: '78.9% Acc',
      tags: ['binary-tree', 'bst', 'inorder']
    },
    {
      id: 'exp-4',
      title: 'Populating Next Right Pointers in Each Node',
      platform: 'LeetCode',
      problemNumber: '116',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/',
      description: 'Populate each next pointer to point to its next right node, establishing horizontal thread links across levels.',
      keyPattern: 'Horizontal Level Thread Linking',
      acceptanceOrRating: '63.4% Acc',
      tags: ['binary-tree', 'pointers', 'threaded']
    }
  ],

  'bst-rbt': [
    {
      id: 'bst-1',
      title: 'Search in a Binary Search Tree',
      platform: 'LeetCode',
      problemNumber: '700',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/',
      description: 'Find the node in the BST that the node\'s value equals val and return the subtree rooted with that node.',
      keyPattern: 'BST Property Branching (val < root->val ? left : right)',
      acceptanceOrRating: '80.3% Acc',
      tags: ['bst', 'binary-search-tree', 'recursion']
    },
    {
      id: 'bst-2',
      title: 'Insert into a Binary Search Tree',
      platform: 'LeetCode',
      problemNumber: '701',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/',
      description: 'Insert a value into a BST and return the root node of the BST after the insertion.',
      keyPattern: 'BST Leaf Insertion Path Navigation',
      acceptanceOrRating: '74.2% Acc',
      tags: ['bst', 'insertion', 'recursion']
    },
    {
      id: 'bst-3',
      title: 'Delete Node in a BST',
      platform: 'LeetCode',
      problemNumber: '450',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/delete-node-in-a-bst/',
      description: 'Delete a node with given key in a BST handling the 3 fundamental cases (leaf, 1 child, 2 children with inorder successor).',
      keyPattern: 'The 3 BST Deletion Cases & Inorder Successor Replacement',
      acceptanceOrRating: '52.1% Acc',
      tags: ['bst', 'deletion', 'inorder-successor']
    },
    {
      id: 'bst-4',
      title: 'Validate Binary Search Tree',
      platform: 'LeetCode',
      problemNumber: '98',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/validate-binary-search-tree/',
      description: 'Determine if a given binary tree is a valid BST where all nodes satisfy strict lower and upper range bounds.',
      keyPattern: 'Range Bound Invariants (min < node->val < max)',
      acceptanceOrRating: '33.2% Acc',
      tags: ['bst', 'validation', 'recursion']
    },
    {
      id: 'bst-5',
      title: 'Lowest Common Ancestor of a Binary Search Tree',
      platform: 'LeetCode',
      problemNumber: '235',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
      description: 'Find the lowest common ancestor (LCA) node of two given nodes in a BST.',
      keyPattern: 'BST Value Split Point Identification',
      acceptanceOrRating: '65.7% Acc',
      tags: ['bst', 'lca', 'recursion']
    },
    {
      id: 'bst-6',
      title: 'Minimum Absolute Difference in BST',
      platform: 'LeetCode',
      problemNumber: '530',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/',
      description: 'Given the root of a BST, return the minimum absolute difference between the values of any two different nodes.',
      keyPattern: 'Inorder Traversal Monotonic Difference',
      acceptanceOrRating: '58.9% Acc',
      tags: ['bst', 'inorder', 'traversal']
    }
  ],

  'avl-tree': [
    {
      id: 'avl-1',
      title: 'Balanced Binary Tree',
      platform: 'LeetCode',
      problemNumber: '110',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/balanced-binary-tree/',
      description: 'Check if a binary tree is height-balanced, verifying the AVL balance factor condition: |height(left) - height(right)| <= 1.',
      keyPattern: 'AVL Balance Factor Calculation (|BF| <= 1)',
      acceptanceOrRating: '52.7% Acc',
      tags: ['avl-tree', 'balance-factor', 'height']
    },
    {
      id: 'avl-2',
      title: 'Balance a Binary Search Tree',
      platform: 'LeetCode',
      problemNumber: '1382',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/balance-a-binary-search-tree/',
      description: 'Given the root of a binary search tree, return a balanced binary search tree with the same node values.',
      keyPattern: 'Inorder Extraction & Middle Element Median Reconstruction',
      acceptanceOrRating: '82.4% Acc',
      tags: ['avl-tree', 'bst', 'balancing']
    },
    {
      id: 'avl-3',
      title: 'Convert Sorted Array to Binary Search Tree',
      platform: 'LeetCode',
      problemNumber: '108',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/',
      description: 'Convert an integer array nums where elements are sorted in ascending order to a height-balanced BST.',
      keyPattern: 'Divide-and-Conquer Median Selection for Height Balance',
      acceptanceOrRating: '72.1% Acc',
      tags: ['avl-tree', 'bst', 'height-balanced']
    },
    {
      id: 'avl-4',
      title: 'Convert Sorted List to Binary Search Tree',
      platform: 'LeetCode',
      problemNumber: '109',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/',
      description: 'Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height-balanced BST.',
      keyPattern: 'Fast/Slow Pointer Median Finding + Balanced Subtree Recursion',
      acceptanceOrRating: '62.4% Acc',
      tags: ['avl-tree', 'linked-list', 'bst']
    }
  ],

  'red-black-tree': [
    {
      id: 'rbt-1',
      title: 'My Calendar I',
      platform: 'LeetCode',
      problemNumber: '729',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/my-calendar-i/',
      description: 'Implement a calendar to book events without double booking using balanced ordered set/map lower_bound.',
      keyPattern: 'Red-Black Tree Ordered Map lower_bound Interval Check',
      acceptanceOrRating: '57.8% Acc',
      tags: ['red-black-tree', 'ordered-set', 'std-map']
    },
    {
      id: 'rbt-2',
      title: 'Contains Duplicate III',
      platform: 'LeetCode',
      problemNumber: '220',
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/contains-duplicate-iii/',
      description: 'Find if there are two distinct indices within distance k whose values differ by at most valueDiff using std::set.',
      keyPattern: 'Sliding Window + std::set (RBT) lower_bound Query',
      acceptanceOrRating: '23.4% Acc',
      tags: ['red-black-tree', 'ordered-set', 'sliding-window']
    },
    {
      id: 'rbt-3',
      title: 'Stock Price Fluctuation',
      platform: 'LeetCode',
      problemNumber: '2034',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/stock-price-fluctuation/',
      description: 'Design a system that tracks timestamps and prices, returning current, max, and min price using std::map & std::multiset.',
      keyPattern: 'Balanced Search Tree Ordered Multi-Map Maintenance',
      acceptanceOrRating: '50.2% Acc',
      tags: ['red-black-tree', 'std-map', 'multiset', 'design']
    },
    {
      id: 'rbt-4',
      title: 'My Calendar II',
      platform: 'LeetCode',
      problemNumber: '731',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/my-calendar-ii/',
      description: 'Implement a calendar that allows double bookings but prohibits triple bookings using an ordered map timeline.',
      keyPattern: 'Ordered Map (std::map) Timeline Sweep',
      acceptanceOrRating: '56.1% Acc',
      tags: ['red-black-tree', 'std-map', 'ordered-map']
    }
  ],

  'b-tree': [
    {
      id: 'bt-1',
      title: 'Implement Trie (Prefix Tree)',
      platform: 'LeetCode',
      problemNumber: '208',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
      description: 'Implement a multi-way branch prefix tree with insert, search, and startsWith methods.',
      keyPattern: 'Multi-Way Branching Array Child Node Pointers',
      acceptanceOrRating: '65.3% Acc',
      tags: ['multi-way-tree', 'trie', 'design']
    },
    {
      id: 'bt-2',
      title: 'Design Add and Search Words Data Structure',
      platform: 'LeetCode',
      problemNumber: '211',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
      description: 'Design a data structure that supports adding new words and finding if a string matches any previously added string.',
      keyPattern: 'Multi-Branch Node Search Traversal',
      acceptanceOrRating: '45.1% Acc',
      tags: ['multi-way-tree', 'trie', 'search']
    },
    {
      id: 'bt-3',
      title: 'Insert Delete GetRandom O(1)',
      platform: 'LeetCode',
      problemNumber: '380',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/insert-delete-getrandom-o1/',
      description: 'Implement the RandomizedSet class supporting insert, remove, and getRandom in average O(1) time.',
      keyPattern: 'Indexed Block Element Storage & Array Swap Deletion',
      acceptanceOrRating: '54.7% Acc',
      tags: ['data-structure', 'design', 'indexing']
    }
  ],

  'b-plus-tree': [
    {
      id: 'bpt-1',
      title: 'Range Sum Query - Immutable',
      platform: 'LeetCode',
      problemNumber: '303',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/range-sum-query-immutable/',
      description: 'Given an integer array nums, handle multiple queries of the sum of elements between indices left and right.',
      keyPattern: 'Contiguous Range Scan / Leaf Range Calculation',
      acceptanceOrRating: '64.8% Acc',
      tags: ['range-query', 'array', 'prefix-sum']
    },
    {
      id: 'bpt-2',
      title: 'Design an Ordered Stream',
      platform: 'LeetCode',
      problemNumber: '1656',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/design-an-ordered-stream/',
      description: 'Design a stream that takes n (idKey, value) pairs in arbitrary order, and returns values in increasing order of their IDs.',
      keyPattern: 'Sequential Pointer Movement along Ordered Leaf Nodes',
      acceptanceOrRating: '86.1% Acc',
      tags: ['ordered-stream', 'array', 'design']
    },
    {
      id: 'bpt-3',
      title: 'Range Sum Query 2D - Immutable',
      platform: 'LeetCode',
      problemNumber: '304',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/range-sum-query-2d-immutable/',
      description: 'Calculate the sum of elements of a 2D matrix inside the rectangle defined by its upper-left and lower-right coordinates.',
      keyPattern: '2D Range Retrieval & Boundary Calculations',
      acceptanceOrRating: '55.3% Acc',
      tags: ['matrix', 'range-query', 'indexing']
    }
  ],

  'huffman-coding': [
    {
      id: 'huff-1',
      title: 'Minimum Cost to Connect Sticks',
      platform: 'LeetCode',
      problemNumber: '1167',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/minimum-cost-to-connect-sticks/',
      description: 'You have some sticks of positive integer lengths. Connect all sticks into one stick with minimum total cost using min-heap.',
      keyPattern: 'The Classical Huffman Greedy Algorithm: Repeatedly Merge 2 Smallest Weights',
      acceptanceOrRating: '69.4% Acc',
      tags: ['huffman', 'greedy', 'min-heap', 'priority-queue']
    },
    {
      id: 'huff-2',
      title: 'Last Stone Weight',
      platform: 'LeetCode',
      problemNumber: '1046',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/last-stone-weight/',
      description: 'Simulate pair-wise stone reduction using a priority queue until the final stone is determined.',
      keyPattern: 'Greedy Priority Queue Pair-wise Selection',
      acceptanceOrRating: '65.9% Acc',
      tags: ['priority-queue', 'greedy', 'simulation']
    },
    {
      id: 'huff-3',
      title: 'Maximal Score After Applying K Operations',
      platform: 'LeetCode',
      problemNumber: '2530',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/maximal-score-after-applying-k-operations/',
      description: 'Select the greatest element from an array, add its value to score, and replace with ceil(val/3) across k turns.',
      keyPattern: 'Max-Heap Greedy Priority Triage',
      acceptanceOrRating: '59.7% Acc',
      tags: ['greedy', 'heap', 'priority-queue']
    },
    {
      id: 'huff-4',
      title: 'Medium Number',
      platform: 'Codeforces',
      problemNumber: '1760A',
      difficulty: '800',
      url: 'https://codeforces.com/problemset/problem/1760/A',
      description: 'Given three distinct integers, find the medium number among them.',
      keyPattern: 'Direct 3-Element Comparison',
      acceptanceOrRating: 'Rating 800',
      tags: ['sorting', 'greedy']
    }
  ],

  'graph-representations': [
    {
      id: 'grep-1',
      title: 'Find Center of Star Graph',
      platform: 'LeetCode',
      problemNumber: '1791',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/find-center-of-star-graph/',
      description: 'Find the center node of a star graph by inspecting degrees in the graph representation.',
      keyPattern: 'Vertex Degree Verification in Edge List',
      acceptanceOrRating: '85.2% Acc',
      tags: ['graph', 'degrees', 'representation']
    },
    {
      id: 'grep-2',
      title: 'Find the Town Judge',
      platform: 'LeetCode',
      problemNumber: '997',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/find-the-town-judge/',
      description: 'Find the town judge who is trusted by everyone (in-degree = n - 1) and trusts nobody (out-degree = 0).',
      keyPattern: 'In-Degree and Out-Degree Array Counting',
      acceptanceOrRating: '50.4% Acc',
      tags: ['graph', 'degrees', 'in-degree']
    },
    {
      id: 'grep-3',
      title: 'Find if Path Exists in Graph',
      platform: 'LeetCode',
      problemNumber: '1971',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/find-if-path-exists-in-graph/',
      description: 'Given edges of an undirected graph, construct an adjacency list and determine if there is a valid path.',
      keyPattern: 'Adjacency List Construction & Graph Traversal',
      acceptanceOrRating: '54.2% Acc',
      tags: ['graph', 'adjacency-list', 'bfs', 'dfs']
    },
    {
      id: 'grep-4',
      title: 'Clone Graph',
      platform: 'LeetCode',
      problemNumber: '133',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/clone-graph/',
      description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
      keyPattern: 'Adjacency List Node-to-Clone Hash Mapping',
      acceptanceOrRating: '58.3% Acc',
      tags: ['graph', 'hash-table', 'bfs', 'dfs']
    }
  ],

  'graph': [
    {
      id: 'g-1',
      title: 'Find if Path Exists in Graph (BFS / DFS)',
      platform: 'LeetCode',
      problemNumber: '1971',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/find-if-path-exists-in-graph/',
      description: 'Given edges and vertices, traverse from source to destination using BFS (queue) or DFS (stack/recursion).',
      keyPattern: 'Standard Graph BFS Queue / DFS Recursion with Visited Array',
      acceptanceOrRating: '54.2% Acc',
      tags: ['graph', 'bfs', 'dfs', 'visited-array']
    },
    {
      id: 'g-2',
      title: 'Keys and Rooms',
      platform: 'LeetCode',
      problemNumber: '841',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/keys-and-rooms/',
      description: 'Given n rooms with keys to other rooms, determine if you can visit all rooms starting from room 0.',
      keyPattern: 'Graph Reachability Exploration via BFS / DFS',
      acceptanceOrRating: '73.9% Acc',
      tags: ['graph', 'bfs', 'dfs']
    },
    {
      id: 'g-3',
      title: 'Flood Fill',
      platform: 'LeetCode',
      problemNumber: '733',
      difficulty: 'Easy',
      url: 'https://leetcode.com/problems/flood-fill/',
      description: 'Perform flood fill on a 2D image matrix starting from coordinate (sr, sc) replacing connected same-color pixels.',
      keyPattern: 'Grid Graph 4-Directional DFS/BFS Traversal',
      acceptanceOrRating: '64.5% Acc',
      tags: ['graph', 'dfs', 'matrix']
    },
    {
      id: 'g-4',
      title: 'Number of Islands',
      platform: 'LeetCode',
      problemNumber: '200',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/number-of-islands/',
      description: 'Given an m x n 2D binary grid representing a map of 1s (land) and 0s (water), return the number of islands.',
      keyPattern: 'Connected Component Counting via Grid BFS / DFS',
      acceptanceOrRating: '60.1% Acc',
      tags: ['graph', 'bfs', 'dfs', 'matrix']
    },
    {
      id: 'g-5',
      title: 'Max Area of Island',
      platform: 'LeetCode',
      problemNumber: '695',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/max-area-of-island/',
      description: 'Find the maximum area of an island in a given 2D binary grid using DFS component accumulation.',
      keyPattern: 'Recursive DFS Connected Component Size Accumulation',
      acceptanceOrRating: '72.3% Acc',
      tags: ['graph', 'dfs', 'matrix']
    }
  ],

  'topological-sort': [
    {
      id: 'topo-1',
      title: 'Course Schedule (Kahn\'s Algorithm / Cycle Detection)',
      platform: 'LeetCode',
      problemNumber: '207',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/course-schedule/',
      description: 'Given prerequisite pairs, determine if it is possible to finish all courses using Kahn\'s in-degree queue.',
      keyPattern: 'Kahn\'s Algorithm with In-Degree Array & Queue',
      acceptanceOrRating: '47.9% Acc',
      tags: ['topological-sort', 'graph', 'kahn', 'in-degree']
    },
    {
      id: 'topo-2',
      title: 'Course Schedule II',
      platform: 'LeetCode',
      problemNumber: '210',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/course-schedule-ii/',
      description: 'Return the exact ordering of courses you should take to finish all courses using Topological Sorting.',
      keyPattern: 'Topological Order Sequence Extraction via In-Degree Queue',
      acceptanceOrRating: '51.2% Acc',
      tags: ['topological-sort', 'graph', 'kahn', 'queue']
    },
    {
      id: 'topo-3',
      title: 'Find Eventual Safe States',
      platform: 'LeetCode',
      problemNumber: '802',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/find-eventual-safe-states/',
      description: 'Find all safe nodes where every possible path leads to a terminal node using reverse graph topological sort.',
      keyPattern: 'Reverse Graph In-Degree Reduction',
      acceptanceOrRating: '64.8% Acc',
      tags: ['topological-sort', 'graph', 'kahn']
    },
    {
      id: 'topo-4',
      title: 'Course Schedule IV',
      platform: 'LeetCode',
      problemNumber: '1462',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/course-schedule-iv/',
      description: 'Answer queries asking whether course u is a prerequisite of course v in a DAG.',
      keyPattern: 'Topological Ordering Reachability Set Propagation',
      acceptanceOrRating: '53.1% Acc',
      tags: ['topological-sort', 'graph', 'reachability']
    }
  ],

  'shortest-path-dijkstra': [
    {
      id: 'dijk-1',
      title: 'Network Delay Time',
      platform: 'LeetCode',
      problemNumber: '743',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/network-delay-time/',
      description: 'Given network travel times with positive weights, calculate the time for a signal to reach all nodes using Dijkstra.',
      keyPattern: 'Textbook Dijkstra with Min-Heap Priority Queue (dist[v] > dist[u] + w)',
      acceptanceOrRating: '55.2% Acc',
      tags: ['dijkstra', 'graph', 'shortest-path', 'priority-queue']
    },
    {
      id: 'dijk-2',
      title: 'Path with Maximum Probability',
      platform: 'LeetCode',
      problemNumber: '1514',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/path-with-maximum-probability/',
      description: 'Find the path with maximum probability between start and end node using Dijkstra max-heap relaxation.',
      keyPattern: 'Max-Heap Dijkstra Relaxation (prob[v] < prob[u] * w)',
      acceptanceOrRating: '59.1% Acc',
      tags: ['dijkstra', 'graph', 'max-heap', 'probability']
    },
    {
      id: 'dijk-3',
      title: 'Path With Minimum Effort',
      platform: 'LeetCode',
      problemNumber: '1631',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/path-with-minimum-effort/',
      description: 'Find the path from top-left to bottom-right that minimizes the maximum absolute difference between consecutive cells.',
      keyPattern: 'Dijkstra Priority Queue on Grid Graph',
      acceptanceOrRating: '62.4% Acc',
      tags: ['dijkstra', 'graph', 'matrix', 'priority-queue']
    },
    {
      id: 'dijk-4',
      title: 'Cheapest Flights Within K Stops',
      platform: 'LeetCode',
      problemNumber: '787',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
      description: 'Find the cheapest price from src to dst with at most k stops using priority queue shortest path exploration.',
      keyPattern: 'Dijkstra / Shortest Path Queue Relaxation with Stop Limit',
      acceptanceOrRating: '40.6% Acc',
      tags: ['dijkstra', 'shortest-path', 'graph']
    }
  ],

  'floyd-warshall': [
    {
      id: 'floyd-1',
      title: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
      platform: 'LeetCode',
      problemNumber: '1334',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/',
      description: 'Given weighted undirected edges, find the city with the smallest reachable neighbors within distanceThreshold using Floyd-Warshall.',
      keyPattern: 'Textbook 3-Nested Loop Floyd-Warshall (dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]))',
      acceptanceOrRating: '64.8% Acc',
      tags: ['floyd-warshall', 'graph', 'all-pairs-shortest-path', 'matrix']
    },
    {
      id: 'floyd-2',
      title: 'Minimum Cost to Convert String I',
      platform: 'LeetCode',
      problemNumber: '2976',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/minimum-cost-to-convert-string-i/',
      description: 'Find the minimum cost to convert string source to target using character transformation rules via 26x26 Floyd-Warshall.',
      keyPattern: '26x26 Character All-Pairs Shortest Path Matrix Q^(k)',
      acceptanceOrRating: '55.7% Acc',
      tags: ['floyd-warshall', 'graph', 'all-pairs-shortest-path']
    },
    {
      id: 'floyd-3',
      title: 'Evaluate Division',
      platform: 'LeetCode',
      problemNumber: '399',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/evaluate-division/',
      description: 'Given equations a / b = k, evaluate query expressions by computing all-pairs multiplicative shortest paths.',
      keyPattern: 'All-Pairs Shortest Path Matrix / Transitive Closure',
      acceptanceOrRating: '62.3% Acc',
      tags: ['floyd-warshall', 'graph', 'transitive-closure']
    }
  ],

  'mst': [
    {
      id: 'mst-1',
      title: 'Min Cost to Connect All Points',
      platform: 'LeetCode',
      problemNumber: '1584',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/',
      description: 'Connect all 2D points with minimum total Manhattan distance cost using Kruskal\'s (DSU) or Prim\'s algorithm.',
      keyPattern: 'Classic Minimum Spanning Tree (Kruskal\'s with DSU / Prim\'s with Min-Heap)',
      acceptanceOrRating: '67.2% Acc',
      tags: ['mst', 'kruskal', 'prim', 'dsu', 'graph']
    },
    {
      id: 'mst-2',
      title: 'Connecting Cities With Minimum Cost',
      platform: 'LeetCode',
      problemNumber: '1135',
      difficulty: 'Medium',
      url: 'https://leetcode.com/problems/connecting-cities-with-minimum-cost/',
      description: 'Given n cities and 2-way roads with construction costs, find minimum cost to connect all cities using Kruskal\'s MST.',
      keyPattern: 'Kruskal\'s Algorithm with Disjoint Set Union (Union-Find)',
      acceptanceOrRating: '61.4% Acc',
      tags: ['mst', 'kruskal', 'dsu', 'union-find']
    },
    {
      id: 'mst-3',
      title: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree',
      platform: 'LeetCode',
      problemNumber: '1489',
      difficulty: 'Hard',
      url: 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/',
      description: 'Find all critical and pseudo-critical edges in a graph\'s minimum spanning tree using Kruskal\'s algorithm comparisons.',
      keyPattern: 'Kruskal MST Weight Invariant & Edge Exclusion/Inclusion Tests',
      acceptanceOrRating: '68.9% Acc',
      tags: ['mst', 'kruskal', 'dsu', 'graph']
    }
  ]
};
