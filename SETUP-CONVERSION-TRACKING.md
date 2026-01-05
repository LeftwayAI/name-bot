# 🎯 Conversion Tracking Setup (5 Minutes)

**Why This Matters:** Without conversion tracking, you're flying blind. You won't know which ads work, which keywords convert, or how to optimize your campaigns.

**Current Status:** The code is already installed and ready. You just need to add your Google Ads ID.

---

## Step 1: Create Google Ads Account (if you don't have one)

1. Go to https://ads.google.com
2. Click "Start Now"
3. Follow the setup wizard
4. **Important:** Skip campaign creation for now - we'll do that after tracking is set up

---

## Step 2: Get Your Google Ads Conversion ID

1. Go to Google Ads dashboard
2. Click **Tools & Settings** (wrench icon in top right)
3. Under "Measurement", click **Conversions**
4. Click **+ New Conversion Action**
5. Select **Website**
6. Enter these details:
   - **Goal:** Purchase
   - **Name:** "Premium Package Purchase"
   - **Value:** Use specific value → **$49**
   - **Count:** Every conversion
   - **Conversion window:** 30 days
7. Click **Create and Continue**
8. Choose **"Use Google tag"** (not manually add code)
9. You'll see two IDs on the screen:
   - **Google tag ID:** `AW-XXXXXXXXX` (main account ID)
   - **Conversion ID:** `AW-XXXXXXXXX/YYYYYYYYY` (action-specific ID)
10. **Copy both IDs** - you'll need them next

---

## Step 3: Update Your Code (2 minutes)

### A. Update `app/layout.tsx`

Find this line (around line 30):
```tsx
src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
```

Replace `AW-XXXXXXXXX` with your **Google tag ID** (from Step 2.9)

Find this line (around line 38):
```tsx
gtag('config', 'AW-XXXXXXXXX'); // TODO: Replace with your Google Ads ID
```

Replace `AW-XXXXXXXXX` with your **Google tag ID** and remove the TODO comment.

### B. Update `app/success/page.tsx`

Find this line (around line 23):
```tsx
'send_to': 'AW-XXXXXXXXX/XXXXXXX', // TODO: Replace with your Google Ads conversion ID
```

Replace `AW-XXXXXXXXX/XXXXXXX` with your full **Conversion ID** (from Step 2.9) and remove the TODO comment.

---

## Step 4: Deploy to Vercel (1 minute)

```bash
git add app/layout.tsx app/success/page.tsx
git commit -m "Add Google Ads conversion tracking IDs"
git push
```

Vercel will automatically redeploy (takes ~2 minutes).

---

## Step 5: Test Conversion Tracking (2 minutes)

1. Wait for Vercel deployment to complete
2. Visit https://rose.glass
3. Generate some names
4. Click "Claim for $49" on any available domain
5. Use Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/26`
   - CVC: `123`
   - Email: your email
6. Complete the checkout
7. You should land on the success page
8. Go back to Google Ads → **Tools & Settings** → **Conversions**
9. Click on "Premium Package Purchase"
10. Check **Recent conversions** - you should see your test conversion within 1-2 minutes

**If you see the conversion**: ✅ Tracking is working! You're ready to launch ads.

**If you DON'T see it**: Check browser console for errors, or verify the IDs were copied correctly.

---

## What Happens Next

Once conversion tracking is working:

1. **Launch your first ad campaign** (see GOOGLE-ADS-SETUP.md)
2. **Monitor conversions daily** in Google Ads dashboard
3. **Optimize based on data:**
   - Pause keywords with >30 clicks + 0 conversions
   - Scale keywords with conversions and CPA <$100
   - Adjust bids based on conversion rate

---

## Troubleshooting

**"I don't see any conversions after testing"**
→ Check browser console (F12) for JavaScript errors
→ Verify the Google tag ID and Conversion ID were copied exactly
→ Make sure you completed checkout and landed on /success page
→ Wait 2-3 minutes - tracking can be delayed

**"I see pageviews but no conversions"**
→ The Google tag ID is working, but the Conversion ID might be wrong
→ Double-check `app/success/page.tsx` has the correct conversion ID
→ Make sure the format is `AW-XXXXXXXXX/YYYYYYYYY` (with the slash)

**"My ads are running but no conversions are showing"**
→ Either the funnel is broken (test it yourself) OR conversion rate is very low
→ If you get 50+ clicks with 0 conversions, pause ads and debug the funnel

---

## Why This Is Critical

**Without conversion tracking:**
- You can't tell which keywords work
- You can't optimize bids
- You can't measure ROI
- You're wasting money on bad traffic

**With conversion tracking:**
- See which keywords convert (double down on these)
- Pause keywords that don't convert (stop wasting money)
- Let Google auto-optimize for conversions (Target CPA bidding)
- Make data-driven decisions instead of guessing

🎯 **Bottom line:** 5 minutes of setup = ability to optimize $1000s of ad spend.
