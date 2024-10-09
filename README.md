# Create a compressed backup of your SQL Server data volume:
docker run --rm -v taskmanagementsystem_sql_data:/volume -v $(pwd):/backup busybox tar czvf /backup/sql_data_backup.tar.gz -C /volume .

# Create a named Docker volume to store the SQL Server data:
docker volume create taskmanagementsystem_sql_data

# Restore the SQL data from backup (optional):
docker run --rm -v taskmanagementsystem_sql_data:/volume -v $(pwd):/backup busybox tar xzvf /backup/sql_data_backup.tar.gz -C /volume

# Start your Docker containers using your preferred method:
sudo docker-compose up -d

# To update the SQL Server data backup:
# 1. Create a new backup:
docker run --rm -v taskmanagementsystem_sql_data:/volume -v $(pwd):/backup busybox tar czvf /backup/sql_data_backup.tar.gz -C /volume .
