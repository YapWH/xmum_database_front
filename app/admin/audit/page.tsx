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
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import PlaceHolderDatasets from '@/placeholder'

interface Item {
  id: string
  title: string
  description: string
  category: string
  auditStatus: string
}

const auditStatusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

const categoryOptions = [
  { value: 'Datasets', label: 'Datasets' },
  { value: 'Notes', label: 'Notes' },
  { value: 'Articles', label: 'Articles' },
]

export default function AdminAuditPage() {
  const [items, setItems] = useState<Item[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [editedItem, setEditedItem] = useState<Item | null>(null)
  const [filterValue, setFilterValue] = useState('')
  const [selectedAuditStatuses, setSelectedAuditStatuses] = useState<string[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  useEffect(() => {
    // Fetch items from API
    const fetchItems = async () => {
      // Replace this with actual API call
      const mockItems: Item[] = PlaceHolderDatasets
      setItems(mockItems)
      setFilteredItems(mockItems)
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
    setFilteredItems(updatedItems)
    setSelectedItem(null)
    setEditedItem(null)
    toast({ title: "Item updated successfully" })
  }

  const handleDelete = async (id: string) => {
    setItemToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    // Replace this with actual API call to delete item
    const updatedItems = items.filter(item => item.id !== itemToDelete)
    setItems(updatedItems)
    setFilteredItems(updatedItems)
    setIsDeleteDialogOpen(false)
    setItemToDelete(null)
    toast({ title: "Item deleted successfully" })
  }

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFilterValue(value)
    applyFilters(value, selectedAuditStatuses)
  }

  const handleAuditStatusChange = (status: string) => {
    const updatedStatuses = selectedAuditStatuses.includes(status)
      ? selectedAuditStatuses.filter(s => s !== status)
      : [...selectedAuditStatuses, status]
    setSelectedAuditStatuses(updatedStatuses)
    applyFilters(filterValue, updatedStatuses)
  }

  const applyFilters = (searchValue: string, statuses: string[]) => {
    const filtered = items.filter(item => 
      (item.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.auditStatus.toLowerCase().includes(searchValue.toLowerCase())) &&
      (statuses.length === 0 || statuses.includes(item.auditStatus))
    )
    setFilteredItems(filtered)
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
              <Input
                placeholder="Filter items..."
                value={filterValue}
                onChange={handleFilter}
                className="mb-4"
              />
              <div className="flex flex-wrap gap-4 mb-4">
                {auditStatusOptions.map((status) => (
                  <div key={status.value} className="flex items-center">
                    <Checkbox
                      id={`status-${status.value}`}
                      checked={selectedAuditStatuses.includes(status.value)}
                      onCheckedChange={() => handleAuditStatusChange(status.value)}
                    />
                    <label
                      htmlFor={`status-${status.value}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Audit Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}