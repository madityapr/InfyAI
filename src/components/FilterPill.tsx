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
        inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold
        whitespace-nowrap transition-all duration-200 cursor-pointer
        ${active ? "liquid-pill-active scale-[1.02]" : "liquid-pill-inactive"}
      `}
    >
      {label}
    </button>
  )
}
