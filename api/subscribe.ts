import { createClient } from "@supabase/supabase-js"

export const config = {
  runtime: "edge",
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://eemhvfqldhkcdbsbibgo.supabase.co"
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"

const BREVO_KEY =
  process.env.BREVO_API_KEY ||
  "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"

function generateEmailHtml(subscriberEmail: string, originUrl?: string): string {
  const domain = originUrl || "https://infy-ai.vercel.app"
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to infyAI</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0a0a0a; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8); overflow: hidden;">
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #06b6d4, #ffffff, #06b6d4);"></td>
          </tr>
          <tr>
            <td align="center" style="padding: 40px 32px 16px; text-align: center;">
              <div style="display: inline-block; padding: 6px 16px; border-radius: 999px; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); margin-bottom: 16px;">
                <span style="font-size: 12px; font-weight: 700; color: #67e8f9; letter-spacing: 1px; text-transform: uppercase;">✦ Curated AI Directory</span>
              </div>
              <h1 style="margin: 0 0 10px; font-size: 42px; font-weight: 900; letter-spacing: -1.5px; color: #ffffff;">
                infyAI
              </h1>
              <p style="margin: 0; font-size: 13px; color: #a1a1aa; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;">
                Free AI Tools, Curated for Builders
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 36px;">
              <h2 style="margin: 0 0 14px; font-size: 22px; font-weight: 800; color: #ffffff;">
                You're in! Welcome aboard 🚀
              </h2>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #d4d4d8;">
                Hey there! Thanks for subscribing to <strong style="color: #ffffff;">infyAI</strong>. You've unlocked direct access to 335+ hand-picked free AI tools.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; margin: 20px 0;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 10px; font-size: 12px; font-weight: 700; color: #67e8f9; text-transform: uppercase; letter-spacing: 1px;">
                      ✦ What you'll receive from us:
                    </p>
                    <p style="margin: 4px 0; font-size: 14px; color: #e4e4e7;">✓ <strong>Weekly Hand-Picked AI Drops:</strong> Top new tools worth trying.</p>
                    <p style="margin: 4px 0; font-size: 14px; color: #e4e4e7;">✓ <strong>100% Free Access:</strong> Browse categorized tools with zero paywalls.</p>
                    <p style="margin: 4px 0; font-size: 14px; color: #e4e4e7;">✓ <strong>✦ Infy Picks Badges:</strong> Curated top performers across 15+ categories.</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0 20px;">
                    <a href="${domain}" style="display: inline-block; padding: 14px 36px; background: #ffffff; color: #000000; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(255, 255, 255, 0.25);">
                      Explore 335+ AI Tools →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 36px 30px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; font-size: 12px; color: #71717a;">
              Sent to <strong>${subscriberEmail}</strong> · © ${new Date().getFullYear()} infyAI. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export default async function handler(req: Request) {
  // Handle CORS preflight
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

  try {
    const body = await req.json().catch(() => ({}))
    const email = (body?.email || "").trim().toLowerCase()

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Please provide a valid email address." }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    // 1. Supabase subscription
    let isNewSubscriber = true
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
      const { error } = await supabase.from("subscribers").insert([{ email, is_active: true }])
      if (error && error.code === "23505") {
        isNewSubscriber = false
      }
    } catch (e: any) {
      console.warn("Supabase insert warning:", e?.message)
    }

    // 2. Brevo Email Dispatch
    let emailStatus = { sent: false, note: "" }
    try {
      const origin = req.headers.get("origin") || "https://infy-ai.vercel.app"
      const htmlContent = generateEmailHtml(email, origin)

      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: "infyAI", email: "contact.infyai@gmail.com" },
          to: [{ email }],
          subject: "Welcome to infyAI! 🚀 Your curated AI toolkit",
          htmlContent,
        }),
      })

      const brevoData = await brevoRes.json().catch(() => ({}))
      if (brevoRes.ok) {
        emailStatus = { sent: true, note: "Welcome email delivered via Brevo!" }
      } else {
        console.warn("Brevo API warning:", brevoData)
        emailStatus = { sent: false, note: brevoData.message || "Brevo delivery failed" }
      }
    } catch (err: any) {
      console.error("Email dispatch error:", err)
      emailStatus = { sent: false, note: err.message || "Failed to dispatch email" }
    }

    const message = isNewSubscriber
      ? emailStatus.sent
        ? "🎉 Subscribed successfully! A welcome email has been sent to your inbox."
        : "🎉 Subscribed successfully! (Saved to database)"
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
