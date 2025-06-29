import { Code, Settings, Brain } from "lucide-react";
import { SiPython, SiCplusplus, SiHtml5, SiCss3, SiJavascript, SiGithub, SiLinux, SiUbuntu } from "react-icons/si";

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-gradient-white">Tech Stack</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Languages */}
            <div className="glass-effect glass-white rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-6">
                <Code className="text-foreground w-8 h-8 mr-4" />
                <h3 className="text-2xl font-semibold text-foreground">Languages</h3>
              </div>
              <div className="space-y-4 text-foreground">
                <div className="flex items-center">
                  <SiPython className="text-foreground w-6 h-6 mr-3" />
                  <span>Python</span>
                </div>
                <div className="flex items-center">
                  <SiCplusplus className="text-foreground w-6 h-6 mr-3" />
                  <span>C++</span>
                </div>
                <div className="flex items-center">
                  <SiHtml5 className="text-foreground w-6 h-6 mr-3" />
                  <span>HTML</span>
                </div>
                <div className="flex items-center">
                  <SiCss3 className="text-foreground w-6 h-6 mr-3" />
                  <span>CSS</span>
                </div>
                <div className="flex items-center">
                  <SiJavascript className="text-foreground w-6 h-6 mr-3" />
                  <span>JavaScript</span>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="glass-effect glass-gray rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-6">
                <Settings className="text-foreground w-8 h-8 mr-4" />
                <h3 className="text-2xl font-semibold text-foreground">Tools</h3>
              </div>
              <div className="space-y-4 text-foreground">
                <div className="flex items-center">
                  <SiGithub className="text-muted-foreground w-6 h-6 mr-3" />
                  <span>GitHub</span>
                </div>
                <div className="flex items-center">
                  <Code className="text-muted-foreground w-6 h-6 mr-3" />
                  <span>VS Code</span>
                </div>
                <div className="flex items-center">
                  <Code className="text-muted-foreground w-6 h-6 mr-3" />
                  <span>Replit</span>
                </div>
                <div className="flex items-center">
                  <SiLinux className="text-muted-foreground w-6 h-6 mr-3" />
                  <span>Linux Terminal</span>
                </div>
                <div className="flex items-center">
                  <SiUbuntu className="text-muted-foreground w-6 h-6 mr-3" />
                  <span>Ubuntu</span>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <div className="glass-effect glass-white rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-6">
                <Brain className="text-foreground w-8 h-8 mr-4" />
                <h3 className="text-2xl font-semibold text-foreground">
                  Focus Areas
                </h3>
              </div>
              <div className="space-y-4 text-foreground">
                <div className="flex items-center">
                  <Brain className="text-foreground w-6 h-6 mr-3" />
                  <span>Artificial Intelligence</span>
                </div>
                <div className="flex items-center">
                  <Code className="text-foreground w-6 h-6 mr-3" />
                  <span>Voice Processing</span>
                </div>
                <div className="flex items-center">
                  <Settings className="text-foreground w-6 h-6 mr-3" />
                  <span>Natural Language Processing</span>
                </div>
                <div className="flex items-center">
                  <Code className="text-foreground w-6 h-6 mr-3" />
                  <span>Human-AI Interaction</span>
                </div>
                <div className="flex items-center">
                  <Settings className="text-foreground w-6 h-6 mr-3" />
                  <span>System Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
