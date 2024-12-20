/**
 * 	Handles Api endpoints for the User
 **/
using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Services;
using System.Threading.Tasks;

using TaskManagementSystem.Interfaces;
using TaskManagementSystem.Models;
using User = TaskManagementSystem.Models.User;

namespace TaskManagementSystem.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
	private readonly IUserService _userService;
	private readonly IJwtService _jwtService;

	public UserController(IUserService userService, IJwtService jwtService)
	{
		_userService = userService;
		_jwtService = jwtService;
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

		user.LastLogin = DateTime.UtcNow;
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
	            LastLogin = user.LastLogin,
	        },
	        Token = token
   	 	};

    	return Ok(response);	
	}

	[HttpPost("logout")]
	public async Task<IActionResult> Logout()
	{
		await _userService.LogoutAsync();

		return Ok(new { message = "Successfully logged out" });
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