using System;

namespace TaskManagementSystem.Models;

/*
	Model for tasks
*/
public class UserTask
{
	public int Id { get; set;}
	public required string Title { get; set;}
	public string? Description { get; set;}
	public DateTime CreatedAt { get; set;} = DateTime.Now;
	public bool IsCompleted { get; set;}
}