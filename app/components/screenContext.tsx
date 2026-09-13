"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ScreenContextValue = {
  screenCount: number
  activeScreen: number
  addScreen: () => void
  selectScreen: (screen: number) => void
  deleteScreen: (screen: number) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const ScreenContext = createContext<ScreenContextValue | null>(null)

export function ScreenProvider({ children }: { children: ReactNode }) {
  type ScreenState = { screenCount: number; activeScreen: number }
  const [present, setPresent] = useState<ScreenState>({ screenCount: 1, activeScreen: 1 })
  const [past, setPast] = useState<ScreenState[]>([])
  const [future, setFuture] = useState<ScreenState[]>([])

  const { screenCount, activeScreen } = present

  function commit(next: ScreenState) {
    setPast((current) => [...current, present])
    setPresent(next)
    setFuture([])
  }

  function addScreen() {
    const next = screenCount + 1
    commit({ screenCount: next, activeScreen: next })
  }

  function selectScreen(screen: number) {
    const next = Math.max(1, Math.min(screenCount, screen))
    if (next !== activeScreen) commit({ screenCount, activeScreen: next })
  }

  function deleteScreen(screen: number) {
    if (screenCount === 1) return
    const nextActive = Math.max(1, activeScreen === screen ? Math.min(screen - 1, screenCount - 1) : activeScreen > screen ? activeScreen - 1 : activeScreen)
    commit({ screenCount: screenCount - 1, activeScreen: nextActive })
  }

  function undo() {
    const previous = past[past.length - 1]
    if (!previous) return
    setPast((current) => current.slice(0, -1))
    setFuture((current) => [present, ...current])
    setPresent(previous)
  }

  function redo() {
    const next = future[0]
    if (!next) return
    setFuture((current) => current.slice(1))
    setPast((current) => [...current, present])
    setPresent(next)
  }

  return <ScreenContext.Provider value={{ screenCount, activeScreen, addScreen, selectScreen, deleteScreen, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0 }}>{children}</ScreenContext.Provider>
}

export function useScreens() {
  const context = useContext(ScreenContext)
  if (!context) throw new Error("useScreens must be used within ScreenProvider")
  return context
}
