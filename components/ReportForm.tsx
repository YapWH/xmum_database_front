import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'

export default function ReportForm({ itemId, itemTitle }: { itemId: string, itemTitle: string }) {
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the report to your server
    console.log('Report submitted:', { itemId, itemTitle, reason, description })
    toast({
      title: "Report Submitted",
      description: "Thank you for your report. We will review it shortly.",
    })
    // Reset form and close dialog
    setReason('')
    setDescription('')
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Report Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Item</DialogTitle>
          <DialogDescription>
            Please provide details about why you're reporting this item.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason for Report</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Copyright Infringement, Inappropriate Content"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide more details about the issue"
              required
              rows={4}
            />
          </div>
          <Button type="submit">Submit Report</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}