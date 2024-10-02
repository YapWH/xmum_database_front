'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import FilterPanel from '@/components/FilterPanel'
import UploadModal from '@/components/UploadModal'
import { Button } from '@/components/ui/button'

type Category = 'Dataset' | 'Notes' | 'Articles'
type Subcategory = 'CV' | 'NLP' | 'School' | 'Program'

interface Item {
  id: string
  title: string
  description: string
  category: Category
  subcategory: Subcategory
  uploader: string
  dateAdded: string
  downloads: number
  tags: string[]
}

const initialItems: Item[] = [
  {
    id: '1',
    title: 'MNIST Dataset',
    description: 'Handwritten digit dataset for machine learning',
    category: 'Dataset',
    subcategory: 'CV',
    uploader: 'John Doe',
    dateAdded: '2023-05-01',
    downloads: 1000,
    tags: ['machine learning', 'computer vision']
  },
  {
    id: '2',
    title: 'Introduction to NLP',
    description: 'Comprehensive notes on Natural Language Processing',
    category: 'Notes',
    subcategory: 'NLP',
    uploader: 'Jane Smith',
    dateAdded: '2023-05-15',
    downloads: 500,
    tags: ['nlp', 'machine learning']
  },
  // Add more items as needed
]

export default function Home() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [filteredItems, setFilteredItems] = useState<Item[]>(initialItems)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleFilter = (filters: Partial<Item>) => {
    const filtered = items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '') return true
        if (key === 'tags') return (item[key] as string[]).includes(value as string)
        return item[key as keyof Item] === value
      })
    })
    setFilteredItems(filtered)
  }

  const handleUpload = (newItem: Item) => {
    setItems([...items, newItem])
    setFilteredItems([...filteredItems, newItem])
    setIsUploadModalOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="flex justify-between items-center mb-8">
          <Button onClick={() => setIsUploadModalOpen(true)}>Upload Item</Button>
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <FilterPanel onFilter={handleFilter} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ItemGrid items={filteredItems} />
        </motion.div>
      </div>
      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} onUpload={handleUpload} />
      )}
    </div>
  )
}