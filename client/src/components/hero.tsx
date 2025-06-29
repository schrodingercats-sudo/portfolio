import { Code, Mail } from "lucide-react";

export default function Hero() {
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
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-white">Building</span>{" "}
            <span className="text-foreground">Intelligent</span>
            <br />
            <span className="text-gradient-gray">Systems</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Computer Engineering student crafting AI systems that understand
            deeply, respond instantly, and evolve with context.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="glass-effect glass-white px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 hover-lift flex items-center justify-center gap-2"
            >
              <Code className="w-5 h-5" />
              View Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="glass-effect glass-gray px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 hover-lift flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
