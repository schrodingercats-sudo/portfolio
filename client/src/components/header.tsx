import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass-effect transition-all duration-300 ${
        isScrolled ? "glass-black bg-opacity-15" : "glass-black"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gradient-white">
            Pratham.dev
          </div>
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("tech-stack")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Tech Stack
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="md:hidden text-foreground hover:text-muted-foreground transition-colors duration-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
