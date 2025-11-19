import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiSearch, FiFilter } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  fetchSubjects,
  selectFilteredSubjects,
  selectSubjectsLoading,
  selectSubjectsError,
  setSearchFilter,
  selectSubjectsFilters,
} from '../../store/slices/subjectsSlice';

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const subjects = useAppSelector(selectFilteredSubjects);
  const loading = useAppSelector(selectSubjectsLoading);
  const error = useAppSelector(selectSubjectsError);
  const filters = useAppSelector(selectSubjectsFilters);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/learning/subjects/${subjectId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorClass = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 hover:border-blue-400';
      case 'purple':
        return 'bg-purple-50 border-purple-200 hover:border-purple-400';
      case 'green':
        return 'bg-green-50 border-green-200 hover:border-green-400';
      case 'red':
        return 'bg-red-50 border-red-200 hover:border-red-400';
      default:
        return 'bg-white border-gray-200 hover:border-gray-400';
    }
  };

  if (loading && subjects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Hub</h1>
        <p className="text-lg text-gray-600">
          Explore subjects, chapters, and comprehensive learning content
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={filters.search}
              onChange={(e) => dispatch(setSearchFilter(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <FiFilter />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <div className="text-center py-12">
          <FiBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No subjects found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject.id)}
              className={`rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${getColorClass(
                subject.color
              )}`}
            >
              {/* Icon and Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{subject.icon || '📚'}</div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    subject.status
                  )}`}
                >
                  {subject.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Subject Info */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{subject.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {subject.description || 'No description available'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Chapters</p>
                  <p className="text-lg font-semibold text-gray-900">{subject.chaptersCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Questions</p>
                  <p className="text-lg font-semibold text-gray-900">{subject.questionsCount}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs font-semibold text-gray-900">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;
