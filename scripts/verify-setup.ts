#!/usr/bin/env tsx

/**
 * Setup Verification Script for rose.glass
 *
 * This script checks all environment variables and service configurations
 * to ensure everything is ready for launch.
 *
 * Run: npx tsx scripts/verify-setup.ts
 */

import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  fix?: string;
}

const results: CheckResult[] = [];

function check(name: string, condition: boolean, message: string, fix?: string) {
  results.push({
    name,
    status: condition ? 'pass' : 'fail',
    message,
    fix,
  });
}

function warn(name: string, message: string, fix?: string) {
  results.push({
    name,
    status: 'warning',
    message,
    fix,
  });
}

console.log('🔍 Verifying rose.glass setup...\n');

// 1. Check OpenRouter API Key (for AI name generation)
const openrouterKey = process.env.OPENROUTER_API_KEY;
check(
  'OpenRouter API',
  !!openrouterKey && openrouterKey.startsWith('sk-or-'),
  openrouterKey
    ? '✓ OPENROUTER_API_KEY is set'
    : '✗ OPENROUTER_API_KEY is missing',
  'Get your key at https://openrouter.ai/keys and add to Vercel environment variables'
);

// 2. Check Stripe Secret Key (for payments)
const stripeKey = process.env.STRIPE_SECRET_KEY;
check(
  'Stripe Secret Key',
  !!stripeKey && (stripeKey.startsWith('sk_test_') || stripeKey.startsWith('sk_live_')),
  stripeKey
    ? '✓ STRIPE_SECRET_KEY is set'
    : '✗ STRIPE_SECRET_KEY is missing',
  'Get your key at https://dashboard.stripe.com/apikeys and add to Vercel environment variables'
);

if (stripeKey?.startsWith('sk_test_')) {
  warn(
    'Stripe Mode',
    '⚠ Using TEST mode (sk_test_*)',
    'Switch to live key (sk_live_*) when ready for real payments'
  );
}

// 3. Check Stripe Webhook Secret (for payment notifications)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
check(
  'Stripe Webhook',
  !!webhookSecret && webhookSecret.startsWith('whsec_'),
  webhookSecret
    ? '✓ STRIPE_WEBHOOK_SECRET is set'
    : '✗ STRIPE_WEBHOOK_SECRET is missing',
  'Follow LAUNCH-CHECKLIST.md Step 3 to set up webhook at https://dashboard.stripe.com/webhooks'
);

// 4. Check Resend API Key (for sending emails)
const resendKey = process.env.RESEND_API_KEY;
check(
  'Resend Email API',
  !!resendKey && resendKey.startsWith('re_'),
  resendKey
    ? '✓ RESEND_API_KEY is set'
    : '✗ RESEND_API_KEY is missing',
  'Follow LAUNCH-CHECKLIST.md Step 1 to set up at https://resend.com/api-keys'
);

// 5. Check if we're in production environment
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv !== 'production') {
  warn(
    'Environment',
    `⚠ NODE_ENV is "${nodeEnv}" (expected "production")`,
    'This is OK for local testing, but ensure Vercel deployment has NODE_ENV=production'
  );
}

// Print results
console.log('\n📋 Setup Verification Results:\n');
console.log('═'.repeat(70));

let hasFailures = false;
let hasWarnings = false;

for (const result of results) {
  const icon = result.status === 'pass' ? '✓' : result.status === 'fail' ? '✗' : '⚠';
  const color = result.status === 'pass' ? '\x1b[32m' : result.status === 'fail' ? '\x1b[31m' : '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${color}${icon}${reset} ${result.name}`);
  console.log(`  ${result.message}`);

  if (result.fix) {
    console.log(`  ${color}→ Fix: ${result.fix}${reset}`);
  }
  console.log('');

  if (result.status === 'fail') hasFailures = true;
  if (result.status === 'warning') hasWarnings = true;
}

console.log('═'.repeat(70));

// Summary
if (hasFailures) {
  console.log('\n❌ Setup is INCOMPLETE. Fix the errors above before launching.\n');
  console.log('📖 See LAUNCH-CHECKLIST.md for step-by-step instructions.\n');
  process.exit(1);
} else if (hasWarnings) {
  console.log('\n⚠️  Setup is FUNCTIONAL but has warnings.\n');
  console.log('   You can proceed, but consider addressing the warnings.\n');
  process.exit(0);
} else {
  console.log('\n✅ All checks passed! Your setup is ready for launch.\n');
  console.log('🚀 Next steps:');
  console.log('   1. Deploy to Vercel (if not already deployed)');
  console.log('   2. Test the full funnel at https://rose.glass');
  console.log('   3. Launch traffic (see LAUNCH-CHECKLIST.md Step 5)\n');
  process.exit(0);
}
