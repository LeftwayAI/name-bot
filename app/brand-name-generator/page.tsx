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

export default function BrandNameGenerator() {
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
    <main className="min-h-screen bg-[#050505] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header with rose logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-6xl">🌹</span>
            <h1 className="text-5xl md:text-6xl font-light bg-clip-text text-transparent bg-rose-accent">
              rose.glass
            </h1>
          </div>
          <p className="text-3xl md:text-4xl font-light mb-4 text-white/90">
            AI Brand Name Generator
          </p>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light">
            Create memorable, impactful brand names that resonate with your audience.
            Our AI-powered generator helps you find the perfect name that captures your brand's essence.
          </p>
        </div>

        {/* Generator Tool */}
        <div className="glass-card rounded-3xl p-8 md:p-10 mb-16">
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-3 text-white/60">
              Describe your brand
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-5 py-4 glass-input rounded-2xl text-base focus:outline-none resize-none"
              placeholder="E.g., A sustainable fashion brand focused on eco-friendly materials and ethical manufacturing for conscious consumers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-xl border border-red-500/20 bg-red-500/[0.04] text-red-400/90 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full glass-button text-white font-medium py-4 px-8 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            {loading ? 'Generating Brand Names...' : '✨ Generate Brand Names'}
          </button>
        </div>

        {names.length > 0 && (
          <div className="glass-card rounded-3xl p-8 md:p-10 mb-16">
            <h2 className="text-3xl font-light mb-2 text-white/90">Your Brand Name Ideas</h2>
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
                    className={`glass-card rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 ${
                      celebrating === name ? 'celebrate' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="name-mono text-3xl md:text-4xl font-light mb-3 text-white/90">
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

        {/* What Makes a Great Brand Name */}
        <section className="glass-card rounded-3xl p-8 md:p-10 mb-16">
          <h2 className="text-3xl font-light mb-6 text-white/90">What Makes a Great Brand Name?</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg mb-6 text-white/60">
              A powerful brand name is more than just a label—it's the foundation of your brand identity.
              The best brand names share several key characteristics that make them memorable,
              marketable, and meaningful to your target audience.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-3 text-white/90">1. Memorable & Distinctive</h3>
                <p className="text-white/60">
                  Great brand names stick in people's minds. They stand out from competitors and
                  are easy to recall when customers need your product or service. Think "Apple"
                  in tech or "Nike" in sportswear—simple, unique, and unforgettable.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-3 text-white/90">2. Easy to Pronounce</h3>
                <p className="text-white/60">
                  If people can't say your brand name, they won't talk about it. The best brand
                  names are phonetically simple and work across different languages and cultures.
                  Avoid complex spellings or confusing letter combinations.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-3 text-white/90">3. Emotionally Resonant</h3>
                <p className="text-white/60">
                  Strong brand names evoke feelings and create connections. Whether it's excitement,
                  trust, innovation, or luxury, your name should trigger the emotions you want
                  associated with your brand. "Amazon" suggests vastness and endless selection.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-3 text-white/90">4. Scalable & Future-Proof</h3>
                <p className="text-white/60">
                  Your brand may evolve over time. Avoid names that are too specific to one product
                  or market. "Amazon" started with books but the name allowed expansion into everything.
                  Think about where your brand will be in 5-10 years.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-3 text-white/90">5. Available & Ownable</h3>
                <p className="text-white/60">
                  A great name means nothing if you can't legally own it. Check trademark databases,
                  domain availability, and social media handles. You need to be able to build a
                  cohesive online presence around your brand name.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-3 text-white/90">6. Tells a Story</h3>
                <p className="text-white/60">
                  The best brand names have meaning or origin stories that deepen customer connections.
                  Whether it's inspired by mythology (Nike), nature (Patagonia), or a vision (Virgin),
                  having a story makes your brand more relatable and shareable.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-3 text-white/90">7. Works Visually</h3>
                <p className="text-white/60">
                  Consider how your brand name will look in logos, packaging, and marketing materials.
                  Short names often work better visually. The name should be versatile enough to work
                  in different contexts—from billboards to mobile apps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Brand Names */}
        <section className="glass-card rounded-3xl p-8 md:p-10 mb-16">
          <h2 className="text-3xl font-light mb-6 text-white/90">Types of Brand Names (With Examples)</h2>
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-medium mb-3 text-white/90">Descriptive Names</h3>
              <p className="mb-4 text-white/60">
                These names clearly communicate what the company does. They're straightforward
                and immediately convey the brand's purpose, making them easy to understand but
                harder to trademark.
              </p>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
                <p className="font-medium mb-2 text-white/90">Examples:</p>
                <ul className="list-disc list-inside space-y-1 text-white/60">
                  <li><strong>PayPal</strong> - Pay your pal</li>
                  <li><strong>General Motors</strong> - Makes motors/vehicles</li>
                  <li><strong>The Home Depot</strong> - Home improvement depot</li>
                  <li><strong>Whole Foods</strong> - Sells whole, natural foods</li>
                </ul>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-medium mb-3 text-white/90">Invented/Made-Up Names</h3>
              <p className="mb-4 text-white/60">
                Completely original words that didn't exist before. These offer maximum trademark
                protection and can be molded to mean exactly what you want. They require more
                marketing to build meaning but become powerful once established.
              </p>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
                <p className="font-medium mb-2 text-white/90">Examples:</p>
                <ul className="list-disc list-inside space-y-1 text-white/60">
                  <li><strong>Kodak</strong> - Created to be short, memorable, and work globally</li>
                  <li><strong>Xerox</strong> - Invented name that became synonymous with copying</li>
                  <li><strong>Spotify</strong> - Blend of "spot" and "identify"</li>
                  <li><strong>Verizon</strong> - Combination of "veritas" (truth) and "horizon"</li>
                </ul>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-medium mb-3 text-white/90">Metaphorical Names</h3>
              <p className="mb-4 text-white/60">
                Names that use metaphors, symbols, or associations to convey brand attributes.
                These create powerful imagery and emotions while remaining memorable and distinctive.
              </p>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
                <p className="font-medium mb-2 text-white/90">Examples:</p>
                <ul className="list-disc list-inside space-y-1 text-white/60">
                  <li><strong>Apple</strong> - Simple, approachable, organic (vs. complex tech)</li>
                  <li><strong>Amazon</strong> - Vast, endless selection like the river/rainforest</li>
                  <li><strong>Nike</strong> - Greek goddess of victory</li>
                  <li><strong>Patagonia</strong> - Evokes natural beauty and adventure</li>
                </ul>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-medium mb-3 text-white/90">Acronym Names</h3>
              <p className="mb-4 text-white/60">
                Abbreviated names formed from initials or first letters. These work best when
                you already have brand recognition or when the full name is too long. They can
                be harder to remember initially but powerful once established.
              </p>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
                <p className="font-medium mb-2 text-white/90">Examples:</p>
                <ul className="list-disc list-inside space-y-1 text-white/60">
                  <li><strong>IBM</strong> - International Business Machines</li>
                  <li><strong>HBO</strong> - Home Box Office</li>
                  <li><strong>BMW</strong> - Bayerische Motoren Werke</li>
                  <li><strong>IKEA</strong> - Ingvar Kamprad Elmtaryd Agunnaryd</li>
                </ul>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-medium mb-3 text-white/90">Founder Names</h3>
              <p className="mb-4 text-white/60">
                Named after the founder or key person. These carry personal legacy and can build
                trust, especially in luxury or craft industries. They work well when the founder
                becomes part of the brand story.
              </p>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
                <p className="font-medium mb-2 text-white/90">Examples:</p>
                <ul className="list-disc list-inside space-y-1 text-white/60">
                  <li><strong>Tesla</strong> - Named after Nikola Tesla</li>
                  <li><strong>Ford</strong> - Henry Ford</li>
                  <li><strong>Disney</strong> - Walt Disney</li>
                  <li><strong>Ben & Jerry's</strong> - Ben Cohen and Jerry Greenfield</li>
                </ul>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-medium mb-3 text-white/90">Compound/Blend Names</h3>
              <p className="mb-4 text-white/60">
                Created by combining two words or word parts. These can be highly descriptive
                while remaining unique and trademarkable. They often create new meanings from
                familiar elements.
              </p>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
                <p className="font-medium mb-2 text-white/90">Examples:</p>
                <ul className="list-disc list-inside space-y-1 text-white/60">
                  <li><strong>Facebook</strong> - Face + book (college directories)</li>
                  <li><strong>Netflix</strong> - Net (internet) + flix (movies)</li>
                  <li><strong>Snapchat</strong> - Snap (photo) + chat (messaging)</li>
                  <li><strong>Microsoft</strong> - Microcomputer + software</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Naming Strategies for 2026 */}
        <section className="glass-card rounded-3xl p-8 md:p-10 mb-16">
          <h2 className="text-3xl font-light mb-6 text-white/90">Brand Naming Strategies for 2026</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg mb-6 text-white/60">
              The branding landscape continues to evolve. Here are the naming strategies that
              are working best for new brands launching in 2026:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-rose-400 dark:border-rose-500 pl-6">
                <h3 className="text-xl font-medium mb-2 text-white/90">Authenticity Over Cleverness</h3>
                <p className="text-white/60">
                  Today's consumers value genuine brands over gimmicky ones. Names that feel honest
                  and straightforward often outperform overly clever wordplay. "Glossier" (beauty)
                  and "Everlane" (fashion) succeed by feeling authentic rather than trying too hard.
                </p>
              </div>

              <div className="border-l-4 border-rose-400 dark:border-rose-500 pl-6">
                <h3 className="text-xl font-light mb-2 text-white/90">Global-First Thinking</h3>
                <p className="text-white/60">
                  With digital brands going global from day one, choose names that work internationally.
                  Avoid idioms, cultural references, or words that might be offensive in other languages.
                  Test pronunciation across different cultures.
                </p>
              </div>

              <div className="border-l-4 border-rose-400 dark:border-rose-500 pl-6">
                <h3 className="text-xl font-light mb-2 text-white/90">Voice-Search Optimization</h3>
                <p className="text-white/60">
                  As voice assistants grow, your brand name needs to be easily spoken and understood
                  by AI. Avoid similar-sounding names to competitors. Simple phonetics win: "Stripe"
                  is easier for Alexa than "Stryphe."
                </p>
              </div>

              <div className="border-l-4 border-rose-400 dark:border-rose-500 pl-6">
                <h3 className="text-xl font-light mb-2 text-white/90">Minimal & Modern</h3>
                <p className="text-white/60">
                  Short, clean names continue to dominate. One or two syllables work best for apps
                  and digital brands. Think "Calm," "Notion," "Linear"—these names feel contemporary
                  and are memorable in crowded app stores.
                </p>
              </div>

              <div className="border-l-4 border-rose-400 dark:border-rose-500 pl-6">
                <h3 className="text-xl font-light mb-2 text-white/90">Purpose-Driven Names</h3>
                <p className="text-white/60">
                  Brands with clear missions often reflect that in their names. "Impossible Foods,"
                  "Allbirds," and "Warby Parker" all hint at their brand purpose. If your brand has
                  a strong why, consider letting it influence your name.
                </p>
              </div>

              <div className="border-l-4 border-rose-400 dark:border-rose-500 pl-6">
                <h3 className="text-xl font-light mb-2 text-white/90">Alternative Domain Extensions</h3>
                <p className="text-white/60">
                  With .com scarcity, don't force a bad .com name. Consider .io (tech), .co (business),
                  .ai (AI companies), or brand-specific extensions. Many successful brands use creative
                  domains like "get[name].com" or "[name]hq.com."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Validate Your Brand Name */}
        <section className="glass-card rounded-3xl p-8 md:p-10 mb-16">
          <h2 className="text-3xl font-light mb-6 text-white/90">How to Validate Your Brand Name</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg mb-6 text-white/60">
              Found a name you love? Don't commit until you've validated it thoroughly.
              Here's a comprehensive checklist to ensure your brand name will work:
            </p>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-light mb-4 text-white/90">The Brand Name Validation Checklist</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">1</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Check Trademark Availability</h4>
                    <p className="text-white/60">Search USPTO.gov (USA) and equivalent databases in your target markets. Ensure no existing trademarks conflict with your name in your industry.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">2</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Verify Domain Availability</h4>
                    <p className="text-white/60">Check if .com is available (preferred) or if you're comfortable with alternatives. Also check if premium domains are for sale and their pricing.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">3</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Secure Social Media Handles</h4>
                    <p className="text-white/60">Check Instagram, Twitter/X, TikTok, LinkedIn, and YouTube. Consistent handles across platforms strengthen your brand identity.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">4</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Google It Thoroughly</h4>
                    <p className="text-white/60">Search for existing companies, products, or negative associations. Check Google Images for visual conflicts. Search in multiple languages.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">5</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Test Pronunciation</h4>
                    <p className="text-white/60">Say it out loud 10 times. Ask friends to spell it after hearing it. Make sure it's not easily confused with similar-sounding words or competitors.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">6</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Check International Meanings</h4>
                    <p className="text-white/60">Translate to major languages (Spanish, Mandarin, French, German, etc.). Ensure no offensive or awkward meanings exist in key markets.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">7</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Test Visual Appeal</h4>
                    <p className="text-white/60">Sketch potential logos. Type it in different fonts. See how it looks in all caps, lowercase, and title case. Ensure it's aesthetically versatile.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">8</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Get Target Audience Feedback</h4>
                    <p className="text-white/60">Show it to 10-20 people in your target market. Ask for immediate reactions, what it makes them think of, and how memorable it is.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">9</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Consider Long-Term Scalability</h4>
                    <p className="text-white/60">Imagine the name in 5-10 years. Will it still work if you expand categories? Does it limit your growth potential?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full flex items-center justify-center font-light mr-4">10</div>
                  <div>
                    <h4 className="font-light text-lg text-white/90">Trust Your Gut</h4>
                    <p className="text-white/60">After all analysis, does it feel right? Are you excited to build a brand around it? Your enthusiasm matters—you'll be saying this name thousands of times.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes to Avoid */}
        <section className="glass-card rounded-3xl p-8 md:p-10 mb-16">
          <h2 className="text-3xl font-light mb-6 text-white/90">Common Brand Naming Mistakes to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl border-l-4 border-red-500 p-6">
              <h3 className="text-xl font-light mb-3 text-red-700 dark:text-red-400">Being Too Generic</h3>
              <p className="text-white/60">
                Names like "Quality Products Inc." or "Best Services Co." say nothing distinctive.
                They're forgettable and nearly impossible to rank for in search engines. Be specific
                or be unique—never be both generic AND vague.
              </p>
            </div>

            <div className="glass-card rounded-2xl border-l-4 border-red-500 p-6">
              <h3 className="text-xl font-light mb-3 text-red-700 dark:text-red-400">Ignoring SEO from Day One</h3>
              <p className="text-white/60">
                If your brand name is a common word, you'll struggle with search visibility.
                "Pixel" might be memorable but try ranking for it. Invented names or unique
                combinations give you better chances of owning search results.
              </p>
            </div>

            <div className="glass-card rounded-2xl border-l-4 border-red-500 p-6">
              <h3 className="text-xl font-light mb-3 text-red-700 dark:text-red-400">Following Fads Too Closely</h3>
              <p className="text-white/60">
                Naming trends come and go. Ending everything in "-ly" or "-ify" was popular but
                now feels dated. Choose timeless over trendy. Your brand should feel fresh in 5
                years, not like a time capsule of 2026.
              </p>
            </div>

            <div className="glass-card rounded-2xl border-l-4 border-red-500 p-6">
              <h3 className="text-xl font-light mb-3 text-red-700 dark:text-red-400">Making It Too Complex</h3>
              <p className="text-white/60">
                If customers can't spell, pronounce, or remember your name, you've already lost.
                "Xzylophyx" might be unique, but is it smart? Every time someone can't find you
                because they misspelled your name, that's a lost customer.
              </p>
            </div>

            <div className="glass-card rounded-2xl border-l-4 border-red-500 p-6">
              <h3 className="text-xl font-light mb-3 text-red-700 dark:text-red-400">Limiting Your Future</h3>
              <p className="text-white/60">
                "Seattle's Best Coffee Shop" works until you expand to Portland. "iPhone Cases R Us"
                fails when you want to sell Android accessories. Think bigger than your first product
                or location.
              </p>
            </div>

            <div className="glass-card rounded-2xl border-l-4 border-red-500 p-6">
              <h3 className="text-xl font-light mb-3 text-red-700 dark:text-red-400">Skipping Legal Due Diligence</h3>
              <p className="text-white/60">
                Falling in love with a name before checking trademarks is heartbreak waiting to happen.
                You might rebrand later (expensive) or face legal issues (worse). Always check trademarks
                BEFORE you get attached to a name.
              </p>
            </div>
          </div>
        </section>

        {/* Sample Names Showcase */}
        <SampleNames
          industry="brands like yours"
          examples={[
            { name: 'Lumière', style: 'Elegant French-inspired' },
            { name: 'VelvetPeak', style: 'Luxurious compound' },
            { name: 'Astralis', style: 'Premium invented name' },
            { name: 'SilkVault', style: 'High-end descriptive' },
            { name: 'Meridian Co.', style: 'Sophisticated & timeless' },
            { name: 'Opulent', style: 'Single-word power brand' },
          ]}
        />

        {/* Pricing Transparency */}
        <PricingTransparency />

        {/* FAQs */}
        <section className="glass-card rounded-3xl p-8 md:p-10 mb-16">
          <h2 className="text-3xl font-light mb-6 text-white/90">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-light mb-3 text-white/90">How much does it cost to trademark a brand name?</h3>
              <p className="text-white/60">
                In the United States, filing a trademark application costs $250-$350 per class of goods/services
                through USPTO. Many brands start with one class and expand later. Factor in potential attorney
                fees ($500-$2,000) if you want professional help ensuring your application is solid. Total cost
                typically ranges from $250 (DIY, single class) to $2,500+ (attorney-assisted, multiple classes).
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-light mb-3 text-white/90">Should I choose a .com domain or are alternatives okay?</h3>
              <p className="text-white/60">
                .com remains the gold standard and customer expectation, especially for established brands.
                However, modern alternatives like .io (tech), .ai (AI companies), .co (business), or creative
                solutions like "get[name].com" or "[name]app.com" work well if your ideal .com is unavailable
                or prohibitively expensive. The key is consistency across all platforms and clear branding.
                Many successful modern brands (like Notion.so) have proven alternatives can work.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-light mb-3 text-white/90">Can I use AI to generate my brand name?</h3>
              <p className="text-white/60">
                Absolutely! AI brand name generators (like this one) are excellent for brainstorming and
                discovering naming directions you might not have considered. They're particularly useful for
                generating large volumes of ideas quickly, finding creative combinations, and exploring different
                naming styles. However, AI should be your starting point, not your endpoint. Always validate
                AI-generated names through the checklist above—check trademarks, test with real humans, and
                ensure the name truly fits your brand vision.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-light mb-3 text-white/90">What if my ideal brand name is already taken?</h3>
              <p className="text-white/60">
                You have several options: (1) Try variations—add a prefix/suffix, use a different domain
                extension, or combine with another word. (2) Purchase the domain—many are for sale, though
                premium ones can cost $1,000-$100,000+. (3) Choose a different name—sometimes a "second choice"
                that's fully available is better than a "first choice" with complications. (4) Check if it's
                actually in use—some registered domains/trademarks are abandoned and might be available through
                proper channels.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-light mb-3 text-white/90">How long should a brand name be?</h3>
              <p className="text-white/60">
                Shorter is generally better. One to two syllables (Stripe, Slack, Calm) are ideal for memorability
                and modern branding. Three syllables (Amazon, Patagonia, Instagram) still work well. Beyond that,
                you risk being forgettable or requiring abbreviation. There are exceptions—Four Seasons Hotel works
                because of the luxury positioning—but for most digital brands, aim for brevity. Character count
                matters too: 6-12 letters is the sweet spot for logos and visual branding.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-light mb-3 text-white/90">Should my brand name describe what I do?</h3>
              <p className="text-white/60">
                There's no single right answer—it depends on your strategy. Descriptive names (PayPal, Whole Foods)
                communicate clearly but are harder to trademark and less distinctive. Abstract names (Apple, Nike)
                offer maximum flexibility and differentiation but require more marketing to build meaning. Many
                successful brands use a middle path: suggestive names that hint at benefits without being literal
                (Amazon suggests vastness, Uber suggests superiority). Consider your budget, timeline, and market
                position when deciding.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="glass-card rounded-3xl p-8 md:p-10 text-center">
          <h2 className="text-3xl font-light mb-4 text-white/90">Ready to Find Your Perfect Brand Name?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto text-white/60">
            Use our AI-powered brand name generator above to discover unique, memorable names
            that capture your brand's essence and resonate with your audience.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass-button px-8 py-4 text-white font-medium rounded-full text-lg hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            ✨ Generate Brand Names Now
          </button>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-white/40">
          <p>Made with precision and care · <a href="https://rose.glass" className="hover:text-rose-coral transition-colors">rose.glass</a></p>
        </div>
      </div>
    </main>
  );
}
