'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data - replace with actual API calls in a real application
const mockDataOverTime = [
  { date: '2023-01', datasets: 100, notes: 150, articles: 80 },
  { date: '2023-02', datasets: 120, notes: 180, articles: 90 },
  { date: '2023-03', datasets: 150, notes: 200, articles: 110 },
  { date: '2023-04', datasets: 180, notes: 220, articles: 130 },
  { date: '2023-05', datasets: 200, notes: 250, articles: 150 },
]

const mockCategoryData = [
  { name: 'Datasets', value: 200 },
  { name: 'Notes', value: 250 },
  { name: 'Articles', value: 150 },
]

const mockAuditStatusData = [
  { name: 'Pending', value: 50 },
  { name: 'Approved', value: 500 },
  { name: 'Rejected', value: 30 },
]

const mockItemStats = [
  { name: 'Datasets', views: 1000, downloads: 500, likes: 200, dislikes: 10 },
  { name: 'Notes', views: 800, downloads: 400, likes: 150, dislikes: 5 },
  { name: 'Articles', views: 1200, downloads: 600, likes: 250, dislikes: 15 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AdminDashboard() {
  const [totalItems, setTotalItems] = useState(0)
  const [newItemsLastMonth, setNewItemsLastMonth] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [totalDatasetSize, setTotalDatasetSize] = useState(0)

  useEffect(() => {
    fetchDashboardData()
  })

  // Fetch data from API
  const fetchDashboardData = async () => {
    // Replace with actual API calls
    setTotalItems(600)
    setNewItemsLastMonth(50)
    setTotalUsers(1000)
    setActiveUsers(750)
    setTotalDatasetSize(5000) // in GB
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className='flex justify-between items-center'>
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <div className='flex space-x-4'>
            <Link href='/admin/reports'>
              <Button>Report</Button>
            </Link>
            <Link href='admin/audit'>
              <Button>Audit</Button>
            </Link>
          </div>
        </div>
        
        <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 justify-between">
          <Card>
            <CardHeader>
              <CardTitle>Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalItems}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>New Items (Last Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{newItemsLastMonth}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{activeUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Dataset Size</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalDatasetSize} GB</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Items Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockDataOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="datasets" stroke="#8884d8" />
                    <Line type="monotone" dataKey="notes" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="articles" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Items by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAuditStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8">
                      {mockAuditStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Item Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockItemStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#8884d8" />
                    <Bar dataKey="downloads" fill="#82ca9d" />
                    <Bar dataKey="likes" fill="#ffc658" />
                    <Bar dataKey="dislikes" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}