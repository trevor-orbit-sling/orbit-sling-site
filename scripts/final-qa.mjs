import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const OUTPUT_DIR = path.resolve("tmp/final-qa");

const expectedRoutes = [
  "/",
  "/team/",
  "/our-philosophy/",
  "/how-it-works-prototype/",
  "/how-it-works/",
  "/services/outbound-engine/",
  "/services/automation/",
  "/services/revops/",
  "/industries/",
  "/industries/agencies/",
  "/industries/biotech/",
  "/industries/logistics/",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function verifyRoute(page, route) {
  const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
  assert(response && response.ok(), `Route ${route} did not return OK`);
  await page.waitForLoadState("networkidle");
  assert((await page.locator("main").count()) > 0, `Route ${route} did not render <main>`);
}

async function collectConsole(page, label, log) {
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      log.push(`[${label}] console error: ${msg.text()}`);
    }
  });

  page.on("pageerror", (error) => {
    log.push(`[${label}] page error: ${error.message}`);
  });
}

async function getRect(page, selector) {
  return page.locator(selector).evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    };
  });
}

async function runDesktopChecks(page) {
  await verifyRoute(page, "/");

  await page.screenshot({ path: path.join(OUTPUT_DIR, "home-desktop.png"), fullPage: false });

  await page.locator("h1").waitFor();
  await page.locator('a:has-text("Book a Discovery Call")').first().waitFor();
  await page.locator('a:has-text("See How We Work")').waitFor();

  const heroRect = await getRect(page, "#hero");
  assert(heroRect.top >= 0, "Hero starts above the viewport");
  assert(heroRect.height <= 900, "Hero section overflows the initial desktop viewport");

  await page.locator("header").evaluate((header) => header.scrollIntoView());
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "home-desktop-scrolled.png"), fullPage: false });

  await page.locator('button:has-text("Open case study")').first().click();
  await page.locator('[role="dialog"]').waitFor();
  await page.screenshot({ path: path.join(OUTPUT_DIR, "case-study-modal-desktop.png"), fullPage: false });
  await page.keyboard.press("Escape");
  await page.locator('[role="dialog"]').waitFor({ state: "hidden" });

  await page.locator('button:has-text("Open case study")').nth(1).click();
  await page.locator('[role="dialog"]').waitFor();
  await page.locator(".case-study-modal-backdrop").click({ position: { x: 5, y: 5 } });
  await page.locator('[role="dialog"]').waitFor({ state: "hidden" });

  for (const route of expectedRoutes) {
    await verifyRoute(page, route);
  }
}

async function runMobileChecks(page) {
  await verifyRoute(page, "/");

  await page.screenshot({ path: path.join(OUTPUT_DIR, "home-mobile.png"), fullPage: false });

  const toggle = page.locator('button[aria-label="Toggle menu"]');
  await toggle.waitFor();
  await toggle.click();
  await page.locator(".mobile-nav-overlay").waitFor();
  await page.screenshot({ path: path.join(OUTPUT_DIR, "mobile-menu-open.png"), fullPage: false });

  const bodyOverflowWhenOpen = await page.evaluate(() => document.body.style.overflow);
  assert(bodyOverflowWhenOpen === "hidden", "Body scroll should lock while mobile menu is open");

  await page.locator('a.mobile-nav-link:has-text("Our Team")').click();
  await page.waitForURL(`${BASE_URL}/team/`);
  const bodyOverflowAfterNav = await page.evaluate(() => document.body.style.overflow);
  assert(bodyOverflowAfterNav === "", "Body scroll lock was not cleared after closing mobile menu");

  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  for (let index = 0; index < 3; index += 1) {
    await toggle.click();
    await page.locator(".mobile-nav-overlay").waitFor();
    await page.locator('button[aria-label="Close menu"]').click();
    await page.locator(".mobile-nav-overlay").waitFor({ state: "hidden" });
  }

  await page.locator('button:has-text("Open case study")').first().click();
  await page.locator('[role="dialog"]').waitFor();
  await page.screenshot({ path: path.join(OUTPUT_DIR, "case-study-modal-mobile.png"), fullPage: false });
  await page.locator('button:has-text("Close")').click();
  await page.locator('[role="dialog"]').waitFor({ state: "hidden" });

  const heroTitleRect = await getRect(page, ".hero-title");
  assert(heroTitleRect.width <= 390, "Hero title overflows the mobile viewport width");
}

async function main() {
  await ensureDir(OUTPUT_DIR);
  const browser = await chromium.launch({ headless: true });
  const consoleIssues = [];

  const desktopContext = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  await collectConsole(desktopPage, "desktop", consoleIssues);

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await collectConsole(mobilePage, "mobile", consoleIssues);

  try {
    await runDesktopChecks(desktopPage);
    await runMobileChecks(mobilePage);
  } finally {
    await desktopContext.close();
    await mobileContext.close();
    await browser.close();
  }

  if (consoleIssues.length > 0) {
    throw new Error(consoleIssues.join("\n"));
  }

  console.log(`QA complete. Artifacts saved to ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
