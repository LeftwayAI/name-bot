import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Startup Name Ideas | AI-Powered Startup Name Generator - rose.glass',
  description: 'Get creative startup name ideas with AI. Generate memorable, brandable startup names with instant domain availability checking. Perfect for founders and entrepreneurs.',
  keywords: 'startup name ideas, startup name generator, startup names, tech startup names, AI startup naming, brandable startup names, domain availability',
  openGraph: {
    title: 'Startup Name Ideas | AI-Powered Startup Name Generator',
    description: 'Get creative startup name ideas with AI. Generate memorable, brandable startup names with instant domain availability checking.',
    url: 'https://rose.glass/startup-name-ideas',
    siteName: 'rose.glass',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Startup Name Ideas | AI-Powered Startup Name Generator',
    description: 'Get creative startup name ideas with AI. Generate memorable, brandable startup names with instant domain availability checking.',
  },
};

export default function StartupNameIdeasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
