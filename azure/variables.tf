variable "sa_password" {
  type = string
  description = "Password for SQL Server SA Account"
  sensitive = true
}

variable "subscription_id" {
  type = string
  description = "Subscription ID for Azure"
}