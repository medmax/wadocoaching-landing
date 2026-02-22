import { createApp } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import CookieBanner from './components/CookieBanner.vue'
import RessourcesPreview from './components/RessourcesPreview.vue'
import { initAnalytics } from './analytics.js'
import './style.css'

initAnalytics()

createApp(AppHeader).mount('#app-header')
createApp(AppFooter).mount('#app-footer')
createApp(CookieBanner).mount('#app-cookie')
createApp(RessourcesPreview).mount('#app-ressources-preview')

/* --- FADE-IN ON SCROLL --- */
const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      io.unobserve(e.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

// Observer les éléments statiques dès le chargement
document.querySelectorAll<HTMLElement>('.fade-in').forEach(el => io.observe(el))

// Observer les cartes ressources après leur rendu dynamique
window.addEventListener('ressources-loaded', () => {
  document.querySelectorAll<HTMLElement>('#app-ressources-preview .fade-in')
    .forEach(el => io.observe(el))
}, { once: true })
