import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTarget, FiUsers, FiStar, FiHeart } from 'react-icons/fi';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: 'Personalized Learning',
      description: 'AI-powered learning paths tailored to your strengths and weaknesses',
      color: 'blue',
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'Expert Content',
      description: 'Curated by experienced educators and subject matter experts',
      color: 'green',
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      title: 'Practice Tests',
      description: 'Comprehensive question banks and mock tests for exam preparation',
      color: 'purple',
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: 'Student-Centric',
      description: 'Built with students in mind, focusing on learning outcomes',
      color: 'red',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Students' },
    { value: '50,000+', label: 'Practice Questions' },
    { value: '95%', label: 'Success Rate' },
    { value: '24/7', label: 'AI Support' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft />
        <span>Back to Profile</span>
      </button>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          About <span className="text-blue-600">VedAI</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering students to achieve their academic goals through AI-powered learning
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          VedAI is dedicated to revolutionizing education by combining artificial intelligence with proven teaching methodologies. We believe every student deserves access to quality education and personalized learning experiences that help them reach their full potential.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              purple: 'bg-purple-100 text-purple-600',
              red: 'bg-red-100 text-red-600',
            };
            return (
              <div key={index} className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vision */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We envision a future where every student has access to personalized, AI-powered education that adapts to their unique learning style and pace. Through innovative technology and quality content, we aim to make learning more effective, engaging, and accessible to students everywhere.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our platform combines comprehensive subject matter, practice questions, mock tests, and AI-driven insights to create a holistic learning experience that prepares students not just for exams, but for lifelong learning and success.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          VedAI is built by a passionate team of educators, technologists, and learning experts who are committed to transforming education. Our diverse backgrounds and shared vision drive us to continuously improve and innovate in the educational technology space.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-center text-4xl mb-2">👨‍🏫</p>
            <h3 className="font-bold text-gray-900 text-center mb-1">Expert Educators</h3>
            <p className="text-sm text-gray-600 text-center">Creating quality content</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-center text-4xl mb-2">💻</p>
            <h3 className="font-bold text-gray-900 text-center mb-1">Tech Innovators</h3>
            <p className="text-sm text-gray-600 text-center">Building the platform</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-center text-4xl mb-2">🎯</p>
            <h3 className="font-bold text-gray-900 text-center mb-1">Learning Experts</h3>
            <p className="text-sm text-gray-600 text-center">Optimizing outcomes</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-6">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="mailto:info@vedai.com"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Email Us
          </a>
          <a
            href="https://vedai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Visit Website
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 py-4">
        <p>© 2025 VedAI. All rights reserved.</p>
        <p className="mt-1">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default AboutPage;
