<script setup lang="ts">
import { computed } from 'vue'
import { urlFor } from '../sanity'
import type { ArticlePreview } from '../sanity'

const props = defineProps<{
  article: ArticlePreview
  delay?:  number
}>()

const formattedDate = computed(() =>
  new Date(props.article.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
)

const coverUrl = computed(() => {
  if (!props.article.coverImage) return null
  return urlFor(props.article.coverImage).width(400).height(200).auto('format').quality(80).url()
})

const href = computed(() => `/ressources/${props.article.slug.current}`)
</script>

<template>
  <a
    :href="href"
    :class="[
      'bg-white rounded-2xl overflow-hidden border border-border no-underline block',
      'transition-all hover:shadow-[0_8px_32px_rgba(21,32,52,0.1)] hover:-translate-y-[3px]',
      delay ? `fade-in d${delay}` : 'fade-in',
      'group',
    ]"
  >
    <div class="w-full h-[200px] bg-primary overflow-hidden">
      <img
        v-if="coverUrl"
        :src="coverUrl"
        :alt="article.coverImage?.alt ?? article.title"
        class="w-full h-full object-cover block transition-transform duration-400 group-hover:scale-[1.04]"
        loading="lazy"
      />
    </div>
    <div class="p-6 flex flex-col gap-2">
      <span class="text-[0.8rem] font-medium text-text-light uppercase tracking-[0.05em]">
        {{ formattedDate }}
      </span>
      <h3 class="font-heading text-[1.2rem] text-primary leading-[1.4]">
        {{ article.title }}
      </h3>
      <p v-if="article.excerpt" class="text-[0.88rem] text-text-light leading-[1.65] line-clamp-2 mt-1">
        {{ article.excerpt }}
      </p>
    </div>
  </a>
</template>
