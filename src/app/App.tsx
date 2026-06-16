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

const navLinks = ["About", "Work", "Blog", "Contact"];
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
      <header className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 py-7">
        <span className="tracking-[0.25em] uppercase text-[11px] text-[#c9a96e]">
          Portfolio — 2026
        </span>
        <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar whitespace-nowrap pb-1 md:pb-0 mx-4 md:mx-0">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveNav(link as any)}
              className={`text-[13px] tracking-widest uppercase transition-colors duration-200 ${activeNav === link ? "text-[#c9a96e]" : "text-[#8a8278]"
                }`}
            >
              {link}
            </button>
          ))}
        </nav>
        <a
          href="https://storage.googleapis.com/dalesbucket2001/Dale_Monteiro_GCP_Solutions_Architect.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-[13px] tracking-widest uppercase px-5 py-2 border border-[#c9a96e]/40 text-[#c9a96e] transition-all duration-200 hover:bg-[#c9a96e]/10"
        >
          Resume ↗
        </a>
      </header>

      {/* Hero */}
      <main
        className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 pb-10 transition-opacity"
        style={{ transitionDuration: `${pageFadeDuration}ms`, opacity: reduced ? 1 : undefined }}
      >
        {activeNav === "About" ? (
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center h-full py-8">
            {/* Left — Bio */}
            <div className="flex flex-col justify-center pr-0 order-2 md:order-1">
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

              <div className="mb-10 flex flex-col gap-6 max-w-[540px] text-[#b8b0a4] text-base font-light leading-[1.8]">
                <p>
                  I build production AI systems on Google Cloud - from RAG pipelines that connect to legacy ERP data, to multi-agent workflows that actually ship.
                  I pivoted from auditing enterprise IT at KPMG to deploying GenAI solutions on Vertex AI and that balanced approach of
                  compliance rigor and cloud engineering is what I bring to every project. I believe in leveraging technology to overcome business challenges and create real impact.
                </p>
                <p>
                  I approach technical problems with a systems-thinking mindset and the rigor of an auditor. Having conducted SOC2 and IT risk audits at KPMG, I build with a &quot;secure-by-design&quot; and cost-efficient approach from day one. I focus on translating engineering complexity into practical AI systems that safely solve real-world operational challenges.
                </p>
                <p>
                  I'm most interested in problems at the intersection of AI and pyshical operations - especially sectors like manufacturing, automotive supply chain, and logistics. These are industries where legacy infrastructure is real, the stakes are high, and &quot;move fast and break things&quot; is not an option.
                </p>
                <p>
                  I stay closely tuned to recent AI innovations and am always up for a quick chat to trade ideas, talk MLOps, or discuss where cloud infrastructure is heading. Feel free to reach out!
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
            <div className="relative flex items-center justify-center order-1 md:order-2 py-8 md:py-12 group perspective-1000 w-full">
              {/* Animated glowing backdrop */}
              <div className="absolute inset-0 bg-[#c9a96e]/5 blur-[100px] rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Frame Wrapper */}
              <div className="relative w-full max-w-[440px] aspect-[3/4]">
                {/* Decorative border box that shifts on hover */}
                <div className="absolute inset-0 border border-[#c9a96e]/30 rounded-[2.5rem] translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-700 ease-out" />

                {/* Main image container */}
                <div className="relative w-full h-full overflow-hidden bg-[#0d1117] rounded-[2.5rem] border border-[#c9a96e]/20 shadow-2xl flex items-center justify-center transform transition-transform duration-700 ease-out group-hover:-translate-y-2">
                  <img
                    src={PORTRAIT_URL}
                    alt="Dale Monteiro — portrait"
                    className="w-full h-full object-cover object-top contrast-[1.05] brightness-[0.92] transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/50 to-transparent" />

                  {/* Floating Glassmorphic Status Card */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between px-5 py-4 bg-[#0d1117]/30 backdrop-blur-xl border border-[#c9a96e]/30 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transform transition-all duration-700 ease-out group-hover:translate-y-[-4px]">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4ade80]"></span>
                      </div>
                      <span className="text-[10px] tracking-widest uppercase text-[#e8e0d4] font-medium">
                        Open to Opportunities
                      </span>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-[#c9a96e]">
                      Detroit, MI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeNav === "Work" ? (
          <Work />
        ) : activeNav === "Blog" ? (
          <Writing />
        ) : (
          <Work />
        )}
      </main>

      <footer className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 py-5 border-t border-[#c9a96e]/10">
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
