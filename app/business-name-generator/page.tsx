'use client';

import { useState } from 'react';

export default function BusinessNameGenerator() {
  const [description, setDescription] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');
    setNames([]);

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
    } catch (err) {
      setError('Failed to generate names. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Business Name Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Generate unique, professional business names instantly with AI. Perfect for startups,
            entrepreneurs, and small businesses looking for the perfect name.
          </p>
        </div>

        {/* Generator Tool */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Describe your business
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              placeholder="E.g., An online marketplace for handmade crafts and artisanal goods..."
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
            {loading ? 'Generating Business Names...' : 'Generate Business Names'}
          </button>
        </div>

        {names.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4">Your Business Name Ideas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {names.map((name, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-lg">{name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content Section */}
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">How to Choose the Perfect Business Name</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-3">Keep It Simple</h3>
              <p className="text-gray-600 dark:text-gray-400">
                The best business names are easy to spell, pronounce, and remember. Avoid complex
                words or unusual spellings that might confuse potential customers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Make It Memorable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A memorable name helps your business stand out. Consider using alliteration,
                rhythm, or unique word combinations that stick in people's minds.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Check Domain Availability</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Before finalizing your business name, verify that the matching domain name is
                available. A consistent online presence starts with a matching domain.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Consider SEO</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Think about how customers will search for your business online. Including relevant
                keywords can help with search engine visibility.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Why Use an AI Business Name Generator?</h2>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Save Time:</strong> Generate hundreds of creative names in seconds instead of brainstorming for hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>AI-Powered Creativity:</strong> Our advanced AI understands your business concept and creates relevant, unique names</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Industry-Specific:</strong> Get names tailored to your specific industry and target market</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>100% Free:</strong> No hidden fees, no signup required - just enter your description and get instant results</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">Popular Business Name Styles</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Descriptive Names</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Names that clearly describe what your business does
              </p>
              <p className="text-xs text-gray-500">Examples: PayPal, Facebook, General Motors</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Invented Names</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Unique made-up words that are brand new
              </p>
              <p className="text-xs text-gray-500">Examples: Google, Kodak, Xerox</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Compound Names</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Two words combined to create something new
              </p>
              <p className="text-xs text-gray-500">Examples: Microsoft, YouTube, Snapchat</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Tips for Testing Your Business Name</h2>

          <ol className="space-y-3 mb-8">
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

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Ready to Name Your Business?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our AI-powered business name generator analyzes your business description and creates
              unique, professional names that resonate with your target audience. Start generating
              names above and find the perfect identity for your business today!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
