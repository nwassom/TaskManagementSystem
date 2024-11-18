using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Https;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection; 

using TaskManagementSystem;

/*
	Main that creates the Host
*/
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
					// .ConfigureKestrel(options => 
					// {
					// 	options.ListenAnyIP(5001, listenOptions => 
					// 	{
					// 		listenOptions.UseHttps();
					// 	});
					// });
			});
}
