# Quick Test Payment Guide

## Test Card Details (For Test Mode)

### ✅ Successful Payment Test Card:
```
Card Number: 4111 1111 1111 1111
Expiry Date: 12/25 (any future date)
CVV: 123 (any 3 digits)
Cardholder Name: Test User (any name)
```

### ❌ Failed Payment Test Card:
```
Card Number: 4000 0000 0000 0002
Expiry Date: 12/25
CVV: 123
Cardholder Name: Test User
```

## How to Test Payment

### Step 1: Go to Your Website
```
https://your-vercel-domain.com/donation
```

### Step 2: Click "Donate Now"

### Step 3: Fill Donation Form
- Enter any name
- Enter any phone number
- Select amount or enter custom amount
- Click "Proceed to Payment"

### Step 4: Use Test Card
- Enter test card details above
- Click "Pay"
- Payment should succeed!

## Common Issues & Solutions

### Issue 1: "Payment Could Not Be Completed"
**Cause:** Using real card in test mode
**Solution:** Use test card: `4111 1111 1111 1111`

### Issue 2: "International cards are not supported"
**Cause:** Test mode restriction
**Solution:** This is normal in test mode. Use test card above.

### Issue 3: Payment window doesn't open
**Cause:** Razorpay script not loaded
**Solution:** 
1. Check browser console (F12)
2. Look for errors
3. Refresh page and try again

### Issue 4: "Failed to create payment order"
**Cause:** Backend issue
**Solution:**
1. Check backend is running: `https://temple-backend-dm30.onrender.com/api/health`
2. Check backend logs on Render dashboard
3. Verify environment variables are set

## Testing Checklist

- [ ] Test card payment succeeds
- [ ] Booking is created in database
- [ ] Admin can see booking in admin panel
- [ ] User receives confirmation (if SMS configured)
- [ ] Payment ID is recorded

## When Ready for Live Payments

1. Complete Razorpay KYC
2. Get live API keys
3. Update environment variables
4. Test with real card (small amount first!)
5. Monitor transactions in Razorpay dashboard

## Quick Test Command

Test if backend payment route works:
```bash
curl https://temple-backend-dm30.onrender.com/api/payments/test
```

Should return:
```json
{
  "success": true,
  "message": "Payment routes are working",
  "razorpay": {
    "keyId": "rzp_test_Rfxx...",
    "hasSecret": true,
    "configured": true
  }
}
```

## Need Help?

If payment still fails:
1. Open browser console (F12)
2. Try payment again
3. Copy any error messages
4. Check backend logs on Render
5. Share error details for debugging
