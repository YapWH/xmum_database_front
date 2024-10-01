import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"

type Article = {
  id: number
  title: string
  description: string
  author: string
  datePublished: string
  views: number
  tags: string[]
  category: string
  subcategory: string
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Advances in Transformer Models",
    description: "An in-depth look at recent developments in transformer architectures for various NLP tasks.",
    author: "John Smith",
    datePublished: "2023-01-22",
    views: 3000,
    tags: ["transformers", "deep learning"],
    category: "NLP",
    subcategory: "Research",
  },
  // Add more mock articles here
]

export default function ArticlesTab() {
  const [articles, setArticles] = useState<Article[]>(mockArticles)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <motion.div key={article.id} layout>
            <Card>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{article.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedArticle(article)}>View Details</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {selectedArticle && (
        <ArticleDetailsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </div>
  )
}

function ArticleDetailsModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background text-foreground p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
        <p className="mb-4">{article.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Author:</strong> {article.author}
          </div>
          <div>
            <strong>Date Published:</strong> {article.datePublished}
          </div>
          <div>
            <strong>Views:</strong> {article.views}
          </div>
          <div>
            <strong>Category:</strong> {article.category}
          </div>
          <div>
            <strong>Subcategory:</strong> {article.subcategory}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}