import type { UserRecord } from '../types/user'
import { formatDate } from './formatters'

export interface UserFilters {
  search: string
  organization: string
  username: string
  email: string
  phoneNumber: string
  dateJoined: string
  status: string
}

export const createDefaultUserFilters = (): UserFilters => ({
  search: '',
  organization: '',
  username: '',
  email: '',
  phoneNumber: '',
  dateJoined: '',
  status: '',
})

export const normalizeUsers = (users: Omit<UserRecord, 'id'>[]): UserRecord[] =>
  users.map((user, index) => ({
    ...user,
    id: `${user.username}-${index}`,
  }))

export const filterUsers = (users: UserRecord[], filters: UserFilters): UserRecord[] => {
  const searchTerm = filters.search.trim().toLowerCase()
  const organizationTerm = filters.organization.trim().toLowerCase()
  const usernameTerm = filters.username.trim().toLowerCase()
  const emailTerm = filters.email.trim().toLowerCase()
  const phoneNumberTerm = filters.phoneNumber.trim().toLowerCase()
  const dateJoinedTerm = filters.dateJoined.trim().toLowerCase()
  const statusTerm = filters.status.trim().toLowerCase()

  return users.filter((user) => {
    const matchesSearch =
      !searchTerm ||
      [user.fullName, user.username, user.email, user.phoneNumber, user.organization]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm)

    const matchesOrganization =
      !organizationTerm || user.organization.toLowerCase().includes(organizationTerm)

    const matchesUsername = !usernameTerm || user.username.toLowerCase().includes(usernameTerm)

    const matchesEmail = !emailTerm || user.email.toLowerCase().includes(emailTerm)

    const matchesPhoneNumber = !phoneNumberTerm || user.phoneNumber.toLowerCase().includes(phoneNumberTerm)

    const matchesDateJoined = !dateJoinedTerm || formatDate(user.dateJoined).toLowerCase().includes(dateJoinedTerm)

    const matchesStatus = !statusTerm || user.status.toLowerCase() === statusTerm

    return (
      matchesSearch &&
      matchesOrganization &&
      matchesUsername &&
      matchesEmail &&
      matchesPhoneNumber &&
      matchesDateJoined &&
      matchesStatus
    )
  })
}

export const getUserById = (users: UserRecord[], userId?: string): UserRecord | null => {
  if (!userId) {
    return null
  }

  return users.find((user) => user.id === userId) ?? null
}

export const paginateUsers = (
  users: UserRecord[],
  page: number,
  pageSize: number,
): UserRecord[] => {
  const startIndex = (page - 1) * pageSize
  return users.slice(startIndex, startIndex + pageSize)
}
