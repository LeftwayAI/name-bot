# 🚨 CRITICAL: Fix Google Ads Conversion Tracking (15 minutes)

**WHY THIS MATTERS:**
Without this fix, Google Ads will spend your money but won't know which keywords convert. You'll be flying blind.

**IMPACT OF NOT FIXING:**
- ❌ Can't optimize ad spend
- ❌ Waste $200-400 on bad keywords
- ❌ Miss $365-463 in potential revenue over 10 days

**IMPACT OF FIXING:**
- ✅ Google automatically pauses bad keywords
- ✅ Google automatically scales good keywords
- ✅ Save $200-400 in wasted spend
- ✅ Maximize ROI on every dollar spent

---

## ⚡ Quick Fix (15 minutes)

### Step 1: Create Google Ads Conversion Action (5 min)

1. Go to [ads.google.com](https://ads.google.com)
2. Click **"Tools & Settings"** (wrench icon)
3. Under "Measurement", click **"Conversions"**
4. Click **"+ New conversion action"**
5. Select **"Website"**
6. Click **"Code installation yourself"** → **"Next"**
7. Fill in:
   - **Conversion name:** `Purchase - Premium Name Package`
   - **Value:** `49` (USD)
   - **Count:** `One` (each purchase counts once)
   - **Category:** `Purchase`
8. Click **"Create and continue"**

### Step 2: Get Your Conversion IDs (2 min)

You'll see a code snippet like this:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-1234567890"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-1234567890');  <!-- 👈 This is your ACCOUNT ID -->
</script>

<!-- Event snippet for Purchase conversion -->
<script>
  gtag('event', 'conversion', {
    'send_to': 'AW-1234567890/AbC1234567dEfG',  <!-- 👈 This is your CONVERSION ID -->
    'value': 49.0,
    'currency': 'USD'
  });
</script>
```

**Copy these two IDs:**
1. **Account ID:** `AW-1234567890` (the shorter one)
2. **Conversion ID:** `AW-1234567890/AbC1234567dEfG` (the longer one with slash)

### Step 3: Update Your Code (5 min)

#### File 1: `app/layout.tsx`

**Find line 38:**
```typescript
gtag('config', 'AW-XXXXXXXXX'); // TODO: Replace with your Google Ads ID
```

**Replace with your Account ID:**
```typescript
gtag('config', 'AW-1234567890'); // ✅ Your actual Google Ads ID
```

**Also update line 30:**
```typescript
src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
```

**Replace with:**
```typescript
src="https://www.googletagmanager.com/gtag/js?id=AW-1234567890"
```

---

#### File 2: `app/success/page.tsx`

**Find line 67:**
```typescript
'send_to': 'AW-XXXXXXXXX/XXXXXXX', // TODO: Replace with your Google Ads conversion ID
```

**Replace with your Conversion ID:**
```typescript
'send_to': 'AW-1234567890/AbC1234567dEfG', // ✅ Your actual conversion ID
```

---

### Step 4: Deploy to Vercel (2 min)

```bash
git add app/layout.tsx app/success/page.tsx
git commit -m "Configure Google Ads conversion tracking"
git push origin main
```

Vercel will automatically deploy in ~60 seconds.

---

### Step 5: Test Conversion Tracking (3 min)

1. Wait for Vercel deployment to complete
2. Visit [rose.glass](https://rose.glass)
3. Generate some names
4. Click "🥂 Claim for $49"
5. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/26)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)
6. Complete checkout
7. You'll land on success page

**Verify in Google Ads:**
1. Go back to [ads.google.com](https://ads.google.com)
2. Click **"Tools & Settings"** → **"Conversions"**
3. You should see **1 conversion** for "Purchase - Premium Name Package"
4. It may take 5-15 minutes to appear

✅ **If you see the conversion, you're done!**

---

## 🎯 What Happens After You Fix This

### Before Fix:
```
Day 1: Spend $50 on ads → 100 clicks → ??? conversions
Day 2: Spend $50 on ads → 100 clicks → ??? conversions
Day 3: Spend $50 on ads → 100 clicks → ??? conversions

You have NO IDEA which keywords are working.
```

### After Fix:
```
Day 1: Spend $50 on ads → 100 clicks → 2 conversions
        ↓
        Google learns:
        - Keyword "luxury name generator" → 2 conversions ✅ SCALE
        - Keyword "free business names" → 0 conversions ❌ PAUSE

Day 2: Spend $50 ONLY on working keywords → 3 conversions
Day 3: Spend $50 on proven keywords → 4 conversions

Google optimizes automatically. You make more money.
```

---

## 🚨 DO NOT LAUNCH GOOGLE ADS UNTIL YOU COMPLETE THIS FIX

**Seriously.**

Running Google Ads without conversion tracking is like:
- Fishing with your eyes closed
- Shooting arrows in the dark
- Throwing money into a black hole

You MIGHT get lucky, but you're probably just wasting money.

**Fix this first. It takes 15 minutes. It saves $200-400.**

---

## ✅ Checklist

- [ ] Created conversion action in Google Ads
- [ ] Copied Account ID (`AW-1234567890`)
- [ ] Copied Conversion ID (`AW-1234567890/AbC1234567dEfG`)
- [ ] Updated `app/layout.tsx` line 30 (gtag.js src)
- [ ] Updated `app/layout.tsx` line 38 (gtag config)
- [ ] Updated `app/success/page.tsx` line 67 (send_to)
- [ ] Committed and pushed to GitHub
- [ ] Waited for Vercel deployment
- [ ] Made test purchase with `4242 4242 4242 4242`
- [ ] Verified conversion appeared in Google Ads dashboard

**When all boxes are checked, you're ready to launch ads!** 🚀

---

## 💡 Pro Tip: Set Up Enhanced Conversions (Optional, +5 min)

While you're in Google Ads → Conversions → Edit "Purchase - Premium Name Package":

1. Enable **"Enhanced conversions"**
2. This passes hashed customer email to Google
3. Improves conversion tracking accuracy by ~15%
4. Helps Google better attribute cross-device conversions

**Code change needed:**
In `app/success/page.tsx` line 67, add:
```typescript
gtag('event', 'conversion', {
  'send_to': 'AW-1234567890/AbC1234567dEfG',
  'value': 49.0,
  'currency': 'USD',
  'transaction_id': sessionId, // Unique ID from Stripe
});
```

But this is OPTIONAL. The basic setup above is sufficient to launch.

---

**Questions?** Check PROGRESS.md → Run #34 for detailed analysis.

**Ready to launch?** After fixing this, open GOOGLE-ADS-SETUP.md to create your campaigns.
