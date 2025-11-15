# 📊 MongoDB Atlas - View Your Collections

## 🔍 How to View Your Poojas Collection

### Step 1: Access MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Log in with your credentials
3. You'll see your clusters dashboard

### Step 2: Browse Your Database

1. Click on **"Browse Collections"** button on your cluster
   - Or click **"Collections"** tab
2. You'll see your database: **temple**
3. Click on **temple** to expand it

### Step 3: View Collections

You should see these collections:
- **poojas** - All your pooja listings
- **bookings** - All pooja bookings
- **users** - User accounts
- **donations** - Donation records
- **messages** - Contact messages
- **notifications** - System notifications

### Step 4: View Poojas

1. Click on **poojas** collection
2. You'll see all your poojas in JSON format
3. Each document shows:
   - `_id` - Unique identifier
   - `name` - Pooja name
   - `price` - Price in rupees
   - `description` - Details
   - `isAvailable` - Active status
   - `createdAt` - When it was added

---

## 🐛 Problem Fixed: Poojas Disappearing on Restart

### What Was Happening:
Every time you ran `npm run dev`, the server was:
1. Connecting to MongoDB
2. **Deleting ALL poojas** (including your custom ones)
3. Recreating only the 3 default poojas

### What I Fixed:
I commented out the auto-initialization in `server/index.js`:

```javascript
// await initializePoojas() // COMMENTED OUT - Only run manually when needed
```

### Now Your Poojas Will Persist! ✅

---

## 🎯 How to Manage Poojas

### Option 1: Through Admin Panel (Recommended)
1. Login as admin
2. Go to Admin Dashboard
3. Add/Edit/Delete poojas
4. Changes are saved to MongoDB Atlas
5. **They will persist even after restart!** ✅

### Option 2: Manually Initialize (One-time only)
If you need to reset to default poojas:

```bash
# Make a POST request to initialize
curl -X POST http://localhost:5011/api/poojas/init
```

**⚠️ Warning:** This will delete ALL poojas and recreate defaults!

### Option 3: Directly in MongoDB Atlas
1. Go to your **poojas** collection
2. Click **"Insert Document"**
3. Add your pooja in JSON format:

```json
{
  "name": "Special Pooja",
  "malayalamName": "സ്പെഷ്യൽ പൂജ",
  "description": "Description here",
  "duration": "1 hour",
  "price": 100,
  "category": "Special",
  "isAvailable": true,
  "requirements": ["Flowers", "Fruits"],
  "benefits": ["Peace", "Prosperity"],
  "imageUrl": "/images/special-pooja.jpg"
}
```

---

## 📋 Your Current Database Info

**Connection String:**
```
mongodb+srv://temple:Skat666@maincluster.u8rut3z.mongodb.net/temple
```

**Database Name:** `temple`  
**Cluster:** `MainCluster`

---

## 🔧 Common Operations

### View All Poojas:
1. MongoDB Atlas → Collections → temple → poojas
2. You'll see all documents

### Search for Specific Pooja:
1. In the poojas collection
2. Use the **Filter** box:
   ```json
   { "name": "Ganapathi Homam" }
   ```

### Edit a Pooja:
1. Find the pooja in the collection
2. Click the **pencil icon** (Edit)
3. Modify the fields
4. Click **Update**

### Delete a Pooja:
1. Find the pooja
2. Click the **trash icon** (Delete)
3. Confirm deletion

### Check Pooja Count:
Look at the top of the collection view - it shows total documents

---

## 🎉 Your Poojas Are Now Safe!

After the fix:
- ✅ Poojas persist across server restarts
- ✅ Custom poojas won't disappear
- ✅ Admin-added poojas are saved permanently
- ✅ Database changes are permanent

---

## 🆘 Troubleshooting

### Poojas Still Not Showing?

**Check 1: Verify Database Connection**
```bash
# Look for this in server logs:
Connected to MongoDB
```

**Check 2: Check MongoDB Atlas**
- Go to Collections
- Verify poojas exist in the database

**Check 3: Check Frontend API Call**
- Open browser console (F12)
- Look for API errors
- Check Network tab for `/api/poojas` request

**Check 4: Verify Server is Running**
```bash
# Should see:
Server is running on port 5011
Connected to MongoDB
```

### Need to Reset to Defaults?

If you want to start fresh with default poojas:

```bash
# Option 1: Using curl
curl -X POST http://localhost:5011/api/poojas/init

# Option 2: Using browser
# Visit: http://localhost:5011/api/poojas/init (POST request)
```

---

## 📊 MongoDB Atlas Dashboard Features

### Useful Features:
1. **Charts** - Visualize your data
2. **Search** - Full-text search in collections
3. **Aggregation** - Run complex queries
4. **Indexes** - Improve query performance
5. **Backup** - Automatic backups (paid plans)
6. **Monitoring** - Track database performance

### Free Tier Limits:
- Storage: 512 MB
- Connections: Shared
- Backups: Not included
- Perfect for development and small projects!

---

## ✅ Summary

**Problem:** Poojas were being deleted on every server restart  
**Solution:** Commented out auto-initialization  
**Result:** Your poojas now persist permanently in MongoDB Atlas!

**To view your poojas:**
1. Go to https://cloud.mongodb.com
2. Click "Browse Collections"
3. Navigate to temple → poojas
4. See all your saved poojas! 🎉
