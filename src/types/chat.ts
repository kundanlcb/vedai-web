// Chat types

import { ID } from './common';

export interface ChatMessage {
  id: ID;
  conversationId: ID;
  senderType: 'user' | 'bot'; // 'user' or 'ai-assistant'
  content: string;
  sources?: ChatSource[];
  suggestions?: string[]; // follow-up question suggestions
  timestamp: string;
  isRead?: boolean;
}

export interface ChatSource {
  title: string;
  url?: string;
  relevance: number; // 0-100
}

export interface ChatConversation {
  id: ID;
  userId: ID;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

export interface ChatMessage {
  id: ID;
  conversationId: ID;
  senderType: 'user' | 'bot';
  content: string;
  sources?: ChatSource[];
  suggestions?: string[];
  timestamp: string;
  isRead?: boolean;
}

