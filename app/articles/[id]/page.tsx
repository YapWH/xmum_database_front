'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Article } from '@/types'
import { Download, ArrowLeft } from 'lucide-react'

// TODO: Fetch item details from the API
const fetchItemDetails = async (category: string, id: string): Promise<Article> => {
  return {
    id,
    title: 'Sample Item',
    description: 'This is a sample item description.',
    category,
    subcategory: 'Sample Subcategory',
    uploader: 'John Doe',
    dateAdded: '2023-07-01',
    downloads: 1000,
    views: 5000,
    tags: ['sample', 'test'],
    likes: 500,
    dislikes: 50,
    source: 'https://example.com/sample-item',
    school: 'Sample School',
    program: 'Sample Program',
    publicationDate: '2023-07-01',
  }
}

// TODO: Fetch views and downloads stats for the item
const fetchItemStats = async (id: string) => {
  return [
    { date: '2023-06-01', views: 100, downloads: 20 },
    { date: '2023-06-08', views: 150, downloads: 30 },
    { date: '2023-06-15', views: 200, downloads: 40 },
    { date: '2023-06-22', views: 180, downloads: 35 },
    { date: '2023-06-29', views: 250, downloads: 50 },
  ]
}

export default function ItemDetailPage() {
  const { category, id } = useParams()
  const router = useRouter()
  const [item, setItem] = useState<Article | null>(null)
  const [stats, setStats] = useState<{ date: string; views: number; downloads: number; }[]>([])

  useEffect(() => {
    const loadData = async () => {
      const itemData = await fetchItemDetails(category as string, id as string)
      setItem(itemData)
      const statsData = await fetchItemStats(id as string)
      setStats(statsData)
    }
    loadData()
  }, [category, id])

  const handleDownload = () => {
    // Implement download logic here
    console.log('Downloading item:', item?.title)
  }

  if (!item) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Button 
          variant="outline" 
          onClick={() => router.back()} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.category} - {item.subcategory}</CardDescription>
            </div>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{item.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>Uploader: {item.uploader}</div>
              <div>Date Added: {new Date(item.dateAdded).toLocaleDateString()}</div>
              <div>School: {item.school}</div>
              <div>Program: {item.program}</div>
              <div>Downloads: {item.downloads}</div>
              <div>Likes : {item.likes} </div>
              <div>Views: {item.views}</div>
              <div>Dislikes : {item.dislikes} </div>
              <div className="mb-2">
                Tags: 
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="mr-2">
                    {tag}
                  </Badge>
                ))}
              </div>
              
            </div>

            <div>Source: <a href={item.source} className="text-primary hover:underline">{item.source}</a></div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Views and Downloads Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="Views" />
                  <Bar yAxisId="right" dataKey="downloads" fill="#82ca9d" name="Downloads" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}