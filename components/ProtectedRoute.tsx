'use client'

import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type ProtectedRouteProps = {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    } else if (requiredRole && user.role !== requiredRole) {
      router.push('/unauthorized')
    }
  }, [user, requiredRole, router])

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute