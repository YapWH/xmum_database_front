'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Logo() {
  const { theme } = useTheme()

  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src={theme === 'dark' ? "/logo-dark.png" : "/logo-light.png"}
        alt="XMUM DB Logo"
        width={400}
        height={400}
      />
    </Link>
  )
}