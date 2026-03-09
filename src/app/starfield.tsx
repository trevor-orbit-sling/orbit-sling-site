"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const PLANET_STORAGE_KEY = "orbit_sling_planets_enabled";
const STARFIELD_STORAGE_KEY = "orbit_sling_stars_enabled";
const STAR_COUNTS = {
  far: 168,
  mid: 126,
  near: 92,
  bright: 42,
  scroll: 132,
} as const;
const COMETS = [
  {
    id: "comet-1",
    left: "4%",
    top: "17%",
    dx: "48vw",
    dy: "26vh",
    angle: "17deg",
    duration: "23s",
    delay: "-6.5s",
    size: "170px",
    opacity: "0.44",
    hueA: "rgba(255, 255, 255, 0.96)",
    hueB: "rgba(89, 102, 217, 0.72)",
  },
  {
    id: "comet-2",
    left: "24%",
    top: "66%",
    dx: "44vw",
    dy: "-30vh",
    angle: "-30deg",
    duration: "26s",
    delay: "-10.2s",
    size: "150px",
    opacity: "0.33",
    hueA: "rgba(255, 255, 255, 0.9)",
    hueB: "rgba(224, 26, 79, 0.64)",
  },
  {
    id: "comet-3",
    left: "58%",
    top: "10%",
    dx: "34vw",
    dy: "38vh",
    angle: "49deg",
    duration: "31s",
    delay: "-18.4s",
    size: "132px",
    opacity: "0.3",
    hueA: "rgba(255, 255, 255, 0.86)",
    hueB: "rgba(119, 76, 200, 0.6)",
  },
  {
    id: "comet-4",
    left: "72%",
    top: "58%",
    dx: "-38vw",
    dy: "-20vh",
    angle: "-152deg",
    duration: "24s",
    delay: "-3.1s",
    size: "142px",
    opacity: "0.36",
    hueA: "rgba(255, 255, 255, 0.94)",
    hueB: "rgba(89, 102, 217, 0.66)",
  },
  {
    id: "comet-5",
    left: "40%",
    top: "32%",
    dx: "40vw",
    dy: "14vh",
    angle: "19deg",
    duration: "28s",
    delay: "-14.6s",
    size: "118px",
    opacity: "0.28",
    hueA: "rgba(255, 255, 255, 0.84)",
    hueB: "rgba(224, 26, 79, 0.56)",
  },
  {
    id: "comet-6",
    left: "86%",
    top: "22%",
    dx: "-42vw",
    dy: "34vh",
    angle: "140deg",
    duration: "33s",
    delay: "-21.2s",
    size: "126px",
    opacity: "0.24",
    hueA: "rgba(255, 255, 255, 0.78)",
    hueB: "rgba(119, 76, 200, 0.5)",
  },
] as const;

type StarDensityProfile = "full" | "lite";

const STAR_RENDER_LIMITS: Record<
  StarDensityProfile,
  {
    far: number;
    mid: number;
    near: number;
    bright: number;
    scroll: number;
    comets: number;
  }
> = {
  full: {
    far: STAR_COUNTS.far,
    mid: STAR_COUNTS.mid,
    near: STAR_COUNTS.near,
    bright: STAR_COUNTS.bright,
    scroll: STAR_COUNTS.scroll,
    comets: COMETS.length,
  },
  lite: {
    far: 112,
    mid: 84,
    near: 64,
    bright: 30,
    scroll: 88,
    comets: 4,
  },
};

type CometStyle = CSSProperties & {
  "--comet-left": string;
  "--comet-top": string;
  "--comet-dx": string;
  "--comet-dy": string;
  "--comet-angle": string;
  "--comet-duration": string;
  "--comet-delay": string;
  "--comet-size": string;
  "--comet-opacity": string;
  "--comet-hue-a": string;
  "--comet-hue-b": string;
};

type PlanetStyle = CSSProperties & {
  "--planet-left": string;
  "--planet-top": string;
  "--planet-size": string;
  "--planet-opacity": string;
};

type MoonOrbitStyle = CSSProperties & {
  "--moon-orbit-size": string;
  "--moon-orbit-duration": string;
  "--moon-orbit-delay": string;
  "--moon-orbit-tilt": string;
  "--moon-orbit-opacity": string;
  "--moon-size": string;
};

type PlanetDepth = "near" | "mid" | "far";
type PlanetTheme = "indigo" | "violet" | "crimson" | "nebula";
type MoonConfig = {
  id: string;
  orbitSize: string;
  orbitDuration: string;
  orbitDelay: string;
  orbitTilt: string;
  orbitOpacity: string;
  size: string;
};

type PlanetConfig = {
  id: string;
  depth: PlanetDepth;
  theme: PlanetTheme;
  left: string;
  top: string;
  size: string;
  opacity: string;
  moons: readonly MoonConfig[];
};

type Hotspot = {
  x: number;
  y: number;
  spread: number;
  weight: number;
};

type StarPointVariant = "far" | "mid" | "near" | "bright" | "scroll";

type StarPoint = {
  id: string;
  variant: StarPointVariant;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blur: number;
  color: string;
};

type StarPointStyle = CSSProperties & {
  "--star-x": string;
  "--star-y": string;
  "--star-size": string;
  "--star-opacity": string;
  "--star-blur": string;
  "--star-color": string;
};

const LAYER_HOTSPOTS: Hotspot[][] = [
  [
    { x: 0.24, y: 0.18, spread: 0.2, weight: 1 },
    { x: 0.72, y: 0.34, spread: 0.2, weight: 0.9 },
    { x: 0.48, y: 0.76, spread: 0.16, weight: 0.7 },
  ],
  [
    { x: 0.18, y: 0.24, spread: 0.18, weight: 1 },
    { x: 0.62, y: 0.44, spread: 0.19, weight: 0.9 },
    { x: 0.84, y: 0.68, spread: 0.15, weight: 0.65 },
  ],
  [
    { x: 0.28, y: 0.16, spread: 0.15, weight: 1 },
    { x: 0.76, y: 0.52, spread: 0.17, weight: 0.86 },
    { x: 0.46, y: 0.82, spread: 0.12, weight: 0.6 },
  ],
];

const SCROLL_HOTSPOTS: Hotspot[] = [
  { x: 0.2, y: 0.14, spread: 0.16, weight: 1 },
  { x: 0.78, y: 0.22, spread: 0.18, weight: 0.85 },
  { x: 0.42, y: 0.48, spread: 0.19, weight: 0.8 },
  { x: 0.82, y: 0.74, spread: 0.15, weight: 0.72 },
  { x: 0.26, y: 0.88, spread: 0.13, weight: 0.66 },
];

const BRIGHT_HOTSPOTS: Hotspot[] = [
  { x: 0.16, y: 0.16, spread: 0.12, weight: 1 },
  { x: 0.72, y: 0.28, spread: 0.13, weight: 0.95 },
  { x: 0.44, y: 0.62, spread: 0.14, weight: 0.86 },
  { x: 0.82, y: 0.82, spread: 0.1, weight: 0.72 },
];

const PLANETS = [
  {
    id: "planet-a",
    depth: "near",
    theme: "indigo",
    left: "14%",
    top: "26%",
    size: "40px",
    opacity: "0.24",
    moons: [
      {
        id: "planet-a-moon-1",
        orbitSize: "72px",
        orbitDuration: "10.8s",
        orbitDelay: "-1.2s",
        orbitTilt: "18deg",
        orbitOpacity: "0.24",
        size: "3.8px",
      },
      {
        id: "planet-a-moon-2",
        orbitSize: "86px",
        orbitDuration: "14.6s",
        orbitDelay: "-4.3s",
        orbitTilt: "-8deg",
        orbitOpacity: "0.2",
        size: "4.2px",
      },
      {
        id: "planet-a-moon-3",
        orbitSize: "102px",
        orbitDuration: "18.8s",
        orbitDelay: "-7.5s",
        orbitTilt: "26deg",
        orbitOpacity: "0.16",
        size: "3.2px",
      },
      {
        id: "planet-a-moon-4",
        orbitSize: "116px",
        orbitDuration: "22.2s",
        orbitDelay: "-9.4s",
        orbitTilt: "-18deg",
        orbitOpacity: "0.13",
        size: "2.8px",
      },
      {
        id: "planet-a-moon-5",
        orbitSize: "132px",
        orbitDuration: "27.4s",
        orbitDelay: "-12.8s",
        orbitTilt: "34deg",
        orbitOpacity: "0.1",
        size: "2.4px",
      },
    ],
  },
  {
    id: "planet-b",
    depth: "far",
    theme: "crimson",
    left: "84%",
    top: "34%",
    size: "24px",
    opacity: "0.2",
    moons: [
      {
        id: "planet-b-moon-1",
        orbitSize: "44px",
        orbitDuration: "9.6s",
        orbitDelay: "-3.1s",
        orbitTilt: "-24deg",
        orbitOpacity: "0.2",
        size: "2.6px",
      },
      {
        id: "planet-b-moon-2",
        orbitSize: "60px",
        orbitDuration: "13.4s",
        orbitDelay: "-5.2s",
        orbitTilt: "10deg",
        orbitOpacity: "0.14",
        size: "2.1px",
      },
    ],
  },
  {
    id: "planet-c",
    depth: "mid",
    theme: "violet",
    left: "66%",
    top: "76%",
    size: "34px",
    opacity: "0.22",
    moons: [
      {
        id: "planet-c-moon-1",
        orbitSize: "68px",
        orbitDuration: "11.6s",
        orbitDelay: "-2.4s",
        orbitTilt: "32deg",
        orbitOpacity: "0.22",
        size: "3.4px",
      },
      {
        id: "planet-c-moon-2",
        orbitSize: "82px",
        orbitDuration: "15.2s",
        orbitDelay: "-6.8s",
        orbitTilt: "-16deg",
        orbitOpacity: "0.18",
        size: "3px",
      },
      {
        id: "planet-c-moon-3",
        orbitSize: "96px",
        orbitDuration: "19.5s",
        orbitDelay: "-10.1s",
        orbitTilt: "14deg",
        orbitOpacity: "0.15",
        size: "2.7px",
      },
      {
        id: "planet-c-moon-4",
        orbitSize: "114px",
        orbitDuration: "24.8s",
        orbitDelay: "-14.3s",
        orbitTilt: "-30deg",
        orbitOpacity: "0.11",
        size: "2.3px",
      },
    ],
  },
  {
    id: "planet-d",
    depth: "far",
    theme: "nebula",
    left: "32%",
    top: "70%",
    size: "20px",
    opacity: "0.16",
    moons: [
      {
        id: "planet-d-moon-1",
        orbitSize: "40px",
        orbitDuration: "14.8s",
        orbitDelay: "-6.2s",
        orbitTilt: "12deg",
        orbitOpacity: "0.15",
        size: "1.9px",
      },
    ],
  },
] as const satisfies readonly PlanetConfig[];

function createRng(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function starColor(random: () => number) {
  const tone = random();

  if (tone < 0.72) {
    return `rgba(255, 255, 255, ${(0.34 + random() * 0.56).toFixed(3)})`;
  }

  if (tone < 0.84) {
    return `rgba(89, 102, 217, ${(0.2 + random() * 0.3).toFixed(3)})`;
  }

  if (tone < 0.94) {
    return `rgba(119, 76, 200, ${(0.18 + random() * 0.28).toFixed(3)})`;
  }

  return `rgba(224, 26, 79, ${(0.18 + random() * 0.26).toFixed(3)})`;
}

function brightStarColor(random: () => number) {
  const tone = random();

  if (tone < 0.66) {
    return `rgba(255, 255, 255, ${(0.7 + random() * 0.26).toFixed(3)})`;
  }

  if (tone < 0.84) {
    return `rgba(196, 217, 255, ${(0.62 + random() * 0.26).toFixed(3)})`;
  }

  if (tone < 0.94) {
    return `rgba(154, 181, 255, ${(0.58 + random() * 0.3).toFixed(3)})`;
  }

  return `rgba(255, 220, 245, ${(0.58 + random() * 0.28).toFixed(3)})`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function resolveViewportCoordinate(rawValue: string, viewportSize: number, fallbackRatio = 0.5) {
  const value = rawValue.trim();

  if (value.endsWith("%")) {
    const parsedPercent = Number.parseFloat(value);

    if (Number.isFinite(parsedPercent)) {
      return clamp((parsedPercent / 100) * viewportSize, 0, viewportSize);
    }
  }

  const parsedLength = Number.parseFloat(value);

  if (Number.isFinite(parsedLength)) {
    return clamp(parsedLength, 0, viewportSize);
  }

  return viewportSize * fallbackRatio;
}

function pickHotspot(hotspots: Hotspot[], random: () => number) {
  const totalWeight = hotspots.reduce((sum, spot) => sum + spot.weight, 0);
  let threshold = random() * totalWeight;

  for (const hotspot of hotspots) {
    threshold -= hotspot.weight;

    if (threshold <= 0) {
      return hotspot;
    }
  }

  return hotspots[hotspots.length - 1];
}

type BuildStarPointsOptions = {
  variant: StarPointVariant;
  count: number;
  seed: number;
  hotspots?: Hotspot[];
  hotspotChance?: number;
  sizeRange: [number, number];
  opacityRange: [number, number];
  blurRange: [number, number];
};

function buildStarPoints({
  variant,
  count,
  seed,
  hotspots = [],
  hotspotChance = 0.6,
  sizeRange,
  opacityRange,
  blurRange,
}: BuildStarPointsOptions) {
  const random = createRng(seed);
  const stars: StarPoint[] = [];

  for (let index = 0; index < count; index += 1) {
    let x: number;
    let y: number;

    if (hotspots.length > 0 && random() < hotspotChance) {
      const hotspot = pickHotspot(hotspots, random);
      const angle = random() * Math.PI * 2;
      const radius = Math.pow(random(), 0.72) * hotspot.spread;
      x = clamp(hotspot.x + Math.cos(angle) * radius, 0, 1);
      y = clamp(hotspot.y + Math.sin(angle) * radius, 0, 1);
    } else {
      x = random();
      y = random();
    }

    const size = sizeRange[0] + random() * (sizeRange[1] - sizeRange[0]);
    const opacity = opacityRange[0] + random() * (opacityRange[1] - opacityRange[0]);
    const blur = blurRange[0] + random() * (blurRange[1] - blurRange[0]);
    const color = variant === "bright" ? brightStarColor(random) : starColor(random);

    stars.push({
      id: `${variant}-${index}`,
      variant,
      x,
      y,
      size,
      opacity,
      blur,
      color,
    });
  }

  return stars;
}

const FAR_STARS = buildStarPoints({
  variant: "far",
  count: STAR_COUNTS.far,
  seed: 19031,
  hotspots: LAYER_HOTSPOTS[0],
  hotspotChance: 0.62,
  sizeRange: [0.7, 1.6],
  opacityRange: [0.2, 0.54],
  blurRange: [0, 0.15],
});

const MID_STARS = buildStarPoints({
  variant: "mid",
  count: STAR_COUNTS.mid,
  seed: 22117,
  hotspots: LAYER_HOTSPOTS[1],
  hotspotChance: 0.64,
  sizeRange: [0.95, 1.95],
  opacityRange: [0.24, 0.6],
  blurRange: [0.04, 0.2],
});

const NEAR_STARS = buildStarPoints({
  variant: "near",
  count: STAR_COUNTS.near,
  seed: 25219,
  hotspots: LAYER_HOTSPOTS[2],
  hotspotChance: 0.66,
  sizeRange: [1.1, 2.3],
  opacityRange: [0.3, 0.72],
  blurRange: [0.08, 0.28],
});

const BRIGHT_STARS = buildStarPoints({
  variant: "bright",
  count: STAR_COUNTS.bright,
  seed: 28183,
  hotspots: BRIGHT_HOTSPOTS,
  hotspotChance: 0.74,
  sizeRange: [1.6, 3.2],
  opacityRange: [0.56, 0.94],
  blurRange: [0.1, 0.34],
});

const SCROLL_STARS = buildStarPoints({
  variant: "scroll",
  count: STAR_COUNTS.scroll,
  seed: 32003,
  hotspots: SCROLL_HOTSPOTS,
  hotspotChance: 0.68,
  sizeRange: [1.2, 2.4],
  opacityRange: [0.24, 0.62],
  blurRange: [0.06, 0.26],
});

function toStarPointStyle(star: StarPoint): StarPointStyle {
  return {
    "--star-x": `${(star.x * 100).toFixed(3)}%`,
    "--star-y": `${(star.y * 100).toFixed(3)}%`,
    "--star-size": `${star.size.toFixed(2)}px`,
    "--star-opacity": `${star.opacity.toFixed(3)}`,
    "--star-blur": `${star.blur.toFixed(2)}px`,
    "--star-color": star.color,
  };
}

export default function Starfield() {
  const starfieldRef = useRef<HTMLDivElement | null>(null);
  const starfieldScrollRef = useRef<HTMLDivElement | null>(null);
  const planetRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [areStarsEnabled, setAreStarsEnabled] = useState(true);
  const [hasLoadedStarsPreference, setHasLoadedStarsPreference] = useState(false);
  const [arePlanetsEnabled, setArePlanetsEnabled] = useState(true);
  const [hasLoadedPlanetsPreference, setHasLoadedPlanetsPreference] = useState(false);
  const [starDensityProfile, setStarDensityProfile] = useState<StarDensityProfile>("full");

  useEffect(() => {
    const applyDensityProfile = () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const smallViewport = window.innerWidth < 1024;
      const limitedCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 6;
      const maybeMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const limitedMemory = typeof maybeMemory === "number" && maybeMemory <= 4;
      const useLiteProfile = reducedMotion || coarsePointer || smallViewport || limitedCpu || limitedMemory;

      setStarDensityProfile(useLiteProfile ? "lite" : "full");
    };

    applyDensityProfile();
    window.addEventListener("resize", applyDensityProfile);

    return () => {
      window.removeEventListener("resize", applyDensityProfile);
    };
  }, []);

  const renderedStars = useMemo(() => {
    const limits = STAR_RENDER_LIMITS[starDensityProfile];

    return {
      far: FAR_STARS.slice(0, limits.far),
      mid: MID_STARS.slice(0, limits.mid),
      near: NEAR_STARS.slice(0, limits.near),
      bright: BRIGHT_STARS.slice(0, limits.bright),
      scroll: SCROLL_STARS.slice(0, limits.scroll),
    };
  }, [starDensityProfile]);

  const visibleComets = useMemo(() => {
    const limits = STAR_RENDER_LIMITS[starDensityProfile];
    return COMETS.slice(0, limits.comets);
  }, [starDensityProfile]);

  useEffect(() => {
    try {
      setAreStarsEnabled(window.localStorage.getItem(STARFIELD_STORAGE_KEY) !== "off");
    } catch {
      // Ignore storage access issues.
    } finally {
      setHasLoadedStarsPreference(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStarsPreference) {
      return;
    }

    try {
      window.localStorage.setItem(STARFIELD_STORAGE_KEY, areStarsEnabled ? "on" : "off");
    } catch {
      // Ignore storage access issues.
    }
  }, [areStarsEnabled, hasLoadedStarsPreference]);

  useEffect(() => {
    try {
      setArePlanetsEnabled(window.localStorage.getItem(PLANET_STORAGE_KEY) !== "off");
    } catch {
      // Ignore storage access issues.
    } finally {
      setHasLoadedPlanetsPreference(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedPlanetsPreference) {
      return;
    }

    try {
      window.localStorage.setItem(PLANET_STORAGE_KEY, arePlanetsEnabled ? "on" : "off");
    } catch {
      // Ignore storage access issues.
    }
  }, [arePlanetsEnabled, hasLoadedPlanetsPreference]);

  useEffect(() => {
    const starfield = starfieldRef.current;
    const starfieldScroll = starfieldScrollRef.current;

    if (!starfield) {
      return;
    }

    if (!areStarsEnabled) {
      starfield.style.setProperty("--stars-parallax-x", "0px");
      starfield.style.setProperty("--stars-parallax-y", "0px");
      starfieldScroll?.style.setProperty("--comet-heading-angle", "0deg");
      starfieldScroll?.style.setProperty("--comet-heading-x", "0px");
      starfieldScroll?.style.setProperty("--comet-heading-y", "0px");
      return;
    }
    let rafId = 0;
    let isActive = false;
    let idleFrameCount = 0;

    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      starfield.style.setProperty("--stars-parallax-x", "0px");
      starfield.style.setProperty("--stars-parallax-y", "0px");
      starfieldScroll?.style.setProperty("--comet-heading-angle", "0deg");
      starfieldScroll?.style.setProperty("--comet-heading-x", "0px");
      starfieldScroll?.style.setProperty("--comet-heading-y", "0px");
      return;
    }

    const driftStrengthX = starDensityProfile === "lite" ? 12 : 18;
    const driftStrengthY = starDensityProfile === "lite" ? 9 : 14;
    const headingScale = starDensityProfile === "lite" ? 2 : 2.4;
    const easing = starDensityProfile === "lite" ? 0.12 : 0.08;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      starfield.style.setProperty("--stars-parallax-x", `${currentX.toFixed(3)}px`);
      starfield.style.setProperty("--stars-parallax-y", `${currentY.toFixed(3)}px`);

      if (starfieldScroll) {
        const magnitude = Math.min(1, Math.hypot(currentX / driftStrengthX, currentY / driftStrengthY));
        const headingAngle = Math.atan2(currentY, currentX) * (180 / Math.PI);
        const angleOffset = headingAngle * magnitude;
        const headingX = currentX * headingScale;
        const headingY = currentY * headingScale;

        starfieldScroll.style.setProperty("--comet-heading-angle", `${angleOffset.toFixed(2)}deg`);
        starfieldScroll.style.setProperty("--comet-heading-x", `${headingX.toFixed(2)}px`);
        starfieldScroll.style.setProperty("--comet-heading-y", `${headingY.toFixed(2)}px`);
      }

      const delta = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);

      if (delta < 0.05) {
        idleFrameCount += 1;
      } else {
        idleFrameCount = 0;
      }

      if (idleFrameCount > 12) {
        isActive = false;
        rafId = 0;
        return;
      }

      rafId = window.requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (isActive) {
        return;
      }

      isActive = true;
      idleFrameCount = 0;
      rafId = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const xRatio = event.clientX / window.innerWidth - 0.5;
      const yRatio = event.clientY / window.innerHeight - 0.5;

      targetX = -xRatio * driftStrengthX;
      targetY = -yRatio * driftStrengthY;
      startLoop();
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      startLoop();
    };

    startLoop();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
    };
  }, [areStarsEnabled, starDensityProfile]);

  useEffect(() => {
    const resetPlanetReveal = () => {
      for (const planetNode of planetRefs.current) {
        planetNode?.style.setProperty("--planet-cursor-proximity", "0");
      }
    };

    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!arePlanetsEnabled || !supportsFinePointer || prefersReducedMotion) {
      resetPlanetReveal();
      return;
    }

    const easing = starDensityProfile === "lite" ? 0.2 : 0.14;
    const radiusFactor = starDensityProfile === "lite" ? 0.36 : 0.42;
    const maxRadius = starDensityProfile === "lite" ? 520 : 620;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;
    let isActive = false;
    let idleFrameCount = 0;
    let revealRadius = Math.min(Math.max(window.innerWidth, window.innerHeight) * radiusFactor, maxRadius);
    let planetCenters = PLANETS.map((planet) => ({
      x: resolveViewportCoordinate(planet.left, window.innerWidth),
      y: resolveViewportCoordinate(planet.top, window.innerHeight),
    }));

    const render = () => {
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      for (const [planetIndex, planetNode] of planetRefs.current.entries()) {
        if (!planetNode) {
          continue;
        }

        const center = planetCenters[planetIndex];

        if (!center) {
          continue;
        }

        const distance = Math.hypot(center.x - currentX, center.y - currentY);
        const proximity = clamp(1 - distance / revealRadius, 0, 1);

        planetNode.style.setProperty("--planet-cursor-proximity", proximity.toFixed(3));
      }

      const delta = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);

      if (delta < 0.12) {
        idleFrameCount += 1;
      } else {
        idleFrameCount = 0;
      }

      if (idleFrameCount > 14) {
        isActive = false;
        rafId = 0;
        return;
      }

      rafId = window.requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (isActive) {
        return;
      }

      isActive = true;
      idleFrameCount = 0;
      rafId = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      startLoop();
    };

    const handleMouseLeave = () => {
      targetX = window.innerWidth * 0.5;
      targetY = window.innerHeight * 0.5;
      startLoop();
    };

    const handleResize = () => {
      revealRadius = Math.min(Math.max(window.innerWidth, window.innerHeight) * radiusFactor, maxRadius);
      targetX = Math.min(targetX, window.innerWidth);
      targetY = Math.min(targetY, window.innerHeight);
      planetCenters = PLANETS.map((planet) => ({
        x: resolveViewportCoordinate(planet.left, window.innerWidth),
        y: resolveViewportCoordinate(planet.top, window.innerHeight),
      }));
      startLoop();
    };

    startLoop();
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      resetPlanetReveal();
    };
  }, [arePlanetsEnabled, starDensityProfile]);

  return (
    <>
      <div
        className={`starfield${areStarsEnabled ? "" : " is-disabled"}${starDensityProfile === "lite" ? " is-lite" : ""}`}
        ref={starfieldRef}
        aria-hidden="true"
      >
        <div className="star-layer star-layer-far">
          {renderedStars.far.map((star) => (
            <span key={star.id} className="star-point" style={toStarPointStyle(star)} />
          ))}
        </div>
        <div className="star-layer star-layer-mid">
          <div className="star-rotator">
            {renderedStars.mid.map((star) => (
              <span key={star.id} className="star-point" style={toStarPointStyle(star)} />
            ))}
          </div>
        </div>
        <div className="star-layer star-layer-near">
          {renderedStars.near.map((star) => (
            <span key={star.id} className="star-point" style={toStarPointStyle(star)} />
          ))}
        </div>
        <div className="star-layer star-layer-bright">
          {renderedStars.bright.map((star) => (
            <span key={star.id} className="star-point star-point-bright" style={toStarPointStyle(star)} />
          ))}
        </div>
      </div>
      {arePlanetsEnabled ? (
        <div className="planetarium" aria-hidden="true">
          {PLANETS.map((planet, planetIndex) => {
            const style: PlanetStyle = {
              "--planet-left": planet.left,
              "--planet-top": planet.top,
              "--planet-size": planet.size,
              "--planet-opacity": planet.opacity,
            };

            return (
              <span
                key={planet.id}
                className={`planet-system planet-system--${planet.depth} planet-theme--${planet.theme}`}
                style={style}
                ref={(node) => {
                  planetRefs.current[planetIndex] = node;
                }}
              >
                <span className="planet-body" />
                {planet.moons.map((moon, moonIndex) => {
                  const moonStyle: MoonOrbitStyle = {
                    "--moon-orbit-size": moon.orbitSize,
                    "--moon-orbit-duration": moon.orbitDuration,
                    "--moon-orbit-delay": moon.orbitDelay,
                    "--moon-orbit-tilt": moon.orbitTilt,
                    "--moon-orbit-opacity": moon.orbitOpacity,
                    "--moon-size": moon.size,
                  };

                  return (
                    <span
                      key={moon.id}
                      className={`planet-orbit-path${moonIndex % 2 === 1 ? " is-retrograde" : ""}`}
                      style={moonStyle}
                    >
                      <span className="planet-moon" />
                    </span>
                  );
                })}
              </span>
            );
          })}
        </div>
      ) : null}
      <div
        className={`starfield-scroll${areStarsEnabled ? "" : " is-disabled"}${starDensityProfile === "lite" ? " is-lite" : ""}`}
        ref={starfieldScrollRef}
        aria-hidden="true"
      >
        <div className="star-layer star-layer-scroll">
          {renderedStars.scroll.map((star) => (
            <span key={star.id} className="star-point star-point-scroll" style={toStarPointStyle(star)} />
          ))}
        </div>
        <div className="comet-field">
          {visibleComets.map((comet) => {
            const style: CometStyle = {
              "--comet-left": comet.left,
              "--comet-top": comet.top,
              "--comet-dx": comet.dx,
              "--comet-dy": comet.dy,
              "--comet-angle": comet.angle,
              "--comet-duration": comet.duration,
              "--comet-delay": comet.delay,
              "--comet-size": comet.size,
              "--comet-opacity": comet.opacity,
              "--comet-hue-a": comet.hueA,
              "--comet-hue-b": comet.hueB,
            };

            return <span key={comet.id} className="comet" style={style} />;
          })}
        </div>
      </div>
      <button
        type="button"
        className="stars-toggle"
        onClick={() => setAreStarsEnabled((previous) => !previous)}
        aria-pressed={areStarsEnabled}
        aria-label={areStarsEnabled ? "Turn stars off" : "Turn stars on"}
      >
        <span className="toggle-symbol" aria-hidden="true">
          ✦
        </span>
      </button>
      <button
        type="button"
        className="planet-toggle"
        onClick={() => setArePlanetsEnabled((previous) => !previous)}
        aria-pressed={arePlanetsEnabled}
        aria-label={arePlanetsEnabled ? "Turn planets off" : "Turn planets on"}
      >
        <span className="toggle-symbol" aria-hidden="true">
          🪐
        </span>
      </button>
    </>
  );
}
