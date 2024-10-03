using Microsoft.EntityFrameworkCore;
using Task = TaskManagementSystem.Models.Task;

namespace TaskManagementSystem.Data;

/*
	Bridge between backend server and the sqlserver database
*/
public class TaskManagementDbContext : DbContext
{
	public TaskManagementDbContext(DbContextOptions<TaskManagementDbContext> options)
		: base(options)
	{
	}

	public DbSet<Task> Tasks { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Task>().HasKey(t => t.Id);
	}
}