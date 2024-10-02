export type Category = 'Dataset' | 'Notes' | 'Articles'
export type Subcategory = 'CV' | 'NLP' | 'School' | 'Program'

export interface BaseItem {
  id: string
  title: string
  description: string
  category: Category
  subcategory: Subcategory
  uploader: string
  dateAdded: string
  downloads: number
  tags: string[]
}

export interface Dataset extends BaseItem {
  category: 'Dataset'
  datasetSize: string
  fileFormat: string
}

export interface Notes extends BaseItem {
  category: 'Notes'
  school: string
  program: string
}

export interface Article extends BaseItem {
  category: 'Articles'
  school: string
  program: string
  publicationDate: string
}

export type Item = Dataset | Notes | Article