export type IndustryProfile = {
  id: string;
  name: string;
  icon: string;
  href: string;
  detailHref?: string;
  homeTeaser: string;
  why: string;
  capabilities: string[];
};

export const INDUSTRY_PROFILES: IndustryProfile[] = [
  {
    id: "agencies",
    name: "High-Ticket Agencies",
    icon: "🚀",
    href: "/industries/agencies/",
    detailHref: "/industries/agencies/",
    homeTeaser:
      "Move beyond referrals with an outbound system that creates more qualified opportunities.",
    why:
      "Agency growth stalls when pipeline depends on inconsistent referrals and founder-led follow-up.",
    capabilities: [
      "Positioning and offer definition that sharpen targeting in a crowded market.",
      "Human-led AI outreach designed to mirror founder-level nuance.",
      "Automated proof delivery embedded directly into outreach sequences.",
    ],
  },
  {
    id: "biotech",
    name: "Biotechnology & Life Sciences",
    icon: "🧬",
    href: "/industries/biotech/",
    detailHref: "/industries/biotech/",
    homeTeaser:
      "Precision outreach for complex science and long buying cycles.",
    why:
      "Biotech teams need evidence-based messaging and stakeholder-specific sequencing to win technical trust without wasting time on low-fit accounts.",
    capabilities: [
      "Advanced stakeholder mapping across PI, lab managers, and commercial leaders.",
      "Life science sales systems that translate technical depth into business value.",
    ],
  },
  {
    id: "logistics",
    name: "Logistics + Supply Chain",
    icon: "🚚",
    href: "/industries/logistics/",
    detailHref: "/industries/logistics/",
    homeTeaser:
      "High-volume outreach systems for 3PL and freight-forwarding growth teams.",
    why:
      "Logistics teams need scalable outbound that keeps relationship quality high and manual prospecting work low.",
    capabilities: [
      "High-volume lead generation for 3PL pipelines with safe execution controls.",
      "Real-time lead enrichment and prioritization triggered by market and shipment signals.",
    ],
  },
];
