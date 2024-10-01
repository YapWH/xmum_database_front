"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DatasetsTab from "./components/DatasetsTab"
import NotesTab from "./components/NotesTab"
import ArticlesTab from "./components/ArticlesTab"
import { Button } from "./components/ui/Button"
import { Input } from "./components/ui/Input"
import { Label } from "./components/ui/Label"

type Theme = "light" | "dark"

function DataLibrary() {
  const [activeTab, setActiveTab] = useState<"datasets" | "notes" | "articles">("datasets")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  return (
    <div className={`container mx-auto p-4 ${theme}`}>
      <style jsx global>{`
        :root {
          --background: white;
          --foreground: black;
          --primary: #0070f3;
          --primary-foreground: white;
          --secondary: #f0f0f0;
          --secondary-foreground: #2e2e2e;
          --accent: #fafafa;
          --accent-foreground: #2e2e2e;
          --border: #e0e0e0;
          --tag-bg: #e0e0e0;
          --tag-text: #333333;
        }
        .dark {
          --background: #1a1a1a;
          --foreground: white;
          --primary: #3291ff;
          --primary-foreground: white;
          --secondary: #2a2a2a;
          --secondary-foreground: #e0e0e0;
          --accent: #2c2c2c;
          --accent-foreground: #e0e0e0;
          --border: #404040;
          --tag-bg: #4a4a4a;
          --tag-text: #e0e0e0;
        }
        body {
          background-color: var(--background);
          color: var(--foreground);
        }
      `}</style>
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-4xl font-bold text-primary mr-4">Data Library</h1>
          <nav className="flex space-x-2" aria-label="Tabs">
            {["datasets", "notes", "articles"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 text-sm font-medium leading-5 rounded-full transition-colors border-2 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-secondary-foreground border-secondary hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={toggleTheme}
            className="rounded-full border-2 border-primary"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="rounded-full border-2 border-primary"
          >
            Upload
          </Button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "datasets" && <DatasetsTab />}
          {activeTab === "notes" && <NotesTab />}
          {activeTab === "articles" && <ArticlesTab />}
        </motion.div>
      </AnimatePresence>

      {isUploadOpen && (
        <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      )}
    </div>
  )
}

function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background text-foreground p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Upload New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              name="type"
              className="w-full p-2 border rounded bg-background text-foreground"
              required
            >
              <option value="">Select type</option>
              <option value="dataset">Dataset</option>
              <option value="note">Note</option>
              <option value="article">Article</option>
            </select>
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" required />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" name="tags" required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full border-2 border-primary"
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full border-2 border-primary">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DataLibrary