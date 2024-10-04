import Header from '@/components/Header'
import { ItemGridSkeleton } from '@/components/ItemSkeleton'
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="mb-12">
          <Skeleton className="h-[200px] w-full" />
        </div>
        <ItemGridSkeleton />
      </div>
    </div>
  )
}