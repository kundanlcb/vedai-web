import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiClock, FiCheckCircle, FiFlag, FiAlertCircle } from 'react-icons/fi';

interface Question {
  id: string;
  text: string;
  options: string[];
  selectedAnswer?: string;
  status: 'answered' | 'marked' | 'not_answered';
}

const PracticeTestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      status: 'not_answered',
    },
    {
      id: '2',
      text: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      status: 'not_answered',
    },
    {
      id: '3',
      text: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      status: 'not_answered',
    },
    {
      id: '4',
      text: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      status: 'not_answered',
    },
    {
      id: '5',
      text: 'What is the chemical symbol for water?',
      options: ['O2', 'H2O', 'CO2', 'NaCl'],
      status: 'not_answered',
    },
  ]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Warning when time is low
  useEffect(() => {
    if (timeRemaining === 300) { // 5 minutes
      alert('Warning: Only 5 minutes remaining!');
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedAnswer = answer;
    updatedQuestions[currentQuestionIndex].status = 'answered';
    setQuestions(updatedQuestions);
  };

  const handleMarkForReview = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].status = 'marked';
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleAutoSubmit = () => {
    // Auto-submit when time runs out
    navigate(`/practice/results/${testId}`, {
      state: { questions, timeSpent: 3600 - timeRemaining },
    });
  };

  const handleSubmit = () => {
    const unansweredCount = questions.filter((q) => q.status === 'not_answered').length;
    
    if (unansweredCount > 0) {
      setShowSubmitConfirm(true);
    } else {
      submitTest();
    }
  };

  const submitTest = () => {
    navigate(`/practice/results/${testId}`, {
      state: { questions, timeSpent: 3600 - timeRemaining },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-500 text-white';
      case 'marked':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = questions.filter((q) => q.status === 'answered').length;
  const markedCount = questions.filter((q) => q.status === 'marked').length;
  const notAnsweredCount = questions.filter((q) => q.status === 'not_answered').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Practice Test</h1>
              <p className="text-sm text-gray-600">Mathematics - Chapter 1</p>
            </div>
            
            {/* Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <FiClock className="w-5 h-5" />
              <span className="text-lg font-bold">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{answeredCount} Answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <button
                    onClick={handleMarkForReview}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                      currentQuestion.status === 'marked'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <FiFlag />
                    <span className="text-sm">Mark for Review</span>
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{currentQuestion.text}</h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      currentQuestion.selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          currentQuestion.selectedAnswer === option
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-400'
                        }`}
                      >
                        {currentQuestion.selectedAnswer === option && (
                          <FiCheckCircle className="text-white w-4 h-4" />
                        )}
                      </div>
                      <span className="font-medium">
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex gap-3">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Question Navigator</h3>

              {/* Legend */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-gray-600">Marked ({markedCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span className="text-gray-600">Not Answered ({notAnsweredCount})</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                      getStatusColor(question.status)
                    } ${
                      currentQuestionIndex === index
                        ? 'ring-2 ring-blue-600 ring-offset-2'
                        : ''
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full mt-4 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <FiAlertCircle className="w-6 h-6 text-yellow-600" />
              <h3 className="text-xl font-bold text-gray-900">Confirm Submission</h3>
            </div>
            <p className="text-gray-600 mb-2">
              You have {notAnsweredCount} unanswered question{notAnsweredCount !== 1 ? 's' : ''}.
            </p>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit the test?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitTest}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeTestPage;
