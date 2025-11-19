# Payment & Deployment Complete Guide

## 1. Razorpay Payment Issues

### Current Configuration:
✅ **Frontend:** Test Key ID configured (`rzp_test_RfxxUHvWj3pwrI`)
✅ **Backend:** Test Key ID and Secret configured
⚠️ **Issue:** Payment might fail due to test mode restrictions

### Why Test Payments Might Fail:

1. **Test Cards Only:** In test mode, only specific test cards work
2. **No Real Money:** Test mode doesn't process real payments
3. **Limited Features:** Some features are disabled in test mode

### Test Card Details (Use These):

**For Successful Payment:**
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
Name: Any name
```

**For Failed Payment (Testing):**
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVV: Any 3 digits
```

### To Switch to Live Mode (Real Payments):

**Step 1: Get Live Credentials from Razorpay**
1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Complete KYC verification
3. Go to Settings → API Keys
4. Generate Live Keys (starts with `rzp_live_`)

**Step 2: Update Frontend (.env)**
```properties
# Change from:
VITE_RAZORPAY_KEY_ID=rzp_test_RfxxUHvWj3pwrI

# To:
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
```

**Step 3: Update Backend (server/.env)**
```properties
# Change from:
RAZORPAY_KEY_ID=rzp_test_RfxxUHvWj3pwrI
RAZORPAY_KEY_SECRET=EQlRNs6V0N1vO4gNwkEecyJI

# To:
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

**Step 4: Update on Vercel**
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Update `VITE_RAZORPAY_KEY_ID` with live key
4. Redeploy

**Step 5: Update on Render**
1. Go to Render Dashboard → Your Service
2. Environment → Environment Variables
3. Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
4. Service will auto-redeploy

**Step 6: Update razorpay.js**
```javascript
// In src/utils/razorpay.js, update:
export const RAZORPAY_CONFIG = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use env variable instead of hardcoded
  // ... rest of config
}
```

---

## 2. Custom Domain Setup

### Current Setup:
- **Frontend:** Hosted on Vercel (free subdomain: `your-app.vercel.app`)
- **Backend:** Hosted on Render (free subdomain: `temple-backend-dm30.onrender.com`)

### To Add Custom Domain:

#### Option A: Domain for Frontend Only (Recommended)

**Step 1: Buy Domain**
- Buy from: Namecheap, GoDaddy, Google Domains, etc.
- Cost: ₹500-1500/year for .com domain

**Step 2: Add to Vercel (FREE)**
1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter your domain (e.g., `srikainariayappankavu.com`)
5. Follow DNS configuration instructions

**Step 3: Configure DNS**
Add these records in your domain provider:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Step 4: Update Backend CORS**
In `server/index.js`, add your domain to allowed origins:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-domain.com',
  'https://www.your-domain.com',
  process.env.FRONTEND_URL,
  // ... existing origins
]
```

**Cost:** Only domain cost (₹500-1500/year)
**Vercel:** FREE (includes SSL certificate)

#### Option B: Custom Domain for Both Frontend & Backend

**For Backend on Render:**
- Render FREE plan doesn't support custom domains
- Need to upgrade to Starter plan: $7/month (₹580/month)

**Alternative:** Keep backend on Render subdomain
- Users don't see backend URL
- Only frontend needs custom domain
- Saves money!

---

## 3. Do You Need Premium Server?

### Current Setup Analysis:

**Render Free Tier:**
- ✅ Good for: Small to medium traffic
- ✅ Includes: 750 hours/month (enough for 24/7)
- ⚠️ Limitation: Spins down after 15 min inactivity (cold start)
- ⚠️ Limitation: 512 MB RAM

**When to Upgrade:**

**Upgrade to Render Starter ($7/month) if:**
- ❌ Cold starts are annoying (15-30 sec delay)
- ❌ You get 1000+ visitors per day
- ❌ You need custom domain for backend
- ❌ You need more than 512 MB RAM

**Stay on Free Plan if:**
- ✅ Traffic is low to moderate (< 500 visitors/day)
- ✅ Cold starts are acceptable
- ✅ Budget is tight
- ✅ Just starting out

### Recommendation:
**Start with FREE plan**, upgrade only when:
1. You have consistent traffic
2. Cold starts become a problem
3. You're making money from donations

---

## 4. Should You Change from Render?

### Render vs Alternatives:

#### Render (Current)
- **Free Tier:** ✅ Yes (750 hrs/month)
- **Pros:** Easy setup, auto-deploy from GitHub
- **Cons:** Cold starts on free tier
- **Cost:** Free or $7/month

#### Railway
- **Free Tier:** ✅ $5 credit/month
- **Pros:** No cold starts, faster
- **Cons:** Credit runs out quickly
- **Cost:** Pay as you go after credit

#### Heroku
- **Free Tier:** ❌ No (removed in 2022)
- **Cost:** $7/month minimum
- **Not recommended:** More expensive than Render

#### AWS/DigitalOcean
- **Free Tier:** Limited
- **Pros:** More control, scalable
- **Cons:** Complex setup, requires technical knowledge
- **Cost:** $5-10/month

#### Vercel (Backend)
- **Free Tier:** ✅ Yes
- **Pros:** No cold starts, fast
- **Cons:** Serverless (not ideal for MongoDB connections)
- **Not recommended for your backend**

### Recommendation:
**STAY WITH RENDER** because:
1. ✅ Free tier is generous
2. ✅ Easy to use
3. ✅ Auto-deploys from GitHub
4. ✅ Good for MongoDB apps
5. ✅ Can upgrade easily when needed

---

## 5. Complete Deployment Checklist

### For Production (Live Mode):

- [ ] **Razorpay:**
  - [ ] Complete KYC verification
  - [ ] Get live API keys
  - [ ] Update frontend .env
  - [ ] Update backend .env
  - [ ] Update Vercel environment variables
  - [ ] Update Render environment variables
  - [ ] Test with real card (small amount)

- [ ] **Custom Domain:**
  - [ ] Buy domain
  - [ ] Add to Vercel
  - [ ] Configure DNS
  - [ ] Update backend CORS
  - [ ] Test domain access
  - [ ] Verify SSL certificate

- [ ] **Backend:**
  - [ ] Verify MongoDB connection
  - [ ] Check admin user exists
  - [ ] Test all API endpoints
  - [ ] Monitor logs for errors

- [ ] **Frontend:**
  - [ ] Test all pages
  - [ ] Test payment flow
  - [ ] Test booking flow
  - [ ] Test admin panel
  - [ ] Check mobile responsiveness

- [ ] **Security:**
  - [ ] Change JWT_SECRET to strong random string
  - [ ] Never commit .env files
  - [ ] Use environment variables for all secrets
  - [ ] Enable HTTPS (automatic on Vercel/Render)

---

## 6. Cost Summary

### Minimum Cost (Recommended for Starting):
```
Domain: ₹500-1500/year (₹42-125/month)
Vercel: FREE
Render: FREE
Total: ₹42-125/month
```

### With Premium Features:
```
Domain: ₹1000/year (₹83/month)
Vercel: FREE
Render Starter: $7/month (₹580/month)
Total: ₹663/month
```

### Recommendation:
**Start with FREE plan (only domain cost)**
- Upgrade when you have regular traffic
- Upgrade when donations cover hosting costs

---

## 7. Quick Fixes for Current Issues

### If Payment Fails in Test Mode:

1. **Use Test Card:**
   ```
   4111 1111 1111 1111
   12/25
   123
   ```

2. **Check Browser Console:**
   - Press F12
   - Look for errors
   - Share errors if payment still fails

3. **Check Backend Logs:**
   - Go to Render Dashboard
   - Click on your service
   - Check "Logs" tab
   - Look for payment errors

4. **Verify Environment Variables:**
   ```bash
   # Test backend
   curl https://temple-backend-dm30.onrender.com/api/payments/test
   ```

### If You See "Payment Could Not Be Completed":

This is normal in test mode with wrong card details. Use the test card above.

---

## Need Help?

1. **Razorpay Issues:** Check [Razorpay Docs](https://razorpay.com/docs/)
2. **Domain Setup:** Check your domain provider's help docs
3. **Render Issues:** Check [Render Docs](https://render.com/docs)
4. **Vercel Issues:** Check [Vercel Docs](https://vercel.com/docs)

## Summary

✅ **Current Setup is GOOD for starting**
✅ **Only buy domain when ready** (₹500-1500/year)
✅ **Stay on FREE hosting** until traffic grows
✅ **Switch to live Razorpay** when ready to accept real payments
✅ **No need to change from Render** - it's perfect for your needs
