'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [nameName, setNameName] = useState<string>('');
  const [domain, setDomain] = useState<string>('');

  useEffect(() => {
    const nameParam = searchParams.get('name');
    const domainParam = searchParams.get('domain');
    const sessionId = searchParams.get('session_id');

    if (nameParam) setNameName(nameParam);
    if (domainParam) setDomain(domainParam);

    // Log email preview to console for testing without webhook configured
    if (nameParam && domainParam && typeof window !== 'undefined') {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 EMAIL PREVIEW (what customer receives after webhook processes)');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
      console.log('To: customer-email@example.com (from Stripe checkout)');
      console.log(`From: Rose Glass <orders@rose.glass>`);
      console.log(`Subject: Your Premium Name Package: ${nameParam}`);
      console.log('');
      console.log('Content Preview:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🎉 Your Premium Name Package`);
      console.log(`${nameParam}`);
      console.log(`${domainParam}`);
      console.log('');
      console.log('📋 Brand Strategy Overview');
      console.log('🌐 Domain Acquisition Guide');
      console.log('📱 Social Media Handle Report');
      console.log('🎨 Visual Identity Recommendations');
      console.log('📧 Brand Announcement Email Templates');
      console.log('⚖️ Trademark Search Guidance');
      console.log('✅ 30-Day Launch Checklist');
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📌 NOTE: This is a PREVIEW. Email will be sent automatically when:');
      console.log('   1. RESEND_API_KEY is configured in Vercel');
      console.log('   2. STRIPE_WEBHOOK_SECRET is configured in Vercel');
      console.log('   3. Stripe webhook is set up to notify rose.glass/api/webhook');
      console.log('');
      console.log('✅ See LAUNCH-CHECKLIST.md for setup instructions (25 minutes)');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Store in sessionStorage for display on page
      sessionStorage.setItem('emailPreview', JSON.stringify({
        to: 'customer-email@example.com',
        from: 'Rose Glass <orders@rose.glass>',
        subject: `Your Premium Name Package: ${nameParam}`,
        name: nameParam,
        domain: domainParam
      }));
    }

    // Google Ads Conversion Tracking
    // Replace AW-XXXXXXXXX/XXXXXXX with your actual conversion ID from Google Ads
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-XXXXXXXXX/XXXXXXX', // TODO: Replace with your Google Ads conversion ID
        'value': 49.0,
        'currency': 'USD',
        'transaction_id': nameParam || ''
      });
    }

    // Facebook Pixel (optional - for Meta Ads if you decide to run them)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 49.0,
        currency: 'USD'
      });
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your purchase. Your Premium Name Package is ready!
        </p>

        {/* Order Details */}
        {nameName && domain && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-lg mb-3">Your Purchase:</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <span className="font-bold">{nameName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Domain:</span>
                <span className="font-bold">{domain}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Package:</span>
                <span className="font-bold">Premium Name Package</span>
              </p>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                <p className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">$49.00</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Test Mode Notice (only visible when testing) */}
        {typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_RESEND_CONFIGURED && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">⚙️</span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-yellow-900 dark:text-yellow-100">Test Mode Active</h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                  Your payment was successful! However, email delivery is not yet configured.
                  <strong> Open browser console (F12)</strong> to see what email the customer would receive.
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  To enable automatic email delivery, see <strong>LAUNCH-CHECKLIST.md</strong> (25 min setup)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-lg mb-3">What's Next?</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <p>
                <strong>Check your email</strong> - We've sent your Premium Name Package to the email address you provided during checkout.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <p>
                <strong>Review your package</strong> - You'll receive a comprehensive branding guide including domain purchase instructions, social media strategy, and visual identity recommendations.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <p>
                <strong>Secure your domain</strong> - Follow the step-by-step guide to claim your domain before someone else does!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Generate More Names
          </Link>
          <a
            href="mailto:support@rose.glass"
            className="flex-1 text-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-lg transition-colors"
          >
            Contact Support
          </a>
        </div>

        {/* Fine Print */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-8">
          If you don't receive your email within 10 minutes, please check your spam folder or contact us at support@rose.glass
        </p>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
