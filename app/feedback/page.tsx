'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Combobox } from '@/components/ui/combobox'
import { toast } from '@/hooks/use-toast'
import { AuthProvider } from '../contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'

const categoryOptions = [
  { value: 'datasets', label: 'Datasets' },
  { value: 'notes', label: 'Notes' },
  { value: 'articles', label: 'Articles' },
]

export default function FeedbackPage() {
  const [email, setEmail] = useState('')
  const [group, setGroup] = useState('')
  const [feedbackType, setFeedbackType] = useState('improvement')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your server
    console.log('Feedback submitted:', { email, group, feedbackType, feedback })
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })
    // Reset form
    setEmail('')
    setGroup('datasets')
    setFeedbackType('improvement')
    setFeedback('')
  }

  return (
    <ProtectedRoute requiredRole='user'>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <Card className="mt-8 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Feedback</CardTitle>
              <CardDescription>We value your input to improve our service</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor="group">Group</Label><br/>
                  <Combobox
                    value=""
                    onChange={setGroup} 
                    options={categoryOptions}
                    placeholder='group' />
                </div>
                <div className='space-y-2'>
                  <Label>Feedback Type</Label>
                  <RadioGroup value={feedbackType} onValueChange={setFeedbackType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="improvement" id="improvement" />
                      <Label htmlFor="improvement">Improvement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bug" id="bug" />
                      <Label htmlFor="bug">Bug Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feature" id="feature" />
                      <Label htmlFor="feature">Feature Request</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Your feedback"
                    required
                    rows={5}
                  />
                </div>
                <Button type="submit">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
    
  )
}