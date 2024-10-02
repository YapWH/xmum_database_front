import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface UploadModalProps {
  onClose: () => void
  onUpload: (item: any) => void
}

export default function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = {
      id: Date.now().toString(),
      title,
      description,
      category,
      subcategory,
      uploader: 'Current User', // Replace with actual user data
      dateAdded: new Date().toISOString().split('T')[0],
      downloads: 0,
      tags: tags.split(',').map(tag => tag.trim()),
    }
    onUpload(newItem)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Select onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dataset">Dataset</SelectItem>
              <SelectItem value="Notes">Notes</SelectItem>
              <SelectItem value="Articles">Articles</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSubcategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CV">CV</SelectItem>
              <SelectItem value="NLP">NLP</SelectItem>
              <SelectItem value="School">School</SelectItem>
              <SelectItem value="Program">Program</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <Button type="submit">Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}