import { createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from './routes/__root'
import { Route as clientsRoute } from './routes/clients'
import { Route as indexRoute } from './routes/index'

const routeTree = rootRoute.addChildren([indexRoute, clientsRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
