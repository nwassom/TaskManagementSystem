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

	[HttpPost("signup")]
	public async Task<IActionResult> CreateUser([FromBody] User user)
	{
		if (user == null)
		{
			return BadRequest("User cannot be null");
		}
		try
		{
			await _userService.AddUserAsync(user);
			return NoContent();
		}
		catch (ArgumentException e)
		{
			return Conflict(new { message = e.Message });
		}
		catch (Exception e)
		{
			return StatusCode(500, $"Internal server error: {e.Message} | {e.InnerException?.Message} ");
		}
	}

	[HttpDelete]
	public async Task<IActionResult> DeleteUser([FromBody] User user)
	{
		try
		{
			await _userService.DeleteUserAsync(user);
			return NoContent();
		}
		catch (Exception e)
		{
			return StatusCode(500, $"Internal server error: {e.Message}");
		}
	}
	
}