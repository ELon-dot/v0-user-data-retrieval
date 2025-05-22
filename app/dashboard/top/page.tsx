"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Medal, Star, Trophy, Users } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { useEffect, useState } from "react"

export default function TopInvestorsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Top Investors</h1>
            <p className="text-muted-foreground">Loading top investors data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // This would normally come from the server
  const topInvestors = [
    { rank: 1, username: "crypto_king", invested: 5000, profit: 600, referrals: 12 },
    { rank: 2, username: "investor_pro", invested: 3500, profit: 420, referrals: 8 },
    { rank: 3, username: "stars_master", invested: 2800, profit: 336, referrals: 5 },
    { rank: 4, username: "wealth_builder", invested: 2000, profit: 240, referrals: 3 },
    { rank: 5, username: "profit_hunter", invested: 1500, profit: 180, referrals: 2 },
    { rank: 6, username: "smart_investor", invested: 1200, profit: 144, referrals: 1 },
    { rank: 7, username: "future_millionaire", invested: 1000, profit: 120, referrals: 0 },
    { rank: 8, username: "stars_collector", invested: 800, profit: 96, referrals: 0 },
    { rank: 9, username: "passive_income", invested: 700, profit: 84, referrals: 0 },
    { rank: 10, username: "growth_seeker", invested: 600, profit: 72, referrals: 0 },
  ]

  const platformStats = {
    totalInvestors: 1250,
    totalInvested: 250000,
    totalProfit: 30000,
    averageInvestment: 200,
  }

  const currentUserRank = 15

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Top Investors</h1>
          <p className="text-muted-foreground">
            The leaderboard of our most successful investors. Compete to reach the top!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalInvestors}</div>
              <p className="text-xs text-muted-foreground">Active investors on the platform</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalInvested.toLocaleString()} ⭐</div>
              <p className="text-xs text-muted-foreground">Stars invested on the platform</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalProfit.toLocaleString()} ⭐</div>
              <p className="text-xs text-muted-foreground">Profit earned by all investors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Investment</CardTitle>
              <Medal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.averageInvestment} ⭐</div>
              <p className="text-xs text-muted-foreground">Average investment per user</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Investors</CardTitle>
            <CardDescription>The most successful investors on our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                <div>Rank</div>
                <div>Username</div>
                <div>Invested</div>
                <div>Profit</div>
                <div>Referrals</div>
              </div>
              <div className="divide-y">
                {topInvestors.map((investor) => (
                  <div key={investor.rank} className="grid grid-cols-5 gap-4 p-4 items-center">
                    <div className="text-sm font-medium">
                      {investor.rank <= 3 ? (
                        <div className="flex items-center gap-1">
                          <Trophy
                            className={`h-4 w-4 ${
                              investor.rank === 1
                                ? "text-yellow-500"
                                : investor.rank === 2
                                  ? "text-gray-400"
                                  : "text-amber-600"
                            }`}
                          />
                          {investor.rank}
                        </div>
                      ) : (
                        investor.rank
                      )}
                    </div>
                    <div className="text-sm font-medium">{investor.username}</div>
                    <div className="text-sm">{investor.invested.toLocaleString()} ⭐</div>
                    <div className="text-sm text-green-600">+{investor.profit.toLocaleString()} ⭐</div>
                    <div className="text-sm">{investor.referrals}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Ranking</CardTitle>
              <CardDescription>Your current position on the leaderboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold">{currentUserRank}</div>
                  <p className="text-sm text-muted-foreground mt-1">Your current rank</p>
                </div>
              </div>

              <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950">
                <div className="flex items-start gap-4">
                  <div className="text-yellow-600 dark:text-yellow-400">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      How to Improve Your Ranking
                    </h4>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                      Increase your investment amount and invite more referrals to climb the leaderboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <Link href="/dashboard/invest">
                  <Button className="gap-1">
                    Invest More <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Benefits</CardTitle>
              <CardDescription>Advantages of being a top investor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Recognition</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get featured on our platform as a top investor and gain recognition in the community.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Priority Support</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Top 10 investors receive priority customer support and faster withdrawal processing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <Medal className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Exclusive Opportunities</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Top investors get access to exclusive investment opportunities and special promotions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
