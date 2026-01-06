'use client';

import Link from 'next/link';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-md w-full pt-24">
        <div className="text-center mb-8">
          <span className="text-6xl mb-6 block">🌹</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white/90 mb-4">
            Account
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/60">
            Coming soon
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 text-center">
          <p className="text-gray-700 dark:text-white/60 mb-6">
            Account management is on its way. Soon you'll be able to:
          </p>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-emerald-400/90">✓</span>
              <span className="text-gray-700 dark:text-white/70">View your generated names history</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400/90">✓</span>
              <span className="text-gray-700 dark:text-white/70">Download purchased brand packages</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400/90">✓</span>
              <span className="text-gray-700 dark:text-white/70">Save favorite names for later</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400/90">✓</span>
              <span className="text-gray-700 dark:text-white/70">Manage your subscription</span>
            </li>
          </ul>
          <Link
            href="/"
            className="glass-button inline-block px-6 py-3 rounded-xl text-white font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            ← Back to Generator
          </Link>
        </div>
      </div>
    </main>
  );
}
