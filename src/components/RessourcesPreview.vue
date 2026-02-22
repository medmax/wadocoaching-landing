<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { sanityClient, latestArticlesQuery, urlFor } from '../sanity'
import type { ArticlePreview } from '../sanity'

const articles = ref<ArticlePreview[]>([])
const loading  = ref(true)

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function coverUrl(img: ArticlePreview['coverImage']): string {
  return urlFor(img).width(400).height(200).auto('format').quality(80).url()
}

onMounted(async () => {
  try {
    articles.value = await sanityClient.fetch<ArticlePreview[]>(latestArticlesQuery(3))
  } finally {
    loading.value = false
    await nextTick()
    window.dispatchEvent(new Event('ressources-loaded'))
  }
})
</script>

<template>
  <!-- Skeleton -->
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
      </div>
    </div>
  </div>

  <!-- Articles -->
  <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <a
      v-for="(article, i) in articles"
      :key="article._id"
      :href="`/ressources/${article.slug.current}`"
      :class="[
        'bg-white rounded-2xl overflow-hidden border border-border no-underline block',
        'transition-all hover:shadow-[0_8px_32px_rgba(21,32,52,0.1)] hover:-translate-y-[3px]',
        `fade-in d${i + 1}`,
        'group',
      ]"
    >
      <div class="w-full h-[200px] bg-primary overflow-hidden">
        <img
          v-if="article.coverImage"
          :src="coverUrl(article.coverImage)"
          :alt="article.coverImage.alt ?? article.title"
          class="w-full h-full object-cover block transition-transform duration-400 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div class="p-6 flex flex-col gap-2">
        <span class="text-[0.8rem] font-medium text-text-light uppercase tracking-[0.05em]">
          {{ formatDate(article.publishedAt) }}
        </span>
        <h3 class="font-heading text-[1.2rem] text-primary leading-[1.4]">
          {{ article.title }}
        </h3>
      </div>
    </a>
  </div>
</template>
