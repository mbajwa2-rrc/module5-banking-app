#!/bin/bash

echo "Starting deployment..."

# Stop old containers (idempotent)
docker-compose down -v

# Build and start containers
docker-compose up --build -d

# Show running containers
docker ps

# Wait for services
sleep 5

# Test backend
curl http://localhost:5000 || echo "Backend not working"

# Test frontend
curl http://localhost:3000 || echo "Frontend not working"

# Show images
docker images

echo "Deployment finished!"