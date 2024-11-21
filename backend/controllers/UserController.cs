/**
 * 	Handles Api endpoints for the User=
 **/
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

	/*
		@param User: 
	*/
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

	[HttpPost("login")]
	public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest("Invalid input");
		}

		var user = await _userService.GetUserByIdentifier(loginRequest.Identifier);

		if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
		{
			return Unauthorized("Invalid email or password");
		}

		user.LastLogin= DateTime.UtcNow();
		await _userService.UpdateUserAsync(user);

		var token = _jwtService.GenerateToken(user.Id, user.Email);
		var response = new
   		{
	        User = new
	        {
	            UserId = user.Id,
	            Username = user.Username,
	            Email = user.Email,
	            Name = user.Name,
	            CreatedAt = user.CreatedAt,
	            LastLogin = user.lastLogin,
	        },
	        Token = token
   	 	};

    	return Ok(response);	
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