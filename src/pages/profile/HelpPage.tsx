import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHelpCircle, FiBook, FiMessageCircle, FiMail, FiPhone } from 'react-icons/fi';

const HelpPage: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'How do I start practicing questions?',
      answer: 'Navigate to the Questions page from the sidebar, select a subject, and click "Start Practice" to begin solving questions.',
    },
    {
      question: 'How do I track my progress?',
      answer: 'Go to your Profile and click on "View Progress" to see detailed analytics of your learning journey, including subject-wise progress and achievements.',
    },
    {
      question: 'Can I take practice tests?',
      answer: 'Yes! Visit the Practice page and select from various test modes including Quick Practice, Chapter-wise Tests, and Full Mock Tests.',
    },
    {
      question: 'How does the AI assistant work?',
      answer: 'The AI assistant on the Chat page can answer your study-related questions, explain concepts, and provide practice problems.',
    },
    {
      question: 'How do I change my password?',
      answer: 'Go to Profile > Settings, then select "Change Password" to update your account password.',
    },
    {
      question: 'What should I do if I encounter technical issues?',
      answer: 'Contact our support team using the contact information below, and we\'ll help you resolve any technical difficulties.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiHelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-lg text-gray-600">Find answers to common questions</p>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiBook className="text-blue-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <FiBook className="text-blue-600 w-6 h-6 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">User Guide</h3>
            <p className="text-sm text-gray-600">Learn how to use VedAI effectively</p>
          </a>
          <a
            href="#"
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
          >
            <FiMessageCircle className="text-green-600 w-6 h-6 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Video Tutorials</h3>
            <p className="text-sm text-gray-600">Watch step-by-step video guides</p>
          </a>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
        <p className="text-gray-700 mb-4">
          Our support team is here to help you with any questions or concerns.
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FiMail className="text-purple-600 w-5 h-5" />
            <div>
              <p className="font-medium text-gray-900">Email Support</p>
              <a href="mailto:support@vedai.com" className="text-purple-600 hover:underline">
                support@vedai.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FiPhone className="text-purple-600 w-5 h-5" />
            <div>
              <p className="font-medium text-gray-900">Phone Support</p>
              <a href="tel:+911234567890" className="text-purple-600 hover:underline">
                +91 123 456 7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
