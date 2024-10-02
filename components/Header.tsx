import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface HeaderProps {
  activeCategory: 'All' | 'Dataset' | 'Notes' | 'Articles'
  onCategoryChange: (category: string) => void
}

export default function Header({ activeCategory, onCategoryChange }: HeaderProps) {
  return (
    <header className="flex items-center space-x-8">
      <h1 className="text-4xl font-bold">XMUM Database Directory</h1>
      <Tabs value={activeCategory} onValueChange={onCategoryChange}>
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Dataset">Datasets</TabsTrigger>
          <TabsTrigger value="Notes">Notes</TabsTrigger>
          <TabsTrigger value="Articles">Articles</TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  )
}