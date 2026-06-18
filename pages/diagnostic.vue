<template>
  <!-- ============================================================
       HERO
  ============================================================ -->
  <template v-if="step === 'hero'">
    <section class="bg-primary py-20 px-8">
      <div class="max-w-[1200px] mx-auto">
        <nav class="mb-8 fade-in">
          <a href="/" class="text-white/40 text-[0.85rem] no-underline hover:text-white/70 transition-colors">Accueil</a>
          <span class="text-white/25 mx-2">›</span>
          <span class="text-white/60 text-[0.85rem]">Diagnostic</span>
        </nav>
        <div class="max-w-[700px]">
          <span class="inline-block font-semibold text-[0.85rem] uppercase tracking-[2px] text-accent mb-4 fade-in">Auto-diagnostic</span>
          <h1 class="font-heading text-[clamp(2.5rem,5vw,4rem)] text-white leading-[1.2] mb-6 fade-in d1">
            Quel manager<br class="hidden md:block"> êtes-vous, vraiment ?
          </h1>
          <p class="text-[1.15rem] text-white/70 leading-[1.75] fade-in d1">
            Un auto-positionnement en 24 situations concrètes — pour identifier vos forces et vos prochains leviers.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-bg py-20 px-8">
      <div class="max-w-[1200px] mx-auto">
        <div class="max-w-[700px] fade-in">
          <p class="text-[1rem] text-primary leading-[1.85] mb-5">
            Ce diagnostic ne cherche pas à vous noter. Il vous propose une grille de lecture de votre pratique — sur des actes managériaux qui font la différence dans la relation avec vos collaborateurs.
          </p>
          <p class="text-[1rem] text-primary leading-[1.85] mb-5">
            Des situations tirées du terrain, avec en sortie, un profil visuel pour identifier où concentrer vos efforts.
          </p>
          <p class="text-[1rem] text-primary leading-[1.85] mb-10">
            Pour que les résultats vous soient utiles, répondez avec ce qui est vrai pour vous — pas avec ce que vous aimeriez qui soit vrai. Pas de bonne ou de mauvaise réponse, pas de jugement. La première réaction est souvent la plus juste.
          </p>
          <div class="flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-text-light mb-10">
            <span>~ 7 minutes</span>
            <span>·</span>
            <span>Résultat immédiat</span>
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5 cursor-pointer"
            @click="commencer"
          >
            Commencer le diagnostic →
          </button>
          <p class="mt-4 text-[0.8rem] text-text-light">
            Votre email vous sera demandé à la fin pour recevoir votre profil.
          </p>
        </div>
      </div>
    </section>
  </template>

  <!-- ============================================================
       QUESTIONNAIRE
  ============================================================ -->
  <div v-else-if="step === 'questionnaire'" class="bg-bg min-h-[calc(100vh-80px)] py-10 px-4 md:px-8">
    <div class="max-w-[720px] mx-auto mb-6">
      <div class="flex items-center justify-end text-[0.75rem] text-text-light mb-2">
        <span>{{ currentQ + 1 }} / {{ QUESTIONS.length }}</span>
      </div>
      <div class="w-full h-1 bg-border rounded-full overflow-hidden">
        <div
          class="h-full bg-accent rounded-full transition-all duration-300"
          :style="{ width: progress + '%' }"
        />
      </div>
    </div>

    <div class="max-w-[720px] mx-auto">
      <div class="bg-white rounded-2xl border border-border mb-6 overflow-hidden">
        <!-- Image de section -->
        <img
          :src="AXE_DISPLAY[question.axe].image"
          :alt="AXE_DISPLAY[question.axe].label"
          class="w-full h-44 md:h-52 object-cover"
        >

        <div class="p-6 md:p-10">
          <!-- Label de section -->
          <span class="inline-block text-[0.75rem] font-semibold uppercase tracking-[2px] text-accent mb-5">
            {{ AXE_DISPLAY[question.axe].label }}
          </span>

          <!-- Contexte -->
          <div v-if="question.contexte" class="border-l-2 border-accent bg-bg rounded-r-xl px-5 py-4 mb-8">
            <p class="text-[0.875rem] text-text-light italic leading-[1.8]">{{ question.contexte }}</p>
          </div>

          <!-- Énoncé -->
          <p class="font-heading text-[1.2rem] md:text-[1.35rem] text-primary leading-[1.55] mb-10">
            {{ question.enonce }}
          </p>

          <!-- Échelle -->
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="item in ECHELLE"
              :key="item.valeur"
              type="button"
              class="flex items-center justify-center py-4 px-2 rounded-xl border transition-all cursor-pointer text-center"
              :class="reponseActuelle === item.valeur
                ? 'bg-accent border-accent text-white'
                : 'border-border bg-white text-primary hover:border-accent hover:bg-accent/5'"
              @click="selectionner(item.valeur)"
            >
              <span class="font-medium text-[0.75rem] leading-tight text-center">
                {{ item.label }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="text-[0.875rem] text-text-light hover:text-primary transition-colors py-2 cursor-pointer"
          @click="precedent"
        >
          ← {{ currentQ === 0 ? 'Retour au début' : 'Précédente' }}
        </button>
        <button
          type="button"
          class="px-7 py-3.5 rounded-lg font-semibold text-[0.95rem] transition-all"
          :class="peutAvancer
            ? 'bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 cursor-pointer'
            : 'bg-border text-text-light cursor-not-allowed opacity-60'"
          :disabled="!peutAvancer"
          @click="suivant"
        >
          {{ currentQ === QUESTIONS.length - 1 ? 'Voir mes résultats' : 'Suivante →' }}
        </button>
      </div>
    </div>
  </div>

  <!-- ============================================================
       EMAIL
  ============================================================ -->
  <div v-else-if="step === 'email'" class="bg-bg min-h-[calc(100vh-80px)] flex items-center py-16 px-4 md:px-8">
    <div class="w-full max-w-[560px] mx-auto">
      <div class="bg-white rounded-2xl border border-border p-8 md:p-12">
        <span class="inline-block font-semibold text-[0.8rem] uppercase tracking-[2px] text-accent mb-5">Dernière étape</span>
        <h2 class="font-heading text-[2rem] text-primary leading-[1.25] mb-4">Recevez votre profil</h2>
        <p class="text-[0.95rem] text-text-light leading-[1.8] mb-8">
          Entrez votre email pour recevoir votre diagnostic complet et accéder à vos résultats — les 4 axes, vos scores et les pistes pour progresser.
        </p>

        <div class="flex flex-col gap-3">
          <input
            v-model="emailInput"
            type="email"
            placeholder="votre@email.com"
            autocomplete="email"
            class="w-full px-4 py-3.5 rounded-xl border border-border bg-bg text-primary text-[0.95rem] placeholder:text-text-light/60 focus:outline-none focus:border-accent transition-colors"
            :disabled="emailEnvoi"
            @keydown.enter="envoyerEmail"
          />

          <p v-if="emailErreur" class="text-[0.85rem] text-red-500 leading-[1.6]">{{ emailErreur }}</p>

          <button
            type="button"
            class="w-full py-4 rounded-xl font-semibold text-[0.95rem] transition-all"
            :class="emailEnvoi
              ? 'bg-border text-text-light cursor-not-allowed'
              : 'bg-accent text-white hover:bg-primary hover:-translate-y-0.5 cursor-pointer'"
            :disabled="emailEnvoi"
            @click="envoyerEmail"
          >
            {{ emailEnvoi ? 'Envoi en cours…' : 'Recevoir mon profil →' }}
          </button>
        </div>
      </div>

      <button
        type="button"
        class="mt-6 w-full text-[0.875rem] text-text-light hover:text-primary transition-colors py-2 cursor-pointer"
        @click="precedentDepuisEmail"
      >
        ← Revenir aux questions
      </button>
    </div>
  </div>

  <!-- ============================================================
       RÉSULTATS
  ============================================================ -->
  <template v-else>
    <!-- Header + intro -->
    <section class="bg-primary py-16 px-8">
      <div class="max-w-[1200px] mx-auto">
        <nav class="mb-8">
          <a href="/" class="text-white/40 text-[0.85rem] no-underline hover:text-white/70 transition-colors">Accueil</a>
          <span class="text-white/25 mx-2">›</span>
          <button type="button" class="text-white/40 text-[0.85rem] hover:text-white/70 transition-colors cursor-pointer" @click="recommencer">Diagnostic</button>
          <span class="text-white/25 mx-2">›</span>
          <span class="text-white/60 text-[0.85rem]">Résultats</span>
        </nav>
        <div class="max-w-[700px] fade-in d1">
          <span class="inline-block font-semibold text-[0.85rem] uppercase tracking-[2px] text-accent mb-4">Votre profil</span>
          <h1 class="font-heading text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.2] mb-6">
            Vos 4 piliers managériaux
          </h1>
          <p class="text-[1rem] text-white/70 leading-[1.85] mb-4">
            Voici votre profil tel que vous l'avez décrit. Chaque axe reflète la façon dont vous vous positionnez sur une dimension concrète de votre pratique — pas une vérité absolue, un point de départ.
          </p>
          <p class="text-[1rem] text-white/55 leading-[1.85]">
            Lisez-le sans chercher à vous corriger. Ce qui vous interpelle ou vous surprend est souvent plus utile que ce que vous confirme.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 1 : Radar -->
    <section class="bg-bg py-20 px-8">
      <div class="max-w-[700px] mx-auto text-center">
        <h2 class="font-heading text-[1.75rem] text-primary mb-6 fade-in">Vue d'ensemble</h2>
        <p class="text-[0.975rem] text-primary leading-[1.85] mb-12 fade-in d1 text-left">{{ profilMessage }}</p>
        <div class="flex justify-center fade-in d1">
          <div class="w-full max-w-[400px] px-6">
            <svg viewBox="0 0 320 320" class="w-full" style="overflow: visible" aria-label="Profil radar des 4 axes managériaux">
              <polygon v-for="pct in [25, 50, 75, 100]" :key="pct"
                :points="gridPolygon(pct)"
                fill="none" stroke="#E0E4E8" stroke-width="1"
              />
              <line v-for="(_, i) in AXES" :key="'axis-' + i"
                :x1="SVG_CX" :y1="SVG_CY"
                :x2="axePoint(i, SVG_R).x" :y2="axePoint(i, SVG_R).y"
                stroke="#E0E4E8" stroke-width="1"
              />
              <polygon
                :points="dataPolygon"
                fill="rgba(26,186,234,0.18)"
                stroke="#1ABAEA"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <circle v-for="(axe, i) in AXES" :key="'dot-' + i"
                :cx="axePoint(i, Math.max(3, (scores[axe] / 100) * SVG_R)).x"
                :cy="axePoint(i, Math.max(3, (scores[axe] / 100) * SVG_R)).y"
                r="5" fill="#1ABAEA"
              />
              <text x="160" y="34" text-anchor="middle" font-size="11" font-weight="500" fill="#152034" font-family="DM Sans, system-ui">Écoute active</text>
              <text x="284" y="164" text-anchor="start" font-size="11" font-weight="500" fill="#152034" font-family="DM Sans, system-ui">Feedback</text>
              <text x="160" y="297" text-anchor="middle" font-size="11" font-weight="500" fill="#152034" font-family="DM Sans, system-ui">Assertivité</text>
              <text x="36" y="164" text-anchor="end" font-size="11" font-weight="500" fill="#152034" font-family="DM Sans, system-ui">Autonomie</text>
              <text x="164" y="108" font-size="9" fill="#B0B8C5" font-family="DM Sans, system-ui">50</text>
              <text x="164" y="58" font-size="9" fill="#B0B8C5" font-family="DM Sans, system-ui">100</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2 : Force + Levier -->
    <section class="bg-primary py-20 px-8">
      <div class="max-w-[1100px] mx-auto">
        <div class="max-w-[700px] mx-auto mb-12 fade-in">
          <h2 class="font-heading text-[1.75rem] text-white mb-3">Ce qui se dégage</h2>
          <p class="text-[0.95rem] text-white/60 leading-[1.75]">
            {{ estReserré
              ? 'Vos axes sont proches les uns des autres — la différence entre force et levier se joue à peu de points, pas sur un contraste marqué.'
              : 'Votre score le plus élevé et celui qui offre le plus de marge de progression.' }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[700px] mx-auto">
          <div class="bg-white/5 border border-white/10 rounded-2xl p-7 fade-in d1">
            <p class="text-[0.72rem] font-semibold uppercase tracking-[1.5px] text-accent mb-3">
              {{ estReserré ? 'Axe le plus haut' : 'Votre force différenciante' }}
            </p>
            <h3 class="font-heading text-[1.5rem] text-white mb-3">{{ forceAxe }}</h3>
            <p class="text-[0.875rem] text-white/55 leading-[1.7] mb-5">
              {{ estReserré ? 'Légèrement devant les autres — un appui à confirmer.' : 'Un point d\'appui naturel dans votre pratique.' }}
            </p>
            <div class="flex items-center gap-3">
              <span class="text-[2.25rem] font-semibold text-accent font-heading leading-none">{{ scores[forceAxe] }}</span>
              <span class="text-[0.9rem] text-white/40">/100</span>
              <span :class="['ml-auto text-[0.72rem] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full', niveauClassDark(scores[forceAxe])]">
                {{ niveauLabel(scores[forceAxe]) }}
              </span>
            </div>
          </div>

          <div class="bg-accent/10 border border-accent/20 rounded-2xl p-7 fade-in d2">
            <p class="text-[0.72rem] font-semibold uppercase tracking-[1.5px] text-accent mb-3">
              {{ estReserré ? 'Axe le plus bas' : 'Votre prochain levier' }}
            </p>
            <h3 class="font-heading text-[1.5rem] text-white mb-3">{{ levierAxe }}</h3>
            <p class="text-[0.875rem] text-white/55 leading-[1.7] mb-5">
              {{ estReserré ? 'Légèrement en retrait — quelques points d\'écart, pas un chantier à part.' : 'L\'axe avec le plus de marge — et potentiellement le plus d\'impact.' }}
            </p>
            <div class="flex items-center gap-3">
              <span class="text-[2.25rem] font-semibold text-accent font-heading leading-none">{{ scores[levierAxe] }}</span>
              <span class="text-[0.9rem] text-white/40">/100</span>
              <span :class="['ml-auto text-[0.72rem] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full', niveauClassDark(scores[levierAxe])]">
                {{ niveauLabel(scores[levierAxe]) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 axes en détail -->
    <section class="bg-white py-16 px-8">
      <div class="max-w-[1100px] mx-auto">
        <h2 class="font-heading text-[2rem] text-primary mb-10 fade-in">Les 4 axes en détail</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(axe, i) in AXES"
            :key="axe"
            class="bg-bg rounded-2xl border border-border p-8 fade-in"
            :class="(['d1', 'd2', 'd3', 'd4'])[i]"
          >
            <div class="flex items-start justify-between mb-5">
              <div>
                <span class="font-heading text-[1.4rem] text-accent block leading-none mb-2">{{ String(i + 1).padStart(2, '0') }}</span>
                <h3 class="font-heading text-[1.15rem] text-primary leading-tight">{{ axe }}</h3>
              </div>
              <span :class="['shrink-0 ml-4 mt-1 text-[0.72rem] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full', niveauClass(scores[axe])]">
                {{ niveauLabel(scores[axe]) }}
              </span>
            </div>
            <div class="flex items-end gap-2 mb-4">
              <span class="text-[2.75rem] font-semibold text-primary font-heading leading-none">{{ scores[axe] }}</span>
              <span class="text-[0.9rem] text-text-light mb-1">/100</span>
            </div>
            <div class="w-full h-1.5 bg-border rounded-full mb-6">
              <div class="h-full bg-accent rounded-full" :style="{ width: scores[axe] + '%' }" />
            </div>
            <p class="text-[0.875rem] text-text-light leading-[1.8] italic">
              {{ RESTITUTION[axe][niveauLabel(scores[axe])] || 'Texte de restitution à venir.' }}
            </p>
            <div class="mt-5 pt-5 border-t border-border flex flex-col gap-3">
              <div
                v-for="(sdScore, sdName) in sousDimScores[axe]"
                :key="sdName"
                class="flex items-center gap-3"
              >
                <span class="text-[0.78rem] text-text-light leading-tight shrink-0" style="min-width:185px">{{ sdName }}</span>
                <div class="flex-1 h-1 bg-border rounded-full overflow-hidden">
                  <div class="h-full bg-accent/70 rounded-full" :style="{ width: sdScore + '%' }" />
                </div>
                <span class="text-[0.8rem] font-semibold text-primary w-7 text-right shrink-0">{{ sdScore }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-bg py-20 px-8">
      <div class="max-w-[700px] mx-auto text-center fade-in">
        <h2 class="font-heading text-[2rem] text-primary leading-[1.3] mb-4">Envie d'aller plus loin ?</h2>
        <p class="text-[1rem] text-text-light leading-[1.75] mb-8">
          Ce diagnostic est un point de départ. Les ateliers Bunkai permettent de travailler ces axes en pratique, avec votre équipe ou à titre individuel.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" data-calendly-popup
            class="inline-block px-8 py-4 bg-accent text-white font-semibold rounded-lg no-underline transition-all hover:bg-primary hover:-translate-y-0.5">
            En discuter avec Mehdi →
          </a>
          <button
            type="button"
            class="px-8 py-4 border border-border text-primary font-semibold rounded-lg transition-all hover:border-accent hover:-translate-y-0.5 cursor-pointer"
            @click="recommencer"
          >
            Refaire le diagnostic
          </button>
        </div>
      </div>
    </section>
  </template>
</template>

<script setup lang="ts">
const AXES = ['Écoute active', 'Culture du feedback', 'Assertivité', "Cultiver l'autonomie"] as const
type Axe = typeof AXES[number]
type Niveau = 'À explorer' | 'En chemin' | 'Solide' | 'Ancré'

const AXE_DISPLAY: Record<Axe, { label: string; image: string }> = {
  'Écoute active':        { label: 'Écouter activement',    image: '/diagnostic/Questionnaire_Ecoute_active.jpg' },
  'Culture du feedback':  { label: 'Cultiver le feedback',  image: '/diagnostic/Questionnaire_Feedback.jpg' },
  'Assertivité':          { label: "Oser l'assertivité",    image: '/diagnostic/Questionnaire_Assertivite.jpg' },
  "Cultiver l'autonomie": { label: "Favoriser l'autonomie", image: '/diagnostic/Questionnaire_Autonomie.jpg' },
}

const QUESTIONS = [
  { id: 'EA1', axe: 'Écoute active', sousDimension: "Laisser l'espace / présence", type: 'Scénario', sens: 'normal', contexte: "Un collaborateur vient me voir, visiblement contrarié, pour me parler d'un problème sur son projet.", enonce: "Je le laisse dérouler son explication jusqu'au bout, même quand je crois déjà avoir saisi de quoi il s'agit." },
  { id: 'EA2', axe: 'Écoute active', sousDimension: 'Capter et vérifier la compréhension', type: 'Mise en situation', sens: 'normal', contexte: "Un collaborateur m'expose un sujet sur lequel il attend mon point de vue.", enonce: "Avant de lui donner mon avis, je redis dans mes mots ce que j'ai compris de ce qu'il recherche." },
  { id: 'EA3', axe: 'Écoute active', sousDimension: 'Suspension du jugement', type: 'Affirmation', sens: 'inverse', contexte: '', enonce: "Quand on me raconte une situation, je me surprends à avoir déjà une opinion avant la fin du récit." },
  { id: 'EA4', axe: 'Écoute active', sousDimension: 'Capter et vérifier la compréhension', type: 'Mise en situation', sens: 'normal', contexte: "En réunion d'équipe ou en point individuel avec un collaborateur.", enonce: "Je me surprends à relever un décalage entre les mots d'un collaborateur et ce que dit son non-verbal — le ton, le regard, la posture, les silences." },
  { id: 'EA5', axe: 'Écoute active', sousDimension: "Laisser l'espace / présence", type: 'Affirmation', sens: 'inverse', contexte: '', enonce: "Quand je crois avoir compris, j'enchaîne sans toujours laisser la personne confirmer qu'on parle bien de la même chose." },
  { id: 'EA6', axe: 'Écoute active', sousDimension: 'Suspension du jugement', type: 'Mise en situation', sens: 'inverse', contexte: "Un collaborateur vient me parler d'une difficulté qu'il rencontre.", enonce: "Je passe assez vite en mode solution, avant d'avoir vraiment creusé ce qui se joue pour lui." },
  { id: 'FB1', axe: 'Culture du feedback', sousDimension: 'Gérer les retours à chaud et à froid', type: 'Scénario', sens: 'normal', contexte: "Un collaborateur compétent me rend un travail correct, mais en dessous de ce qu'il sait faire.", enonce: "Je lui en parle rapidement, plutôt que de laisser passer en me disant que c'est acceptable." },
  { id: 'FB2', axe: 'Culture du feedback', sousDimension: 'Qualité et complétude du feedback', type: 'Mise en situation', sens: 'normal', contexte: "Je dois faire un retour à un collaborateur sur quelque chose qui n'a pas bien fonctionné.", enonce: "Je lui expose les faits concrets sur lesquels je m'appuie, plutôt qu'une impression générale." },
  { id: 'FB3', axe: 'Culture du feedback', sousDimension: 'Qualité et complétude du feedback', type: 'Mise en situation', sens: 'normal', contexte: "Un de mes collaborateurs est performant : il atteint souvent ses objectifs, et les dépasse parfois.", enonce: "Je prends le temps de lui faire un retour pour souligner ce qu'il réussit, sans attendre qu'un problème survienne." },
  { id: 'FB4', axe: 'Culture du feedback', sousDimension: 'Demander et recevoir', type: 'Mise en situation', sens: 'normal', contexte: "Un collaborateur ou un collègue me fait un retour critique sur ma façon de faire.", enonce: "Je lui pose des questions pour creuser ce qu'il a observé, au lieu de répondre point par point." },
  { id: 'FB5', axe: 'Culture du feedback', sousDimension: 'Gérer les retours à chaud et à froid', type: 'Mise en situation', sens: 'inverse', contexte: "Un collaborateur fait quelque chose qui m'agace sur le moment.", enonce: "Je lui dis à chaud ce qui m'agace, sans distinguer ce qui doit se dire tout de suite de ce qui se dira mieux à froid." },
  { id: 'FB6', axe: 'Culture du feedback', sousDimension: 'Demander et recevoir', type: 'Mise en situation', sens: 'normal', contexte: "Je travaille depuis plusieurs mois avec la même équipe.", enonce: "Je leur demande comment ils perçoivent ma façon de manager ou de communiquer." },
  { id: 'AS1', axe: 'Assertivité', sousDimension: 'Poser ses limites et savoir dire non', type: 'Scénario', sens: 'normal', contexte: "Mon responsable m'ajoute un dossier urgent alors que ma charge est déjà pleine.", enonce: "Je lui dis que ça ne tiendra pas sans revoir les priorités, au lieu d'accepter et de me débrouiller." },
  { id: 'AS2', axe: 'Assertivité', sousDimension: 'Exprimer aisément son point de vue', type: 'Mise en situation', sens: 'normal', contexte: "En réunion, un sujet se discute et j'ai un avis qui n'a pas encore été exprimé.", enonce: "Je prends la parole pour le donner, plutôt que d'attendre qu'on me sollicite ou de le garder pour moi." },
  { id: 'AS3', axe: 'Assertivité', sousDimension: 'Expliciter ses demandes', type: 'Mise en situation', sens: 'normal', contexte: "Sur mon projet, j'avance bien, mais je commence à atteindre mes limites. Un collègue compétent ou plus disponible pourrait m'aider.", enonce: "Je vais le voir pour lui exprimer ma demande, plutôt que de continuer à pousser seul." },
  { id: 'AS4', axe: 'Assertivité', sousDimension: 'Expliciter ses demandes', type: 'Mise en situation', sens: 'normal', contexte: "Mon responsable me confie une mission, mais ce qu'il attend exactement n'est pas clair pour moi.", enonce: "Je lui demande de préciser ce qu'il attend, plutôt que de partir avec ma propre interprétation." },
  { id: 'AS5', axe: 'Assertivité', sousDimension: 'Poser ses limites et savoir dire non', type: 'Affirmation', sens: 'inverse', contexte: '', enonce: "Pour éviter un conflit, il m'arrive d'accepter des choses avec lesquelles je ne suis pas d'accord." },
  { id: 'AS6', axe: 'Assertivité', sousDimension: 'Exprimer aisément son point de vue', type: 'Mise en situation', sens: 'inverse', contexte: "Je ne suis pas d'accord et j'aurais un point de vue à exprimer, mais l'ambiance ne s'y prête pas vraiment.", enonce: "J'ai tendance à garder mon avis pour moi, en me disant que ce n'est pas le bon moment." },
  { id: 'AU1', axe: "Cultiver l'autonomie", sousDimension: 'Déléguer pour de vrai', type: 'Mise en situation', sens: 'normal', contexte: "Un sujet important et visible arrive dans mon périmètre — le genre que je pourrais piloter moi-même pour être sûr du résultat.", enonce: "J'en confie la responsabilité à un de mes collaborateurs, en le laissant le porter à sa façon." },
  { id: 'AU2', axe: "Cultiver l'autonomie", sousDimension: 'Faire confiance sans se désengager', type: 'Mise en situation', sens: 'normal', contexte: "J'ai confié un sujet à un collaborateur et il avance dessus.", enonce: "Je reste joignable s'il a besoin, sans aller vérifier de moi-même où il en est." },
  { id: 'AU3', axe: "Cultiver l'autonomie", sousDimension: "Droit à l'erreur et apprentissage", type: 'Mise en situation', sens: 'normal', contexte: "Un collaborateur prend une initiative qui se solde par une erreur, avec des conséquences concrètes.", enonce: "Ma première réaction est de regarder avec lui ce qu'on en apprend, plutôt que de chercher ce qui a coincé chez lui." },
  { id: 'AU4', axe: "Cultiver l'autonomie", sousDimension: "Droit à l'erreur et apprentissage", type: 'Scénario', sens: 'normal', contexte: "Un collaborateur vient me demander de valider une décision qu'il a tout à fait les moyens de prendre seul.", enonce: "Je le laisse décider, quitte à ce qu'il ne fasse pas exactement le choix que j'aurais fait." },
  { id: 'AU5', axe: "Cultiver l'autonomie", sousDimension: 'Déléguer pour de vrai', type: 'Mise en situation', sens: 'inverse', contexte: "J'ai délégué un sujet, mais le collaborateur s'y prend d'une façon différente de la mienne.", enonce: "J'ai tendance à reprendre la main pour le ramener vers la méthode qui me paraît la bonne." },
  { id: 'AU6', axe: "Cultiver l'autonomie", sousDimension: 'Faire confiance sans se désengager', type: 'Affirmation', sens: 'inverse', contexte: '', enonce: "J'ai besoin de savoir précisément où en est chaque dossier à tout moment." },
] as const

const ECHELLE = [
  { valeur: 1, label: 'Jamais' },
  { valeur: 2, label: 'Rarement' },
  { valeur: 3, label: 'Parfois' },
  { valeur: 4, label: 'Souvent' },
  { valeur: 5, label: 'Presque toujours' },
] as const

const SEUILS: { max: number; niveau: Niveau }[] = [
  { max: 39, niveau: 'À explorer' },
  { max: 59, niveau: 'En chemin' },
  { max: 79, niveau: 'Solide' },
  { max: 100, niveau: 'Ancré' },
]

const RESTITUTION: Record<Axe, Record<Niveau, string>> = {
  'Écoute active': {
    'À explorer': "La réponse arrive souvent avant que l'autre ait fini de dérouler. Vous comprenez vite, et c'est justement ce qui pousse à enchaîner — parfois avant que l'essentiel soit dit. C'est un terrain où un changement de rythme produit des effets rapides : laisser le silence, redire ce que vous avez compris avant de répondre.",
    'En chemin':   "Vous écoutez vraiment, mais l'attention se relâche dès que vous croyez voir où la personne veut en venir. Ça tient sur les sujets clairs, moins sur ceux qui demandent de creuser ou de capter ce qui n'est pas dit. La marge est là : tenir la présence aussi quand vous pensez avoir déjà compris.",
    'Solide':      "L'écoute est un appui : vous laissez l'espace, vous vérifiez votre compréhension, vous percevez souvent ce qui se joue sous les mots. Ce qui ferait la différence se joue dans les moments sous tension, là où le réflexe de répondre reprend la main. C'est ce cran-là qui reste à gagner.",
    'Ancré':       "Vous tenez la présence, vous captez le non-dit, vous laissez l'autre arriver au bout de sa pensée. Le seul point de vigilance est l'envers de cette qualité : écouter longuement peut retarder le moment de trancher ou de dire les choses. Une force le reste tant qu'elle ne freine pas l'action.",
  },
  'Culture du feedback': {
    'À explorer': "Le feedback reste rare, ou réservé aux moments où quelque chose ne va pas. Souvent parce qu'on se dit que le travail bien fait se voit de lui-même, et que le reste attendra. C'est un terrain où peu d'effort change beaucoup : dire ce qui marche, sur le moment, installe déjà une autre dynamique.",
    'En chemin':  "Vous donnez des retours, mais ils penchent vers ce qui coince, et arrivent parfois sous le coup de l'agacement. La matière est là, c'est le dosage qui se travaille : ancrer dans des faits, équilibrer ce qui marche et ce qui manque, distinguer ce qui se dit à chaud de ce qui se dira mieux à froid.",
    'Solide':     "Vos retours sont réguliers, factuels, et vous reconnaissez ce qui fonctionne sans attendre un problème. Ce qui reste à gagner se joue dans l'autre sens : demander comment vous êtes perçu, accueillir une critique sans la réfléchir point par point. Le feedback devient une circulation, pas seulement une émission.",
    'Ancré':      "Vous donnez et recevez le feedback avec la même aisance, à chaud quand il le faut, à froid quand c'est plus juste. Le point de vigilance est l'excès inverse : un feedback trop présent peut saturer, ou faire oublier que le silence aussi a sa place.",
  },
  'Assertivité': {
    'À explorer': "Dire non, poser une limite ou exprimer un avis qui détonne penche encore vers l'évitement. Souvent par souci de ne pas créer de friction — quitte à accepter ce qui ne tient pas, ou à garder pour soi ce qu'on pense. C'est un terrain à fort levier : une demande explicitée, un désaccord posé clairement, et la relation gagne en clarté plutôt qu'elle ne se tend.",
    'En chemin':  "Vous savez vous affirmer, mais cela dépend de l'interlocuteur : plus facile sur vos sujets, plus délicat face à un supérieur ou dans un groupe déjà aligné. Le mouvement est engagé ; il s'agit de le rendre moins dépendant des circonstances — dire ce dont vous avez besoin, poser votre point de vue sans attendre qu'on vous sollicite.",
    'Solide':     "Vous posez vos limites, vous formulez vos demandes, vous dites ce que vous pensez sans tourner autour. C'est un appui réel. Ce qui ferait la différence se joue dans les situations les plus coûteuses — le désaccord face au consensus, le non qui dérange — là où le réflexe d'arrondir peut reprendre la main.",
    'Ancré':      "Vous dites les choses avec clarté, vous tenez votre position, vous demandez sans détour. Le point de vigilance est l'envers : une assertivité tenue trop fermement peut fermer l'écoute ou couper court à ce que l'autre allait dire. S'affirmer reste juste tant que cela laisse de la place à la voix d'en face.",
  },
  "Cultiver l'autonomie": {
    'À explorer': "La main reste souvent sur les sujets, par souci du résultat plus que par méfiance. On délègue l'exécution, on garde la décision — et l'on finit par vouloir savoir où en est chaque dossier, tout le temps. C'est un terrain où lâcher un peu produit beaucoup : confier une vraie responsabilité, laisser une décision se prendre sans soi.",
    'En chemin':  "Vous déléguez, mais vous reprenez la main dès que c'est fait autrement que vous ne l'auriez fait. La confiance est là sur le principe, moins dans les moments où ça s'écarte de votre méthode. La marge : accepter que le chemin diffère du vôtre, et traiter l'erreur pour ce qu'elle apprend plutôt que pour ce qu'elle coûte.",
    'Solide':     "Vous confiez des sujets qui comptent, vous restez disponible sans surveiller, vous laissez décider. C'est un appui pour l'équipe comme pour vous. Ce qui reste à gagner se joue dans les cas à enjeu : quand le résultat compte vraiment, le réflexe de reprendre le contrôle peut encore se réveiller.",
    'Ancré':      "Vous déléguez pour de vrai, vous faites confiance sans disparaître, vous laissez l'erreur avoir sa place dans l'apprentissage. Le point de vigilance est l'envers de cette confiance : trop de lâcher peut ressembler à un désengagement, et certains ont besoin d'un cadre plus présent. L'autonomie se cultive, elle ne se décrète pas d'un bloc.",
  },
}

const AMPLITUDE_SEUIL = 15

const PROFILS: Record<string, string> = {
  'Équilibré haut':       "Vos quatre axes se tiennent à un niveau proche, et tous constituent des appuis. C'est un profil sans angle mort marqué : les nuances se jouent dans le détail de chaque axe, plus que dans un écart entre eux. À ce stade, l'enjeu est moins de combler que d'affiner.",
  'Terrain à explorer':   "Aucun de vos axes ne ressort encore comme un appui installé — et c'est un point de départ, pas un déficit. Ces quatre registres se renforcent à la pratique ; c'est précisément là où l'attention portée produit le plus d'effet. Le profil dit par où commencer, pas ce que vous valez.",
  'Équilibré médian/bas': "Vos quatre axes sont proches les uns des autres, sans point qui décroche ni qui domine nettement. C'est un profil homogène : pas un chantier isolé, mais une même marge répartie sur l'ensemble. La bonne nouvelle, c'est qu'avancer sur un axe nourrit souvent les autres.",
  'Socle dominant':       "Trois de vos axes forment un socle solide, et un seul ressort comme le terrain à investir. C'est un profil confortable à travailler : l'appui est large, et l'attention peut se concentrer sur un point précis plutôt que se disperser. C'est souvent là que le retour sur effort est le plus net.",
  'Profil en deux temps': "Votre profil se lit en deux temps : deux registres sur lesquels vous vous appuyez déjà, et deux que vous n'avez pas encore investis de la même façon. Ce n'est pas un déséquilibre à corriger — c'est une carte claire de là où poser votre attention en premier.",
  'Force pivot':          "Un axe se détache comme point d'appui, les autres restent à investir. Cette force n'est pas qu'un acquis à préserver : c'est le levier à partir duquel travailler le reste, parce qu'on avance plus sûrement en s'adossant à ce qu'on tient déjà. Le chantier est large, mais il a un point de départ.",
}

const SVG_CX = 160
const SVG_CY = 160
const SVG_R  = 100

type Step = 'hero' | 'questionnaire' | 'email' | 'resultats'
const step      = ref<Step>('hero')
const currentQ  = ref(0)
const reponses  = ref<Record<string, number>>({})

const emailInput  = ref('')
const emailEnvoi  = ref(false)
const emailErreur = ref('')

const question       = computed(() => QUESTIONS[currentQ.value])
const progress       = computed(() => (currentQ.value / QUESTIONS.length) * 100)
const reponseActuelle = computed<number | null>(() => reponses.value[question.value.id] ?? null)
const peutAvancer    = computed(() => reponseActuelle.value !== null)

async function commencer() {
  step.value = 'questionnaire'
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function suivant() {
  if (!peutAvancer.value) return
  if (currentQ.value < QUESTIONS.length - 1) {
    currentQ.value++
  } else {
    step.value = 'email'
  }
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function precedent() {
  if (currentQ.value > 0) {
    currentQ.value--
  } else {
    step.value = 'hero'
    await nextTick()
    window.dispatchEvent(new CustomEvent('ressources-loaded'))
  }
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function selectionner(v: number) {
  reponses.value[question.value.id] = v
}

async function envoyerEmail() {
  if (!emailInput.value.trim()) {
    emailErreur.value = 'Merci de renseigner votre email.'
    return
  }
  emailEnvoi.value = true
  emailErreur.value = ''
  try {
    await $fetch('/api/diagnostic', {
      method: 'POST',
      body: {
        email: emailInput.value.trim(),
        axes: AXES.map(axe => ({
          axe,
          score: scores.value[axe],
          niveau: niveauLabel(scores.value[axe]),
          restitution: RESTITUTION[axe][niveauLabel(scores.value[axe])],
          sousDimensions: sousDimScores.value[axe],
        })),
        forceAxe: forceAxe.value,
        levierAxe: levierAxe.value,
        profilMessage: profilMessage.value,
      },
    })
    step.value = 'resultats'
    await nextTick()
    window.dispatchEvent(new CustomEvent('ressources-loaded'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch {
    emailErreur.value = "L'envoi a échoué. Vérifiez votre email et réessayez."
  } finally {
    emailEnvoi.value = false
  }
}

async function precedentDepuisEmail() {
  step.value = 'questionnaire'
  currentQ.value = QUESTIONS.length - 1
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function recommencer() {
  reponses.value = {}
  currentQ.value = 0
  step.value = 'hero'
  await nextTick()
  window.dispatchEvent(new CustomEvent('ressources-loaded'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function niveauLabel(score: number): Niveau {
  return SEUILS.find(s => score <= s.max)?.niveau ?? 'Ancré'
}

const scores = computed(() =>
  Object.fromEntries(
    AXES.map(axe => {
      const items = QUESTIONS.filter(q => q.axe === axe)
      const brut  = items.reduce((sum, q) => {
        const r = reponses.value[q.id] ?? 0
        return sum + (q.sens === 'inverse' ? 6 - r : r)
      }, 0)
      return [axe, Math.min(100, Math.max(0, Math.round((brut - 6) / 24 * 100)))]
    }),
  ) as Record<Axe, number>,
)

const sousDimScores = computed(() => {
  const result = {} as Record<Axe, Record<string, number>>
  for (const axe of AXES) {
    result[axe] = {}
    const axeQs = QUESTIONS.filter(q => q.axe === axe)
    const dims = [...new Set(axeQs.map(q => q.sousDimension))]
    for (const dim of dims) {
      const qs = axeQs.filter(q => q.sousDimension === dim)
      const brut = qs.reduce((sum, q) => {
        const r = reponses.value[q.id] ?? 0
        return sum + (q.sens === 'inverse' ? 6 - r : r)
      }, 0)
      const n = qs.length
      result[axe][dim] = Math.min(100, Math.max(0, Math.round((brut - n) / (n * 4) * 100)))
    }
  }
  return result
})

const forceAxe  = computed<Axe>(() => [...AXES].reduce((a, b) => scores.value[a] >= scores.value[b] ? a : b) as Axe)
const levierAxe = computed<Axe>(() => [...AXES].reduce((a, b) => scores.value[a] <= scores.value[b] ? a : b) as Axe)

const estReserré = computed(() => {
  const vals = AXES.map(a => scores.value[a])
  return Math.max(...vals) - Math.min(...vals) <= AMPLITUDE_SEUIL
})

const profilMessage = computed(() => {
  const vals = AXES.map(a => scores.value[a])
  const nForces  = vals.filter(s => s >= 60).length
  const amplitude = Math.max(...vals) - Math.min(...vals)
  const moyenne  = vals.reduce((a, b) => a + b, 0) / vals.length
  let profil: string
  if (nForces === 4) profil = 'Équilibré haut'
  else if (nForces === 0) profil = 'Terrain à explorer'
  else if (amplitude <= AMPLITUDE_SEUIL) profil = moyenne >= 60 ? 'Équilibré haut' : 'Équilibré médian/bas'
  else if (nForces === 3) profil = 'Socle dominant'
  else if (nForces === 2) profil = 'Profil en deux temps'
  else profil = 'Force pivot'
  return PROFILS[profil]
})

function niveauClass(score: number): string {
  const n = niveauLabel(score)
  if (n === 'À explorer') return 'bg-border text-text-light'
  if (n === 'En chemin')  return 'bg-accent/10 text-primary-light'
  if (n === 'Solide')     return 'bg-primary-light/10 text-primary-light'
  return 'bg-accent/20 text-primary-light'
}

function niveauClassDark(score: number): string {
  const n = niveauLabel(score)
  if (n === 'À explorer') return 'bg-white/10 text-white/60'
  if (n === 'En chemin')  return 'bg-accent/20 text-accent'
  if (n === 'Solide')     return 'bg-accent/20 text-accent'
  return 'bg-accent text-primary'
}

function axePoint(idx: number, r: number) {
  const angle = (idx * 90 - 90) * Math.PI / 180
  return {
    x: +(SVG_CX + r * Math.cos(angle)).toFixed(2),
    y: +(SVG_CY + r * Math.sin(angle)).toFixed(2),
  }
}

function gridPolygon(pct: number): string {
  const r = (pct / 100) * SVG_R
  return AXES.map((_, i) => {
    const p = axePoint(i, r)
    return `${p.x},${p.y}`
  }).join(' ')
}

const dataPolygon = computed(() =>
  AXES.map((axe, i) => {
    const p = axePoint(i, (scores.value[axe] / 100) * SVG_R)
    return `${p.x},${p.y}`
  }).join(' '),
)

// Raccourcis clavier : 1-5 pour répondre, Entrée pour avancer
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

function onKey(e: KeyboardEvent) {
  if (step.value !== 'questionnaire') return
  const n = parseInt(e.key)
  if (n >= 1 && n <= 5) selectionner(n)
  if (e.key === 'Enter' && peutAvancer.value) suivant()
}

useHead({
  title: 'Diagnostic managérial | WadoCoaching',
  meta: [
    { name: 'description', content: "Un auto-positionnement en 24 situations concrètes — pour identifier vos forces et vos prochains leviers managériaux. Résultat immédiat." },
    { property: 'og:title', content: 'Diagnostic managérial | WadoCoaching' },
    { property: 'og:description', content: "24 situations tirées du terrain. Un profil visuel pour savoir où concentrer vos efforts." },
    { property: 'og:image', content: 'https://www.wadocoaching.com/images/coaching-manager.jpg' },
    { property: 'og:url', content: 'https://www.wadocoaching.com/diagnostic/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'https://www.wadocoaching.com/images/coaching-manager.jpg' },
  ],
})
</script>
