<script setup lang="ts">
import { ref } from 'vue'
import { loadGA } from '../analytics.js'

const STORAGE_KEY = 'wado_cookie_consent'
const visible = ref<boolean>(!localStorage.getItem(STORAGE_KEY))

function accept(): void {
  localStorage.setItem(STORAGE_KEY, 'accepted')
  loadGA()
  visible.value = false
}

function refuse(): void {
  localStorage.setItem(STORAGE_KEY, 'refused')
  visible.value = false
}
</script>

<template>
  <div
    v-if="visible"
    class="fixed bottom-0 inset-x-0 z-[9999] bg-primary border-t border-white/10 flex flex-wrap items-center justify-between gap-4 px-8 py-3"
    role="dialog"
    aria-label="Gestion des cookies"
  >
    <p class="text-white/85 text-sm m-0">
      Ce site utilise des cookies pour améliorer votre expérience.
      <a href="/politique-confidentialite.html" class="text-accent underline">En savoir plus</a>
    </p>
    <div class="flex gap-3 shrink-0">
      <button
        class="px-4 py-2 text-sm font-semibold border border-white/35 text-white/75 rounded-md cursor-pointer bg-transparent hover:opacity-80 transition-opacity"
        @click="refuse"
      >Refuser</button>
      <button
        class="px-4 py-2 text-sm font-semibold bg-accent text-white border border-accent rounded-md cursor-pointer hover:opacity-80 transition-opacity"
        @click="accept"
      >Accepter</button>
    </div>
  </div>
</template>
