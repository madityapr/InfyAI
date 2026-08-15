export function generateWelcomeEmailHtml(subscriberEmail: string, originUrl?: string): string {
  const domain = originUrl || "https://infyai.com"
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to infyAI</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #030712; padding: 40px 12px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #060d1d; border-radius: 20px; border: 1px solid rgba(34, 211, 238, 0.2); box-shadow: 0 10px 40px rgba(14, 165, 233, 0.15); overflow: hidden;">
          
          <!-- Top Accent Glow Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #0ea5e9, #22d3ee, #6366f1, #0ea5e9);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding: 44px 32px 20px; text-align: center;">
              <!-- Logo text with glowing gradient effect -->
              <div style="display: inline-block; padding: 6px 16px; border-radius: 999px; background: rgba(34, 211, 238, 0.08); border: 1px solid rgba(34, 211, 238, 0.25); margin-bottom: 16px;">
                <span style="font-size: 13px; font-weight: 700; color: #22d3ee; letter-spacing: 1px; text-transform: uppercase;">✦ Curated AI Hub</span>
              </div>
              <h1 style="margin: 0 0 10px; font-size: 46px; font-weight: 900; letter-spacing: -1.5px; color: #ffffff; line-height: 1.1;">
                infy<span style="color: #22d3ee;">AI</span>
              </h1>
              <p style="margin: 0; font-size: 14px; color: #94a3b8; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;">
                Free AI Tools, Curated for Builders
              </p>
            </td>
          </tr>

          <!-- Infinity Symbol Visual -->
          <tr>
            <td align="center" style="padding: 0 32px 20px;">
              <div style="font-size: 56px; line-height: 1; color: #0ea5e9; text-shadow: 0 0 30px rgba(34,211,238,0.5);">
                ∞
              </div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(34,211,238,0.25), transparent);"></div>
            </td>
          </tr>

          <!-- Welcome Main Content -->
          <tr>
            <td style="padding: 32px 36px 20px;">
              <h2 style="margin: 0 0 14px; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                You're in! Welcome aboard 🚀
              </h2>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
                Hey there! Thanks for subscribing to <strong style="color: #22d3ee;">infyAI</strong>. You've just unlocked direct access to the fastest-growing curated directory of AI tools.
              </p>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
                Whether you're building products, writing code, generating media, or automating workflows, we test and add the highest-rated AI tools every week so you don't have to search.
              </p>

              <!-- Feature Highlights Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(14, 165, 233, 0.05); border: 1px solid rgba(34, 211, 238, 0.15); border-radius: 14px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 22px 24px;">
                    <p style="margin: 0 0 14px; font-size: 13px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px;">
                      ✦ What you'll receive from us:
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #e2e8f0;">
                          <span style="color: #22d3ee; font-weight: bold; margin-right: 8px;">✓</span> <strong>Weekly Hand-Picked AI Drops:</strong> The top 5 new tools worth trying.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #e2e8f0;">
                          <span style="color: #22d3ee; font-weight: bold; margin-right: 8px;">✓</span> <strong>100% Free Access:</strong> Browse categorised and rated tools with zero paywalls.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #e2e8f0;">
                          <span style="color: #22d3ee; font-weight: bold; margin-right: 8px;">✓</span> <strong>Direct Links & Pricing Badges:</strong> Free, Freemium, and Paid tags for quick picks.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #e2e8f0;">
                          <span style="color: #22d3ee; font-weight: bold; margin-right: 8px;">✓</span> <strong>No Spam, Ever:</strong> Only signal, curated specifically for builders.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="${domain}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #0ea5e9 0%, #22d3ee 50%, #6366f1 100%); color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(34, 211, 238, 0.35); letter-spacing: 0.3px;">
                      Explore AI Directory Now →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Stats Grid -->
          <tr>
            <td style="padding: 16px 36px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid rgba(34, 211, 238, 0.12); padding-top: 20px;">
                <tr>
                  <td align="center" width="25%">
                    <p style="margin: 0; font-size: 22px; font-weight: 800; color: #22d3ee;">29+</p>
                    <p style="margin: 3px 0 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Tools</p>
                  </td>
                  <td align="center" width="25%">
                    <p style="margin: 0; font-size: 22px; font-weight: 800; color: #22d3ee;">9+</p>
                    <p style="margin: 3px 0 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Categories</p>
                  </td>
                  <td align="center" width="25%">
                    <p style="margin: 0; font-size: 22px; font-weight: 800; color: #22d3ee;">Weekly</p>
                    <p style="margin: 3px 0 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Updates</p>
                  </td>
                  <td align="center" width="25%">
                    <p style="margin: 0; font-size: 22px; font-weight: 800; color: #22d3ee;">Free</p>
                    <p style="margin: 3px 0 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Forever</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px 36px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(3, 7, 18, 0.4); text-align: center;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #64748b;">
                Sent with 💙 to <strong>${subscriberEmail}</strong>
              </p>
              <p style="margin: 0 0 10px; font-size: 12px; color: #475569;">
                © ${new Date().getFullYear()} infyAI. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 11px; color: #334155;">
                You received this because you subscribed to updates at <a href="${domain}" style="color: #0ea5e9; text-decoration: none;">infyAI</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
