# Task Manager Backend API

A RESTful API built with .NET 9 for managing tasks.

## Features

- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/{id}` - Update a task
- DELETE `/api/tasks/{id}` - Delete a task

## Setup

1. Ensure you have .NET 9 SDK installed
2. Navigate to the Backend directory
3. Run `dotnet restore` to restore packages
4. Run `dotnet run` to start the server

The API will be available at `http://localhost:5000` or `https://localhost:5001`

## Deployment on Render

1. Create a new Web Service on Render
2. Connect your repository
3. Set the build command: `dotnet restore && dotnet publish -c Release -o ./publish`
4. Set the start command: `dotnet ./publish/Backend.dll`
5. Update the CORS policy in `Program.cs` to include your frontend URL



