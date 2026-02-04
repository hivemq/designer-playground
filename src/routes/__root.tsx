import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { PageContainer } from '~/PageContainer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <PageContainer>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </PageContainer>
  )
}
