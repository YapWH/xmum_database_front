'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { Combobox } from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import { Item } from '@/types'
import PlaceHolderDatasets from '@/placeholder'

const auditStatusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

const categoryOptions = [
  { value: 'datasets', label: 'Datasets' },
  { value: 'notes', label: 'Notes' },
  { value: 'articles', label: 'Articles' },
]

export default function AdminAuditPage() {
  const [items, setItems] = useState<Item[]>([])
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [editedItem, setEditedItem] = useState<Item | null>(null)

  useEffect(() => {
    // Fetch items from API
    const fetchItems = async () => {
      // Replace this with actual API call to fetch items
      setItems(PlaceHolderDatasets)
    }
    fetchItems()
  }, [])

  const handleEdit = (item: Item) => {
    setSelectedItem(item)
    setEditedItem({ ...item })
  }

  const handleSave = async () => {
    if (!editedItem) return

    // Replace this with actual API call to update item
    const updatedItems = items.map(item => 
      item.id === editedItem.id ? editedItem : item
    )
    setItems(updatedItems)
    setSelectedItem(null)
    setEditedItem(null)
    toast({ title: "Item updated successfully" })
  }

  const handleDelete = async (id: string) => {
    // Replace this with actual API call to delete item
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
    toast({ title: "Item deleted successfully" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-3xl font-bold mb-6">Admin Audit Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Items List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Audit Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.auditStatus}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(item)} className="mr-2">Edit</Button>
                        <Button variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {selectedItem && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Item</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editedItem?.title || ''}
                      onChange={(e) => setEditedItem(prev => ({ ...prev!, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editedItem?.description || ''}
                      onChange={(e) => setEditedItem(prev => ({ ...prev!, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Combobox
                      value={editedItem?.category || ''}
                      onChange={(value) => setEditedItem(prev => ({ ...prev!, category: value }))}
                      options={categoryOptions}
                      placeholder="Select category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="auditStatus">Audit Status</Label>
                    <Combobox
                      value={editedItem?.auditStatus || ''}
                      onChange={(value) => setEditedItem(prev => ({ ...prev!, auditStatus: value }))}
                      options={auditStatusOptions}
                      placeholder="Select audit status"
                    />
                  </div>
                  <Button onClick={handleSave}>Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}