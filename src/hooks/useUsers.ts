import { useEffect, useState } from 'react'
import type { UserRecord } from '../types/user'
import { fetchUsers } from '../services/usersService'

interface UseUsersResult {
  users: UserRecord[]
  loading: boolean
  error: string | null
  reload: () => Promise<void>
}

export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async (): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const nextUsers = await fetchUsers()
      setUsers(nextUsers)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadUsers()
  }, [])

  return {
    users,
    loading,
    error,
    reload: loadUsers,
  }
}
