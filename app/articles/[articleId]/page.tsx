'use client'

import { useState} from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const article = {
  id: 1,
  title: 'The Future of AI',
  author: 'Jane Doe',
  date: '2023-06-01',
  abstract: 'This article explores the potential impact of artificial intelligence on various industries, discussing both the opportunities and challenges that lie ahead.',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: '/placeholder.jpg',
  pdfUrl: '/sample.pdf',
  websiteUrl: 'https://example.com/article'
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [showPdf, setShowPdf] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{article.title}</CardTitle>
          <CardDescription>By {article.author} | Published on {article.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Abstract</h2>
          <p className="mb-4">{article.abstract}</p>
          <h2 className="text-xl font-semibold mb-2">Article Preview</h2>
          <p className="mb-4">{article.content}</p>
        </CardContent>
      </Card>

      {article.pdfUrl ? (
        <div className="mb-8">
          <Button onClick={() => setShowPdf(!showPdf)} className="mb-4">
            {showPdf ? 'Hide PDF Preview' : 'Show PDF Preview'}
          </Button>
          {showPdf && (
            <iframe src={article.pdfUrl} className="w-full h-screen"></iframe>
          )}
        </div>
      ) : (
        <Button className="mb-8" asChild>
          <a href={article.websiteUrl} target="_blank" rel="noopener noreferrer">Visit Website</a>
        </Button>
      )}
    </div>
  )
}