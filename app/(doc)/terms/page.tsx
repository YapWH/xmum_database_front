import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: 3/10/2024</p>
            <p>
              Please read these Terms of Service carefully before using the XMUM Database website operated by XMUM.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of XMUM Database and its licensors. The Service is protected by copyright, trademark, and other laws of both Malaysia and foreign countries.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party websites or services that are not owned or controlled by XMUM Database. XMUM Database has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">7. Limitation Of Liability</h2>
            <p>
              In no event shall XMUM Database, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">8. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at temp@xmu.edu.my.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}