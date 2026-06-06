import { fetchContributions, countToLevel } from "@/lib/github";

const USERNAME = process.env.GITHUB_USERNAME || "mominalvi";
const GH_URL = "https://github.com/mominalvi";
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MOBILE_WEEKS = 20;

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default async function GitHubActivity() {
  const data = await fetchContributions(USERNAME);

  // Label a week column only when its month differs from the previous column.
  // Parse the month from the date string (no Date()/timezone shifts). Compare to
  // the previous week (purely functional — no mutable render state).
  const monthOf = (week?: { contributionDays: { date: string }[] }) => {
    const ref = week?.contributionDays[0]?.date;
    return ref ? parseInt(ref.slice(5, 7), 10) - 1 : -1;
  };
  const columns = (data?.weeks ?? []).map((week, w, arr) => {
    const month = monthOf(week);
    const prevMonth = w > 0 ? monthOf(arr[w - 1]) : -2;
    const label = month !== -1 && month !== prevMonth ? MONTHS[month] : "";
    return { week, w, label };
  });
  const cutoff = (data?.weeks.length ?? 0) - MOBILE_WEEKS;

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
            <a
              href={GH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-sm mb-md font-meta-technical text-meta-technical text-on-surface-variant hover:text-[color:var(--accent)] transition-colors"
            >
              <GitHubIcon />
              View on GitHub
            </a>

            {/* Month labels — aligned to the week columns */}
            <div className="flex gap-[3px] w-full mb-xs">
              {columns.map(({ w, label }) => (
                <div
                  key={w}
                  className={`relative flex-1 h-[13px] ${
                    w < cutoff ? "hidden md:block" : "block"
                  }`}
                >
                  {label && (
                    <span className="absolute left-0 top-0 font-meta-technical text-[10px] leading-none text-on-surface-variant whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Contribution grid — fills the full width */}
            <div className="flex gap-[3px] w-full">
              {columns.map(({ week, w }) => (
                <div
                  key={w}
                  className={`flex-col gap-[3px] flex-1 ${
                    w < cutoff ? "hidden md:flex" : "flex"
                  }`}
                >
                  {week.contributionDays.map((day, d) => (
                    <div
                      key={d}
                      className="aspect-square w-full"
                      title={`${day.date}: ${day.contributionCount}`}
                      style={{
                        backgroundColor: `var(--contrib-${countToLevel(day.contributionCount)})`,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Footer: total + legend */}
            <div className="flex justify-between items-center mt-md flex-wrap gap-sm">
              <p className="font-meta-technical text-meta-technical text-on-surface-variant">
                {data.totalContributions} contributions in the last year
              </p>
              <div className="flex items-center gap-xs font-meta-technical text-[10px] text-on-surface-variant">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <span
                    key={l}
                    className="inline-block w-[11px] h-[11px]"
                    style={{ backgroundColor: `var(--contrib-${l})` }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
