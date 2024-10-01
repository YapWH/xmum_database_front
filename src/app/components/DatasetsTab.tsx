import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"

type Dataset = {
  id: number
  title: string
  description: string
  uploader: string
  dateAdded: string
  downloads: number
  tags: string[]
  category: string
  subcategory: string
}

const mockDatasets: Dataset[] = [
  {
    id: 1,
    title: "MNIST Handwritten Digits",
    description: "A large database of handwritten digits commonly used for training various image processing systems.",
    uploader: "Yann LeCun",
    dateAdded: "2021-05-15",
    downloads: 50000,
    tags: ["computer vision", "machine learning"],
    category: "CV",
    subcategory: "Image Classification",
  },
  // Add more mock datasets here
]

export default function DatasetsTab() {
  const [datasets, setDatasets] = useState<Dataset[]>(mockDatasets)
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDatasets = datasets.filter((dataset) =>
    dataset.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search datasets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDatasets.map((dataset) => (
          <motion.div key={dataset.id} layout>
            <Card>
              <CardHeader>
                <CardTitle>{dataset.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{dataset.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dataset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-tag-bg text-tag-text border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedDataset(dataset)}>View Details</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {selectedDataset && (
        <DatasetDetailsModal dataset={selectedDataset} onClose={() => setSelectedDataset(null)} />
      )}
    </div>
  )
}

function DatasetDetailsModal({ dataset, onClose }: { dataset: Dataset; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-background text-foreground overflow-y-auto">
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-4">{dataset.title}</h2>
        <p className="text-lg mb-6">{dataset.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <strong>Uploader:</strong> {dataset.uploader}
          </div>
          <div>
            <strong>Date Added:</strong> {dataset.dateAdded}
          </div>
          <div>
            <strong>Downloads:</strong> {dataset.downloads}
          </div>
          <div>
            <strong>Category:</strong> {dataset.category}
          </div>
          <div>
            <strong>Subcategory:</strong> {dataset.subcategory}
          </div>
        </div>
        <div className="mb-6">
          <strong>Tags:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {dataset.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs font-medium bg-tag-bg text-tag-text border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    </div>
  )
}