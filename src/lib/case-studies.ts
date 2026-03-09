export type CaseStudy = {
  id: string;
  eyebrow: string;
  company: string;
  cardTitle: string;
  cardDetail: string;
  ctaLabel: string;
  headline: string;
  summary: string;
  chips: string[];
  overview: Array<{
    value: string;
    label: string;
  }>;
  background: {
    title: string;
    paragraphs: string[];
  };
  implementation: {
    title: string;
    intro: string;
    phases: Array<{
      name: string;
      description: string;
    }>;
  };
  results: {
    title: string;
    timeframe: string;
    summary: string;
    metrics: Array<{
      value: string;
      label: string;
      detail?: string;
    }>;
    chart: {
      title: string;
      subtitle: string;
      stages: Array<{
        label: string;
        count: number;
        note: string;
      }>;
    };
    footnote: string;
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "marketing-analytics-attribution",
    eyebrow: "Case Study",
    company: "Analytics & Data Agency",
    cardTitle: "Found clearer market focus and drove $53K in MRR opportunities",
    cardDetail:
      "We helped the team test three niches, sharpen messaging for each one, and build founder-manageable pipeline without relying only on referrals.",
    ctaLabel: "Open case study",
    headline: "Testing three ICPs until one started showing real commercial signal.",
    summary:
      "A profitable analytics and data agency needed more than revenue. They needed clarity on who to target, what messaging resonated, and how to grow without creating more demand than the founder could personally handle.",
    chips: ["ICP validation", "Founder-led sales", "Test / validate / scale"],
    overview: [
      { value: "3", label: "Niches tested" },
      { value: "3-4", label: "Founder call slots per week" },
      { value: "141", label: "Leads worked" },
      { value: "$53K", label: "MRR opportunities created" },
    ],
    background: {
      title: "From a profitable business to a clearer market focus",
      paragraphs: [
        "This analytics and data agency came to us with a good problem on paper: the business was already profitable. The issue was that growth still leaned heavily on repeat work and referrals, which made it hard to know where proactive outbound should focus.",
        "The team had already identified three plausible niches, but they still needed to understand each persona's sharpest pain points, the messaging each would respond to, and which market had the strongest commercial signal. Time was the main constraint. The founder was still deep in day-to-day delivery, was the only person who could run sales calls, and only had room for 3 to 4 meetings per week.",
      ],
    },
    implementation: {
      title: "We treated the engagement like a structured market test",
      intro:
        "We broke the work into test, validate, and scale so the team could learn quickly, protect the founder's bandwidth, and avoid guessing their way into a niche.",
      phases: [
        {
          name: "Test",
          description:
            "Mapped pain points and messaging for three target groups: marketing agencies needing a fractional data team, SaaS companies needing stronger marketing measurement, and ecommerce brands needing stronger attribution plus board-ready reporting.",
        },
        {
          name: "Validate",
          description:
            "Ran outreach across each segment and compared response quality, meeting quality, and proposal momentum to see which audience was showing real buying intent.",
        },
        {
          name: "Scale",
          description:
            "Concentrated effort around the strongest audience and messaging once the signal was clear, instead of spreading attention across all three niches.",
        },
      ],
    },
    results: {
      title: "The campaign created pipeline and removed a lot of strategic guesswork",
      timeframe: "During the initial engagement period",
      summary:
        "The outcome was not just more pipeline. The team left with better market focus, sharper positioning, and a more scalable growth path than relying on referrals alone.",
      metrics: [
        { value: "$53K", label: "MRR opportunities created", detail: "Around half already closed" },
        { value: "25", label: "Sales meetings" },
        { value: "141", label: "Leads worked" },
        { value: "18", label: "Proposals sent" },
        { value: "8", label: "Projects closed" },
      ],
      chart: {
        title: "Pipeline progression",
        subtitle: "Relative to the total lead pool worked.",
        stages: [
          { label: "Leads worked", count: 141, note: "Prospects worked across the three niche tests." },
          { label: "Sales meetings", count: 25, note: "Kept within the founder's realistic weekly capacity." },
          {
            label: "Proposals sent",
            count: 18,
            note: "Strong enough traction to move into serious buying conversations.",
          },
          { label: "Projects closed", count: 8, note: "Closed work from validated outbound, not just repeat business." },
        ],
      },
      footnote: "Around half of the created MRR opportunity has already converted into closed business.",
    },
  },
  {
    id: "small-business-loans",
    eyebrow: "Case Study",
    company: "Small Business Loans",
    cardTitle: "Built an AI lead nurturing system that averaged 76 meetings per business day",
    cardDetail:
      "We built a full AI chat follow-up system for a high-volume lender and turned a constant stream of inbound demand into booked conversations at a much higher daily pace.",
    ctaLabel: "Open case study",
    headline: "Turning high-volume inbound loan demand into booked meetings at scale.",
    summary:
      "This lender had volume. The challenge was operational. Too many leads were coming in for manual follow-up to keep pace, which meant good opportunities could stall before they ever reached a human conversation.",
    chips: ["AI chat nurturing", "High-volume lead flow", "Booking automation"],
    overview: [
      { value: "45-day", label: "rollout period" },
      { value: "75", label: "Average meetings per business day" },
      { value: "206", label: "Peak meetings in one day" },
      { value: "AI", label: "Chat-led nurturing layer" },
    ],
    background: {
      title: "A volume-heavy lending business needed speed, not more manual follow-up",
      paragraphs: [
        "This small business loans client operated in a high-volume environment where leads were arriving fast and consistently. The opportunity was there, but manual lead handling was never going to keep up with that pace for long.",
        "They needed a way to qualify interest, keep conversations moving, and convert more inbound demand into scheduled meetings without relying on people to respond to every lead in real time. The core problem was throughput: how do you keep speed high when volume spikes?",
      ],
    },
    implementation: {
      title: "We built an AI chat nurturing layer designed for volume",
      intro:
        "The system was built to engage leads quickly, continue the conversation automatically, and move qualified prospects into booked meetings without requiring constant human intervention.",
      phases: [
        {
          name: "Test",
          description:
            "Structured the AI chat flow around the most common lead intents, objections, and booking paths so conversations could move naturally toward a meeting.",
        },
        {
          name: "Validate",
          description:
            "Monitored how the chat system performed under real inbound volume and refined the prompts, routing, and handoff logic based on booking behavior.",
        },
        {
          name: "Scale",
          description:
            "Expanded the system across the full lead stream once it proved it could handle volume consistently and keep meetings flowing at a higher daily rate.",
        },
      ],
    },
    results: {
      title: "The system turned volume into booking output fast",
      timeframe: "Over a 45-day period",
      summary:
        "The main win was leverage. Instead of treating lead follow-up like a manual bottleneck, the client had a system that could absorb heavy inbound flow and still keep meetings landing on the calendar.",
      metrics: [
        { value: "75", label: "Average meetings booked per business day" },
        { value: "45", label: "Days of measured performance" },
        { value: "206", label: "Meetings booked in the best single day", detail: "Recorded in February" },
      ],
      chart: {
        title: "Booking velocity",
        subtitle: "Average daily output versus the highest-volume day recorded.",
        stages: [
          { label: "Average business day", count: 15, note: "Steady daily meeting output during the 45-day run." },
          { label: "10 average days", count: 150, note: "Shows how quickly volume compounds when booking is automated." },
          { label: "Peak day in February", count: 206, note: "One day alone produced 206 meetings booked." },
        ],
      },
      footnote: "The standout peak came in February, when the system booked 206 meetings in a single day.",
    },
  },
];
