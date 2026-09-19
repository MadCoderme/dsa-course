import { TopicId } from '../types';
import { LESSONS, LESSON_MAP, getLessonById } from '../data/lessonsData';
import { CATEGORIES, getCategoryForTopic } from '../data/categoriesData';

/**
 * Route path constants for the centralized routing system.
 */
export const ROUTES = {
  HOME: '/',
  LESSONS_ROOT: '/lessons',
  LESSON_DETAIL: '/lessons/:topicId',
  EXAM_REPORT: '/exam-report',
  ADDRESS_CALCULATOR: '/address-calculator',
  COMPLEXITY_MATRIX: '/complexity-matrix',
  // Aliases / legacy redirects
  REPORT_ALIAS: '/report',
  CALCULATOR_ALIAS: '/calculator',
  MATRIX_ALIAS: '/matrix',
} as const;

export type ToolRouteId = 'report' | 'calculator' | 'matrix';
export type AppRouteId = TopicId | ToolRouteId;

export interface CentralRouteMeta {
  id: AppRouteId;
  path: string;
  title: string;
  subtitle?: string;
  categoryTitle?: string;
  type: 'overview' | 'lesson' | 'tool';
  examWeight?: string;
  iconName?: string;
}

/**
 * Generates the canonical URL path for a given lesson topic ID.
 */
export function getLessonPath(topicId: TopicId): string {
  return `/lessons/${topicId}`;
}

/**
 * Generates the canonical URL path for a given reference tool.
 */
export function getToolPath(toolId: ToolRouteId): string {
  switch (toolId) {
    case 'report':
      return ROUTES.EXAM_REPORT;
    case 'calculator':
      return ROUTES.ADDRESS_CALCULATOR;
    case 'matrix':
      return ROUTES.COMPLEXITY_MATRIX;
  }
}

/**
 * Resolves any target view identifier (lesson topic or reference tool) to its canonical route path.
 */
export function resolveRoutePath(target: AppRouteId): string {
  if (target === 'report' || target === 'calculator' || target === 'matrix') {
    return getToolPath(target);
  }
  return getLessonPath(target);
}

/**
 * Type guard to check whether a string is a valid curriculum TopicId.
 */
export function isValidTopicId(id: string): id is TopicId {
  return id in LESSON_MAP;
}

/**
 * Centralized Route Registry
 * Single source of truth containing metadata for all curriculum lessons, tools, and overviews.
 * Designed to scale smoothly as new lessons, chapters, and specialized tools are added.
 */
export const ROUTE_REGISTRY: CentralRouteMeta[] = [
  // Reference Tools
  {
    id: 'report',
    path: ROUTES.EXAM_REPORT,
    title: '7-Year Examination Report',
    subtitle: 'CUET CSE-241 210-mark recurring question analysis & weightage breakdown',
    type: 'tool',
    examWeight: '210M',
    iconName: 'Award'
  },
  {
    id: 'calculator',
    path: ROUTES.ADDRESS_CALCULATOR,
    title: 'Row/Column-Major Address Solver',
    subtitle: 'Interactive memory offset derivations for 1D, 2D, and 3D arrays',
    type: 'tool',
    examWeight: '12M',
    iconName: 'Calculator'
  },
  {
    id: 'matrix',
    path: ROUTES.COMPLEXITY_MATRIX,
    title: 'STL Container Complexity Matrix',
    subtitle: 'Time & space bounds for standard C++ data structures and operations',
    type: 'tool',
    examWeight: 'Ref',
    iconName: 'Table'
  },
  // All curriculum lessons dynamically mapped with category metadata
  ...LESSONS.map((lesson): CentralRouteMeta => {
    const { category } = getCategoryForTopic(lesson.id);
    return {
      id: lesson.id,
      path: getLessonPath(lesson.id),
      title: lesson.title,
      subtitle: lesson.subtitle,
      categoryTitle: category?.name,
      type: lesson.id === 'course-overview' ? 'overview' : 'lesson',
      examWeight: lesson.examQuestions && lesson.examQuestions.length > 0 ? `${lesson.examQuestions.length} Qs` : undefined
    };
  })
];

export const ROUTE_MAP: Record<string, CentralRouteMeta> = ROUTE_REGISTRY.reduce((acc, route) => {
  acc[route.id] = route;
  acc[route.path] = route;
  return acc;
}, {} as Record<string, CentralRouteMeta>);

/**
 * Sequential lesson order list for previous / next lesson navigation.
 */
export const LESSON_ORDER: TopicId[] = LESSONS.map((l) => l.id);

/**
 * Returns previous and next lesson metadata for guided linear studying.
 */
export function getSurroundingLessons(currentTopicId: TopicId) {
  const currentIndex = LESSON_ORDER.indexOf(currentTopicId);
  if (currentIndex === -1) {
    return { prev: null, next: null, currentIndex: -1, total: LESSON_ORDER.length };
  }

  const prevId = currentIndex > 0 ? LESSON_ORDER[currentIndex - 1] : null;
  const nextId = currentIndex < LESSON_ORDER.length - 1 ? LESSON_ORDER[currentIndex + 1] : null;

  return {
    prev: prevId ? getLessonById(prevId) : null,
    next: nextId ? getLessonById(nextId) : null,
    currentIndex: currentIndex + 1,
    total: LESSON_ORDER.length
  };
}

/**
 * Extracts breadcrumb items based on current URL pathname.
 */
export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Curriculum', path: getLessonPath('course-overview') }];

  if (pathname === ROUTES.EXAM_REPORT || pathname === ROUTES.REPORT_ALIAS) {
    items.push({ label: 'Reference Tools' });
    items.push({ label: '7-Year Exam Report' });
    return items;
  }

  if (pathname === ROUTES.ADDRESS_CALCULATOR || pathname === ROUTES.CALCULATOR_ALIAS) {
    items.push({ label: 'Reference Tools' });
    items.push({ label: 'Address Formula Solver' });
    return items;
  }

  if (pathname === ROUTES.COMPLEXITY_MATRIX || pathname === ROUTES.MATRIX_ALIAS) {
    items.push({ label: 'Reference Tools' });
    items.push({ label: 'STL Complexity Matrix' });
    return items;
  }

  // Check if it's a lesson route: /lessons/:topicId
  if (pathname.startsWith('/lessons/')) {
    const topicId = pathname.replace('/lessons/', '') as TopicId;
    if (isValidTopicId(topicId)) {
      const lesson = getLessonById(topicId);
      const { category } = getCategoryForTopic(topicId);

      if (category && topicId !== 'course-overview') {
        items.push({ label: category.shortName || category.name });
      }

      if (lesson) {
        // Strip out secondary parentheses for clean breadcrumb label
        const shortTitle = lesson.title.split(' (')[0];
        items.push({ label: shortTitle });
      }
    } else {
      items.push({ label: 'Not Found' });
    }
  }

  return items;
}
