import { GraduationCap, Award, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import educationBg from "@/assets/education-bg.jpg";

interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  location: string;
}

const educationData: Education[] = [
  {
    institution: "Sathyabama Institute of Science and Technology",
    degree: "Bachelor of Engineering (B.E) in Computer Science and Engineering",
    period: "2021 - 2025",
    grade: "CGPA: 8.76/10.00",
    location: "Chennai, India",
  },
  {
    institution: "Narayana Junior College",
    degree: "Class XII",
    period: "2019 - 2021",
    grade: "Aggregate: 93.8%",
    location: "Hyderabad, India",
  },
  {
    institution: "Vijay High School",
    degree: "Class X",
    period: "2018 - 2019",
    grade: "Aggregate: 90%",
    location: "Nizamabad, India",
  },
];

const certifications = ["PWC Salesforce Launchpad", "Machine Learning"];

const EducationSection = () => {
  return (
    <section id="education" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={educationBg} alt="" className="w-full h-full object-cover opacity-14" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="mb-16">
            <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">Education</p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Academic<br />
              <span className="text-muted-foreground/30">Background</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Timeline */}
          <div className="space-y-4">
            {educationData.map((edu, index) => (
              <AnimatedSection key={edu.institution} delay={index * 100}>
                <div className="group p-6 border border-border/30 rounded-xl hover:border-foreground/20 transition-all duration-500 bg-background/30 backdrop-blur-sm">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/10 transition-all duration-300">
                      <GraduationCap className="w-5 h-5 text-foreground/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm mb-1">{edu.institution}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{edu.degree}</p>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <span className="text-foreground font-mono">{edu.period}</span>
                        <span className="text-muted-foreground font-mono">{edu.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Certs & Languages */}
          <div className="space-y-4">
            <AnimatedSection delay={200}>
              <div className="p-6 border border-border/30 rounded-xl bg-background/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <Award className="w-5 h-5 text-foreground/60" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">Certifications</h3>
                </div>
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-foreground" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="p-6 border border-border/30 rounded-xl bg-background/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-foreground/60" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["English", "Hindi", "Telugu"].map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 text-xs rounded-full border border-border text-muted-foreground"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
