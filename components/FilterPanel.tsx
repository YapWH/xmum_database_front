import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface FilterPanelProps {
  onFilter: (filters: any) => void
}

export default function FilterPanel({ onFilter }: FilterPanelProps) {
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [tag, setTag] = useState('')
  const [dateAdded, setDateAdded] = useState('')

  const handleFilter = () => {
    onFilter({ category, subcategory, tags: tag, dateAdded })
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Select onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Dataset">Dataset</SelectItem>
          <SelectItem value="Notes">Notes</SelectItem>
          <SelectItem value="Articles">Articles</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setSubcategory}>
        <SelectTrigger className="w-[180px]">
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
        type="text"
        placeholder="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="w-[180px]"
      />
      <Input
        type="date"
        value={dateAdded}
        onChange={(e) => setDateAdded(e.target.value)}
        className="w-[180px]"
      />
      <Button onClick={handleFilter}>Apply Filters</Button>
    </div>
  )
}