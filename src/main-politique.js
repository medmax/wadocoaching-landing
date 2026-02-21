import { createApp } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import './style.css'

createApp(AppHeader, { prefix: '/' }).mount('#app-header')
createApp(AppFooter, { prefix: '/' }).mount('#app-footer')
