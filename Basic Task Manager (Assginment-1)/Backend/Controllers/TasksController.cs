using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public ActionResult<List<TaskItem>> GetTasks()
    {
        return Ok(_taskService.GetAllTasks());
    }

    [HttpPost]
    public ActionResult<TaskItem> CreateTask([FromBody] TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Description))
        {
            return BadRequest("Description is required");
        }

        var createdTask = _taskService.AddTask(task);
        return CreatedAtAction(nameof(GetTasks), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    public ActionResult<TaskItem> UpdateTask(Guid id, [FromBody] TaskItem task)
    {
        var updatedTask = _taskService.UpdateTask(id, task);
        if (updatedTask == null)
        {
            return NotFound();
        }

        return Ok(updatedTask);
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteTask(Guid id)
    {
        var deleted = _taskService.DeleteTask(id);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}



