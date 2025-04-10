#!/bin/bash
echo "Logging into Azure..."
az login --service-principal -u "$CLIENT_ID" -p "$CLIENT_SECRET" --tenant "$TENANT_ID"
python server.py
echo "Starting app..."
exec "$@"