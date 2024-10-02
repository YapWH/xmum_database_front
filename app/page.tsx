'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import ItemGrid from '@/components/ItemGrid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Item } from '@/types'

const trendingCategories = [
  {
    name: 'Machine Learning',
    items: [
      {
        id: '1',
        title: 'Introduction to Machine Learning',
        description: 'A comprehensive guide to ML basics',
        category: 'Notes',
        subcategory: 'ML',
        uploader: 'John Doe',
        dateAdded: '2023-06-01',
        downloads: 1000,
        tags: ['machine learning', 'ai'],
        school: 'Stanford',
        program: 'Computer Science'
      },
      {
        id: '2',
        title: 'MNIST Dataset',
        description: 'Handwritten digit dataset for machine learning',
        category: 'Dataset',
        subcategory: 'CV',
        uploader: 'Jane Smith',
        dateAdded: '2023-05-15',
        downloads: 5000,
        tags: ['machine learning', 'computer vision'],
        datasetSize: '11.5 MB',
        fileFormat: 'CSV'
      },
    ]
  },
  {
    name: 'Computer Vision',
    items: [
      {
        id: '3',
        title: 'Advanced Computer Vision Techniques',
        description: 'Exploring state-of-the-art CV algorithms',
        category: 'Articles',
        subcategory: 'CV',
        uploader: 'Alice Johnson',
        dateAdded: '2023-05-30',
        downloads: 750,
        tags: ['computer vision', 'deep learning'],
        school: 'MIT',
        program: 'Artificial Intelligence',
        publicationDate: '2023-05-25'
      },
      {
        id: '4',
        title: 'ImageNet',
        description: 'Large-scale image recognition dataset',
        category: 'Dataset',
        subcategory: 'CV',
        uploader: 'Bob Williams',
        dateAdded: '2023-05-10',
        downloads: 10000,
        tags: ['computer vision', 'deep learning'],
        datasetSize: '150 GB',
        fileFormat: 'JPEG'
      },
    ]
  },
  {
    name: 'Natural Language Processing',
    items: [
      {
        id: '5',
        title: 'NLP Fundamentals',
        description: 'Essential concepts in Natural Language Processing',
        category: 'Notes',
        subcategory: 'NLP',
        uploader: 'Charlie Brown',
        dateAdded: '2023-06-05',
        downloads: 800,
        tags: ['nlp', 'machine learning'],
        school: 'Berkeley',
        program: 'Data Science'
      },
      {
        id: '6',
        title: 'Transformer Architecture Explained',
        description: 'Deep dive into the Transformer model',
        category: 'Articles',
        subcategory: 'NLP',
        uploader: 'Diana Prince',
        dateAdded: '2023-06-02',
        downloads: 1200,
        tags: ['nlp', 'deep learning', 'transformers'],
        school: 'Oxford',
        program: 'Computational Linguistics',
        publicationDate: '2023-06-01'
      },
    ]
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Welcome to XMUM Database Directory</h1>

          {trendingCategories.map((category, index) => (
            <section key={category.name} className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Trending in {category.name}</h2>
              <ItemGrid items={category.items} />
              <div className="mt-4">
                <Link href={`/category/${category.name}`}>
                  <Button variant="outline">View all {category.name} items</Button>
                </Link>
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-3xl font-bold mb-6">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/datasets">
                <Button className="w-full text-lg py-6">Datasets</Button>
              </Link>
              <Link href="/notes">
                <Button className="w-full text-lg py-6">Notes</Button>
              </Link>
              <Link href="/articles">
                <Button className="w-full text-lg py-6">Articles</Button>
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}