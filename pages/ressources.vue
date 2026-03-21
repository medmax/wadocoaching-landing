<template>
  <section class="bg-bg pt-36 pb-24 px-8">
    <div class="max-w-[1200px] mx-auto">
      <NuxtPage />
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Ressources — WadoCoaching',
  meta: [
    { name: 'description', content: 'Articles et ressources sur le coaching professionnel et le management par WadoCoaching.' },
    { property: 'og:title', content: 'Ressources — WadoCoaching' },
    { property: 'og:image', content: 'https://www.wadocoaching.com/images/hero-bg.jpg' },
    { property: 'og:url', content: 'https://www.wadocoaching.com/ressources/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'https://www.wadocoaching.com/images/hero-bg.jpg' },
  ],
})
</script>
