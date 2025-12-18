# Day 13 - Frontend & Backend Integration

## Overview
This project integrates the React frontend (Day10) with the Express + MongoDB backend (Day12) using REST APIs, JWT authentication, and protected routes.

## Project Structure
```
Day13/
├── frontend/           # React frontend (Day10 + integration)
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js                    # ✅ NEW: Centralized API config
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx          # ✅ NEW: Route protection
│   │   ├── services/
│   │   │   ├── authService.js              # ✅ NEW: Auth API calls
│   │   │   └── planService.js              # ✅ NEW: Plan API calls
│   │   ├── context/
│   │   │   └── AuthContextIntegrated.jsx   # ✅ NEW: Enhanced auth context
│   │   ├── pages/
│   │   │   ├── LoginIntegrated.jsx         # ✅ NEW: Backend-connected login
│   │   │   ├── SignupIntegrated.jsx        # ✅ NEW: Backend-connected signup
│   │   │   └── RechargePlansIntegrated.jsx # ✅ NEW: API-driven plans
│   │   ├── components/
│   │   │   └── NavbarIntegrated.jsx        # ✅ NEW: Integrated navbar
│   │   └── AppIntegrated.jsx               # ✅ NEW: Main integrated app
│   └── package.json                        # ✅ UPDATED: Added axios
└── backend/            # Express backend (Day12 - unchanged)
    ├── controllers/
    ├── models/
    ├── routes/
    └── server.js
```

## Features Implemented ✅

### 1. API Configuration
- **File**: `src/api/axios.js`
- Centralized Axios instance with base URL
- Automatic JWT token attachment
- 401 error handling with auto-logout

### 2. Authentication Integration
- **Login**: `LoginIntegrated.jsx` connects to `/api/auth/login`
- **Signup**: `SignupIntegrated.jsx` connects to `/api/auth/register`
- JWT token storage in localStorage
- Enhanced AuthContext with backend integration

### 3. Protected Routes
- **File**: `src/routes/ProtectedRoute.jsx`
- Restricts access to authenticated users only
- Auto-redirects to login page

### 4. Dynamic Plan Loading
- **File**: `RechargePlansIntegrated.jsx`
- Fetches plans from `/api/plans` endpoint
- Loading states and error handling
- Filters plans by type (prepaid/postpaid)

### 5. Enhanced Navigation
- **File**: `NavbarIntegrated.jsx`
- Shows user info when logged in
- Login/logout toggle functionality

## Setup Instructions

### Backend Setup (Port 3002)
```bash
cd Day13/backend
npm install
npm run dev
```

### Frontend Setup (Port 5173)
```bash
cd Day13/frontend
npm install
npm run dev
```

## Usage Flow

1. **Start Backend**: Ensure MongoDB is running and backend is on port 3002
2. **Start Frontend**: Frontend runs on port 5173
3. **Register**: Create account via signup page
4. **Login**: Authenticate and get JWT token
5. **Browse Plans**: View plans fetched from database
6. **Protected Access**: Only authenticated users can access plans/history

## API Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/plans` - Fetch recharge plans
- `GET /api/users/profile` - Get user profile

## Key Integration Points

1. **Axios Interceptors**: Auto-attach JWT tokens
2. **Error Handling**: 401 responses trigger logout
3. **State Management**: AuthContext manages auth state
4. **Route Protection**: ProtectedRoute guards sensitive pages
5. **Dynamic Data**: Plans loaded from backend database

## Testing the Integration

1. Register a new user
2. Login with credentials
3. Verify JWT token in localStorage
4. Access protected routes (plans, history)
5. Logout and verify redirect to login
6. Refresh page and verify auth persistence

## Original Code Preservation ✅

- All original Day10 frontend files remain unchanged
- All original Day12 backend files remain unchanged
- New integration files added alongside existing code
- No modifications to existing functionality