import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Name Generator | Free AI Business Names - rose.glass',
  description: 'Generate unique, professional business names instantly with AI. Perfect for startups, entrepreneurs, and small businesses. Check domain availability for free.',
  keywords: 'business name generator, AI business names, company name ideas, startup names, business naming tool, domain availability checker',
  openGraph: {
    title: 'Business Name Generator | Free AI Business Names',
    description: 'Generate unique, professional business names instantly with AI. Check domain availability for free.',
    url: 'https://rose.glass/business-name-generator',
    siteName: 'rose.glass',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Business Name Generator | Free AI Business Names',
    description: 'Generate unique, professional business names instantly with AI. Check domain availability for free.',
  },
};

export default function BusinessNameGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
