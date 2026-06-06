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
      {/* aurora blobs */}
      <div
        className="aurora-blob absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          top: -180,
          left: -120,
          background: "var(--aurora-1)",
          filter: "blur(120px)",
          animation: "aurora-float-1 16s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          bottom: -200,
          right: -140,
          background: "var(--aurora-2)",
          filter: "blur(120px)",
          animation: "aurora-float-2 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}
