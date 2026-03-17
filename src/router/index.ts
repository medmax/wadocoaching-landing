import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',                         component: () => import('../pages/HomePage.vue') },
    { path: '/ancrage/',                  component: () => import('../pages/AncragePage.vue') },
    { path: '/ma-ai/',                    component: () => import('../pages/MaAiPage.vue') },
    { path: '/bunkai/',                   component: () => import('../pages/BunkaiPage.vue') },
    { path: '/qui-suis-je/',             component: () => import('../pages/QuiSuisJePage.vue') },
    { path: '/contact/',                  component: () => import('../pages/ContactPage.vue') },
    {
      path: '/ressources',
      component: () => import('../pages/RessourcesPage.vue'),
      children: [
        { path: '',      component: () => import('../components/BlogList.vue') },
        { path: ':slug', component: () => import('../components/BlogPost.vue'), props: true },
      ],
    },
    { path: '/mentions-legales',          component: () => import('../pages/MentionsLegalesPage.vue') },
    { path: '/politique-confidentialite', component: () => import('../pages/PolitiqueConfPage.vue') },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// GA4 SPA tracking
router.afterEach((to) => {
  if (typeof window !== 'undefined' && (window as any).gtag && (window as any).__ga_loaded) {
    ;(window as any).gtag('event', 'page_view', { page_path: to.fullPath })
  }
})
