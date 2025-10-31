using System.ComponentModel.DataAnnotations;

namespace MiniProjectManager.Api.DTOs
{
    public record CreateProjectRequest(
        [param: Required, StringLength(100, MinimumLength = 3)] string Title,
        [param: StringLength(500)] string? Description
    );

    public record ProjectResponse(int Id, string Title, string? Description, DateTime CreatedAt);
}


