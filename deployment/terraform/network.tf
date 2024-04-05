# Create VPC with IPv6 support
resource "aws_vpc" "my_vpc" {
  assign_generated_ipv6_cidr_block = true

  cidr_block = "10.0.0.0/16"
}

# Create a subnet with IPv6 support within the VPC
resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.my_vpc.id

  availability_zone = element(var.availability_zone, count.index)
  count             = length(var.availability_zone)

  ipv6_cidr_block = cidrsubnet(aws_vpc.my_vpc.ipv6_cidr_block, 4, count.index)

  map_public_ip_on_launch         = false # No public IP for IPv4
  assign_ipv6_address_on_creation = true
  cidr_block                      = cidrsubnet(aws_vpc.my_vpc.cidr_block, 4, count.index)
}

resource "aws_db_subnet_group" "example" {
  name       = "example-subnet-group"
  subnet_ids = aws_subnet.public_subnet.*.id

  tags = {
    Name = "example-subnet-group"
  }
}

resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id
}

resource "aws_default_route_table" "public_route_table" {
  default_route_table_id = aws_vpc.my_vpc.default_route_table_id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.my_igw.id
  }
}

resource "aws_route_table_association" "public_subnet_association" {
  route_table_id = aws_default_route_table.public_route_table.id

  count     = length(var.availability_zone)
  subnet_id = element(aws_subnet.public_subnet.*.id, count.index)
}

