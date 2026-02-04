import { Badge, Box, Card, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
})

const stats = [
  { label: 'Connected Clients', value: '12,847', change: '+12%' },
  { label: 'Messages/sec', value: '45,231', change: '+8%' },
  { label: 'Topics', value: '1,284', change: '+3%' },
  { label: 'Subscriptions', value: '38,492', change: '+15%' },
]

const recentEvents = [
  { id: 1, type: 'connect', client: 'sensor-001', time: '2 min ago' },
  { id: 2, type: 'publish', client: 'gateway-12', time: '5 min ago' },
  { id: 3, type: 'disconnect', client: 'device-xyz', time: '8 min ago' },
  { id: 4, type: 'subscribe', client: 'app-mobile-42', time: '12 min ago' },
  { id: 5, type: 'publish', client: 'sensor-003', time: '15 min ago' },
]

function IndexComponent() {
  return (
    <VStack gap={6} align="stretch" p={6}>
      <Box>
        <Heading size="lg" mb={2}>
          Dashboard
        </Heading>
        <Text color="fg.muted">Overview of your MQTT broker activity</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
        {stats.map((stat) => (
          <Card.Root key={stat.label}>
            <Card.Body>
              <Text color="fg.muted" fontSize="sm">
                {stat.label}
              </Text>
              <HStack justify="space-between" mt={2}>
                <Text fontSize="2xl" fontWeight="bold">
                  {stat.value}
                </Text>
                <Badge colorPalette="green">{stat.change}</Badge>
              </HStack>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>

      <Card.Root>
        <Card.Header>
          <Heading size="md">Recent Events</Heading>
        </Card.Header>
        <Card.Body>
          <VStack align="stretch" gap={3}>
            {recentEvents.map((event) => (
              <HStack key={event.id} justify="space-between" py={2} borderBottomWidth="1px">
                <HStack gap={3}>
                  <Badge
                    colorPalette={
                      event.type === 'connect'
                        ? 'green'
                        : event.type === 'disconnect'
                          ? 'red'
                          : 'blue'
                    }
                  >
                    {event.type}
                  </Badge>
                  <Text fontWeight="medium">{event.client}</Text>
                </HStack>
                <Text color="fg.muted" fontSize="sm">
                  {event.time}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}
