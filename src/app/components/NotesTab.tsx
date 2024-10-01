import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"

type Note = {
  id: number
  title: string
  description: string
  author: string
  dateAdded: string
  likes: number
  tags: string[]
  category: string
  subcategory: string
}

const mockNotes: Note[] = [
  {
    id: 1,
    title: "Introduction to Natural Language Processing",
    description: "Comprehensive notes on the basics of NLP, including tokenization, stemming, and parsing.",
    author: "Jane Doe",
    dateAdded: "2022-03-10",
    likes: 1500,
    tags: ["nlp", "linguistics"],
    category: "NLP",
    subcategory: "Fundamentals",
  },
  // Add more mock notes here
]

export default function NotesTab() {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <motion.div key={note.id} layout>
            <Card>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{note.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
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
                <Button onClick={() => setSelectedNote(note)}>View Details</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {selectedNote && (
        <NoteDetailsModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  )
}

function NoteDetailsModal({ note, onClose }: { note: Note; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background text-foreground p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
        <p className="mb-4">{note.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Author:</strong> {note.author}
          </div>
          <div>
            <strong>Date Added:</strong> {note.dateAdded}
          </div>
          <div>
            <strong>Likes:</strong> {note.likes}
          </div>
          <div>
            <strong>Category:</strong> {note.category}
          </div>
          <div>
            <strong>Subcategory:</strong> {note.subcategory}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag) => (
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