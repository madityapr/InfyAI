import { useState, useMemo, useEffect, useRef } from "react"
import { tools as fallbackTools, CATEGORIES, PRICING_OPTIONS } from "@/data/tools"
import type { Tool, Category, PricingFilter } from "@/data/tools"
import FilterPill from "@/components/FilterPill"
import ToolRow from "@/components/ToolRow"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import navLogo from "@/imports/nav-logo.png"
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

  // Smooth scroll-driven fade (no wiggling / stable top anchor)
  useEffect(() => {
    const el = bgVideoRef.current
    if (!el) return

    const update = () => {
      const progress = Math.min(window.scrollY / 450, 1)
      const opacity = Math.max(0.7 - progress * 0.62, 0.04)
      const scale = 1 - progress * 0.06

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
      className="min-h-screen relative selection:bg-white selection:text-black"
      style={{
        backgroundColor: "#000000",
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1.2px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ── Seamless Blended Background Video ── */}
      <div
        ref={bgVideoRef}
        className="fixed left-1/2 pointer-events-none select-none z-0 flex items-center justify-center"
        style={{
          top: "0%",
          transform: "translateX(-50%) scale(1)",
          opacity: 0.7,
          width: "clamp(380px, 78vw, 960px)",
          maxHeight: "720px",
          willChange: "opacity, transform",
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
          style={{
            mixBlendMode: "screen",
            maskImage:
              "radial-gradient(ellipse 70% 65% at 50% 45%, black 25%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.2) 75%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 65% at 50% 45%, black 25%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.2) 75%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Nav bar with Logo ── */}
      <nav className="nav-glow sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src={navLogo}
                alt="infyAI"
                className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform"
              />
              <span
                className="text-base font-extrabold tracking-tight text-white"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                infyAI
              </span>
            </a>
            <span className="hidden sm:block text-zinc-700 text-xs">·</span>
            <span className="hidden sm:block text-zinc-400 text-xs tracking-wide truncate">
              Free AI tools, curated for builders.
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
            <span className="text-zinc-400 text-xs tabular-nums font-medium">
              {tools.length} tools
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-5 md:px-8 relative z-10">
        {/* ── Hero header ── */}
        <header className="pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="flex flex-col items-start gap-5">
            {/* Monochrome High-End Wordmark */}
            <h1
              className="text-[clamp(52px,11vw,104px)] font-extrabold leading-none tracking-[-0.04em] bg-clip-text text-transparent"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                backgroundImage:
                  "linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 50%, #94A3B8 100%)",
              }}
            >
              infyAI
            </h1>

            {/* Tagline */}
            <p className="text-zinc-400 text-base md:text-lg font-light tracking-wide max-w-sm">
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
                  className="text-zinc-500"
                >
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search tools…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.03] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-all border border-white/10 subscribe-input"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
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
          <div className="flex items-center justify-between mb-1 pb-2 border-b border-white/[0.08]">
            <span className="text-xs text-zinc-500 tabular-nums">
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
                className="text-xs text-zinc-400 hover:text-white transition-colors"
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
              <span className="text-4xl text-zinc-700">∞</span>
              <p className="text-zinc-500 text-sm">No tools match your filters.</p>
              <button
                onClick={() => {
                  setActiveCategory("All")
                  setActivePricing("All")
                  setSearch("")
                }}
                className="text-white text-xs underline underline-offset-4 hover:text-zinc-300 transition-colors mt-1"
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
            className="rounded-2xl p-8 md:p-12 text-center glow-border-card"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-3 text-white"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Subscribe to infyAI
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mb-6 max-w-md mx-auto">
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
                className="w-full sm:flex-1 bg-white/[0.04] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-all border border-white/10 subscribe-input disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="subscribe-btn w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
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
              <div className="mt-4 inline-block px-4 py-2 rounded-xl text-xs font-medium bg-white/10 text-white border border-white/20 animate-fade-in">
                {subscribeMessage}
              </div>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 pt-6 border-t border-white/[0.08]">
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold text-white">{tools.length}+</span>
                <span className="block text-[11px] text-zinc-500 uppercase tracking-widest mt-0.5 font-medium">Tools</span>
              </div>
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold text-white">{CATEGORIES.length}+</span>
                <span className="block text-[11px] text-zinc-500 uppercase tracking-widest mt-0.5 font-medium">Categories</span>
              </div>
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold text-white">Weekly</span>
                <span className="block text-[11px] text-zinc-500 uppercase tracking-widest mt-0.5 font-medium">Updates</span>
              </div>
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold text-white">Free</span>
                <span className="block text-[11px] text-zinc-500 uppercase tracking-widest mt-0.5 font-medium">To Browse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker bar (Monochrome Glass) ── */}
      <div className="relative z-10 overflow-hidden py-3 bg-white/[0.02] border-y border-white/[0.08]">
        <div className="ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              className="text-xs tracking-wider uppercase font-medium text-zinc-400 whitespace-nowrap px-8"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-8 relative z-10">
        <div className="max-w-4xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} infyAI. All rights reserved.
          </p>
          <p className="text-zinc-500 text-xs">
            Updated weekly · Curated for builders
          </p>
        </div>
      </footer>
    </div>
  )
}
