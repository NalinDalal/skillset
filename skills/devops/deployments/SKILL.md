---
name: deployments
description: "Analyze any repository structure (monorepo, separate frontend/backend, full-stack, static site) and give clean step-by-step deployment instructions for AWS EC2, VPS, or virtual machines. Guides through the complete E2E process from launching instances to SSL setup, with exact commands, verification steps, and troubleshooting. Use when user wants to deploy a repo to production, asks about AWS/cloud deployment, or needs hosting guidance. Covers all architectures: Node.js, Python, Docker, static sites, databases, and adapts instructions to the detected tech stack."
---

# Deployments

## When to trigger

- User wants to deploy a repo to AWS/EC2/VPS/cloud VM
- User asks "how do I deploy this"
- User mentions setting up production environment
- User uploads/clones a repo and wants hosting guidance
- User asks about deployment architecture, setup, or infrastructure

## What this skill does

### Phase 1: Repository Analysis

1. Identify architecture type: monorepo, separate repos, full-stack single project, static site, backend-only API, or microservices.
2. Detect tech stack: frontend framework, backend runtime, database, build tools, package manager.
3. Find critical files: package.json, Dockerfiles, .env.example, build scripts, migration files.

### Phase 2: Deployment Strategy

Based on analysis, determine single vs multi-server setup, reverse proxy needs (Nginx/Caddy), process management (PM2/systemd), build vs runtime separation, environment variables, port configuration, and SSL/HTTPS setup.

### Phase 3: Step-by-Step Instructions

Give in this format. Each step has a one-sentence goal, exact commands, and gotchas.

```
## Deployment Plan for [Project Name]

Architecture detected: [e.g., "Monorepo with Next.js frontend + Express backend"]
Recommended setup: [e.g., "Single EC2 t3.small, Nginx reverse proxy, PM2"]

### Prerequisites Checklist
- [ ] AWS account with billing enabled
- [ ] Domain name (optional but recommended)
- [ ] SSH key pair generated locally
- [ ] Git installed locally

### Step 1: Launch EC2 Instance
Create the virtual machine.

1. Go to AWS Console, EC2, Launch Instance
2. Choose Ubuntu 22.04 LTS (free tier eligible)
3. Instance type: t3.small (2GB RAM minimum for this stack)
4. Key pair: Create new, download .pem file, save as `myproject.pem`
5. Security group: Allow SSH (22), HTTP (80), HTTPS (443), Custom TCP ([ports needed])
6. Storage: 20GB GP3
7. Click Launch

Save your .pem file immediately. You cannot download it again. Run `chmod 400 myproject.pem` after download. Note your instance's public IP from the console.

### Step 2: Connect to Server
SSH into your new instance.

```bash
chmod 400 myproject.pem
ssh -i myproject.pem ubuntu@YOUR_INSTANCE_IP
```

Replace YOUR_INSTANCE_IP with actual IP from console. First connection asks to verify fingerprint, type "yes".

### Step 3: Install System Dependencies
Set up Node.js, Nginx, database.

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install PostgreSQL (if needed)
sudo apt install -y postgresql postgresql-contrib

# Install PM2 globally
sudo npm install -g pm2
```

Each command should complete without errors. Check versions: `node -v`, `nginx -v`, `psql --version`.

### Step 4: Clone Repository
Get your code on the server.

```bash
cd /home/ubuntu
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

If private repo, set up GitHub SSH key or use personal access token. Verify all files cloned: `ls -la`.

### Step 5: Configure Environment Variables
Set up .env files.

```bash
# Backend
cd /home/ubuntu/yourrepo/backend
cp .env.example .env
nano .env
```

Edit these values:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PORT=5000
NODE_ENV=production
JWT_SECRET=[generate random string]
```

Frontend (if separate):
```bash
cd /home/ubuntu/yourrepo/frontend
cp .env.example .env
nano .env
```

```
VITE_API_URL=http://YOUR_INSTANCE_IP:5000
```

Generate secure secrets with `openssl rand -base64 32`. Never commit .env files. Save and exit nano: Ctrl+X, Y, Enter.

### Step 6: Set Up Database
Create database and run migrations.

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE yourdbname;
CREATE USER youruser WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE yourdbname TO youruser;
\q

# Run migrations (adjust for your project)
cd /home/ubuntu/yourrepo/backend
npm install
npm run migrate
```

Use the same credentials in .env. Check migration success before continuing.

### Step 7: Build Frontend
Compile production assets.

```bash
cd /home/ubuntu/yourrepo/frontend
npm install
npm run build
```

Build creates `dist/` or `build/` folder. Check for errors in build output. Note the output folder name.

### Step 8: Start Backend with PM2
Run backend as persistent process.

```bash
cd /home/ubuntu/yourrepo/backend
npm install
pm2 start npm --name "backend" -- start
pm2 save
pm2 startup
```

Run the command PM2 outputs (starts with sudo). `pm2 status` shows backend running. `pm2 logs backend` to check for errors. PM2 will auto-restart on crashes and server reboots.

### Step 9: Configure Nginx
Set up reverse proxy and serve frontend.

```bash
sudo nano /etc/nginx/sites-available/yourapp
```

Paste this config:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    # Frontend
    location / {
        root /home/ubuntu/yourrepo/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/yourapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Replace YOUR_DOMAIN_OR_IP with actual value. Adjust `/api` path if your backend uses different routes. `nginx -t` must show "syntax is ok".

### Step 10: Configure Firewall
Lock down security.

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

Allow OpenSSH BEFORE enabling firewall or you will lock yourself out. Type 'y' when prompted.

### Step 11: Test Deployment
Verify everything works.

1. Visit http://YOUR_INSTANCE_IP in browser
2. Frontend should load
3. Test API calls through frontend
4. Check PM2 logs: `pm2 logs backend`
5. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

If frontend doesn't load, check Nginx config. If API fails, check backend logs and .env. Browser console shows frontend errors.

### Step 12: SSL Setup
Enable HTTPS with Let's Encrypt.

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

Follow prompts, choose redirect HTTP to HTTPS. Need a domain name pointing to your IP. Certificates auto-renew every 90 days. Test auto-renewal: `sudo certbot renew --dry-run`.

## Maintenance Commands

View logs:
```bash
pm2 logs backend
sudo tail -f /var/log/nginx/error.log
```

Restart services:
```bash
pm2 restart backend
sudo systemctl restart nginx
```

Update code:
```bash
cd /home/ubuntu/yourrepo
git pull
cd frontend && npm install && npm run build
cd ../backend && npm install
pm2 restart backend
```

Monitor resources:
```bash
pm2 monit
htop
df -h  # disk space
```

## Troubleshooting

Site not loading: check firewall (`sudo ufw status`), Nginx (`sudo systemctl status nginx`), PM2 (`pm2 status`).

API 502 errors: backend not running (`pm2 restart backend`), wrong port in Nginx config, check backend logs (`pm2 logs backend`).

Database connection fails: check PostgreSQL running (`sudo systemctl status postgresql`), verify .env DATABASE_URL matches database setup, check user permissions.

Out of memory: upgrade instance type, add swap space, optimize build process.

## Cost Estimate

- t3.small EC2: ~$15/month
- Domain (optional): ~$12/year
- Total: ~$15-20/month

## Adaptation Rules

Monorepo with shared code: install at root level, build workspace packages first, separate PM2 processes for each service.

Microservices: multiple PM2 processes, Nginx routing to different ports, consider Docker Compose alternative.

Static site only: skip PM2 and database, Nginx serves files directly, cheaper (t3.micro).

Docker-based: install Docker instead of Node, use docker-compose, Nginx optional (can use Docker ports).

Python backend: use gunicorn instead of PM2, systemd service file, install pip requirements.

Different databases: MongoDB (install MongoDB server, adjust connection string), MySQL (install mysql-server, use mysql commands), Redis (install redis-server for caching).

Different clouds: DigitalOcean ("Droplet" instead of EC2, otherwise identical), Linode ("Linode" instead of EC2, same process), Vultr (same Ubuntu setup process).

## Output Format Rules

1. Always start with architecture detection.
2. Number every step.
3. One-sentence goal, exact commands, gotchas per step.
4. Use actual values when possible, placeholders when not.
5. Include verification commands after critical steps.
6. Give copy-pasteable code blocks.
7. End with maintenance and troubleshooting.

## Critical Principles

Never assume knowledge. Explain what EC2 is, what PM2 does, why Nginx. One step, one concept. Show the actual command, not "run the migration script." Explain why. Include checkpoints before continuing. Offer alternative paths for different stacks.

## Quality Checks Before Output

- [ ] Can a beginner follow this without prior AWS knowledge?
- [ ] Are all ports/URLs/paths specific to this repo?
- [ ] Did I explain what each tool does?
- [ ] Are there verification steps after critical changes?
- [ ] Did I cover what to do when things break?
- [ ] Is the security group configuration complete?
- [ ] Are environment variables all documented?

## Example Adaptations

Next.js app (frontend + API routes): skip separate backend setup, PM2 runs `next start` only, Nginx proxies everything to Node, simpler architecture.

Django + React: Python/pip instead of Node for backend, Gunicorn + systemd instead of PM2, static file collection step, PostgreSQL setup same.
