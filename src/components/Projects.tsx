const projects = [
  {
    title: "Scholar Pups",
    description: "AI scholarship platform for discovery, review, and feedback workflows.",
    tags: ["React", "Python"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2XIs0g7Jw-A5voxx_vYI133bKF5SyxWc8NPPnR7p9C5wk4jKwcavOGh5Ebx5wFSdAprDZiweSd0EuxUSBIoesm70GjuuluSddgTwjP-6GqFoJ5isq3nDDTzr-5MPLkvV7maC1vDgNCySia02U0nyUmiqwDqL2uGY10zo5YzWFyISmSk8BNv_9v_30xNG-6LQOXmO2M5e8n6WiapmNvQDb4j18uaTOkt2dxUBNhgYkBiysXxss1UKm115DR9m8G3VsmtmRq6fDUk4",
    href: "#",
  },
  {
    title: "Coursify.ca",
    description: "Course review and search platform for Queen's students.",
    tags: ["Next.js", "PostgreSQL"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxAWFBBhIQacJZe8EtE042s8k_HNGQB5cCSFml98pdye5uX9j4MZAxc2snMTgTmFZZl4X4lxK7b0R6cLALd33V9kxpujFRcSSp3LXXrgB9Cm9KoONRDdcZqp_glkqzRQvPsFNo2h9X1Rk6VpAnGTLEA705rTutXW_X7bU7jjPLd8wXgfxaS4Fqtnr_dRM2Ywi9NmNJ9CplrHrwvB1x_7GPJWa0uvf1EHjWAphOTYYoKuwuk6yK74dky-wPeQy2fxUKb5H8U14NEEk",
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
      <div className="flex flex-col border-architectural bg-surface-container-lowest shadow-sm">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.href}
            className={`group flex items-center p-sm hover:bg-surface-container transition-all duration-300 cursor-pointer ${
              i < projects.length - 1 ? "border-b border-outline-variant" : ""
            }`}
          >
            <div className="w-20 h-20 shrink-0 bg-surface-variant overflow-hidden mr-md border border-outline-variant relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={project.title}
                src={project.image}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col grow justify-center">
              <div className="flex justify-between items-center mb-xs">
                <h3 className="font-body-md text-body-md font-bold text-primary group-hover:text-secondary transition-colors">
                  {project.title}
                </h3>
                <div className="hidden sm:flex gap-xs">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container px-sm py-xs font-meta-technical text-[10px] text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="font-meta-technical text-meta-technical text-on-surface-variant line-clamp-1">
                {project.description}
              </p>
            </div>
            <div className="ml-sm text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
