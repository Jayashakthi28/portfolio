import { portfolioData as fallbackData } from "@/lib/data"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface WorkSectionProps {
  data?: any
}

export function WorkSection({ data = fallbackData }: WorkSectionProps) {
  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-16 animate-fade-in-up">Work Experience</h2>

        <div className="space-y-8">
          {data.experience.map((job: any, idx: number) => (
            <div
              key={job.id}
              className="neuro-card neuro-card-hover p-8 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex gap-6">
                <div className="flex flex-shrink-0 items-start pt-1">
                  <div className="w-14 h-14 rounded-xl overflow-hidden neuro-inset bg-secondary/30 flex items-center justify-center">
                    {job.logo ? (
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={56}
                        height={56}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-2xl font-bold group-hover:bg-primary/20 transition-colors duration-400">
                        {job.company.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-6 mb-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-400">
                        {job.position}
                      </h3>
                      {job.website ? (
                        <a
                          href={job.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-foreground/65 font-medium hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5 group/link"
                        >
                          {job.company}
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        </a>
                      ) : (
                        <p className="text-base text-foreground/65 font-medium">{job.company}</p>
                      )}
                    </div>
                    <span className="text-sm text-foreground/50 whitespace-nowrap group-hover:text-primary/70 transition-colors duration-400 font-medium">
                      {job.duration}
                    </span>
                  </div>
                  <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/85 transition-colors duration-400">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
