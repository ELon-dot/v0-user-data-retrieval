"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface LineChartProps {
  data: { day: string; profit: string }[]
}

interface BarChartProps {
  data: { date: string; amount: number }[]
}

export function LineChart({ data }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40

    // Set colors based on theme
    const textColor = theme === "dark" ? "#e5e7eb" : "#374151"
    const gridColor = theme === "dark" ? "#374151" : "#e5e7eb"
    const lineColor = "#10b981"

    // Draw grid
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + ((height - padding * 2) / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i < data.length; i++) {
      const x = padding + ((width - padding * 2) / (data.length - 1)) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
    }

    // Draw axes labels
    ctx.fillStyle = textColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels
    for (let i = 0; i < data.length; i++) {
      const x = padding + ((width - padding * 2) / (data.length - 1)) * i
      ctx.fillText(data[i].day, x, height - padding + 15)
    }

    // Y-axis labels
    const maxProfit = Math.max(...data.map((d) => Number.parseFloat(d.profit)))
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - ((height - padding * 2) / 5) * i
      ctx.textAlign = "right"
      ctx.fillText(((maxProfit / 5) * i).toFixed(2), padding - 10, y + 3)
    }

    // Draw line
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let i = 0; i < data.length; i++) {
      const x = padding + ((width - padding * 2) / (data.length - 1)) * i
      const y = height - padding - ((height - padding * 2) / maxProfit) * Number.parseFloat(data[i].profit)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Draw points
    ctx.fillStyle = lineColor

    for (let i = 0; i < data.length; i++) {
      const x = padding + ((width - padding * 2) / (data.length - 1)) * i
      const y = height - padding - ((height - padding * 2) / maxProfit) * Number.parseFloat(data[i].profit)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [data, theme])

  return <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
}

export function BarChart({ data }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40

    // Set colors based on theme
    const textColor = theme === "dark" ? "#e5e7eb" : "#374151"
    const gridColor = theme === "dark" ? "#374151" : "#e5e7eb"
    const barColor = theme === "dark" ? "#fbbf24" : "#f59e0b"

    // Draw grid
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + ((height - padding * 2) / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw axes labels
    ctx.fillStyle = textColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels
    const barWidth = (width - padding * 2) / data.length - 10

    for (let i = 0; i < data.length; i++) {
      const x = padding + ((width - padding * 2) / data.length) * i + (width - padding * 2) / data.length / 2
      ctx.fillText(data[i].date, x, height - padding + 15)
    }

    // Y-axis labels
    const maxAmount = Math.max(...data.map((d) => d.amount))
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - ((height - padding * 2) / 5) * i
      ctx.textAlign = "right"
      ctx.fillText(((maxAmount / 5) * i).toFixed(0), padding - 10, y + 3)
    }

    // Draw bars
    ctx.fillStyle = barColor

    for (let i = 0; i < data.length; i++) {
      const x = padding + ((width - padding * 2) / data.length) * i + 5
      const barHeight = ((height - padding * 2) / maxAmount) * data[i].amount
      const y = height - padding - barHeight

      ctx.fillRect(x, y, barWidth, barHeight)
    }
  }, [data, theme])

  return <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
}
