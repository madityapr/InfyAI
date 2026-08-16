import { createClient } from "@supabase/supabase-js"

interface SubscriberRecord {
  email: string
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eemhvfqldhkcdbsbibgo.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"
const resendApiKey = process.env.RESEND_API_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

function isAdmin(req: Request): boolean {
  const auth = req.headers.get("authorization")
  const adminPassword = process.env.VITE_ADMIN_PASSWORD || "admin123"
  return auth === `Bearer ${adminPassword}`
}

export async function POST(req: Request) {
  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const body = await req.json()
  const { subject, htmlContent } = body

  if (!subject || !htmlContent) {
    return new Response(
      JSON.stringify({ error: "Subject and content are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  // Fetch all active subscribers
  const { data, error: fetchError } = await supabase
    .from("subscribers")
    .select("email")
    .eq("is_active", true)

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  const subscribers = (data || []) as SubscriberRecord[]

  if (subscribers.length === 0) {
    return new Response(
      JSON.stringify({ error: "No active subscribers found" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  if (!resendApiKey) {
    return new Response(
      JSON.stringify({ error: "Resend API key is missing. Add RESEND_API_KEY to environment." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
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
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "infyAI <updates@infyai.com>",
          to: [email],
          subject,
          html: htmlContent,
        }),
      })

      const resData = await res.json()
      if (res.ok) {
        sentCount++
      } else {
        errors.push(`${email}: ${resData.message || "Failed"}`)
      }
    } catch (err: any) {
      errors.push(`${email}: ${err.message}`)
    }
  }

  return new Response(
    JSON.stringify({
      message: `Update processed: sent to ${sentCount} of ${emails.length} subscriber(s).`,
      errors: errors.length > 0 ? errors : undefined,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  )
}
