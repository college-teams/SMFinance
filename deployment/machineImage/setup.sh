#!/bin/bash

sudo bash -c "cat > /etc/abicoirr-api/environment.properties <<EOF
    ENVIRONMENT=prod
EOF"

# Check if the DEPLOYMENT_ENV_NAME variable is set
# if [ -z "$DEPLOYMENT_ENV_NAME" ]; then
#     echo "Error: DEPLOYMENT_ENV_NAME is not set."
#     exit 1
# fi

# sudo bash -c "cat > /etc/abicoirr-api/environment.properties <<EOF
#     ENVIRONMENT=$DEPLOYMENT_ENV_NAME
# EOF"
