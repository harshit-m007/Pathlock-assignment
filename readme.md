# Pathlock Assignment

This repository contains two full-stack web application assignments showcasing .NET backend and React frontend development.  

## 📁 Project Structure

```
.
├── Basic-task-Manager-a-1/              # Simple task management app
│   ├── Backend/                          # .NET 9 REST API
│   └── Frontend/                         # React + TypeScript + Tailwind
│  
└── Mini-Project-Manger-a-2/             # Advanced project management with auth
    ├── Backend/                          # .NET 9 Web API + EF Core + JWT
    └── Frontend/                         # React + TypeScript + Vite
```

---

## 📋 Assignment 1: Basic Task Manager

A simple task management application demonstrating core CRUD operations and filtering capabilities.

### Features
- ✅ Create, read, update, and delete tasks
- ✅ Filter tasks (All/Active/Completed)
- ✅ In-memory data storage
- ✅ Modern UI with Tailwind CSS

### Tech Stack
- **Backend**: .NET 9 REST API
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite

### Quick Start

**Backend:**
```bash
cd "Basic-task-Manager-a-1/Backend"
dotnet restore
dotnet run
# API available at http://localhost:5000
```

**Frontend:**
```bash
cd "Basic-task-Manager-a-1/Frontend"
npm install
npm run dev
# Available at http://localhost:5173
```

### API Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

📖 [Detailed README](./Basic-task-Manager-a-1/README.md)

---

## 📋 Assignment 2: Mini Project Manager

An advanced project management system with user authentication, project organization, and intelligent task scheduling.

### Features
- 🔐 JWT-based user authentication (Register/Login)
- 📁 Multiple projects per user
- ✅ Task management within projects
- 📅 Optional due dates for tasks
- 🧠 Smart Scheduler API (dependency-based task ordering)
- 🔒 User-specific data isolation

### Tech Stack
- **Backend**: .NET 9 Web API + Entity Framework Core + SQLite + JWT
- **Frontend**: React 18 + TypeScript + Vite

### Quick Start

**Backend:**
```bash
cd "Mini-Project-Manger-a-2/Backend"
dotnet restore
dotnet run
# API available at http://localhost:5000 (or port shown in console)
```

**Frontend:**
```bash
cd "Mini-Project-Manger-a-2/Frontend"
npm install
npm run dev
# App available at http://localhost:5175
```

**Note:** Create a `.env` file in the Frontend folder if your backend runs on a different port:
```
VITE_API_BASE=http://localhost:5000
```

### API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

**Projects:**
- `GET /api/projects` - Get all user's projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/{id}` - Get project details with tasks
- `DELETE /api/projects/{id}` - Delete a project

**Tasks:**
- `POST /api/projects/{projectId}/tasks` - Create a task in a project
- `PUT /api/tasks/{taskId}` - Update a task
- `DELETE /api/tasks/{taskId}` - Delete a task

**Smart Scheduler:**
- `POST /api/v1/projects/{projectId}/schedule` - Get recommended task execution order

📖 [Detailed README](./Mini-Project-Manger-a-2/README.md)

---

## 🛠️ Common Setup Requirements

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Environment Variables

**Assignment 2 Frontend:**
Create a `.env` file in the Frontend directory if needed:
```env
VITE_API_BASE=http://localhost:5000
```

---

## 📝 Notes

- Both assignments use modern development practices and clean architecture
- Assignment 1 uses in-memory storage (data resets on restart)
- Assignment 2 uses SQLite database (persists data)
- JWT tokens in Assignment 2 are stored in browser localStorage
- CORS is enabled for local development in both backends

---

## 🚀 Deployment

Refer to individual assignment README files for deployment instructions:
- [Assignment 1 Deployment Guide](./Basic-task-Manager-a-1/Backend/DEPLOYMENT.md)
- [Assignment 2 Deployment Guide](./Mini-Project-Manger-a-2/Backend/DEPLOYMENT.md)

