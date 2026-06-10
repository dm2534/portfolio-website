import FilterableGrid from "./FilterableGrid";
import { useAnimationConfig } from "./App";

const posts = [
  {
    title: "Moving Beyond RAG: Multi-Agent Choreography",
    category: "AI Engineering",
    date: "May 12, 2026",
    readTime: "8 min read",
    summary: "Why single-chain RAG systems fail in production and how to orchestrate specialist agents for enterprise reliability.",
    highlight: "System Design · Vertex AI"
  },
  {
    title: "The Compliance-First Cloud Architect",
    category: "Infrastructure",
    date: "April 28, 2026",
    readTime: "6 min read",
    summary: "Applying auditing principles to Terraform modules to ensure security is baked into every deployment.",
    highlight: "Terraform · Security"
  }
];

export default function Writing() {
  const { reduced } = useAnimationConfig();

  return (
    <FilterableGrid
      items={posts}
      sectionNumber="03"
      sectionTitle="Thoughts & Technical Notes"
      dimensions={[{ key: "category", label: "Topic" }]}
      renderCard={(post) => (
        <div className={`group relative flex flex-col w-full p-8 rounded-[2rem] bg-[#c9a96e]/5 border border-[#c9a96e]/10 hover:border-[#c9a96e]/30 transition-all duration-500 overflow-hidden ${reduced ? '' : 'animate-in fade-in slide-in-from-bottom-8'}`}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
            <div className="absolute inset-0 bg-[#0d1117] bg-[linear-gradient(rgba(201,169,110,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,0.03)_1px,transparent_1px)] bg-[length:30px_30px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]">{post.category}</span>
              <span className="text-[10px] tracking-widest text-[#4a4540]">{post.date}</span>
            </div>
            
            <h3 className="text-xl font-serif text-[#e8e0d4] mb-4 group-hover:text-[#c9a96e] transition-colors">
              {post.title}
            </h3>
            
            <p className="text-[14px] leading-relaxed text-[#8a8278] mb-8">
              {post.summary}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#4a4540] group-hover:text-[#c9a96e] transition-colors">
                Read Post →
              </span>
              <span className="text-[10px] italic text-[#4a4540]">{post.readTime}</span>
            </div>
          </div>
        </div>
      )}
    />
  );
}