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

export default function Home() {
  const [description, setDescription] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [namesWithDomains, setNamesWithDomains] = useState<NameWithDomains[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingDomains, setCheckingDomains] = useState(false);
  const [error, setError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

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
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-center mb-4">
          AI Name Generator
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-8">
          Generate perfect names for your business, startup, or brand
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Describe your project
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              placeholder="E.g., A sustainable fashion brand for eco-conscious millennials..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Names'}
          </button>
        </div>

        {names.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Generated Names</h2>
            {checkingDomains && (
              <p className="text-sm text-gray-500 mb-4">Checking domain availability...</p>
            )}
            <div className="grid grid-cols-1 gap-6">
              {names.map((name, index) => {
                const nameData = namesWithDomains.find(n => n.name === name);
                const availableDomain = nameData?.domains.find(d => d.available && d.checked);

                return (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-bold text-2xl mb-2">{name}</p>
                        {availableDomain && (
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                            ✓ {availableDomain.domain} is available!
                          </p>
                        )}
                      </div>
                      {availableDomain && (
                        <button
                          onClick={() => handleClaimName(name, availableDomain.domain)}
                          disabled={checkoutLoading === name}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                        >
                          {checkoutLoading === name ? 'Loading...' : 'Claim for $49'}
                        </button>
                      )}
                    </div>
                    {nameData && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {nameData.domains.map((domain, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded ${
                              domain.checked
                                ? domain.available
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced AI creates unique, memorable names
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Instant Results</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get dozens of name ideas in seconds
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">100% Free</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No signup required, completely free
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
