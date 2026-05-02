import nodemailer from 'nodemailer'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'http://localhost:3000'
const APP_NAME = 'Tottho'
const FROM = process.env.EMAIL_FROM || `"${APP_NAME}" <noreply@tottho.pro.bd>`

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

function baseTemplate(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${APP_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#0f1117;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1117;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#161b26;border-radius:16px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-flex;align-items:center;gap:10px;">
                      <div style="width:36px;height:36px;background:#2545ed;border-radius:10px;display:flex;align-items:center;justify-content:center;">
                        <span style="color:#fff;font-size:18px;font-weight:700;line-height:36px;display:block;text-align:center;">L</span>
                      </div>
                      <span style="font-size:18px;font-weight:700;color:#f9fafb;vertical-align:middle;">${APP_NAME}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:12px;color:#4b5563;text-align:center;">
                You received this email because you signed up for ${APP_NAME}.<br/>
                <a href="${APP_URL}" style="color:#6b7280;text-decoration:underline;">${APP_URL.replace('https://', '')}</a>
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

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${token}`
  const transporter = createTransport()

  const html = baseTemplate(`
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#f9fafb;">Verify your email</h1>
    <p style="margin:0 0 28px;font-size:15px;color:#9ca3af;line-height:1.6;">
      Click the button below to confirm your email address and activate your account.
      This link expires in <strong style="color:#e5e7eb;">72 hours</strong>.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr>
        <td style="border-radius:10px;background:#2545ed;">
          <a href="${verifyUrl}"
             style="display:block;padding:14px 32px;font-size:15px;font-weight:600;color:#fff;text-decoration:none;border-radius:10px;">
            Verify Email Address
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">Or copy this link into your browser:</p>
    <p style="margin:0;font-size:12px;color:#4b5563;word-break:break-all;background:#0f1117;padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
      ${verifyUrl}
    </p>
  `)

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: `Verify your ${APP_NAME} account`,
    html,
  })
}

export async function sendWelcomeEmail(email: string, username: string) {
  const dashboardUrl = `${APP_URL}/dashboard`
  const transporter = createTransport()

  const html = baseTemplate(`
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#f9fafb;">Welcome to ${APP_NAME}! 🎉</h1>
    <p style="margin:0 0 8px;font-size:15px;color:#9ca3af;line-height:1.6;">
      Hey <strong style="color:#e5e7eb;">@${username}</strong>, your account is now verified.
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#9ca3af;line-height:1.6;">
      Your public page is live at
      <a href="${APP_URL}/${username}" style="color:#60a5fa;">${APP_URL.replace('https://', '')}/${username}</a>.
      Head to your dashboard to add links and customize your theme.
    </p>
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-radius:10px;background:#2545ed;">
          <a href="${dashboardUrl}"
             style="display:block;padding:14px 32px;font-size:15px;font-weight:600;color:#fff;text-decoration:none;border-radius:10px;">
            Go to Dashboard
          </a>
        </td>
      </tr>
    </table>
  `)

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: `Welcome to ${APP_NAME}, @${username}!`,
    html,
  })
}
