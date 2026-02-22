<script setup lang="ts">
import { h } from 'vue'
import { PortableText } from '@portabletext/vue'
import type { PortableTextComponents } from '@portabletext/vue'
import { urlFor } from '../sanity'

defineProps<{ value: unknown[] }>()

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => {
      const src = urlFor(value.asset).width(740).auto('format').quality(85).url()
      return h('figure', { class: '' }, [
        h('img', { src, alt: value.alt ?? '', loading: 'lazy', class: '' }),
        value.caption ? h('figcaption', {}, value.caption) : null,
      ])
    },
  },
  marks: {
    link: ({ value, children }: { value: { href: string; blank?: boolean }; children: unknown }) =>
      h(
        'a',
        {
          href: value.href,
          target: value.blank ? '_blank' : undefined,
          rel: value.blank ? 'noopener noreferrer' : undefined,
        },
        children as string,
      ),
  },
  block: {
    h2: ({ children }: { children: unknown }) => h('h2', {}, children as string),
    h3: ({ children }: { children: unknown }) => h('h3', {}, children as string),
    blockquote: ({ children }: { children: unknown }) => h('blockquote', {}, children as string),
    normal: ({ children }: { children: unknown }) => h('p', {}, children as string),
  },
}
</script>

<template>
  <PortableText :value="value" :components="components" />
</template>
