using System.ComponentModel.DataAnnotations;

namespace MiniProjectManager.Api.DTOs
{
    public record CreateTaskRequest(
        [param: Required] string Title,
        DateTime? DueDate
    );

    public record UpdateTaskRequest(
        [param: Required] string Title,
        DateTime? DueDate,
        bool IsCompleted
    );
}


