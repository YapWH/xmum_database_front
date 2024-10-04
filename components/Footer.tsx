import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 XMUM Database. All rights reserved.</p>
          </div>
          <nav className="flex space-x-4">
            <Link href="/about" className="text-primary hover:underline">
              About Us
            </Link>
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="/feedback" className="text-primary hover:underline">
              Feedback
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}