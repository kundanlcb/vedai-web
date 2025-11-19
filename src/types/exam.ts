// Practice and Exam types

import { ID } from './common';

export interface PracticeQuestion {
  id: ID;
  questionId: ID;
  question: string;
  type: 'mcq' | 'true_false' | 'fill_blank' | 'subjective' | 'match';
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  options?: Array<{
    id: string;
    text: string;
    order: number;
  }>;
}

export interface PracticeTest {
  id: ID;
  name: string;
  description?: string;
  questionsCount: number;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questions?: PracticeQuestion[];
}

export interface PracticeAttempt {
  id: ID;
  testId: ID;
  userId: ID;
  answers: Record<ID, string | string[]>; // questionId -> answer
  markedForReview: ID[];
  score: number;
  totalMarks: number;
  accuracy: number;
  timeTaken: number; // in seconds
  status: 'in_progress' | 'submitted' | 'completed';
  startedAt: string;
  submittedAt?: string;
}

export interface PracticeResult {
  id: ID;
  attemptId: ID;
  testId: ID;
  userId: ID;
  score: number;
  totalMarks: number;
  accuracy: number;
  timeTaken: number;
  questionsAttempted: number;
  questionsCorrect: number;
  questionsWrong: number;
  questionsSkipped: number;
  difficultyBreakdown: {
    easy: { attempted: number; correct: number };
    medium: { attempted: number; correct: number };
    hard: { attempted: number; correct: number };
  };
  questionAnalysis: Array<{
    questionId: ID;
    userAnswer: string | string[];
    correctAnswer: string | string[];
    isCorrect: boolean;
    timeSpent: number;
  }>;
  submittedAt: string;
}

export interface Exam {
  id: ID;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  syllabus?: string;
  totalQuestions: number;
  totalMarks: number;
  duration: number; // in minutes
  passingMarks?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  sections?: ExamSection[];
  status: 'upcoming' | 'ongoing' | 'completed';
  userStatus?: 'not_registered' | 'registered' | 'in_progress' | 'completed';
  bestScore?: number;
  attempts?: number;
}

export interface ExamSection {
  id: ID;
  examId: ID;
  name: string;
  duration: number; // in minutes
  totalQuestions: number;
  questions?: ID[]; // questionIds
  order: number;
}

export interface ExamAttempt {
  id: ID;
  examId: ID;
  userId: ID;
  answers: Record<ID, string | string[]>; // questionId -> answer
  markedForReview: ID[];
  sectionProgress: Record<ID, boolean>; // sectionId -> completed
  score?: number;
  status: 'in_progress' | 'submitted' | 'completed';
  isFullScreen?: boolean;
  startedAt: string;
  submittedAt?: string;
}

export interface ExamResult {
  id: ID;
  attemptId: ID;
  examId: ID;
  userId: ID;
  score: number;
  totalMarks: number;
  accuracy: number;
  percentile?: number;
  rank?: number;
  timeTaken: number;
  questionsAttempted: number;
  questionsCorrect: number;
  questionsWrong: number;
  questionsSkipped: number;
  isPassed: boolean;
  sectionResults?: Array<{
    sectionId: ID;
    sectionName: string;
    score: number;
    totalMarks: number;
    accuracy: number;
  }>;
  submittedAt: string;
}

