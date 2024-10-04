import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import PlaceHolderDataset from '@/placeholder'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Upload } from 'lucide-react'

export default function RecentDatasetsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
      <Header />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Recent Uploads</h1>
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
        <ItemGrid items={PlaceHolderDataset} />
      </div>
    </div>
  )
}