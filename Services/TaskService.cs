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
}