import { HStack, Icon, Link } from '@chakra-ui/react'
import { Header } from '@hivemq/ui-library'
import { ExternalLinkIcon, HelpCircleIcon } from 'lucide-react'

type HelpBadgeMenuItem = {
  title: string
  url?: string
}

// TODO: check on the `to` prop
export function HelpToolbar() {
  const menuItems = [
    {
      title: 'Documentation',
      url: 'https://docs.hivemq.com/hivemq/latest/control-center',
    },
    { title: 'Support', url: 'https://www.hivemq.com/support' },
    { title: 'Community', url: 'https://www.hivemq.com/community' },
    { title: 'Blog', url: 'https://www.hivemq.com/blog' },
  ] satisfies HelpBadgeMenuItem[]

  return (
    <Header.Menu overlayId="help">
      <Header.MenuButton aria-label={'Title'} icon={HelpCircleIcon} />

      <Header.MenuContent>
        <Header.MenuContentDetails fontSize="1.2rem" fontWeight="500">
          {'Title'}
        </Header.MenuContentDetails>
        {menuItems.map((menuItem) => (
          <Header.MenuContentItem
            title={menuItem.title}
            ariaLabel={menuItem.title}
            key={`help_toolbar_button_${menuItem.title}`}
          >
            <HStack justifyContent="space-between" width="100%" asChild>
              <Link target="_blank" href={menuItem.url || '#'}>
                <span>{menuItem.title}</span>
                <Icon as={ExternalLinkIcon} />
              </Link>
            </HStack>
          </Header.MenuContentItem>
        ))}
      </Header.MenuContent>
    </Header.Menu>
  )
}
