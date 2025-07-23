
# 🚀 EC2-Powered WordPress Hosting with EBS Snapshots, Auto Scaling & CloudWatch Alarms (Ubuntu)

## 📝 Description

This project showcases a high-availability WordPress hosting setup using Amazon EC2 with Ubuntu, where WordPress runs on an Apache + PHP stack with a locally hosted MySQL database. The project includes:

Auto Scaling Group (ASG) for elasticity

Elastic Load Balancer (ALB) for traffic distribution

EBS Volume for persistent WordPress storage

CloudWatch Alarms for system health monitoring

EBS Snapshots for daily backup

It is fully deployable using AWS Free Tier and is a great project to demonstrate practical cloud computing skills.

## 💻 Technologies Used

### Component and Technology
- Operating System: 	Ubuntu Server 22.04 (on EC2)
- Web Server: 	Apache2
- Backend:	PHP + MySQL (Local DB)
- CMS:	WordPress
- Storage:	Amazon EBS
- Load Balancer:	Application Load Balancer (ALB)
- Scaling:	Auto Scaling Group (ASG)
- Monitoring:	CloudWatch + Alarms (CPU, status)
- Backup:	Amazon EBS Snapshots (Lifecycle)

## 🌐 Real-World Use Case
- Hosting personal or small business blogs
- Lightweight web apps that require persistent local storage
- Backup-aware deployments without complex architecture
- Learning DevOps and cloud infrastructure using Ubuntu on AWS

## ⚙️ Architecture

## 🛠️ Features
- ✅ WordPress auto-installed on EC2 Ubuntu using user-data script
- ✅ Apache2, PHP, MySQL stack installed and configured
- ✅ EBS volume mounted for data persistence
- ✅ Application Load Balancer distributes traffic to healthy EC2 instances
- ✅ Auto Scaling Group adds/removes instances based on load
- ✅ Daily EBS Snapshots created using Lifecycle Manager
- ✅ CloudWatch Alarms monitor instance health and CPU utilization

## 🧠 Learnings & Skills Gained
- 🧩 Cloud architecture for high availability (HA)

- 💽 Mounting and formatting EBS on Ubuntu

- 📈 Setting CloudWatch alarms (e.g., CPU > 80%, instance status failed)

- 🔄 Writing EC2 user-data scripts for automated provisioning

- 📊 Monitoring logs and alarms for system health

- 🧰 Troubleshooting load balancer and instance health issues

### ⚙️ Optimization Ideas
### Optimization and Benefit
- Use RDS for MySQL	Better performance, auto-backup, scaling
- Create AMIs with WP pre-installed	Faster instance startup time
- Use IAM roles	Secure access to snapshots, logs, or S3
- Offload static content to S3 + CloudFront	Reduce EC2 load and improve performance
- Add SSL (ACM + ALB)	Secure your website with HTTPS
- Add Auto Healing	Auto replace unhealthy EC2s in ASG
- Set alarms for disk space	Prevent out-of-disk failures

## Complete Setup instruction For Project

## Step 1 : Create IAM User
- Goto IAM service
- Click on user 
- Create username 
- Checkbox the Provide user access to the AWS Management Console
- select - I want to create an IAM user
- choose custom password and create your password
- uncheck this checkbox : (Users must create a new password at next sign-in)
- Click next and select attach policies directly (you can also create user group if needed)
- Attach these below policies
```
AmazonEC2FullAccess: 	Manage EC2, EBS, AMIs, Security Groups
AutoScalingFullAccess:	Create and manage Auto Scaling Groups
AmazonSNSFullAccess:	SNS topics for notifications
IAMReadOnlyAccess:	    View IAM roles and policies (optional)
CloudWatchFullAccess:	Create Alarms (optional)
```
- Click next and create user

## Step 2 : Create EC2 security group

- Open EC2 service and goto security group
- Click on create security group
- Give Security group name and Description of security group
- Leave VPC default
- Click on add inbound rule
- Add this two rules:
    1. HTTP, Port 80, source: IPv4 anywhere
    2. SSH, Port 22, source: IPv4 anywhere
- Click on create security group.

## Step 3 : Create EC2 Ubuntu instance

- Click on launch instance.
- Give instance name
- select Ubuntu as OS image
- Create key pair
- Select existing security group choose your security group whihc we create earlier
- Click on advanced details scroll down to user data and in textarea copy this script or create a file of this script and upload file

```
#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install Apache, PHP, and required extensions
sudo apt install -y apache2 php php-mysql libapache2-mod-php wget unzip

# Start and enable Apache
sudo systemctl enable apache2
sudo systemctl start apache2

# Download and extract WordPress
cd /var/www/html
sudo rm -rf /var/www/html/*
sudo wget https://wordpress.org/latest.zip
sudo unzip latest.zip
sudo cp -r wordpress/* .
sudo rm -rf wordpress latest.zip

# Set proper permissions
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html

# Restart Apache
sudo systemctl restart apache2

echo "✅ WordPress files are in place. Visit http://<your-ec2-public-ip> in your browser."
```
- If this method not working then launch the instance and manually create this script file and run this file
```
sudo su
nano script.sh
(copy above script and save it)
bash script.sh (run file).
```

## Step 4 : Attach an EBS volume
- Goto Elastic Block Store > volume
- Volume type : gp2
- Size : 8
- Availability zone is same as the instance availability zone
- Click on create volume
- Now select volume and click on action > attach
- Select your instance and device name
- Click attach volume.
- SSH into EC2 instance 
NOTE: As per your Operating system google it that how to ssh aws ec2 instance (your os).
- After SSH into your instance 
```
lsblk                 # Find EBS volume (e.g., xvdf)
(showed in last row)
sudo mkfs -t ext4 /dev/xvdf (/dev/xvdf this is the device name which you select while creating volume. So select that device)
sudo mkdir /data
sudo mount /dev/xvdf /data
```

## Step 5 : Create IAM role and attach to EC2 instance 

- Select IAM sercvice and click on role, click on create role
- Trusted entity : AWS services
- Service or use case : EC2 > click next
- Attach policies which are give above, click next
- Give role name and add description about role
- Click on create role
- Now Goto EC2 services, select instance and click on action
- Select Modify IAM role
- Attach role which we create before

## Step 6 : Create AMI (Image) of EC2 instance

- Click on action > Image and templetes > Create image

## Step 7 : Create Launch Templete 

- Go to EC2 > Launch Templates > Create Template
- Use AMI created in Step 5
- Instance Type: t2.micro
- Key pair: which use in instance when we create
- IAM Role: which we created
- User Data: (Same as earlier, or leave blank if AMI already has it)

## Step 8 : Create Target Group

- Go to EC2 > Target Groups > Create
- Target type: Instance
- Protocol: HTTP, Port: 80
- VPC: default
- Health check path: /

## Step 9: Create Application Load Balancer

- Go to EC2 > Load Balancers > Create
- Type: Application Load Balancer
- Name: give name to load balancer
- Scheme: Internet-facing
- Listeners: HTTP (80)
- Availability Zones: choose minimum 2 availability zone as same as target group availability zone and instance availability zone
- Security Group: select your security group which we created before
- Listner and routing: protocol - HTTP, 80 
- Target Group: Attach the target group which we created

## Step 10 : Create Auto Scaling Group

- Go to EC2 > Auto Scaling > Create Auto Scaling Group
- Give name to auto scaling group
- Use Launch Template which we created 
- Network: default VPC and select two availability zone which we choose in load balancer
- Attach ALB (Application Load Balancer)
- Scaling policies:
- Desired: 1, Min: 1, Max: 2
- Use target tracking scaling (e.g., target 60% CPU)

## Step 10: Setup CloudWatch Monitoring

- Create Alarms:
- CPU > 80%: Scale out
- CPU < 30%: Scale in


## Authors

- [@parthGohel](https://github.com/GhlParth)

