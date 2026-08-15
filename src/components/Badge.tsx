import type { Pricing } from "@/data/tools"

const config: Record<Pricing, { label: string; className: string }> = {
  Free: {
    label: "Free",
    className:
      "text-cyan-400 bg-cyan-400/10 border border-cyan-400/25",
  },
  Freemium: {
    label: "Freemium",
    className:
      "text-sky-300 bg-sky-300/10 border border-sky-300/25",
  },
  Paid: {
    label: "Paid",
    className:
      "text-indigo-300 bg-indigo-300/10 border border-indigo-300/25",
  },
}

export default function Badge({ pricing }: { pricing: Pricing }) {
  const { label, className } = config[pricing]
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  )
}
