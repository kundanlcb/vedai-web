import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LearningPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to subjects page
    navigate('/learning/subjects', { replace: true });
  }, [navigate]);

  return null;
};

export default LearningPage;

