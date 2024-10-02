import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { Article } from '../types'

interface ArticleItemProps {
  item: Article
}

export function ArticleItem({ item }: ArticleItemProps) {
  return (
    <Link href={`/item/${item.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.subcategory}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">School: {item.school}</p>
          <p className="text-sm text-muted-foreground">Program: {item.program}</p>
          <p className="text-sm text-muted-foreground">Published on: {item.publicationDate}</p>
          <p className="text-sm text-muted-foreground">Uploaded by {item.uploader} on {item.dateAdded}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> {item.downloads}
          </Button>
          <Button variant="outline" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" /> Like
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}