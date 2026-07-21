import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'

/** Wrap any element that requires a logged-in user. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useUserStore((s) => s.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
