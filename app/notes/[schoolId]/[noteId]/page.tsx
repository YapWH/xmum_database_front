'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronLeft, Heart, Calendar, Edit, Check, X, ChevronsUpDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Header from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'

// Mock data for a single note
const noteData = {
  id: '1',
  title: 'Programming Basics',
  author: 'John Doe',
  authorIcon: '/icon.jpeg',
  dateAdded: '2023-07-15',
  description: 'An introduction to programming concepts and practices.',
  school: 'School of Engineering',
  programme: 'Computer Science',
  course: 'Introduction to Programming',
  tags: ['programming', 'basics', 'computer science'],
  likes: 42,
  contentType: 'images', // or 'pdf'
  content: '/sample.pdf', // This should be the path to your PDF file
  images: [
    '/placeholder.jpg',
    '/notes.jpg',
    '/icon.jpeg',
  ],
}

// Mock data for schools, programmes, and courses (same as in upload page)
const schools = [
  { id: '1', name: 'School of Engineering' },
  { id: '2', name: 'School of Business' },
]

const programmes = [
  { id: '1', schoolId: '1', name: 'Computer Science' },
  { id: '2', schoolId: '1', name: 'Electrical Engineering' },
  { id: '3', schoolId: '2', name: 'Business Administration' },
]

const courses = [
  { id: '1', programmeId: '1', name: 'Introduction to Programming' },
  { id: '2', programmeId: '1', name: 'Data Structures' },
  { id: '3', programmeId: '2', name: 'Circuit Analysis' },
  { id: '4', programmeId: '3', name: 'Marketing Principles' },
]

const predefinedTags = [
  'Programming',
  'Data Structures',
  'Algorithms',
  'Web Development',
  'Database',
  'Machine Learning',
  'Artificial Intelligence',
  'Networking',
  'Operating Systems',
  'Software Engineering',
]

export default function NoteDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedNote, setEditedNote] = useState(noteData)
  const [originalNote, setOriginalNote] = useState(noteData)
  const [likes, setLikes] = useState(noteData.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false)

  const [availableProgrammes, setAvailableProgrammes] = useState(programmes)
  const [availableCourses, setAvailableCourses] = useState(courses)

  useEffect(() => {
    if (editedNote.school) {
      setAvailableProgrammes(programmes.filter(p => p.schoolId === editedNote.school))
    }
  }, [editedNote.school])

  useEffect(() => {
    if (editedNote.programme) {
      setAvailableCourses(courses.filter(c => c.programmeId === editedNote.programme))
    }
  }, [editedNote.programme])

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleEdit = () => {
    setOriginalNote(editedNote)
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saving edited note:', editedNote)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedNote(originalNote)
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedNote({ ...editedNote, [name]: value })
  }

  const handleAddTag = (tag: string) => {
    if (tag && !editedNote.tags.includes(tag)) {
      setEditedNote({ ...editedNote, tags: [...editedNote.tags, tag] })
      setTagInput('')
      setTagPopoverOpen(false)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedNote({ ...editedNote, tags: editedNote.tags.filter(tag => tag !== tagToRemove) })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4 rounded-md">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/notes">Notes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/notes/${params.schoolId}`}>{editedNote.school}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{editedNote.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Note Content */}
          <div className="lg:w-2/3">
            <Card className="h-[600px] rounded-xl">
              <CardContent className="p-6 h-full">
                {noteData.contentType === 'pdf' ? (
                  <></>
                ) : (
                  <Carousel className="w-full h-full" opts={{ align: "start", loop: true, }}>
                    <CarouselContent>
                      {noteData.images.map((image, index) => (
                        <CarouselItem key={index} className="h-full flex justify-center items-center">
                          <div className="relative w-full h-[550px]">
                            <Image
                              src={image}
                              alt={`Image ${index + 1}`}
                              fill
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                        </CarouselItem>
                      
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Note Details */}
          <div className="lg:w-1/3">
            <Card className="rounded-xl">
              <CardContent className="p-6">
                {isEditing ? (
                  <div className="space-y-4">
                  <Input
                    name="title"
                    value={editedNote.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                  />
                  <Textarea
                    name="description"
                    value={editedNote.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                  <Select
                    value={editedNote.school}
                    onValueChange={(value) => handleSelectChange('school', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a school" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>{school.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={editedNote.programme}
                    onValueChange={(value) => handleSelectChange('programme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a programme" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProgrammes.map((programme) => (
                        <SelectItem key={programme.id} value={programme.id}>{programme.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={editedNote.course}
                    onValueChange={(value) => handleSelectChange('course', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div>
                    <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={tagPopoverOpen}
                          className="w-full justify-between"
                        >
                          {tagInput || "Select tags..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search tags..." value={tagInput} onValueChange={setTagInput} />
                          <CommandEmpty>No tag found.</CommandEmpty>
                          <CommandGroup>
                            {predefinedTags
                              .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()))
                              .map(tag => (
                                <CommandItem
                                  key={tag}
                                  onSelect={() => handleAddTag(tag)}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${editedNote.tags.includes(tag) ? "opacity-100" : "opacity-0"}`}
                                  />
                                  {tag}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editedNote.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag)} className="ml-1">
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} className="w-full">
                      <Check className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </div>
                </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold mb-4">{editedNote.title}</h1>
                    <div className="flex items-center mb-4">
                      <Image
                        src={noteData.authorIcon}
                        alt={noteData.author}
                        width={40}
                        height={40}
                        className="rounded-full mr-2"
                      />
                      <span className="font-semibold">{noteData.author}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Added on {noteData.dateAdded}</span>
                    </div>
                    <p className="mb-4" style={{ color: '#808080' }}>{editedNote.description}</p>
                    <div className="mb-4">
                      <h2 className="font-semibold mb-2">School</h2>
                      <p>{editedNote.school}</p>
                    </div>
                    <div className="mb-4">
                      <h2 className="font-semibold mb-2">Programme</h2>
                      <p>{editedNote.programme}</p>
                    </div>
                    <div className="mb-4">
                      <h2 className="font-semibold mb-2">Course</h2>
                      <p>{editedNote.course}</p>
                    </div>
                    <div className="mb-4">
                      <h2 className="font-semibold mb-2">Tags</h2>
                      <div className="flex flex-wrap gap-2">
                        {noteData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        variant={"outline"}
                        onClick={handleLike}
                        className="flex items-center"
                      >
                        <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                        <span>{likes} likes</span>
                      </Button>
                      <Button variant="outline" onClick={handleEdit}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}