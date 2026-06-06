const items = [
  { label: "Gym / Bodybuilding", icon: "fitness_center" },
  { label: "Soccer", icon: "sports_soccer" },
  { label: "Basketball", icon: "sports_basketball" },
  { label: "Running", icon: "directions_run" },
  { label: "Photography", icon: "photo_camera" },
  { label: "Food", icon: "restaurant" },
];

export default function IndexModule() {
  return (
    <section
      className="animate-fade-in-up"
      style={{ animationDelay: "450ms" }}
    >
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Beyond Code</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          05 // Beyond
        </span>
      </div>
      <div className="flex flex-col border-architectural bg-surface-container-lowest shadow-sm">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`group flex items-center justify-between p-md hover:bg-surface-container transition-all duration-300 cursor-default ${
              i < items.length - 1 ? "border-b border-outline-variant" : ""
            }`}
          >
            <span className="font-body-md text-body-md text-primary group-hover:translate-x-1 transition-transform">
              {item.label}
            </span>
            <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-[color:var(--accent)] transition-colors">
              {item.icon}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
