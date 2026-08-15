import type { Pricing } from "@/data/tools"

const config: Record<Pricing, { label: string; className: string }> = {
  Free: {
    label: "Free",
    className:
      "text-cyan-300 bg-cyan-950/40 border border-cyan-400/30 font-semibold shadow-[0_0_10px_rgba(34,211,238,0.12)]",
  },
  Freemium: {
    label: "Freemium",
    className:
      "text-sky-300 bg-sky-950/30 border border-sky-400/20 font-medium",
  },
  Paid: {
    label: "Paid",
    className:
      "text-zinc-300 bg-white/[0.05] border border-white/10 font-medium",
  },
}

export default function Badge({ pricing }: { pricing: Pricing }) {
  const { label, className } = config[pricing]
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] tracking-wide whitespace-nowrap backdrop-blur-md ${className}`}
    >
      {label}
    </span>
  )
}
