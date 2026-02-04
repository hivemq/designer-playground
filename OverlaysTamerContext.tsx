import { createContext, useState } from 'react'

export type OverlayTamerProviderValue = {
  overlayId: string | undefined
  setOverlayId: (overlayId?: string) => void
}

export const OverlayTamerContext = createContext<OverlayTamerProviderValue>({
  overlayId: undefined,
  setOverlayId: () => {},
})

type OverlayTamerProviderProps = {
  children?: React.ReactNode
}

export const OverlayTamerProvider: React.FC<OverlayTamerProviderProps> = ({ children }) => {
  const [overlayId, setOverlayId] = useState<string>()
  return (
    <OverlayTamerContext.Provider
      value={{
        overlayId,
        setOverlayId: (newOverlayId?: string) => {
          setOverlayId(newOverlayId || undefined)
        },
      }}
    >
      {children}
    </OverlayTamerContext.Provider>
  )
}
