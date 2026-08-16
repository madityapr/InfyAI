import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://eemhvfqldhkcdbsbibgo.supabase.co"
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"

function isAdmin(req: any): boolean {
  const auth =
    req.headers?.authorization ||
    (typeof req.headers?.get === "function" ? req.headers.get("authorization") : null) ||
    ""
  const adminPassword = process.env.VITE_ADMIN_PASSWORD || "admin123"
  return auth === `Bearer ${adminPassword}`
}

export default async function handler(req: any, res?: any) {
  // CORS Headers
  if (res && typeof res.setHeader === "function") {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  }

  if (req.method === "OPTIONS") {
    if (res && typeof res.status === "function") return res.status(200).end()
    return new Response(null, { status: 200 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  // GET: Fetch all tools
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      const resp = { error: error.message }
      if (res && typeof res.status === "function") return res.status(500).json(resp)
      return new Response(JSON.stringify(resp), { status: 500, headers: { "Content-Type": "application/json" } })
    }

    if (res && typeof res.status === "function") return res.status(200).json(data)
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } })
  }

  // Check admin authorization for write operations
  if (!isAdmin(req)) {
    const resp = { error: "Unauthorized" }
    if (res && typeof res.status === "function") return res.status(401).json(resp)
    return new Response(JSON.stringify(resp), { status: 401, headers: { "Content-Type": "application/json" } })
  }

  let body = req.body
  if (typeof body === "string") {
    try {
      body = JSON.parse(body)
    } catch {}
  } else if (!body && typeof req.json === "function") {
    body = await req.json().catch(() => ({}))
  }

  if (req.method === "POST") {
    const { name, description, category, pricing, rating, url, is_infy_pick } = body || {}
    let insertObj: any = { name, description, category, pricing, rating, url }
    if (is_infy_pick !== undefined) insertObj.is_infy_pick = Boolean(is_infy_pick)

    let { data, error } = await supabase.from("tools").insert([insertObj]).select().single()

    if (error && error.message.includes("is_infy_pick")) {
      delete insertObj.is_infy_pick
      const retry = await supabase.from("tools").insert([insertObj]).select().single()
      data = retry.data
      error = retry.error
    }

    if (error) {
      const resp = { error: error.message }
      if (res && typeof res.status === "function") return res.status(500).json(resp)
      return new Response(JSON.stringify(resp), { status: 500, headers: { "Content-Type": "application/json" } })
    }

    if (res && typeof res.status === "function") return res.status(201).json(data)
    return new Response(JSON.stringify(data), { status: 201, headers: { "Content-Type": "application/json" } })
  }

  if (req.method === "PUT") {
    const { id, name, description, category, pricing, rating, url, is_infy_pick } = body || {}
    let updateObj: any = { name, description, category, pricing, rating, url }
    if (is_infy_pick !== undefined) updateObj.is_infy_pick = Boolean(is_infy_pick)

    let { data, error } = await supabase.from("tools").update(updateObj).eq("id", id).select().single()

    if (error && error.message.includes("is_infy_pick")) {
      delete updateObj.is_infy_pick
      const retry = await supabase.from("tools").update(updateObj).eq("id", id).select().single()
      data = retry.data
      error = retry.error
    }

    if (error) {
      const resp = { error: error.message }
      if (res && typeof res.status === "function") return res.status(500).json(resp)
      return new Response(JSON.stringify(resp), { status: 500, headers: { "Content-Type": "application/json" } })
    }

    if (res && typeof res.status === "function") return res.status(200).json(data)
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } })
  }

  if (req.method === "DELETE") {
    const { id } = body || {}
    const { error } = await supabase.from("tools").delete().eq("id", id)

    if (error) {
      const resp = { error: error.message }
      if (res && typeof res.status === "function") return res.status(500).json(resp)
      return new Response(JSON.stringify(resp), { status: 500, headers: { "Content-Type": "application/json" } })
    }

    const resp = { success: true }
    if (res && typeof res.status === "function") return res.status(200).json(resp)
    return new Response(JSON.stringify(resp), { status: 200, headers: { "Content-Type": "application/json" } })
  }

  const notAllowed = { error: "Method not allowed" }
  if (res && typeof res.status === "function") return res.status(405).json(notAllowed)
  return new Response(JSON.stringify(notAllowed), { status: 405, headers: { "Content-Type": "application/json" } })
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
