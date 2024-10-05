'use client'

import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { hasAccess } from '@/app/utils/rbac'

export default function DatasetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const requiredRole = 'user'

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else if (!hasAccess(user.role, requiredRole)) {
        router.push('/unauthorized')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user || !hasAccess(user.role, requiredRole)) {
    return null
  }

  return <>{children}</>
}