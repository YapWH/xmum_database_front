'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, ThumbsUp, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Item {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  uploader: string
  dateAdded: string
  downloads: number
  tags: string[]
}

export default function ItemDetail() {
  const params = useParams()
  const { id } = params
  const [item, setItem] = useState<Item | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the item data from an API
    // For this example, we'll use mock data
    const mockItem: Item = {
      id: id as string,
      title: 'Sample Item',
      description: 'This is a detailed description of the sample item.',
      category: 'Dataset',
      subcategory: 'CV',
      uploader: 'John Doe',
      dateAdded: '2023-06-15',
      downloads: 1000,
      tags: ['sample', 'mock data']
    }
    setItem(mockItem)
  }, [id])

  if (!item) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" passHref>
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{item.title}</CardTitle>
          <CardDescription>{item.category} - {item.subcategory}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{item.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Uploaded by {item.uploader} on {item.dateAdded}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>
            <Download className="mr-2 h-4 w-4" /> Download ({item.downloads})
          </Button>
          <Button variant="outline">
            <ThumbsUp className="mr-2 h-4 w-4" /> Like
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}