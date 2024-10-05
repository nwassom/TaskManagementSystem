using System.Collections.Generic;
using Task = TaskManagementSystem.Models.Task;
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

	public void AddTask(Task task)
	{
		_taskRepository.AddTask(task);
	}

	public List<Task> GetTasks()
	{
		return _taskRepository.GetTasks();
	}

	public Task GetTaskById(int id)
	{
		return _taskRepository.GetTaskById(id);
	}

	public void DeleteTasks(Task task)
	{
		_taskRepository.DeleteTasks(task);
	}

	public void UpdateTask(Task updatedTask)
	{
		_taskRepository.UpdateTask(updatedTask);
	}

	public void TaskCompletionToggle(Task task)
	{
		_taskRepository.TaskCompletionToggle(task);
	}
}