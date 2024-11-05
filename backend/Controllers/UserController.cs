using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Services;
using System.Threading.Tasks;

using User = TaskManagementSystem.Models.User;

namespace TaskManagementSystem.Controllers;

public class UserController : ControllerBase
{
	private readonly UserService _userService;

	public UserController(UserService userService)
	{
		_userService = userService;
	}

	[HttpPost]
	public async Task<IActionResult> CreateUser([FromBody] User user)
	{
		if (user == null)
		{
			return BadRequest("User cannot be null");
		}

		await _userService.AddUserAsync(user);


		return NoContent(); // Fix this at some point
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteUser(int id)
	{
		try
		{
			var user = await _userService.GetUserByIdAsync(id);

			if (user == null)
			{
				return NotFound($"User with the ID {id} not found.");
			}

			await _userService.DeleteUserAsync(user);

			return NoContent();
		}
		catch (Exception e)
		{
			return StatusCode(500, $"Internal server error: {e.Message}");
		}
	}
	
}