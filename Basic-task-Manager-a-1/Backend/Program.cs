using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS support
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            // Try to get from array config or comma-separated string
            var allowedOriginsArray = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();
            var allowedOriginsString = builder.Configuration["Cors:AllowedOrigins"];
            
            string[]? allowedOrigins = allowedOriginsArray;
            if (allowedOrigins == null && !string.IsNullOrEmpty(allowedOriginsString))
            {
                // Parse comma-separated string from environment variable
                allowedOrigins = allowedOriginsString.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            }
            
            if (allowedOrigins != null && allowedOrigins.Length > 0)
            {
                // Production: use specific origins from environment variable
                policy.WithOrigins(allowedOrigins)
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
            else
            {
                // Development/fallback: allow all origins for flexibility
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
        });
});

// Register TaskService as singleton for in-memory storage
builder.Services.AddSingleton<TaskService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Only use HTTPS redirection in development (Render handles HTTPS in production)
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Enable CORS (must be before UseAuthorization)
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();



