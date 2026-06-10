import { useState, useEffect, useRef } from "react";
import Work from "./Work";
import Writing from "./Writing";
import ContactForm from "../components/ContactForm";
import ContactModal from "../components/ContactModal";

export const ANIMATION_CONFIG = {
  fadeUpDuration: 300,
  staggerInterval: 60,
  pageFadeDuration: 200,
};

export function useAnimationConfig() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return {
    ...ANIMATION_CONFIG,
    fadeUpDuration: reduced ? 0 : ANIMATION_CONFIG.fadeUpDuration,
    staggerInterval: reduced ? 0 : ANIMATION_CONFIG.staggerInterval,
    pageFadeDuration: reduced ? 0 : ANIMATION_CONFIG.pageFadeDuration,
    reduced
  };
}

const PORTRAIT_URL = import.meta.env.VITE_PORTRAIT_URL;

const navLinks = ["About", "Work", "Writing", "Contact"];
const skills = ["Vertex AI", "RAG Pipelines", "Multi Agent Systems", "Terraform", "MLOps", "Cloud Security", "BigQuery"];

export default function App() {
  const [activeNav, setActiveNav] = useState("About");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pageFadeDuration, reduced } = useAnimationConfig();
  
  // Footer border scroll logic
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full relative overflow-hidden font-sans bg-[#0d1117] bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,#1a2540_0%,#0d1117_55%),radial-gradient(ellipse_50%_40%_at_20%_80%,#1c1810_0%,transparent_60%)]">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[length:60px_60px]" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-10 py-7">
        <span className="tracking-[0.25em] uppercase text-[11px] text-[#c9a96e]">
          Portfolio — 2026
        </span>
        <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar whitespace-nowrap pb-1 md:pb-0 mx-4 md:mx-0">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveNav(link as any)}
              className={`text-[13px] tracking-widest uppercase transition-colors duration-200 ${
                activeNav === link ? "text-[#c9a96e]" : "text-[#8a8278]"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>
        <button className="hidden md:block text-[13px] tracking-widest uppercase px-5 py-2 border border-[#c9a96e]/40 text-[#c9a96e] transition-all duration-200 hover:bg-[#c9a96e]/10">
          Resume ↗
        </button>
      </header>

      {/* Hero */}
      <main 
        className="relative z-10 flex-grow px-10 pb-10 transition-opacity"
        style={{ transitionDuration: `${pageFadeDuration}ms`, opacity: reduced ? 1 : undefined }}
      >
        {activeNav === "About" ? (
          <div className="grid md:grid-cols-2 gap-0 h-full">
            {/* Left — Bio */}
            <div className="flex flex-col justify-center pr-0 md:pr-16 py-12 md:py-20 order-2 md:order-1">
              <div className="flex items-center gap-3 mb-8 text-[#c9a96e]">
                <span className="text-[11px] tracking-[0.3em] uppercase">01 / Introduction</span>
                <div className="h-px w-12 bg-[#c9a96e]/50" />
              </div>

              <h1 className="mb-2 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.05] text-[#e8e0d4] tracking-[-0.02em]">
                Dale
                <br />
                <span className="text-[#c9a96e] italic">Monteiro</span>
              </h1>

              <p className="mt-4 mb-8 text-[13px] tracking-[0.25em] uppercase text-[#8a8278]">
                AI Engineer &amp; GCP Solutions Architect — Detroit, MI, United States
              </p>

              <div className="w-12 h-px mb-8 bg-[#c9a96e]/40" />

              <p className="mb-6 leading-[1.8] max-w-[480px] text-[#b8b0a4] text-base font-light">
                I build production AI systems on Google Cloud - from RAG pipelines that connect to legacy ERP data, to multi-agent workflows that actually ship.
                I went from auditing enterprise IT at KPMG to deploying GenAI solutions on Vertex AI and that crossover between 
                compliance rigor and cloud engineering is what I bring to every problem. I believe in securely leveraging technology to overcome business challenges and create real impact.
              </p>

              <div className="mb-10 max-w-[480px] text-[#8a8278] text-[15px] font-light">
                <p className="mb-3 text-[13px] tracking-[0.25em] uppercase text-[#c9a96e]">What I build</p>
                <p className="leading-[1.8]">
                  I design and ship practical AI systems on Google Cloud: multi-agent workflows, production RAG pipelines,
                  Terraform-driven infrastructure, and computer vision solutions that move from prototype to real deployment.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-12">
                {skills.map((s) => (
                  <span key={s} className="text-[11px] tracking-[0.2em] uppercase px-3 py-1 border border-[#c9a96e]/20 text-[#8a8278] bg-[#c9a96e]/5">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button onClick={() => setActiveNav("Work")} className="px-7 py-3 text-[13px] tracking-widest uppercase transition-all duration-200 bg-[#c9a96e] text-[#0d1117] hover:bg-[#d4b87e]">
                  View Work
                </button>
                <button onClick={() => setIsModalOpen(true)} className="px-7 py-3 text-[13px] tracking-widest uppercase border border-[#c9a96e]/30 text-[#c9a96e] transition-all duration-200 hover:bg-[#c9a96e]/10">
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Right — Photo */}
            <div className="relative flex items-center justify-center order-1 md:order-2 py-8 md:py-12">
              <div className="absolute inset-6 md:inset-8 border border-[#c9a96e]/10 translate-x-4 translate-y-4" />

              <div className="relative w-full max-w-[420px] overflow-hidden aspect-[3/4] bg-[#0d1117]/50 flex items-center justify-center">
                <img
                  src={PORTRAIT_URL}
                  alt="Dale Monteiro — portrait"
                  className="w-full h-full object-cover object-top contrast-[1.05] brightness-[0.92]"
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117]/70 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between px-4 py-3 bg-[#0d1117]/85 backdrop-blur-md border border-[#c9a96e]/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
                    <span className="text-[11px] tracking-widest uppercase text-[#8a8278]">
                      Open to Opportunities
                    </span>
                  </div>
                  <span className="text-[11px] tracking-widest text-[#c9a96e]">
                    Detroit, MI
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Work />
        )}
      </main>

      <footer className="relative z-10 flex items-center justify-between px-10 py-5 border-t border-[#c9a96e]/10">
        <span className="text-[11px] tracking-widest uppercase text-[#4a4540]">
          © 2026 Dale Monteiro.
        </span>
        <div className="flex items-center gap-6">
          {["Twitter", "GitHub", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[11px] tracking-widest uppercase transition-colors duration-200 text-[#4a4540] hover:text-[#c9a96e]"
            >
              {social}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
