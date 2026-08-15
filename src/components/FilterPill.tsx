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
        inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium
        whitespace-nowrap transition-all duration-200 cursor-pointer
        ${
          active
            ? "pill-active"
            : "text-zinc-400 bg-white/[0.03] border border-white/[0.08] hover:text-white hover:border-white/25 hover:bg-white/[0.08]"
        }
      `}
    >
      {label}
    </button>
  )
}
