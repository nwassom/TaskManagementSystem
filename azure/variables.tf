variable "sql_admin_password" {
  type = string
  description = "Password for SQL Server SA Account"
  sensitive = true
}

variable "sql_admin_login" {
  type = string
  description = "User login for SQL Server SA Account"
}

variable "subscription_id" {
  type = string
  description = "Subscription ID for Azure"
}