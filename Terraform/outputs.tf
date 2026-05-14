output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.app_server.id
}

output "public_ip" {
  description = "EC2 Elastic IP"
  value       = aws_eip.app_eip.public_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main_vpc.id
}

output "ssh_command" {
  description = "SSH command to login"
  value       = "ssh -i ${var.key_name}.pem ubuntu@${aws_eip.app_eip.public_ip}"
}