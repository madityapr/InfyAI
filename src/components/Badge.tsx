import type { Pricing } from "@/data/tools"

const config: Record<Pricing, { label: string; className: string }> = {
  Free: {
    label: "Free",
    className:
      "text-white bg-white/10 border border-white/20 font-medium",
  },
  Freemium: {
    label: "Freemium",
    className:
      "text-zinc-300 bg-white/[0.05] border border-white/10",
  },
  Paid: {
    label: "Paid",
    className:
      "text-zinc-400 bg-white/[0.02] border border-white/[0.08]",
  },
}

export default function Badge({ pricing }: { pricing: Pricing }) {
  const { label, className } = config[pricing]
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  )
}
