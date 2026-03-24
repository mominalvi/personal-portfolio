export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="/"
          className="text-neutral-200 text-sm font-normal tracking-wide hover:text-neutral-100 transition-colors"
        >
          Momin Alvi
        </a>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap justify-end gap-x-6 gap-y-1 list-none">
            {[
              { label: "Experience", href: "#experience" },
              { label: "Featured Work", href: "#featured-work" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
