import Link from 'next/link'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotesHomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">Notes Home</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Popular Notes</CardTitle>
              <CardDescription>Explore the most viewed study notes</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/notes/popular">
                <Button className="w-full">View Popular Notes</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>Check out the latest note additions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/notes/recent">
                <Button className="w-full">View Recent Uploads</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Subjects</CardTitle>
              <CardDescription>Browse notes by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/notes/subjects">
                <Button className="w-full">Explore Subjects</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Link href="/notes">
            <Button size="lg">Search All Notes</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}