import { createClient } from "@supabase/supabase-js"
import { generateWelcomeEmailHtml } from "./_welcomeEmail"
import { sendEmail } from "./_email"

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://eemhvfqldhkcdbsbibgo.supabase.co"
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"

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

  try {
    let body = req.body
    if (typeof body === "string") {
      try {
        body = JSON.parse(body)
      } catch {}
    } else if (!body && typeof req.json === "function") {
      body = await req.json().catch(() => ({}))
    }

    const email = (body?.email || "").trim().toLowerCase()

    if (!email || !email.includes("@")) {
      const resp = { error: "Please provide a valid email address." }
      if (res && typeof res.status === "function") return res.status(400).json(resp)
      return new Response(JSON.stringify(resp), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 1. Insert into Supabase if configured
    let isNewSubscriber = true
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email, is_active: true }])

      if (error && error.code === "23505") {
        isNewSubscriber = false
      }
    } catch (e: any) {
      console.warn("Supabase subscriber error:", e?.message)
    }

    // 2. Send Welcome Email via Brevo / Resend
    let emailStatus = { sent: false, note: "" }
    try {
      const origin =
        req.headers?.origin ||
        (typeof req.headers?.get === "function" ? req.headers.get("origin") : null) ||
        "https://infyai.com"
      const emailHtml = generateWelcomeEmailHtml(email, origin)
      const sendResult = await sendEmail({
        to: email,
        subject: "Welcome to infyAI! 🚀 Your curated AI toolkit",
        html: emailHtml,
      })

      if (sendResult.success) {
        emailStatus = {
          sent: true,
          note: `Welcome email delivered via ${sendResult.provider || "Brevo"}!`,
        }
      } else {
        emailStatus = {
          sent: false,
          note: sendResult.error || "Email not sent.",
        }
      }
    } catch (err: any) {
      console.error("Welcome email error:", err)
      emailStatus = { sent: false, note: err.message || "Failed to dispatch email" }
    }

    const message = isNewSubscriber
      ? emailStatus.sent
        ? "🎉 Subscribed successfully! A welcome email has been sent to your inbox."
        : "🎉 Subscribed successfully! (Saved to database)"
      : "You are already subscribed to infyAI!"

    const result = {
      success: true,
      message,
      emailSent: emailStatus.sent,
      emailNote: emailStatus.note,
    }

    if (res && typeof res.status === "function") return res.status(200).json(result)
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    console.error("Subscribe handler error:", err)
    const errorResp = { error: err.message || "Internal server error" }
    if (res && typeof res.status === "function") return res.status(500).json(errorResp)
    return new Response(JSON.stringify(errorResp), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export { handler as POST, handler as GET }
