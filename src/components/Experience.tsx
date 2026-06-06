const roles = [
  {
    org: "Ontario Teachers' (OTPP)",
    title: "Software Engineering Intern",
    location: "Toronto, ON",
    period: "May 2025 — Present",
    bullets: [
      "Built an LLM-assisted remediation workflow for 1,000+ GitHub Dependabot alerts across internal repos.",
      "Developed a RAG search system with embeddings and ChromaDB for semantic retrieval over JSON data.",
      "Built a Jenkins CI/CD pipeline automating Docker tagging and registry pushes, cutting deploy steps by 70%.",
    ],
  },
  {
    org: "Kaniq",
    title: "AI Systems Developer",
    location: "Remote",
    period: "Mar 2026 — May 2026",
    bullets: [
      "Deployed a FastMCP agent server on GCP Cloud Run exposing LLM-ranked banking product retrieval tools.",
      "Built a Playwright/Python ingestion pipeline normalizing 100+ products across 10+ banks into one schema.",
      "Added 1,245 pytest cases across providers, persistence, validation, MCP tools, and internal API routes.",
    ],
  },
  {
    org: "Queen's COMPSA",
    title: "Backend Developer",
    location: "Kingston, ON",
    period: "Aug 2024 — Dec 2024",
    bullets: [
      "Built backend services automating student club hiring workflows with Node.js, Express, and Sequelize.",
      "Designed normalized Sequelize models in MySQL to improve data integrity and API reliability.",
      "Integrated Calendly and Postmark APIs to automate interview scheduling and email notifications.",
    ],
  },
  {
    org: "DDQIC",
    title: "Entrepreneur in Residence",
    location: "Kingston, ON",
    period: "May 2024 — Aug 2024",
    bullets: [
      "Co-founded Vita Home, a marketplace for senior accessibility equipment to improve home safety.",
      "Built an MVP with Next.js, Node.js, and MySQL for product discovery and marketplace workflows.",
      "Ran research with 100+ seniors and professionals, securing 30+ potential customers.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="animate-fade-in-up" id="experience">
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Experience</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          01 // Work
        </span>
      </div>
      <div className="flex flex-col border-architectural bg-surface-container-lowest">
        {roles.map((role) => (
          <div
            key={`${role.org}-${role.title}`}
            className="group p-md border-b border-outline-variant border-l-2 border-l-transparent hover:border-l-[color:var(--accent)] hover:bg-surface-container transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-xs mb-sm">
              <div className="flex items-baseline gap-md flex-wrap">
                <span className="text-sm font-bold text-primary group-hover:text-[color:var(--accent)] transition-colors">
                  {role.org}
                </span>
                <span className="text-sm text-on-surface-variant">
                  {role.title}
                </span>
              </div>
              <span className="font-meta-technical text-meta-technical text-outline shrink-0 md:text-right">
                {role.location} • {role.period}
              </span>
            </div>
            <ul className="flex flex-col gap-xs">
              {role.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-sm font-meta-technical text-meta-technical text-on-surface-variant"
                >
                  <span className="text-[color:var(--accent)] mt-[2px] shrink-0">
                    —
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="p-md bg-surface-container-low flex justify-between items-center text-on-surface-variant">
          <span className="font-meta-technical text-meta-technical">
            Earlier: McMaster University — Coding Mentor; Kumon — Grading Assistant
          </span>
          <span className="material-symbols-outlined text-[16px]">history</span>
        </div>
      </div>
    </section>
  );
}
