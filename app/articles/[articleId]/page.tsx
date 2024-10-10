import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const articles = [
  { id: 1, title: 'The Future of AI', description: 'Exploring the potential impact of artificial intelligence on various industries.', image: '/placeholder.jpg' },
  { id: 2, title: 'Sustainable Energy Solutions', description: 'Innovative approaches to renewable energy and their global implications.', image: '/placeholder.jpg' },
  { id: 3, title: 'The Rise of Quantum Computing', description: 'Understanding the principles and applications of quantum computing technology.', image: '/placeholder.jpg' },
  { id: 4, title: 'Cybersecurity in the Digital Age', description: 'Strategies for protecting data and privacy in an increasingly connected world.', image: '/placeholder.jpg' },
  { id: 5, title: 'Advancements in Biotechnology', description: 'Recent breakthroughs in genetic engineering and their potential medical applications.', image: '/placeholder.jpg' },
  { id: 6, title: 'The Future of Work', description: 'How technology and global trends are reshaping the workplace and job market.', image: '/placeholder.jpg' },
]

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
            <Image
              src={article.image}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>{article.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/article/${article.id}`} passHref>
                <Button className="w-full">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button className="w-18">Load More Articles</Button>
      </div>
    </div>
  )
}