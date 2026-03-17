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

/* ── Back to top ──────────────────────────────────────────────────────────── */
const backToTop = document.getElementById('back-to-top')
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.remove('hidden')
      backToTop.classList.add('flex')
    } else {
      backToTop.classList.add('hidden')
      backToTop.classList.remove('flex')
    }
  }, { passive: true })
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
}
