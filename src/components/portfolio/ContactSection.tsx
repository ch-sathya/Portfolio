import { Mail, Phone, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "cheela.sathya@gmail.com",
      href: "mailto:cheela.sathya@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 6300839394",
      href: "tel:+916300839394",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/sathya-ch", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/sathya-cheela", label: "LinkedIn" },
    { icon: Mail, href: "mailto:cheela.sathya@gmail.com", label: "Email" },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-background/94 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-7 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">Contact</p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Let's Connect
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {contactInfo.map((info, index) => (
            <AnimatedSection key={info.label} delay={index * 100}>
              <a
                href={info.href}
                className="group block p-6 border border-border/30 rounded-xl text-center hover:border-foreground/20 transition-all duration-500 hover:bg-foreground/[0.02]"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-all duration-300">
                    <info.icon className="w-5 h-5 text-foreground/60" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{info.label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300}>
          <div className="flex justify-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-2 px-5 py-3 border border-border/30 rounded-full hover:border-foreground/30 hover:bg-foreground/[0.03] transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{social.label}</span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground/0 group-hover:text-foreground transition-all" />
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
