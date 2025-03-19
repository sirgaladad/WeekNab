declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    FeaturesSection: typeof import('./components/home/FeaturesSection.vue')['default']
    SocialShare: typeof import('./components/common/SocialShare.vue')['default']
  }
}

export {} 