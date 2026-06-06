"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function RotatingText({
  words,
  className,
  interval = 2200,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const reduce = useReducedMotion();
  // Render the static word until after mount so server + first client render match
  // (avoids a hydration mismatch from branching JSX structure on useReducedMotion).
  const [mounted, setMounted] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduce) return;
    const id = setInterval(
      () => setI((p) => (p + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [mounted, reduce, words.length, interval]);

  if (!mounted || reduce) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span
      className={`inline-grid ${className ?? ""}`}
      style={{ overflow: "hidden" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          style={{ gridArea: "1/1" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
