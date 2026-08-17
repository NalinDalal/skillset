---
name: deployments
description: "Analyze any repository structure (monorepo, separate frontend/backend, full-stack, static site) and provide clean step-by-step deployment instructions for AWS EC2, VPS, or virtual machines. Guides through the complete E2E process from launching instances to SSL setup, with exact commands, verification steps, and troubleshooting. Use when user wants to deploy a repo to production, asks about AWS/cloud deployment, or needs hosting guidance. Covers all architectures: Node.js, Python, Docker, static sites, databases, and provides adapted instructions based on detected tech stack."
---


# Repo Deployment Guide Skill
 
## Purpose
Analyze any repository structure and provide clean, step-by-step deployment instructions for AWS EC2, VPS, or any virtual machine. Guide users through the entire E2E process with zero assumptions.
 
## When to trigger
- User wants to deploy a repo to AWS/EC2/VPS/cloud VM
- User asks "how do I deploy this"
- User mentions setting up production environment
- User uploads/clones a repo and wants hosting guidance
- User asks about deployment architecture, setup, or infrastructure
 
## What this skill does
 
### Phase 1: Repository Analysis
1. **Identify architecture type**
   - Monorepo (single repo, multiple projects)
   - Separate repos (frontend + backend in different repos)
   - Full-stack single project
   - Static site
   - Backend-only API
   - Microservices
 
2. **Detect tech stack**
   - Frontend: React, Vue, Angular, Svelte, Next.js, plain HTML/CSS/JS
   - Backend: Node.js/Express, Python/Django/Flask, Go, Rust, Java/Spring
   - Database: PostgreSQL, MySQL, MongoDB, Redis
   - Build tools: Vite, Webpack, Turbo, npm scripts
   - Package managers: npm, yarn, pnpm, pip, cargo
 
3. **Find critical files**
   - package.json, requirements.txt, Cargo.toml, go.mod
   - Dockerfiles, docker-compose.yml
   - .env.example, config files
   - Build scripts, start commands
   - Database migration files
 
### Phase 2: Deployment Strategy
Based on analysis, determine:
- Single server or multi-server setup
- Reverse proxy needs (Nginx/Caddy)
- Process management (PM2, systemd)
- Build vs runtime separation
- Environment variables required
- Port configuration
- SSL/HTTPS setup
 
### Phase 3: Step-by-Step Instructions
 
Provide in this exact format:
 
```
## Deployment Plan for [Project Name]
 
**Architecture Detected:** [e.g., "Monorepo with Next.js frontend + Express backend"]
**Recommended Setup:** [e.g., "Single EC2 t3.small, Nginx reverse proxy, PM2 process manager"]
 
---
 
### Prerequisites Checklist
- [ ] AWS account with billing enabled
- [ ] Domain name (optional but recommended)
- [ ] SSH key pair generated locally
- [ ] Git installed locally
 
---
 
### Step 1: Launch EC2 Instance
**What:** Create the virtual machine
**How:**
1. Go to AWS Console → EC2 → Launch Instance
2. Choose Ubuntu 22.04 LTS (free tier eligible)
3. Instance type: t3.small (2GB RAM minimum for this stack)
4. Key pair: Create new → Download .pem file → Save as `myproject.pem`
5. Security group: Allow SSH (22), HTTP (80), HTTPS (443), Custom TCP ([ports needed])
6. Storage: 20GB GP3
7. Click Launch
 
**Take care:**
- Save your .pem file immediately - you can't download it again
- chmod 400 myproject.pem after download
- Note your instance's public IP from the console
 
---
 
### Step 2: Connect to Server
**What:** SSH into your new instance
**How:**
```bash
chmod 400 myproject.pem
ssh -i myproject.pem ubuntu@YOUR_INSTANCE_IP
```
 
**Take care:**
- Replace YOUR_INSTANCE_IP with actual IP from console
- First connection asks to verify fingerprint - type "yes"
 
---
 
### Step 3: Install System Dependencies
**What:** Set up Node.js, Nginx, database
**How:**
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
 
**Take care:**
- Each command should complete without errors
- Check versions: `node -v`, `nginx -v`, `psql --version`
 
---
 
### Step 4: Clone Repository
**What:** Get your code on the server
**How:**
```bash
cd /home/ubuntu
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```
 
**Take care:**
- If private repo, set up GitHub SSH key or use personal access token
- Verify all files cloned: `ls -la`
 
---
 
### Step 5: Configure Environment Variables
**What:** Set up .env files
**How:**
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
 
**Frontend (if separate):**
```bash
cd /home/ubuntu/yourrepo/frontend
cp .env.example .env
nano .env
```
 
```
VITE_API_URL=http://YOUR_INSTANCE_IP:5000
```
 
**Take care:**
- Generate secure secrets: `openssl rand -base64 32`
- Never commit .env files
- Save and exit nano: Ctrl+X, Y, Enter
 
---
 
### Step 6: Set Up Database
**What:** Create database and run migrations
**How:**
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
 
**Take care:**
- Use the same credentials in .env
- Check migration success before continuing
 
---
 
### Step 7: Build Frontend
**What:** Compile production assets
**How:**
```bash
cd /home/ubuntu/yourrepo/frontend
npm install
npm run build
```
 
**Take care:**
- Build creates `dist/` or `build/` folder
- Check for errors in build output
- Note the output folder name
 
---
 
### Step 8: Start Backend with PM2
**What:** Run backend as persistent process
**How:**
```bash
cd /home/claude/yourrepo/backend
npm install
pm2 start npm --name "backend" -- start
pm2 save
pm2 startup
```
 
Run the command PM2 outputs (starts with sudo)
 
**Take care:**
- `pm2 status` should show backend running
- `pm2 logs backend` to check for errors
- PM2 will auto-restart on crashes and server reboots
 
---
 
### Step 9: Configure Nginx
**What:** Set up reverse proxy and serve frontend
**How:**
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
 
**Take care:**
- Replace YOUR_DOMAIN_OR_IP with actual value
- Adjust `/api` path if your backend uses different routes
- `nginx -t` must show "syntax is ok"
 
---
 
### Step 10: Configure Firewall
**What:** Lock down security
**How:**
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```
 
**Take care:**
- Allow OpenSSH BEFORE enabling firewall or you'll lock yourself out
- Type 'y' when prompted
 
---
 
### Step 11: Test Deployment
**What:** Verify everything works
**How:**
1. Visit http://YOUR_INSTANCE_IP in browser
2. Frontend should load
3. Test API calls through frontend
4. Check PM2 logs: `pm2 logs backend`
5. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
 
**Take care:**
- If frontend doesn't load, check Nginx config
- If API fails, check backend logs and .env
- Browser console shows frontend errors
 
---
 
### Step 12: SSL Setup (Optional but Recommended)
**What:** Enable HTTPS with Let's Encrypt
**How:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```
 
Follow prompts, choose redirect HTTP to HTTPS
 
**Take care:**
- Need a domain name pointing to your IP
- Certificates auto-renew every 90 days
- Test auto-renewal: `sudo certbot renew --dry-run`
 
---
 
## Maintenance Commands
 
**View logs:**
```bash
pm2 logs backend
sudo tail -f /var/log/nginx/error.log
```
 
**Restart services:**
```bash
pm2 restart backend
sudo systemctl restart nginx
```
 
**Update code:**
```bash
cd /home/ubuntu/yourrepo
git pull
cd frontend && npm install && npm run build
cd ../backend && npm install
pm2 restart backend
```
 
**Monitor resources:**
```bash
pm2 monit
htop
df -h  # disk space
```
 
---
 
## Troubleshooting
 
**Site not loading:**
- Check firewall: `sudo ufw status`
- Check Nginx: `sudo systemctl status nginx`
- Check PM2: `pm2 status`
 
**API 502 errors:**
- Backend not running: `pm2 restart backend`
- Wrong port in Nginx config
- Check backend logs: `pm2 logs backend`
 
**Database connection fails:**
- Check PostgreSQL running: `sudo systemctl status postgresql`
- Verify .env DATABASE_URL matches database setup
- Check user permissions in database
 
**Out of memory:**
- Upgrade instance type
- Add swap space
- Optimize build process
 
---
 
## Cost Estimate
- t3.small EC2: ~$15/month
- Domain (optional): ~$12/year
- Total: ~$15-20/month
 
```
 
### Phase 4: Adaptation Rules
 
**For different architectures:**
 
1. **Monorepo with shared code:**
   - Install at root level
   - Build workspace packages first
   - Separate PM2 processes for each service
 
2. **Microservices:**
   - Multiple PM2 processes
   - Nginx routing to different ports
   - Consider Docker Compose alternative
 
3. **Static site only:**
   - Skip PM2, database
   - Nginx serves files directly
   - Much simpler, cheaper (t3.micro)
 
4. **Docker-based:**
   - Install Docker instead of Node
   - Use docker-compose
   - Nginx optional (can use Docker ports)
 
5. **Python backend:**
   - Use gunicorn instead of PM2
   - systemd service file
   - Install pip requirements
 
**For different databases:**
- MongoDB: Install MongoDB server, adjust connection string
- MySQL: Install mysql-server, use mysql commands
- Redis: Install redis-server for caching
 
**For different clouds:**
- DigitalOean: "Droplet" instead of EC2, otherwise identical
- Linode: "Linode" instead of EC2, same process
- Vultr: Same Ubuntu setup process
 
## Output format rules
 
1. **Always start with architecture detection** - tell user what you found
2. **Number every step** - make it scannable
3. **Three sections per step:**
   - **What:** One sentence goal
   - **How:** Exact commands or clicks
   - **Take care:** Gotchas, verification, what could go wrong
 
4. **Use actual values when possible, placeholders when not:**
   - ✅ `PORT=5000` (actual port from package.json)
   - ✅ `YOUR_INSTANCE_IP` (unknown until they create it)
 
5. **Include verification commands** after critical steps
 
6. **Give copy-pasteable code blocks** - no "fill this in" without showing structure
 
7. **End with maintenance + troubleshooting** - they'll need it later
 
## Critical principles
 
- **Never assume knowledge** - explain what EC2 is, what PM2 does, why Nginx
- **One step = one concept** - don't combine "install dependencies and configure database"
- **Show the actual command** - not "run the migration script" but `npm run migrate`
- **Explain why** - "PM2 for process management (auto-restart on crash)"
- **Checkpoints** - "Before continuing, verify X shows Y"
- **Alternative paths** - "If using Docker instead, see Step X"
 
## Quality checks before output
 
- [ ] Can a beginner follow this without prior AWS knowledge?
- [ ] Are all ports/URLs/paths specific to this repo?
- [ ] Did I explain what each tool does?
- [ ] Are there verification steps after critical changes?
- [ ] Did I cover what to do when things break?
- [ ] Is the security group configuration complete?
- [ ] Are environment variables all documented?
 
## Example adaptation
 
For a Next.js app (frontend + API routes):
- Skip separate backend setup
- PM2 runs `next start` only
- Nginx proxies everything to Node
- Simpler architecture explanation
 
For Django + React:
- Python/pip instead of Node for backend
- Gunicorn + systemd instead of PM2
- Static file collection step
- PostgreSQL setup same
 
The skill should feel like pair programming with someone who's done this 100 times and remembers all the gotchas.