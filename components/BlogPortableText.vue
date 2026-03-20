<script setup lang="ts">
import { h } from 'vue'
import { PortableText } from '@portabletext/vue'
import { urlFor } from '~/utils/sanity'

defineProps<{ value: unknown[] }>()

/* eslint-disable @typescript-eslint/no-explicit-any */
const components = {
  types: {
    image: ({ value }: any) => {
      const src = urlFor(value.asset).width(740).auto('format').quality(85).url()
      return h('figure', {}, [
        h('img', { src, alt: value.alt ?? '', loading: 'lazy' }),
        value.caption ? h('figcaption', {}, value.caption) : null,
      ])
    },
  },
  marks: {
    link: ({ value }: any, { slots }: any) =>
      h(
        'a',
        {
          href: value?.href,
          target: value?.blank ? '_blank' : undefined,
          rel: value?.blank ? 'noopener noreferrer' : undefined,
        },
        slots.default?.(),
      ),
  },
  block: {
    h2:         (_: any, { slots }: any) => h('h2',         {}, slots.default?.()),
    h3:         (_: any, { slots }: any) => h('h3',         {}, slots.default?.()),
    blockquote: (_: any, { slots }: any) => h('blockquote', {}, slots.default?.()),
    normal:     (_: any, { slots }: any) => h('p',          {}, slots.default?.()),
  },
}
</script>

<template>
  <PortableText :value="(value as any)" :components="components" />
</template>
