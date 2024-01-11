export interface Navbar {
  module: string
  isActive: boolean
  childrenRoutes: {
    isActive: boolean
    name: string
    icon?: string
    route?: string
    action?: () => void
  }[]
}
