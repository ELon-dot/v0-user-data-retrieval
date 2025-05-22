import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CreditCard, TrendingUp } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { getUserData } from "@/lib/user"

export default async function BalancePage() {
  const userData = await getUserData()

  const totalBalance = userData.invested + userData.profit + userData.referralBonus
  const daysActive = userData.firstInvestmentDate
    ? Math.min(30, Math.floor((Date.now() - new Date(userData.firstInvestmentDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Balance</h1>
          <p className="text-muted-foreground">View your current balance and investment details.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
              <CardDescription>Your total balance and investment breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4 py-6">
                <div className="text-4xl font-bold">{totalBalance.toFixed(2)} ⭐</div>
                <p className="text-sm text-muted-foreground">Total Balance</p>

                <div className="grid w-full max-w-md gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Invested</div>
                      <div className="text-sm font-medium">{userData.invested} ⭐</div>
                    </div>
                    <Progress value={(userData.invested / totalBalance) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Profit</div>
                      <div className="text-sm font-medium text-green-600">+{userData.profit.toFixed(2)} ⭐</div>
                    </div>
                    <Progress
                      value={(userData.profit / totalBalance) * 100}
                      className="h-2 bg-gray-100 dark:bg-gray-700"
                    >
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(userData.profit / totalBalance) * 100}%` }}
                      />
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Referral Bonus</div>
                      <div className="text-sm font-medium text-yellow-600">+{userData.referralBonus.toFixed(2)} ⭐</div>
                    </div>
                    <Progress
                      value={(userData.referralBonus / totalBalance) * 100}
                      className="h-2 bg-gray-100 dark:bg-gray-700"
                    >
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${(userData.referralBonus / totalBalance) * 100}%` }}
                      />
                    </Progress>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <Link href="/dashboard/invest">
                    <Button className="gap-1">
                      Invest More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/withdraw">
                    <Button variant="outline" className="gap-1">
                      Withdraw <CreditCard className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
              <CardDescription>Details about your current investment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.invested > 0 ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm">Investment Amount</span>
                    <span className="text-sm font-medium">{userData.invested} ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Profit (2%)</span>
                    <span className="text-sm font-medium text-green-600">
                      +{(userData.invested * 0.02).toFixed(2)} ⭐
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Days Active</span>
                    <span className="text-sm font-medium">{daysActive}/30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current Profit</span>
                    <span className="text-sm font-medium text-green-600">+{userData.profit.toFixed(2)} ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Projected Final Value (30 days)</span>
                    <span className="text-sm font-medium">{(userData.invested * 1.6).toFixed(2)} ⭐</span>
                  </div>

                  <div className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Progress</div>
                        <div className="text-sm text-muted-foreground">{daysActive}/30 days</div>
                      </div>
                      <Progress value={(daysActive / 30) * 100} className="h-2" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-6">
                  <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                    <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-medium">No Active Investment</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    You don't have any active investments yet. Start investing to see your balance grow.
                  </p>
                  <Link href="/dashboard/invest">
                    <Button className="gap-1">
                      Start Investing <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit Forecast</CardTitle>
              <CardDescription>Projected earnings based on your current investment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.invested > 0 ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm">After 7 days</span>
                    <span className="text-sm font-medium text-green-600">
                      +{(userData.invested * 0.14).toFixed(2)} ⭐
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">After 14 days</span>
                    <span className="text-sm font-medium text-green-600">
                      +{(userData.invested * 0.28).toFixed(2)} ⭐
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">After 30 days</span>
                    <span className="text-sm font-medium text-green-600">
                      +{(userData.invested * 0.6).toFixed(2)} ⭐
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">After 60 days</span>
                    <span className="text-sm font-medium text-green-600">
                      +{(userData.invested * 1.2).toFixed(2)} ⭐
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">After 90 days</span>
                    <span className="text-sm font-medium text-green-600">
                      +{(userData.invested * 1.8).toFixed(2)} ⭐
                    </span>
                  </div>

                  <div className="rounded-md bg-yellow-50 p-4 mt-4 dark:bg-yellow-950">
                    <p className="text-xs text-yellow-800 dark:text-yellow-400">
                      ⚠️ This is a forecast based on the current daily profit rate of 2%. Actual results may vary. All
                      investments carry risk.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-6">
                  <p className="text-center text-sm text-muted-foreground">
                    Make your first investment to see profit forecasts.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
