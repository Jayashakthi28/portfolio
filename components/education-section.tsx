import { portfolioData as fallbackData } from "@/lib/data"

interface EducationSectionProps {
  data?: any
}

export function EducationSection({ data = fallbackData }: EducationSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-16 animate-fade-in-up">Education</h2>

        <div className="space-y-8">
          {data.education.map((edu: any, idx: number) => (
            <div
              key={edu.id}
              className="neuro-card neuro-card-hover p-8 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl neuro-inset bg-primary/8 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-primary/12 transition-all duration-400">
                  📚
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-400">
                    {edu.degree}
                  </h3>
                  <p className="text-base text-foreground/65 group-hover:text-foreground/80 transition-colors duration-400 font-medium">
                    {edu.school}
                  </p>
                  <p className="text-sm text-foreground/60 group-hover:text-foreground/75 transition-colors duration-400 leading-relaxed pt-1">
                    {edu.description}
                  </p>
                  <p className="text-sm text-foreground/50 group-hover:text-primary/60 transition-colors duration-400 font-medium pt-1">
                    {edu.year}
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
