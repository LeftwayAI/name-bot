'use client';

import { useState } from 'react';

export default function StartupNameIdeas() {
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
            Startup Name Ideas Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get creative, memorable startup name ideas powered by AI. Perfect for tech startups,
            SaaS companies, and innovative ventures looking to make their mark.
          </p>
        </div>

        {/* Generator Tool */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Describe your startup idea
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              placeholder="E.g., A SaaS platform that helps remote teams collaborate on design projects in real-time..."
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
            {loading ? 'Generating Startup Names...' : 'Generate Startup Name Ideas'}
          </button>
        </div>

        {names.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4">Your Startup Name Ideas</h2>
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
          <h2 className="text-3xl font-bold mb-6">What Makes a Great Startup Name?</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-3">Short and Punchy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                The best startup names are typically short (1-2 words), easy to remember, and quick
                to type. Think Stripe, Slack, or Zoom - simple, powerful, memorable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Globally Scalable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a name that works internationally. Avoid cultural references or words that
                might have negative meanings in other languages if you plan to expand globally.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Domain Available</h3>
              <p className="text-gray-600 dark:text-gray-400">
                In today's digital world, having a matching .com domain is crucial. Your startup name
                should have an available domain that matches or closely aligns with your brand.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Future-Proof</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Avoid names that are too specific to your current product. Your startup will evolve,
                and your name should allow room for growth and pivots without becoming outdated.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Why Use AI for Startup Name Ideas?</h2>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Instant Creativity:</strong> Generate dozens of unique name ideas in seconds, not days of brainstorming</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Context-Aware:</strong> AI understands your startup's mission and creates names that fit your industry and vision</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Modern & Trendy:</strong> Get names that sound current and align with today's tech startup naming trends</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Unlimited Options:</strong> Keep generating until you find the perfect name - no limits, completely free</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">Popular Startup Naming Strategies</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Invented Words</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Create completely new words that are unique and brandable
              </p>
              <p className="text-xs text-gray-500">Examples: Spotify, Etsy, Venmo</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Real Words</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Use common words in unexpected ways or new contexts
              </p>
              <p className="text-xs text-gray-500">Examples: Apple, Amazon, Notion</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Compound Words</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Combine two words to create something memorable
              </p>
              <p className="text-xs text-gray-500">Examples: LinkedIn, Snapchat, Airbnb</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Startup Name Trends in 2026</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Short & Brandable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Modern startups favor ultra-short names (4-6 letters) that are easy to remember and type.
                Think of recent unicorns like Figma, Canva, or Linear - short, punchy, and memorable.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Abstract & Evocative</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rather than describing what the product does, successful startups choose names that evoke
                feelings or imagery. This allows the brand to evolve beyond its initial product.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Tech-Forward Sound</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Names ending in -ly, -fy, or -io continue to be popular in the tech startup world,
                signaling innovation and modernity while maintaining simplicity.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Steps to Validate Your Startup Name</h2>

          <ol className="space-y-3 mb-8">
            <li className="pl-4">
              <strong>1. Check domain availability:</strong> Search for .com domains first, then consider alternatives like .io, .ai, or .co
            </li>
            <li className="pl-4">
              <strong>2. Search for trademarks:</strong> Use USPTO.gov or similar services to ensure the name isn't already trademarked
            </li>
            <li className="pl-4">
              <strong>3. Verify social media:</strong> Check if handles are available on Twitter, Instagram, LinkedIn, and TikTok
            </li>
            <li className="pl-4">
              <strong>4. Google it thoroughly:</strong> Make sure there are no negative associations or competing brands
            </li>
            <li className="pl-4">
              <strong>5. Test pronunciation:</strong> Say it out loud and ask others to spell it - it should be intuitive
            </li>
            <li className="pl-4">
              <strong>6. Get team feedback:</strong> Share top choices with cofounders, advisors, and potential customers
            </li>
            <li className="pl-4">
              <strong>7. Sleep on it:</strong> The best names grow on you but also feel right from day one
            </li>
          </ol>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Ready to Name Your Startup?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our AI-powered startup name generator creates unique, memorable names tailored to your
              vision. Whether you're building the next SaaS unicorn, launching a mobile app, or
              disrupting an industry, find the perfect name that captures your startup's essence.
              Generate unlimited name ideas above - completely free!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
