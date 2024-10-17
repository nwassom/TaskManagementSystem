using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

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

		DotNetEnv.Env.Load("../.env");
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

		string connectionString = _configuration.GetConnectionString("DefaultConnection")
			.Replace("{DbUser}", System.Environment.GetEnvironmentVariable("SA_USER"))
            .Replace("{DbPassword}", System.Environment.GetEnvironmentVariable("SA_PASSWORD"))
            .Replace("{DbIPAddress}", System.Environment.GetEnvironmentVariable("DB_IPADDRESS"));

        Console.Write(connectionString);
		services.AddDbContext<TaskManagementDbContext>(options =>
			options.UseSqlServer(connectionString));
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