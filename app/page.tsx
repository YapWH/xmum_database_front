import Link from 'next/link'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, BookOpen, FileText } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to XMUM Database Directory</h1>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <Database className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Datasets</CardTitle>
              <CardDescription>Explore our collection of datasets for your research and projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/datasets/home">
                <Button size="lg" className="w-full">Go to Datasets</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <BookOpen className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Notes</CardTitle>
              <CardDescription>Access comprehensive study notes from various courses and subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/notes/home">
                <Button size="lg" className="w-full">Go to Notes</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <FileText className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Articles</CardTitle>
              <CardDescription>Read and share academic articles on various topics</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/articles/home">
                <Button size="lg" className="w-full">Go to Articles</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}