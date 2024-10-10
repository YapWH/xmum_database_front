'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function ArticlesHomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-20 bg-blue-600 rounded-lg mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Discover Inspiring Articles</h1>
          <p className="text-xl text-white mb-8">Explore a world of knowledge from our expert authors</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Start Reading</Button>
        </section>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search articles..." 
              className="w-full pl-10 pr-4 py-2 text-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Featured Article */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Featured Article</h2>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/3">
                <Image 
                  src="/placeholder.jpg?height=300&width=400" 
                  alt="Featured Article" 
                  width={400} 
                  height={300} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <CardTitle className="text-2xl mb-2">The Future of AI in Everyday Life</CardTitle>
                <CardDescription className="mb-4">An in-depth look at how artificial intelligence is shaping our world</CardDescription>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="flex justify-between items-center">
                  <Link href="/articles/featured" passHref>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">Read More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Featured Authors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((author) => (
              <Card key={author} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  {loading ? (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 animate-pulse"></div>
                  ) : (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image 
                        src={`/placeholder.jpg?height=96&width=96`} 
                        alt={`Author ${author}`} 
                        width={96} 
                        height={96} 
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardTitle>{loading ? <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div> : `Author ${author}`}</CardTitle>
                  <CardDescription>
                    {loading ? <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mt-2"></div> : `Expert in Topic ${author}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href={`/authors/${author}`} passHref>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      {loading ? <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div> : 'View Profile'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((article) => (
              <Card key={article} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{loading ? <div className="h-6 bg-gray-300 rounded w-3/4"></div> : `Article ${article}`}</CardTitle>
                  <CardDescription>
                    {loading ? <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div> : `A brief description of Article ${article}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  ) : (
                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  )}
                  <div className="flex justify-between items-center">
                    <Link href={`/articles/${article}`} passHref>
                      <Button className="bg-blue-600 text-white hover:bg-blue-700">
                        {loading ? <div className="h-4 bg-gray-300 rounded w-16"></div> : 'Read More'}
                      </Button>
                    </Link>
                    <div className="flex space-x-2">
                      {['Technology', 'AI'].map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-sm">
                          {loading ? <div className="h-4 bg-gray-300 rounded w-12"></div> : tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
            Load More Articles
          </Button>
        </div>
      </main>
    </div>
  )
}