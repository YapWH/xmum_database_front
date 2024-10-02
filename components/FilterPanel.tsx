import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface FilterPanelProps {
  onFilter: (filters: any) => void
  allTags: string[]
}

export default function FilterPanel({ onFilter, allTags }: FilterPanelProps) {
  const [category, setCategory] = useState('All')
  const [subcategory, setSubcategory] = useState('All')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateRange, setDateRange] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    handleFilter()
  }, [category, subcategory, selectedTags, dateRange, searchQuery])

  const handleFilter = () => {
    onFilter({ category, subcategory, tags: selectedTags, dateRange, searchQuery })
  }

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-wrap gap-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Dataset">Dataset</SelectItem>
            <SelectItem value="Notes">Notes</SelectItem>
            <SelectItem value="Articles">Articles</SelectItem>
          </SelectContent>
        </Select>
        <Select value={subcategory} onValueChange={setSubcategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Subcategory" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Subcategories</SelectItem>
            <SelectItem value="CV">CV</SelectItem>
            <SelectItem value="NLP">NLP</SelectItem>
            <SelectItem value="School">School</SelectItem>
            <SelectItem value="Program">Program</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Time</SelectItem>
            <SelectItem value="Last 24 hours">Last 24 hours</SelectItem>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[180px]"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {allTags.map(tag => (
          <div key={tag} className="flex items-center space-x-2">
            <Checkbox
              id={tag}
              checked={selectedTags.includes(tag)}
              onCheckedChange={() => handleTagChange(tag)}
            />
            <label
              htmlFor={tag}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {tag}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}