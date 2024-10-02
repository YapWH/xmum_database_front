'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import FilterPanel from '@/components/FilterPanel'
import { Article } from '@/types'

const articles: Article[] = [
  {
    id: '1',
    title: 'Deep Learning Advances',
    description: 'Recent advancements in deep learning techniques',
    category: 'Articles',
    subcategory: 'CV',
    uploader: 'Alice Johnson',
    dateAdded: '2023-06-01',
    downloads: 750,
    tags: ['deep learning', 'ai'],
    school: 'MIT',
    program: 'Artificial Intelligence',
    publicationDate: '2023-05-30'
  },
  {
    id: '2',
    title: 'The Future of Natural Language Processing',
    description: 'Exploring upcoming trends in NLP',
    category: 'Articles',
    subcategory: 'NLP',
    uploader: 'Bob Williams',
    dateAdded: '2023-06-05',
    downloads: 600,
    tags: ['nlp', 'future trends'],
    school: 'Stanford University',
    program: 'Computer Science',
    publicationDate: '2023-06-01'
  },
  // Add more article items here
]

export default function ArticlesPage() {
  const [filteredArticles, setFilteredArticles] = useState(articles)

  const handleFilter = (filters: any) => {
    // Implement filtering logic here
    // For now, we'll just return all articles
    setFilteredArticles(articles)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">Articles</h1>
        <FilterPanel onFilter={handleFilter} />
        <ItemGrid items={filteredArticles} />
      </div>
    </div>
  )
}