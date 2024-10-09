'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronLeft, Heart, Calendar } from 'lucide-react'
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

// Dynamically import PDFViewer component
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => <p>Loading PDF viewer...</p>
})

// Mock data for a single note
const noteData = {
  id: '1',
  title: 'Programming Basics',
  author: 'John Doe',
  authorIcon: '/icon.jpeg?height=40&width=40',
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

export default function NoteDetailsPage() {
  const params = useParams()
  const router = useRouter()

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
                <BreadcrumbLink href={`/notes/${params.schoolId}`}>{noteData.school}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{noteData.title}</BreadcrumbLink>
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
                  <PDFViewer file={noteData.content} />
                ) : (
                  <Carousel className="w-full h-full" opts={{ align: "start", loop: true, }}>
                    <CarouselContent>
                      {noteData.images.map((image, index) => (
                        <CarouselItem key={index} className="h-full flex justify-center items-center">
                          <div className='relative w-full h-[550px]'>
                          <Image
                            src={image}
                            alt={`Image ${index + 1}`}
                            fill
                            style={{objectFit: 'contain'}}
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
                <h1 className="text-3xl font-bold mb-4">{noteData.title}</h1>
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
                <p className="text-gray-700 mb-4">{noteData.description}</p>
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">School</h2>
                  <p>{noteData.school}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Programme</h2>
                  <p>{noteData.programme}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Course</h2>
                  <p>{noteData.course}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {noteData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="mr-2">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Heart className="h-5 w-5 mr-2" />
                  <span>{noteData.likes} likes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}