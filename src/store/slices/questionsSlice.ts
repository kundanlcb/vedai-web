import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Question, QuestionBank } from '../../types/learning';

interface QuestionsState {
  questions: Question[];
  questionBanks: QuestionBank[];
  selectedQuestion: Question | null;
  loading: boolean;
  error: string | null;
  filters: {
    difficulty?: 'easy' | 'medium' | 'hard';
    type?: string;
    search?: string;
  };
}

const initialState: QuestionsState = {
  questions: [],
  questionBanks: [],
  selectedQuestion: null,
  loading: false,
  error: null,
  filters: {},
};

// Mock async thunks
export const fetchQuestionBanks = createAsyncThunk(
  'questions/fetchBanks',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      // Mock data
      const mockBanks: QuestionBank[] = [
        {
          id: '1',
          subjectId,
          name: 'Algebra Practice Set',
          description: 'Comprehensive algebra questions for practice',
          questionsCount: 150,
          difficulty: 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          subjectId,
          name: 'Previous Year Questions',
          description: 'Questions from previous exams',
          questionsCount: 200,
          difficulty: 'hard',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      
      return mockBanks;
    } catch (error) {
      return rejectWithValue('Failed to fetch question banks');
    }
  }
);

export const fetchQuestionsByBank = createAsyncThunk(
  'questions/fetchByBank',
  async (bankId: string, { rejectWithValue }) => {
    try {
      // Mock data
      const mockQuestions: Question[] = [
        {
          id: '1',
          questionBankId: bankId,
          text: 'Solve for x: 2x + 5 = 15',
          type: 'mcq',
          difficulty: 'easy',
          marks: 2,
          options: [
            { id: '1', text: 'x = 5', isCorrect: true, order: 1 },
            { id: '2', text: 'x = 10', isCorrect: false, order: 2 },
            { id: '3', text: 'x = 7', isCorrect: false, order: 3 },
            { id: '4', text: 'x = 3', isCorrect: false, order: 4 },
          ],
          explanation: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          questionBankId: bankId,
          text: 'What is the derivative of x²?',
          type: 'mcq',
          difficulty: 'medium',
          marks: 3,
          options: [
            { id: '1', text: '2x', isCorrect: true, order: 1 },
            { id: '2', text: 'x', isCorrect: false, order: 2 },
            { id: '3', text: 'x²', isCorrect: false, order: 3 },
            { id: '4', text: '2', isCorrect: false, order: 4 },
          ],
          explanation: 'Using power rule: d/dx(x^n) = nx^(n-1), so d/dx(x²) = 2x',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      
      return mockQuestions;
    } catch (error) {
      return rejectWithValue('Failed to fetch questions');
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setSelectedQuestion: (state, action: PayloadAction<Question | null>) => {
      state.selectedQuestion = action.payload;
    },
    setDifficultyFilter: (state, action: PayloadAction<'easy' | 'medium' | 'hard' | undefined>) => {
      state.filters.difficulty = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filters.type = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filters.search = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch question banks
      .addCase(fetchQuestionBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.questionBanks = action.payload;
      })
      .addCase(fetchQuestionBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch questions by bank
      .addCase(fetchQuestionsByBank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsByBank.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsByBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedQuestion,
  setDifficultyFilter,
  setTypeFilter,
  setSearchFilter,
  clearFilters,
} = questionsSlice.actions;

// Selectors
export const selectQuestions = (state: RootState) => state.questions.questions;
export const selectQuestionBanks = (state: RootState) => state.questions.questionBanks;
export const selectSelectedQuestion = (state: RootState) => state.questions.selectedQuestion;
export const selectQuestionsLoading = (state: RootState) => state.questions.loading;
export const selectQuestionsError = (state: RootState) => state.questions.error;
export const selectQuestionsFilters = (state: RootState) => state.questions.filters;

// Filtered questions selector
export const selectFilteredQuestions = (state: RootState) => {
  const { questions, filters } = state.questions;
  const { difficulty, type, search } = filters;
  
  return questions.filter((question) => {
    const matchesDifficulty = difficulty ? question.difficulty === difficulty : true;
    const matchesType = type ? question.type === type : true;
    const matchesSearch = search
      ? question.text.toLowerCase().includes(search.toLowerCase())
      : true;
    
    return matchesDifficulty && matchesType && matchesSearch;
  });
};

export default questionsSlice.reducer;
