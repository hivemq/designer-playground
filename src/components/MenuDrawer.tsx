import {
  Button,
  CloseButton,
  Drawer,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  EyeIcon,
  MoreVerticalIcon,
  PowerIcon,
  RefreshCwIcon,
  SettingsIcon,
  Trash2Icon,
} from 'lucide-react'
import { useState } from 'react'
import { toaster } from '~/toaster'

type ClientActionsProps = {
  clientId: string
  status: 'connected' | 'disconnected'
}

export function ClientActions({ clientId, status }: ClientActionsProps) {
  const [open, setOpen] = useState(false)

  const menuItems = [
    {
      icon: EyeIcon,
      label: 'View Details',
      description: `View full details for ${clientId}`,
      toastType: 'info' as const,
      toastTitle: 'Client Details',
      toastDescription: `Opening details panel for ${clientId}`,
    },
    {
      icon: RefreshCwIcon,
      label: 'Refresh Connection',
      description: 'Force reconnect this client',
      toastType: 'success' as const,
      toastTitle: 'Connection Refreshed',
      toastDescription: `Client ${clientId} connection has been refreshed.`,
      disabled: status === 'disconnected',
    },
    {
      icon: PowerIcon,
      label: status === 'connected' ? 'Disconnect Client' : 'Reconnect Client',
      description: status === 'connected' ? 'Force disconnect this client' : 'Attempt to reconnect',
      toastType: status === 'connected' ? ('warning' as const) : ('success' as const),
      toastTitle: status === 'connected' ? 'Client Disconnected' : 'Reconnection Initiated',
      toastDescription:
        status === 'connected'
          ? `Client ${clientId} has been forcefully disconnected.`
          : `Attempting to reconnect ${clientId}...`,
    },
    {
      icon: SettingsIcon,
      label: 'Client Settings',
      description: 'Configure client-specific options',
      toastType: 'info' as const,
      toastTitle: 'Settings Opened',
      toastDescription: `Opening settings for ${clientId}`,
    },
    {
      icon: Trash2Icon,
      label: 'Remove Client',
      description: 'Remove client from broker',
      toastType: 'error' as const,
      toastTitle: 'Client Removed',
      toastDescription: `Client ${clientId} has been removed from the broker.`,
    },
  ]

  const handleMenuClick = (item: (typeof menuItems)[0]) => {
    if (item.disabled) {
      return
    }
    toaster.create({
      title: item.toastTitle,
      description: item.toastDescription,
      type: item.toastType,
      duration: 4000,
      meta: { closable: true },
    })
    setOpen(false)
  }

  return (
    <>
      <IconButton
        aria-label={`Actions for ${clientId}`}
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <MoreVerticalIcon size={16} />
      </IconButton>

      <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="end">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <HStack justify="space-between" w="100%">
                <VStack align="start" gap={0}>
                  <Heading size="md">Client Actions</Heading>
                  <Text fontSize="sm" color="fg.muted">
                    {clientId}
                  </Text>
                </VStack>
                <CloseButton onClick={() => setOpen(false)} />
              </HStack>
            </Drawer.Header>
            <Drawer.Body>
              <VStack align="stretch" gap={2}>
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    justifyContent="flex-start"
                    h="auto"
                    py={3}
                    onClick={() => handleMenuClick(item)}
                    disabled={item.disabled}
                    opacity={item.disabled ? 0.5 : 1}
                  >
                    <HStack gap={3} w="100%">
                      <item.icon size={20} />
                      <VStack align="start" gap={0}>
                        <Text fontWeight="medium">{item.label}</Text>
                        <Text fontSize="sm" color="fg.muted" fontWeight="normal">
                          {item.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Button>
                ))}
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  )
}
