provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "CloudOps360"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}