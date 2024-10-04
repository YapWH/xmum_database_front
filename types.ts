export interface Item {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  uploader: string
  dateAdded: string
  downloads: number
  views: number
  tags: string[]
  likes: number
  dislikes: number
  source: string
  auditStatus: string
}

export interface Dataset extends Item {
  datasetSize: string
  fileFormat: string
}

export interface Notes extends Item {
  school: string
  program: string
}

export interface Article extends Item {
  school: string
  program: string
  publicationDate: string
}