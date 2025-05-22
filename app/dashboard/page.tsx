"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BarChart3, CreditCard, Gift, History, TrendingUp } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { getUserData } from "@/lib/user"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const data = await getUserData()
      setUserData(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Loading your investment data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const daysActive = userData.firstInvestmentDate
    ? Math.min(30, Math.floor((Date.now() - new Date(userData.firstInvestmentDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  const progressPercentage = (daysActive / 30) * 100

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your investments.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(userData.invested + userData.profit + userData.referralBonus).toFixed(2)} ⭐
              </div>
              <p className="text-xs text-muted-foreground">Investment + Profit + Referrals</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Investment Progress</CardTitle>
              <CardDescription>Track your investment over the 30-day period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userData.invested > 0 ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Days Active</div>
                      <div className="text-sm text-muted-foreground">{daysActive}/30</div>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Initial Investment</div>
                      <div className="text-sm font-medium">{userData.invested} ⭐</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Current Profit</div>
                      <div className="text-sm font-medium text-green-600">+{userData.profit.toFixed(2)} ⭐</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Projected Final Value</div>
                      <div className="text-sm font-medium">{(userData.invested * 1.6).toFixed(2)} ⭐</div>
                    </div>
                  </div>
                  <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950">
                    <div className="flex items-start gap-4">
                      <div className="text-yellow-600 dark:text-yellow-400">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Profit Forecast</h4>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                          At the current rate, your investment will grow by 60% in 30 days.
                        </p>
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                          ⚠️ Forecast not guaranteed. All risks are on you.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-6">
                  <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                    <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-medium">Start Investing Today</h3>
                  <p className="text-center text-sm text-muted-foreground max-w-md">
                    Make your first investment to start earning 2% profit daily. Choose from various investment options.
                  </p>
                  <Link href="/dashboard/invest">
                    <Button className="gap-1">
                      Invest Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest investments and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="investments">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="investments">Investments</TabsTrigger>
                  <TabsTrigger value="earnings">Earnings</TabsTrigger>
                </TabsList>
                <TabsContent value="investments" className="space-y-4 pt-4">
                  {userData.recentInvestments.length > 0 ? (
                    userData.recentInvestments.map((investment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Invested {investment.amount} ⭐</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(investment.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <History className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No investment history yet</p>
                    </div>
                  )}
                  {userData.recentInvestments.length > 0 && (
                    <div className="pt-2">
                      <Link href="/dashboard/history">
                        <Button variant="outline" className="w-full">
                          View All History
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="earnings" className="space-y-4 pt-4">
                  {userData.invested > 0 ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Daily Profit</p>
                            <p className="text-xs text-muted-foreground">Today</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-green-600">
                          +{(userData.invested * 0.02).toFixed(2)} ⭐
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Total Profit</p>
                            <p className="text-xs text-muted-foreground">All time</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-green-600">+{userData.profit.toFixed(2)} ⭐</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                            <Gift className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Referral Bonus</p>
                            <p className="text-xs text-muted-foreground">All time</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-yellow-600">+{userData.referralBonus.toFixed(2)} ⭐</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <History className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No earnings yet</p>
                    </div>
                  )}
                  <div className="pt-2">
                    <Link href="/dashboard/stats">
                      <Button variant="outline" className="w-full">
                        View Detailed Stats
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/dashboard/invest">
                <Button className="w-full justify-start gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Make a New Investment
                </Button>
              </Link>
              <Link href="/dashboard/referrals">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Gift className="h-4 w-4" />
                  Invite Friends & Earn
                </Button>
              </Link>
              <Link href="/dashboard/withdraw">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <CreditCard className="h-4 w-4" />
                  Withdraw Profits
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Risk Disclaimer</CardTitle>
              <CardDescription>Important information about your investment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>
                  Investment Stars is a high-risk investment platform. All investments carry significant risk, and
                  profits are not guaranteed.
                </p>
                <p>
                  The 2% daily profit is a projection and not a guarantee. Market conditions, platform performance, and
                  other factors may affect actual returns.
                </p>
                <p className="font-medium">
                  ⚠️ You may lose all your invested funds. Invest responsibly and only what you can afford to lose.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
