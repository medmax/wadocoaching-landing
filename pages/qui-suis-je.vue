<template>
  <!-- PAGE HEADER -->
  <section class="bg-primary py-20 px-8">
    <div class="max-w-[1200px] mx-auto">
      <nav class="mb-8 fade-in">
        <a href="/" class="text-white/40 text-[0.85rem] no-underline hover:text-white/70 transition-colors">Accueil</a>
        <span class="text-white/25 mx-2">›</span>
        <span class="text-white/60 text-[0.85rem]">Qui suis-je</span>
      </nav>
      <div class="max-w-[700px] fade-in d1">
        <h1 class="font-heading text-[clamp(2.5rem,5vw,4rem)] text-white leading-[1.2] mb-6">Qui suis-je ?</h1>
        <p class="font-heading italic text-[1.2rem] text-white/80 leading-[1.65]">On ne choisit pas son coach par hasard. Le coaching, c'est avant tout une rencontre.</p>
      </div>
    </div>
  </section>

  <!-- PARCOURS -->
  <section class="bg-bg py-24 px-8">
    <div class="max-w-[1200px] mx-auto">

      <div class="about-grid-bg flex flex-col gap-16 mb-16">

        <div class="flex flex-col md:flex-row items-center gap-16 fade-in d1">
          <div class="shrink-0 w-full md:w-[300px] h-[280px] md:h-[380px] rounded-2xl overflow-hidden bg-border">
            <img src="/images/Photo1.jpg" alt="Mehdi Soudsane" class="w-full h-full object-cover block">
          </div>
          <div class="flex-1">
            <p class="text-[0.72rem] font-semibold uppercase tracking-[1.5px] text-accent mb-4">Le terrain</p>
            <p class="text-[1rem] text-primary leading-[1.85] mb-5">Quinze ans dans le secteur bancaire — d'abord à Londres et aux États-Unis, puis en France comme consultant en transformation digitale et manager. J'ai piloté des projets complexes, travaillé dans des environnements agiles, accompagné des équipes dans des contextes d'incertitude.</p>
            <p class="text-[1rem] text-primary leading-[1.85]">C'est sur le terrain que j'ai compris ce que le management demande vraiment : une posture, une présence, une capacité à tenir face à ce qu'on ne maîtrise pas — et le droit de ne pas avoir toutes les réponses. Cette conviction, je l'ai vécue avant de la mettre en mots. Elle est devenue le fondement de ma pratique de coach — depuis 2023.</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row-reverse items-center gap-16 fade-in d2">
          <div class="shrink-0 w-full md:w-[300px] h-[280px] md:h-[380px] rounded-2xl overflow-hidden bg-border">
            <img src="/images/Photo2.JPG" alt="Mehdi Soudsane" class="w-full h-full object-cover block">
          </div>
          <div class="flex-1">
            <p class="text-[0.72rem] font-semibold uppercase tracking-[1.5px] text-accent mb-4">La conviction</p>
            <p class="text-[1rem] text-primary leading-[1.85] mb-5">Mon travail repose sur une conviction simple : les ressources sont déjà là. Ce que je cherche, ce n'est pas apporter des réponses — c'est créer les conditions pour que les solutions émergent. Cela demande de l'écoute, de la confiance, et une relation suffisamment solide pour regarder ensemble ce qu'on ne voyait pas.</p>
            <p class="text-[1rem] text-primary leading-[1.85]">Les angles morts, les habitudes qui freinent, les ressorts qu'on n'avait pas identifiés — on les explore pas à pas, sans précipitation. J'accompagne des managers en prise de poste, des équipes en tension, des professionnels qui veulent changer quelque chose dans leur façon d'exercer. Chaque parcours est unique — mon intention reste la même : vous accompagner à définir et atteindre votre prochain cap.</p>
          </div>
        </div>

      </div>

      <!-- Pourquoi Wado -->
      <div class="about-wado-bg bg-primary rounded-[20px] px-14 py-12 fade-in">
        <h3 class="font-heading text-[1.75rem] text-white mb-10">Pourquoi Wado ?</h3>
        <div class="flex flex-col gap-8">

          <div class="flex items-start gap-5">
            <div class="shrink-0 w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center mt-1">
              <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3l14 9-14 9V3z"/>
              </svg>
            </div>
            <div>
              <p class="text-[0.75rem] font-semibold uppercase tracking-[1.5px] text-accent mb-2">Wado ryu — la voie de la paix</p>
              <p class="font-heading italic text-[1rem] text-white/80 leading-[1.85]">Wado vient du karaté — une discipline que j'ai pratiquée pendant plus de dix ans. Wado ryu : la voie de la paix. Non pas l'absence de difficulté, mais un esprit calme et clair capable de s'adapter à ce qui vient.</p>
            </div>
          </div>

          <div class="flex items-start gap-5">
            <div class="shrink-0 w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center mt-1">
              <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div>
              <p class="text-[0.75rem] font-semibold uppercase tracking-[1.5px] text-accent mb-2">GTD — l'esprit comme l'eau du lac</p>
              <p class="font-heading italic text-[1rem] text-white/80 leading-[1.85]">C'est aussi l'image que je retiens de la méthode GTD, que je pratique au quotidien — l'esprit comme l'eau du lac, toujours disponible et clair. D'où la goutte dans le logo.</p>
            </div>
          </div>

          <div class="flex items-start gap-5">
            <div class="shrink-0 w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center mt-1">
              <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
            <div>
              <p class="text-[0.75rem] font-semibold uppercase tracking-[1.5px] text-accent mb-2">W — les deux faces de l'avancée</p>
              <p class="font-heading italic text-[1rem] text-white/80 leading-[1.85]">Le W, c'est le M de mon prénom retourné : un rappel que l'accompagnement regarde les deux faces de ce qui vous permet d'avancer — vos forces et vos ressources, mais aussi vos freins et vos craintes.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>

  <!-- AVANT LE COACHING -->
  <section class="bg-white py-24 px-8">
    <div class="max-w-[1200px] mx-auto">

      <div class="text-center max-w-[640px] mx-auto mb-14 fade-in">
        <h2 class="font-heading text-[2.5rem] text-primary-light leading-[1.25]">Avant le coaching</h2>
        <p class="text-[1rem] text-text-light leading-[1.75] mt-4">Quinze ans, un fil conducteur : l'humain.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="bg-bg rounded-xl p-6 fade-in d1">
          <h3 class="font-heading text-[1.05rem] text-primary mb-2">Manager de Proximité</h3>
          <p class="text-[0.82rem] text-text-light leading-[1.7]">Accompagner des consultants en mission dans leur quotidien et leur évolution professionnelle.</p>
        </div>
        <div class="bg-bg rounded-xl p-6 fade-in d2">
          <h3 class="font-heading text-[1.05rem] text-primary mb-2">Directeur de Projets</h3>
          <p class="text-[0.82rem] text-text-light leading-[1.7]">Piloter des projets complexes : Copil, Copro, outillage, mise en place de nouvelles prestations.</p>
        </div>
        <div class="bg-bg rounded-xl p-6 fade-in d3">
          <h3 class="font-heading text-[1.05rem] text-primary mb-2">Chef de Projet</h3>
          <p class="text-[0.82rem] text-text-light leading-[1.7]">Coordonner acteurs métiers, techniques et prestataires pour livrer des solutions à valeur.</p>
        </div>
        <div class="bg-bg rounded-xl p-6 fade-in d1">
          <h3 class="font-heading text-[1.05rem] text-primary mb-2">Conseil</h3>
          <p class="text-[0.82rem] text-text-light leading-[1.7]">Définir des target operating models, benchmarker des solutions, structurer des processus opérationnels.</p>
        </div>
        <div class="bg-bg rounded-xl p-6 fade-in d2">
          <h3 class="font-heading text-[1.05rem] text-primary mb-2">Scrum Master</h3>
          <p class="text-[0.82rem] text-text-light leading-[1.7]">Déployer le framework Scrum et acculturer les équipes aux pratiques agiles et DevSecOps.</p>
        </div>
        <div class="bg-bg rounded-xl p-6 fade-in d3">
          <h3 class="font-heading text-[1.05rem] text-primary mb-2">Product Owner</h3>
          <p class="text-[0.82rem] text-text-light leading-[1.7]">Gérer des backlogs en gardant le cap sur la valeur délivrée aux utilisateurs.</p>
        </div>
        <div class="bg-bg rounded-xl p-6 fade-in d1">
          <h3 class="font-heading text-[1.05rem] text-primary mb-2">Software Analyst</h3>
          <p class="text-[0.82rem] text-text-light leading-[1.7]">Concevoir des solutions logicielles et les faire vivre avec des équipes de développement.</p>
        </div>
        <div class="bg-bg rounded-xl p-6 fade-in d2">
          <h3 class="font-heading text-[1.05rem] text-primary mb-2">Coach Agile</h3>
          <p class="text-[0.82rem] text-text-light leading-[1.7]">Faciliter des transformations agiles dans les organisations et accompagner les équipes dans leur montée en maturité.</p>
        </div>
      </div>

    </div>
  </section>

  <!-- MA COULEUR DE COACH -->
  <section class="bg-primary py-16 px-8">
    <div class="max-w-[700px] mx-auto text-center fade-in">
      <p class="text-[0.75rem] font-semibold uppercase tracking-[1.5px] text-accent mb-8">Ma couleur de coach</p>
      <blockquote class="font-heading italic text-[1.2rem] text-white/85 leading-[1.85] mb-10">
        « Je pratique avec calme et vais au rythme du coaché. J'ai énormément de respect et d'empathie pour vous — et une confiance absolue dans votre capacité à faire bouger les choses. »
      </blockquote>
      <div class="flex flex-wrap justify-center items-center gap-6">
        <img src="/images/BadgeICF.png" alt="Certification ACC · ICF" class="h-20 w-auto object-contain">
        <img src="/images/BadgeRNCP.png" alt="Certification RNCP Coach professionnel" class="h-20 w-auto object-contain">
      </div>
    </div>
  </section>

  <!-- VALEURS -->
  <section class="bg-white py-24 px-8">
    <div class="max-w-[1200px] mx-auto">

      <div class="text-center max-w-[640px] mx-auto mb-16 fade-in">
        <h2 class="font-heading text-[2.5rem] text-primary-light leading-[1.25]">Les valeurs de WadoCoaching</h2>
        <p class="text-[1rem] text-text-light leading-[1.75] mt-4">Mon accompagnement s'adapte à votre contexte et vos besoins — guidé par ces quatre engagements.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div class="bg-bg rounded-2xl p-8 fade-in d1">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
            <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <h3 class="font-heading text-[1.2rem] text-primary mb-3">Éthique</h3>
          <p class="text-[0.9rem] text-text-light leading-[1.75]">Certifié RNCP et ACC (ICF), en formation continue. La rigueur du cadre professionnel est une exigence, pas une option — pour vous comme pour moi.</p>
        </div>

        <div class="bg-bg rounded-2xl p-8 fade-in d2">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
            <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
            </svg>
          </div>
          <h3 class="font-heading text-[1.2rem] text-primary mb-3">Ressources</h3>
          <p class="text-[0.9rem] text-text-light leading-[1.75]">Vous avez déjà ce qu'il faut. Ensemble, nous explorons vos ressources, levons les points de blocage et créons les conditions pour passer à l'action avec confiance.</p>
        </div>

        <div class="bg-bg rounded-2xl p-8 fade-in d3">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
            <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <h3 class="font-heading text-[1.2rem] text-primary mb-3">Focus</h3>
          <p class="text-[0.9rem] text-text-light leading-[1.75]">Un coaching centré sur vos enjeux réels. Pas de dispersion — chaque séance avance vers ce qui compte pour vous, à votre rythme.</p>
        </div>

        <div class="bg-bg rounded-2xl p-8 fade-in d1">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
            <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="font-heading text-[1.2rem] text-primary mb-3">Accompagnement</h3>
          <p class="text-[0.9rem] text-text-light leading-[1.75]">Je parcours un bout de chemin avec vous dans un espace confidentiel, sûr, où les défis peuvent être explorés sans jugement — et où ce qui change, c'est vous.</p>
        </div>

      </div>

    </div>
  </section>

  <!-- CTA -->
  <section class="bg-bg py-20 px-8">
    <div class="max-w-[700px] mx-auto text-center fade-in">
      <h2 class="font-heading text-[2rem] text-primary leading-[1.3] mb-4">Un premier échange ?</h2>
      <p class="text-[1rem] text-text-light leading-[1.75] mb-8">30 minutes pour se découvrir, explorer votre situation et voir si l'accompagnement peut vous convenir.</p>
      <a href="#" class="inline-block px-8 py-4 bg-accent text-white font-semibold rounded-lg no-underline transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5" data-calendly-popup>Clarifions vos enjeux</a>
    </div>
  </section>
</template>

<script setup lang="ts">

useHead({
  title: 'Qui suis-je — Mehdi Soudsane | WadoCoaching',
  meta: [
    { name: 'description', content: 'Coach professionnel certifié ACC (ICF) et RNCP. Ingénieur, consultant, manager agile — 15 ans d\'expérience terrain avant le coaching. J\'accompagne managers et équipes depuis 2023.' },
    { property: 'og:title', content: 'Qui suis-je — Mehdi Soudsane | WadoCoaching' },
    { property: 'og:description', content: 'Coach certifié ACC (ICF). 200+ heures d\'accompagnement. Une pratique ancrée dans 15 ans d\'expérience terrain.' },
    { property: 'og:image', content: 'https://www.wadocoaching.com/images/Photo1.jpg' },
    { property: 'og:url', content: 'https://www.wadocoaching.com/qui-suis-je/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'https://www.wadocoaching.com/images/Photo1.jpg' },
  ],
})
</script>
