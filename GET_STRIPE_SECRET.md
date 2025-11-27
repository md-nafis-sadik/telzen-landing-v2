# How to Get Your Stripe Secret Key

## ⚠️ IMPORTANT: You need to add your Stripe Secret Key to `.env.local`

Currently in `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here  ← CHANGE THIS!
```

## Steps to Get Your Secret Key:

1. **Go to Stripe Dashboard**
   - Visit: https://dashboard.stripe.com/test/apikeys

2. **Find "Secret key"**
   - Look for the key that starts with `sk_test_`
   - Click "Reveal test key"

3. **Copy the Key**
   - It will look like: `sk_test_51RbIbJIEmb8mxeQA...`

4. **Update `.env.local`**
   ```env
   STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
   ```

5. **Restart Dev Server**
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   npm run dev
   ```

## ✅ Verify It's Working

After adding the key and restarting:

1. Go to checkout page
2. You should see the Stripe embedded checkout form
3. Try a test payment with card: `4242 4242 4242 4242`

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` - safe from git
- ❌ **NEVER** commit secret keys to git
- ❌ **NEVER** use secret key in frontend code
- ✅ Only use in server-side code (Server Actions)

## 🐛 Troubleshooting

### Error: "Stripe is not defined"
- Secret key is missing or wrong
- Restart dev server after adding key

### Checkout not loading
- Check browser console for errors
- Verify publishable key is also correct

---

**Current Status:**
- ✅ Publishable Key: Set (pk_test_51RbIbJ...)
- ❌ Secret Key: **NEEDS TO BE ADDED**
