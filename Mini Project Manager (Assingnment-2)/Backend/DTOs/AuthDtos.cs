using System.ComponentModel.DataAnnotations;

namespace MiniProjectManager.Api.DTOs
{
    public record RegisterRequest(
        [param: Required, EmailAddress] string Email,
        [param: Required, MinLength(6)] string Password
    );

    public record LoginRequest(
        [param: Required, EmailAddress] string Email,
        [param: Required] string Password
    );

    public record AuthResponse(string Token);
}


