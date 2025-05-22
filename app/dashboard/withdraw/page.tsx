"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Check, CreditCard } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { withdrawProfit } from "@/lib/investment"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser } from "@/lib/auth"

export default function WithdrawPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("stars")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // In a real app, this would come from the server
  const userData = getCurrentUser() || {
    profit: 60,
    invested: 500,
    referralBonus: 25,
  }

  const totalAvailable = userData.profit + userData.referralBonus

  const handleWithdraw = async () => {
    const withdrawAmount = Number.parseFloat(amount)

    if (!withdrawAmount || withdrawAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount > totalAvailable) {
      toast({
        title: "Insufficient funds",
        description: `You only have ${totalAvailable.toFixed(2)} Stars available for withdrawal`,
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      await withdrawProfit(withdrawAmount)

      setSuccess(true)
      setAmount("")

      toast({
        title: "Withdrawal request submitted",
        description: "Your withdrawal request has been submitted and is being processed",
      })

      setTimeout(() => {
        router.refresh()
      }, 3000)
    } catch (error) {
      toast({
        title: "Withdrawal failed",
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
          <h1 className="text-3xl font-bold tracking-tight">Withdraw Profits</h1>
          <p className="text-muted-foreground">Request a withdrawal of your profits and referral bonuses.</p>
        </div>

        <Alert
          variant="warning"
          className="bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Processing Time</AlertTitle>
          <AlertDescription>
            Withdrawal requests may take up to 30 days to process. You will be notified when your withdrawal is
            complete.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Available for Withdrawal</CardTitle>
              <CardDescription>Your current profit and referral bonuses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Profit</span>
                <span className="text-sm font-medium">{userData.profit.toFixed(2)} ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Referral Bonus</span>
                <span className="text-sm font-medium">{userData.referralBonus.toFixed(2)} ⭐</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Available</span>
                  <span className="text-sm font-medium">{totalAvailable.toFixed(2)} ⭐</span>
                </div>
              </div>
              <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-xs text-muted-foreground">
                  Note: Your initial investment of {userData.invested} ⭐ is locked for the investment period.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Withdrawal</CardTitle>
              <CardDescription>Enter the amount you want to withdraw</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {success ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-6">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">Withdrawal Request Submitted</h3>
                  <p className="text-center text-sm text-muted-foreground max-w-md">
                    Your withdrawal request has been submitted and is being processed. This may take up to 30 days.
                  </p>
                  <Button onClick={() => setSuccess(false)}>Make Another Withdrawal</Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (in Stars)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0.01"
                        max={totalAvailable.toString()}
                        step="0.01"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount(totalAvailable.toFixed(2))}
                        className="whitespace-nowrap"
                      >
                        Max
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Withdrawal Method</Label>
                    <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="stars" value="stars" />
                        <Label htmlFor="stars">Telegram Stars</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="crypto" value="crypto" />
                        <Label htmlFor="crypto">Cryptocurrency</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {withdrawMethod === "crypto" && (
                    <div className="space-y-2">
                      <Label htmlFor="wallet">Wallet Address</Label>
                      <Input id="wallet" placeholder="Enter your wallet address" />
                    </div>
                  )}
                </>
              )}
            </CardContent>
            {!success && (
              <CardFooter>
                <Button
                  onClick={handleWithdraw}
                  disabled={
                    loading || !amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > totalAvailable
                  }
                  className="w-full gap-1"
                >
                  <CreditCard className="h-4 w-4" />
                  {loading ? "Processing..." : "Request Withdrawal"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>Your previous withdrawal requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                <div>Date</div>
                <div>Amount</div>
                <div>Method</div>
                <div>Status</div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-4 gap-4 p-4 items-center">
                  <div className="text-sm">2025-05-10</div>
                  <div className="text-sm font-medium">25.00 ⭐</div>
                  <div className="text-sm">Telegram Stars</div>
                  <div className="text-sm">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Processing
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 items-center">
                  <div className="text-sm">2025-04-15</div>
                  <div className="text-sm font-medium">50.00 ⭐</div>
                  <div className="text-sm">Cryptocurrency</div>
                  <div className="text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal FAQ</CardTitle>
            <CardDescription>Frequently asked questions about withdrawals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">How long does it take to process a withdrawal?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Withdrawal requests may take up to 30 days to process. You will be notified when your withdrawal is
                complete.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Is there a minimum withdrawal amount?</h3>
              <p className="text-sm text-muted-foreground mt-1">Yes, the minimum withdrawal amount is 10 Stars.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Can I withdraw my initial investment?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                No, your initial investment is locked for the investment period. You can only withdraw your profits and
                referral bonuses.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium">What withdrawal methods are available?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You can withdraw your profits as Telegram Stars or as cryptocurrency.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
