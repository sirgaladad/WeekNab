import { DefineComponent } from 'vue'

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/components/home/HeroSection.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/components/home/FeaturesSection.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/components/home/CTASection.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/components/home/ShareSection.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/components/common/ShareSection.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{
    isModal?: boolean
    title?: string
    description?: string
  }, {}, any>
  export default component
}

declare module '@/components/budget/ActionButtons.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{
    budgetId: string
  }>
  export default component
}

declare module '@/components/budget/CategoryList.vue' {
  import { DefineComponent } from 'vue'
  import type { CategoryGroup } from 'ynab'
  const component: DefineComponent<{
    categories: CategoryGroup[]
  }>
  export default component
}

declare module '@/components/budget/RecentTransactions.vue' {
  import { DefineComponent } from 'vue'
  import type { TransactionDetail } from 'ynab'
  const component: DefineComponent<{
    transactions: TransactionDetail[]
  }>
  export default component
} 