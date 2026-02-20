import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import skillsBg from "@/assets/skills-bg.jpg";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "Python", level: 85, category: "Programming" },
  { name: "C", level: 75, category: "Programming" },
  { name: "HTML", level: 80, category: "Technologies" },
  { name: "CSS", level: 75, category: "Technologies" },
  { name: "JavaScript", level: 70, category: "Technologies" },
  { name: "MySQL", level: 80, category: "Database" },
  { name: "PostgreSQL", level: 70, category: "Database" },
  { name: "Git", level: 85, category: "Tools" },
  { name: "VS Code", level: 90, category: "Tools" },
  { name: "Linux", level: 75, category: "Tools" },
  { name: "Machine Learning", level: 75, category: "AI/ML" },
  { name: "Scikit-learn", level: 70, category: "AI/ML" },
];

const categories = ["All", "Programming", "Technologies", "Database", "Tools", "AI/ML"];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={skillsBg} alt="" className="w-full h-full object-cover opacity-14" />
        <div className="absolute inset-0 bg-background/78" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="mb-16">
            <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">Skills</p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Technical<br />
              <span className="text-muted-foreground/30">Expertise</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSkills.map((skill, index) => (
            <AnimatedSection key={skill.name} delay={150 + index * 50}>
              <div className="group p-5 border border-border/30 rounded-xl hover:border-foreground/20 transition-all duration-500 bg-background/30 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-foreground text-sm">{skill.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                </div>
                <div className="h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground/60 group-hover:bg-foreground transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
