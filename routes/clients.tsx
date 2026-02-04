import {
  Badge,
  Box,
  Card,
  Heading,
  HStack,
  IconButton,
  Input,
  NativeSelect,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react'
import { createRoute } from '@tanstack/react-router'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { ClientActions } from '~/components/MenuDrawer'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clients',
  component: ClientsComponent,
})

type Client = {
  id: string
  ip: string
  protocol: string
  connected: string
  status: 'connected' | 'disconnected'
  subscriptions: number
}

const clients: Client[] = [
  {
    id: 'sensor-001',
    ip: '192.168.1.101',
    protocol: 'MQTT 5.0',
    connected: '2024-01-15 10:23:45',
    status: 'connected',
    subscriptions: 3,
  },
  {
    id: 'gateway-12',
    ip: '192.168.1.50',
    protocol: 'MQTT 3.1.1',
    connected: '2024-01-15 08:12:30',
    status: 'connected',
    subscriptions: 12,
  },
  {
    id: 'device-xyz',
    ip: '192.168.1.203',
    protocol: 'MQTT 5.0',
    connected: '2024-01-14 22:45:00',
    status: 'disconnected',
    subscriptions: 0,
  },
  {
    id: 'app-mobile-42',
    ip: '10.0.0.55',
    protocol: 'MQTT 5.0',
    connected: '2024-01-15 09:30:15',
    status: 'connected',
    subscriptions: 5,
  },
  {
    id: 'sensor-003',
    ip: '192.168.1.105',
    protocol: 'MQTT 3.1.1',
    connected: '2024-01-15 11:00:00',
    status: 'connected',
    subscriptions: 2,
  },
  {
    id: 'iot-hub-main',
    ip: '192.168.1.1',
    protocol: 'MQTT 5.0',
    connected: '2024-01-10 00:00:00',
    status: 'connected',
    subscriptions: 48,
  },
  {
    id: 'thermostat-living',
    ip: '192.168.1.120',
    protocol: 'MQTT 5.0',
    connected: '2024-01-15 06:00:00',
    status: 'connected',
    subscriptions: 4,
  },
  {
    id: 'camera-front',
    ip: '192.168.1.130',
    protocol: 'MQTT 3.1.1',
    connected: '2024-01-14 18:30:00',
    status: 'connected',
    subscriptions: 2,
  },
  {
    id: 'doorbell-01',
    ip: '192.168.1.140',
    protocol: 'MQTT 5.0',
    connected: '2024-01-15 07:45:00',
    status: 'connected',
    subscriptions: 3,
  },
  {
    id: 'light-kitchen',
    ip: '192.168.1.150',
    protocol: 'MQTT 5.0',
    connected: '2024-01-13 12:00:00',
    status: 'disconnected',
    subscriptions: 0,
  },
  {
    id: 'sensor-humidity',
    ip: '192.168.1.160',
    protocol: 'MQTT 3.1.1',
    connected: '2024-01-15 09:00:00',
    status: 'connected',
    subscriptions: 1,
  },
  {
    id: 'gateway-backup',
    ip: '192.168.1.51',
    protocol: 'MQTT 5.0',
    connected: '2024-01-12 00:00:00',
    status: 'connected',
    subscriptions: 8,
  },
  {
    id: 'speaker-bedroom',
    ip: '192.168.1.170',
    protocol: 'MQTT 5.0',
    connected: '2024-01-15 08:00:00',
    status: 'connected',
    subscriptions: 2,
  },
  {
    id: 'lock-front',
    ip: '192.168.1.180',
    protocol: 'MQTT 5.0',
    connected: '2024-01-15 10:00:00',
    status: 'connected',
    subscriptions: 5,
  },
  {
    id: 'sensor-motion-01',
    ip: '192.168.1.190',
    protocol: 'MQTT 3.1.1',
    connected: '2024-01-14 20:00:00',
    status: 'disconnected',
    subscriptions: 0,
  },
]

function ClientsComponent() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns = useMemo<ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Client ID',
        cell: (info) => <Text fontWeight="medium">{info.getValue<string>()}</Text>,
      },
      {
        accessorKey: 'ip',
        header: 'IP Address',
        cell: (info) => <Text fontFamily="mono">{info.getValue<string>()}</Text>,
      },
      {
        accessorKey: 'protocol',
        header: 'Protocol',
      },
      {
        accessorKey: 'connected',
        header: 'Connected Since',
      },
      {
        accessorKey: 'subscriptions',
        header: 'Subscriptions',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue<string>()
          return <Badge colorPalette={status === 'connected' ? 'green' : 'red'}>{status}</Badge>
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: (info) => (
          <ClientActions clientId={info.row.original.id} status={info.row.original.status} />
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: clients,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const connectedCount = clients.filter((c) => c.status === 'connected').length

  return (
    <VStack gap={6} align="stretch" p={6}>
      <Box>
        <Heading size="lg" mb={2}>
          Clients
        </Heading>
        <Text color="fg.muted">
          Manage and monitor connected MQTT clients ({connectedCount} connected)
        </Text>
      </Box>

      <Card.Root>
        <Card.Header pb={4}>
          <HStack justify="space-between">
            <Input
              placeholder="Search clients..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              maxW="300px"
            />
            <Text color="fg.muted" fontSize="sm">
              {table.getFilteredRowModel().rows.length} of {clients.length} clients
            </Text>
          </HStack>
        </Card.Header>
        <Card.Body p={0}>
          <Table.Root size="sm">
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.ColumnHeader key={header.id}>
                      {header.isPlaceholder ? null : (
                        <HStack
                          gap={1}
                          cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                          onClick={header.column.getToggleSortingHandler()}
                          userSelect="none"
                        >
                          <Text>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </Text>
                          {header.column.getCanSort() && (
                            <IconButton aria-label="Sort" variant="ghost" size="2xs">
                              {header.column.getIsSorted() === 'asc' ? (
                                <ArrowUpIcon size={14} />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <ArrowDownIcon size={14} />
                              ) : (
                                <ArrowUpDownIcon size={14} />
                              )}
                            </IconButton>
                          )}
                        </HStack>
                      )}
                    </Table.ColumnHeader>
                  ))}
                </Table.Row>
              ))}
            </Table.Header>
            <Table.Body>
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Body>
        <Card.Footer pt={4}>
          <HStack justify="space-between" w="100%">
            <HStack gap={2}>
              <Text fontSize="sm" color="fg.muted">
                Rows per page:
              </Text>
              <NativeSelect.Root size="sm" w="auto">
                <NativeSelect.Field
                  value={pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
            </HStack>

            <HStack gap={2}>
              <Text fontSize="sm" color="fg.muted">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </Text>
              <HStack gap={1}>
                <IconButton
                  aria-label="First page"
                  variant="outline"
                  size="sm"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeftIcon size={16} />
                </IconButton>
                <IconButton
                  aria-label="Previous page"
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeftIcon size={16} />
                </IconButton>
                <IconButton
                  aria-label="Next page"
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRightIcon size={16} />
                </IconButton>
                <IconButton
                  aria-label="Last page"
                  variant="outline"
                  size="sm"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRightIcon size={16} />
                </IconButton>
              </HStack>
            </HStack>
          </HStack>
        </Card.Footer>
      </Card.Root>

      <HStack gap={4}>
        <Card.Root flex={1}>
          <Card.Header>
            <Heading size="sm">Protocol Distribution</Heading>
          </Card.Header>
          <Card.Body>
            <VStack align="stretch" gap={2}>
              <HStack justify="space-between">
                <Text>MQTT 5.0</Text>
                <Text fontWeight="bold">4 clients</Text>
              </HStack>
              <HStack justify="space-between">
                <Text>MQTT 3.1.1</Text>
                <Text fontWeight="bold">2 clients</Text>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root flex={1}>
          <Card.Header>
            <Heading size="sm">Connection Stats</Heading>
          </Card.Header>
          <Card.Body>
            <VStack align="stretch" gap={2}>
              <HStack justify="space-between">
                <Text>Total Subscriptions</Text>
                <Text fontWeight="bold">70</Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Avg. per Client</Text>
                <Text fontWeight="bold">11.7</Text>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      </HStack>
    </VStack>
  )
}
