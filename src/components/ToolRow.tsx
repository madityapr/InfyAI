import type { Tool } from "@/data/tools"
import Badge from "./Badge"

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating)
  return (
    <span className="flex items-center gap-1.5 flex-shrink-0">
      <span className="text-white text-xs tracking-tight">{"★".repeat(filled)}{"☆".repeat(5 - filled)}</span>
      <span className="text-[11px] text-zinc-500 tabular-nums font-medium">{rating.toFixed(1)}</span>
    </span>
  )
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] text-zinc-400 bg-white/[0.03] border border-white/[0.06] whitespace-nowrap">
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
      <div className="flex items-center gap-3 md:gap-4 px-0 py-4 border-b border-white/[0.06] group-hover:bg-white/[0.03] transition-colors duration-150 rounded-lg -mx-3 px-3">
        {/* Left: name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <span
              className="font-semibold text-white group-hover:text-zinc-200 text-sm md:text-[15px] leading-snug transition-colors whitespace-nowrap flex items-center gap-1"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              {tool.name}
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs text-zinc-400">↗</span>
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
