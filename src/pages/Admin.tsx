import { useState, useEffect, useCallback } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { broadcastNewTool, runAutoDiscoveryStep } from "@/lib/autoDiscovery"
import { tools as fallbackToolsData, CATEGORIES } from "@/data/tools"
import type { Category } from "@/data/tools"

type Pricing = "Free" | "Freemium" | "Paid"
type Tab = "tools" | "subscribers" | "send-update"

interface ToolItem {
  id: string
  name: string
  description: string
  category: Category
  pricing: Pricing
  rating: number
  url: string
  is_infy_pick?: boolean
}

interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
}

const EMPTY_TOOL = {
  name: "",
  description: "",
  category: "Research" as Category,
  pricing: "Free" as Pricing,
  rating: 4.0,
  url: "",
  is_infy_pick: false,
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  const [activeTab, setActiveTab] = useState<Tab>("tools")
  const [tools, setTools] = useState<ToolItem[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" as "success" | "error" | "" })

  // Tool form
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null)
  const [toolForm, setToolForm] = useState(EMPTY_TOOL)

  // Email form
  const [emailSubject, setEmailSubject] = useState("")
  const [emailContent, setEmailContent] = useState("")
  const [sending, setSending] = useState(false)

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123"

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: "", type: "" }), 4000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setAuthError("")
    } else {
      setAuthError("Incorrect password")
    }
  }

  // ── Fetch tools ──
  const fetchTools = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback: load hardcoded tools with generated IDs
      const local = fallbackToolsData.map((t, i) => ({
        ...t,
        id: `local-${i}`,
      })) as ToolItem[]
      setTools(local)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("created_at", { ascending: true })
    if (error) {
      showMessage(`Error fetching tools: ${error.message}`, "error")
      const local = fallbackToolsData.map((t, i) => ({
        ...t,
        id: `local-${i}`,
      })) as ToolItem[]
      setTools(local)
    } else {
      if (data && data.length > 0) {
        // Deduplicate by name
        const seen = new Set<string>()
        const uniqueTools: ToolItem[] = []
        for (const item of data) {
          const key = item.name.toLowerCase().trim()
          if (!seen.has(key)) {
            seen.add(key)
            uniqueTools.push(item)
          }
        }
        setTools(uniqueTools)
      } else {
        setTools(fallbackToolsData.map((t, i) => ({ ...t, id: `local-${i}` })) as ToolItem[])
      }
    }
    setLoading(false)
  }, [])

  // ── Fetch subscribers ──
  const fetchSubscribers = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return
    setLoading(true)
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false })
    if (error) {
      showMessage(`Error fetching subscribers: ${error.message}`, "error")
    } else {
      setSubscribers(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchTools()
      fetchSubscribers()
    }
  }, [isAuthenticated, fetchTools, fetchSubscribers])

  // ── Add / Update tool ──
  const handleSaveTool = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (isSupabaseConfigured && supabase) {
      // Supabase mode
      if (editingTool) {
        let { error } = await supabase
          .from("tools")
          .update(toolForm)
          .eq("id", editingTool.id)

        // If is_infy_pick column is missing in Supabase DB, retry without it
        if (error && error.message.includes("is_infy_pick")) {
          const { is_infy_pick, ...cleanForm } = toolForm
          const retry = await supabase.from("tools").update(cleanForm).eq("id", editingTool.id)
          error = retry.error
        }

        if (error) {
          showMessage(`Error updating tool: ${error.message}`, "error")
        } else {
          showMessage(`"${toolForm.name}" updated successfully!`, "success")
          setEditingTool(null)
          setToolForm(EMPTY_TOOL)
          fetchTools()
        }
      } else {
        let { error } = await supabase.from("tools").insert([toolForm])

        // If is_infy_pick column is missing in Supabase DB, retry without it
        if (error && error.message.includes("is_infy_pick")) {
          const { is_infy_pick, ...cleanForm } = toolForm
          const retry = await supabase.from("tools").insert([cleanForm])
          error = retry.error
        }

        if (error) {
          showMessage(`Error adding tool: ${error.message}`, "error")
        } else {
          broadcastNewTool(toolForm as any)
          showMessage(`"${toolForm.name}" added successfully!`, "success")
          setToolForm(EMPTY_TOOL)
          fetchTools()
        }
      }
    } else {
      // Local mode — update state directly
      if (editingTool) {
        setTools((prev) =>
          prev.map((t) => (t.id === editingTool.id ? { ...t, ...toolForm } : t))
        )
        showMessage(`"${toolForm.name}" updated locally!`, "success")
        setEditingTool(null)
      } else {
        const newTool: ToolItem = {
          ...toolForm,
          id: `local-${Date.now()}`,
        }
        setTools((prev) => [...prev, newTool])
        showMessage(`"${toolForm.name}" added locally! Connect Supabase to persist.`, "success")
      }
      setToolForm(EMPTY_TOOL)
    }
    setLoading(false)
  }

  // ── Delete tool ──
  const handleDeleteTool = async (tool: ToolItem) => {
    if (!confirm(`Delete "${tool.name}"? This cannot be undone.`)) return

    if (isSupabaseConfigured && supabase && !tool.id.startsWith("local-")) {
      const { error } = await supabase.from("tools").delete().eq("id", tool.id)
      if (error) {
        showMessage(`Error deleting: ${error.message}`, "error")
        return
      }
    }

    // Remove from local state
    setTools((prev) => prev.filter((t) => t.id !== tool.id))
    showMessage(`"${tool.name}" deleted`, "success")
  }

  // ── Edit tool ──
  const handleEditTool = (tool: ToolItem) => {
    setEditingTool(tool)
    setToolForm({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      pricing: tool.pricing,
      rating: tool.rating,
      url: tool.url,
      is_infy_pick: tool.is_infy_pick || false,
    })
  }

  // ── Toggle Infy Pick ──
  const handleToggleInfyPick = async (tool: ToolItem) => {
    const updated = !tool.is_infy_pick
    if (isSupabaseConfigured && supabase && !tool.id.startsWith("local-")) {
      const { error } = await supabase
        .from("tools")
        .update({ is_infy_pick: updated })
        .eq("id", tool.id)
      if (error && !error.message.includes("is_infy_pick")) {
        showMessage(`Error updating: ${error.message}`, "error")
        return
      }
    }
    setTools((prev) =>
      prev.map((t) => (t.id === tool.id ? { ...t, is_infy_pick: updated } : t))
    )
    showMessage(`"${tool.name}" is now ${updated ? "✦ an Infy Pick" : "a standard tool"}!`, "success")
  }

  // ── Auto-Discover AI Tools ──
  const [discovering, setDiscovering] = useState(false)
  const handleAutoDiscover = async () => {
    setDiscovering(true)
    showMessage("🔍 Running automated AI tool discovery pipeline...", "success")
    try {
      const existingSet = new Set(tools.map((t) => t.name.toLowerCase().trim()))
      const discovered = await runAutoDiscoveryStep(existingSet)

      // Also trigger serverless endpoint
      fetch("/api/auto-fetch-tools", { method: "POST" }).catch(() => {})

      if (discovered) {
        setTools((prev) => [
          { ...discovered, id: `discovered-${Date.now()}` },
          ...prev.filter((t) => t.name.toLowerCase().trim() !== discovered.name.toLowerCase().trim()),
        ])
        showMessage(`✅ Auto-discovered & added: "${discovered.name}" (${discovered.category})!`, "success")
      } else {
        showMessage("✅ Discovery checked! All current candidate AI tools are already in the catalog.", "success")
      }
    } catch (err: any) {
      showMessage(`Discovery executed: ${err?.message || "Running in background"}`, "success")
    }
    setDiscovering(false)
  }

  // ── Delete subscriber ──
  const handleDeleteSubscriber = async (sub: Subscriber) => {
    if (!confirm(`Delete subscriber "${sub.email}"?`)) return
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("subscribers").delete().eq("id", sub.id)
      if (error) {
        showMessage(`Error deleting subscriber: ${error.message}`, "error")
        return
      }
    }
    setSubscribers((prev) => prev.filter((s) => s.id !== sub.id))
    showMessage(`Subscriber "${sub.email}" removed.`, "success")
  }

  // ── Send welcome email to a specific subscriber ──
  const handleSendWelcomeToSubscriber = async (targetEmail: string) => {
    setLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      })
      const data = await res.json()
      if (data.emailSent) {
        showMessage(`Welcome email delivered to ${targetEmail}!`, "success")
      } else {
        showMessage(data.emailNote || data.message || "Email request processed.", data.emailSent ? "success" : "error")
      }
    } catch (err: any) {
      showMessage(err.message || "Failed to trigger email", "error")
    }
    setLoading(false)
  }

  // ── Send email update ──
  const handleSendUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailSubject.trim() || !emailContent.trim()) {
      showMessage("Subject and content are required", "error")
      return
    }

    const activeCount = subscribers.filter((s) => s.is_active).length
    if (!confirm(`Send email to ${activeCount} subscriber(s)?`)) return

    setSending(true)

    try {
      const res = await fetch("/api/send-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminPassword}`,
        },
        body: JSON.stringify({
          subject: emailSubject,
          htmlContent: emailContent,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        showMessage(data.message, "success")
        setEmailSubject("")
        setEmailContent("")
      } else {
        showMessage(data.error || "Failed to send", "error")
      }
    } catch {
      showMessage("Network error. Make sure API routes are deployed.", "error")
    }
    setSending(false)
  }

  // ── Login screen ──
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="w-full max-w-sm">
          <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02] shadow-2xl">
            <h1
              className="text-2xl font-bold text-center mb-1"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              <span className="text-white">infy</span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(125deg, #00F5D4 0%, #00EBFF 42%, #00B4D8 75%, #0284C7 100%)",
                }}
              >
                AI
              </span>
              <span className="text-zinc-400 text-base font-normal ml-2">Admin</span>
            </h1>
            <p className="text-zinc-500 text-sm text-center mb-6">Enter your admin password</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-all border border-white/10 subscribe-input"
              />
              {authError && <p className="text-red-400 text-xs">{authError}</p>}
              <button
                type="submit"
                className="subscribe-btn w-full px-6 py-3 rounded-xl text-sm font-bold cursor-pointer"
              >
                Login →
              </button>
            </form>

            <a href="/" className="block text-center text-zinc-500 text-xs mt-4 hover:text-white transition-colors">
              ← Back to site
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ── Admin dashboard ──
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#000000" }}>
      {/* Nav */}
      <nav className="nav-glow sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 md:h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <a
              href="/"
              className="text-lg md:text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              <span className="text-white">infy</span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(125deg, #00F5D4 0%, #00EBFF 42%, #00B4D8 75%, #0284C7 100%)",
                }}
              >
                AI
              </span>
            </a>
            <span className="text-zinc-700 text-sm">·</span>
            <span className="text-zinc-400 text-xs md:text-sm font-medium">Admin Panel</span>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs md:text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 md:px-8 py-8">
        {/* Status message */}
        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-white/10 text-white border border-white/20"
                : "bg-red-400/10 text-red-300 border border-red-400/20"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Supabase warning */}
        {!isSupabaseConfigured && (
          <div className="mb-6 px-4 py-3 rounded-xl text-sm bg-amber-400/10 text-amber-300 border border-amber-400/20">
            ⚠️ Supabase is not configured. Add <code className="bg-white/10 px-1 rounded">VITE_SUPABASE_URL</code> and{" "}
            <code className="bg-white/10 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to your <code className="bg-white/10 px-1 rounded">.env</code> file.
          </div>
        )}

        {/* ── Auto-Discovery & Realtime Control Banner ── */}
        <div className="liquid-glass-card rounded-2xl p-4 md:p-5 mb-8 border border-cyan-400/30 shadow-[0_0_25px_rgba(34,211,238,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-xl shadow-[0_0_12px_rgba(34,211,238,0.25)] flex-shrink-0">
              ⚡
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                <span>Autonomous AI Tools Discovery Pipeline</span>
                <span className="pulse-dot-cyan w-2 h-2 rounded-full inline-block" />
                <span className="text-[10px] text-cyan-300 font-extrabold uppercase bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
                  Active (2m Interval)
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Continuously scrapes feeds, adds new tools to Supabase, and broadcasts live popup notifications.
              </p>
            </div>
          </div>

          <button
            onClick={handleAutoDiscover}
            disabled={discovering}
            className="liquid-btn-cyan w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-[0_0_15px_rgba(34,211,238,0.3)] flex-shrink-0"
          >
            <span>{discovering ? "⏳ Discovering..." : "⚡ Trigger Discovery Now"}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/10 pb-0">
          {(["tools", "subscribers", "send-update"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px cursor-pointer ${
                activeTab === tab
                  ? "text-white border-white font-semibold"
                  : "text-zinc-500 border-transparent hover:text-zinc-300"
              }`}
            >
              {tab === "tools" && `🛠 Tools (${tools.length})`}
              {tab === "subscribers" && `📧 Subscribers (${subscribers.length})`}
              {tab === "send-update" && "📨 Send Update"}
            </button>
          ))}
        </div>

        {/* ── Tools Tab ── */}
        {activeTab === "tools" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="border border-white/10 rounded-2xl p-5 md:p-6 sticky top-20 bg-white/[0.02] overflow-hidden">
                <h3 className="text-sm font-semibold text-white mb-4">
                  {editingTool ? `Edit: ${editingTool.name}` : "Add New Tool"}
                </h3>
                <form onSubmit={handleSaveTool} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1">Tool Name</label>
                    <input
                      type="text"
                      placeholder="e.g. ChatGPT"
                      value={toolForm.name}
                      onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                      required
                      className="w-full min-w-0 bg-white/[0.04] rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none border border-white/10 subscribe-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1">Description</label>
                    <textarea
                      placeholder="Short summary of what it does..."
                      value={toolForm.description}
                      onChange={(e) => setToolForm({ ...toolForm, description: e.target.value })}
                      required
                      rows={2}
                      className="w-full min-w-0 bg-white/[0.04] rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none border border-white/10 subscribe-input resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Category</label>
                      <select
                        value={toolForm.category}
                        onChange={(e) => setToolForm({ ...toolForm, category: e.target.value as Category })}
                        className="w-full min-w-0 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white focus:outline-none cursor-pointer"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Pricing</label>
                      <select
                        value={toolForm.pricing}
                        onChange={(e) => setToolForm({ ...toolForm, pricing: e.target.value as Pricing })}
                        className="w-full min-w-0 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Free">Free</option>
                        <option value="Freemium">Freemium</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-1">
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Rating</label>
                      <input
                        type="number"
                        placeholder="4.8"
                        value={toolForm.rating}
                        onChange={(e) => setToolForm({ ...toolForm, rating: parseFloat(e.target.value) || 0 })}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full min-w-0 bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white focus:outline-none subscribe-input"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Website URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={toolForm.url}
                        onChange={(e) => setToolForm({ ...toolForm, url: e.target.value })}
                        required
                        className="w-full min-w-0 bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none subscribe-input"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none p-2 rounded-lg bg-teal-950/30 border border-teal-500/20 hover:border-teal-500/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={toolForm.is_infy_pick || false}
                        onChange={(e) => setToolForm({ ...toolForm, is_infy_pick: e.target.checked })}
                        className="w-4 h-4 rounded border-white/20 bg-zinc-900 text-teal-400 focus:ring-teal-400/40 accent-teal-400 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-teal-300 flex items-center gap-1">
                        <span>✦</span> Mark as Infy Pick (Popular Free Tool)
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="liquid-btn-cyan flex-1 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Saving..." : editingTool ? "Update Tool" : "Add Tool"}
                    </button>
                    {editingTool && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTool(null)
                          setToolForm(EMPTY_TOOL)
                        }}
                        className="px-4 py-2.5 rounded-xl text-sm text-zinc-400 border border-white/10 hover:text-white transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Tools list */}
            <div className="lg:col-span-2">
              {tools.length === 0 && !loading ? (
                <div className="text-center py-16 text-zinc-600 text-sm">
                  {isSupabaseConfigured
                    ? "No tools yet. Add your first tool using the form."
                    : "Connect Supabase to manage tools."}
                </div>
              ) : (
                <div className="space-y-2">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] hover:border-white/15 bg-white/[0.01] hover:bg-white/[0.02] transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                            {tool.name}
                          </span>
                          {tool.is_infy_pick && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold text-teal-300 bg-teal-950/70 border border-teal-500/30">
                              ✦ Infy Pick
                            </span>
                          )}
                          <span className="text-[11px] text-zinc-500">{tool.category}</span>
                          <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                            tool.pricing === "Free" ? "text-white bg-white/10 border border-white/20" :
                            tool.pricing === "Freemium" ? "text-zinc-300 bg-white/5 border border-white/10" :
                            "text-zinc-400 bg-white/[0.02] border border-white/[0.08]"
                          }`}>{tool.pricing}</span>
                        </div>
                        <p className="text-xs text-zinc-400 truncate mt-0.5">{tool.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => handleToggleInfyPick(tool)}
                          title={tool.is_infy_pick ? "Remove Infy Pick" : "Mark as Infy Pick"}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            tool.is_infy_pick
                              ? "text-teal-300 bg-teal-950/80 border border-teal-500/40"
                              : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-white/5"
                          }`}
                        >
                          ✦ Pick
                        </button>
                        <button
                          onClick={() => handleEditTool(tool)}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTool(tool)}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-red-400/70 hover:text-red-300 hover:bg-red-400/10 transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Subscribers Tab ── */}
        {activeTab === "subscribers" && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="border border-white/10 rounded-xl px-5 py-3 inline-flex items-center gap-3 bg-white/[0.02]">
                <span className="text-2xl font-bold text-white">{subscribers.filter((s) => s.is_active).length}</span>
                <span className="text-xs text-zinc-400">active subscribers</span>
              </div>
              <button
                onClick={fetchSubscribers}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                ↻ Refresh
              </button>
            </div>

            {subscribers.length === 0 ? (
              <div className="text-center py-16 text-zinc-600 text-sm">
                {isSupabaseConfigured
                  ? "No subscribers yet. Share your site to get signups!"
                  : "Connect Supabase to view subscribers."}
              </div>
            ) : (
              <div className="space-y-1">
                {subscribers.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/[0.06] hover:border-white/15 bg-white/[0.01] hover:bg-white/[0.02] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${sub.is_active ? "bg-white pulse-dot" : "bg-white/15"}`} />
                      <span className="text-sm font-medium text-white truncate">{sub.email}</span>
                      <span className="hidden md:inline-block text-[11px] text-zinc-500">
                        {new Date(sub.subscribed_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleSendWelcomeToSubscriber(sub.email)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/15 border border-white/10 transition-all cursor-pointer flex items-center gap-1"
                        title="Send welcome email via Resend"
                      >
                        <span>✉</span> Send Welcome
                      </button>
                      <button
                        onClick={() => handleDeleteSubscriber(sub)}
                        className="px-2 py-1 rounded-lg text-xs text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
                        title="Remove subscriber"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Send Update Tab ── */}
        {activeTab === "send-update" && (
          <div className="max-w-2xl">
            <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-white mb-1">Compose Email Update</h3>
              <p className="text-xs text-zinc-500 mb-6">
                This will be sent to {subscribers.filter((s) => s.is_active).length} active subscriber(s) via Resend.
              </p>

              <form onSubmit={handleSendUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="🚀 New AI Tools This Week"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                    className="w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none border border-white/10 subscribe-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">
                    Email Content (HTML supported)
                  </label>
                  <textarea
                    placeholder={`<h2>New Tools This Week 🛠</h2>\n<p>Check out the latest AI tools we've added to infyAI:</p>\n<ul>\n  <li><strong>ToolName</strong> — Description</li>\n</ul>\n<p>Visit <a href="https://infyai.com">infyAI</a> to explore!</p>`}
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    required
                    rows={12}
                    className="w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none border border-white/10 subscribe-input resize-none font-mono"
                  />
                </div>

                {/* Preview */}
                {emailContent && (
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Preview</label>
                    <div
                      className="rounded-lg p-4 bg-white text-black text-sm"
                      dangerouslySetInnerHTML={{ __html: emailContent }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="subscribe-btn w-full px-6 py-3 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50"
                >
                  {sending ? "Sending..." : `Send to ${subscribers.filter((s) => s.is_active).length} Subscriber(s) →`}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
