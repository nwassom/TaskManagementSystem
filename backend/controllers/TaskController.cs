/**
 * 	Handles Api endpoints for Tasks
 **/
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Services;
using System.Threading.Tasks;
using System.Security.Claims;

using Task = TaskManagementSystem.Models.Task;

namespace TaskManagementSystem.Controllers;

/*
	Class to handles Api endpoints
*/
[ApiController]
[Route("api/task")]
[Authorize]
public class TaskController : ControllerBase
{
	private readonly TaskService _taskService;

	public TaskController(TaskService taskService)
	{
		_taskService = taskService;
	}

	// Returns list of tasks
	[HttpGet]
	public async Task<IActionResult> GetTasks()
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		if (string.IsNullOrEmpty(userId))
		{
			return Unauthorized("User ID not found in the token");
		}

		if (!int.TryParse(userId, out int parsedUserId))
		{
			return BadRequest("Invalid User ID Format");
		}

		var tasks = await _taskService.GetTasksAsync(parsedUserId);

		if (tasks == null || tasks.Count == 0)
		{
			return NotFound("No tasks found for this user.");
		}
		
		return Ok(tasks);
	}

	// Creates new Task and saves in database
	[HttpPost]
	public async Task<IActionResult> CreateTasks([FromBody] Task task)
	{
		if (task == null)
		{
			return BadRequest("Task cannot be null");
		}
		
		await _taskService.AddTaskAsync(task);
		return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
	}

	// Deletes a Task given it's id
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteTask(int id)
	{
		try
		{
			var task = await _taskService.GetTaskByIdAsync(id);

			if (task == null)
			{
				return NotFound($"Task with ID {id} not found.");
			}

			await _taskService.DeleteTaskAsync(task);

			return NoContent();
		}
		catch (Exception e)
		{
			return StatusCode(500, $"Internal server error: {e.Message}");
		}
	}

	// Update Task Information
	[HttpPatch("{id}")]
	public async Task<IActionResult> UpdateTask(int id, [FromBody] Task updatedTask)
	{
		try
		{
			var existingTask = await _taskService.GetTaskByIdAsync(id);

			if (existingTask == null)
			{
				return NotFound($"Task with ID {id} not found for updating.");
			}

			if (updatedTask == null)
			{
				return BadRequest("Invalid task data.");
			}

			// Apply updates only if fields are provided in updatedTask
	        if (updatedTask.Title != null)
	        {
	            existingTask.Title = updatedTask.Title;
	        }

	        if (updatedTask.Description != null)
	        {
	            existingTask.Description = updatedTask.Description;
	        }

	        if (updatedTask.IsCompleted.HasValue)
	        {
	            existingTask.IsCompleted = updatedTask.IsCompleted.Value;
	        }

			await _taskService.UpdateTaskAsync(existingTask);
			return Ok("Task sucessfully updated");
		}
		catch (Exception e)
		{
			return StatusCode(500, $"Internal server error: {e.Message}");
		}
	}
}