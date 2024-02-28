#!/bin/bash

# Install Nginx
sudo yum install -y nginx

# Check Nginx configuration
sudo nginx -t

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

sudo su;

# Create directories for Nginx configuration (if necessary)
sudo mkdir -p /etc/nginx/sites-available/
sudo mkdir -p /etc/nginx/sites-enabled/

sudo cp $INSTALL_DIR/nginx.conf  /etc/nginx/nginx.conf

sudo chmod 755 -R /etc/nginx/sites-available/

sudo touch  /etc/nginx/sites-available/html

# Create or edit the Nginx server block configuration
sudo cp $INSTALL_DIR/abicoirr-ui.service /etc/nginx/sites-available/html

# Test the Nginx configuration
sudo nginx -t

# Create a symbolic link to enable the HTML configuration
sudo ln -s /etc/nginx/sites-available/html /etc/nginx/sites-enabled/

sudo mkdir -p /etc/abicoirr-ui
sudo chown ${USER}:${USER} /etc/abicoirr-ui/index.html
sudo chown ${USER}:${USER} /etc/abicoirr-ui/

sudo bash -c 'cat > /etc/abicoirr-ui/index.html <<EOF
<!DOCTYPE html>
<html>
    <head>
        <title>Abicoirr</title>
    </head>
    <body>
        <h1>Site Under Maintenance</h1>
        <p>We are sorry, but our website is currently undergoing maintenance. We will be back soon!</p>
    </body>
</html>
EOF';


# Test the Nginx configuration again
sudo nginx -t

# Restart Nginx to apply the changes
sudo systemctl restart nginx

sudo systemctl status nginx;
