import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBook, FiPlayCircle, FiCheckCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  fetchChapterById,
  selectSelectedChapter,
  selectChaptersLoading,
} from '../../store/slices/chaptersSlice';

const ChapterDetailPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const chapter = useAppSelector(selectSelectedChapter);
  const loading = useAppSelector(selectChaptersLoading);

  useEffect(() => {
    if (chapterId) {
      dispatch(fetchChapterById(chapterId));
    }
  }, [dispatch, chapterId]);

  // Mock lessons data (to be replaced with actual API call)
  const mockLessons = [
    {
      id: '1',
      name: 'Introduction to the Topic',
      duration: 15,
      status: 'completed',
      type: 'video',
    },
    {
      id: '2',
      name: 'Basic Concepts',
      duration: 20,
      status: 'completed',
      type: 'theory',
    },
    {
      id: '3',
      name: 'Practical Examples',
      duration: 25,
      status: 'in_progress',
      type: 'example',
    },
    {
      id: '4',
      name: 'Practice Problems',
      duration: 30,
      status: 'not_started',
      type: 'practice',
    },
    {
      id: '5',
      name: 'Advanced Topics',
      duration: 35,
      status: 'not_started',
      type: 'theory',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-600 w-5 h-5" />;
      case 'in_progress':
        return <FiPlayCircle className="text-blue-600 w-5 h-5" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'theory':
        return '📖';
      case 'example':
        return '💡';
      case 'practice':
        return '✍️';
      default:
        return '📄';
    }
  };

  const handleContinueLearning = () => {
    // Find first incomplete lesson or first lesson
    const firstIncompleteLesson = mockLessons.find(
      (lesson) => lesson.status !== 'completed'
    );
    const lessonToStart = firstIncompleteLesson || mockLessons[0];
    if (lessonToStart) {
      // Navigate to lesson detail page (placeholder for now)
      alert(`Starting lesson: ${lessonToStart.name}. Lesson detail page will be implemented.`);
    }
  };

  const handleViewQuestions = () => {
    // Navigate to questions filtered by this chapter
    if (chapter) {
      navigate('/questions', { state: { chapterId: chapter.id } });
    }
  };

  const handleLessonClick = (lesson: typeof mockLessons[0]) => {
    // Navigate to lesson detail page (placeholder for now)
    alert(`Opening lesson: ${lesson.name}. Lesson detail page will be implemented.`);
  };

  const handleDownloadNotes = () => {
    // Download chapter notes
    alert('Downloading chapter notes... This will connect to the API to download the PDF.');
  };

  const handleViewPracticeSet = () => {
    // View practice question set
    if (chapter) {
      navigate('/questions', { state: { chapterId: chapter.id, practiceSet: true } });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chapter details...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapter not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft />
        <span>Back</span>
      </button>

      {/* Chapter Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{chapter.name}</h1>
        <p className="text-gray-600 mb-6">{chapter.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Lessons</p>
            <p className="text-2xl font-bold text-gray-900">{chapter.lessonsCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-2xl font-bold text-gray-900">{chapter.duration || 0} min</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Questions</p>
            <p className="text-2xl font-bold text-gray-900">{chapter.questionsCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Progress</p>
            <p className="text-2xl font-bold text-blue-600">{chapter.progress}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Chapter Progress</span>
            <span className="text-sm font-semibold text-gray-900">{chapter.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${chapter.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleContinueLearning}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Learning
          </button>
          <button 
            onClick={handleViewQuestions}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Questions
          </button>
        </div>
      </div>

      {/* Lessons Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lessons</h2>

        <div className="space-y-3">
          {mockLessons.map((lesson, index) => (
            <div
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-400 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Lesson Number */}
                <div className="flex-shrink-0">
                  {getStatusIcon(lesson.status)}
                </div>

                {/* Lesson Type Icon */}
                <div className="flex-shrink-0 text-2xl">
                  {getTypeIcon(lesson.type)}
                </div>

                {/* Lesson Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {index + 1}. {lesson.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">{lesson.type} • {lesson.duration} min</p>
                    </div>
                    
                    {lesson.status === 'completed' && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Completed
                      </span>
                    )}
                    {lesson.status === 'in_progress' && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>

                {/* Play Button */}
                <div className="flex-shrink-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLessonClick(lesson);
                    }}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <FiPlayCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h2>
        <div className="space-y-3">
          <button
            onClick={handleDownloadNotes}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiBook className="text-blue-600 w-5 h-5" />
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Chapter Notes PDF</p>
              <p className="text-sm text-gray-500">Comprehensive notes for this chapter</p>
            </div>
            <span className="text-sm text-blue-600 font-medium">Download</span>
          </button>
          <button
            onClick={handleViewPracticeSet}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiBook className="text-purple-600 w-5 h-5" />
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Practice Question Set</p>
              <p className="text-sm text-gray-500">50 practice questions with solutions</p>
            </div>
            <span className="text-sm text-blue-600 font-medium">View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetailPage;
