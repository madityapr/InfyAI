import { createClient } from "@supabase/supabase-js"
import { generateWelcomeEmailHtml } from "./_welcomeEmail"
import { sendEmail } from "./_email"

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eemhvfqldhkcdbsbibgo.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const email = (body.email || "").trim().toLowerCase()

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Please provide a valid email address." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 1. Insert into Supabase if configured
    let isNewSubscriber = true
    if (supabase) {
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email, is_active: true }])

      if (error) {
        if (error.code === "23505") {
          // Already exists in table
          isNewSubscriber = false
        } else {
          console.warn("Supabase insert warning:", error.message)
        }
      }
    }

    // 2. Send Welcome Email via Brevo / Resend
    let emailStatus = { sent: false, note: "" }
    try {
      const emailHtml = generateWelcomeEmailHtml(email, req.headers.get("origin") || undefined)
      const sendResult = await sendEmail({
        to: email,
        subject: "Welcome to infyAI! 🚀 Your curated AI toolkit",
        html: emailHtml,
      })

      if (sendResult.success) {
        emailStatus = {
          sent: true,
          note: `Welcome email delivered via ${sendResult.provider || "email service"}!`,
        }
      } else {
        emailStatus = {
          sent: false,
          note: sendResult.error || "Email not sent (configure BREVO_API_KEY).",
        }
      }
    } catch (err: any) {
      console.error("Welcome email error:", err)
      emailStatus = { sent: false, note: err.message || "Failed to dispatch email" }
    }

    const message = isNewSubscriber
      ? (emailStatus.sent 
          ? "🎉 Subscribed successfully! A welcome email has been sent to your inbox." 
          : "🎉 Subscribed successfully! (Saved to database)")
      : "You are already subscribed to infyAI!"

    return new Response(
      JSON.stringify({
        success: true,
        message,
        emailSent: emailStatus.sent,
        emailNote: emailStatus.note,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (err: any) {
    console.error("Subscribe handler error:", err)
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
