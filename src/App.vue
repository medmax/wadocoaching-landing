<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <CookieBanner />

  <button
    id="back-to-top"
    :class="['fixed bottom-6 right-6 w-11 h-11 bg-primary text-white rounded-full shadow-lg items-center justify-center transition-all hover:bg-primary-light z-[900]', showBackToTop ? 'flex' : 'hidden']"
    aria-label="Retour en haut de page"
    @click="scrollToTop"
  >
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import CookieBanner from './components/CookieBanner.vue'

const router = useRouter()
const showBackToTop = ref(false)

let io: IntersectionObserver | null = null

function observeFadeEls(): void {
  if (io) io.disconnect()
  io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io?.unobserve(e.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll<HTMLElement>('.fade-in:not(.visible)').forEach(el => io!.observe(el))
}

function handleScroll(): void {
  showBackToTop.value = window.scrollY > 500
}

function handleRessourcesLoaded(): void {
  observeFadeEls()
}

// Enregistré une seule fois au niveau du script setup, pas dans onMounted
router.afterEach(async () => {
  await nextTick()
  observeFadeEls()
})

onMounted(() => {
  observeFadeEls()
  window.addEventListener('ressources-loaded', handleRessourcesLoaded)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  io?.disconnect()
  window.removeEventListener('ressources-loaded', handleRessourcesLoaded)
  window.removeEventListener('scroll', handleScroll)
})

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
