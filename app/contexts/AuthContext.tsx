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
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      // Replace with actual API call to check authentication status
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // Replace with actual API call to authenticate user
    const mockUser: User = { id: '1', name: 'John Doe', email, role: 'user' }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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