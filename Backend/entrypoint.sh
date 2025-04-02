#!/bin/bash
set -e

# Azure Login
az login --service-principal -u "$CLIENT_ID" -p "$CLIENT_SECRET" --tenant "$TENANT_ID"

# Start the Flask server
exec python server.py