import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">XMUM Database Directory</h1>
      <Tabs defaultValue="dataset">
        <TabsList>
          <TabsTrigger value="dataset">Datasets</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  )
}