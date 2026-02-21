import { createApp } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import './style.css'

createApp(AppHeader).mount('#app-header')
createApp(AppFooter).mount('#app-footer')

/* --- FADE-IN ON SCROLL --- */
const fadeEls = document.querySelectorAll('.fade-in')
if (fadeEls.length > 0) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  fadeEls.forEach(el => io.observe(el))
}
