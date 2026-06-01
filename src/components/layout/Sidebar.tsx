import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { BrandMark } from './BrandMark'
import './Sidebar.scss'

interface SidebarProps {
  isOpen?: boolean
  onNavigate?: () => void
}

type SidebarLink = {
  label: string
  to: string
  icon: string
}

type SidebarAction = {
  label: string
  icon: string
  to?: string
}

const overviewLinks: SidebarLink[] = [
  { label: 'Dashboard', to: '/dashboard', icon: '/home%201.png' },
]

const customerLinks: SidebarAction[] = [
  { label: 'Users', icon: '/user-friends%201.png', to: '/users' },
  { label: 'Guarantors', icon: '/user-check%201.png' },
  { label: 'Loans', icon: '/handshake-regular%201.png' },
  { label: 'Decision Models', icon: '/sliders-h%201.png' },
  { label: 'Savings', icon: '/piggy-bank%201.png' },
  { label: 'Loan Requests', icon: '/sack%201.png' },
  { label: 'Whitelist', icon: '/user-times%201.png' },
  { label: 'Karma', icon: '/user-cog%201.png' },
]

const businessLinks: SidebarAction[] = [
  { label: 'Organization', icon: '/briefcase%201.png' },
  { label: 'Loan Products', icon: '/briefcase%201%20(1).png' },
  { label: 'Savings Products', icon: '/piggy-bank%201.png' },
  { label: 'Fees and Charges', icon: '/badge-percent%201.png' },
  { label: 'Transactions', icon: '/scroll%201.png' },
  { label: 'Services', icon: '/galaxy%201.png' },
  { label: 'Service Account', icon: '/user-cog%201.png' },
  { label: 'Settlements', icon: '/coins-solid%201.png' },
  { label: 'Reports', icon: '/chart-bar%202.png' },
]

const settingsLinks: SidebarAction[] = [
  { label: 'Preferences', icon: '/sliders-h%201.png' },
  { label: 'Fees and Pricing', icon: '/badge-percent%201.png' },
  { label: 'Audit Logs', icon: '/clipboard-list%201.png' },
]

const renderNavLink = (link: SidebarLink, onNavigate?: () => void) => (
  <NavLink
    key={link.label}
    to={link.to}
    className={({ isActive }) =>
      ['sidebar__link', isActive ? 'sidebar__link--active' : ''].filter(Boolean).join(' ')
    }
    onClick={onNavigate}
  >
    <img className="sidebar__icon" src={link.icon} alt="" aria-hidden="true" />
    <span>{link.label}</span>
  </NavLink>
)

const renderActionLink = (link: SidebarAction, onNavigate?: () => void) =>
  link.to ? (
    <NavLink
      key={link.label}
      to={link.to}
      className={({ isActive }) =>
        ['sidebar__link', isActive ? 'sidebar__link--active' : ''].filter(Boolean).join(' ')
      }
      onClick={onNavigate}
    >
      <img className="sidebar__icon" src={link.icon} alt="" aria-hidden="true" />
      <span>{link.label}</span>
    </NavLink>
  ) : (
    <div key={link.label} className="sidebar__link sidebar__link--placeholder" role="presentation">
      <img className="sidebar__icon" src={link.icon} alt="" aria-hidden="true" />
      <span>{link.label}</span>
    </div>
  )

export const Sidebar = ({ isOpen = true, onNavigate }: SidebarProps) => (
  <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
    <div className="sidebar__brand">
      <BrandMark />
    </div>

    <nav className="sidebar__nav" aria-label="Main navigation">
      <div className="sidebar__section">
        <button type="button" className="sidebar__switcher">
          <img className="sidebar__switcher-icon" src="/briefcase%201.png" alt="" aria-hidden="true" />
          <span>Switch Organization</span>
          <ChevronDown className="sidebar__switcher-caret" aria-hidden="true" />
        </button>
        {overviewLinks.map((link) => renderNavLink(link, onNavigate))}
      </div>

      <div className="sidebar__section sidebar__section--muted">
        <span className="sidebar__group-label">Customers</span>
        {customerLinks.map((link) => renderActionLink(link, onNavigate))}
      </div>

      <div className="sidebar__section sidebar__section--muted">
        <span className="sidebar__group-label">Businesses</span>
        {businessLinks.map((link) => renderActionLink(link))}
      </div>

      <div className="sidebar__section sidebar__section--muted">
        <span className="sidebar__group-label">Settings</span>
        {settingsLinks.map((link) => renderActionLink(link))}
      </div>
    </nav>
  </aside>
)
