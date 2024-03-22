#!/bin/bash

sudo mkdir $SMFINANCE_BE_DIR/logs && sudo chown ${USER}:${USER} $SMFINANCE_BE_DIR/logs
sudo cp $INSTALL_DIR/logback.xml $SMFINANCE_BE_DIR
