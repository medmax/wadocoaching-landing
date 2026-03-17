import { createApp } from 'vue'
import { createUnhead, headSymbol } from '@unhead/vue'
import App from './App.vue'
import { router } from './router'
import { initAnalytics } from './analytics.js'
import './style.css'

initAnalytics()

const app = createApp(App)
const head = createUnhead()

app.provide(headSymbol, head).use(router).mount('#app')
