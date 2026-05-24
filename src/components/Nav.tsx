import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background border-b border-outline-variant">
      <div className="max-w-container-max mx-auto px-lg md:px-xl flex justify-between items-center h-14">
        <div className="font-h3 text-h3 text-primary tracking-tight">Momin Alvi</div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
