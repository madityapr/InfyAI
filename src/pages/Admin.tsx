import { useState, useEffect, useCallback } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
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
      // Still show fallback on error
      const local = fallbackToolsData.map((t, i) => ({
        ...t,
        id: `local-${i}`,
      })) as ToolItem[]
      setTools(local)
    } else {
      setTools(data && data.length > 0 ? data : fallbackToolsData.map((t, i) => ({ ...t, id: `local-${i}` })) as ToolItem[])
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
        const { error } = await supabase
          .from("tools")
          .update(toolForm)
          .eq("id", editingTool.id)
        if (error) {
          showMessage(`Error updating tool: ${error.message}`, "error")
        } else {
          showMessage(`"${toolForm.name}" updated successfully!`, "success")
          setEditingTool(null)
          setToolForm(EMPTY_TOOL)
          fetchTools()
        }
      } else {
        const { error } = await supabase.from("tools").insert([toolForm])
        if (error) {
          showMessage(`Error adding tool: ${error.message}`, "error")
        } else {
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
    })
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
        style={{ backgroundColor: "#030712" }}
      >
        <div className="w-full max-w-sm">
          <div className="glow-border-cyan rounded-2xl p-8" style={{ background: "rgba(6,11,24,0.9)" }}>
            <h1
              className="text-2xl font-bold text-center mb-1 bg-clip-text text-transparent"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                backgroundImage: "linear-gradient(135deg, #22d3ee, #0ea5e9, #6366f1)",
              }}
            >
              infyAI Admin
            </h1>
            <p className="text-white/30 text-sm text-center mb-6">Enter your admin password</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:outline-none transition-all glow-border-blue subscribe-input"
              />
              {authError && <p className="text-red-400 text-xs">{authError}</p>}
              <button
                type="submit"
                className="subscribe-btn w-full px-6 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer"
              >
                Login →
              </button>
            </form>

            <a href="/" className="block text-center text-cyan-400/40 text-xs mt-4 hover:text-cyan-300 transition-colors">
              ← Back to site
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ── Admin dashboard ──
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#030712" }}>
      {/* Nav */}
      <nav className="nav-glow sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm font-bold tracking-tight"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                background: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              infyAI
            </a>
            <span className="text-cyan-400/20 text-xs">·</span>
            <span className="text-cyan-300/30 text-xs">Admin Panel</span>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-white/30 hover:text-cyan-300 transition-colors"
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
                ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"
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
            See <code className="bg-white/10 px-1 rounded">.env.example</code> for details.
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-cyan-400/10 pb-0">
          {(["tools", "subscribers", "send-update"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px cursor-pointer ${
                activeTab === tab
                  ? "text-cyan-300 border-cyan-400"
                  : "text-white/30 border-transparent hover:text-white/60"
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
              <div className="glow-border-blue rounded-2xl p-6 sticky top-20" style={{ background: "rgba(6,11,24,0.8)" }}>
                <h3 className="text-sm font-semibold text-cyan-300 mb-4">
                  {editingTool ? `Edit: ${editingTool.name}` : "Add New Tool"}
                </h3>
                <form onSubmit={handleSaveTool} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tool name"
                    value={toolForm.name}
                    onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                    required
                    className="w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none glow-border-blue subscribe-input"
                  />
                  <textarea
                    placeholder="Short description"
                    value={toolForm.description}
                    onChange={(e) => setToolForm({ ...toolForm, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none glow-border-blue subscribe-input resize-none"
                  />
                  <select
                    value={toolForm.category}
                    onChange={(e) => setToolForm({ ...toolForm, category: e.target.value as Category })}
                    className="w-full bg-[#0a1628] rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none glow-border-blue"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <select
                    value={toolForm.pricing}
                    onChange={(e) => setToolForm({ ...toolForm, pricing: e.target.value as Pricing })}
                    className="w-full bg-[#0a1628] rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none glow-border-blue"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                  </select>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Rating"
                      value={toolForm.rating}
                      onChange={(e) => setToolForm({ ...toolForm, rating: parseFloat(e.target.value) || 0 })}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-24 bg-white/[0.04] rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none glow-border-blue subscribe-input"
                    />
                    <input
                      type="url"
                      placeholder="https://tool-url.com"
                      value={toolForm.url}
                      onChange={(e) => setToolForm({ ...toolForm, url: e.target.value })}
                      required
                      className="flex-1 bg-white/[0.04] rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none glow-border-blue subscribe-input"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="subscribe-btn flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
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
                        className="px-4 py-2.5 rounded-xl text-sm text-white/40 border border-white/10 hover:text-white/70 transition-colors cursor-pointer"
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
                <div className="text-center py-16 text-white/20 text-sm">
                  {isSupabaseConfigured
                    ? "No tools yet. Add your first tool using the form."
                    : "Connect Supabase to manage tools."}
                </div>
              ) : (
                <div className="space-y-2">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-cyan-400/[0.06] hover:border-cyan-400/15 bg-white/[0.01] hover:bg-white/[0.02] transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold text-white/85" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                            {tool.name}
                          </span>
                          <span className="text-[11px] text-cyan-400/40">{tool.category}</span>
                          <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                            tool.pricing === "Free" ? "text-cyan-400 bg-cyan-400/10" :
                            tool.pricing === "Freemium" ? "text-sky-300 bg-sky-300/10" :
                            "text-indigo-300 bg-indigo-300/10"
                          }`}>{tool.pricing}</span>
                        </div>
                        <p className="text-xs text-white/30 truncate mt-0.5">{tool.description}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleEditTool(tool)}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-400/10 transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTool(tool)}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-300 hover:bg-red-400/10 transition-all cursor-pointer"
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
              <div className="glow-border-cyan rounded-xl px-5 py-3 inline-flex items-center gap-3" style={{ background: "rgba(6,11,24,0.8)" }}>
                <span className="text-2xl font-bold text-cyan-400">{subscribers.filter((s) => s.is_active).length}</span>
                <span className="text-xs text-white/30">active subscribers</span>
              </div>
              <button
                onClick={fetchSubscribers}
                className="text-xs text-cyan-400/40 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                ↻ Refresh
              </button>
            </div>

            {subscribers.length === 0 ? (
              <div className="text-center py-16 text-white/20 text-sm">
                {isSupabaseConfigured
                  ? "No subscribers yet. Share your site to get signups!"
                  : "Connect Supabase to view subscribers."}
              </div>
            ) : (
              <div className="space-y-1">
                {subscribers.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-xl border border-cyan-400/[0.06] hover:border-cyan-400/15 bg-white/[0.01] hover:bg-white/[0.02] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${sub.is_active ? "bg-cyan-400 pulse-dot" : "bg-white/15"}`} />
                      <span className="text-sm font-medium text-white/80 truncate">{sub.email}</span>
                      <span className="hidden md:inline-block text-[11px] text-white/25">
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
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-cyan-400/80 hover:text-cyan-200 bg-cyan-400/[0.08] hover:bg-cyan-400/20 border border-cyan-400/20 transition-all cursor-pointer flex items-center gap-1"
                        title="Send welcome email via Resend"
                      >
                        <span>✉</span> Send Welcome
                      </button>
                      <button
                        onClick={() => handleDeleteSubscriber(sub)}
                        className="px-2 py-1 rounded-lg text-xs text-red-400/60 hover:text-red-300 hover:bg-red-400/10 transition-all cursor-pointer"
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
            <div className="glow-border-blue rounded-2xl p-6 md:p-8" style={{ background: "rgba(6,11,24,0.8)" }}>
              <h3 className="text-sm font-semibold text-cyan-300 mb-1">Compose Email Update</h3>
              <p className="text-xs text-white/25 mb-6">
                This will be sent to {subscribers.filter((s) => s.is_active).length} active subscriber(s) via Resend.
              </p>

              <form onSubmit={handleSendUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="🚀 New AI Tools This Week"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                    className="w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none glow-border-blue subscribe-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5">
                    Email Content (HTML supported)
                  </label>
                  <textarea
                    placeholder={`<h2>New Tools This Week 🛠</h2>\n<p>Check out the latest AI tools we've added to infyAI:</p>\n<ul>\n  <li><strong>ToolName</strong> — Description</li>\n</ul>\n<p>Visit <a href="https://infyai.com">infyAI</a> to explore!</p>`}
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    required
                    rows={12}
                    className="w-full bg-white/[0.04] rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none glow-border-blue subscribe-input resize-none font-mono"
                  />
                </div>

                {/* Preview */}
                {emailContent && (
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Preview</label>
                    <div
                      className="rounded-lg p-4 bg-white text-black text-sm"
                      dangerouslySetInnerHTML={{ __html: emailContent }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="subscribe-btn w-full px-6 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
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
