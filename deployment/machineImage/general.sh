#!/bin/bash

sudo mkdir -p  $SMFINANCE_BE_DIR
sudo chown ${USER}:${USER}  $SMFINANCE_BE_DIR

echo $INSTALL_DIR
echo $SMFINANCE_BE_DIR

cat $INSTALL_DIR/authorized_keys >> .ssh/authorized_keys

# sudo dnf -y install java-11-amazon-corretto

sudo yum install -y java-17-amazon-corretto
sudo yum install -y nano
sudo yum install -y vim

sudo cp $INSTALL_DIR/smfinance-api.service  /etc/systemd/system/smfinance-api.service
sudo systemctl enable smfinance-api.service

sudo touch $SMFINANCE_BE_DIR/environment.properties
sudo chown ${USER}:${USER} $SMFINANCE_BE_DIR/environment.properties
