'use client';

import { useState } from 'react';
import PricingTransparency from '../components/PricingTransparency';
import SampleNames from '../components/SampleNames';

type DomainResult = {
  domain: string;
  available: boolean;
  checked: boolean;
};

type NameWithDomains = {
  name: string;
  domains: DomainResult[];
};

export default function StartupNameIdeas() {
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
    <main className="min-h-screen bg-[#050505] flex flex-col items-center p-6 md:p-12">
      <div className="max-w-5xl w-full">
        {/* Header with rose logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-5xl">🌹</span>
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-rose-accent">
              rose.glass
            </h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Startup Name Ideas Generator
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Get creative, memorable startup name ideas powered by AI. Perfect for tech startups,
            SaaS companies, and innovative ventures looking to make their mark.
          </p>
        </div>

        {/* Generator card with glassmorphism */}
        <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Describe your startup idea
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-5 py-4 glass-input rounded-2xl text-base focus:outline-none resize-none"
              placeholder="E.g., A SaaS platform that helps remote teams collaborate on design projects in real-time..."
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
            className="w-full glass-button text-white font-medium py-4 px-8 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            {loading ? 'Generating...' : '✨ Generate Startup Names'}
          </button>
        </div>

        {names.length > 0 && (
          <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">Your Startup Names</h2>
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
                    className={`glass-card rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 ${
                      celebrating === name ? 'celebrate' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="name-mono text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                          {name}
                        </p>
                        {availableDomain && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3 border border-emerald-500/20 bg-white/[0.02]">
                            <span className="text-emerald-400 text-lg">✓</span>
                            <p className="text-emerald-300/90 text-sm font-semibold">
                              {availableDomain.domain} available
                            </p>
                          </div>
                        )}
                      </div>
                      {availableDomain && (
                        <button
                          onClick={() => handleClaimName(name, availableDomain.domain)}
                          disabled={checkoutLoading === name}
                          className="glass-button px-8 py-4 text-white font-medium rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
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

        {/* Sample Names Showcase */}
        <SampleNames
          industry="startups like yours"
          examples={[
            { name: 'Synthara', style: 'Tech-forward invented name' },
            { name: 'RocketFlow', style: 'Dynamic compound name' },
            { name: 'Zephyr AI', style: 'Modern & lightweight' },
            { name: 'NexusHub', style: 'Connectivity-focused' },
            { name: 'Valtrix', style: 'Unique & memorable' },
            { name: 'StreamForge', style: 'Action-oriented tech' },
          ]}
        />

        {/* Pricing Transparency */}
        <PricingTransparency />

        {/* SEO Content - Keeping existing content with glass styling */}
        <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">What Makes a Great Startup Name?</h2>

          <div className="space-y-6 mb-8 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Your startup's name is often the first impression potential customers, investors, and partners
              will have of your company. A great startup name should be memorable, pronounceable, and
              convey something about your brand's personality or mission.
            </p>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Key Characteristics</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-rose-red mr-2 text-lg">✓</span>
                  <span><strong>Short and Simple:</strong> Easy to spell, say, and remember</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-red mr-2 text-lg">✓</span>
                  <span><strong>Unique:</strong> Stands out from competitors and avoids trademark issues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-red mr-2 text-lg">✓</span>
                  <span><strong>Scalable:</strong> Works as your startup grows and potentially pivots</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-red mr-2 text-lg">✓</span>
                  <span><strong>Domain Available:</strong> Matching .com or modern TLD is available</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Why Use AI for Startup Naming?</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Speed</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate hundreds of creative options in seconds instead of weeks of brainstorming
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Creativity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI explores naming patterns and combinations you might never think of
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Data-Driven</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Trained on successful startup names across industries and markets
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Context-Aware</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Understands your industry, target market, and brand positioning
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-rose-pink/30 to-white/30 dark:from-rose-red/10 dark:to-gray-800/30">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Ready to Launch?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our AI analyzes your startup concept and generates names that resonate with your vision.
              Start generating above and find the perfect name that will help your startup stand out
              and succeed in 2026 and beyond.
            </p>
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
