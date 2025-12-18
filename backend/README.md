# Mobile Recharge CRUD & JWT Authentication - Day 12

## Project Structure

```
Day12/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User CRUD operations
│   └── planController.js    # Plan CRUD operations
├── middleware/
│   └── auth.js             # JWT authentication & authorization
├── models/
│   ├── User.js             # User schema with password hashing
│   └── RechargePlan.js     # Recharge plan schema
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   ├── userRoutes.js       # User management routes
│   └── planRoutes.js       # Plan management routes
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── server.js              # Main server file
└── package.json           # Dependencies
```

## Features Implemented

### 1. User Management ✅
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - User login
- **GET** `/api/users/profile` - Get current user profile
- **GET** `/api/users` - Get all users (Admin only)
- **GET** `/api/users/:id` - Get user by ID
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user (Admin only)

### 2. Recharge Plan Management ✅
- **GET** `/api/plans` - Get all active plans (Public)
- **GET** `/api/plans/:id` - Get plan by ID (Public)
- **POST** `/api/plans` - Create new plan (Admin only)
- **PUT** `/api/plans/:id` - Update plan (Admin only)
- **DELETE** `/api/plans/:id` - Delete plan (Admin only)

### 3. Authentication & Security ✅
- JWT token generation and verification
- Password hashing using bcryptjs
- Role-based access control (User/Admin)
- Protected routes with middleware
- Environment variables for sensitive data

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd Day12
   npm install
   ```

2. **Environment Setup:**
   - Update `.env` file with your MongoDB URI and JWT secret
   - Ensure MongoDB is running

3. **Start server:**
   ```bash
   npm run dev  # Development mode
   npm start    # Production mode
   ```

4. **Server runs on:** http://localhost:3002

## API Testing with Postman

### Authentication Flow:

1. **Register Admin:**
   ```
   POST /api/auth/register
   {
     "username": "admin",
     "email": "admin@example.com",
     "password": "password123",
     "phone": "1234567890",
     "role": "Admin"
   }
   ```

2. **Login:**
   ```
   POST /api/auth/login
   {
     "email": "admin@example.com",
     "password": "password123"
   }
   ```

3. **Use Token:** Add to headers: `Authorization: Bearer <token>`

### Plan Management:

4. **Create Plan (Admin only):**
   ```
   POST /api/plans
   {
     "planName": "Unlimited Pack",
     "price": 399,
     "validity": 28,
     "description": "Unlimited calls and data",
     "operator": "Jio",
     "planType": "Prepaid",
     "benefits": {
       "data": "Unlimited",
       "calls": "Unlimited",
       "sms": "100/day"
     }
   }
   ```

## Security Features

- ✅ Password encryption using bcryptjs
- ✅ JWT token-based authentication
- ✅ Role-based authorization (User/Admin)
- ✅ Protected routes middleware
- ✅ Environment variables for secrets
- ✅ Input validation and error handling

## Role Permissions

**User Role:**
- View plans
- View/update own profile
- Access protected user routes

**Admin Role:**
- All User permissions
- Create/Update/Delete plans
- View all users
- Delete users
- Full system access