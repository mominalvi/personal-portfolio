const roles = [
  {
    org: "Ontario Teachers' Pension Plan",
    title: "Software Engineering Intern",
    location: "Toronto, ON",
    period: "May 2025 — Present",
  },
  {
    org: "Kaniq",
    title: "AI Systems Developer",
    location: "Remote",
    period: "Mar 2026 — May 2026",
  },
  {
    org: "Queen's COMPSA",
    title: "Backend Developer",
    location: "Kingston, ON",
    period: "Aug 2024 — Dec 2024",
  },
  {
    org: "DDQIC",
    title: "Entrepreneur in Residence",
    location: "Kingston, ON",
    period: "May 2024 — Aug 2024",
  },
];

export default function Experience() {
  return (
    <section
      className="animate-fade-in-up"
      id="experience"
      style={{ animationDelay: "150ms" }}
    >
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
            className="group flex flex-col md:flex-row md:items-center justify-between p-md border-b border-outline-variant border-l-2 border-l-transparent hover:border-l-[color:var(--accent)] hover:bg-surface-container transition-all duration-200 cursor-default"
          >
            <div className="flex items-center gap-md flex-wrap">
              <span className="text-sm font-bold text-primary group-hover:text-[color:var(--accent)] group-hover:translate-x-1 transition-all">
                {role.org}
              </span>
              <span className="text-sm text-on-surface-variant">{role.title}</span>
            </div>
            <div className="font-meta-technical text-meta-technical text-outline mt-sm md:mt-0 md:text-right shrink-0">
              {role.location} • {role.period}
            </div>
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
