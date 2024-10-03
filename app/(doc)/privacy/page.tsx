import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: 3/10/2024</p>
            <p>
              XMUM Database is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create an account, upload content, or communicate with us. This may include:
            </p>
            <ul className="list-disc pl-6">
              <li>Personal information (e.g., name, email address)</li>
              <li>Account credentials</li>
              <li>Content you upload (e.g., datasets, notes, articles)</li>
              <li>Communications with us</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at [contact email].
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}