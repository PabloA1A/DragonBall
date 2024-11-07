import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
      meta: { requiresAuth: true }
    },
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

export default router
