import type { UserRecord } from '../types/user'
import { normalizeUsers } from '../utils/users'

const USERS_API_URL = 'https://lendsqr-api-hx9n.onrender.com/api/users'

export const fetchUsers = async (): Promise<UserRecord[]> => {
  const response = await fetch(USERS_API_URL)

  if (!response.ok) {
    throw new Error('Unable to load users. Please try again.')
  }

  const payload = (await response.json()) as Omit<UserRecord, 'id'>[]

  return normalizeUsers(payload)
}
