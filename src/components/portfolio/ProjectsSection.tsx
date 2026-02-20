import { useState } from "react";
import { Github, ArrowLeft, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import projectsBg from "@/assets/projects-bg.jpg";

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  technologies: string[];
  category: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Bike Rental Demand Prediction",
    description: "Designed and implemented a machine learning model to predict bike rental demand based on historical and weather data.",
    fullDescription: "This project focuses on building a robust machine learning pipeline to predict bike rental demand using historical rental data combined with weather conditions. The model helps rental companies optimize their fleet distribution and staffing based on predicted demand patterns. Through extensive feature engineering including one-hot encoding for categorical variables and proper scaling of numerical features, the model achieves high predictive accuracy. Both linear regression and random forest algorithms were implemented and compared, with the ensemble method showing superior performance in capturing non-linear relationships in the data.",
    highlights: [
      "Feature engineering with one-hot encoding and scaling",
      "Linear regression and random forest models",
      "High predictive accuracy achieved",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Jupyter"],
    category: "AI/ML",
    github: "https://github.com/sathya-ch",
  },
  {
    id: 2,
    title: "Car Loan EMI Calculator",
    description: "Web application providing real-time EMI calculations for effective financial planning.",
    fullDescription: "A comprehensive web-based financial tool designed to help users calculate their Equated Monthly Installments (EMI) for car loans. The application features an intuitive interface that allows users to input principal amount, interest rate, and loan tenure to get instant calculations. Built with a focus on user experience, it includes real-time validation, responsive design for seamless use across devices, and visual representations of payment breakdowns. The calculator also provides detailed amortization schedules showing the interest and principal components of each payment.",
    highlights: [
      "Interactive and responsive user interface",
      "Real-time calculation with validation",
      "Cross-device compatibility",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "VS Code"],
    category: "Web",
    github: "https://github.com/sathya-ch",
  },
  {
    id: 3,
    title: "Finding Missing Persons Using AI",
    description: "Advanced facial recognition system to identify missing persons by analyzing public images against a scalable database.",
    fullDescription: "An innovative AI-powered platform designed to assist in locating missing persons through advanced facial recognition technology. The system allows community members to contribute images which are analyzed against a growing database of missing persons. Using the Dlib library for facial feature extraction and comparison, the platform can identify potential matches with high accuracy. The PostgreSQL backend ensures efficient storage and retrieval of facial embeddings, while the crowdsourced approach maximizes coverage. The system includes privacy safeguards and works in coordination with relevant authorities to verify matches.",
    highlights: [
      "Crowdsourced image contribution platform",
      "Scalable facial recognition with Dlib",
      "Efficient database management for image retrieval",
    ],
    technologies: ["Python", "PostgreSQL", "Dlib", "Machine Learning"],
    category: "AI/ML",
    github: "https://github.com/sathya-ch",
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const bgLayer = (
    <div className="absolute inset-0 z-0">
      <img src={projectsBg} alt="" className="w-full h-full object-cover opacity-12 brightness-[0.55] saturate-70" />
      <div className="absolute inset-0 bg-background/84" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );

  if (selectedProject) {
    return (
      <section id="projects" className="relative py-24 px-6 md:px-12 min-h-screen overflow-hidden">
        {bgLayer}
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedSection>
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to projects
            </button>

            <div className="border border-border/30 rounded-2xl p-8 md:p-12 bg-background/30 backdrop-blur-sm">
              <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">
                {selectedProject.category}
              </p>

              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
                {selectedProject.title}
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-10">
                {selectedProject.fullDescription}
              </p>

              <div className="mb-10">
                <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Key Highlights</h3>
                <ul className="space-y-3">
                  {selectedProject.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-foreground" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10">
                <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border/30">
                <a
                  href={selectedProject.github || "https://github.com/sathya-ch"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-all"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {bgLayer}
      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="mb-16">
            <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">Work</p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Featured<br />
              <span className="text-muted-foreground/30">Projects</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <div
                className="group p-6 border border-border/30 rounded-xl cursor-pointer h-full hover:border-foreground/20 transition-all duration-500 hover:bg-foreground/[0.02] bg-background/30 backdrop-blur-sm"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2.5 py-1 text-muted-foreground">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
