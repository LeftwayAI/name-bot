import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Name Generator - AI-Powered Brand Naming Tool | Free',
  description: 'Create memorable, impactful brand names with AI. Get unique brand name ideas instantly. Perfect for new businesses, products, and rebranding. 100% free.',
  keywords: [
    'brand name generator',
    'brand naming tool',
    'AI brand name generator',
    'brand name ideas',
    'creative brand names',
    'brand naming',
    'business brand names',
    'product brand names',
    'brand identity',
    'memorable brand names',
    'unique brand names',
    'brand name creation',
  ],
  openGraph: {
    title: 'Brand Name Generator - AI-Powered Brand Naming Tool',
    description: 'Create memorable, impactful brand names with AI. Get unique brand name ideas instantly for your business or product.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Name Generator - AI-Powered Brand Naming Tool',
    description: 'Create memorable, impactful brand names with AI. Get unique brand name ideas instantly for your business or product.',
  },
};

export default function BrandNameGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
