interface AxeResult {
  axe: string
  score: number
  niveau: string
  restitution: string
  sousDimensions?: Record<string, number>
}

interface DiagnosticBody {
  email?: string
  axes?: AxeResult[]
  forceAxe?: string
  levierAxe?: string
  profilMessage?: string
}

function buildEmailHtml(data: Omit<DiagnosticBody, 'email'>): string {
  const { axes = [], forceAxe, levierAxe, profilMessage } = data

  const axeRows = axes
    .map(({ axe, score, niveau, restitution, sousDimensions }) => {
      const barFill = Math.round(score)
      return `
      <tr>
        <td style="padding:0 0 28px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <p style="margin:0 0 4px 0;font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#152034;">${axe}</p>
              </td>
              <td align="right">
                <span style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#1ABAEA;">${score}</span>
                <span style="font-family:Arial,sans-serif;font-size:13px;color:#67768E;">/100</span>
                &nbsp;
                <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#11397C;background:#E8F0FB;padding:3px 10px;border-radius:20px;">${niveau}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:8px 0 10px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E0E4E8;border-radius:4px;height:6px;">
                  <tr>
                    <td width="${barFill}%" style="background:#1ABAEA;border-radius:4px;height:6px;"></td>
                    <td width="${100 - barFill}%"></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:14px;color:#67768E;line-height:1.75;">${restitution}</p>
              </td>
            </tr>
            ${sousDimensions ? `
            <tr>
              <td colspan="2" style="padding-top:4px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #E0E4E8;padding-top:12px;">
                  ${Object.entries(sousDimensions).map(([dim, sdScore]) => `
                  <tr>
                    <td style="padding:4px 0;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="200" style="font-family:Arial,sans-serif;font-size:12px;color:#67768E;padding-right:12px;">${dim}</td>
                          <td style="padding-right:10px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E0E4E8;border-radius:3px;height:4px;">
                              <tr>
                                <td width="${sdScore}%" style="background:#1ABAEA;opacity:0.7;border-radius:3px;height:4px;"></td>
                                <td width="${100 - sdScore}%"></td>
                              </tr>
                            </table>
                          </td>
                          <td width="28" align="right" style="font-family:Arial,sans-serif;font-size:12px;font-weight:bold;color:#152034;">${sdScore}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>`).join('')}
                </table>
              </td>
            </tr>` : ''}
          </table>
        </td>
      </tr>`
    })
    .join('')

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F2F5F7;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F2F5F7;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E0E4E8;">

          <!-- Header -->
          <tr>
            <td style="background:#152034;padding:36px 40px;">
              <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#1ABAEA;">WadoCoaching</p>
              <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;color:#ffffff;line-height:1.2;">Votre profil managérial</h1>
            </td>
          </tr>

          <!-- Profil global -->
          <tr>
            <td style="padding:36px 40px 28px;background:#F2F5F7;border-bottom:1px solid #E0E4E8;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#152034;line-height:1.8;">${profilMessage ?? ''}</p>
            </td>
          </tr>

          <!-- Force & Levier -->
          <tr>
            <td style="padding:32px 40px;background:#152034;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48%" valign="top" style="padding-right:16px;">
                    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#1ABAEA;">Votre force différenciante</p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:18px;color:#ffffff;font-weight:bold;">${forceAxe ?? ''}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" valign="top" style="border-left:1px solid rgba(255,255,255,0.15);padding-left:16px;">
                    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#1ABAEA;">Votre prochain levier</p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:18px;color:#ffffff;font-weight:bold;">${levierAxe ?? ''}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Axes détail -->
          <tr>
            <td style="padding:36px 40px 12px;">
              <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#67768E;">Détail par axe</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${axeRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:8px 40px 36px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#1ABAEA;border-radius:8px;">
                    <a href="https://www.wadocoaching.com/bunkai/" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">Explorer l'accompagnement →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background:#F2F5F7;border-top:1px solid #E0E4E8;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#67768E;line-height:1.7;">
                Mehdi Soudsane — Coach certifié ACC/ICF<br>
                <a href="https://www.wadocoaching.com" style="color:#1ABAEA;text-decoration:none;">wadocoaching.com</a>
                &nbsp;·&nbsp;
                <a href="mailto:mehdi@wadocoaching.com" style="color:#1ABAEA;text-decoration:none;">mehdi@wadocoaching.com</a>
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

function buildEmailText(data: Omit<DiagnosticBody, 'email'>): string {
  const { axes = [], forceAxe, levierAxe, profilMessage } = data
  const lines: string[] = [
    'VOTRE PROFIL MANAGÉRIAL — WadoCoaching',
    '='.repeat(40),
    '',
    profilMessage ?? '',
    '',
    `Force différenciante : ${forceAxe ?? ''}`,
    `Prochain levier      : ${levierAxe ?? ''}`,
    '',
    'DÉTAIL PAR AXE',
    '-'.repeat(40),
  ]
  for (const { axe, score, niveau, restitution } of axes) {
    lines.push(`\n${axe} — ${score}/100 (${niveau})`)
    lines.push(restitution)
  }
  lines.push('')
  lines.push('Explorer l\'accompagnement : https://www.wadocoaching.com/bunkai/')
  lines.push('')
  lines.push('Mehdi Soudsane — Coach certifié ACC/ICF')
  lines.push('wadocoaching.com')
  return lines.join('\n')
}

export default defineEventHandler(async (event) => {
  const body = await readBody<DiagnosticBody>(event)
  const { email, axes, forceAxe, levierAxe, profilMessage } = body ?? {}

  if (!email?.trim()) {
    throw createError({ statusCode: 400, message: 'Email manquant.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'Configuration serveur manquante.' })
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'WadoCoaching <contact@wadocoaching.com>',
      to: [email.trim()],
      subject: 'Votre profil managérial — WadoCoaching',
      html: buildEmailHtml({ axes, forceAxe, levierAxe, profilMessage }),
      text: buildEmailText({ axes, forceAxe, levierAxe, profilMessage }),
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    console.error('Resend error:', data)
    throw createError({ statusCode: 502, message: "L'envoi a échoué." })
  }

  return { ok: true }
})
