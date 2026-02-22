import { createApp } from 'vue'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
import AppHeader    from './components/AppHeader.vue'
import AppFooter    from './components/AppFooter.vue'
import CookieBanner from './components/CookieBanner.vue'
import BlogList     from './components/BlogList.vue'
import BlogPost     from './components/BlogPost.vue'
import { initAnalytics } from './analytics.js'
import './style.css'

initAnalytics()

// Header / Footer / Cookie — même pattern que les autres pages
createApp(AppHeader, { prefix: '/' }).mount('#app-header')
createApp(AppFooter, { prefix: '/' }).mount('#app-footer')
createApp(CookieBanner).mount('#app-cookie')

// ── Vue Router SPA (section ressources) ──────────────────────────────────────
const router = createRouter({
  history: createWebHistory('/ressources'),
  routes: [
    { path: '/',      component: BlogList },
    { path: '/:slug', component: BlogPost, props: true },
  ],
})

// Tracking GA4 SPA navigation
router.afterEach((to) => {
  if (window.gtag && window.__ga_loaded) {
    window.gtag('event', 'page_view', {
      page_path: '/ressources' + to.fullPath,
    })
  }
})

createApp(RouterView)
  .use(router)
  .mount('#app-ressources')
