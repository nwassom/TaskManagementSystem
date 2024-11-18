using System.Collections.Generic;
using System.Threading.Tasks;

using User = TaskManagementSystem.Models.User;
using TaskManagementSystem.DataAccess;
using TaskManagementSystem.Utils;

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
		User checkForUser = await _userRepository.FindUserByIdentifier(user.Id, user.Username, user.Email);

		if (checkForUser != null)
		{
			if (checkForUser.Username == user.Username)
			{
				throw new ArgumentException("A User with this Username already exists");
			}
			else if (checkForUser.Email == user.Email)
			{
				throw new ArgumentException("A User with this Email may already exists");
			}
		}
		
		await _userRepository.AddUserAsync(user);
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
}