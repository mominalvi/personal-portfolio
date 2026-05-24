const projects = [
  {
    title: "Scholar Pups",
    description: "AI scholarship discovery and feedback platform for underrepresented students.",
    highlights: [
      "Built scholarship matching and application feedback workflows.",
      "Used AI to review student responses and provide actionable suggestions.",
      "Developed a full-stack platform with FastAPI, React, and MongoDB.",
    ],
    tags: ["React", "Python", "FastAPI", "MongoDB"],
    href: "#",
  },
  {
    title: "Coursify.ca",
    description: "Course review and planning platform for Queen's students.",
    highlights: [
      "Built course search and review workflows for Queen's course discovery.",
      "Designed Plan Courses flow for saving offerings and future schedule generation.",
      "Integrated course registry data, filters, and student-facing UI.",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    href: "#",
  },
];

export default function Projects() {
  return (
    <section
      className="animate-fade-in-up"
      id="projects"
      style={{ animationDelay: "300ms" }}
    >
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Selected Projects</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          02 // Works
        </span>
      </div>
      <div className="flex flex-col border-architectural bg-surface-container-lowest">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.href}
            className={`group block p-md hover:bg-surface-container transition-all duration-200 ${
              i < projects.length - 1 ? "border-b border-outline-variant" : ""
            }`}
          >
            {/* Header row */}
            <div className="flex justify-between items-start mb-sm gap-md">
              <h3 className="font-body-md text-body-md font-bold text-primary group-hover:text-secondary transition-colors shrink-0">
                {project.title}
              </h3>
              <div className="flex items-center gap-xs flex-wrap justify-end">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-container px-sm py-xs font-meta-technical text-[10px] text-primary shrink-0"
                  >
                    {tag}
                  </span>
                ))}
                <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-secondary transition-colors ml-xs">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-meta-technical text-meta-technical text-on-surface-variant mb-sm">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="flex flex-col gap-xs">
              {project.highlights.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-sm font-meta-technical text-meta-technical text-on-surface-variant"
                >
                  <span className="text-outline mt-[2px] shrink-0">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </section>
  );
}
