'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
//import { Dataset } from '@/types'
import { Download, ArrowLeft, Save, Edit } from 'lucide-react'
import ReportForm from '@/components/ReportForm'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/app/contexts/AuthContext'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DownloadButton } from '@/components/DownloadButton'

interface Dataset{
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
  datasetSize: string
  fileFormat: string
  auditStatus: string
  previewData: any[]
}

// TODO: Fetch item details from the API
const fetchItemDetails = async (category: string, id: string): Promise<Dataset> => {
  return {
    id: '1',
    title: 'Sample Item',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit sed metus venenatis rutrum. Mauris eget pellentesque odio, non convallis nisi. Curabitur dignissim nulla et mauris efficitur, sodales vestibulum risus laoreet. Pellentesque posuere nisl et erat tristique luctus. Proin mattis pharetra consectetur. Duis tempor egestas mauris non facilisis. Vestibulum ac erat pharetra, lacinia mauris sed, interdum enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi dui nunc, suscipit ac laoreet eu, sollicitudin nec orci. Morbi posuere erat vitae sem ullamcorper finibus. Etiam fermentum ornare urna, quis scelerisque tortor congue sed.",
    category:'Computer Vision',
    subcategory: 'Image Classification',
    uploader: 'John Doe',
    dateAdded: '2023-07-01',
    downloads: 1000,
    views: 5000,
    tags: ['sample', 'test'],
    likes: 500,
    dislikes: 50,
    source: 'https://example.com/sample-item',
    datasetSize: '11.5 MB',
    fileFormat: 'CSV',
    auditStatus: 'Pending',
    previewData: [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Doe', age: 30 },
      { id: 3, name: 'Alice', age: 35 },
      { id: 4, name: 'Bob', age: 40 },
    ]
    // dataType: 'image',
    // previewData: [
    //   '/logo-light.png',
    //   '/logo-dark.png'
    // ]
  }
}

const fetchItemStats = async (id: string) => {
  return [
    { date: '2023-06-01', views: 100, downloads: 20, likes: 10, dislikes: 2 },
    { date: '2023-06-08', views: 150, downloads: 30, likes: 15, dislikes: 3 },
    { date: '2023-06-15', views: 200, downloads: 40, likes: 20, dislikes: 4 },
    { date: '2023-06-22', views: 180, downloads: 35, likes: 18, dislikes: 3 },
    { date: '2023-06-29', views: 250, downloads: 50, likes: 25, dislikes: 5 },
  ]
}

export default function ItemDetailPage() {
  const { category, id } = useParams()
  const router = useRouter()
  const [item, setItem] = useState<Dataset | null>(null)
  const [stats, setStats] = useState<{ date: string; views: number; downloads: number; likes:number, dislikes:number }[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useAuth()
  const [combinedGraph, setCombinedGraph] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const itemData = await fetchItemDetails(category as string, id as string)
      setItem(itemData)
      const statsData = await fetchItemStats(id as string)
      setStats(statsData)
    }
    loadData()
  }, [category, id])

  const handleDownload = () => {
    //TODO: Implement download logic here
    console.log('Downloading item:', item?.title)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async() => {
    //TODO: Implement save logic
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setItem(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim())
    setItem(prev => prev ? { ...prev, tags } : null)
  }

  if (!item) {
    return <div>Loading...</div>
  }

  const renderChart = (data: any[], dataKeys: string[], colors: string[]) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Line key={key} type="monotone" dataKey={key} stroke={colors[index]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )

  const renderPreview = () => {
    switch (item.fileFormat.toLowerCase()) {
      case 'image':
        return (
          <div className="grid grid-cols-3 gap-4">
            {item.previewData.map((image, index) => (
              <Image key={index} src={image} alt={`Preview ${index + 1}`} width={200} height={200} className="rounded-lg" />
            ))}
          </div>
        )
      case 'csv':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(item.previewData[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {item.previewData.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, cellIndex) => (
                    <TableCell key={cellIndex}>{value as React.ReactNode}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case 'audio':
        return (
          <div className="space-y-4">
            {item.previewData.map((audio, index) => (
              <div key={index}>
                <audio controls src={audio} className="w-full">
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        )
      default:
        return <p>No preview available for this data type.</p>
    }
  }

  const handlePreviewDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const previewData = JSON.parse(e.target.value)
      setItem(prev => prev ? { ...prev, previewData } : null)
    } catch (error) {
      console.error('Invalid JSON for preview data')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Button 
          variant="outline" 
          onClick={() => router.back()} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              {isEditing ? (
                <Input
                  name="title"
                  value={item.title}
                  onChange={handleInputChange}
                  className="text-3xl font-bold mb-6"
                />
              ) : (
                <CardTitle className="text-3xl font-bold mb-6">{item.title}</CardTitle>
              )}
              <CardDescription>{item.category} - {item.subcategory}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <DownloadButton itemId={item.id} itemName={item.title} creatorName={item.uploader} />
              <ReportForm itemId={item.id} itemTitle={item.title} />
              {user && user.role === 'admin' && (
                <Button onClick={isEditing ? handleSave : handleEdit}>
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {isEditing ? (
              <Textarea
                name="description"
                value={item.description}
                onChange={handleInputChange}
                className="mb-4"
                rows={5}
              />
            ) : (
              <p className="mb-4" style={{ color: '#808080' }}>{item.description}</p>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>Uploader: {item.uploader}</div>
              <div>Date Added: {new Date(item.dateAdded).toLocaleDateString()}</div>
              <div>Downloads: {item.downloads}</div>
              <div>Views: {item.views}</div>
              <div>Likes: {item.likes}</div>
              <div>Dislikes: {item.dislikes}</div>
              <div>Dataset Size: {item.datasetSize}</div>
              {isEditing ? (
                <div className='mb-4'>
                  <div>File Format:</div>
                  <Input
                    id='fileformat'
                    name="fileFormat"
                    value={item.fileFormat}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                <div>File Format: {item.fileFormat}</div>
              )}
              <div className="mb-4">
                {isEditing ? (
                  <div>
                    <div>Tags:</div>
                    <Input
                      id='tags'
                      name="tags"
                      value={item.tags.join(', ')}
                      onChange={handleTagsChange}
                    />
                  </div>
                ) : (
                  <>
                  Tags:  
                  {item.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="mr-2">
                      {tag}
                    </Badge>
                  ))}
                  </>
                )}
              </div>
            </div>
            <>
            {isEditing ? (
              <div>
                <div>Source:</div>
                <Input
                  id='source'
                  name="source"
                  value={item.source}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div>Source: <a href={item.source} className="text-primary hover:underline">{item.source}</a></div>
            )}
            </>

            <section className='mt-8'>
              {isEditing ? (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Preview</h2>
                  <Textarea
                    id='previewData'
                    value={JSON.stringify(item.previewData, null, 2)}
                    onChange={handlePreviewDataChange}
                    name='previewData'
                    rows={10}
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Preview</h2>
                  {renderPreview()}
                </div>
              )}
            </section>

            <section className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Statistics</h3>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="combined-graph">Combined Graph</Label>
                  <Switch
                    id="combined-graph"
                    checked={combinedGraph}
                    onCheckedChange={setCombinedGraph}
                  />
                </div>
              </div>
              {combinedGraph ? (
                renderChart(stats, ['views', 'downloads', 'likes', 'dislikes'], ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'])
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Views Over Time</h4>
                    {renderChart(stats, ['views'], ['#8884d8'])}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Downloads Over Time</h4>
                    {renderChart(stats, ['downloads'], ['#82ca9d'])}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Likes Over Time</h4>
                    {renderChart(stats, ['likes'], ['#ffc658'])}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Dislikes Over Time</h4>
                    {renderChart(stats, ['dislikes'], ['#ff7300'])}
                  </div>
                </div>
              )}
            </section>

            
          </CardContent>
        </Card>
      </div>
    </div>
  )
}