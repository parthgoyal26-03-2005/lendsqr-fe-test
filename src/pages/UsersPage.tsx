import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Slash, UserCheck } from 'lucide-react'
import { DataTable, type TableColumn } from '../components/common/DataTable'
import { EmptyView, ErrorView, LoadingView } from '../components/common/StateView'
import { Pagination } from '../components/common/Pagination'
import { InputField, SelectField } from '../components/common/Field'
import { MetricCard } from '../components/common/MetricCard'
import { StatusPill } from '../components/common/StatusPill'
import { Topbar } from '../components/layout/Topbar'
import { useUsers } from '../hooks/useUsers'
import { formatCompactNumber, formatDate } from '../utils/formatters'
import { createDefaultUserFilters, filterUsers, paginateUsers, type UserFilters } from '../utils/users'
import { saveSelectedUser } from '../utils/storage'
import './UsersPage.scss'

const pageSize = 10

const metricCards = [
  {
    label: 'Users',
    value: '2,453',
    note: 'All users on the platform',
    accent: 'pink' as const,
    iconSrc: '/users_dashboard/icon%20(1).png',
    iconAlt: 'Users metric icon',
  },
  {
    label: 'Active users',
    value: '2,453',
    note: 'Users active on the platform',
    accent: 'blue' as const,
    iconSrc: '/users_dashboard/icon.png',
    iconAlt: 'Active users metric icon',
  },
  {
    label: 'Users with loans',
    value: '12,453',
    note: 'Users with loans on the platform',
    accent: 'amber' as const,
    iconSrc: '/users_dashboard/icon%20(2).png',
    iconAlt: 'Users with loans metric icon',
  },
  {
    label: 'Users with savings',
    value: '102,453',
    note: 'Users with savings on the platform',
    accent: 'green' as const,
    iconSrc: '/users_dashboard/icon%20(3).png',
    iconAlt: 'Users with savings metric icon',
  },
]

export const UsersPage = () => {
  const navigate = useNavigate()
  const { users, loading, error, reload } = useUsers()
  const tableShellRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<UserFilters>(() => createDefaultUserFilters())
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeRowMenuId, setActiveRowMenuId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const organizationOptions = useMemo(() => Array.from(new Set(users.map((user) => user.organization))).slice(0, 20), [users])

  const filteredUsers = useMemo(() => filterUsers(users, { ...filters, search }), [users, filters, search])

  const paginatedUsers = useMemo(() => paginateUsers(filteredUsers, currentPage, pageSize), [filteredUsers, currentPage])
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize))

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filters])

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (tableShellRef.current && !tableShellRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
        setActiveRowMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)

    return () => document.removeEventListener('mousedown', handleDocumentClick)
  }, [])

  const openFilterPanel = (): void => {
    setIsFilterOpen((current) => !current)
    setActiveRowMenuId(null)
  }

  const handleRowClick = (user: (typeof paginatedUsers)[number]): void => {
    saveSelectedUser(user)
    navigate(`/users/${user.id}`)
  }

  const handleViewDetails = (user: (typeof paginatedUsers)[number]): void => {
    saveSelectedUser(user)
    setActiveRowMenuId(null)
    navigate(`/users/${user.id}`)
  }

  const resetFilters = (): void => {
    setSearch('')
    setFilters(createDefaultUserFilters())
    setCurrentPage(1)
    setIsFilterOpen(false)
  }

  const headerFilterAction = (
    <button type="button" className="users-page__header-filter" aria-label="Open table filters" onClick={openFilterPanel}>
      <img src="/users_dashboard/Vector.png" alt="" aria-hidden="true" />
    </button>
  )

  const columns: Array<TableColumn<(typeof paginatedUsers)[number]>> = [
    {
      header: 'User',
      width: '220px',
      headerAction: headerFilterAction,
      render: (user) => (
        <div className="users-page__user">
          <strong>{user.fullName}</strong>
          <span>{user.username}</span>
        </div>
      ),
    },
    {
      header: 'Organization',
      headerAction: headerFilterAction,
      render: (user) => user.organization,
    },
    {
      header: 'Email',
      headerAction: headerFilterAction,
      render: (user) => user.email,
    },
    {
      header: 'Phone Number',
      headerAction: headerFilterAction,
      render: (user) => user.phoneNumber,
    },
    {
      header: 'Date Joined',
      headerAction: headerFilterAction,
      render: (user) => formatDate(user.dateJoined),
    },
    {
      header: 'Status',
      headerAction: headerFilterAction,
      render: (user) => <StatusPill status={user.status} />,
    },
    {
      header: '',
      width: '64px',
      className: 'users-page__actions-cell',
      render: (user) => (
        <div className="users-page__row-actions">
          <button
            type="button"
            className="users-page__row-actions-trigger"
            aria-label={`Open actions for ${user.fullName}`}
            onClick={(event) => {
              event.stopPropagation()
              setActiveRowMenuId((current) => (current === user.id ? null : user.id))
              setIsFilterOpen(false)
            }}
          >
            <img src="/users_dashboard/ic-more-vert-18px.png" alt="" aria-hidden="true"  style={{"width":"18px","height":"19.44px"}} />
          </button>

          {activeRowMenuId === user.id ? (
            <div className="users-page__row-menu" role="menu">
              <button
                type="button"
                role="menuitem"
                onClick={(event) => {
                  event.stopPropagation()
                  handleViewDetails(user)
                }}
              >
                <Eye size={14} aria-hidden="true" />
                View Details
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveRowMenuId(null)
                }}
              >
                <Slash size={14} aria-hidden="true" />
                Blacklist User
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveRowMenuId(null)
                }}
              >
                <UserCheck size={14} aria-hidden="true" />
                Activate User
              </button>
            </div>
          ) : null}
        </div>
      ),
    },
  ]

  return (
    <section className="users-page">
      <Topbar
        searchValue={search}
        onSearchChange={setSearch}
        userName="Adedeji"
      />

      <div className="users-page__heading">
        <h1>Users</h1>
      </div>

      <div className="users-page__summary">
        {metricCards.map((card) => (
          <MetricCard key={card.label} {...card} />
        ))}
      </div>

      <div className="users-page__table-shell" ref={tableShellRef}>
        {isFilterOpen ? (
          <div className="users-page__filter-popover" role="dialog" aria-label="Users table filters">
            <SelectField label="Organization" value={filters.organization} onChange={(event) => setFilters((current) => ({ ...current, organization: event.target.value }))}>
              <option value="">All organizations</option>
              {organizationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>
            <InputField label="Username" value={filters.username} onChange={(event) => setFilters((current) => ({ ...current, username: event.target.value }))} placeholder="User" />
            <InputField label="Email" value={filters.email} onChange={(event) => setFilters((current) => ({ ...current, email: event.target.value }))} placeholder="Email" />
            <InputField label="Date" value={filters.dateJoined} onChange={(event) => setFilters((current) => ({ ...current, dateJoined: event.target.value }))} placeholder="Date" />
            <InputField label="Phone Number" value={filters.phoneNumber} onChange={(event) => setFilters((current) => ({ ...current, phoneNumber: event.target.value }))} placeholder="Phone Number" />
            <SelectField label="Status" value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="blacklisted">Blacklisted</option>
            </SelectField>

            <div className="users-page__filter-actions">
              <button type="button" className="users-page__filter-reset" onClick={resetFilters}>
                Reset
              </button>
              <button type="button" className="users-page__filter-submit" onClick={() => setIsFilterOpen(false)}>
                Filter
              </button>
            </div>
          </div>
        ) : null}

        {loading ? <LoadingView message="Loading users from MockAPI..." /> : null}
        {error ? <ErrorView title="Users could not be loaded" message={error} actionLabel="Try again" onAction={reload} /> : null}

        {!loading && !error ? (
          filteredUsers.length ? (
            <>
              <DataTable columns={columns} data={paginatedUsers} rowKey={(user) => user.id} onRowClick={handleRowClick} />
              <Pagination
                currentPage={currentPage}
                totalItems={filteredUsers.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages))}
              />
            </>
          ) : (
            <EmptyView
              title="No matching users"
              message="Try adjusting the filters or clearing the search query."
              actionLabel="Reset filters"
              onAction={resetFilters}
            />
          )
        ) : null}
      </div>
    </section>
  )
}
