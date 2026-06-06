"use client";

import type { ReactNode } from "react";

export default function Marquee({
  children,
  durationSec = 28,
  className,
}: {
  children: ReactNode;
  durationSec?: number;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div
        className="marquee-run flex w-max"
        style={{ animation: `marquee-x ${durationSec}s linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
