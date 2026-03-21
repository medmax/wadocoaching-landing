<script setup lang="ts">
import { getSanityClient, urlFor, ARTICLE_BY_SLUG_QUERY } from '~/utils/sanity'
import type { ArticleFull } from '~/utils/sanity'

const props = defineProps<{ slug: string }>()

const article = ref<ArticleFull | null>(null)
const loading = ref(true)
const error   = ref(false)

async function fetchArticle(slug: string) {
  loading.value = true
  error.value   = false
  try {
    const result = await getSanityClient().fetch<ArticleFull | null>(ARTICLE_BY_SLUG_QUERY, { slug })
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
  return urlFor(article.value.coverImage).width(560).height(600).auto('format').quality(85).url()
})

// SEO dynamique SSR-compatible
const seoTitle = computed(() => article.value ? `${article.value.title} — WadoCoaching` : 'Ressources — WadoCoaching')
const seoDescription = computed(() => article.value?.excerpt ?? '')
const seoUrl = computed(() => article.value ? `https://www.wadocoaching.com/ressources/${article.value.slug.current}` : '')
const seoImage = computed(() => article.value?.coverImage ? urlFor(article.value.coverImage).width(1200).height(630).auto('format').url() : '')

useHead({
  title: seoTitle,
  meta: [
    { name: 'description', content: seoDescription },
    { property: 'og:title', content: seoTitle },
    { property: 'og:description', content: seoDescription },
    { property: 'og:url', content: seoUrl },
    { property: 'og:image', content: seoImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: seoImage },
  ],
  script: computed(() => article.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': article.value.title,
      'description': article.value.excerpt ?? '',
      'datePublished': article.value.publishedAt,
      'author': { '@type': 'Person', '@id': 'https://www.wadocoaching.com/qui-suis-je/#person', 'name': 'Mehdi Soudsane' },
      'publisher': { '@id': 'https://www.wadocoaching.com/#organization' },
      'url': seoUrl.value,
      ...(seoImage.value && { 'image': seoImage.value }),
    }),
  }] : []),
})
</script>

<template>

  <!-- Article chargé -->
  <article v-if="article">

    <!-- ── HERO ─────────────────────────────────────── -->
    <div class="bg-primary rounded-2xl overflow-hidden mb-14 px-8 md:px-14 py-12 flex flex-col md:flex-row items-center gap-10">

      <!-- Colonne texte -->
      <div class="flex-1 min-w-0">

        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 mb-7 text-[0.8rem]">
          <a
            href="/ressources/"
            class="text-accent no-underline font-medium hover:text-white transition-colors"
          >
            Ressources
          </a>
          <span class="text-white/30">/</span>
          <span class="text-white/45 truncate max-w-[220px]">{{ article.title }}</span>
        </nav>

        <!-- Date -->
        <span class="text-[0.78rem] font-semibold text-accent uppercase tracking-[0.1em] block mb-4">
          {{ formattedDate }}
        </span>

        <!-- Titre -->
        <h1 class="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] text-white leading-[1.2] mb-6">
          {{ article.title }}
        </h1>

        <!-- Excerpt -->
        <p
          v-if="article.excerpt"
          class="font-heading italic text-[1rem] text-white/65 leading-[1.8] border-l-[3px] border-accent pl-5"
        >
          {{ article.excerpt }}
        </p>

      </div>

      <!-- Image -->
      <div
        v-if="coverUrl"
        class="shrink-0 w-full md:w-[260px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden bg-primary-light"
      >
        <img
          :src="coverUrl"
          :alt="article.coverImage?.alt ?? article.title"
          class="w-full h-full object-cover block"
          loading="eager"
        />
      </div>

    </div>

    <!-- ── CORPS ─────────────────────────────────────── -->
    <div class="max-w-[740px] mx-auto">

      <div class="prose-wado">
        <BlogPortableText :value="(article.body as unknown[])" />
      </div>

      <!-- PDF téléchargeable -->
      <div v-if="article.attachment?.asset?.url" class="mt-10 flex items-center gap-4 bg-bg border border-border rounded-2xl px-6 py-5">
        <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-[0.9rem] font-semibold text-primary">{{ article.attachment.label ?? 'Télécharger le PDF' }}</p>
        </div>
        <a
          :href="article.attachment.asset.url"
          target="_blank"
          rel="noopener"
          download
          class="shrink-0 inline-block px-5 py-2.5 bg-accent text-white font-semibold rounded-lg no-underline text-[0.85rem] transition-all hover:bg-primary-light hover:-translate-y-0.5"
        >Télécharger →</a>
      </div>

      <!-- CTA coaching -->
      <div class="mt-16 bg-accent/[0.06] border border-accent/25 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
        <div class="flex-1">
          <p class="font-heading text-[1.25rem] text-primary leading-[1.3] mb-2">Envie d'aller plus loin ?</p>
          <p class="text-[0.9rem] text-text-light leading-[1.7]">
            Découvrez les accompagnements WadoCoaching — coaching individuel, d'équipe et formation.
          </p>
        </div>
        <a
          href="/#coaching"
          class="shrink-0 inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg no-underline text-[0.9rem] transition-all hover:bg-primary-light hover:-translate-y-0.5"
        >
          Explorer les accompagnements
        </a>
      </div>

      <!-- Retour -->
      <div class="mt-8 pt-8 border-t border-border">
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
    <div class="bg-border rounded-2xl h-[260px] mb-14"></div>
    <div class="max-w-[740px] mx-auto flex flex-col gap-4">
      <div class="h-5 bg-border rounded w-full"></div>
      <div class="h-5 bg-border rounded w-5/6"></div>
      <div class="h-5 bg-border rounded w-4/6"></div>
      <div class="h-5 bg-border rounded w-full mt-4"></div>
      <div class="h-5 bg-border rounded w-3/4"></div>
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
