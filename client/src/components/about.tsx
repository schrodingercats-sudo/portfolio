import { User, Laptop, Target, Brain, Mic, Wrench, Flame } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 gradient-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-gradient-white">About Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect glass-white rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-4">
                <User className="text-foreground w-8 h-8 mr-4" />
                <h3 className="text-2xl font-semibold text-foreground">Who I Am</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I'm <span className="text-foreground font-semibold">Pratham</span> —
                a passionate Computer Engineering student in my 3rd semester at
                <span className="text-foreground font-semibold">Parul University</span>. I'm self-learning modern tech beyond outdated
                classrooms, focusing on building powerful, intelligent systems
                that feel alive.
              </p>
            </div>

            <div className="glass-effect glass-gray rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-4">
                <Laptop className="text-foreground w-8 h-8 mr-4" />
                <h3 className="text-2xl font-semibold text-foreground">My Setup</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">
                  ASUS Vivobook 16X
                </span>{" "}
                (i5-12500H, RTX 2050)
                <br />
                Tools: GitHub, VS Code, Replit, Linux Terminal
                <br />
                Environment: Ubuntu/Linux focused development
              </p>
            </div>
          </div>

          <div className="glass-effect glass-white rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Target className="text-foreground w-8 h-8 mr-4" />
              <h3 className="text-2xl font-semibold text-foreground">Vision & Mission</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Brain className="text-foreground w-12 h-12 mb-3 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  AI systems that understand deeply & evolve with context
                </p>
              </div>
              <div className="text-center">
                <Mic className="text-muted-foreground w-12 h-12 mb-3 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Natural voice assistants that feel more human than machine
                </p>
              </div>
              <div className="text-center">
                <Wrench className="text-foreground w-12 h-12 mb-3 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Tools that solve real problems with elegant code
                </p>
              </div>
              <div className="text-center">
                <Flame className="text-muted-foreground w-12 h-12 mb-3 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Building from scratch for complete mastery & control
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
