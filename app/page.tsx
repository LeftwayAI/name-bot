'use client';

import { useState } from 'react';

export default function Home() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
