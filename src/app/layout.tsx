import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import HeaderScrollState from "@/components/HeaderScrollState";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const ICON_VERSION = "20260213c";
const DEFAULT_OG_IMAGE = "/assets/brand/logo-square.png";

const STRUCTURED_DATA = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Orbit Sling",
    url: SITE_URL,
    logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    sameAs: ["https://www.linkedin.com/company/orbit-sling"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Orbit Sling",
    url: SITE_URL,
  },
]);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Orbit Sling | Human-Led AI Systems for Sales Leaders",
    template: "%s | Orbit Sling",
  },
  description:
    "Orbit Sling builds outbound, automation, and RevOps systems for sales leaders who need more qualified pipeline, faster follow-up, and cleaner revenue visibility.",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Orbit Sling",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 1200,
        alt: "Orbit Sling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [
      {
        url: `/assets/brand/favicon-light-32.png?v=${ICON_VERSION}`,
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: `/assets/brand/favicon-dark-32.png?v=${ICON_VERSION}`,
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: `/assets/brand/favicon-light-16.png?v=${ICON_VERSION}`,
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: `/assets/brand/favicon-dark-16.png?v=${ICON_VERSION}`,
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: `/assets/brand/favicon-32.png?v=${ICON_VERSION}`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `/assets/brand/favicon-16.png?v=${ICON_VERSION}`,
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: `/favicon.ico?v=${ICON_VERSION}`,
    apple: [
      {
        url: `/assets/brand/apple-touch-icon.png?v=${ICON_VERSION}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <GoogleAnalytics />
        <HeaderScrollState />
        {children}
        <script
          type="application/ld+json"
          // Static structured data for baseline Organization/WebSite schema.
          dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
        />
      </body>
    </html>
  );
}
