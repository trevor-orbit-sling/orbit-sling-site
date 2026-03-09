"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Starfield = dynamic(() => import("./starfield"), { ssr: false });

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function DeferredVisualEffects() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const idleWindow = window as IdleWindow;
    let idleId: number | null = null;
    let timeoutId: number | null = null;

    const enableVisualEffects = () => {
      setIsReady(true);
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      idleId = idleWindow.requestIdleCallback(enableVisualEffects, { timeout: 2200 });
    } else {
      timeoutId = window.setTimeout(enableVisualEffects, 1200);
    }

    return () => {
      if (idleId !== null && typeof idleWindow.cancelIdleCallback === "function") {
        idleWindow.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return <Starfield />;
}
