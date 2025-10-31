using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniProjectManager.Api.Data;
using MiniProjectManager.Api.DTOs;
using MiniProjectManager.Api.Models;

namespace MiniProjectManager.Api.Controllers
{
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TasksController(AppDbContext db) { _db = db; }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

        [HttpPost("api/projects/{projectId}/tasks")]
        public async Task<ActionResult<TaskItem>> Create(int projectId, [FromBody] CreateTaskRequest request)
        {
            var userId = GetUserId();
            var project = await _db.Projects.FirstOrDefaultAsync(p => p.Id == projectId && p.OwnerId == userId);
            if (project == null) return NotFound();

            var task = new TaskItem { Title = request.Title, DueDate = request.DueDate, ProjectId = project.Id };
            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { taskId = task.Id }, task);
        }

        [HttpGet("api/tasks/{taskId}")]
        public async Task<ActionResult<TaskItem>> Get(int taskId)
        {
            var userId = GetUserId();
            var task = await _db.Tasks.Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == taskId && t.Project!.OwnerId == userId);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPut("api/tasks/{taskId}")]
        public async Task<IActionResult> Update(int taskId, [FromBody] UpdateTaskRequest request)
        {
            var userId = GetUserId();
            var task = await _db.Tasks.Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == taskId && t.Project!.OwnerId == userId);
            if (task == null) return NotFound();

            task.Title = request.Title;
            task.DueDate = request.DueDate;
            task.IsCompleted = request.IsCompleted;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("api/tasks/{taskId}")]
        public async Task<IActionResult> Delete(int taskId)
        {
            var userId = GetUserId();
            var task = await _db.Tasks.Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == taskId && t.Project!.OwnerId == userId);
            if (task == null) return NotFound();
            _db.Tasks.Remove(task);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}


