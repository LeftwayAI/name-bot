export default function PricingTransparency() {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-10 mb-8 border-2 border-rose-red/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="text-4xl">💎</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Premium Package - $49
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            When you find the perfect name, secure it with our all-in-one package
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl flex-shrink-0">✓</span>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Domain Registration Guide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step instructions for claiming your domain</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl flex-shrink-0">✓</span>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Brand Strategy Guide</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Professional branding tips customized for your name</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl flex-shrink-0">✓</span>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Logo Design Ideas</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-generated logo concepts to kickstart your brand</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl flex-shrink-0">✓</span>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Social Media Username Checker</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ensure consistent branding across platforms</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl flex-shrink-0">✓</span>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Trademark Search Report</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Preliminary trademark availability check</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl flex-shrink-0">✓</span>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Instant Email Delivery</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get everything sent to your inbox immediately</p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 bg-green-50/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            100% Money-Back Guarantee
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">
          Not satisfied? Get a full refund within 7 days, no questions asked.
        </p>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
        <strong>How it works:</strong> Generate names for free → Check domain availability → Claim your favorite name for $49 → Receive instant email with all guides and resources
      </p>
    </div>
  );
}
