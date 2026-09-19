import React, { useEffect } from 'react';
import { AddressCalculator } from '../components/exam/AddressCalculator';
import { BreadcrumbsBar } from '../components/layout/BreadcrumbsBar';

export const AddressCalculatorPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Address Formula Solver (1D, 2D, 3D) | DSA Notes (CSE-241)';
  }, []);

  return (
    <div className="space-y-2">
      <BreadcrumbsBar />
      <AddressCalculator />
    </div>
  );
};
