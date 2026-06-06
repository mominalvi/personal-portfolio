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
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setI((p) => (p + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  if (reduce) return <span className={className}>{words[0]}</span>;

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
