import type React from "react"
import { DM_Sans, DM_Mono } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import ThemeProvider from "@/components/theme-provider"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-dm-mono" })

export const metadata: Metadata = {
  title: "Portfolio - Full Stack Developer",
  description: "Full Stack Developer Portfolio - Explore my projects, skills, and experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className} antialiased font-sans`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
