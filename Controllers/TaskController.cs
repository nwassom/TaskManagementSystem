using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Services;
using Task = TaskManagementSystem.Models.Task;

namespace TaskManagementSystem.Controllers;

[ApiController]
[Route("api/task")]
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
	public IActionResult CreateTasks([FromBody] Task task)
	{
		_taskService.AddTask(task);
		return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
	}
}