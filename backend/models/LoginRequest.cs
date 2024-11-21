using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models;

public class LoginRequest
{
    [Required]
    public string Identifier { get; set; }

    [Required]
    public string Password { get; set; } 
}