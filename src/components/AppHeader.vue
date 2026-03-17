<template>
  <header class="bg-primary px-8 fixed top-0 left-0 w-full z-[1000]">
    <div class="max-w-[1200px] mx-auto h-20 flex justify-between items-center">

      <a href="/" class="flex items-center no-underline">
        <img src="/images/logo.svg" alt="WadoCoaching" class="h-[45px] w-auto">
      </a>

      <nav>
        <ul
          :class="[
            'list-none flex-col md:flex-row',
            'md:flex md:items-center md:gap-6',
            'md:static md:w-auto md:bg-transparent md:p-0 md:border-0',
            'absolute top-20 left-0 w-full',
            'bg-primary px-8 py-4',
            'border-t border-white/10',
            isOpen ? 'flex' : 'hidden md:flex'
          ]"
        >

          <!-- Dropdown "Les offres" -->
          <li
            class="border-b border-white/[0.08] md:border-0 relative"
            @mouseenter="offersOpen = true"
            @mouseleave="offersOpen = false"
          >
            <button
              :class="[
                'nav-link flex items-center gap-1 py-[0.85rem] md:py-0 text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white bg-transparent border-0 cursor-pointer w-full md:w-auto',
                offersActive ? 'nav-active' : ''
              ]"
              @click="toggleOffers"
            >
              Les offres
              <svg
                :class="['w-3.5 h-3.5 transition-transform duration-200 shrink-0', offersOpen ? 'rotate-180' : '']"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown panel — pt-2 crée un pont invisible pour éviter la fermeture accidentelle -->
            <ul
              v-show="offersOpen"
              class="list-none pl-4 md:pl-0 md:absolute md:top-full md:left-[-1rem] md:bg-primary md:border md:border-white/10 md:rounded-xl md:shadow-2xl md:min-w-[260px] md:pt-4 md:pb-2 flex flex-col"
            >
              <li>
                <a
                  href="/ancrage/"
                  :class="['flex flex-col px-4 py-3 no-underline transition-colors hover:bg-white/[0.05] rounded-lg', activePath === '/ancrage/' ? 'bg-white/[0.05]' : '']"
                  @click="close"
                >
                  <span :class="['text-[0.9rem] font-semibold transition-colors', activePath === '/ancrage/' ? 'text-accent' : 'text-white']">Ancrage</span>
                  <span class="text-white/45 text-[0.78rem] mt-0.5">Coaching individuel</span>
                </a>
              </li>
              <li>
                <a
                  href="/ma-ai/"
                  :class="['flex flex-col px-4 py-3 no-underline transition-colors hover:bg-white/[0.05] rounded-lg', activePath === '/ma-ai/' ? 'bg-white/[0.05]' : '']"
                  @click="close"
                >
                  <span :class="['text-[0.9rem] font-semibold transition-colors', activePath === '/ma-ai/' ? 'text-accent' : 'text-white']">Ma-aï</span>
                  <span class="text-white/45 text-[0.78rem] mt-0.5">Coaching d'équipe</span>
                </a>
              </li>
              <li>
                <a
                  href="/bunkai/"
                  :class="['flex flex-col px-4 py-3 no-underline transition-colors hover:bg-white/[0.05] rounded-lg', activePath === '/bunkai/' ? 'bg-white/[0.05]' : '']"
                  @click="close"
                >
                  <span :class="['text-[0.9rem] font-semibold transition-colors', activePath === '/bunkai/' ? 'text-accent' : 'text-white']">Bunkai</span>
                  <span class="text-white/45 text-[0.78rem] mt-0.5">Ateliers de pratiques réflexives</span>
                </a>
              </li>
            </ul>
          </li>

          <li class="border-b border-white/[0.08] md:border-0">
            <a
              href="/qui-suis-je/"
              :class="['nav-link block py-[0.85rem] md:py-0 no-underline text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white', activePath === '/qui-suis-je/' ? 'nav-active' : '']"
              @click="close"
            >Qui suis-je</a>
          </li>
          <li class="border-b border-white/[0.08] md:border-0">
            <a
              href="/ressources/"
              :class="['nav-link block py-[0.85rem] md:py-0 no-underline text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white', activePath.startsWith('/ressources') ? 'nav-active' : '']"
              @click="close"
            >Ressources</a>
          </li>
          <li class="border-b border-white/[0.08] md:border-0">
            <a
              href="/contact/"
              :class="['nav-link block py-[0.85rem] md:py-0 no-underline text-white/85 text-[0.95rem] font-medium transition-colors hover:text-white', activePath === '/contact/' ? 'nav-active' : '']"
              @click="close"
            >Contact</a>
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
import { ref, computed, onMounted } from 'vue'

withDefaults(defineProps<{ prefix?: string }>(), { prefix: '' })

const isOpen = ref<boolean>(false)
const offersOpen = ref<boolean>(false)
const activePath = ref<string>('')

const offersActive = computed<boolean>(() =>
  ['/ancrage/', '/ma-ai/', '/bunkai/'].some(p => activePath.value.startsWith(p))
)

onMounted(() => {
  activePath.value = window.location.pathname
})

function toggle(): void {
  isOpen.value = !isOpen.value
}

function close(): void {
  isOpen.value = false
  offersOpen.value = false
}

function toggleOffers(): void {
  offersOpen.value = !offersOpen.value
}
</script>
