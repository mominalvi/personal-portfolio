export default function Hero() {
  return (
    <div
      className="md:w-8/12 border-b-architectural pb-lg md:pb-xl mb-xl animate-fade-in-up"
      style={{ animationDelay: "0ms" }}
    >
      <h1 className="font-h1 text-h1 text-primary mb-md">MOMIN ALVI</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-lg">
        CS student at Queen&apos;s and Software Engineering Intern at OTPP. I build
        practical AI systems, product tools, and clean web experiences. Outside of
        work, I&apos;m usually training, making music, or exploring new product ideas.
      </p>
      <div className="flex gap-md">
        <a
          className="px-md py-sm bg-primary text-on-primary font-label-caps text-label-caps rounded-none transition-all duration-300 hard-shadow-hover flex items-center gap-sm"
          href="#"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            open_in_new
          </span>
          GitHub
        </a>
        <a
          className="px-md py-sm border-architectural bg-surface-container-lowest text-primary font-label-caps text-label-caps rounded-none transition-all duration-300 hard-shadow-hover flex items-center gap-sm"
          href="#"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            open_in_new
          </span>
          LinkedIn
        </a>
      </div>
    </div>
  );
}
