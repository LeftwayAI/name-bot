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
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#050505] relative overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-emerald-500 animate-pulse pointer-events-none" />

      <div className="max-w-2xl w-full rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8 md:p-12 relative z-10">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-white/[0.04] border border-emerald-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-emerald-400/90"
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
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white/90 text-center mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-center text-white/60 mb-8">
          Thank you for your purchase. Your Premium Name Package is ready!
        </p>

        {/* Order Details */}
        {nameName && domain && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 mb-8">
            <h2 className="font-medium text-lg mb-3 text-white/90">Your Purchase:</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-white/40">Name:</span>
                <span className="font-medium text-white/90">{nameName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-white/40">Domain:</span>
                <span className="font-medium text-white/90">{domain}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-white/40">Package:</span>
                <span className="font-medium text-white/90">Premium Name Package</span>
              </p>
              <div className="border-t border-white/[0.06] pt-2 mt-2">
                <p className="flex justify-between text-lg">
                  <span className="font-medium text-white/90">Total:</span>
                  <span className="font-medium text-white/90">$49.00</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Test Mode Notice (only visible when testing) */}
        {typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_RESEND_CONFIGURED && (
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] backdrop-blur-xl p-6 mb-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">⚙️</span>
              <div>
                <h3 className="font-medium text-lg mb-2 text-yellow-400/90">Test Mode Active</h3>
                <p className="text-sm text-white/60 mb-3">
                  Your payment was successful! However, email delivery is not yet configured.
                  <strong className="text-white/90"> Open browser console (F12)</strong> to see what email the customer would receive.
                </p>
                <p className="text-xs text-white/40">
                  To enable automatic email delivery, see <strong className="text-white/60">LAUNCH-CHECKLIST.md</strong> (25 min setup)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 mb-8">
          <h2 className="font-medium text-lg mb-3 text-white/90">What's Next?</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <span className="text-emerald-400/90 mr-2">✓</span>
              <p className="text-white/60">
                <strong className="text-white/90">Check your email</strong> - We've sent your Premium Name Package to the email address you provided during checkout.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-emerald-400/90 mr-2">✓</span>
              <p className="text-white/60">
                <strong className="text-white/90">Review your package</strong> - You'll receive a comprehensive branding guide including domain purchase instructions, social media strategy, and visual identity recommendations.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-emerald-400/90 mr-2">✓</span>
              <p className="text-white/60">
                <strong className="text-white/90">Secure your domain</strong> - Follow the step-by-step guide to claim your domain before someone else does!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 text-center px-8 py-3.5 font-medium rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%),
                linear-gradient(135deg, #10b981, #059669)
              `,
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: `
                0 2px 12px rgba(16, 185, 129, 0.12),
                inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)
              `
            }}
          >
            Generate More Names
          </Link>
          <a
            href="mailto:support@rose.glass"
            className="flex-1 text-center px-8 py-3.5 border border-white/[0.06] bg-transparent text-white/70 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.10] font-medium rounded-full transition-all active:scale-[0.98]"
          >
            Contact Support
          </a>
        </div>

        {/* Fine Print */}
        <p className="text-xs text-center text-white/40 mt-8">
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
