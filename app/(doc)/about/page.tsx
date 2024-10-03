import Header from '@/components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const contributors = [
  { name: 'John Doe', role: 'Lead Developer', description: 'John is passionate about creating efficient and user-friendly databases.' },
  { name: 'Jane Smith', role: 'UI/UX Designer', description: 'Jane brings her expertise in creating intuitive and beautiful user interfaces.' },
  { name: 'Mike Johnson', role: 'Data Scientist', description: 'Mike ensures the integrity and quality of the data in our database.' },
  // Add more contributors as needed
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="mb-8 text-lg">
          XMUM Database is a collaborative project aimed at providing a comprehensive resource for datasets, notes, and articles. 
          Our team is dedicated to creating a platform that serves the academic and research needs of our community.
        </p>
        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contributors.map((contributor, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{contributor.name}</CardTitle>
                <CardDescription>{contributor.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{contributor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}