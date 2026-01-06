'use client';

import { useState } from 'react';
import Testimonials from './components/Testimonials';
import PricingTransparency from './components/PricingTransparency';

type DomainResult = {
  domain: string;
  available: boolean;
  checked: boolean;
};

type NameWithDomains = {
  name: string;
  domains: DomainResult[];
};

export default function Home() {
  const [description, setDescription] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [namesWithDomains, setNamesWithDomains] = useState<NameWithDomains[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingDomains, setCheckingDomains] = useState(false);
  const [error, setError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');
    setNames([]);
    setNamesWithDomains([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate names');
      }

      const data = await response.json();
      setNames(data.names);

      // Automatically check domain availability
      await checkDomains(data.names);
    } catch (err) {
      setError('Failed to generate names. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkDomains = async (namesToCheck: string[]) => {
    setCheckingDomains(true);

    try {
      const response = await fetch('/api/check-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ names: namesToCheck }),
      });

      if (!response.ok) {
        throw new Error('Failed to check domains');
      }

      const data = await response.json();
      setNamesWithDomains(data.results);
    } catch (err) {
      console.error('Domain check error:', err);
      // Don't show error to user, domain checking is a nice-to-have
    } finally {
      setCheckingDomains(false);
    }
  };

  const handleClaimName = async (nameName: string, domain: string) => {
    // Trigger "raise a glass" celebration moment
    setCelebrating(nameName);
    setTimeout(() => setCelebrating(null), 600);

    setCheckoutLoading(nameName);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nameName, domain }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to start checkout. Please try again.');
      setCheckoutLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-5xl w-full">
        {/* Header with rose logo */}
        <div className="text-center mb-20 pt-24 relative">
          {/* Subtle aurora glow effects */}
          <div className="aurora-glow aurora-glow-1" />
          <div className="aurora-glow aurora-glow-2" />

          <div className="inline-flex items-center gap-4 mb-10 hero-logo-entrance relative z-10">
            <span className="text-7xl md:text-8xl filter drop-shadow-xl">🌹</span>
            <h1 className="text-7xl md:text-9xl font-satoshi font-light text-rose-gradient tracking-tighter">
              rose.glass
            </h1>
          </div>
          <h2 className="text-4xl md:text-6xl font-satoshi font-light text-white/90 mb-6 leading-tight tracking-tighter px-4 hero-fade-in relative z-10" style={{animationDelay: '0.1s'}}>
            Perfect names for <br className="hidden md:block" />
            <span className="text-rose-gradient">exceptional brands</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-10 px-6 hero-fade-in relative z-10" style={{animationDelay: '0.2s'}}>
            AI-powered naming with instant domain availability.<br className="hidden md:block" />
            Get your complete brand identity package in minutes, not weeks.
          </p>

          {/* Value props - honest framing */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 hero-fade-in relative z-10" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-2 px-5 py-2.5 glass-card rounded-full">
              <span className="text-lg">✨</span>
              <span className="text-sm text-white/60">Free to generate</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 glass-card rounded-full">
              <span className="text-lg">⚡</span>
              <span className="text-sm text-white/60">Instant domains</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 glass-card rounded-full">
              <span className="text-lg">🛡️</span>
              <span className="text-sm text-white/60">Money-back guarantee</span>
            </div>
          </div>
        </div>

        {/* Generator card with glassmorphism */}
        <div id="generator" className="glass-card rounded-3xl p-8 md:p-10 mb-8 scroll-mt-24">
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-3 text-white/60">
              Describe your vision
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-5 py-4 glass-input rounded-2xl text-base focus:outline-none resize-none"
              placeholder="A sustainable luxury fashion brand for conscious consumers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-white/[0.02] border border-rose-500/20 text-rose-400/90 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full glass-button text-white font-medium py-4 px-8 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? 'Generating...' : '✨ Generate Names'}
          </button>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
            <div className="skeleton h-8 w-48 rounded-lg mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <div className="skeleton h-10 w-3/4 rounded-lg mb-3"></div>
                  <div className="skeleton h-6 w-1/2 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {names.length > 0 && !loading && (
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <div className="mb-6">
              <p className="text-sm font-satoshi font-light tracking-wide uppercase mb-2" style={{color: '#e63946'}}>
                Generated Names
              </p>
              <h2 className="text-3xl md:text-4xl font-satoshi font-light text-white/90">Your Perfect Matches</h2>
            </div>
            {checkingDomains && (
              <p className="text-sm text-white/40 mb-6">Checking domain availability...</p>
            )}
            <div className="grid grid-cols-1 gap-5 mt-6">
              {names.map((name, index) => {
                const nameData = namesWithDomains.find(n => n.name === name);
                const availableDomain = nameData?.domains.find(d => d.available && d.checked);

                return (
                  <div
                    key={index}
                    className={`glass-card rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 fade-in-up ${
                      celebrating === name ? 'celebrate' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="name-mono text-3xl md:text-4xl font-bold mb-3 text-white/90">
                          {name}
                        </p>
                        {availableDomain && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3 border border-emerald-500/20 bg-white/[0.02]">
                            <span className="text-emerald-400 text-lg">✓</span>
                            <p className="text-emerald-300/90 text-sm font-medium">
                              {availableDomain.domain} available
                            </p>
                          </div>
                        )}
                      </div>
                      {availableDomain && (
                        <button
                          onClick={() => handleClaimName(name, availableDomain.domain)}
                          disabled={checkoutLoading === name}
                          className="glass-button px-8 py-4 text-white font-medium rounded-full text-base disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {checkoutLoading === name ? 'Loading...' : '🥂 Claim for $49'}
                        </button>
                      )}
                    </div>
                    {nameData && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {nameData.domains.map((domain, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-3 py-1.5 rounded-lg font-medium border ${
                              domain.checked
                                ? domain.available
                                  ? 'bg-white/[0.02] text-emerald-300/80 border-emerald-500/20'
                                  : 'bg-white/[0.02] text-rose-400/70 border-rose-500/20'
                                : 'bg-white/[0.04] text-white/40 border-white/[0.06]'
                            }`}
                          >
                            {domain.domain}: {domain.checked ? (domain.available ? 'Available' : 'Taken') : 'Error'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div id="pricing" className="scroll-mt-24 mt-16">
          <div className="text-center mb-8">
            <p className="text-sm font-satoshi font-light tracking-wide uppercase mb-3" style={{color: '#e63946'}}>
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-satoshi font-light text-white/90 tracking-tight">
              Simple, transparent pricing
            </h2>
          </div>
          <PricingTransparency />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Features section */}
        <div className="mt-32 mb-20">
          <div className="text-center mb-16">
            <p className="text-sm font-satoshi font-light tracking-wide uppercase mb-3" style={{color: '#e63946'}}>
              What You Get
            </p>
            <h2 className="text-4xl md:text-5xl font-satoshi font-light mb-4 text-white/90 tracking-tight">
              Everything you need to launch
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Professional naming and brand strategy without the agency price tag
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass-card rounded-3xl p-10 hover:shadow-xl hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">✨</div>
              <h3 className="font-satoshi text-2xl mb-4 text-white/90">AI-Powered Names</h3>
              <p className="text-white/60 leading-relaxed text-base">
                Advanced AI creates unique, memorable names tailored to your brand vision and values. Every suggestion is crafted for maximum impact.
              </p>
            </div>
            <div className="glass-card rounded-3xl p-10 hover:shadow-xl hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="font-satoshi text-2xl mb-4 text-white/90">Instant Domains</h3>
              <p className="text-white/60 leading-relaxed text-base">
                Real-time domain availability across .com, .io, .app, and more. Find your perfect match instantly with live verification.
              </p>
            </div>
            <div className="glass-card rounded-3xl p-10 hover:shadow-xl hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🎁</div>
              <h3 className="font-satoshi text-2xl mb-4 text-white/90">Premium Package</h3>
              <p className="text-white/60 leading-relaxed text-base">
                Complete brand strategy guide with every name purchase. Launch-ready identity package delivered in minutes, not weeks.
              </p>
            </div>
          </div>

          {/* Trust guarantee */}
          <div className="mt-16 glass-card rounded-3xl p-8 md:p-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-8 h-8 text-emerald-400/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-2xl md:text-3xl font-satoshi text-white/90">100% Satisfaction Guaranteed</h3>
            </div>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Not happy with your name? Get a full refund within 7 days, no questions asked. We're committed to helping you find the perfect name for your brand.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 pb-8 border-t border-white/[0.06]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🌹</span>
              <span className="text-xl font-satoshi text-rose-gradient">rose.glass</span>
            </div>
            <p className="text-base text-white/40 mb-6">
              Premium AI-powered naming for exceptional brands
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-white/40">
              <span>Made with precision and care</span>
              <span>·</span>
              <a href="mailto:hello@rose.glass" className="hover:text-rose-red transition-colors">Contact</a>
              <span>·</span>
              <span>© 2026 rose.glass</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
