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
      component: Planets
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach( (to, from) => {

  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.userLogin.isAuthenticated) {
    return { name: 'login' }
  }

})

export default router
