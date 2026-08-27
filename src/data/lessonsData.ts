import { Lesson, TopicId } from '../types';
import { OVERVIEW_LESSON } from './lessons/overviewLesson';
import { LINEAR_LESSONS } from './lessons/linearLessons';
import { TREE_LESSONS } from './lessons/treeLessons';
import { GRAPH_LESSONS } from './lessons/graphLessons';
import { TOPIC_PRACTICE_PROBLEMS } from './practiceProblemsData';

export { OVERVIEW_LESSON } from './lessons/overviewLesson';
export { LINEAR_LESSONS } from './lessons/linearLessons';
export { TREE_LESSONS } from './lessons/treeLessons';
export { GRAPH_LESSONS } from './lessons/graphLessons';

const rawLessons: Lesson[] = [
  OVERVIEW_LESSON,
  ...LINEAR_LESSONS,
  ...TREE_LESSONS,
  ...GRAPH_LESSONS
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
