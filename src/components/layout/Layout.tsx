import { ThemeProvider } from "next-themes";
import { AnimatedNavigationTabs, MobileNav } from "../ui/animated-navigation-tabs";
import ThemeSwitch from "../ui/theme-switch";
import { Shadow } from "../ui/animated-shape";
import { Link } from "react-router-dom";
import logo from "/logo-bordered.png";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { id: 1, tile: "About" },
  { id: 2, tile: "Spaces" },
  { id: 3, tile: "Offerings" },
  { id: 4, tile: "Contact" }
];

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <nav className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4 text-foreground">
              <img src={logo} alt="Logo" className="h-16 w-16" />
              <span className="text-xl font-marcellus">Sebastian Norton</span>
            </Link>
            {/* Desktop nav - hidden below md */}
            <div className="hidden md:flex items-center gap-4">
              <AnimatedNavigationTabs items={navItems} />
              <ThemeSwitch />
            </div>
            {/* Mobile nav - visible below md */}
            <div className="flex md:hidden items-center gap-1">
              <ThemeSwitch compact />
              <MobileNav items={navItems} />
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
          <div className="container max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
            <Shadow className="w-40 h-16 text-muted-foreground/40" />
            <p>&copy; {new Date().getFullYear()} Copyleft CC BY-SA Sebastian Norton Coaching. Based in New Zealand.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}