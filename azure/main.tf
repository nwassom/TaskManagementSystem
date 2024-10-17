provider "azurerm" {
	features {}
	subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "main" {
	name = "sqlserver-rg"
	location = "East US"
}

resource "azurerm_storage_account" "main" {
		name = "taskmanageaisqlserver"
		resource_group_name = azurerm_resource_group.main.name
		location = azurerm_resource_group.main.location
		account_tier = "Standard"
		account_replication_type = "LRS"
}

resource "azurerm_storage_container" "compose" {
		name = "dockercompose"
		storage_account_name = azurerm_storage_account.main.name
		container_access_type = "private"
}

resource "azurerm_storage_blob" "compose_file" {
		name = "docker-compose.yml"
		storage_account_name = azurerm_storage_account.main.name
		storage_container_name = azurerm_storage_container.compose.name
		type = "Block"
		source = "${path.module}/../docker-compose.yml"
}

resource "azurerm_container_group" "sqlserver" {
		name = "sqlserver-aci"
		location = azurerm_resource_group.main.location
		resource_group_name = azurerm_resource_group.main.name
		os_type = "Linux"

		dns_name_label = "taskmanageaisqlserver"

		container {
				name = "sqlserver"
				image = "mcr.microsoft.com/mssql/server:2019-latest"
				cpu = "1"
				memory = "2.5"

				environment_variables = {
						SA_PASSWORD = var.sa_password
						ACCEPT_EULA = "Y"
				}

				ports {
					port = 1433
					protocol = "TCP"
				}
		}

		tags = {
				environment = "testing"
		}
}

output "sqlserver_fqdn" {
		value = azurerm_container_group.sqlserver.fqdn
}