using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Services;
using Task = TaskManagementSystem.Models.Task;

namespace TaskManagementSystem.Controllers;

/*
	Class to handles Api endpoints
*/
[ApiController]
[Route("api/task")]
public class TaskController : ControllerBase
{
	private readonly TaskService _taskService;

	public TaskController(TaskService taskService)
	{
		_taskService = taskService;
	}

	// Returns list of tasks
	[HttpGet]
	public IActionResult GetTasks()
	{
		var tasks = _taskService.GetTasks();
		return Ok(tasks);
	}

	// Creates new Task and saves in database
	[HttpPost]
	public IActionResult CreateTasks([FromBody] Task task)
	{
		if (task == null)
		{
			return BadRequest("Task cannot be null");
		}
		
		_taskService.AddTask(task);
		return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
	}

	// Deletes a Task given it's id
	[HttpDelete("{id}")]
	public IActionResult DeleteTasks(int id)
	{
		try
		{
			var task = _taskService.GetTaskById(id);

			if (task == null)
			{
				return NotFound($"Task with ID {id} not found.");
			}

			_taskService.DeleteTasks(task);

			return NoContent();
		}
		catch (Exception e)
		{
			return StatusCode(500, $"Internal server error: {e.Message}");
		}
	}

	// Update Task Information
	[HttpPatch("{id}")]
	public IActionResult UpdateTask(int id, [FromBody] Task updatedTask)
	{
		try
		{
			var existingTask = _taskService.GetTaskById(id);

			if (existingTask == null)
			{
				return NotFound($"Task with ID {id} not found for updating.");
			}

			if (updatedTask == null)
			{
				return BadRequest("Invalid task data.");
			}

			existingTask.Title = updatedTask.Title;
			existingTask.Description = updatedTask.Description;
			existingTask.IsCompleted = updatedTask.IsCompleted;

			_taskService.UpdateTask(existingTask);
			return Ok("Task sucessfully updated");
		}
		catch (Exception e)
		{
			return StatusCode(500, $"Internal server error: {e.Message}");
		}
	}

	// Update Task Completion via Toggle True -> False & vice versa
	// [HttpPatch("{id}")]
	// public IActionResult TaskCompletionToggle(int id, [FromBody] Task toggledTask)
	// {
	// 	try
	// 	{
	// 		var task = _taskService.GetTaskById(id);

	// 		if (task =)
	// 	}
	// }
}