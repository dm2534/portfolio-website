import FilterableGrid from "./FilterableGrid";
import { useAnimationConfig } from "./App";

const projects = [
  {
    title: "Calorie Tracker",
    status: "Live",
    category: "Personal Tools",
    highlight: "AI-powered nutrition logging · Multi Modal (Natural language + Image) input",
    description: "Replaces manual calorie counting with natural language input using Gemini to parse meals and estimate macros automatically.",
    stack: ["GCP", "Vertex AI", "Cloud Run"],
    github: "https://github.com/dm2534/Power-Tracker---calorie-tracker",
    image: import.meta.env.VITE_CALORIE_TRACKER_IMG
  },
  {
    title: "GCP Environment for AI Agents",
    status: "Live",
    category: "Infrastructure",
    highlight: "Reusable IaC module · Least-privilege IAM",
    description: "A parameterised Terraform module provisioning complete GCP infrastructure for AI agents with least-privilege IAM and VPC security.",
    stack: ["GCP", "Terraform", "Cloud Run"],
    github: "https://github.com/dnm54/terraform-gcp-agent-stack",
    image: import.meta.env.VITE_TERRAFORM_GCP_IMG
  },
  {
    title: "ERP Customer Insights Engine",
    status: "In progress",
    category: "Enterprise AI",
    highlight: "Multi-agent RAG pipeline · Legacy Data",
    description: "Production RAG system connecting legacy ERP data to Vertex AI for intelligent business insights and automated reporting.",
    stack: ["GCP", "Vertex AI"],
    github: "#",
  },
  {
    title: "Supplier Risk Scoring Pipeline",
    status: "Live",
    category: "Enterprise AI",
    highlight: "LangChain + Gemini pipeline · Live news monitoring",
    description: "Monitors live news for automotive suppliers, scores each for supply chain risk using structured LLM output, and generates ranked risk reports.",
    stack: ["LangGraph", "GCP", "Vertex AI"],
    github: "https://github.com/dnm2534/supplier-risk-pipeline",
  },
];

export default function Work() {
  const { reduced } = useAnimationConfig();

  return (
    <FilterableGrid
      items={projects}
      sectionNumber="02"
      sectionTitle="Selected Projects"
      dimensions={[
        { key: "status", label: "Status" }
      ]}
      renderCard={(project) => (
        <div className={`group relative flex flex-col w-full p-8 rounded-[2.5rem] bg-[#c9a96e]/5 border border-[#c9a96e]/10 hover:border-[#c9a96e]/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${reduced ? '' : 'animate-in fade-in slide-in-from-bottom-8'}`}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0">
            <div className="absolute inset-0 bg-[#0d1117] bg-[linear-gradient(rgba(201,169,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />
            {project.image && <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover opacity-20 grayscale scale-110 group-hover:scale-100 transition-transform duration-1000" />}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/80 via-[#0d1117]/40 to-[#0d1117]/90" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] mb-4 block">
                {project.highlight}
              </span>
              
              <h3 className="text-2xl font-serif text-[#e8e0d4] mb-4">
                {project.title}
              </h3>
              
              <p className="text-[14px] leading-relaxed text-[#8a8278] mb-8 min-h-[80px]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-[9px] tracking-widest uppercase px-2 py-1 bg-[#0d1117] border border-[#c9a96e]/10 text-[#b8b0a4]">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <a
                  href={project.github}
                  className="text-[11px] tracking-[0.25em] uppercase text-[#c9a96e] hover:text-[#e8e0d4] transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
          </div>
        </div>
      )}
    />
  );
}