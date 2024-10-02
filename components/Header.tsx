'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between mb-8">
      <Link href="/" className="text-4xl font-bold text-primary">
        XMUM Database Directory
      </Link>
      <nav className="flex items-center space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/datasets/home">
              <Button variant="ghost">Datasets</Button>
            </Link>
          </li>
          <li>
            <Link href="/notes/home">
              <Button variant="ghost">Notes</Button>
            </Link>
          </li>
          <li>
            <Link href="/articles/home">
              <Button variant="ghost">Articles</Button>
            </Link>
          </li>
        </ul>
        <Link href="/upload">
          <Button>Upload</Button>
        </Link>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </nav>
    </header>
  )
}