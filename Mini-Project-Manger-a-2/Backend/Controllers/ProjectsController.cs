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
    [Route("api/projects")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProjectsController(AppDbContext db)
        {
            _db = db;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectResponse>>> GetProjects()
        {
            var userId = GetUserId();
            var list = await _db.Projects
                .Where(p => p.OwnerId == userId)
                .OrderByDescending(p => p.Id)
                .Select(p => new ProjectResponse(p.Id, p.Title, p.Description, p.CreatedAt))
                .ToListAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectResponse>> Create([FromBody] CreateProjectRequest request)
        {
            var project = new Project
            {
                Title = request.Title,
                Description = request.Description,
                OwnerId = GetUserId()
            };
            _db.Projects.Add(project);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = project.Id },
                new ProjectResponse(project.Id, project.Title, project.Description, project.CreatedAt));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetById(int id)
        {
            var userId = GetUserId();
            var proj = await _db.Projects.Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id && p.OwnerId == userId);
            if (proj == null) return NotFound();
            return Ok(proj);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var proj = await _db.Projects.FirstOrDefaultAsync(p => p.Id == id && p.OwnerId == userId);
            if (proj == null) return NotFound();
            _db.Projects.Remove(proj);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}


