#!/bin/bash

# Deploy script for API server
echo "Starting deployment..."

# Install Node.js and npm if not installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install NFS client for mounting
sudo apt-get update
sudo apt-get install -y nfs-common

# Create required directories
sudo mkdir -p /var/logs /var/docs

# Mount NFS shares from document server
echo "Mounting NFS shares..."
sudo mount -t nfs docs.alias.ikt-fag.no:/var/docs /var/docs
sudo mount -t nfs docs.alias.ikt-fag.no:/var/logs /var/logs

# Add to fstab for permanent mounting
echo "docs.alias.ikt-fag.no:/var/docs /var/docs nfs defaults 0 0" | sudo tee -a /etc/fstab
echo "docs.alias.ikt-fag.no:/var/logs /var/logs nfs defaults 0 0" | sudo tee -a /etc/fstab

# Install dependencies
npm install --production

# Set environment variables
export NODE_ENV=production
export MONGODB_URI="mongodb://mongodb.alias.ikt-fag.no:27017/hjemmetentamen"
export PORT=80

# Start the application
echo "Starting application..."
sudo node app.js