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
sudo cp $INSTALL_DIR/smfinance-ui.service /etc/nginx/sites-available/html

# Test the Nginx configuration
sudo nginx -t

# Create a symbolic link to enable the HTML configuration
sudo ln -s /etc/nginx/sites-available/html /etc/nginx/sites-enabled/

sudo mkdir -p /etc/smfinance-ui
sudo chown ${USER}:${USER} /etc/smfinance-ui/index.html
sudo chown ${USER}:${USER} /etc/smfinance-ui/

sudo bash -c 'cat > /etc/smfinance-ui/index.html <<EOF
<!DOCTYPE html>
<html>
    <head>
        <title>SMfinance</title>
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
