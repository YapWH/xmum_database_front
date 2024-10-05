'use client'

import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { hasAccess } from '@/app/utils/rbac'

type ProtectedRouteProps = {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole = 'user' }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (requiredRole && !hasAccess(user.role, requiredRole)) {
      router.push('/unauthorized')
    }
  }, [user, requiredRole, router])

  if (!user || (requiredRole && !hasAccess(user.role, requiredRole))) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute