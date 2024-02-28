data "aws_ami" "amzlinux" {

  most_recent = true

  filter {
    name   = "name"
    values = ["my-custom-ami-*"]
  }
  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "tag:env"
    values = ["test"]
  }

  owners = ["689413200757"]
}