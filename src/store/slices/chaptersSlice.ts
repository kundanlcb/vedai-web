import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Chapter } from '../../types/learning';

interface ChaptersState {
  items: Chapter[];
  selectedChapter: Chapter | null;
  loading: boolean;
  error: string | null;
  bySubjectId: Record<string, Chapter[]>;
}

const initialState: ChaptersState = {
  items: [],
  selectedChapter: null,
  loading: false,
  error: null,
  bySubjectId: {},
};

// Mock async thunks
export const fetchChaptersBySubject = createAsyncThunk(
  'chapters/fetchBySubject',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      // Mock data - replace with actual API call
      const mockChapters: Chapter[] = [
        {
          id: '1',
          subjectId,
          name: 'Algebra Fundamentals',
          description: 'Basic algebraic concepts, equations, and problem solving',
          topicsCount: 8,
          lessonsCount: 15,
          questionsCount: 50,
          duration: 120,
          progress: 70,
          status: 'in_progress',
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          subjectId,
          name: 'Geometry Basics',
          description: 'Introduction to shapes, angles, and geometric principles',
          topicsCount: 10,
          lessonsCount: 18,
          questionsCount: 60,
          duration: 150,
          progress: 45,
          status: 'in_progress',
          order: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          subjectId,
          name: 'Trigonometry',
          description: 'Study of triangles, angles, and trigonometric functions',
          topicsCount: 12,
          lessonsCount: 20,
          questionsCount: 70,
          duration: 180,
          progress: 20,
          status: 'in_progress',
          order: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          subjectId,
          name: 'Calculus Introduction',
          description: 'Limits, derivatives, and basic integration',
          topicsCount: 15,
          lessonsCount: 25,
          questionsCount: 80,
          duration: 200,
          progress: 0,
          status: 'not_started',
          order: 4,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      
      return { subjectId, chapters: mockChapters };
    } catch (error) {
      return rejectWithValue('Failed to fetch chapters');
    }
  }
);

export const fetchChapterById = createAsyncThunk(
  'chapters/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Mock data - replace with actual API call
      const mockChapter: Chapter = {
        id,
        subjectId: '1',
        name: 'Algebra Fundamentals',
        description: 'Basic algebraic concepts, equations, and problem solving',
        topicsCount: 8,
        lessonsCount: 15,
        questionsCount: 50,
        duration: 120,
        progress: 70,
        status: 'in_progress',
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return mockChapter;
    } catch (error) {
      return rejectWithValue('Failed to fetch chapter');
    }
  }
);

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setSelectedChapter: (state, action: PayloadAction<Chapter | null>) => {
      state.selectedChapter = action.payload;
    },
    clearChapters: (state) => {
      state.items = [];
      state.bySubjectId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch chapters by subject
      .addCase(fetchChaptersBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChaptersBySubject.fulfilled, (state, action) => {
        state.loading = false;
        const { subjectId, chapters } = action.payload;
        state.items = chapters;
        state.bySubjectId[subjectId] = chapters;
      })
      .addCase(fetchChaptersBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch chapter by ID
      .addCase(fetchChapterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChapterById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedChapter = action.payload;
      })
      .addCase(fetchChapterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedChapter, clearChapters } = chaptersSlice.actions;

// Selectors
export const selectChapters = (state: RootState) => state.chapters.items;
export const selectSelectedChapter = (state: RootState) => state.chapters.selectedChapter;
export const selectChaptersLoading = (state: RootState) => state.chapters.loading;
export const selectChaptersError = (state: RootState) => state.chapters.error;
export const selectChaptersBySubjectId = (subjectId: string) => (state: RootState) =>
  state.chapters.bySubjectId[subjectId] || [];

export default chaptersSlice.reducer;
