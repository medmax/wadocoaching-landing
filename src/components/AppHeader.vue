<template>
  <header class="bg-primary px-8 fixed top-0 left-0 w-full z-[1000]">
    <div class="max-w-[1200px] mx-auto h-20 flex justify-between items-center">

      <a :href="prefix || '/'" class="flex items-center no-underline">
        <img src="/images/logo.svg" alt="WadoCoaching" class="h-[45px] w-auto">
      </a>

      <nav>
        <ul
          :class="[
            'list-none flex-col md:flex-row',
            'md:flex md:items-center md:gap-8',
            'md:static md:w-auto md:bg-transparent md:p-0 md:border-0',
            'absolute top-20 left-0 w-full',
            'bg-primary px-8 py-4',
            'border-t border-white/10',
            isOpen ? 'flex' : 'hidden md:flex'
          ]"
        >
          <li class="border-b border-white/[0.08] md:border-0">
            <a :href="prefix + '#qui-suis-je'" class="nav-link block py-[0.85rem] md:py-0 no-underline text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white" @click="close">Qui suis-je</a>
          </li>
          <li class="border-b border-white/[0.08] md:border-0">
            <a :href="prefix + '#coaching'" class="nav-link block py-[0.85rem] md:py-0 no-underline text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white" @click="close">Coaching</a>
          </li>
          <li class="border-b border-white/[0.08] md:border-0">
            <a :href="prefix + '#formation'" class="nav-link block py-[0.85rem] md:py-0 no-underline text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white" @click="close">Formation</a>
          </li>
          <li class="border-b border-white/[0.08] md:border-0">
            <a :href="prefix + '#temoignages'" class="nav-link block py-[0.85rem] md:py-0 no-underline text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white" @click="close">Témoignages</a>
          </li>
          <li class="border-b border-white/[0.08] md:border-0">
            <a :href="prefix + '#ressources'" class="nav-link block py-[0.85rem] md:py-0 no-underline text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white" @click="close">Ressources</a>
          </li>
          <li class="pt-4 md:pt-0">
            <a
              href="#"
              class="block text-center no-underline bg-accent text-white px-6 py-[0.65rem] rounded-[6px] font-semibold text-[0.9rem] transition-all hover:bg-primary-light hover:-translate-y-0.5"
              data-calendly-popup
              @click="close"
            >Clarifions vos enjeux</a>
          </li>
        </ul>
      </nav>

      <button
        :class="['flex md:hidden flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1 burger', { open: isOpen }]"
        :aria-expanded="isOpen"
        aria-label="Ouvrir le menu"
        @click="toggle"
      >
        <span class="block w-6 h-0.5 bg-white rounded-[2px] transition-all duration-300"></span>
        <span class="block w-6 h-0.5 bg-white rounded-[2px] transition-all duration-300"></span>
        <span class="block w-6 h-0.5 bg-white rounded-[2px] transition-all duration-300"></span>
      </button>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{ prefix?: string }>(), { prefix: '' })

const isOpen = ref<boolean>(false)

function toggle(): void {
  isOpen.value = !isOpen.value
}

function close(): void {
  isOpen.value = false
}
</script>
