"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, History, TrendingUp } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { getUserData } from "@/lib/user"
import { useEffect, useState } from "react"

export default function HistoryPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Investment History</h1>
            <p className="text-muted-foreground">Loading your investment history...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Investment History</h1>
          <p className="text-muted-foreground">View your complete investment history and transactions.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Investment Transactions</CardTitle>
            <CardDescription>All your investment transactions in chronological order</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.allInvestments.length > 0 ? (
              <div className="space-y-8">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Type</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y">
                    {userData.allInvestments.map((investment, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="text-sm">{new Date(investment.date).toLocaleDateString()}</div>
                        <div className="text-sm font-medium">{investment.amount} ⭐</div>
                        <div className="text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            Investment
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            Completed
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Showing {userData.allInvestments.length} transactions
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <History className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium">No Investment History</h3>
                <p className="text-center text-sm text-muted-foreground max-w-md">
                  You haven't made any investments yet. Start investing to build your history.
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profit History</CardTitle>
              <CardDescription>Daily profit accruals on your investments</CardDescription>
            </CardHeader>
            <CardContent>
              {userData.invested > 0 ? (
                <div className="space-y-8">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Type</div>
                    </div>
                    <div className="divide-y">
                      {Array.from({ length: 5 }, (_, i) => {
                        const date = new Date()
                        date.setDate(date.getDate() - i)
                        return {
                          date: date.toLocaleDateString(),
                          amount: (userData.invested * 0.02).toFixed(2),
                        }
                      }).map((profit, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 p-4 items-center">
                          <div className="text-sm">{profit.date}</div>
                          <div className="text-sm font-medium text-green-600">+{profit.amount} ⭐</div>
                          <div className="text-sm">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                              Daily Profit
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <p className="text-center text-sm text-muted-foreground">
                    No profit history to display. Start investing to earn daily profits.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
              <CardDescription>Summary of your investment activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Invested</span>
                <span className="text-sm font-medium">{userData.invested} ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Number of Investments</span>
                <span className="text-sm font-medium">{userData.allInvestments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average Investment</span>
                <span className="text-sm font-medium">
                  {userData.allInvestments.length > 0
                    ? (userData.invested / userData.allInvestments.length).toFixed(2)
                    : "0"}{" "}
                  ⭐
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">First Investment Date</span>
                <span className="text-sm font-medium">
                  {userData.firstInvestmentDate ? new Date(userData.firstInvestmentDate).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Profit Earned</span>
                <span className="text-sm font-medium text-green-600">+{userData.profit.toFixed(2)} ⭐</span>
              </div>

              <div className="pt-4">
                <Link href="/dashboard/invest">
                  <Button className="w-full gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Make a New Investment
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
