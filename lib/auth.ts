"use client"

// This is a mock authentication service
// In a real application, you would use a proper authentication provider like Supabase, Auth.js, etc.

interface User {
  id: string
  username: string
  email: string
  agreed: boolean
  invested: number
  profit: number
  referralCount: number
  referralBonus: number
  firstInvestmentDate: string | null
}

// Mock storage for user session
let currentUser: User | null = null

export async function registerUser(
  username: string,
  email: string,
  password: string,
  agreed: boolean,
  referrerId: string | null,
): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Check if email is already in use
  if (email === "test@example.com") {
    throw new Error("Email already in use")
  }

  // Create new user
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15),
    username,
    email,
    agreed,
    invested: 0,
    profit: 0,
    referralCount: 0,
    referralBonus: 0,
    firstInvestmentDate: null,
  }

  // Store user in session
  currentUser = newUser

  // Store in localStorage for persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("investmentStarsUser", JSON.stringify(newUser))
  }

  return newUser
}

export async function loginUser(email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock login logic
  if (email === "admin@example.com" && password === "password") {
    const user: User = {
      id: "admin123",
      username: "admin",
      email: "admin@example.com",
      agreed: true,
      invested: 1000,
      profit: 120,
      referralCount: 5,
      referralBonus: 50,
      firstInvestmentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    }

    currentUser = user

    if (typeof window !== "undefined") {
      localStorage.setItem("investmentStarsUser", JSON.stringify(user))
    }

    return user
  }

  // Demo user for testing
  if (email === "demo@example.com" && password === "demo") {
    const user: User = {
      id: "demo123",
      username: "demo",
      email: "demo@example.com",
      agreed: true,
      invested: 500,
      profit: 60,
      referralCount: 2,
      referralBonus: 25,
      firstInvestmentDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    }

    currentUser = user

    if (typeof window !== "undefined") {
      localStorage.setItem("investmentStarsUser", JSON.stringify(user))
    }

    return user
  }

  throw new Error("Invalid email or password")
}

export async function logoutUser(): Promise<void> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  currentUser = null

  if (typeof window !== "undefined") {
    localStorage.removeItem("investmentStarsUser")
  }
}

export function getCurrentUser(): User | null {
  if (currentUser) {
    return currentUser
  }

  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("investmentStarsUser")
    if (storedUser) {
      currentUser = JSON.parse(storedUser)
      return currentUser
    }
  }

  return null
}
