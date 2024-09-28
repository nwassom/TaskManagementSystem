using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Task = TaskManagementSystem.Models.Task;

namespace TaskManagementSystem.DataAccess;
/*	
	Repository class that manages tasks within the database
*/
public class TaskRepository
{

	// Connection for database
	private readonly string _connectionString;


	// Gets connection string from the appsettings.json
	public TaskRepository(IConfiguration configuration)
	{
		_connectionString = configuration.GetConnectionString("TaskManagementDB");
	}

	// Adds new task to the database
	public void AddTask(Task task)
	{
		using (var connection = new SqlConnection(_connectionString))
		{
			// Create and define SQL command
			var command = new SqlCommand("INSERT INTO Tasks (Title, Description) VALUES (@Title, @Description)", connection);

			// Add in the params to the command !!! THIS PREVENTS SQL INJECTION !!!
			command.Parameters.AddWithValue("@Title", task.Title);
			command.Parameters.AddWithValue("@Description", task.Description);

			connection.Open();

			command.ExecuteNonQuery();
		}
	}

	// Retrieve All tasks from DB
	public List<Task> GetTasks()
	{
		var tasks = new List<Task>();

		using (var connection = new SqlConnection(_connectionString))
		{
			var command = new SqlCommand("SELECT * FROM Tasks", connection);

			connection.Open();

			using (var reader = command.ExecuteReader())
			{
				while (reader.Read())
				{
					var task = new Task
					{
						Id = reader.GetInt32(0),
						Title = reader.GetString(1),
						Description = reader.GetString(2),
						CreatedAt = reader.GetDateTime(3),
						IsCompleted = reader.GetBoolean(4)
					};

					tasks.Add(task);
				}
			}
		}

		return tasks;
	}
}