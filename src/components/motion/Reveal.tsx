"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Gate the reduced-motion branch behind mount so server + first client render
  // are identical (always the motion.div) — avoids a hydration mismatch that would
  // otherwise leave content stuck at opacity:0 for reduced-motion users.
  const [mounted, setMounted] = useState(false);
  // One-time mount flag so server + first client render match (hydration-safe);
  // a single setState here does not cause the cascading renders the rule guards against.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (mounted && reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
