import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="flex justify-between items-center py-6">
      <Logo />
      <nav className="flex items-center space-x-4 font-bold">
        <ModeToggle />
        <Link href="/auth/login">
          <Button>Login / Register</Button>
        </Link>
      </nav>
    </header>
  )
}