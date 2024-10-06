'use client'

import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout(
    {children,}: {children: React.ReactNode}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading == null) {
      if (user == null) {
        router.push('/login')
      }
      else if (user.role !== 'admin') {
        router.push('/unauthorized')
      }
    }
  }, [user, loading, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  return <>{children}</>
}