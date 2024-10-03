using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Task = TaskManagementSystem.Models.Task;
using TaskManagementSystem.Data;

namespace TaskManagementSystem.DataAccess;
/*	
	Repository class that manages tasks within the database
*/
public class TaskRepository
{

	// Connection for database
	private readonly TaskManagementDbContext _context;


	// Gets connection string from the appsettings.json
	public TaskRepository(TaskManagementDbContext context)
	{
		_context = context;
	}

	// Adds new task to the database
	public void AddTask(Task task)
	{
		_context.Tasks.Add(task);
		_context.SaveChanges();
	}

	// Retrieve All tasks from DB
	public List<Task> GetTasks()
	{
		return _context.Tasks.ToList();
	}

	// Finds and returns a task given its id
	public Task GetTaskById(int id)
	{
		var task = _context.Tasks.Find(id);

		if (task == null)
		{
			throw new ArgumentException("Error Task not found");
			return null;
		}

		return task;
	}

	// Deletes a given task
	public void DeleteTasks(Task task)
	{
		_context.Tasks.Remove(task);
		_context.SaveChanges();
	}
}