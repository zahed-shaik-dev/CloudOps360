output "aws_account_id" {
  description = "AWS account ID used by Terraform"
  value       = data.aws_caller_identity.current.account_id
}

output "aws_region" {
  description = "AWS region used by Terraform"
  value       = data.aws_region.current.region
}

output "vpc_id" {
  description = "CloudOps360 VPC ID"
  value       = aws_vpc.cloudops360.id
}

output "public_subnet_id" {
  description = "CloudOps360 public subnet ID"
  value       = aws_subnet.public.id
}

output "security_group_id" {
  description = "CloudOps360 EC2 security group ID"
  value       = aws_security_group.cloudops360.id
}

output "ec2_instance_id" {
  description = "CloudOps360 EC2 instance ID"
  value       = aws_instance.cloudops360.id
}

output "ec2_public_ip" {
  description = "CloudOps360 EC2 public IP"
  value       = aws_instance.cloudops360.public_ip
}

output "ec2_public_dns" {
  description = "CloudOps360 EC2 public DNS"
  value       = aws_instance.cloudops360.public_dns
}