<template>
  <footer class="bg-primary px-8 py-16">
    <div class="max-w-[1200px] mx-auto">

      <div class="flex justify-between items-start flex-wrap gap-12 pb-12 mb-8 border-b border-white/10">

        <div>
          <RouterLink to="/" class="flex items-center no-underline">
            <img src="/images/logo.svg" alt="WadoCoaching" class="h-[45px] w-auto">
          </RouterLink>
          <p class="text-[0.9rem] text-white/45 mt-4 max-w-[220px] leading-[1.6]">De la sérénité dans la complexité</p>
        </div>

        <div class="flex gap-16 flex-wrap">
          <div>
            <p class="text-[0.75rem] font-semibold uppercase tracking-[1.5px] text-white/30 mb-4">Les accompagnements</p>
            <nav class="flex flex-col gap-3">
              <RouterLink to="/ancrage/" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Ancrage <span class="text-white/30 text-[0.78rem]">— Coaching individuel</span></RouterLink>
              <RouterLink to="/ma-ai/" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Ma-aï <span class="text-white/30 text-[0.78rem]">— Coaching d'équipe</span></RouterLink>
              <RouterLink to="/bunkai/" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Bunkai <span class="text-white/30 text-[0.78rem]">— Ateliers réflexifs</span></RouterLink>
            </nav>
          </div>
          <div>
            <p class="text-[0.75rem] font-semibold uppercase tracking-[1.5px] text-white/30 mb-4">Navigation</p>
            <nav class="flex flex-col gap-3">
              <RouterLink to="/qui-suis-je/" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Qui suis-je</RouterLink>
              <RouterLink to="/ressources" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Ressources</RouterLink>
              <RouterLink to="/contact/" class="no-underline text-white/65 text-[0.9rem] transition-colors hover:text-white">Contact</RouterLink>
            </nav>
          </div>
        </div>

      </div>

      <div class="flex justify-between items-center flex-wrap gap-4">
        <span class="text-[0.8rem] text-white/30">© {{ year }} WadoCoaching — Tous droits réservés</span>
        <div class="flex gap-6">
          <RouterLink to="/mentions-legales" class="text-[0.8rem] text-white/30 no-underline transition-colors hover:text-white/65">Mentions légales</RouterLink>
          <RouterLink to="/politique-confidentialite" class="text-[0.8rem] text-white/30 no-underline transition-colors hover:text-white/65">Politique de confidentialité</RouterLink>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
const year: number = new Date().getFullYear()
</script>
