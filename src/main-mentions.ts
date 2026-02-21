import { createApp } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import CookieBanner from './components/CookieBanner.vue'
import { initAnalytics } from './analytics.js'
import './style.css'

initAnalytics()

createApp(AppHeader, { prefix: '/' }).mount('#app-header')
createApp(AppFooter, { prefix: '/' }).mount('#app-footer')
createApp(CookieBanner).mount('#app-cookie')
