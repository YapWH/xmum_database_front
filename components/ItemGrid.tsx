import { motion } from 'framer-motion'
import { DatasetItem } from './DatasetItem'
import { NotesItem } from './NotesItem'
import { ArticleItem } from './ArticleItem'
import { Item } from '../types'

interface ItemGridProps {
  items: Item[]
}

export default function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {item.category === 'Dataset' && <DatasetItem item={item} />}
          {item.category === 'Notes' && <NotesItem item={item} />}
          {item.category === 'Articles' && <ArticleItem item={item} />}
        </motion.div>
      ))}
    </div>
  )
}