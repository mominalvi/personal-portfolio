const groups = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C", "Bash"],
  },
  {
    label: "AI & ML",
    items: [
      "LangChain",
      "RAG",
      "Embeddings",
      "ChromaDB",
      "Gemini 2.5",
      "Vertex AI",
      "Ollama",
      "Llama 3.1",
    ],
  },
  {
    label: "Backend",
    items: ["FastAPI", "FastMCP", "Node.js", "Express", "Flask"],
  },
  {
    label: "Data & Infra",
    items: [
      "MongoDB",
      "Supabase",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Docker",
      "GCP",
      "Jenkins",
    ],
  },
  {
    label: "Frontend & Testing",
    items: ["React", "Next.js", "Tailwind CSS", "Vitest", "Playwright", "Zod"],
  },
];

export default function Skills() {
  return (
    <section className="animate-fade-in-up" id="skills">
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Skills</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          03 // Stack
        </span>
      </div>
      <div className="flex flex-col">
        {groups.map((g, i) => (
          <div
            key={g.label}
            className={`flex flex-col md:flex-row md:items-start gap-sm md:gap-lg py-md ${
              i < groups.length - 1 ? "border-b border-outline-variant" : ""
            }`}
          >
            <span className="font-meta-technical text-meta-technical text-on-surface-variant md:w-44 shrink-0 md:pt-xs uppercase tracking-wider">
              {g.label}
            </span>
            <div className="flex flex-wrap gap-sm">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="border border-outline-variant px-sm py-xs font-meta-technical text-[12px] text-primary hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
