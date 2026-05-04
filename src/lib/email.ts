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
<body style="margin:0;padding:0;background:#030712;font-family:'Inter',system-ui,sans-serif;color:#f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#030712;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#111827;border-radius:24px;border:1px solid rgba(255,255,255,0.05);overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);">
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 0;text-align:center;">
              <img src="${APP_URL}/logo.png" alt="${APP_NAME}" width="64" height="64" style="display:block;margin:0 auto;border-radius:16px;" />
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;background:#0b0f19;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:13px;color:#6b7280;text-align:center;line-height:1.6;">
                Sent with ❤️ by <strong style="color:#9ca3af;">${APP_NAME}</strong><br/>
                <a href="${APP_URL}" style="color:#FF5240;text-decoration:none;">${APP_URL.replace('https://', '')}</a>
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
    <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;color:#ffffff;text-align:center;letter-spacing:-0.5px;">Verify your email</h1>
    <p style="margin:0 0 32px;font-size:16px;color:#9ca3af;line-height:1.6;text-align:center;">
      You're almost there! Click the button below to activate your account and start building your bio link.
    </p>
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 32px;">
      <tr>
        <td align="center">
          <a href="${verifyUrl}"
             style="display:inline-block;padding:16px 36px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;background:#FF5240;border-radius:12px;box-shadow:0 4px 14px 0 rgba(255,82,64,0.39);">
            Verify Email Address
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;text-align:center;">Or copy and paste this link:</p>
    <p style="margin:0;font-size:13px;color:#9ca3af;word-break:break-all;background:#030712;padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);text-align:center;">
      <a href="${verifyUrl}" style="color:#60a5fa;text-decoration:none;">${verifyUrl}</a>
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
    <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;color:#ffffff;text-align:center;letter-spacing:-0.5px;">Welcome to ${APP_NAME}! 🎉</h1>
    <p style="margin:0 0 16px;font-size:16px;color:#9ca3af;line-height:1.6;text-align:center;">
      Hey <strong style="color:#ffffff;">@${username}</strong>, your account is verified and ready to go.
    </p>
    <p style="margin:0 0 32px;font-size:16px;color:#9ca3af;line-height:1.6;text-align:center;">
      Your public page is officially live at<br/>
      <a href="${APP_URL}/${username}" style="color:#FF5240;text-decoration:none;font-weight:600;">${APP_URL.replace('https://', '')}/${username}</a>
    </p>
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <a href="${dashboardUrl}"
             style="display:inline-block;padding:16px 36px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;background:#FF5240;border-radius:12px;box-shadow:0 4px 14px 0 rgba(255,82,64,0.39);">
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
