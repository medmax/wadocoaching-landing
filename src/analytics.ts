const GA_ID = 'G-ZTRNPV9KB3'

// Déclaration des propriétés GA sur window
declare global {
  interface Window {
    __ga_loaded?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
  }
}

export function loadGA(): void {
  if (window.__ga_loaded) return
  window.__ga_loaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]): void {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

/** Appelé au chargement de chaque page : charge GA si déjà accepté. */
export function initAnalytics(): void {
  if (localStorage.getItem('wado_cookie_consent') === 'accepted') {
    loadGA()
  }
}
