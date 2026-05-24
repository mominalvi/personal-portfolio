const skills = [
  "Python", "TypeScript", "JavaScript", "Java", "C", "SQL",
  "React", "Next.js", "Node.js", "Express", "FastAPI",
  "Supabase", "PostgreSQL", "MongoDB", "Docker", "GCP", "AWS",
];

export default function Skills() {
  return (
    <section
      className="animate-fade-in-up"
      id="skills"
      style={{ animationDelay: "450ms" }}
    >
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Skills</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          03 // Skills
        </span>
      </div>
      <div className="flex flex-wrap gap-sm">
        {skills.map((skill) => (
          <span
            key={skill}
            className="border border-outline-variant px-sm py-xs font-meta-technical text-[11px] text-on-surface-variant"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
