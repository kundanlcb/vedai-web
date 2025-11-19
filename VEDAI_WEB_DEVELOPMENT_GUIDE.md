# VedAI Student App - Web (React) Development Guide

## Project Overview
VedAI is an AI-powered student learning platform that helps students excel in their studies with personalized learning experiences, comprehensive question banks, and real-time progress tracking. This document provides complete guidance for developing the web version using React.

**Current Date**: November 18, 2025
**Target**: Full-featured React web application

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Feature Modules](#feature-modules)
4. [Authentication Flow](#authentication-flow)
5. [Component Architecture](#component-architecture)
6. [Data Models](#data-models)
7. [API Integration](#api-integration)
8. [UI/UX Guidelines](#uiux-guidelines)
9. [Implementation Checklist](#implementation-checklist)

---

## Tech Stack

### Frontend
- **Framework**: React 19.1.1
- **Routing**: React Router v6
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS or styled-components
- **UI Components**: Material-UI or Custom Components
- **Date Handling**: date-fns
- **Icons**: React Icons or Material Icons
- **Validation**: Zod or Yup

### Backend
- **API**: REST API (existing backend or new implementation)
- **Authentication**: JWT tokens
- **Database**: PostgreSQL (recommended)

### Development Tools
- **Build Tool**: Vite or Create React App
- **Package Manager**: npm or yarn
- **Version Control**: Git
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

---

## Project Structure

```
vedai-web/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── NavigationBar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Loader.tsx
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── EditProfileForm.tsx
│   │   │   └── ChangePasswordForm.tsx
│   │   ├── cards/
│   │   │   ├── SubjectCard.tsx
│   │   │   ├── ChapterCard.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── DailyGoalCard.tsx
│   │   │   └── ProgressCard.tsx
│   │   └── modals/
│   │       ├── ConfirmModal.tsx
│   │       └── NotificationModal.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   └── ResetPasswordPage.tsx
│   │   ├── dashboard/
│   │   │   ├── HomePage.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── learning/
│   │   │   ├── SubjectsPage.tsx
│   │   │   ├── SubjectDetailPage.tsx
│   │   │   ├── ChaptersPage.tsx
│   │   │   ├── ChapterDetailPage.tsx
│   │   │   ├── QuestionBankPage.tsx
│   │   │   ├── QuestionBankDetailPage.tsx
│   │   │   ├── QuestionDetailPage.tsx
│   │   │   ├── LessonPage.tsx
│   │   │   └── ContentViewerPage.tsx
│   │   ├── practice/
│   │   │   ├── PracticeQuestionsPage.tsx
│   │   │   ├── PracticeTestPage.tsx
│   │   │   └── ResultsPage.tsx
│   │   ├── exams/
│   │   │   ├── ExamsPage.tsx
│   │   │   ├── ExamListPage.tsx
│   │   │   ├── ExamDetailPage.tsx
│   │   │   ├── ExamAttemptPage.tsx
│   │   │   └── ExamResultsPage.tsx
│   │   ├── chat/
│   │   │   └── ChatPage.tsx
│   │   ├── profile/
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── EditProfilePage.tsx
│   │   │   ├── ChangePasswordPage.tsx
│   │   │   ├── ProgressPage.tsx
│   │   │   ├── HelpPage.tsx
│   │   │   └── AboutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   ├── useApi.ts
│   │   ├── usePagination.ts
│   │   └── useLocalStorage.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── subjectService.ts
│   │   ├── questionService.ts
│   │   ├── examService.ts
│   │   └── chatService.ts
│   ├── store/
│   │   ├── store.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── userSlice.ts
│   │       ├── subjectsSlice.ts
│   │       └── questionsSlice.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── subject.ts
│   │   ├── chapter.ts
│   │   ├── question.ts
│   │   ├── exam.ts
│   │   └── common.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── storage.ts
│   │   └── constants.ts
│   ├── styles/
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   ├── variables.css
│   │   └── responsive.css
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── App.tsx
│   ├── App.css
│   └── index.tsx
├── .env
├── .env.example
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Feature Modules

### 1. Authentication Module
**Routes**: `/login`, `/register`, `/forgot-password`, `/reset-password`

**Components**:
- LoginPage
- RegisterPage
- ForgotPasswordPage
- ResetPasswordPage
- LoginForm
- RegisterForm

**Features**:
- Email/Password login
- User registration with validation
- Password reset via email
- JWT token management
- Session persistence
- Remember me functionality
- Error handling and validation messages

**API Endpoints**:
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/verify
```

---

### 2. Dashboard/Home Module
**Routes**: `/`, `/dashboard`, `/home`

**Components**:
- HomePage
- DailyGoalCard
- ProgressCard
- SubjectCard
- QuestionBankCard
- DashboardLayout

**Features**:
- Welcome greeting with user name and profile picture
- Daily goal tracking (Minutes, Chapters, Questions)
- Progress visualization
- Subject tiles with progress percentage
- Question bank listings
- Quick access to favorite subjects
- Recent activity summary

**UI Elements**:
- Header with navigation
- Sidebar with menu
- Main content area
- Daily goal cards (one rectangular, rest horizontal)
- Subject cards (3-column grid)
- Question bank cards (horizontal list)

---

### 3. Learning Module (Main Feature)
**Routes**: `/learn`, `/subjects`, `/chapters`, `/questions`, `/lessons`

#### 3.1 Subjects Page
**Route**: `/learn/subjects`
**Components**: SubjectsPage, SubjectCard, SubjectListScreen

**Features**:
- List all available subjects
- Show chapters count
- Display progress percentage
- Color-coded subjects
- Click to view details

**UI Design**:
- Header with "Subjects" title
- Subject cards with:
  - Subject icon
  - Subject name
  - Progress bar
  - Chapters count
  - Color indicator

#### 3.2 Subject Detail Page
**Route**: `/learn/subjects/:subjectId`
**Components**: SubjectDetailPage, ChapterCard

**Features**:
- Subject overview
- All chapters in the subject
- Progress tracking per chapter
- Chapter details (topics, duration)
- Start/Review buttons
- Chapter-wise progress

**UI Design**:
- Header with subject name
- Overview card with statistics
- Chapter list with:
  - Chapter name
  - Topics
  - Duration
  - Progress circle
  - Status badge

#### 3.3 Chapter Detail Page
**Route**: `/learn/chapters/:chapterId`
**Components**: ChapterDetailPage, LessonCard

**Features**:
- Chapter lessons
- Lesson content
- Progress per lesson
- Content viewer integration
- Next/Previous lesson navigation

#### 3.4 Question Bank Page
**Route**: `/learn/question-banks`
**Components**: QuestionBankPage, QuestionBankListScreen

**Features**:
- List all question banks
- Organize by subject
- Show question count
- Filter by difficulty
- Search functionality

**UI Design**:
- Header with "Question Banks" title
- Info card explaining feature
- Question bank cards with:
  - Subject name
  - Question count
  - Difficulty badge
  - Progress indicator

#### 3.5 Question Bank Detail Page
**Route**: `/learn/question-banks/:bankId`
**Components**: QuestionBankDetailPage

**Features**:
- Questions organized by chapter
- Filter by difficulty
- Question statistics
- Search functionality
- Chapter-wise grouping

**UI Design**:
- Section-based layout (Chapter 1, Chapter 2, etc.)
- Question rows with:
  - Question text
  - Difficulty indicator
  - Solved status
  - Last attempted date

#### 3.6 Question Detail Page
**Route**: `/learn/questions/:questionId`
**Components**: QuestionDetailPage, AnswerOptions

**Features**:
- Full question display
- Dynamic answer options based on type:
  - **MCQ**: Multiple choice buttons
  - **Subjective**: Text area + Photo/Notes options
  - **True/False**: Two buttons
  - **Fill-blank**: Input field
  - **Match**: Matching interface
- Answer submission
- Correct answer display
- Explanation
- Exam frequency
- Related questions
- Save as favorite

**Answer Format Options**:
- Text (type answer)
- Photo (capture handwritten solution)
- Notes (external notes link)

**UI Design**:
- Question card with:
  - Question title
  - Difficulty badge
  - Question type indicator
- Dynamic answer section based on type
- Result feedback
- Exam frequency info
- Related questions section

#### 3.7 Lesson/Content Viewer Page
**Route**: `/learn/lessons/:lessonId`
**Components**: ContentViewerPage, LessonContent

**Features**:
- Display lesson content
- Progress tracking
- Bookmark functionality
- Notes section
- Next/Previous navigation
- Share functionality
- Print functionality

---

### 4. Practice Module
**Routes**: `/practice`, `/practice/questions`, `/practice/tests`

#### 4.1 Practice Questions
**Route**: `/practice/questions`
**Components**: PracticeQuestionsPage

**Features**:
- Filter by subject/chapter/difficulty
- Solve questions
- Time tracking
- Statistics tracking
- Difficulty adjustment
- Topic-wise practice

#### 4.2 Practice Tests
**Route**: `/practice/tests`
**Components**: PracticeTestPage

**Features**:
- Timed tests
- Auto-submit on time end
- Progress indicator
- Question navigation
- Mark for review
- Unanswered questions display

#### 4.3 Results Page
**Route**: `/practice/results/:testId`
**Components**: ResultsPage

**Features**:
- Score display
- Question-wise review
- Time spent analysis
- Correct/Incorrect breakdown
- Difficulty analysis
- Performance graph
- Print certificate

---

### 5. Exams Module
**Routes**: `/exams`, `/exams/list`, `/exams/detail`, `/exams/attempt`, `/exams/results`

#### 5.1 Exams Page
**Route**: `/exams`
**Components**: ExamsPage, ExamListPage

**Features**:
- List all available exams
- Filter by status (upcoming, ongoing, completed)
- Show exam details
- Registration status
- Best score display

**UI Design**:
- Tab-based layout (Upcoming, Ongoing, Completed)
- Exam cards with:
  - Exam name
  - Date/Time
  - Duration
  - Total questions
  - Best score
  - Status badge

#### 5.2 Exam Detail Page
**Route**: `/exams/:examId`
**Components**: ExamDetailPage

**Features**:
- Full exam information
- Syllabus details
- Previous year papers
- Mock tests
- Exam tips
- Registration button

#### 5.3 Exam Attempt Page
**Route**: `/exams/:examId/attempt`
**Components**: ExamAttemptPage, QuestionDisplay

**Features**:
- Full screen mode
- Timer display
- Progress bar
- Question navigation
- Section switching
- Mark for review
- Answer confirmation
- Submit exam button

**UI Elements**:
- Header with timer
- Progress indicator
- Left sidebar with:
  - Question list
  - Question status (answered, unanswered, marked)
  - Section tabs
- Main content area with question
- Navigation buttons (Previous, Next, Submit)

#### 5.4 Exam Results Page
**Route**: `/exams/:examId/results`
**Components**: ExamResultsPage

**Features**:
- Final score
- Percentile rank
- Section-wise scores
- Question-wise analysis
- Recommendations
- Downloadable report
- Share score functionality

---

### 6. Chat Module (VedAI Assistant)
**Route**: `/chat`
**Components**: ChatPage, ChatInterface, MessageBubble

**Features**:
- AI-powered Q&A
- Real-time messaging
- Source citations
- Question history
- Clear chat
- Export chat
- Suggested questions

**UI Design**:
- Chat interface with:
  - Message bubbles (user/bot)
  - Input field at bottom
  - Typing indicator
  - Source citations
  - Suggested follow-up questions

---

### 7. Profile Module
**Routes**: `/profile`, `/profile/edit`, `/profile/change-password`, `/profile/progress`, `/profile/help`, `/profile/about`

#### 7.1 Profile Page
**Route**: `/profile`
**Components**: ProfilePage

**Features**:
- User avatar/profile picture
- User information (name, email, class, school)
- Statistics (total questions solved, accuracy, streak)
- Quick access to settings
- Logout button

**UI Design**:
- Profile card with picture and info
- Statistics grid
- Menu items for settings
- Logout button at bottom

#### 7.2 Edit Profile Page
**Route**: `/profile/edit`
**Components**: EditProfilePage, EditProfileForm

**Features**:
- Edit personal information
- Edit academic information
- Update profile picture
- Save preferences
- Validation
- Success/Error messages

**Form Fields**:
- Full Name
- Email (read-only)
- Profile Picture
- School Name
- Class/Grade
- Board
- Medium of Study
- Bio

#### 7.3 Change Password Page
**Route**: `/profile/change-password`
**Components**: ChangePasswordPage, ChangePasswordForm

**Features**:
- Current password verification
- New password strength indicator
- Password confirmation
- Validation rules display
- Success notification

**UI Elements**:
- Security info card
- Form with 3 password fields
- Password requirements checklist
- Save/Cancel buttons

#### 7.4 Progress Page
**Route**: `/profile/progress`
**Components**: ProgressPage

**Features**:
- Overall progress stats
- Subject-wise progress
- Chapter-wise progress
- Time spent analysis
- Accuracy trends
- Weekly/Monthly graphs
- Achievements

**Charts**:
- Progress pie chart
- Time spent bar chart
- Accuracy trend line chart
- Daily activity heatmap

#### 7.5 Help & Support Page
**Route**: `/profile/help`
**Components**: HelpPage

**Features**:
- FAQ section
- Contact information
- Live chat support
- Documentation links
- Community forum link
- Bug report form

**UI Design**:
- FAQ accordion
- Contact cards (Email, Phone, Chat)
- Resource links
- Support form

#### 7.6 About Page
**Route**: `/profile/about`
**Components**: AboutPage

**Features**:
- App information
- Version details
- Feature highlights
- Team information
- Privacy policy link
- Terms of service link
- Copyright information

---

## Authentication Flow

### Login Flow
```
User visits /login
→ Enters email and password
→ Submit login form
→ API call to /api/auth/login
→ Receive JWT token and refresh token
→ Store tokens in localStorage/cookies
→ Redirect to /dashboard
→ Set user in Redux store
```

### Register Flow
```
User visits /register
→ Enters Full Name, Email, Password, Confirm Password
→ Form validation
→ Submit registration form
→ API call to /api/auth/register
→ Receive JWT token
→ Auto-login and redirect to /dashboard
→ OR Show success message and redirect to /login
```

### Forgot Password Flow
```
User visits /forgot-password
→ Enters email
→ Submit form
→ API call to /api/auth/forgot-password
→ Receive confirmation message
→ Email sent with reset link
→ User clicks link in email
→ Redirected to /reset-password/:token
→ Enter new password
→ API call to /api/auth/reset-password
→ Redirect to /login
```

### Protected Routes
- All routes except `/login`, `/register`, `/forgot-password` require authentication
- Check token validity
- Redirect to `/login` if unauthorized
- Refresh token if expired
- Show loading while verifying

---

## Component Architecture

### Common Components

#### Header
- Logo
- Search bar
- User profile dropdown
- Notifications icon
- Settings icon

#### Sidebar
- Navigation menu
- Subject quick access
- Collapse/Expand toggle
- Theme toggle

#### Navigation Bar
- Mobile responsive menu
- Breadcrumb navigation
- Back button

#### Cards
- Reusable card container
- Variant support (filled, outlined)
- Hover effects
- Shadow variations

#### Forms
- Form input fields
- Validation display
- Error messages
- Submit buttons
- Loading states

#### Modals
- Confirmation dialogs
- Notification popups
- Form modals
- Fullscreen modals

### Responsive Design
- **Mobile**: < 640px (single column, hamburger menu)
- **Tablet**: 640px - 1024px (2-3 columns)
- **Desktop**: > 1024px (full layout)

### Dark Mode
- Toggle in header/settings
- Persist in localStorage
- All components support both themes
- High contrast colors for accessibility

---

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  class: string;
  school: string;
  board: string;
  medium: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Subject
```typescript
interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: number;
  progress: number;
  description?: string;
}
```

### Chapter
```typescript
interface Chapter {
  id: string;
  subjectId: string;
  name: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  duration: number;
  topics?: string[];
}
```

### Question
```typescript
interface Question {
  id: string;
  title: string;
  type: 'mcq' | 'subjective' | 'true-false' | 'fill-blank' | 'match';
  difficulty: 'easy' | 'medium' | 'hard';
  solved: boolean;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  chapterId: string;
}
```

### Exam
```typescript
interface Exam {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  totalQuestions: number;
  totalMarks: number;
  passingMarks: number;
  sections: ExamSection[];
  status: 'upcoming' | 'ongoing' | 'completed';
  userScore?: number;
  bestScore?: number;
}
```

### DailyGoal
```typescript
interface DailyGoal {
  id: string;
  label: string;
  icon: string;
  target: number;
  current: number;
  unit: string;
  color: string;
  completed: boolean;
}
```

---

## API Integration

### Base URL Configuration
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
```

### Authentication Headers
```typescript
{
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### Error Handling
- 401: Unauthorized - Refresh token or redirect to login
- 403: Forbidden - Show permission error
- 404: Not Found - Show 404 page
- 500: Server Error - Show error notification
- Network Error: Show retry option

### Request/Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```

### API Endpoints (Complete List)

#### Auth
```
POST   /auth/login
POST   /auth/register
POST   /auth/logout
POST   /auth/refresh-token
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/verify
```

#### Users
```
GET    /users/profile
PUT    /users/profile
POST   /users/change-password
GET    /users/progress
GET    /users/statistics
```

#### Subjects
```
GET    /subjects
GET    /subjects/:id
GET    /subjects/:id/chapters
GET    /subjects/progress
```

#### Chapters
```
GET    /chapters/:id
GET    /chapters/:id/lessons
GET    /chapters/:id/questions
PUT    /chapters/:id/progress
```

#### Questions
```
GET    /questions
GET    /questions/:id
GET    /questions/:id/related
POST   /questions/:id/answer
GET    /questions/by-bank/:bankId
GET    /questions/search
```

#### Question Banks
```
GET    /question-banks
GET    /question-banks/:id
GET    /question-banks/:id/questions
```

#### Exams
```
GET    /exams
GET    /exams/:id
GET    /exams/:id/questions
POST   /exams/:id/register
POST   /exams/:id/attempt
POST   /exams/:id/submit
GET    /exams/:id/results
```

#### Chat
```
POST   /chat/message
GET    /chat/history
POST   /chat/clear-history
```

---

## UI/UX Guidelines

### Design System

#### Colors
- **Primary**: #4F46E5 (Indigo)
- **Secondary**: #06B6D4 (Cyan)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red)
- **Background**: #F9FAFB (Light Gray)
- **Surface**: #FFFFFF (White)
- **Text Primary**: #1F2937 (Dark Gray)
- **Text Secondary**: #6B7280 (Medium Gray)

#### Typography
- **Display**: 32px / 700 weight (headings)
- **Headline**: 24px / 600 weight (page titles)
- **Title**: 20px / 600 weight (section titles)
- **Body**: 16px / 400 weight (main text)
- **Small**: 14px / 500 weight (labels)
- **Tiny**: 12px / 400 weight (hints)

#### Spacing
- **XS**: 4px
- **SM**: 8px
- **MD**: 12px
- **LG**: 16px
- **XL**: 24px
- **2XL**: 32px
- **3XL**: 48px

#### Borders & Shadows
- **Border Radius**: 8px (normal), 12px (large), 16px (extra large)
- **Shadow**: 0 4px 6px rgba(0,0,0,0.1)
- **Elevated**: 0 10px 15px rgba(0,0,0,0.15)

#### Buttons
- **Primary**: Filled, rounded, with icon support
- **Secondary**: Outlined variant
- **Text**: No background, text only
- **Size**: Small (32px), Medium (40px), Large (48px)
- **States**: Normal, Hover, Active, Disabled, Loading

#### Cards
- **Filled**: White background with shadow
- **Outlined**: Border with transparent background
- **Elevated**: Higher shadow for emphasis
- **Hover**: Slight scale or shadow increase

### Responsive Breakpoints
```
Mobile:   max-width: 640px
Tablet:   641px - 1024px
Desktop:  > 1024px
```

### Accessibility
- WCAG 2.1 AA standard
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast >= 4.5:1 for text
- Alt text for images

### User Experience
- **Feedback**: Show success/error messages
- **Loading**: Display spinners for async operations
- **Validation**: Real-time form validation
- **Confirmation**: Confirm destructive actions
- **Undo**: Allow undo for important actions
- **Progress**: Show progress for long operations
- **Empty States**: Friendly messages when no data
- **Tooltips**: Help text for complex features

---

## Implementation Checklist

### Phase 1: Project Setup (Week 1)
- [ ] Initialize React project with TypeScript
- [ ] Setup Tailwind CSS
- [ ] Configure Redux Toolkit
- [ ] Setup Axios and API client
- [ ] Create folder structure
- [ ] Setup environment variables
- [ ] Configure routing with React Router
- [ ] Setup git repository

### Phase 2: Authentication (Week 2)
- [ ] Create login page
- [ ] Create register page
- [ ] Create forgot password page
- [ ] Implement JWT token handling
- [ ] Setup auth context/Redux
- [ ] Create protected route wrapper
- [ ] Implement password validation
- [ ] Setup session persistence

### Phase 3: Dashboard & Layout (Week 2-3)
- [ ] Create main layout (header, sidebar)
- [ ] Implement responsive design
- [ ] Create navigation menu
- [ ] Setup breadcrumb navigation
- [ ] Create home page
- [ ] Implement daily goal cards
- [ ] Create subject cards display
- [ ] Setup theme toggle

### Phase 4: Learning Module - Phase 1 (Week 3-4)
- [ ] Create subjects page
- [ ] Create subject detail page
- [ ] Create chapter list page
- [ ] Create chapter detail page
- [ ] Implement progress tracking
- [ ] Create lesson viewer
- [ ] Setup content display
- [ ] Implement bookmarking

### Phase 5: Learning Module - Phase 2 (Week 4-5)
- [ ] Create question bank page
- [ ] Create question bank detail page
- [ ] Create question detail page
- [ ] Implement MCQ answer interface
- [ ] Implement subjective answer interface
- [ ] Implement True/False interface
- [ ] Implement Fill-blank interface
- [ ] Implement Match interface
- [ ] Add photo/notes answer options
- [ ] Implement result display

### Phase 6: Practice Module (Week 5)
- [ ] Create practice questions page
- [ ] Implement difficulty filters
- [ ] Create practice test page
- [ ] Implement timer functionality
- [ ] Create results page
- [ ] Implement statistics display
- [ ] Create performance graphs

### Phase 7: Exams Module (Week 6-7)
- [ ] Create exams page
- [ ] Create exam detail page
- [ ] Create exam attempt page
- [ ] Implement exam timer
- [ ] Implement question navigation
- [ ] Create exam results page
- [ ] Implement result analytics
- [ ] Add exam registration

### Phase 8: Chat Module (Week 7)
- [ ] Create chat page
- [ ] Implement message interface
- [ ] Setup WebSocket for real-time chat
- [ ] Implement message history
- [ ] Add source citations
- [ ] Create suggested questions
- [ ] Setup message search

### Phase 9: Profile Module (Week 8)
- [ ] Create profile page
- [ ] Create edit profile page
- [ ] Create change password page
- [ ] Create progress analytics page
- [ ] Create help page
- [ ] Create about page
- [ ] Implement logout functionality
- [ ] Create settings page

### Phase 10: Testing & Optimization (Week 8-9)
- [ ] Unit testing with Jest
- [ ] Component testing with React Testing Library
- [ ] Integration testing
- [ ] Performance optimization
- [ ] Bundle size analysis
- [ ] SEO optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing

### Phase 11: Deployment (Week 9)
- [ ] Setup CI/CD pipeline
- [ ] Configure production build
- [ ] Setup hosting (Vercel/Netlify)
- [ ] Configure custom domain
- [ ] Setup analytics
- [ ] Configure monitoring
- [ ] Setup error tracking
- [ ] Launch and monitor

---

## Key Features Implementation Details

### 1. Real-time Progress Tracking
- Update progress on question answer
- Sync with backend
- Show real-time updates
- Offline support with sync

### 2. Multiple Question Types
- **MCQ**: Radio buttons or clickable options
- **Subjective**: Text area with formatting
- **True/False**: Two large buttons
- **Fill-blank**: Input fields for blanks
- **Match**: Drag-and-drop matching interface

### 3. Answer Format Options
- **Text**: Direct typing in interface
- **Photo**: Upload/capture image of handwritten answer
- **Notes**: Link to external notes application

### 4. Exam Features
- **Full-screen mode**: Prevent cheating
- **Timer**: Countdown with warnings
- **Question Navigation**: Jump between questions
- **Section switching**: Move between exam sections
- **Mark for review**: Flag questions for later
- **Auto-save**: Save answers periodically

### 5. Analytics & Reports
- **Progress charts**: Line, pie, bar charts
- **Time analysis**: Time spent per subject
- **Accuracy trends**: Weekly/monthly accuracy
- **Comparison**: Compare with class average
- **Performance reports**: Detailed analysis
- **Downloadable reports**: PDF export

### 6. Search & Filtering
- **Global search**: Across all content
- **Subject filter**: By subject
- **Difficulty filter**: Easy/Medium/Hard
- **Topic filter**: By chapter topics
- **Date filter**: By attempt date
- **Status filter**: Solved/Unsolved/Bookmarked

### 7. Notifications
- **In-app notifications**: Toast/snackbar
- **Email notifications**: For important updates
- **Push notifications**: Browser notifications
- **Notification center**: Centralized notification view
- **Notification settings**: User preferences

### 8. Offline Support
- **Service Worker**: Cache important data
- **Offline mode**: Access cached content
- **Sync on online**: Sync answers when online
- **Local storage**: Store user preferences
- **Background sync**: Queue actions for sync

---

## Code Examples

### 1. Redux Setup
```typescript
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Protected Route
```typescript
// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};
```

### 3. API Service
```typescript
// services/api.ts
import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 4. Custom Hook
```typescript
// hooks/useApi.ts
import { useState, useEffect } from 'react';
import api from '../services/api';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T>(url);
        setData(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

### 5. Form Component
```typescript
// components/forms/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: true })}
        placeholder="Email"
        type="email"
      />
      {errors.email && <span>Email is required</span>}
      
      <input
        {...register('password', { required: true })}
        placeholder="Password"
        type="password"
      />
      {errors.password && <span>Password is required</span>}
      
      <button type="submit">Sign In</button>
    </form>
  );
};
```

---

## Testing Strategy

### Unit Tests
- Utility functions
- Validation functions
- Formatters
- Constants

### Component Tests
- Component rendering
- Props validation
- Event handling
- State updates
- Conditional rendering

### Integration Tests
- User flows
- API integration
- Navigation
- Form submission

### E2E Tests
- Login flow
- Complete learning flow
- Exam attempt flow
- Profile updates

### Testing Tools
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing
- Mock Service Worker (MSW) for API mocking

---

## Performance Optimization

### Code Splitting
- Route-based code splitting
- Lazy loading components
- Dynamic imports for heavy components

### Image Optimization
- Compress images
- Use WebP format with fallback
- Lazy load images
- Responsive images with srcset

### Bundle Optimization
- Tree shaking
- Minification
- Gzip compression
- Remove unused dependencies

### Caching Strategy
- Service worker caching
- Browser caching headers
- Query parameter caching
- IndexedDB for larger data

### Performance Monitoring
- Core Web Vitals
- Lighthouse CI
- Bundle analysis
- Performance budget

---

## Deployment Checklist

### Pre-deployment
- [ ] Run all tests
- [ ] Check bundle size
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] SEO audit
- [ ] Security audit
- [ ] Update environment variables
- [ ] Review error tracking setup

### Deployment
- [ ] Build production bundle
- [ ] Deploy to staging
- [ ] Smoke testing
- [ ] Deploy to production
- [ ] Monitor for errors
- [ ] Check analytics
- [ ] Monitor performance

### Post-deployment
- [ ] Monitor error rate
- [ ] Check user feedback
- [ ] Monitor performance metrics
- [ ] Verify all features working
- [ ] Update documentation

---

## Database Schema (Reference)

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  profile_image_url VARCHAR,
  class VARCHAR,
  school VARCHAR,
  board VARCHAR,
  medium VARCHAR,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Subjects Table
```sql
CREATE TABLE subjects (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  icon VARCHAR,
  color VARCHAR,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Chapters Table
```sql
CREATE TABLE chapters (
  id UUID PRIMARY KEY,
  subject_id UUID REFERENCES subjects(id),
  name VARCHAR NOT NULL,
  description TEXT,
  duration_minutes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Questions Table
```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY,
  chapter_id UUID REFERENCES chapters(id),
  title TEXT NOT NULL,
  type VARCHAR NOT NULL,
  difficulty VARCHAR NOT NULL,
  options JSONB,
  correct_answer TEXT,
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Progress Table
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  question_id UUID REFERENCES questions(id),
  answer TEXT,
  is_correct BOOLEAN,
  time_spent_seconds INT,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Security Considerations

### Authentication
- Hash passwords with bcrypt/argon2
- Implement JWT with refresh tokens
- HTTPS only
- Secure cookies (HttpOnly, Secure, SameSite)

### Authorization
- Role-based access control (RBAC)
- Verify ownership on sensitive operations
- Rate limiting on API endpoints

### Data Protection
- Encrypt sensitive data at rest
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize inputs)
- CSRF token validation

### API Security
- Input validation
- Output encoding
- CORS configuration
- API rate limiting
- Request size limits

### Client-side Security
- Sanitize user input
- Validate client-side and server-side
- No sensitive data in localStorage
- Use environment variables for secrets

---

## Monitoring & Analytics

### Error Tracking
- Sentry or similar service
- Error reporting with stack traces
- User context in errors
- Alerting for critical errors

### Performance Monitoring
- Google Analytics or Mixpanel
- Page load time
- User interaction metrics
- Conversion tracking

### Logging
- Server-side logging
- Client-side error logging
- API request/response logging
- User action logging

---

## Support & Maintenance

### Documentation
- API documentation (Swagger/OpenAPI)
- Component storybook
- User guides
- Developer setup guide

### Issue Tracking
- GitHub Issues
- Bug tracking system
- Feature request tracking
- User feedback collection

### Updates & Patches
- Regular dependency updates
- Security patches
- Feature releases
- Bug fixes

---

## Conclusion

This document provides a comprehensive guide for developing the VedAI web application using React. The modular structure, detailed feature breakdown, and implementation checklist will help ensure a complete and high-quality application.

Key priorities:
1. **User Experience**: Responsive, intuitive interface
2. **Performance**: Fast load times, smooth interactions
3. **Security**: Protect user data and privacy
4. **Scalability**: Design for future growth
5. **Maintainability**: Clean, well-documented code

For questions or clarifications, refer to the specific sections or contact the development team.

---

**Last Updated**: November 18, 2025
**Version**: 1.0
**Document Owner**: Development Team

