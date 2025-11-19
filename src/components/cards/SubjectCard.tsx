import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

interface SubjectCardProps {
  id: string;
  name: string;
  description?: string;
  progress?: number;
  chapters?: number;
  icon?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink';
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  id,
  name,
  description,
  progress = 0,
  chapters = 12,
  icon,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    green: 'bg-green-50 border-green-200 hover:border-green-300',
    red: 'bg-red-50 border-red-200 hover:border-red-300',
    yellow: 'bg-yellow-50 border-yellow-200 hover:border-yellow-300',
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-300',
    pink: 'bg-pink-50 border-pink-200 hover:border-pink-300',
  };

  const progressColorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
  };

  const textColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
  };

  return (
    <Link to={`/learning/subjects/${id}`}>
      <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${colorClasses[color]}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
          {icon ? (
            <div className={`text-3xl ml-2`}>{icon}</div>
          ) : (
            <FiBookOpen className={`w-8 h-8 ${textColorClasses[color]} ml-2`} />
          )}
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-xs font-bold text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${progressColorClasses[color]} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">{chapters} chapters</span>
          <FiArrowRight className={`w-4 h-4 ${textColorClasses[color]}`} />
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;

