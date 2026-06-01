import { Menu, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAuthSession } from '../../utils/storage'
import { useAppLayout } from '../../layouts/AppLayout'
import './Topbar.scss'

interface TopbarProps {
  title?: string
  subtitle?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  userName?: string
}

export const Topbar = ({ title, subtitle, searchValue, onSearchChange, userName = 'Adedeji' }: TopbarProps) => {
  const navigate = useNavigate()
  const { isMobile, isSidebarOpen, toggleSidebar } = useAppLayout()
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const profileButtonRef = useRef<HTMLButtonElement>(null)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const handleLogout = (): void => {
    clearAuthSession()
    navigate('/')
  }

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false)
        profileButtonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    document.addEventListener('keydown', handleDocumentKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }
  }, [])

  return (
    <header className="topbar">
      <div className="topbar__left">
        {isMobile ? (
          <button
            type="button"
            className="topbar__menu-button"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        ) : null}

        {title ? (
          <div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
        ) : null}

        {typeof searchValue === 'string' && onSearchChange ? (
          <label className="topbar__search" aria-label="Search users">
            <input
              type="search"
              placeholder="Search for anything"
              aria-label="Search for anything"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <button type="button" className="topbar__search-button" aria-label="Search">
              <Search aria-hidden="true" />
            </button>
          </label>
        ) : null}
      </div>

      <div className="topbar__actions">
        <a href="#" className="topbar__docs" onClick={(event) => event.preventDefault()}>
          Docs
        </a>

        <button type="button" className="topbar__icon-button" aria-label="Notifications">
          <img src="/users_dashboard/np_notification_2425223_000000%201.png" alt="" aria-hidden="true" />
        </button>

        <div className="topbar__profile" ref={profileMenuRef}>
          <button
            type="button"
            className="topbar__profile-button"
            ref={profileButtonRef}
            onClick={() => setIsProfileMenuOpen((current) => !current)}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
          >
            <img className="topbar__profile-avatar" src="/users_dashboard/userimage.png" alt="" aria-hidden="true" />
            <span className="topbar__profile-name">{userName}</span>
            <img className="topbar__profile-caret" src="/users_dashboard/userprofiledownarrow.png" alt="" aria-hidden="true" />
          </button>

          {isProfileMenuOpen ? (
            <div className="topbar__profile-menu" role="menu">
              <button type="button" onClick={handleLogout} role="menuitem">
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
