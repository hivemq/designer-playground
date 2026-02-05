import { Button, HStack, Image, Text } from '@chakra-ui/react'
import { Header } from '@hivemq/ui-library'
import { CircleUserIcon, LogOutIcon } from 'lucide-react'
import hivemqBeeNeg from '../assets/hivemq-bee-neg.svg'

export function UserToolbar() {
  const userEmail = ''

  return (
    <Header.Menu overlayId="user_menu">
      <Header.MenuButton aria-label={'Account'} icon={CircleUserIcon} />

      <Header.MenuContent>
        <Header.MenuContentDetails textAlign="center">
          <Image src={hivemqBeeNeg} display="inline-block" height="90px" mb={2} alt="HiveMQ Logo" />
          <Text fontSize="1.2rem">
            {'Hello'}{' '}
            <Text fontWeight={600} as="b">
              Happy Designer
            </Text>{' '}
            👋
          </Text>

          {userEmail && <p>{userEmail}</p>}
        </Header.MenuContentDetails>

        <Header.MenuContentItem
          ariaLabel="Logout"
          _hover={{
            background: 'destructive.400',
          }}
          _focusVisible={{
            background: 'destructive.400',
          }}
        >
          <HStack w="100%" justifyContent="space-between" asChild>
            <Button
              data-testid="logout-button"
              variant="plain"
              fontSize="md"
              color="white"
              onClick={(event) => {
                event.preventDefault()
              }}
            >
              <span>{'Logout'}</span>
              <LogOutIcon />
            </Button>
          </HStack>
        </Header.MenuContentItem>
      </Header.MenuContent>
    </Header.Menu>
  )
}
