// Learning module types

import { ID } from './common';

export interface Subject {
  id: ID;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  chaptersCount: number;
  questionsCount: number;
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: ID;
  subjectId: ID;
  name: string;
  description?: string;
  topicsCount: number;
  lessonsCount: number;
  questionsCount: number;
  duration?: number; // in minutes
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'completed';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: ID;
  chapterId: ID;
  name: string;
  description?: string;
  order: number;
}

export interface Lesson {
  id: ID;
  chapterId: ID;
  topicId?: ID;
  name: string;
  description?: string;
  duration?: number; // in minutes
  contentUrl?: string;
  videoUrl?: string;
  resourceUrls?: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionBank {
  id: ID;
  subjectId: ID;
  name: string;
  description?: string;
  questionsCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  updatedAt: string;
}

export type AnswerType = 'mcq' | 'true_false' | 'fill_blank' | 'subjective' | 'match';

export interface Question {
  id: ID;
  questionBankId: ID;
  chapterId?: ID;
  text: string;
  type: AnswerType;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  examFrequency?: number;
  options?: QuestionOption[]; // for MCQ and True/False
  correctAnswer?: string | string[]; // for subjective and matching
  explanation?: string;
  hints?: string[];
  tags?: string[];
  isFavorite?: boolean;
  userAnswer?: string | string[];
  isCorrect?: boolean;
  timeSpent?: number; // in seconds
  attempts?: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface LearningProgress {
  subjectId: ID;
  chapterId?: ID;
  progress: number; // 0-100
  questionsAttempted: number;
  questionsCorrect: number;
  timeSpent: number; // in seconds
  lastAccessedAt: string;
}

export interface SubjectProgress {
  subjectId: ID;
  subjectName: string;
  progress: number;
  questionsCount: number;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number; // percentage
  timeSpent: number; // in seconds
}

