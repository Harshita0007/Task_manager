# 📋 Task Management System

A full-stack task management application built with **Next.js**, **Node.js**, **TypeScript**, and **PostgreSQL/SQLite**. Features a modern, professional UI with complete authentication and CRUD operations.

---

## ✨ Features

###  **Authentication**
- User registration with email validation
- Secure login with JWT tokens
- Access token (15min) & Refresh token (7 days)
- Password hashing with bcrypt
- Auto token refresh on expiry

###  **Task Management**
- Create, Read, Update, Delete (CRUD) tasks
- Task status: Pending, In Progress, Completed
- Toggle task status with one click
- Search tasks by title or description
- Filter tasks by status
- Pagination (12 tasks per page)
- Real-time task statistics

###  **Modern UI/UX**
- Beautiful blue gradient design
- Responsive (mobile, tablet, desktop)
- Professional Jira-style interface
- Toast notifications
- Loading states and animations
- Empty states with call-to-action

---

##  Tech Stack

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
- **PostgreSQL/SQLite**
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)
- **Express Validator** (Input validation)

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

##  Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL (or use SQLite for testing)
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
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development
JWT_ACCESS_SECRET=your-super-secret-access-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
EOF

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

##  API Endpoints

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
| GET | `/api/tasks` | Get all tasks | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| GET | `/api/tasks/:id` | Get task by ID | ✅ |
| PATCH | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |
| PATCH | `/api/tasks/:id/toggle` | Toggle task status | ✅ |

---

## 📝 API Usage Examples

### **Register User**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### **Login**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### **Create Task**
```bash
POST http://localhost:5000/api/tasks
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
GET http://localhost:5000/api/tasks?page=1&limit=10&status=PENDING&search=project
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🎨 Screenshots

### Home Page
Beautiful landing page with gradient background and feature showcase.

### Login/Register
Modern authentication pages with split-screen design.

### Dashboard
Professional task management interface with stats, filters, and search.

---

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Token Refresh**: Automatic token renewal
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configured CORS policies
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: React automatically escapes output

---

## 📦 Database Schema

### **User**
```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String
  name          String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
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
  user        User     @relation(fields: [userId], references: [id])
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
  user      User     @relation(fields: [userId], references: [id])
}
```

---

##  Testing

### **Manual Testing**

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

### **API Testing with Postman**

Import these endpoints into Postman:
- Health: `GET http://localhost:5000/health`
- Register: `POST http://localhost:5000/api/auth/register`
- Login: `POST http://localhost:5000/api/auth/login`
- Tasks: `GET http://localhost:5000/api/tasks`

---

##  Troubleshooting

### **Port Already in Use**
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
- Should match frontend URL: `http://localhost:3000`

---

##  Available Scripts

### **Backend**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
```

### **Frontend**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

---

## 🚀 Deployment

### **Backend (Railway/Render)**
1. Push code to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy

### **Frontend (Vercel)**
1. Push code to GitHub
2. Import to Vercel
3. Set `NEXT_PUBLIC_API_URL`
4. Deploy

---



