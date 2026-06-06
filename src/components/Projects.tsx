const featured = {
  title: "Coursify.ca",
  description:
    "A course insights platform for Queen's University, with data scraped from Reddit & RateMyProfessors and a RAG-powered AI assistant.",
  highlights: [
    "Aggregates course and professor data scraped from Reddit and RateMyProfessors.",
    "RAG-powered AI assistant answers student questions about courses and profs.",
    "Search, filters, and a student-facing course discovery UI.",
  ],
  tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
  href: "https://www.coursify.ca/",
};

const secondary: {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}[] = [
  {
    title: "Scholar Pups",
    description:
      "AI scholarship discovery and feedback platform for underrepresented students.",
    tags: ["FastAPI", "Next.js", "MongoDB", "LangChain"],
    // no public link yet — rendered as a non-interactive card
  },
];

const GITHUB = "https://github.com/mominalvi";

export default function Projects() {
  return (
    <section className="animate-fade-in-up" id="projects">
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Selected Projects</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          02 // Projects
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Featured — spans two rows */}
        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="tile-lift shimmer group relative overflow-hidden border-architectural p-lg md:row-span-2 flex flex-col"
          style={{
            background:
              "linear-gradient(150deg, rgba(109,92,255,0.12), rgba(168,85,247,0.06))",
          }}
        >
          <span className="font-meta-technical text-[11px] text-on-surface-variant">
            Featured
          </span>
          <h3 className="font-h3 text-h3 text-primary mt-sm mb-sm group-hover:text-[color:var(--accent)] transition-colors">
            {featured.title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-md">
            {featured.description}
          </p>
          <ul className="flex flex-col gap-xs mb-lg">
            {featured.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-sm font-meta-technical text-meta-technical text-on-surface-variant"
              >
                <span className="text-[color:var(--accent)] mt-[2px] shrink-0">—</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-xs flex-wrap mt-auto">
            {featured.tags.map((t) => (
              <span
                key={t}
                className="bg-surface-container px-sm py-xs font-meta-technical text-[10px] text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </a>

        {/* Secondary cards — interactive only when a link exists */}
        {secondary.map((p) => {
          const inner = (
            <>
              <div className="flex items-center justify-between mb-sm">
                <h3
                  className={`font-body-md text-body-md font-bold text-primary transition-colors ${
                    p.href ? "group-hover:text-[color:var(--accent)]" : ""
                  }`}
                >
                  {p.title}
                </h3>
                {p.href && (
                  <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-[color:var(--accent)] transition-colors">
                    arrow_forward
                  </span>
                )}
              </div>
              <p className="font-meta-technical text-meta-technical text-on-surface-variant mb-md">
                {p.description}
              </p>
              <div className="flex gap-xs flex-wrap mt-auto">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="bg-surface-container px-sm py-xs font-meta-technical text-[10px] text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          );
          return p.href ? (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tile-lift group border-architectural p-md flex flex-col bg-surface-container-lowest"
            >
              {inner}
            </a>
          ) : (
            <div
              key={p.title}
              className="group border-architectural p-md flex flex-col bg-surface-container-lowest"
            >
              {inner}
            </div>
          );
        })}

        {/* More on GitHub — fills the grid, sends to profile */}
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="tile-lift group border-architectural p-md flex items-center justify-between bg-surface-container-lowest"
        >
          <div className="flex flex-col">
            <span className="font-body-md text-body-md font-bold text-primary group-hover:text-[color:var(--accent)] transition-colors">
              More on GitHub
            </span>
            <span className="font-meta-technical text-meta-technical text-on-surface-variant">
              Side projects, experiments &amp; source
            </span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-[color:var(--accent)] transition-colors">
            open_in_new
          </span>
        </a>
      </div>
    </section>
  );
}
