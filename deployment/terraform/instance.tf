resource "aws_iam_role" "s3_access_role" {
 name = "s3_access_role"

 assume_role_policy = jsonencode({
   Version = "2012-10-17"
   Statement = [
     {
       Action = "sts:AssumeRole"
       Effect = "Allow"
       Principal = {
         Service = "ec2.amazonaws.com"
       }
     }
   ]
 })
}

# Instance profile
resource "aws_iam_instance_profile" "s3_access_instance_profile" {
 role = aws_iam_role.s3_access_role.name
}

resource "aws_iam_policy" "s3_access_policy" {
 name   = "s3_access_policy"
 policy = data.aws_iam_policy_document.s3_access_policy.json
}

data "aws_iam_policy_document" "s3_access_policy" {
 statement {
   actions = [
     "s3:GetObject",
     "s3:PutObject",
     "s3:DeleteObject",
     "s3:AbortMultipartUpload",
     "s3:ListMultipartUploadParts"
   ]

   effect = "Allow"

   resources = [
     aws_s3_bucket.file_bucket.arn,
   ]
 }
}

resource "aws_iam_role_policy_attachment" "s3_access_policy_attachment" {
 policy_arn = aws_iam_policy.s3_access_policy.arn
 role       = aws_iam_role.s3_access_role.name
}

resource "aws_instance" "aws_demo_instance" {
  ami                         = data.aws_ami.amzlinux.id
  instance_type               = var.instance_type
  key_name                    = var.key_pair
  security_groups             = [aws_security_group.instance_sg.id, aws_security_group.instance_ssh.id]
  subnet_id                   = aws_subnet.public_subnet[0].id
  associate_public_ip_address = true
  ipv6_address_count          = 1

  # user_data            = file("./app.install.sh")
  iam_instance_profile    = aws_iam_instance_profile.s3_access_instance_profile.name
  disable_api_termination = false

  count = 1
  tags = {
    "Name" : "Test Ec2 machine"
    "workspace" : "${terraform.workspace}-workspace"
  }
}


# DB config
resource "aws_db_instance" "mysql_db" {
 allocated_storage    = 10
 engine               = "mysql"
 engine_version       = "8.0"
 instance_class       = "db.t3.micro"
 db_name              = "test"
 username             = "WmDlcwrbp4iAJ3Fh"
 password             = "q$tlLjhGRSb*"
 port                 = 3306
 parameter_group_name = aws_db_parameter_group.mysql.name
 publicly_accessible  = false
 deletion_protection  = false
 multi_az             = false
 skip_final_snapshot  = true
 storage_type         = "gp2"
 identifier           = "test-db"

  # Enable automated backups and set retention period
  backup_retention_period = 3 # Set retention period to 7 days
  # backup_window = "04:00-08:00"

 vpc_security_group_ids = [aws_security_group.rds_sg.id]
 db_subnet_group_name   = aws_db_subnet_group.example.name # This associates the RDS with the subnet group

 tags = {
   "Name" : "Test db"
   "workspace" : "${terraform.workspace}-workspace"
 }
}

resource "aws_db_parameter_group" "mysql" {
 name   = "test-dd-parameter-configs"
 family = "mysql8.0"

 parameter {
   name  = "max_connections"
   value = "15"
 }
}

