<template>
  <footer class="footer">
    <div class="footer-inner">

      <div class="footer-top">
        <div class="footer-brand">
          <a :href="prefix || '/'" class="logo">
            <img src="/images/logo.svg" alt="WadoCoaching" class="logo-img">
          </a>
          <p class="footer-tagline">De la sérénité dans la complexité</p>
        </div>
        <nav class="footer-nav">
          <a :href="prefix + '#coaching'" class="footer-link">Coaching</a>
          <a :href="prefix + '#formation'" class="footer-link">Formation</a>
          <a :href="prefix + '#temoignages'" class="footer-link">Témoignages</a>
          <a :href="prefix + '#ressources'" class="footer-link">Ressources</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <span class="footer-copy">© {{ year }} WadoCoaching — Tous droits réservés</span>
        <div class="footer-legal-links">
          <a href="/mentions-legales.html" class="footer-legal-link">Mentions légales</a>
          <a href="/politique-confidentialite.html" class="footer-legal-link">Politique de confidentialité</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  prefix: { type: String, default: '' }
})

const year = new Date().getFullYear()
</script>
