import { Code, Database, Wrench, Brain } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const AboutSection = () => {
  const highlights = [
    { icon: Code, label: "Languages", value: "Python, Java, C" },
    { icon: Database, label: "Databases", value: "MySQL, MongoDB" },
    { icon: Wrench, label: "Tools", value: "Git, VS Code, Docker" },
    { icon: Brain, label: "Focus", value: "AI & Machine Learning" },
  ];

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Generated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_20%,hsl(var(--foreground)/0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_85%_75%,hsl(var(--foreground)/0.06),transparent_75%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--foreground)/0.03)_0%,transparent_40%,hsl(var(--foreground)/0.02)_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="mb-16">
            <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">About</p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Passionate<br />
              <span className="text-muted-foreground/30">Developer</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection delay={100}>
            <div className="space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                I'm a Computer Science Engineering student with a deep passion for building 
                intelligent systems. My journey in tech started with curiosity about how 
                software can solve real-world problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Specializing in <span className="text-foreground">Artificial Intelligence</span> and 
                Machine Learning, I love exploring the intersection of data science and 
                software development to create impactful solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or learning about the latest advancements in AI.
              </p>

              {/* Stats */}
              <div className="flex gap-12 pt-8 border-t border-border/30">
                <div>
                  <span className="text-4xl font-bold text-foreground">3+</span>
                  <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">Projects</p>
                </div>
                <div>
                  <span className="text-4xl font-bold text-foreground">8.76</span>
                  <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">CGPA</p>
                </div>
                <div>
                  <span className="text-4xl font-bold text-foreground">2+</span>
                  <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">Certifications</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map((item, index) => (
              <AnimatedSection key={item.label} delay={150 + index * 100}>
                <div className="group p-6 border border-border/30 rounded-xl hover:border-foreground/20 transition-all duration-500 hover:bg-foreground/[0.02]">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-foreground/60" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
