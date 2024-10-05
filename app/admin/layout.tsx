'use client'

import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout(
    {children,}: {children: React.ReactNode}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/unauthorized')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  return <>{children}</>
}