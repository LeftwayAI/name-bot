import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company Name Generator | Professional Business Names - rose.glass',
  description: 'Generate professional, credible company names for incorporation, rebranding, and corporate identity. AI-powered name generation with instant domain availability checking. Create names that inspire trust and command respect.',
  keywords: [
    'company name generator',
    'professional company names',
    'corporate name generator',
    'business incorporation names',
    'company naming ideas',
    'corporate identity',
    'business name ideas',
    'company rebranding',
    'LLC name generator',
    'corporation names',
    'trademark search',
    'business name availability',
  ],
  openGraph: {
    title: 'Company Name Generator | Professional Business Names',
    description: 'Generate professional, credible company names for incorporation and corporate identity. AI-powered with instant domain availability.',
    url: 'https://rose.glass/company-name-generator',
    siteName: 'rose.glass',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'rose.glass Company Name Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Name Generator | Professional Business Names',
    description: 'Generate professional, credible company names for incorporation and corporate identity. AI-powered with instant domain availability.',
    images: ['/og-image.png'],
  },
}

export default function CompanyNameGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
