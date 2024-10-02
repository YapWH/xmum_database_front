import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, ThumbsUp } from 'lucide-react'

interface Item {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  uploader: string
  dateAdded: string
  downloads: number
  tags: string[]
}

interface ItemGridProps {
  items: Item[]
}

export default function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.category} - {item.subcategory}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
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
        </motion.div>
      ))}
    </div>
  )
}