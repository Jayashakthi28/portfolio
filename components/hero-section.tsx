import { portfolioData as fallbackData } from "@/lib/data"
import Link from "next/link"

interface HeroSectionProps {
  data?: any
}

export function HeroSection({ data = fallbackData }: HeroSectionProps) {
  return (
    <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl sm:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
              {data.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {data.titles?.map((title: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl text-primary font-semibold">
                    {title}
                  </span>
                  {idx < data.titles.length - 1 && (
                    <span className="text-primary/40 text-2xl">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p
            className="text-lg text-foreground/70 leading-relaxed max-w-2xl animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {data.description}
          </p>

          {data.location && (
            <p className="text-sm text-foreground/60 flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
              <span>📍</span> {data.location}
            </p>
          )}

          <div className="flex gap-4 pt-6 flex-wrap">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium group overflow-hidden relative neuro-button"
              style={{ animation: "fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards" }}
            >
              <span className="relative z-10">View My Work →</span>
            </Link>
            <Link
              href={`mailto:${data.email}`}
              className="inline-flex items-center px-8 py-4 glass glass-hover rounded-xl font-medium neuro-button"
              style={{ animation: "fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.5s backwards" }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
