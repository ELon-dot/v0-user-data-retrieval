"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  BarChart3,
  Check,
  CreditCard,
  DollarSign,
  Download,
  Search,
  Settings,
  Star,
  Users,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 1250,
    activeInvestments: 850,
    totalInvested: 250000,
    totalProfit: 30000,
    pendingWithdrawals: 15,
    withdrawalAmount: 5000,
    newUsers24h: 45,
    newInvestments24h: 35,
  }

  const recentUsers = [
    { id: "U12345", username: "john_doe", email: "john@example.com", date: "2025-05-20", status: "active" },
    { id: "U12346", username: "alice_smith", email: "alice@example.com", date: "2025-05-20", status: "active" },
    { id: "U12347", username: "bob_jones", email: "bob@example.com", date: "2025-05-19", status: "active" },
    { id: "U12348", username: "emma_wilson", email: "emma@example.com", date: "2025-05-19", status: "pending" },
    { id: "U12349", username: "michael_brown", email: "michael@example.com", date: "2025-05-18", status: "active" },
  ]

  const withdrawalRequests = [
    { id: "W5001", username: "john_doe", amount: 120, date: "2025-05-20", status: "pending" },
    { id: "W5002", username: "alice_smith", amount: 85, date: "2025-05-19", status: "pending" },
    { id: "W5003", username: "bob_jones", amount: 250, date: "2025-05-18", status: "pending" },
    { id: "W5004", username: "emma_wilson", amount: 75, date: "2025-05-17", status: "completed" },
    { id: "W5005", username: "michael_brown", amount: 180, date: "2025-05-16", status: "completed" },
  ]

  const handleApproveWithdrawal = (id: string) => {
    toast({
      title: "Withdrawal approved",
      description: `Withdrawal ${id} has been approved and will be processed.`,
    })
  }

  const handleRejectWithdrawal = (id: string) => {
    toast({
      title: "Withdrawal rejected",
      description: `Withdrawal ${id} has been rejected.`,
      variant: "destructive",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: "The data export has been initiated and will be available shortly.",
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, investments, and platform settings.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+{stats.newUsers24h} in the last 24h</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeInvestments}</div>
              <p className="text-xs text-muted-foreground">+{stats.newInvestments24h} in the last 24h</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInvested.toLocaleString()} ⭐</div>
              <p className="text-xs text-muted-foreground">{stats.totalProfit.toLocaleString()} ⭐ profit generated</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingWithdrawals}</div>
              <p className="text-xs text-muted-foreground">{stats.withdrawalAmount.toLocaleString()} ⭐ to process</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Key metrics and performance indicators</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleExportData}>
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border p-4 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Detailed analytics and charts would be displayed here in a production environment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawal Requests</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">Filter</Button>
                  <Button>Add User</Button>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                    <div>ID</div>
                    <div>Username</div>
                    <div>Email</div>
                    <div>Date Joined</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div className="text-sm font-medium">{user.id}</div>
                        <div className="text-sm">{user.username}</div>
                        <div className="text-sm">{user.email}</div>
                        <div className="text-sm">{user.date}</div>
                        <div className="text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {user.status === "active" ? "Active" : "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Showing 5 of {stats.totalUsers} users</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
                <CardDescription>Manage pending withdrawal requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                    <div>ID</div>
                    <div>Username</div>
                    <div>Amount</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  <div className="divide-y">
                    {withdrawalRequests.map((request) => (
                      <div key={request.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                        <div className="text-sm font-medium">{request.id}</div>
                        <div className="text-sm">{request.username}</div>
                        <div className="text-sm">{request.amount} ⭐</div>
                        <div className="text-sm">{request.date}</div>
                        <div className="text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              request.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {request.status === "completed" ? "Completed" : "Pending"}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1"
                                onClick={() => handleApproveWithdrawal(request.id)}
                              >
                                <Check className="h-3 w-3" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1"
                                onClick={() => handleRejectWithdrawal(request.id)}
                              >
                                <AlertTriangle className="h-3 w-3" />
                                Reject
                              </Button>
                            </>
                          )}
                          {request.status === "completed" && (
                            <span className="text-sm text-muted-foreground">Processed</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform parameters and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Investment Parameters</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="daily-rate">Daily Profit Rate (%)</Label>
                      <Input id="daily-rate" type="number" defaultValue="2.0" min="0.1" max="10" step="0.1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-investment">Minimum Investment (Stars)</Label>
                      <Input id="min-investment" type="number" defaultValue="25" min="1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referral-bonus">Referral Bonus (%)</Label>
                      <Input id="referral-bonus" type="number" defaultValue="10" min="1" max="50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="withdrawal-time">Withdrawal Processing Time (Days)</Label>
                      <Input id="withdrawal-time" type="number" defaultValue="30" min="1" max="60" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">System Maintenance</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button variant="outline" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Run Daily Profit Calculation
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Backup Database
                    </Button>
                  </div>
                </div>

                <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950">
                  <div className="flex items-start gap-4">
                    <div className="text-yellow-600 dark:text-yellow-400">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Important Notice</h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                        Changing platform parameters will affect all users and investments. Make sure to notify users
                        before making significant changes.
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Helper component for the Label
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}
