'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft, Heart, Search } from 'lucide-react'
import Header from '@/components/Header'

// Mock data
const schoolData = {
  id: '1',
  name: 'School of Engineering',
}

const programmes = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Electrical Engineering' },
  { id: '3', name: 'Mechanical Engineering' },
]

const courses = [
  { id: '1', programmeId: '1', name: 'Introduction to Programming' },
  { id: '2', programmeId: '1', name: 'Data Structures' },
  { id: '3', programmeId: '1', name: 'Algorithms' },
  { id: '4', programmeId: '2', name: 'Circuit Analysis' },
  { id: '5', programmeId: '2', name: 'Digital Systems' },
  { id: '6', programmeId: '3', name: 'Thermodynamics' },
  { id: '7', programmeId: '3', name: 'Fluid Mechanics' },
]

const notes = [
  { id: '1', title: 'Programming Basics', author: 'John Doe', authorIcon: '/icon.jpeg', previewImage: '/notes.jpg?height=200&width=300', likes: 42, programmeId: '1', courseId: '1' },
  { id: '2', title: 'Advanced Algorithms', author: 'Jane Smith', authorIcon: '/icon.jpeg', previewImage: '/notes.jpg?height=200&width=300', likes: 38, programmeId: '1', courseId: '2' },
  { id: '3', title: 'Circuit Design', author: 'Bob Johnson', authorIcon: '/icon.jpeg', previewImage: '/notes.jpg?height=200&width=300', likes: 27, programmeId: '2', courseId: '4' },
  { id: '4', title: 'Heat Transfer', author: 'Alice Brown', authorIcon: '/icon.jpeg', previewImage: '/notes.jpg?height=200&width=300', likes: 31, programmeId: '3', courseId: '6' },
]

export default function SchoolNotesPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedProgramme, setSelectedProgramme] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNotes = notes.filter(note => 
    (selectedProgramme ? note.programmeId === selectedProgramme : true) &&
    (selectedCourse ? note.courseId === selectedCourse : true) &&
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    // Reset course selection when programme changes
    setSelectedCourse(null)
  }, [selectedProgramme])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">{schoolData.name} Notes</h1>

        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Side Panel */}
          <div className="w-full md:w-64 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">Programmes and Courses</h2>
                <Accordion type="single" collapsible className="w-full">
                  {programmes.map((programme) => (
                    <AccordionItem value={programme.id} key={programme.id}>
                      <AccordionTrigger>{programme.name}</AccordionTrigger>
                      <AccordionContent>
                        <ScrollArea className="h-48">
                          {courses
                            .filter(course => course.programmeId === programme.id)
                            .map((course) => (
                              <Button
                                key={course.id}
                                variant={selectedCourse === course.id ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => {
                                  setSelectedProgramme(programme.id)
                                  setSelectedCourse(course.id)
                                }}
                              >
                                {course.name}
                              </Button>
                            ))}
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <Link href={`/notes/${params.schoolId}/${note.id}`} key={note.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={note.previewImage}
                      alt={note.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{note.title}</h3>
                      <div className="flex items-center mb-2">
                        <Image
                          src={note.authorIcon}
                          alt={note.author}
                          width={24}
                          height={24}
                          className="rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-600">{note.author}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{note.likes} likes</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}