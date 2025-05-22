import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart } from "@/components/charts"
import { ArrowRight, BarChart3, Gift, TrendingUp } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { getUserData } from "@/lib/user"

export default async function StatsPage() {
  const userData = await getUserData()

  const daysActive = userData.firstInvestmentDate
    ? Math.min(30, Math.floor((Date.now() - new Date(userData.firstInvestmentDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  // Generate sample data for charts
  const profitData = Array.from({ length: daysActive || 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    profit: userData.invested > 0 ? (userData.invested * 0.02 * (i + 1)).toFixed(2) : (i + 1).toFixed(2),
  }))

  const investmentData = userData.recentInvestments
    .map((inv) => ({
      date: new Date(inv.date).toLocaleDateString(),
      amount: inv.amount,
    }))
    .slice(0, 5)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground">Detailed statistics about your investments and profits.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.invested} ⭐</div>
              <p className="text-xs text-muted-foreground">
                {userData.invested > 0 ? "Active investment" : "No active investments"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.profit.toFixed(2)} ⭐</div>
              <p className="text-xs text-muted-foreground">
                +{(userData.invested * 0.02).toFixed(2)} ⭐ daily (forecast)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referral Bonus</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.referralBonus.toFixed(2)} ⭐</div>
              <p className="text-xs text-muted-foreground">From {userData.referralCount} referrals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Days Active</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{daysActive}/30</div>
              <p className="text-xs text-muted-foreground">{30 - daysActive} days remaining in cycle</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Profit Growth</CardTitle>
              <CardDescription>Your profit growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              {userData.invested > 0 ? (
                <div className="h-[300px]">
                  <LineChart data={profitData} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                  <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                    <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-medium">No Data to Display</h3>
                  <p className="text-center text-sm text-muted-foreground max-w-md">
                    You don't have any active investments yet. Start investing to see your profit growth.
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
              <CardTitle>Investment History</CardTitle>
              <CardDescription>Your recent investments</CardDescription>
            </CardHeader>
            <CardContent>
              {investmentData.length > 0 ? (
                <div className="h-[300px]">
                  <BarChart data={investmentData} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                  <p className="text-center text-sm text-muted-foreground">No investment history to display.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral Statistics</CardTitle>
              <CardDescription>Your referral performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Referrals</span>
                <span className="text-sm font-medium">{userData.referralCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Referrals</span>
                <span className="text-sm font-medium">{userData.activeReferrals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Referred Investment</span>
                <span className="text-sm font-medium">{userData.referredInvestment} ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Referral Bonus (10%)</span>
                <span className="text-sm font-medium text-yellow-600">+{userData.referralBonus.toFixed(2)} ⭐</span>
              </div>

              <div className="pt-4">
                <Link href="/dashboard/referrals">
                  <Button variant="outline" className="w-full">
                    View Referral Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Detailed metrics about your investment performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Return on Investment</h4>
                <div className="text-2xl font-bold">
                  {userData.invested > 0 ? ((userData.profit / userData.invested) * 100).toFixed(2) : "0.00"}%
                </div>
                <p className="text-xs text-muted-foreground">Current profit as percentage of investment</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Daily Profit Rate</h4>
                <div className="text-2xl font-bold">2.00%</div>
                <p className="text-xs text-muted-foreground">Current daily profit rate</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Projected Monthly Return</h4>
                <div className="text-2xl font-bold">60.00%</div>
                <p className="text-xs text-muted-foreground">Based on current daily rate</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Projected Annual Return</h4>
                <div className="text-2xl font-bold">730.00%</div>
                <p className="text-xs text-muted-foreground">Based on current daily rate</p>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-yellow-50 p-4 dark:bg-yellow-950">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                ⚠️ These projections are based on the current daily profit rate of 2%. Actual results may vary
                significantly. All investments carry risk.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
