"use client"

import { getCurrentUser } from "./auth"

export async function makeInvestment(amount: number): Promise<boolean> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = getCurrentUser()

  if (!user) {
    throw new Error("You must be logged in to make an investment")
  }

  if (amount < 25) {
    throw new Error("Minimum investment amount is 25 Stars")
  }

  // Update user data
  user.invested += amount

  // Set first investment date if not already set
  if (!user.firstInvestmentDate) {
    user.firstInvestmentDate = new Date().toISOString()
  }

  // Store updated user in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("investmentStarsUser", JSON.stringify(user))
  }

  return true
}

export async function withdrawProfit(amount: number): Promise<boolean> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = getCurrentUser()

  if (!user) {
    throw new Error("You must be logged in to withdraw profit")
  }

  if (amount <= 0) {
    throw new Error("Withdrawal amount must be greater than 0")
  }

  if (amount > user.profit) {
    throw new Error("Insufficient profit balance")
  }

  // Update user data
  user.profit -= amount

  // Store updated user in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("investmentStarsUser", JSON.stringify(user))
  }

  return true
}

export async function getInvestmentOptions(): Promise<number[]> {
  // In a real app, this would fetch from an API or database
  // For now, we'll return fixed options
  return [25, 50, 100, 250, 500, 1000]
}

export async function getDailyProfitRate(): Promise<number> {
  // In a real app, this would fetch from an API or database
  // For now, we'll return a fixed rate
  return 2.0 // 2% daily profit
}
