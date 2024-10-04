import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FilterPanelProps {
  onFilter: (filters: FilterState) => void
}

interface FilterState {
  search: string
  category: string
  dateRange: string
  tags: string[]
}

const categories = ['All', 'Dataset', 'Notes', 'Articles']
const dateRanges = ['All Time', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days']
const allTags = ['machine learning', 'computer vision', 'nlp', 'deep learning', 'ai', 'data science']

export default function FilterPanel({ onFilter }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    dateRange: 'All Time',
    tags: [],
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    onFilter(filters)
  }, [filters, onFilter])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }))
  }

  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({ ...prev, category: value }))
  }

  const handleDateRangeChange = (value: string) => {
    setFilters(prev => ({ ...prev, dateRange: value }))
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      tags: checked
        ? [...prev.tags, tag]
        : prev.tags.filter(t => t !== tag)
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      dateRange: 'All Time',
      tags: [],
    })
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="flex justify-between w-full mb-4">
          <span>Filters</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-4">
        <div className="space-y-4 p-4 bg-background border rounded-lg shadow-sm">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search items..."
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={filters.dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger id="dateRange">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-4">
              {allTags.map(tag => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag}
                    checked={filters.tags.includes(tag)}
                    onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                  />
                  <Label htmlFor={tag}>{tag}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}