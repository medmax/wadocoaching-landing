<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { sanityClient, urlFor, ARTICLE_BY_SLUG_QUERY } from '../sanity'
import type { ArticleFull } from '../sanity'
import BlogPortableText from './BlogPortableText.vue'

const props  = defineProps<{ slug: string }>()
const router = useRouter()

const article = ref<ArticleFull | null>(null)
const loading = ref(true)
const error   = ref(false)

async function fetchArticle(slug: string) {
  loading.value = true
  error.value   = false
  try {
    const result = await sanityClient.fetch<ArticleFull | null>(ARTICLE_BY_SLUG_QUERY, { slug })
    article.value = result
    if (!result) error.value = true
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchArticle(props.slug))
watch(() => props.slug, fetchArticle)

const formattedDate = computed(() => {
  if (!article.value?.publishedAt) return ''
  return new Date(article.value.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const coverUrl = computed(() => {
  if (!article.value?.coverImage) return null
  return urlFor(article.value.coverImage).width(1200).height(500).auto('format').quality(85).url()
})

// SEO dynamique
watch(article, (a) => {
  if (!a) return
  document.title = `${a.title} — WadoCoaching`

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector<HTMLMetaElement>(selector)
    if (el) el.content = content
  }

  setMeta('meta[name="description"]', a.excerpt ?? '')
  setMeta('meta[property="og:title"]', `${a.title} — WadoCoaching`)
  setMeta('meta[property="og:description"]', a.excerpt ?? '')
  setMeta('meta[property="og:url"]', `https://www.wadocoaching.com/ressources/${a.slug.current}`)

  if (a.coverImage) {
    const ogImg = urlFor(a.coverImage).width(1200).height(630).auto('format').url()
    setMeta('meta[property="og:image"]', ogImg)
    setMeta('meta[name="twitter:image"]', ogImg)
  }
})
</script>

<template>
  <!-- Article chargé -->
  <article v-if="article">

    <!-- Breadcrumb -->
    <nav class="mb-8 text-[0.875rem] text-text-light flex items-center gap-2">
      <a href="/ressources/" class="text-accent no-underline hover:text-primary-light transition-colors">
        Ressources
      </a>
      <span>/</span>
      <span class="text-primary truncate">{{ article.title }}</span>
    </nav>

    <!-- Image de couverture -->
    <div class="w-full h-[300px] md:h-[460px] rounded-2xl overflow-hidden bg-primary mb-10">
      <img
        v-if="coverUrl"
        :src="coverUrl"
        :alt="article.coverImage?.alt ?? article.title"
        class="w-full h-full object-cover block"
        loading="eager"
      />
    </div>

    <!-- Contenu centré -->
    <div class="max-w-[740px] mx-auto">

      <!-- Header article -->
      <div class="mb-10">
        <span class="text-[0.8rem] font-medium text-text-light uppercase tracking-[0.05em] block mb-3">
          {{ formattedDate }}
        </span>
        <h1 class="font-heading text-[clamp(2rem,4vw,2.8rem)] text-primary leading-[1.2] mb-5">
          {{ article.title }}
        </h1>
        <p v-if="article.excerpt" class="text-[1.05rem] text-text-light leading-[1.75] font-heading italic border-l-[3px] border-accent pl-5">
          {{ article.excerpt }}
        </p>
      </div>

      <!-- Corps de l'article (Portable Text) -->
      <div class="prose-wado">
        <BlogPortableText :value="(article.body as unknown[])" />
      </div>

      <!-- Retour -->
      <div class="mt-16 pt-8 border-t border-border">
        <a
          href="/ressources/"
          class="text-[0.9rem] font-medium text-accent no-underline transition-colors hover:text-primary-light"
        >
          ← Retour aux ressources
        </a>
      </div>

    </div>
  </article>

  <!-- Skeleton -->
  <div v-else-if="loading" class="animate-pulse">
    <div class="w-full h-[300px] md:h-[460px] rounded-2xl bg-border mb-10"></div>
    <div class="max-w-[740px] mx-auto">
      <div class="h-4 bg-border rounded w-1/4 mb-4"></div>
      <div class="h-10 bg-border rounded w-3/4 mb-4"></div>
      <div class="h-5 bg-border rounded w-full mb-3"></div>
      <div class="h-5 bg-border rounded w-5/6 mb-3"></div>
      <div class="h-5 bg-border rounded w-4/6"></div>
    </div>
  </div>

  <!-- 404 -->
  <div v-else class="text-center py-24">
    <p class="font-heading text-[1.5rem] text-primary mb-6">Article introuvable</p>
    <a href="/ressources/" class="text-accent no-underline hover:text-primary-light transition-colors">
      ← Retour aux ressources
    </a>
  </div>
</template>
