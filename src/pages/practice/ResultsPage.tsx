import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiClock, FiTrendingUp, FiAward } from 'react-icons/fi';

interface Question {
  id: string;
  text: string;
  options: string[];
  selectedAnswer?: string;
  correctAnswer?: string;
  status: string;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions = [], timeSpent = 0 } = location.state || {};

  // Mock correct answers for demonstration
  const questionsWithAnswers = questions.map((q: Question, index: number) => ({
    ...q,
    correctAnswer: q.options?.[2] || '', // Mock: 3rd option is correct
  }));

  const totalQuestions = questionsWithAnswers.length;
  const attemptedQuestions = questionsWithAnswers.filter((q: Question) => q.selectedAnswer).length;
  const correctAnswers = questionsWithAnswers.filter(
    (q: Question) => q.selectedAnswer === q.correctAnswer
  ).length;
  const wrongAnswers = attemptedQuestions - correctAnswers;
  const skippedQuestions = totalQuestions - attemptedQuestions;
  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'text-green-600';
    if (scorePercentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = () => {
    if (scorePercentage >= 80) return 'bg-green-100';
    if (scorePercentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Test Results</h1>
        <p className="text-lg text-gray-600">Here's how you performed</p>
      </div>

      {/* Score Card */}
      <div className={`${getScoreBgColor()} rounded-lg border-2 ${
        scorePercentage >= 80 ? 'border-green-300' : scorePercentage >= 60 ? 'border-yellow-300' : 'border-red-300'
      } p-8 text-center`}>
        <div className="mb-4">
          <FiAward className={`w-16 h-16 mx-auto ${getScoreColor()}`} />
        </div>
        <h2 className="text-6xl font-bold mb-2 ${getScoreColor()}">{scorePercentage}%</h2>
        <p className="text-xl text-gray-700">Your Score</p>
        <p className="text-gray-600 mt-2">
          {scorePercentage >= 80 && '🎉 Excellent! Keep up the great work!'}
          {scorePercentage >= 60 && scorePercentage < 80 && '👍 Good job! You can do even better!'}
          {scorePercentage < 60 && '📚 Keep practicing to improve your score!'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
            <FiCheckCircle className="text-blue-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-900 text-center">{correctAnswers}</p>
          <p className="text-sm text-gray-600 text-center mt-1">Correct</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-3">
            <FiXCircle className="text-red-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-900 text-center">{wrongAnswers}</p>
          <p className="text-sm text-gray-600 text-center mt-1">Wrong</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3">
            <FiTrendingUp className="text-gray-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-900 text-center">{skippedQuestions}</p>
          <p className="text-sm text-gray-600 text-center mt-1">Skipped</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
            <FiClock className="text-purple-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-900 text-center">{formatTime(timeSpent)}</p>
          <p className="text-sm text-gray-600 text-center mt-1">Time Spent</p>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Analysis</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Accuracy</span>
              <span className="font-semibold text-gray-900">{Math.round((correctAnswers / attemptedQuestions) * 100) || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${Math.round((correctAnswers / attemptedQuestions) * 100) || 0}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Completion Rate</span>
              <span className="font-semibold text-gray-900">{Math.round((attemptedQuestions / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${Math.round((attemptedQuestions / totalQuestions) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question-wise Review */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Question-wise Review</h3>
        <div className="space-y-4">
          {questionsWithAnswers.map((question: Question, index: number) => (
            <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  question.selectedAnswer === question.correctAnswer
                    ? 'bg-green-100'
                    : question.selectedAnswer
                    ? 'bg-red-100'
                    : 'bg-gray-200'
                }`}>
                  {question.selectedAnswer === question.correctAnswer ? (
                    <FiCheckCircle className="text-green-600 w-5 h-5" />
                  ) : question.selectedAnswer ? (
                    <FiXCircle className="text-red-600 w-5 h-5" />
                  ) : (
                    <span className="text-gray-600 text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">
                    {index + 1}. {question.text}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Your Answer: </span>
                      <span className={`font-medium ${
                        question.selectedAnswer === question.correctAnswer
                          ? 'text-green-700'
                          : question.selectedAnswer
                          ? 'text-red-700'
                          : 'text-gray-500'
                      }`}>
                        {question.selectedAnswer || 'Not answered'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Correct Answer: </span>
                      <span className="font-medium text-green-700">{question.correctAnswer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate('/practice')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Practice
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Print Results
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
