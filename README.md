# 📋 Task Management System

A full-stack task management application built with **Next.js**, **Node.js**, **TypeScript**, and **PostgreSQL**. Features a modern, professional UI with complete authentication and CRUD operations.

---

## 🌐 Live Demo

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [task-manager-blush-eta-95.vercel.app](https://task-manager-blush-eta-95.vercel.app/) | ✅ Live |
| **Backend API** | [task-management-backend-gbea.onrender.com](https://task-management-backend-gbea.onrender.com) | ✅ Live |

> **Note:** Backend may take 30-60 seconds to wake up on first request (free tier hosting).

---

## ✨ Features

### 🔐 **Authentication**
- User registration with email validation
- Secure login with JWT tokens
- Access token (15min) & Refresh token (7 days)
- Password hashing with bcrypt
- Auto token refresh on expiry

### ✅ **Task Management**
- Create, Read, Update, Delete (CRUD) tasks
- Task status: Pending, In Progress, Completed
- Toggle task status with one click
- Search tasks by title or description
- Filter tasks by status
- Pagination (12 tasks per page)
- Real-time task statistics

### 🎨 **Modern UI/UX**
- Beautiful blue gradient design
- Responsive (mobile, tablet, desktop)
- Professional Jira-style interface
- Toast notifications
- Loading states and animations
- Empty states with call-to-action

---

## 🛠 Tech Stack

### **Frontend**
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (State management)
- **Axios** (HTTP client)
- **React Hot Toast** (Notifications)

### **Backend**
- **Node.js** with **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)
- **Express Validator** (Input validation)

### **Deployment**
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: PostgreSQL (Render)

---

## 📁 Project Structure

```
Task_Management/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── task.controller.ts
│   │   ├── lib/
│   │   │   └── prisma.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validation.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── task.routes.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── jwt.ts
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── dashboard/
    │   │   │   └── page.tsx
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── register/
    │   │   │   └── page.tsx
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   ├── TaskCard.tsx
    │   │   └── TaskForm.tsx
    │   ├── lib/
    │   │   └── axios.ts
    │   ├── services/
    │   │   ├── authService.ts
    │   │   └── taskService.ts
    │   ├── store/
    │   │   └── authStore.ts
    │   └── types/
    │       └── index.ts
    ├── .env.local
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js 18+
- PostgreSQL (or use SQLite for local testing)
- npm or yarn

---

### **1️⃣ Backend Setup**

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL="postgresql://user:password@localhost:5432/taskdb"
PORT=5000
NODE_ENV=development
JWT_ACCESS_SECRET=your-super-secret-access-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
EOF

# For SQLite (local testing only)
# DATABASE_URL="file:./dev.db"

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

---

### **2️⃣ Frontend Setup**

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start frontend server
npm run dev
```

**Frontend will run on:** `http://localhost:3000`

---

## 🔌 API Endpoints

### **Authentication**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ❌ |
| POST | `/api/auth/logout` | Logout user | ❌ |

### **Tasks**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks (with pagination & filters) | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| GET | `/api/tasks/:id` | Get task by ID | ✅ |
| PATCH | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |
| PATCH | `/api/tasks/:id/toggle` | Toggle task status | ✅ |

---

## 📝 API Usage Examples

### **Register User**
```bash
POST https://task-management-backend-gbea.onrender.com/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### **Login**
```bash
POST https://task-management-backend-gbea.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### **Create Task**
```bash
POST https://task-management-backend-gbea.onrender.com/api/tasks
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "PENDING"
}
```

### **Get All Tasks with Filters**
```bash
GET https://task-management-backend-gbea.onrender.com/api/tasks?page=1&limit=10&status=PENDING&search=project
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🔒 Security Features

- ✅ **Password Hashing**: Bcrypt with salt rounds
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **Token Refresh**: Automatic token renewal
- ✅ **Input Validation**: Server-side validation with express-validator
- ✅ **CORS Protection**: Configured CORS policies
- ✅ **SQL Injection Protection**: Prisma ORM prevents SQL injection
- ✅ **XSS Protection**: React automatically escapes output
- ✅ **Environment Variables**: Sensitive data stored securely

---

## 📊 Database Schema

### **User**
```prisma
model User {
  id            String         @id @default(uuid())
  email         String         @unique
  password      String
  name          String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  tasks         Task[]
  refreshTokens RefreshToken[]
}
```

### **Task**
```prisma
model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      String   @default("PENDING")
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### **RefreshToken**
```prisma
model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 🧪 Testing

### **Test the Live Application**

1. **Visit:** [https://task-manager-blush-eta-95.vercel.app/](https://task-manager-blush-eta-95.vercel.app/)
2. **Register** a new account
3. **Login** with your credentials
4. **Create** tasks, toggle status, edit, and delete

### **Manual Local Testing**

1. **Test Registration:**
   - Open `http://localhost:3000/register`
   - Fill form and submit
   - Should redirect to dashboard

2. **Test Login:**
   - Open `http://localhost:3000/login`
   - Login with credentials
   - Should redirect to dashboard

3. **Test Task CRUD:**
   - Create new task
   - Edit task
   - Toggle status
   - Delete task
   - Search and filter

### **API Testing with Postman/Thunder Client**

**Health Check:**
```bash
GET https://task-management-backend-gbea.onrender.com/health
```

Import endpoints into Postman:
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Get Tasks: `GET /api/tasks`
- Create Task: `POST /api/tasks`

---

## 🐛 Troubleshooting

### **Backend Cold Start (Free Tier)**
The backend on Render may take 30-60 seconds to wake up after inactivity.
- **Solution**: Wait and retry, or refresh the page.

### **Port Already in Use (Local)**
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### **Database Connection Error**
```bash
# Reset database
cd backend
npx prisma migrate reset
npx prisma generate
npx prisma migrate dev
```

### **Frontend Not Updating**
```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run dev
```

### **CORS Error**
- Check `CORS_ORIGIN` in backend `.env`
- Should match frontend URL
- For production: `https://task-manager-blush-eta-95.vercel.app`
- For local: `http://localhost:3000`

### **401 Unauthorized Error**
- Token may have expired
- Logout and login again
- Check if `Authorization: Bearer <token>` header is included

---

## 📜 Available Scripts

### **Backend**
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio (DB GUI)
npm run prisma:seed      # Seed database (if configured)
```

### **Frontend**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

---

## 🚀 Deployment Guide

### **Backend (Render)**

1. **Create Render Account**: [render.com](https://render.com)
2. **New Web Service**: Connect your GitHub repo
3. **Configure**:
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   ```env
   DATABASE_URL=<your-postgresql-url>
   NODE_ENV=production
   JWT_ACCESS_SECRET=<strong-secret>
   JWT_REFRESH_SECRET=<strong-secret>
   JWT_ACCESS_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d
   CORS_ORIGIN=https://task-manager-blush-eta-95.vercel.app
   ```
5. **Deploy**: Click "Create Web Service"

### **Frontend (Vercel)**

1. **Create Vercel Account**: [vercel.com](https://vercel.com)
2. **Import Project**: Connect your GitHub repo
3. **Configure**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
4. **Environment Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://task-management-backend-gbea.onrender.com/api
   ```
5. **Deploy**: Click "Deploy"

### **Database (PostgreSQL on Render)**

1. Create PostgreSQL database on Render
2. Copy the **Internal Database URL**
3. Add to backend environment variables as `DATABASE_URL`
4. Run migrations: `npx prisma migrate deploy`

---

## 📈 Performance Optimization

- ✅ Server-side rendering (SSR) with Next.js
- ✅ API response caching
- ✅ Optimized database queries with Prisma
- ✅ Image optimization with Next.js
- ✅ Code splitting and lazy loading
- ✅ Token-based authentication (stateless)

