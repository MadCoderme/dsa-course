import { Lesson } from '../../types';

export const OVERVIEW_LESSON: Lesson = {
  id: 'course-overview',
  categoryId: 'orientation',
  subCategoryId: 'course-guide',
  title: 'DSA - Like How It Should Be',
  subtitle: '',
  icon: 'Compass',
  overview: 'This platform is a comprehensive, interactive learning laboratory designed to bridge the gap between abstract algorithmic theory and operational mastery. Whether preparing for university examinations (such as CSE-241 Data Structures), technical interviews, or systems programming, this guide outlines the structured pedagogical sequence and how to leverage the built-in visualizers, mathematical proofs, and past exam solutions.',
  keyConcepts: [
    {
      title: '1. What is this',
      description: 'Traditional textbooks often describe data structures through static diagrams and disjointed pseudo-code, making dynamic operations (such as AVL 4-case rotations, Red-Black double-red rebalancing, Floyd-Warshall $Q^{(k)}$ matrix updates, and Kahn topological DAG zero-indegree queues) difficult to master. Here, we will try to explore Data Structures and Algorithms in a more intuitive way while ensuring proper preparation for exams.',
    },
    {
      title: '2. How should you study',
      description: 'On the left sidebar, lessons are organized in the recommended order. Start from basic linear data structures and then dive into non-linear structures like Graphs and Trees. You will find essential algorithms on the way. More of these will be covered later.',
    }
  ]
};
