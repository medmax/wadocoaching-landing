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

/* --- FADE-IN ON SCROLL --- */
const fadeEls = document.querySelectorAll<HTMLElement>('.fade-in')
if (fadeEls.length > 0) {
  const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  fadeEls.forEach(el => io.observe(el))
}
