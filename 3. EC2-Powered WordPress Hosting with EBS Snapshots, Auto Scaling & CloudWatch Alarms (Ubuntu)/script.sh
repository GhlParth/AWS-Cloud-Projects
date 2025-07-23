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