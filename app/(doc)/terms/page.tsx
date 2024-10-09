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
            <p>Last updated: 9/10/2024</p>
            <p>
              Please read these Terms of Service carefully before using the XMUM Database website operated by XMUM.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Interpretation</h2>
            <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Definitions</h2>
            <ul>
            <li>
            <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
            </li>
            <li>
            <p><strong>Country</strong> refers to: Malaysia.</p>
            </li>
            <li>
            <p><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to XMUM Database Operation Team.</p>
            </li>
            <li>
            <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
            </li>
            <li>
            <p><strong>Terms of Policy</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</p>
            </li>
            <li>
            <p><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>
            </li>
            <li>
            <p><strong>Website</strong> refers to XMUM Database Operation Team.</p>
            </li>
            <li>
            <p><strong>You</strong> means the individual who is a member of the XMUM Campus accessing or using the Service</p>
            </li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Acknowledgment</h2>
            <p>
            These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.<br/><br/>
            Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.<br/><br/>
            By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.<br/><br/>
            You represent that you are a member of XMUM Campus. The Company does not permit those External individual or company to use the Service.<br/><br/>
            Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Links to Other Websites</h2>
            <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.<br/><br/>
            The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.<br/><br/>
            We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Termination</h2>
            <p>
            We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.<br/><br/>
            Upon termination, Your right to use the Service will cease immediately.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Limitation of Liability</h2>
            <p>
            To the maximum extent permitted by applicable law, in no event shall the Company be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">7. Disputes Resolution</h2>
            <p>
            If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">8. Severability</h2>
            <p>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">9. Waiver</h2>
            <p>
            Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">10. Changes to These Terms and Conditions</h2>
            <p>
            We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.<br/><br/>
            By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">11. Contact Us</h2>
            <p>
            If you have any questions about these Terms and Conditions, You can contact us:<br/><br/>
            By visiting this page on our website: <a href="/feedback" rel="external nofollow noopener" target="_blank">Feedback</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}