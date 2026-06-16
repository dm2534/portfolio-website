import { useState, useEffect, useRef } from "react";
import Work from "./Work";
import Writing from "./Writing";
import ContactForm from "./ContactForm";
import ContactModal from "./ContactModal";

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
const skillGroups = [
  { label: "AI / ML", items: ["Vertex AI", "RAG Pipelines", "Multi-Agent Systems", "MLOps"] },
  { label: "Infrastructure", items: ["Terraform", "BigQuery", "Cloud Run"] },
  { label: "Domain", items: ["Cloud Security", "Manufacturing AI", "Enterprise Integration"] },
];

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
        <div className="hidden md:flex items-center gap-4 mr-4">
          <a href="https://www.linkedin.com/in/dale-monteiro-90a3b4213/" target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-widest uppercase text-[#4a4540] hover:text-[#c9a96e] transition-colors">LinkedIn ↗</a>
          <a href="https://github.com/dm2534" target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-widest uppercase text-[#4a4540] hover:text-[#c9a96e] transition-colors">GitHub ↗</a>
        </div>
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
                GCP AI/ML Architect — Manufacturing &amp; Industrial AI — Detroit, MI
              </p>

              <div className="w-12 h-px mb-8 bg-[#c9a96e]/40" />

              <div className="mb-10 flex flex-col gap-6 max-w-[540px] text-[#b8b0a4] text-base font-light leading-[1.8]">
                <p>
                  I build production AI systems on Google Cloud — RAG pipelines that connect to legacy ERP data, multi-agent workflows, and computer vision solutions that move from prototype to real deployment. My background spans mechanical engineering, IT audit at KPMG, an MBA from Georgetown, and cloud security — which means I bring compliance rigor and systems thinking to every architecture decision, not just code that ships.
                </p>
                <p>
                  I approach technical problems with a systems-thinking mindset and the rigor of an auditor. Having conducted SOC2 and IT risk audits at KPMG, I build with a &quot;secure-by-design&quot; and cost-efficient approach from day one. I focus on translating engineering complexity into practical AI systems that safely solve real-world operational challenges.
                </p>
                <div className="mt-4 text-[#8a8278] text-[15px] font-light">
                  <p className="mb-3 text-[13px] tracking-[0.25em] uppercase text-[#c9a96e]">Where I focus</p>
                  <p className="leading-[1.8]">
                    I'm specifically interested in industries with physical infrastructure and real operational risk — manufacturing, automotive supply chain, energy, and logistics. These are sectors where legacy systems are the norm, the stakes are high, and AI needs to be secure and maintainable to matter.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-12">
                {skillGroups.map((group) => (
                  <div key={group.label} className="grid grid-cols-[110px_1fr] gap-4 items-start">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#4a4540] pt-1.5 select-none font-medium">
                      {group.label}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((s) => (
                        <span key={s} className="text-[11px] tracking-[0.2em] uppercase px-3 py-1 border border-[#c9a96e]/20 text-[#8a8278] bg-[#c9a96e]/5 whitespace-nowrap">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
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
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
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
                        Open to Full-Time Roles
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
        ) : activeNav === "Contact" ? (
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 w-full max-w-5xl mx-auto py-12 md:py-20 animate-in fade-in duration-300">
            {/* Left Column — Info & Socials */}
            <div className="w-full md:w-2/5 flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-8 text-[#c9a96e]">
                <span className="text-[11px] tracking-[0.3em] uppercase">04 / Contact</span>
                <div className="h-px w-12 bg-[#c9a96e]/50" />
              </div>
              <h2 className="font-serif text-4xl text-[#e8e0d4] mb-6">Get in touch</h2>
              <p className="text-[#b8b0a4] mb-8 leading-relaxed">
                Have an operational challenge, enterprise AI integration project, or full-time opportunity? Fill out the form or schedule a direct meeting on my calendar.
              </p>
              
              {/* Meeting Scheduler CTA */}
              <div className="mb-8">
                <a
                  href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ08e4t-16mD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#c9a96e] text-[#c9a96e] text-[12px] tracking-widest uppercase hover:bg-[#c9a96e]/10 transition-all font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Meeting ↗
                </a>
              </div>

              {/* Keep only LinkedIn and GitHub */}
              <div className="flex items-center gap-4 mt-auto pt-6">
                <a href="https://www.linkedin.com/in/dale-monteiro-90a3b4213/" target="_blank" rel="noopener noreferrer" className="text-[12px] tracking-widest uppercase text-[#c9a96e] hover:text-[#e8e0d4] transition-colors">LinkedIn ↗</a>
                <span className="text-[#4a4540]">•</span>
                <a href="https://github.com/dm2534" target="_blank" rel="noopener noreferrer" className="text-[12px] tracking-widest uppercase text-[#c9a96e] hover:text-[#e8e0d4] transition-colors">GitHub ↗</a>
              </div>
            </div>

            {/* Right Column — Interactive Form */}
            <div className="w-full md:w-3/5 bg-[#c9a96e]/5 border border-[#c9a96e]/10 p-8 rounded-[2rem]">
              <ContactForm isFullPage={true} />
            </div>
          </div>
        ) : null}
      </main>

      <footer className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 py-5 border-t border-[#c9a96e]/10">
        <span className="text-[11px] tracking-widest uppercase text-[#4a4540]">
          © 2026 Dale Monteiro.
        </span>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", href: "https://github.com/dm2534" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/dale-monteiro-90a3b4213/" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-widest uppercase transition-colors duration-200 text-[#4a4540] hover:text-[#c9a96e]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
