import type { Metadata } from "next";
import Script from "next/script";
import Navigation from "./components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rose.glass"),
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
      <body>
        {/* Google Ads Global Site Tag - Replace AW-XXXXXXXXX with your actual Google Ads ID */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-XXXXXXXXX'); // TODO: Replace with your Google Ads ID
          `}
        </Script>

        {/* Facebook Pixel - Optional, for Meta Ads (Replace XXXXXXXXXXXXXXX with your pixel ID) */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXX'); // TODO: Replace with your Facebook Pixel ID (optional)
            fbq('track', 'PageView');
          `}
        </Script>

        <Navigation />
        {children}
      </body>
    </html>
  );
}
