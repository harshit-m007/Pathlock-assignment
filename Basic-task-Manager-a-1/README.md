# Task Manager - Full Stack Application

A complete task management application with a .NET 9 backend and React + TypeScript frontend.

## Project Structure

```
.
├── Backend/          # .NET 9 REST API
│   ├── Controllers/  # API Controllers
│   ├── Models/       # Data Models
│   ├── Services/     # Business Logic
│   └── Program.cs    # Application Entry Point
│
└── Frontend/         # React + TypeScript App
    ├── src/
    │   ├── components/  # React Components
    │   ├── hooks/       # Custom Hooks
    │   ├── services/    # API Services
    │   └── types/       # TypeScript Types
    └── package.json
```

## Getting Started

### Backend Setup

1. Navigate to the `Backend` directory
2. Ensure you have .NET 9 SDK installed
3. Run:
   ```bash
   dotnet restore
   dotnet run
   ```
4. The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the `Frontend` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The app will be available at `http://localhost:5173`

## Features

### Backend
- RESTful API with .NET 9
- In-memory data storage
- CORS enabled for frontend communication
- Swagger documentation available at `/swagger`

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Task filtering (All/Active/Completed)
- LocalStorage persistence
- Responsive design

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your repository
3. Set root directory to `Backend`
4. Build command: `dotnet restore && dotnet publish -c Release -o ./publish`
5. Start command: `dotnet ./publish/Backend.dll`
6. Update CORS in `Program.cs` to include your frontend URL

### Frontend (Vercel)
1. Import your repository on Vercel
2. Set root directory to `Frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Update API URL in `src/services/api.ts` to your deployed backend URL

## Notes

- The frontend is configured to use `http://localhost:5000` for local development
- Update the `API_BASE_URL` in `Frontend/src/services/api.ts` when deploying
- Update CORS settings in `Backend/Program.cs` to include your frontend domain



