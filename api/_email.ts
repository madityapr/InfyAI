/**
 * Unified Email Dispatcher for infyAI
 * Supports Brevo (300 emails/day free) and Resend (100 emails/day free)
 */

interface SendEmailParams {
  to: string
  subject: string
  html: string
  senderName?: string
  senderEmail?: string
}

export interface SendEmailResult {
  success: boolean
  provider?: "brevo" | "resend"
  messageId?: string
  error?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  senderName = "infyAI",
  senderEmail = process.env.SENDER_EMAIL || process.env.RESEND_FROM_EMAIL || "contact.infyai@gmail.com",
}: SendEmailParams): Promise<SendEmailResult> {
  const brevoKey = process.env.BREVO_API_KEY || ""
  const resendKey = process.env.RESEND_API_KEY || ""

  // Clean sender email format
  let cleanEmail = senderEmail.trim()
  if (cleanEmail.includes("<") && cleanEmail.includes(">")) {
    const match = cleanEmail.match(/<([^>]+)>/)
    if (match) cleanEmail = match[1]
  }

  // 1. Try Brevo (Primary - 300 free emails/day)
  if (brevoKey) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: senderName, email: cleanEmail },
          to: [{ email: to.trim().toLowerCase() }],
          subject,
          htmlContent: html,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        return { success: true, provider: "brevo", messageId: data.messageId }
      } else {
        console.warn("Brevo API error:", data)
        return { success: false, provider: "brevo", error: data.message || "Brevo delivery failed" }
      }
    } catch (err: any) {
      console.error("Brevo fetch error:", err)
      return { success: false, provider: "brevo", error: err.message }
    }
  }

  // 2. Fallback to Resend (100 free emails/day)
  if (resendKey) {
    try {
      const fromField = `${senderName} <${cleanEmail}>`
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromField,
          to: [to.trim().toLowerCase()],
          subject,
          html,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        return { success: true, provider: "resend", messageId: data.id }
      } else {
        return { success: false, provider: "resend", error: data.message || "Resend delivery failed" }
      }
    } catch (err: any) {
      return { success: false, provider: "resend", error: err.message }
    }
  }

  return {
    success: false,
    error: "No email provider configured. Please add BREVO_API_KEY to your environment variables.",
  }
}
