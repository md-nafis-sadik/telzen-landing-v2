"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ScrollToTopContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Prevent browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Force scroll to top immediately
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Scroll lenis if it exists
    const scrollLenis = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true, lock: true });
      }
    };

    // Immediate scroll
    scrollToTop();
    scrollLenis();

    // Multiple retries to ensure scroll happens even if Lenis is delayed
    const timers = [
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 0),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 10),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 50),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 100),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 200),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 300),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 400),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 500),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 600),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 700),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 800),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 900),
      setTimeout(() => {
        scrollToTop();
        scrollLenis();
      }, 1000),

    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [pathname, searchParams]);

  return null;
}

export default function ScrollToTop() {
  return (
    <Suspense fallback={null}>
      <ScrollToTopContent />
    </Suspense>
  );
}
