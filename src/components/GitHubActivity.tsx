import { fetchContributions, countToLevel } from "@/lib/github";

const USERNAME = process.env.GITHUB_USERNAME || "mominalvi";

export default async function GitHubActivity() {
  const data = await fetchContributions(USERNAME);

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
        {!data ? (
          <p className="font-meta-technical text-meta-technical text-on-surface-variant">
            Add <code>GITHUB_TOKEN</code> to .env.local to display contributions.
          </p>
        ) : (
          <>
            <p className="font-meta-technical text-meta-technical text-on-surface-variant mb-md">
              {data.totalContributions} contributions in the last year
            </p>
            <div className="overflow-x-auto">
              <div
                className="flex gap-[4px]"
                style={{ width: "max-content" }}
              >
                {data.weeks.map((week, w) => (
                  <div key={w} className="flex flex-col gap-[4px]">
                    {week.contributionDays.map((day, d) => (
                      <div
                        key={d}
                        className="w-[13px] h-[13px]"
                        title={`${day.date}: ${day.contributionCount}`}
                        style={{
                          backgroundColor: `var(--contrib-${countToLevel(day.contributionCount)})`,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
