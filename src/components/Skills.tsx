import Marquee from "@/components/motion/Marquee";

const skills = [
  "Python", "TypeScript", "JavaScript", "Java", "C", "SQL",
  "React", "Next.js", "Node.js", "Express", "FastAPI",
  "Supabase", "PostgreSQL", "MongoDB", "Docker", "GCP", "AWS",
];

const mid = Math.ceil(skills.length / 2);
const rowA = skills.slice(0, mid);
const rowB = skills.slice(mid);

function Chip({ s }: { s: string }) {
  return (
    <span className="border border-outline-variant px-md py-sm mx-xs font-meta-technical text-[12px] text-on-surface-variant whitespace-nowrap hover:border-[color:var(--accent)] hover:text-primary transition-colors">
      {s}
    </span>
  );
}

export default function Skills() {
  return (
    <section className="animate-fade-in-up" id="skills">
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Skills</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">
          03 // Stack
        </span>
      </div>
      <div className="flex flex-col gap-sm">
        <Marquee durationSec={30}>
          {rowA.map((s) => (
            <Chip key={s} s={s} />
          ))}
        </Marquee>
        <Marquee durationSec={36}>
          {rowB.map((s) => (
            <Chip key={s} s={s} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
