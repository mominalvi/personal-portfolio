import RotatingText from "@/components/motion/RotatingText";
import MagneticButton from "@/components/motion/MagneticButton";

const GITHUB = "https://github.com/mominalvi";
const LINKEDIN = "https://www.linkedin.com/in/momin-alvi/";

export default function Hero() {
  return (
    <div className="md:w-10/12 border-b-architectural pb-lg md:pb-xl mb-xl animate-fade-in-up">
      <span className="font-meta-technical text-meta-technical text-on-surface-variant">
        00 // Index
      </span>
      <h1
        className="font-h1 name-shine mt-md mb-md"
        style={{ fontSize: "clamp(40px, 8vw, 84px)", lineHeight: 0.95 }}
      >
        MOMIN ALVI
      </h1>
      <p className="font-h3 text-h3 text-on-surface-variant mb-lg flex items-baseline gap-sm flex-wrap">
        I build{" "}
        <RotatingText
          words={[
            "AI systems",
            "backend services",
            "data pipelines",
            "RAG applications",
          ]}
          className="font-bold text-[color:var(--accent)]"
        />
      </p>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-lg">
        CS student at Queen&apos;s &amp; Software Engineering Intern at OTPP.
      </p>
      <div className="flex gap-md flex-wrap">
        <MagneticButton
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent px-md py-sm font-label-caps text-label-caps text-white inline-flex items-center gap-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            open_in_new
          </span>
          GitHub
        </MagneticButton>
        <MagneticButton
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="px-md py-sm border-architectural bg-surface-container-lowest text-primary font-label-caps text-label-caps inline-flex items-center gap-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            open_in_new
          </span>
          LinkedIn
        </MagneticButton>
      </div>
    </div>
  );
}
