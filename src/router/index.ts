import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import SettingsView from '@/views/SettingsView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import HistoryView from '@/views/HistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/home',
      name: 'main',
      component: MainView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    }
  ]
})

export default router
