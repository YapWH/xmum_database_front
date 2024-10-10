'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

// Mock data for schools
const schools = [
  { id: 1, name: 'School of Engineering', image: '/placeholder.jpg' },
  { id: 2, name: 'School of Business', image: '/placeholder.jpg' },
  { id: 3, name: 'School of Arts and Sciences', image: '/placeholder.jpg' },
  { id: 4, name: 'School of Medicine', image: '/placeholder.jpg' },
  { id: 5, name: 'School of Law', image: '/placeholder.jpg' },
  { id: 6, name: 'School of Education', image: '/placeholder.jpg' },
]

export default function NotesHomePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-6xl font-bold text-center mb-8">Notes</h1>
      
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-12 space-x-10">
          <Input
            type="text"
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Link href="/notes/upload">
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Notes
            </Button>
          </Link>
      </div>
      
      {/* School Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <Link href={`/notes/${school.id}`} key={school.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Image
                src={school.image}
                alt={school.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{school.name}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}