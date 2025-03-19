import { createRouter, createWebHistory } from 'vue-router'
import { AuthService } from '@/services/auth.service'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/auth/TokenLogin.vue')
    },
    {
      path: '/budgets',
      name: 'budgets',
      component: () => import('@/views/BudgetsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/budgets/:id',
      name: 'budget-detail',
      component: () => import('@/views/BudgetDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/budgets/:id/weekly',
      name: 'weekly-budget',
      component: () => import('@/views/WeeklyBudgetView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/budgets/:id/transactions',
      name: 'transactions',
      component: () => import('@/views/TransactionsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/privacy-policy',
      name: 'privacy',
      component: () => import('@/views/PrivacyPolicy.vue')
    },
    {
      path: '/terms-of-use',
      name: 'terms',
      component: () => import('@/views/TermsOfUse.vue')
    }
  ]
})

// Navigation guard
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !AuthService.isAuthenticated()) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router