import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "rose.glass | AI Name Generator for Luxury Brands",
  description: "Premium AI-powered name generator for businesses, startups, and brands. Generate memorable names with instant domain availability checking.",
  keywords: "name generator, business name, brand name, startup name, AI naming, domain availability",
  openGraph: {
    title: "rose.glass | AI Name Generator",
    description: "Generate perfect names for your luxury brand with AI",
    url: "https://rose.glass",
    siteName: "rose.glass",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
