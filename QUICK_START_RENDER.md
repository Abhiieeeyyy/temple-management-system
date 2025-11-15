# 🚀 Quick Start - Deploy to Render in 15 Minutes

## 📋 What You Need

1. GitHub account
2. Render account (free)
3. MongoDB Atlas account (free)
4. Your project files (already have ✓)

---

## 🎯 3 Simple Steps

### STEP 1: Push to GitHub (5 minutes)

```bash
# In your project folder, run:
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/temple-management-system.git
git branch -M main
git push -u origin main
```

**Files uploaded:** Everything except node_modules, .env, logs (automatically excluded)

---

### STEP 2: Setup MongoDB Atlas (3 minutes)

1. Go to https://mongodb.com/cloud/atlas
2. Sign up → Create FREE cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string (save it!)
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/temple
   ```

---

### STEP 3: Deploy on Render (7 minutes)

#### A. Deploy Backend:

1. Go to https://render.com → Sign in with GitHub
2. Click "New +" → "Web Service"
3. Select your repo: `temple-management-system`
4. Configure:
   - **Name:** `temple-backend`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. Add Environment Variables:
   ```
   NODE_ENV = production
   PORT = 10000
   MONGODB_URI = [paste your MongoDB connection string]
   JWT_SECRET = [generate random string - see below]
   RAZORPAY_KEY_ID = rzp_test_RfxxUHvWj3pwrI
   RAZORPAY_KEY_SECRET = EQlRNs6V0N1vO4gNwkEecyJI
   ADMIN_CREATION_KEY = admin123
   ```

   **Generate JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

6. Click "Create Web Service"
7. **Copy your backend URL:** `https://temple-backend-xxxx.onrender.com`

#### B. Deploy Frontend:

1. Click "New +" → "Static Site"
2. Select same repo
3. Configure:
   - **Name:** `temple-frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL = [paste your backend URL from step A.7]
   VITE_RAZORPAY_KEY_ID = rzp_test_RfxxUHvWj3pwrI
   ```

5. Click "Create Static Site"
6. **Your site is live!** 🎉

---

## ✅ Test Your Site

1. Visit your frontend URL
2. Try registering a new user
3. Login
4. Browse poojas
5. Test booking (use test card: 4111 1111 1111 1111)

---

## 🔧 One More Thing - Update CORS

After frontend deploys, update `server/index.js`:

Find the CORS section and add your frontend URL:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://temple-frontend-xxxx.onrender.com',  // Add this!
  ],
  credentials: true
};
```

Commit and push:
```bash
git add .
git commit -m "Update CORS"
git push
```

Render will auto-redeploy! ✨

---

## 🎉 Done!

Your temple management system is now live on the internet!

**URLs:**
- Frontend: `https://temple-frontend-xxxx.onrender.com`
- Backend: `https://temple-backend-xxxx.onrender.com`

---

## 📝 Important Notes

- **Free tier:** Backend sleeps after 15 min inactivity (first load may be slow)
- **Test mode:** Razorpay is in test mode (use test cards)
- **Admin login:** Use credentials from your .env file

---

## 🆘 Having Issues?

See `DEPLOYMENT_GUIDE.md` for detailed troubleshooting!
