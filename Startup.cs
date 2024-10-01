using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Services;
using TaskManagementSystem.DataAccess;
using TaskManagementSystem.Data;

namespace TaskManagementSystem;

/*
	Startup class that initiates the backend server
*/
public class Startup
{
	private readonly IConfiguration _configuration;

	public Startup(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public void ConfigureServices(IServiceCollection services)
	{
		services.AddCors(options =>{
			options.AddPolicy("AllowReactApp",
				builder =>
				{
					builder.WithOrigins("http://localhost:3000", "https://localhost:3000")
						.AllowAnyHeader()
						.AllowAnyMethod();
				});
		});

		services.AddDbContext<TaskManagementDbContext>(options =>
			options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
		services.AddControllers();
		services.AddScoped<TaskService>();
		services.AddScoped<TaskRepository>();
	}

	public void Configure(IApplicationBuilder app)
	{
		app.UseHttpsRedirection();
		app.UseRouting();
		app.UseCors("AllowReactApp");
		app.UseAuthorization();

		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}