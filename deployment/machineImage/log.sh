#!/bin/bash

sudo mkdir $ABICOIRR_BE_DIR/logs && sudo chown ${USER}:${USER} $ABICOIRR_BE_DIR/logs
sudo cp $INSTALL_DIR/logback.xml $ABICOIRR_BE_DIR
