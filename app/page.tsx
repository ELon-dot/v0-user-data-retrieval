import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, DollarSign, Gift, Star, TrendingUp, Users } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold">Investment Stars</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-yellow-100 px-3 py-1 text-sm dark:bg-yellow-800">
                  High Returns
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Invest Stars & Earn 2% Daily Profit</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of investors already making profits with our platform. Start with as little as 25
                  Stars.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Start Investing <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-950 border rounded-3xl shadow-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="font-semibold">Investment Stars</span>
                      </div>
                      <div className="text-sm text-gray-500">Daily: +2%</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Invested</span>
                        <span className="font-medium">1,000 ⭐</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Profit</span>
                        <span className="font-medium text-green-600">+20 ⭐</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Balance</span>
                        <span className="font-medium">1,020 ⭐</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="h-24 w-full">
                        <div className="h-full w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-md flex items-end">
                          <div className="h-[30%] w-[10%] bg-gray-300 dark:bg-gray-600 rounded-sm mx-1"></div>
                          <div className="h-[40%] w-[10%] bg-gray-300 dark:bg-gray-600 rounded-sm mx-1"></div>
                          <div className="h-[60%] w-[10%] bg-gray-300 dark:bg-gray-600 rounded-sm mx-1"></div>
                          <div className="h-[50%] w-[10%] bg-gray-300 dark:bg-gray-600 rounded-sm mx-1"></div>
                          <div className="h-[70%] w-[10%] bg-gray-300 dark:bg-gray-600 rounded-sm mx-1"></div>
                          <div className="h-[80%] w-[10%] bg-gray-300 dark:bg-gray-600 rounded-sm mx-1"></div>
                          <div className="h-[90%] w-[10%] bg-green-500 rounded-sm mx-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-100 px-3 py-1 text-sm dark:bg-yellow-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Investment Stars</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform offers the best investment opportunities with daily profits and a transparent system.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                  <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Daily Profits</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Earn 2% profit every day on your investments automatically.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                  <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Low Entry</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Start with as little as 25 Stars and grow your investment over time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                  <Gift className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Referral Program</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Invite friends and earn 10% of their investments as a bonus.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                  <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Detailed Statistics</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Track your investments, profits, and referral bonuses in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                  <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Join thousands of investors already making profits with our platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-800">
                  <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Top Investors</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Compete with other investors and get featured in our top investors list.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-100 px-3 py-1 text-sm dark:bg-yellow-800">
                  Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start investing in just a few simple steps and watch your profits grow daily.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</span>
                </div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Create an account and accept the user agreement to get started.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2</span>
                </div>
                <h3 className="text-xl font-bold">Invest Stars</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Choose an investment amount and complete the payment process.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800">
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">3</span>
                </div>
                <h3 className="text-xl font-bold">Earn Profits</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Receive 2% profit daily and withdraw your earnings when you want.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-100 px-3 py-1 text-sm dark:bg-yellow-800">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Investors Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from our community of successful investors who are already making profits.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div>
                    <h4 className="font-bold">Alex Johnson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Investor since 2023</p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  "I've been investing with Investment Stars for 6 months now and my profits have been consistent. The
                  2% daily return is amazing!"
                </p>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div>
                    <h4 className="font-bold">Sarah Miller</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Investor since 2022</p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  "The referral program is fantastic! I've invited 5 friends and earned over 500 Stars in bonuses.
                  Highly recommend!"
                </p>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div>
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Investor since 2023</p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  "Started with just 25 Stars and now I'm in the top investors list. The platform is easy to use and the
                  profits are real!"
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-yellow-50 dark:bg-yellow-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Investing?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of investors already making profits with our platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-1">
                    Sign Up Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              <span className="text-xl font-bold">Investment Stars</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Invest Stars and earn 2% profit daily. Join thousands of investors!
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="font-semibold">Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#features" className="text-sm hover:underline">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm hover:underline">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-sm hover:underline">
                Testimonials
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/terms" className="text-sm hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="text-sm hover:underline">
                Risk Disclaimer
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 Investment Stars. All rights reserved.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ⚠️ High-risk scheme. Profit not guaranteed. All risks are on you.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
