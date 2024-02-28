#!/bin/bash

sudo mkdir -p  $ABICOIRR_BE_DIR
sudo chown ${USER}:${USER}  $ABICOIRR_BE_DIR

echo $INSTALL_DIR
echo $ABICOIRR_BE_DIR

cat $INSTALL_DIR/authorized_keys >> .ssh/authorized_keys

# sudo dnf -y install java-11-amazon-corretto

sudo yum install -y java-17-amazon-corretto
sudo yum install -y nano
sudo yum install -y vim

sudo cp $INSTALL_DIR/abicoirr-api.service  /etc/systemd/system/abicoirr-api.service
sudo systemctl enable abicoirr-api.service

sudo touch $ABICOIRR_BE_DIR/environment.properties
sudo chown ${USER}:${USER} $ABICOIRR_BE_DIR/environment.properties
