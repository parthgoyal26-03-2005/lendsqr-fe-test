import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'
import './AppLayout.scss'

type AppLayoutContextValue = {
  isMobile: boolean
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const AppLayoutContext = createContext<AppLayoutContextValue | null>(null)

export const useAppLayout = () => {
  const context = useContext(AppLayoutContext)

  if (!context) {
    throw new Error('useAppLayout must be used within AppLayout')
  }

  return context
}

const mobileQuery = '(max-width: 767px)'

const isMobileViewport = () => (typeof window !== 'undefined' ? window.matchMedia(mobileQuery).matches : false)

export const AppLayout = () => {
  const [isMobile, setIsMobile] = useState(isMobileViewport)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => !isMobileViewport())

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mobileQuery)

    const updateLayoutState = () => {
      const matches = mediaQueryList.matches
      setIsMobile(matches)
      setIsSidebarOpen(!matches)
    }

    updateLayoutState()
    mediaQueryList.addEventListener('change', updateLayoutState)

    return () => mediaQueryList.removeEventListener('change', updateLayoutState)
  }, [])

  const value = useMemo(
    () => ({
      isMobile,
      isSidebarOpen,
      toggleSidebar: () => setIsSidebarOpen((current) => !current),
    }),
    [isMobile, isSidebarOpen],
  )

  return (
    <AppLayoutContext.Provider value={value}>
      <div className="app-shell">
        <Sidebar isOpen={isSidebarOpen} onNavigate={() => setIsSidebarOpen(false)} />
        {isMobile && isSidebarOpen ? (
          <button
            type="button"
            className="app-shell__backdrop"
            aria-label="Close navigation menu"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </AppLayoutContext.Provider>
  )
}
