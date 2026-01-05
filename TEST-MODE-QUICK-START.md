# ⚡ TEST MODE QUICK START - 5 Minutes to Validation

**Goal:** Test the ENTIRE conversion funnel RIGHT NOW without completing full setup.

**Why:** Psychological barrier removal. You can see it work TODAY, then complete full setup with confidence.

---

## 🎯 What You'll Validate

By the end of 5 minutes, you'll have tested:
- ✅ AI name generation works
- ✅ Domain availability checking works
- ✅ Stripe checkout flow works
- ✅ Success page displays correctly
- ✅ Email content renders properly (preview mode)

**What's NOT tested yet:** Actual email delivery (requires RESEND_API_KEY + STRIPE_WEBHOOK_SECRET)

---

## ✅ STEP 1: Verify Vercel Environment (30 seconds)

The live site already has keys configured. Let's confirm:

1. Go to https://vercel.com/dashboard
2. Select `name-bot` project
3. Click "Settings" → "Environment Variables"
4. Verify these exist:
   - ✅ `OPENROUTER_API_KEY` (for AI generation)
   - ✅ `STRIPE_SECRET_KEY` (for payments)

**If missing:** Contact Bill - these should already be set per PROGRESS.md

---

## ✅ STEP 2: Test AI Name Generation (1 minute)

1. Visit https://rose.glass
2. Enter any business description: `"Coffee shop in Seattle"`
3. Click "Generate Names"
4. **Expected:** 10 AI-generated names appear

**✅ SUCCESS:** If names appear, AI generation works in production
**❌ FAIL:** If error, OPENROUTER_API_KEY is missing in Vercel

---

## ✅ STEP 3: Test Domain Checking (1 minute)

1. On the same page, click "Check Availability" on any generated name
2. **Expected:** Blue button changes to show domain status

**✅ SUCCESS:** If domain status appears (Available/Taken), domain checking works
**❌ FAIL:** If error, check console logs

---

## ✅ STEP 4: Test Stripe Checkout (2 minutes)

1. Click "Claim This Name - $49" on an available domain
2. **Expected:** Stripe checkout page opens
3. Use Stripe test card:
   - **Card:** `4242 4242 4242 4242`
   - **Expiry:** `12/28`
   - **CVC:** `123`
   - **Email:** Your real email (you'll see success page, not receive email yet)
4. Complete checkout

**✅ SUCCESS:** If you're redirected to `https://rose.glass/success?session_id=...`, payment works
**❌ FAIL:** If checkout fails, STRIPE_SECRET_KEY is misconfigured

---

## ✅ STEP 5: Verify Success Page Content (1 minute)

On the success page (https://rose.glass/success?session_id=...), you should see:

1. **Heading:** "Payment Successful! 🎉"
2. **Domain name** you "purchased"
3. **Next steps** for domain registration
4. **Email preview notice** (since webhook isn't configured yet)

**Open browser console** (F12) and look for:
```
📧 Email Preview (would be sent to customer):
To: your-email@example.com
Subject: Your Domain Registration for YourName.com
Content: [full email HTML]
```

**✅ SUCCESS:** If you see this, the success page renders correctly and email content is generated
**❌ FAIL:** If page is blank or errors, check Stripe session ID

---

## 📊 What You Just Validated

Congratulations! You've proven:

| Component | Status | Evidence |
|-----------|--------|----------|
| AI Generation | ✅ WORKS | Names appeared on page |
| Domain Checking | ✅ WORKS | Availability status shown |
| Stripe Payment | ✅ WORKS | Checkout completed successfully |
| Success Page | ✅ WORKS | Redirect + content displayed |
| Email Content | ✅ READY | Console shows what would be sent |

---

## 🚀 What's Left to Go LIVE?

Only 2 things (both in LAUNCH-CHECKLIST.md):

### 1. Email Delivery (15 min)
**Why needed:** Right now, customers see success page but don't receive email
**What to do:** Set up Resend API (LAUNCH-CHECKLIST Step 1-2)
**Impact:** Customers get domain claim instructions immediately

### 2. Webhook Automation (10 min)
**Why needed:** Right now, email sending would need manual trigger
**What to do:** Configure Stripe webhook (LAUNCH-CHECKLIST Step 3)
**Impact:** Emails send automatically on successful payment

---

## 💡 Decision Point

**You just proved the product works.** Here's your choice:

### Option A: Complete Full Setup Now (25 min total)
→ Follow LAUNCH-CHECKLIST.md Steps 1-3
→ Test end-to-end with real email delivery
→ Launch Google Ads traffic TONIGHT
→ **Possible first sale by tomorrow**

### Option B: Procrastinate
→ "I'll do it later"
→ January 15 deadline approaches
→ Never get real conversion rate data
→ **Guaranteed $0 revenue**

---

## 🎯 Recommended Next Action

**NOW:**
1. You've seen it works (5 minutes ✅)
2. Open LAUNCH-CHECKLIST.md
3. Do Step 1 (Resend setup, 15 min)
4. Do Step 2-3 (Webhook setup, 10 min)
5. Test with real email delivery

**TONIGHT:**
6. Launch Google Ads ($50/day test budget)
7. Target "business name generator"
8. Monitor for first sale

**TOMORROW:**
9. Check conversion rate
10. Scale if >1.5%, optimize if <1.5%

---

## 🔥 The Psychology of Momentum

**Before this test:**
- "Setup seems hard"
- "What if it doesn't work?"
- "I'll do it later"

**After this test:**
- "It WORKS! I just saw it!"
- "Only 25 minutes to go live"
- "I want to see real sales"

**Momentum is everything.** You're 5 minutes in. Don't stop now.

---

## ❓ FAQ

**Q: Can I launch traffic now without email delivery?**
A: Technically yes, but customers won't receive domain claim instructions. Bad experience = refunds.

**Q: What if Stripe test mode works but live mode fails?**
A: Unlikely. The code is identical. Only API keys differ. But this is why you test with test card first.

**Q: How do I know if conversion rate is good?**
A: >1.5% = Great, scale ads aggressively
   0.5-1.5% = OK, optimize messaging
   <0.5% = Debug funnel, improve value prop

**Q: Should I build more features before launching?**
A: NO. 12 agent runs concluded product is ready. More features won't help conversion rate. LAUNCH NOW.

---

**⏱️ 5 minutes elapsed. Product validated. Ready to complete setup?**

**→ Open LAUNCH-CHECKLIST.md**

🥂
