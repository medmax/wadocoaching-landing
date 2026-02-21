<template>
  <footer class="bg-primary px-8 py-16">
    <div class="max-w-[1200px] mx-auto">

      <div class="flex justify-between items-start flex-wrap gap-8 pb-12 mb-8 border-b border-white/10">
        <div>
          <a :href="prefix || '/'" class="flex items-center no-underline">
            <img src="/images/logo.svg" alt="WadoCoaching" class="h-[45px] w-auto">
          </a>
          <p class="text-[0.9rem] text-white/45 mt-4 max-w-[220px] leading-[1.6]">De la sérénité dans la complexité</p>
        </div>
        <nav class="flex gap-8 items-center flex-wrap justify-end">
          <a :href="prefix + '#coaching'" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Coaching</a>
          <a :href="prefix + '#formation'" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Formation</a>
          <a :href="prefix + '#temoignages'" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Témoignages</a>
          <a :href="prefix + '#ressources'" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Ressources</a>
        </nav>
      </div>

      <div class="flex justify-between items-center flex-wrap gap-4">
        <span class="text-[0.8rem] text-white/30">© {{ year }} WadoCoaching — Tous droits réservés</span>
        <div class="flex gap-6">
          <a href="/mentions-legales.html" class="text-[0.8rem] text-white/30 no-underline transition-colors hover:text-white/65">Mentions légales</a>
          <a href="/politique-confidentialite.html" class="text-[0.8rem] text-white/30 no-underline transition-colors hover:text-white/65">Politique de confidentialité</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ prefix?: string }>(), { prefix: '' })

const year: number = new Date().getFullYear()
</script>
