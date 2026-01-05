#!/usr/bin/env ts-node
/**
 * Conversion Tracking Verification Script
 *
 * Run this to check if Google Ads conversion tracking is properly configured.
 *
 * Usage: npx ts-node scripts/check-conversion-tracking.ts
 */

import fs from 'fs';
import path from 'path';

interface CheckResult {
  pass: boolean;
  message: string;
  details?: string;
}

function checkFile(filePath: string, checks: { pattern: RegExp; name: string }[]): CheckResult[] {
  const results: CheckResult[] = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    for (const check of checks) {
      const match = content.match(check.pattern);

      if (match && match[0].includes('AW-XXXXXXXXX')) {
        results.push({
          pass: false,
          message: `❌ ${check.name}`,
          details: `Still has placeholder "AW-XXXXXXXXX" - needs to be replaced with your actual Google Ads ID`
        });
      } else if (match && !match[0].includes('AW-XXXXXXXXX')) {
        results.push({
          pass: true,
          message: `✅ ${check.name}`,
          details: `Found: ${match[0].trim()}`
        });
      } else {
        results.push({
          pass: false,
          message: `❌ ${check.name}`,
          details: `Pattern not found in file`
        });
      }
    }
  } catch (error) {
    results.push({
      pass: false,
      message: `❌ Cannot read ${filePath}`,
      details: String(error)
    });
  }

  return results;
}

async function main() {
  console.log('\n🔍 Checking Google Ads Conversion Tracking Configuration...\n');

  const allResults: CheckResult[] = [];

  // Check app/layout.tsx
  console.log('📄 Checking app/layout.tsx:');
  const layoutChecks = checkFile(
    path.join(process.cwd(), 'app/layout.tsx'),
    [
      {
        pattern: /src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=(AW-[^"]+)"/,
        name: 'Google Ads gtag.js script source (line ~30)'
      },
      {
        pattern: /gtag\('config',\s*'(AW-[^']+)'\);/,
        name: 'Google Ads config ID (line ~38)'
      }
    ]
  );

  layoutChecks.forEach(result => {
    allResults.push(result);
    console.log(`  ${result.message}`);
    if (result.details) {
      console.log(`    ${result.details}`);
    }
  });

  console.log('\n📄 Checking app/success/page.tsx:');
  const successChecks = checkFile(
    path.join(process.cwd(), 'app/success/page.tsx'),
    [
      {
        pattern: /'send_to':\s*'(AW-[^']+)'/,
        name: 'Google Ads conversion tracking ID (line ~67)'
      }
    ]
  );

  successChecks.forEach(result => {
    allResults.push(result);
    console.log(`  ${result.message}`);
    if (result.details) {
      console.log(`    ${result.details}`);
    }
  });

  // Summary
  const passCount = allResults.filter(r => r.pass).length;
  const totalCount = allResults.length;

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Summary: ${passCount}/${totalCount} checks passed\n`);

  if (passCount === totalCount) {
    console.log('✅ SUCCESS: Conversion tracking is fully configured!\n');
    console.log('Next steps:');
    console.log('1. Deploy to Vercel: git push origin main');
    console.log('2. Test with Stripe test card: 4242 4242 4242 4242');
    console.log('3. Verify conversion appears in Google Ads dashboard');
    console.log('4. Launch your campaigns!\n');
    process.exit(0);
  } else {
    console.log('⚠️  INCOMPLETE: Conversion tracking needs configuration\n');
    console.log('What to do:');
    console.log('1. Open FIX-CONVERSION-TRACKING.md');
    console.log('2. Follow the 15-minute setup guide');
    console.log('3. Get your Google Ads IDs from ads.google.com');
    console.log('4. Update the placeholder IDs in the files above');
    console.log('5. Run this script again to verify\n');
    process.exit(1);
  }
}

main();
