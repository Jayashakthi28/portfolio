"use client"

import { portfolioData as fallbackData } from "@/lib/data"
import { config } from "@/lib/config"
import Image from "next/image"
import Link from "next/link"
import { Github, ArrowRight } from "lucide-react"

interface ProjectsSectionProps {
  data?: any
}

export function ProjectsSection({ data = fallbackData }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-16 animate-fade-in-up">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project: any, idx: number) => (
            <div
              key={project.id}
              className="neuro-card neuro-card-hover overflow-hidden group animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden bg-secondary/30">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-7 space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-400">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed group-hover:text-foreground/85 transition-colors duration-400">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/5 text-primary/80 border border-primary/10 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 transition-all duration-300 text-sm font-medium neuro-button"
                    >
                      💻 Code
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 transition-all duration-300 text-sm font-medium neuro-button"
                    >
                      🔗 Live
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12 animate-fade-in-up" style={{ animationDelay: `${data.projects.length * 0.1 + 0.2}s` }}>
          <Link
            href={`https://github.com/${config.github.username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary/10 hover:bg-primary/15 text-primary rounded-xl font-medium neuro-button group transition-all duration-300"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>View All Projects on GitHub</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
