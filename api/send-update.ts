import { createClient } from "@supabase/supabase-js"

export const config = {
  runtime: "edge",
}

interface SubscriberRecord {
  email: string
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://eemhvfqldhkcdbsbibgo.supabase.co"
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"

const BREVO_KEY =
  process.env.BREVO_API_KEY ||
  "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"

function isAdmin(req: Request): boolean {
  const auth = req.headers.get("authorization") || ""
  const adminPassword = process.env.VITE_ADMIN_PASSWORD || "admin123"
  return auth === `Bearer ${adminPassword}`
}

export default async function handler(req: Request) {
  // CORS Headers
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  }

  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const { subject, htmlContent } = body || {}

    if (!subject || !htmlContent) {
      return new Response(JSON.stringify({ error: "Subject and content are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { data, error: fetchError } = await supabase
      .from("subscribers")
      .select("email")
      .eq("is_active", true)

    if (fetchError) {
      return new Response(JSON.stringify({ error: fetchError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    const subscribers = (data || []) as SubscriberRecord[]
    if (subscribers.length === 0) {
      return new Response(JSON.stringify({ error: "No active subscribers found" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    let sentCount = 0
    const errors: string[] = []

    for (const sub of subscribers) {
      try {
        const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": BREVO_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            sender: { name: "infyAI", email: "contact.infyai@gmail.com" },
            to: [{ email: sub.email }],
            subject,
            htmlContent,
          }),
        })

        if (brevoRes.ok) {
          sentCount++
        } else {
          const errData = await brevoRes.json().catch(() => ({}))
          errors.push(`${sub.email}: ${errData.message || "Brevo failed"}`)
        }
      } catch (err: any) {
        errors.push(`${sub.email}: ${err.message}`)
      }
    }

    return new Response(
      JSON.stringify({
        message: `Update processed: delivered to ${sentCount} of ${subscribers.length} subscriber(s).`,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    )
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })
  }
}
