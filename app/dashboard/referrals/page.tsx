"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy, Gift, Mail, Share2, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

export default function ReferralsPage() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState("")

  // This would normally come from the server
  const userData = {
    referralLink: `${typeof window !== "undefined" ? window.location.origin : ""}/register?ref=123456`,
    referralCount: 3,
    activeReferrals: 2,
    referredInvestment: 500,
    referralBonus: 50,
    referrals: [
      { username: "john_doe", date: "2025-05-01", invested: 250, bonus: 25 },
      { username: "alice_smith", date: "2025-05-10", invested: 150, bonus: 15 },
      { username: "bob_jones", date: "2025-05-15", invested: 100, bonus: 10 },
    ],
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData.referralLink)
    setCopied(true)
    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareViaEmail = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${email}?subject=Join Investment Stars&body=I'm inviting you to join Investment Stars! Use my referral link to sign up and start earning 2% daily profits: ${userData.referralLink}`
    setEmail("")
    toast({
      title: "Email opened",
      description: "Share your referral link via email",
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Referral Program</h1>
          <p className="text-muted-foreground">Invite friends and earn 10% of their investments as a bonus.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this link with friends to earn referral bonuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Input value={userData.referralLink} readOnly />
                <Button size="sm" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Total Referrals</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{userData.referralCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Referred Investment</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{userData.referredInvestment} ⭐</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Your Bonus</CardTitle>
                      <Gift className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-yellow-600">{userData.referralBonus} ⭐</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Link</CardTitle>
              <CardDescription>Choose how you want to share your referral link</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="space-y-4 pt-4">
                  <form onSubmit={shareViaEmail} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Friend's Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="friend@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gap-1">
                      <Mail className="h-4 w-4" />
                      Share via Email
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="social" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        window.open(
                          `https://twitter.com/intent/tweet?text=I'm earning 2% daily profits with Investment Stars! Join using my referral link: ${encodeURIComponent(userData.referralLink)}`,
                          "_blank",
                        )
                      }}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 3.93 3.93 0 0 1-1.1.17 4.9 4.9 0 0 1-.77-.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 3 18.34a7.93 7.93 0 0 1-1-.06 11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.43 8.43 0 0 0 2-2.12Z" />
                      </svg>
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(userData.referralLink)}`,
                          "_blank",
                        )
                      }}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                      </svg>
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        window.open(
                          `https://wa.me/?text=I'm earning 2% daily profits with Investment Stars! Join using my referral link: ${encodeURIComponent(userData.referralLink)}`,
                          "_blank",
                        )
                      }}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        window.open(
                          `https://t.me/share/url?url=${encodeURIComponent(userData.referralLink)}&text=I'm earning 2% daily profits with Investment Stars! Join using my referral link:`,
                          "_blank",
                        )
                      }}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
                      </svg>
                      Telegram
                    </Button>
                  </div>
                  <Button className="w-full gap-1" onClick={copyToClipboard}>
                    <Share2 className="h-4 w-4" />
                    Copy Link to Share Anywhere
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Learn how to earn referral bonuses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Share Your Referral Link</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Share your unique referral link with friends, family, or on social media.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Friends Sign Up & Invest</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    When someone uses your link to sign up and make an investment, they become your referral.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Earn Referral Bonuses</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You earn a 10% bonus on all investments made by your referrals. The bonus is added to your balance.
                  </p>
                </div>
              </div>

              <div className="rounded-md bg-yellow-50 p-4 mt-4 dark:bg-yellow-950">
                <div className="flex items-start gap-4">
                  <div className="text-yellow-600 dark:text-yellow-400">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Example</h4>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                      If your friend invests 100 Stars, you'll receive 10 Stars as a referral bonus.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
            <CardDescription>List of people who signed up using your referral link</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.referrals.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>Username</div>
                  <div>Date Joined</div>
                  <div>Total Invested</div>
                  <div>Your Bonus</div>
                </div>
                <div className="divide-y">
                  {userData.referrals.map((referral, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="text-sm font-medium">{referral.username}</div>
                      <div className="text-sm">{referral.date}</div>
                      <div className="text-sm">{referral.invested} ⭐</div>
                      <div className="text-sm text-yellow-600">+{referral.bonus} ⭐</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <p className="text-center text-sm text-muted-foreground">
                  You don't have any referrals yet. Share your link to start earning bonuses!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
