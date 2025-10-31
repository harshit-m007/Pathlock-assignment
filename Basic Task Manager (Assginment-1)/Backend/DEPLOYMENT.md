# Deployment Guide: Assignment 1 Backend

## Deploying to Render

### Step 1: Create a Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub/GitLab/Bitbucket repository

### Step 2: Configure Build Settings

**Service Settings:**
- **Name**: `basic-task-manager-backend` (or your preferred name)
- **Environment**: Select **"Docker"** from the dropdown
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

**Build Settings:**
- **Root Directory**: `Basic Task Manager (Assginment-1)/Backend`
- **Dockerfile Path**: `Dockerfile` (should auto-detect)
- Render will automatically use the Dockerfile in the Backend directory

**Note**: The Dockerfile is already created in the Backend directory. Render will build and deploy using it automatically.

### Step 3: Environment Variables (Optional)

Add environment variables in Render dashboard:

- `ASPNETCORE_ENVIRONMENT` = `Production`
- `ASPNETCORE_URLS` = `http://0.0.0.0:10000` (Render will provide PORT automatically)

**For CORS** (after deploying frontend):
- `Cors__AllowedOrigins` = `https://your-frontend.vercel.app` (comma-separated for multiple)

Example:
```
Cors__AllowedOrigins=https://your-app.vercel.app,https://www.your-app.vercel.app
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your app
3. Wait for deployment to complete (first deployment takes 5-10 minutes)
4. Your API will be available at: `https://your-service-name.onrender.com`

### Step 5: Update Frontend

Update your frontend `src/services/api.ts`:
```typescript
const API_BASE = import.meta.env.VITE_API_BASE || 'https://your-service-name.onrender.com';
```

---

## Alternative: Manual Build Commands (Without Docker)

If you prefer not to use Docker, you can use Render's build commands:

1. After selecting **"Docker"** as environment, you can override with:
   - **Root Directory**: `Basic Task Manager (Assginment-1)/Backend`
   - **Build Command**: `dotnet restore && dotnet publish -c Release -o ./publish`
   - **Start Command**: `dotnet ./publish/Backend.dll`

**However, using the Dockerfile is recommended** as it's already configured and works reliably.

---

## Testing Deployment

1. Visit: `https://your-service-name.onrender.com/swagger` (if Swagger is enabled)
2. Test API endpoint: `https://your-service-name.onrender.com/api/tasks`

---

## Troubleshooting

- **Build fails**: Check logs in Render dashboard
- **503 errors**: First cold start takes ~30 seconds, subsequent requests are faster
- **CORS errors**: Make sure `Cors__AllowedOrigins` includes your frontend URL
- **Port issues**: Render sets PORT automatically, don't hardcode it

---

## Notes

- Render free tier spins down after 15 minutes of inactivity (first request will be slow)
- Upgrade to paid plan for always-on service
- Consider using Render's PostgreSQL for persistent data (if migrating from in-memory)

