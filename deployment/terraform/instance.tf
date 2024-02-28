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

# resource "aws_instance" "aws_demo_instance" {
#   ami             = data.aws_ami.amzlinux.id
#   instance_type   = var.instance_type
#   key_name        = var.key_pair
#   security_groups = [aws_security_group.instance_sg.name, aws_security_group.instance_ssh.name]
#   # user_data            = file("./app.install.sh")
#   # iam_instance_profile = aws_iam_instance_profile.s3_access_instance_profile.name

#   count = 1
#   tags = {
#     "Name" : "Test Ec2 machine"
#     "workspace" : "${terraform.workspace}-workspace"
#   }
# }

resource "aws_launch_template" "launchTemplate" {
  name                   = "DemoAsgTemplate"
  description            = "launch template for DemoAsgTemplate instances."
  image_id               = data.aws_ami.amzlinux.id
  instance_type          = var.instance_type
  key_name               = var.key_pair
  # user_data              = base64encode(file("./app.install.sh"))
  vpc_security_group_ids = [aws_security_group.instance_sg.id, aws_security_group.instance_ssh.id]

  disable_api_termination = false

  iam_instance_profile {
    arn = aws_iam_instance_profile.s3_access_instance_profile.arn
  }

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = 8
      volume_type = "gp2"
    }
  }

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name        = "DemoAsgTemplate"
      Environment = "prod"
    }
  }

}

# Asg
resource "aws_autoscaling_group" "instance_asg" {
  name = "Instance_asg"

  launch_template {
    id      = aws_launch_template.launchTemplate.id
    version = "$Latest"
  }

  vpc_zone_identifier = aws_subnet.public_subnet.*.id

  min_size                  = 1
  max_size                  = 1
  desired_capacity          = 1
  health_check_type         = "ELB"
  health_check_grace_period = 60

  target_group_arns = [aws_lb_target_group.instance_lb_tg.arn]

  tag {
    key                 = "Name"
    value               = "Demo Asg"
    propagate_at_launch = true
  }
}

# LB
resource "aws_lb" "instance_lb" {
  name               = "instance-lb"
  internal           = false
  load_balancer_type = "application"
  subnets            = aws_subnet.public_subnet.*.id
  security_groups    = [aws_security_group.lb_sg.id]

  enable_deletion_protection = false
  drop_invalid_header_fields = true

  tags = {
    Name        = "Instance lb"
    Environment = "prod"
  }
}

resource "aws_lb_target_group" "instance_lb_tg" {
  name        = "instance-lb-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.my_vpc.id
  target_type = "instance"

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 10
    timeout             = 5
    interval            = 10
    matcher             = 200
    path                = "/"
    port                = "traffic-port"
  }

  tags = {
    Name        = "Instance lb tg"
    Environment = "prod"
  }
}

resource "aws_lb_listener" "instance_lb_tg_listener" {
  load_balancer_arn = aws_lb.instance_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.instance_lb_tg.arn
  }
}

resource "aws_lb_listener" "instance_lb_tg_listener_ssl" {
  load_balancer_arn = aws_lb.instance_lb.arn
  port              = 443
  protocol          = "HTTP" // TODO: change to https when ssl is added

  default_action {
    type             = "redirect"
    redirect {
      port        = "80"
      protocol    = "HTTP"
      status_code = "HTTP_301"
    }
  }
}


# DB config
resource "aws_db_instance" "mysql_db" {
  allocated_storage    = 10
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t2.micro"
  db_name              = "test"
  username             = "WmDlcwrbp4iAJ3Fh"
  password             = "q$tlLjhGRSb*"
  port                 = 3306
  parameter_group_name = aws_db_parameter_group.mysql.name
  publicly_accessible  = true
  deletion_protection  = false
  multi_az             = false
  skip_final_snapshot  = true
  storage_type         = "gp2"
  identifier           = "test-db"

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

