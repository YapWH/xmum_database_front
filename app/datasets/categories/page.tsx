import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import PlaceHolderDataset from '@/placeholder'

export default function CategoriesDatasetsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">Popular Datasets</h1>
        <ItemGrid items={PlaceHolderDataset} />
      </div>
    </div>
  )
}