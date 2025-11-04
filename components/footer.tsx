"use client"

import { portfolioData as fallbackData } from "@/lib/data"
import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram, Mail, Link2 } from "lucide-react"

// Custom LeetCode Icon
const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
)

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
  leetcode: <LeetCodeIcon className="w-5 h-5" />,
}

interface FooterProps {
  data?: any
}

export function Footer({ data = fallbackData }: FooterProps) {
  return (
    <footer className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">About</h3>
            <p className="text-foreground/65 leading-relaxed">{data.description}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Quick Links</h3>
            <div className="space-y-3">
              <Link href="#work" className="block text-foreground/65 hover:text-primary transition-colors duration-400 font-medium">
                Work
              </Link>
              <Link href="#projects" className="block text-foreground/65 hover:text-primary transition-colors duration-400 font-medium">
                Projects
              </Link>
              <Link href="#blog" className="block text-foreground/65 hover:text-primary transition-colors duration-400 font-medium">
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Connect</h3>
            <div className="flex gap-3 flex-wrap">
              {data.socialLinks.map((link: any) => (
                <Link
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl neuro-button hover:bg-primary/10 hover:text-primary transition-all duration-400 text-foreground/70"
                  aria-label={link.label}
                >
                  {iconMap[link.icon] || <Link2 className="w-5 h-5" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/40 mb-10" />

        {/* Bottom */}
        <div className="flex justify-between items-center flex-col md:flex-row gap-6">
          <p className="text-sm text-foreground/55 font-medium">© 2025 {data.name}. All rights reserved.</p>
          <p className="text-sm text-foreground/55 font-medium">
            Built with <span className="text-primary">Next.js</span> & <span className="text-primary">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
