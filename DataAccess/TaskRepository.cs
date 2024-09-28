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
}