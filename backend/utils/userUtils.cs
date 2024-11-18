using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using TaskManagementSystem.Data;
using User = TaskManagementSystem.Models.User;

namespace TaskManagementSystem.Utils;

public static class UserUtils
{
    public static async Task<User> FindUserByIdentifier(TaskManagementDbContext context, int? id, string? username = null, string? email = null)
    {
        if (id == null && string.IsNullOrEmpty(username) && string.IsNullOrEmpty(email))
        {
            throw new ArgumentException("Either username or email needs to be provided");
        }

        return await context.Users
            .Where(u => (id != null && u.Id == id) || (username != null && u.Username == username) || (email != null && u.Email == email))
            .FirstOrDefaultAsync();
    }
}