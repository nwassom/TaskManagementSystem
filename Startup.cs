using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore; // Required for UseSqlServer
using TaskManagementSystem.Services;
using TaskManagementSystem.DataAccess;
using TaskManagementSystem.Data;

namespace TaskManagementSystem;

public class Startup
{
	private readonly IConfiguration _configuration;

	public Startup(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public void ConfigureServices(IServiceCollection services)
	{
		services.AddDbContext<TaskManagementDbContext>(options =>
			options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
		services.AddControllers();
		services.AddScoped<TaskService>();
		services.AddScoped<TaskRepository>();
	}

	public void Configure(IApplicationBuilder app)
	{
		app.UseRouting();
		app.UseAuthorization();

		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}