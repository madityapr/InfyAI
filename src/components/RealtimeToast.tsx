import { useEffect } from "react"

export interface RealtimeToastProps {
  tool: {
    name: string
    category?: string
    pricing?: string
    url?: string
  }
  onClose: () => void
}

export default function RealtimeToast({ tool, onClose }: RealtimeToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm w-full">
      <div
        className="liquid-glass-card rounded-2xl p-4 border border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.25)] flex items-start gap-3.5 relative overflow-hidden backdrop-blur-2xl"
        style={{ background: "rgba(10, 15, 25, 0.88)" }}
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

        {/* Icon & Live indicator */}
        <div className="relative flex-shrink-0 mt-0.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            🔍
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 pulse-dot-cyan border-2 border-black" />
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
              Live Update
            </span>
            {tool.category && (
              <span className="text-[11px] text-zinc-400 font-medium truncate">
                {tool.category}
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-300 font-medium leading-snug">
            <span className="text-zinc-400">New tool added:</span>{" "}
            <span className="text-white font-bold text-[13px]">{tool.name}</span>
          </p>

          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold mt-1 transition-colors group"
            >
              <span>Explore tool</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
