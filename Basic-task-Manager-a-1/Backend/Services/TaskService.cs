using Backend.Models;

namespace Backend.Services;

public class TaskService
{
    private readonly List<TaskItem> _tasks = new();

    public TaskService()
    {
        // In-memory storage initialized
    }

    public List<TaskItem> GetAllTasks()
    {
        return _tasks;
    }

    public TaskItem? GetTaskById(Guid id)
    {
        return _tasks.FirstOrDefault(t => t.Id == id);
    }

    public TaskItem AddTask(TaskItem task)
    {
        task.Id = Guid.NewGuid();
        _tasks.Add(task);
        return task;
    }

    public TaskItem? UpdateTask(Guid id, TaskItem updatedTask)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null)
        {
            return null;
        }

        task.Description = updatedTask.Description;
        task.IsCompleted = updatedTask.IsCompleted;
        return task;
    }

    public bool DeleteTask(Guid id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null)
        {
            return false;
        }

        _tasks.Remove(task);
        return true;
    }
}

