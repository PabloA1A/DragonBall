import { useAuthStore } from '@/stores/AuthStore'
import FavoriteView from '@/views/FavoriteView.vue'
import HomeView from '@/views/HomeView.vue'
import PlanetsView from '@/views/PlanetsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/planets',
      name: 'planets',
      component: PlanetsView
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView,
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach( (to, from) => {

  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.userLogin.isAuthenticated) {
    return { name: 'home' }
  }

})

export default router
