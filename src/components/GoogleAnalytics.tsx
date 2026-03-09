"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const GOOGLE_ANALYTICS_ID = "G-C2BPK0F0BG";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag || !pathname) {
      return;
    }

    window.gtag("config", GOOGLE_ANALYTICS_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
