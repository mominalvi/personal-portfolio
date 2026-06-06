export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ opacity: "var(--aurora-opacity)" }}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* aurora blobs — size/position controlled in globals.css (responsive) */}
      <div className="aurora-blob aurora-orb-1" />
      <div className="aurora-blob aurora-orb-2" />
    </div>
  );
}
