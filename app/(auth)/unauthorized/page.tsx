import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-xl mb-8">
        Oops! You don’t have permission to view this page. Please make sure you are logged in with the correct credentials.
      </p>
      <div className='flex flex-row space-x-4'>
        <Link href="/login">
          <Button className='mb-4'>Log In</Button>
        </Link>
        <Link href="/">
          <Button>Homepage</Button>
        </Link>
      </div>
    </div>
  )
}