import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import SettingsView from '@/views/SettingsView.vue'
import WelcomeView from '@/views/WelcomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router
