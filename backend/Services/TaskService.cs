using System.Collections.Generic;
using System.Threading.Tasks;

using UserTask = TaskManagementSystem.Models.Task;
using TaskManagementSystem.DataAccess;

namespace TaskManagementSystem.Services;

/*
	Handles business logic and acts as middle layer between controller and database
*/
public class TaskService
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

	public async Task<UserTask> GetTaskByIdAsync(int id)
	{
		return await _taskRepository.GetTaskByIdAsync(id);
	}

	public async Task DeleteTasksAsync(UserTask task)
	{
		await _taskRepository.DeleteTasksAsync(task);
	}

	public async Task UpdateTaskAsync(UserTask updatedTask)
	{
		await _taskRepository.UpdateTaskAsync(updatedTask);
	}
}