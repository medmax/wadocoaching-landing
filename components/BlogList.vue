<script setup lang="ts">
import { getSanityClient, ALL_ARTICLES_QUERY } from '~/utils/sanity'
import type { ArticlePreview } from '~/utils/sanity'

const articles = ref<ArticlePreview[]>([])
const loading  = ref(true)
const error    = ref(false)

function observeFadeIns() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  document.querySelectorAll<HTMLElement>('.fade-in').forEach(el => io.observe(el))
}

onMounted(async () => {
  try {
    articles.value = await getSanityClient().fetch<ArticlePreview[]>(ALL_ARTICLES_QUERY)
  } catch (err) {
    console.error('[BlogList] Sanity fetch error:', err)
    error.value = true
  } finally {
    loading.value = false
    await nextTick()
    observeFadeIns()
  }
})
</script>

<template>
  <section>
    <!-- En-tête -->
    <div class="mb-12">
      <h1 class="font-heading text-[clamp(2rem,4vw,3rem)] text-primary mb-3">Ressources</h1>
      <p class="text-[1.05rem] text-text-light leading-[1.75] max-w-[600px]">
        Articles sur le coaching professionnel, le management et le leadership.
      </p>
    </div>

    <!-- Skeleton loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="n in 3"
        :key="n"
        class="bg-white rounded-2xl overflow-hidden border border-border animate-pulse"
      >
        <div class="w-full h-[200px] bg-border"></div>
        <div class="p-6 flex flex-col gap-3">
          <div class="h-3 bg-border rounded w-1/3"></div>
          <div class="h-5 bg-border rounded w-3/4"></div>
          <div class="h-4 bg-border rounded w-full"></div>
        </div>
      </div>
    </div>

    <!-- Erreur -->
    <p v-else-if="error" class="text-text-light text-center py-16">
      Une erreur est survenue. Veuillez réessayer.
    </p>

    <!-- Aucun article -->
    <p v-else-if="articles.length === 0" class="text-text-light text-center py-16">
      Aucun article publié pour le moment.
    </p>

    <!-- Grille d'articles -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <BlogCard
        v-for="(article, i) in articles"
        :key="article._id"
        :article="article"
        :delay="(i % 3) + 1"
      />
    </div>
  </section>
</template>
