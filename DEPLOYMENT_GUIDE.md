# 🚀 Deployment Guide - Render Hosting

## 📦 Files to Upload to GitHub

### ✅ INCLUDE These Files:
```
✓ server/                    (entire folder)
  ✓ middleware/
  ✓ models/
  ✓ routes/
  ✓ scripts/
  ✓ utils/
  ✓ index.js
  ✓ package.json
  ✓ package-lock.json
  ✓ .env.example            (template only)

✓ src/                       (entire folder)
  ✓ assets/
  ✓ components/
  ✓ contexts/
  ✓ pages/
  ✓ styles/
  ✓ utils/
  ✓ App.jsx
  ✓ main.jsx
  ✓ index.css
  ✓ App.css
  ✓ routes.jsx

✓ public/                    (entire folder)
  ✓ images/
  ✓ index.html

✓ Root files:
  ✓ package.json
  ✓ package-lock.json
  ✓ vite.config.js
  ✓ eslint.config.js
  ✓ index.html
  ✓ .gitignore
  ✓ README.md
  ✓ LICENSE
  ✓ render.yaml             (NEW - for Render deployment)
```

### ❌ DO NOT INCLUDE (Already in .gitignore):
```
✗ node_modules/             (both root and server/)
✗ .env                      (contains secrets!)
✗ server/.env               (contains secrets!)
✗ dist/                     (build output)
✗ build/                    (build output)
✗ logs/                     (log files)
✗ .vscode/                  (IDE settings)
```

---

## 📝 Step-by-Step Deployment Process

### Step 1: Prepare Your Code for GitHub

1. **Verify .gitignore is correct** (already done ✓)

2. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Temple Management System"
```

3. **Create GitHub Repository**:
   - Go to https://github.com
   - Click "New Repository"
   - Name: `temple-management-system`
   - Description: "Temple Management System with Pooja Booking & Donations"
   - Keep it Public or Private (your choice)
   - DON'T initialize with README (you already have one)
   - Click "Create Repository"

4. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/temple-management-system.git
git branch -M main
git push -u origin main
```

---

### Step 2: Set Up MongoDB Atlas (Free Database)

1. **Create MongoDB Atlas Account**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new cluster (Free M0 tier)

2. **Configure Database**:
   - Click "Connect" on your cluster
   - Add your IP address (or allow access from anywhere: `0.0.0.0/0`)
   - Create database user with username and password
   - Copy the connection string (looks like):
     ```
     mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/temple?retryWrites=true&w=majority
     ```

3. **Save this connection string** - you'll need it for Render!

---

### Step 3: Deploy Backend on Render

1. **Go to Render Dashboard**:
   - Visit https://render.com
   - Sign up / Log in with GitHub

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `temple-management-system`

3. **Configure Backend Service**:
   ```
   Name: temple-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV = production
   PORT = 10000
   MONGODB_URI = [Your MongoDB Atlas connection string]
   JWT_SECRET = [Generate a random 64-character string]
   RAZORPAY_KEY_ID = rzp_test_RfxxUHvWj3pwrI
   RAZORPAY_KEY_SECRET = EQlRNs6V0N1vO4gNwkEecyJI
   ADMIN_CREATION_KEY = [Your secure admin key]
   ```

   **To generate JWT_SECRET**, run in terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://temple-backend.onrender.com`

---

### Step 4: Deploy Frontend on Render

1. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Select same GitHub repository

2. **Configure Frontend Service**:
   ```
   Name: temple-frontend
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Add Environment Variables**:
   ```
   VITE_API_URL = https://temple-backend.onrender.com
   VITE_RAZORPAY_KEY_ID = rzp_test_RfxxUHvWj3pwrI
   ```
   
   **IMPORTANT**: Replace `https://temple-backend.onrender.com` with YOUR actual backend URL from Step 3!

4. **Deploy**:
   - Click "Create Static Site"
   - Wait for deployment (3-5 minutes)
   - Your site will be live at: `https://temple-frontend.onrender.com`

---

### Step 5: Update Backend CORS Settings

After frontend is deployed, you need to update CORS to allow your frontend domain.

1. **Update server/index.js** (or wherever CORS is configured):
   
   Find the CORS configuration and update it:
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:5173',
       'http://localhost:3000',
       'https://temple-frontend.onrender.com',  // Add your frontend URL
       'https://your-custom-domain.com'         // If you have custom domain
     ],
     credentials: true
   };
   
   app.use(cors(corsOptions));
   ```

2. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push
   ```

3. Render will automatically redeploy your backend!

---

### Step 6: Initialize Database (One-time)

1. **Create Admin User**:
   - Go to your backend Render dashboard
   - Click "Shell" tab
   - Run:
     ```bash
     npm run create-admin
     ```

2. **Verify deployment**:
   - Visit your frontend URL
   - Try logging in with admin credentials
   - Test pooja booking and donations

---

## 🔧 Important Configuration Updates

### Update API URL in Frontend (if needed)

If you're not using environment variables properly, update these files:

**src/utils/api.js** or wherever axios is configured:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://temple-backend.onrender.com';
```

---

## 🎯 Post-Deployment Checklist

- [ ] Backend is running (check Render logs)
- [ ] Frontend is accessible
- [ ] MongoDB connection is working
- [ ] Can register new user
- [ ] Can login
- [ ] Can book pooja
- [ ] Payment gateway works (test mode)
- [ ] Admin panel accessible
- [ ] CORS is configured correctly

---

## 🐛 Troubleshooting

### Backend Issues:

**"Application failed to respond"**
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure PORT is set to 10000

**"CORS Error"**
- Add frontend URL to CORS whitelist
- Redeploy backend after changes

### Frontend Issues:

**"Network Error" or "Failed to fetch"**
- Verify VITE_API_URL is correct
- Check if backend is running
- Open browser console for errors

**Build fails**
- Check build logs on Render
- Verify all dependencies in package.json
- Try building locally: `npm run build`

### Database Issues:

**"MongoServerError: Authentication failed"**
- Check MongoDB Atlas username/password
- Verify connection string format
- Ensure IP whitelist includes 0.0.0.0/0

---

## 💰 Cost Breakdown

**Render Free Tier:**
- Backend: Free (spins down after 15 min inactivity)
- Frontend: Free
- Limitations: 
  - 750 hours/month
  - Slower cold starts
  - Limited bandwidth

**MongoDB Atlas:**
- Free M0 tier: 512 MB storage
- Perfect for small to medium projects

**Total Cost: $0/month** 🎉

---

## 🚀 Upgrade Options (Future)

When you need better performance:

1. **Render Paid Plans** ($7-25/month):
   - No cold starts
   - More resources
   - Custom domains

2. **MongoDB Atlas Paid** ($9+/month):
   - More storage
   - Better performance
   - Automated backups

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- GitHub Issues: Create issue in your repo

---

**Good luck with your deployment! 🎉**
