import Link from 'next/link'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ArticlesHomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">Articles Home</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Featured Articles</CardTitle>
              <CardDescription>Read our top-picked articles</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/articles/featured">
                <Button className="w-full">View Featured Articles</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Publications</CardTitle>
              <CardDescription>Check out the latest article publications</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/articles/recent">
                <Button className="w-full">View Recent Publications</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Topics</CardTitle>
              <CardDescription>Browse articles by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/articles/topics">
                <Button className="w-full">Explore Topics</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Link href="/articles/search">
            <Button size="lg">Search All Articles</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}