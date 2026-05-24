const links = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:mominalvi30@gmail.com" },
  { label: "Resume", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="bg-background w-full py-xl border-t border-outline-variant flex flex-col md:flex-row justify-between items-center px-lg md:px-xxl max-w-container-max mx-auto mt-auto"
      id="contact"
    >
      <div className="font-label-caps text-label-caps text-primary mb-md md:mb-0">
        © 2026 Momin Alvi. Built for high-density clarity.
      </div>
      <div className="flex gap-lg">
        {links.map((link) => (
          <a
            key={link.label}
            className="magnetic-link font-body-md text-body-md text-on-surface-variant hover:text-primary underline"
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
