'use client'

import { useState, useMemo } from 'react'
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
  {
    id: '3',
    title: 'Deep Learning Advances',
    description: 'Recent advancements in deep learning techniques',
    category: 'Articles',
    subcategory: 'CV',
    uploader: 'Alice Johnson',
    dateAdded: '2023-06-01',
    downloads: 750,
    tags: ['deep learning', 'ai']
  }
]

export default function Home() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [filters, setFilters] = useState({
    category: 'All',
    subcategory: 'All',
    tags: [] as string[],
    dateRange: 'All',
    searchQuery: ''
  })

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const handleUpload = (newItem: Item) => {
    setItems([...items, newItem])
    setIsUploadModalOpen(false)
  }

  const handleCategoryChange = (category: Category | 'All') => {
    setActiveCategory(category)
    setFilters({ ...filters, category })
  }

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const categoryMatch = filters.category === 'All' || item.category === filters.category
      const subcategoryMatch = filters.subcategory === 'All' || item.subcategory === filters.subcategory
      const tagsMatch = filters.tags.length === 0 || filters.tags.some(tag => item.tags.includes(tag))
      const searchMatch = item.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      
      let dateMatch = true
      if (filters.dateRange !== 'All') {
        const itemDate = new Date(item.dateAdded)
        const now = new Date()
        switch (filters.dateRange) {
          case 'Last 24 hours':
            dateMatch = now.getTime() - itemDate.getTime() <= 24 * 60 * 60 * 1000
            break
          case 'Last 7 days':
            dateMatch = now.getTime() - itemDate.getTime() <= 7 * 24 * 60 * 60 * 1000
            break
          case 'Last 30 days':
            dateMatch = now.getTime() - itemDate.getTime() <= 30 * 24 * 60 * 60 * 1000
            break
        }
      }

      return categoryMatch && subcategoryMatch && tagsMatch && dateMatch && searchMatch
    })
  }, [items, filters])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Header activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsUploadModalOpen(true)}>Upload Item</Button>
            <Button onClick={toggleTheme} variant="outline" size="icon">
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </div>
        <FilterPanel onFilter={handleFilter} allTags={Array.from(new Set(items.flatMap(item => item.tags)))} />
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