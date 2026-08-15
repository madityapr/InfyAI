import { useState, useMemo, useEffect, useRef } from "react"
import { tools as fallbackTools, CATEGORIES, PRICING_OPTIONS } from "@/data/tools"
import type { Tool, Category, PricingFilter } from "@/data/tools"
import FilterPill from "@/components/FilterPill"
import ToolRow from "@/components/ToolRow"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import heroVideo from "@/imports/hero-video.mp4"

const TICKER_ITEMS = [
  "✦ Subscribe to infyAI",
  "✦ Free forever",
  "✦ Get latest tools & updates",
  "✦ Weekly AI news that matters",
  "✦ Join 10,000+ builders",
  "✦ Curated by infyAI",
  "✦ All the best AI tools in one place",
  "✦ Subscribe to infyAI",
  "✦ Free forever",
  "✦ Get latest tools & updates",
  "✦ Weekly AI news that matters",
  "✦ Join 10,000+ builders",
  "✦ Curated by infyAI",
  "✦ All the best AI tools in one place",
]

export default function App() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All")
  const [activePricing, setActivePricing] = useState<PricingFilter>("All")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState("")
  const [tools, setTools] = useState<Tool[]>(fallbackTools)
  const bgVideoRef = useRef<HTMLDivElement>(null)

  // Fetch tools from Supabase (falls back to hardcoded data)
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return
    supabase
      .from("tools")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setTools(data as Tool[])
      })
  }, [])

  // Scroll-driven: video drifts from top → center, opacity fades out
  useEffect(() => {
    const el = bgVideoRef.current
    if (!el) return

    const update = () => {
      const progress = Math.min(window.scrollY / 560, 1)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      const top = 4 + eased * 40
      const opacity = 0.18 - eased * 0.14
      const scale = 1 - eased * 0.18

      el.style.top = `${top}%`
      el.style.opacity = String(opacity)
      el.style.transform = `translateX(-50%) scale(${scale})`
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchSearch =
        search === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      const matchCategory =
        activeCategory === "All" || t.category === activeCategory
      const matchPricing =
        activePricing === "All" || t.pricing === activePricing
      return matchSearch && matchCategory && matchPricing
    })
  }, [search, activeCategory, activePricing])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedEmail = email.trim()
    if (!trimmedEmail) return

    setSubscribing(true)
    setSubscribeMessage("")

    try {
      // 1. Call the backend / local dev API
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSubscribed(true)
        setSubscribeMessage(data.message || "Subscribed successfully!")
        setEmail("")
        setTimeout(() => {
          setSubscribed(false)
          setSubscribeMessage("")
        }, 6000)
        setSubscribing(false)
        return
      }
    } catch {
      // API fallback
    }

    // 2. Direct Supabase fallback
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email: trimmedEmail.toLowerCase(), is_active: true }])

      if (error && error.code !== "23505") {
        setSubscribeMessage(`Error: ${error.message}`)
        setSubscribing(false)
        return
      }
    }

    setSubscribed(true)
    setSubscribeMessage("🎉 Welcome to infyAI! Subscribed successfully.")
    setEmail("")
    setTimeout(() => {
      setSubscribed(false)
      setSubscribeMessage("")
    }, 5000)
    setSubscribing(false)
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "#030712",
        backgroundImage:
          "radial-gradient(circle at center, rgba(14,165,233,0.03) 1px, transparent 1.2px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ── Background video ── */}
      <div
        ref={bgVideoRef}
        className="infy-bg-logo fixed left-1/2 pointer-events-none select-none z-0"
        style={{
          top: "4%",
          transform: "translateX(-50%) scale(1)",
          opacity: 0.18,
          width: "clamp(320px, 52vw, 680px)",
          willChange: "top, opacity, transform",
        }}
      >
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="w-full h-auto object-contain"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      {/* ── Nav bar ── */}
      <nav className="nav-glow sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="text-sm font-bold tracking-tight flex-shrink-0"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                background: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              infyAI
            </span>
            <span className="hidden sm:block text-cyan-400/20 text-xs">·</span>
            <span className="hidden sm:block text-cyan-300/30 text-xs tracking-wide truncate">
              Free AI tools, curated for builders.
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
            <span className="text-cyan-400/40 text-xs tabular-nums">
              {tools.length} tools
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-5 md:px-8 relative z-10">
        {/* ── Hero header ── */}
        <header className="pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="flex flex-col items-start gap-5">
            {/* Wordmark */}
            <h1
              className="text-[clamp(52px,11vw,104px)] font-extrabold leading-none tracking-[-0.04em] bg-clip-text text-transparent"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                backgroundImage:
                  "linear-gradient(135deg, #ffffff 0%, #22d3ee 30%, #0ea5e9 55%, #6366f1 80%, #a78bfa 100%)",
              }}
            >
              infyAI
            </h1>

            {/* Tagline */}
            <p className="text-white/40 text-base md:text-lg font-light tracking-wide max-w-sm">
              Free AI tools, all in one place — curated and updated weekly.
            </p>

            {/* Search bar */}
            <div className="w-full max-w-xl mt-2 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-cyan-400/30"
                >
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search tools…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.03] rounded-xl pl-10 pr-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:outline-none transition-all glow-border-blue subscribe-input"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-cyan-300/80 transition-colors"
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* ── Filter rows ── */}
        <section className="pb-6 space-y-3">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <FilterPill
              label="All"
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            />
            {CATEGORIES.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? "All" : cat)
                }
              />
            ))}
          </div>

          <div className="flex gap-2">
            {PRICING_OPTIONS.map((opt) => (
              <FilterPill
                key={opt}
                label={opt}
                active={activePricing === opt}
                onClick={() => setActivePricing(opt)}
              />
            ))}
          </div>
        </section>

        {/* ── Tool list ── */}
        <section className="pb-24">
          <div className="flex items-center justify-between mb-1 pb-2 border-b border-cyan-400/[0.08]">
            <span className="text-xs text-cyan-400/30 tabular-nums">
              {filtered.length === tools.length
                ? `${tools.length} tools`
                : `${filtered.length} of ${tools.length} tools`}
            </span>
            {(activeCategory !== "All" || activePricing !== "All" || search) && (
              <button
                onClick={() => {
                  setActiveCategory("All")
                  setActivePricing("All")
                  setSearch("")
                }}
                className="text-xs text-cyan-400/30 hover:text-cyan-300/80 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div>
              {filtered.map((tool) => (
                <ToolRow key={tool.name} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <span className="text-4xl opacity-20">∞</span>
              <p className="text-white/25 text-sm">No tools match your filters.</p>
              <button
                onClick={() => {
                  setActiveCategory("All")
                  setActivePricing("All")
                  setSearch("")
                }}
                className="text-cyan-400/70 text-xs hover:text-cyan-300 transition-colors mt-1"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ── Subscribe section ── */}
      <section className="relative z-10 py-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-12 text-center glow-border-cyan"
            style={{
              background: "linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(6,11,24,0.8) 50%, rgba(99,102,241,0.04) 100%)",
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                backgroundImage: "linear-gradient(135deg, #22d3ee, #0ea5e9, #6366f1)",
              }}
            >
              Subscribe to infyAI
            </h2>
            <p className="text-white/35 text-sm md:text-base mb-6 max-w-md mx-auto">
              Free forever. Get the latest AI tools, updates, and weekly curated picks delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribing}
                required
                className="w-full sm:flex-1 bg-white/[0.04] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:outline-none transition-all glow-border-blue subscribe-input disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="subscribe-btn w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {subscribing ? (
                  <span>Subscribing...</span>
                ) : subscribed ? (
                  <span>✓ Subscribed!</span>
                ) : (
                  <span>Subscribe →</span>
                )}
              </button>
            </form>

            {subscribeMessage && (
              <div className="mt-4 inline-block px-4 py-2 rounded-xl text-xs font-medium bg-cyan-400/10 text-cyan-300 border border-cyan-400/25 animate-fade-in">
                {subscribeMessage}
              </div>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 pt-6 border-t border-cyan-400/[0.08]">
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold text-cyan-400">{tools.length}+</span>
                <span className="block text-[11px] text-white/30 uppercase tracking-widest mt-0.5">Tools</span>
              </div>
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold text-cyan-400">{CATEGORIES.length}+</span>
                <span className="block text-[11px] text-white/30 uppercase tracking-widest mt-0.5">Categories</span>
              </div>
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold text-cyan-400">Weekly</span>
                <span className="block text-[11px] text-white/30 uppercase tracking-widest mt-0.5">Updates</span>
              </div>
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold text-cyan-400">Free</span>
                <span className="block text-[11px] text-white/30 uppercase tracking-widest mt-0.5">To Browse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker bar ── */}
      <div
        className="relative z-10 overflow-hidden py-2.5"
        style={{
          background: "linear-gradient(90deg, #0ea5e9, #22d3ee, #6366f1, #0ea5e9)",
          backgroundSize: "300% 100%",
        }}
      >
        <div className="ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              className="text-sm font-medium text-white/90 whitespace-nowrap px-6"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-cyan-400/[0.06] py-8 relative z-10">
        <div className="max-w-4xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} infyAI. All rights reserved.
          </p>
          <p className="text-cyan-400/20 text-xs">
            Updated weekly · Subscribe for full access →
          </p>
        </div>
      </footer>
    </div>
  )
}
