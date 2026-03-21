<script setup lang="ts">
import { getSanityClient, ALL_ARTICLES_QUERY, ALL_CATEGORIES_QUERY } from '~/utils/sanity'
import type { ArticlePreview, Category } from '~/utils/sanity'

const articles    = ref<ArticlePreview[]>([])
const categories  = ref<Category[]>([])
const activeSlug  = ref<string | null>(null)
const loading     = ref(true)
const error       = ref(false)

const filtered = computed(() =>
  activeSlug.value
    ? articles.value.filter(a => a.categories?.some(c => c.slug.current === activeSlug.value))
    : articles.value
)

function observeFadeIns() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  document.querySelectorAll<HTMLElement>('.fade-in:not(.visible)').forEach(el => io.observe(el))
}

watch(activeSlug, async () => {
  await nextTick()
  observeFadeIns()
})

onMounted(async () => {
  try {
    const client = getSanityClient()
    const [arts, cats] = await Promise.all([
      client.fetch<ArticlePreview[]>(ALL_ARTICLES_QUERY),
      client.fetch<Category[]>(ALL_CATEGORIES_QUERY),
    ])
    articles.value   = arts
    categories.value = cats
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
    <div class="mb-10">
      <h1 class="font-heading text-[clamp(2rem,4vw,3rem)] text-primary mb-3">Ressources</h1>
      <p class="text-[1.05rem] text-text-light leading-[1.75] max-w-[600px]">
        Articles sur le coaching professionnel, le management et le leadership.
      </p>
    </div>

    <!-- Filtres catégories -->
    <div v-if="categories.length" class="flex flex-wrap gap-2 mb-10">
      <button
        :class="['text-[0.8rem] font-semibold px-4 py-1.5 rounded-full border transition-colors', activeSlug === null ? 'bg-primary text-white border-primary' : 'bg-transparent text-text-light border-border hover:border-primary hover:text-primary']"
        @click="activeSlug = null"
      >Tous</button>
      <button
        v-for="cat in categories"
        :key="cat._id"
        :class="['text-[0.8rem] font-semibold px-4 py-1.5 rounded-full border transition-colors', activeSlug === cat.slug.current ? 'bg-primary text-white border-primary' : 'bg-transparent text-text-light border-border hover:border-primary hover:text-primary']"
        @click="activeSlug = cat.slug.current"
      >{{ cat.title }}</button>
    </div>

    <!-- Skeleton loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="n in 3" :key="n" class="bg-white rounded-2xl overflow-hidden border border-border animate-pulse">
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
    <p v-else-if="filtered.length === 0" class="text-text-light text-center py-16">
      Aucun article dans cette catégorie.
    </p>

    <!-- Grille d'articles -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <BlogCard
        v-for="(article, i) in filtered"
        :key="article._id"
        :article="article"
        :delay="(i % 3) + 1"
      />
    </div>
  </section>
</template>
