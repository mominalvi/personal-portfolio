"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore
    }
  };

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex items-center justify-center w-8 h-8 text-on-surface-variant hover:text-primary transition-colors duration-200"
    >
      <span
        className="material-symbols-outlined leading-none"
        style={{ fontSize: "20px", fontVariationSettings: "'FILL' 0" }}
      >
        {dark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
