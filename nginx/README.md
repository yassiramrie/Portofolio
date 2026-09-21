# HTTPS setup notes

1. Point the domain to the EC2 instance public IP.
2. Install Certbot on the EC2 machine:

   sudo apt-get update
   sudo apt-get install -y certbot
   sudo apt-get install -y python3-certbot-nginx

3. Obtain a certificate:

   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

4. Make sure the certificate directory is mounted into the nginx container via Docker Compose.

5. Restart the stack:

   docker compose up -d --force-recreate --build
