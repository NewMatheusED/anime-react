import { useEffect } from 'react'
import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import MainLayout from './layout/mainLayout'
import Home from './pages/home'
import Favorites from './pages/favorites'
import Top from './pages/top'
import AnimeDetail from './pages/animeDetail'

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => {
    let cancelled = false
    const id1 = requestAnimationFrame(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (!cancelled) window.scrollTo(0, 0)
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(id1)
    }
  }, [pathname])
  return null
}

const RootLayout = () => (
  <>
    <ScrollToTop />
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

const animeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/anime/$id',
  component: AnimeDetail,
})

const routeTree = rootRoute.addChildren([indexRoute, favoritesRoute, topRoute, animeDetailRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
