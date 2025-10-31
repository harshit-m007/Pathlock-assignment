Mini Project Manager (Assignment-2)

Backend: .NET 9 Web API + EF Core (SQLite). Frontend: React + TypeScript + Vite.

Run
- Backend
  - Open terminal in `Mini Project Manager (Assingnment-2)/Backend`
  - `dotnet restore`
  - `dotnet run`
- Frontend
  - Open terminal in `Mini Project Manager (Assingnment-2)/Frontend`
  - `npm i`
  - `npm run dev`
  - Set `VITE_API_BASE` in `.env` if backend runs on non-default port

API
Auth:
- POST `/api/auth/register`
- POST `/api/auth/login`

Projects:
- GET `/api/projects`
- POST `/api/projects`
- GET `/api/projects/{id}`
- DELETE `/api/projects/{id}`

Tasks:
- POST `/api/projects/{projectId}/tasks`
- PUT `/api/tasks/{taskId}`
- DELETE `/api/tasks/{taskId}`

Scheduler:
- POST `/api/v1/projects/{projectId}/schedule`
  - Body example:
```
{ "tasks": [
  {"title":"Design API","estimatedHours":5,"dueDate":"2025-10-25","dependencies":[]},
  {"title":"Implement Backend","estimatedHours":12,"dueDate":"2025-10-28","dependencies":["Design API"]}
]}
```
  - Response: `{ "recommendedOrder": ["Design API", "Implement Backend"] }`

Notes
- JWT stored client-side in `localStorage` and sent via `Authorization: Bearer <token>`.
- CORS enabled for local dev.

