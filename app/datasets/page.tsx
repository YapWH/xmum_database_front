'use client'

import Link from 'next/link'
import ItemGrid from '@/components/ItemGrid'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dataset } from '@/types'
import { Upload, Search, RefreshCw } from 'lucide-react'
import PlaceHolderDatasets from '@/placeholder'
import Header from '@/components/Header'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useEffect, useState } from 'react'

const datasetsByTag: Record<string, Dataset[]> = {
  'machine-learning': PlaceHolderDatasets.filter((d) => d.tags.includes('machine learning')),
  'computer-vision': PlaceHolderDatasets.filter((d) => d.tags.includes('computer vision')),
  'natural-language-processing': PlaceHolderDatasets.filter((d) => d.tags.includes('natural language processing')),
}

function getRandomItems(items: Dataset[], count: number): Dataset[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function DatasetsHomePage() {
  const [randomItems, setRandomItems] = useState<Dataset[]>([])
  //const randomDatasets = getRandomItems(PlaceHolderDatasets, 6)

  const fetchRandomItems = async () => {
    const items: Dataset[] = PlaceHolderDatasets
    setRandomItems(getRandomItems(items, 6))
  }

  useEffect(() => {
    fetchRandomItems()
  }, [])

  return (
    <ProtectedRoute requiredRole='user'>
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Datasets Home</h1>
          <div className="flex space-x-4">
            <Link href="/datasets/search">
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Search Datasets
              </Button>
            </Link>
            <Link href="/datasets/upload">
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Dataset
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb12">
          <Card>
            <CardHeader>
              <CardTitle>Popular Datasets</CardTitle>
              <CardDescription>Explore the most downloaded datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/datasets/popular">
                <Button className="w-full">View Popular Datasets</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>Check out the latest dataset additions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/datasets/recent">
                <Button className="w-full">View Recent Uploads</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Browse datasets by category</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/datasets/categories">
                <Button className="w-full">Explore Categories</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <br/>

        {/* Trending Dataset*/}
        <h2 className="text-3xl font-bold mb-6">Trending Datasets</h2>
        <ItemGrid items={PlaceHolderDatasets.slice(0, 6)} />
        
        {/* Random Items */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">You Might Be Interested In</h2>
            <Button onClick={fetchRandomItems} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload
            </Button>
          </div>
          <ItemGrid items={randomItems} />
        </section>

        {/* Datasets by Tag */}
        {Object.entries(datasetsByTag).map(([tag, items]) => (
          <div key={tag} className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Top {tag.replace('-', ' ')} Datasets</h2>
            <ItemGrid items={items.slice(0, 3)} />
          </div>
        ))}
      </div>
    </div>
    </ProtectedRoute>
  )
}