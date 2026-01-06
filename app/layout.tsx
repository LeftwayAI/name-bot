import type { Metadata } from "next";
import Script from "next/script";
import Navigation from "./components/Navigation";
import { satoshi } from "./fonts";
import "./globals.css";

// Tracking IDs - set these in environment variables when ready
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

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
    <html lang="en" className={satoshi.variable}>
      <body>
        {/* Google Ads Global Site Tag - only loads if ID is configured */}
        {GOOGLE_ADS_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel - only loads if ID is configured */}
        {FACEBOOK_PIXEL_ID && (
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
              fbq('init', '${FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        <Navigation />
        {children}
      </body>
    </html>
  );
}
