"use client";
import { ReactLenis } from "lenis/react";
import React from "react";

function LenisLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.2, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

export default LenisLayout;
