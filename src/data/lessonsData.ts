import { Lesson, TopicId } from '../types';
import { OVERVIEW_LESSON } from './lessons/overviewLesson';
import { COMPLEXITY_NOTATIONS_LESSON } from './lessons/complexityNotationsLesson';
import { PSEUDOCODE_LESSON } from './lessons/pseudocodeLesson';
import { LINEAR_LESSONS } from './lessons/linearLessons';
import { TREE_LESSONS } from './lessons/treeLessons';
import { GRAPH_LESSONS } from './lessons/graphLessons';
import { STRING_LESSON } from './lessons/stringLesson';
import { STRING_OPERATIONS_LESSON } from './lessons/stringOperationsLesson';
import { KMP_LESSON } from './lessons/kmpLesson';
import { ARRAY_OPERATIONS_LESSON } from './lessons/arrayOperationsLesson';
import { SEARCH_ALGORITHMS_LESSON } from './lessons/searchAlgorithmsLesson';
import { SORT_ALGORITHMS_LESSON } from './lessons/sortAlgorithmsLesson';
import { TOPIC_PRACTICE_PROBLEMS } from './practiceProblemsData';

export { OVERVIEW_LESSON } from './lessons/overviewLesson';
export { COMPLEXITY_NOTATIONS_LESSON } from './lessons/complexityNotationsLesson';
export { PSEUDOCODE_LESSON } from './lessons/pseudocodeLesson';
export { LINEAR_LESSONS } from './lessons/linearLessons';
export { TREE_LESSONS } from './lessons/treeLessons';
export { GRAPH_LESSONS } from './lessons/graphLessons';
export { STRING_LESSON } from './lessons/stringLesson';
export { STRING_OPERATIONS_LESSON } from './lessons/stringOperationsLesson';
export { KMP_LESSON } from './lessons/kmpLesson';
export { ARRAY_OPERATIONS_LESSON } from './lessons/arrayOperationsLesson';
export { SEARCH_ALGORITHMS_LESSON } from './lessons/searchAlgorithmsLesson';
export { SORT_ALGORITHMS_LESSON } from './lessons/sortAlgorithmsLesson';

const rawLessons: Lesson[] = [
  OVERVIEW_LESSON,
  COMPLEXITY_NOTATIONS_LESSON,
  PSEUDOCODE_LESSON,
  ...LINEAR_LESSONS.slice(0, 1), // vector
  STRING_LESSON,                // string (Sequential Character Storage)
  ...LINEAR_LESSONS.slice(1),   // list, stack, queue, priority-queue, set, map
  ...TREE_LESSONS,
  ...GRAPH_LESSONS,
  ARRAY_OPERATIONS_LESSON,      // array-operations (Linear, 2D & N-D)
  SEARCH_ALGORITHMS_LESSON,     // searching-algorithms (Linear & Binary Search)
  SORT_ALGORITHMS_LESSON,       // sorting-algorithms (Bubble, Selection, Insertion, Merge, Quick)
  STRING_OPERATIONS_LESSON,     // string-operations (Slicing, Concat, Replace)
  KMP_LESSON                    // kmp-pattern-matching (LPS Array, KMP Search)
];

export const LESSONS: Lesson[] = rawLessons.map((lesson) => ({
  ...lesson,
  practiceProblems: lesson.practiceProblems || TOPIC_PRACTICE_PROBLEMS[lesson.id] || []
}));

export const LESSON_MAP: Record<TopicId, Lesson> = LESSONS.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {} as Record<TopicId, Lesson>);

export function getLessonById(id: TopicId): Lesson | undefined {
  return LESSON_MAP[id];
}
