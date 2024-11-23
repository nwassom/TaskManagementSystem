using User = TaskManagementSystem.Models.User;

namespace TaskManagementSystem.Interfaces;

public interface IUserService
{
    Task AddUserAsync(User user);
    Task<User> GetUserByIdentifier(User user);
    Task<User> GetUserByIdentifier(string identifier);
    Task<User> GetUserByIdentifier(int identifier);
    Task DeleteUserAsync(User user);
    Task UpdateUserAsync(User updatedUser);
    int GetCurrentUserId();
    Task LogoutAsync();
}