#!/usr/bin/env bash
set -euo pipefail

echo "[setup] Updating system packages..."
sudo apt-get update

echo "[setup] Installing base tools..."
sudo apt-get install -y ca-certificates curl git gnupg lsb-release

echo "[setup] Installing Docker repo key..."
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

OS_NAME="$(. /etc/os-release && echo "$VERSION_CODENAME")"
ARCH="$(dpkg --print-architecture)"

printf 'deb [arch=%s signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu %s stable\n' "$ARCH" "$OS_NAME" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "[setup] Installing Docker..."
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl enable --now docker
sudo usermod -aG docker ubuntu

echo "[setup] Docker installed. Please log out and log back in, then run:"
echo "  git clone https://github.com/yassiramrie/Portofolio.git ~/portfolio"
echo "  cd ~/portfolio"
echo "  cp .env.example .env"
echo "  docker compose up -d --build"
