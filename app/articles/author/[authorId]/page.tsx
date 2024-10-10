import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const author = {
  id: 1,
  name: 'Jane Doe',
  bio: 'Jane Doe is an expert in artificial intelligence and its applications in various industries.',
  image: '/placeholder.jpg'
}

const articles = [
  { id: 1, title: 'The Future of AI', description: 'Exploring the potential impact of artificial intelligence on various industries.', image: '/placeholder.jpg' },
  { id: 2, title: 'Machine Learning in Healthcare', description: 'How AI is revolutionizing medical diagnosis and treatment.', image: '/placeholder.jpg' },
  { id: 3, title: 'Ethics in AI Development', description: 'Addressing the moral implications of advanced artificial intelligence.', image: '/placeholder.jpg' },
  { id: 4, title: 'AI in Financial Services', description: 'The role of AI in transforming banking and investment strategies.', image: '/placeholder.jpg' },
  { id: 5, title: 'Natural Language Processing Advancements', description: 'Recent breakthroughs in AI-powered language understanding and generation.', image: '/placeholder.jpg' },
  { id: 6, title: 'AI and the Future of Work', description: 'How artificial intelligence is reshaping job markets and career paths.', image: '/placeholder.jpg' },
]

export default function AuthorPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-center">
          <Image
            src={author.image}
            alt={author.name}
            width={100}
            height={100}
            className="rounded-full mb-4 sm:mb-0 sm:mr-4"
          />
          <div>
            <CardTitle className="text-3xl text-center sm:text-left">{author.name}</CardTitle>
            <CardDescription className="text-center sm:text-left">{author.bio}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Articles by {author.name}</h2>
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
    </div>
  )
}