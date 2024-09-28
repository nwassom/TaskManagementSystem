using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TaskManagementSystem.Services;
using TaskManagementSystem.DataAccess;

namespace TaskManagementSystem;

public class Startup
{
	public void ConfigureServices(IServiceCollection services)
	{
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