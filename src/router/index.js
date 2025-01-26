import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/order',
      children: [
        {
          path: '/travel',
          component: () => import('@/views/travel/TravelMannage.vue'),
          children: [
            {
              path: '/travel/tours',
              name: 'tours',
              component: () => import('@/views/travel/TravelMannage.vue')
            },
            {
              path: '/travel/sights',
              name: 'sights',
              component: () => import('@/views/travel/TravelMannage.vue')
            }
          ]
        },
        {
          path: '/order',
          component: () => import('@/views/order/OrderMannage.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
