'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle'
import Logo from './Logo'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth } from '@/app/contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="flex justify-between items-center py-6">
      <Logo />
      <nav className="flex items-center space-x-4 font-bold">
        {user ? (
          <>
          {user.role === 'admin' && (
            <Link href='/admin'>
              <Button variant="ghost">Admin Dashboard</Button>
            </Link>
          )}
          <Link href="/datasets">
            <Button variant="ghost">Datasets</Button>
          </Link>
          <Link href="/notes">
            <Button variant="ghost">Notes</Button>
          </Link>
          <Link href="/articles">
            <Button variant="ghost">Articles</Button>
          </Link>
          <ModeToggle />
          <Link href="/profile">
            <Avatar className="h-10 w-10">
              <AvatarImage src='https://github.com/shadcn.png' alt="NiHao" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
          <Button variant="ghost" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <ModeToggle />
            <Link href="/login">
            <Button>Login/Register</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}