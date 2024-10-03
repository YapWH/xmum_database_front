'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import FilterPanel from '@/components/FilterPanel'
import { Notes } from '@/types'

const notes: Notes[] = [
  {
    id: '1',
    title: 'Introduction to NLP',
    description: 'Comprehensive notes on Natural Language Processing',
    category: 'Notes',
    subcategory: 'NLP',
    uploader: 'Jane Smith',
    dateAdded: '2023-05-15',
    downloads: 500,
    tags: ['nlp', 'machine learning'],
    school: 'Stanford University',
    program: 'Computer Science'
  },
  {
    id: '2',
    title: 'Advanced Machine Learning Techniques',
    description: 'In-depth notes on advanced ML algorithms',
    category: 'Notes',
    subcategory: 'ML',
    uploader: 'John Doe',
    dateAdded: '2023-05-20',
    downloads: 750,
    tags: ['machine learning', 'algorithms'],
    school: 'MIT',
    program: 'Artificial Intelligence'
  },
  // Add more notes items here
]

export default function NotesSearchPage() {
  const [filteredNotes, setFilteredNotes] = useState(notes)

  const handleFilter = (filters: any) => {
    // Implement filtering logic here
    // For now, we'll just return all notes
    setFilteredNotes(notes)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">Search Notes</h1>
        <FilterPanel onFilter={handleFilter} />
        <ItemGrid items={filteredNotes} />
      </div>
    </div>
  )
}