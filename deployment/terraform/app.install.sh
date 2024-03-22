#!/bin/bash

# Install and start httpd
sudo yum install -y httpd
sudo systemctl start httpd
sudo systemctl enable httpd

# Create custom HTML file
echo '<!DOCTYPE html><html><head><title>Welcome to My Website</title></head><body><h1>Welcome to My Website</h1></body></html>' | sudo tee /var/www/html/index.html
