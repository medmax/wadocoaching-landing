<template>
  <!-- PAGE HEADER -->
  <section class="bg-primary py-20 px-8">
    <div class="max-w-[1200px] mx-auto">
      <nav class="mb-8 fade-in">
        <a href="/" class="text-white/40 text-[0.85rem] no-underline hover:text-white/70 transition-colors">Accueil</a>
        <span class="text-white/25 mx-2">›</span>
        <span class="text-white/60 text-[0.85rem]">Contact</span>
      </nav>
      <div class="max-w-[600px] fade-in d1">
        <h1 class="font-heading text-[clamp(2.5rem,5vw,4rem)] text-white leading-[1.2] mb-6">Entrons en contact</h1>
        <p class="text-[1.15rem] text-white/70 leading-[1.75]">Une question sur les offres, une situation que vous souhaitez partager, ou simplement l'envie d'échanger.</p>
      </div>
    </div>
  </section>

  <!-- DEUX OPTIONS DE CONTACT -->
  <section class="bg-bg py-24 px-8">
    <div class="max-w-[1100px] mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        <!-- Option 1 : Calendly -->
        <div class="fade-in">
          <div class="bg-white rounded-2xl border border-border p-10 h-full">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h2 class="font-heading text-[1.75rem] text-primary mb-3">Réserver un échange</h2>
            <p class="text-[0.95rem] text-text-light leading-[1.75] mb-6">30 minutes en visio, sans préparation requise. On explore votre situation ensemble et on voit si un accompagnement a du sens.</p>
            <ul class="coaching-card-list list-none flex flex-col gap-3 mb-8">
              <li class="text-[0.9rem] text-primary">Gratuit et sans engagement</li>
              <li class="text-[0.9rem] text-primary">Disponible selon vos créneaux</li>
              <li class="text-[0.9rem] text-primary">Visio ou téléphone</li>
            </ul>
            <a
              href="#"
              class="inline-block w-full text-center px-7 py-3.5 bg-accent text-white font-semibold rounded-lg no-underline transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5"
              data-calendly-popup
            >Choisir un créneau →</a>
          </div>
        </div>

        <!-- Option 2 : Formulaire -->
        <div class="fade-in d1">
          <div class="bg-white rounded-2xl border border-border p-10">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h2 class="font-heading text-[1.75rem] text-primary mb-3">Envoyer un message</h2>
            <p class="text-[0.95rem] text-text-light leading-[1.75] mb-8">Préférez-vous écrire d'abord ? Je vous réponds sous 48h.</p>

            <!-- Formulaire -->
            <form v-if="!formSuccess" class="flex flex-col gap-5" novalidate @submit.prevent="submitForm">

              <div class="flex flex-col gap-1.5">
                <label for="nom" class="text-[0.85rem] font-semibold text-primary">Nom *</label>
                <input
                  id="nom" v-model="nom" name="nom" type="text" required autocomplete="name"
                  class="w-full px-4 py-3 rounded-lg border border-border bg-bg text-primary text-[0.95rem] transition-colors focus:outline-none focus:border-accent"
                  placeholder="Votre nom"
                >
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="email" class="text-[0.85rem] font-semibold text-primary">Email *</label>
                <input
                  id="email" v-model="email" name="email" type="email" required autocomplete="email"
                  class="w-full px-4 py-3 rounded-lg border border-border bg-bg text-primary text-[0.95rem] transition-colors focus:outline-none focus:border-accent"
                  placeholder="votre@email.com"
                >
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[0.85rem] font-semibold text-primary">Votre demande porte sur</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="option in offreOptions"
                    :key="option"
                    type="button"
                    :class="['offre-pill px-4 py-2 rounded-full text-[0.85rem] font-medium border cursor-pointer transition-all', offre === option ? 'border-accent text-accent bg-accent/[0.08]' : 'border-border text-text-light bg-bg hover:border-accent hover:text-accent']"
                    @click="offre = option"
                  >{{ option }}</button>
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="message" class="text-[0.85rem] font-semibold text-primary">Message *</label>
                <textarea
                  id="message" v-model="message" name="message" required rows="5"
                  class="w-full px-4 py-3 rounded-lg border border-border bg-bg text-primary text-[0.95rem] transition-colors focus:outline-none focus:border-accent resize-y"
                  placeholder="Ce que vous souhaitez partager…"
                ></textarea>
              </div>

              <p v-if="formError" class="text-[0.85rem] text-red-500">{{ formError }}</p>

              <button
                type="submit"
                :disabled="submitting"
                class="w-full px-7 py-3.5 bg-primary text-white font-semibold rounded-lg border-0 cursor-pointer transition-all hover:bg-primary-light hover:-translate-y-0.5 text-[0.95rem] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >{{ submitting ? 'Envoi en cours…' : 'Envoyer le message' }}</button>

            </form>

            <!-- Message de succès -->
            <div v-else class="text-center py-8">
              <div class="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="font-heading text-[1.3rem] text-primary mb-2">Message envoyé</h3>
              <p class="text-[0.9rem] text-text-light">Je vous réponds sous 48h. À bientôt !</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- INFO COMPLÉMENTAIRES -->
  <section class="bg-white py-16 px-8">
    <div class="max-w-[1100px] mx-auto">
      <div class="flex flex-col md:flex-row gap-8 fade-in">

        <div class="flex-1 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-bg flex items-center justify-center shrink-0 mt-1">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <p class="text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-text-light mb-1">Email</p>
            <a href="mailto:mehdi@wadocoaching.com" class="text-[0.95rem] text-accent no-underline hover:text-primary-light transition-colors">mehdi@wadocoaching.com</a>
          </div>
        </div>

        <div class="flex-1 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-bg flex items-center justify-center shrink-0 mt-1">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-text-light mb-1">Localisation</p>
            <p class="text-[0.95rem] text-primary">France — Séances en visio ou présentiel</p>
          </div>
        </div>

        <div class="flex-1 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-bg flex items-center justify-center shrink-0 mt-1">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-text-light mb-1">Réponse</p>
            <p class="text-[0.95rem] text-primary">Sous 48h ouvrées</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

useHead({
  title: 'Contact | WadoCoaching',
  meta: [
    { name: 'description', content: 'Contactez Mehdi Soudsane — WadoCoaching. Une question sur les offres Ancrage, Ma-aï ou Bunkai ? Écrivez-moi ou réservez directement un échange de 30 minutes.' },
    { property: 'og:title', content: 'Contact | WadoCoaching' },
    { property: 'og:description', content: 'Une question ? Réservez un premier échange ou envoyez un message directement.' },
    { property: 'og:url', content: 'https://www.wadocoaching.com/contact/' },
  ],
})

const offreOptions = ['Ancrage', 'Ma-aï', 'Bunkai', 'Autre']

const nom = ref('')
const email = ref('')
const offre = ref('')
const message = ref('')
const submitting = ref(false)
const formError = ref('')
const formSuccess = ref(false)

async function submitForm(): Promise<void> {
  formError.value = ''

  if (!nom.value.trim() || !email.value.trim() || !message.value.trim()) {
    formError.value = 'Merci de remplir tous les champs obligatoires.'
    return
  }

  submitting.value = true

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: nom.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
        offre: offre.value || 'Non précisé',
      }),
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error((json as { error?: string }).error ?? 'Erreur inconnue')
    }

    formSuccess.value = true
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Une erreur est survenue.'
    formError.value = `${msg} Vous pouvez aussi écrire directement à mehdi@wadocoaching.com`
    submitting.value = false
  }
}
</script>
