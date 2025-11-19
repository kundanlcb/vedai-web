import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBook, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  fetchSubjectById,
  selectSelectedSubject,
  selectSubjectsLoading,
} from '../../store/slices/subjectsSlice';
import {
  fetchChaptersBySubject,
  selectChapters,
  selectChaptersLoading,
} from '../../store/slices/chaptersSlice';

const SubjectDetailPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const subject = useAppSelector(selectSelectedSubject);
  const chapters = useAppSelector(selectChapters);
  const subjectLoading = useAppSelector(selectSubjectsLoading);
  const chaptersLoading = useAppSelector(selectChaptersLoading);

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchSubjectById(subjectId));
      dispatch(fetchChaptersBySubject(subjectId));
    }
  }, [dispatch, subjectId]);

  const handleChapterClick = (chapterId: string) => {
    navigate(`/learning/chapters/${chapterId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-600" />;
      case 'in_progress':
        return <FiClock className="text-blue-600" />;
      default:
        return <FiBook className="text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (subjectLoading || chaptersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subject details...</p>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Subject not found</h2>
        <button
          onClick={() => navigate('/learning/subjects')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Subjects
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/learning/subjects')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft />
        <span>Back to Subjects</span>
      </button>

      {/* Subject Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{subject.icon || '📚'}</div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{subject.name}</h1>
            <p className="text-gray-600 mb-4">{subject.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Chapters</p>
                <p className="text-2xl font-bold text-gray-900">{subject.chaptersCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">{subject.questionsCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-2xl font-bold text-blue-600">{subject.progress}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-2xl font-bold text-gray-900 capitalize">
                  {subject.status.replace('_', ' ')}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapters</h2>

        {chapters.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <FiBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No chapters available</h3>
            <p className="text-gray-500">Chapters will be available soon</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-blue-400 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Chapter Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Chapter Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{chapter.name}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(chapter.status)}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{chapter.description}</p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiBook className="text-blue-600" />
                        <span>{chapter.lessonsCount} lessons</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiClock className="text-purple-600" />
                        <span>{chapter.duration || 0} mins</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">{chapter.questionsCount}</span> questions
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">Chapter Progress</span>
                        <span className="text-xs font-semibold text-gray-900">
                          {chapter.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${chapter.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetailPage;
