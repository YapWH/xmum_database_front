'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { X, Check, ChevronsUpDown } from 'lucide-react'

// Mock data for schools, programmes, and courses
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

// Predefined tags
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

export default function UploadNotesPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [selectedProgramme, setSelectedProgramme] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [tagInput, setTagInput] = useState('')
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false)

  const [availableProgrammes, setAvailableProgrammes] = useState(programmes)
  const [availableCourses, setAvailableCourses] = useState(courses)

  useEffect(() => {
    if (selectedSchool) {
      setAvailableProgrammes(programmes.filter(p => p.schoolId === selectedSchool))
      setSelectedProgramme('')
      setSelectedCourse('')
    }
  }, [selectedSchool])

  useEffect(() => {
    if (selectedProgramme) {
      setAvailableCourses(courses.filter(c => c.programmeId === selectedProgramme))
      setSelectedCourse('')
    }
  }, [selectedProgramme])

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput('')
      setTagPopoverOpen(false)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      if (files.length + newFiles.length <= 9) {
        setFiles([...files, ...newFiles])
      } else {
        alert('You can only upload up to 9 files in total.')
      }
    }
  }

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ title, description, selectedSchool, selectedProgramme, selectedCourse, tags, files })
    // After successful upload, redirect to the notes page or show a success message
    router.push('/notes')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="school">School</Label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>{school.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="programme">Programme</Label>
              <Select value={selectedProgramme} onValueChange={setSelectedProgramme} disabled={!selectedSchool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a programme" />
                </SelectTrigger>
                <SelectContent>
                  {availableProgrammes.map((programme) => (
                    <SelectItem key={programme.id} value={programme.id}>{programme.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse} disabled={!selectedProgramme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {availableCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tags">Tags</Label>
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
                              className={`mr-2 h-4 w-4 ${tags.includes(tag) ? "opacity-100" : "opacity-0"}`}
                            />
                            {tag}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-1">
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="files">Files (Max 9)</Label>
              <Input id="files" type="file" multiple onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
              <div className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span>{file.name}</span>
                    <Button type="button" variant="ghost" onClick={() => handleRemoveFile(file)}>
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit">Upload Notes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}