# 🚀 Render Deployment Guide

This guide will help you deploy the Temple Management System to Render.

## 📋 Prerequisites

1. A Render account (sign up at [render.com](https://render.com))
2. MongoDB Atlas account with a database cluster
3. Razorpay account (for payments)

## 🔧 Step-by-Step Deployment

### 1. Backend Deployment

1. **Create a New Web Service**
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Select the repository

2. **Configure Backend Service**
   - **Name**: `temple-backend`
   - **Environment**: `Node`
   - **Region**: `Oregon` (or your preferred region)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `server` if you want)
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`

3. **Set Environment Variables** (in Render Dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-random-secret-key>
   RAZORPAY_KEY_ID=<your-razorpay-key-id>
   RAZORPAY_KEY_SECRET=<your-razorpay-secret>
   ADMIN_CREATION_KEY=<any-secret-key-for-admin-creation>
   FRONTEND_URL=<will-be-set-after-frontend-deployment>
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - **Copy the service URL** (e.g., `https://temple-backend-xxxxx.onrender.com`)

### 2. Frontend Deployment

1. **Create a New Static Site**
   - Go to Render Dashboard → New → Static Site
   - Connect your GitHub repository

2. **Configure Frontend Service**
   - **Name**: `temple-frontend`
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Set Environment Variables**:
   ```
   VITE_API_URL=https://temple-backend-xxxxx.onrender.com
   VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
   ```
   ⚠️ **Important**: Replace `xxxxx` with your actual backend service name/ID

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete
   - **Copy the frontend URL** (e.g., `https://temple-frontend-xxxxx.onrender.com`)

### 3. Update Backend CORS

1. Go back to your **Backend Service** settings
2. Update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://temple-frontend-xxxxx.onrender.com
   ```
3. **Redeploy** the backend service

### 4. Initialize Admin User

After both services are deployed:

1. **Option A: Using the API endpoint** (if ADMIN_CREATION_KEY is set):
   ```
   GET https://temple-backend-xxxxx.onrender.com/api/auth/init-admin?adminKey=<your-admin-creation-key>
   ```

2. **Option B: Using the script locally**:
   ```bash
   cd server
   node scripts/updateAdmin.js
   ```
   (Make sure your `.env` file has the correct MONGODB_URI)

3. **Default Admin Credentials** (after initialization):
   - Email: `srikainariayyappatemple@gmail.com`
   - Password: `Skat@666`

## 🔍 Troubleshooting

### Admin Panel Not Accessible

1. **Check if admin user exists**:
   - Try logging in with the default credentials
   - If it fails, initialize the admin user (see step 4 above)

2. **Check CORS errors**:
   - Open browser console (F12)
   - Look for CORS errors
   - Make sure `FRONTEND_URL` in backend matches your frontend URL

3. **Check API connectivity**:
   - Visit: `https://temple-backend-xxxxx.onrender.com/api/health`
   - Should return: `{"status":"ok","message":"Server is running"}`

4. **Check environment variables**:
   - Verify `VITE_API_URL` in frontend matches backend URL
   - Verify all required backend env vars are set

### Backend Not Starting

1. **Check logs** in Render Dashboard
2. **Verify MongoDB connection**:
   - Check if `MONGODB_URI` is correct
   - Make sure MongoDB Atlas allows connections from Render IPs (0.0.0.0/0)

3. **Check PORT**:
   - Render uses port 10000 by default
   - Make sure `PORT=10000` is set in environment variables

### Frontend Build Fails

1. **Check build logs** in Render Dashboard
2. **Verify Node version**: Render uses Node 18+ by default
3. **Check for missing dependencies** in `package.json`

### API Requests Failing

1. **Check browser console** for errors
2. **Verify `VITE_API_URL`** is set correctly
3. **Check CORS settings** in backend
4. **Verify backend is running** (check Render dashboard)

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Backend services sleep after 15 minutes of inactivity
   - First request after sleep may take 30-60 seconds
   - Consider upgrading for production use

2. **Environment Variables**:
   - Never commit `.env` files to Git
   - Always set sensitive variables in Render Dashboard
   - `VITE_*` variables are embedded in the build (not secret)

3. **Database**:
   - Use MongoDB Atlas (free tier available)
   - Make sure to whitelist Render IPs (or use 0.0.0.0/0 for development)

4. **Custom Domain** (Optional):
   - You can add custom domains in Render Dashboard
   - Update CORS and environment variables accordingly

## 🔐 Security Checklist

- [ ] `JWT_SECRET` is a strong random string
- [ ] `ADMIN_CREATION_KEY` is set and secure
- [ ] MongoDB Atlas has IP whitelist configured
- [ ] Razorpay keys are from production (not test mode) for live site
- [ ] Admin password is changed from default
- [ ] CORS is properly configured

## 📞 Support

If you encounter issues:
1. Check Render service logs
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas is accessible

## 🎉 Success!

Once deployed, you should be able to:
- Access your frontend at: `https://temple-frontend-xxxxx.onrender.com`
- Access admin panel at: `https://temple-frontend-xxxxx.onrender.com/admin`
- API endpoints at: `https://temple-backend-xxxxx.onrender.com/api/*`

