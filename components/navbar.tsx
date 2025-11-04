"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem("theme", newIsDark ? "dark" : "light")
    if (newIsDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const navItems = [
    { label: "Work", href: "#work" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
  ]

  if (!mounted) return null

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-border/20 animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <Link
            href="#"
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-400"
          >
            Jayashakthi's Portfolio
          </Link>

          <div className="hidden md:flex gap-10 items-center">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/65 hover:text-primary transition-all duration-400 relative group"
                style={{
                  animation: `slideInRight 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`,
                }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/80 group-hover:w-full transition-all duration-400 ease-out"></span>
              </Link>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl hover:bg-primary/10 transition-all duration-400 text-primary/70 hover:text-primary text-xl neuro-button"
            aria-label="Toggle theme"
          >
            {isDark ? "☀" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  )
}
