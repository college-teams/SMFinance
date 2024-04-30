terraform {
  required_version = "~>1.2.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>5.0"
    }
  }
}

provider "aws" {
  profile = "smf"
  region  = var.aws_region
}

terraform {
  backend "s3" {
    bucket  = "smfinance-state"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    profile = "smf"
  }
}