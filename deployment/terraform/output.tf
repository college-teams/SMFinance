output "AMI_ID" {
 value = data.aws_ami.amzlinux.id
}

output "db-hostname" {
 description = "Db host name"
 value       = aws_db_instance.mysql_db.address
}

output "db-username" {
 description = "Db username name"
 value       = aws_db_instance.mysql_db.username
}

output "db-password" {
 description = "Db password name"
 value       = aws_db_instance.mysql_db.password
 sensitive   = true
}

output "vpc" {
 value = aws_vpc.my_vpc.id
}