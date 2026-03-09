const FALLBACK_SITE_URL = "https://www.orbitsling.com";

function normalizeSiteUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    if (!/^https?:$/.test(parsed.protocol)) {
      return FALLBACK_SITE_URL;
    }

    return parsed.toString().replace(/\/+$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? FALLBACK_SITE_URL
  );
}

export const SITE_URL = getSiteUrl();
