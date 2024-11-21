using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
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
		services.AddDbContext<TaskManagementDbContext>(options =>
			options.UseSqlServer(connectionString, sqlOptions =>
					sqlOptions.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null)
				)
		);

		var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
		var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
		var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

		var key = Encoding.UTF8.GetBytes(jwtSecret);

		Console.WriteLine($"JWT Secret (raw): {jwtSecret}");
		Console.WriteLine($"Key Length (bytes): {key.Length}");


		services.AddAuthentication(options => 
		{
			options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
		}).AddJwtBearer(options => 
		{
			options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = true,
				ValidateAudience =  true,
				ValidateLifetime = true,
				ValidateIssuerSigningKey = true,
				ValidIssuer = jwtIssuer,
				ValidAudience = jwtAudience,
				IssuerSigningKey = new SymmetricSecurityKey(key)
			};
		});

		services.AddControllers();
		services.AddScoped<TaskService>();
		services.AddScoped<TaskRepository>();

		services.AddScoped<JwtService, JwtService>();
		services.AddScoped<UserService>();
		services.AddScoped<UserRepository>();
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