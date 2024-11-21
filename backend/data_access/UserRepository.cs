using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using User = TaskManagementSystem.Models.User;
using TaskManagementSystem.Data;
using UserUtils = TaskManagementSystem.Utils.UserUtils;

namespace TaskManagementSystem.DataAccess;

public class UserRepository
{
	// Connection for database
	private readonly TaskManagementDbContext _context;

	// Gets coonnection string and db context
	public UserRepository(TaskManagementDbContext context)
	{
		_context = context;
	}

	public async Task<User> FindUserByIdentifier(int? id, string? username, string? email)
	{
		return await UserUtils.FindUserByIdentifier(_context, id, username, email);
	}

	// Adds new user to the database
	public async Task AddUserAsync(User user)
	{
		await _context.Users.AddAsync(user);
		await _context.SaveChangesAsync();
	}

	public async Task<User> GetUserByIdentifier(string identifier)
	{
		return await _context.Users
			.FirstOrDefaultAsync(u => u.Email == identifier || u.Username == identifier);
	}

	public async Task DeleteUserAsync(User user)
	{
		_context.Users.Remove(user);
		await _context.SaveChangesAsync();
	}

	public async Task UpdateUserAsync(User updatedUser)
	{
		_context.Users.Update(updatedUser);
		await _context.SaveChangesAsync();
	}

	

}