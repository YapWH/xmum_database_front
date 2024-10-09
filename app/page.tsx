import Link from 'next/link'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, BookOpen, FileText } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold mb-20 text-center">Welcome to XMUM Database</h1>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl w-full">
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center mb-4" style={{margin:'0 auto'}}>
                  <Database className="w-full h-full text-primary" />
                </div>
                <CardTitle>Datasets</CardTitle>
                <CardDescription>Explore our collection of datasets for your research and projects</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/datasets">
                  <Button size="lg" className="w-full">Go to Datasets</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center mb-4" style={{margin:'0 auto'}}>
                  <BookOpen className="w-full h-full text-primary" />
                </div>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Access comprehensive study notes from various courses</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/notes">
                  <Button size="lg" className="w-full">Go to Notes</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center mb-4" style={{margin:'0 auto'}}>
                  <FileText className="w-full h-full text-primary" />
                </div>
                <CardTitle>Articles</CardTitle>
                <CardDescription>Read and share academic articles on various topics</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/articles">
                  <Button size="lg" className="w-full">Go to Articles</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}