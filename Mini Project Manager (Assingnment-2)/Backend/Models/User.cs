using System.ComponentModel.DataAnnotations;

namespace MiniProjectManager.Api.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string PasswordHash { get; set; } = string.Empty;

        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}


