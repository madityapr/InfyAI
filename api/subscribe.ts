import { createClient } from "@supabase/supabase-js"
import { generateWelcomeEmailHtml } from "../src/lib/welcomeEmail"

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ""
const resendApiKey = process.env.RESEND_API_KEY || ""

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export async function POST(req: Request) {
  try {
    const body = await req.json()
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
          console.error("Supabase insert error:", error)
          // If error is not duplicate, return error
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        }
      }
    }

    // 2. Send Welcome Email via Resend
    let emailStatus = { sent: false, note: "" }
    if (resendApiKey) {
      try {
        const emailHtml = generateWelcomeEmailHtml(email, req.headers.get("origin") || undefined)
        
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "infyAI <updates@infyai.com>",
            to: [email],
            subject: "Welcome to infyAI! 🚀 Your curated AI toolkit",
            html: emailHtml,
          }),
        })

        const resData = await res.json()
        if (res.ok) {
          emailStatus = { sent: true, note: "Welcome email delivered to your inbox!" }
        } else {
          console.warn("Resend email response:", resData)
          emailStatus = { 
            sent: false, 
            note: resData.message || "Email could not be delivered (check domain configuration in Resend)." 
          }
        }
      } catch (err: any) {
        console.error("Resend fetch error:", err)
        emailStatus = { sent: false, note: err.message || "Failed to send email" }
      }
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
    console.error("Handler error:", err)
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
