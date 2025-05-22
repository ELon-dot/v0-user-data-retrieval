"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Check, Star } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { makeInvestment } from "@/lib/investment"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function InvestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const investmentOptions = [25, 50, 100, 250, 500, 1000]
  const minInvestment = 25

  const handleInvest = async () => {
    const amount = selectedAmount === -1 ? Number.parseInt(customAmount) : selectedAmount

    if (!amount || amount < minInvestment) {
      toast({
        title: "Invalid amount",
        description: `Minimum investment is ${minInvestment} Stars`,
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      await makeInvestment(amount)

      toast({
        title: "Investment successful!",
        description: `You've invested ${amount} Stars`,
        variant: "default",
      })

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast({
        title: "Investment failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Invest Stars</h1>
          <p className="text-muted-foreground">Choose an investment amount and start earning 2% daily profit.</p>
        </div>

        <Alert
          variant="warning"
          className="bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>High-risk investment</AlertTitle>
          <AlertDescription>
            This is a high-risk investment. Profits are not guaranteed. You may lose all your invested funds. Invest
            responsibly and only what you can afford to lose.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Choose Investment Amount</CardTitle>
              <CardDescription>Select from our recommended options or enter a custom amount</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAmount?.toString() || ""}
                onValueChange={(value) => setSelectedAmount(Number.parseInt(value))}
                className="grid grid-cols-2 gap-4"
              >
                {investmentOptions.map((amount) => (
                  <div key={amount} className="flex items-center space-x-2">
                    <RadioGroupItem id={`amount-${amount}`} value={amount.toString()} />
                    <Label htmlFor={`amount-${amount}`} className="flex items-center gap-1 font-medium">
                      {amount} <Star className="h-3 w-3 text-yellow-500" />
                    </Label>
                  </div>
                ))}
                <div className="col-span-2 flex items-center space-x-2">
                  <RadioGroupItem id="amount-custom" value="-1" />
                  <Label htmlFor="amount-custom" className="font-medium">
                    Custom amount
                  </Label>
                </div>
              </RadioGroup>

              {selectedAmount === -1 && (
                <div className="mt-4">
                  <Label htmlFor="custom-amount">Enter amount (min {minInvestment} Stars)</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="custom-amount"
                      type="number"
                      min={minInvestment}
                      placeholder={minInvestment.toString()}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                    <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleInvest}
                disabled={
                  loading ||
                  (!selectedAmount && selectedAmount !== -1) ||
                  (selectedAmount === -1 && (!customAmount || Number.parseInt(customAmount) < minInvestment))
                }
                className="w-full"
              >
                {loading ? "Processing..." : "Invest Now"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Benefits</CardTitle>
              <CardDescription>Why investing with us is a smart choice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Daily Profits</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn 2% profit every day on your investments automatically.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Compound Growth</h4>
                  <p className="text-sm text-muted-foreground">Your investment can grow by 60% in just 30 days.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">No Lock-in Period</h4>
                  <p className="text-sm text-muted-foreground">
                    Request withdrawals at any time (processing may take up to 30 days).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Referral Bonuses</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn 10% of your friends' investments when they join using your link.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="text-sm font-medium mb-2">Investment Example</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Initial Investment</span>
                    <span>100 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Profit (2%)</span>
                    <span className="text-green-600">+2 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span>After 30 Days</span>
                    <span>160 ⭐</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Profit</span>
                    <span className="text-green-600">+60 ⭐ (60%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium">How is the profit calculated?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Profits are calculated daily at a rate of 2% of your invested amount.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">When can I withdraw my profits?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                You can request a withdrawal at any time. Processing may take up to 30 days.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Is there a minimum investment?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Yes, the minimum investment is {minInvestment} Stars.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Can I lose my investment?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Yes, this is a high-risk investment. You should only invest what you can afford to lose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
