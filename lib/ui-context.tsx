'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UIContextType {
  isCartSidebarOpen: boolean
  openCartSidebar: () => void
  closeCartSidebar: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)

  const openCartSidebar = () => setIsCartSidebarOpen(true)
  const closeCartSidebar = () => setIsCartSidebarOpen(false)

  return (
    <UIContext.Provider value={{ isCartSidebarOpen, openCartSidebar, closeCartSidebar }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
