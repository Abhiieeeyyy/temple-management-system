# 📝 Quick Commands Reference

## Git Commands (Push to GitHub)

```bash
# Initialize Git repository
git init

# Check what files will be uploaded
git status

# Add all files (respects .gitignore)
git add .

# Commit with message
git commit -m "Initial commit - Temple Management System"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/temple-management-system.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Generate Secrets

```bash
# Generate JWT Secret (64 characters)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate Admin Key (32 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Local Development Commands

```bash
# Install dependencies (root)
npm install

# Install dependencies (server)
cd server
npm install
cd ..

# Start backend only
npm run server

# Start frontend only
npm start

# Start both (development)
npm run dev

# Build for production
npm run build

# Create admin user
npm run create-admin
```

---

## Verify Before Deployment

```bash
# Check if .env is ignored (should NOT appear in git status)
git status | grep .env

# Check project size (should be < 10 MB without node_modules)
# Windows:
dir /s

# Count files to upload
git ls-files | wc -l
```

---

## After Deployment - Update Code

```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push

# Render will automatically redeploy!
```

---

## Troubleshooting Commands

```bash
# Check Git remote
git remote -v

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard HEAD

# View ignored files
git status --ignored
```

---

## MongoDB Connection String Format

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

Example:
```
mongodb+srv://templeuser:mypassword123@cluster0.abc123.mongodb.net/temple?retryWrites=true&w=majority
```

---

## Environment Variables Template

### Backend (.env in Render):
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/temple
JWT_SECRET=your-64-char-secret-here
RAZORPAY_KEY_ID=rzp_test_RfxxUHvWj3pwrI
RAZORPAY_KEY_SECRET=EQlRNs6V0N1vO4gNwkEecyJI
ADMIN_CREATION_KEY=your-admin-key-here
```

### Frontend (.env in Render):
```
VITE_API_URL=https://your-backend.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_test_RfxxUHvWj3pwrI
```

---

## Test Payment Details (Razorpay Test Mode)

```
Card Number: 4111 1111 1111 1111
Expiry: 12/25 (any future date)
CVV: 123 (any 3 digits)
Name: Test User
```

---

## Useful URLs

- **GitHub:** https://github.com
- **Render:** https://render.com
- **MongoDB Atlas:** https://mongodb.com/cloud/atlas
- **Razorpay Dashboard:** https://dashboard.razorpay.com

---

## Quick Checks

### Is my .gitignore working?
```bash
git status
# Should NOT see: node_modules/, .env, dist/, logs/
```

### What files will be uploaded?
```bash
git ls-files
# Shows all files that will go to GitHub
```

### Is my backend running locally?
```bash
# Visit: http://localhost:5011
# Should see: "Temple API is running"
```

### Is my frontend running locally?
```bash
# Visit: http://localhost:5173
# Should see: Temple homepage
```

---

## Common Git Issues

### Already have a Git repo?
```bash
# Remove existing Git
rm -rf .git

# Start fresh
git init
```

### Wrong remote URL?
```bash
# Remove old remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR_USERNAME/temple-management-system.git
```

### Accidentally committed .env?
```bash
# Remove from Git (keeps local file)
git rm --cached .env
git rm --cached server/.env

# Commit the removal
git commit -m "Remove .env files"
git push
```

---

## File Size Check

Your repo should be approximately:
- **Files:** 50-100 files
- **Size:** 5-10 MB (without node_modules)

If larger, you might be including node_modules!

---

## Need Help?

1. Check: `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Check: `QUICK_START_RENDER.md` for quick start
3. Check: `DEPLOYMENT_ARCHITECTURE.txt` for visual guide
