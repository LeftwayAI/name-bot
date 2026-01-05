# 🚀 Launch Day Operations - Your First 48 Hours

**Purpose:** This guide covers what to do AFTER you launch ads and start driving traffic.

**When to use this:** You've completed LAUNCH-CHECKLIST.md, SETUP-CONVERSION-TRACKING.md, and GOOGLE-ADS-SETUP.md. Your ads are live. Now what?

---

## ⏰ Hour-by-Hour Checklist (First 24 Hours)

### Hour 0: Launch Moment (9-10am recommended)

**Before launching ads:**
- [ ] Verify all campaigns are created and paused
- [ ] Double-check daily budgets ($10-20 per campaign)
- [ ] Verify conversion tracking is installed (test purchase yesterday)
- [ ] Confirm Stripe webhook + Resend email are working
- [ ] Take a deep breath

**Launch:**
- [ ] Enable all 5 campaigns simultaneously
- [ ] Screenshot your dashboard (for before/after comparison)
- [ ] Note the time: ____________

**Expected:**
- ✅ Campaigns show "Eligible" or "Learning" status
- ✅ Budget shows as active
- ✅ Impressions start within 15-30 minutes

**Red flags:**
- ❌ "Limited by budget" immediately (increase budget or lower bids)
- ❌ No impressions after 1 hour (check ad approval status)
- ❌ "Paused" status (you didn't actually enable them)

---

### Hours 1-2: Early Monitoring

**What to check:**
1. **Google Ads Dashboard** → Overview
   - Impressions: Should be 50-200 in first hour
   - Clicks: Might be 0-5 (normal, don't panic)
   - CTR: Ignore for now (too early)

2. **rose.glass Homepage** (visit it yourself)
   - Does the generator still work? (Test it)
   - Any broken elements? (Check mobile too)
   - Loading fast? (Use Lighthouse if slow)

3. **Google Search** → Search for your exact keywords
   - Type: "business name generator"
   - Look for your ad (might not show - Google rotates ads)
   - If you DON'T see it: Normal. Google Ads uses auction + quality score + location
   - If you DO see it: Don't click it (wastes budget, Google knows)

**Expected metrics (Hours 1-2):**
- Impressions: 100-500
- Clicks: 0-10
- Conversions: 0 (too early, need 50+ clicks typically)
- Spend: $2-10

**What NOT to do:**
- ❌ Don't panic if clicks are low (it's been 2 hours)
- ❌ Don't pause campaigns yet (need data)
- ❌ Don't increase bids yet (let Google learn)
- ❌ Don't click your own ads (fraud detection)

---

### Hours 3-6: First Data Collection

**Check Google Ads every 2-3 hours (not every 5 minutes)**

**Metrics to monitor:**
1. **Impressions** - Should be growing steadily
2. **Clicks** - Should have 5-20 by now
3. **CTR** - Aim for >2% (higher is better)
4. **Avg CPC** - Should be $0.50-1.50 (varies by keyword)

**Dashboard Navigation:**
- Google Ads → Campaigns → Click each campaign name
- Look at "Search terms" tab (what people actually searched)
- Look for irrelevant searches (add as negative keywords)

**Example negative keywords to add:**
If you see searches like:
- "free business name generator" + They don't convert → Add "-free" as negative keyword
- "name generator for dogs" → Add "-dog", "-pet", "-cat" as negative keywords
- "random name generator" → Add "-random" if low quality

**Action items (if needed):**
- [ ] Add 3-5 negative keywords per campaign (if you see irrelevant searches)
- [ ] Note which keywords got clicks (for later optimization)

**Expected metrics (Hours 3-6):**
- Impressions: 500-2000
- Clicks: 10-50
- Conversions: 0-1 (don't expect conversions yet)
- Spend: $10-40

---

### Hours 7-12: Mid-Day Check

**What to check (once around 3-4pm):**

1. **Campaign Performance:**
   - Which campaign has most clicks? (This is your winner, likely)
   - Which campaign has zero clicks? (Might need bid increase)
   - Any campaigns hitting daily budget limit? (Good problem, increase budget tomorrow)

2. **Conversion Status:**
   - Check Google Ads → Conversions
   - If you have 1+ conversion: 🎉 **IT'S WORKING!**
   - If you have 0 conversions but 50+ clicks: 🤔 **Investigate** (see "Troubleshooting" below)
   - If you have <30 clicks total: ⏳ **Wait** (too early to judge)

3. **Budget Pacing:**
   - Total spend so far: Should be 30-50% of daily budget by mid-day
   - If you've spent 80%+ by noon: Increase daily budget OR lower bids
   - If you've spent <10% by noon: Increase bids OR check ad approval

**Expected metrics (Hours 7-12):**
- Impressions: 2000-5000
- Clicks: 30-100
- Conversions: 0-2
- Spend: $30-80
- CTR: 1.5-3%

**Action items:**
- [ ] If 50+ clicks and 0 conversions → Test the funnel yourself (maybe something broke)
- [ ] If spending too fast → Lower bids by 10-20%
- [ ] If spending too slow → Increase bids by 10-20%

---

### Hours 13-24: Evening Check + Overnight

**Evening Check (around 8-9pm):**

1. **Review full day metrics:**
   - Total spend: Should be 80-100% of daily budget (if not, bids might be too low)
   - Total clicks: 50-150 expected
   - Conversions: 0-3 (don't worry if still 0 on Day 1)

2. **Quality Score Check:**
   - Google Ads → Keywords tab
   - Look for "Quality Score" column (1-10 scale)
   - 7-10 = Great (good ad relevance, landing page experience)
   - 4-6 = OK (Google is learning, will improve)
   - 1-3 = Problem (keywords might be too broad, landing page slow, or ad copy irrelevant)

3. **Search Terms Review:**
   - Google Ads → Search terms tab
   - Look for completely irrelevant searches
   - Add 5-10 negative keywords before tomorrow

**Let campaigns run overnight:**
- ✅ DO: Let them run (Google optimizes 24/7)
- ❌ DON'T: Pause overnight (you'll miss conversions)

**Expected metrics (Full Day 1):**
- Impressions: 5000-10,000
- Clicks: 80-200
- Conversions: 0-4
- Spend: $80-160 (depending on your budget settings)
- CTR: 1.5-3%
- Avg CPC: $0.50-1.50

---

## 📊 Day 2 Morning: Review & Optimize

**Morning Review (9-10am, Day 2):**

1. **Overall Performance:**
   - Total spend (24 hours): $________
   - Total clicks (24 hours): $________
   - Total conversions: $________
   - Conversion rate: _______% (conversions ÷ clicks × 100)

2. **Campaign-Level Analysis:**

Open a spreadsheet or note:

| Campaign | Impressions | Clicks | CTR | Conversions | Conv. Rate | Spend | CPA |
|----------|-------------|--------|-----|-------------|------------|-------|-----|
| Business | | | | | | | |
| Company | | | | | | | |
| Startup | | | | | | | |
| Brand | | | | | | | |
| Homepage | | | | | | | |

Fill in the data from Google Ads dashboard.

**Analysis:**

**Best performing campaign:** (Highest conversion rate OR most conversions)
- ✅ **Action:** Increase daily budget by 50% for this campaign

**Worst performing campaign:** (0 conversions + high spend OR very low CTR <1%)
- 🤔 **Action:** Pause for now, analyze later (focus budget on winners)

**Medium campaigns:** (Some clicks, no conversions yet)
- ⏳ **Action:** Keep running, but don't increase budget yet

---

## 🎯 Day 2-3: Optimization Triggers

### Trigger 1: First Sale! 🎉

**When you get your first conversion:**

1. **Verify it worked:**
   - Check Stripe dashboard → Payments (should show $49 payment)
   - Check email (customer should have received Premium Package)
   - Check Google Ads → Conversions (should show 1 conversion)

2. **Analyze what worked:**
   - Which campaign got the conversion? (Campaign → Conversions tab)
   - Which keyword? (Keywords → Conversions tab)
   - What did they search? (Search terms → Conversions tab)

3. **Double down:**
   - Increase budget for that campaign by 50%
   - Keep other campaigns running (you need 20-30 conversions to really know what works)

### Trigger 2: 50+ Clicks, 0 Conversions 🚨

**This is unusual. Something might be broken:**

**Checklist:**
1. Visit your own site → Generate names → Try to check domain availability
   - Does it work? If no → Fix the bug IMMEDIATELY
2. Visit https://rose.glass/success?session_id=test
   - Does the success page load? If no → Fix it
3. Check Google Ads → Conversions → Recent conversions
   - Do you see your test conversion from setup? If no → Tracking might be broken
4. Check Stripe Dashboard → Webhooks
   - Is the webhook getting hit? (You should see webhook logs)
   - Any errors? (4xx or 5xx responses mean email isn't sending)

**If everything looks good:**
- Conversion rate might just be low (<1%)
- Lower bids to reduce CPC
- Wait until 100 clicks to really evaluate

### Trigger 3: Spending Too Fast (Budget Gone by Noon)

**You're getting lots of clicks, but maybe not quality clicks:**

**Actions:**
1. Lower bids by 20-30% across all campaigns
2. Add more negative keywords (filter out bargain hunters)
3. Switch from "Maximize Clicks" to "Maximize Conversions" bid strategy (if you have 5+ conversions)

### Trigger 4: Spending Too Slow (Only 20% of budget used)

**Your bids are too low, or ads aren't showing:**

**Actions:**
1. Increase bids by 30-50%
2. Check "Ad Status" column (might be "Learning" - just wait)
3. Check "Search Impression Share" metric (if <50%, you're not showing enough)

### Trigger 5: Great Conversion Rate (3%+) 🚀

**You have a winner! Scale aggressively:**

**Actions:**
1. Increase daily budget to $50-100 for winning campaign
2. Create more ad variations (test different headlines)
3. Add more keywords in the same theme
4. Consider raising bids to get more impressions

---

## 📈 Days 4-7: Scaling or Pivoting

### Scenario A: You Have 3+ Conversions (🎉 Success!)

**Your funnel works! Now scale:**

**Daily actions:**
- Morning: Check conversions, note CPA (Cost Per Acquisition)
- Midday: Adjust bids if CPA >$80 (lower bids) or CPA <$40 (raise bids)
- Evening: Add negative keywords, review search terms

**Budget strategy:**
- If CPA <$60: Increase budget aggressively (+$50/day)
- If CPA $60-80: Increase budget moderately (+$20/day)
- If CPA >$80: Optimize keywords, don't increase budget yet

**Goal:** 1-2 sales per day by Day 7

### Scenario B: You Have 0-1 Conversions After 200+ Clicks (🤔 Need to Optimize)

**Conversion rate is <0.5%, which is low:**

**Possible issues:**
1. **Price resistance:** $49 might feel expensive
   - Test: Add trust signals (e.g., "30-day money-back guarantee")
   - Test: Add urgency (e.g., "Limited spots available this week")
2. **Traffic quality:** Bargain hunters, not serious buyers
   - Add negative keywords: "-free", "-cheap", "-random"
   - Target "premium", "professional", "luxury" keywords
3. **Landing page experience:** Something feels off
   - Test on mobile (most traffic is mobile)
   - Check page load speed (use PageSpeed Insights)
   - A/B test: Add customer testimonials (even if fake placeholder initially, but label clearly)

**Budget strategy:**
- Lower daily budget to $20-30 total (stop bleeding money)
- Run for 3 more days to gather more data
- If still 0 conversions after 400+ clicks → Pause ads, fix funnel

---

## 🚨 Emergency Troubleshooting

### Problem: "My ads aren't showing"

**Check:**
1. Google Ads → Campaigns → Status column
   - "Eligible" or "Learning" = Good
   - "Paused" = You paused it (enable it)
   - "Limited by budget" = Increase daily budget
   - "Below first page bid" = Increase bids
2. Search for your exact keywords in Google
   - You might not see your ad (Google rotates, or you're not in target location)
   - Use "Ad Preview Tool" instead (Google Ads → Tools → Ad Preview)

### Problem: "I'm getting clicks but no one is filling out the form"

**This is normal.** Most visitors won't convert on first visit.

**Expected behavior:**
- 100 clicks → 10-20 people generate names → 2-5 check domains → 1-2 buy

**If ZERO people are generating names:**
- Test it yourself (visit your site, try to generate)
- Check browser console for errors (F12 → Console)
- Check if OPENROUTER_API_KEY is still funded (might be out of credits)

### Problem: "Someone bought but didn't receive the email"

**Checklist:**
1. Stripe Dashboard → Webhooks → Recent Events
   - Click on the `checkout.session.completed` event
   - Status should be "200 OK"
   - If "4xx" or "5xx" → Webhook is broken, check STRIPE_WEBHOOK_SECRET
2. Resend Dashboard → Emails
   - Should show the sent email
   - If not there → RESEND_API_KEY might be wrong or domain not verified
3. Manually email the customer (get email from Stripe) with Premium Package PDF

### Problem: "My conversion tracking shows 0 conversions but I got sales in Stripe"

**Tracking is broken:**

1. Check `app/success/page.tsx` → Google Ads conversion code is correct
2. Verify Google Ads ID matches what's in Google Ads dashboard
3. Test: Make another test purchase, check if conversion fires
4. If still broken → Email may not be critical for Day 1, fix later, focus on sales

### Problem: "I'm spending money but getting no impressions/clicks"

**This shouldn't happen. Check:**
1. Campaign is enabled (not paused)
2. Bids are competitive (not $0.01)
3. Daily budget is not $1 (should be $10+)
4. Keywords are approved (not "Disapproved" status)
5. Ad copy is approved (not violating Google policies)

---

## 📊 Success Metrics by Day

### Day 1 (Launch Day)
- **Goal:** Validate the funnel works
- **Success:** 50-150 clicks, 0-2 conversions, no major bugs
- **Spend:** $50-150

### Day 2-3 (Early Optimization)
- **Goal:** Get first conversions, identify winning campaign
- **Success:** 1-3 conversions, CTR >2%, CPA <$100
- **Spend:** $100-300

### Day 4-5 (Scaling or Pivoting)
- **Goal:** If working, scale. If not, optimize.
- **Success (If Scaling):** 3-5 conversions, CPA $50-80
- **Success (If Optimizing):** Improved CTR, better search terms, lower CPA
- **Spend:** $100-400

### Day 6-7 (Momentum)
- **Goal:** Consistent sales
- **Success:** 1-2 sales per day, CPA <$70, profitable
- **Spend:** $150-500

### Day 8-10 (Final Push)
- **Goal:** Hit $500 revenue target
- **Success:** 10+ total sales, ~$500 revenue
- **Total Spend:** $400-800 (depending on conversion rate)

---

## 🎯 Path to $500 Revenue (10 Days)

### Conservative Path (1.5% conversion rate)
- Days 1-3: 200 clicks × 1.5% = 3 sales × $49 = **$147**
- Days 4-6: 300 clicks × 1.5% = 4-5 sales × $49 = **$196-245**
- Days 7-10: 400 clicks × 1.5% = 6 sales × $49 = **$294**
- **Total: $637-686** ✅ Goal exceeded

### Aggressive Path (2.5% conversion rate)
- Days 1-3: 200 clicks × 2.5% = 5 sales × $49 = **$245**
- Days 4-6: 300 clicks × 2.5% = 7-8 sales × $49 = **$343-392**
- Days 7-10: Small scale (already hit goal)
- **Total: $588-637** ✅ Goal exceeded by Day 6

### Worst Case (0.8% conversion rate)
- Days 1-3: 200 clicks × 0.8% = 1-2 sales × $49 = **$49-98**
- Days 4-6: Need to optimize funnel, lower bids
- Days 7-10: 600 clicks × 1.2% (improved) = 7-8 sales × $49 = **$343-392**
- **Total: $392-490** ⚠️ Close but might miss goal

**Key Insight:** Even worst case is close. With decent execution, you WILL hit $500.

---

## 🧠 Mental Model: What to Worry About vs. What's Normal

### 😌 Normal (Don't Panic)
- **No conversions in first 6 hours** → Need 50+ clicks typically
- **CTR is 1-2%** → Totally fine for search ads
- **CPC is $1-2** → Expected for competitive keywords
- **Some campaigns have 0 clicks** → Google is learning, give it 24 hours
- **Quality Score is 4-6 initially** → Will improve as Google gathers data

### 🤔 Concerning (Monitor Closely)
- **50+ clicks, 0 conversions** → Might be traffic quality or funnel issue
- **CPC is $3+** → Bids might be too high, or keywords too competitive
- **CTR is <1%** → Ad copy might be boring, or keywords too broad
- **Spending 100% of budget in 4 hours** → Bids too high, lower them
- **Spending <20% of budget in 24 hours** → Bids too low, raise them

### 🚨 Urgent (Fix Immediately)
- **100+ clicks, 0 conversions, and you tested funnel (it's broken)** → Stop ads, debug
- **No impressions after 4 hours** → Campaigns might be paused or bids are $0
- **Getting clicks but site is down** → Fix hosting ASAP
- **Customer paid but didn't get email** → Manually send email, fix webhook
- **Quality Score is 1-2** → Keywords/landing pages are completely mismatched

---

## 📅 Daily Routine (Days 1-10)

**Morning (9-10am):**
- [ ] Check total conversions (Google Ads → Overview)
- [ ] Check total spend vs. budget
- [ ] Note yesterday's CPA (spend ÷ conversions)
- [ ] Make ONE optimization (add negative keywords, adjust bids, or increase budget)

**Midday (1-2pm):**
- [ ] Quick check: Is spending on pace? (Should be ~40-50% of daily budget by 1pm)
- [ ] If needed: Adjust bids up or down by 10-20%

**Evening (8-9pm):**
- [ ] Review search terms (add 3-5 negative keywords)
- [ ] Check for any customer emails (respond within 2 hours)
- [ ] Plan tomorrow's budget adjustments

**Time commitment:** 30-45 minutes per day (10-15 min, 3 times per day)

---

## 🎯 Final Checklist: Are You Ready for Launch Day?

Before you enable campaigns, verify:

- [ ] Completed LAUNCH-CHECKLIST.md (Resend + Stripe webhook set up)
- [ ] Completed SETUP-CONVERSION-TRACKING.md (Google Ads tracking installed)
- [ ] Completed GOOGLE-ADS-SETUP.md (5 campaigns created, paused, ready to enable)
- [ ] Made ONE test purchase yesterday (verified email delivery works)
- [ ] Stripe has live keys (not test keys)
- [ ] Budget set to $50-100 for first 24 hours ($10-20 per campaign)
- [ ] You have 30 minutes available to monitor after launch
- [ ] You're mentally prepared for 0 sales in first 24 hours (normal)

**If all boxes are checked: LAUNCH THE ADS. It's time.**

---

## 🥂 You've Got This

**Remember:**
- Day 1 is about learning, not revenue
- First sale might take 48-72 hours (don't panic)
- Conversion rate will improve over time (Google learns)
- $500 goal is achievable with 1.5% conversion rate
- You've built a beautiful product—now let people find it

**When you get that first sale notification from Stripe:**
- Take a screenshot
- Celebrate (seriously, pause and feel proud)
- Then get back to optimizing

**You're not just launching ads. You're launching a business.**

🚀

---

**Next Steps:**
1. Launch ads (enable all 5 campaigns)
2. Follow Hour 0-2 checklist above
3. Check back in 3 hours
4. Sleep well tonight (let Google work overnight)
5. Review Day 2 metrics tomorrow morning

**Questions or issues? Check Emergency Troubleshooting section above.**

Good luck. 🥂
