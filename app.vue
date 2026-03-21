<template>
  <AppHeader />
  <NuxtPage />
  <AppFooter />

  <button
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
const router = useRouter()
const route = useRoute()
const showBackToTop = ref(false)

// Canonical automatique
const canonicalUrl = computed(() =>
  `https://www.wadocoaching.com${route.path.endsWith('/') ? route.path : route.path + '/'}`,
)
useHead({ link: [{ rel: 'canonical', href: canonicalUrl }] })

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
