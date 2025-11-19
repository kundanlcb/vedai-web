# VedAI Web App - Testing Setup & Guide

## 📋 Testing Strategy

This document outlines the testing approach for the VedAI web application.

---

## 🧪 Testing Pyramid

```
        /\
       /  \
      /Unit\      - Component tests
     /______\     - Hook tests
    /        \    - Utility tests
   /   E2E   \    - Full user flows
  /__________\    - Critical paths
```

---

## 🚀 Setup Instructions (Future)

### Install Testing Dependencies

```bash
npm install --save-dev \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  @types/jest \
  jest-environment-jsdom \
  ts-jest \
  vitest \
  @vitest/ui \
  cypress \
  @cypress/schematic
```

### Jest Configuration

Create `jest.config.js`:
```javascript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
```

### Setup Tests File

Create `src/setupTests.ts`:
```typescript
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;
```

---

## 📝 Testing Examples

### Unit Test - Component

Create `src/components/cards/__tests__/DailyGoalCard.test.tsx`:

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import DailyGoalCard from '../DailyGoalCard';

describe('DailyGoalCard', () => {
  it('should render with default props', () => {
    render(<DailyGoalCard />);
    
    expect(screen.getByText('Daily Goal')).toBeInTheDocument();
    expect(screen.getByText('2/5')).toBeInTheDocument();
  });

  it('should display streak counter', () => {
    render(<DailyGoalCard streak={7} />);
    
    expect(screen.getByText(/7d streak/i)).toBeInTheDocument();
  });

  it('should calculate progress percentage correctly', () => {
    const { container } = render(
      <DailyGoalCard goalsCompleted={3} totalGoals={5} />
    );
    
    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar).toHaveStyle('width: 60%');
  });
});
```

### Unit Test - Hook

Create `src/hooks/__tests__/useAuth.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAuth } from '../useAuth';
import store from '@store/store';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useAuth', () => {
  it('should provide auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isInitialized).toBeFalsy();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.user).toBeNull();
  });

  it('should provide logout function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(typeof result.current.logout).toBe('function');
  });
});
```

### Integration Test - Form

Create `src/components/forms/__tests__/LoginForm.test.tsx`:

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import store from '@store/store';

const MockedLoginForm = () => (
  <Provider store={store}>
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  </Provider>
);

describe('LoginForm', () => {
  it('should render form fields', () => {
    render(<MockedLoginForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    render(<MockedLoginForm />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    render(<MockedLoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for submission
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
```

### Redux Test

Create `src/store/slices/__tests__/authSlice.test.ts`:

```typescript
import authReducer, {
  loginUser,
  registerUser,
  logout,
} from '../authSlice';
import type { AuthState } from '@types/auth';

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    tokens: null,
    status: 'idle',
    error: null,
    isInitialized: false,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
    const payload = {
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      tokens: { accessToken: 'token', refreshToken: 'refresh' },
    };
    const action = { type: loginUser.fulfilled.type, payload };
    const state = authReducer(initialState, action);

    expect(state.status).toBe('authenticated');
    expect(state.user).toEqual(payload.user);
    expect(state.tokens).toEqual(payload.tokens);
  });

  it('should handle logout', () => {
    const authenticatedState: AuthState = {
      user: { id: '1', email: 'test@example.com', name: 'Test' },
      tokens: { accessToken: 'token', refreshToken: 'refresh' },
      status: 'authenticated',
      error: null,
      isInitialized: true,
    };

    const action = { type: logout.fulfilled.type };
    const state = authReducer(authenticatedState, action);

    expect(state.status).toBe('unauthenticated');
    expect(state.user).toBeNull();
    expect(state.tokens).toBeNull();
  });
});
```

### E2E Test - Cypress (Future)

Create `cypress/e2e/auth.cy.ts`:

```typescript
describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should login with valid credentials', () => {
    cy.contains('Sign In').click();
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('Sign In').click();

    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Welcome back').should('be.visible');
  });

  it('should show error on invalid credentials', () => {
    cy.contains('Sign In').click();
    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.contains('Sign In').click();

    cy.contains('Login failed').should('be.visible');
  });

  it('should logout successfully', () => {
    // Login first
    cy.login('test@example.com', 'password123');

    // Click profile dropdown
    cy.get('[data-testid="profile-button"]').click();

    // Click logout
    cy.contains('Sign Out').click();

    // Should be on login page
    cy.url().should('include', '/login');
  });

  it('should register new user', () => {
    cy.contains('Sign up').click();
    cy.get('input[placeholder="John Doe"]').type('New User');
    cy.get('input[type="email"]').type('newuser@example.com');
    cy.get('input[type="password"]').first().type('password123');
    cy.get('input[placeholder="••••••••"]').last().type('password123');
    cy.contains('Create Account').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });
});
```

---

## 🏃 Running Tests

### npm Scripts to Add

Add to `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress open",
    "test:e2e:headless": "cypress run"
  }
}
```

### Commands

```bash
# Run all tests
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests interactive
npm run test:e2e

# E2E tests CI
npm run test:e2e:headless
```

---

## 📊 Coverage Goals

Target coverage metrics:
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

Critical paths must have 100% coverage:
- Authentication flows
- User data handling
- Payment processing (future)

---

## 🎯 What to Test

### High Priority (Phase 1)
- [x] Login/Register flows
- [x] Form validation
- [x] Protected routes
- [x] Redux auth state

### Medium Priority (Phase 2)
- [ ] Learning module pages
- [ ] Subject/Chapter filtering
- [ ] Progress tracking
- [ ] API integration

### Lower Priority (Phase 3+)
- [ ] Chat functionality
- [ ] Exam features
- [ ] Analytics events
- [ ] Performance metrics

---

## 🔍 Best Practices

### 1. Test Behavior, Not Implementation
```typescript
// ❌ Bad - Testing implementation
expect(component.state.isLoading).toBe(true);

// ✅ Good - Testing behavior
expect(screen.getByRole('button')).toBeDisabled();
expect(screen.getByRole('status')).toHaveTextContent('Loading');
```

### 2. Use Semantic Queries
```typescript
// ❌ Bad
screen.getByTestId('submit-btn');

// ✅ Good
screen.getByRole('button', { name: /submit/i });
```

### 3. Test User Interactions
```typescript
// ✅ Good
userEvent.click(submitButton);
userEvent.type(emailInput, 'test@example.com');
```

### 4. Async Operations
```typescript
// ✅ Good
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

---

## 🐛 Debugging Tests

### View DOM in Test
```typescript
const { debug } = render(<MyComponent />);
debug(); // Prints HTML
```

### Pause on Test
```typescript
screen.logTestingPlaygroundURL(); // Open in browser
```

### Check Props
```typescript
console.log('Component props:', component.props());
```

---

## 📚 Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/)
- [Cypress Documentation](https://docs.cypress.io/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✅ Testing Checklist

- [ ] Unit tests for components
- [ ] Unit tests for hooks
- [ ] Unit tests for utilities
- [ ] Integration tests for forms
- [ ] Redux action tests
- [ ] E2E tests for critical flows
- [ ] 80%+ code coverage
- [ ] CI/CD pipeline integration

---

**Status**: Ready for implementation  
**Priority**: Setup after Phase 2  
**Estimated Time**: 3-4 days setup + ongoing

