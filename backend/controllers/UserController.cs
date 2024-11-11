using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Services;
using System.Threading.Tasks;

using User = TaskManagementSystem.Models.User;

namespace TaskManagementSystem.Controllers;

[ApiController]
[Route("api/user")]
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

	[HttpDelete]
	public async Task<IActionResult> DeleteUser([FromBody] User user)
	{
		try
		{
			await _userService.DeleteUserAsync(id);
			return NoContent();
		}
		catch (Exception e)
		{
			return StatusCode(500, $"Internal server error: {e.Message}");
		}
	}
	
}