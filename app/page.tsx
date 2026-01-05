'use client';

import { useState } from 'react';
import Testimonials from './components/Testimonials';

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
    <main className="min-h-screen bg-rose-gradient flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-5xl w-full">
        {/* Header with rose logo */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="text-6xl md:text-7xl">🌹</span>
            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-rose-accent">
              rose.glass
            </h1>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
            Perfect names for <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-rose-accent">exceptional brands</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            AI-powered naming with instant domain availability. Get your complete brand identity package in minutes, not weeks.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-rose-accent flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-gray-900">S</div>
              <div className="w-8 h-8 rounded-full bg-rose-coral flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-gray-900">M</div>
              <div className="w-8 h-8 rounded-full bg-rose-red flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-gray-900">E</div>
            </div>
            <span className="font-medium">Trusted by 500+ founders</span>
          </div>
        </div>

        {/* Generator card with glassmorphism */}
        <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
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
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full glass-button text-white font-bold py-4 px-8 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">Your Names</h2>
            {checkingDomains && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Checking domain availability...</p>
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
                        <p className="name-mono text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                          {name}
                        </p>
                        {availableDomain && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg mb-3">
                            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
                            <p className="text-green-700 dark:text-green-300 text-sm font-semibold">
                              {availableDomain.domain} available
                            </p>
                          </div>
                        )}
                      </div>
                      {availableDomain && (
                        <button
                          onClick={() => handleClaimName(name, availableDomain.domain)}
                          disabled={checkoutLoading === name}
                          className="glass-button px-8 py-4 text-white font-bold rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
                            className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                              domain.checked
                                ? domain.available
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
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

        {/* Testimonials */}
        <Testimonials />

        {/* Features section */}
        <div className="mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            Everything you need to launch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-100">AI-Powered</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Advanced AI creates unique, memorable names tailored to your brand vision and values
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-100">Instant Domains</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Real-time domain availability across .com, .io, .app, and more. Find your perfect match instantly
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-100">Premium Package</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Complete brand strategy guide with every name purchase. Launch-ready identity in minutes
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Made with precision and care · <a href="https://rose.glass" className="hover:text-rose-red transition-colors">rose.glass</a></p>
        </div>
      </div>
    </main>
  );
}
