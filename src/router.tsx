import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SearchProvider } from './context/SearchContext'
import { FavoriteProvider } from './context/FavoriteContext'
import MainLayout from './layout/mainLayout'
import { Home } from './pages/home'

const RootLayout = () => (
  <SearchProvider>
    <FavoriteProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools initialIsOpen={false} />
    </FavoriteProvider>
  </SearchProvider>
)

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Rotas futuras: descomente e adicione o componente
// const favoritosRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/favoritos',
//   component: () => <div>Favoritos (em breve)</div>,
// })
// const topRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/top',
//   component: () => <div>Top Animes (em breve)</div>,
// })

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
