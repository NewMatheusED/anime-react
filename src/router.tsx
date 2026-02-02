import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import MainLayout from './layout/mainLayout'
import Home from './pages/home'
import Favorites from './pages/favorites'
import Top from './pages/top'

const RootLayout = () => (
  <>
    <MainLayout>
      <Outlet />
    </MainLayout>
    <TanStackRouterDevtools initialIsOpen={false} />
  </>
)

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/favoritos',
  component: Favorites,
})

const topRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/top',
  component: Top,
})

const routeTree = rootRoute.addChildren([indexRoute, favoritesRoute, topRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
