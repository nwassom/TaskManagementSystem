using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

using TaskManagementSystem.Interfaces;
using User = TaskManagementSystem.Models.User;
using TaskManagementSystem.DataAccess;
using TaskManagementSystem.Utils;

namespace TaskManagementSystem.Services;

public class UserService : IUserService
{
	private readonly UserRepository _userRepository;
	private readonly IHttpContextAccessor _httpContextAccessor;

	public UserService(UserRepository userRepository, IHttpContextAccessor httpContextAccessor)
	{
		_userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
    	_httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
	}

	public async Task AddUserAsync(User user)
	{
		try 
		{	
			user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
			await _userRepository.AddUserAsync(user);
		}
		catch (DbUpdateException e)
		{
			if (e.InnerException is SqlException sqlEx && sqlEx.Number == 2627)
			{
				if (sqlEx.Message.Contains("Username"))
				{
					throw new ArgumentException("This username is already in use.");
				}
				if (sqlEx.Message.Contains("Email"))
				{
					throw new ArgumentException("This email is already in use.");
				}
			}
			throw;
		}
	}

	public async Task LogoutAsync()
	{
		return
	}

	public async Task<User> GetUserByIdentifier(string identifier)
	{
		return await _userRepository.GetUserByIdentifier(identifier);
	}

	public async Task DeleteUserAsync(User user)
	{
		User userToDelete = await _userRepository.FindUserByIdentifier(user.Id, user.Username, user.Email);

		if (userToDelete != null)
		{
			await _userRepository.DeleteUserAsync(userToDelete);
		}
	}

	public async Task UpdateUserAsync(User updatedUser)
	{
		await _userRepository.UpdateUserAsync(updatedUser);
	}

	public int GetCurrentUserId()
	{
		var userIdClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

		if (userIdClaim == null)
		{
			throw new UnauthorizedAccessException("User is not authenticated");
		}

		return int.Parse(userIdClaim);
	}
}