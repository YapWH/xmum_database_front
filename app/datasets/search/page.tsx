'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import FilterPanel from '@/components/FilterPanel'
import { Dataset } from '@/types'

const datasets: Dataset[] = [
  {
    id: '1',
    title: 'MNIST Dataset',
    description: 'Handwritten digit dataset for machine learning Handwritten digit dataset for machine learning Handwritten digit dataset for machine learning',
    category: 'Dataset',
    subcategory: 'CV',
    uploader: 'John Doe',
    dateAdded: '2023-05-01',
    downloads: 1000,
    tags: ['machine learning', 'computer vision'],
    datasetSize: '11.5 MB',
    fileFormat: 'CSV',
    views: 5000,
    likes: 500,
    dislikes: 50,
    source: 'https://example.com/mnist-dataset',
  },
  {
    id: '2',
    title: 'ImageNet',
    description: 'Large-scale image recognition dataset',
    category: 'Dataset',
    subcategory: 'CV',
    uploader: 'Jane Smith',
    dateAdded: '2023-04-15',
    downloads: 5000,
    tags: ['computer vision', 'deep learning'],
    datasetSize: '150 GB',
    fileFormat: 'JPEG',
    views: 10000,
    likes: 1000,
    dislikes: 100,
    source: 'https://example.com/imagenet-dataset',
  },
]

export default function DatasetsSearchPage() {
  const [filteredDatasets, setFilteredDatasets] = useState(datasets)

  const handleFilter = (filters: any) => {
    // Implement filtering logic here
    setFilteredDatasets(datasets)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">Search Datasets</h1>
        <div className="mb-12"> {/* Increased margin-bottom */}
          <FilterPanel onFilter={handleFilter} /> <div></div>
        </div>
        <ItemGrid items={filteredDatasets} />
      </div>
    </div>
  )
}