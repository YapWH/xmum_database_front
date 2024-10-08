'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'

interface DownloadButtonProps {
  itemId: string
  itemName: string
}

export function DownloadButton({ itemId, itemName }: DownloadButtonProps) {
  const [showAgreement, setShowAgreement] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleDownload = () => {
    setShowAgreement(true)
  }

  const confirmDownload = () => {
    if (agreed) {
      // Implement the actual download logic here
      console.log(`Downloading item: ${itemName} (ID: ${itemId})`)
      setShowAgreement(false)
      setAgreed(false)
    }
  }

  return (
    <>
      <Button onClick={handleDownload}>Download</Button>
      <Dialog open={showAgreement} onOpenChange={setShowAgreement}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>License Agreement</DialogTitle>
            <DialogDescription>
              Please read and accept our license agreement before downloading.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <h4 className="mb-4 text-sm font-medium">Website Item Usage Agreement</h4>
            <p className="text-sm text-muted-foreground">
              1. Acceptance of Terms: By downloading any item from our website, you agree to be bound by the terms and conditions of this agreement.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              2. License Grant: We grant you a non-exclusive, non-transferable license to use the downloaded item for personal or commercial purposes, subject to the restrictions in this agreement.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              3. Restrictions: You may not redistribute, sell, lease, license, or sub-license the item, or use it as part of a product for sale, without explicit permission from us.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              4. Copyright: All items remain the property of their respective copyright holders. You may not claim intellectual or exclusive ownership over any of our items, modified or unmodified.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              5. Liability: Items are provided "as is" without warranty of any kind, express or implied. In no event shall we be liable for any claim, damages or other liability arising from the use of the item.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              6. Termination: This license is effective until terminated by you or us. Your rights under this license will terminate automatically without notice if you fail to comply with any of its terms.
            </p>
          </ScrollArea>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
            <Label htmlFor="terms">I agree to the license terms</Label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAgreement(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDownload} disabled={!agreed}>
              Accept & Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}