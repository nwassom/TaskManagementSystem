using UserTask = TaskManagementSystem.Models.Task;

namespace TaskManagementSystem.Interfaces;

public interface ITaskService
{
    Task AddTaskAsync(UserTask task);
    Task<List<UserTask>> GetTasksAsync();
    Task<List<UserTask>> GetTasksAsync(int userId);
    Task<UserTask> GetTaskByIdAsync(int id);
    Task DeleteTaskAsync(UserTask task);
    Task UpdateTaskAsync(UserTask updatedTask);
}