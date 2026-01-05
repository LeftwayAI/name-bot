# 🚀 LAUNCH CHECKLIST - 45 Minutes to Revenue

**Current Status:** Product is 100% complete. Code is done. Site is live.

**Blocker:** Manual setup tasks that only Bill can complete.

**Deadline:** January 15, 2025 (10 days away)

---

## ✅ STEP 1: Resend Email Setup (15 min)

**Why:** Send domain claim emails to customers after purchase

1. Go to https://resend.com
2. Sign up (free tier: 100 emails/day - plenty to start)
3. Click "Domains" → "Add Domain"
4. Enter: `rose.glass`
5. Copy the DNS records (TXT, MX, CNAME)
6. Go to your domain registrar (wherever you bought rose.glass)
7. Add the DNS records
8. Wait 5-10 minutes
9. Return to Resend → Click "Verify"
10. Once verified, click "API Keys" → "Create API Key"
11. Copy the key (starts with `re_`)

**Result:** You have a RESEND_API_KEY

---

## ✅ STEP 2: Add Environment Variables to Vercel (5 min)

**Why:** The app needs these keys to send emails and process webhooks

1. Go to https://vercel.com/dashboard
2. Select the `name-bot` project
3. Click "Settings" → "Environment Variables"
4. Add first variable:
   - **Key:** `RESEND_API_KEY`
   - **Value:** `re_...` (from Step 1)
   - **Environment:** Production, Preview, Development (check all)
5. Click "Save"
6. Add second variable (we'll get the value in Step 3):
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** (leave empty for now)
   - **Environment:** Production, Preview, Development (check all)

**Note:** Don't worry about `ANTHROPIC_API_KEY` - it's already set

**Result:** RESEND_API_KEY is configured

---

## ✅ STEP 3: Stripe Webhook Setup (10 min)

**Why:** Stripe needs to tell our app when a payment succeeds

1. Go to https://dashboard.stripe.com
2. Click "Developers" → "Webhooks"
3. Click "Add endpoint"
4. Enter webhook URL: `https://rose.glass/api/webhook`
5. Click "Select events"
6. Search for and select: `checkout.session.completed`
7. Click "Add endpoint"
8. Click on the newly created webhook
9. Click "Reveal" under "Signing secret"
10. Copy the secret (starts with `whsec_`)
11. Return to Vercel (Step 2)
12. Edit the `STRIPE_WEBHOOK_SECRET` variable
13. Paste the value from step 10
14. Click "Save"
15. **Important:** Go back to Vercel project → Click "Deployments" → Click the 3 dots on latest deployment → "Redeploy"

**Result:** Stripe can notify your app about successful payments

---

## ✅ STEP 4: Test End-to-End (10 min)

**Why:** Verify the entire flow works before spending money on ads

1. Visit https://rose.glass
2. Enter a business description (e.g., "coffee shop in Seattle")
3. Click "Generate Names"
4. Wait for AI-generated names to appear
5. Click "Check Availability" on any name
6. Click "Claim This Name - $49"
7. Use Stripe test card:
   - **Card number:** `4242 4242 4242 4242`
   - **Expiry:** Any future date (e.g., `12/26`)
   - **CVC:** Any 3 digits (e.g., `123`)
   - **Email:** Your real email
8. Complete checkout
9. **Check your email inbox** - you should receive:
   - Subject: "Your Domain Registration for [YourName].com"
   - Contains domain claim instructions
10. Go to Stripe Dashboard → "Webhooks" → Click your webhook → "Recent deliveries"
11. Verify the webhook was delivered successfully

**Result:** The entire funnel works. You're ready to launch.

---

## ✅ STEP 5: Launch Traffic (5 min)

**Why:** No traffic = no sales. You need to test the conversion rate.

### Option A: Google Ads (Fastest to revenue)

1. Go to https://ads.google.com
2. Create new Search campaign
3. Target keyword: `business name generator`
4. Budget: $50/day (test budget)
5. Destination URL: `https://rose.glass/business-name-generator`
6. Launch campaign
7. **Monitor daily:** If conversion rate >1.5%, scale to $200-400/day

### Option B: Reddit Ads (Cheaper testing)

1. Go to https://ads.reddit.com
2. Create campaign targeting r/Entrepreneur, r/startups
3. Budget: $20/day
4. Link to: `https://rose.glass/startup-name-ideas`

### Option C: Organic SEO (Free but slow)

- The site is already optimized for SEO
- 5 pages targeting different keywords
- This will take weeks/months to rank
- **Don't wait for this** - launch paid traffic now

**Result:** Traffic is flowing to the site

---

## 📊 Expected Results

**Timeline:**
- **Day 1-2:** First test sales (conversion rate unknown)
- **Day 3-5:** Optimize based on data (improve pages if conversion <1.5%)
- **Day 6-10:** Scale if working, or pivot if not

**Revenue Scenarios:**
- **Best case:** 1-2% conversion, $500+ revenue by Jan 15
- **Realistic case:** 0.5-1% conversion, $200-400 revenue
- **Worst case:** <0.5% conversion, need to debug funnel

**Key Metric:** Conversion rate (purchases / visitors)
- **>1.5%:** Scale aggressively
- **0.5-1.5%:** Optimize pages, test different traffic sources
- **<0.5%:** Debug checkout flow, improve value prop

---

## 🚨 BLOCKERS & SOLUTIONS

**"I don't have time to set this up"**
→ The setup takes 45 minutes total. The deadline is 10 days away. Without setup, revenue stays at $0.

**"What if the conversion rate is bad?"**
→ You won't know until you launch traffic. Test with $50/day for 2-3 days, then decide.

**"Should I build more features first?"**
→ NO. 12 consecutive agent runs concluded the product is ready. More features won't help if nobody visits the site.

**"What if Stripe/Resend is hard to set up?"**
→ Both have excellent docs. This checklist has step-by-step instructions. If stuck, their support is fast.

---

## ✅ COMPLETION CRITERIA

You're done when:
- [ ] Email sent to test@example.com arrives successfully
- [ ] Test purchase with card 4242... completes
- [ ] Stripe webhook shows "Succeeded" in dashboard
- [ ] Traffic campaign is live (Google Ads or Reddit Ads)

**After completion:** Monitor conversion rate 2x daily. Adjust based on data.

🥂 **Time to launch.**
