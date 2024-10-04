import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import PlaceHolderDatasets from '@/placeholder'
import { Dataset } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Upload } from 'lucide-react'

const datasetsByTag: Record<string, Dataset[]> = {
  'machine-learning': PlaceHolderDatasets.filter((d) => d.tags.includes('machine learning')),
  'computer-vision': PlaceHolderDatasets.filter((d) => d.tags.includes('computer vision')),
  'natural-language-processing': PlaceHolderDatasets.filter((d) => d.tags.includes('natural language processing')),
  'deep-learning': PlaceHolderDatasets.filter((d) => d.tags.includes('deep learning')),
}

export default function CategoriesDatasetsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
      <Header />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dataset by Categories</h1>
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
        {Object.entries(datasetsByTag).map(([tag, items]) => (
          <div key={tag} className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Top {tag.replace('-', ' ')} Datasets</h2>
            <ItemGrid items={items.slice(0, 3)} />
          </div>
        ))}
      </div>
    </div>
  )
}