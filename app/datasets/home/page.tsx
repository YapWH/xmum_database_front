import Link from 'next/link'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DatasetsHomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">Datasets Home</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Popular Datasets</CardTitle>
              <CardDescription>Explore the most downloaded datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/datasets/popular">
                <Button className="w-full">View Popular Datasets</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>Check out the latest dataset additions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/datasets/recent">
                <Button className="w-full">View Recent Uploads</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Browse datasets by category</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/datasets/categories">
                <Button className="w-full">Explore Categories</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Link href="/datasets">
            <Button size="lg">Search All Datasets</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}