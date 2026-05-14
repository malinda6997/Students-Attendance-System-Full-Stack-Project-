variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  default = "10.0.1.0/24"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t3.micro"
}

variable "ami_id" {
  description = "Ubuntu 22.04 AMI ID"
  default     = "ami-091138d0f0d41ff90"
}

variable "key_name" {
  description = "AWS EC2 Key Pair name"
  type        = string
  default     = "Aws-key" 
}