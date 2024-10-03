import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Item } from '../types'
import { ThumbsUp, Download } from 'lucide-react'

export default function ItemGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link key={item.id} href={`/${item.category.toLowerCase()}/${item.id}`}>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription className="text-sm">{item.subcategory}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm line-clamp-3">{item.description}</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground flex justify-between items-center">
              <div>{item.uploader} • {new Date(item.dateAdded).toLocaleDateString()}</div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {item.likes}
                </span>
                <span className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  {item.downloads}
                </span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}