'use client';

import { useState } from 'react';

type DomainResult = {
  domain: string;
  available: boolean;
  checked: boolean;
};

type NameWithDomains = {
  name: string;
  domains: DomainResult[];
};

export default function BusinessNameGenerator() {
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
    <main className="min-h-screen bg-rose-gradient flex flex-col items-center p-6 md:p-12">
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
            Business Name Generator
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Generate unique, professional business names instantly with AI. Perfect for startups,
            entrepreneurs, and small businesses looking for the perfect name.
          </p>
        </div>

        {/* Generator card with glassmorphism */}
        <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Describe your business
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-5 py-4 glass-input rounded-2xl text-base focus:outline-none resize-none"
              placeholder="E.g., An online marketplace for handmade crafts and artisanal goods..."
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
            {loading ? 'Generating...' : '✨ Generate Business Names'}
          </button>
        </div>

        {names.length > 0 && (
          <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">Your Business Names</h2>
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

        {/* SEO Content Section */}
        <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">How to Choose the Perfect Business Name</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Keep It Simple</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                The best business names are easy to spell, pronounce, and remember. Avoid complex
                words or unusual spellings that might confuse potential customers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Make It Memorable</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A memorable name helps your business stand out. Consider using alliteration,
                rhythm, or unique word combinations that stick in people's minds.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Check Domain Availability</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Before finalizing your business name, verify that the matching domain name is
                available. A consistent online presence starts with a matching domain.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Consider SEO</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Think about how customers will search for your business online. Including relevant
                keywords can help with search engine visibility.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Why Use an AI Business Name Generator?</h2>

          <div className="glass-card rounded-2xl p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-rose-red mr-2 text-lg">✓</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>Save Time:</strong> Generate hundreds of creative names in seconds instead of brainstorming for hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-red mr-2 text-lg">✓</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>AI-Powered Creativity:</strong> Our advanced AI understands your business concept and creates relevant, unique names</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-red mr-2 text-lg">✓</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>Industry-Specific:</strong> Get names tailored to your specific industry and target market</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-red mr-2 text-lg">✓</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>100% Free:</strong> No hidden fees, no signup required - just enter your description and get instant results</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Popular Business Name Styles</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Descriptive Names</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Names that clearly describe what your business does
              </p>
              <p className="text-xs text-gray-500">Examples: PayPal, Facebook, General Motors</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Invented Names</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Unique made-up words that are brand new
              </p>
              <p className="text-xs text-gray-500">Examples: Google, Kodak, Xerox</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Compound Names</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Two words combined to create something new
              </p>
              <p className="text-xs text-gray-500">Examples: Microsoft, YouTube, Snapchat</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Tips for Testing Your Business Name</h2>

          <ol className="space-y-3 mb-8 text-gray-700 dark:text-gray-300">
            <li className="pl-4">
              <strong>1. Say it out loud:</strong> Does it sound good when spoken? Is it easy to pronounce?
            </li>
            <li className="pl-4">
              <strong>2. Get feedback:</strong> Ask friends, family, and potential customers what they think
            </li>
            <li className="pl-4">
              <strong>3. Check social media:</strong> Are the usernames available on major platforms?
            </li>
            <li className="pl-4">
              <strong>4. Google it:</strong> Make sure there aren't negative associations or existing businesses with similar names
            </li>
            <li className="pl-4">
              <strong>5. Think long-term:</strong> Will this name still work as your business grows and evolves?
            </li>
          </ol>

          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-rose-pink/30 to-white/30 dark:from-rose-red/10 dark:to-gray-800/30">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Ready to Name Your Business?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our AI-powered business name generator analyzes your business description and creates
              unique, professional names that resonate with your target audience. Start generating
              names above and find the perfect identity for your business today!
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
