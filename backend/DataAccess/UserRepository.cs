using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using User = TaskManagementSystem.Models.User;
using TaskManagementSystem.Data;

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

	// Adds new user to the database
	public async User AddUserAsync(User user)
	{
		await _context.Users.AddAsync(user);
		await _context.SaveChangesAsync();
	}

	// Finds User by id
	public async Task<User> GetUserByIdAsync(int id)
	{
		var user = await _context.Users.FindAsync(id);

		if (user == null)
		{
			throw new ArgumentException("Error User not found");
			return null;
		}

		return user;
	}

	public async User DeleteUserAsync(User user)
	{
		_context.Users.Remove(user);
		await _context.SaveChangesAsync();
	}

	public async User UpdateUserAsync(User updatedUser)
	{
		_context.Users.Update(updatedUser);
		await _context.SaveChangesAsync();
	}

}