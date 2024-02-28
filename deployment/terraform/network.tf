# Create VPC
resource "aws_vpc" "my_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "My-vpc"
  }
}

# Create public subnet
resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.${count.index}.0/24"
  availability_zone = element(var.availability_zone, count.index)

  count = length(var.availability_zone)

  map_public_ip_on_launch = true
}


# Create an Internet Gateway
resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id
}

# Create a route table for public subnet
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }
}

# Associate the public subnet with the public route table
resource "aws_route_table_association" "public_subnet_association" {
  count          = length(var.availability_zone)
  subnet_id      = element(aws_subnet.public_subnet.*.id, count.index)
  route_table_id = aws_route_table.public_route_table.id
}


resource "aws_db_subnet_group" "example" {
  name       = "example-subnet-group"
  subnet_ids = aws_subnet.public_subnet.*.id

  tags = {
    Name = "example-subnet-group"
  }
}

# Attach Internet Gateway to VPC
# resource "aws_vpc_attachment" "my_vpc_attachment" {
#   vpc_id           = aws_vpc.my_vpc.id
#   internet_gateway = aws_internet_gateway.my_igw.id
# }


