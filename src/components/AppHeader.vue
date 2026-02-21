<template>
  <header>
    <div class="header-inner">

      <a :href="prefix || '/'" class="logo">
        <img src="/images/logo.svg" alt="WadoCoaching" class="logo-img">
      </a>

      <nav>
        <ul :class="['nav-menu', { open: isOpen }]">
          <li><a :href="prefix + '#qui-suis-je'" class="nav-link" @click="close">Qui suis-je</a></li>
          <li><a :href="prefix + '#coaching'" class="nav-link" @click="close">Coaching</a></li>
          <li><a :href="prefix + '#formation'" class="nav-link" @click="close">Formation</a></li>
          <li><a :href="prefix + '#temoignages'" class="nav-link" @click="close">Témoignages</a></li>
          <li><a :href="prefix + '#ressources'" class="nav-link" @click="close">Ressources</a></li>
          <li>
            <a href="#" class="nav-cta" data-calendly-popup @click="close">Clarifions vos enjeux</a>
          </li>
        </ul>
      </nav>

      <button
        :class="['burger', { open: isOpen }]"
        :aria-expanded="isOpen.toString()"
        aria-label="Ouvrir le menu"
        @click="toggle"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  prefix: { type: String, default: '' }
})

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}
</script>
