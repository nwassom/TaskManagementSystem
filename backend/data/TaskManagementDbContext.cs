using Microsoft.EntityFrameworkCore;
using Task = TaskManagementSystem.Models.Task;
using User = TaskManagementSystem.Models.User;

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
	public DbSet<User> Users { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Task>()
			.HasKey(t => t.Id);

		modelBuilder.Entity<Task>()
			.HasOne(t => t.User)
			.WithMany(u => u.Tasks)
			.HasForeignKey(t => t.UserId)
			.OnDelete(DeleteBehavior.Cascade);

		modelBuilder.Entity<User>()
			.HasKey(u => u.Id);

		modelBuilder.Entity<User>()
			.HasIndex(u => u.Username)
			.IsUnique();

		modelBuilder.Entity<User>()
			.HasIndex(u => u.Email)
			.IsUnique();
	}
}