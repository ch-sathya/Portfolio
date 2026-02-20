import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-border/30 bg-background/94">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground/50">
          {"\u00A9"} {new Date().getFullYear()} Sathya Cheela
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/ch-sathya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/sathya-cheela"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:cheela.sathya@gmail.com"
            className="text-muted-foreground/40 hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


