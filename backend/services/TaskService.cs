using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementSystem.Interfaces;
using UserTask = TaskManagementSystem.Models.Task;
using TaskManagementSystem.DataAccess;

namespace TaskManagementSystem.Services;

/*
	Handles business logic and acts as middle layer between controller and database
*/
public class TaskService : ITaskService
{
	private readonly TaskRepository _taskRepository;

	public TaskService(TaskRepository taskRepository)
	{
		_taskRepository = taskRepository;
	}

	public async Task AddTaskAsync(UserTask task)
	{
		await _taskRepository.AddTaskAsync(task);
	}

	public async Task<List<UserTask>> GetTasksAsync()
	{
		return await _taskRepository.GetTasksAsync();
	}

	public async Task<List<UserTask>> GetTasksAsync(int userId)
	{
		return await _taskRepository.GetTasksAsync(userId);
	}

	public async Task<UserTask> GetTaskByIdAsync(int id)
	{
		return await _taskRepository.GetTaskByIdAsync(id);
	}

	public async Task DeleteTaskAsync(UserTask task)
	{
		await _taskRepository.DeleteTaskAsync(task);
	}

	public async Task UpdateTaskAsync(UserTask updatedTask)
	{
		await _taskRepository.UpdateTaskAsync(updatedTask);
	}
}