using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagementSystem.Models;

public class User
{
	[Key]
	public int Id { get; set; }

	[Required, MaxLength(50)]
	public string Username { get; set; }

	[Required, MinLength(8)]
	public string Password { get; set; }

	[Required, MaxLength(100)]
	public string Email { get; set; }

	[Required, MaxLength(100)]
	public string Name { get; set; }

	[Required]
	public DateTime CreatedAt { get; set; } = DateTime.Now;

	public DateTime? LastLogin { get; set; }

	public ICollection<Task>? Tasks { get; set; }
}