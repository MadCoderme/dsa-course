import React, { useEffect } from 'react';
import { ComplexityMatrix } from '../components/exam/ComplexityMatrix';
import { BreadcrumbsBar } from '../components/layout/BreadcrumbsBar';

export const ComplexityMatrixPage: React.FC = () => {
  useEffect(() => {
    document.title = 'STL Complexity Matrix | DSA Notes (CSE-241)';
  }, []);

  return (
    <div className="space-y-2">
      <BreadcrumbsBar />
      <ComplexityMatrix />
    </div>
  );
};
