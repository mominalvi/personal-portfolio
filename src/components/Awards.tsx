const awards = [
  {
    title: "Queen's University Excellence Scholarship",
    org: "Queen's University",
    year: "2022",
  },
  {
    title: "Dean's Honour List",
    org: "Queen's University",
    year: "2022–Present",
  },
  {
    title: "1st Place, QDAA × AWS DeepRacer Hackathon",
    org: "Amazon DeepRacer / Queen's University",
    year: "Mar 2023",
  },
];

export default function Awards() {
  return (
    <section
      className="animate-fade-in-up"
      style={{ animationDelay: "600ms" }}
    >
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Awards</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          06 // Awards
        </span>
      </div>
      <div className="flex flex-col gap-sm">
        {awards.map((award, i) => (
          <div
            key={award.title}
            className={`group flex flex-col pb-xs ${
              i < awards.length - 1 ? "border-b border-outline-variant" : ""
            }`}
          >
            <span className="font-body-md text-body-md font-bold text-primary group-hover:text-[color:var(--accent)] transition-colors">
              {award.title}
            </span>
            <span className="font-meta-technical text-meta-technical text-on-surface-variant">
              {award.org} — {award.year}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
