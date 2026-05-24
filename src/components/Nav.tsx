export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background border-b border-outline-variant">
      <div className="max-w-container-max mx-auto px-lg md:px-xxl py-md flex justify-between items-center">
        <div className="font-h3 text-h3 text-primary tracking-tight">Momin Alvi</div>
        <div className="hidden md:flex gap-lg items-center">
          <a
            className="magnetic-link font-label-caps text-label-caps text-secondary border-b-2 border-secondary hover:text-secondary uppercase"
            href="#experience"
          >
            Experience
          </a>
          <a
            className="magnetic-link font-label-caps text-label-caps text-on-surface-variant hover:text-secondary uppercase"
            href="#projects"
          >
            Projects
          </a>
          <a
            className="magnetic-link font-label-caps text-label-caps text-on-surface-variant hover:text-secondary uppercase"
            href="#contact"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
