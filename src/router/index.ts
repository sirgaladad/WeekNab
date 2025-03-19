import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import WeeklyBudgetView from '@/views/WeeklyBudgetView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import DemoView from '@/views/DemoView.vue'
import TermsOfService from '@/views/TermsOfService.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import UserPreferences from '@/components/user/UserPreferences.vue'
import TestConnection from '@/components/TestConnection.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        // If coming from home's "Get Started", force token input
        if (from.name === 'home') {
          authStore.clearToken()
        }
        next()
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (!authStore.isAuthenticated) {
          next({ name: 'demo' })
        } else {
          next()
        }
      },
      children: [
        {
          path: '',
          name: 'dashboard-overview',
          redirect: '/dashboard/weekly'
        },
        {
          path: 'weekly',
          name: 'weekly-budget',
          component: WeeklyBudgetView,
          meta: { requiresAuth: true }
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: TransactionsView,
          meta: { requiresAuth: true }
        },
        {
          path: 'preferences',
          name: 'preferences',
          component: UserPreferences,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/demo',
      name: 'demo',
      component: DemoView
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsOfService
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPolicy
    },
    {
      path: '/test-connection',
      name: 'test-connection',
      component: TestConnection
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.checkAuth()

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Store the intended destination
    authStore.setRedirectPath(to.fullPath)
    // Always redirect to login first
    next({ name: 'login' })
    return
  }

  // If user is authenticated and trying to access login
  if (isAuthenticated && to.name === 'login') {
    next({ name: 'dashboard' })
    return
  }

  next()
})

export default router 