using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using TaskManagementSystem;

// Main that creates the Host 
public class Program
{
	public static void Main(string [] args)
	{
		CreateHostBuilder(args).Build().Run();
	}

	public static IHostBuilder CreateHostBuilder(string[] args) =>
		Host.CreateDefaultBuilder(args)
			.ConfigureWebHostDefaults(webBuilder => 
			{
				webBuilder.UseStartup<Startup>();
			});
}
