# Stripe Webhook Setup Guide

This guide walks through setting up the Stripe webhook to automatically deliver the Premium Name Package after payment.

## Prerequisites

- Stripe account with live mode enabled
- Resend account for sending emails
- Access to Vercel environment variables

## Step 1: Get Resend API Key

1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Verify your domain `rose.glass` in Resend dashboard:
   - Add DNS records (TXT, MX, CNAME)
   - This allows sending from `orders@rose.glass`
3. Create API key at https://resend.com/api-keys
4. Save the key (starts with `re_`)

## Step 2: Add Environment Variables to Vercel

Go to Vercel project settings > Environment Variables and add:

```bash
# Already configured (if not, add these)
STRIPE_SECRET_KEY=sk_live_your_actual_key_here
OPENROUTER_API_KEY=your_openrouter_key_here

# NEW - Add these
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here  # Get in Step 3
RESEND_API_KEY=re_your_resend_key_here                # From Step 1
```

## Step 3: Create Stripe Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Set endpoint URL: `https://rose.glass/api/webhook`
4. Select events to listen for:
   - ✅ `checkout.session.completed`
5. Click "Add endpoint"
6. Click on the newly created webhook
7. Click "Reveal" next to "Signing secret"
8. Copy the secret (starts with `whsec_`)
9. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`

## Step 4: Deploy & Test

### Deploy the changes
```bash
git add .
git commit -m "Add Stripe webhook for Premium Package delivery"
git push
```

Vercel will auto-deploy.

### Test with Stripe CLI (Local Testing)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# or download from https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local endpoint
stripe listen --forward-to localhost:3000/api/webhook

# Trigger a test payment
stripe trigger checkout.session.completed
```

### Test in Production

1. Create a test checkout with Stripe test mode:
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any CVC
2. Complete the checkout
3. Check Stripe Dashboard > Webhooks > [Your webhook] > "Recent deliveries"
   - Should see successful delivery (HTTP 200)
4. Check the email inbox for the test email address
   - Should receive "Your Premium Name Package" email

## Step 5: Verify Domain with Resend

**CRITICAL:** Until you verify `rose.glass` with Resend, emails will only send to verified addresses.

### DNS Records to Add:

Resend will provide these in their dashboard. Example records:

```
Type: TXT
Name: rose.glass
Value: resend-verify=xxxxxxxxxxxxx

Type: MX
Name: rose.glass
Priority: 10
Value: mx.resend.com

Type: CNAME
Name: resend._domainkey.rose.glass
Value: resend._domainkey.resend.com
```

Add these to your domain registrar (Cloudflare, Namecheap, etc.)

Wait 5-10 minutes for DNS propagation, then click "Verify" in Resend.

## Troubleshooting

### Webhook Returns 500
- Check Vercel logs for error details
- Verify `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are set correctly
- Ensure environment variables are added to "Production" environment

### Email Not Sending
- Check `RESEND_API_KEY` is set in Vercel
- Verify domain in Resend dashboard (see Step 5)
- Check Resend dashboard > Logs for delivery status
- If domain not verified, only emails to verified addresses will send

### Webhook Signature Verification Failed
- Ensure `STRIPE_WEBHOOK_SECRET` matches the webhook in Stripe Dashboard
- Don't mix test mode and live mode secrets

### No Email Received
- Check spam folder
- Verify customer email in Stripe Dashboard > Payments > [Payment] > Customer details
- Check Resend logs for delivery errors
- Ensure domain is verified in Resend

## What the Customer Receives

When someone pays $49, they instantly receive an email with:

1. **Brand Strategy Overview** - How to leverage their chosen name
2. **Domain Acquisition Guide** - Step-by-step to secure the domain
3. **Social Media Handle Report** - Recommended handles across all platforms
4. **Visual Identity Recommendations** - Color palettes, typography, logo creation
5. **Brand Announcement Email Templates** - Ready-to-use launch emails
6. **Trademark Search Guidance** - How to check trademark availability
7. **30-Day Launch Checklist** - Week-by-week action plan

All delivered as a beautiful HTML email they can reference forever.

## Next Steps After Setup

1. ✅ Test end-to-end flow with test mode
2. ✅ Switch Stripe to live mode
3. ✅ Start driving traffic (Google Ads, social media)
4. Monitor Stripe Dashboard for payments
5. Monitor Resend Dashboard for email deliveries
6. Manually check first few orders to ensure quality

## Monitoring

- **Stripe Dashboard > Webhooks** - Monitor webhook delivery success rate
- **Resend Dashboard > Logs** - Monitor email delivery status
- **Vercel Logs** - Monitor server errors and webhook processing

## Support

If you encounter issues:
- Stripe: https://support.stripe.com
- Resend: https://resend.com/support
- Vercel: https://vercel.com/support
