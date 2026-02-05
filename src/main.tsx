import '@fontsource/raleway/400.css'
import '@fontsource/raleway/500.css'
import '@fontsource/raleway/600.css'
import '@fontsource/raleway/700.css'
import '@fontsource/raleway/800.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ColorModeProvider } from './color-mode'
import { OverlayTamerProvider } from './OverlaysTamerContext'
import { queryClient } from './queryClient'
import { router } from './router'
import { system as theme } from './theme'

// biome-ignore lint/style/noNonNullAssertion: #root is always present
const rootElement = document.getElementById('root')!

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider value={theme}>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <OverlayTamerProvider>
            <RouterProvider router={router} />
          </OverlayTamerProvider>
        </QueryClientProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
