import { Mic, Brain, Globe, Search, Hammer, Palette } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-20 gradient-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-gradient-white">Ongoing Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Voice AI Assistant */}
            <div className="glass-effect glass-white rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-4">
                <Mic className="text-foreground w-8 h-8 mr-4" />
                <h3 className="text-xl font-semibold text-foreground">Voice-Driven AI Assistant</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Building a realistic voice assistant with memory, natural
                understanding, and human-like interaction patterns.
              </p>
              <div className="space-y-2 mb-6">
                <div className="code-block rounded p-3 text-xs">
                  <span className="text-foreground">class</span>{" "}
                  <span className="text-foreground">VoiceAssistant</span>:
                  <br />
                  &nbsp;&nbsp;<span className="text-muted-foreground">def</span>{" "}
                  <span className="text-foreground">process_speech</span>(self):
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-muted-foreground"># NLP + Memory integration</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-2 py-1 rounded">
                  Python
                </span>
                <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-2 py-1 rounded">
                  NLP
                </span>
                <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-2 py-1 rounded">
                  Voice AI
                </span>
              </div>
            </div>

            {/* Second Brain System */}
            <div className="glass-effect glass-gray rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-4">
                <Brain className="text-foreground w-8 h-8 mr-4" />
                <h3 className="text-xl font-semibold text-foreground">Second Brain System</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Structured thinking and life organization system using code and
                AI for enhanced productivity and planning.
              </p>
              <div className="space-y-2 mb-6">
                <div className="code-block rounded p-3 text-xs">
                  <span className="text-muted-foreground">def</span>{" "}
                  <span className="text-foreground">organize_thoughts</span>():
                  <br />
                  &nbsp;&nbsp;<span className="text-foreground">return</span> ai.structure(
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;thoughts, goals, plans
                  <br />
                  &nbsp;&nbsp;)
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-muted-foreground bg-opacity-20 text-muted-foreground px-2 py-1 rounded">
                  AI
                </span>
                <span className="text-xs bg-muted-foreground bg-opacity-20 text-muted-foreground px-2 py-1 rounded">
                  Productivity
                </span>
                <span className="text-xs bg-muted-foreground bg-opacity-20 text-muted-foreground px-2 py-1 rounded">
                  Organization
                </span>
              </div>
            </div>

            {/* Personal Website */}
            <div className="glass-effect glass-white rounded-xl p-8 hover-lift">
              <div className="flex items-center mb-4">
                <Globe className="text-foreground w-8 h-8 mr-4" />
                <h3 className="text-xl font-semibold text-foreground">Personal Website</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Modern portfolio website showcasing my learning journey,
                projects, and creations with interactive elements.
              </p>
              <div className="space-y-2 mb-6">
                <div className="code-block rounded p-3 text-xs">
                  <span className="text-foreground">&lt;Portfolio</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-muted-foreground">projects</span>=
                  <span className="text-foreground">{"{myWork}"}</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-muted-foreground">skills</span>=
                  <span className="text-foreground">{"{techStack}"}</span>
                  <br />
                  <span className="text-foreground">/&gt;</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-2 py-1 rounded">
                  React
                </span>
                <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-2 py-1 rounded">
                  Design
                </span>
                <span className="text-xs bg-foreground bg-opacity-20 text-foreground px-2 py-1 rounded">
                  Web Dev
                </span>
              </div>
            </div>
          </div>

          {/* What Sets Me Apart */}
          <div className="mt-16 glass-effect glass-white rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
              <span className="text-gradient-white">What Sets Me Apart</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Search className="text-foreground w-12 h-12 mb-4 mx-auto" />
                <h4 className="font-semibold mb-2 text-foreground">Deep Understanding</h4>
                <p className="text-sm text-muted-foreground">
                  I code to understand deeply, not just finish tasks
                </p>
              </div>
              <div className="text-center">
                <Hammer className="text-muted-foreground w-12 h-12 mb-4 mx-auto" />
                <h4 className="font-semibold mb-2 text-foreground">Built From Scratch</h4>
                <p className="text-sm text-muted-foreground">
                  Building from ground up to control and learn everything
                </p>
              </div>
              <div className="text-center">
                <Palette className="text-foreground w-12 h-12 mb-4 mx-auto" />
                <h4 className="font-semibold mb-2 text-foreground">Holistic Approach</h4>
                <p className="text-sm text-muted-foreground">
                  Mixing tech + psychology + design for living tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
