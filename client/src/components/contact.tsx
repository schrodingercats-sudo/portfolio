import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="text-gradient-white">Let's Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Interested in AI, voice processing, or building intelligent systems?
            Let's collaborate and create something amazing together.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a
              href="mailto:pratham@example.com"
              className="glass-effect glass-white rounded-xl p-6 hover-lift hover:bg-foreground hover:bg-opacity-10 transition-all duration-300"
            >
              <Mail className="text-foreground w-8 h-8 mb-3 mx-auto" />
              <p className="font-semibold text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">pratham@example.com</p>
            </a>

            <a
              href="https://github.com/pratham"
              className="glass-effect glass-gray rounded-xl p-6 hover-lift hover:bg-foreground hover:bg-opacity-10 transition-all duration-300"
            >
              <Github className="text-muted-foreground w-8 h-8 mb-3 mx-auto" />
              <p className="font-semibold text-foreground">GitHub</p>
              <p className="text-sm text-muted-foreground">@pratham</p>
            </a>

            <a
              href="https://linkedin.com/in/pratham"
              className="glass-effect glass-white rounded-xl p-6 hover-lift hover:bg-foreground hover:bg-opacity-10 transition-all duration-300"
            >
              <Linkedin className="text-foreground w-8 h-8 mb-3 mx-auto" />
              <p className="font-semibold text-foreground">LinkedIn</p>
              <p className="text-sm text-muted-foreground">Connect with me</p>
            </a>

            <a
              href="https://twitter.com/pratham"
              className="glass-effect glass-gray rounded-xl p-6 hover-lift hover:bg-foreground hover:bg-opacity-10 transition-all duration-300"
            >
              <Twitter className="text-muted-foreground w-8 h-8 mb-3 mx-auto" />
              <p className="font-semibold text-foreground">Twitter</p>
              <p className="text-sm text-muted-foreground">@pratham</p>
            </a>
          </div>

          <div className="glass-effect glass-white rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Currently Learning & Building
            </h3>
            <p className="text-muted-foreground mb-6">
              Always open to discussions about AI, voice processing, system
              architecture, and innovative tech solutions. Let's push the
              boundaries of human-AI interaction together.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-3 py-1 rounded-full">
                AI Development
              </span>
              <span className="text-xs bg-muted-foreground bg-opacity-20 text-muted-foreground px-3 py-1 rounded-full">
                Voice Processing
              </span>
              <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-3 py-1 rounded-full">
                System Design
              </span>
              <span className="text-xs bg-muted-foreground bg-opacity-20 text-muted-foreground px-3 py-1 rounded-full">
                NLP
              </span>
              <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-3 py-1 rounded-full">
                Human-AI UX
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
