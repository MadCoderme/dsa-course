import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routesConfig';
import { LessonPage } from '../pages/LessonPage';
import { ExamReportPage } from '../pages/ExamReportPage';
import { AddressCalculatorPage } from '../pages/AddressCalculatorPage';
import { ComplexityMatrixPage } from '../pages/ComplexityMatrixPage';
import { NotFoundPage } from '../pages/NotFoundPage';

interface AppRoutesProps {
  focusMode: boolean;
  onToggleFocusMode: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ focusMode, onToggleFocusMode }) => {
  return (
    <Routes>
      {/* Root redirect to canonical course overview lesson */}
      <Route path={ROUTES.HOME} element={<Navigate to="/lessons/course-overview" replace />} />
      <Route path={ROUTES.LESSONS_ROOT} element={<Navigate to="/lessons/course-overview" replace />} />

      {/* Dynamic Lesson Route for all topics */}
      <Route
        path={ROUTES.LESSON_DETAIL}
        element={
          <LessonPage
            focusMode={focusMode}
            onToggleFocusMode={onToggleFocusMode}
          />
        }
      />

      {/* Reference Tools Routes */}
      <Route path={ROUTES.EXAM_REPORT} element={<ExamReportPage />} />
      <Route path={ROUTES.ADDRESS_CALCULATOR} element={<AddressCalculatorPage />} />
      <Route path={ROUTES.COMPLEXITY_MATRIX} element={<ComplexityMatrixPage />} />

      {/* Aliases / Shorthand Route Redirects */}
      <Route path={ROUTES.REPORT_ALIAS} element={<Navigate to={ROUTES.EXAM_REPORT} replace />} />
      <Route path={ROUTES.CALCULATOR_ALIAS} element={<Navigate to={ROUTES.ADDRESS_CALCULATOR} replace />} />
      <Route path={ROUTES.MATRIX_ALIAS} element={<Navigate to={ROUTES.COMPLEXITY_MATRIX} replace />} />
      <Route path="/course-overview" element={<Navigate to="/lessons/course-overview" replace />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
