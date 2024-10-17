provider "azurerm" {
	features {}
	subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "main" {
	name = "sqlserver-rg"
	location = "East US"
}

# Creates the Azure SQL Server
resource "azurerm_mssql_server" "main" {
  name                         = "taskmanageaisqlserver"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_login
  administrator_login_password = var.sql_admin_password

  tags = {
    environment = "testing"
  }
}

# Create Azure SQL Database in Serverless mode
resource "azurerm_mssql_database" "main" {
  name                = "taskmanageai-db"
  server_id           = azurerm_mssql_server.main.id
  create_mode = "Default"
  min_capacity       = "0.5"  # Minimum vCore

  tags = {
    environment = "development"
  }
}

output "sqlserver_fqdn" {
  value = azurerm_mssql_server.main.fully_qualified_domain_name
}