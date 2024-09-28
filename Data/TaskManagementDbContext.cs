using Microsoft.EntityFrameworkCore;

public class TaskManagementDbContext : DbContext
{
	public TaskManagementDbContext(DbContextOptions<TaskManagementDbContext> options)
		: base(options)
	{
	}

	public DbSet<Task> Tasks { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Task>()
			.HasKey(t => t.Id);
	}
}