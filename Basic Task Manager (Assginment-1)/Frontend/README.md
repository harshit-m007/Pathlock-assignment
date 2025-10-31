# Task Manager Frontend

A modern task management application built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ Display all tasks in a list
- ➕ Add new tasks
- ✅ Toggle task completion status
- 🗑️ Delete tasks
- 🔍 Filter tasks (All / Active / Completed)
- 💾 LocalStorage persistence
- 🎨 Beautiful UI with Tailwind CSS

## Setup

1. Navigate to the Frontend directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

The app will be available at `http://localhost:5173`

## Build for Production

Run `npm run build` to create a production build.

## Deployment on Vercel

1. Push your code to GitHub
2. Import your repository on Vercel
3. Set the root directory to `Frontend`
4. Set the build command: `npm run build`
5. Set the output directory: `dist`
6. Update the API URL in `src/services/api.ts` to your deployed backend URL

## API Configuration

The frontend is configured to connect to `http://localhost:5000/api/tasks` by default.

To change the API URL for production:
1. Update `API_BASE_URL` in `src/services/api.ts`
2. Or use environment variables (recommended for production)



