import { HStack, Text, VStack } from '@chakra-ui/react'
import { Content, Header, Shell, Sidebar } from '@hivemq/ui-library'
import { Link, useRouterState } from '@tanstack/react-router'
import hivemqBeeNeg from './assets/hivemq-bee-neg.svg'
import { ColorModeButton } from './color-mode'
import { Toaster } from './toaster'
import { HelpToolbar } from './toolbar/HelpToolbar'
import { SettingsToolbar } from './toolbar/SettingsToolbar'
import { UserToolbar } from './toolbar/UserToolbar'

type PageContainerProps = {
  children: React.ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <Shell.Root isSidebarOpen={true} sidebarWidth="220px">
      <Header.Root>
        <HStack gap={0} overflow="hidden">
          <Header.SidebarToggle />
          <Link to="/">
            <Header.Logo src={hivemqBeeNeg} alt="HiveMQ Logo" title="Designer Playground" pl={1} pr={4} />
          </Link>
        </HStack>

        <HStack
          flexGrow={2}
          alignItems="center"
          justifyContent="end"
          mr={4}
          className="ui-shell-toolbar"
        >
          <ColorModeButton />
          <HelpToolbar />
          <SettingsToolbar />
          <UserToolbar />
        </HStack>
      </Header.Root>

      <Sidebar.Root gap={4} pt={8}>
        <Sidebar.Group Title={'Main'}>
          <Sidebar.List>
            <Sidebar.ListItem isActive={currentPath === '/'} asChild>
              <Link to="/">Dashboard</Link>
            </Sidebar.ListItem>
            <Sidebar.ListItem isActive={currentPath === '/clients'} asChild>
              <Link to="/clients">Clients</Link>
            </Sidebar.ListItem>
          </Sidebar.List>
        </Sidebar.Group>
        <Sidebar.Separator />

        <VStack flexGrow={2} justifyContent="end" pt={4}>
          <HStack justifyContent="space-around" gap={2} fontSize="sm">
            <Text m={0} color="secondary.500">
              Designer Playground
            </Text>
          </HStack>
        </VStack>
      </Sidebar.Root>

      <Content.Root id="main-root-window">
        {children}
        <Toaster />
      </Content.Root>
    </Shell.Root>
  )
}
