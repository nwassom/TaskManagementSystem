using System.Collections.Generic;
using System.Threading.Tasks;

using User = TaskManagementSystem.Models.User;
using TaskManagementSystem.DataAccess;

namespace TaskManagementSystem.Services;

public class UserService
{
	private readonly UserRepository _userRepository;

	public UserService(UserRepository userRepository)
	{
		_userRepository = userRepository;
	}

	public async Task AddUserAsync(User user)
	{
		await _userRepository.AddUserAsync(user);
	}

	public async Task<User> GetUserByIdAsync(int id)
	{
		return await _userRepository.GetUserByIdAsync(id);
	}

	public async Task DeleteUserAsync(User user)
	{
		await _userRepository.DeleteUserAsync(user);
	}

	public async Task UpdateUserAsync(User updatedUser)
	{
		await _userRepository.UpdateUserAsync(updatedUser);
	}
}