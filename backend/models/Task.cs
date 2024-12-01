using System;
using System.Text.Json.Serialization;

namespace TaskManagementSystem.Models;

/*
	Model for tasks
*/
public class Task
{
	public int Id { get; set;}
	public string? Title { get; set;}
	public string? Description { get; set;}
	public DateTime CreatedAt { get; set;} = DateTime.Now;
	public bool? IsCompleted { get; set;}
	public DateTime Date { get; set; }
	public TimeSpan StartTime { get; set; }

	[JsonIgnore]
	public int? UserId { get; set; }

	[JsonIgnore]
	public User? User { get; set; }
}