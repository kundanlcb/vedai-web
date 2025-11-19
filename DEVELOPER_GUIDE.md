# VedAI Web App - Developer Quick Reference

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
# Server: http://localhost:3001

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📁 Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/components` | Reusable UI components |
| `src/pages` | Page components |
| `src/services` | API and business logic |
| `src/store` | Redux slices and store |
| `src/hooks` | Custom React hooks |
| `src/types` | TypeScript type definitions |
| `src/utils` | Helper functions |
| `src/styles` | Global CSS |

---

## 🔧 Common Tasks

### Create a New Page

1. Create page file in `src/pages/{feature}/YourPage.tsx`:
```typescript
import React from 'react';

const YourPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Your Page</h1>
      {/* Your content */}
    </div>
  );
};

export default YourPage;
```

2. Add route in `src/App.tsx`:
```typescript
const YourPage = React.lazy(() => import('@pages/feature/YourPage'));

<Route
  path="/your-page"
  element={
    <ProtectedRoute
      element={<React.Suspense fallback={<LoadingFallback />}><YourPage /></React.Suspense>}
    />
  }
/>
```

### Create a New Component

1. Create component in `src/components/{category}/YourComponent.tsx`:
```typescript
import React from 'react';

interface YourComponentProps {
  title: string;
  // other props
}

const YourComponent: React.FC<YourComponentProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {/* Component content */}
    </div>
  );
};

export default YourComponent;
```

2. Import and use in other components:
```typescript
import YourComponent from '@components/category/YourComponent';

<YourComponent title="Hello" />
```

### Add API Service

1. Create service in `src/services/yourService.ts`:
```typescript
import apiClient from './api';

class YourService {
  async fetchData() {
    const response = await apiClient.get('/endpoint');
    return response.data;
  }

  async postData(payload: any) {
    const response = await apiClient.post('/endpoint', payload);
    return response.data;
  }
}

export default new YourService();
```

2. Use in components or Redux:
```typescript
import yourService from '@services/yourService';

const data = await yourService.fetchData();
```

### Create Redux Slice

1. Create slice in `src/store/slices/yourSlice.ts`:
```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'your/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // API call
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const yourSlice = createSlice({
  name: 'your',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      });
  },
});

export const selectYourItems = (state: any) => state.your.items;
export default yourSlice.reducer;
```

2. Add to store in `src/store/store.ts`:
```typescript
import yourReducer from './slices/yourSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    your: yourReducer, // Add here
  },
});
```

3. Use in components:
```typescript
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectYourItems } from '@store/slices/yourSlice';

const items = useSelector(selectYourItems);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchData());
}, [dispatch]);
```

---

## 🎨 Tailwind CSS Common Classes

### Spacing
- `p-4` - Padding all sides
- `px-4` - Padding left/right
- `py-4` - Padding top/bottom
- `m-4` - Margin all sides
- `gap-4` - Gap between flex items

### Typography
- `text-lg` - Large text
- `font-bold` - Bold text
- `text-gray-600` - Gray text color
- `text-center` - Center text

### Colors
- `bg-blue-600` - Blue background
- `text-blue-600` - Blue text
- `border-blue-200` - Blue border
- `hover:bg-blue-700` - Hover state

### Layout
- `flex` - Flexbox
- `grid` - CSS Grid
- `grid-cols-3` - 3 columns
- `w-full` - Full width
- `rounded-lg` - Border radius

### Responsive
- `md:grid-cols-2` - 2 columns on medium screens
- `lg:px-8` - Large padding on large screens
- `hidden lg:block` - Hide on small, show on large

---

## 🔐 Authentication Patterns

### Check if User is Authenticated
```typescript
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '@store/slices/authSlice';

const MyComponent = () => {
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuth) {
    return <div>Please login</div>;
  }

  return <div>Welcome {user?.name}</div>;
};
```

### Logout User
```typescript
import { useDispatch } from 'react-redux';
import { logout } from '@store/slices/authSlice';

const MyComponent = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Logout</button>;
};
```

---

## 🐛 Debugging

### Enable Redux DevTools
Redux DevTools are already configured. Open browser DevTools (F12) and go to Redux tab.

### View Component Props
```typescript
console.log('Props:', props);
```

### Check Redux State
```typescript
const state = useSelector(state => state);
console.log('Redux State:', state);
```

---

## 📋 File Naming Conventions

- **Components**: PascalCase (e.g., `MyComponent.tsx`)
- **Pages**: PascalCase (e.g., `MyPage.tsx`)
- **Services**: camelCase (e.g., `myService.ts`)
- **Utilities**: camelCase (e.g., `myUtils.ts`)
- **Types**: camelCase file (e.g., `myTypes.ts`) but PascalCase type name
- **Folders**: kebab-case (e.g., `my-feature/`)

---

## 🚨 Error Handling

### In Components
```typescript
const [error, setError] = useState<string | null>(null);

try {
  const data = await someService.fetch();
  // handle data
} catch (err) {
  setError(err instanceof Error ? err.message : 'An error occurred');
}

{error && (
  <div className="bg-red-50 text-red-600 p-4 rounded-lg">
    {error}
  </div>
)}
```

### In API Calls
The API client has built-in error handling and will catch 4xx/5xx responses.

---

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

## 📝 Code Style Guide

### Imports
```typescript
// External libraries first
import React from 'react';
import { useSelector } from 'react-redux';

// Internal imports
import MyComponent from '@components/MyComponent';
import { myHelper } from '@utils/helpers';

// Types
import type { MyType } from '@types/myTypes';
```

### Component Structure
```typescript
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  // Hooks
  const [state, setState] = useState('');

  // Effects
  useEffect(() => {
    // effect code
  }, []);

  // Handlers
  const handleClick = () => {
    // handler code
  };

  // Render
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
};

export default MyComponent;
```

---

## 🆘 Getting Help

1. Check existing components for similar patterns
2. Review Phase 1 implementation
3. Check TypeScript types in `src/types/`
4. Look at API client in `src/services/api.ts`
5. Review Redux slices pattern

---

**Last Updated**: November 18, 2025  
**Version**: 1.0.0

