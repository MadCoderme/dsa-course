import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamReportDashboard } from '../components/exam/ExamReportDashboard';
import { BreadcrumbsBar } from '../components/layout/BreadcrumbsBar';
import { resolveRoutePath } from '../routes/routesConfig';

export const ExamReportPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '7-Year Exam Report (210 Marks) | DSA Notes (CSE-241)';
  }, []);

  return (
    <div className="space-y-2">
      <BreadcrumbsBar />
      <ExamReportDashboard
        onSelectTopic={(topicId) => {
          navigate(resolveRoutePath(topicId));
        }}
      />
    </div>
  );
};
