interface FilterPillProps {
  label: string
  active: boolean
  onClick: () => void
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium
        whitespace-nowrap transition-all duration-200 cursor-pointer
        ${
          active
            ? "pill-active"
            : "text-white/50 border border-cyan-400/10 hover:text-cyan-300/80 hover:border-cyan-400/25 hover:bg-cyan-400/[0.04]"
        }
      `}
    >
      {label}
    </button>
  )
}
