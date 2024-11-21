using System;

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

	public int UserId { get; set; }
}