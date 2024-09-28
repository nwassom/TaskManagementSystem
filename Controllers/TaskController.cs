using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Services;
using Task = TaskManagementSystem.Models.Task;

[ApiController]
[Route("api/[controller]")]

public class TaskController : ControllerBase
{
	private readonly TaskService _taskService;

	public TaskController(TaskService taskService)
	{
		_taskService = taskService;
	}

	[HttpGet]
	public IActionResult GetTasks()
	{
		var tasks = _taskService.GetTasks();
		return Ok(tasks);
	}

	[HttpPost]
	public IActionResult CreateTasks(Task task)
	{
		_taskService.AddTask(task);
		return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
	}
}