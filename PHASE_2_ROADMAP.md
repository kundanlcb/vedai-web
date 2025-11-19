# Phase 2: Learning Module Implementation Roadmap

**Timeline**: 2 weeks (Days 1-10)  
**Status**: Ready to Start

## Overview
Phase 2 focuses on building the learning module with subjects, chapters, and lessons. This includes creating pages, components, Redux slices, and API integration.

---

## Week 1: Subjects & Chapters Infrastructure

### Day 1-2: Redux Slices & API Services
- [ ] Create `subjectsSlice.ts` with Redux state for subjects list
  - State: `subjects[]`, `selectedSubject`, `loading`, `error`
  - Actions: `fetchSubjects`, `selectSubject`, `updateProgress`
  
- [ ] Create `chaptersSlice.ts` for chapters data
  - State: `chapters[]`, `selectedChapter`, `loading`
  - Actions: `fetchChapters`, `selectChapter`

- [ ] Create `subjectService.ts` API service
  - `getSubjects()`
  - `getSubjectById(id)`
  - `getChaptersBySubject(subjectId)`
  - `getChapterDetails(chapterId)`
  - `updateProgress(subjectId, progress)`

### Day 3-4: Subject Pages
- [ ] Create `SubjectsPage.tsx`
  - Filter subjects by board/medium/class
  - Search functionality
  - Display list in grid or table
  - Show progress per subject
  - Link to detail page

- [ ] Create `SubjectDetailPage.tsx`
  - Display subject info and description
  - Show list of chapters
  - Overall progress indicator
  - Start learning button

- [ ] Create `SubjectListCard.tsx` component
  - Reusable subject card with more details
  - Progress bar
  - Chapter count

### Day 5: Polish & Testing
- [ ] Add loading states to subject pages
- [ ] Add error handling
- [ ] Test responsive design
- [ ] Setup mock data for development

---

## Week 2: Chapters & Lessons

### Day 1-2: Chapter Pages
- [ ] Create `ChaptersPage.tsx`
  - Display chapters for selected subject
  - Filter by difficulty
  - Search chapters
  - Show estimated time

- [ ] Create `ChapterDetailPage.tsx`
  - Chapter overview
  - List of lessons/topics
  - Learning objectives
  - Resources

- [ ] Create `ChapterCard.tsx` component
  - Chapter title and description
  - Lesson count
  - Progress/completion status
  - Difficulty badge

### Day 3-4: Lessons & Content
- [ ] Create `LessonPage.tsx`
  - Display lesson content
  - Theory/explanation
  - Examples
  - Practice questions
  - Next/Previous navigation

- [ ] Create `ContentViewerPage.tsx`
  - Markdown content viewer
  - Images and media support
  - Code syntax highlighting
  - PDF viewer integration

- [ ] Create `LessonCard.tsx` component
  - Lesson title
  - Content type icon
  - Duration
  - Completion status

### Day 5: Integration & Testing
- [ ] Connect Redux slices to pages
- [ ] Integrate API calls
- [ ] Add error boundaries
- [ ] Performance optimization
- [ ] Accessibility audit

---

## Implementation Details

### Redux State Structure
```typescript
// subjectsSlice
{
  items: Subject[],
  selectedId: string | null,
  filter: {
    board: string,
    class: string,
    medium: string,
    search: string
  },
  progress: Record<string, number>, // subject.id -> progress%
  status: 'idle' | 'loading' | 'error',
  error: string | null
}

// chaptersSlice
{
  items: Chapter[],
  bySubjectId: Record<string, Chapter[]>,
  selectedId: string | null,
  progress: Record<string, number>, // chapter.id -> progress%
  status: 'idle' | 'loading' | 'error',
  error: string | null
}
```

### Data Models
```typescript
interface Subject {
  id: string
  name: string
  description: string
  icon?: string
  board: string
  class: string
  medium: string
  progress: number // 0-100
  chaptersCount: number
  color?: 'blue' | 'green' | 'red' | 'purple'
  lastAccessed?: Date
}

interface Chapter {
  id: string
  subjectId: string
  name: string
  description: string
  progress: number // 0-100
  lessonsCount: number
  estimatedTime: number // in minutes
  difficulty: 'easy' | 'medium' | 'hard'
  topics: string[]
  order: number
}

interface Lesson {
  id: string
  chapterId: string
  name: string
  description: string
  content: string // markdown
  type: 'theory' | 'example' | 'practice'
  duration: number // in minutes
  completed: boolean
  order: number
  resources?: {
    title: string
    url: string
    type: 'pdf' | 'video' | 'link'
  }[]
}
```

### API Endpoints (Expected)
```
GET  /subjects - Get all subjects
GET  /subjects/:id - Get subject detail
GET  /subjects/:id/chapters - Get chapters by subject
GET  /chapters/:id - Get chapter detail
GET  /chapters/:id/lessons - Get lessons by chapter
GET  /lessons/:id - Get lesson detail
POST /progress/subject/:subjectId - Update subject progress
POST /progress/chapter/:chapterId - Update chapter progress
POST /progress/lesson/:lessonId - Mark lesson complete
```

### Components to Create
1. **Pages**
   - `SubjectsPage.tsx` (1 day)
   - `SubjectDetailPage.tsx` (1 day)
   - `ChaptersPage.tsx` (1 day)
   - `ChapterDetailPage.tsx` (0.5 days)
   - `LessonPage.tsx` (1 day)
   - `ContentViewerPage.tsx` (1 day)

2. **Cards**
   - `SubjectListCard.tsx` (0.5 days)
   - `ChapterCard.tsx` (0.5 days)
   - `LessonCard.tsx` (0.5 days)

3. **Utilities**
   - `contentParser.ts` - Parse markdown/HTML
   - `progressCalculator.ts` - Calculate progress
   - `timeEstimator.ts` - Estimate study time

### Routing
```typescript
// Routes to add
<Route path="/learning/subjects" element={<SubjectsPage />} />
<Route path="/learning/subjects/:subjectId" element={<SubjectDetailPage />} />
<Route path="/learning/subjects/:subjectId/chapters" element={<ChaptersPage />} />
<Route path="/learning/chapters/:chapterId" element={<ChapterDetailPage />} />
<Route path="/learning/lessons/:lessonId" element={<LessonPage />} />
<Route path="/learning/content/:contentId" element={<ContentViewerPage />} />
```

---

## Testing Checklist

- [ ] API integration tests
- [ ] Component render tests
- [ ] Redux actions and reducers tests
- [ ] Form validation tests
- [ ] Navigation tests
- [ ] Responsive design tests
- [ ] Performance tests
- [ ] Accessibility tests (a11y)

---

## Acceptance Criteria

### Subjects Module
- [x] User can view all subjects
- [x] User can filter subjects
- [x] User can search subjects
- [x] User can see progress per subject
- [x] User can click to view subject details

### Chapters Module
- [x] User can view chapters for a subject
- [x] User can see chapter progress
- [x] User can filter chapters by difficulty
- [x] User can view chapter details
- [x] User can see lesson list in chapter

### Learning Experience
- [x] Content displays correctly
- [x] Navigation between lessons works
- [x] Progress is tracked
- [x] Mobile responsive
- [x] No console errors

---

## Resource Requirements

### Time Estimate
- Redux setup: 1-2 days
- Pages: 4-5 days
- Components: 2-3 days
- API integration: 1-2 days
- Testing: 1-2 days
- **Total**: ~10 days (2 weeks)

### External Dependencies
- Markdown parser (e.g., `react-markdown`)
- Code highlighter (e.g., `highlight.js`)
- PDF viewer (e.g., `pdfjs-dist`)

---

## Success Metrics

- [ ] All pages load without errors
- [ ] Redux state management working
- [ ] API calls successful
- [ ] Bundle size < 500KB gzipped
- [ ] Lighthouse score > 85
- [ ] Mobile responsiveness 100%
- [ ] 0 console errors/warnings

---

## Notes

- Use the existing component patterns from Phase 1
- Maintain consistent styling with Tailwind
- Keep API calls in service layer
- Use lazy loading for pages
- Implement error boundaries
- Add loading skeletons for better UX

---

**Start Date**: Ready to begin  
**Phase 1 Completion Date**: November 18, 2025  
**Expected Phase 2 Completion**: December 2, 2025 (2 weeks)

