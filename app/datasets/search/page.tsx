'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import FilterPanel from '@/components/FilterPanel'
import PlaceHolderDatasets from '@/placeholder'

export default function DatasetsSearchPage() {
  const [filteredDatasets, setFilteredDatasets] = useState(PlaceHolderDatasets)

  const handleFilter = (filters: any) => {
    // Implement filtering logic here
    setFilteredDatasets(PlaceHolderDatasets)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">Search Datasets</h1>
        <div className="mb-4">
          <FilterPanel onFilter={handleFilter} />
        </div>
        <ItemGrid items={filteredDatasets} />
      </div>
    </div>
  )
}