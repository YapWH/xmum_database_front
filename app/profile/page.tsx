'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from '@/hooks/use-toast'
import Header from '@/components/Header'

interface UserProfile {
  id: string
  username: string
  email: string
  fullName: string
  bio: string
  avatarUrl: string
  createdAt: string
  preferences: {
    emailNotifications: boolean
    darkMode: boolean
    language: string
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Fetch user profile from API
    const fetchProfile = async () => {
      // Replace with actual API call
      const mockProfile: UserProfile = {
        id: '1',
        username: 'johndoe',
        email: 'john@example.com',
        fullName: 'John Doe',
        bio: 'I love sharing and discovering new datasets!',
        avatarUrl: 'https://github.com/shadcn.png',
        createdAt: '2023-01-01',
        preferences: {
          emailNotifications: true,
          darkMode: false,
          language: 'en',
        },
      }
      setProfile(mockProfile)
    }
    fetchProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handlePreferenceChange = (name: string, value: boolean | string) => {
    setProfile(prev => prev ? {
      ...prev,
      preferences: { ...prev.preferences, [name]: value }
    } : null)
  }

  const handleSave = async () => {
    // Save profile changes to API
    // Replace with actual API call
    console.log('Saving profile:', profile)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
    setIsEditing(false)
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View and edit your profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
                  <AvatarFallback>{profile.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                  <p className="text-muted-foreground">@{profile.username}</p>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              {isEditing ? (
                <Button onClick={handleSave}>Save Changes</Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <p className="text-muted-foreground">@{profile.username}</p>
                </div>
                <div>
                  <Label>Member Since</Label>
                  <p className="text-muted-foreground">{new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notifications">
              <TabsList>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="language">Language</TabsTrigger>
              </TabsList>
              <TabsContent value="notifications" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <Switch
                    id="emailNotifications"
                    checked={profile.preferences.emailNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                  />
                </div>
              </TabsContent>
              <TabsContent value="appearance" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <Switch
                    id="darkMode"
                    checked={profile.preferences.darkMode}
                    onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                  />
                </div>
              </TabsContent>
              <TabsContent value="language" className="space-y-4">
                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <select
                    id="language"
                    value={profile.preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}