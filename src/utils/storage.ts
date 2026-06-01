import type { UserRecord } from '../types/user'

const selectedUserKey = 'lendsqr:selected-user'
const authKey = 'lendsqr:auth-token'

export const saveSelectedUser = (user: UserRecord): void => {
  localStorage.setItem(selectedUserKey, JSON.stringify(user))
}

export const getSelectedUser = (): UserRecord | null => {
  const storedValue = localStorage.getItem(selectedUserKey)

  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue) as UserRecord
  } catch {
    return null
  }
}

export const setAuthSession = (): void => {
  localStorage.setItem(authKey, 'authenticated')
}

export const hasAuthSession = (): boolean => localStorage.getItem(authKey) === 'authenticated'

export const clearAuthSession = (): void => {
  localStorage.removeItem(authKey)
}
