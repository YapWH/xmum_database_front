'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

// Mock data for articles
const articles = [
  { id: 1, title: "The Future of AI in Everyday Life", description: "An in-depth look at how artificial intelligence is shaping our world", image: "/placeholder.jpg" },
  { id: 2, title: "Sustainable Energy Solutions", description: "Exploring innovative approaches to renewable energy", image: "/placeholder.jpg" },
  { id: 3, title: "The Rise of Quantum Computing", description: "Understanding the potential of quantum computers", image: "/placeholder.jpg" },
]

// Mock data for authors
const authors = [
  { id: 1, name: "Dr. Jane Smith", expertise: "AI and Machine Learning", image: "/icon.jpeg" },
  { id: 2, name: "Prof. John Doe", expertise: "Renewable Energy", image: "/icon.jpeg" },
  { id: 3, name: "Dr. Emily Brown", expertise: "Quantum Physics", image: "/icon.jpeg" },
]

export default function ArticlesHomePage() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section 
          className="text-center py-20 rounded-lg mb-12 bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: "url('/placeholder.jpg')",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-white mb-4">Discover Inspiring Articles</h1>
            <p className="text-xl text-white mb-8">Explore a world of knowledge from our expert authors</p>
            <Link href="/articles/collection">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">Start Reading</Button>
            </Link>
          </div>
        </section>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Featured Article */}
        {searchTerm === '' && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Featured Article</h2>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <Image 
                    src={articles[0].image}
                    alt={articles[0].title}
                    width={400} 
                    height={300} 
                    className="object-cover w-full h-full rounded-l-lg"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardTitle className="text-2xl mb-2">{articles[0].title}</CardTitle>
                  <CardDescription className="mb-4">{articles[0].description}</CardDescription>
                  <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <div className="flex justify-between items-center">
                    <Link href={`/articles/${articles[0].id}`}>
                      <Button className="w-full">Read More</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {searchTerm === '' && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Featured Authors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {authors.map((author) => (
                <Card key={author.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    {loading ? (
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 animate-pulse"></div>
                    ) : (
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image 
                          src={author.image}
                          alt={author.name}
                          width={100} 
                          height={100} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardTitle>{loading ? <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div> : author.name}</CardTitle>
                    <CardDescription>
                      {loading ? <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mt-2"></div> : `Expert in ${author.expertise}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Link href={`/articles/author/${author.id}`}>
                      <Button className="w-full">
                        {loading ? <div className="w-full"></div> : 'More from Author'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-3xl font-semibold mb-6">
            {searchTerm === '' ? 'Latest Articles' : 'Search Results'}
          </h2>
          {filteredArticles.length === 0 ? (
            <p className="text-center text-lg text-gray-600">No articles found matching your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{loading ? <div className="h-6 bg-gray-300 rounded w-3/4"></div> : article.title}</CardTitle>
                    <CardDescription>
                      {loading ? <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div> : article.description}
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
                      <Link href={`/articles/${article.id}`}>
                        <Button className="w-full">
                          {loading ? <div className="w-full"></div> : 'Read More'}
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
          )}
        </section>

        {searchTerm === '' && (
          <div className="text-center mt-8">
            <Link href="/articles/collection">
              <Button className="w-18">Load More Articles</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}