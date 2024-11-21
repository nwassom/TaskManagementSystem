using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using UserTask = TaskManagementSystem.Models.Task;
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
	public async Task AddTaskAsync(UserTask task)
	{
		await _context.Tasks.AddAsync(task);
		await _context.SaveChangesAsync();
	}

	// Retrieve All tasks from DB
	public async Task<List<UserTask>> GetTasksAsync()
	{
		return await _context.Tasks.ToListAsync();
	}

	public async Task<List<UserTask>> GetTasksAsync(int userId)
	{
		return await _context.Tasks
			.Where(t => t.UserId == userId)
			.ToListAsync();
	}

	// Finds and returns a task given its id
	public async Task<UserTask> GetTaskByIdAsync(int id)
	{
		var task = await _context.Tasks.FindAsync(id);

		if (task == null)
		{
			throw new ArgumentException("Error Task not found");
			return null;
		}

		return task;
	}

	// Deletes a given task
	public async Task DeleteTaskAsync(UserTask task)
	{
		_context.Tasks.Remove(task);
		await _context.SaveChangesAsync();
	}

	public async Task UpdateTaskAsync(UserTask updatedTask)
	{
		_context.Tasks.Update(updatedTask);
		await _context.SaveChangesAsync();
	}
}