import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle'
import Logo from './Logo'

export default function HeaderAdmin( 
  {link, name}: {link: string, name: string}
 ) {
  return (
    <header className="flex justify-between items-center py-6">
      <Logo />
      <nav className="flex items-center space-x-4 font-bold">
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
        <Link href={link}>
          <Button>{name}</Button>
        </Link>
      </nav>
    </header>
  )
}