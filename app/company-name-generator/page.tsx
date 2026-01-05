'use client'

import { useState } from 'react'
import PricingTransparency from '../components/PricingTransparency'
import SampleNames from '../components/SampleNames'

interface DomainResult {
  domain: string
  available: boolean
}

interface NameWithDomains {
  name: string
  domains: DomainResult[]
}

export default function CompanyNameGenerator() {
  const [description, setDescription] = useState('')
  const [names, setNames] = useState<NameWithDomains[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkingDomains, setCheckingDomains] = useState(false)
  const [celebratingName, setCelebratingName] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setNames([])

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })

      if (!res.ok) {
        throw new Error('Failed to generate names')
      }

      const data = await res.json()
      const generatedNames = data.names.map((name: string) => ({ name, domains: [] }))
      setNames(generatedNames)

      // Check domain availability after generating names
      checkDomains(generatedNames)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function checkDomains(generatedNames: NameWithDomains[]) {
    setCheckingDomains(true)

    try {
      const updatedNames = await Promise.all(
        generatedNames.map(async (item) => {
          try {
            const res = await fetch('/api/check-domain', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: item.name }),
            })

            if (res.ok) {
              const data = await res.json()
              return { ...item, domains: data.domains }
            }
          } catch (err) {
            console.error('Domain check failed:', err)
          }
          return item
        })
      )

      setNames(updatedNames)
    } catch (err) {
      console.error('Domain checking error:', err)
    } finally {
      setCheckingDomains(false)
    }
  }

  async function handleClaimName(name: string, domain: string) {
    // Trigger celebration animation
    setCelebratingName(name)
    setTimeout(() => setCelebratingName(null), 600)

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, domain }),
      })

      if (!res.ok) {
        throw new Error('Failed to create checkout')
      }

      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout')
    }
  }

  return (
    <div className="min-h-screen bg-rose-gradient">
      {/* Header */}
      <header className="py-8 px-4 text-center">
        <a href="/" className="inline-block mb-4 text-6xl">🌹</a>
        <a href="/" className="block text-2xl font-bold bg-gradient-to-r from-rose-red to-rose-coral bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          rose.glass
        </a>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-red to-rose-coral bg-clip-text text-transparent leading-tight">
            Company Name Generator
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Create professional, credible company names that inspire trust and command respect in the corporate world.
          </p>
        </div>

        {/* Generator Card */}
        <div className="glass-card rounded-3xl p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your company
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., consulting firm for tech startups"
                className="glass-input w-full px-6 py-4 rounded-2xl text-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glass-button w-full py-4 rounded-2xl text-lg font-semibold text-white transition-all duration-300"
            >
              {loading ? 'Generating...' : 'Generate Company Names'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {names.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Company Names</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {names.map((item, idx) => (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl p-6 transition-all duration-600 ${
                    celebratingName === item.name ? 'celebrate' : ''
                  }`}
                >
                  <div className="name-mono text-3xl md:text-4xl font-bold text-gray-800 mb-4 break-words">
                    {item.name}
                  </div>

                  {checkingDomains && item.domains.length === 0 && (
                    <p className="text-sm text-gray-500">Checking availability...</p>
                  )}

                  {item.domains.length > 0 && (
                    <div className="space-y-3">
                      {item.domains.map((d, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{d.domain}</span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                d.available
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {d.available ? 'Available' : 'Taken'}
                            </span>
                          </div>

                          {d.available && (
                            <button
                              onClick={() => handleClaimName(item.name, d.domain)}
                              className="glass-button w-full py-2 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                            >
                              🥂 Claim for $49
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Names Showcase */}
        <SampleNames
          industry="companies like yours"
          examples={[
            { name: 'Titanium Solutions', style: 'Strong & professional' },
            { name: 'PrimeCore', style: 'Essential & reliable' },
            { name: 'Vertex Group', style: 'Leadership-focused' },
            { name: 'Catalyst Corp', style: 'Change-driven' },
            { name: 'Cornerstone Partners', style: 'Foundational & trustworthy' },
            { name: 'Momentum Industries', style: 'Forward-moving energy' },
          ]}
        />

        {/* Pricing Transparency */}
        <PricingTransparency />

        {/* SEO Content */}
        <div className="mt-16 space-y-12">
          {/* What Makes Great Company Names */}
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              What Makes a Great Company Name?
            </h2>

            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg">
                Choosing a company name is one of the most important decisions you'll make as a founder.
                Unlike casual business names, company names need to convey professionalism, credibility,
                and long-term stability. Whether you're incorporating a startup, launching a professional
                services firm, or rebranding an established organization, your company name is the foundation
                of your corporate identity.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-rose-pink/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-rose-red flex items-center gap-2">
                    <span>✓</span> Professional & Credible
                  </h3>
                  <p className="text-gray-700">
                    Your company name should inspire trust with clients, investors, and partners.
                    It should sound established and professional, not overly casual or gimmicky.
                  </p>
                </div>

                <div className="bg-rose-pink/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-rose-red flex items-center gap-2">
                    <span>✓</span> Legally Available
                  </h3>
                  <p className="text-gray-700">
                    Before incorporating, ensure the name is available in your state/country
                    and doesn't infringe on existing trademarks. Check USPTO, state registries,
                    and trademark databases.
                  </p>
                </div>

                <div className="bg-rose-pink/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-rose-red flex items-center gap-2">
                    <span>✓</span> Scalable & Timeless
                  </h3>
                  <p className="text-gray-700">
                    Choose a name that can grow with your company. Avoid trendy terms or
                    overly specific references that might limit future expansion or become dated.
                  </p>
                </div>

                <div className="bg-rose-pink/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-rose-red flex items-center gap-2">
                    <span>✓</span> Easy to Pronounce & Spell
                  </h3>
                  <p className="text-gray-700">
                    In the corporate world, your name will be spoken in meetings, investor pitches,
                    and phone calls. It should be easy to say and spell, without requiring explanation.
                  </p>
                </div>

                <div className="bg-rose-pink/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-rose-red flex items-center gap-2">
                    <span>✓</span> Memorable & Distinctive
                  </h3>
                  <p className="text-gray-700">
                    Stand out in your industry without being weird. The best company names are
                    memorable enough to recall after one meeting but professional enough for a boardroom.
                  </p>
                </div>

                <div className="bg-rose-pink/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-rose-red flex items-center gap-2">
                    <span>✓</span> Domain Available
                  </h3>
                  <p className="text-gray-700">
                    Secure a matching .com domain (or industry-appropriate TLD like .io for tech,
                    .law for legal). Your digital presence is crucial for corporate credibility.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Company Names */}
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Types of Company Names (with Examples)
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-3 text-rose-red">1. Descriptive Names</h3>
                <p className="text-gray-700 mb-4">
                  Names that clearly describe what the company does. Professional and straightforward,
                  ideal for B2B and professional services.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium text-gray-800">Examples:</p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong>American Airlines</strong> - Clearly an airline based in America</li>
                    <li>• <strong>General Motors</strong> - General manufacturer of motors/vehicles</li>
                    <li>• <strong>Bank of America</strong> - Banking services for America</li>
                    <li>• <strong>International Business Machines (IBM)</strong> - Business machines worldwide</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-rose-red">2. Founder Names</h3>
                <p className="text-gray-700 mb-4">
                  Named after the founder(s) or key individuals. Common in law firms, consulting,
                  and established corporations. Conveys heritage and personal accountability.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium text-gray-800">Examples:</p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong>McKinsey & Company</strong> - Named after founder James McKinsey</li>
                    <li>• <strong>Goldman Sachs</strong> - Marcus Goldman and Samuel Sachs</li>
                    <li>• <strong>Johnson & Johnson</strong> - The Johnson brothers</li>
                    <li>• <strong>Ernst & Young</strong> - Arthur Ernst and Alwin C. Ernst</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-rose-red">3. Acronyms</h3>
                <p className="text-gray-700 mb-4">
                  Shortened versions of longer names, often used after rebranding or to modernize.
                  Professional and concise, though may require brand recognition to be effective.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium text-gray-800">Examples:</p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong>IBM</strong> - International Business Machines</li>
                    <li>• <strong>GE</strong> - General Electric</li>
                    <li>• <strong>HP</strong> - Hewlett-Packard</li>
                    <li>• <strong>SAP</strong> - Systeme, Anwendungen und Produkte (Systems, Applications & Products)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-rose-red">4. Invented/Abstract Names</h3>
                <p className="text-gray-700 mb-4">
                  Made-up words or unique combinations that are highly brandable. Allows for
                  complete trademark ownership and domain availability, popular with tech companies.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium text-gray-800">Examples:</p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong>Accenture</strong> - Invented name suggesting "accent on the future"</li>
                    <li>• <strong>Verizon</strong> - Combination of "veritas" (truth) + "horizon"</li>
                    <li>• <strong>Novartis</strong> - From Latin "novae artes" (new skills)</li>
                    <li>• <strong>Altria</strong> - Invented to suggest "reaching higher"</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-rose-red">5. Metaphorical Names</h3>
                <p className="text-gray-700 mb-4">
                  Names that use metaphor or symbolism to convey company values or aspirations.
                  More creative while maintaining professionalism.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium text-gray-800">Examples:</p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong>Oracle</strong> - Source of wisdom and insight (database company)</li>
                    <li>• <strong>Salesforce</strong> - A force in sales/CRM</li>
                    <li>• <strong>BlackRock</strong> - Solid, stable foundation (investment firm)</li>
                    <li>• <strong>Redwood</strong> - Strong, enduring, natural growth (common in finance/VC)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-rose-red">6. Geographic Names</h3>
                <p className="text-gray-700 mb-4">
                  Named after locations, conveying heritage, local roots, or global reach.
                  Common in banking, real estate, and established corporations.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium text-gray-800">Examples:</p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong>Deutsche Bank</strong> - "German Bank"</li>
                    <li>• <strong>Pacific Gas & Electric</strong> - Pacific region utility</li>
                    <li>• <strong>Texas Instruments</strong> - Founded in Texas</li>
                    <li>• <strong>Boston Consulting Group</strong> - Founded in Boston</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Considerations */}
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Legal Considerations for Company Names
            </h2>

            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg">
                Before you fall in love with a name, ensure it's legally available. Unlike casual
                business names, company names are registered legal entities that must comply with
                state/federal regulations and trademark law.
              </p>

              <div className="bg-rose-pink/20 rounded-2xl p-6 my-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Company Name Legal Checklist
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-rose-red min-w-[24px]">1.</span>
                    <div>
                      <strong>State Availability Search</strong>
                      <p className="text-sm mt-1">
                        Check your state's Secretary of State business entity database to ensure
                        the name isn't already registered. Each state has an online search tool.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-rose-red min-w-[24px]">2.</span>
                    <div>
                      <strong>Federal Trademark Search (USPTO)</strong>
                      <p className="text-sm mt-1">
                        Search the USPTO TESS database at <a href="https://www.uspto.gov/trademarks" className="text-rose-red hover:underline">uspto.gov/trademarks</a> to
                        ensure your name doesn't infringe on existing federal trademarks.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-rose-red min-w-[24px]">3.</span>
                    <div>
                      <strong>Common Law Trademark Search</strong>
                      <p className="text-sm mt-1">
                        Google your proposed name + your industry to find unregistered ("common law")
                        trademarks that might have priority based on prior use.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-rose-red min-w-[24px]">4.</span>
                    <div>
                      <strong>Domain Availability</strong>
                      <p className="text-sm mt-1">
                        Check if the matching .com domain (or relevant TLD) is available. Our generator
                        checks this automatically for .com, .io, .app, .ai, and .co domains.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-rose-red min-w-[24px]">5.</span>
                    <div>
                      <strong>Restricted/Prohibited Words</strong>
                      <p className="text-sm mt-1">
                        Some words require special licenses or are prohibited: "Bank", "Insurance",
                        "University", "Federal", etc. Check your state's business naming guidelines.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-rose-red min-w-[24px]">6.</span>
                    <div>
                      <strong>Required Designators</strong>
                      <p className="text-sm mt-1">
                        Most states require you to include your entity type in the legal name:
                        "Inc.", "LLC", "Corp.", "Ltd.", etc. Plan for this in your branding.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-rose-red min-w-[24px]">7.</span>
                    <div>
                      <strong>International Considerations</strong>
                      <p className="text-sm mt-1">
                        If planning global expansion, check trademark availability in target countries.
                        Ensure the name doesn't have negative connotations in other languages.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-rose-red min-w-[24px]">8.</span>
                    <div>
                      <strong>Reserve Your Name</strong>
                      <p className="text-sm mt-1">
                        Once you've verified availability, reserve the name with your state (usually 60-120 days)
                        while you prepare incorporation documents. File trademark application after incorporation.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                <p className="font-bold text-yellow-800 mb-2">⚠️ Legal Disclaimer</p>
                <p className="text-sm text-yellow-700">
                  This information is for general guidance only and does not constitute legal advice.
                  Consult with a business attorney or trademark attorney before finalizing your company
                  name, especially for complex situations or high-value brands.
                </p>
              </div>
            </div>
          </section>

          {/* Industry-Specific Naming Strategies */}
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Industry-Specific Naming Strategies
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-rose-red">Technology Companies</h3>
                <p className="text-gray-700 mb-3">
                  Tech companies often use invented names (Google, Nvidia, Uber) or metaphorical names
                  (Oracle, Salesforce). Aim for modern, scalable names that work globally. Consider
                  .io or .ai domains for instant tech credibility.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Avoid:</strong> Overly technical jargon, dated tech terms (e.g., "Cyber", "Net"),
                  or names that imply you only do one thing you might outgrow.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-rose-red">Professional Services (Law, Consulting, Accounting)</h3>
                <p className="text-gray-700 mb-3">
                  Professional services typically use founder names (McKinsey & Company, Deloitte) or
                  descriptive names (Boston Consulting Group). This conveys heritage, expertise, and
                  personal accountability—key trust signals for B2B clients.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Avoid:</strong> Overly creative or playful names that undermine credibility.
                  Stick with professional, established-sounding names.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-rose-red">Financial Services (Banking, Investment, Insurance)</h3>
                <p className="text-gray-700 mb-3">
                  Finance companies need names that convey stability, trust, and strength. Common approaches:
                  geographic names (Bank of America), metaphorical names suggesting strength (BlackRock, Fortress),
                  or founder names (Goldman Sachs, Morgan Stanley).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Avoid:</strong> Trendy or cutesy names. Financial services require gravitas.
                  Also be aware of regulatory restrictions on using "Bank", "Trust", "Insurance" without proper licensing.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-rose-red">Manufacturing & Industrial</h3>
                <p className="text-gray-700 mb-3">
                  Manufacturing companies often use descriptive names (General Electric, U.S. Steel) or
                  founder names (Ford, Caterpillar). The name should convey reliability, scale, and industrial capability.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Avoid:</strong> Names that sound small-scale or artisanal unless that's your brand positioning.
                  Industrial buyers want to know you can handle large contracts.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-rose-red">Healthcare & Biotech</h3>
                <p className="text-gray-700 mb-3">
                  Healthcare companies often use invented/Latin-inspired names (Novartis, Pfizer) that sound
                  scientific and credible. Biotech leans toward names suggesting innovation and precision.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Avoid:</strong> Names that are hard to spell or pronounce—doctors and patients need
                  to say it easily. Also avoid anything that could be misconstrued as a drug name (FDA restrictions).
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-rose-red">Real Estate & Construction</h3>
                <p className="text-gray-700 mb-3">
                  Real estate/construction companies often use geographic names (Toll Brothers, Lennar) or
                  names suggesting strength and reliability (Granite Construction, Summit Properties).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Avoid:</strong> Overly generic names that don't differentiate you. Real estate is
                  competitive—your name should suggest quality and local expertise.
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Common Company Naming Mistakes to Avoid
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-red-400 pl-6 py-2">
                <h3 className="text-xl font-bold mb-2 text-gray-800">❌ Being Too Descriptive or Generic</h3>
                <p className="text-gray-700">
                  Names like "Best Consulting Services Inc." or "Quality Tech Solutions LLC" are unmemorable,
                  hard to trademark, and don't differentiate you. You'll also struggle to rank in search results
                  against thousands of similar names.
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6 py-2">
                <h3 className="text-xl font-bold mb-2 text-gray-800">❌ Limiting Future Growth</h3>
                <p className="text-gray-700">
                  Don't name your company "San Francisco Web Design Inc." if you might expand services or
                  locations. You'll outgrow the name quickly. Think 10-20 years ahead.
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6 py-2">
                <h3 className="text-xl font-bold mb-2 text-gray-800">❌ Copying Competitors Too Closely</h3>
                <p className="text-gray-700">
                  If your competitor is "BlueTech Systems", don't name yours "BlueWave Systems." It's
                  confusing, legally risky (trademark infringement), and makes you look like a copycat.
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6 py-2">
                <h3 className="text-xl font-bold mb-2 text-gray-800">❌ Ignoring Trademark Search</h3>
                <p className="text-gray-700">
                  Falling in love with a name before checking trademark availability is a recipe for
                  disaster. You could spend thousands on branding only to receive a cease-and-desist letter.
                  Always search USPTO and state databases first.
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6 py-2">
                <h3 className="text-xl font-bold mb-2 text-gray-800">❌ Choosing a Name That's Hard to Spell or Pronounce</h3>
                <p className="text-gray-700">
                  If people can't spell it after hearing it once, you'll lose customers. Avoid unusual
                  spellings ("Kwik" instead of "Quick"), silent letters, or tongue-twisters. Test it:
                  Can someone find you via Google after hearing your name in a meeting?
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6 py-2">
                <h3 className="text-xl font-bold mb-2 text-gray-800">❌ Settling for a Bad Domain</h3>
                <p className="text-gray-700">
                  If YourCompanyName.com is taken, don't settle for YourCompanyName-inc.com or
                  GetYourCompanyName.com. It looks unprofessional and confuses customers. Either find
                  a different name or negotiate to buy the domain.
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6 py-2">
                <h3 className="text-xl font-bold mb-2 text-gray-800">❌ Ignoring International Implications</h3>
                <p className="text-gray-700">
                  If you might expand globally, check that your name doesn't mean something embarrassing
                  or offensive in other languages. The Chevy Nova famously struggled in Spanish-speaking
                  markets (no va = "doesn't go").
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-rose-red">
                  Do I need to include "Inc.", "LLC", or "Corp." in my company name?
                </h3>
                <p className="text-gray-700">
                  Your legal registered name with the state must include a designator like "Inc.", "LLC",
                  "Corp.", "Ltd.", or similar (depending on your entity type and state requirements). However,
                  you can do business under a shorter "DBA" (Doing Business As) name for marketing purposes.
                  For example, your legal name might be "Acme Solutions, LLC" but you market as "Acme Solutions."
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-rose-red">
                  What's the difference between a company name and a trademark?
                </h3>
                <p className="text-gray-700">
                  Your company name is the legal entity registered with your state. A trademark protects
                  your brand name, logo, or slogan from being used by competitors. You should register both:
                  your company name with your state Secretary of State, and your trademark with the USPTO
                  (if you want federal protection). They can be the same or different.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-rose-red">
                  Can I change my company name later?
                </h3>
                <p className="text-gray-700">
                  Yes, but it's expensive and disruptive. You'll need to file amendments with your state,
                  update all legal documents, notify customers/vendors, rebrand all materials, and potentially
                  lose brand recognition. It's much better to invest time in choosing the right name upfront.
                  That said, major companies do rebrand (e.g., Facebook → Meta, Google → Alphabet as parent company).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-rose-red">
                  Should I choose a company name before or after incorporating?
                </h3>
                <p className="text-gray-700">
                  Choose the name BEFORE incorporating. You need to verify it's available in your state and
                  doesn't infringe on trademarks before you can legally register it. Most entrepreneurs follow
                  this process: 1) Brainstorm names, 2) Check availability (state + trademark + domain),
                  3) Reserve the name with your state, 4) File incorporation documents with that name.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-rose-red">
                  How long does trademark registration take?
                </h3>
                <p className="text-gray-700">
                  Federal trademark registration through USPTO typically takes 8-12 months from application
                  to approval (assuming no objections or conflicts). You can use the ™ symbol immediately
                  upon use in commerce, but you can't use the ® symbol until the trademark is officially
                  registered. Some companies use trademark attorneys to navigate the process faster.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-rose-red">
                  What if the .com domain is taken but the name is available?
                </h3>
                <p className="text-gray-700">
                  You have three options: 1) <strong>Buy the domain</strong> - Use a domain broker or contact
                  the owner directly (can cost $500-$50,000+ depending on the domain). 2) <strong>Use an alternative TLD</strong> -
                  Consider .io (popular with tech companies), .co, .ai, .app, or industry-specific TLDs.
                  3) <strong>Choose a different name</strong> - Often the smartest option. A great name with
                  an available .com is better than an okay name with domain complications.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-rose-red">
                  Can I use my personal name as my company name?
                </h3>
                <p className="text-gray-700">
                  Yes, and it's very common in professional services (law firms, consulting, agencies).
                  For example: "Jane Smith Consulting, LLC" or "Smith & Associates, Inc." The advantage is
                  it's usually available and builds personal brand equity. The disadvantage is it's harder
                  to sell the company later (buyers prefer names that don't depend on a specific person)
                  and it may limit growth if you bring on partners.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="glass-card rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Ready to Name Your Company?
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Use our AI-powered company name generator to create professional, credible names
              that inspire trust. Instantly check domain availability and secure your brand for just $49.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="glass-button inline-block px-8 py-4 rounded-2xl text-lg font-semibold text-white transition-all duration-300"
            >
              Generate Company Names Now
            </a>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <a href="/" className="hover:text-rose-red transition-colors">
          rose.glass
        </a>
        <p className="text-sm mt-2">Professional company name generation powered by AI</p>
      </footer>
    </div>
  )
}
