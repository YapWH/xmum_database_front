'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // Replace with actual API call to authenticate user
    let mockUser: User

    if (email === 'admin@example.com' && password === 'adminpass') {
      mockUser = { id: '1', name: 'Admin User', email, role: 'admin' }
    } else {
      mockUser = { id: '2', name: 'Regular User', email, role: 'user' }
    }

    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}