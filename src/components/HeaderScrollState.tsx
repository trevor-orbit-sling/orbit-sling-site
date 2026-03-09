"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SCROLL_THRESHOLD = 10;

function syncHeaderScrollState() {
  if (typeof window === "undefined") {
    return;
  }

  const isScrolled = window.scrollY > SCROLL_THRESHOLD;
  const headers = document.querySelectorAll<HTMLElement>(".site-header");

  headers.forEach((header) => {
    header.classList.toggle("is-scrolled", isScrolled);
  });
}

export default function HeaderScrollState() {
  const pathname = usePathname();

  useEffect(() => {
    syncHeaderScrollState();

    const handleScroll = () => {
      syncHeaderScrollState();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    syncHeaderScrollState();
  }, [pathname]);

  return null;
}
