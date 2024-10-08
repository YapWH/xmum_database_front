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
  creatorName: string
}

export function DownloadButton({ itemId, itemName, creatorName }: DownloadButtonProps) {
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
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <h4 className="mb-4 text-sm font-medium">License Agreement for {itemName}</h4>
            <p className="text-sm text-muted-foreground">
              1. Acceptance of Terms: By downloading this item, you agree to be bound by the terms and conditions of this license agreement.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              2. License Grant: We grant you a limited, non-exclusive license to use the downloaded item, subject to the restrictions in this agreement.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              3. Modification: You are allowed to modify the downloaded item. However, you must give credit to the original creator, {creatorName}, in any derivative works.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              4. Distribution: You may share or distribute this item internally within campus. External distribution (outside XMUM) is strictly prohibited.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              5. Usage Restrictions: The item and any derivatives may only be used for personal and non-commercial applications, and only within your campus.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              6. Credit: In all uses and modifications of the item, you must provide clear credit to the original creator, {creatorName}.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              7. No Transfer: You may not transfer your rights under this license to any third party outside XMUM.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              8. Termination: This license is effective until terminated. Your rights under this license will terminate automatically without notice if you fail to comply with any of its terms.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              9. Disclaimer of Warranty: The item is provided "as is" without warranty of any kind, either expressed or implied.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              10. Limitation of Liability: In no event shall we or the creator be liable for any damages arising out of the use of or inability to use the item.
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