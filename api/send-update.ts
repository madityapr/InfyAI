import { createClient } from "@supabase/supabase-js"
import { sendEmail } from "./_email"

interface SubscriberRecord {
  email: string
}

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
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  }

  if (req.method === "OPTIONS") {
    if (res && typeof res.status === "function") return res.status(200).end()
    return new Response(null, { status: 200 })
  }

  if (!isAdmin(req)) {
    const resp = { error: "Unauthorized" }
    if (res && typeof res.status === "function") return res.status(401).json(resp)
    return new Response(JSON.stringify(resp), { status: 401, headers: { "Content-Type": "application/json" } })
  }

  try {
    let body = req.body
    if (typeof body === "string") {
      try {
        body = JSON.parse(body)
      } catch {}
    } else if (!body && typeof req.json === "function") {
      body = await req.json().catch(() => ({}))
    }

    const { subject, htmlContent } = body || {}

    if (!subject || !htmlContent) {
      const resp = { error: "Subject and content are required" }
      if (res && typeof res.status === "function") return res.status(400).json(resp)
      return new Response(JSON.stringify(resp), { status: 400, headers: { "Content-Type": "application/json" } })
    }

    // Fetch all active subscribers
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { data, error: fetchError } = await supabase
      .from("subscribers")
      .select("email")
      .eq("is_active", true)

    if (fetchError) {
      const resp = { error: fetchError.message }
      if (res && typeof res.status === "function") return res.status(500).json(resp)
      return new Response(JSON.stringify(resp), { status: 500, headers: { "Content-Type": "application/json" } })
    }

    const subscribers = (data || []) as SubscriberRecord[]

    if (subscribers.length === 0) {
      const resp = { error: "No active subscribers found" }
      if (res && typeof res.status === "function") return res.status(400).json(resp)
      return new Response(JSON.stringify(resp), { status: 400, headers: { "Content-Type": "application/json" } })
    }

    const emails: string[] = []
    for (let i = 0; i < subscribers.length; i++) {
      const record = subscribers[i]
      if (record && record.email) {
        emails.push(record.email)
      }
    }

    let sentCount = 0
    const errors: string[] = []

    for (const email of emails) {
      try {
        const sendRes = await sendEmail({
          to: email,
          subject,
          html: htmlContent,
        })

        if (sendRes.success) {
          sentCount++
        } else {
          errors.push(`${email}: ${sendRes.error || "Failed"}`)
        }
      } catch (err: any) {
        errors.push(`${email}: ${err.message}`)
      }
    }

    const result = {
      message: `Update processed: delivered to ${sentCount} of ${emails.length} subscriber(s).`,
      errors: errors.length > 0 ? errors : undefined,
    }

    if (res && typeof res.status === "function") return res.status(200).json(result)
    return new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } })
  } catch (err: any) {
    const resp = { error: err.message || "Internal server error" }
    if (res && typeof res.status === "function") return res.status(500).json(resp)
    return new Response(JSON.stringify(resp), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}

export { handler as POST }
