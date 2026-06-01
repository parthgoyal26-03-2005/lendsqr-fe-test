import { Navigate, Outlet } from 'react-router-dom'
import { hasAuthSession } from '../utils/storage'

export const ProtectedRoute = () => {
  if (!hasAuthSession()) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
