import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">User Agreement</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Investment Stars. This User Agreement governs your use of our platform and services. By using
              our platform, you agree to these terms.
            </p>

            <h2>2. Risk Disclaimer</h2>
            <p>
              <strong>IMPORTANT:</strong> Investment Stars is a high-risk investment platform. All investments carry
              significant risk, and profits are not guaranteed. You may lose all your invested funds.
            </p>
            <p>
              The 2% daily profit is a projection and not a guarantee. Market conditions, platform performance, and
              other factors may affect actual returns.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To use our services, you must create an account and provide accurate information. You are responsible for
              maintaining the confidentiality of your account credentials.
            </p>

            <h2>4. Investment Process</h2>
            <p>
              You can invest Stars through our platform. The minimum investment amount is subject to change. Once
              invested, your funds will be locked for a period determined by the platform.
            </p>

            <h2>5. Profit Calculation</h2>
            <p>
              Profits are calculated daily based on your invested amount. The current profit rate is 2% per day, but
              this rate may change at the platform&apos;s discretion.
            </p>

            <h2>6. Referral Program</h2>
            <p>
              You can invite others to join the platform using your referral link. You will receive a 10% bonus based on
              the investments made by your referrals.
            </p>

            <h2>7. Withdrawals</h2>
            <p>
              Withdrawal requests are subject to processing times and may take up to 30 days to complete. The platform
              reserves the right to delay or reject withdrawals under certain circumstances.
            </p>

            <h2>8. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at any time for violations of this agreement or
              for any other reason at our discretion.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              Investment Stars is not liable for any losses, damages, or other liabilities arising from your use of the
              platform or from any investment decisions you make.
            </p>

            <h2>10. Changes to Agreement</h2>
            <p>
              We may modify this agreement at any time. Continued use of the platform after changes constitutes
              acceptance of the modified terms.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              This agreement is governed by applicable laws. Any disputes arising from this agreement will be resolved
              through arbitration.
            </p>

            <h2>12. Contact Information</h2>
            <p>If you have any questions about this agreement, please contact us at support@investmentstars.com.</p>
          </div>

          <div className="mt-8 flex justify-between">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/register">
              <Button>Accept & Register</Button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="py-6 border-t">
        <div className="container">
          <div className="flex justify-between items-center">
            <p className="text-center text-sm text-gray-500">© 2025 Investment Stars. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <p className="text-center text-xs text-gray-500">
                ⚠️ High-risk scheme. Profit not guaranteed. All risks are on you.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
