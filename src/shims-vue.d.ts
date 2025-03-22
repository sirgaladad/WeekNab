/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-router' {
  import type { RouteRecordRaw } from 'vue-router'
  export * from 'vue-router'
  export interface Router {
    addRoute(parentName: string, route: RouteRecordRaw): void
    addRoute(route: RouteRecordRaw): void
    removeRoute(name: string): void
    hasRoute(name: string): boolean
    getRoutes(): RouteRecordRaw[]
  }
} 