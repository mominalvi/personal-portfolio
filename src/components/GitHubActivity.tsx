function generateGrid(): number[][] {
  return Array.from({ length: 53 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const h = (((w + 1) * 2654435761 + (d + 1) * 40503) >>> 0) % 100;
      const isWeekend = d === 0 || d === 6;
      if (isWeekend) return h < 60 ? 0 : h < 78 ? 1 : h < 90 ? 2 : 3;
      return h < 12 ? 0 : h < 38 ? 1 : h < 63 ? 2 : h < 82 ? 3 : 4 + (h % 5);
    })
  );
}

interface GitHubActivityProps {
  data?: number[][];
  totalContributions?: number;
}

export default function GitHubActivity({
  data = generateGrid(),
  totalContributions = 714,
}: GitHubActivityProps) {
  return (
    <section
      className="animate-fade-in-up"
      id="github-activity"
      style={{ animationDelay: "550ms" }}
    >
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">GitHub Activity</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          04 // Activity
        </span>
      </div>
      <div className="border-architectural bg-surface-container-lowest p-md">
        <p className="font-meta-technical text-meta-technical text-on-surface-variant mb-md">
          {totalContributions} contributions in the last year
        </p>
        <div className="overflow-x-auto">
          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(53, minmax(0, 1fr))`,
              width: "max-content",
            }}
          >
            {data.map((week, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {week.map((level, d) => (
                  <div
                    key={d}
                    className="w-[10px] h-[10px]"
                    style={{
                      backgroundColor: `var(--contrib-${Math.min(level, 4)})`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
