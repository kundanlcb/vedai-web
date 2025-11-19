import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import subjectsReducer from './slices/subjectsSlice';
import chaptersReducer from './slices/chaptersSlice';
import questionsReducer from './slices/questionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    chapters: chaptersReducer,
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

