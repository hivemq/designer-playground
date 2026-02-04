import { Text, VStack } from '@chakra-ui/react'
import { Header } from '@hivemq/ui-library'
import { SettingsIcon } from 'lucide-react'

export function SettingsToolbar() {
  return (
    <Header.Menu overlayId="user_settings">
      <Header.MenuButton aria-label="Settings" icon={SettingsIcon} />

      <Header.MenuContent>
        <Header.MenuContentDetails textAlign="center">
          <Text fontSize="1.2rem">Settings</Text>
        </Header.MenuContentDetails>

        <Header.MenuContentDetails>
          <VStack w="100%" justifyContent="space-between" alignItems="flex-start">
            <label htmlFor="dateFormatInput">Date</label>
          </VStack>
        </Header.MenuContentDetails>

        <Header.MenuContentDetails>
          Version
          <Text as="span" fontFamily="monospace">
            &nbsp;1.0.0
          </Text>
        </Header.MenuContentDetails>
      </Header.MenuContent>
    </Header.Menu>
  )
}
