/**
 * Vercel Serverless Function — /api/contact
 *
 * Reçoit les données du formulaire de contact et envoie un email via Resend.
 *
 * Variables d'environnement requises dans le dashboard Vercel :
 *   RESEND_API_KEY  — clé API Resend (ex: re_xxxxxxxxxxxx)
 *
 * L'adresse "from" doit correspondre à un domaine vérifié dans Resend.
 * Si le domaine wadocoaching.com n'est pas encore vérifié, utilisez
 * temporairement "onboarding@resend.dev" (limité à votre propre email).
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nom, email, message, offre } = req.body ?? {}

  if (!nom?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Champs obligatoires manquants.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY non définie')
    return res.status(500).json({ error: 'Configuration serveur manquante.' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'WadoCoaching <contact@wadocoaching.com>',
        to: ['mehdi@wadocoaching.com'],
        reply_to: email.trim(),
        subject: `[WadoCoaching] ${offre ?? 'Contact'} — Message de ${nom.trim()}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#152034">Nouveau message via wadocoaching.com</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#67768E;width:120px">Nom</td><td style="padding:8px 0;color:#152034"><strong>${nom.trim()}</strong></td></tr>
              <tr><td style="padding:8px 0;color:#67768E">Email</td><td style="padding:8px 0"><a href="mailto:${email.trim()}" style="color:#1ABAEA">${email.trim()}</a></td></tr>
              <tr><td style="padding:8px 0;color:#67768E">Concerne</td><td style="padding:8px 0;color:#152034">${offre ?? 'Non précisé'}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #E0E4E8;margin:24px 0">
            <p style="color:#152034;line-height:1.7;white-space:pre-line">${message.trim()}</p>
          </div>
        `,
        text: `Nom : ${nom.trim()}\nEmail : ${email.trim()}\nConcerne : ${offre ?? 'Non précisé'}\n\n${message.trim()}`,
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      console.error('Resend error:', data)
      return res.status(502).json({ error: "L'envoi a échoué. Merci de réessayer." })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return res.status(500).json({ error: 'Erreur serveur inattendue.' })
  }
}
