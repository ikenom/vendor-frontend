#!/bin/sh
set -e

BACKEND_URL_NAME=$(printenv | awk -F "=" '{print $1}' | grep ".*SHOPIFY_SERVICE_PORT_80_TCP_ADDR.*")

export BACKEND_URL=$(eval "echo \"\$"$BACKEND_URL_NAME"\"") # => foo

# Then eval the container's main process (what's set as CMD in the Dockerfile).
eval "$@"
