import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBookmark, FiHelpCircle, FiCheckCircle, FiXCircle, FiCamera, FiFileText } from 'react-icons/fi';

type QuestionType = 'mcq' | 'subjective' | 'true_false' | 'fill_blank' | 'match';
type AnswerFormat = 'text' | 'photo' | 'notes';

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  examFrequency?: string;
  subject: string;
  chapter: string;
}

const QuestionDetailPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
  const [answerFormat, setAnswerFormat] = useState<AnswerFormat>('text');
  const [subjectiveAnswer, setSubjectiveAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock question data (to be replaced with API call)
  const question: Question = {
    id: questionId || '1',
    text: 'What is the derivative of x² with respect to x?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['x', '2x', 'x²', '2x²'],
    correctAnswer: '2x',
    explanation: 'Using the power rule: d/dx(xⁿ) = n·xⁿ⁻¹, so d/dx(x²) = 2·x²⁻¹ = 2x',
    examFrequency: 'Asked in 8 out of 10 exams',
    subject: 'Mathematics',
    chapter: 'Calculus - Differentiation',
  };

  const relatedQuestions = [
    { id: '2', text: 'What is the derivative of 3x³?', difficulty: 'easy' },
    { id: '3', text: 'Find the derivative of sin(x)', difficulty: 'medium' },
    { id: '4', text: 'Apply chain rule to find derivative of (2x+1)³', difficulty: 'hard' },
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setSubjectiveAnswer('');
    setIsSubmitted(false);
  };

  const isCorrect = () => {
    if (question.type === 'mcq') {
      return selectedAnswer === question.correctAnswer;
    }
    return false;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAnswerInterface = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => !isSubmitted && setSelectedAnswer(option)}
                disabled={isSubmitted}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === option
                    ? isSubmitted
                      ? option === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : isSubmitted && option === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
                  {isSubmitted && option === question.correctAnswer && (
                    <FiCheckCircle className="text-green-600 w-5 h-5" />
                  )}
                  {isSubmitted && selectedAnswer === option && option !== question.correctAnswer && (
                    <FiXCircle className="text-red-600 w-5 h-5" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => !isSubmitted && setSelectedAnswer('true')}
              disabled={isSubmitted}
              className={`p-6 rounded-lg border-2 font-semibold transition-all ${
                selectedAnswer === 'true'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-blue-400'
              } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              ✓ True
            </button>
            <button
              onClick={() => !isSubmitted && setSelectedAnswer('false')}
              disabled={isSubmitted}
              className={`p-6 rounded-lg border-2 font-semibold transition-all ${
                selectedAnswer === 'false'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-blue-400'
              } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              ✗ False
            </button>
          </div>
        );

      case 'subjective':
        return (
          <div className="space-y-4">
            {/* Answer Format Selector */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setAnswerFormat('text')}
                className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${
                  answerFormat === 'text'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-blue-400'
                }`}
              >
                <FiFileText />
                <span>Type Answer</span>
              </button>
              <button
                onClick={() => setAnswerFormat('photo')}
                className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${
                  answerFormat === 'photo'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-blue-400'
                }`}
              >
                <FiCamera />
                <span>Upload Photo</span>
              </button>
              <button
                onClick={() => setAnswerFormat('notes')}
                className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${
                  answerFormat === 'notes'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-blue-400'
                }`}
              >
                <FiFileText />
                <span>Add Notes Link</span>
              </button>
            </div>

            {/* Answer Input Based on Format */}
            {answerFormat === 'text' && (
              <textarea
                value={subjectiveAnswer}
                onChange={(e) => setSubjectiveAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                rows={8}
                disabled={isSubmitted}
              />
            )}
            {answerFormat === 'photo' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FiCamera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload a photo of your handwritten answer</p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Choose Photo
                </button>
              </div>
            )}
            {answerFormat === 'notes' && (
              <input
                type="url"
                placeholder="Paste link to your notes (Google Docs, OneNote, etc.)"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                disabled={isSubmitted}
              />
            )}
          </div>
        );

      case 'fill_blank':
        return (
          <div className="space-y-3">
            <p className="text-gray-700 mb-4">Fill in the blank:</p>
            <input
              type="text"
              value={selectedAnswer as string}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              disabled={isSubmitted}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft />
        <span>Back to Questions</span>
      </button>

      {/* Question Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Question Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {question.type.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {question.subject} • {question.chapter}
            </p>
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{question.text}</h2>
        </div>

        {/* Answer Interface */}
        {renderAnswerInterface()}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer && !subjectiveAnswer}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>

        {/* Result Feedback */}
        {isSubmitted && question.type === 'mcq' && (
          <div className={`mt-6 p-4 rounded-lg ${isCorrect() ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-3 mb-2">
              {isCorrect() ? (
                <>
                  <FiCheckCircle className="text-green-600 w-6 h-6" />
                  <span className="text-lg font-semibold text-green-900">Correct!</span>
                </>
              ) : (
                <>
                  <FiXCircle className="text-red-600 w-6 h-6" />
                  <span className="text-lg font-semibold text-red-900">Incorrect</span>
                </>
              )}
            </div>
            {!isCorrect() && (
              <p className="text-red-700 mb-2">
                The correct answer is: <strong>{question.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}

        {/* Explanation */}
        {isSubmitted && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiHelpCircle className="text-blue-600" />
              <h3 className="font-semibold text-blue-900">Explanation</h3>
            </div>
            <p className="text-blue-800">{question.explanation}</p>
          </div>
        )}

        {/* Exam Frequency */}
        {question.examFrequency && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Exam Frequency:</strong> {question.examFrequency}
            </p>
          </div>
        )}
      </div>

      {/* Related Questions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Related Questions</h3>
        <div className="space-y-3">
          {relatedQuestions.map((relatedQ) => (
            <div
              key={relatedQ.id}
              onClick={() => navigate(`/questions/${relatedQ.id}`)}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <p className="flex-1 text-gray-900">{relatedQ.text}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${getDifficultyColor(relatedQ.difficulty)}`}>
                  {relatedQ.difficulty.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
