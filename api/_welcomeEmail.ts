export function generateWelcomeEmailHtml(subscriberEmail: string, originUrl?: string): string {
  const domain = originUrl || "https://infyai.com"
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to infyAI</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 12px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0a0a0a; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8); overflow: hidden;">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #52525b, #ffffff, #52525b);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding: 44px 32px 20px; text-align: center;">
              <div style="display: inline-block; padding: 6px 16px; border-radius: 999px; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.15); margin-bottom: 16px;">
                <span style="font-size: 12px; font-weight: 700; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">✦ Curated AI Hub</span>
              </div>
              <h1 style="margin: 0 0 10px; font-size: 46px; font-weight: 900; letter-spacing: -1.5px; color: #ffffff; line-height: 1.1;">
                infyAI
              </h1>
              <p style="margin: 0; font-size: 13px; color: #a1a1aa; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;">
                Free AI Tools, Curated for Builders
              </p>
            </td>
          </tr>

          <!-- Infinity Symbol Visual -->
          <tr>
            <td align="center" style="padding: 0 32px 20px;">
              <div style="font-size: 56px; line-height: 1; color: #ffffff; text-shadow: 0 0 20px rgba(255,255,255,0.4);">
                ∞
              </div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);"></div>
            </td>
          </tr>

          <!-- Welcome Main Content -->
          <tr>
            <td style="padding: 32px 36px 20px;">
              <h2 style="margin: 0 0 14px; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                You're in! Welcome aboard 🚀
              </h2>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #d4d4d8;">
                Hey there! Thanks for subscribing to <strong style="color: #ffffff;">infyAI</strong>. You've just unlocked direct access to the fastest-growing curated directory of AI tools.
              </p>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #d4d4d8;">
                Whether you're building products, writing code, generating media, or automating workflows, we test and add the highest-rated AI tools every week so you don't have to search.
              </p>

              <!-- Feature Highlights Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 22px 24px;">
                    <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">
                      ✦ What you'll receive from us:
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;">
                          <span style="color: #ffffff; font-weight: bold; margin-right: 8px;">✓</span> <strong>Weekly Hand-Picked AI Drops:</strong> The top new tools worth trying.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;">
                          <span style="color: #ffffff; font-weight: bold; margin-right: 8px;">✓</span> <strong>100% Free Access:</strong> Browse categorized tools with zero paywalls.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;">
                          <span style="color: #ffffff; font-weight: bold; margin-right: 8px;">✓</span> <strong>Direct Links & Badges:</strong> Free, Freemium, and Paid tags for quick picks.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;">
                          <span style="color: #ffffff; font-weight: bold; margin-right: 8px;">✓</span> <strong>No Spam, Ever:</strong> Only signal, curated specifically for builders.
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
                    <a href="${domain}" style="display: inline-block; padding: 15px 40px; background: #ffffff; color: #000000; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(255, 255, 255, 0.25); letter-spacing: 0.3px;">
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
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px;">
                <tr>
                  <td align="center" width="25%">
                    <p style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">335+</p>
                    <p style="margin: 3px 0 0; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Tools</p>
                  </td>
                  <td align="center" width="25%">
                    <p style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">15+</p>
                    <p style="margin: 3px 0 0; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Categories</p>
                  </td>
                  <td align="center" width="25%">
                    <p style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">Weekly</p>
                    <p style="margin: 3px 0 0; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Updates</p>
                  </td>
                  <td align="center" width="25%">
                    <p style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">Free</p>
                    <p style="margin: 3px 0 0; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Forever</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px 36px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0, 0, 0, 0.4); text-align: center;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #71717a;">
                Sent to <strong>${subscriberEmail}</strong>
              </p>
              <p style="margin: 0 0 10px; font-size: 12px; color: #52525b;">
                © ${new Date().getFullYear()} infyAI. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 11px; color: #3f3f46;">
                You received this because you subscribed to updates at <a href="${domain}" style="color: #ffffff; text-decoration: underline;">infyAI</a>.
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
