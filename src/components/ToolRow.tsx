import type { Tool } from "@/data/tools"
import Badge from "./Badge"

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating)
  return (
    <span className="flex items-center gap-1.5 flex-shrink-0">
      <span className="text-cyan-400 text-xs tracking-tight">{"★".repeat(filled)}{"☆".repeat(5 - filled)}</span>
      <span className="text-[11px] text-zinc-400 tabular-nums font-semibold">{rating.toFixed(1)}</span>
    </span>
  )
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] text-zinc-300 bg-white/[0.05] border border-white/[0.08] backdrop-blur-md whitespace-nowrap">
      {category}
    </span>
  )
}

export default function ToolRow({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="flex items-center gap-3 md:gap-4 py-3.5 px-3.5 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.04] backdrop-blur-md transition-all duration-200">
        {/* Left: name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <span
              className="font-semibold text-white group-hover:text-cyan-300 text-sm md:text-[15px] leading-snug transition-colors whitespace-nowrap flex items-center gap-1"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              {tool.name}
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs text-cyan-400">↗</span>
            </span>
            <span className="text-zinc-400 text-xs md:text-sm truncate mt-0.5 sm:mt-0 font-normal">
              {tool.description}
            </span>
          </div>
        </div>

        {/* Right: category + badge + rating */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <CategoryTag category={tool.category} />
          <Badge pricing={tool.pricing} />
          <div className="hidden sm:flex">
            <Stars rating={tool.rating} />
          </div>
        </div>
      </div>
    </a>
  )
}
