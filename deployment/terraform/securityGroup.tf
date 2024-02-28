resource "aws_security_group" "lb_sg" {
  name = "Lb_sg"

  vpc_id = aws_vpc.my_vpc.id
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" : "lb sg"
  }

}

resource "aws_security_group" "instance_sg" {
  name = "Instance web sg"

  vpc_id = aws_vpc.my_vpc.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.lb_sg.id]
    # cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.lb_sg.id]
    # cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" : "instance web-vpc sg"
  }

}

resource "aws_security_group" "instance_ssh" {
  name_prefix = "Instance ssh sg"
  description = "This is a ec2 instance ssh ssh sg group"

  vpc_id = aws_vpc.my_vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" : "instance ssh sg"
  }
}

# db security group
resource "aws_security_group" "rds_sg" {
  name_prefix = "Test app sg"
  description = "RDS security group"

  vpc_id = aws_vpc.my_vpc.id

  // Allow incoming traffic from your EC2 instance
  ingress {
    from_port = 3306
    to_port   = 3306
    protocol  = "tcp"
    # security_groups = [aws_security_group.instance_sg.id]
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" : "mysql sg"
  }
}
