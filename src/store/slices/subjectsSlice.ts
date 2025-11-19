import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Subject } from '../../types/learning';

interface SubjectsState {
  items: Subject[];
  selectedSubject: Subject | null;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    board?: string;
    class?: string;
    medium?: string;
  };
}

const initialState: SubjectsState = {
  items: [],
  selectedSubject: null,
  loading: false,
  error: null,
  filters: {
    search: '',
  },
};

// Mock async thunks (to be replaced with actual API calls)
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async (_, { rejectWithValue }) => {
    try {
      // Mock data - replace with actual API call
      const mockSubjects: Subject[] = [
        {
          id: '1',
          name: 'Mathematics',
          description: 'Complete mathematics curriculum covering algebra, geometry, calculus, and more',
          icon: '📐',
          color: 'blue',
          chaptersCount: 12,
          questionsCount: 450,
          progress: 45,
          status: 'in_progress',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Physics',
          description: 'Comprehensive physics topics including mechanics, thermodynamics, and electromagnetism',
          icon: '⚛️',
          color: 'purple',
          chaptersCount: 10,
          questionsCount: 380,
          progress: 30,
          status: 'in_progress',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Chemistry',
          description: 'Learn organic, inorganic, and physical chemistry concepts',
          icon: '🧪',
          color: 'green',
          chaptersCount: 11,
          questionsCount: 420,
          progress: 60,
          status: 'in_progress',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Biology',
          description: 'Study life sciences, including botany, zoology, and human biology',
          icon: '🧬',
          color: 'red',
          chaptersCount: 13,
          questionsCount: 500,
          progress: 25,
          status: 'in_progress',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      
      return mockSubjects;
    } catch (error) {
      return rejectWithValue('Failed to fetch subjects');
    }
  }
);

export const fetchSubjectById = createAsyncThunk(
  'subjects/fetchSubjectById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Mock data - replace with actual API call
      const mockSubject: Subject = {
        id,
        name: 'Mathematics',
        description: 'Complete mathematics curriculum covering algebra, geometry, calculus, and more',
        icon: '📐',
        color: 'blue',
        chaptersCount: 12,
        questionsCount: 450,
        progress: 45,
        status: 'in_progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return mockSubject;
    } catch (error) {
      return rejectWithValue('Failed to fetch subject');
    }
  }
);

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    setSelectedSubject: (state, action: PayloadAction<Subject | null>) => {
      state.selectedSubject = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setBoardFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filters.board = action.payload;
    },
    setClassFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filters.class = action.payload;
    },
    setMediumFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filters.medium = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { search: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch subject by ID
      .addCase(fetchSubjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSubject = action.payload;
      })
      .addCase(fetchSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedSubject,
  setSearchFilter,
  setBoardFilter,
  setClassFilter,
  setMediumFilter,
  clearFilters,
} = subjectsSlice.actions;

// Selectors
export const selectSubjects = (state: RootState) => state.subjects.items;
export const selectSelectedSubject = (state: RootState) => state.subjects.selectedSubject;
export const selectSubjectsLoading = (state: RootState) => state.subjects.loading;
export const selectSubjectsError = (state: RootState) => state.subjects.error;
export const selectSubjectsFilters = (state: RootState) => state.subjects.filters;

// Filtered subjects selector
export const selectFilteredSubjects = (state: RootState) => {
  const { items, filters } = state.subjects;
  const { search, board, class: className, medium } = filters;
  
  return items.filter((subject) => {
    const matchesSearch = search
      ? subject.name.toLowerCase().includes(search.toLowerCase()) ||
        subject.description?.toLowerCase().includes(search.toLowerCase())
      : true;
    
    // Add more filters as needed when backend supports them
    return matchesSearch;
  });
};

export default subjectsSlice.reducer;
