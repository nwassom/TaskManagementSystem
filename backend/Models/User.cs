using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models;

public class User
{
	[Key]
	public int Id { get; set; }

	[Required, MaxLength(50)]
	public string Username { get; set; }

	[Required, MinLength(8)]
	public string HashedPassword { get; set; }

	[Required, MaxLength(100)]
	public string Email { get; set; }

	[Required]
	public DateTime CreatedAt { get; set; } = DateTime.Now;

	public DateTime? LastLogin { get; set; }

	public ICollection<Task> Tasks { get; set; }
}