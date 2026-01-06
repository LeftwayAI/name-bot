'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌹</span>
            <span className="text-xl font-medium text-rose-gradient">rose.glass</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#generator"
              className="text-sm font-medium text-white/60 hover:text-white/90 transition-colors"
            >
              Generate
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-white/60 hover:text-white/90 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/account"
              className="text-sm font-medium text-white/60 hover:text-white/90 transition-colors"
            >
              Account
            </Link>
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
            <Link
              href="/#generator"
              className="glass-button px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white/60"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 glass-card rounded-2xl p-4 space-y-3">
            <Link
              href="/#generator"
              className="block px-4 py-2 text-sm font-medium text-white/60 hover:text-white/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Generate
            </Link>
            <Link
              href="/#pricing"
              className="block px-4 py-2 text-sm font-medium text-white/60 hover:text-white/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/account"
              className="block px-4 py-2 text-sm font-medium text-white/60 hover:text-white/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Account
            </Link>
            <Link
              href="/#generator"
              className="block glass-button px-4 py-2 rounded-full text-white text-sm font-medium text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
