interface Investment {
  amount: number
  date: string
}

interface UserData {
  id: string
  username: string
  email: string
  agreed: boolean
  invested: number
  profit: number
  referralCount: number
  activeReferrals: number
  referredInvestment: number
  referralBonus: number
  firstInvestmentDate: string | null
  recentInvestments: Investment[]
  allInvestments: Investment[]
}

// Mock data for demonstration
const mockInvestments: Investment[] = [
  { amount: 100, date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
  { amount: 200, date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
  { amount: 150, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
  { amount: 50, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
]

// Demo user data for server-side rendering
const demoUserData: UserData = {
  id: "demo123",
  username: "demo",
  email: "demo@example.com",
  agreed: true,
  invested: 500,
  profit: 60,
  referralCount: 2,
  activeReferrals: 2,
  referredInvestment: 250,
  referralBonus: 25,
  firstInvestmentDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  recentInvestments: mockInvestments.slice(0, 3),
  allInvestments: mockInvestments,
}

export async function getUserData(): Promise<UserData> {
  // In a real app, this would fetch from an API or database
  // For now, we'll use the demo data for server-side rendering

  // We can't use getCurrentUser() on the server, so we'll always return demo data
  // In a real app, you would fetch user data from a database based on session/cookies
  return demoUserData
}

export async function updateUserProfile(data: Partial<UserData>): Promise<UserData> {
  // In a real app, this would update the user profile in the database
  // For now, we'll just return the updated data

  const userData = await getUserData()

  const updatedData: UserData = {
    ...userData,
    ...data,
  }

  return updatedData
}
