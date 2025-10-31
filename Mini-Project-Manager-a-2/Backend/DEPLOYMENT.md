# Deployment Guide: Assignment 2 Backend

## Deploying to Render

### Step 1: Create a Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub/GitLab/Bitbucket repository

### Step 2: Configure Build Settings

**Service Settings:**
- **Name**: `mini-project-manager-backend` (or your preferred name)
- **Environment**: Select **"Docker"** from the dropdown
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

**Build Settings:**
- **Root Directory**: `Mini-Project-Manger-a-2/Backend`
- **Dockerfile Path**: `Dockerfile` (should auto-detect)
- Render will automatically use the Dockerfile in the Backend directory

**Note**: The Dockerfile is already created in the Backend directory. Render will build and deploy using it automatically.

### Step 3: Environment Variables

**Required:**
- `ASPNETCORE_ENVIRONMENT` = `Production`
- `ASPNETCORE_URLS` = `http://0.0.0.0:$PORT` (Render sets PORT automatically)

**Database Connection (SQLite):**
- `ConnectionStrings__Default` = `Data Source=/tmp/app.db` 
  - ⚠️ **Note**: SQLite on Render's ephemeral filesystem will lose data on redeploy. See "Using PostgreSQL" section below for persistent storage.

**JWT Secret (IMPORTANT - Change this!):**
- `Jwt__Key` = `your-very-long-secure-random-key-at-least-32-characters-long`
  - Generate a secure key: Use a password generator or `openssl rand -hex 32`

**CORS (after deploying frontend):**
- `Cors__AllowedOrigins` = `https://your-frontend.vercel.app`
  - For multiple origins: `https://app1.vercel.app,https://app2.vercel.app`

**Example Environment Variables:**
```
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://0.0.0.0:$PORT
ConnectionStrings__Default=Data Source=/tmp/app.db
Jwt__Key=your-super-secret-jwt-key-at-least-32-chars-long-change-this-in-production
Cors__AllowedOrigins=https://your-frontend.vercel.app
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your app
3. Wait for deployment to complete (first deployment takes 5-10 minutes)
4. Your API will be available at: `https://your-service-name.onrender.com`

### Step 5: Update Frontend

Update your frontend `.env` or `src/lib/api.ts`:
```typescript
const API_BASE = import.meta.env.VITE_API_BASE || 'https://your-service-name.onrender.com';
```

---

## ⚠️ Important: SQLite Limitation

SQLite on Render uses ephemeral storage - **data will be lost on redeploy**. For production, consider:

### Option 1: Use PostgreSQL (Recommended for Production)

1. Create a PostgreSQL database on Render:
   - **"New +"** → **"PostgreSQL"**
   - Copy the **Internal Database URL**

2. Update `appsettings.json` or use environment variable:
   ```
   ConnectionStrings__Default=postgresql://user:pass@host:5432/dbname
   ```

3. Install PostgreSQL provider in `MiniProjectManager.Api.csproj`:
   ```xml
   <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="9.0.0" />
   ```

4. Update `Program.cs`:
   ```csharp
   // Replace UseSqlite with UseNpgsql
   options.UseNpgsql(connectionString);
   ```

### Option 2: Keep SQLite (Data Resets on Deploy)

- Data persists between requests but **resets on service restart/redeploy**
- Fine for demos/testing, not recommended for production

---

## Alternative: Manual Build Commands (Without Docker)

If you prefer not to use Docker, you can use Render's build commands:

1. After selecting **"Docker"** as environment, you can override with:
   - **Root Directory**: `Mini-Project-Manger-a-2/Backend`
   - **Build Command**: `dotnet restore && dotnet publish -c Release -o ./publish`
   - **Start Command**: `dotnet ./publish/MiniProjectManager.Api.dll`

**However, using the Dockerfile is recommended** as it's already configured and works reliably.

---

## Testing Deployment

1. Test registration: `POST https://your-service-name.onrender.com/api/auth/register`
2. Test login: `POST https://your-service-name.onrender.com/api/auth/login`
3. Visit Swagger (if enabled in production): `https://your-service-name.onrender.com/swagger`

---

## Troubleshooting

- **Build fails**: Check build logs in Render dashboard
- **503 errors**: First cold start takes ~30 seconds on free tier
- **CORS errors**: Verify `Cors__AllowedOrigins` includes your frontend URL
- **Database errors**: Check connection string format
- **JWT errors**: Ensure `Jwt__Key` is at least 32 characters
- **Port binding**: Render sets PORT automatically via `$PORT` environment variable

---

## Security Checklist

- ✅ Change default JWT key in production
- ✅ Use environment variables for secrets (don't commit to Git)
- ✅ Enable HTTPS (Render does this automatically)
- ✅ Configure CORS to only allow your frontend domain
- ✅ Consider using PostgreSQL for production data persistence

---

## Notes

- Render free tier spins down after 15 minutes of inactivity
- Upgrade to paid plan for always-on service
- First request after spin-down takes ~30 seconds
- For production, use PostgreSQL instead of SQLite

