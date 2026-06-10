import { useState, useEffect, useMemo } from "react";
import { useAnimationConfig } from "./App";

interface FilterDimension {
  key: string;
  label: string;
}

interface FilterableGridProps<T> {
  items: T[];
  dimensions: FilterDimension[];
  renderCard: (item: T, index: number) => React.ReactNode;
  sectionNumber: string;
  sectionTitle: string;
}

export default function FilterableGrid<T extends Record<string, any>>({
  items,
  dimensions,
  renderCard,
  sectionNumber,
  sectionTitle,
}: FilterableGridProps<T>) {
  const { fadeUpDuration, staggerInterval, reduced } = useAnimationConfig();
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  // Sync URL Params to State on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: Record<string, string> = {};
    dimensions.forEach((d) => {
      const val = params.get(d.key);
      if (val) newFilters[d.key] = val;
    });
    setActiveFilters(newFilters);
  }, [dimensions]);

  // Update URL when filters change
  const setFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
      setActiveFilters((prev) => ({ ...prev, [key]: value }));
    } else {
      params.delete(key);
      const { [key]: _, ...rest } = activeFilters;
      setActiveFilters(rest);
    }
    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return Object.entries(activeFilters).every(([key, value]) => {
        return String(item[key]) === value;
      });
    });
  }, [items, activeFilters]);

  // Extract unique options for each dimension
  const options = useMemo(() => {
    const map: Record<string, string[]> = {};
    dimensions.forEach((d) => {
      map[d.key] = Array.from(new Set(items.map((item) => String(item[d.key]))));
    });
    return map;
  }, [items, dimensions]);

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-3 text-[#c9a96e]">
          <span className="text-[11px] tracking-[0.3em] uppercase">{sectionNumber} / {sectionTitle}</span>
          <div className="h-px w-12 bg-[#c9a96e]/50" />
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 md:pb-0">
          {dimensions.map((d) => (
            <div key={d.key} className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest text-[#4a4540]">{d.label}:</span>
              <button
                onClick={() => setFilter(d.key, null)}
                className={`text-[11px] tracking-wider uppercase transition-colors ${!activeFilters[d.key] ? 'text-[#c9a96e]' : 'text-[#8a8278] hover:text-[#e8e0d4]'}`}
              >
                All
              </button>
              {options[d.key]?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(d.key, opt)}
                  className={`text-[11px] tracking-wider uppercase transition-colors ${activeFilters[d.key] === opt ? 'text-[#c9a96e]' : 'text-[#8a8278] hover:text-[#e8e0d4]'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {filteredItems.map((item, i) => (
          <div 
            key={`${item.title}-${i}`} 
            className="h-full flex"
            style={{ 
              animationDelay: `${i * staggerInterval}ms`,
              animationDuration: `${fadeUpDuration}ms`
            }}
          >
            {renderCard(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}