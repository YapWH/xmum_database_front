'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface ReportedItem {
  id: string
  itemId: string
  itemTitle: string
  reportReason: string
  reportedBy: string
  reportDate: string
  status: 'pending' | 'reviewed' | 'resolved'
  details: string
}

// Placeholder data
const placeholderReportedItems: ReportedItem[] = [
  {
    id: '1',
    itemId: 'item1',
    itemTitle: 'Suspicious Dataset',
    reportReason: 'Copyright infringement',
    reportedBy: 'user@example.com',
    reportDate: '2023-07-01',
    status: 'pending',
    details: 'This dataset appears to contain copyrighted material without proper attribution.',
  },
  {
    id: '2',
    itemId: 'item2',
    itemTitle: 'Inappropriate Content',
    reportReason: 'Offensive material',
    reportedBy: 'anotheruser@example.com',
    reportDate: '2023-07-02',
    status: 'reviewed',
    details: 'The content includes offensive language and inappropriate imagery.',
  },
  {
    id: '3',
    itemId: 'item3',
    itemTitle: 'Misleading Information',
    reportReason: 'Factual inaccuracies',
    reportedBy: 'researcher@example.com',
    reportDate: '2023-07-03',
    status: 'resolved',
    details: 'The article contains several factual errors that need to be corrected.',
  },
]

export default function ReportedItemsPage() {
  const [reportedItems, setReportedItems] = useState<ReportedItem[]>([])
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    fetchReportedItems()
  })

  const fetchReportedItems = async () => {
    try {
      // In a real application, this would be an API call
      // For now, we'll use the placeholder data
      setReportedItems(placeholderReportedItems)
    } catch (error) {
      console.error('Error fetching reported items:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch reported items. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleReviewItem = async (itemId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setReportedItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, status: 'reviewed' } : item
        )
      )
      toast({
        title: 'Success',
        description: 'Item has been marked as reviewed.',
      })
    } catch (error) {
      console.error('Error reviewing item:', error)
      toast({
        title: 'Error',
        description: 'Failed to review item. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleResolveItem = async (itemId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setReportedItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, status: 'resolved' } : item
        )
      )
      toast({
        title: 'Success',
        description: 'Item has been resolved.',
      })
    } catch (error) {
      console.error('Error resolving item:', error)
      toast({
        title: 'Error',
        description: 'Failed to resolve item. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setReportedItems(prevItems => prevItems.filter(item => item.id !== itemId))
      toast({
        title: 'Success',
        description: 'Item has been deleted.',
      })
    } catch (error) {
      console.error('Error deleting item:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete item. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Reported Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Title</TableHead>
                  <TableHead>Report Reason</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Report Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.itemTitle}</TableCell>
                    <TableCell>{item.reportReason}</TableCell>
                    <TableCell>{item.reportedBy}</TableCell>
                    <TableCell>{item.reportDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'pending'
                            ? 'destructive'
                            : item.status === 'reviewed'
                            ? 'default'
                            : 'outline'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Details</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Report Details</DialogTitle>
                              <DialogDescription>
                                <p><strong>Item Title:</strong> {item.itemTitle}</p>
                                <p><strong>Report Reason:</strong> {item.reportReason}</p>
                                <p><strong>Reported By:</strong> {item.reportedBy}</p>
                                <p><strong>Report Date:</strong> {item.reportDate}</p>
                                <p><strong>Status:</strong> {item.status}</p>
                                <p><strong>Details:</strong> {item.details}</p>
                              </DialogDescription>
                            </DialogHeader>
                            <Button onClick={() => window.open(`/items/${item.itemId}`, '_blank')}>
                              View Item
                            </Button>
                          </DialogContent>
                        </Dialog>
                        <Button
                          onClick={() => handleReviewItem(item.id)}
                          variant="outline"
                          disabled={item.status !== 'pending'}
                        >
                          Review
                        </Button>
                        <Button 
                          onClick={() => handleResolveItem(item.id)}
                          disabled={item.status === 'resolved'}
                        >
                          Resolve
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the reported item.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}