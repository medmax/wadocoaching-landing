import { createApp } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import CookieBanner from './components/CookieBanner.vue'
import { initAnalytics } from './analytics.js'
import './style.css'

initAnalytics()

createApp(AppHeader).mount('#app-header')
createApp(AppFooter).mount('#app-footer')
createApp(CookieBanner).mount('#app-cookie')

const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      io.unobserve(e.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

document.querySelectorAll<HTMLElement>('.fade-in').forEach(el => io.observe(el))

/* ── Pills de sélection d'offre ─────────────────────────────────────────────── */
const pills = document.querySelectorAll<HTMLButtonElement>('#offre-pills .offre-pill')
const offreInput = document.getElementById('offre-value') as HTMLInputElement | null

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => {
      p.classList.remove('border-accent', 'text-accent', 'bg-accent/[0.08]')
      p.classList.add('border-border', 'text-text-light', 'bg-bg')
    })
    pill.classList.remove('border-border', 'text-text-light', 'bg-bg')
    pill.classList.add('border-accent', 'text-accent', 'bg-accent/[0.08]')
    if (offreInput) offreInput.value = pill.dataset.value ?? ''
  })
})

/* ── Formulaire de contact → Resend via /api/contact ──────────────────────── */
const form = document.getElementById('contact-form') as HTMLFormElement | null
const successEl = document.getElementById('form-success')
const errorEl = document.getElementById('form-error')
const submitBtn = document.getElementById('form-submit') as HTMLButtonElement | null

form?.addEventListener('submit', async (e: Event) => {
  e.preventDefault()

  const data = new FormData(form)
  const nom = (data.get('nom') as string).trim()
  const email = (data.get('email') as string).trim()
  const message = (data.get('message') as string).trim()
  const offre = (data.get('offre') as string | null) ?? 'Non précisé'

  if (!nom || !email || !message) {
    showError('Merci de remplir tous les champs obligatoires.')
    return
  }

  if (errorEl) errorEl.classList.add('hidden')

  if (submitBtn) {
    submitBtn.textContent = 'Envoi en cours…'
    submitBtn.disabled = true
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, message, offre }),
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error((json as { error?: string }).error ?? 'Erreur inconnue')
    }

    // Succès
    form.classList.add('hidden')
    if (successEl) successEl.classList.remove('hidden')
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Une erreur est survenue."
    showError(`${msg} Vous pouvez aussi écrire directement à mehdi@wadocoaching.com`)
    if (submitBtn) {
      submitBtn.textContent = 'Envoyer le message'
      submitBtn.disabled = false
    }
  }
})

function showError(text: string): void {
  if (!errorEl) return
  errorEl.textContent = text
  errorEl.classList.remove('hidden')
}
