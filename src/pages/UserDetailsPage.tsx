import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Button } from '../components/common/Button'
import { EmptyView, ErrorView, LoadingView } from '../components/common/StateView'
import { StatusPill } from '../components/common/StatusPill'
import { Topbar } from '../components/layout/Topbar'
import { UserAvatar } from '../components/common/UserAvatar'
import type { UserRecord } from '../types/user'
import { fetchUsers } from '../services/usersService'
import { formatCurrency, formatTier } from '../utils/formatters'
import { getSelectedUser, saveSelectedUser } from '../utils/storage'
import { getUserById } from '../utils/users'
import './UserDetailsPage.scss'

type DetailGroup = {
  label: string
  value: string
}

type DetailGroups = {
  general: DetailGroup[]
  education: DetailGroup[]
  social: DetailGroup[]
  guarantor: DetailGroup[]
}

const detailTabs = [
  { label: 'General Details', active: true, disabled: true },
  { label: 'Documents', active: false, disabled: true },
  { label: 'Bank Details', active: false, disabled: true },
  { label: 'Loans', active: false, disabled: true },
  { label: 'Savings', active: false, disabled: true },
  { label: 'App and System', active: false, disabled: true },
]

const getTierStars = (tier: number): boolean[] => [1, 2, 3].map((rating) => tier >= rating)

export const UserDetailsPage = () => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [user, setUser] = useState<UserRecord | null>(getSelectedUser())
  const [loading, setLoading] = useState(!getSelectedUser())
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const tierStars = user ? getTierStars(user.userTier) : []

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      if (user?.id === userId) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        const users = await fetchUsers()
        const matchedUser = getUserById(users, userId)

        if (!matchedUser) {
          throw new Error('The selected user was not found.')
        }

        saveSelectedUser(matchedUser)
        setUser(matchedUser)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    void loadUser()
  }, [user, userId])

  const detailGroups = useMemo<DetailGroups>(() => {
    if (!user) {
      return {
        general: [],
        education: [],
        social: [],
        guarantor: [],
      }
    }

    const general: DetailGroup[] = [
      { label: 'Full Name', value: user.fullName },
      { label: 'Phone Number', value: user.phoneNumber },
      { label: 'Email Address', value: user.email },
      { label: 'BVN', value: String(user.bvn) },
      { label: 'Gender', value: user.gender },
      { label: 'Marital Status', value: user.maritalStatus },
      { label: 'Children', value: user.children },
      { label: 'Residence', value: user.residenceType },
    ]

    const education: DetailGroup[] = [
      { label: 'Education Level', value: user.educationLevel },
      { label: 'Employment Status', value: user.employmentStatus },
      { label: 'Sector', value: user.sector },
      { label: 'Duration', value: user.employmentDuration },
      { label: 'Office Email', value: user.officeEmail },
      { label: 'Monthly Income', value: formatCurrency(user.monthlyIncome) },
      { label: 'Loan Repayment', value: formatCurrency(user.loanRepayment) },
    ]

    const social: DetailGroup[] = [
      { label: 'Twitter', value: `@${user.twitter}` },
      { label: 'Facebook', value: user.facebook },
      { label: 'Instagram', value: `@${user.instagram}` },
      { label: 'User Tier', value: formatTier(user.userTier) },
    ]

    const guarantor: DetailGroup[] = [
      { label: 'Guarantor Name', value: user.guarantorName },
      { label: 'Guarantor Phone', value: user.guarantorPhone },
      { label: 'Guarantor Email', value: user.guarantorEmail },
      { label: 'Relationship', value: user.guarantorRelationship },
    ]

    return { general, education, social, guarantor }
  }, [user])

  if (loading) {
    return <LoadingView message="Loading user details..." />
  }

  if (error) {
    return <ErrorView title="User details unavailable" message={error} actionLabel="Go back to users" onAction={() => navigate('/users')} />
  }

  if (!user) {
    return <EmptyView title="No user selected" message="Select a user from the users table to persist and review the profile details." actionLabel="Go to users" onAction={() => navigate('/users')} />
  }

  return (
    <section className="user-details-page">
      <Topbar searchValue={search} onSearchChange={setSearch} userName="Adedeji" />

      <button type="button" className="user-details-page__back" onClick={() => navigate('/users')}>
        {'<'} Back to Users
      </button>

      <div className="user-details-page__header">
        <h1>User Details</h1>
        <div className="user-details-page__actions">
          <Button type="button" variant="danger" className="user-details-page__action-button user-details-page__action-button--danger">
            Blacklist User
          </Button>
          <Button type="button" variant="secondary" className="user-details-page__action-button user-details-page__action-button--active">
            Activate User
          </Button>
        </div>
      </div>

      <article className="user-details-page__profile">
        <div className="user-details-page__identity">
          <UserAvatar name={user.fullName} avatarUrl={user.avatar} />
          <div>
            <h2>{user.fullName}</h2>
            <p>{user.accountNumber}</p>
          </div>
        </div>
        <div className="user-details-page__metrics">
          <div>
            <span>User Tier</span>
            <strong className="user-details-page__tier-value">{formatTier(user.userTier)}</strong>
            <span className="user-details-page__tier-stars" aria-label={`User tier ${user.userTier} out of 3`}>
              {tierStars.map((active, index) => (
                <Star key={index} className={active ? 'is-active' : 'is-inactive'} aria-hidden="true" />
              ))}
            </span>
          </div>
          <div>
            <span>Account Balance</span>
            <strong>{formatCurrency(user.accountBalance)}</strong>
          </div>
          <div>
            <span>Status</span>
            <StatusPill status={user.status} />
          </div>
        </div>
      </article>

      <nav className="user-details-page__tabs" aria-label="User detail tabs">
        {detailTabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={tab.active ? 'is-active' : ''}
            aria-current={tab.active ? 'page' : undefined}
            aria-disabled={tab.disabled}
            onClick={(event) => event.preventDefault()}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="user-details-page__panel" id="general">
        <h3>Personal Information</h3>
        <div className="detail-grid">
          {detailGroups.general.map((field) => (
            <article key={field.label}>
              <span>{field.label}</span>
              <strong>{field.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="user-details-page__panel" id="documents">
        <h3>Education and Employment</h3>
        <div className="detail-grid">
          {detailGroups.education.map((field) => (
            <article key={field.label}>
              <span>{field.label}</span>
              <strong>{field.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="user-details-page__panel" id="bank">
        <h3>Social Profiles</h3>
        <div className="detail-grid">
          {detailGroups.social.map((field) => (
            <article key={field.label}>
              <span>{field.label}</span>
              <strong>{field.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="user-details-page__panel" id="loans">
        <h3>Guarantor</h3>
        <div className="detail-grid">
          {detailGroups.guarantor.map((field) => (
            <article key={field.label}>
              <span>{field.label}</span>
              <strong>{field.value}</strong>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
