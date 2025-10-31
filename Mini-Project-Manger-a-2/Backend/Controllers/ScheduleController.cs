using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniProjectManager.Api.Data;

namespace MiniProjectManager.Api.Controllers
{
    public record SchedulerTaskInput(string Title, int EstimatedHours, DateTime? DueDate, List<string> Dependencies);
    public record SchedulerRequest(List<SchedulerTaskInput> Tasks);

    [ApiController]
    [Authorize]
    [Route("api/v1/projects/{projectId}/schedule")]
    public class ScheduleController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ScheduleController(AppDbContext db) { _db = db; }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

        [HttpPost]
        public async Task<IActionResult> Schedule(int projectId, [FromBody] SchedulerRequest request)
        {
            var userId = GetUserId();
            var projectExists = await _db.Projects.AnyAsync(p => p.Id == projectId && p.OwnerId == userId);
            if (!projectExists) return NotFound();

            // Simple topological sort by dependencies; tie-break by earlier due date then shorter estimate
            var tasks = request.Tasks;
            var titleToTask = tasks.ToDictionary(t => t.Title, t => t);
            var inDegree = tasks.ToDictionary(t => t.Title, t => 0);
            foreach (var t in tasks)
            {
                foreach (var dep in t.Dependencies ?? new List<string>())
                {
                    if (titleToTask.ContainsKey(dep)) inDegree[t.Title]++;
                }
            }

            var queue = new PriorityQueue<string, (DateTime?, int)>();
            foreach (var kv in inDegree.Where(kv => kv.Value == 0))
            {
                var tt = titleToTask[kv.Key];
                queue.Enqueue(kv.Key, (tt.DueDate, tt.EstimatedHours));
            }

            var order = new List<string>();
            var dependents = new Dictionary<string, List<string>>();
            foreach (var t in tasks)
            {
                foreach (var d in t.Dependencies ?? new List<string>())
                {
                    if (!dependents.ContainsKey(d)) dependents[d] = new List<string>();
                    dependents[d].Add(t.Title);
                }
            }

            while (queue.TryDequeue(out var title, out _))
            {
                order.Add(title);
                if (!dependents.ContainsKey(title)) continue;
                foreach (var nxt in dependents[title])
                {
                    inDegree[nxt]--;
                    if (inDegree[nxt] == 0)
                    {
                        var tt = titleToTask[nxt];
                        queue.Enqueue(nxt, (tt.DueDate, tt.EstimatedHours));
                    }
                }
            }

            if (order.Count != tasks.Count)
            {
                return BadRequest(new { message = "Cyclic dependencies detected" });
            }

            return Ok(new { recommendedOrder = order });
        }
    }
}


