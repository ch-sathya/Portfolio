import { Github, Linkedin, Mail, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["AI Specialist", "ML Engineer", "Full Stack Dev", "Problem Solver"];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Typing effect
  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(word.substring(0, displayText.length + 1));
        if (displayText.length === word.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(word.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 30 : 60);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  // Interactive particle constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      baseOpacity: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      const baseOpacity = Math.random() * 0.2 + 0.03;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.2 + 0.3,
        opacity: baseOpacity,
        baseOpacity,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p, i) => {
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);
        if (distMouse < 180) {
          p.opacity = p.baseOpacity + (1 - distMouse / 180) * 0.4;
          p.vx += dxm * 0.00002;
          p.vy += dym * 0.00002;
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.999;
        p.vy *= 0.999;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (j <= i) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover brightness-[0.55] saturate-70" />

        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/72" />
        {/* Extended bottom fade for seamless flow into sections */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Particles on top of image */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 md:px-12 max-w-5xl mx-auto mt-[120px] md:mt-[140px] mb-[68px]">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 tracking-[-0.03em] leading-[0.9] animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-foreground">Sathya</span>
        </h1>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-[-0.03em] leading-[0.9] animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="text-foreground/20">Cheela</span>
        </h1>

        {/* Typing effect */}
        <div
          className="h-8 mb-8 animate-slide-up flex items-center justify-center gap-2"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            {displayText}
          </span>
          <span className="animate-blink text-foreground font-mono">|</span>
        </div>

        <p
          className="text-base text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.25s" }}
        >
          Building intelligent solutions at the intersection of
          <span className="text-foreground"> software engineering </span>
          and
          <span className="text-foreground"> artificial intelligence</span>.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-20 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="mailto:cheela.sathya@gmail.com"
            className="group inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background font-medium text-sm rounded-full hover:bg-foreground/90 transition-all duration-300"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="https://github.com/sathya-ch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 border border-foreground/20 text-foreground font-medium text-sm rounded-full hover:bg-foreground/10 backdrop-blur-sm transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/sathya-cheela"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 border border-foreground/20 text-foreground font-medium text-sm rounded-full hover:bg-foreground/10 backdrop-blur-sm transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="text-muted-foreground hover:text-foreground transition-colors animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground/40 uppercase my-0">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
